const loadingPahe = document.querySelector(".welcome-page");
const header = document.querySelector("header");
const footer = document.querySelector("footer");
const contact = document.querySelector(".section-contact");
const navList = document.querySelector(".nav-list");

const welcomeUser = () => {
    setTimeout(() => {
        loadingPahe.style.display = "none"
        sessionStorage.setItem("visited", "true");
        header.style.visibility = "visible";
        footer.style.visibility = "visible";
    }, 3000);
}

const hideVisitedPage = () => {
    loadingPahe.style.display = "none";
}

const userVisit = sessionStorage.getItem("visited");

if (!userVisit) {
    header.style.visibility = "hidden";
    footer.style.visibility = "hidden";
    welcomeUser()
} else {
    hideVisitedPage();
}

const contactForm = (event) => {
    const nav = event.target.parentElement.tagName;
    const navContact = event.target.textContent;
    if (nav === "LI" && navContact === "Contact") {
        contact.style.display = "flex"
    } else {
        return contact.style.display = "none";
    }
}
navList.addEventListener("click", contactForm);

