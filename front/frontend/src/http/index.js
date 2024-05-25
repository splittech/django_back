import axios from 'axios'

export const API_URL = `http://localhost:8000/`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Token ${localStorage.getItem('auth_token')}`
    return config
})

// $api.interceptors.response.use((config) => {
//     return config
// }, async (error) => {
//     const originalRequest = error.config
//     if (error.response.status == 401 && error.config && !error.config._isRetry) {
//         originalRequest._isRetry = true
//         try {
//             const response = await axios.post(`${API_URL}/auth/token/login/`, { withCredentials: true })
//             // const response = await axios.post(`${API_URL}/auth/jwt/refresh`, { withCredentials: true })
//             localStorage.setItem('auth_token', response.data.auth_token)
//             return $api.request(originalRequest)
//         } catch (e) {
//             console.log('Пользователь не авторизован')
//         }
//     }
//     throw error
// })

export default $api