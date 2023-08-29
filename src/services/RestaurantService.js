import axios from "axios"
import { ApiConstants } from "../constants"
import { authHeader } from "../utils"
import { getToken } from "../Store"

const getRestaurant = async () => {
    console.log(`RestaurantService  get | getRestaurant`)
    try {
        let restaurantResponse = await axios.get(`${ApiConstants.BACKEND_API.BASE_API_URL}${ApiConstants.BACKEND_API.RESTAURANT}`, 
        // {
        //     headers: authHeader(getToken())
        // }
        )
        // console.log(restaurantResponse);
        if (restaurantResponse?.status === 200) {
            console.log(restaurantResponse);
            return {
                status: true,
                message: 'Restaurant data fetched',
                data: restaurantResponse?.data?.data
            }
        } else {
            return {
                status: false,
                message: 'Restaurant data not found'
            }
        }
    } catch (error) {
        return {
            status: false,
            message: 'Restaurant data not found'
        }
    }
}

export default { getRestaurant }