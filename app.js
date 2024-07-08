const express = require("express");
const { connect } = require("mongoose");
const connectToDb = require("./database/databaseConnection");
const Blog = require("./database/schemas");

const app = express()
var PORT = 3000;

app.set("view engine", "ejs")
app.set("views", "./views")

connectToDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post("/createblog", async(req,res)=>
{

    const {title,subtitle,description}=req.body
    console.log({title,subtitle,description})
    await Blog.create({
   title,
   subtitle,
   description
    });
    res.send("Blog created sucessfully")
})


app.get("/createblog",(req,res)=>{
res.render("day2form")
})

const form = {name : "Acess Form"}

app.get("/intaf",(req,res)=>{

res.render("about", {form})
console.log("hello")
})

app.listen(PORT,()=>{
    console.log(`This is server is started at http://localhost:${PORT} `)
})
