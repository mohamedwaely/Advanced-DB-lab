import { Request, Response } from 'express';
import { getDB } from '../db';
import { Member } from '../models/Member';
import { v4 as uuidv4 } from 'uuid';

// Create a member
// MongoDB Shell Command:
// db.members.insertOne({
//   member_id: "uuid", user_name: "john_doe", email: "john@example.com",
//   first_name: "John", last_name: "Doe", join_date: ISODate("2023-01-01"),
//   update_date: ISODate("2023-01-01"), membership_type: "Gold"
// })
export const createMember = async (req: Request, res: Response) => {
    try {
        const member: Member = {
            member_id: uuidv4(),
            user_name: req.body.user_name,
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            join_date: new Date(),
            update_date: new Date(),
            membership_type: req.body.membership_type
        };
        const db = getDB();
        const result = await db.collection('members').insertOne(member);
        res.status(201).json({ ...member, _id: result.insertedId });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Get all members
// MongoDB Shell Command:
// db.members.find()
export const getAllMembers = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const members = await db.collection('members').find().toArray();
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Get a specific member
// MongoDB Shell Command:
// db.members.findOne({ member_id: "uuid" })
export const getMemberById = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const member = await db.collection('members').findOne({ member_id: req.params.member_id });
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};

// Update a member
// MongoDB Shell Command:
// db.members.updateOne(
//   { member_id: "uuid" },
//   { $set: { user_name: "new_name", update_date: ISODate("2023-04-01") } }
// )
export const updateMember = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const updateData = { ...req.body, update_date: new Date() };
        const member = await db.collection('members').findOneAndUpdate(
            { member_id: req.params.member_id },
            { $set: updateData },
            { returnDocument: 'after' }
        );
        if (!member || !member.value) {
            return res.status(404).json({ error: 'Member not found' });
        }
        res.json(member.value);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
};

// Delete a member with cascade delete
// MongoDB Shell Command:
// db.borrowings.deleteMany({ member_id: "uuid" })
// db.members.deleteOne({ member_id: "uuid" })
export const deleteMember = async (req: Request, res: Response) => {
    try {
        const db = getDB();
        const member = await db.collection('members').findOne({ member_id: req.params.member_id });
        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }
        await db.collection('borrowings').deleteMany({ member_id: req.params.member_id });
        await db.collection('members').deleteOne({ member_id: req.params.member_id });
        res.json({ message: 'Member and associated borrowings deleted' });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
};