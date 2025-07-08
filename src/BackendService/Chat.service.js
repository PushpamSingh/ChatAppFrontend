import axios from "axios";
const API = axios.create({
    baseURL: "/api/v1/chat",
    withCredentials: true
});

class ChatService {
    async genStreamToken() {
        try {
            const response = await API.get("/genstreamtoken");
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