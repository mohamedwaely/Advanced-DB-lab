import { Request, Response } from 'express';
import { getDB } from '../db';
import { Borrowing } from '../models/Borrowing';
import { v4 as uuidv4 } from 'uuid';

// Create a borrowing
// MongoDB Shell Command:
// db.borrowings.insertOne({
//   borrowing_id: "uuid", member_id: "member_uuid", book_id: "book_uuid",
//   borrow_date: ISODate("2023-01-01"), status: "borrowed"
// })
// db.books.updateOne({ book_id: "book_uuid" }, { $inc: { available_copies: -1 } })
export const createBorrowing = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const book = await db.collection('books').findOne({ book_id: req.body.book_id });
        if (!book || book.available_copies <= 0) {
            return res.status(400).json({ error: 'Book not available' });
        }
        const borrowing: Borrowing = {
            borrowing_id: uuidv4(),
            member_id: req.body.member_id,
            book_id: req.body.book_id,
            borrow_date: new Date(),
            status: 'borrowed'
        };
        await db.collection('borrowings').insertOne(borrowing);
        await db.collection('books').updateOne(
            { book_id: req.body.book_id },
            { $inc: { available_copies: -1 } }
        );
        res.status(201).json(borrowing);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Update borrowing return date
// MongoDB Shell Command:
// db.borrowings.updateOne(
//   { borrowing_id: "uuid" },
//   { $set: { return_date: ISODate("2023-04-01"), status: "returned" } }
// )
// db.books.updateOne({ book_id: "book_uuid" }, { $inc: { available_copies: 1 } })
export const updateBorrowingReturn = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const borrowing = await db.collection('borrowings').findOne({ borrowing_id: req.params.borrowing_id });
        if (!borrowing) {
            return res.status(404).json({ error: 'Borrowing not found' });
        }
        await db.collection('borrowings').updateOne(
            { borrowing_id: req.params.borrowing_id },
            { $set: { return_date: new Date(), status: 'returned' } }
        );
        await db.collection('books').updateOne(
            { book_id: borrowing.book_id },
            { $inc: { available_copies: 1 } }
        );
        res.json({ message: 'Book returned' });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};