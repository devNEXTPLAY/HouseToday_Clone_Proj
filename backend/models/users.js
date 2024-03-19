module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"User",
		{
			user_id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
				comment: "사용자고유번호",
			},
			email: {
				type: DataTypes.STRING(100),
				allowNull: false,
				unique: true,
				comment: "사용자 이메일 / 아이디",
			},
			is_email_verified: {
				type: DataTypes.TINYINT,
				allowNull: false,
				comment: "이메일 인증 여부 0:미인증 1:인증",
			},
			password: {
				type: DataTypes.STRING(500),
				allowNull: false,
				comment: "사용자 계정 비밀번호",
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: true,
				comment: "사용자 이름",
			},
			nickname: {
				type: DataTypes.STRING(100),
				allowNull: false,
				comment: "사용자 닉네임",
			},
			profile_img: {
				type: DataTypes.STRING(300),
				allowNull: true,
				comment: "이미지경로",
			},
			intro_msg: {
				type: DataTypes.STRING(500),
				allowNull: true,
				comment: "사용자 소개메세지",
			},
			phone: {
				type: DataTypes.STRING(500),
				allowNull: true,
				comment: "사용자 전화번호",
			},
			address: {
				type: DataTypes.STRING(500),
				allowNull: true,
				comment: "사용자 주소",
			},
			birth_date: {
				type: DataTypes.DATEONLY,
				allowNull: true,
				comment: "생년월일",
			},
			agree_marketing: {
				type: DataTypes.TINYINT,
				allowNull: false,
				comment: "개인정보 마케팅 활용 동의 0:미동의 1:동의",
			},
			agree_promotion: {
				type: DataTypes.TINYINT,
				allowNull: false,
				comment: "프로모션 메세지 수신 동의 0:미동의 1:동의",
			},
			entry_type_code: {
				type: DataTypes.TINYINT,
				allowNull: false,
				comment: "가입경로 0:일반이메일 1:구글 2:네이버 3:카카오",
			},
			use_state_code: {
				type: DataTypes.TINYINT,
				allowNull: false,
				comment: "사용자상태 0:정상 1:탈퇴 2:정지",
			},
			reg_date: {
				type: DataTypes.DATE,
				allowNull: true,
				comment: "회원 가입 일시",
			},
			edit_date: {
				type: DataTypes.DATE,
				allowNull: true,
				comment: "프로필 수정 일시",
			},
		},
		{
			sequelize,
			timestamps: false,
			comment: "회원 테이블",
			tableName: "Users",
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "user_id" }],
				},
				{
					name: "idx_user_email",
					unique: true,
					using: "BTREE",
					fields: [{ name: "email" }],
				},
				{
					name: "idx_user_nickname",
					unique: true,
					using: "BTREE",
					fields: [{ name: "nickname" }],
				},
			],
		}
	);
};
