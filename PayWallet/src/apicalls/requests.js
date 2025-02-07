
import { axiosInstance } from ".";

//get all requests for a user

export const GetAllRequestsByUser = async () => {
    try {
        const { data } = await axiosInstance.post("http://localhost:5000/api/requests/get-all-requests-by-user");
        return data
    } catch (error) {
        return error.response.data
    }

}

// send a request to another user

export const SendRequest = async (request) => {
    try {
        console.log(request)
        const { data } = await axiosInstance.post("http://localhost:5000/api/requests/send-request", request)
        return data
    } catch (error) {
        return error.response.data
    }
}

// update request satus from receiver side

export const UpdateRequestStatus = async (payload) => {
    console.log(payload)
    try {
        const {data} = await axiosInstance.post("http://localhost:5000/api/requests/update-request-status", payload)
        return data
    } catch (error) {
        return error.response.data
    }
}