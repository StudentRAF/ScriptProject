document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("form").action = "/title/create";
    document.getElementById("form").method = "post";
});

const createTitle = () => {
    return validate();
}
