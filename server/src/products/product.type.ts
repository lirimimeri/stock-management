import { ObjectId } from "mongodb";

export interface ProductCollection {
    name: string;
    id: string;
    qty: string;
    supplier?: string;
    createdAt: Date;
    createdBy: ObjectId;
}