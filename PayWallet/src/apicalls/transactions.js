import { axiosInstance } from ".";

export const VerifyAccount = async (payload) => {
    try {
        const {data} = await axiosInstance.post("http://localhost:5000/api/tranactions/verify-account", payload);
        return data;

    } catch (error) {
        return error.response.data
    }
    
}

export const TransferFunds = async (payload) => {
    try {
        const {data} = await axiosInstance.post("http://localhost:5000/api/tranactions/transfer-funds", payload)
        return data;
    } catch (error) {
        return error.response.data
    }
}

export const AllTransactionsByUser = async () => {
    try {
        const {data} = await axiosInstance.post("http://localhost:5000/api/tranactions/get-all-transactions-by-user")
        return data;
    } catch (error) {
        return error.response.data
    }
}