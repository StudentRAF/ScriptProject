const express = require("express");

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended:true }));

route.get("/", async (request, response) => {
    try {
        response.json("All actors");
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: "Error | All Actors | ...", data: error });
    }
});

route.get("/:id", async (request, response) => {
    try {
        response.json(`Actor with id: ${request.params.id}`);
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: `Error | Actor By ID ${request.params.id} | ...`, data: error });
    }
});

route.post("/", async (request, response) => {
    try {
        response.json(`New actor with data: ${request.body}`);
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: `Error | New Actor ${request.body} | ...`, data: error });
    }
});

route.put("/:id", async (request, response) => {
    try {
        response.json(`Update actor with id: ${request.params.id} | data: ${request.body}`);
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: `Error | Update Actor ID ${request.params.id} Data: ${request.body} | ...`, data: error });
    }
});

route.delete("/:id", async (request, response) => {
    try {
        response.json(`Delete actor with id: ${request.params.id}`);
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: `Error | Delete Actor ID ${request.params.id} | ...`, data: error });
    }
});

module.exports = route;
