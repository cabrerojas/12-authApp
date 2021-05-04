

export interface AuthResponse {
    ok: string;
    uid?: string;
    nombre?: string;
    token?: string;
    msg?: string;
}

export interface Usuario {
    uid: string;
    nombre: string;
    correo?: string;
}
