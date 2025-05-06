import { Beneficiario } from "../models/Beneficiario";
import { BeneficiarioRequest } from "../models/dto/BeneficiarioRequest";
import apiClient from "./interceptors";

export class BeneficiarioService {
    getBeneficiarios(): Promise<Array<Beneficiario>> {
        return new Promise<Array<Beneficiario>>((resolve, reject) => {
            apiClient.get("beneficiarios/mis-beneficiarios/")
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error("Error al obtener los beneficiarios: ", error);
                    reject(new Error("Error al obtener los beneficiarios: " + error.message));
                });
        });
    }

    getBeneficiario(id: string): Promise<Beneficiario> {
        return new Promise<Beneficiario>((resolve, reject) => {
            apiClient.get("beneficiarios/" + id + "/")
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error("Error al obtener el beneficiario: ", error);
                    reject(new Error("Error al obtener el beneficiario: " + error.message));
                });
        });
    }

    createBeneficiario(beneficiario: BeneficiarioRequest): Promise<Beneficiario> {
        return new Promise<Beneficiario>((resolve, reject) => {
            apiClient.post("beneficiarios/", beneficiario)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error("Error al crear el beneficiario: ", error);
                    reject(new Error("Error al crear el beneficiario: " + error.message));
                });
        });
    }

    updateBeneficiario(beneficiario: BeneficiarioRequest, id: string): Promise<Beneficiario> {
        return new Promise<Beneficiario>((resolve, reject) => {
            apiClient.put("beneficiarios/" + id + "/", beneficiario)
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    console.error("Error al actualizar el beneficiario: ", error);
                    reject(new Error("Error al actualizar el beneficiario: " + error.message));
                });
        });
    }

    deleteBeneficiario(id: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            apiClient.delete("beneficiarios/" + id + "/")
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.error("Error al eliminar el beneficiario: ", error);
                    reject(new Error("Error al eliminar el beneficiario: " + error.message));
                });
        });
    }
}
