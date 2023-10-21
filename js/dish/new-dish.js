categories = readJSONCookie("categories");

let dishes = readJSONCookie("dishes");

const createDish = () => {
    if (!validate())
        return false;

    const object = Object.fromEntries(new FormData(document.forms["form"]));

    const dishID          = dishes[dishes.length - 1].id + 1;
    const dishName        = object["dish-name"].toString();
    const dishCategory    = categories.find((category) => { return category.name === object["category"] }).id;
    const dishPrice       = parseInt(object["price"].toString());
    let   dishIngredients = [];

    let ingredientsListElement = document.getElementById("ingredient-list");

    Array.from(ingredientsListElement.children).forEach((item) => { dishIngredients.push(parseInt(item.dataset.id)) });
    dishIngredients.sort((first, second) => { return first - second });

    dishes.push({ id: dishID, name: dishName, category: dishCategory, price: dishPrice, ingredients: dishIngredients });

    updateCookie("dishes", dishes);

    return true;
}
