const express = require("express");
const { connect } = require("mongoose");
const connectToDb = require("./database/databaseConnection");

const app = express()
var PORT = 3000;

app.set("view engine", "ejs")
app.set("views", "./views")

connectToDb()

// const nameAge = {
//     name: "Ram",
//     age: 20
// }

const form = {name : "Acess Form"}

app.get("/intaf",(req,res)=>{

res.render("about", {form})
console.log("hello")
})

app.listen(PORT,()=>{
    console.log(`This is server is started at http://localhost:${PORT}/intaf `)
    // console.log("The Server is started at " + 30000)
})
