import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,

    headers: {
        'Content-Type': 'text/plain',
    },
})

export default axiosInstance