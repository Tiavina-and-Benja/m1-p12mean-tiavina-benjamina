import { User } from "./user.model";

export interface Message {
    senderId: User;
    timestamp: Date;
    text: string;
} 