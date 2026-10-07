import { UserEntity } from "../user.entity.js";

export type UserType = Omit<UserEntity, 'hashPassword'>;