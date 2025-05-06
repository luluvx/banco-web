import { Cuenta } from "./Cuenta";

export interface Movimiento {
    id?: number;
    cuenta_id: number;
    tipo: 'ingreso' | 'egreso';
    monto: number;
    cuenta?: Cuenta;
    fecha?: string;
}
