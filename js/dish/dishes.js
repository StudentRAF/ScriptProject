const categories = readJSONCookie("categories");

const dishes = readJSONCookie("dishes");

const rowData = [
    { innerHTML: (dish) => { return dish.name                  }, classNames: "column-name"     },
    { innerHTML: (dish) => { return generateDishCategory(dish) }, classNames: "column-category" },
    { innerHTML: (dish) => { return dish.price                 }, classNames: "column-price"    },
    { innerHTML: (dish) => { return generateActionColumn(dish) }, classNames: "column-action"   }
];

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

const generateDishCategory = (dish) => {
    return categories.find((category) => { return category.id === dish.category }).name;
}

const generateActionColumn = (dish) => {
    return `<div class="button-action-container">`                                                       +
               `<a class="btn btn-dark" href="dish.html?id=${dish.id}">Izmeni</a>`                       +
               `<button class="btn btn-danger-hover" onclick="removeDish(${dish.id})">Ukloni</button>`   +
           `</div>`;
}

const removeDish = (dishID) => {
    dishes.splice(dishes.findIndex((dish) => { return dish.id === dishID }), 1);

    updateCookie("dishes", dishes);

    refreshDishes();
}

const refreshDishes = () => {
    let table = document.getElementById("dish-list");

    while(table.firstChild)
        table.firstChild.remove();

    dishes.forEach((dish) => appendRow(table, dish));
}
