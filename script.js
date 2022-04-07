
//setting date on header 

var date = moment().format("dddd, MMMM Do YYYY");
$("#currentDay").text(date);

//---------------------------------------------
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

//----------------------------------------------------------
function saveTimeBlock(event){
    var buttonEl = event.target;
    if (buttonEl.className == "icon") {
        buttonEl = buttonEl.parentElement
    }
    var words = buttonEl.id.split("_");
    var slotIdStr = words[1];
    var slotId = parseInt(slotIdStr, 10);

    var textAreaEl = document.getElementById("text_" + slotIdStr);
    var timeBlockStr = textAreaEl.value;

    timeBlocks[slotId] = timeBlockStr;

    localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
}

//blocks changing color 

function colorTimeBlocks(){
    var currentHour = moment().hour();
    var currentHourSlot = currentHour - 9;

// paint past time blocks
    var pastEnd = currentHourSlot;
    if (currentHourSlot > timeBlockCount){
        pastEnd = timeBlockCount;
    }
    for (var i = 0; i < pastEnd; i++){
        var textAreaEl = document.getElementById("text_" + i);
        textAreaEl.style.backgroundColor = "#e0e0e0";
    }

// paint current time block
    if ((currentHourSlot >= 0) && (currentHourSlot < timeBlockCount)){
        var textAreaEl = document.getElementById("text_" + currentHourSlot);
        textAreaEl.style.backgroundColor = "red";
    }

// paint future time blocks
    var futureBegin = currentHourSlot + 1;
    if (currentHourSlot < 0){
        futureBegin = 0;
    }
    for (var i = futureBegin; i < timeBlockCount; i++){
        var textAreaEl = document.getElementById("text_" + i);
        textAreaEl.style.backgroundColor = "green";
    }
}

$(".saveBtn").click(saveTimeBlock);
loadTimeBlocks();
colorTimeBlocks();

