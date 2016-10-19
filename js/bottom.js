window.modules.bottom=true;

window.onbeforeunload=function(){
	return "There may be unsaved times. Click Menu->Export before you go away!";
}

var helpbtns,helpbtnslength;
helpbtns=document.getElementsByClassName("helpmsg");
helpbtnslength=helpbtns.length;
for(let i=0;i<helpbtnslength;++i){
	helpbtns[i].onmouseover=function(){
		this.innerHTML=this.attributes.title.value;
	};
	helpbtns[i].onmouseout=function(){
		this.innerHTML="&nbsp;?&nbsp;";
	};
	helpbtns[i].innerHTML="&nbsp;?&nbsp;";
}

if(document.addEventListener){
	document.getElementsByClassName("next")[0].addEventListener('click',displayScramble);
}else if(document.attachEvent){
	document.getElementsByClassName("next")[0].attachEvent('onclick',displayScramble);
}else{
	alert("Your browser doesn't support attaching eventhandlers in JavaScript. The timer is unusable. You may want to wait, until a solution with setAttribute() is available.");
}

if(window.modules.language&&window.modules.timer&&window.modules.cube&&window.modules.alg_jison&&window.modules.alg&&window.modules.scrambler&&window.modules.squanPyraScrambler&&window.modules.bottom){
	console.log("All modules loaded!");
}else{
	console.log("Error loading modules.");
	alert("Es ist ein Fehler beim Laden der JS-Dateien aufgetreten. Der Timer könnte nicht nutzbar sein.");
}

function init(){
	language=english;
	eval(localStorage.HTexport||"");
	displayScramble();
	drawTool();
	createSession();
	displayTimes();
	displaySessions();
}