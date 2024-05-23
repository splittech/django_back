import React, { Component } from 'react'
import BookItem from './BookItem'
import { Link } from 'react-router-dom'

export default class PersonalRecommendations extends Component {
    render() {
        return (
            <div className='book-list'>
                {this.props.bookItems.map(el => (
                    <Link to={`personalrecommendations/${el.title}`} className='book-link-another-page' key={el.id}>
                        <BookItem key={el.id} bookItem={el} />
                    </Link>
                ))}
            </div>
        )
    }
}
