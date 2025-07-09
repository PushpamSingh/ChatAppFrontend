import axios from "axios";
const API = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/chat`,
    withCredentials: true
});
const token = localStorage.getItem("accessToken") || null;

class ChatService {
    async genStreamToken() {
        try {
            const response = await API.get("/genstreamtoken",{headers: { Authorization: `Bearer ${token}` }});
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to generate stream token");
        }
    }
}
const chatService = new ChatService();
export default chatService;