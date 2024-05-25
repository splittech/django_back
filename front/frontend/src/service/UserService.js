import $api from "../http";

export default class UserService {
    static async getNews(id) {
        return $api.get('/api/v1/news', { id })
    }

    static async getBook(id) {
        return $api.get('/api/v1/book', { id })
    }
    
    static async getAuthors() {
        return $api.get('')
    }
    
    static async getGenres() {
        return $api.get('/api/v1/book/genres')
    }
    
    static async getTags() {
        return $api.get('/api/v1/book/tags')
    }
    
    static async getTops() {
        return $api.get('')
    }
    
    static async getCollections() {
        return $api.get('')
    }
    
    static async getCollectionsItem(id) {
        return $api.get('', { id })
    }
    
    static async getFavorites(id) {
        return $api.get('', { id })
    }
}