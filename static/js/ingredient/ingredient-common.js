let ingredients = readJSONCookie("ingredients");

document.addEventListener("DOMContentLoaded", (event) => {
    // Add on focus event
    document.getElementById("ingredient-name").onfocus = clear;

    // Add form events
    document.getElementById("form").action = "/ingredients";
});

const clear = () => {
    document.getElementById("ingredient-name").classList.remove("error");
}

const validate = () => {
    let valid = true;

    let category = document.getElementById("ingredient-name");
    if (category.value.length < 3) {
        category.classList.add("error");
        valid = false;
    }

    return valid;
}
