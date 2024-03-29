import { useConfirm } from '../hooks/useConfirm'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../ui/Button'

import classes from './css/ArticleWriter.module.css'
import axios from 'axios'
import Confirm from '../ui/Confirm'

const ArticleWriter = ({ profileImg, nickname, userId, blogId }) => {
    const token = useSelector((state) => state.Auth.token)
    const currentUser = useSelector((state) => state.Auth.userId)
    const navigate = useNavigate()

    const { isConfirm, onConfirm, offConfirm } = useConfirm()

    const handleDletePost = async () => {
        await axios({
            method: 'delete',
            url: 'http://localhost:3005/api/blog/delete/' + blogId,
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(() => {
                navigate('/')
            })
            .catch((err) => {
                console.error(err.response)
            })
    }

    const handlePostEdit = () => {
        navigate('/write/edit/' + blogId)
    }

    const handleFollow = async () => {
        axios({
            method: 'post',
            url: 'http://localhost:3005/api/users/follow',
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                followee_id: userId,
            },
        })
            .then(() => {
                alert('팔로우 성공')
            })
            .catch((err) => {
                console.error(err.response)
            })
    }

    return (
        <>
            {isConfirm && (
                <Confirm
                    onSure={handleDletePost}
                    offConfirm={offConfirm}
                    title="게시글을 삭제하시겠습니까?"
                    description="'삭제된 게시글은 다시 복원할 수 없습니다. "
                />
            )}
            <div className={classes.writer}>
                <div className={classes.profile}>
                    <Link to="/">
                        <img src={profileImg} alt="프로필 사진" />
                    </Link>

                    <div>
                        <strong>{nickname}</strong>
                        <span>안녕하세요!</span>
                    </div>
                </div>

                <div className={classes.buttons}>
                    {userId !== currentUser && <Button onClick={handleFollow}>팔로우</Button>}
                    {userId === currentUser && (
                        <Button className={classes.edit} onClick={handlePostEdit}>
                            수정
                        </Button>
                    )}
                    {userId === currentUser && (
                        <Button className={classes.delete} onClick={onConfirm}>
                            삭제
                        </Button>
                    )}
                </div>
            </div>

            <hr />
        </>
    )
}

export default ArticleWriter
