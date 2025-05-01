import { Request, Response } from 'express';
import { getDB } from '../db';

// List members who borrowed "Modern Egypt"
// MongoDB Shell Command:
// db.books.findOne({ title: "Modern Egypt" })
// db.borrowings.find({ book_id: "uuid" })
// db.members.find({ member_id: { $in: [...] } })
export const getMembersWhoBorrowedModernEgypt = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const book = await db.collection('books').findOne({ title: 'Modern Egypt' });
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        const borrowings = await db.collection('borrowings').find({ book_id: book.book_id }).toArray();
        const memberIds = borrowings.map(b => b.member_id);
        const members = await db.collection('members').find({ member_id: { $in: memberIds } }).toArray();
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Find members who joined before a specific year
// MongoDB Shell Command:
// db.members.find({ join_date: { $lt: ISODate("2020-01-01") } })
export const getMembersJoinedBeforeYear = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const year = parseInt(req.params.year);
        const members = await db.collection('members')
            .find({ join_date: { $lt: new Date(`${year}-01-01`) } })
            .toArray();
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Display all books borrowed by a specific member
// MongoDB Shell Command:
// db.borrowings.find({ member_id: "uuid" })
// db.books.find({ book_id: { $in: [...] } })
export const getBooksBorrowedByMember = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const borrowings = await db.collection('borrowings')
            .find({ member_id: req.params.member_id })
            .toArray();
        const bookIds = borrowings.map(b => b.book_id);
        const books = await db.collection('books')
            .find({ book_id: { $in: bookIds } })
            .toArray();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};