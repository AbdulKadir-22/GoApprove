// src/models/WorkflowVersion.js
const { Schema, model, Types } = require('mongoose');

const WorkflowVersionSchema = new Schema({
  workflow_definition_id: { type: Types.ObjectId, ref: 'WorkflowDefinition', required: true, index: true },
  version: { type: Number, required: true },
  is_active: { type: Boolean, default: false },
  published_at: { type: Date, default: null }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

WorkflowVersionSchema.index({ workflow_definition_id: 1, version: 1 }, { unique: true });
WorkflowVersionSchema.index({ is_active: 1 });

module.exports = model('WorkflowVersion', WorkflowVersionSchema);
