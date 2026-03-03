import axios from "axios";
import {getToken, removeToken} from "./auth.ts"

const api = axios.create({
    baseURL: "http://localhost:8001",
})

api.interceptors.request.use(config => {
    const token = getToken()

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401){
            removeToken()
            localStorage.removeItem("selectedCampaign")
        }
        return Promise.reject(error)
    }
)

export default api