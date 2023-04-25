module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fName: {
            type: DataTypes.CHAR(255),
            allowNull: false
        },
        lName: {
            type: DataTypes.CHAR(255),
            allowNull: false
        },
        gender: {
            type: DataTypes.CHAR(20),
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
        },
        bio: {
            type: DataTypes.CHAR(255),
        },
        profilePic:{
            type: DataTypes.CHAR(255),
        },
        imageUrl:{
            type: DataTypes.TEXT,
        }

    });

    return Users;
}