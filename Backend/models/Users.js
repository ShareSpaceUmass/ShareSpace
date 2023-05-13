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
        year: {
            type: DataTypes.CHAR(255),
        },
        major: {
            type: DataTypes.CHAR(255),
        },
        cleanliness: {
            type: DataTypes.INTEGER,
        },
        guests: {
            type: DataTypes.INTEGER,
        },
        inRoom:{
            type: DataTypes.INTEGER,
        },
        noise:{
            type: DataTypes.INTEGER,
        },
        pets:{
            type: DataTypes.BOOLEAN,
        },
        earlyBird:{
            type: DataTypes.BOOLEAN,
        },
        closeness:{
            type: DataTypes.CHAR(255)
        }
    });

    return Users;
}