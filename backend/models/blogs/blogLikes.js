module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"BlogLike",
		{
			like_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
				comment: "좋아요 고유번호",
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "사용자 고유번호",
				references: {
					model: "Users",
					key: "user_id",
				},
			},
			blog_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
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
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "like_id" }],
				},
				{
					name: "idx_blog_like_user_id",
					using: "BTREE",
					fields: [{ name: "user_id" }],
				},
				{
					name: "idx_blog_like_blog_id",
					using: "BTREE",
					fields: [{ name: "blog_id" }],
				},
			],
		}
	);
};
