"use strict";
import { getContent } from "./utils/contentFetcher.js";
//localStorage.clear();

// Get page data for index.html, either from localstorage or from database.
let pageData = await getContent("index");

// Once page data is obtained, fill html page with content.
createArtElements(pageData);

/**
 * Function to create html elements of each item in art array
 * @param {Array} art - array of art info
 */
function createArtElements(art) {
    art.forEach((element, i) => {
        let div = document.createElement('div');
        div.classList.add('clickImg');
        // div.setAttribute('id', `${element.id}`);

        // Create the pop up div and the div with the cross and title
        let divPop = document.createElement('div');
        divPop.classList.add('art-popup');
        let divWrap = document.createElement('div');
        divWrap.classList.add('art-popup-wrap-title-cross');
        let titlePop =  document.createElement('p');
        titlePop.innerHTML = element.title;
        let cross = document.createElement('i');
        cross.classList.add('fa-solid');
        cross.classList.add('fa-circle-xmark');

        let pictureWrap = createPictureHtmlElement(element);
        let pictureWrapPop = createPictureHtmlElement(element);

        let title = document.createElement('p');
        title.innerHTML = element.title;

        // Add a special class to the pictures which are vertical.
        if (i == 2 || i == 3 || i == 11 || i == 12) {
            div.classList.add("vertical");
            divPop.classList.add('vertical');
        }

        div.append(pictureWrap, title);
        divWrap.append(titlePop, cross);
        divPop.append(divWrap, pictureWrapPop);

        // Add a click event listener to the created art-div, to show
        div.addEventListener('click', function(event) {
            divPop.classList.add('show');
            divPop.classList.remove('hide');
            document.body.style.overflow = "hidden";
        });

        // Add a click event to the created cross icon, to hide
        cross.addEventListener('click', function(event) {
            divPop.classList.add('hide');
            divPop.classList.remove('show');
            document.body.style.overflow = "auto";
        })

        document.getElementById('gallery').append(div, divPop);
    });
}

/**
 * Function to create html element picture that wrap all the media which will change depending on screen width.
 * @param {object} imgElement - info about each element in art array
 * @returns pictureWrap - html picture element
 */
function createPictureHtmlElement(imgElement) {
    let pictureWrap = document.createElement('picture');
    // Create source element for midscreen, mobile and small devices.
    let sourceElementMidscreen = document.createElement('source');
    sourceElementMidscreen.setAttribute('media', '(min-width: 768px) and (max-width: 1000px)');
    sourceElementMidscreen.setAttribute('srcset', `./images/${imgElement.img_1}`);

    let sourceElementMobile = document.createElement('source');
    sourceElementMobile.setAttribute('media', '(min-width: 499px) and (max-width: 767px)');
    sourceElementMobile.setAttribute('srcset', `./images/${imgElement.img_2}`);

    let sourceElementSmall = document.createElement('source');
    sourceElementSmall.setAttribute('media', '(min-width: 0px) and (max-width: 500px)');
    sourceElementSmall.setAttribute('srcset', `./images/${imgElement.img_3}`);

    let sourceElementDefault = document.createElement('img');
    sourceElementDefault.setAttribute('src', `./images/${imgElement.img}`);
    sourceElementDefault.setAttribute('alt', imgElement.title + " - " + imgElement.collection);
    sourceElementDefault.classList.add('art');

    // Append the source and img elements to the picture element
    pictureWrap.append(sourceElementMidscreen, sourceElementMobile, sourceElementSmall, sourceElementDefault);

    return pictureWrap;
}
