import { useEffect, useState } from 'react'
import axios from 'axios'

export default function UseDinamicPagination(url, limit, page = 1) {
    const [array, setArray] = useState([])
    const [currentPage, setCurrentPage] = useState(page)
    const [fetching, setFetching] = useState(true)

    useEffect(() => {
        if (fetching) {
            axios.get(`${url}?_limit=${limit}&_page=${currentPage}`).then(res => {
                setArray([...array, ...res.data])
                setCurrentPage(prevState => prevState + 1)
            }).finally(() => setFetching(false))
        }
    }, [fetching])

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return function () {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    const scrollHandler = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 1000) {
            setFetching(true)
        }
    }

    return (
        [array, setArray]
    )
}
