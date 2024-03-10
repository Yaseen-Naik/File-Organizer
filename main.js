const fs = require("fs");
const path = require("path");
let folder = path.join(__dirname, "Organise Files");

fs.access(folder, (err) => {
  if (err) {
    fs.mkdir(folder, (err) => {
      if (err) { n
        throw "Directory creation failed...";
      }
      console.log("Directory created seccessfully...");
    });
  } else {
    console.log("The Directory Already Exists...");
  }
});
files = fs.readdirSync(folder, (err) => {
  if (err) {
    throw "Reading Files Failed...";
  } else {
    console.log("Files Read Successfully...");
  }
});


files.forEach((file) => {
  let DirName = path.extname(file).slice(1);
  let newpath=path.join(folder,DirName.toUpperCase());
  let sourcePath=path.join(folder,path.basename(file),);
  let destinationPath=path.join(folder,path.extname(file).slice(1).toUpperCase(),path.basename(file));
  fs.access(newpath, (err) => {
    if (err) {
      fs.mkdir(newpath, (err) => {
        if (err) {
         console.log("Folder Already Present...");
         fs.renameSync(sourcePath,destinationPath);
        }
        else{
        console.log("Sub Directory created seccessfully...");
        fs.renameSync(sourcePath,destinationPath);
    }});
    }
    else{
        console.log("Directory Already Present...");
        fs.renameSync(sourcePath,destinationPath);
    }
  }
  
  )
});