import axios from "axios"

export async function loginRequest(adminId: string, password: string) {
    try {
        const response = await axios.post("http://localhost:8080/api/v1/public/auth/login", {
            email: adminId,
            password: password
        })
        return response.data;
    } catch (error) {
        console.error("Login request failed:", error);
        throw error;
    }
}