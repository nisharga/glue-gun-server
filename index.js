const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
  res.send("mI love u PUT");
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
    const orderCollection = client.db("glueganserver").collection("order");
    // insertOne signup-user to database
    app.put("/user", async (req, res) => {
      const data = req.body;
      const result = await dbCollection.insertOne(data);
      console.log(result, "user create on db");
    });
    // insertOne signup-user to database end

    // insertOne product to database
    app.post("/addproduct", async (req, res) => {
      const data = req.body;
      const result = await productCollection.insertOne(data);
      console.log(result, "product create on db");
    });
    // insertOne product to database end.

    // insertOne order to database
    app.post("/purchase/order", async (req, res) => {
      const data = req.body;
      const result = await orderCollection.insertOne(data);
      console.log(result, "product order on db");
    });
    // insertOne order to database end.

    // find user order by email-address
    app.get("/myitems/:id", async (req, res) => {
      const id = req.params.id;
      const query = { email: id };
      const cursor = orderCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    // find user order by email-address end

    // delet a product from orderCollection by _id
    app.delete("/myitems/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await orderCollection.deleteOne(query);
      if (result.deletedCount === 1) {
        console.log("Sucessfully deleted ");
      }
      res.send(result);
    });
    // delet a product from orderCollection by _id

    // show all product to ui(inventory page)
    app.get("/allproduct", async (req, res) => {
      const query = {};
      const cursor = productCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    //  show all product to ui inventory page end

    // show product to single product
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const cursor = productCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    //  show product to single product

    // insertOne review to database
    app.post("/dashboard/addareview", async (req, res) => {
      const data = req.body;
      const result = await reviewCollection.insertOne(data);
      console.log(result, "review createon db");
    });
    // insertOne review to database end.

    // show all review to ui
    app.get("/review", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    //  show all review to ui

    // profile details on to ui
    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { email: id };
      const data = req.body;
      const update = { $set: data };
      const options = { upsert: true };
      const result = await dbCollection.updateMany(query, update, options);
      console.log(data, "profile details updated");
    });
    //  profile details end

    // find user details by email-address
    app.get("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { email: id };
      const cursor = dbCollection.find(query);
      const data = await cursor.toArray();
      res.send(data);
    });
    // find user details by email-address end
  } finally {
    //        await client.close()
  }
}
run().catch(console.dir);
