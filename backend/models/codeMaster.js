// 각종 코드 정보 관리 테이블
module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		"CodeMaster",
		{
			code_original_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
				comment: "코드고유번호",
			},
			code_name: {
				type: DataTypes.STRING(100),
				allowNull: false,
				comment: "코드명",
			},
			detail: {
				type: DataTypes.STRING(500),
				allowNull: true,
				comment: "코드설명",
			},
			code_parent: {
				type: DataTypes.INTEGER,
				allowNull: true,
				comment: "상위코드고유번호",
			},
			use_state_code: {
				type: DataTypes.STRING(100),
				allowNull: true,
				comment: "사용상태코드",
			},
			reg_date: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal("now()"),
				comment: "등록일시",
			},
		},
		{
			timestamps: false,
			charset: "utf8",
			collate: "utf8_general_ci",
		}
	);
};
