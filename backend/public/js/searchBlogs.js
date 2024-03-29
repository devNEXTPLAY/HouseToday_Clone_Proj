const sequelize = require('../../models/index.js').sequelize
const enums = require('../../common/enums.js')

async function searchBlogs(keyword) {
    const query = `
      SELECT 
        Blog.blog_id, 
        Blog.title, 
        Blog.contents, 
        Blog.user_id, 
        Blog.blog_type_code,
        User.nickname AS user_nickname,
        GROUP_CONCAT(Hashtags.hashtag_name) AS hashtags
      FROM Blogs AS Blog
      JOIN Users AS User ON Blog.user_id = User.user_id
      LEFT JOIN BlogHashtags AS BlogHashtag ON Blog.blog_id = BlogHashtag.blog_id
      LEFT JOIN Hashtags AS Hashtags ON BlogHashtag.hashtag_id = Hashtags.hashtag_id
      WHERE Blog.title LIKE :keyword
        OR Blog.contents LIKE :keyword
        OR Hashtags.hashtag_name LIKE :keyword
      GROUP BY Blog.blog_id, Blog.title, Blog.contents, Blog.user_id, User.nickname
    `

    const replacements = {
        keyword: `%${keyword}%`,
    }

    try {
        const results = await sequelize.query(query, {
            replacements: replacements,
            type: sequelize.QueryTypes.SELECT,
        })
        // results를 blog_type_code에 구분하여 return
        return {
            housewarming: results.filter((result) => result.blog_type_code === enums.BLOG_TYPE_CODE.HOUSEWARMING),
            tip: results.filter((result) => result.blog_type_code === enums.BLOG_TYPE_CODE.TIP),
            photo_video: results.filter((result) => result.blog_type_code === enums.BLOG_TYPE_CODE.PHOTO_VIDEO),
        }
    } catch (error) {
        console.error('Search query error:', error)
        throw error
    }
}

module.exports = searchBlogs
