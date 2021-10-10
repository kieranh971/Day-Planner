// console.log("I'm connected");

dayPlanner();

function displayTime() {
    var today = moment().format('MMMM Do YYYY');
    // console.log(now);
    $('#currentDay').html("Today's date: " + today);
}

$(document).ready(function() {
    displayTime();
});

function dayPlanner() {
    // Sets time block codes according to past, present, or future
    codeTimeBlocks();
    setInterval(codeTimeBlocks, 60000);

    //update time blocks with info saved in local storage
    $(".timeBlock").each(function(){
        var blockID = $(this).attr("id");
        //retrieves saved info from local storage
        $("#" + blockID + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockID));
    });

    //click event for save button
    $(".saveBtn").on("click", storeSave);
}

function codeTimeBlocks () {

    $(".timeBlock").each(function() {
        var blockTime = parseInt($(this).attr("id").replace("hour-",""));
        var currentTime = parseInt(moment().format("H"));    
        //remove class from time blocks
        $(this).removeClass("past present future");
    // If loop to determine if the current block is past or ahead of current time
    if (blockTime < currentTime) {
        $(this).addClass("past");
    } else if (blockTime > currentTime) {
        $(this).addClass("future");
    } else {
        $(this).addClass("present");
    }
});
}

function storeSave(event) {
    //retrieve parent id
    var timeID = $(this).parent().attr("id");
    //save data from textarea to local storage
    localStorage.setItem(moment().format("DDDYYYY") + timeID, $("#" + timeID + " textarea").val());
}