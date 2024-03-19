module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"BlogLike",
		{
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				comment: "사용자 고유번호",
				references: {
					model: "Users",
					key: "user_id",
				},
			},
			blog_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
				comment: "게시글 고유번호",
				references: {
					model: "Blogs",
					key: "blog_id",
				},
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				comment: "좋아요 누른 시간",
			},
		},
		{
			sequelize,
			timestamps: false,
			tableName: "BlogLikes",
			comment: "블로그 게시글 좋아요 테이블",
			indexes: [
				{
					unique: true,
					using: "BTREE",
					fields: ["user_id", "blog_id"],
				},
			],
		}
	);
};
