const categories = readJSONCookie("categories");

const dishes = readJSONCookie("dishes");

const statuses = readJSONCookie("statuses");

const orders = readJSONCookie("orders");

document.addEventListener("DOMContentLoaded", (event) => {
    let table = document.getElementById("order-list");

    orders.forEach((order) => appendRow(table, order));
});

const appendRow = (table, order) => {
    let row = table.insertRow(-1);
    let cell;

    rowData.forEach((cellData) => {
        cell = row.insertCell(-1);
        cell.innerHTML = cellData.innerHTML(order);
    });
}

const rowData = [
    { innerHTML: (order) => { return order.time.toLocaleString() } },
    { innerHTML: (order) => { return generateOrderStatus(order)  } },
    { innerHTML: (order) => { return generateOrderPrice(order)   } },
    { innerHTML: (order) => { return order.address               } },
    { innerHTML: (order) => { return generateOrderDishes(order)  } },
    { innerHTML: (order) => { return generateActionColumn(order) } }
];

const generateOrderStatus = (order) => {

    return statuses.find((status) => { return status.id === order.status }).name;
}

const generateOrderPrice = (order) => {
    let price = 0;

    order.dishes.forEach((dish, index) => price += dishes.at(dish).price * order.quantities.at(index));

    return price;
}

const generateOrderDishes = (order) => {
    let content = String();

    order.dishes.forEach((dishID, index) => content += generateDish(dishes[dishID], order.quantities[index]));

    return content;
}

const generateDish = (dish, quantity) => {
    return `<p class="column-content-dish">${dish.name} x ${quantity}</p>`
}

const generateActionColumn = (order) => {
    return `<a class="btn btn-dark" href="/order?id=${order.id}">Detalji</a>`;
}