import { Request, Response } from 'express';
import { getDB } from '../db';

// Aggregation: Count total books borrowed per member
// MongoDB Shell Command:
// db.borrowings.aggregate([
//   { $group: { _id: "$member_id", totalBooks: { $sum: 1 } } },
//   { $lookup: { from: "members", localField: "_id", foreignField: "member_id", as: "member" } },
//   { $unwind: "$member" }
// ])
export const getBooksPerMember = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const result = await db.collection('borrowings').aggregate([
            { $group: { _id: '$member_id', totalBooks: { $sum: 1 } } },
            { $lookup: { from: 'members', localField: '_id', foreignField: 'member_id', as: 'member' } },
            { $unwind: '$member' }
        ]).toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Aggregation: Average number of books borrowed per membership type
// MongoDB Shell Command:
// db.borrowings.aggregate([
//   { $lookup: { from: "members", localField: "member_id", foreignField: "member_id", as: "member" } },
//   { $unwind: "$member" },
//   { $group: { _id: "$member.membership_type", avgBooks: { $avg: { $sum: 1 } } } }
// ])
export const getAvgBooksPerMembership = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const result = await db.collection('borrowings').aggregate([
            { $lookup: { from: 'members', localField: 'member_id', foreignField: 'member_id', as: 'member' } },
            { $unwind: '$member' },
            { $group: { _id: '$member.membership_type', avgBooks: { $avg: { $sum: 1 } } } }
        ]).toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Aggregation: Members who borrowed more than X books
// MongoDB Shell Command:
// db.borrowings.aggregate([
//   { $group: { _id: "$member_id", totalBooks: { $sum: 1 } } },
//   { $match: { totalBooks: { $gt: 2 } } },
//   { $lookup: { from: "members", localField: "_id", foreignField: "member_id", as: "member" } },
//   { $unwind: "$member" }
// ])
export const getHeavyBorrowers = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const count = parseInt(req.params.count);
        const result = await db.collection('borrowings').aggregate([
            { $group: { _id: '$member_id', totalBooks: { $sum: 1 } } },
            { $match: { totalBooks: { $gt: count } } },
            { $lookup: { from: 'members', localField: '_id', foreignField: 'member_id', as: 'member' } },
            { $unwind: '$member' }
        ]).toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Aggregation: Group members by membership type
// MongoDB Shell Command:
// db.members.aggregate([
//   { $group: { _id: "$membership_type", count: { $sum: 1 } } }
// ])
export const getMembersByType = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const result = await db.collection('members').aggregate([
            { $group: { _id: '$membership_type', count: { $sum: 1 } } }
        ]).toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Aggregation: List books borrowed by more than 2 different members
// MongoDB Shell Command:
// db.borrowings.aggregate([
//   { $group: { _id: "$book_id", count: { $sum: 1 } } },
//   { $match: { count: { $gt: 2 } } },
//   { $lookup: { from: "books", localField: "_id", foreignField: "book_id", as: "book" } },
//   { $unwind: "$book" }
// ])
export const getPopularBooks = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const result = await db.collection('borrowings').aggregate([
            { $group: { _id: '$book_id', count: { $sum: 1 } } },
            { $match: { count: { $gt: 2 } } },
            { $lookup: { from: 'books', localField: '_id', foreignField: 'book_id', as: 'book' } },
            { $unwind: '$book' }
        ]).toArray();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};