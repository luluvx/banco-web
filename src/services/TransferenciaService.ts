import { TransferenciaRequest } from "../models/dto/TransferenciaRequest";
import { Transferencia } from "../models/Transferencia";
import apiClient from "./interceptors";

export class TransferenciaService {
    createTransferencia(transferencia: TransferenciaRequest): Promise<Transferencia> {
        return new Promise<Transferencia>((resolve, reject) => {
            apiClient.post("transferencias/", transferencia)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error("Error al crear la transferencia: ", error);
                    reject(error);
                });
        });
    }
}