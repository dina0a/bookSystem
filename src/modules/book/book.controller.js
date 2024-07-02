import { Book } from "../../../db/models/book.model.js"

// add book
export const addBook = async (req, res, next) => {
    const { title, content, author } = req.body
    try {
        const book = new Book({
            title,
            content,
            author
        })
        const createBook = await book.save()
        return res.status(201).json({ message: "book created successfully", success: true, data: createBook })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// getAllBooks
// export const getAllBooks = async (req, res, next) => {
//     try {
//         const allBooks = await Book.find()
//         if (allBooks.length == 0) {
//             throw Error("books not found", { cause: 404 })
//         }
//         return res.status(201).json({ message: "all books is here", success: true, data: allBooks, count: allBooks.length })
//     }
//     catch (err) {
//         return res.status(err.cause || 500).json({ message: err.message, success: false })
//     }
// }

export const getBook = async (req, res, next) => {
    const { id } = req.params
    try {
        const isFound = await Book.findById(id)
        if (!isFound) {
            throw Error("book not found", { cause: 404 })
        }
        return res.status(200).json({ message: "book is here", success: true, data: isFound })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// getAllBooks
export const getAllBooks = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, title, author } = req.query;
        const skip = (page - 1) * limit;

        // Create a search query object
        let searchQuery = {};
        if (title) {
            searchQuery.title = { $regex: title, $options: 'i' }; // case-insensitive regex search
        }
        if (author) {
            searchQuery.author = { $regex: author, $options: 'i' }; // case-insensitive regex search
        }

        // Fetch paginated and filtered books from the database
        const [allBooks, totalBooks] = await Promise.all([
            Book.find(searchQuery).skip(skip).limit(limit),
            Book.countDocuments(searchQuery)
        ]);

        if (!allBooks.length) {
            return res.status(404).json({ message: "books not found", success: false });
        }

        return res.status(200).json({
            message: "all books are here",
            success: true,
            data: allBooks,
            count: allBooks.length,
            total: totalBooks,
            page: parseInt(page),
            totalPages: Math.ceil(totalBooks / limit)
        });
    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false });
    }
};



// updateBook
export const updateBook = async (req, res, next) => {
    const { title, content, author } = req.body
    const { id } = req.params
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, { title, content, author }, { new: true })
        if (!updatedBook) {
            throw Error("book not found", { cause: 404 })
        }
        return res.status(200).json({ message: "book updated successfully", success: true, data: updatedBook })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// deleteBook
export const deleteBook = async (req, res, next) => {
    const { id } = req.params
    try {
        const deletedBook = await Book.findByIdAndDelete(id)
        if (!deletedBook) {
            throw Error("book not found to delete", { cause: 404 })
        }
        return res.status(200).json({ message: "book deleted successfully", success: true })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}
