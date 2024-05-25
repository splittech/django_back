const User = require('../User')

class AuthResponse {
    constructor(auth_token, user) {
        this.auth_token = auth_token
        this.user = user
    }
}

module.exports = AuthResponse 