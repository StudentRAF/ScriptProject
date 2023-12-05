let id;

document.addEventListener("DOMContentLoaded", (event) => {
    id = parseInt(document.location.href.split("/").reverse()[0]);

    fetch(`http://localhost:9090/genre/${id}`).then(response => {
        response.json().then(genre => {
            document.getElementById("name").value = genre.name;
        }).catch(error => {
            console.error("Error:", error);
        });
    });

    document.getElementById("form").action = `/genre/update/${id}`;
    document.getElementById("form").method = "post";
});

const saveGenre = () => {
    return validate();
}
