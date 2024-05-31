import $api from "../http";

export default class AuthService {
    static async login(username, password) {
        console.log({ username, password })
        return $api.post('/auth/token/login/',
            { username, password })
    }

    static async registration(username, firstname, lastname, password) {
        return $api.post('/auth/users/',
            { username, firstname, lastname, password })
    }

    static async logout() {
        return $api.post('/auth/token/logout/')
    }

    static async getUser(auth_token) {
        return $api.get(`auth/users/me/`,
            { headers: { "Authorization": `Token ${auth_token}` } }
        )
    }
}