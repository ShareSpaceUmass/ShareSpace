module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define("Messages", {
        messageID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        senderEmail:{
            type: DataTypes.CHAR(255)
        },
        receiverEmail:{
            type: DataTypes.INTEGER
        },
        content:{
            type: DataTypes.TEXT
        },
        read:{
            type: DataTypes.BOOLEAN
        }

    });

    return Messages;
}