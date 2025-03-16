export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    token?: UserRole;
    provider: string
    providerId: string
    createdAt: string
    updatedAt: string

}


export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}
