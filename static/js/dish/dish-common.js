let categories = readJSONCookie("categories");

let ingredients = readJSONCookie("ingredients");

document.addEventListener("DOMContentLoaded", (event) => {
    // Add on focus event
    document.getElementById("name").onfocus = clear;
    document.getElementById("price").onfocus     = clear;

    // Read category and ingredient options
    let categoryElement   = document.getElementById("category");
    let ingredientElement = document.getElementById("ingredient");

    ingredientElement.appendChild(generateEmptyDishCategoryOption());

    categories.forEach((category)    => { categoryElement.appendChild(generateDishCategoryOption(category))       });
    ingredients.forEach((ingredient) => { ingredientElement.appendChild(generateDishIngredientOption(ingredient)) });

    // Add form events
    document.getElementById("form").action = "/dishes";
});

const generateEmptyDishCategoryOption = () => {
    let option = document.createElement("option");

    option.dataset.id = "-1";

    return option;
}

const generateDishCategoryOption = (category) => {
    let option = document.createElement("option");

    option.dataset.id = category.id;
    option.innerHTML  = category.name;

    return option;
}

const generateDishIngredientOption = (ingredient) => {
    let option = document.createElement("option");

    option.dataset.id = ingredient.id;
    option.innerHTML  = ingredient.name;

    return option;
}

const clear = () => {
    document.getElementById("name").classList.remove("error");
    document.getElementById("price").classList.remove("error");
}


const validate = () => {
    let valid = true;

    let dish = document.getElementById("name");
    if (dish.value.length < 3) {
        dish.classList.add("error");
        valid = false;
    }

    let price = (document.getElementById("price"));
    let value = parseInt(price.value);
    if (isNaN(value) || value < 0) {
        price.classList.add("error");
        valid = false;
    }

    return valid;
}

const submitIngredient = () => {
    let ingredientElement = document.getElementById("ingredient");
    let selectedID = parseInt(ingredientElement[ingredientElement.selectedIndex].dataset.id);

    if (selectedID < 0)
        return;

    let ingredient = ingredients.find((item) => { return item.id === selectedID });

    addIngredient(ingredient);
    disableIngredient(ingredient);
}

const addIngredient = (ingredient) => {
    let ingredientsElement = document.getElementById("ingredient-list");

    let ingredientItem = document.createElement("div");

    ingredientItem.dataset.id = ingredient.id;
    ingredientItem.classList.add("input-group");
    ingredientItem.classList.add("ingredient-list-item");
    ingredientItem.innerHTML = generateIngredientItem(ingredient);

    ingredientsElement.appendChild(ingredientItem);
}

const generateIngredientItem = (ingredient) => {
    return `<span>${ingredient.name}</span>` +
           `<button class="btn btn-danger-hover" onclick="removeIngredient(${ingredient.id})" type="button">` +
               `<img src="../../resources/Close.svg"  alt=""/>` +
           `</button>`;
}

const removeIngredient = (ingredientID) => {
    let ingredientsListElement = document.getElementById("ingredient-list");

    enableIngredient(ingredientID);

    Array.from(ingredientsListElement.children).find((item) => { return parseInt(item.dataset.id) === ingredientID }).remove();
}

const disableIngredient = (ingredient) => {
    let ingredientElements = document.getElementById("ingredient");
    let index = Array.from(ingredientElements.children).findIndex((item) => { return parseInt(item.dataset.id) === ingredient.id });

    ingredientElements[index].disabled = true;
    ingredientElements.selectedIndex = 0;
}

const enableIngredient = (ingredientID) => {
    let ingredientElement = document.getElementById("ingredient");
    Array.from(ingredientElement.children).find((item) => { return parseInt(item.dataset.id) === ingredientID }).disabled = false;
}
