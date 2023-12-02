import { InsertOneResult, WithId } from "mongodb";
import { UserCollection } from "./user.type";
import { UserDto } from "./user.dto";

export interface UserRepository {
    getAll: () => Promise<Array<WithId<UserCollection>>>;
    create: (user: UserDto) => Promise<InsertOneResult>;
    login: (user: UserDto) => Promise<{ token: string }>;
}