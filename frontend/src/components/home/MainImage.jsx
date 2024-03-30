import './css/MainImage.scss'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

// * 대표 이미지
const MainImage = () => {
    const [post, setPost] = useState([])

    useEffect(() => {
        axios
            .get('http://localhost:3005/api/blog/main')
            .then((res) => {
                console.log(res.data)
                setPost(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return <></>
}

export default MainImage
