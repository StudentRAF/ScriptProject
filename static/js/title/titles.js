document.addEventListener("DOMContentLoaded", (event) => {
    generateTitles();
});

const generateTitles = () => {
    const tableElement = document.getElementById("titles");

    while (tableElement.firstChild)
        tableElement.firstChild.remove();

    fetch("http://localhost:9090/titles").then(response => {
        response.json().then(async data => {
            for (const title of data) {
                appendRow(tableElement, title);
            }
        })
    }).catch(error => {
        console.error("Error:", error);
    });
}

const rowData = [
    { innerHTML: (title) => { return title["name"]             } },
    { innerHTML: (title) => { return title["releaseDate"]      } },
    { innerHTML: (title) => { return title["duration"]         } },
    { innerHTML: (title) => { return ""                        } },
    { innerHTML: (title) => { return generateActionCell(title) } }
];

const appendRow = async (table, title) => {
    let row = table.insertRow(-1);
    let cell;

    rowData.forEach((cellData) => {
        cell = row.insertCell(-1);

        cell.innerHTML = cellData.innerHTML(title);
    });

    row.cells[3].innerHTML = await generateGenresCell(title);
}

const generateActionCell = (title) => {
    return `<div class="button-action-container">`                                                       +
               `<a class="btn btn-dark" href="/title/${title.id}">Edit</a>`                              +
               `<button class="btn btn-danger-hover" onclick="removeTitle(${title.id})">Delete</button>` +
           `</div>`;
}

const generateGenresCell = async (title) => {
    let content = "";

    await fetch(`http://localhost:9090/title-genres/${title.id}`).then(response => response.json())
        .then(genres => genres.forEach(genre => content += generateGenre(genre)))
        .catch(error => console.error("Error:", error));

    return content;
}

const generateGenre = (genre) => {
    return `<p class="cell-genre">${genre.name}</p>`
}

/*
const generateOrderDishes = (order) => {
    let content = String();

    order.dishes.forEach((dishID, index) => content += generateDish(dishes[dishID], order.quantities[index]));

    return content;
}

const generateDish = (dish, quantity) => {
    return `<p class="column-content-dish">${dish.name} x ${quantity}</p>`
}
 */

const removeTitle = (titleID) => {
    fetch(`/title/remove/${titleID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    }).then(() => {
        generateTitles();
    }).catch(error => {
        console.error(`[Error][Title] Delete title id: ${titleID}. Message: ${error}`);
    });
}
