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

const setDatabase = (data, tableName, tableData, depth) => {
  if ((depth = 0)) {
    return data;
  }

  if (tableName.length > 1) {
    if (data[tableName[0]] == undefined) {
      data[tableName[0]] = {};
    }
    --depth;
    tableName.shift().split();
    return setDatabase(data[tableName[0]], tableName, tableData, depth);
  } else {
    data[tableName[0]] = tableData;
    return data;
  }
};

const result = getAllFiles("Data\\JSON");

let database = {};

result.forEach((fileName) => {
  let tableName = fileName
    .replace(`${__dirname}\\Data\\JSON\\`, "")
    .replace(".JSON", "")
    .replace("\\", "/");
  let tableData = JSON.parse(
    fs.readFileSync(fileName.replace("\\Data\\Data\\", "\\Data\\"), {
      encoding: "utf-8",
    })
  );

  database = setDatabase(database, tableName.split("/"), tableData, 5);
});

fs.writeFile("Data/database.json", JSON.stringify(database), (err) => {
  if (err) throw err;
  console.log("Json file created.");
});

let databaseFile = `let database = ${JSON.stringify(database)}`;

fs.writeFile("js/database.js", databaseFile, (err) => {
  if (err) throw err;
  console.log("database object created.");
});
