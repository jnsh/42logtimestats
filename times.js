"use strict";

if(logTimeStats === undefined)
  var logTimeStats = {};

/* Parse login time data from the JSON into more useful variables */
logTimeStats.Times = function() {
  this.clear = () => {
    this.firstDay = "";
    this.lastDay = "";
    this.startDate = "";
    this.endDate = "";
    this.actDays = 0;
    this.totalDays = 0;
    this.timeTotalMs = 0;
  };
  this.clear();

  this.update = (data) => {
    if (!data) {
      this.clear();
      return;
    }

    this.actDays = 0;
    this.totalDays = 0;
    this.timeTotalMs = 0;

    const dataArray = Object.keys(data);
    this.lastDay = dataArray[0];
    this.firstDay = dataArray.pop();

    if (!this.startDate)
      this.startDate = this.firstDay;
    if (!this.endDate)
      this.endDate = logTimeStats.dateToString(new Date());

    const end = new Date(this.endDate + "T00:00:00.0000");
    const date = new Date(this.startDate + "T00:00:00.0000");

    while (date.getTime() <= end.getTime()) {
      const dateString = logTimeStats.dateToString(date);
      if (data[dateString]) {
        this.actDays++;
        const dateArray = data[dateString].split(':');
        this.timeTotalMs += dateArray[0] * 60 * 60 * 1000;
        this.timeTotalMs += dateArray[1] * 60 * 1000;
        this.timeTotalMs += dateArray[2] * 1000;
      }
      this.totalDays++;
      date.setDate(date.getDate() + 1);
    }
  };
};

logTimeStats.msToTime = function(ms) {
  if (!ms)
    return null;

	let seconds = Math.floor(ms / 1000);
	let minutes = Math.floor(seconds / 60);
	let hours = Math.floor(minutes / 60);

	seconds = seconds % 60;
	minutes = minutes % 60;

	return [hours, minutes, seconds];
};

// Date.prototype.toISOString() uses UTC timezone
// which can get messy, so let's do this manually
logTimeStats.dateToString = function(date) {
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (month < 10)
		month = '0' + month;
	if (day < 10)
		day = '0' + day;

	return (year + '-' + month + '-' + day);
};
