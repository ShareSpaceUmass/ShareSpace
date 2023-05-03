module.exports = (sequelize, DataTypes) => {
    const Preferences = sequelize.define("Preferences", {
        preferenceID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement : true
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

    return Preferences;
}