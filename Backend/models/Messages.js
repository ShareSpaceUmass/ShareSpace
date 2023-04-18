module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define("Messages", {
        messageID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        userID:{
            type: DataTypes.INTEGER
        },
        receiverID:{
            type: DataTypes.INTEGER
        },
        content:{
            type: DataTypes.CHAR(255)
        },
        timeSent:{
            type: DataTypes.INTEGER
        }

    });

    return Users;
}