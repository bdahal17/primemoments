import {handleJwt} from "./JWTService.ts";
import type {UserInfo} from "../store/userSlice.ts";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "http://localhost:8080/api" : "/api");

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
}

// Generic request function
async function request<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${url}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "API request failed");
    }
    return res.json();
}

// Auth APIs
export async function userLogin(payload: LoginPayload): Promise<UserInfo> {
    try {
        const response: UserResponse = await request<UserResponse>("/user/login", {
            method: "POST",
            body: JSON.stringify(payload),
        });
        if (!response.token) {
            throw new Error("No token received");
        }
        return await handleJwt(response);
    } catch (error) {
        console.error("Error during user login:", error);
        throw error;
    }
}

export async function userRegister(payload: RegisterPayload): Promise<UserInfo> {
    try {
        const response: UserResponse = await request<UserResponse>("/user/register", {
            method: "POST",
            body: JSON.stringify(payload),
        });
        if (!response.token) {
            throw new Error("No token received");
        }
        return await handleJwt(response);
    } catch (error) {
        throw error;
    }
}

export async function fetchUser(token: string): Promise<UserInfo> {
    try {
        const response: UserResponse = await request<UserResponse>("/auth/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.token) {
            throw new Error("No token received");
        }
        return await handleJwt(response);
    } catch (error) {
        console.error("Error fetching user info:", error);
        throw error;
    }
}

// Example: other API calls
export async function getEvents(token: string) {
    return request("/events", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function createEvent(token: string, eventData: any) {
    return request("/events", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(eventData),
    });
}
