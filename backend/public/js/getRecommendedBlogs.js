// 메인페이지 추천 블로그 가져오기 모듈 함수
// 최근 24시간 내에 작성된 블로그 중 조회수, 좋아요 수, 댓글 수를 고려하여 가장 높은 점수를 가진
// 집들이 4개, 집 사진 4개를 추천
const db = require("../../models");
const enums = require("../../common/enums.js");
const { Op } = require("sequelize");

async function getRecommendedBlogs(blog_type_code) {
	try {
		const blogs = await db.Blogs.findAll({
			attributes: ["blog_id", "view_count", "like_count", "comment_count", "reg_date"],
			where: {
				blog_status_code: {
					[Op.or]: [enums.BLOG_STATUS_CODE.APPROVED, enums.BLOG_STATUS_CODE.APPLIED],
				},
                blog_type_code,
			},
		});

		const blogScores = blogs.map((blog) => {
			const hoursSincePosted = (new Date() - new Date(blog.reg_date)) / (1000 * 60 * 60);
			let timeScore = hoursSincePosted <= 24 ? 1 : 1 / Math.pow(hoursSincePosted - 23, 2);
			const popularityScore =
				Math.log(1 + blog.view_count * 0.1 + blog.like_count * 0.6 + blog.comment_count * 0.3) / Math.log(5);
			const score = timeScore * 0.8 + popularityScore * 0.2;

			return { blog_id: blog.blog_id, score };
		});

        var ret_number = 4;
        if (blog_type_code === enums.BLOG_TYPE_CODE.PHOTO_VIDEO) {
            ret_number = 6;
        }
		const recommendedBlogs = blogScores
			.sort((a, b) => b.score - a.score)
			.slice(0, ret_number)
			.map((blog) => blog.blog_id);

		return recommendedBlogs;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

module.exports = getRecommendedBlogs;
