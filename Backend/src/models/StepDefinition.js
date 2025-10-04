// src/models/StepDefinition.js
const { Schema, model, Types } = require('mongoose');
const { RuleType } = require('./enums');

const StepDefinitionSchema = new Schema({
  workflow_version_id: { type: Types.ObjectId, ref: 'WorkflowVersion', required: true, index: true },
  order_index: { type: Number, required: true },
  name: { type: String, required: true },
  rule_type: { type: String, enum: Object.values(RuleType), required: true },
  rule_params: { type: Schema.Types.Mixed, default: {} }, // e.g., { threshold_fraction: 0.6, specific_approver_user_id, veto_on_specific_reject: true }
  min_amount: { type: Number, default: null },
  max_amount: { type: Number, default: null }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

StepDefinitionSchema.index({ workflow_version_id: 1, order_index: 1 }, { unique: true });

module.exports = model('StepDefinition', StepDefinitionSchema);
