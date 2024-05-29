import React, { Component } from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Recommendations from '../pages/Recommendations';
import Catalog from '../pages/Catalog';
import FavoritesPage from '../pages/FavoritesPage';
import Account from '../pages/Account';
import News from '../pages/News';
import Book from '../pages/Book';
import TopsPage from '../pages/TopsPage';
import CollectionsPage from '../pages/CollectionsPage';
import CollectionPage from '../pages/CollectionPage';
import Authorisation from '../pages/Authorisation';
import ForgetPassword from '../pages/ForgetPassword';
import Registration from '../pages/Registration';
import Reader from '../pages/Reader';
import Librarian from '../pages/Librarian';
import BookHistory from '../pages/BookHistory';
import Reviews from '../pages/Reviews';
import BooksLibrarian from '../pages/BooksLibrarian';
import ReadersLibrarian from '../pages/ReadersLibrarian';
import ReviewsLibrarian from '../pages/ReviewsLibrarian';

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
                        <Route path='/home/:id' element={<News />} />
                        <Route path='/recommendations' element={<Recommendations />} />
                        <Route path='/recommendations/tops/:id' element={<Book />} />
                        <Route path='/recommendations/tops/:id/reviews' element={<Reviews />} />
                        <Route path='/recommendations/tops' element={<TopsPage />} />
                        <Route path='/recommendations/collections' element={<CollectionsPage />} />
                        <Route path='/recommendations/collections/:id' element={<CollectionPage />} />
                        <Route path='/catalog' element={<Catalog />} />
                        <Route path='/catalog/:id' element={<Book />} />
                        <Route path='/catalog/:id/reviews' element={<Reviews />} />
                        <Route path='/favorites' element={<FavoritesPage />} />
                        <Route path='/account' element={<Account />} />
                        <Route path='/account/reader' element={<Reader />} />
                        <Route path='/account/reader/bookhistory' element={<BookHistory />} />
                        <Route path='/account/reader/bookhistory:id' element={<BookHistory />} />
                        <Route path='/account/librarian' element={<Librarian />} />
                        <Route path='/account/librarian/books' element={<BooksLibrarian />} />
                        <Route path='/account/librarian/readers' element={<ReadersLibrarian />} />
                        <Route path='/account/librarian/reviews' element={<ReviewsLibrarian />} />
                        <Route path='/authorisation' element={<Authorisation />} />
                        <Route path='/authorisation/forget_password' element={<ForgetPassword />} />
                        <Route path='/registration' element={<Registration />} />
                    </Routes>
                </main>
            </main>
        )
    }
}
