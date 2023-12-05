let id;

document.addEventListener("DOMContentLoaded", (event) => {
    id = parseInt(document.location.href.split("/").reverse()[0]);

    fetch(`http://localhost:9090/actor/${id}`).then(response => {
        response.json().then(actor => {
            document.getElementById("name").value        = actor.firstName + " " + actor.lastName;
            document.getElementById("birth-date").value  = actor.dateOfBirth;
            document.getElementById("death-date").value  = actor.dateOfDeath;
        }).catch(error => {
            console.error("Error:", error);
        });
    });

    document.getElementById("form").action = `/actor/update/${id}`;
    document.getElementById("form").method = "post";
});

const saveActor = () => {
    return validate();
}
