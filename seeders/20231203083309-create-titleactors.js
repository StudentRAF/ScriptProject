const { Title, Actor } = require("../models");

const values = {
    1: [6, 7, 8, 9, 10]
}

module.exports = {
    async up(queryInterface, Sequelize) {
        for (const titleId of Object.keys(values)) {
            await Title.findByPk(titleId).then(async title => {
                for (const actorId of values[titleId])
                    title.addActors(await Actor.findByPk(actorId));
            }).catch(error => console.error(error));
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("titleactors", null, {});
    }
};
