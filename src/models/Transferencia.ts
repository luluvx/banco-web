import { Beneficiario } from "./Beneficiario";
import { Cuenta } from "./Cuenta";

export interface Transferencia {
    id: number;
    beneficiario: Beneficiario;
    cuenta_origen: Cuenta;
    monto: string;
    fecha: Date;
}
