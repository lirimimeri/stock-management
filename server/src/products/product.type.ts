/* eslint-disable prettier/prettier */
import { ObjectId } from "mongodb";

export interface ProductCollection {
    name: string;
    sku: string;
    qty: number;
    price: number;
    supplier?: string;
    createdAt: Date;
    createdBy: ObjectId;
}