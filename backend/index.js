import express from "express"; 
import cors from 'cors'
import mysql from 'mysql'
const app = express()

app.use(express.json({extend:true,limit:'30mb'}))
app.use(express.urlencoded({extend:true,limit:'30mb'}))
app.use(cors())

const db = mysql.createConnection({
  host:"sql.freedb.tech",
  user:"freedb_booksUser",
  password:"?sfzZ8yHr8Q@RSV",
  database:"freedb_booksDB"
})
// if there is auth problem, run this code in db
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

app.get("/",(_,res)=>{
  res.json("Welcome to backend CRUD from Lama")
})

app.get("/books",(_,res)=>{
  const q = "SELECT * FROM books"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.post("/books",(req,res)=>{
  const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)"
  const values = [ req.body.title, req.body.desc, req.body.cover, req.body.price ]
  db.query(q,[values],(err,_)=>{
    if(err) return res.json(err)
    return res.status(201)
  })
})

app.delete("/books/:id",(req,res)=>{
  const boodId = req.params.id
  const q = "DELETE FROM books WHERE id = ?"
  //const q = "UPDATE books SET (`title`,`desc`,`cover`,`price`)  WHERE (`id` = '2')"
  db.query(q,[boodId],(err,_)=>{
    if(err) return res.json(err)
    return res.status(200).json("Delete success")
  })
})

app.put("/book/:id",(req,_)=>{
  const {title,desc,cover} = req.body
  const boodId = req.params.id
  const values = [title,desc,cover,boodId]
  const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ? WHERE id = ?"
  db.query(q,[values],(res,_)=>{
    if(err) return res.json(err)
    return res.json("update successfully")
  })
})


app.listen(8800,()=>console.log("Backend running"))
