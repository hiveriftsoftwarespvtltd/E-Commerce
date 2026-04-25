// src/data/allProducts.js

// Utility: Safely import an array (if file missing → return empty array)
const safe = (data) => (Array.isArray(data) ? data : []);

// -----------------------------
// 🔥 Home Decor / Decors
// -----------------------------
import tableDecor from "../Decors/TableDecorData";
import aromadiffusers from "../Decors/AromadiffusersData";
import plantersvases from "../Decors/PlantersvasesData";

// -----------------------------
// 🔥 Drinkware
// -----------------------------
import glassware from "../Drinkware/GlasswareData";
import cupsets from "../Drinkware/CupSetsData";
import mugs from "../Drinkware/MugsData";

// -----------------------------
// 🔥 Tableware
// -----------------------------
import trays from "../Tableware/TrayData";
import bowls from "../Tableware/BowlData";
import dinnerware from "../Tableware/DinnerwareData";
import multipurposejar from "../Tableware/MultipurposeJarData";
import dipsplate from "../Tableware/DipsPlateData";

// -----------------------------
// 🔥 Home Essentials
// -----------------------------
import kitchenessentials from "../HomeEssentials/KitchenEssentialsData";
import organizer from "../HomeEssentials/OrganizerData";
import cookware from "../HomeEssentials/CookwareData";

// -----------------------------
// 🔥 Women Accessories
// -----------------------------
import pendants from "../WomenAccessories/PendantsData";
import earrings from "../WomenAccessories/EarringsData";
import bracelet from "../WomenAccessories/BraceletData";

// -----------------------------
// 🔥 Combo
// -----------------------------
import mugset from "../Combo/MugSetData";
import travelmug from "../Combo/TravelMugData";

// -----------------------------
// 🔥 Hero Link Categories (optional files)
// -----------------------------
import tablewareHero from "../HeroContentLInk/TablewareData";
import drinkwareHero from "../HeroContentLInk/DrinkwareData";
import womenaccessoriesHero from "../HeroContentLInk/WomenaccessoriesData";
import homeDecoreHero from "../HeroContentLInk/HomeDecoreData";
import combooffersHero from "../HeroContentLInk/CombooffersData";
import homeessentialsHero from "../HeroContentLInk/HomeessentialsData";
import jarsHero from "../HeroContentLInk/JarsData";


// ----------------------------------------------------------------------
// ⭐ MASTER PRODUCT LIST FOR THE WHOLE WEBSITE (SAFE VERSION)
// ----------------------------------------------------------------------

const allProducts = [
  ...safe(tableDecor),
  ...safe(aromadiffusers),
  ...safe(plantersvases),

  ...safe(glassware),
  ...safe(cupsets),
  ...safe(mugs),

  ...safe(trays),
  ...safe(bowls),
  ...safe(dinnerware),
  ...safe(multipurposejar),
  ...safe(dipsplate),

  ...safe(kitchenessentials),
  ...safe(organizer),
  ...safe(cookware),

  ...safe(pendants),
  ...safe(earrings),
  ...safe(bracelet),

  ...safe(mugset),
  ...safe(travelmug),

  ...safe(tablewareHero),
  ...safe(drinkwareHero),
  ...safe(womenaccessoriesHero),
  ...safe(homeDecoreHero),
  ...safe(combooffersHero),
  ...safe(homeessentialsHero),
  ...safe(jarsHero),
];

export default allProducts;
