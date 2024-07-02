// import modules
import { Router } from "express";
import { addAuthor, deleteAuthor, getAllAuthors, getAuthors, updateAuthor } from "./author.controller.js";

// create router
const authorRouter = Router()

authorRouter.post('/addAuthor', addAuthor)
authorRouter.get('/getAllAuthors', getAllAuthors)
authorRouter.get('/getAuthors/:id', getAuthors)
authorRouter.put('/updateAuthor/:id', updateAuthor)
authorRouter.delete('/deleteAuthor/:id', deleteAuthor)

// export router
export default authorRouter