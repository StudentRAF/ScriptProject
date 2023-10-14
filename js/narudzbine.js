// Tabela treba da ima kolone: Zakazano vreme, Status, Cena, Adresa, Sadržaj narudžbine, Akcija

const Category = {
    PIZZA:     "Pizza",
    SANDWICH : "Sendvič"
}

const dishes = [
    { id: 0, name: "Kaprićoza-velika", category: Category.PIZZA,    price: 1000 },
    { id: 1, name: "Kaprićoza-mala",   category: Category.PIZZA,    price:  600 },
    { id: 2, name: "Prezident",        category: Category.SANDWICH, price:   99 }
]

const Status = {
    NEW:       "Nova",
    ACCEPTED : "Prihvaćena"
}

const orders = [
    { id: 0, time: new Date(), status: Status.NEW,      address: "Kralja Milana 12/2", dishes: [ 0, 1, 2 ], quantities: [ 1, 1, 1 ] },
    { id: 1, time: new Date(), status: Status.ACCEPTED, address: "Knez Mihailova 6/6", dishes: [ 2 ],       quantities: [ 3 ]       }
]

document.addEventListener("DOMContentLoaded", (event) => {
    let table = document.getElementById("orders");

    orders.forEach((order) => appendRow(table, order));
});

const appendRow = (table, order) => {
    let row = table.insertRow(-1);
    let cell;

    rowData.forEach((cellData) =>{
        cell = row.insertCell(-1);
        cell.innerHTML = cellData.innerHTML(order);
        cell.classList.add(cellData.classNames);
    });
}

const rowData = [
    { innerHTML: (order) => { return order.time.toLocaleString() }, classNames: "column-time"    },
    { innerHTML: (order) => { return order.status },                classNames: "column-status"  },
    { innerHTML: (order) => { return calculatePrice(order) },       classNames: "column-price"   },
    { innerHTML: (order) => { return order.address },               classNames: "column-address" },
    { innerHTML: (order) => { return generateContent(order) },      classNames: "column-content" },
    { innerHTML: (order) => { return generateActionColumn(order) }, classNames: "column-action"  }
]

const generateContent = (order) => {
    let content = String();

    order.dishes.forEach((dishID, index) => content += generateDish(dishes[dishID], order.quantities[index]));

    return content;
}

const generateDish = (dish, quantity) => {
    return `<p class="column-content-dish">${dish.name} x ${quantity}</p>`
}

const calculatePrice = (order) => {
    let price = 0;

    order.dishes.forEach((dish, index) => price += dishes.at(dish).price * order.quantities.at(index));

    return price;
}

const generateActionColumn = (order) => {
    return `<a class="btn btn-dark link-edit-dish" href="narudbina.html?id=${order.id}">Detalji</a>`;
}
