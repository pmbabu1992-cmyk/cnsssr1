import mongoose, { Schema, Model } from 'mongoose';

/** Convert a collection name to a stable Model name. */
function modelNameFromCollection(collection: string) {
  // 'iot-data' -> 'IotData', 'telemetry_data' -> 'TelemetryData'
  return collection
    .replace(/[-_](\w)/g, (_, c: string) => c.toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase());
}

/** Get or create a permissive model bound to a specific collection. */
export function modelFor(collection: string): Model<any> {
  const name = modelNameFromCollection(collection);
  const existing = mongoose.models[name] as Model<any> | undefined;
  if (existing) return existing;

  const schema = new Schema({}, { strict: false, timestamps: true, collection });
  return mongoose.model<any>(name, schema);
}
