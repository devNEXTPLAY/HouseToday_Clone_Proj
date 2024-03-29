import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { fetchPostUpload } from '../../util/http'

import { TextLogo } from '../../assets/TextLogo'
import CreateArticleGuide from '../../components/article/CreateArticleGuide'
import CreateForm from '../../components/article/CreateForm'
import Button from '../../components/ui/Button'

import classes from './css/CreateArticle.module.css'

// * 게시글 작성
const CreateArticle = () => {
    const token = useSelector((state) => state.Auth.token)
    const navigate = useNavigate()
    const [isInvalid, setIsInvalid] = useState({
        title: true,
        contents: true,
        preview_img: true,
    })

    const handleSubmit = async (event, userValues) => {
        event.preventDefault()

        const res = await fetchPostUpload(userValues, token)
        console.log('res:', res)
        navigate(`/post/${res}`)
    }

    return (
        <>
            <header className={classes.header}>
                <Link to="/">
                    <TextLogo />
                </Link>

                <div className={classes.buttons}>
                    <Button>임시저장</Button>
                    <Button type="submit" form="create-write">
                        업로드
                    </Button>
                </div>
            </header>

            <CreateArticleGuide />

            {/* //* 게시글 에디터 */}
            <CreateForm id="create-write" onSubmit={handleSubmit} isInvalid={isInvalid} onIsInvalid={setIsInvalid} />
        </>
    )
}

export default CreateArticle
