document.addEventListener("DOMContentLoaded", (event) => {
    generateActors();
});

const generateActors = () => {
    const tableElement = document.getElementById("actors");

    while (tableElement.firstChild)
        tableElement.firstChild.remove();

    fetch("http://localhost:9090/actors").then(response => {
        response.json().then(data => {
            for (const actor of data) {
                appendRow(tableElement, actor);
            }
        })
    }).catch(error => {
        console.error("Error:", error);
    });
}

const rowData = [
    { innerHTML: (actor) => { return actor["firstName"] + " " + actor["lastName"]      } },
    { innerHTML: (actor) => { return actor["gender"]                                   } },
    { innerHTML: (actor) => { return actor["dateOfBirth"]                              } },
    { innerHTML: (actor) => { return actor["dateOfDeath"] ? actor["dateOfDeath"] : "-" } },
    { innerHTML: (actor) => { return generateActionCell(actor)                         } }
];

const appendRow = (table, actor) => {
    let row = table.insertRow(-1);
    let cell;

    rowData.forEach((cellData) => {
        cell = row.insertCell(-1);

        cell.innerHTML = cellData.innerHTML(actor);
    });
}

const generateActionCell = (actor) => {
    return `<div class="button-action-container">`                                                       +
               `<a class="btn btn-dark" href="/actor/${actor.id}">Edit</a>`                              +
               `<button class="btn btn-danger-hover" onclick="removeActor(${actor.id})">Delete</button>` +
           `</div>`;
}

const removeActor = (actorID) => {
    fetch(`/actor/remove/${actorID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    }).then(() => {
        generateActors();
    }).catch(error => {
        console.error(`[Error][Actor] Delete actor id: ${actorID}. Message: ${error}`);
    });
}
