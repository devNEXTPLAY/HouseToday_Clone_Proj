// import Resizer from "./resizer";
import { useState, useMemo, useRef } from 'react'

// * TinyMCE: 텍스트 에디터 라이브러리
// import { Editor } from "@tinymce/tinymce-react";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import Input from '../ui/Input'
import CreateHashtag from './CreateHashtag'
import CreateMainImage from './CreateMainImage'

import { formats } from '../../util/formats'
import { fetchPostUploadImage } from '../../util/http'

import classes from './css/Form.module.css'

const handleStopSubmit = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault()
        return false
    }
}

// * 게시글 에디터
const CreateForm = ({ id, onSubmit, userValues, onUserValues }) => {
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

    const handleUpdateContent = (event) => {
        if (event === '' || event === '<p><br></p>') {
            onIsInvalid((prevValues) => {
                return { ...prevValues, contents: false }
            })
        }

        onUserValues((prevValues) => {
            return { ...prevValues, contents: event }
        })
    }

    const handleSelect = (event) => {
        onUserValues((prevValues) => {
            return { ...prevValues, blog_type_code: event.target.value }
        })
    }

    return (
        <form
            className={classes.form}
            id={id}
            onKeyDown={handleStopSubmit}
            onSubmit={(event) => onSubmit(event, userValues)}
        >
            {/* //* 대표 이미지 업로드 */}
            <CreateMainImage onUserValues={onUserValues} />

            {/* 제목 */}
            <Input
                name="title"
                placeholder="제목을 입력해주세요."
                className={classes.title}
                onChange={(event) =>
                    onUserValues((prevValues) => {
                        return { ...prevValues, [event.target.name]: event.target.value }
                    })
                }
            />

            {/* 카테고리 */}
            <section className={classes.section}>
                <div className={classes.selectBox}>
                    <label htmlFor="select__option">카테고리</label>
                    <select id="select__option" onChange={handleSelect}>
                        <option value="0">집들이</option>
                        <option value="1">노하우</option>
                        <option value="2">사진 / 영상</option>
                    </select>
                </div>

                {/* 해시태그 입력 폼 */}
                <CreateHashtag userValues={userValues} onUserValues={onUserValues} />
            </section>

            {/* TinyMCE API 사용량 초과로 ReactQuill 변경 주말 중 업데이트 예정 */}
            {/* 구현 기술, 드래그앤 드랍 이미지 추가 ......... */}
            <ReactQuill
                ref={quillRef}
                className={classes.quill}
                theme="snow"
                placeholder="내용을 입력해주세요."
                value={userValues.contents}
                style={{ width: '720px', height: '500px' }}
                onChange={handleUpdateContent}
                formats={formats}
                modules={modules}
            />
        </form>
    )
}

export default CreateForm
