import { Request, Response } from 'express';
import { getDB } from '../db';
import { Book } from '../models/Book';
import { v4 as uuidv4 } from 'uuid';

// Create a book
// MongoDB Shell Command:
// db.books.insertOne({
//   book_id: "uuid", title: "Modern Egypt", language: "English",
//   author: "Tarek Osman", description: "History of Egypt",
//   publication_year: 2010, total_copies: 5, available_copies: 5,
//   created_at: ISODate("2023-01-01"), updated_at: ISODate("2023-01-01")
// })
export const createBook = async (req: Request, res: Response) => {
    try {
        const book: Book = {
            book_id: uuidv4(),
            title: req.body.title,
            language: req.body.language,
            author: req.body.author,
            description: req.body.description,
            publication_year: req.body.publication_year,
            total_copies: req.body.total_copies,
            available_copies: req.body.total_copies,
            created_at: new Date(),
            updated_at: new Date()
        };
        const db = getDB();
        const result = await db.collection('books').insertOne(book);
        res.status(201).json({ ...book, _id: result.insertedId });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Get all books
// MongoDB Shell Command:
// db.books.find()
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const books = await db.collection('books').find().toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Get a specific book
// MongoDB Shell Command:
// db.books.findOne({ book_id: "uuid" })
export const getBookById = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const book = await db.collection('books').findOne({ book_id: req.params.book_id });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Update a book
// MongoDB Shell Command:
// db.books.updateOne(
//   { book_id: "uuid" },
//   { $set: { title: "New Title", updated_at: ISODate("2023-04-01") } }
// )
export const updateBook = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const updateData = { ...req.body, updated_at: new Date() };
        const book = await db.collection('books').findOneAndUpdate(
            { book_id: req.params.book_id },
            { $set: updateData },
            { returnDocument: 'after' }
        );
        if (!book || !book.value) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book.value);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Delete a book
// MongoDB Shell Command:
// db.borrowings.deleteMany({ book_id: "uuid" })
// db.books.deleteOne({ book_id: "uuid" })
export const deleteBook = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const book = await db.collection('books').findOne({ book_id: req.params.book_id });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        await db.collection('borrowings').deleteMany({ book_id: req.params.book_id });
        await db.collection('books').deleteOne({ book_id: req.params.book_id });
        res.json({ message: 'Book and associated borrowings deleted' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};