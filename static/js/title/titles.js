document.addEventListener("DOMContentLoaded", (event) => {
    const tableElement = document.getElementById("titles");

    fetch("/titles-all").then(response => {
        response.json().then(data => data.forEach(title => appendRow(tableElement, title)));
    })
        .catch(error => {
            console.error("Error:", error);
        });
});

const rowData = [
    { innerHTML: (item) => { return item["title"]              } },
    { innerHTML: (item) => { return item["release-date"]       } },
    { innerHTML: (item) => { return item["duration"]           } },
    { innerHTML: (item) => { return item["genres"]             } },
    { innerHTML: (item) => { return generateActionColumn(item) } }
];

const appendRow = (table, item) => {
    let row = table.insertRow(-1);
    let cell;

    rowData.forEach((cellData) => {
        cell = row.insertCell(-1);
        cell.innerHTML = cellData.innerHTML(item);
    });
}

const generateActionColumn = (item) => {
    return `<div class="button-action-container">`                               +
               `<a class="btn btn-dark" href="/ingredient?id=${0}">Edit</a>`     +
               `<button class="btn btn-danger-hover" onclick="">Delete</button>` +
           `</div>`;
}
