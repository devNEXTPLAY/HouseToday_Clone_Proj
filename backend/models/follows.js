module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
        "Follow",
        {
            follower_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                primaryKey: true, // Mark as part of the composite primary key
                comment: "팔로우하는사람고유번호",
            },
            followee_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
                primaryKey: true, // Mark as part of the composite primary key
                comment: "팔로우받는사람고유번호",
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
                comment: "팔로우생성일시",
            },
        },
        {
            timestamps: false,
            charset: "utf8",
            collate: "utf8_general_ci",
            indexes: [
                {
                    unique: true,
                    fields: ['follower_id', 'followee_id'] // Ensure the combination is unique
                },
            ],
        }
    );
};
