const express     = require('express');
const app         = express();
const port        = 9000;

const actorRoutes = require("./routes/actor.js");
const genreRoutes = require("./routes/genre.js");
const titleRoutes = require("./routes/title.js");

app.get('/', (req, res) => {
    res.send("Hello from REST API service");
});

app.use("/actor", actorRoutes);
app.use("/genre", genreRoutes);
app.use("/title", titleRoutes);

app.listen(port, () => {
    console.log(`Your database server available at http://localhost:${port}`)
});
