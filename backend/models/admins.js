module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        'admin',
        {
            admin_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: '관리자고유번호',
            },
            id: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '관리자id',
            },
            password: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: '비밀번호',
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '이름',
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '이메일',
            },
            telephone: {
                type: DataTypes.STRING(500),
                allowNull: false,
                comment: '전화번호',
            },
            reg_date: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '등록일시',
            },
        },
        {
            sequelize,
            tableName: 'admin',
            timestamps: false,
            comment: '관리자테이블',
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'admin_member_id' }],
                },
            ],
        },
    )
}
