// import modules
import express from 'express'
import { connectDB } from './db/connection.js'
import bookRouter from './src/modules/book/book.router.js'
import authorRouter from './src/modules/author/author.router.js'

// create server 
const app = express()
const port = 3000
app.use(express.json())

connectDB()

app.use('/book',bookRouter)
app.use('/author',authorRouter)

// listen to server
app.listen(port,()=>{
    console.log("server is running in port...",port);
})