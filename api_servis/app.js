const express     = require('express');
const app         = express();
const port        = 9000;
const { sequelize, Actor, Genre, Title, TitleActor, TitleGenre } = require("../models");

const actorRoutes = require("./routes/actor.js");
const genreRoutes = require("./routes/genre.js");
const titleRoutes = require("./routes/title.js");

app.get('/', (req, res) => {
    res.send("Hello from REST API service");
});

app.use("/actor", actorRoutes);
app.use("/genre", genreRoutes);
app.use("/title", titleRoutes);

app.listen({ port: port }, async () => {
    await sequelize.sync({ alter: true });
    console.info(`Your database server available at http://localhost:${port}`);
});
