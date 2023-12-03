const express          = require("express");
const { Title, Genre } = require("../models");
const { Op }           = require("sequelize");

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended:true }));

route.get("/titles", (request, response) => {
    Title.findAll().then(titles => {
        response.json(titles);
        console.info(`[Title] Requested all titles.`);
    }).catch(error => {
        console.error(`[Error][Title] All titles: ${error}`);
        response.status(404).json({ error: "[Title] All titles", data: error });
    });
});

route.get("/title/:id", (request, response) => {
    Title.findByPk(request.params.id, {}).then(title => {
        response.json(title);
        console.info(`[Title] Requested title with id: ${request.params.id}.`);
    }).catch(error => {
        console.error(`[Error][Title] Title with id: ${request.params.id}, error: ${error}.`);
        response.status(404).json({ error: `[Title] Title with id: ${request.params.id}`, data: error });
    });
});

route.get("/genre-titles/:id", (request, response) => {
    Genre.findByPk(request.params.id, {}).then(genre => {
        genre.getTitles().then(titles => response.json(titles));
        console.info(`[Title] Requested titles for genre with id: ${request.params.id}.`);
    }).catch(error => {
        console.error(`[Error][Title] Titles for genre with id: ${request.params.id}, error: ${error}.`);
        response.status(404).json({ error: `[Title] Titles for genre with id: ${request.params.id}`, data: error });
    });
});

route.post("/title", (request, response) => {
    Title.create(request.body).then(title => {
        request.body.genres && request.body.genres.forEach(genreID =>
            Genre.findByPk(genreID, {}).then(genre => title.addGenres(genre)));

        response.json(title);
        console.info(`[Title] Created new title: ${JSON.stringify(request.body)}.`);
    }).catch(error => {
        console.error(`[Error][Title] Create new title: ${JSON.stringify(request.body)}, error: ${error}.`);
        response.status(404).json({ error: `[Title] Create new title: ${JSON.stringify(request.body)}`, data: error });
    });
});

route.put("/title/:id", (request, response) => {
    Title.findByPk(request.params.id, {}).then(title => {
        title.name        = request.body.name;
        title.releaseDate = request.body.releaseDate;
        title.duration    = request.body.duration;

        title.save();

        title.getGenres().then(async genres => {
            let toRemove = [].concat(genres.map(genre => parseInt(genre.id)));
            let toAppend = request.body.genres ? [].concat(request.body.genres) : [];
            toAppend.map(item => parseInt(item));

            await Genre.findAll({where: {id: {[Op.or]: toRemove.filter(value => toAppend.indexOf(value) === -1)}}})
                .then(genres => title.removeGenres(genres));
            await Genre.findAll({where: {id: {[Op.or]: toAppend.filter(value => toRemove.indexOf(value) === -1)}}})
                .then(genres => title.addGenres(genres));
        });

        response.json(title);
        console.info(`[Title] Update title with id ${request.params.id}: ${JSON.stringify(request.body)}.`);
    }).catch(error => {
        console.error(`[Error][Title] Update title with id ${request.params.id}: ${JSON.stringify(request.body)}, error: ${error}.`);
        response.status(404).json({ error: `[Title] Update title with id ${request.params.id}: ${JSON.stringify(request.body)}`, data: error });
    });
});

route.delete("/title/:id", (request, response) => {
    Title.findByPk(request.params.id, {}).then(title => {
        title.destroy();
        response.json(request.params.id);
        console.info(`[Title] Removed title with id: ${request.params.id}.`);
    }).catch(error => {
        console.error(`[Error][Title] Remove title with id: ${request.params.id}, error: ${error}.`);
        response.status(404).json({ error: `[Title] Remove title with id: ${request.params.id}`, data: error });
    });
});

module.exports = route;
