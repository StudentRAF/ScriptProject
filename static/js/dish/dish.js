categories = readJSONCookie("categories");

ingredients = readJSONCookie("ingredients");

let dishes = readJSONCookie("dishes");

let dish;

document.addEventListener("DOMContentLoaded", (event) => {
    const parameters = new URLSearchParams(window.location.search);

    let id = parseInt(parameters.get("id"));

    dish = dishes.find((item) => { return item.id === id });

    generateNameValue();
    generateCategoryValue();
    generatePriceValue();
    generateIngredients();
});

const generateNameValue = () => {
    let elementName = document.getElementById("name");

    elementName.value = dish.name;
}

const generateCategoryValue = () => {
    let elementCategory = document.getElementById("category");

    elementCategory.selectedIndex = categories.findIndex((category) => { return dish.category === category.id });
}

const generatePriceValue = () => {
    let elementPrice = document.getElementById("price");

    elementPrice.value = dish.price.toString();
}

const generateIngredients = () => {
    ingredients.filter((item) => { return dish.ingredients.includes(item.id) }).forEach((item) => {
        addIngredient(item);
        disableIngredient(item);
    });
}

const saveChanges = () => {
    if (!validate())
        return false;

    let ingredientsListElement = document.getElementById("ingredient-list");

    let editedDish = dishes.find((item) => { return item.id === dish.id });
    let elementCategory = document.getElementById("category");
    let dishIngredients = [];

    Array.from(ingredientsListElement.children).forEach((item) => { dishIngredients.push(parseInt(item.dataset.id)) });
    dishIngredients.sort((first, second) => { return first - second });

    editedDish.name        = document.getElementById("name").value;
    editedDish.category    = parseInt(elementCategory[elementCategory.selectedIndex].dataset.id);
    editedDish.price       = parseInt(document.getElementById("price").value);
    editedDish.ingredients = dishIngredients;

    updateCookie("dishes", dishes);

    return true;
}
