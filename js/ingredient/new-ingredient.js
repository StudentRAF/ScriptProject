ingredients = readJSONCookie("ingredients");

const createIngredient = () => {
    if (!validate())
        return false;

    const object = Object.fromEntries(new FormData(document.forms["form"]));

    const ingredientID   = ingredients[ingredients.length - 1].id + 1;
    const ingredientName = object["ingredient-name"].toString();

    ingredients.push({ id: ingredientID, name: ingredientName });

    updateCookie("ingredients", ingredients);

    return true;
}
