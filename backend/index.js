import express from "express";
import cors from 'cors'
import mysql from 'mysql'
const app = express()

app.use(express.json({ extend: true, limit: '30mb' }))
app.use(express.urlencoded({ extend: true, limit: '30mb' }))
app.use(cors())

const db = mysql.createConnection({
  host:"sql.freedb.tech",
  user:"freedb_booksUser",
  password:"Yn8eTUF*sTZ3pmA",
  database:"freedb_booksDB"
})
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "test"
// })
// if there is auth problem, run this code in db
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

app.get("/", (_, res) => {
  res.json("Welcome to backend CRUD from Lama")
})

app.get("/books", (_, res) => {
  const q = "SELECT * FROM books"
  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.json(data)
  })
})

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)"
  const values = [req.body.title, req.body.desc, req.body.cover, req.body.price]
  db.query(q, [values], (err, _) => {
    if (err) return res.json(err)
    return res.json("Successful")
  })
})

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id
  const q = "DELETE FROM books WHERE id = ?"
  db.query(q, [bookId], (err, _) => {
    if (err) return res.json(err)
    return res.status(200).json("Delete successful")
  })
})

app.put("/books/:id", (req, res) => {
  const { title, desc, cover, price } = req.body
  const bookId = req.params.id
  const values = [title, desc, cover, price]
  const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ?, `price` = ?  WHERE `id` = ?"
  db.query(q, [...values, bookId], (err, _) => {
    if (err) return res.json(err)
    return res.json("Update successfully")
  })
})


app.listen(8800, () => console.log("Backend running"))
