// import mongoose, {Schema, Document} from "mongoose";
// import { v4 as uuidv4 } from 'uuid';

// interface Member extends Document{
//     member_id: string;
//     user_name: string;
//     email: string;
//     first_name:string;
//     last_name:string;
//     join_date: Date;
//     update_date: Date;
//     membership_type: string;
// }

// const MemberSchema: Schema= new Schema({
//     id: {type: String, required: true, unique: true, default: uuidv4},
//     user_name: {type: String, required: true, unique: true},
//     email: { type: String, required: true, unique: true },
//     first_name: { type: String, required: true },
//     last_name: { type: String, required: true },
//     join_date: { type: Date, required: true, default: Date.now },
//     update_date: {type: Date, required: true, default: Date.now},
//     membership_type: { type: String, required: true }

// });

// export default mongoose.model<Member>('members', MemberSchema);

export interface Member {
    member_id: string;
    user_name: string;
    email: string;
    first_name: string;
    last_name: string;
    join_date: Date;
    update_date: Date;
    membership_type: 'Gold' | 'Silver' | 'Bronze';
}