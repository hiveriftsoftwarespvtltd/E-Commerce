import React from "react";

const FooterLinks = [
  {
    title: "POPULAR CATEGORY",
    items: [
      ["Portable Juicer for Personal Home Uses Gym lover", "https://www.earthstore.in/collections/dinnerware"],
      ["Rechargeable Electric Lighter for Gas Candle and Firework", "https://www.earthstore.in/collections/new-drinkware"],
      ["Japanese Mini Mixer Grinder - Electric grinder", "https://www.earthstore.in/collections/cup-sets"],
      // ["Platters", "https://www.earthstore.in/collections/platters-dips"],
      // ["Bowls", "https://www.earthstore.in/collections/bowl"],
      // ["Snack Bowl", "https://www.earthstore.in/collections/bowl"],
      // ["With Kettle", "https://www.earthstore.in/collections/cup-sets"],
      // ["Dinner Plate", "https://www.earthstore.in/collections/dinnerware"],
      // [
      //   "Multipurpose Jar Set",
      //   "https://www.earthstore.in/collections/multipurpose-jar-containers",
      // ],
      // ["Vases & Planters", "https://www.earthstore.in/collections/planters"],
    ],
  },
  {
    title: "SPECIAL COLLECTIONS",
    items: [
      ["Automatic Water Dispenser for 20 Litres Can", "https://www.earthstore.in/collections/sale"],
      ["Water Soak Absorbent Bathroom Mat and Door Mat Pack of 1", "https://www.earthstore.in/collections/womenaccessories"],
      ["Integrated Direct Spray Gun Suitable For Spray Gun For Car Wash and Gardening Water", "https://www.earthstore.in/collections/home-decore"],
      // ["New Celebration Gifts", "https://www.earthstore.in/collections/home-decore"],
      // ["Friendship Gifts", "https://www.earthstore.in/collections/friendship-mugs"],
    ],
  },
  // {
  //   title: "GIFTS FOR RELATIONSHIPS",
  //   items: [
  //     ["Gifts for Wife", "https://www.earthstore.in/collections/womenaccessories"],
  //     ["Gifts for Husband", "https://www.earthstore.in/collections/coffee-mugs"],
  //     ["Gifts for Sister", "https://www.earthstore.in/collections/womenaccessories"],
  //     ["Gifts for Brother", "https://www.earthstore.in/collections/friendship-mugs"],
  //     ["Gifts for Friends", "https://www.earthstore.in/collections/friendship-mugs"],
  //     ["Gifts for Mother", "https://www.earthstore.in/collections/tableware-collections"],
  //     ["Gifts for Father", "https://www.earthstore.in/collections/coffee-mugs"],
  //     ["Gifts for Girlfriend", "https://www.earthstore.in/collections/womenaccessories"],
  //     ["Gifts for Boyfriend", "https://www.earthstore.in/collections/travel-mug"],
  //     ["Gifts for Family", "https://www.earthstore.in/collections/home-decore"],
  //   ],
  // },
  {
    title: "SEARCHES",
    items: [
      ["120 Watt Retractable Fast Car Charger", "https://www.earthstore.in/collections/bowl"],
      ["Adjustable Aluminum Laptop Stand - Portable Ergonomic Foldable Laptop Holder", "https://www.earthstore.in/collections/multipurpose-jar-containers"],
      ["3 in 1 Portable Car Vacuum Cleaner with Blower", "https://www.earthstore.in/collections/coffee-mugs"],
      ["Twin Bell Analog Display Table Alarm Clock With Night Led Light", "https://www.earthstore.in/collections/travel-mug"],
      // ["Home Essentials", "https://www.earthstore.in/collections/home-essentials"],
      // ["Home Decor", "https://www.earthstore.in/collections/home-decore"],
      // ["Accessories", "https://www.earthstore.in/collections/womenaccessories"],
    ],
  },
];

const FooterTextBlocks = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-10">
      {FooterLinks.map((block, idx) => (
        <div key={idx} className="mb-6">
          <p className="text-accent text-sm font-bold mb-1">
            {block.title}
          </p>

          <p className="text-black text-xs leading-relaxed">
            {block.items.map((i, index) => (
              <span key={index} className=" text-black">
                {/* <a href={i[1]} className="hover:underline text-black"> */}
                  {i[0]}
                {/* </a> */}
                {index < block.items.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FooterTextBlocks;
