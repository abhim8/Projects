var diff = 1;
var speechNumber = 1;
var timer;
var cardColor;
var speechName;
        
    
// to alert user with "welcome" note before page loads
window.onload = function(){ 
    // When the page is ready open the modal 
    modal.style.display = "block";
}

// references of pop up message modal 
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() { modal.style.display = "none"; }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) { if (event.target == modal) { modal.style.display = "none"; } }


// disabled rightclick
document.addEventListener("contextmenu", function(e){ e.preventDefault(); alert('Right Click Disabled!!😄'); }, false);
        
        
        




// word of the day
$("#wod").on("change", function () {
    if ($(this).is(":checked")) {
        $(".wod").html('<div class="text-center" style="padding:25px 0;"><h3 style="color: white;text-shadow: 1px 1px 1px #272727;"> Word of the Day: ' + $("#word").val() + '</h3><h5 style="font-size:16px">Meaning: ' + $("#Meaning").val() + '</h5></div>');
        $(".wod").removeClass("hide");
        $(".iod").html('<div class="text-center" style="padding:25px 0;"><h3 style="color: white;text-shadow: 1px 1px 1px #272727;"> Idiom of the Day: ' + $("#idiom").val() + '</h3><h5 style="font-size:16px">Meaning: ' + $("#idiomMeaning").val() + '</h5></div>');
        $(".iod").removeClass("hide");
    }
    else {
        $(".wod").addClass("hide");
        $(".wod").html("");
        $(".iod").addClass("hide");
        $(".iod").html("");
    }
});

$('[type="radio"]').on("change", function () {
    if ($(this).attr("id") == "custom") {
        $("#customSection").removeClass("hide");
    }
    else {
        $("#customSection").addClass("hide");
    }

    if ($("#TypeError").is(":visible")) {
        $("#TypeError").addClass("hide");
    }
});

$(".numberBox").on("focusout", function () {
    if ($("#cust-g").val() != "" && $("#cust-y").val() != "" && $("#cust-r").val() != "") {

        $("#TimeError").addClass("hide");
    }

    if (parseFloat($("#cust-g").val()) % 0.5 == 0 && parseFloat($("#cust-y").val()) % 0.5 == 0 && parseFloat($("#cust-r").val()) % 0.5 == 0) {

        $("#MultipleError").addClass("hide");
    }

});

$("#speakerName").on("focusout", function () {
    if ($(this).val() != "") {

        $("#SpeakerError").addClass("hide");
    }
});

$("#Start").on("click", function () {
    var Error = false;
    if (!$('[name="Speech"]').is(":checked")) {
        $("#TypeError").removeClass("hide");
        Error = true;

    }
    if ($("#speakerName").val() == '') {
        $("#SpeakerError").removeClass("hide");
        Error = Error || true;
    }
    if ($('[name="Speech"]:checked').attr("id") == 'custom') {
        if ($("#cust-g").val() == "" || $("#cust-y").val() == "" || $("#cust-r").val() == "") {

            $("#TimeError").removeClass("hide");
            Error = Error || true;
        }

        else if (parseFloat($("#cust-g").val()) % 0.5 != 0 || parseFloat($("#cust-y").val()) % 0.5 != 0 || parseFloat($("#cust-r").val()) % 0.5 != 0) {

            $("#MultipleError").removeClass("hide");
            Error = Error || true;
        }

        if ((parseFloat($("#cust-y").val()) <= parseFloat($("#cust-g").val())) ||
            (parseFloat($("#cust-r").val()) <= parseFloat($("#cust-y").val())) ||
            (parseFloat($("#cust-r").val()) <= parseFloat($("#cust-g").val()))
        ) {
            $("#IncrementalError").removeClass("hide");
            Error = Error || true;
        }

    }

    if (Error) {
        return false;
    }
    else {
        $("#TypeError").addClass("hide");
        $("#SpeakerError").addClass("hide");
        $("#TypeError").addClass("hide");
        $("#MultipleError").addClass("hide");
        $("#IncrementalError").addClass("hide");
        var speech = $('[name="Speech"]:checked');
        var typeOf = speech.attr("id");
        var green, yellow, red;

        if (typeOf == "custom") {
            green = parseFloat($("#cust-g").val()) * 60;
            yellow = parseFloat($("#cust-y").val()) * 60;
            red = parseFloat($("#cust-r").val()) * 60;

            speechName = $('[name="Speech"]:checked').val() + ' (' + $("#cust-g").val() + '-' + $("#cust-r").val() + ' mins)';
        }

        else {
            green = speech.attr("data-g");
            yellow = speech.attr("data-y");
            red = speech.attr("data-r");
            speechName = $('[name="Speech"]:checked').val();
        }
        $(this).attr("disabled", "disabled");
        $(".controlSection input,.controlSection textarea").attr("disabled", "disabled");
        $(".TIP").removeClass("hide");
        $("#Stop").removeAttr("disabled");
        $("#Start").addClass("hide");
        $("#Stop").removeClass("hide");
        if ($("#FullScreen").is(":checked")) {
            $(".colorChange").addClass("fullScreen");
            $(".Maximize").addClass("hide");
            $(".Minimize").removeClass("hide");
        }
        var kickoff = new Date();


        timer = setInterval(function () {
            var now = new Date();
            diff = parseInt((now - kickoff) / 1000);
            if (diff == green) {
                $(".colorChange").removeClass("b").addClass("g");
                cardColor = 'gC';
            }
            else if (diff == yellow) {
                $(".colorChange").removeClass("g").addClass("y");
                cardColor = 'yC';
            }
            else if (diff == red) {
                $(".colorChange").removeClass("y").addClass("r");
                cardColor = 'rC';
            }
            else if (diff < green) {
                cardColor = 'bC';
            }
            if (!$("#hideTimer").is(":checked"))
                $(".timerDisplay").html(new Date(1000 * diff).toISOString().substr(14, 5));


        }, 1000);

    }
});


$("#hideTimer").on("change", function () {
    if ($(this).is(":checked")) {
        $(".timerDisplay").html("");
    }
    else {
        $(".timerDisplay").html("00:00");
    }
});

$(".Maximize").on("click", function () {
    $(".colorChange").addClass("fullScreen");
    $(".Maximize").addClass("hide");
    $(".Minimize").removeClass("hide");
});

$(".Minimize").on("click", function () {
    $(".colorChange").removeClass("fullScreen");
    $(".Maximize").removeClass("hide");
    $(".Minimize").addClass("hide");
});

$("#Stop").on("click", function () {

    var timetakenSecds = diff;
    $(".controlSection input, .controlSection textarea").removeAttr("disabled");
    $("#Start").removeAttr("disabled");
    $("#Start").removeClass("hide");
    $("#Stop").addClass("hide");
    var myDate = new Date(1000 * timetakenSecds).toISOString().substr(11, 8);
    $(".TIP").addClass("hide");
    clearInterval(timer);
    $("#tbody").append('<tr><th scope="row">' + speechNumber + '</th><td>' + speechName + '</td><td>' + $("#speakerName").val() + '</td><td><i class="fas fa-stopwatch ' + cardColor + '" style="font-size: 20px;"></i>  ' + myDate + '</td></tr >');
    diff = 1;
    $(".colorChange").removeClass("r").removeClass("g").removeClass("y").addClass("b");
    speechNumber++;
    $("#Stop").attr("disabled", "disabled");
    $(".colorChange").removeClass("fullScreen");
    $(".Maximize").removeClass("hide");
    $(".Minimize").addClass("hide");
    $("#speakerName").val("");
    if ($("#hideTimer").is(":checked")) {
        $(".timerDisplay").html("");
    }
    else {
        $(".timerDisplay").html("00:00");
    }
});