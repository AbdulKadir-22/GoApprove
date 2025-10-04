// src/models/StepAssignment.js
const { Schema, model, Types } = require('mongoose');

const StepAssignmentSchema = new Schema({
  instance_step_id: { type: Types.ObjectId, ref: 'InstanceStep', required: true, index: true },
  approver_user_id: { type: Types.ObjectId, ref: 'User', required: true, index: true },
  is_specific_flag: { type: Boolean, default: false }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

StepAssignmentSchema.index({ instance_step_id: 1, approver_user_id: 1 }, { unique: true });

module.exports = model('StepAssignment', StepAssignmentSchema);

