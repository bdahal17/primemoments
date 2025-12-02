const BASE_URL = import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "http://localhost:8080/api/event" : "/api/event");

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

export async function getEvents(token: string) {
    return requestEvent("/all", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function createEvent(token: string, eventData: any) {
    return requestEvent("/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` },
        body: JSON.stringify(eventData),
    });
}

export async function approveEvent(token: string, eventId: number) {
    return requestEvent(`/approve/${eventId}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

export async function addNotes(token: string, eventId: number, content: string) {
    return requestEvent(`/update/${eventId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` },
        body: content,
    });
}
