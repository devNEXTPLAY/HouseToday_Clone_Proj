import { defer } from 'react-router-dom'

const loadDataArticle = async (postId) => {
    const response = await fetch('http://localhost:3005/api/blog/detail/' + postId)

    if (!response.ok) {
        throw new Error('서버 오류')
    } else {
        const responseData = await response.json()
        return responseData
    }
}

export const loaderArticle = ({ request, params }) => {
    const postId = params.id

    return defer({
        data: loadDataArticle(postId),
    })
}
