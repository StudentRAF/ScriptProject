const express    = require("express");
const path       = require("path");
const bodyParser = require("body-parser");
const joi        = require("joi");

const port             = 9080;
const app              = express();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

route();
postRequests();
putRequests();
deleteRequests();

app.use(express.static(path.join(__dirname, "../static")));

app.listen(port, () => {
    console.info(`Your server available at http://localhost:${port}`)
});

function route() {
    app.get("/", (request, response) => {
        response.sendFile(path.join(__dirname, "html/index.html"));
    });

    app.get("/titles", (request, response) => {
        response.sendFile(path.join(__dirname, "../static", "html/title/titles.html"));
    });

    app.get("/title/new", (request, response) => {
        response.sendFile(path.join(__dirname, "../static", "html/title/new-title.html"));
    });

    app.get("/title/:id", (request, response) => {
        response.sendFile(path.join(__dirname, "../static", "html/title/title.html"));
    });

    app.get("/actors", (request, response) => {
        response.sendFile(path.join(__dirname, "../static", "html/actor/actors.html"));
    });

    app.get("/actor/new", (request, response) => {
        response.sendFile(path.join(__dirname, "../static", "html/actor/new-actor.html"));
    });

    app.get("/actor/:id", (request, response) => {
        response.sendFile(path.join(__dirname, "../static", "html/actor/actor.html"));
    });

    app.get("/genres", (request, response) => {
        response.sendFile(path.join(__dirname, "../static", "html/genre/genres.html"));
    });

    app.get("/genre/new", (request, response) => {
        response.sendFile(path.join(__dirname, "../static", "html/genre/new-genre.html"));
    });

    app.get("/genre/:id", (request, response) => {
        response.sendFile(path.join(__dirname, "../static", "html/genre/genre.html"));
    });
}

function postRequests() {
    app.post("/title/create", urlencodedParser, async (request, response) => {
        const scheme = joi.object().keys({
            "name": joi.string().trim().min(3).required(),
            "description": joi.string().trim().allow(""),
            "releaseDate": joi.string().trim().min(3).required(),
            "duration": joi.number().greater(0).required(),
            "genres": joi.allow()
        });

        const error = scheme.validate(request.body).error;

        if (error) {
            response.send("Error: " + error.details[0].message);
            return;
        }

        fetch("http://localhost:9090/title", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(request.body)
        }).then(() => response.redirect("/titles")).catch(error => {
            console.error(`[Error][Title] Create title. Message: ${error}`);
        });
    });

    app.post("/actor/create", urlencodedParser, async (request, response) => {
        const scheme = joi.object().keys({
            "firstName": joi.string().trim().min(3).required(),
            "lastName": joi.string().trim().min(3).required(),
            "gender": joi.string().trim().min(4).required(),
            "dateOfBirth": joi.string().trim().min(3).required(),
            "dateOfDeath": joi.allow()
        });

        if (request.body.dateOfDeath.value === undefined)
            request.body.dateOfDeath = null;

        const error = scheme.validate(request.body).error;

        if (error) {
            response.send("Error: " + error.details[0].message);
            return;
        }

        fetch("http://localhost:9090/actor", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(request.body)
        }).then(() => response.redirect("/actors")).catch(error => {
            console.error(`[Error][Actor] Create actor. Message: ${error}`);
        });
    });

    app.post("/genre/create", urlencodedParser, async (request, response) => {
        const scheme = joi.object().keys({
            "name": joi.string().trim().min(3).required(),
        });

        const error = scheme.validate(request.body).error;

        if (error) {
            response.send("Error: " + error.details[0].message);
            return;
        }

        fetch("http://localhost:9090/genre", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(request.body)
        }).then(() => response.redirect("/genres")).catch(error => {
            console.error(`[Error][Genre] Create genre. Message: ${error}`);
        });
    });
}

function putRequests() {
    app.post("/title/update/:id", urlencodedParser, (request, response) => {
        const scheme = joi.object().keys({
            "name":         joi.string().trim().min(3).required(),
            "description":  joi.string().trim().allow(""),
            "releaseDate":  joi.string().trim().min(3).required(),
            "duration":     joi.number().greater(0).required(),
            "genres":       joi.allow()
        });

        const error = scheme.validate(request.body).error;

        if (error) {
            response.send("Error: " + error.details[0].message);
            return;
        }

        fetch(`http://localhost:9090/title/${request.params.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request.body)
        }).catch(error => {
            console.error(`[Error][Title] Update title id: ${request.params.id}. Message: ${error}`);
        });

        response.redirect("/titles");
    });

    app.post("/actor/update/:id", urlencodedParser, (request, response) => {
        const scheme = joi.object().keys({
            "firstName":    joi.string().trim().min(3).required(),
            "lastName":     joi.string().trim().min(3).required(),
            "gender":       joi.string().trim().min(4).required(),
            "dateOfBirth":  joi.string().trim().min(3).required(),
            "dateOfDeath":  joi.allow()
        });

        if (request.body.dateOfDeath.value === undefined)
            request.body.dateOfDeath = null;

        const error = scheme.validate(request.body).error;

        if (error) {
            response.send("Error: " + error.details[0].message);
            return;
        }

        fetch(`http://localhost:9090/actor/${request.params.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request.body)
        }).catch(error => {
            console.error(`[Error][Actor] Update actor id: ${request.params.id}. Message: ${error}`);
        });

        response.redirect("/actors");
    });

    app.post("/genre/update/:id", urlencodedParser, (request, response) => {
        const scheme = joi.object().keys({
            "name": joi.string().trim().min(3).required(),
        });

        const error = scheme.validate(request.body).error;

        if (error) {
            response.send("Error: " + error.details[0].message);
            return;
        }

        fetch(`http://localhost:9090/genre/${request.params.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request.body)
        }).catch(error => {
            console.error(`[Error][Genre] Update genre id: ${request.params.id}. Message: ${error}`);
        });

        response.redirect("/genres");
    });
}

function deleteRequests() {
    app.delete("/title/remove/:id", urlencodedParser, async (request, response) => {
        await fetch(`http://localhost:9090/title/${request.params.id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }).catch(error => {
            console.error(`[Error][Title] Delete title id: ${request.params.id}. Message: ${error}`);
        });

        response.send(request.params.id);
    });

    app.delete("/actor/remove/:id", urlencodedParser, async (request, response) => {
        await fetch(`http://localhost:9090/actor/${request.params.id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }).catch(error => {
            console.error(`[Error][Actor] Delete actor id: ${request.params.id}. Message: ${error}`);
        });

        response.redirect("/actors");
    });

    app.delete("/genre/remove/:id", urlencodedParser, async (request, response) => {
        await fetch(`http://localhost:9090/genre/${request.params.id}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        }).catch(error => {
            console.error(`[Error][Genre] Delete genre id: ${request.params.id}. Message: ${error}`);
        });

        response.redirect("/genres");
    });
}
