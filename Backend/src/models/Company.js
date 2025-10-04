// src/models/Company.js
const { Schema, model } = require('mongoose');

const CompanySchema = new Schema({
  name: { type: String, required: true },
  country_code: { type: String, required: true },
  default_currency: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

CompanySchema.index({ name: 1 }, { unique: false });

module.exports = model('Company', CompanySchema);
