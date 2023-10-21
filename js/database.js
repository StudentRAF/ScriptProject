window.onload = () => {
    if (!document.location.pathname.endsWith("index.html"))
        return;

    deleteAllCookies();

    const statuses = [
        { id: 0, name: "Nova"       },
        { id: 1, name: "Prihvaćena" },
        { id: 2, name: "Odbijena"   },
        { id: 3, name: "U pripremi" },
        { id: 4, name: "U dostavi"  },
        { id: 5, name: "Završeno"   },
    ];

    const categories = [
        { id: 0, name: "Pizza"   },
        { id: 1, name: "Sendvič" }
    ];

    const ingredients = [
        { id: 0, name: "Šunka"     },
        { id: 1, name: "Kačkavalj" },
        { id: 2, name: "Kečap"     },
        { id: 3, name: "Parizer"   },
        { id: 4, name: "Majonez"   }
    ];

    const orders = [
        { id: 0, time: new Date().toLocaleString(), status: 0, address: "Kralja Milana 12/2", dishes: [ 0, 1, 2 ], quantities: [ 1, 1, 1 ] },
        { id: 1, time: new Date().toLocaleString(), status: 1, address: "Knez Mihailova 6/6", dishes: [ 2 ],       quantities: [ 3 ]       }
    ];

    const dishes = [
        { id: 0, name: "Kaprićoza-velika", category: 0, ingredients: [],   price: 1000 },
        { id: 1, name: "Kaprićoza-mala",   category: 0, ingredients: [],   price:  600 },
        { id: 2, name: "Prezident",        category: 1, ingredients: [],   price:   99 }
    ];

    addCookie("orders",      orders);
    addCookie("dishes",      dishes);
    addCookie("categories",  categories);
    addCookie("statuses",    statuses);
    addCookie("ingredients", ingredients);
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

function listCookies() { // Debug function
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
    let resultRegex = document.cookie.match(new RegExp(name + "=([^;]+)"));
    let result;

    try {
        resultRegex && (result = JSON.parse(resultRegex[1]));
    }
    catch (exception) {
        return null;
    }

    return result;
}
