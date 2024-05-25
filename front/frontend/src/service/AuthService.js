import $api from "../http";

export default class AuthService {
    static async login(email, password) {
        return $api.post('/auth/token/login', { email, password })
    }

    static async registration(email, firstname, lastname, password) {
        return $api.post('/auth/users', { email, firstname, lastname, password })
    }

    static async logout() {
        return $api.post('/auth/token/logout')
    }
}