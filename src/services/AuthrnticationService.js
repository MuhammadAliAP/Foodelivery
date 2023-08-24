import axios from "axios"
import { ApiConstants } from "../constants"
import { authHeader } from "../utils"

const AuthRequest = axios.create({
    baseURL: ApiConstants.BACKEND_API.BASE_API_URL
})

const register = async (user) => {
    // console.log(user);
    if (!user?.username || !user?.email || !user?.password) {
        return { status: false, message: "Please fill up all the fields" }
    }
    try {
        let requestBody = {
            username: user?.username,
            email: user?.email,
            password: user?.password
        }
        console.log(user);
        let registerResponse = await AuthRequest.post(ApiConstants.BACKEND_API.REGISTER, requestBody)
        console.log(registerResponse?.data);
        return registerResponse?.data
    } catch (error) {
        console.error(error);
        return { status: false, message: "Oops! Something went wrong" }
    }
}

const checkUserExist = async (type, value) => {

    try {
        let params = { [type]: value }

        let userCheckReponse = await AuthRequest.get(ApiConstants.BACKEND_API.USER_EXIST, { params })
        console.log(userCheckReponse?.data);
        return userCheckReponse?.data
    } catch (error) {
        console.error(error);
        return { status: false, message: "Oops! Something went wrong" }
    }
}

const login = async (user) => {
    // console.log(user);
    if (!user?.username || !user?.password) {
        return { status: false, message: "Please fill up all the fields" }
    }
    try {
        let requestBody = {
            username: user?.username,
            password: user?.password
        }
        console.log(user);
        let loginResponse = await AuthRequest.post(ApiConstants.BACKEND_API.LOGIN, requestBody)
        console.log(loginResponse?.data);
        return loginResponse?.data
    } catch (error) {
        console.error(error);
        return { status: false, message: "Oops! Something went wrong" }
    }
}

const refreashToken = async () => {

    try {
        let tokenResponse = await AuthRequest.get(ApiConstants.BACKEND_API.REFRESH_TOKEN, { headers: authHeader(getToken()) })
        if (tokenResponse?.status === 200) {
            return {
                status: true,
                data:tokenResponse?.data
            }
        } else {
            return {
                status: false,
                
            }
        }
    } catch (error) {
        console.error(error);
        return { status: false, message: "Oops! Something went wrong" }
    }
}

export default { register, login, checkUserExist,refreashToken }