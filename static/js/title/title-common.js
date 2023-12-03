document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("title").onfocus        = clear;
    document.getElementById("duration").onfocus     = clear;
    document.getElementById("release-date").onfocus = clear;

    generateGenreOptions();
});

const generateGenreOptions = () => {
    let genreElement = document.getElementById("genre");

    generateEmptyOption(genreElement);

    fetch("http://localhost:9090/genres").then(response => {
        response.json().then(genres => genres.forEach(genre => generateGenreOption(genreElement, genre)));
    }).catch(error => {
        console.error("Error:", error);
    });
}

const generateEmptyOption = (options) => {
    let option = document.createElement("option");

    option.dataset.id = "-1";

    options.appendChild(option);
};

const generateGenreOption = (options, genre) => {
    let option = document.createElement("option");

    option.dataset.id = genre.id;
    option.innerHTML  = genre.name;

    options.appendChild(option);
}

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

const submitGenre = () => {
    let genreOption = document.getElementById("genre");
    let genreID = parseInt(genreOption[genreOption.selectedIndex].dataset.id);

    if (genreID < 0)
        return;

    fetch(`http://localhost:9090/genre/${genreID}`).then(response => {
        response.json().then(genre => addGenre(genre));
    }).catch(error => {
        console.error("Error:", error);
    });
}

const addGenre = (genre) => {
    let genresElement = document.getElementById("genres");
    let genreItem     = document.createElement("div");

    genreItem.dataset.id = genre.id;
    genreItem.classList.add("input-group");
    genreItem.innerHTML = generateGenreItem(genre);

    genresElement.appendChild(genreItem);

    disableGenre(genre);
}

const generateGenreItem = (genre) => {
    return `<span>${genre.name}</span>` +
           `<input type="hidden" name="genres" value="${genre.id}"/>` +
           `<button class="btn btn-danger-hover" onclick="removeGenre(${genre.id})" type="button">` +
               `<img src="../../resources/Close.svg"  alt=""/>` +
           `</button>`;
}

const removeGenre = (genreID) => {
    let genresElement = document.getElementById("genres");

    enableGenre(genreID);

    Array.from(genresElement.children).find((item) => { return parseInt(item.dataset.id) === genreID }).remove();
}

const disableGenre = (genre) => {
    let genreElement = document.getElementById("genre");
    let index = Array.from(genreElement.children).findIndex((item) => { return parseInt(item.dataset.id) === genre.id });

    genreElement[index].disabled = true;
    genreElement.selectedIndex = 0;
}

const enableGenre = (genreID) => {
    let genreElement = document.getElementById("genre");
    Array.from(genreElement.children).find((item) => {
        return parseInt(item.dataset.id) === genreID
    }).disabled = false;
}
