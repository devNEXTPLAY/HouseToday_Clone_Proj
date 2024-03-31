import HouseWarmingPartyArticleItem from './HouseWarmingPartyArticleItem'

import classes from './css/HouseWarmingPartyArticles.module.css'

const HouseWarmingPartyArticles = ({ data }) => {
    return (
        <>
            <div className={classes.text}>
                <span>전체 {data.length}</span>
            </div>
            <ul className={classes.ul}>
                {data?.map((article) => (
                    <HouseWarmingPartyArticleItem key={article.blog_id} article={article} />
                ))}
            </ul>
        </>
    )
}

export default HouseWarmingPartyArticles
