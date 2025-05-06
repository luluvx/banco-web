import { User } from "./User";

export interface Cuenta {
    id: number;
    user: User;
    numero_cuenta: number;
    saldo: string;
}
