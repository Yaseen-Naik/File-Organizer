const fs = require("fs");
const path = require("path");

// Define the folder to organize
let folder = path.join(__dirname, "Organise Files");

// Check if the folder exists
fs.access(folder, (err) => {
  if (err) {
    // If the folder does not exist, create it
    fs.mkdir(folder, (err) => {
      if (err) {
        throw new Error("Directory creation failed...");
      }
      console.log("Directory created successfully...");
    });
  } else {
    console.log("The Directory Already Exists...");
  }
});

// Read the files in the folder
fs.readdir(folder, (err, files) => {
  if (err) {
    throw new Error("Reading Files Failed...");
  } else {
    console.log("Files Read Successfully...");
    files.forEach((file) => {
      let extName = path.extname(file).slice(1);
      if (extName) {
        let newpath = path.join(folder, extName.toUpperCase());
        let sourcePath = path.join(folder, file);
        let destinationPath = path.join(newpath, file);

        // Check if the extension-based directory exists
        fs.access(newpath, (err) => {
          if (err) {
            // If the directory does not exist, create it
            fs.mkdir(newpath, (err) => {
              if (err) {
                console.log("Sub Directory creation failed...");
              } else {
                console.log("Sub Directory created successfully...");
                fs.rename(sourcePath, destinationPath, (err) => {
                  if (err) {
                    console.log("File move failed...");
                  } else {
                    console.log("File moved successfully...");
                  }
                });
              }
            });
          } else {
            // If the directory exists, move the file
            fs.rename(sourcePath, destinationPath, (err) => {
              if (err) {
                console.log("File move failed...");
              } else {
                console.log("File moved successfully...");
              }
            });
          }
        });
      }
    });
  }
});
