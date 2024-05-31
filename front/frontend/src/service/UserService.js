import $api from "../http";

export default class UserService {
    static async getNews(id) {
        return $api.get(`/api/v1/news/${id}`)
    }

    static async getBook(id) {
        return $api.get(`/api/v1/books/${id}`)
    }

    // static async getAuthors() {
    //     return $api.get('/api/v1/books/authors')
    // }

    // static async getGenres() {
    //     return $api.get('/api/v1/books/genres')
    // }

    // static async getTags() {
    //     return $api.get('/api/v1/books/tags')
    // }

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

    static async pinBook(book, reader) {
        const auth_token = localStorage.getItem('auth_token')
        console.log(auth_token)
        console.log({ book, reader })
        return $api.post('/api/v1/books/pinbook/', { book, reader },
            { headers: { "Authorization": `Token ${auth_token}` } }
        )
    }
}