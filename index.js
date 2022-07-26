const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.qemdz.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
// DB_USER=Nisharga
// DB_PASSWORD=aDj8QSwONIMYsWtK
// async function run() {
//   try {
//     await client.connect();
//     const dbCollectionProfile = client.db("Glue-gun").collection("profile");
//     console.log("database connect");
//     app.post("/user", async (req, res) => {
//       const data = req.body;
//       console.log(data);
//   const result = await dbCollectionProfile.insertOne(data);
//   res.send("data paisi res e");
//   console.log(result, "gese data all");
//     });
//   } finally {
//   }
//   run().catch(console.dir);
// }

app.get("/", (req, res) => {
  res.send("I love u and not love u xcss");
});

app.get("/maa", (req, res) => {
  res.send("I love u maa");
});

app.listen(port, () => {
  console.log("port listen");
});

async function run() {
  try {
    await client.connect();
    const dbCollection = client.db("glueganserver").collection("user");
    const reviewCollection = client.db("glueganserver").collection("review");
    // insertOne signup-user to database
    app.put("/user", async (req, res) => {
      const data = req.body;
      const result = await dbCollection.insertOne(data);
      console.log(result, "user create on db");
    });
    // insertOne signup-user to database end

    // insertOne review to database
    app.put("/dashboard/addareview/:email", async (req, res) => {
      const data = req.body;

      console.log(data, "review update on db");
    });
    // insertOne review to database endconst result = await reviewCollection.insertOne(data);

    // update a field by id
    app.post("user/:email", (req, res) => {
      const body = req.body;
      res.send(body, req.body.email);
      console.log(
        "🚀 ~ file: index.js ~ line 68 ~ app.put ~ quantity",
        quantity
      );

      //   const filter = { _id: ObjectId(id) };
      //   const options = { upsert: true };
      //   const result = await dbCollection.updateOne(
      //     filter,
      //     { $set: { quantity: quantity } },
      //     options
      //   );
      //   res.send(result);
    });
    // update a field by id
  } finally {
    //        await client.close()
  }
}
run().catch(console.dir);
