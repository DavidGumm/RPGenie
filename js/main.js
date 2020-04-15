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
        subtype = ["House"];
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
    building.subtype = subtype[this.RandomBetween(subtype.length)];
    return building;
  };
  RPGenie.prototype.Owner = (building) => {
    building.Owner = "";
    return building;
  };
  RPGenie.prototype.Description = (building) => {
    building.Description = "";
    return building;
  };
  RPGenie.prototype.Quality = (item) => {
    let quality = [
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

    item.Quality = quality[this.RandomBetween(quality.length)];
    return item;
  };
  RPGenie.prototype.Name = (building) => {
    let names = [];
    console.log(building.subtype);
    switch (building.subtype) {
      case "Brothel":
        names = database[building.subtype].BrothelName.Items;
        break;
      case "Tavern":
      case "Inn":
      case "Restaurant":
        names = database["Tavern"].TavernSeedyNames.Items;
        break;
      case "Guild":
        names = database[building.subtype].GuildGenerator.Items;
        break;
      case "Religious":
        names = database["Religion"].ReligiousBuildingType.Items;
        break;
      default:
        names = [""];
        break;
    }
    building.name = names[this.RandomBetween(names.length)];
    return building;
  };

  RPGenie.prototype.BuildingBuild = () => {
    var building = new this.Building();
    building.Type = this.Type();
    building = this.Quality(building);
    building = this.Subtype(building);
    building = this.Owner(building);
    building = this.Name(building);
    building = this.Description(building);
    return building;
  };
};
