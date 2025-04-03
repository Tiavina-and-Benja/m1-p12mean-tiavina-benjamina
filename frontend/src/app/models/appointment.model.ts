import { Service } from "./service.model";
import { User } from "./user.model";
import { Vehicle } from "./vehicle.model";


export interface Appointment {
    id?: string;
    clientId: string | User; 
    vehicleId: string | Vehicle; 
    mechanicIds: (string | User)[];
    date: Date;
    time: string;
    status: "pending" | "in progress" | "completed" | "canceled";
    services: Service[];
    remarks?: string;
    isPaid?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }