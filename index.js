const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger-list");
const navList = {
    home: document.querySelector(".home"),
    project: document.querySelector(".project"),
    about: document.querySelector(".about"),
    contact: document.querySelector(".contact"),
    login: document.querySelector(".login")
}

function toggleMenu() {
    navbar.classList.toggle('active');
}

  

const handleMouseOver = (event) => {
    const getElement = event.target.closest('a');
    if (!getElement) {
        return;
    }
    const getClassofElement = getElement.querySelector('p');
    const getNavName = getClassofElement.className;

    if (!navList[getNavName]) {
        return;
    } else {
        navList[getNavName].style.display = "block";
    }

};

// Attach event listener to the parent element
navbar.addEventListener("mouseover", handleMouseOver);

navbar.addEventListener("mouseout", (event) => {
    const getElement = event.target.closest('a');
    if (!getElement) {
        return;
    }
    const getClassofElement = getElement.querySelector('p');
    const getNavName = getClassofElement.className;

    if (navList[getNavName]) {
        navList[getNavName].style.display = "none";
    }
})
