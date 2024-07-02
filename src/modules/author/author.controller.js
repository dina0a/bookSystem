import { Author } from "../../../db/models/author.model.js"
import { Book } from "../../../db/models/book.model.js"

// addAuthor
export const addAuthor = async (req, res, next) => {
    try {
        const { name, bio, birthdate, books } = req.body
        const author = new Author({
            name,
            bio,
            birthdate,
            books
        })
        const createdauthor = await author.save()
        return res.status(201).json({ message: "author created successfully", success: true, data: createdauthor })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// // getAllAuthors
// export const getAllAuthors = async (req, res, next) => {
//     try {
//         const allAuthors = await Author.find()
//         if (allAuthors.length == 0) {
//             throw Error("authors not found", { cause: 404 })
//         }
//         return res.status(201).json({ message: "all authors is here", success: true, data: allAuthors, count: allAuthors.length })
//     }
//     catch (err) {
//         return res.status(err.cause || 500).json({ message: err.message, success: false })
//     }
// }

// getAllAuthors
export const getAllAuthors = async (req, res, next) => {
    const { page, limit = 2,filter } = req.query;
    try {
        let query = {};

        if (filter) {
            query.$or = [
                { name: { $regex: filter, $options: 'i' } },
                { bio: { $regex: filter, $options: 'i' } }
            ];
        }
        const allAuthors = await Author.find(query).populate('books').limit(limit * 1)
        .skip((page - 1)*limit)
        .exec();
        return res.status(200).json({ data: allAuthors, success: true })

    } catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// getAuthors
export const getAuthors = async (req, res, next) => {
    const { id } = req.params
    try {
        const isFound = await Author.findById(id)
        if (!isFound) {
            throw Error("author not found", { cause: 404 })
        }
        return res.status(200).json({ message: "author is here", success: true, data: isFound })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// updateAuthor
export const updateAuthor = async (req, res, next) => {
    try {
        const { name, bio, birthdate, books } = req.body
        const { id } = req.params
        const updatedAuthor = await Author.findByIdAndUpdate(id, { name, bio, birthdate, books }, { new: true })
        if (!updatedAuthor) {
            throw Error("author not found to update", { cause: 404 })
        }
        return res.status(200).json({ message: "author updated successfully", success: true, data: updatedAuthor })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}

// deleteAuthor
export const deleteAuthor = async (req, res, next) => {
    try {
        const { id } = req.params
        const deletedAuthor = await Author.findByIdAndDelete(id)
        console.log(deletedAuthor);
        if (!deletedAuthor) {
            throw Error("author not found to deleted", { cause: 404 })
        }
        return res.status(200).json({ message: "author deleted successfully", success: true })
    }
    catch (err) {
        return res.status(err.cause || 500).json({ message: err.message, success: false })
    }
}