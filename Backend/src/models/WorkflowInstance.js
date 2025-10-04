// src/models/WorkflowInstance.js
const { Schema, model, Types } = require('mongoose');
const { InstanceState } = require('./enums');

const WorkflowInstanceSchema = new Schema({
  expense_id: { type: Types.ObjectId, ref: 'Expense', required: true, index: true },
  workflow_version_id: { type: Types.ObjectId, ref: 'WorkflowVersion', required: true },
  snapshot_json: { type: Schema.Types.Mixed, required: true },
  current_step_index: { type: Number, default: 0 },
  state: { type: String, enum: Object.values(InstanceState), default: InstanceState.Open },
  completed_at: { type: Date, default: null }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

WorkflowInstanceSchema.index({ expense_id: 1 }, { unique: true });

module.exports = model('WorkflowInstance', WorkflowInstanceSchema);
