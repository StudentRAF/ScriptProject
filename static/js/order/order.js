let orders = readJSONCookie("orders");

let statuses = readJSONCookie("statuses");

let dishes = readJSONCookie("dishes");

let order;

document.addEventListener("DOMContentLoaded", (event) => {
    const parameters = new URLSearchParams(window.location.search);

    let id = parseInt(parameters.get("id"));

    order = orders.find((item) => { return item.id === id });

    generateOrderID();
    generateOrderTime();
    generateOrderAddress();
    generateOrderDishes();
    generateOrderStatus();
    generateOrderPrice();
});

const generateOrderID = () => {
    let elementID = document.getElementById("order-id");

    elementID.innerText = order.id;
}

const generateOrderTime = () => {
    let elementTime = document.getElementById("order-time");

    elementTime.innerText = order.time;
}

const generateOrderStatus = () => {
    let elementStatus = document.getElementById("order-status");

    statuses.forEach((status) => { elementStatus.appendChild(generateOrderStatusOption(status) )} );

    elementStatus.selectedIndex = statuses.findIndex((status) => { return status.id === order.status });
}

const generateOrderStatusOption = (status) => {
    let option = document.createElement("option");

    option.dataset.id = status.id;
    option.innerHTML  = status.name;

    return option;
}

const generateOrderDishes = () => {
    let elementDetails = document.getElementById("order-details");

    order.dishes.forEach((dishID, index) => {
        elementDetails.appendChild(generateOrderDish(dishes.find((item) => { return item.id === dishID }), order.quantities[index]));
    })
}

const generateOrderDish = (dish, quantity) => {
    let item = document.createElement("li");

    item.innerText = dish.name + " x" + quantity;

    return item;
}

const generateOrderAddress = () => {
    let elementAddress = document.getElementById("order-address");

    elementAddress.innerText = order.address;
}

const generateOrderPrice = () => {
    let totalPrice = 0;
    let elementPrice = document.getElementById("order-price");


    order.dishes.forEach((dishID, index) => {
        let dish = dishes.find((item) => { return item.id === dishID });

        totalPrice += dish.price * order.quantities[index];
    });

    elementPrice.innerText = totalPrice.toString() + " RSD";
}

const saveChanges = () => {
    const statusElement = document.getElementById("order-status");

    orders.find((item) => { return item.id === order.id }).status = parseInt(statusElement[statusElement.selectedIndex].dataset.id);

    updateCookie("orders", orders);

    return true;
}
