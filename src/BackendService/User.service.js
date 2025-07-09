import axios from "axios";

const API = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/user`,
    withCredentials: true
}); 
const token = localStorage.getItem("accessToken") || null;
class UserService {
    async getRecommendedUsers() {
        try {
            const response = await API.get("/getrecommendedusers",{headers: { Authorization: `Bearer ${token}` }});
            if(response.data){
                return response.data;
            }else{
                return [];
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to fetch recommended users");
        }
    }

    async getMyFriends() {
        try {
            const response = await API.get("/getmyfriends",{headers: { Authorization: `Bearer ${token}` }});
           if(response.data){
                return response.data;
            }else{
                return [];
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to fetch friends");
        }
    }

    async sendFriendRequest(id) {
        try {
            const response = await API.post(`/sendfriendrequest/${id}`,{headers: { Authorization: `Bearer ${token}` }});
           if(response.data){
                return response.data;
            }else{
                return [];
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to send friend request");
        }
    }

    async acceptFriendRequest(id) {
        try {
            const response = await API.put(`/acceptfriendrequest/${id}`,{headers: { Authorization: `Bearer ${token}` }});
            if(response.data){
                return response.data;
            }else{
                return [];
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to accept friend request");
        }
    }

    async getFriendRequest() {
        try {
            const response = await API.get("/getfriendrequest",{headers: { Authorization: `Bearer ${token}` }});
           if(response.data){
                return response.data;
            }else{
                return [];
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to fetch friend requests");
        }
    }

    async getOutgoingFriendRequest() {
        try {
            const response = await API.get("/getoutgoingfriendrequest",{headers: { Authorization: `Bearer ${token}` }});
            if(response.data){
                return response.data;
            }else{
                return [];
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to fetch outgoing friend requests");
        }
    }
}
const userService = new UserService();
export default userService;