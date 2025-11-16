let root = document.documentElement;
let rem = window.getComputedStyle(root, null).getPropertyValue("--base-font-size");
console.log(rem);

let body = document.body;
let width = body.clientWidth;
console.log(width);


// Mobile Nav
const openButton = document.getElementById('open-mobile-nav');
const closeButton = document.getElementById('close-mobile-nav');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

// Open menu
openButton.addEventListener('click', function () {
    mobileNav.classList.add('active');
    document.body.classList.add('no-scroll');
});

// Close menu with close button
closeButton.addEventListener('click', function () {
    mobileNav.classList.remove('active');
    document.body.classList.remove('no-scroll');
});

// Close menu when clicking nav links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function () {
        mobileNav.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});
