import React from 'react'
import NewsItem from '../components/NewsItem'
import useDinamicPagination from '../hooks/use-dinamicPagination'

export default function Home() {
    const [news, setNews] = useDinamicPagination('http://127.0.0.1:8000/api/v1/news/', 1)
    
    return (
        <div>
            <h1 className='page-title'>Новости</h1>
            <div className='news-list'>
                {news.map(el =>
                    <NewsItem news={el} key={el.id} />
                )}
            </div>
        </div>
    )
}
