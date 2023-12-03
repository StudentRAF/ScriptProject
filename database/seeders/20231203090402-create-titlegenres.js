const { Title, Genre, Actor} = require("../models");

const values = {
    1:  [ 6         ],
    2:  [ 5,  6     ],
    3:  [ 1,  5, 6  ],
    4:  [ 5,  6     ],
    5:  [ 5,  6     ],
    6:  [ 6, 13, 14 ],
    7:  [ 1,  2,  6 ],
    8:  [ 5,  6     ],
    9:  [ 1,  2,  6 ],
    10: [ 2, 15     ]
}

module.exports = {
    async up(queryInterface, Sequelize) {
        for (const titleId of Object.keys(values)) {
            await Title.findByPk(titleId).then(async title => {
                for (const genreId of values[titleId])
                    title.addGenres(await Genre.findByPk(genreId));
            }).catch(error => console.error(error));
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("TitleGenres", null, {});
    }
};
