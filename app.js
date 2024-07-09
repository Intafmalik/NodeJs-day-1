const express = require("express");
const { connect } = require("mongoose");
const connectToDb = require("./database/databaseConnection");
const Blog = require("./database/schemas");

const app = express()
var PORT = 3000;

// const multer = require("./midleware/multerConfig").multer
// const storage = require("./middleware/multerConfig").storage

const {multer,storage} = require("./midleware/multerConfig")

const upload = multer({
    storage: storage
})
app.set("view engine", "ejs")
app.set("views", "./views")

connectToDb()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/createblog",(req,res)=>{
    res.render("day2form")
} )

app.post("/createblog", upload.single("image"), async(req,res)=>
{
 
   const file = req.file
   console.log(file)
   const filename = req.file.filename

    const {title,subtitle,description}=req.body
    console.log({title,subtitle,description})
    await Blog.create({
   title,
   subtitle,
   description,
   image:filename
    });
    res.send("Blog created sucessfully")
})

app.use(express.static("./storage"))

app.get("/card", async (req,res)=>{
    const blogs = await Blog.find() // always return arrays
    res.render("day3form",{blogs})
// res.render("day3form",{blogs})
})


app.get("/createblog",(req,res)=>{
res.render("day2form")
})

const form = {name : "Acess Form"}

app.get("/form",(req,res)=>{

res.render("about", {form})
console.log("hello")
})

app.listen(PORT,()=>{
    console.log(`This is server is started at http://localhost:${PORT} `)
})
