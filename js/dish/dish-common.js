let categories = readJSONCookie("categories");

document.addEventListener("DOMContentLoaded", (event) => {
    // Add on focus event
    document.getElementById("dish-name").onfocus = clear;
    document.getElementById("price").onfocus     = clear;

    // Read category options
    let categoryElement = document.getElementById("category");

    categories.forEach((category) => { categoryElement.appendChild(generateDishCategoryOption(category)) });

    // Add form events
    document.getElementById("form").action = "dishes.html";
});

const generateDishCategoryOption = (category) => {
    let option = document.createElement("option");

    option.dataset.id = category.id;
    option.innerHTML  = category.name;

    return option;
}

const clear = () => {
    document.getElementById("dish-name").classList.remove("error");
    document.getElementById("price").classList.remove("error");
}


const validate = () => {
    let valid = true;

    let dish = document.getElementById("dish-name");
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
