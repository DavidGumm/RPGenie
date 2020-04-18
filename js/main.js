const RPGenie = function (seed) {
  RPGenie.prototype.seed = new Math.seedrandom(seed);

  RPGenie.prototype.RandomBetween = function (max) {
    return Math.floor(this.seed() * Math.floor(max));
  };

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
        let superSubtype = [
          "Single family",
          "Townhome",
          "Cottage",
          "Multi-family",
          "Carriage/Coach house",
          "Tiny home",
          "Mansion",
          "Chateau",
          "Villa",
          "Manor",
        ];
        break;
      case "Organizational":
        subtype = ["Government", "Guild", "Religious"];
        let govBuilding = ["Castle", "Palace", "Fort", "Tower", ""];
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
        names = database._OldTables[building.subtype].BrothelName.Items;
        break;
      case "Tavern":
      case "Inn":
      case "Restaurant":
        names = database._OldTables["Tavern"].TavernSeedyNames.Items;
        break;
      case "Guild":
        names = database._OldTables[building.subtype].GuildGenerator.Items;
        break;
      case "Religious":
        names = database._OldTables["Religion"].ReligiousBuildingType.Items;
        break;
      default:
        names = [""];
        break;
    }
    building.name = names[this.RandomBetween(names.length)];
    return building;
  };

  RPGenie.prototype.citySize = (city) => {
    let citySizes = database.settings.CitySize.reverse();

    let sizes = [];
    citySizes.forEach((item) => {
      let rounds = item.Probability * 1000;
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
