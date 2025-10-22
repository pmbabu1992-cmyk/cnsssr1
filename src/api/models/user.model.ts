// src/api/models/user.model.ts
// import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

// const schema = new Schema({
//   email:    { type: String, required: true, unique: true, index: true },
//   password: { type: String },
//   roles:    [{ type: String }], // e.g., 'admin', 'viewer'
//   orgId:    { type: Schema.Types.ObjectId, ref: 'Organization' },
//   status:   { type: String, enum: ['active', 'disabled'], default: 'active' },
// }, { timestamps: true, collection: 'users' });

// export type User = InferSchemaType<typeof schema>;
// export const UserModel: Model<User> =
//   (mongoose.models['User'] as Model<User> | undefined) ||
//   mongoose.model<User>('User', schema);



import mongoose, { Schema, Model, Document } from 'mongoose';

/**
 * Dynamic (schema-less) device model.
 * - strict:false  -> accept any fields (no schema updates needed)
 * - minimize:false -> keep empty objects/arrays as-is
 * - timestamps:true -> adds createdAt/updatedAt (optional; remove if you don't want)
 * - collection:'devices' -> binds to your "devices" collection
 */
const UsersSchema = new Schema(
  {},
  {
    strict: false,
    minimize: false,
    timestamps: true,
    collection: 'users',
  }
);

// TS type: a Mongoose document with arbitrary keys
export type UsersDoc = Document & Record<string, any>;

// Reuse existing model in watch mode
export const UsersModel: Model<UsersDoc> =
  (mongoose.models['Users'] as Model<UsersDoc> | undefined) ||
  mongoose.model<UsersDoc>('Users', UsersSchema);
