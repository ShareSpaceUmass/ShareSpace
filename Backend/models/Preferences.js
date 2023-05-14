// Export a Sequelize model for the 'Preferences' table
// The model represents a table in a MySQL database, which will contain user preference data
module.exports = (sequelize, DataTypes) => {
    const Preferences = sequelize.define("Preferences", {
        preferenceID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        email:{
            type: DataTypes.STRING
        },
        cleanliness:{
            type: DataTypes.INTEGER
        },
        guests:{
            type: DataTypes.INTEGER
        },
        timeInRoom:{
            type: DataTypes.INTEGER
        },
        noise:{
            type: DataTypes.INTEGER
        },
        pets:{
            type: DataTypes.BOOLEAN
        },
        earlyBird:{
            type: DataTypes.BOOLEAN
        },
        drugs:{
            type: DataTypes.BOOLEAN
        }
        
    });

    // Return the 'Preferences' model for use in other parts of the application
    return Preferences;
}