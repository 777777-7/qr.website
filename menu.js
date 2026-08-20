/* =========================================================================
   SHARED MENU DATA  —  single source of truth for BOTH pages
   -------------------------------------------------------------------------
   • index.html  (customer)  reads this to show the menu.
   • admin.html  (boss)      edits this and re-downloads it.

   You normally do NOT hand-edit this file — use admin.html, make your
   changes, then click "Download menu.js" and replace this file.
   (It is plain data, so hand-editing is fine too if you prefer.)

   SCHEMA
   ------
   window.MENU_CONFIG = {
     shopName : string,
     taxRate  : number,                 // e.g. 0.06 for 6% SST
     categories: [ { id, name } ],
     presetNotes: [ string ],           // quick note chips in the item popup
     items: [
       {
         id, cat, name, desc,
         price : number,                // base price
         image : "" or dataURL string,  // dish photo (base64)
         optionGroups: [
           {
             id, name,                  // e.g. "Spice level", "Size"
             type    : "single" | "multi",
             required: true | false,
             choices : [ { id, label, price } ]   // price = extra charge (+RM)
           }
         ]
       }
     ]
   }
========================================================================= */
(function () {
  // Small helpers so the seed data stays readable. Output is plain concrete data.
  function group(id, name, type, required, choices) {
    return { id: id, name: name, type: type, required: required, choices: choices };
  }
  function choice(id, label, price) { return { id: id, label: label, price: price || 0 }; }

  var spice = function () {
    return group("g_spice", "Spice level", "single", true, [
      choice("spicy", "Spicy", 0),
      choice("nonspicy", "Non-spicy", 0)
    ]);
  };
  var size = function () {
    return group("g_size", "Size", "single", true, [
      choice("small", "Small", 0),
      choice("large", "Large", 2.00)
    ]);
  };

  window.MENU_CONFIG = {
    shopName: "SWEET APPLE",
    taxRate: 0.06,

    categories: [
      { id: "c1", name: "Category 1" },
      { id: "c2", name: "Category 2" },
      { id: "c3", name: "Category 3" },
      { id: "c4", name: "Category 4" },
      { id: "c5", name: "Category 5" }
    ],

    presetNotes: ["No sugar", "Less sugar", "Extra hot", "Less ice", "Oat milk", "No whipped cream"],

    items: [
      // ---- Category 1 ----
      { id: "i101", cat: "c1", name: "House Espresso",    desc: "Double shot of our signature dark roast.",        price: 8.00,  image: "", optionGroups: [size()] },
      { id: "i102", cat: "c1", name: "Flat White",        desc: "Velvety microfoam over a smooth ristretto.",      price: 11.50, image: "", optionGroups: [size()] },
      { id: "i103", cat: "c1", name: "Cappuccino",        desc: "Equal parts espresso, steamed milk and foam.",    price: 11.00, image: "", optionGroups: [size()] },
      { id: "i104", cat: "c1", name: "Caffe Latte",       desc: "Espresso with silky steamed milk.",               price: 12.00, image: "", optionGroups: [size()] },
      { id: "i105", cat: "c1", name: "Cold Brew",         desc: "Steeped 16 hours for a mellow finish.",           price: 13.00, image: "", optionGroups: [size()] },

      // ---- Category 2 ----
      { id: "i201", cat: "c2", name: "Iced Mocha",        desc: "Chocolate, espresso and milk over ice.",          price: 14.00, image: "", optionGroups: [size()] },
      { id: "i202", cat: "c2", name: "Caramel Macchiato", desc: "Vanilla milk marked with espresso and caramel.",  price: 14.50, image: "", optionGroups: [size()] },
      { id: "i203", cat: "c2", name: "Matcha Latte",      desc: "Ceremonial-grade matcha with steamed milk.",      price: 13.50, image: "", optionGroups: [size()] },
      { id: "i204", cat: "c2", name: "Hot Chocolate",     desc: "Rich Belgian cocoa, gently steamed.",             price: 12.00, image: "", optionGroups: [size()] },
      { id: "i205", cat: "c2", name: "Chai Latte",        desc: "Spiced black tea with frothed milk.",             price: 12.50, image: "", optionGroups: [size()] },
      { id: "i206", cat: "c2", name: "Affogato",          desc: "Vanilla gelato drowned in hot espresso.",         price: 15.00, image: "", optionGroups: [] },

      // ---- Category 3 ----
      { id: "i301", cat: "c3", name: "Butter Croissant",  desc: "Flaky, layered and baked fresh each morning.",    price: 7.50,  image: "", optionGroups: [] },
      { id: "i302", cat: "c3", name: "Almond Danish",     desc: "Buttery pastry with sweet almond frangipane.",    price: 9.00,  image: "", optionGroups: [] },
      { id: "i303", cat: "c3", name: "Banana Bread",      desc: "Moist loaf with walnuts and a hint of cinnamon.", price: 8.50,  image: "", optionGroups: [] },
      { id: "i304", cat: "c3", name: "Blueberry Muffin",  desc: "Bursting with real blueberries.",                 price: 8.00,  image: "", optionGroups: [] },

      // ---- Category 4 ----
      { id: "i401", cat: "c4", name: "Avocado Toast",     desc: "Sourdough, smashed avocado, chilli and lime.",    price: 18.00, image: "", optionGroups: [spice()] },
      { id: "i402", cat: "c4", name: "Chicken Panini",    desc: "Grilled chicken, mozzarella and pesto.",          price: 19.50, image: "", optionGroups: [spice()] },
      { id: "i403", cat: "c4", name: "Big Breakfast",     desc: "Eggs, sausage, mushrooms and toast.",             price: 24.00, image: "", optionGroups: [spice()] },
      { id: "i404", cat: "c4", name: "Garden Salad",      desc: "Mixed greens, cherry tomato, house dressing.",    price: 16.00, image: "", optionGroups: [] },
      { id: "i405", cat: "c4", name: "Beef Lasagne",      desc: "Slow-cooked ragu layered with pasta.",            price: 22.00, image: "", optionGroups: [spice()] },

      // ---- Category 5 ----
      { id: "i501", cat: "c5", name: "Cheesecake Slice",  desc: "New York style with a graham crust.",             price: 13.00, image: "", optionGroups: [] },
      { id: "i502", cat: "c5", name: "Chocolate Brownie", desc: "Fudgy centre with a crackly top.",                price: 10.00, image: "", optionGroups: [] },
      { id: "i503", cat: "c5", name: "Tiramisu",          desc: "Coffee-soaked sponge and mascarpone.",            price: 14.00, image: "", optionGroups: [] },
      { id: "i504", cat: "c5", name: "Fruit Tart",        desc: "Custard and seasonal fruit in a crisp shell.",    price: 12.50, image: "", optionGroups: [] }
    ]
  };
})();
