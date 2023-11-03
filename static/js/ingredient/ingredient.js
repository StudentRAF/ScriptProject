ingredients = readJSONCookie("ingredients");

let ingredient;

document.addEventListener("DOMContentLoaded", (event) => {
    const parameters = new URLSearchParams(window.location.search);

    let id = parseInt(parameters.get("id"));

    ingredient = ingredients.find((item) => { return item.id === id });

    generateIngredientName();
});

const generateIngredientName = () => {
    let elementName = document.getElementById("ingredient-name");

    elementName.value = ingredient.name;
}

const saveChanges = () => {
    if (!validate())
        return false;

    let newIngredient = ingredients.find((item) => { return item.id === ingredient.id });

    newIngredient.name = document.getElementById("ingredient-name").value;

    updateCookie("ingredients", ingredients);

    return true;
}
