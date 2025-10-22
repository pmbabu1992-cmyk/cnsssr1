// src/api/models/iot_data.model.ts   (collection name: iot-data)
import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const schema = new Schema({
  deviceId: { type: String, index: true },
  metric:   { type: String, required: true }, // e.g., 'temperature'
  value:    Schema.Types.Mixed,
  ts:       { type: Date, default: Date.now, index: true },
}, { timestamps: true, collection: 'iot-data' });

export type IoTData = InferSchemaType<typeof schema>;
export const IoTDataModel: Model<IoTData> =
  (mongoose.models['IoTData'] as Model<IoTData> | undefined) ||
  mongoose.model<IoTData>('IoTData', schema);
