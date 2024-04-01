import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { TextLogo } from '../../assets/TextLogo'
import Button from '../../components/ui/Button'

import EditForm from '../../components/article/EditForm'
import { fetchPostEdit } from '../../util/http'

import classes from './css/CreateArticle.module.css'
import axios from 'axios'

const initialUserValues = {
    blog_type_code: 0,
    title: '',
    contents: '',
    preview_img: '',
    hashtags: [],
}

//* 게시글 수정
const EditArticle = () => {
    const token = useSelector((state) => state.Auth.token)
    const [userValues, setUserValues] = useState(initialUserValues)
    const param = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        const getPost = async () => {
            const response = await axios.get('http://localhost:3005/api/blog/detail/' + param.id)

            setUserValues(response.data)
        }
        getPost()
    }, [param.id])

    const handleSubmit = async (event, userValues) => {
        event.preventDefault()
        fetchPostEdit(userValues, token, param.id)
        navigate('/')
    }

    return (
        <>
            <header className={classes.header}>
                <Link to="/">
                    <TextLogo />
                </Link>

                <div className={classes.buttons}>
                    <Button>임시저장</Button>
                    <Button type="submit" form="edit-write">
                        업로드
                    </Button>
                </div>
            </header>

            {/* //* 게시글 에디터 */}
            <EditForm id="edit-write" onSubmit={handleSubmit} userValues={userValues} onUserValues={setUserValues} />
        </>
    )
}

export default EditArticle
