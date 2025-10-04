// src/models/WorkflowDefinition.js
const { Schema, model, Types } = require('mongoose');

const WorkflowDefinitionSchema = new Schema({
  category_id: { type: Types.ObjectId, ref: 'Category', required: true, index: true }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

WorkflowDefinitionSchema.index({ category_id: 1 }, { unique: true });

module.exports = model('WorkflowDefinition', WorkflowDefinitionSchema);
