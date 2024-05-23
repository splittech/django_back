import React, { Component } from 'react'
import PageNavigation from '../components/PageNavigation'
import Tops from '../components/Tops'
import Collections from '../components/Collections'
import { Link } from 'react-router-dom'

export default class Recommendations extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [{
                id: 1,
                title: 'Топы',
                link: '#tops'
            },
            {
                id: 2,
                title: 'Подборки',
                link: '#collections'
            }],
            tops: [{
                id: 1,
                photo: '',
                title: 'Название',
                author: 'Автор',
                rating: 5.0,
                comment: 100,
            },
            {
                id: 2,
                photo: '',
                title: 'Название',
                author: 'Автор',
                rating: 5.0,
                comment: 100,
            },
            {
                id: 3,
                photo: '',
                title: 'Название',
                author: 'Автор',
                rating: 5.0,
                comment: 100,
            },
            {
                id: 4,
                photo: '',
                title: 'Название',
                author: 'Автор',
                rating: 5.0,
                comment: 100,
            },
            {
                id: 5,
                photo: '',
                title: 'Название',
                author: 'Автор',
                rating: 5.0,
                comment: 100,
            },
            {
                id: 6,
                photo: '',
                title: 'Название',
                author: 'Автор',
                rating: 5.0,
                comment: 100,
            },
            {
                id: 7,
                photo: '',
                title: 'Название',
                author: 'Автор',
                rating: 5.0,
                comment: 100,
            },
            {
                id: 8,
                photo: '',
                title: 'Название',
                author: 'Автор',
                rating: 5.0,
                comment: 100,
            },
            {
                id: 9,
                photo: '',
                title: 'Название',
                author: 'Автор',
                rating: 5.0,
                comment: 100,
            },
            {
                id: 10,
                photo: '',
                title: 'Название',
                author: 'Автор',
                rating: 5.0,
                comment: 100,
            },
            {
                id: 11,
                photo: '',
                title: 'Название',
                author: 'Автор',
                rating: 5.0,
                comment: 100,
            },
            ],
            collections: [{
                id: 1,
                title: 'Название',
                author: 'Автор',
                books: ['', '']
            },
            {
                id: 2,
                title: 'Название',
                author: 'Автор',
                books: ['', '', '']
            },
            {
                id: 3,
                title: 'Название',
                author: 'Автор',
                books: ['', '', '', '']
            },
            {
                id: 4,
                title: 'Название',
                author: 'Автор',
                books: ['', '', '', '', '']
            },
            {
                id: 5,
                title: 'Название',
                author: 'Автор',
                books: ['', '', '', '', '']
            },
            {
                id: 6,
                title: 'Название',
                author: 'Автор',
                books: ['', '', '', '', '']
            },
            {
                id: 7,
                title: 'Название',
                author: 'Автор',
                books: ['', '', '', '', '']
            },
            {
                id: 8,
                title: 'Название',
                author: 'Автор',
                books: ['', '', '', '', '']
            },
            {
                id: 9,
                title: 'Название',
                author: 'Автор',
                books: ['', '', '', '', '']
            },
            {
                id: 10,
                title: 'Название',
                author: 'Автор',
                books: ['', '', '', '', '']
            },
            {
                id: 11,
                title: 'Название',
                author: 'Автор',
                books: ['', '', '', '', '']
            },
            ]
        }
    }
    render() {
        return (
            <div>
                <div>
                    <PageNavigation onShowItem={this.state.items} />
                </div>
                <div>
                    <h1 className='section-name'><a name='tops'>Топы</a></h1>
                    <Tops bookItems={this.state.tops.slice(0, 10)} />
                    <Link to={'tops'} className='read-all'>Смотреть все</Link>
                </div>
                <div>
                    <h1 className='section-name'><a name='collections'>Подборки</a></h1>
                    <Collections collection={this.state.collections.slice(0, 10)} />
                    <Link to={'collections'} className='read-all'>Смотреть все</Link>
                </div>
            </div>
        )
    }
}
