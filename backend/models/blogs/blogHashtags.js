module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"BlogHashtag",
		{
			blog_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Blogs",
					key: "blog_id",
				},
				comment: "블로그 게시글 고유번호",
			},
			hashtag_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Hashtags",
					key: "hashtag_id",
				},
				comment: "해시태그 고유번호",
			},
		},
		{
			sequelize,
			timestamps: false,
			tableName: "BlogHashtags",
			comment: "블로그 게시글과 해시태그 관계 테이블",
			indexes: [
				{
					name: "idx_blog_hashtag",
					using: "BTREE",
					fields: ["blog_id", "hashtag_id"],
				},
			],
		}
	);
};
