let dish;

document.addEventListener("DOMContentLoaded", (event) => {
    const parameters = new URLSearchParams(window.location.search);

    let id = parseInt(parameters.get("id"));
    let dishes = readJSONCookie("dishes");

    dish = dishes.find((item) => { return item.id === id });

    generateNameValue();
    generateCategoryValue();
    generatePriceValue();
});

const generateNameValue = () => {
    let elementName = document.getElementById("dish-name");

    elementName.value = dish.name;
}

const generateCategoryValue = () => {
    let elementCategory = document.getElementById("category");

    let categories = readJSONCookie("Category");

    elementCategory.selectedIndex = Object.values(categories).indexOf(dish.category);
}

const generatePriceValue = () => {
    let elementPrice = document.getElementById("price");

    elementPrice.value = dish.price.toString();
}

const saveChanges = () => {
    if (!validate())
        return false;

    let dishes = readJSONCookie("dishes");

    let editedDish = dishes.find((item) => { return item.id === dish.id });

    editedDish.name = document.getElementById("dish-name").value.toString();
    editedDish.category = document.getElementById("category").value.toString();
    editedDish.price = parseInt(document.getElementById("price").value.toString());

    updateCookie("dishes", dishes);

    return true;
}
