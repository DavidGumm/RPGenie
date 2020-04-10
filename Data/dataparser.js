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

const setDatabase = (data, tableName, tableData, depth, count) => {
  if ((depth = 0)) return data;
  if (data == undefined) data = {};

  // if (Object.getOwnPropertyNames(data)[0] == undefined) {
  //   data[currentTableName] = {};
  // }
  console.log(count);
  console.log(tableName.toString());
  --depth;
  if (tableName.length > 1) {
    data[tableName[0]] = setDatabase(
      data[tableName[0]],
      tableName.shift(),
      tableData,
      depth,
      count
    );
  } else {
    data[tableName[0]] = tableData;
    return data;
  }
};

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
  let tableData = JSON.parse(
    fs.readFileSync(fileName.replace("\\Data\\Data\\", "\\Data\\"), {
      encoding: "utf-8",
    })
  );

  database = setDatabase(database, tableName.split("\\"), tableData, -1, count);
});
let databaseFile = `let database = ${JSON.stringify(database)}`;
database = JSON.stringify(database);

console.log("\n");
console.log(`Tables parsed: ${count}`);
console.log(`Table size: ${numberWithCommas(database.length)} bytes`);
console.log("writing database...");

fs.writeFile("Data/database.json", database, (err) => {
  if (err) throw err;
  console.log("\n");
  console.log("Json file created.");
});

fs.writeFile("js/database.js", databaseFile, (err) => {
  if (err) throw err;
  console.log("\n");
  console.log("database object created.");
});
