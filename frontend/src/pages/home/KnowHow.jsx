import { useLoaderData, Await } from 'react-router-dom'

import KnowHowArticles from '../../components/home/home/knowhow/KnowHowArticles'

import classes from './css/KnowHow.module.css'

const KnowHow = () => {
    const { data } = useLoaderData()

    return (
        <>
            {/* //* 게시글 목록 화면  */}
            <main className={classes.container}>
                <select name="sort" id="sort">
                    <option value="">정렬</option>
                    <option value="like">좋아요순</option>
                </select>

                <Await resolve={data}>{(loadedData) => <KnowHowArticles data={loadedData} />}</Await>
            </main>
        </>
    )
}

export default KnowHow
