// import modules
import { Router } from "express";
import { addBook, deleteBook, getAllBooks, getBook, updateBook } from "./book.controller.js";

// create router
const bookRouter = Router()

bookRouter.post('/addBook', addBook)
bookRouter.get('/getAllBooks', getAllBooks)
bookRouter.get('/getBook/:id', getBook)
bookRouter.put('/updateBook/:id', updateBook)
bookRouter.delete('/deleteBook/:id', deleteBook)

// export router
export default bookRouter