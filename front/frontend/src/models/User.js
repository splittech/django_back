class User {
    constructor(books, groups, username, last_name, first_name, id) {
        this.books = books
        this.groups = groups
        this.username = username
        this.last_name = last_name
        this.first_name = first_name
        this.id = id
    }
}

module.exports = User