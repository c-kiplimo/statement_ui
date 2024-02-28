import { User } from "./user.type";

type UserSession={
    user:User,
    expiryDate: Number,
    token: string
}