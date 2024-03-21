// user behaviors data model
// bounce rate
// collect the number of leaving users from the website after viewing a certain blog
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"BounceRate",
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
				comment: "떠난 시각",
			},
		},
		{
			sequelize,
			timestamps: false,
			tableName: "BounceRates",
			comment: "블로그 게시글 바운스율 테이블",
			indexes: [
				{
					name: "idx_bounce_rate",
					using: "BTREE",
					fields: ["user_id", "blog_id"],
				},
			],
		}
	);
};
