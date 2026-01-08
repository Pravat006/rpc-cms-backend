import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, UserRole, UserStatus } from "./user.interface";
import applyMongooseToJSON from "@/utils/mongooseToJSON";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    img: { type: String },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.ADMIN },
    status: { type: String, enum: Object.values(UserStatus), default: UserStatus.PENDING },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
applyMongooseToJSON(userSchema);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

userSchema.index({ name: "text", phone: 1, email: "text" });
userSchema.index({ phone: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true, sparse: true });
userSchema.index({ createdAt: -1 });

export const User: mongoose.Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
