import { User } from "./User";

export interface Beneficiario {
    id: number;
    user: User;
    nombre: string;
    numero_cuenta: number;
}
