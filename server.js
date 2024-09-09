/*const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://condeferriarthur:<1234>@arthur.ewjyj.mongodb.net/?retryWrites=true&w=majority&appName=arthur";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

*/

// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Conectar ao MongoDB Atlas
const mongoURI = 'mongodb+srv://condeferriarthur:1234@arthur.ewjyj.mongodb.net/?retryWrites=true&w=majority&appName=arthur';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Definir o schema e o modelo
const historySchema = new mongoose.Schema({
  userId: String,
  action: String,
  timestamp: { type: Date, default: Date.now }
});

const History = mongoose.model('History', historySchema);

// Endpoint para registrar ações
app.post('/api/history', async (req, res) => {
  try {
    const { userId, action } = req.body;

    if (!userId || !action) {
      return res.status(400).json({ error: 'userId and action are required' });
    }

    const newHistory = new History({
      userId,
      action
    });

    await newHistory.save();

    res.status(201).json({ message: 'Action recorded successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

