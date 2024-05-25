import { useParams } from 'react-router-dom'

export default function News() {
    const { title } = useParams()
    return (
        <div>{title}</div>
    )
}
