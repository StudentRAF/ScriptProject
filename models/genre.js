const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Genre extends Model {
        static associate(models) {
            this.belongsToMany(models.Title, {
                through: "titlegenres",
                foreignKey: "genreId",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
                timestamps: false
            });
        }
    }

    Genre.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Genre',
        timestamps: false
    });

    return Genre;
};
