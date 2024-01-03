"use strict";
import { getContent } from "./utils/contentFetcher.js";
// localStorage.clear();

// Get page data for index.html, either from localstorage or from database.
let pageData = await getContent("press");

// Once page data is obtained, fill html page with content.
createPressElements(pageData);

/**
 * Function to create html elements of press info
 * @param {object} press - object of press info
 */
function createPressElements(press) {
    let divImg = document.createElement('div');
    divImg.classList.add('wrapImg');
    let img = document.createElement('img');
    img.setAttribute('src', `./images/${press[1].img}`);
    img.setAttribute('alt', press[1].title);
    divImg.append(img);

    let linkPiku = document.createElement('a');
    let pikuText = document.createTextNode('Piku utbildningar');
    linkPiku.setAttribute('href', `${press[0].link}`);
    linkPiku.setAttribute('target', '_blank');
    linkPiku.appendChild(pikuText);

    let divAbout = document.createElement('div');
    divAbout.classList.add('wrapInfo');
    let abouth1 = document.createElement('h1');
    abouth1.innerHTML = press[0].title;
    let aboutInfo = document.createElement('p');
    aboutInfo.innerHTML = press[0].description;
    divAbout.append(abouth1, aboutInfo, linkPiku);


    let imgPiku = document.createElement('img');
    imgPiku.setAttribute('src', `./images/${press[0].img}`);
    imgPiku.setAttribute('alt', press[0].title);

    document.getElementById('about').append(divAbout, divImg);
    document.getElementById('wrap-press-img').append(imgPiku);
}