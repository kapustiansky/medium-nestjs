import { UserType } from "./user.type.js";

export interface IUserResponse {
    user: UserType & { token: string };
}