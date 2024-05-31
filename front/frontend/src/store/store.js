import { makeAutoObservable } from 'mobx'
import AuthService from "../service/AuthService";
import axios from 'axios';
import { API_URL } from '../http';
import UserService from '../service/UserService';

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

    async login(username, email, password) {
        this.setLoading(true)
        try {
            const response = await AuthService.login(username, email, password)
            console.log(response)
            localStorage.setItem('auth_token', response.data.auth_token)
            // localStorage.setItem('userRole', response.data.userRole)
            this.getUser(localStorage.getItem('auth_token'))
        } catch (e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
        }
    }

    async registration(username, email, firstname, lastname, password) {
        this.setLoading(true)
        try {
            const response = await AuthService.registration(username, email, firstname, lastname, password)
            console.log(response)
            localStorage.setItem('auth_token', response.data.auth_token)
            // localStorage.setItem('userRole', response.data.userRole)
            this.getUser(localStorage.getItem('auth_token'))
        } catch (e) {
            console.log(e.response?.data?.message)
        } finally {
            this.setLoading(false)
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

    async isReader() {
        if (this.isAuth) {
            if (this.user.groups.name === ('Reader')) {
                return true
            } else {
                return false
            }
        }
    }

    async getUser(auth_token) {
        try {
            const response = await AuthService.getUser(auth_token)
            console.log(response)
            this.setUser(response.data)
            this.setAuth(true)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    // async pinBook(bookId, readerId) {
    //     try {
    //         const response = await UserService.pinBook(bookId, readerId)
    //         console.log(response)
    //     } catch (e) {
    //         console.log(e.response?.data?.message)
    //     }
    // }
}