export async function sendPostRequest(url, payload) {
    try {
        const response = await fetch(url, {
            method: "POST",  // Ensure PATCH is intended
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorText = await response.json();  // Read error message safely

            throw new Error(errorText.message || "Request failed");
        }
        console.log("in sendpostreq");
        // Handle empty body responses safely
        const text = await response.text();
        // console.log(text);

        return text ? JSON.parse(text) : {};
    } catch (error) {
        console.error("Error in sendPostRequest:", error);
        throw error;  // Ensure errors can be handled where called
    }
}
