"use strict";

const userLocations = document.getElementById("user-locations");
const times = new Times(null);

const rows = [];
let data = null;

function main()
{
  const dataUrl = userLocations.getAttribute('data-url');

  const xhr = new XMLHttpRequest();
  xhr.open('GET', dataUrl, true);
  xhr.withCredentials = true;
  xhr.responseType = "json";
  xhr.send();

  xhr.onload = () => {
    data = xhr.response;
    console.log(data);
    times.update(data);
    createMenu();
  };
};

main();
