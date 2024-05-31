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
        return $api.get('', { id })
    }

    static async getFavorites(id) {
        return $api.get('', { id })
    }

    static async pinBook(book, reader, auth_token) {
        return $api.post('/api/v1/books/pinbook/', { book, reader },
            { headers: { "Authorization": `Token ${auth_token}` } }
        )
    }
}