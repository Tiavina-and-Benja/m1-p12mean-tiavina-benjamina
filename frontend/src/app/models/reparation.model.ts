import { User } from "./user.model";

export interface Reparation {
    serviceName: string | null | undefined;
    mechanics: string | User | null | undefined;
    dateReparation: Date | string | null | undefined;
}