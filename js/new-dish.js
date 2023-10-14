document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("dish-name").onfocus = clear;
    document.getElementById("price").onfocus     = clear;
});

const clear = () => {
    document.getElementById("dish-name").classList.remove("error");
    document.getElementById("price").classList.remove("error");
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
