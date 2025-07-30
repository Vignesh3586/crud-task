const connectDB = require("../database/db")


const changeStatus=async(req,res)=>{
    const { id } = req.params
    const { status } = req.body
    try {
        const db=await connectDB()
        const tasks=db.collection("tasks")
        if (id) {
            await tasks.updateOne({ id: Number(id) }, { $set: { status: status } })
            res.status(200).send({ message: "Status changed succesfully" })
        } else {
            throw new Error("Id is missing")
        }
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
}

const getTaskById=async(req,res)=>{
     const {id}=req.params
      try {
        const db=await connectDB()
        const tasks=db.collection("tasks")
        const task= await tasks.findOne({id:Number(id)})
        if (task) {
            res.status(200).send(task)
        } else {
            throw new Error("Data not found")
        }
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
}

const getAllList = async (req, res) => {
    try {
        const db=await connectDB()
        const tasks=db.collection("tasks")
        const allTasks = await tasks.find().toArray()
        if (allTasks) {
            res.status(200).send(allTasks)
        } else {
            throw new Error("Data not found")
        }
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
}

const createTask = async (req, res) => {
    const { id, taskName, date, status } = req.body
    try {
        const db=await connectDB()
        const tasks=db.collection("tasks")
        const task = { id, taskName, date, status }
        if (task) {
            await tasks.insertOne(task)
            res.status(201).send({ message: "Task inserted succesfully" })
        } else {
            throw new Error("Body data is missing")
        }
    } catch (err) {
        res.status(404).send({ message: err.message })
    }


}

const editTask = async (req, res) => {
    const { id } = req.params
    const { taskName, date, status } = req.body
    try {
        const db=await connectDB()
        const tasks=db.collection("tasks")
        if (id) {
            await tasks.updateOne({ id: Number(id) }, { $set: { taskName: taskName, date: date, status: status } })
            res.status(200).send({ message: "Task updated succesfully" })
        } else {
            throw new Error("Id is missing")
        }
    } catch (err) {
        res.status(404).send({ message: err.message })
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params
    try {
        const db=await connectDB()
        const tasks=db.collection("tasks")
        if (id) {
            await tasks.deleteOne({ id: Number(id) })
            res.status(200).send({ message: "Task deleted succesfully" })
        } else {
            throw new Error("Id is missing")
        }
    } catch (err) {
        res.status(404).send({ message: err.message })
    }

}

module.exports={getAllList,createTask,editTask,deleteTask,changeStatus,getTaskById}