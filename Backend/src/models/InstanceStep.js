// src/models/InstanceStep.js
const { Schema, model, Types } = require('mongoose');
const { RuleType, StepState } = require('./enums');

const InstanceStepSchema = new Schema({
  instance_id: { type: Types.ObjectId, ref: 'WorkflowInstance', required: true, index: true },
  step_definition_id: { type: Types.ObjectId, ref: 'StepDefinition', required: true },
  name: { type: String, required: true },
  order_index: { type: Number, required: true },
  rule_type: { type: String, enum: Object.values(RuleType), required: true },
  rule_params: { type: Schema.Types.Mixed, default: {} }, // frozen copy for this expense
  total_eligible: { type: Number, default: 1 },
  approvals_needed: { type: Number, default: 1 },
  state: { type: String, enum: Object.values(StepState), default: StepState.Open },
  opened_at: { type: Date, default: Date.now },
  closed_at: { type: Date, default: null }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

InstanceStepSchema.index({ instance_id: 1, order_index: 1 }, { unique: true });

module.exports = model('InstanceStep', InstanceStepSchema);
