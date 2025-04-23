const { name } = require('ejs')
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
        id:"1a",
        username:"Vivek",
        content:"I Live in Lakhani"
    },
    {
        id:"2b",
        username:"Prashant",
        content:"Hard Work Pays off!!"
    },
    {
        id:"3c",
        username:"Kartik",
        content:"I have been to Mumbai"
    }
]
app.get('/posts',(req,res)=>{
    res.render("index.ejs",{posts})
})

app.get('/posts/new',(req,res)=>{
    res.render("new.ejs")
})
app.post('/posts',(req,res)=>{
    let {username,content}=req.body
    posts.push({username,content})
    res.redirect('/posts')
})
app.get('/posts/:id',(req,res)=>{
    let {id}= req.params
    let post=posts.find((p)=>id===p.id)
    if(post){
        res.render("show.ejs",{post})
    }
    else{
        res.send("Id don't exist")
    }
})