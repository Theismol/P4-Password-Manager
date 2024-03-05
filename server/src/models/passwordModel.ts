import mongoose, { Schema, Document, Model } from 'mongoose';

interface IPassword extends Document {
    organization_id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    title: string;
    username: string;
    password: string;
    url?: string;
    notes?: string;
}

const passwordSchema: Schema<IPassword> = new Schema<IPassword>({
    organization_id: { type: Schema.Types.ObjectId, ref: 'Organization' },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    url: { type: String },
    notes: { type: String }
});

const Password: Model<IPassword> = mongoose.model<IPassword>('Password', passwordSchema);

export default Password;
