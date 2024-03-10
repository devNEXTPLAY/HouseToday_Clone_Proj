module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"Comment",
		{
			comment_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				comment: "댓글 고유번호",
			},
			blog_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Blogs",
					key: "blog_id",
				},
				comment: "게시글 고유번호",
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "user_id",
				},
				comment: "댓글 작성자 사용자 고유번호",
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
				comment: "댓글 내용",
			},
			parent_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "상위 댓글 고유번호 (대댓글 기능을 위한 필드)",
				references: {
					model: "Comments",
					key: "comment_id",
				},
			},
			like_count: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
				comment: "좋아요수",
				defaultValue: 0,
			},
			comment_status_code: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "댓글 상태코드 0:정상 1:삭제",
				defaultValue: 0,
			},
			ip_address: {
				type: DataTypes.STRING(100),
				allowNull: false,
				comment: "댓글 작성자 아이피주소",
			},
			reg_date: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				comment: "댓글 작성일",
			},
			edit_date: {
				type: DataTypes.DATE,
				allowNull: true,
				comment: "댓글 수정일",
			},
		},
		{
			sequelize,
			tableName: "Comments",
			timestamps: false,
			comment: "게시글 댓글 테이블",
		}
	);
};
