const express = require("express");
const { connect } = require("mongoose");
const connectToDb = require("./database/databaseConnection");
const Blog = require("./database/schemas");
const bcrypt = require("bcrypt")
const UserCollection = require("./database/schemase1")
const env = require("dotenv")
const jwt = require("jsonwebtoken")
// const cookisparser = require("cookie-parser")
// app.use(cookisparser())

env.config()
const app = express()
var PORT = 3000;

// const multer = require("./midleware/multerConfig").multer
// const storage = require("./middleware/multerConfig").storage

const { multer, storage } = require("./midleware/multerConfig");
const { name } = require("ejs");

const upload = multer({ storage: storage })
app.set("view engine", "ejs")
app.set("views", "./views")

connectToDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static("./storage"))

app.get("/createblog", (req, res) => {
    res.render("day2form")
})

app.post("/createblog", upload.single("image"), async (req, res) => {

    const file = req.file
    console.log(file)
    // const filename = req.file.filename
    const filename = file.filename

    const { title, subtitle, description } = req.body
    console.log({ title, subtitle, description })
    await Blog.create({
        title,
        subtitle,
        description,
        image: filename
    });
    res.send("Blog created sucessfully")
})

app.get("/blogcard/:id", async (req, res) => {
    const id = req.params.id

    // console.log(id)
    const blog = await Blog.findById(id)
    // console.log(blog)
    res.render("blogtitle", { clickblog: blog })
})



app.get("/card", async (req, res) => {
    const blogs = await Blog.find() // always return arrays
    res.render("day3form", { blogs })
})

app.get("/deleteblog/:id", async (req, res) => {
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.redirect("/card")
})

//chrome ma render garni
app.get("/editblog/:id", async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
    res.render("editBlog", { blog })

})

// db update garni
app.post("/editblog/:id", async (req, res) => {
    const id = req.params.id;
    console.log(req.body)
    await Blog.findByIdAndUpdate(id, { ...req.body });
    // res.send("BLog Updated")
    res.redirect("/card")

});

app.get("/register",(req,res)=>{
    res.render("register")
})
app.get("/login", (req,res)=>{
    res.render("registerLogin")

})

app.post("/register", async (req,res)=>{
    const {username,email,password} = req.body
     
    await UserCollection.create ({
        name: username,
        email: email,
        password : bcrypt.hashSync(password,12)
    }
)
    res.redirect("/login")

})


app.post("/login", async(req,res)=>{
    const {email,password} = req.body;
   
    const user= await UserCollection.findOne({email : email})
    
    if(!user)
    {
        res.send("Invalid Password")

    }
    else{
        const isMatched = bcrypt.compareSync(password,user.password)

        if(!isMatched)
        {
            res.send("Invalid Password")
        }
        else{
            const token =  jwt.sign({userID:user._id},process.env.SECRET,{expiresIn: "20d"})
            res.cookie("token",token)
            res.send("Logged in succesfully")
        }
    }
})

app.get("")

app.use(express.static("./storage"))

app.get("/card", async (req, res) => {
    const blogs = await Blog.find() // always return arrays
    res.render("day3form", { blogs })
})



app.get("/createblog", (req, res) => {
    res.render("day2form")
})



const form = { name: "Acess Form" }

app.get("/form", (req, res) => {

    res.render("about", { form })
    console.log("hello")
})

app.listen(PORT, () => {
    console.log(`This is server is started at http://localhost:${PORT} `)
})
