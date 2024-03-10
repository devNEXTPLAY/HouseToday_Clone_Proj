module.exports = Object.freeze({
	// "사용자 회원가입 유형코드 0:이메일 1:구글 2:네이버 3:카카오",
	ENTRY_TYPE_CODE: {
		EMAIL: 0,
		GOOGLE: 1,
		NAVER: 2,
		KAKAO: 3,
	},

	// "사용자 상태코드 0:정상 1:탈퇴 2:정지"
	USE_STATE_CODE: {
		NORMAL: 0,
		WITHDRAWAL: 1,
		STOP: 2,
	},

	// "게시글유형코드 0:집들이 1:노하우 2:사진/영상 3:리뷰글",
	BLOG_TYPE_CODE: {
		HOUSEWARMING: 0,
		TIP: 1,
		PHOTO_VIDEO: 2,
		REVIEW: 3,
	},

	// "상태코드 0:신청 1:승인 2:거절 3:삭제 4:숨김",
	BLOG_STATUS_CODE: {
		APPLIED: 0,
		APPROVED: 1,
		REJECTED: 2,
		DELETED: 3,
		HIDDEN: 4,
	},

	// "댓글 상태코드 0:정상 1:삭제",
	COMMENT_STATUS_CODE: {
		NORMAL: 0,
		DELETED: 1,
	},
});
