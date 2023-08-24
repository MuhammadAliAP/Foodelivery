import AsyncStorage from '@react-native-async-storage/async-storage'


const setFirstTimeUse = () => {
    return AsyncStorage.setItem('isFirstTimeUse', 'true')
}
const getFirstTimeUse = () => {
    return AsyncStorage.getItem('isFirstTimeUse')
}
const setToken = token => {
    return AsyncSorage.setItem('token', token);
}
const getToken = () => {
    return AsyncStorage.getItem('token')
}






export default { setFirstTimeUse, getFirstTimeUse, getToken, setToken }