// src/models/ApprovalDecision.js
const { Schema, model, Types } = require('mongoose');

const ApprovalDecisionSchema = new Schema({
  instance_step_id: { type: Types.ObjectId, ref: 'InstanceStep', required: true, index: true },
  approver_user_id: { type: Types.ObjectId, ref: 'User', required: true, index: true },
  decision: { type: String, enum: ['Approve', 'Reject'], required: true },
  comment: { type: String, default: '' },
  decided_at: { type: Date, default: Date.now }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

ApprovalDecisionSchema.index({ instance_step_id: 1, approver_user_id: 1 }, { unique: true });

module.exports = model('ApprovalDecision', ApprovalDecisionSchema);
