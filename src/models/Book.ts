// import mongoose, { Schema, Document } from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

// interface Book extends Document {
//     book_id: string;
//     title: string;
//     language: string;
//     author: string;
//     description: string;
//     publication_year: number;
//     total_copies: number;
//     available_copies: number;
//     created_at: Date;
//     updated_at: Date;
// }

// const BookSchema: Schema = new Schema({
//     book_id: { type: String, required: true, unique: true, default: uuidv4 },
//     title: { type: String, required: true },
//     language: {type: String, required: true},
//     author: { type: String, required: true },
//     description: { type: String, required: true },
//     publication_year: { type: Number, required: true },
//     total_copies: { type: Number, required: true },
//     available_copies: { type: Number, required: true },
//     created_at: { type: Date, required: true },
//     updated_at: { type: Date, required: true }

// });

// export default mongoose.model<Book>('books', BookSchema);

export interface Book {
    book_id: string;
    title: string;
    language: string;
    author: string;
    description: string;
    publication_year: number;
    total_copies: number;
    available_copies: number;
    created_at: Date;
    updated_at: Date;
}