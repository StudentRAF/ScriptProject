const express = require("express");

const route = express.Router();

route.use(express.json());
route.use(express.urlencoded({ extended:true }));

route.get("/", async (request, response) => {
    try {
        response.json("All titles");
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: "Error | All Titles | ...", data: error });
    }
});

route.get("/:id", async (request, response) => {
    try {
        response.json(`Title with id: ${request.params.id}`);
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: `Error | Title By ID ${request.params.id} | ...`, data: error });
    }
});

route.post("/", async (request, response) => {
    try {
        response.json(`New title with data: ${request.body}`);
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: `Error | New Title ${request.body} | ...`, data: error });
    }
});

route.put("/:id", async (request, response) => {
    try {
        response.json(`Update title with id: ${request.params.id} | data: ${request.body}`);
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: `Error | Update Title ID ${request.params.id} Data: ${request.body} | ...`, data: error });
    }
});

route.delete("/:id", async (request, response) => {
    try {
        response.json(`Delete title with id: ${request.params.id}`);
    }
    catch(error){
        console.log(error);
        response.status(500).json({ error: `Error | Delete Title ID ${request.params.id} | ...`, data: error });
    }
});

module.exports = route;
