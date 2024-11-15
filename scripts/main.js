// Sticky navigation bar only for desktop view
if (screen.width > 880 && window.innerWidth > 880)
{
    const navbar = document.querySelector("nav");
    let navbarHeight = navbar.getBoundingClientRect()["height"];
    const logo = document.getElementById("logo");

    logo.style.paddingBottom = `${navbarHeight}px`;
    let navbarInitialPosition = navbar.offsetTop - navbarHeight;
    navbar.style.top = `${navbarInitialPosition}px`;

    window.addEventListener("scroll", stickyScroll);

    function stickyScroll() {
        if (scrollY < navbarInitialPosition) {
            navbar.style.top = `${navbarInitialPosition - scrollY}px`;
        }
        else if (scrollY > navbarInitialPosition) {
            navbar.style.top = 0;
        }
    }
}

// Automatically login user
const CURRENT_LOGIN = JSON.parse(localStorage.getItem("CurrentLogin"));
const TIME_NOW = new Date().getTime();
const USER_HAS_LOGGED_IN = !(CURRENT_LOGIN === null); 

if ( USER_HAS_LOGGED_IN ) 
{
    if (TIME_NOW > CURRENT_LOGIN.expirationDate) {
        localStorage.removeItem("CurrentLogin");
        alert("Session Expired. Please refresh page or re-log in.");
        location.href(".");
    } else {
        displayLoginStatus(CURRENT_LOGIN);
    }

    function displayLoginStatus(account) {
        let accountBtn = document.getElementById("account");
        accountBtn.innerText = account.accountInfo.username;
    }
}

