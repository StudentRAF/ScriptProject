document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("title").onfocus        = clear;
    document.getElementById("duration").onfocus     = clear;
    document.getElementById("release-date").onfocus = clear;

    let genreElement = document.getElementById("genre");

    genreElement.appendChild(generateEmptyOption());

    // Add form events
    document.getElementById("form").action = "/title/new";
    document.getElementById("form").method = "post";
});

const generateEmptyOption = () => {
    let option = document.createElement("option");

    option.dataset.id = "-1";

    return option;
};

const clear = () => {
    document.getElementById("title").classList.remove("error");
    document.getElementById("duration").classList.remove("error");
    document.getElementById("release-date").classList.remove("error");
};

const validate = () => {
    let valid = true;

    let titleElement = document.getElementById("title");
    if (titleElement.value.length < 3) {
        titleElement.classList.add("error");
        valid = false;
    }

    let durationElement = (document.getElementById("duration"));
    let value = parseInt(durationElement.value);
    if (isNaN(value) || value < 0) {
        durationElement.classList.add("error");
        valid = false;
    }

    let releaseDateElement = document.getElementById("release-date");
    if (releaseDateElement.value.length === 0) {
        releaseDateElement.classList.add("error");
        valid = false;
    }

    return valid;
}

