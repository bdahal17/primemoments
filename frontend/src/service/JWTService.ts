import type {UserResponse} from "./userService.ts";
import type {UserInfo} from "../store/userSlice.ts";
import {RolePermission} from "../store/userSlice.ts";
import { jwtDecode } from "jwt-decode";

export interface Role {
    id: number;
    name: string;
    description: string;
}

export interface JwtPayload {
    sub: string;
    ROLES: Role[];
    FIRST_NAME: string;
    LAST_NAME: string;
    EMAIL: string;
    exp: number; // optional, JWT expiry
}

export async function handleJwt(user: UserResponse): Promise<UserInfo> {
    try {
        console.log("Handling JWT for user:", user);
        if(isTokenExpired(user.token)) {
            throw new Error("JWT token has expired");
        }
        localStorage.setItem("jwt", user.token);
        return {
            id: user.id,
            firstName: decodeToken(user.token)?.FIRST_NAME || '',
            lastName: decodeToken(user.token)?.LAST_NAME || '',
            email: decodeToken(user.token)?.EMAIL || '',
            role: decodeToken(user.token)?.ROLES?.some((role) => role.name === RolePermission.ADMIN) ? RolePermission.ADMIN : RolePermission.USER,
        }
    } catch (error) {
        throw error;
    }
}

export const decodeToken = (token: string): JwtPayload | null => {
    try {
        return jwtDecode<JwtPayload>(token);
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};

export const isTokenExpired = (token: string): boolean => {
    try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decodedToken.exp < currentTime;
    } catch (error) {
        return true;  // Consider invalid tokens as expired
    }
};


