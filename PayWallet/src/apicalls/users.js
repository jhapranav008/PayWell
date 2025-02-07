import { axiosInstance } from ".";

export const LoginUser = async (payload) => {
    try {
        const {data} = await axiosInstance.post("http://localhost:5000/api/users/login", payload);
        return data;

    } catch (error) {
        return error.response.data
    }
    
}

export const RegisterUser = async (payload) => {
    
    try {
        const {data} = await axiosInstance.post("http://localhost:5000/api/users/register", payload);
        return data;
    } catch (error) {
        return error.response.data
    }
}

export const GetUserInfo = async () => {
    
    try {
        const {data} = await axiosInstance.post("http://localhost:5000/api/users/get-user-info");
        
    return data;
    } catch (error) {
        return error.response.data
    }
    
}