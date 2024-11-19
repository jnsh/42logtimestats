"use strict";

if(logTimeStats === undefined)
  var logTimeStats = {};

logTimeStats.TimeRow = function(label) {
  this.label = label;
  this.value = null;
  this.valueDiv = document.createElement("div");

  this.createNode = () => {
    const container = document.createElement("div");
    container.className = "logtime-item";

    const labelDiv = document.createElement("div");
    labelDiv.className = "logtime-text";
    labelDiv.innerHTML = this.label + ":";
    container.appendChild(labelDiv);

    this.valueDiv.className = "logtime-time";
    this.valueDiv.innerHTML = this.formatTime();
    container.appendChild(this.valueDiv);
  
    return container;
  };

  this.update = () => {
    this.valueDiv.innerHTML = this.formatTime();
  };

  this.formatTime = () => {
   if (!this.value || !Number.isFinite(this.value))
      return "-";

    const timeArray = logTimeStats.msToTime(this.value);
    return timeArray[0] + 'h ' + String(timeArray[1]).padStart(2, '0') + 'min';
  };
};

logTimeStats.createRows = function() {
  logTimeStats.rows[0] = new logTimeStats.TimeRow("Total");
  logTimeStats.rows[0].updateValue = () => {return (logTimeStats.times.timeTotalMs)};
  logTimeStats.rows[1] = new logTimeStats.TimeRow("Avg/day");
  logTimeStats.rows[1].updateValue = () => {return (logTimeStats.times.timeTotalMs / logTimeStats.times.totalDays)};
  logTimeStats.rows[2] = new logTimeStats.TimeRow("Avg/active day");
  logTimeStats.rows[2].updateValue = () => {return (logTimeStats.times.timeTotalMs / logTimeStats.times.actDays)};
  logTimeStats.rows[3] = new logTimeStats.TimeRow("Avg/week");
  logTimeStats.rows[3].updateValue = () => {return ((logTimeStats.times.timeTotalMs / logTimeStats.times.totalDays) * 7)};

  logTimeStats.updateRows(logTimeStats.rows);

  return (logTimeStats.rows);
};

logTimeStats.updateRows = function(rows) {
  rows.forEach(
    (row) => {
      row.value = row.updateValue();
      row.update();
    }
  );
};
