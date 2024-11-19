"use strict";

if(logTimeStats === undefined)
  var logTimeStats = {};

logTimeStats.userLocations = document.getElementById("user-locations");
logTimeStats.times = new logTimeStats.Times(null);
logTimeStats.rows = [];
logTimeStats.data = null;

logTimeStats.main = function() {
  const dataUrl = logTimeStats.userLocations.getAttribute('data-url');

  const xhr = new XMLHttpRequest();
  xhr.open('GET', dataUrl, true);
  xhr.withCredentials = true;
  xhr.responseType = "json";
  xhr.send();

  xhr.onload = () => {
    logTimeStats.data = xhr.response;
    console.log(logTimeStats.data);
    logTimeStats.times.update(logTimeStats.data);
    logTimeStats.createMenu();
  };
};

logTimeStats.main();
