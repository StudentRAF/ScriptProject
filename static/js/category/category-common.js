let categories = readJSONCookie("categories");

document.addEventListener("DOMContentLoaded", (event) => {
    // Add on focus event
    document.getElementById("category-name").onfocus = clear;

    // Add form events
    document.getElementById("form").action = "/categories";
});

const clear = () => {
    document.getElementById("category-name").classList.remove("error");
}

const validate = () => {
    let valid = true;

    let category = document.getElementById("category-name");
    if (category.value.length < 3) {
        category.classList.add("error");
        valid = false;
    }

    return valid;
}
