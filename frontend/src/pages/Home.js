import React from 'react'
import NewsItem from '../components/NewsItem'
import useDinamicPagination from '../hooks/use-dinamicPagination'

export default function Home() {
    const [news, setNews] = useDinamicPagination('https://jsonplaceholder.typicode.com/photos', 10)
    
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
