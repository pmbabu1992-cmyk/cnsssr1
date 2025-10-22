// // src/api/models/device.model.ts
// import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

// const schema = new Schema({
//   device_name: { type: String, required: true },
//   device_id:   { type: String, unique: true, index: true },
//   status:      { type: String, enum: ['online', 'offline', 'unknown'], default: 'unknown' },
//   location:    { type: String },
//   tags:        [{ type: String }],
//   meta:        Schema.Types.Mixed,
// }, { timestamps: true, collection: 'devices' });

// export type Device = InferSchemaType<typeof schema>;
// export const DeviceModel: Model<Device> =
//   (mongoose.models['Device'] as Model<Device> | undefined) ||
//   mongoose.model<Device>('Device', schema);


// src/api/models/device.model.ts
import mongoose, { Schema, Model, Document } from 'mongoose';

/**
 * Dynamic (schema-less) device model.
 * - strict:false  -> accept any fields (no schema updates needed)
 * - minimize:false -> keep empty objects/arrays as-is
 * - timestamps:true -> adds createdAt/updatedAt (optional; remove if you don't want)
 * - collection:'devices' -> binds to your "devices" collection
 */
const DeviceSchema = new Schema(
  {},
  {
    strict: false,
    minimize: false,
    timestamps: true,
    collection: 'devices',
  }
);

// TS type: a Mongoose document with arbitrary keys
export type DeviceDoc = Document & Record<string, any>;

// Reuse existing model in watch mode
export const DeviceModel: Model<DeviceDoc> =
  (mongoose.models['Device'] as Model<DeviceDoc> | undefined) ||
  mongoose.model<DeviceDoc>('Device', DeviceSchema);
