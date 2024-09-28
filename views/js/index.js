const elements = {
    navlist: document.querySelector(".nav-list"),
    home: document.getElementById("home"),
    projetTemplate: document.getElementById("project-template"),
    projectSection: document.getElementById("project-section"),
    projectList: document.querySelector(".project-list"),
    contact: document.getElementById("contact"),
    about: document.getElementById("about"),
    aboutBtn: document.querySelector(".about-btn")
}

const navbar = (url) => {
    switch (url) {
        case "/home":
            elements.home.style.display = "grid";
            elements.contact.style.display = "none";
            elements.projectSection.style.display = "none";
            elements.about.style.display = "none";
            break;
        case "/about":
            elements.about.style.display = "block";
            elements.projectSection.style.display = "none";
            elements.contact.style.display = "none";
            elements.home.style.display = "none";
            break;
        case "/project":
            elements.projectSection.style.display = "block";
            elements.home.style.display = "none";
            elements.about.style.display = "none";
            elements.contact.style.display = "none";
            break;
        case "/contact":
            elements.contact.style.display = "block";
            elements.projectSection.style.display = "none";
            elements.home.style.display = "none";
            elements.about.style.display = "none";
            break;
        default:
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

// Show about section on button click
elements.aboutBtn.addEventListener("click", () => {
    history.pushState({}, "", "/about");
    navbar("/about");
});

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

elements.navlist.addEventListener("click", handleNavbar);

