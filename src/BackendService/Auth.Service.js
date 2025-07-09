import axios from "axios";

const API=axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_API_URL}/api/v1/auth`,
    withCredentials:true
})
const token = localStorage.getItem("accessToken") || null;

class AuthService {
    async createUser({fullname, email, password}){
        try {
            const response = await API.post("/register", {fullname, email, password});
            if(response.data){
              await this.loginUser({email, password})
            }else{
                return response.data;
            }
        } catch (error) {
            // console.log("error: ",error);
            
            throw new Error(error.response?.data?.message || "Registration failed");
        }
    }

    async loginUser({email, password}){
        try {
            const response = await API.post("/login", {email, password});
            // console.log("Response: ",response);
            if(response){
                const {accessToken,refreshToken}=response.data?.data
                localStorage.setItem("accessToken",accessToken)
                localStorage.setItem("refreshToken",refreshToken)
                API.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                return response.data;
            }else{
                return null;
            }
            
        } catch (error) {
            // console.log("Error in login: ",error);
            
            throw new Error(error.response?.data?.message || "Login failed");
        }
    }

    async onboardUser({fullname, bio, nativeLanguage, learningLanguage, location,profilePic}){
        try {
            const response = await API.post("/onboard", {fullname, bio, nativeLanguage, learningLanguage, location,profilePic},{headers: { Authorization: `Bearer ${token}` }});
            if(response.data){  
            return response.data;
            }else{
                return null;
            }
        }   catch (error) {
            throw new Error(error.response?.data?.message || "Onboarding failed");
        } 
     }
    async logoutUser(){
        try {
            const response = await API.post("/logout",{headers: { Authorization: `Bearer ` }});
            // console.log("Helo",response);
              if(response){
                localStorage.setItem("accessToken",null)
                localStorage.setItem("refreshToken",null)
                return response.data;
            }else{
                return null;
            }
        } catch (error) {
            // console.log("error:",error);
            return null
            // throw new Error(error.response?.data?.message || "Logout failed");
        }
    }

    async getUserDetails(){
        try {
            const response = await API.get("/getcurrentuser",{headers: { Authorization: `Bearer ${token}` }});
            // console.log("Getcurrent user not null: ",response.data);
            if(response){
                // console.log("Getcurrent user not null: ",response.data);
                return response.data;
            }else{
                // console.log("Getcurrent user in null: ",response.data);
                return null;
            }
        } catch (error) {
            // console.log("Getcurrent user in error: ",error.response?.data?.data);
            return error.response?.data?.data;
            // throw new Error(error.response?.data?.message || "Failed to fetch user details");
        }
    }
}
const authService = new AuthService();
export default authService;