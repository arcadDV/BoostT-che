// models/User.ts
import mongoose, { Schema, models, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, 'Veuillez fournir un email.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Veuillez fournir un mot de passe.'],
    minlength: [6, 'Le mot de passe doit contenir au moins 6 caractères.'],
  },
}, {
  timestamps: true,
});

const User = (models.User || model<IUser>('User', UserSchema)) as mongoose.Model<IUser>;

export default User;