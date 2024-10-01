const elements = {
    navlist: document.querySelector(".nav-list"),
    home: document.getElementById("home"),
    projetTemplate: document.getElementById("project-template"),
    projectSection: document.getElementById("project-section"),
    projectList: document.querySelector(".project-list"),
    contact: document.getElementById("contact"),
    aboutBtn: document.querySelector(".about-btn"),
    contactBtn: document.getElementById("submit-btn"),
    sourceCode: document.querySelector(".sourceCode"),
    aboutSection: document.getElementById("about-section")
}

const navbar = (url) => {

    // Set the active class based on the current URL
    document.querySelectorAll(".nav-list a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute('href') === url) {
            link.classList.add("active");
        }
    });

    elements.projectSection.style.display = "none";
    elements.contact.style.display = "none";
    elements.home.style.display = "none";
    elements.aboutSection.style.display = "none";

    switch (url) {
        case "/home":
            elements.home.style.display = "grid";
            document.title = "home - Portfolio"
            break;
        case "/about":
            elements.aboutSection.style.display = "flex";
            document.title = "about - Portfolio"
            break;
        case "/portfolio":
            elements.projectSection.style.display = "block";
            document.title = "project - Portfolio";
            break;
        case "/contact":
            elements.contact.style.display = "flex";
            document.title = "contact - Portfolio"
            break;
        default:
            elements.home.style.display = "grid";
            break;
    }
}

const handleNavbar = (event) => {

    event.preventDefault();
    const url = event.target.getAttribute('href');
    if (!url) {
        return;
    }

    // Update URL without reloading the page
    history.pushState({}, "", url);
    navbar(url);
}

const projectItems = async () => {
    const api = await fetch("../project.json");
    const projectApi = await api.json();

    projectApi.forEach(projectData => {
        const { project, description, image, link } = projectData

        const template = document.importNode(elements.projetTemplate.content, true);
        template.querySelector(".project-name").textContent = project;
        template.querySelector(".project-img").src = image;
        template.querySelector(".project-link").href = link;
        template.querySelector(".description").textContent = description;
        elements.projectList.append(template);
    });
}
projectItems();

// Handle back/forward navigation with browser buttons
window.addEventListener("popstate", () => {
    navbar(window.location.pathname);
});

// Handle initial page load
window.addEventListener("DOMContentLoaded", () => {
    navbar(window.location.pathname);
});

const formValid = () => {
    const userName = document.getElementById("name");
    const userEmail = document.getElementById("email");

    const checkValue = () => {

        const userValue = userName.value;
        const emailValue = userEmail.value;
        if (userValue && emailValue) {
            elements.contactBtn.style.display = "flex";
        } else {
            elements.contactBtn.style.display = "none";

        }
    }

    userName.addEventListener("input", checkValue);
    userEmail.addEventListener("input", checkValue);

    const submitForm = () => {
        const toast = document.createElement("div");
        toast.classList.add("notify");
        document.body.appendChild(toast);
    }

    elements.contactBtn.addEventListener("click", submitForm);
}
formValid();


elements.navlist.addEventListener("click", handleNavbar);

