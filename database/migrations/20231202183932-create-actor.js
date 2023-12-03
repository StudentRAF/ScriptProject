module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Actors", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            gender: {
                allowNull: false,
                type: Sequelize.ENUM("Male", "Female")
            },
            dateOfBirth: {
                allowNull: false,
                type: Sequelize.DATEONLY
            },
            dateOfDeath: {
                type: Sequelize.DATEONLY

            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Actors');
    }
};
