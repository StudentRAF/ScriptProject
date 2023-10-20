categories = readJSONCookie("categories");

let dishes = readJSONCookie("dishes");

let dish;

document.addEventListener("DOMContentLoaded", (event) => {
    const parameters = new URLSearchParams(window.location.search);

    let id = parseInt(parameters.get("id"));

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

    elementCategory.selectedIndex = categories.findIndex((category) => { return dish.category === category.id });
}

const generatePriceValue = () => {
    let elementPrice = document.getElementById("price");

    elementPrice.value = dish.price.toString();
}

const saveChanges = () => {
    if (!validate())
        return false;

    let editedDish = dishes.find((item) => { return item.id === dish.id });
    let elementCategory = document.getElementById("category");

    editedDish.name = document.getElementById("dish-name").value;
    editedDish.category = parseInt(elementCategory[elementCategory.selectedIndex].dataset.id);
    editedDish.price = parseInt(document.getElementById("price").value);

    updateCookie("dishes", dishes);

    return true;
}
