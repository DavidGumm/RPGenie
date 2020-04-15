const RPGenie = function (seed) {
  RPGenie.prototype.seed = new Math.seedrandom(seed);

  RPGenie.prototype.RandomBetween = function (max) {
    return Math.floor(this.seed() * Math.floor(max));
  };

  const citySize = [
    { Name: "Megalopolis", size: { min: 10000000, max: 0 } },
    { Name: "Conurbation", size: { min: 3000000, max: 0 } },
    { Name: "Metropolis", size: { min: 1000000, max: 0 } },
    { Name: "Large city", size: { min: 300000, max: 0 } },
    { Name: "Medium city", size: { min: 150000, max: 0 } },
    { Name: "Small City", size: { min: 100000, max: 0 } },
    { Name: "Large town", size: { min: 10000, max: 0 } },
    { Name: "Town", size: { min: 150, max: 0 } },
    { Name: "Village", size: { min: 50, max: 0 } },
    { Name: "Hamlet", size: { min: 5, max: 0 } },
    { Name: "Homestead", size: { min: 1, max: 0 } },
  ];

  RPGenie.prototype.City = function () {
    this.Name = 0;
    this.Size = 0;
    this.BuildingCount = 0;
    return this;
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

  RPGenie.prototype.CityBuild = () => {
    var city = new this.City();
    //city.Name = this.City.Name(city);

    let size = [];

    let sizes = [];

    for (let index = 1; index < citySize.length + 1; index++) {
      sizes.push(Math.pow(index, 10));
    }

    for (let index = 0; index < 10000000; index++) {
      const element = array[index];
      size.push(citySize);
    }

    city.BuildingCount = size;
    return city;
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
