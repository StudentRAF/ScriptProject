const express    = require("express");
const path       = require("path");
const fs         = require("fs");
const bodyParser = require("body-parser");
const joi        = require("joi");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const port = 8080;
const app = express();

post();
routing();

app.get("/dishesList", (request, response) => {
    fs.readFile('dishes.txt', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading file:', error);
            response.status(500).send({ error: "Error" });
            return;
        }
        const dishes = [];

        const dishesData = data.split('\n');
        dishesData.splice(-1);

        dishesData.forEach(dishData => dishes.push(JSON.parse(dishData)));

        response.json(dishes);
    });
})

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

function post() {
    app.post("/new-dish", urlencodedParser, (request, response) => {
        const shema = joi.object().keys({
            "name": joi.string().trim().min(3).max(25).required(),
            description: joi.string().trim().allow(""),
            category: joi.string().trim().min(3).required(),
            price: joi.number().greater(0).required(),
            ingredient: joi.allow()
        });

        const {error, success} = shema.validate(request.body);

        if (error) {
            response.send("Error: " + error.details[0].message);
            return;
        }

        fs.appendFile("dishes.txt",
            JSON.stringify(request.body) + "\n",
            "utf8",
            () => response.send("The message has been sent, please wait for a reply.")
        );
    });
}

