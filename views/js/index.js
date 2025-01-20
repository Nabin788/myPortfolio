const elements = {
    navlist: document.querySelector(".nav-list"),
    home: document.getElementById("home"),
    projetTemplate: document.getElementById("project-template"),
    projectSection: document.getElementById("project-section"),
    projectList: document.querySelector(".project-list"),
    contact: document.getElementById("contact"),
    aboutBtn: document.querySelector(".about-btn"),
    contactBtn: document.getElementById("submit-btn"),
    visitBtn: document.querySelector(".visit-btn"),
    sourceCode: document.querySelector(".sourceCode"),
    aboutSection: document.getElementById("about-section"),
    darkModeBtn: document.querySelector(".darkmode-btn")
}


// Helper function to apply background and text colors
const applyModeStyles = (section, bgColor, textColor, borderColor) => {
    section.style.backgroundColor = bgColor;
    section.style.color = textColor;
    section.querySelectorAll("h2, h3, h4, h5").forEach(h => h.style.color = textColor);
    section.querySelectorAll("h2, h3, h4").forEach(h => h.style.borderBottom = `1px solid ${borderColor}`);
    section.querySelectorAll("p").forEach(p => p.style.color = textColor);
};

// Function to toggle dark mode
const darkMode = () => {
    const modeIcon = document.querySelector(".mode-icon");
    const isDarkMode = modeIcon.src.includes("sun.webp");

    const modeStyles = isDarkMode ? {
        bgColor: "black", textColor: "white", borderColor: "white", icon: "../icons/moon.webp", alt: "dark mode icon",
        sectionBgColor: "#333", sectionTextColor: "white", sectionBorderColor: "white", bodyBgColor: "black", localStorageValue: "enabled"
    } : {
        bgColor: "#f4f4f4", textColor: "#333", borderColor: "black", icon: "../icons/sun.webp", alt: "light mode icon",
        sectionBgColor: "white", sectionTextColor: "#333", sectionBorderColor: "black", bodyBgColor: "#f4f4f4", localStorageValue: "disabled"
    };

    modeIcon.src = modeStyles.icon;
    modeIcon.alt = modeStyles.alt;
    document.body.style.backgroundColor = modeStyles.bodyBgColor;

    // Apply styles to sections
    document.querySelector("#about-section").querySelectorAll(".introduction, .skills, .education, .connect").forEach(section => 
        applyModeStyles(section, modeStyles.sectionBgColor, modeStyles.sectionTextColor, modeStyles.sectionBorderColor)
    );

    // Apply styles to project items
    document.querySelectorAll(".project-item").forEach(projectItem => {
        applyModeStyles(projectItem.querySelector(".project-description"), modeStyles.sectionBgColor, modeStyles.sectionTextColor, modeStyles.sectionBorderColor);
    });

    // Header and other specific elements
    document.querySelector("header").style.backgroundColor = modeStyles.sectionBgColor;
    document.querySelector("header").querySelector("h1").style.color = modeStyles.sectionTextColor;
    document.querySelector(".info").querySelector("p").style.color = modeStyles.sectionTextColor;
    document.querySelector(".info").querySelector(".textTyping").style.color = modeStyles.sectionTextColor;
    document.querySelector(".myShort-description").querySelector("span").style.color = modeStyles.sectionTextColor;
    document.querySelector(".contact-container").style.backgroundColor = modeStyles.sectionBgColor;

    localStorage.setItem("darkMode", modeStyles.localStorageValue);
};

// Function to apply the saved mode on page load
const applySavedMode = () => {
    const darkModeStatus = localStorage.getItem("darkMode");
    if (darkModeStatus === "enabled") darkMode();
};

// Apply saved mode when the page loads
document.addEventListener("DOMContentLoaded", applySavedMode);

const navbar = (url) => {
    // Set the active class based on the current URL
    document.querySelectorAll(".nav-list a").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute('href') === url) {
            link.classList.add("active");
        }
    });

    // Hide all sections initially
    elements.projectSection.style.display = "none";
    elements.contact.style.display = "none";
    elements.home.style.display = "none";
    elements.aboutSection.style.display = "none";

    // Display the relevant section based on the URL
    switch (url) {
        case "/home":
            elements.home.style.display = "grid";
            document.title = "Home - Portfolio";
            updateCanonicalUrl("/home");
            break;
        case "/about":
            elements.aboutSection.style.display = "flex";
            document.title = "About - Portfolio";
            updateCanonicalUrl("/about");
            break;
        case "/portfolio":
            elements.projectSection.style.display = "block";
            document.title = "Projects - Portfolio";
            updateCanonicalUrl("/portfolio");
            break;
        case "/contact":
            elements.contact.style.display = "flex";
            document.title = "Contact - Portfolio";
            updateCanonicalUrl("/contact");
            break;
        default:
            elements.home.style.display = "grid";
            break;
    }
};

// Function to update the canonical URL dynamically
const updateCanonicalUrl = (url) => {
    const canonicalLink = document.getElementById('canonical-link');
    if (canonicalLink) {
        canonicalLink.href = `https://www.nabin788.com.np${url}`;
    }
};


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
        const { project, description, image, link } = projectData;

        const template = document.importNode(elements.projetTemplate.content, true);
        template.querySelector(".project-name").textContent = project;
        template.querySelector(".project-img").src = image;
        template.querySelector(".project-img").alt = `Nabin Poudel ${project} Project Screen Shoot.`;
        template.querySelector(".project-link").href = link;
        template.querySelector(".description").textContent = description;
        elements.projectList.append(template);
    });
}
projectItems();

const formValid = () => {
    const userName = document.getElementById("name");
    const userEmail = document.getElementById("email");
    const contactBtn = elements.contactBtn;

    const checkValue = () => {
        const userValue = userName.value;
        const emailValue = userEmail.value;

        const nameValue = userName.value.trim();

        if (nameValue === "") {
            alert("Please enter a valid name.");
            return nameInput.focus();
        }

        // Show or hide the button based on input values
        contactBtn.style.display = userValue && emailValue ? "flex" : "none";
    };

    // Add input event listeners for validation
    userName.addEventListener("input", checkValue);
    userEmail.addEventListener("input", checkValue);
};

formValid();

// Handle back/forward navigation with browser buttons
window.addEventListener("popstate", () => {
    navbar(window.location.pathname);
});

// Handle initial page load
window.addEventListener("DOMContentLoaded", () => {
    navbar(window.location.pathname);
});

const aboutNav = () => {
    const about = "/about";
    history.pushState({}, "", about);
    navbar(about);
}

const visitProject = () => {
    const projectVisit = "/portfolio";
    history.pushState({}, "", projectVisit);
    navbar(projectVisit);
}

elements.navlist.addEventListener("click", handleNavbar);
elements.aboutBtn.addEventListener("click", aboutNav);
elements.visitBtn.addEventListener("click", visitProject);
elements.darkModeBtn.addEventListener("click", darkMode);

