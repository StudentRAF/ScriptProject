categories = readJSONCookie("categories");

const createCategory = () => {
    if (!validate())
        return false;

    const object = Object.fromEntries(new FormData(document.forms["form"]));

    const categoryID   = categories[categories.length - 1].id + 1;
    const categoryName = object["category-name"].toString();

    categories.push({ id: categoryID, name: categoryName });

    updateCookie("categories", categories);

    return true;
}
