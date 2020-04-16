const RPGenie = function (seed) {
  RPGenie.prototype.seed = new Math.seedrandom(seed);

  RPGenie.prototype.RandomBetween = function (max) {
    return Math.floor(this.seed() * Math.floor(max));
  };

  const citySize = [
    { Name: "Homestead", size: { min: 1, max: 5 } },
    { Name: "Hamlet", size: { min: 5, max: 50 } },
    { Name: "Village", size: { min: 50, max: 150 } },
    { Name: "Town", size: { min: 150, max: 10000 } },
    { Name: "Large town", size: { min: 10000, max: 100000 } },
    { Name: "Small City", size: { min: 100000, max: 150000 } },
    { Name: "Medium city", size: { min: 150000, max: 300000 } },
    { Name: "Large city", size: { min: 300000, max: 1000000 } },
    { Name: "Metropolis", size: { min: 1000000, max: 3000000 } },
    { Name: "Conurbation", size: { min: 3000000, max: 10000000 } },
    { Name: "Megalopolis", size: { min: 10000000, max: 9999999999 } },
  ];

  RPGenie.prototype.City = function () {
    this.Name = "CITYNAME";
    this.Type = "CityType";
    this.Population = 0;
    this.BuildingCount = 0;
    return this;
  };

  RPGenie.prototype.Item = () => {};

  RPGenie.prototype.Building = function () {
    return { Item: null };
  };

  RPGenie.prototype.Type = () => {
    let BuildingTypes = ["Organizational", "Shop", "Home"];

    let types = [];
    BuildingTypes.forEach((item, ind) => {
      let rounds = Math.round(Math.pow(ind + 1, 2 * ind));
      for (let index = 0; index < rounds; index++) {
        types.push(item);
      }
    });
    test.types = types;
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
    let qualityTypes = ["Rich", "Middle", "Poor"];
    let quality = [];
    qualityTypes.forEach((type, ind) => {
      let rounds = Math.round(Math.pow(ind + 1, 3.9));
      for (let index = 0; index < rounds; index++) {
        quality.push(type);
      }
    });
    let index = this.RandomBetween(quality.length);
    item.Quality = quality[index];
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

  RPGenie.prototype.citySize = (city) => {
    let citySizes = citySize.filter((item, index) => index < 8).reverse();

    let sizes = [];
    citySizes.forEach((item) => {
      let rounds = Math.round(Math.pow(5, 2.1));
      for (let index = 0; index < rounds; index++) {
        sizes.push(item);
      }
    });
    let size = sizes[this.RandomBetween(sizes.length)];
    let max = size.size.max - size.size.min;
    city.Population = this.RandomBetween(max) + size.size.min;
    city.BuildingCount = Math.round(
      (this.RandomBetween(max) + size.size.min) / 10
    );
    city.Type = size.Name;
    return city;
  };

  RPGenie.prototype.CityName = (city) => {
    return city;
  };

  RPGenie.prototype.cityBuild = () => {
    var city = new this.City();
    city = this.citySize(city);
    city = this.CityName(city);
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
