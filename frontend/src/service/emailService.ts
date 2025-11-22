const BASE_URL = import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "http://localhost:8080/api/email" : "/api/email");

// Generic request function
async function requestEvent<T>(url: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${BASE_URL}${url}`, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });

    if (!res.ok) {
        let errMsg = "API request failed";
        try {
            const err = await res.json();
            errMsg = err.message ?? errMsg;
        } catch (_) {}
        throw new Error(errMsg);
    }
    return res.json();
}

export async function sendEmail(token: string, emailData: any) {
    return requestEvent("/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` },
        body: JSON.stringify(emailData),
    });
}
