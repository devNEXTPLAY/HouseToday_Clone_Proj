// import Resizer from "./resizer";
import { useState, useMemo, useRef, useEffect } from 'react'

// * TinyMCE: 텍스트 에디터 라이브러리
// import { Editor } from "@tinymce/tinymce-react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import Input from '../ui/Input'
import EditHashtag from './EditHashtag'
import EditMainImage from './EditMainImage'

import { formats } from '../../util/formats'
import { fetchPostUploadImage } from '../../util/http'

import classes from './css/Form.module.css'

const initialUserValues = {
    blog_type_code: 0,
    title: '',
    contents: '',
    preview_img: '',
    hashtags: [],
}

const handleStopSubmit = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        return false
    }
}

// * 게시글 에디터
const EditForm = ({ id, onSubmit, paramId }) => {
    const [userValues, setUserValues] = useState(initialUserValues)

    useEffect(() => {
        const getPost = async () => {
            const response = await fetch('http://localhost:3005/api/blog/detail/' + paramId)

            if (!response.ok) {
                throw new Error('서버 오류')
            } else {
                const responseData = await response.json()
                setUserValues(responseData)
            }
        }
        getPost()
    }, [paramId])

    const quillRef = useRef()
    const imageHandler = () => {
        const input = document.createElement('input')

        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.addEventListener('change', async () => {
            const file = input.files[0]
            const formData = new FormData()
            formData.append('file', file)

            try {
                fetchPostUploadImage(formData, quillRef)
            } catch (error) {
                console.log(error)
            }
        })
    }

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    ['image'],
                    [{ header: [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        }
    }, [])

    const handleUpdateContent = (event) =>
        setUserValues((prevValues) => {
            return { ...prevValues, contents: event }
        })

    // 해시태그 추가시, 엔터키로 인한 폼 전송 방지

    return (
        <form
            className={classes.form}
            id={id}
            onKeyDown={handleStopSubmit}
            onSubmit={(event) => onSubmit(event, userValues)}
        >
            {/* //* 대표 이미지 업로드 */}
            <EditMainImage onUserValues={setUserValues} previewImg={userValues.preview_img} />

            {/* 제목 */}
            <Input
                name="title"
                placeholder="제목을 입력해주세요."
                value={userValues.title}
                className={classes.title}
                onChange={(event) =>
                    setUserValues((prevValues) => {
                        return { ...prevValues, [event.target.name]: event.target.value }
                    })
                }
            />

            {/* 카테고리 */}
            <section className={classes.section}>
                <div className={classes.selectBox}>
                    <label htmlFor="select__option">카테고리</label>
                    <select
                        id="select__option"
                        value={userValues.blog_type_code}
                        onChange={(event) =>
                            setUserValues((prevValues) => {
                                return { ...prevValues, blog_type_code: event.target.value }
                            })
                        }
                    >
                        <option value="0">집들이</option>
                        <option value="1">노하우</option>
                        <option value="2">사진 / 영상</option>
                    </select>
                </div>

                {/* 해시태그 입력 폼 */}
                <EditHashtag userValues={userValues} onUserValues={setUserValues} />
            </section>

            {/* TinyMCE API 사용량 초과로 ReactQuill 변경 주말 중 업데이트 예정 */}
            {/* 구현 기술, 드래그앤 드랍 이미지 추가 ......... */}
            <ReactQuill
                ref={quillRef}
                theme="snow"
                id="quill"
                className={classes.quill}
                placeholder="내용을 입력해주세요."
                value={userValues.contents}
                style={{ width: '720px', height: '1000px' }}
                onChange={handleUpdateContent}
                formats={formats}
                modules={modules}
            />
        </form>
    )
}

export default EditForm
