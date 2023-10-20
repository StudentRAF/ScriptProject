categories = readJSONCookie("categories");

let category;

document.addEventListener("DOMContentLoaded", (event) => {
    const parameters = new URLSearchParams(window.location.search);

    let id = parseInt(parameters.get("id"));

    category = categories.find((item) => { return item.id === id });

    generateCategoryName();
});

const generateCategoryName = () => {
    let elementName = document.getElementById("category-name");

    elementName.value = category.name;
}

const saveChanges = () => {
    if (!validate())
        return false;

    let newCategory = categories.find((item) => { return item.id === category.id });

    newCategory.name = document.getElementById("category-name").value;

    updateCookie("categories", categories);

    return true;
}
