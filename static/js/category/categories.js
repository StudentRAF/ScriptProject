const categories = readJSONCookie("categories");

const rowData = [
    { innerHTML: (category) => { return category.name                  } },
    { innerHTML: (category) => { return generateActionColumn(category) } }
];

document.addEventListener("DOMContentLoaded", (event) => {
    let table = document.getElementById("category-list");

    categories.forEach((category) => appendRow(table, category));
});

const appendRow = (table, category) => {
    let row = table.insertRow(-1);
    let cell;

    rowData.forEach((cellData) => {
        cell = row.insertCell(-1);
        cell.innerHTML = cellData.innerHTML(category);
    });
}

const generateActionColumn = (category) => {
    return `<div class="button-action-container">`                                                             +
               `<a class="btn btn-dark" href="/category?id=${category.id}">Izmeni</a>`                     +
               `<button class="btn btn-danger-hover" onclick="removeCategory(${category.id})">Ukloni</button>` +
           `</div>`;
}

const removeCategory = (categoryID) => {
    categories.splice(categories.findIndex((category) => { return category.id === categoryID }), 1);

    updateCookie("categories", categories);

    refreshCategories();
}

const refreshCategories = () => {
    let table = document.getElementById("category-list");

    while(table.firstChild)
        table.firstChild.remove();

    categories.forEach((category) => appendRow(table, category));
}

