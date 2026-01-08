import { Document } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
}

export enum UserStatus {
  PENDING = "pending",
  ACTIVE = "active",
}

export interface IUser extends Document {
  name: string;
  img: string;
  password: string;
  status: UserStatus;
  phone: string;
  email?: string;
  role: string;
  isDeleted: boolean;
  comparePassword(password: string): Promise<boolean>;
}
