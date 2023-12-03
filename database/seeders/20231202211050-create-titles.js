module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Titles", [
            {
                id: 1,
                name: "The Shawshank Redemption",
                releaseDate: new Date(1994, 10, 14),
                duration: 142
            },
            {
                id: 2,
                name: "The Godfather",
                duration: 175,
                releaseDate: new Date(1972, 3, 24)
            },
            {
                id: 3,
                name: "The Dark Knight",
                duration: 152,
                releaseDate: new Date(2008, 7, 24)
            },
            {
                id: 4,
                name: "The Godfather Part II",
                duration: 202,
                releaseDate: new Date(1974, 12, 20)
            },
            {
                id: 5,
                name: "12 Angry Men",
                duration: 96,
                releaseDate: new Date(1957, 4, 5)
            },
            {
                id: 6,
                name: "Schindler's List",
                duration: 195,
                releaseDate: new Date(1994, 2, 4)
            },
            {
                id: 7,
                name: "The Lord of the Rings: The Return of the King",
                duration: 201,
                releaseDate: new Date(2003, 12, 26)
            },
            {
                id: 8,
                name: "Pulp Fiction",
                duration: 154,
                releaseDate: new Date(1994, 10, 14)
            },
            {
                id: 9,
                name: "The Lord of the Rings: The Fellowship of the Ring",
                duration: 178,
                releaseDate: new Date(2001, 12, 19)
            },
            {
                id: 10,
                name: "The Good, the Bad and the Ugly",
                duration: 178,
                releaseDate: new Date(1966, 12, 23)
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Titles", null, {});
    }
};
