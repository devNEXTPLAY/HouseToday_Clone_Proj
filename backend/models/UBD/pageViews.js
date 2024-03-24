// page views
// collect which blog page is viewed by which user
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"PageView",
		{
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
				comment: "블로그 게시글 고유번호",
				references: {
					model: "Blogs",
					key: "blog_id",
				},
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				comment: "조회한 시각",
			},
		},
		{
			sequelize,
			timestamps: false,
			tableName: "PageViews",
			comment: "블로그 게시글 조회 테이블",
			indexes: [
				{
					name: "idx_page_view",
					using: "BTREE",
					fields: ["user_id", "blog_id"],
				},
			],
		}
	);
};
