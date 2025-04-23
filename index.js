const { name } = require('ejs')
const express = require('express')
const {v4:uuidv4}= require('uuid')
const app = express()
const path= require('path')
var methodOverride= require('method-override')
const { request } = require('http')

app.use(methodOverride('_method'))
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
        id:uuidv4(),
        username:"Vivek",
        content:"I Live in Lakhani"
    },
    {
        id:uuidv4(),
        username:"Prashant",
        content:"Hard Work Pays off!!"
    },
    {
        id:uuidv4(),
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
    let id=uuidv4()
    posts.push({id,username,content})
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
app.get('/posts/edit/:id',(req,res)=>{
    let {id}= req.params
    let post=posts.find((p)=>id===p.id)
    res.render('edit.ejs',{post})
})
app.patch('/posts/edit/:id',(req,res)=>{
    let {id}= req.params
    let post=posts.find((p)=>id===p.id)
    post.content=req.body.content
    res.redirect('/posts')
})
app.delete("/posts/delete/:id",(req,res)=>{
    let {id}= req.params
    posts=posts.filter((p)=>id!==p.id)
    // post.content=req.body.content
    res.redirect('/posts')
})
