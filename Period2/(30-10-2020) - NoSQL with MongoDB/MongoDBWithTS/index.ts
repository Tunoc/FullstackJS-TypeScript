import * as mongo from "mongodb";
require('dotenv').config()
const MongoClient = mongo.MongoClient;
const uri = process.env.CONNECTION;
var client: mongo.MongoClient;
if (uri != undefined) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}


async function insertAndReadData() {
    try {
        await client.connect();
        const db = client.db("test");
        await db.collection("inventory").deleteMany({});
        const result = await db.collection("inventory").insertOne(
            {
                item: "canvas",
                qty: 100,
                tags: ["cotton"],
                size: { h: 28, w: 35.5, uom: "cm" }
            }
        );
        // console.log("Count", result.insertedCount);
        // console.log("ID", result.insertedId);
        // console.log("Object", result.ops);
        let results = await db.collection("inventory").find(
            {}
        ).toArray();
        // console.log(results);
    } catch (err) {
        console.log("UPPS --->", err)
    }
    finally {
        client.close();
        console.log("Connection Closed")
    }
}


async function connectSetupDataAndGetDB() {
    await client.connect();
    const db = client.db("test");
    await db.collection("inventory").deleteMany({});
    await db.collection("inventory").insertMany([
        { "item": "journal", "qty": 25, "size": { "h": 14, "w": 21, "uom": "cm" }, "status": "A" },
        { "item": "notebook", "qty": 50, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "A" },
        { "item": "paper", "qty": 100, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "D" },
        { "item": "planner", "qty": 75, "size": { "h": 22.85, "w": 30, "uom": "cm" }, "status": "D" },
        { "item": "postcard", "qty": 45, "size": { "h": 10, "w": 15.25, "uom": "cm" }, "status": "A" }
    ]);
    return db;
}

async function readDataWithQueries() {
    try {
        const db = await connectSetupDataAndGetDB();
        let results = await db.collection("inventory").find(
            { status: "D" }
        ).toArray();
        // console.log("1 --->\n", results);

        results = await db.collection("inventory").find(
            { size: { h: 14, w: 21, uom: "cm" } }
        ).toArray();
        // console.log("2 --->\n", results);

        results = await db.collection("inventory").find(
            { "size.uom": "in" }
        ).toArray();
        // console.log("3 --->\n", results);
    } catch (err) {
        console.log("UPPS --->", err)
    }
    finally {
        client.close();
        console.log("Closes connection")
    }
}

async function readWithOptions() {
    try {
        const db = await connectSetupDataAndGetDB();
        let result = await db.collection("inventory").find(
            {},//The empty brackets mean "Find everything"
            {
                projection: { item: 1, qty: 1, _id: 0 },
                limit: 3,
                sort: { qty: -1 }
            } //This extra bracket is for options.
        ).toArray();
        // console.log(result);
    } catch (err) {
        console.log("UPPS --->", err)
    }
    finally {
        client.close();
        console.log("Closes connection")
    }
}

async function readDataWithOperatorsAndCompoundQueries() {
    try {
        const db = await connectSetupDataAndGetDB();
        let result = await db.collection("inventory").find(
            { "size.h": { $lt: 15 } }
        ).toArray();
        // console.log("1 --->\n", result);

        result = await db.collection("inventory").find(
            { status: "A", qty: { $lt: 30 } }
        ).toArray();
        // console.log("2 --->\n", result);

        result = await db.collection("inventory").find(
            { $or: [{ status: "A" }, { qty: { $lt: 30 } }] }
        ).toArray();
        // console.log("3 --->\n", result);

        result = await db.collection("inventory").find(
            { status: "A", $or: [{ qty: { $lt: 30 } }, { item: /^p/ }] }
        ).toArray();
        // console.log("4 --->\n", result);
    } catch (err) {
        console.log("UPPS --->", err)
    }
    finally {
        client.close();
        console.log("Closes connection")
    }
}
async function updateData() {
    try {
        const db = await connectSetupDataAndGetDB();
        let result = await db.collection("inventory").findOneAndUpdate(
            { item: "paper" },
            {
                $set: { "size.uom": "cm", status: "P" },
                $currentDate: { lastModified: true }
            },
            { returnOriginal: false }
        );
        // console.log("1 --->\n", result.value);

        const res = await db.collection("inventory").updateMany(
            { "qty": { $lt: 50 } },
            {
                $set: { "size.uom": "cm", "status": "P" },
                $currentDate: { "lastModified": true }
            }
        );
        // console.log("2 --->\n", res.modifiedCount);
    } catch (err) {
        console.log("UPPS --->", err)
    }
    finally {
        client.close();
        console.log("Closes connection")
    }

}
async function deleteData() {
    try {
        const db = await connectSetupDataAndGetDB();
        let result = await db.collection("inventory").deleteOne(
            { status: "D" }
        );
        // console.log("1 --->\n", result.deletedCount);

        result = await db.collection("inventory").deleteMany(
            { status: "A" }
        );
        // console.log("2 --->\n", result.deletedCount);
    } catch (err) {
        console.log("UPPS --->", err)
    }
    finally {
        client.close();
        console.log("Closes connection")
    }
}
// insertAndReadData();
// readDataWithQueries();
// readWithOptions();
// readDataWithOperatorsAndCompoundQueries();
// updateData();
// deleteData();