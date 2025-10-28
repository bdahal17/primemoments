import type {UserResponse} from "./userService.ts";

export async function handleJwt(user: UserResponse): Promise<any> {
    // In a real application, you would verify the token's signature and decode it properly.
    // Here, we'll just simulate decoding by splitting the token.
    const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1 hour from now
    localStorage.setItem("authTokenExpiry", expirationTime.toString());
    localStorage.setItem("jwt", user.token);

    // try {
    //     const payload = user.token.split('.')[1];
    //     const decodedPayload = atob(payload);
    //     return JSON.parse(decodedPayload);
    // } catch (error) {
    //     throw new Error("Invalid JWT token");
    // }
}

export async function validateJwt(token): Promise<void> {
    // const expiry = localStorage.getItem("authTokenExpiry");
    //
    // if (!token || !expiry) {
    //     throw new Error("No token or expiry found");
    // }
    //
    // const now = new Date().getTime();
    // if (now > parseInt(expiry)) {
    //     localStorage.removeItem("jwt");
    //     localStorage.removeItem("authTokenExpiry");
    //     throw new Error("Token has expired");
    // }
    return Promise.resolve();
};

function parseJwt(token: string) {
    const base64Payload = token.split('.')[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
}

