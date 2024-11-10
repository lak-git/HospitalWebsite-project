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
const currentLogin = JSON.parse(localStorage.getItem("CurrentLogin"));
const currentTime = new Date().getTime();

if ( !(currentLogin === null) ) 
{
    if (currentTime > currentLogin.expirationDate) {
        localStorage.removeItem("CurrentLogin");
        alert("Session Expired. Please re-log in.")
    } else {
        applyAccountPreferences(currentLogin);
    }

    function applyAccountPreferences(account) {
        let accountBtn = document.getElementById("account");
        accountBtn.innerText = account.accountInfo.username;
    }
}

