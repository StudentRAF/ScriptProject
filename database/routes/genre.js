const express          = require("express");
const { Genre, Title } = require("../models");

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended:true }));

route.get("/genres", (request, response) => {
    Genre.findAll().then(genres => {
        response.json(genres);
        console.info(`[Genre] Requested all genres.`);
    }).catch(error => {
        console.error(`[Error][Genre] All genres: ${error}`);
        response.status(404).json({ error: "[Genre] All genres", data: error });
    });
});

route.get("/genre/:id", (request, response) => {
    Genre.findByPk(request.params.id, {}).then(genre => {
        response.json(genre);
        console.info(`[Genre] Requested genre with id: ${request.params.id}.`);
    }).catch(error => {
        console.error(`[Error][Genre] Genre with id: ${request.params.id}, error: ${error}.`);
        response.status(404).json({ error: `[Genre] Genre with id: ${request.params.id}`, data: error });
    });
});

route.get("/title-genres/:id", (request, response) => {
    Title.findByPk(request.params.id, {}).then(title => {
        title.getGenres().then(genres => response.json(genres));
        console.info(`[Genre] Requested genres for title with id: ${request.params.id}.`);
    }).catch(error => {
        console.error(`[Error][Genre] Genres for title with id: ${request.params.id}, error: ${error}.`);
        response.status(404).json({ error: `[Genre] Genres for title with id: ${request.params.id}`, data: error });
    });
});

route.post("/genre", (request, response) => {
    Genre.create(request.body).then(genre => {
        response.json(genre);
        console.info(`[Genre] Created new genre: ${JSON.stringify(request.body)}.`);
    }).catch(error => {
        console.error(`[Error][Genre] Create new genre: ${JSON.stringify(request.body)}, error: ${error}.`);
        response.status(404).json({ error: `[Genre] Create new genre: ${JSON.stringify(request.body)}`, data: error });
    });
});

route.put("/genre/:id", (request, response) => {
    Genre.findByPk(request.params.id, {}).then(genre => {
        genre.name = request.body.name;
        genre.save();
        response.json(genre);
        console.info(`[Genre] Update genre with id ${request.params.id}: ${JSON.stringify(request.body)}.`);
    }).catch(error => {
        console.error(`[Error][Genre] Update genre with id ${request.params.id}: ${JSON.stringify(request.body)}, error: ${error}.`);
        response.status(404).json({ error: `[Genre] Update genre with id ${request.params.id}: ${JSON.stringify(request.body)}`, data: error });
    });
});

route.delete("/genre/:id", (request, response) => {
    Genre.findByPk(request.params.id, {}).then(genre => {
        genre.destroy();
        response.json(request.params.id);
        console.info(`[Genre] Removed genre with id: ${request.params.id}.`);
    }).catch(error => {
        console.error(`[Error][Genre] Remove genre with id: ${request.params.id}, error: ${error}.`);
        response.status(404).json({ error: `[Genre] Remove genre with id: ${request.params.id}`, data: error });
    });
});

module.exports = route;
