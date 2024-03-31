import HousePhotoArticleItem from './HousePhotoArticleItem'
import MobileHousePhoto from './MobileHousePhoto'
import classes from './css/HousePhotoArticles.module.css'

export const HousePhotoArticles = ({ data }) => {
    return (
        <ul className={classes.ul}>
            {data?.map((article) => (
                <HousePhotoArticleItem key={article.blog_id} article={article} />
            ))}

            {data?.map((article) => (
                <MobileHousePhoto key={article.blog_id} article={article} />
            ))}
        </ul>
    )
}
