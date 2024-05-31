import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

export default function UseGetArray(url) {
    const [array, setArray] = useState([])
    const [fetching, setFetching] = useState(true)
    const [totalCount, setTotalCount] = useState(0)
    const arrayRef = useRef(array);
    const totalCountRef = useRef(totalCount);

    useEffect(() => {
        arrayRef.current = array
    }, [array])

    useEffect(() => {
        totalCountRef.current = totalCount
    }, [totalCount])

    useEffect(() => {
        if (fetching) {
            axios.get(`http://127.0.0.1:8000/${url}`,
                { headers: { "Authorization": `Token ${localStorage.getItem('auth_token')}` } }).then(res => {
                    setArray([...array, ...res.data])
                    setTotalCount(res.headers['x-total-count'])
                }).finally(() => setFetching(false))
        }
    }, [fetching])

    return (
        [array, setArray]
    )
}
