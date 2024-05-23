import React, { Component } from 'react'
import Collection from './Collection'
import { Link } from 'react-router-dom'

export default class Collections extends Component {
    render() {
        return (
            <div className='collection-list'>
                {this.props.collection.map(el => (
                    <Link to={`/recommendations/collections/${el.title}`} className='collection-link-another-page' key={el.id}>
                        <Collection key={el.id} collection={el} />
                    </Link>
                ))}
            </div>
        )
    }
}
