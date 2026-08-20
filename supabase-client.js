/* =========================================================================
   SUPABASE CLIENT — shared by index.html, admin.html, orders.html
   -------------------------------------------------------------------------
   These keys are the PUBLIC "anon" keys — safe to commit and ship to
   browsers. Row-level security in Supabase is what protects your data.
   Never paste the "service_role" key here.
========================================================================= */
"use strict";

var SUPABASE_URL      = "https://okttonyulpimnvkhncti.supabase.co";
var SUPABASE_ANON_KEY = "sb_publishable_CfgObmxuO5oKrbmq_AZriQ_Tyur0UXk";

window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* -------- read the whole menu (customer + admin) -------- */
async function loadMenuData() {
  var out = await Promise.all([
    window.sb.from("settings").select("*").eq("id", 1).single(),
    window.sb.from("categories").select("*").order("sort_order"),
    window.sb.from("menu_items").select("*").order("sort_order")
  ]);
  var sErr = out[0].error, cErr = out[1].error, iErr = out[2].error;
  if (sErr || cErr || iErr) throw (sErr || cErr || iErr);
  var s = out[0].data, cats = out[1].data || [], items = out[2].data || [];
  return {
    shopName:    (s && s.shop_name) || "Coffee Shop",
    taxRate:     s ? Number(s.tax_rate) : 0.06,
    presetNotes: (s && s.preset_notes) || [],
    categories:  cats.map(function (c) { return { id: c.id, name: c.name, sort_order: c.sort_order }; }),
    items:       items.map(function (i) {
      return {
        id: i.id, cat: i.cat_id, name: i.name, desc: i.description || "",
        price: Number(i.price) || 0, image: i.image_url || "",
        optionGroups: i.option_groups || []
      };
    })
  };
}

/* -------- admin writes -------- */
async function saveSettings(cfg) {
  var res = await window.sb.from("settings").update({
    shop_name: cfg.shopName,
    tax_rate:  Number(cfg.taxRate) || 0,
    preset_notes: cfg.presetNotes || []
  }).eq("id", 1);
  if (res.error) throw res.error;
}

async function upsertCategory(cat, sortOrder) {
  var res = await window.sb.from("categories").upsert({
    id: cat.id, name: cat.name, sort_order: sortOrder
  });
  if (res.error) throw res.error;
}

async function deleteCategoryDb(id) {
  var res = await window.sb.from("categories").delete().eq("id", id);
  if (res.error) throw res.error;
}

async function upsertItem(item, sortOrder) {
  var res = await window.sb.from("menu_items").upsert({
    id: item.id,
    cat_id: item.cat,
    name: item.name,
    description: item.desc || "",
    price: Number(item.price) || 0,
    image_url: item.image || "",
    option_groups: item.optionGroups || [],
    sort_order: sortOrder
  });
  if (res.error) throw res.error;
}

async function deleteItemDb(id) {
  var res = await window.sb.from("menu_items").delete().eq("id", id);
  if (res.error) throw res.error;
}

/* -------- customer: place order -------- */
async function placeOrder(order) {
  var res = await window.sb.from("orders").insert(order).select().single();
  if (res.error) throw res.error;
  return res.data;
}

/* -------- kitchen: live orders -------- */
async function loadRecentOrders(limit) {
  var res = await window.sb.from("orders")
    .select("*").order("created_at", { ascending: false }).limit(limit || 100);
  if (res.error) throw res.error;
  return res.data;
}

async function updateOrderStatus(id, status) {
  var res = await window.sb.from("orders").update({ status: status }).eq("id", id);
  if (res.error) throw res.error;
}

function subscribeOrders(cb) {
  return window.sb.channel("orders-live")
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "orders" },
        function (p) { cb({ type: "new", order: p.new }); })
    .on("postgres_changes", { event: "UPDATE", schema: "public", table: "orders" },
        function (p) { cb({ type: "update", order: p.new }); })
    .subscribe();
}

window.QRDB = {
  loadMenuData: loadMenuData,
  saveSettings: saveSettings,
  upsertCategory: upsertCategory,
  deleteCategoryDb: deleteCategoryDb,
  upsertItem: upsertItem,
  deleteItemDb: deleteItemDb,
  placeOrder: placeOrder,
  loadRecentOrders: loadRecentOrders,
  updateOrderStatus: updateOrderStatus,
  subscribeOrders: subscribeOrders
};
