let id;

document.addEventListener("DOMContentLoaded", (event) => {
    id = parseInt(document.location.href.split("/").reverse()[0]);

    fetch(`http://localhost:9090/title/${id}`).then(response => {
        response.json().then(title => {
            document.getElementById("title").value        = title.name;
            document.getElementById("duration").value     = title.duration;
            document.getElementById("release-date").value = title.releaseDate;
        }).catch(error => {
            console.error("Error:", error);
        });
    });

    generateTitleGenres();


    document.getElementById("form").action = `/title/update/${id}`;
    document.getElementById("form").method = "post";
});

const generateTitleGenres = () => {
    fetch(`http://localhost:9090/title-genres/${id}`).then(response => {
        response.json().then(genres => genres.forEach(genre => addGenre(genre)))
    }).catch(error => {
        console.error("Error:", error);
    });
}

const saveTitle = () => {
    return validate();
}
