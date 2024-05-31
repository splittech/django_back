class User {
    constructor(books, groups, username, lastname, firstname, email, id) {
        this.books = books
        this.groups = groups
        this.username = username
        this.lastname = lastname
        this.firstname = firstname
        this.email = email
        this.id = id
    }
}

module.exports = User