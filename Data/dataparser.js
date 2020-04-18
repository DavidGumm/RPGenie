const fs = require("fs");
const path = require("path");

const getAllFiles = (dirPath, arrayOfFiles) => {
  files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
    }
  });
  return arrayOfFiles;
};

//
//
//
//
//

const setDatabase = (data, Name, subData, depth, count) => {
  if (depth == 0) return data;

  if (Name.length > 1) {
    Name.shift();
    if (data[Name[0]] === undefined) data[Name[0]] = {};
    data[Name[0]] = setDatabase(data[Name[0]], Name, subData, --depth, count);
  } else {
    let tableName = Object.getOwnPropertyNames(subData)[0];
    let tableData = subData[tableName];
    data[tableName] = tableData;
  }
  return data;
};

//
//
//
//
//

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const result = getAllFiles("Data\\JSON");

let database = {};
let count = 0;

result.forEach((fileName) => {
  ++count;

  let tableName = fileName
    .replace(`${__dirname}\\Data\\JSON\\`, "")
    .replace(".JSON", "");
  fileName = fileName.replace("\\Data\\Data\\", "\\Data\\");

  let tableData = JSON.parse(
    fs.readFileSync(fileName, {
      encoding: "utf-8",
    })
  );

  database = setDatabase(database, tableName.split("\\"), tableData, -1, count);
});
let databaseString = JSON.stringify(database);
let databaseFile = `let database = ${databaseString}`;

console.log(`
  Tables parsed: ${count}
  Tables Keys: ${Object.getOwnPropertyNames(database).length}
  Table size: ${numberWithCommas(databaseString.length)} bytes
  writing database...
`);

fs.writeFile("Data/database.json", databaseString, (err) => {
  if (err) throw err;
  console.log(`
  Json file created.`);
});

fs.writeFile("js/database.js", databaseFile, (err) => {
  if (err) throw err;
  console.log(`
  database object created.`);
});
