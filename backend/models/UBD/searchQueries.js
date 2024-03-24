// search queries
// collect the search queries from the users
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"SearchQuery",
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
			query: {
				type: DataTypes.STRING(100),
				allowNull: false,
				comment: "검색어",
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				comment: "검색한 시각",
			},
		},
		{
			sequelize,
			timestamps: false,
			tableName: "SearchQueries",
			comment: "검색어 테이블",
			indexes: [
				{
					name: "idx_search_query",
					using: "BTREE",
					fields: ["user_id", "query"],
				},
			],
		}
	);
};
