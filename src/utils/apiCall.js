import axios from "axios";
import { useNavigate } from "react-router-dom";

const ApiCall = async (method, url, data = null) => {
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate(); // Hook to navigate user

    try {
        const response = await axios({
            method,
            url,
            data,
            headers: token ? { Authorization: `Bearer ${token}` } : {}, // Include token only if it exists
        });
        console.log("Response data:", response.data); // Log response data for debugging
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("API Error Response:", error.response.data); // Log the response error
            // Redirect to login if token is invalid or expired (status 401)
            if (error.response.status === 401) {
                sessionStorage.removeItem("token");
                navigate("/sign-in", { replace: true });
            } else {
                // Handle other errors
                throw new Error(error.response.data.message || "Something went wrong!");
            }
        } else {
            console.error("API Error Message:", error.message); // Log general error
            throw new Error(error.message || "Network error or API is down");
        }
    }
};

export default ApiCall;
