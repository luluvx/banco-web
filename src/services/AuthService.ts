import axios from "axios";
import { LoginResponse } from "../models/dto/LoginResponse";
import { RefreshTokenResponse } from "../models/dto/RefreshTokenResponse";
import { RegisterResponse } from "../models/dto/RegisterResponse";
import { UserInfoResponse } from "../models/dto/UserInfoResponse";
import apiClient from "./interceptors";

export class AuthService {

    login(username: string, password: string): Promise<LoginResponse> {
        return new Promise<LoginResponse>((resolve, reject) => {
            axios.post("http://localhost:8000/api/token/", {
                username: username,
                password: password
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(new Error("Error al iniciar sesión: " + error.message));
                });
        });
    }
    refreshToken(refresh: string): Promise<RefreshTokenResponse> {
        return new Promise<RefreshTokenResponse>((resolve, reject) => {
            axios.post("http://localhost:8000/api/token/refresh/", {
                refresh: refresh
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(new Error("Error al refrescar el token: " + error.message));
                });
        });
    }
    register(nombre:string, apellido: string,username: string, password: string, ci: string): Promise<RegisterResponse> {
        return new Promise<RegisterResponse>((resolve, reject) => {
            axios.post("http://localhost:8000/banco/auth/register/", {
                nombre: nombre,
                apellido: apellido,
                username: username,
                password: password,
                ci: ci
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(new Error("Error al registrar el usuario: " + error.message));
                });
        });
    }
    me(): Promise<UserInfoResponse> {
        return new Promise<UserInfoResponse>((resolve, reject) => {
            apiClient.get("usuarios/me/")
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(new Error("Error al obtener la información del usuario: " + error.message));
                });
        });
    }

}