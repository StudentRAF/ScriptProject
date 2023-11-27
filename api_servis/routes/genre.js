const express = require("express");

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended:true }));

route.get("/", async (request, response) => {
    try {
        response.json("All genres");
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: "Error | All Genres | ...", data: error });
    }
});

route.get("/:id", async (request, response) => {
    try {
        response.json(`Genre with id: ${request.params.id}`);
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: `Error | Genre By ID ${request.params.id} | ...`, data: error });
    }
});

route.post("/", async (request, response) => {
    try {
        response.json(`New genre with data: ${request.body}`);
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: `Error | New Genre ${request.body} | ...`, data: error });
    }
});

route.put("/:id", async (request, response) => {
    try {
        response.json(`Update genre with id: ${request.params.id} | data: ${request.body}`);
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: `Error | Update Genre ID ${request.params.id} Data: ${request.body} | ...`, data: error });
    }
});

route.delete("/:id", async (request, response) => {
    try {
        response.json(`Delete genre with id: ${request.params.id}`);
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: `Error | Delete Genre ID ${request.params.id} | ...`, data: error });
    }
});

module.exports = route;
