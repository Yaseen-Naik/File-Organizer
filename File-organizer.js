const fs = require("fs");
const path = require("path");
const folder = path.join(__dirname, "Organise Files");
fs.access(folder, (err) => {
  if (err) {
    fs.mkdir(folder, (err) => {
      if (err) {
        console.error("Directory creation failed:", err);
        return;
      }
      console.log("Directory created successfully...");
      readAndOrganizeFiles(folder);
    });
  } else {
    console.log("The Directory Already Exists...");
    readAndOrganizeFiles(folder);
  }
});

function readAndOrganizeFiles(folder) {
  fs.readdir(folder, (err, files) => {
  if (err) {
      console.error("Reading Files Failed:", err);
      return;
    }
    console.log("Files Read Successfully...");
    organizeNextFile(files, 0, folder);
  });
}

function organizeNextFile(files, index, folder) {
  if (index >= files.length) {
    console.log("All files organized successfully.");
    return;
  }

  const file = files[index];
  const extName = path.extname(file).slice(1);
  if (extName) {
    const newpath = path.join(folder, extName.toUpperCase());
    const sourcePath = path.join(folder, file);
    const destinationPath = path.join(newpath, file);

  fs.access(newpath, (err) => {
    if (err) {
      fs.mkdir(newpath, (err) => {
        if (err) {
            console.error("Sub Directory creation failed:", err);
            return;
        }
        console.log("Sub Directory created successfully...");
        moveFile(sourcePath, destinationPath, () => {
          organizeNextFile(files, index + 1, folder);
        });
      });
    } else {
      moveFile(sourcePath, destinationPath, () => {
        organizeNextFile(files, index + 1, folder);
      });
    }
  });
} else {
  organizeNextFile(files, index + 1, folder);
}
}

function moveFile(sourcePath, destinationPath, callback) {
fs.rename(sourcePath, destinationPath, (err) => {
  if (err) {
    console.error("File move failed:", err);
    return;
  }
  console.log("File moved successfully...");
  callback();
});
}