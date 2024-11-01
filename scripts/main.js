const navbar = document.querySelector("nav");
const logo = document.getElementById("logo");

window.addEventListener("scroll", stickyScroll);

function stickyScroll() {
    let sticky = navbar.offsetTop;

    if (scrollY == sticky && scrollY == 0) {
        navbar.classList.remove("sticky")
        logo.style.paddingBottom = "0";
        logo.style.opacity = "100";
    } 
    else if (scrollY >= sticky) {
        navbar.classList.add("sticky");
        logo.style.paddingBottom = "40px";
        logo.style.opacity = "0";
      }
}