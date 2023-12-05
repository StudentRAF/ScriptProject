document.addEventListener("DOMContentLoaded", (event) => {
    generateGenres();
});

const generateGenres = () => {
    const tableElement = document.getElementById("genres");

    while (tableElement.firstChild)
        tableElement.firstChild.remove();

    fetch("http://localhost:9090/genres").then(response => {
        response.json().then(data => {
            for (const genre of data) {
                appendRow(tableElement, genre);
            }
        })
    }).catch(error => {
        console.error("Error:", error);
    });
}

const rowData = [
    { innerHTML: (genre) => { return genre["name"]             } },
    { innerHTML: (genre) => { return generateActionCell(genre) } }
];

const appendRow = (table, genre) => {
    let row = table.insertRow(-1);
    let cell;

    rowData.forEach((cellData) => {
        cell = row.insertCell(-1);

        cell.innerHTML = cellData.innerHTML(genre);
    });
}

const generateActionCell = (genre) => {
    return `<div class="button-action-container">`                                                       +
               `<a class="btn btn-dark" href="/genre/${genre.id}">Edit</a>`                              +
               `<button class="btn btn-danger-hover" onclick="removeGenre(${genre.id})">Delete</button>` +
           `</div>`;
}

const removeGenre = (genreID) => {
    fetch(`/genre/remove/${genreID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    }).then(() => {
        generateGenres();
    }).catch(error => {
        console.error(`[Error][Genre] Delete genre id: ${genreID}. Message: ${error}`);
    });
}
