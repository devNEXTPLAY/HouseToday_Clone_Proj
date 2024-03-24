const db = require("../../models/index.js");
const enums = require("../../common/enums.js");

async function mainBlog() {
	try {
		const blogs = await db.Blogs.findAll({
			attributes: ["blog_id", "view_count", "like_count", "comment_count", "reg_date"],
			where: {
				blog_status_code: enums.BLOG_STATUS_CODE.APPROVED,
			},
		});

		const blogScores = blogs.map((blog) => {
			const hoursSincePosted = (new Date() - new Date(blog.reg_date)) / (1000 * 60 * 60);
			let timeScore = hoursSincePosted <= 24 ? 1 : 1 / Math.pow(hoursSincePosted - 23, 2);
			const popularityScore =
				Math.log(
					1 + blog.view_count * 0.1 + blog.like_count * 0.6 + blog.comment_count * 0.3
				) / Math.log(5);
			const score = timeScore * 0.8 + popularityScore * 0.2;

			return { blog_id: blog.blog_id, score };
		});

		const mainBlog = blogScores.reduce(
			(max, blog) => (blog.score > max.score ? blog : max),
			blogScores[0]
		);

		return mainBlog.blog_id;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

module.exports = mainBlog;
