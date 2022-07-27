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

app.get("/", (req, res) => {
  res.send("I love u and not love u form BANGLADESH");
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
    const productCollection = client.db("glueganserver").collection("product");
    // insertOne signup-user to database
    app.put("/user", async (req, res) => {
      const data = req.body;
      const result = await dbCollection.insertOne(data);
      console.log(result, "user create on db");
    });
    // insertOne signup-user to database end

    // insertOne product to database
    app.put("/product", async (req, res) => {
      const data = req.body;
      const result = await productCollection.insertOne(data);
      console.log(result, "product create on db");
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
