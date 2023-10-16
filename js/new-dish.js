const submitForm = (value) => {
    if (!validate())
        return false;

    let dishes = readJSONCookie("dishes");

    const object = Object.fromEntries(new FormData(document.forms["form"]));

    const dishID       = dishes.length;
    const dishName     = object["dish-name"].toString();
    const dishCategory = object["category"].toString();
    const dishPrice    = parseInt(object["price"].toString());

    dishes.push({ id: dishID, name: dishName, category: dishCategory, price: dishPrice });

    updateCookie("dishes", dishes);

    return true;
}
