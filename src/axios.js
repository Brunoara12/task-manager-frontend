import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://rebaza-task-manager.herokuapp.com'
})

export const setAuthToken = token => {
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log("Assigned Token")
    } else {
        delete instance.defaults.headers.common['Authorization'];
        console.log("Deleted Token")
    }

    console.log(instance.defaults.headers.common['Authorization'])
}

export const getAuthToken = () => {
    return instance.defaults.headers.common['Authorization']
}

export default instance
