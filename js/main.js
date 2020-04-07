const RPGenie = function (seed) {
  RPGenie.prototype.seed = new Math.seedrandom(seed);

  RPGenie.prototype.RandomBetween = function (max) {
    return Math.floor(this.seed() * Math.floor(max));
  };

  RPGenie.prototype.Item = () => {};

  RPGenie.prototype.Building = function () {
    return { Item: null };
  };

  RPGenie.prototype.Type = () => {
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

  RPGenie.prototype.Subtype = (building) => {
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
  RPGenie.prototype.Owner = () => {};
  RPGenie.prototype.Description = () => {};
  RPGenie.prototype.Name = () => {};

  RPGenie.prototype.BuildingBuild = () => {
    var building = new this.Building();
    building.Type = this.Type();
    building.Subtype = this.Subtype(building);
    building.Owner = this.Owner(building);
    building.Description = this.Description(building);
    building.Name = this.Name(building);
    return building;
  };
};

console.log('Htest');