import { ObjectId } from "mongodb";

export interface UserCollection {
    email: string;
    password: string;
    createdAt: Date;
    createdBy: ObjectId
}