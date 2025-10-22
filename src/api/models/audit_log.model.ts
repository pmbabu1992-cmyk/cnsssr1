// audit_log.model.ts
import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

const schema = new Schema({
  actorId: { type: Schema.Types.ObjectId, ref: 'User' },
  actorEmail: String,
  action: { type: String, required: true }, // e.g., 'DEVICE_UPDATE'
  entityType: String,                        // 'device' | 'user' | ...
  entityId: String,
  metadata: Schema.Types.Mixed,
}, { timestamps: true, collection: 'audit_logs' });

export type AuditLog = InferSchemaType<typeof schema>;
export const AuditLogModel: Model<AuditLog> =
  (mongoose.models['AuditLog'] as Model<AuditLog> | undefined) ||
  mongoose.model<AuditLog>('AuditLog', schema);
