"use strict";

function StatsButtonContainer()
{
  const logTimeTitle = userLocations.parentElement.parentElement.firstElementChild;

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

function StatsButton()
{
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

function StatsPopup()
{
  const dropDown = document.createElement("div");
  dropDown.id = "logtimeDropdownMenu";
  dropDown.classList.add("dropdown-menu", "pull-right");
  dropDown.setAttribute("aria-labelledby", "logtimeDropdownMenuLink");

  return (dropDown);
};

function DateRange()
{
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
  dateRangeStart.value = times.startDate;
  dateRangeStart.min = times.firstDay;
  dateRangeStart.max = times.lastDay;
  dateRangeStart.onchange = () => {
    times.startDate = dateRangeStart.value;
    if (new Date(times.startDate + "T00:00:00.0000") > new Date(times.endDate + "T00:00:00.0000"))
    {
      dateRangeEnd.value = times.startDate;
    }
    times.update(data);
    updateRows(rows);
  };
  const dateRangeStartLabel = document.createElement("label");
  dateRangeStartLabel.for = "logtimeDateRangeStart";
  dateRangeStartLabel.innerHTML = "Start:";
  dateRangeStartDiv.appendChild(dateRangeStartLabel);
  dateRangeStartDiv.appendChild(dateRangeStart);

  dateRangeEnd.type = "date";
  dateRangeEnd.id = "logtimeDateRangeEnd";
  dateRangeEnd.value = times.endDate;
  dateRangeEnd.min = times.firstDay;
  dateRangeEnd.onchange = () => {
    times.endDate = dateRangeEnd.value;
    if (new Date(times.startDate + "T00:00:00.0000") > new Date(times.endDate + "T00:00:00.0000"))
    {
      dateRangeStart.value = times.endDate;
    }
    times.update(data);
    updateRows(rows);
  };
  const dateRangeEndLabel = document.createElement("label");
  dateRangeEndLabel.for = "logtimeDateRangeEnd";
  dateRangeEndLabel.innerHTML = "End:";

  dateRangeEndDiv.appendChild(dateRangeEndLabel);
  dateRangeEndDiv.appendChild(dateRangeEnd);

  return (dateRangeDiv);
};

function createMenu()
{
  const container = StatsButtonContainer();
  const popup = StatsPopup();

  container.appendChild(StatsButton());
  container.appendChild(popup);
  popup.appendChild(DateRange());

  createRows().forEach(
    (row) => {
      popup.appendChild(row.createNode());
    }
  );
};
