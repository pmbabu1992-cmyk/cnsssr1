// src/api/models/dashboard.model.ts
// import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

// const schema = new Schema({
//   name: { type: String, required: true },
//   ownerId: { type: Schema.Types.ObjectId, ref: 'User' },
//   widgets: [{ type: Schema.Types.ObjectId, ref: 'Widget' }],
//   layout: Schema.Types.Mixed,
//   isPublic: { type: Boolean, default: false },
// }, { timestamps: true, collection: 'dashboards' });

// export type Dashboard = InferSchemaType<typeof schema>;
// export const DashboardModel: Model<Dashboard> =
//   (mongoose.models['Dashboard'] as Model<Dashboard> | undefined) ||
//   mongoose.model<Dashboard>('Dashboard', schema);


import mongoose, { Schema, Model, Document } from 'mongoose';

/**
 * Dynamic (schema-less) device model.
 * - strict:false  -> accept any fields (no schema updates needed)
 * - minimize:false -> keep empty objects/arrays as-is
 * - timestamps:true -> adds createdAt/updatedAt (optional; remove if you don't want)
 * - collection:'devices' -> binds to your "devices" collection
 */
const DashboardSchema = new Schema(
  {},
  {
    strict: false,
    minimize: false,
    timestamps: true,
    collection: 'dashboards',
  }
);

// TS type: a Mongoose document with arbitrary keys
export type DashboardDoc = Document & Record<string, any>;

// Reuse existing model in watch mode
export const DashboardModel: Model<DashboardDoc> =
  (mongoose.models['Dashboard'] as Model<DashboardDoc> | undefined) ||
  mongoose.model<DashboardDoc>('Dashboard', DashboardSchema);