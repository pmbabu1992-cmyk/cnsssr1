// src/api/models/organization.model.ts
// import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

// const schema = new Schema({
//   name:    { type: String, required: true, unique: true },
//   domain:  String,
//   owners:  [{ type: Schema.Types.ObjectId, ref: 'User' }],
//   meta:    Schema.Types.Mixed,
// }, { timestamps: true, collection: 'organizations' });

// export type Organization = InferSchemaType<typeof schema>;
// export const OrganizationModel: Model<Organization> =
//   (mongoose.models['Organization'] as Model<Organization> | undefined) ||
//   mongoose.model<Organization>('Organization', schema);


import mongoose, { Schema, Model, Document } from 'mongoose';

/**
 * Dynamic (schema-less) device model.
 * - strict:false  -> accept any fields (no schema updates needed)
 * - minimize:false -> keep empty objects/arrays as-is
 * - timestamps:true -> adds createdAt/updatedAt (optional; remove if you don't want)
 * - collection:'devices' -> binds to your "devices" collection
 */
const OrganizationsSchema = new Schema(
  {},
  {
    strict: false,
    minimize: false,
    timestamps: true,
    collection: 'organizations',
  }
);

// TS type: a Mongoose document with arbitrary keys
export type OrganizationsDoc = Document & Record<string, any>;

// Reuse existing model in watch mode
export const OrganizationsModel: Model<OrganizationsDoc> =
  (mongoose.models['Organizations'] as Model<OrganizationsDoc> | undefined) ||
  mongoose.model<OrganizationsDoc>('Organizations', OrganizationsSchema);
