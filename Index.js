const express    = require("express");
const path       = require("path");
const fs         = require("fs");
const bodyParser = require("body-parser");
const joi        = require("joi");

const port             = 8080;
const app              = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

route();
fetch();
post();

app.use(express.static(path.join(__dirname, "static")));

app.listen(port, () => {
    console.info(`Your server available at http://localhost:${port}`)
});

function route() {
    app.get("/", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "html/index.html"));
    });

    app.get("/titles", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "html/title/titles.html"));
    });

    app.get("/title/edit", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "html/title/title.html"));
    });

    app.get("/title/new", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "html/title/new-title.html"));
    });

    app.get("/actors", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "html/actor/actors.html"));
    });

    app.get("/actor/edit", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "html/actor/actor.html"));
    });

    app.get("/actor/new", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "html/actor/new-actor.html"));
    });

    app.get("/genres", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "html/genre/genres.html"));
    });

    app.get("/genre/edit", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "html/genre/genre.html"));
    });

    app.get("/genre/new", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "html/genre/new-genre.html"));
    });
}

function post() {
    app.post("/title/new", urlencodedParser, (request, response) => {
        const scheme = joi.object().keys({
            "title":        joi.string().trim().min(3).required(),
            "description":  joi.string().trim().allow(""),
            "release-date": joi.string().trim().min(3).required(),
            "duration":     joi.number().greater(0).required(),
            "genres":       joi.allow()
        });

        const {error, success} = scheme.validate(request.body);

        if (error) {
            response.send("Error: " + error.details[0].message);
            return;
        }

        fs.appendFile("titles.txt",
            JSON.stringify(request.body) + "\n",
            "utf8",
            () => response.redirect("/titles")
        );
    });
}

function fetch() {
    app.get("/titles-all", (request, response) => {
        fs.readFile("titles.txt", "utf8", (error, data) => {
            if (error) {
                console.error("Error reading file:", error);
                response.status(500).send({ error: "Error" });
                return;
            }
            const titles = [];

            const titlesData = data.split("\n");
            titlesData.splice(-1);

            titlesData.forEach(titleData => titles.push(JSON.parse(titleData)));

            response.json(titles);
        });
    });
}
