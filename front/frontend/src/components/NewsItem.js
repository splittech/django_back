import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class NewsItem extends Component {
    render() {
        return (
            <div className='news'>
                <img src={`http://127.0.0.1:8000/${this.props.news.image}`} width={230} height={230} className='news-img'></img>
                <div className='news-text-part'>
                    <div className='news-description'>
                        <h1 className='news-description-title'>{this.props.news.title}</h1>
                        <p className='news-description-text'>{this.props.news.text}</p>
                        <div className='news-description-bottom'></div>
                    </div>
                    <Link to={`/home/${this.props.news.title}`} className='news-description-read-completely'>Читать полностью</Link>
                </div>
            </div>
        )
    }
}
