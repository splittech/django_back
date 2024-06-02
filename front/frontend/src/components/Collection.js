import React, { Component } from 'react'
import { FaBookOpen } from "react-icons/fa";

export default class Collection extends Component {
    render() {
        return (
            <div className='collection-item'>
                <span className='collection-item-title'>{this.props.collection.title}</span>
                <div className='collection-item-images'>
                    <img src={this.props.collection.books[0].image} width={90} height={135} className='collection-item-image'></img>
                    <img src={this.props.collection.books[1].image} width={90} height={135} className='collection-item-image'></img>
                    {this.props.collection.books.length > 2 ?
                        <img src={this.props.collection.books[2].image} width={90} height={135} className='collection-item-image'></img>
                        : <div className='collection-item-image'><FaBookOpen className='collection-item-no-image' /></div>}
                    {this.props.collection.books.length > 3 ?
                        <img src={this.props.collection.books[3].image} width={90} height={135} className='collection-item-image'></img>
                        : <div className='collection-item-image'><FaBookOpen className='collection-item-no-image' /></div>}
                </div>
            </div >
        )
    }
}
