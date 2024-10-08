import express from "express"
import cors from "cors"
const PORT = 5000
import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://itsmeathul:%23naPfQ63KuhkPa%40@itsmeathul.wwgy9.mongodb.net/?retryWrites=true&w=majority&appName=ItsmeAthul")
let todolists;
const main=async()=>{
    await client.connect()
    console.log("connected with mongodb")
    todolists = client.db("tododatabase").collection("todolists")
}

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
    const data = await todolists.find().toArray()
    res.send({
        status: 200,
        data
    })
})

app.post("/", async(req, res) => {
    let ipvalue = req.body.ipvalue
    await todolists.insertOne({ipvalue})
    res.status(200).json({ status: true })
})

app.put("/", async(req, res) => {
    const { ipvalue } = req.body
    const  index  = req.query.index
    await todolists.updateOne({_id:new ObjectId(index)},{$set:{ipvalue}})
    res.status(200).json({ status: true })
})

app.delete("/:index", async(req, res) => {
    const { index } = req.params
    await todolists.deleteOne({_id:new ObjectId(index)})
    res.status(200).json({ status: true })
})

const startserver=async()=>{
    await main()
    app.listen(PORT, () => {
        console.log(`server started on port no ${PORT}`);
    })
}
startserver()
