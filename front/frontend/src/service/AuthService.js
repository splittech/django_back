import $api from "../http";

export default class AuthService {
    static async login(username, email, password, isCSRF) {
        console.log({ username, email, password })
        return $api.post('/auth/token/login/',
            { username, email, password },
            { headers: { "X-CSRFToken": isCSRF } })
    }

    static async registration(username, email, firstname, lastname, password, isCSRF) {
        return $api.post('/auth/users/',
            { username, email, firstname, lastname, password },
            { headers: { "X-CSRFToken": isCSRF } })
    }

    static async logout(isCSRF) {
        return $api.post('/auth/token/logout/',
            { headers: { "X-CSRFToken": isCSRF } })
    }

    static async getUser(auth_token) {
        return $api.get(`auth/users/me/`,
            { headers: { "Authorization": `Token ${auth_token}` } }
        )
    }
}