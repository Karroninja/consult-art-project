"use strict";
import { getContent } from "./utils/contentFetcher.js";

// Get page data for index.html, either from localstorage or from database.
let pageData = await getContent("about");

// Once page data is obtained, fill html page with content.
createAboutElements(pageData);

/**
 * Function to create html elements of about info
 * @param {object} about - object of about info
 */
function createAboutElements(about) {
    let divImg = document.createElement('div');
    divImg.classList.add('wrapImg');
    let img = document.createElement('img');
    img.setAttribute('src', `./images/${about[0].img}`);
    img.setAttribute('alt', about[0].title);
    divImg.append(img);

    let divAbout = document.createElement('div');
    divAbout.classList.add('wrapInfo');
    let abouth1 = document.createElement('h1');
    abouth1.innerHTML = about[0].title;
    let aboutInfo = document.createElement('p');
    aboutInfo.innerHTML = about[0].description;
    divAbout.append(abouth1, aboutInfo);

    document.getElementById('about').append(divImg, divAbout);

    let reversed = about[1].utbildningar.reverse();
    reversed.forEach((element, i) => {
        let div = document.createElement('div');

        let year = document.createElement('p');
        year.innerHTML = element.year;
        let course = document.createElement('p');
        course.innerHTML = element.name;
        let school = document.createElement('p');
        school.innerHTML = element.school;

        div.append(year, course, school);
        document.getElementById('courses').append(div);
    });
}

window.addEventListener('scroll', scrollFunc);

function scrollFunc() {
    let courseWrapDiv = document.querySelectorAll('.courses');
    // Get the value of grid-template-columns and rows of the wrapping div of courses.
    let gridColCount = window.getComputedStyle(courseWrapDiv[0]).gridTemplateColumns.split(' ').length;
    let gridRowCount = window.getComputedStyle(courseWrapDiv[0]).gridTemplateRows.split(' ').length;

    let coursesDiv = document.querySelectorAll('.courses div:not(:first-child)');

    let nCols = gridColCount;
    let nRows = gridRowCount;
    for (let row = 0; row < nRows; row++) {
        // Ändra denna till en passande scroll när mobilskärm triggas, eftersom texten i "Om" tar
        // mycket mer plats än på desktop.
        let scrollTrigVal = 100 * ( row + 1 );
        if (document.documentElement.scrollTop <= scrollTrigVal) {
            continue;
        }

        for (let col = 0; col < nCols; col++) {
            // Create a 1D linear index from 2D row/col indices.
            // If its not the first row, subtract 1 since the first row only has 3 columns.
            let i = ( row > 0 ) ? col + nCols * row - 1 : col;
            // The first row has one box fewer than the rest. Skip the last column.
            if ( row == 0 && col == ( nCols - 1 ) ) {
                continue;
            }
            // The length of the array is nCols * nRows - 1. Break when last i occurs.
            if ( i > nCols * nRows - 2 ) {
                break;
            }
            // Prevent the setTimeout function to run on an element that has already transitioned.
            if ( coursesDiv[i].style.opacity == 1 ) {
                continue;
            }

            // Make sure each box in the grid transision one at a time.
            setTimeout(function() {
                coursesDiv[i].style.transform = "translateY(0)";
                coursesDiv[i].style.opacity = 1;
            }, 500 * col);

            // Remove the scroll event listener once the last box in the grid has transitioned.
            if (i == (coursesDiv.length - 1)) {
                window.removeEventListener('scroll', scrollFunc);
            }

        }
    }
}