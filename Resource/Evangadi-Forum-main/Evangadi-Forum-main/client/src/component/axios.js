import axios from "axios"

const instance = axios.create({
    baseURL: 'http://localhost:9000', // Use http instead of https, and include the correct port number
})

export default instance;