require("dotenv").config();
const azure = require("azure-storage");
const fs = require("fs");
const path = require("path");

const srcDir = "dist/";
const blobService = azure.createBlobService();
const containerName = "$web";

fs.readdir(srcDir, function (_err, items) {
  for (let i = 0; i < items.length; i++) {
    const srcFilePath = path.join(srcDir, items[i]);

    (function (srcFilePath, filename) {
      blobService.createBlockBlobFromLocalFile(
        containerName,
        filename,
        srcFilePath,
        function (error, _result, _response) {
          if (!error) {
            console.log("Uploaded " + filename);
          } else {
            console.log(
              "Couldn't upload file " + filename + ", encountered an error: ",
              error
            );
          }
        }
      );
    })(srcFilePath, items[i]);
  }
});