var db = require("../../models/index.js");

// 댓글과 대댓글을 재귀적으로 조회
async function fetchComments(commentId, blogId) {
	const comments = await db.Comments.findAll({
		where: commentId ? { parent_id: commentId } : { blog_id: blogId, parent_id: null },
		include: [
			{
				model: db.Users,
				attributes: ["nickname"],
				as: "User",
			},
			{
				model: db.Comments,
				as: "Replies",
				required: false,
				separate: true, // 대량의 대댓글이 있는 경우 성능 최적화를 위해 분리 쿼리 실행
				include: [
					{
						model: db.Users,
						attributes: ["nickname"],
						as: "User",
					},
				],
			},
		],
	});

	// 각 댓글에 대한 대댓글을 재귀적으로 조회
	for (let comment of comments) {
		if (comment.Replies) {
			comment.Replies = await fetchComments(comment.comment_id);
		}
	}

	return comments;
}

// 단일 게시글 조회 시 댓글 및 대댓글을 모두 포함하여 가져오는 함수
async function getComments(blogId) {
	try {
		// 최상위 댓글 조회 및 대댓글 포함 처리
		const comments = await fetchComments(null, blogId);
		return comments;
	} catch (err) {
		throw err;
	}
}

module.exports = getComments;
