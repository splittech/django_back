import React, { Component } from 'react'

export default class Up extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }

        this.scrollToTop = this.scrollToTop.bind(this)
        this.toogleVisible = this.toogleVisible.bind(this)
    }

    render() {
        window.addEventListener('scroll', this.toogleVisible)

        return (
            <button className='up' onClick={this.scrollToTop} style={{ opacity: this.state.visible ? '1' : '0' }} >↑</button>
        )
    }

    toogleVisible() {
        const scrolled = document.documentElement.scrollTop
        if (scrolled > 300) {
            this.setState({ visible: true })
        } else if (scrolled <= 300) {
            this.setState({ visible: false })
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

}
