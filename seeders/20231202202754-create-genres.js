module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Genres", [
            {
                id: 1,
                name: "Action"
            },
            {
                id: 2,
                name: "Adventure"
            },
            {
                id: 3,
                name: "Animation"
            },
            {
                id: 4,
                name: "Comedy"
            },
            {
                id: 5,
                name: "Crime"
            },
            {
                id: 6,
                name: "Drama"
            },
            {
                id: 7,
                name: "Fantasy"
            },
            {
                id: 8,
                name: "Horror"
            },
            {
                id: 9,
                name: "Mystery"
            },
            {
                id: 10,
                name: "Romance"
            },
            {
                id: 11,
                name: "Sci-Fi"
            },
            {
                id: 12,
                name: "Thriller"
            },
            {
                id: 13,
                name: "Biography"
            },
            {
                id: 14,
                name: "History"
            },
            {
                id: 15,
                name: "Western"
            },
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Genres", null, {});
    }
};
