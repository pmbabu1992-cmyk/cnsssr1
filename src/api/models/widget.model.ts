// src/api/models/widget.model.ts
// import mongoose, { Schema, InferSchemaType, Model } from 'mongoose';

// const schema = new Schema({
//   name:     { type: String, required: true },
//   type:     { type: String, required: true }, // 'chart' | 'table' | 'kpi'
//   config:   Schema.Types.Mixed,               // dataset, options, queries
//   ownerId:  { type: Schema.Types.ObjectId, ref: 'User' },
// }, { timestamps: true, collection: 'widgets' });

// export type Widget = InferSchemaType<typeof schema>;
// export const WidgetModel: Model<Widget> =
//   (mongoose.models['Widget'] as Model<Widget> | undefined) ||
//   mongoose.model<Widget>('Widget', schema);


import mongoose, { Schema, Model, Document } from 'mongoose';

/**
 * Dynamic (schema-less) device model.
 * - strict:false  -> accept any fields (no schema updates needed)
 * - minimize:false -> keep empty objects/arrays as-is
 * - timestamps:true -> adds createdAt/updatedAt (optional; remove if you don't want)
 * - collection:'devices' -> binds to your "devices" collection
 */
const WidgetsSchema = new Schema(
  {},
  {
    strict: false,
    minimize: false,
    timestamps: true,
    collection: 'widgets',
  }
);

// TS type: a Mongoose document with arbitrary keys
export type WidgetsDoc = Document & Record<string, any>;

// Reuse existing model in watch mode
export const WidgetsModel: Model<WidgetsDoc> =
  (mongoose.models['Widgets'] as Model<WidgetsDoc> | undefined) ||
  mongoose.model<WidgetsDoc>('Widgets', WidgetsSchema);