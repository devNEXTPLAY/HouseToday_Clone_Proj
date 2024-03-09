module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"Hashtag",
		{
			hashtag_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				comment: "해시태그 고유번호",
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
				unique: true,
				comment: "해시태그 이름",
			},
		},
		{
			sequelize,
			timestamps: false,
			comment: "해시태그 테이블",
			tableName: "Hashtags",
		}
	);
};
