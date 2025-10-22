// src/api/models/sensordata.model.ts   (collection: sensordata — singular)
import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const schema = new Schema({
  deviceId: { type: String, index: true },
  sensor:   { type: String, required: true }, // e.g., 'humidity'
  value:    { type: Number, required: true },
  unit:     { type: String },                 // '%', '°C', etc.
  ts:       { type: Date, default: Date.now, index: true },
}, { timestamps: true, collection: 'sensordata' });

export type SensorData = InferSchemaType<typeof schema>;
export const SensorDataModel: Model<SensorData> =
  (mongoose.models['SensorData'] as Model<SensorData> | undefined) ||
  mongoose.model<SensorData>('SensorData', schema);
