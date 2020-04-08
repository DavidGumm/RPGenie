const RPGenie = function (seed) {
  RPGenie.prototype.seed = new Math.seedrandom(seed);
};

const RandomBetween = function (max) {
  return Math.floor(this.seed() * Math.floor(max));
};

const Item = () => {};

const Building = function () {
  return { Item: null };
};

const Type = () => {
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
    "Home",
  ];
  return types[this.RandomBetween(types.length)];
};

const Subtype = (building) => {
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
        "Poor",
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
        "Tech Shop",
      ];
      break;
    default:
      break;
  }
  return subtype[this.RandomBetween(subtype.length)];
};
const Owner = () => {};
const Description = () => {};
const Name = () => {};

const RRPGenie.prototype.BuildingBuild = () => {
  var building = new Building();
  building.Type = this.Type();
  building.Subtype = this.Subtype(building);
  building.Owner = this.Owner(building);
  building.Description = this.Description(building);
  building.Name = this.Name(building);
  return building;
};
