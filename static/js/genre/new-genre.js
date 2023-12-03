document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("form").action = "/genre/create";
    document.getElementById("form").method = "post";
});

const createGenre = () => {
    return validate();
}
