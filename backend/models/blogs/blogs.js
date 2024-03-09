module.exports = function (sequelize, DataTypes) {
	return sequelize.define(
		"Blog",
		{
			blog_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
				comment: "게시글 고유번호",
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "사용자고유번호",
				references: {
					model: "Users",
					key: "user_id",
				},
			},
			blog_type_code: {
				type: DataTypes.TINYINT,
				allowNull: false,
				comment: "게시글유형코드 0:집들이 1:노하우 2:사진/영상 3:리뷰글",
			},
			title: {
				type: DataTypes.STRING(100),
				allowNull: false,
				comment: "제목",
			},
			contents: {
				type: DataTypes.TEXT,
				allowNull: false,
				comment: "내용",
			},
			preview_img: {
				type: DataTypes.STRING(300),
				allowNull: false,
				comment: "대표이미지경로",
			},
			view_count: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "조회수",
				defaultValue: 0,
			},
			like_count: {
				type: DataTypes.INTEGER,
				allowNull: false,
				comment: "좋아요수",
				defaultValue: 0,
			},
			ip_address: {
				type: DataTypes.STRING(100),
				allowNull: false,
				comment: "작성자 아이피주소",
			},
			blog_status_code: {
				type: DataTypes.TINYINT,
				allowNull: false,
				comment: "상태코드 0:신청 1:승인 2:거절 3:삭제 4:숨김",
			},
			reg_date: {
				type: DataTypes.DATE,
				allowNull: false,
				comment: "등록일시",
			},
			edit_date: {
				type: DataTypes.DATE,
				allowNull: true,
				comment: "수정일시",
			},
		},
		{
			sequelize,
			timestamps: false,
			tableName: "Blogs",
			comment: "블로그 게시글 테이블",
			indexes: [
				{
					name: "PRIMARY",
					unique: true,
					using: "BTREE",
					fields: [{ name: "blog_id" }],
				},
				{
					name: "idx_blog_user_id",
					using: "BTREE",
					fields: [{ name: "user_id" }],
				},
			],
		}
	);
};
