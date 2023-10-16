window.onload = () => {
    if (!document.location.pathname.endsWith("index.html"))
        return;

    deleteAllCookies();

    const Category = {
        PIZZA:     "Pizza",
        SANDWICH : "Sendvič"
    };

    const Status = {
        NEW:         "Nova",
        ACCEPTED:    "Prihvaćena",
        DECLINED:    "Odbijena",
        PREPARATION: "U pripremi",
        SENT:        "U dostavi",
        DELIVERED:   "Završeno"
    };

    const orders = [
        { id: 0, time: new Date().toLocaleString(), status: Status.NEW,      address: "Kralja Milana 12/2", dishes: [ 0, 1, 2 ], quantities: [ 1, 1, 1 ] },
        { id: 1, time: new Date().toLocaleString(), status: Status.ACCEPTED, address: "Knez Mihailova 6/6", dishes: [ 2 ],       quantities: [ 3 ]       }
    ];

    const dishes = [
        { id: 0, name: "Kaprićoza-velika", category: Category.PIZZA,    price: 1000 },
        { id: 1, name: "Kaprićoza-mala",   category: Category.PIZZA,    price:  600 },
        { id: 2, name: "Prezident",        category: Category.SANDWICH, price:   99 }
    ];

    addCookie("orders",   orders);
    addCookie("dishes",   dishes);
    addCookie("Category", Category);
    addCookie("Status",   Status);

    console.log(readJSONCookie("orders"));
}

function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function listCookies () { // Debug function
    let cookies = '';

    document.cookie.split(';').forEach((cookie, index) => { cookies += (index + 1) + '.' + (cookie[0] === ' ' ? '' : ' ') + cookie + '\n'});

    return cookies;
}

function addCookie(name, object) {
    let cookie = document.cookie.match(new RegExp(name + "=([^;]+)"));

    if (cookie !== null) {
        throw new Error(`Cookie with name: ${name} already exists.`);
    }

    document.cookie = name + "=" + JSON.stringify(object);
}

function updateCookie(name, object) {
    let cookie = document.cookie.match(new RegExp(name + "=([^;]+)"));

    if (cookie === null)
        throw new Error(`Cookie with name: ${name} does not exist.`);

    document.cookie = name + "=" + JSON.stringify(object);
}

function readJSONCookie(name) {
    let result = document.cookie.match(new RegExp(name + "=([^;]+)"));

    try {
        result && (result = JSON.parse(result[1]));
    }
    catch (exception) {
        return null;
    }

    return result;
}
