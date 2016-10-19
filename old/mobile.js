function displaySessions(){
	for(var i=0,text="";i<timer.sessions.length;i++){
		text+="<button onclick='javascript:switchSession("+i+")'>Session"+i+"</button><br>";
	}
	text+="<button onclick='createSession()'>Session hinzuf&uuml;gen</button>";
	text+="<button onclick='deleteSession(timer.currentSession)'>Session l&ouml;schen</button>";
	document.getElementById("sessions").innerHTML=text;
	displayScrambler();
}