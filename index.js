const express = require('express')
const app = express()
const path= require('path')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set("view engine","ejs")
app.set("views",path.join(__dirname,'/views'));

app.use(express.static(path.join(__dirname,'/public')))

const port = 8080
app.listen(port,()=>{
    console.log("Server is listening at: ",port)
})

let posts=[
    {
        username:"Vivek",
        content:"I Live in Lakhani"
    },
    {
        username:"Prashant",
        content:"Hard Work Pays off!!"
    },
    {
        username:"Kartik",
        content:"I have been to Mumbai"
    }
]
app.get('/posts',(req,res)=>{
    res.render("index.ejs",{posts})
})


