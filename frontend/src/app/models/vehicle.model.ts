export interface Vehicle {
    id?: string;
    marque: string | null | undefined;
    modele: string | null | undefined;
    immatriculation: string | null | undefined;
    annee: number | null | undefined;
    type_carburant: string | null | undefined;
}