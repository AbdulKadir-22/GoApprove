// src/models/CurrencyRate.js
const { Schema, model } = require('mongoose');

const CurrencyRateSchema = new Schema({
  base_currency: { type: String, required: true, index: true },
  rates_json: { type: Schema.Types.Mixed, required: true },
  fetched_at: { type: Date, required: true }
}, { timestamps: false });

CurrencyRateSchema.index({ base_currency: 1, fetched_at: -1 });

module.exports = model('CurrencyRate', CurrencyRateSchema);
