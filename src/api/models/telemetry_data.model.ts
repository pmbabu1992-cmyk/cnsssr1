// src/api/models/telemetry_data.model.ts  (collection: telemetry_data)
import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const schema = new Schema({
  deviceId: { type: String, index: true },
  type:     { type: String },           // 'event' | 'log' | 'metric'
  payload:  Schema.Types.Mixed,
  ts:       { type: Date, default: Date.now, index: true },
}, { timestamps: true, collection: 'telemetry_data' });

export type TelemetryData = InferSchemaType<typeof schema>;
export const TelemetryDataModel: Model<TelemetryData> =
  (mongoose.models['TelemetryData'] as Model<TelemetryData> | undefined) ||
  mongoose.model<TelemetryData>('TelemetryData', schema);
