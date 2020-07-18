import { Schema } from 'mongoose';

export const PastSearch = new Schema({
  keyword: String,
  radius: Number,
  timestamp: Number
});