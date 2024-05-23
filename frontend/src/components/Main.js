import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Recommendations from '../pages/Recommendations';
import Catalog from '../pages/Catalog';
import Favorites from '../pages/Favorites';
import Account from '../pages/Account';
import News from '../pages/News';
import Book from '../pages/Book';
import Tops from '../pages/Tops';
import Collections from '../pages/Collections';
import Collection from '../pages/Collection';
import Authorisation from '../pages/Authorisation';
import ForgetPassword from '../pages/ForgetPassword';
import Registration from '../pages/Registration';
import Reader from '../pages/Reader';
import Librarian from '../pages/Librarian';
import BookHistory from '../pages/BookHistory';

export default class Main extends Component {
    render() {
        // window.scrollTo({
        //     top: 0,
        //     left: 0,
        //     behavior: 'smooth'
        // })
        return (
            <main className='main'>
                <main className='main__container'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/home/:title' element={<News />} />
                        <Route path='/recommendations' element={<Recommendations />} />
                        <Route path='/recommendations/tops/:title' element={<Book />} />
                        <Route path='/recommendations/tops' element={<Tops />} />
                        <Route path='/recommendations/collections' element={<Collections />} />
                        <Route path='/recommendations/collections/:title' element={<Collection />} />
                        <Route path='/catalog' element={<Catalog />} />
                        <Route path='/catalog/:title' element={<Book />} />
                        <Route path='/favorites' element={<Favorites />} />
                        <Route path='/account' element={<Account />} />
                        <Route path='/account/reader' element={<Reader />} />
                        <Route path='/account/reader/bookhistory' element={<BookHistory />} />
                        <Route path='/account/reader/bookhistory:title' element={<BookHistory />} />
                        <Route path='/account/librarian' element={<Librarian />} />
                        <Route path='/authorisation' element={<Authorisation />} />
                        <Route path='/authorisation/forget_password' element={<ForgetPassword />} />
                        <Route path='/registration' element={<Registration />} />
                    </Routes>
                </main>
            </main>
        )
    }
}
