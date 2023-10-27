"use strict";

const getDatabase = new Request("\db/database.json");
console.log(getDatabase)
fetch(getDatabase)
    .then(res => res.json)
    .then(data => console.info(data))