import $api from "../http";

export default class AuthService {
    static async login(username, email, password) {
        return $api.post('/auth/token/login/', { username, email, password })
    }

    static async registration(username, email, firstname, lastname, password) {
        return $api.post('/auth/users/', { username, email, firstname, lastname, password })
    }

    static async logout() {
        return $api.post('/auth/token/logout/')
    }
}