module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Actors", [
            {
                id: 1,
                firstName: "Robert",
                lastName: "De Niro",
                gender: "Male",
                dateOfBirth: new Date(1943, 8, 17),
                dateOfDeath: null
            },
            {
                id: 2,
                firstName: "Jack",
                lastName: "Nicholson",
                gender: "Male",
                dateOfBirth: new Date(1937, 4, 22),
                dateOfDeath: null
            },
            {
                id: 3,
                firstName: "Marlon",
                lastName: "Brando",
                gender: "Male",
                dateOfBirth: new Date(1924, 4, 3),
                dateOfDeath: new Date(2004, 7, 1)
            },
            {
                id: 4,
                firstName: "Denzel",
                lastName: "Washington",
                gender: "Male",
                dateOfBirth: new Date(1954, 12, 28),
                dateOfDeath: null
            },
            {
                id: 5,
                firstName: "Katharine",
                lastName: "Hepburn",
                gender: "Female",
                dateOfBirth: new Date(1907, 5, 12),
                dateOfDeath: new Date(2003, 6, 29)
            },
            {
                id: 6,
                firstName: "Tim",
                lastName: "Robbins",
                gender: "Male",
                dateOfBirth: new Date(1958, 10, 16),
                dateOfDeath: null
            },
            {
                id: 7,
                firstName: "Morgan",
                lastName: "Freeman",
                gender: "Male",
                dateOfBirth: new Date(1937, 6, 1),
                dateOfDeath: null
            },
            {
                id: 8,
                firstName: "Bob",
                lastName: "Gunton",
                gender: "Male",
                dateOfBirth: new Date(1945, 11, 15),
                dateOfDeath: null
            },
            {
                id: 9,
                firstName: "William",
                lastName: "Sadler",
                gender: "Male",
                dateOfBirth: new Date(1940, 4, 13),
                dateOfDeath: null
            },
            {
                id: 10,
                firstName: "Clancy",
                lastName: "Brown",
                gender: "Male",
                dateOfBirth: new Date(1959, 1, 5),
                dateOfDeath: null
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Actors", null, {});
    }
};
