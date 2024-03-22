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
      hashtag_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        comment: "해시태그 이름",
      },
      click_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: "해시태그 클릭 횟수",
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
