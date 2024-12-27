import mongoose, { Schema } from 'mongoose';

const UrlSchema = new Schema({
  url: String,
  urlKey: String,
  createdAt: Date,
  count: Number,
  valid: Boolean,
  password: String,
  expiration: Date
});

export const Url = mongoose.models.Url || mongoose.model('Url', UrlSchema);