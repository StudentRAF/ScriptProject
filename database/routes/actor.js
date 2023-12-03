const express   = require("express");
const { Actor } = require("../models");

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended:true }));

route.get("/actors", async (request, response) => {
    await Actor.findAll().then(actors => {
        response.json(actors);
        console.info(`[Actor] Requested all actors.`);
    }).catch(error => {
        console.error(`[Error][Actor] All actors: ${error}`);
        response.status(404).json({ error: "[Actor] All actors", data: error });
    });
});

route.get("/actor/:id", async (request, response) => {
    await Actor.findByPk(request.params.id, {}).then(actor => {
        response.json(actor);
        console.info(`[Actor] Requested actor with id: ${request.params.id}.`);
    }).catch(error => {
        console.error(`[Error][Actor] Actor with id: ${request.params.id}, error: ${error}.`);
        response.status(404).json({ error: `[Actor] Actor with id: ${request.params.id}`, data: error });
    });
});

route.post("/actor", async (request, response) => {
    await Actor.create(request.body).then(actor => {
        response.json(actor);
        console.info(`[Actor] Created new actor: ${JSON.stringify(request.body)}.`);
    }).catch(error => {
        console.error(`[Error][Actor] Create new actor: ${JSON.stringify(request.body)}, error: ${error}.`);
        response.status(404).json({ error: `[Actor] Create new actor: ${JSON.stringify(request.body)}`, data: error });
    });
});

route.put("/actor/:id", async (request, response) => {
    await Actor.findByPk(request.params.id, {}).then(actor => {
        actor.firstName   = request.body.firstName;
        actor.lastName    = request.body.lastName;
        actor.gender      = request.body.gender;
        actor.dateOfBirth = request.body.dateOfBirth;
        actor.dateOfDeath = request.body.dateOfDeath;
        actor.save();
        response.json(actor);
        console.info(`[Actor] Update actor with id ${request.params.id}: ${JSON.stringify(request.body)}.`);
    }).catch(error => {
        console.error(`[Error][Actor] Update actor with id ${request.params.id}: ${JSON.stringify(request.body)}, error: ${error}.`);
        response.status(404).json({ error: `[Actor] Update actor with id ${request.params.id}: ${JSON.stringify(request.body)}`, data: error });
    });
});

route.delete("/actor/:id", async (request, response) => {
    await Actor.findByPk(request.params.id, {}).then(actor => {
        actor.destroy();
        response.json(request.params.id);
        console.info(`[Actor] Removed actor with id: ${request.params.id}.`);
    }).catch(error => {
        console.error(`[Error][Actor] Remove actor with id: ${request.params.id}, error: ${error}.`);
        response.status(404).json({ error: `[Actor] Remove actor with id: ${request.params.id}`, data: error });
    });
});

module.exports = route;
