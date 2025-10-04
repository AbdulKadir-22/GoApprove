// src/models/Expense.js
const { Schema, model, Types } = require('mongoose');
const { ExpenseStatus } = require('./enums');

const ExpenseSchema = new Schema({
  company_id: { type: Types.ObjectId, ref: 'Company', required: true, index: true },
  user_id: { type: Types.ObjectId, ref: 'User', required: true, index: true },
  category_id: { type: Types.ObjectId, ref: 'Category', required: true, index: true },
  status: { type: String, enum: Object.values(ExpenseStatus), default: ExpenseStatus.Draft },
  original_amount: { type: Number, required: true },
  original_currency: { type: String, required: true },
  normalized_amount: { type: Number, required: true },
  company_currency: { type: String, required: true },
  description: { type: String, default: '' },
  date: { type: Date, required: true },
  submitted_at: { type: Date, default: null }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

ExpenseSchema.index({ company_id: 1, user_id: 1, status: 1, submitted_at: -1 });

module.exports = model('Expense', ExpenseSchema);
