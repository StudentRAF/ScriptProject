let dishes = readJSONCookie("dishes");

let categories = readJSONCookie("categories");

const saveChanges = () => {
    if (!validate())
        return false;

    const object = Object.fromEntries(new FormData(document.forms["form"]));

    const dishID       = dishes.length;
    const dishName     = object["dish-name"].toString();
    const dishCategory = categories.find((category) => { return category.name === object["category"] }).id;
    const dishPrice    = parseInt(object["price"].toString());

    dishes.push({ id: dishID, name: dishName, category: dishCategory, price: dishPrice });

    updateCookie("dishes", dishes);

    return true;
}
