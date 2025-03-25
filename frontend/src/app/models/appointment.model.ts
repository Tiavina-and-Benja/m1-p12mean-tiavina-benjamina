import { Service } from "./service.model";
import { User } from "./user.model";
import { Vehicle } from "./vehicle.model";


export interface Appointment {
    _id?: string;
    clientId: string | User; 
    vehicleId: string | Vehicle; 
    mechanicIds: (string | User)[];
    appointmentDate: Date;
    status: "pending" | "in progress" | "completed" | "canceled";
    services: Service[];
    remarks?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }