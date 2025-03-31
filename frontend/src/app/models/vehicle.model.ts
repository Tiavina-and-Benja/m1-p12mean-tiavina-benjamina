export interface Vehicle {
    id?: string;
    brand: string | null | undefined;
    model: string | null | undefined;
    licensePlate: string | null | undefined;
    year: number | null | undefined;
    fuel: string | null | undefined;
}