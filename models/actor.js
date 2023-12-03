const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Actor extends Model {
        static associate(models) {
            this.belongsToMany(models.Title, {
                through: "titleactors",
                foreignKey: "actorId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
                timestamps: false
            });
        }
    }

    Actor.init({
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        gender: DataTypes.ENUM("Male", "Female"),
        dateOfBirth: DataTypes.DATEONLY,
        dateOfDeath: DataTypes.DATEONLY
    }, {
        sequelize,
        modelName: 'Actor',
        timestamps: false
    });

    return Actor;
};
