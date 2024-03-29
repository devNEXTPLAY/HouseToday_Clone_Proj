import { Await, useLoaderData } from 'react-router-dom'
import ArticleDetail from '../../components/article/ArticleDetail'

// * 게시글 상세 화면

const Article = () => {
    const { data } = useLoaderData()

    return <Await resolve={data}>{(loadedData) => <ArticleDetail data={loadedData} key={loadedData} />}</Await>
}

export default Article
