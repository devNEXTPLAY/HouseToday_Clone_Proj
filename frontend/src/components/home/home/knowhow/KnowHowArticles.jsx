import KnowHowArticleItem from './KnowHowArticleItem'
import classes from './css/KnowHowArticles.module.css'

const KnowHowArticles = ({ data }) => {
    return (
        <ul className={classes.ul}>
            {data?.map((article) => (
                <KnowHowArticleItem article={article} />
            ))}
        </ul>
    )
}

export default KnowHowArticles
