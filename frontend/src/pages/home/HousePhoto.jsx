import { useLoaderData, Await } from 'react-router-dom'

import { HousePhotoArticles } from '../../components/home/home/house_photo/HousePhotoArticles'

import classes from './css/HousePhoto.module.css'

const HousePhoto = () => {
    const { data } = useLoaderData()

    return (
        <>
            <main className={classes['house-photo']}>
                <Await resolve={data}>
                    <Await resolve={data}>{(loadedData) => <HousePhotoArticles data={loadedData} />}</Await>
                </Await>
            </main>
        </>
    )
}

export default HousePhoto
