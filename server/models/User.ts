import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

interface IUser extends Document {
  username: string;
  password: string;
}

let UserModel = mongoose.model<IUser>("User", userSchema);

export default UserModel;
