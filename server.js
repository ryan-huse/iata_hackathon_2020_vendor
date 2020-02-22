const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const {
  BlobServiceClient,
  StorageSharedKeyCredential
} = require("@azure/storage-blob");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get("/api/gets", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/api/world", async (req, res) => {
  const account = "iatahackathonstorage";
  const accountKey =
    "tDmDvkKhrTDPIf3WuM40GfVuDefqc3YC41mcU39UkHn2GZrDZ09bLRV4fIpDLTylK5dWeNiESKY58DfmZU2bAg==";
  // const defaultAzureCredential = new DefaultAzureCredential();
  const sharedKeyCredential = new StorageSharedKeyCredential(
    account,
    accountKey
  );

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    sharedKeyCredential
  );

  const containerName = "requests";

  const containerClient = blobServiceClient.getContainerClient(containerName);

  const content = req.body.post;
  const blobName = req.body.barcodeID + "/" + req.body.date;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(
    content,
    content.length,
    {
      metadata: {
        photographer: req.body.photographer,
        airline: req.body.airline
      }
    }
  );
  console.log(
    `Upload block blob ${blobName} successfully`,
    uploadBlobResponse.requestId
  );
  res.send(
    `Upload block blob ${blobName} successfully ${uploadBlobResponse.requestId}`
  );
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
