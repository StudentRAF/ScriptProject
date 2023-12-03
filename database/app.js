const express       = require('express');
const app           = express();
const cors          = require("cors");
const port          = 9090;
const { sequelize } = require("./models");

const actorRoutes = require("./routes/actor.js");
const genreRoutes = require("./routes/genre.js");
const titleRoutes = require("./routes/title.js");

const corsOptions = {
    origin: "http://localhost:9080"
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send("Hello from REST API service");
});

app.use("/", actorRoutes);
app.use("/", genreRoutes);
app.use("/", titleRoutes);

app.listen({ port: port }, async () => {
    console.info(`Your database server available at http://localhost:${port}\n`);
    await sequelize.sync({ alter: true });
});
