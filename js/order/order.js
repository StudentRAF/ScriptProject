let order;

document.addEventListener("DOMContentLoaded", (event) => {
    const parameters = new URLSearchParams(window.location.search);

    let id = parseInt(parameters.get("id"));
    let orders = readJSONCookie("orders");

    order = orders.find((item) => { return item.id === id });

    generateIDValue();
    generateTimeValue();
    generateAddressValue();
    generateDetailsValue();
    generateStatusValue();
    generatePriceValue();
});

const generateIDValue = () => {
    let elementID = document.getElementById("order-id");

    elementID.innerText = order.id;
}

const generateTimeValue = () => {
    let elementTime = document.getElementById("order-time");

    elementTime.innerText = order.time;
}

const generateStatusValue = () => {
    let elementStatus = document.getElementById("order-status");

    let status = readJSONCookie("Status");
    Object.keys(status).forEach((key) => { elementStatus.appendChild(generateStatusOption(status[key])) });

    elementStatus.selectedIndex = Object.values(status).indexOf(order.status);
}

const generateStatusOption = (status) => {
    let option = document.createElement("option");

    option.innerHTML = status;

    return option;
}

const generateDetailsValue = () => {
    let elementDetails = document.getElementById("order-details");

    const dishes = readJSONCookie("dishes");

    order.dishes.forEach((dishID, index) => {
        elementDetails.appendChild(generateDetailsItem(dishes.find((item) => { return item.id === dishID }), order.quantities[index]));
    })
}

const generateDetailsItem = (dish, quantity) => {
    let item = document.createElement("li");

    item.innerText = dish.name + " x" + quantity;

    return item;
}

const generateAddressValue = () => {
    let elementAddress = document.getElementById("order-address");

    elementAddress.innerText = order.address;
}

const generatePriceValue = () => {
    let totalPrice = 0;
    let elementPrice = document.getElementById("order-price");

    let dishes = readJSONCookie("dishes");

    order.dishes.forEach((dishID, index) => {
        let dish = dishes.find((item) => { return item.id === dishID });

        totalPrice += dish.price * order.quantities[index];
    });

    elementPrice.innerText = totalPrice.toString() + " RSD";
}

const saveChanges = () => {
    const elementStatus = document.getElementById("order-status");

    let orders = readJSONCookie("orders");
    let editOrder = orders.find((item) => { return item.id === order.id });

    editOrder.status = elementStatus.value;

    updateCookie("orders", orders);

    return true;
}
