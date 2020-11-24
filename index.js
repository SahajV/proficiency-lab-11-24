const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const app = express();

const dbName = "sample_mflix";
const uri =
  "mongodb+srv://dbUser:beimzy8xSTwp7iAJ@cluster0.byjdq.mongodb.net?w=majority";

MongoClient.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      console.log(err);
      throw err;
    }

    console.log("Connected successfully to Mongodb");

    const db = client.db(dbName);

    app.locals.db = db;

    const port = process.env.PORT || 8000;
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  }
);

app.get("/", (req, res) => {
  res.send("whats popping");
});

app.get("/movie", async (req, res) => {
  const db = req.app.locals.db;

  const movie = await db
    .collection("movies")
    .aggregate([{ $sample: { size: 1 } }])
    .toArray();

  res.send(movie);
});
