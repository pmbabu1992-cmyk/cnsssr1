// src/api/models/sensordatas.model.ts  (collection: sensordatas — plural)
// import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

// const schema = new Schema({
//   deviceId: { type: String, index: true },
//   readings: [{
//     sensor: String,
//     value:  Number,
//     unit:   String,
//     ts:     { type: Date, default: Date.now }
//   }],
//   batchTs: { type: Date, default: Date.now, index: true },
// }, { timestamps: true, collection: 'sensordatas' });

// export type SensorDatas = InferSchemaType<typeof schema>;
// export const SensorDatasModel: Model<SensorDatas> =
//   (mongoose.models['SensorDatas'] as Model<SensorDatas> | undefined) ||
//   mongoose.model<SensorDatas>('SensorDatas', schema);


import mongoose, { Schema, Model, Document } from 'mongoose';

/**
 * Dynamic (schema-less) device model.
 * - strict:false  -> accept any fields (no schema updates needed)
 * - minimize:false -> keep empty objects/arrays as-is
 * - timestamps:true -> adds createdAt/updatedAt (optional; remove if you don't want)
 * - collection:'devices' -> binds to your "devices" collection
 */
const SensorDatasSchema = new Schema(
  {},
  {
    strict: false,
    minimize: false,
    timestamps: true,
    collection: 'sensordatas',
  }
);

// TS type: a Mongoose document with arbitrary keys
export type SensorDatasDoc = Document & Record<string, any>;

// Reuse existing model in watch mode
export const SensorDatasModel: Model<SensorDatasDoc> =
  (mongoose.models['SensorDatas'] as Model<SensorDatasDoc> | undefined) ||
  mongoose.model<SensorDatasDoc>('SensorDatas', SensorDatasSchema);
