module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"CommentLike",
		{
			comment_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaeyKey: true,
				references: {
					model: "Comments",
					key: "comment_id",
				},
				comment: "댓글 고유번호",
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				references: {
					model: "Users",
					key: "user_id",
				},
				comment: "좋아요를 누른 사용자 고유번호",
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				comment: "좋아요 누른 시각",
			},
		},
		{
			sequelize,
			tableName: "CommentLikes",
			timestamps: false,
			comment: "댓글에 대한 좋아요 테이블",
			indexes: [
				{
					unique: true,
					using: "BTREE",
					fields: ["comment_id", "user_id"],
				},
			],
		}
	);
};
