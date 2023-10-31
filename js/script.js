"use strict";

const getDatabase = new Request("\db/database.json", {
    method: "GET",
    header: {"Content-Type": "application/json"}
})
console.log(getDatabase)
fetch(getDatabase)
    .then(res => {
        if (!res.ok) {
            console.info(res)
        }
        return res.json();
    })
    .then(data => console.info(data))
    .catch(error => {
        console.error('Fetch error:', error);
    });