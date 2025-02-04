// document.getElementById('hamburger').addEventListener('click', () => {
//   const navLinks = document.getElementById('nav-links');
//   navLinks.classList.toggle('active');
// });

let menuList = document.getElementById("menuList");
menuList.style.maxHeight = "0px";

function toggleMenu() {
    if (menuList.style.maxHeight == "0px") {
        menuList.style.maxHeight = "350px";
    } else {
        menuList.style.maxHeight = "0px";
    }
}
