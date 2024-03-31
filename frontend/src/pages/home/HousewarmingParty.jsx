import { useLoaderData, Await } from 'react-router-dom'

import HouseWarmingPartyArticles from '../../components/home/home/housewarming_party/HouseWarmingPartyArticles'
import classes from './css/HousewarmingParty.module.css'

const HousewarmingParty = () => {
    const { data } = useLoaderData()

    return (
        <>
            <div className={classes.container}>
                <select name="sort" id="sort">
                    <option value="">정렬</option>
                    <option value="like">좋아요순</option>
                </select>

                <Await resolve={data}>{(loadedData) => <HouseWarmingPartyArticles data={loadedData} />}</Await>
            </div>
        </>
    )
}

export default HousewarmingParty
