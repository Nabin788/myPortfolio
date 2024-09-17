const loadingPahe = document.querySelector(".welcome-page");

const welcomeUser = () => {
    setTimeout(() => {
        loadingPahe.style.display = "none"
        sessionStorage.setItem("visited", "true");
    }, 5000);
}
const hideVisitedPage = () => {
    loadingPahe.style.display = "none";
}
const userVisit = sessionStorage.getItem("visited");

if (!userVisit) {
    welcomeUser()
} else {
    hideVisitedPage();
}