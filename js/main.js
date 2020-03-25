const RPGenie = function(seed) {
  RPGenie.prototype.seed = new Math.seedrandom(seed);
};

Item = () => {};

Building = function() {
  return { Item: null };
};
Type = () => {
  let types = [
    "Organizational",
    "Shop",
    "Shop",
    "Shop",
    "Home",
    "Home",
    "Home",
    "Home",
    "Home",
    "Home"
  ];
  return types[RandomBetween(types.length)];
};
Subtype = building => {
  let subtype = [];
  switch (building.Type) {
    case "Home":
      subtype = [
        "Rich",
        "Middle",
        "Middle",
        "Middle",
        "Poor",
        "Poor",
        "Poor",
        "Poor",
        "Poor",
        "Poor",
        "Poor",
        "Poor",
        "Poor",
        "Poor",
        "Poor",
        "Poor",
        "Poor",
        "Poor",
        "Poor",
        "Poor"
      ];
      break;
    case "Organizational":
      subtype = ["Government", "Guild", "Religious"];
      break;
    case "Shop":
      subtype = [
        "Tavern",
        "Restaurant",
        "Inn",
        "Brothel",
        "Blacksmith",
        "General Goods",
        "Magic",
        "Tech Shop"
      ];
      break;
    default:
      break;
  }
  return subtype[RandomBetween(subtype.length)];
};
Owner = () => {};
Description = () => {};
Name = () => {};

BuildingBuild = () => {
  var building = new Building();
  building.Type = Type();
  building.Subtype = Subtype(building);
  building.Owner = Owner(building);
  building.Description = Description(building);
  building.Name = Name(building);
  return building;
};

const RandomBetween = function(max) {
  return Math.floor(world.seed() * Math.floor(max));
};
