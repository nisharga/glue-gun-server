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
    // insertOne signup-user to database end
  } finally {
    //        await client.close()
  }
}
run().catch(console.dir);
