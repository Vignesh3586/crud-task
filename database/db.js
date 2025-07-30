const { MongoClient } = require("mongodb")

let client;
let db;

const connectDB = async () => {
    try {
        if(db){
            return db
        }
        const uri = process.env.MONGODB_URI
        client =new MongoClient(uri)
        await client.connect()
        db = client.db("mydb")
        return db
    } catch (err) {
        console.error(err.message)
    }
}

module.exports = connectDB