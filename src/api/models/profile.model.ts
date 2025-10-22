// src/api/models/profile.model.ts
// import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

// const schema = new Schema({
//   userId:     { type: Schema.Types.ObjectId, ref: 'User', unique: true, index: true },
//   fullName:   String,
//   phone:      String,
//   timezone:   String,
//   preferences: Schema.Types.Mixed,
// }, { timestamps: true, collection: 'profiles' });

// export type Profile = InferSchemaType<typeof schema>;
// export const ProfileModel: Model<Profile> =
//   (mongoose.models['Profile'] as Model<Profile> | undefined) ||
//   mongoose.model<Profile>('Profile', schema);



import mongoose, { Schema, Model, Document } from 'mongoose';

/**
 * Dynamic (schema-less) device model.
 * - strict:false  -> accept any fields (no schema updates needed)
 * - minimize:false -> keep empty objects/arrays as-is
 * - timestamps:true -> adds createdAt/updatedAt (optional; remove if you don't want)
 * - collection:'devices' -> binds to your "devices" collection
 */
const ProfileSchema = new Schema(
  {},
  {
    strict: false,
    minimize: false,
    timestamps: true,
    collection: 'profiles',
  }
);

// TS type: a Mongoose document with arbitrary keys
export type ProfileDoc = Document & Record<string, any>;

// Reuse existing model in watch mode
export const ProfileModel: Model<ProfileDoc> =
  (mongoose.models['Profile'] as Model<ProfileDoc> | undefined) ||
  mongoose.model<ProfileDoc>('Profile', ProfileSchema);
