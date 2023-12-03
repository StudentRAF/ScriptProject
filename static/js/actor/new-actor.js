document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("form").action = "/actor/create";
    document.getElementById("form").method = "post";
});

const createActor = () => {
    return validate();
}
