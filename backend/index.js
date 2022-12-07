import express from "express"; 
import cors from 'cors'
import mysql from 'mysql'
const app = express()

app.use(express.json({extend:true,limit:'30mb'}))
app.use(express.urlencoded({extend:true,limit:'30mb'}))
app.use(cors())

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"password",
  database:"test"
})
// if there is auth problem, run this code in db
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

app.get("/",(req,res)=>{
  res.json("Hello")
})

app.get("/books",(req,res)=>{
  const q = "SELECT * FROM books"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.listen(8800,()=>console.log("Backend running"))
