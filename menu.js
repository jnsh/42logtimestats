"use strict";

if(logTimeStats === undefined)
  var logTimeStats = {};

logTimeStats.StatsButtonContainer = function() {
  const logTimeTitle = logTimeStats.userLocations.parentElement.parentElement.firstElementChild;

  // all buttons container
  const pullRightSpan = document.createElement("span");
  pullRightSpan.className = "pull-right";
  logTimeTitle.insertAdjacentElement('beforeend', pullRightSpan);

  // button and popup container
  const dropDownSpan = document.createElement("span");
  dropDownSpan.className = "dropdown";
  pullRightSpan.appendChild(dropDownSpan);

  return (dropDownSpan);
};

logTimeStats.StatsButton = function() {
  const dropDownLink = document.createElement("a");
  dropDownLink.id = "logtimeDropdownMenuLink";
  dropDownLink.classList.add("dropdown-toggle", "btn", "simple-link");
  dropDownLink.ariaExpanded = "false";
  dropDownLink.setAttribute("href", "#");
  dropDownLink.setAttribute("role", "button");
  dropDownLink.setAttribute("data-toggle", "dropdown");
  dropDownLink.innerHTML = ' Statistics ▾ ';

  return (dropDownLink);
};

logTimeStats.StatsPopup = function() {
  const dropDown = document.createElement("div");
  dropDown.id = "logtimeDropdownMenu";
  dropDown.classList.add("dropdown-menu", "pull-right");
  dropDown.setAttribute("aria-labelledby", "logtimeDropdownMenuLink");

  return (dropDown);
};

logTimeStats.DateRange = function() {
  const dateRangeDiv = document.createElement("div");
  dateRangeDiv.className = "logtime-date-form";

  const dateRangeForm = document.createElement("form");
  dateRangeDiv.appendChild(dateRangeForm);

  const dateRangeStartDiv = document.createElement("div");
  dateRangeStartDiv.className = "logtime-item";
  const dateRangeStart = document.createElement("input"); 
  dateRangeForm.appendChild(dateRangeStartDiv);

  const dateRangeEndDiv = document.createElement("div");
  dateRangeEndDiv.className = "logtime-item";
  const dateRangeEnd = document.createElement("input");
  dateRangeForm.appendChild(dateRangeEndDiv);

  dateRangeStart.type = "date";
  dateRangeStart.id = "logtimeDateRangeStart";
  dateRangeStart.value = logTimeStats.times.startDate;
  dateRangeStart.min = logTimeStats.times.firstDay;
  dateRangeStart.max = logTimeStats.times.lastDay;
  dateRangeStart.onchange = () => {
    logTimeStats.times.startDate = dateRangeStart.value;
    if (new Date(logTimeStats.times.startDate + "T00:00:00.0000") > new Date(logTimeStats.times.endDate + "T00:00:00.0000"))
    {
      dateRangeEnd.value = logTimeStats.times.startDate;
    }
    logTimeStats.times.update(logTimeStats.data);
    logTimeStats.updateRows(logTimeStats.rows);
  };
  const dateRangeStartLabel = document.createElement("label");
  dateRangeStartLabel.for = "logtimeDateRangeStart";
  dateRangeStartLabel.innerHTML = "Start:";
  dateRangeStartDiv.appendChild(dateRangeStartLabel);
  dateRangeStartDiv.appendChild(dateRangeStart);

  dateRangeEnd.type = "date";
  dateRangeEnd.id = "logtimeDateRangeEnd";
  dateRangeEnd.value = logTimeStats.times.endDate;
  dateRangeEnd.min = logTimeStats.times.firstDay;
  dateRangeEnd.onchange = () => {
    logTimeStats.times.endDate = dateRangeEnd.value;
    if (new Date(logTimeStats.times.startDate + "T00:00:00.0000") > new Date(logTimeStats.times.endDate + "T00:00:00.0000"))
    {
      dateRangeStart.value = logTimeStats.times.endDate;
    }
    logTimeStats.times.update(logTimeStats.data);
    logTimeStats.updateRows(logTimeStats.rows);
  };
  const dateRangeEndLabel = document.createElement("label");
  dateRangeEndLabel.for = "logtimeDateRangeEnd";
  dateRangeEndLabel.innerHTML = "End:";

  dateRangeEndDiv.appendChild(dateRangeEndLabel);
  dateRangeEndDiv.appendChild(dateRangeEnd);

  return (dateRangeDiv);
};

logTimeStats.createMenu = function() {
  const container = logTimeStats.StatsButtonContainer();
  const popup = logTimeStats.StatsPopup();

  container.appendChild(logTimeStats.StatsButton());
  container.appendChild(popup);
  popup.appendChild(logTimeStats.DateRange());

  logTimeStats.createRows().forEach(
    (row) => {
      popup.appendChild(row.createNode());
    }
  );
};
