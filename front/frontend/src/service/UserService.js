import $api from "../http";

export default class UserService {
    static async getNews(id) {
        return $api.get(`/api/v1/news/${id}`)
    }

    static async getBook(id) {
        return $api.get(`/api/v1/books/${id}`)
    }

    static async getTops() {
        return $api.get('')
    }

    static async getCollections() {
        return $api.get('')
    }

    static async getCollectionsItem(id) {
        return $api.get(`/api/v1/books/collections/${id}`)
    }

    static async getFavorites(id) {
        return $api.get('', { id })
    }

    static async pinBook(book, reader, auth_token) {
        return $api.post('/api/v1/books/pinbook/', { book, reader },
            { headers: { "Authorization": `Token ${auth_token}` } }
        )
    }

    static async createReview(rating, name, text, author, book, auth_token) {
        return $api.post('/api/v1/books/reviews/create/', { rating, name, text, author, book },
            { headers: { "Authorization": `Token ${auth_token}` } }
        )
    }

    static async addToFavorites(reader, book, auth_token) {
        return $api.post('/api/v1/books/favourite/', { reader, book },
            { headers: { "Authorization": `Token ${auth_token}` } }
        )
    }
}