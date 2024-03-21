// user behaviors data model
// session duration
// collect how long user stays on the website
module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"SessionDuration",
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
			started_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				comment: "세션 시작 시각",
			},
			ended_at: {
				type: DataTypes.DATE,
				allowNull: false,
				comment: "세션 종료 시각",
			},
		},
		{
			sequelize,
			timestamps: false,
			tableName: "SessionDurations",
			comment: "사용자 세션 지속시간 테이블",
		}
	);
};
