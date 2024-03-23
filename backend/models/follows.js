module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"Follow",
		{
			follower_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "user_id",
				},
				comment: "팔로우하는사람고유번호",
			},
			followee_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "user_id",
				},
				comment: "팔로우받는사람고유번호",
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal("now()"),
				comment: "팔로우생성일시",
			},
		},
		{
			timestamps: false,
			charset: "utf8",
			collate: "utf8_general_ci",
		}
	);
};
