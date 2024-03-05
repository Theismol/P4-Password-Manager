import mongoose, { Schema, Document, Model } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  organizations: Schema.Types.ObjectId[];
  passwords: Schema.Types.ObjectId[];
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  organizations: [{ type: Schema.Types.ObjectId, ref: 'Organization' }],
  passwords: [{ type: Schema.Types.ObjectId, ref: 'Password' }]
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
