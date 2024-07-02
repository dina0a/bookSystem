// import modules
import { Schema, model } from "mongoose";

// schema
const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedDate: {
        type: String,
        required: true,
        default: () => new Date().toISOString().split('T')[0] // Sets default to current date in YYYY-MM-DD format
    }
}, { timestamps: true })

// model

export const Book = model('Book', bookSchema) 