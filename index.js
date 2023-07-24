
const express = require("express")
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require("cors")
const app = express()
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json())


app.get("/", (req, res)=>{
    res.send("Hello world")
})

// AdmissionHub2121
// yK92X1ipb1Y7e2sk



const uri = "mongodb+srv://AdmissionHub2121:yK92X1ipb1Y7e2sk@cluster0.hmmbger.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    const collageCollection = client.db("AdmissionHUb").collection("Collages")

    const feedbackCOllection = client.db("AdmissionHub").collection("feedback")

    app.get("/collage", async (req, res)=>{
      const result = await collageCollection.find().toArray();
      res.send(result)
    })

    app.get("/feedbacks", async(req, res)=>{

      const result = await feedbackCOllection.find().toArray()
      res.send(result)
    })

    app.get("/collage/:id", async(req, res)=>{

      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await collageCollection.findOne(query);
      res.send(result)
    })

    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, ()=>{
    console.log(`Admission server running on ${port}`);
})