import axios from "axios"
import { ApiConstants } from "../constants"
import { authHeader } from "../utils"

const getUserData = async () => {
    console.log(`UserService  get | getUserData`)
    try {
        let userResponse = await axios.get(`${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.USER}/get-user`,{
            headers:authHeader
        })
        if (userResponse?.status === 200) {
            return {
                status: true,
                message: 'User data fetched',
                data: userResponse?.data
            }
        } else {
            return {
                status: false,
                message: 'User data not found'
            }
        }
    } catch (error) {
        return {
            status: false,
            message: 'User data not found'
        }
    }
}

export default { getUserData }