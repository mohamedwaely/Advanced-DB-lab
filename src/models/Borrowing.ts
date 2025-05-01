// import mongoose, { Schema, Document } from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

// interface Borrowing extends Document {
//     member_id: string;
//     book_id: string;
//     borrow_date: Date;
//     return_date?: Date;
//     status: 'borrowed' | 'returned' | 'overdue';
// }

// const BorrowingSchema: Schema = new Schema({
//     member_id: { type: String, required: true, default: uuidv4 },
//     book_id: { type: String, required: true },
//     borrow_date: { type: Date, required: true },
//     return_date: { type: Date },
//     status: {type: String, enum: ['borrowed', 'returned', 'overdue'], default: 'borrowed'}
// });

// export default mongoose.model<Borrowing>('borrowing', BorrowingSchema);

export interface Borrowing {
    borrowing_id: string;
    member_id: string;
    book_id: string;
    borrow_date: Date;
    return_date?: Date;
    status: 'borrowed' | 'returned' | 'overdue';
}