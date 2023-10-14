const Category = {
    PIZZA:     "Pizza",
    SANDWICH : "Sendvič"
}

const dishes = [
    { id: 0, name: "Kaprićoza-velika", category: Category.PIZZA,    price: 1000 },
    { id: 1, name: "Kaprićoza-mala",   category: Category.PIZZA,    price:  600 },
    { id: 2, name: "Prezident",        category: Category.SANDWICH, price:   99 }
]

document.addEventListener("DOMContentLoaded", (event) => {
    let table = document.getElementById("dishes");

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
    return `<button class="btn btn-dark button-edit-price" onclick="">Promena cene</button>
            <a class="btn btn-dark link-edit-dish" href="jelo.html?id=${dish.id}">Izmeni</a>`;
}
