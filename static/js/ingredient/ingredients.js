const ingredients = readJSONCookie("ingredients");

const rowData = [
    { innerHTML: (ingredient) => { return ingredient.name                  } },
    { innerHTML: (ingredient) => { return generateActionColumn(ingredient) } }
];

document.addEventListener("DOMContentLoaded", (event) => {
    let table = document.getElementById("ingredient-list");

    ingredients.forEach((ingredient) => appendRow(table, ingredient));
});

const appendRow = (table, ingredient) => {
    let row = table.insertRow(-1);
    let cell;

    rowData.forEach((cellData) => {
        cell = row.insertCell(-1);
        cell.innerHTML = cellData.innerHTML(ingredient);
    });
}

const generateActionColumn = (ingredient) => {
    return `<div class="button-action-container">`                                                                 +
               `<a class="btn btn-dark" href="/ingredient?id=${ingredient.id}">Izmeni</a>`                     +
               `<button class="btn btn-danger-hover" onclick="removeIngredient(${ingredient.id})">Ukloni</button>` +
           `</div>`;
}

const removeIngredient = (ingredientID) => {
    ingredients.splice(ingredients.findIndex((ingredient) => { return ingredient.id === ingredientID }), 1);

    updateCookie("ingredients", ingredients);

    refreshIngredients();
}

const refreshIngredients = () => {
    let table = document.getElementById("ingredient-list");

    while(table.firstChild)
        table.firstChild.remove();

    ingredients.forEach((ingredient) => appendRow(table, ingredient));
}
