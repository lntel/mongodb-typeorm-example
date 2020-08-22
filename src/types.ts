import { Document } from "mongoose";

export interface IUser {
    _id?: string
    username: string
    password: string
}

export interface IUserDocument extends Document {
    _id: string
}