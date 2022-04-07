
setInterval(function() {
    var date = moment().format("dddd, MMMM Do YYYY");
    $("#currentDay").text(date);
}, 1000);

var timeBlockCount = 9;
var timeBlocks = Array(timeBlockCount).fill("");

var userEntry = $(".form-control")

function loadTimeBlocks() {
    var timeBlocksString = localStorage.getItem("timeBlocks"); 
    if (timeBlocksString == null)
        return;
    timeBlocks = JSON.parse(timeBlocksString);

    for (var i = 0; i < timeBlockCount; i++){
        var textAreaEl = document.getElementById("text_" + i);
        textAreaEl.textContent = timeBlocks[i];
    }
};

