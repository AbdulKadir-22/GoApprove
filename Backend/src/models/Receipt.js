// src/models/Receipt.js
const { Schema, model, Types } = require('mongoose');

const ReceiptSchema = new Schema({
  expense_id: { type: Types.ObjectId, ref: 'Expense', required: true, index: true },
  storage_url: { type: String, required: true },
  ocr_json: { type: Schema.Types.Mixed, default: {} },
  extracted_amount: { type: Number, default: null },
  extracted_date: { type: Date, default: null },
  merchant: { type: String, default: null }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = model('Receipt', ReceiptSchema);
