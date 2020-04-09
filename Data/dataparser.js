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

const setDatabase = (data, tableName, tableData) => {
  if (tableName > 0) {
    data = data[tableName[0]];
    data = setDatabase(data, tableName.shift().split(), tableData);
  } else {
    data[tableName[0]] = tableData;
  }
  return data;
};

const result = getAllFiles("Data\\JSON");
let database = {};

result.forEach((fileName) => {
  let tableName = fileName
    .replace(`${__dirname}\\Data\\JSON\\`, "")
    .replace(".JSON", "")
    .replace("\\", "/");
  let tableData = JSON.parse(
    fs.readFileSync(fileName.replace("\\data\\Data\\", "\\Data\\"), {
      encoding: "utf-8",
    })
  );

  database = setDatabase(database, tableName.split("/"), tableData);
});

fs.writeFile("Data/database.json", JSON.stringify(database), (err) => {
  if (err) throw err;
  console.log("Json file created.");
});

let databaseFile = `let database = {${JSON.stringify(database)}}`;

fs.writeFile("js/database.js", databaseFile, (err) => {
  if (err) throw err;
  console.log("database object created.");
});
