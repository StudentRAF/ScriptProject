document.addEventListener("DOMContentLoaded", (event) => {
    let links = document.getElementsByClassName("nav-link");

    for (let index = 0; index < links.length; ++index) {
        let link = links[index];

        if (link.href !== window.location.href)
            continue;

        link.classList.add("active");
        break;
    }
});
