//1. randomize the size of the town with catagories
// High Density
// > 10,000,000 Megalopolis
// 3,000,000 - 10,000,000 Conurbation
// 1,000,000 - 3,000,000 Metropolis
// Mid Density
// 300,000 - 1,000,000 Large city
// 150,000- 300,000 Medium city
// 100,000 - 150,000 Small City
// Low Density
// 10,000 - 100,000 Large town
// 150 -10,000 Town
// Minuscule Density
// 50 -150 Village
// 5 - 50 Hamlet
// 1 - 5 Homestead
//2. make up of buildings in town/city (house/org/shop)
//3. class of buildings in town/city (rich/poor/middle)
//4. type of sub buiulding

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
    switch (building.subtype) {
      case "Brothel":
        names = database.BrothelName.Items;
        break;
      case "Tavern":
      case "Inn":
      case "Restaurant":
        names = database.TavernSeedyNames.Items;
        break;
      case "Guild":
        names = database.GuildGenerator.Items;
        break;
      case "Religious":
        names = database.ReligiousBuildingType.Items;
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
