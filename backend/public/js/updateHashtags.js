const db = require('../../models/index.js')
const moment = require('moment')

async function updateHashtags(blog_id, hashtagList) {
    for (let i = 0; i < hashtagList.length; i++) {
        const hashtag = await db.Hashtags.findOne({
            where: {
                hashtag_name: hashtagList[i],
            },
        })
        if (!hashtag) {
            await db.Hashtags.create({
                hashtag_name: hashtagList[i],
                reg_date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            })
        }
        const hashtag_id = await db.Hashtags.findOne({
            attributes: ['hashtag_id'],
            where: {
                hashtag_name: hashtagList[i],
            },
        })
        const blogHashtag = await db.BlogHashtags.findOne({
            where: {
                blog_id,
                hashtag_id: hashtag_id.hashtag_id,
            },
        })
        if (!blogHashtag) {
            await db.BlogHashtags.create({
                blog_id,
                hashtag_id: hashtag_id.hashtag_id,
            })
        }
    }
}

module.exports = updateHashtags
