import { useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { TextLogo } from '../../assets/TextLogo'
import Button from '../../components/ui/Button'

import EditForm from '../../components/article/EditForm'
import { fetchPostEdit } from '../../util/http'

import classes from './css/CreateArticle.module.css'

//* 게시글 수정
const EditArticle = () => {
    const token = useSelector((state) => state.Auth.token)
    const param = useParams()

    const navigate = useNavigate()

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
            <EditForm id="edit-write" onSubmit={handleSubmit} paramId={param.id} />
        </>
    )
}

export default EditArticle
