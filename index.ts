import { connect } from "./connect";
import express from "express";
import {Request,Response} from "express"
import { students } from "./schema";
import { data_check } from "./middleware";


const App = express()

App.use(express.json())

App.get("/",async (req:Request,res:Response) =>
{
    let student = await students.find()
    res.send(student)
})

App.get("/:id",async(req:Request,res:Response) =>
{
    let {id} = req.params
    let std= await students.findById(id)
    res.send(std)
    
})

App.post("/",data_check,async (req:Request,res:Response) =>
{
    let data = await students.create(req.body)
    res.send(data)
}) 

App.delete("/:id", async (req:Request,res:Response) =>
{
    let {id} = req.params
    let Delete = await students.findByIdAndDelete(id)
    res.send(Delete)
})

App.patch("/:id",async (req:Request,res:Response) =>
{
    let {id} = req.params
    let update = req.body
    let data_update = await students.findByIdAndUpdate(id,update)
    res.send(data_update)
})
App.listen(4000,() =>
{
    console.log("Server Is Running");
    connect()
})