import { Movimiento } from "../models/Movimiento";
import apiClient from "./interceptors";

export class MovimientoService {
    getMovimientos(): Promise<Array<Movimiento>> {
        return new Promise<Array<Movimiento>>((resolve, reject) => {
            apiClient.get("movimientos/")
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error("Error al obtener los movimientos: ", error);
                    reject(new Error("Error al obtener los movimientos: " + error.message));
                });
        });
    }
    getMovimientosPorCuenta(id: string): Promise<Array<Movimiento>> {
        return new Promise<Array<Movimiento>>((resolve, reject) => {
            apiClient.get(`cuentas/${id}/movimientos/`)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error("Error al obtener los movimientos por cuenta: ", error);
                    reject(new Error("Error al obtener los movimientos por cuenta: " + error.message));
                });
        });
    }
    createMovimiento(movimiento: Movimiento): Promise<Movimiento> {
        return new Promise<Movimiento>((resolve, reject) => {
            apiClient.post("movimientos/", movimiento)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error("Error al crear el movimiento: ", error);
                    reject(new Error("Error al crear el movimiento: " + error.message));              });
        });
    }
}