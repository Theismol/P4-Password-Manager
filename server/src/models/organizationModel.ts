import mongoose, { Schema, Document, Model } from 'mongoose';

interface IOrganization extends Document {
    name: string;
    users: Schema.Types.ObjectId[];
}

const organizationSchema: Schema<IOrganization> = new Schema<IOrganization>({
    name: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Organization: Model<IOrganization> = mongoose.model<IOrganization>('Organization', organizationSchema);

export default Organization;
