document.addEventListener("DOMContentLoaded", (event) => {
    // Add on focus event
    document.getElementById("dish-name").onfocus = clear;
    document.getElementById("price").onfocus     = clear;

    // Read category options
    let categoryElement = document.getElementById("category");

    let categories = readJSONCookie("Category");
    Object.keys(categories).forEach((key) => { categoryElement.appendChild(generateCategoryOption(categories[key])) });

    // Form events
    document.getElementById("form").action = "dishes.html";
    document.getElementById("form").method = "post";

});

const generateCategoryOption = (category) => {
    let option = document.createElement("option");
    option.innerHTML = category;
    return option;
}

const clear = () => {
    document.getElementById("dish-name").classList.remove("error");
    document.getElementById("price").classList.remove("error");
}

const submitForm = () => {
    if (!validate())
        return false;

    let dishes = readJSONCookie("dishes");

    const object = Object.fromEntries(new FormData(document.forms["form"]));

    const dishID       = dishes.length;
    const dishName     = object["dish-name"].toString();
    const dishCategory = object["category"].toString();
    const dishPrice    = parseInt(object["price"].toString());
    dishes.push({ id: dishID, name: dishName, category: dishCategory, price: dishPrice });

    updateCookie("dishes", dishes);

    return true;
}

const validate = () => {
    let valid = true;

    let dish = document.getElementById("dish-name");
    if (dish.value.length < 3) {
        console.log("dish add error");
        dish.classList.add("error");
        console.log(dish.classList);
        valid = false;
    }

    let price = (document.getElementById("price"));
    let value = parseInt(price.value);
    if (isNaN(value) || value < 0) {
        console.log("price add error");
        price.classList.add("error");
        console.log(price.classList);
        valid = false;
    }

    return valid;
}
