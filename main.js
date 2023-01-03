//
// Extension to display login time statistics in intra.42.fr
//
// TODO
// - Add UI for options below
// - Imprve time target functionality
// - Add some checks to json parsiong
// - Add extension icon
//

// Here you can configure few extra things
// change "false" to "true" to enable things
// change numeric values to your preference

// show seconds in times, duh
const SHOW_SECONDS = false;

// display hours per days target time
const SHOW_TARGET = true;
const TARGET_HOURS = 25;
const TARGET_DAYS = 7;


console.log('42 intra logtime stats extension active');

function msToTime(ms) {
	var seconds = Math.floor(ms / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);

	seconds = seconds % 60;
	minutes = minutes % 60;

	return [hours, minutes, seconds];
}

function dateString(d) {
	// Date.prototype.toISOString() uses UTC timezone
	// which can get messy, so let's do this manually
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();

	if (month < 10)
		month = '0' + month;
	if (day < 10)
		day = '0' + day;

	return (year + '-' + month + '-' + day);
}

function updateTimes()
{
	var timeMs = 0;
	var actDays = 0;
	totalDays = 0;

	var end = new Date(endDate + "T00:00:00.0000");
	var d = new Date(startDate + "T00:00:00.0000");
	while(d.getTime() <= end.getTime()) {
		let dstring = dateString(d);
		if (data[dstring]) {
			actDays++;
			timeMs += (data[dstring].split(':')[0] * 60 * 60 * 1000);
			timeMs += (data[dstring].split(':')[1] * 60 * 1000);
			timeMs += (data[dstring].split(':')[2] * 1000);
		}
		totalDays++;
		d.setDate(d.getDate() + 1);
	}

	timeTotal = msToTime(timeMs);
	timeAvgDay = msToTime(timeMs / totalDays);
	timeAvgActDay = msToTime(timeMs / actDays);
	timeAvgWeek = msToTime((timeMs / totalDays) * 7);

	if (SHOW_TARGET)
	{
		var targetHours = TARGET_HOURS;
		targetDays = TARGET_DAYS;
		timeTarget = msToTime(totalDays / targetDays * targetHours * 60 * 60 * 1000);
	}
}

function createStats()
{
	var logTimeTitle = userLocations.parentElement.firstElementChild;

	var pullRightSpan = document.createElement("span");
	pullRightSpan.className = "pull-right";
	logTimeTitle.insertAdjacentElement('beforeend', pullRightSpan);

	var dropDownSpan = document.createElement("span");
	dropDownSpan.className = "dropdown";
	pullRightSpan.appendChild(dropDownSpan);

	var dropDownLink = document.createElement("a");
	dropDownLink.id = "logtimeDropdownMenuLink";
	dropDownLink.classList.add("dropdown-toggle", "btn", "simple-link");
	dropDownLink.ariaExpanded = "false";
	dropDownLink.setAttribute("href", "#");
	dropDownLink.setAttribute("role", "button");
	dropDownLink.setAttribute("data-toggle", "dropdown");
	dropDownLink.innerHTML = ' Statistics ▾ ';

	var dropDown = document.createElement("div");
	dropDown.id = "logtimeDropdownMenu";
	dropDown.classList.add("dropdown-menu", "pull-right");
	dropDown.setAttribute("aria-labelledby", "logtimeDropdownMenuLink");

	dropDownSpan.appendChild(dropDownLink);
	dropDownSpan.appendChild(dropDown);

	var dateRangeDiv = document.createElement("div");
	dateRangeDiv.className = "logtime-date-form";

	var dateRangeForm = document.createElement("form");
	dateRangeDiv.appendChild(dateRangeForm);

	var dateRangeStartDiv = document.createElement("div");
	dateRangeStartDiv.className = "logtime-item";
	var dateRangeStart = document.createElement("input");
	dateRangeForm.appendChild(dateRangeStartDiv);

	var dateRangeEndDiv = document.createElement("div");
	dateRangeEndDiv.className = "logtime-item";
	var dateRangeEnd = document.createElement("input");
	dateRangeForm.appendChild(dateRangeEndDiv);
	
	dateRangeStart.type = "date";
	dateRangeStart.id = "logtimeDateRangeStart";
	dateRangeStart.value = startDate;
	dateRangeStart.min = firstDay;
	dateRangeStart.onchange = () => {
		startDate = dateRangeStart.value;
		if (new Date(startDate + "T00:00:00.0000") > new Date(endDate + "T00:00:00.0000"))
		{
			dateRangeEnd.value = startDate;
		}
		updateStats();
	}
	var dateRangeStartLabel = document.createElement("label");
	dateRangeStartLabel.for = "logtimeDateRangeStart";
	dateRangeStartLabel.innerHTML = "Start:";
	dateRangeStartDiv.appendChild(dateRangeStartLabel);
	dateRangeStartDiv.appendChild(dateRangeStart);

	dateRangeEnd.type = "date";
	dateRangeEnd.id = "logtimeDateRangeEnd";
	dateRangeEnd.value = endDate;
	dateRangeEnd.min = firstDay;
	dateRangeEnd.onchange = () => {
		endDate = dateRangeEnd.value;
		if (new Date(startDate + "T00:00:00.0000") > new Date(endDate + "T00:00:00.0000"))
		{
			dateRangeStart.value = endDate;
		}
		updateStats();
	}
	var dateRangeEndLabel = document.createElement("label");
	dateRangeEndLabel.for = "logtimeDateRangeEnd";
	dateRangeEndLabel.innerHTML = "End:";
	dateRangeEndDiv.appendChild(dateRangeEndLabel);
	dateRangeEndDiv.appendChild(dateRangeEnd);

	var totalDiv = document.createElement("div");
	totalDiv.className = "logtime-item";
	var totalLabel = document.createElement("div");
	totalLabel.className = "logtime-text";
	totalLabel.innerHTML = "Total:";
	totalTime = document.createElement("div");
	totalTime.className = "logtime-time";
	totalDiv.appendChild(totalLabel);
	totalDiv.appendChild(totalTime);

	if (SHOW_TARGET)
	{
		var targetDiv = document.createElement("div");
		targetDiv.className = "logtime-item";
		var targetLabel = document.createElement("div");
		targetLabel.className = "logtime-text";
		targetLabel.innerHTML = "Target:";
		targetTime = document.createElement("div");
		targetTime.className = "logtime-time";
		targetDiv.appendChild(targetLabel);
		targetDiv.appendChild(targetTime);
	}

	var avgDayDiv = document.createElement("div");
	avgDayDiv.className = "logtime-item";
	var avgDayLabel = document.createElement("div");
	avgDayLabel.className = "logtime-text";
	avgDayLabel.innerHTML = "Avg/day:";
	avgDayTime = document.createElement("div");
	avgDayTime.className = "logtime-time";
	avgDayDiv.appendChild(avgDayLabel);
	avgDayDiv.appendChild(avgDayTime);

	var avgActDayDiv = document.createElement("div");
	avgActDayDiv.className = "logtime-item";
	var avgActDayLabel = document.createElement("div");
	avgActDayLabel.className = "logtime-text";
	avgActDayLabel.innerHTML = "Avg/active day:";
	avgActDayTime = document.createElement("div");
	avgActDayTime.className = "logtime-time";
	avgActDayDiv.appendChild(avgActDayLabel);
	avgActDayDiv.appendChild(avgActDayTime);

	var avgWeekDiv = document.createElement("div");
	avgWeekDiv.className = "logtime-item";
	var avgWeekLabel = document.createElement("div");
	avgWeekLabel.className = "logtime-text";
	avgWeekLabel.innerHTML = "Avg/week:";
	avgWeekTime = document.createElement("div");
	avgWeekTime.className = "logtime-time";
	avgWeekDiv.appendChild(avgWeekLabel);
	avgWeekDiv.appendChild(avgWeekTime);

	dropDown.appendChild(dateRangeDiv);
	dropDown.appendChild(totalDiv);
	if (SHOW_TARGET) { dropDown.appendChild(targetDiv); }
	dropDown.appendChild(avgDayDiv);
	dropDown.appendChild(avgActDayDiv);
	dropDown.appendChild(avgWeekDiv);
}

function updateStats()
{
	updateTimes();

	totalTime.innerHTML = timeTotal[0] + 'h ' + String(timeTotal[1]).padStart(2, '0') + 'min';
	if (SHOW_SECONDS) { totalTime.innerHTML += ' ' + String(timeTotal[2]).padStart(2, '0') + 's'; }

	if (SHOW_TARGET)
	{
		if (totalDays >= targetDays)
		{
			if (SHOW_SECONDS) {
				targetTime.innerHTML = timeTarget[0] + 'h ' + String(timeTarget[1]).padStart(2, '0') + 'min';
				targetTime.innerHTML += ' ' + String(timeTarget[2]).padStart(2, '0') + 's';
			} else if (timeTarget[2] > 0) {
				// round up minutes
				targetTime.innerHTML = timeTarget[0] + 'h ' + String(timeTarget[1] + 1).padStart(2, '0') + 'min';
			} else {
				targetTime.innerHTML = timeTarget[0] + 'h ' + String(timeTarget[1]).padStart(2, '0') + 'min';
			}
		} else {
			targetTime.innerHTML = '-';
		}
	}

	avgDayTime.innerHTML = timeAvgDay[0] + 'h ' + String(timeAvgDay[1]).padStart(2, '0') + 'min';
	if (SHOW_SECONDS) { avgDayTime.innerHTML += ' ' + String(timeAvgDay[2]).padStart(2, '0') + 's'; }

	avgActDayTime.innerHTML = timeAvgActDay[0] + 'h ' + String(timeAvgActDay[1]).padStart(2, '0') + 'min';
	if (SHOW_SECONDS) { avgActDayTime.innerHTML += ' ' + String(timeAvgActDay[2]).padStart(2, '0') + 's'; }

	if (totalDays >= 7)
	{
		avgWeekTime.innerHTML = timeAvgWeek[0] + 'h ' + String(timeAvgWeek[1]).padStart(2, '0') + 'min';
		if (SHOW_SECONDS) { avgWeekTime.innerHTML += ' ' + String(timeAvgWeek[2]).padStart(2, '0') + 's'; }
	} else {
		avgWeekTime.innerHTML = '-';
	}
}

async function getData(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function main() {
	startDate = 0;
	endDate = 0;
	timeTotal = 0;
	timeAvgDay = 0;
	timeAvgActDay = 0;
	timeAvgWeek = 0;
	timeTarget = 0;

	userLocations = document.getElementById("user-locations");
	data = await getData(userLocations.getAttribute('data-url'));

	var dataLen = Object.keys(data).length;
	firstDay = Object.keys(data)[dataLen - 1];
	//lastDay = Object.keys(data)[0];
	startDate = firstDay;
	endDate = dateString(new Date());

	createStats();
	updateStats();
}

main();
