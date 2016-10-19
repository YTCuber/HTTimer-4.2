var timeoutId = 0;
var timeoutClearId = 0;
var oneMin = 60000; // How many milliseconds
var bpm = 100;
var bpb = 4;
var beatCount = 1;
var left = 1;
var turnedOn = false;
$(document).ready(function() {
	$(".bpmPlus").click(function() {
		var currentValue = parseFloat($(".bpm").val());
		$(".bpm").val(currentValue + 1);
		bpm = parseFloat($(".bpm").val());
	})
	$(".bpmMinus").click(function() {
		var currentValue = parseFloat($(".bpm").val());
		$(".bpm").val(currentValue - 1);
		bpm = parseFloat($(".bpm").val());
	})
	$(".bpm").change(function() {
		bpm = parseFloat($(".bpm").val());
	})
	$(".bpbPlus").click(function() {
		var currentValue = parseFloat($(".bpb").val());
		$(".bpb").val(currentValue + 1);
		bpb = parseFloat($(".bpb").val());
	})
	$(".bpbMinus").click(function() {
		var currentValue = parseFloat($(".bpb").val());
		$(".bpb").val(currentValue - 1);
		bpb = parseFloat($(".bpb").val());
	})
	$(".bpb").change(function() {
		bpb = parseFloat($(".bpb").val());
	})
	$(".start").click(function() {
		if (turnedOn) {
			return false;
		}
		beatCount = 1
		beat();
		turnedOn = true;
	})
	$(".stop").click(function() {
		clearTimeout(timeoutId);
		beatCount = 1
		beatReset();
		turnedOn = false;
	})
});

function beat() {
	timeoutId = setTimeout("beat()", (oneMin / bpm));
	$(".beatIndicator").show();
	$(".beatIndicator").html(""); // Clear HTML
	$(".beatIndicator").html(beatCount);
	if (beatCount == 1) {
		barBeep();
	} else {
		beep();
	}
	//setTimeout('$(".beatIndicator").hclasse()', 100);
	moveBeatBar();
	beatCount++;
	if (beatCount > bpb) {
		beatCount = 1;
	}
}

function beep() {
	$(".beatIndicator").removeClass('barBeep');
	$(".beatIndicator").addClass('beep');
	document.getElementById('beepOne').play();
}

function barBeep() {
	$(".beatIndicator").removeClass('beep');
	$(".beatIndicator").addClass('barBeep');
	document.getElementById('beepTwo').play();
}

function moveBeatBar() {
	var bps = 1 / (bpm / 60);
	if (left) {
		$(".beatBar").removeClass('beatReset');
		$(".beatBar").removeClass('beatRight');
		$(".beatBar").addClass('beatLeft');
		$(".beatBar").css('-webkit-transition', 'all ' + bps + 's ease-in-out');
		$(".beatBar").css('-moz-transition', 'all ' + bps + 'ss ease-in-out');
		$(".beatBar").css('-o-transition', 'all ' + bps + 'ss ease-in-out');
		$(".beatBar").css('transition', 'all ' + bps + 'ss ease-in-out');
		left = 0;
	} else {
		$(".beatBar").removeClass('beatReset');
		$(".beatBar").removeClass('beatLeft');
		$(".beatBar").addClass('beatRight');
		left++;
	}
}

function beatReset() {
	$(".beatBar").removeClass('beatRight');
	$(".beatBar").removeClass('beatLeft');
	$(".beatBar").addClass('beatReset');
}