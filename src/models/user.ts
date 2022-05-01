import mongoose, { Document } from 'mongoose';

type UserDocument = Document & {
  email: string;
  firstName: string;
  lastName: string;
  googleId: string;
  salt: string;
  hash: string;
};

const UserSchema = new mongoose.Schema<UserDocument>({
  email: String,
  firstName: String,
  lastName: String,
  googleId: String,
  salt: String,
  hash: String
});

const User = mongoose.model<UserDocument>('User', UserSchema);

export { User, UserDocument };
