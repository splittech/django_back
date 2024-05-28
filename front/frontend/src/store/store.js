import { makeAutoObservable } from 'mobx'
import AuthService from "../service/AuthService";
import axios from 'axios';
import { API_URL } from '../http';

export default class Store {
    user = {}
    isAuth = false
    isLoading = false
    isCSRF = null

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

    // setCSRF(csrf) {
    //     this.isCSRF = csrf
    // }

    async login(username, email, password) {
        try {
            // this.getCSRF()
            // const response = await AuthService.login(username, email, password, this.isCSRF)
            const response = await AuthService.login(username, email, password)
            console.log(response)
            localStorage.setItem('auth_token', response.data.auth_token)
            // localStorage.setItem('token', response.data.accessToken)
            // localStorage.setItem('userRole', response.data.userRole)
            // this.setAuth(true)
            this.getUser(localStorage.getItem('auth_token'))
            // this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(username, email, firstname, lastname, password) {
        try {
            // this.getCSRF()
            // const response = await AuthService.registration(username, email, firstname, lastname, password, this.isCSRF)
            const response = await AuthService.registration(username, email, firstname, lastname, password,)
            console.log(response)
            localStorage.setItem('auth_token', response.data.auth_token)
            // localStorage.setItem('token', response.data.accessToken)
            // localStorage.setItem('userRole', response.data.userRole)
            // this.setAuth(true)
            this.getUser(localStorage.getItem('auth_token'))
            // this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async logout() {
        try {
            // const response = await AuthService.logout(this.isCSRF)
            const response = await AuthService.logout()
            console.log(response)
            localStorage.removeItem('auth_token')
            this.setAuth(false)
            this.setUser({})
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    // async checkAuth(username, password) {
    //     this.setLoading(true)
    //     try {
    //         const response = await axios.post(`${API_URL}api/login/`, { withCredentials: true, username, password })
    //         // const response = await axios.post(`${API_URL}/auth/token/login/`, { withCredentials: true, username, password })
    //         // const response = await axios.post(`${API_URL}/auth/jwt/refresh`, { withCredentials: true })
    //         localStorage.setItem('auth_token', response.data.auth_token)
    //         // localStorage.setItem('token', response.data.accessToken)
    //         this.setAuth(true)
    //         // this.setUser(response.data.user)
    //     } catch (e) {
    //         console.log(e.response?.data?.message)
    //     } finally {
    //         this.setLoading(false)
    //     }
    // }

    async isReader() {
        const role = localStorage.getItem('userRole')
        if (role === '' || role === 'Reader') {
            return true
        } else {
            return false
        }
    }

    // async getCSRF() {
    //     try {
    //         const response = await axios.get(`${API_URL}auth/token/csrf/`, { withCredentials: true })
    //         console.log(response)
    //         const csrfToken = response.headers.get('X-CSRFToken')
    //         this.setCSRF(csrfToken)
    //     } catch (e) {
    //         console.log(e?.message)
    //     }
    // }

    async getUser(auth_token) {
        try {
            const response = await AuthService.getUser(auth_token)
            console.log(response)
            this.setUser(response.data.user)
            this.setAuth(true)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }
}