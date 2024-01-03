"use strict";

let path = window.location.pathname;
nav(path);

function nav(path) {
    let ul = document.createElement('ul');

    let li1 = document.createElement('li');
    let logo = document.createElement('a');
    let logoText = document.createTextNode('Logo');
    logo.setAttribute('href', './');

    let li2 = document.createElement('li');
    let home = document.createElement('a');
    let homeText = document.createTextNode('Galleri');
    home.setAttribute('href', './');

    let li3 = document.createElement('li');
    let about = document.createElement('a');
    let aboutText = document.createTextNode('Om');
    about.setAttribute('href', '/about');

    let li4 = document.createElement('li');
    let press = document.createElement('a');
    let pressText = document.createTextNode('Press');
    press.setAttribute('href', '/press');

    let hamburger = document.createElement('i');
    hamburger.classList.add('fa-solid');
    hamburger.classList.add('fa-bars');
    hamburger.setAttribute('id', "fa-bars");

    let li5 = document.createElement('li');
    let instagram = document.createElement('i');
    let instaLink = document.createElement('a');
    instaLink.classList.add('nav-instagram');
    instaLink.setAttribute('href', 'https://www.instagram.com/jeanettemarieadolfsson/');
    instagram.classList.add('fa-brands');
    instagram.classList.add('fa-instagram');
    li5.setAttribute('id', 'nav-instagram');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('fa-bars');
        hamburger.classList.toggle('fa-xmark');
    })

    logo.appendChild(logoText);
    home.appendChild(homeText);
    about.appendChild(aboutText);
    press.appendChild(pressText);
    instaLink.append(instagram);

    li1.appendChild(logo);
    li2.appendChild(home);
    li3.appendChild(about);
    li4.appendChild(press);
    li5.appendChild(instaLink);

    ul.append(li1, li2, li3, li4, li5);
    document.getElementById('nav').append(hamburger, ul);

    // Change classname depending on path
    if (path == "/") {
        home.classList.add("active");
    } else if (path == "/about") {
        about.classList.add("active");

        let main = document.getElementsByClassName('main');
        main[0].style.backgroundColor = "white";

        let arrow = document.getElementById('fa-arrow-down');
        arrow.style.color = "black";

        let hamburger = document.getElementById('fa-bars');
        hamburger.style.color = "black";

    } else if (path == "/press") {
        press.classList.add("active");

        let main = document.getElementsByClassName('main');
        main[0].style.backgroundColor = "white";

        let arrow = document.getElementById('fa-arrow-down');
        arrow.style.color = "black";

        let hamburger = document.getElementById('fa-bars');
        hamburger.style.color = "black";
    }
}

// function removeAddClass(element, action) {
//     if (action == "add") {
//         element.classList.add("active");
//     } else if (action == "remove") {
//         element.classList.remove("active");
//     }
// }

function topFunc() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function downFunc() {
    document.body.scrollTop = 50;
    document.documentElement.scrollTop = 50;
}

// On scroll, hide arrow down, show arrow up
window.onscroll = (function() {
    if (document.documentElement.scrollTop > 40) {
        if (path == "/") {
            document.getElementById('fa-arrow-down').classList.add('hide');
            document.getElementById('fa-arrow-down').classList.remove('show');

            document.getElementById('fa-arrow-up').classList.add('show');
            document.getElementById('fa-arrow-up').classList.remove('hide');
        } else {
            document.getElementById('fa-arrow-down').classList.add('hide');
            document.getElementById('fa-arrow-down').classList.remove('show');
        }
    } else {
        if (path == "/") {
            document.getElementById('fa-arrow-down').classList.add('show');
            document.getElementById('fa-arrow-down').classList.remove('hide');

            document.getElementById('fa-arrow-up').classList.add('hide');
            document.getElementById('fa-arrow-up').classList.remove('show');
        } else {
            document.getElementById('fa-arrow-down').classList.add('show');
            document.getElementById('fa-arrow-down').classList.remove('hide');
        }
    }
})

// Settings on window resize
window.addEventListener('resize', function() {
    let mobileWidthPixels = 767;
    let hamburgerClassList = document.getElementById('fa-bars').classList;
    if (window.innerWidth <= mobileWidthPixels) {
        document.getElementById('fa-bars').style.display = 'block';
        if (hamburgerClassList.contains('fa-bars')) {
            document.getElementById('nav').style.width = '0%';
        } else if (hamburgerClassList.contains('fa-xmark')) {
            document.getElementById('nav').style.width = '95%';
        }
    } else {
        document.getElementById('fa-bars').style.display = 'none';
        document.getElementById('nav').style.width = 'var(--nav-footer-width)';
        // Enable scroll and clicking elements again in body when hambergermenu is closed
        document.body.style.overflow = "auto";
        let clickImg = document.getElementsByClassName('clickImg');
        // Loop through each element in the collection
        for (let i = 0; i < clickImg.length; i++) {
            clickImg[i].style.pointerEvents = 'auto';
        }
    }
});

window.addEventListener('load', function() {
    let mobileWidthPixels = 767;
    if (window.innerWidth <= mobileWidthPixels) {
        document.getElementById('fa-bars').style.display = 'block';
    }
});

// When hambuergermenu is clicked, show menu.
document.getElementById('fa-bars').addEventListener('click', function() {
    let hamburgerClassList = document.getElementById('fa-bars').classList;
    if (hamburgerClassList.contains('fa-xmark')) {
        document.getElementById('nav').style.width = '95%';
        // Disable scroll and clicking elements in body when hambergermenu is open
        document.body.style.overflow = "hidden";
        let clickImg = document.getElementsByClassName('clickImg');
        // Loop through each element in the collection
        for (let i = 0; i < clickImg.length; i++) {
            clickImg[i].style.pointerEvents = 'none';
        }
    } else if (hamburgerClassList.contains('fa-bars')) {
        document.getElementById('nav').style.width = '0%';
        // Enable scroll and clicking elements again in body when hambergermenu is closed
        document.body.style.overflow = "auto";
        let clickImg = document.getElementsByClassName('clickImg');
        // Loop through each element in the collection
        for (let i = 0; i < clickImg.length; i++) {
            clickImg[i].style.pointerEvents = 'auto';
        }
    }
});