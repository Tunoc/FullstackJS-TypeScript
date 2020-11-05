require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.CONNECTION;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function mongoTest() {
    try {
        await client.connect();
        const dogs = client.db("kennel");
        const dogsCollection = dogs.collection("dogs");
        //await dogsCollection.insertMany([{ name: "Togo" }, { name: "Fido" }, { name: "Tut", race: "dog" }]);
        //await dogsCollection.insertOne({ name: "Bork boi" });
        const allDogs = await dogsCollection.find({}).toArray();
        console.log(allDogs);
    } catch (error) {
        console.log(error)
    } finally {
        client.close();
        console.log("Closed connection to db..");
    }
}
mongoTest();