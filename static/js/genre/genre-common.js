document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("name").onfocus = clear;
});

const clear = () => {
    document.getElementById("name").classList.remove("error");
};

const validate = () => {
    let valid = true;

    let genreNameElement = document.getElementById("name");
    if (genreNameElement.value.length < 3) {
        genreNameElement.classList.add("error");
        valid = false;
    }

    return valid;
}
