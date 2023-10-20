const Category = readJSONCookie("Category");

const dishes = readJSONCookie("dishes");

document.addEventListener("DOMContentLoaded", (event) => {
    let table = document.getElementById("dish-list");

    dishes.forEach((dish) => appendRow(table, dish));
});

const appendRow = (table, dish) => {
    let row = table.insertRow(-1);
    let cell;

    rowData.forEach((cellData) => {
        cell = row.insertCell(-1);
        cell.innerHTML = cellData.innerHTML(dish);
        cell.classList.add(cellData.classNames);
    });
}

const rowData = [
    { innerHTML: (dish) => { return dish.name },                  classNames: "column-name"     },
    { innerHTML: (dish) => { return dish.category },              classNames: "column-category" },
    { innerHTML: (dish) => { return dish.price },                 classNames: "column-price"    },
    { innerHTML: (dish) => { return generateActionColumn(dish) }, classNames: "column-action"   }
]

const generateActionColumn = (dish) => {
    return `<div class="button-action-container">`                                 +
               `<a class="btn btn-dark" href="dish.html?id=${dish.id}">Izmeni</a>` +
               `<button class="btn btn-danger-hover" onclick="">Ukloni</button>`   +
           `</div>`;
}
