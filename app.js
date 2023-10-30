import express from "express"
import "dotenv/config.js"
import bodyParser from "body-parser"
import {getTasks, getTask, createTask, updateTask, deleteTask} from "./tasks.js"

const app = express()
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/v1/tasks", async(req, res)=>{
    try{
        res.json(await getTasks())
    }catch(error){
        console.log(error)
        res.status(400).json("Something went wrong")
    }
})

app.post("/api/v1/tasks", async (req,res)=>{
    try{
        await createTask(req.body.content)
        res.json(await getTasks())
    }catch(error){
        console.log(error)
        res.status(404).json("Something went wrong")
    }
})
app.get("/api/v1/tasks/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        res.json(await getTask(id))
    }catch(error){
        console.log(error)
    }
})
app.patch("/api/v1/tasks/:id", async (req,res)=>{
    try{
        const id = req.params.id;
        await updateTask(req.body.content, id)
        res.json(await getTasks())
    }catch(error){
        console.log(error)
    }
})

app.delete("/api/v1/tasks/:id", async (req, res)=> {
    try{
        const id = req.params.id;
        await deleteTask(id);
        res.json(await getTasks());
    }catch(error){
        console.log(error)
        res.status(400).json("Something went wrong")
    }

})


app.listen(port, ()=>{
    console.log(`the server is listening on port ${port}...`)
})