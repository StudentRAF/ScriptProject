const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Title extends Model {
        static associate(models) {
            this.belongsToMany(models.Actor, {
                through: "titleactors",
                foreignKey: "titleId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
                timestamps: false
            });

            this.belongsToMany(models.Genre, {
                through: "titlegenres",
                foreignKey: "titleId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
                timestamps: false
            });
        }
    }

    Title.init({
        name: DataTypes.STRING,
        releaseDate: DataTypes.DATEONLY,
        duration: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Title',
        timestamps: false
    });

    return Title;
};
