import { useParams } from 'react-router-dom'

export default function Book() {
    const { title } = useParams()
    return (
        <div>{title}</div>
    )
}
