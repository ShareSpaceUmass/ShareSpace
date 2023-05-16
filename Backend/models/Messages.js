// Export a Sequelize model for the 'Messages' table
// The model represents a table in a MySQL database, which will contain messages data
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

    // Return the 'Messages' model for use in other parts of the application
    return Messages;
}