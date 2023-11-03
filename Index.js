const express    = require("express");
const path       = require("path");

const port = 8080;
const app = express();

routing();

app.use(express.static(path.join(__dirname, "static")));

app.listen(port, () => {
    console.log(`Your server available at http://localhost:${port}`)
});

function routing() {
    app.get("/", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "index.html"));
    });

    app.get("/order", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "order.html"));
    });

    app.get("/orders", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "orders.html"));
    });

    app.get("/dish", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "dish.html"));
    });

    app.get("/dishes", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "dishes.html"));
    });

    app.get("/new-dish", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "new-dish.html"));
    });

    app.get("/category", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "category.html"));
    });

    app.get("/categories", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "categories.html"));
    });

    app.get("/new-category", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "new-category.html"));
    });

    app.get("/ingredient", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "ingredient.html"));
    });

    app.get("/ingredients", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "ingredients.html"));
    });

    app.get("/new-ingredient", (request, response) => {
        response.sendFile(path.join(__dirname, "static", "new-ingredient.html"));
    });
}
