import React, { Component } from 'react';
import { FaStar } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const setActiveLink = ({ isActive }) => isActive ? 'header__nav-link nav-link nav-link-active' : 'header__nav-link nav-link'
const setActiveIcon = ({ isActive }) => isActive ? 'header__icons-link icons-link icons-link-active' : 'header__icons-link icons-link'

let lastScroll = 0
const defaultOffset = 100

export default class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHide: false
        }
    }

    render() {
        document.addEventListener('scroll', () => {
            if (window.scrollY > lastScroll && !this.state.isHide && window.scrollY > defaultOffset) {
                this.setState({ isHide: true })
            } else if (window.scrollY < lastScroll && this.state.isHide) {
                this.setState({ isHide: false })
            }
            lastScroll = window.scrollY
        })

        return (
            <header className={this.state.isHide ? 'header header-hide' : 'header'}>
                <div className='header__container'>
                    <div className='header__nav nav'>
                        <ul className='header__nav-list nav-list'>
                            <li className='header__nav-item nav-item'>
                                <NavLink to='/' className={setActiveLink} >Главная</NavLink>
                            </li>
                            <li className='header__nav-item nav-item'>
                                <NavLink to='/recommendations' end className={setActiveLink} >Рекомендации</NavLink>
                            </li>
                            <li className='header__nav-item nav-item'>
                                <NavLink to='/catalog' end className={setActiveLink} >Каталог</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className='header__icons icons'>
                        <ul className='header__icons-list icons-list'>
                            <li className='header__icons-item icons-item'>
                                <NavLink to='/favorites' end className={setActiveIcon}><FaStar className='icon' /></NavLink>
                            </li>
                            <li className='header__icons-item icons-item'>
                                <NavLink to='/account' className={setActiveIcon}><FaUser className='icon' /></NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </header >
        )
    }
}