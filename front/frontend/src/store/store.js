import { makeAutoObservable } from 'mobx'
import AuthService from "../service/AuthService";
import axios from 'axios';
import { API_URL } from '../http';

export default class Store {
    user = {}
    isAuth = false
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setUser(user) {
        this.user = user
        console.log(user)
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('auth_token', response.data.auth_token)
            // localStorage.setItem('token', response.data.accessToken)
            // localStorage.setItem('userRole', response.data.userRole)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(email, firstname, lastname, password) {
        try {
            const response = await AuthService.registration(email, firstname, lastname, password)
            console.log(response)
            localStorage.setItem('auth_token', response.data.auth_token)
            // localStorage.setItem('token', response.data.accessToken)
            // localStorage.setItem('userRole', response.data.userRole)
            this.setAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout()
            console.log(response)
            localStorage.removeItem('auth_token')
            this.setAuth(false)
            this.setUser({})
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth(email, password) {
        this.setLoading(true)
        try {
            const response = await axios.post(`${API_URL}/auth/token/login/`, { withCredentials: true, email, password })
            // const response = await axios.post(`${API_URL}/auth/jwt/refresh`, { withCredentials: true })
            localStorage.setItem('auth_token', response.data.auth_token)
            // localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            // this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }

    async isReader() {
        const role = localStorage.getItem('userRole')
        if (role === '' || role === 'Reader') {
            return true
        } else {
            return false
        }
    }
}