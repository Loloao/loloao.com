const fs = require("fs");
const path = require("path");

const parseRegExp = /\-\-\-.*?\-\-\-/s;

const traverseNotes = (dir, fn) => {
  const files = fs.readdirSync(dir);
  files.forEach((v, i) => {
    const currentPath = `${dir}/${v}`;
    const stat = fs.statSync(currentPath);
    if (stat.isDirectory()) {
      traverseNotes(currentPath, fn);
    } else if (stat.isFile()) {
      const fileExt = path.extname(v);
      if (fileExt === ".md") {
        // console.log(fsContent, 'fsContent')
        // clearFileImportScss(currentPath)
        fs.readFile(currentPath, { encoding: "utf-8" }, (err, data) => {
          if (err) console.log(err, "err");
          data && fn(data, currentPath);
        });
      }
    } else {
      return;
    }
  });
};

const getCompiledHeader = (data) => {
  const headConfig = data.match(parseRegExp);
  const headLine = headConfig[0].split("\n").slice(1, -1);
  const headConfigObj = new Map();
  headLine.forEach((v) => {
    const keyValue = v.split(":");
    let [key, value] = keyValue;
    try {
      value = JSON.parse(value);
    } catch {}
    headConfigObj.set(key, value);
  });

  return headConfigObj;
};

const getReplaceHeaderData = (data, headConfigObj) => {
  let headStr = "---\n";
  headConfigObj.forEach((v, i) => {
    headStr = headStr + `${i}: ${JSON.stringify(v)}\n`;
  });
  headStr = headStr + "---";

  const newData = data.replace(parseRegExp);
  return newData;
  // return headStr;
};

const removeUselessAttr = (data, currentPath) => {
  const headConfigObj = getCompiledHeader(data);
  headConfigObj.set("type", "note");
  const newData = getReplaceHeaderData(data, headConfigObj);
  fs.writeFile(currentPath, newData, { encoding: "utf-8" }, (err) => {
    if (err) console.error(currentPath, "写入错误");
  });
};

traverseNotes(path.join(__dirname, "../notes"), removeUselessAttr);
