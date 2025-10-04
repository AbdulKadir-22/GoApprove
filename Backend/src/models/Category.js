// src/models/Category.js
const { Schema, model, Types } = require('mongoose');

const CategorySchema = new Schema({
  company_id: { type: Types.ObjectId, ref: 'Company', required: true, index: true },
  name: { type: String, required: true },
  active_workflow_version_id: { type: Types.ObjectId, ref: 'WorkflowVersion', default: null }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

CategorySchema.index({ company_id: 1, name: 1 }, { unique: true });

module.exports = model('Category', CategorySchema);

