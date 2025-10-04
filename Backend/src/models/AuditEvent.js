// src/models/AuditEvent.js
const { Schema, model, Types } = require('mongoose');

const AuditEventSchema = new Schema({
  expense_id: { type: Types.ObjectId, ref: 'Expense', required: true, index: true },
  actor_user_id: { type: Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  payload_json: { type: Schema.Types.Mixed, default: {} }
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

module.exports = model('AuditEvent', AuditEventSchema);
