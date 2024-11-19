"use strict";

function TimeRow(label)
{
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
    console.log("updatevalue " + this.value);
    this.valueDiv.innerHTML = this.formatTime();
  };

  this.formatTime = () => {
   if (!this.value || !Number.isFinite(this.value))
      return "-";

    const timeArray = msToTime(this.value);
    return timeArray[0] + 'h ' + String(timeArray[1]).padStart(2, '0') + 'min';
  };
};

function createRows()
{
  rows[0] = new TimeRow("Total");
  rows[0].updateValue = () => {return (times.timeTotalMs)};
  rows[1] = new TimeRow("Avg/day");
  rows[1].updateValue = () => {return (times.timeTotalMs / times.totalDays)};
  rows[2] = new TimeRow("Avg/active day");
  rows[2].updateValue = () => {return (times.timeTotalMs / times.actDays)};
  rows[3] = new TimeRow("Avg/week");
  rows[3].updateValue = () => {return ((times.timeTotalMs / times.totalDays) * 7)};

  updateRows(rows);

  return (rows);
};

function updateRows(rows)
{
  rows.forEach(
    (row) => {
      row.value = row.updateValue();
      row.update();
    }
  );
};
