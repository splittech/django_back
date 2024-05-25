import React, { Component } from 'react'

export default class PageNavigation extends Component {
    render() {
        return (
            <>
                {
                    this.props.onShowItem != null &&
                    <div className='main__page-nav page-nav' style={this.props.style}>
                        <ul className='page-nav-list'>
                            {
                                this.props.onShowItem.map(el => {
                                    return <li key={el.id} className='page-nav-item'>
                                        <a href={el.link} className='page-nav-item-link'>{el.title}</a>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                }
            </>
        )
    }
}
