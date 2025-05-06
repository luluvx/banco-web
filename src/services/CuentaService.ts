import { Cuenta } from "../models/Cuenta";
import apiClient from "./interceptors";

export class CuentaService {
    getCuentas(): Promise<Array<Cuenta>> {
        return new Promise<Array<Cuenta>>((resolve, reject) => {
            apiClient.get("cuentas/mis-cuentas/")
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error("Error al obtener las cuentas: ", error);
                    reject(new Error("Error al obtener las cuentas: " + error.message));
                });
        });
    }

    getCuenta(id: number): Promise<Cuenta> {
        return new Promise<Cuenta>((resolve, reject) => {
            apiClient.get("cuentas/" + id + "/")
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error("Error al obtener la cuenta: ", error);
                    reject(new Error("Error al obtener la cuenta: " + error.message));
                });
        });
    }

    createCuenta(): Promise<Cuenta> {
        return new Promise<Cuenta>((resolve, reject) => {
            apiClient.post("cuentas/")
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error("Error al crear la cuenta: ", error);
                    reject(new Error("Error al crear la cuenta: " + error.message));
                });
        });
    }
}