document.addEventListener("DOMContentLoaded", (event) => {
    // Add on focus event
    document.getElementById("dish-name").onfocus = clear;
    document.getElementById("price").onfocus     = clear;

    // Read category options
    let categoryElement = document.getElementById("category");

    let categories = readJSONCookie("Category");
    Object.keys(categories).forEach((key) => { categoryElement.appendChild(generateCategoryOption(categories[key])) });

    // Add form events
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
