export interface Service {
  id?: string;
  name: string;
  price?: number;
  description?: string;
  status?: "pending" | "in progress" | "completed" | "canceled";
}

