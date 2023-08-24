import { AuthrnticationService, StorageService } from "../services"
import UserService from "../services/UserService"

const types = {
    SET_IS_APP_LOADING: "SET_IS_APP_LOADING",
    SET_TOKEN: 'SET_TOKEN',
    SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE',
    SET_USER_DATA: 'SET_USER_DATA'
}

const setIsAppLoading = (isAppLoading) => {
    return {
        type: types.SET_IS_APP_LOADING,
        payload: isAppLoading
    }
}
const setToken = (token) => {
    return {
        type: types.SET_TOKEN,
        payload: token
    }
}
const setIsFirstTimeUse = () => {
    return {
        type: types.SET_FIRST_TIME_USE,
        payload: false
    }
}

const appStart = () => {
    // checking first time use or not
    return (dispatch, getState) => {
        StorageService.getFirstTimeUse().then(isFirstTimeUse => {
            dispatch({
                type: types.SET_FIRST_TIME_USE,
                payload: isFirstTimeUse ? false : true
            })
        })
        // checking is local storage have token
        StorageService.getToken().then(token => {
            // console.log(token);
            if (token) {
                // if there is token update
                dispatch({
                    type: types.SET_TOKEN,
                    payload: token
                })
                // checking whether the token is valid
                UserService.getUserData().then(userResponse => {
                    if (userResponse?.status) {
                        dispatch({
                            type: types.SET_USER_DATA,
                            payload: userResponse?.data
                        })
                        dispatch({
                            type: types.SET_IS_APP_LOADING,
                            payload: false
                        })
                        // if token is not there(expired) update/refresh
                    } else if (userResponse?.error?.message === 'TokenExpiredError') {
                        AuthrnticationService.refreashToken().then(tokenReponse => {
                            if (tokenReponse?.status) {
                                dispatch({
                                    type: types.SET_TOKEN,
                                    payload: tokenReponse?.data
                                })
                                
                                UserService.getUserData().then(userResponse => {
                                    if (userResponse?.status) {
                                        dispatch({
                                            type: types.SET_USER_DATA,
                                            payload: userResponse?.data
                                        })
                                        dispatch({
                                            type: types.SET_IS_APP_LOADING,
                                            payload: false
                                        })
                                    }
                                }
                                )
                            } else {
                                dispatch({
                                    type: types.SET_TOKEN,
                                    payload: ''
                                })
                                dispatch({
                                    type: types.SET_IS_APP_LOADING,
                                    payload: false
                                })
                            }
                        })
                    }
                })
            }
        })

        dispatch({
            type: types.SET_IS_APP_LOADING,
            payload: false
        })
    }
}



export default { setIsAppLoading, appStart, setToken, types, setIsFirstTimeUse }