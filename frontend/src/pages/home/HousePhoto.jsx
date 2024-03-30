import { useLoaderData, Await } from 'react-router-dom'

import './css/HousePhoto.scss'

import HousePhotoArticle from '../../components/home/HousePhotoArticle'

const HousePhoto = () => {
    const { data } = useLoaderData()

    return (
        <>
            <main className="house-photo">
                <Await resolve={data}>
                    <Await resolve={data}>{(loadedData) => <HousePhotoArticle data={loadedData} />}</Await>
                </Await>
            </main>
        </>
    )
}

export default HousePhoto
