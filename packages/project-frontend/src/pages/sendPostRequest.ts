export async function sendPostRequest<T>(url: string, payload: Record<string, unknown>): Promise<T> {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        // console.log(payload);

        if (!response.ok) {
            console.log("test");
            const errorText = await response.json();
            throw new Error(errorText.message || "Request failed");
        }

        // Handle empty responses safely
        const text = await response.text();
        console.log(text);
        return text ? (JSON.parse(text) as T) : ({} as T);

    } catch (error) {
        console.error("Error in sendPostRequest:", error);
        throw error;
    }
}
