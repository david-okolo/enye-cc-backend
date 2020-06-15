import { Schema, model } from 'mongoose';
import { PastSearch } from './PastSearch';

const Profile = new Schema({
  _id: String,
  pastSearches: [PastSearch]
});

export const ProfileModel = model('profile', Profile);