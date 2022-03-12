import axios, { AxiosInstance } from "axios";

class _HttpService{
    axiosInstance:AxiosInstance

        constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'http://localhost:3000',
            withCredentials: true
          });      
    }

    async login(email: string, password: string) {
        return await this.axiosInstance.post("/login",{email, password})
    }

    async logout() {
        return await this.axiosInstance.get("/logout")
    }

    async checkAuth(){
        return await this.axiosInstance.get("/checkAuth")
    }

    async loginWithGoogle() {
        return await this.axiosInstance.get("/login/google")
    }
}

export const HttpService = new _HttpService();