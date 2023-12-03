document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("first-name").onfocus = clear;
    document.getElementById("last-name").onfocus  = clear;
    document.getElementById("birth-date").onfocus = clear;

    generateGenderOptions();
});

const generateGenderOptions = () => {
    let genderElement = document.getElementById("gender");

    ["Male", "Female"].forEach(gender => {
        let option = document.createElement("option");

        option.value     = gender;
        option.innerHTML = gender;

        genderElement.appendChild(option);
    });
};

const clear = () => {
    document.getElementById("first-name").classList.remove("error");
    document.getElementById("last-name").classList.remove("error");
    document.getElementById("birth-date").classList.remove("error");
};

const validate = () => {
    let valid = true;

    let firstNameElement = document.getElementById("first-name");
    if (firstNameElement.value.length < 3) {
        firstNameElement.classList.add("error");
        valid = false;
    }

    let lastNameElement = document.getElementById("last-name");
    if (lastNameElement.value.length < 3) {
        lastNameElement.classList.add("error");
        valid = false;
    }

    let birthDateElement = document.getElementById("birth-date");
    if (birthDateElement.value.length === 0) {
        birthDateElement.classList.add("error");
        valid = false;
    }

    return valid;
}
