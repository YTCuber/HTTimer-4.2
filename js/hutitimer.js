window.modules.timer=true;

var uwrs,colors,uwrholders,cube,remainingInspectionTime;
const SCRAMBLEIMAGE="scrambleImage";

remainingInspectionTime=0;
cube=generatealgjscube(alg_jison);
uwrs=[];
colors=[];
uwrholders=[];
uwrs["barrel"]=11.636;
uwrs["ghost"]=33.25;
colors["W"]="#FFFFFF";
colors["R"]="#FF0000";
colors["O"]="#FFA500";
colors["S"]="#000000";
colors["G"]="#FFFF00";
colors["U"]="#FF00FF";
colors["B"]="#0000FF";
colors["A"]="#A0A0A0";

(function(){
	var parts,s;
	s=window.location.search.substring(1).split('&');
	if(!s.length)return; 
	window.$_GET={};
	for(var i=0;i<s.length;++i){
		parts = s[i].split('=');
		window.$_GET[unescape(parts[0])] = unescape(parts[1]);
	}
}());

rotationReducer={
	keys:[["x y x'","z"],["x' y x","z'"],["y x y'","z'"],["y x' y'","z"]],
	reduce:function(rots){
		var i;
		rots=rots.toLowerCase();
		for(i=0;i<rotationReducer.keys.length;++i){
			if(rotationReducer.keys[i][0]==rots){
				rots=rotationReducer.keys[i][1];
			}
		}
		return rots;
	}
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from)+1 || this.length);
  this.length = from < 0 ? this.length+from : from;
  return this.push.apply(this, rest);
};
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};
String.prototype.replaceAll = function(search,replacement) {
	var target = this;
	return target.replace(new RegExp(search,'g'),replacement);
};
var isUndefined=function(x){return (function(a,undefined){return a==undefined;})(x)}

var digits = function f(a,b){return"\n_ |"[b%4&&b%2+-~a]||"ცᕦဨဢᒦႂႊᅦႪႦ".charCodeAt(a).toString(2).replace(/./g,f)}

function buildArchitecture(){
	window.timer=timer={
		config:{
			results:[],
			aktualisierungsrate:17
		},
		running:false,
		zeit:0,
		scramble:"",
		penalty:"",
		type:"3x3",
		timingMode:1,
		blockTime:2e2,
		blockTimeReturn:3e3,
		sessions:[],
		currentSession:0,
		defaultScrambler:"3x3",
		relayCommand:"2x2 2x2bld",
		version:"2.1.7",
		customAvg:100,
		tool:0,
		precision:true,
		relayWarn:true,
		exportDesign:0,
		displayGoalUnderTime:false,
		displayTimeWhenSolving:true
	}
}
buildArchitecture();

function start(){
	if(!timer.running){
		timer.running=true;
		timer.zeit=+new Date();
		setTimeout(time,timer.aktualisierungsrate/2);
		document.getElementById(SCRAMBLEIMAGE).innerHTML="";
	}
}

function time(){
	var tmw;
	if(timer.running){
		tmw=format((+new Date())-timer.zeit);
		if(!timer.displayTimeWhenSolving)tmw="solving";
		$(".time, .time-unstyled").html(tmw);
		setTimeout(time,timer.aktualisierungsrate);
	}
}

function displayScramble(){
	var Tscramble;
	timer.scramble=Tscramble=getScrambles(timer.type,1)||"Error.",
	$(".scramble, .scramble-unstyled").html(Tscramble);
	drawTool();
}

function stop(){
	var result,zeit;
	time();
	zeit=+new Date()-timer.zeit;
	
	if(zeit-80<0)zeit+=80;
	if(zeit<80)zeit=80;
	
	$(".time").html(format(zeit-80));
	
	timer.running=false;
	result={
		zeit:zeit-80,
		//scramble:document.getElementById(SCRAMBLE).innerHTML.split("<")[0],
		penalty:timer.penalty,
		datum:+new Date(),
		kommentar:""
	};
	timer.config.results.push(result);
	if(timer.displayGoalUnderTime){
		document.getElementsByClassName("goal-time")[0].style.visibility="visible";
		document.getElementsByClassName("goal-time")[0].innerHTML="load err";
		var text;
		while(ziel.ziele.length<timer.sessions.length){
			ziel.ziele.push([0,0,0,0,0,0]);
		}
		var best,bestao5,besto12,i;
		best=format(timer.config.results[timer.config.results.length-1].zeit),
		bestao5=format(currentaox(timer.config.results,5)),
		besto12=format(currentaox(timer.config.results,12));
		if(typeof ziel.ziele[timer.currentSession]=="undefined")ziel.ziele[timer.currentSession]=[0,0,0,0,0,0];
		for(i=0;i<ziel.ziele[timer.currentSession].length;++i){
			if(ziel.ziele[timer.currentSession][i]<0)ziel.ziele[timer.currentSession][i]=0;
		}
		document.getElementsByClassName("goal-time")[0].innerHTML="<h4>Current Goals:</h4>Single:"+ziel.format(ziel.ziele[timer.currentSession][0],best)+BR+"Ao5:"+ziel.format(ziel.ziele[timer.currentSession][1],bestao5)+BR+"Ao12:"+ziel.format(ziel.ziele[timer.currentSession][2],besto12);
	}
	timer.zeit=timer.scramble=timer.penalty=0;
	displayTimes();
	drawTool();
	displayScramble();
	graphProgression();
}

function startInspection(){
	timer.running||(remainingInspectionTime=+new Date,timeInspection());
}

function timeInspection(){
	var tmw,color;
	if(!timer.running){
		tmw=+new Date()-remainingInspectionTime,
		color="green";
		if(tmw> 8e3-1)color="orange",document.getElementById(SCRAMBLEIMAGE).innerHTML="<span style='font-size:40pt;'>8!</span>";
		if(tmw>12e3-1)color="red",document.getElementById(SCRAMBLEIMAGE).innerHTML="<span style='font-size:40pt;'>12!</span>";
		if(tmw>14e3-1)document.getElementById(SCRAMBLEIMAGE).innerHTML="<span style='font-size:40pt;'>Go!</span>";
		tmw="<span style='color:"+color+"'>"+format(tmw)+"</span>";
		$(".time").html("Inspect: "+tmw);
		setTimeout(timeInspection,13);
	}
}

function deletetime(id){
	timer.config.results.splice(id,1);
	displayTimes();
	drawTool();
}

function graphProgression(){
	var solveData,ctx,data,myLineChart,i,j;
	
	solveData=timer.config.results,
	ctx=document.getElementsByClassName("graph-progression"),
	data={
		labels:[],
		datasets:[{
				label:"Single",
				data:[]
			},{
				label:"Ao5",
				data:[]
			}
		]
	};
	for(i=0;i<solveData.length;++i){
		data.labels.push(i+1);
		data.datasets[0].data.push(solveData[i].zeit/1000);
		if(i>4){
			data.datasets[1].data.push(0);
		}
	}
	for(j=0;j<ctx.length;++j){
	myLineChart=new Chart(ctx[j],{
		type:'line',
		data:data,
		options:{
			scales:{
				xAxes:[{
					stacked:true
				}],
				yAxes:[{
					stacked:true
				}]
			},
			responsive:false
		}
	});
	}
}

function format(s) {
	var ms,secs,mins,hrs;
	
	if(isNaN(s))return "DNF";
	if(!s)s=timer.zeit;
	
	function addZ(n) {
		return (n<10?'0':'')+n;
	}
	function addH(n){
		if(n<100){
		  if(n<10){
			  return '00'+n;
		  }else{
			  return '0'+n;
		  }
		}else{
		  return n;
		}
	}
	function subLastDigit(str){
		return str.substring(0, str.length - 1);
	}
	function sld(str){
		return subLastDigit(str);
	}

	ms = s % 1e3;
	s = (s - ms) / 1e3;
	secs = s % 60;
	s = (s - secs) / 60;
	mins = s % 60;
	hrs = (s - mins) / 60;
	if(timer.precision){
		if(hrs==0){
			if(mins==0){
				return secs+'.'+addH(ms);
			}else{
				return mins+':'+addZ(secs)+'.'+addH(ms);
			}
		}else{
			return hrs+':'+addZ(mins)+':'+addZ(secs)+'.'+addH(ms);
		}
	}else{
		if(hrs==0){
			if(mins==0){
				return secs+'.'+sld(addH(ms));
			}else{
				return mins+':'+addZ(secs)+'.'+sld(addH(ms));
			}
		}else{
			return hrs+':'+addZ(mins)+':'+addZ(secs)+'.'+sld(addH(ms));
		}
	}
}

function displayTimes(){
	var text,i;
	
	text="<table class='table table-striped table-condensed table-hover'><tr><td colspan='3'>Solve Times</td></tr>";
	for(i=0;i<timer.config.results.length;++i){
		zeit=timer.config.results[i].zeit,
		scramble=timer.config.results[i].scramble,
		penalty=timer.config.results[i].penalty;
		text+="<tr><td>"+(i+1)+".:</td><td onclick='showTime("+i+");'>";
		if(penalty!=="DNF"){
			text+=format(zeit);
			if(penalty==="+2"){
				text+="+";
			}else if(penalty==="+4"){
				text+="++";
			}
		}else{
			text+="DNF";
		}
	
		text+="</td><td><select>";
		text+="<option onclick='setPenalty("+i+",\"\");'>OK</option>";
		text+="<option onclick='setPenalty("+i+",\"+2\");'>+2</option>";
		text+="<option onclick='setPenalty("+i+",\"+4\");'>+4</option>";
		text+="<option onclick='setPenalty("+i+",\"DNF\");'>DNF</option>";
		text+="<option onclick='deletetime("+i+");'>Delete</option>";
		text+="<option onclick='flagtime("+i+");'>Add</option>";
		text+="</select></td></tr>";
	}
	text+="</table>";
	$(".times, .times-unstyled").html(text);
}

function showTime(i){
	var text,zeit,scramble,penalty,datum,kommentar,fake;
	
	text="",
	zeit=timer.config.results[i].zeit,
	scramble=timer.config.results[i].scramble,
	penalty=timer.config.results[i].penalty||"N",
	datum=timer.config.results[i].datum;
	fake=zeit<3000?"J":"N";
	zeit=penalty=="DNF"?"DNF("+zeit+")":zeit;
	kommentar=timer.config.results[i].kommentar;
	show('timeDetails');
	function dodate(time){
		var b;
		b=new Date(time);
		return b.getDate()+"."+(b.getMonth()+1)+"."+b.getFullYear()+" "+b.getHours()+":"+b.getMinutes()+":"+b.getSeconds()+"."+b.getMilliseconds();
	}
	text+="<h3>Solve information</h3>"+BR+"Zeit: "+zeit+BR+"Formatierte Zeit: "+format(zeit)+BR+"Scramble: "+scramble+BR+"Penalty: "+penalty+BR+"Datum: "+datum+BR+"Formatiertes Datum: "+dodate(datum)+BR+"Kommentar: '"+kommentar+"'"+BR+"Fake: "+fake+BR+BR+"<button onclick='javascript:hide(\"timeDetails\");'>"+language.back+"</button>";
	document.getElementById("timeDetails").innerHTML=text;
}

function flagtime(i){
	var text,flags,j;
	
	text="<h3>Set flags for solve #"+i+"</h3>";
	flags=["Pop","BLD Memo Mistake","BLD Execution mistake","PB","UWR","Fake","Fail","OLL Skip","PLL Skip","LL Skip","CMLL Skip","EO Skip","EOLL Skip","EPLL Skip","COLL Skip","CPLL Skip","EOCPLL Skip","COEPLL Skip","EOLine Skip","Corner twist","Explosion","Parity","Double Parity","Mess up","Parity mess up","Double mess up","Double Parity mess up"];
	if(!timer.config.results[i].flags)timer.config.results[i].flags=[];
	for(j=0;j<flags.length;++j){
		text+="<div class='row'><div class='col-md-1'></div><div class='col-md-5'>";
		if(!!timer.config.results[i].flags[j])text+="<b>";
		text+=flags[j]+".: "+(!!timer.config.results[i].flags[j]);
		if(!!timer.config.results[i].flags[j])text+="</b>";
		text+="</div><div class='col-md-3'><button class='btn btn-default' onclick='flagset("+i+","+j+",false);'>Set false</button></div><div class='col-md-3'><button class='btn btn-default' onclick='flagset("+i+","+j+",true)';>Set true</button></div></div>";
	}
	show('flagtime');
	document.getElementById("flagtime").innerHTML=text+"<div class='btn btn-default' onclick='hide(\"flagtime\");'>"+language.back+"</div>";
}

function flagset(solve,flag,value){
	timer.config.results[solve].flags[flag]=value;flagtime(solve);
}

Mousetrap.bind("space",checkKeyAction);
Mousetrap.bind("ctrl+s",exportCode);
Mousetrap.bind("r e l o a d",function(){window.location.reload()});
Mousetrap.bind("I",startInspection);

function checkKeyAction(){
	if(timer.running){
		stop();
	}else{
		if(!timer.block){
			start();
			timer.block=true;
			setTimeout(function(){timer.block=false},timer.blockTime);
		}else{
			setTimeout(timeListDisplay,timer.blockTimeReturn);
		}
	}
}

function avg(times){//aox
	var min,max,minindex,maxindex,sum,i,j;
	
	min=+Infinity;
	max=-Infinity;
	sum=0;
	for(j=0;j<times.length;++j){
		if(times[j].zeit<min){
			min=times[j].zeit;
			minindex=j;
		}
		if(times[j].zeit>max){
			max=times[j].zeit;
			maxindex=j;
		}
	}

	for(i=0;i<times.length;++i){
		if(i!==minindex&&i!==maxindex){
			sum+=times[i].zeit;
		}
	}

	return sum/(times.length-2);
}

function average(times){//mox
	var sum,i;
	sum=0;

	for(i=0;i<times.length;++i){
		sum+=times[i].zeit;	
	}

	return sum/times.length;
}

function minMaxTime(times){
	var min,minindex,max,maxindex,j;
	min=+Infinity;
	max=-Infinity;
	
	for(j=0;j<times.length;++j){
		if(times[j].zeit<min){
			min=times[j].zeit;
			minindex=j;
		}
		if(times[j].zeit>max){
			max=times[j].zeit;
			maxindex=j;
		}
	}
	return {minindex:minindex,min:min,maxindex:maxindex,max:max};
}

function bestaox(times,x){
	var arr,min,minavg,i,j;
	
	if(times.length<x){
		return "DNF";
	}
	if(times.length==x){
		return Math.round(avg(times));
	}

	arr=[];
	min=+Infinity;
	
	for(i=0;i<times.length-x;++i){
		arr=[];
		for(j=0;j<x;++j){
			arr.push(times[i+j]);
		}
		minavg=avg(arr);
		if(minavg<min){
			min=minavg;
		}
	}
	return Math.round(min);
}
function currentaox(times,x){
	var arr,minavg,i,j;
	
	if(times.length<x){
		return "DNF";
	}
	if(times.length==x){
		return Math.round(avg(times));
	}
	
	arr=[];
	i=times.length-x;
	arr=[];
	for(j=0;j<x;++j){
		arr.push(times[i+j]);
	}
	minavg=avg(arr);
	
	return Math.round(minavg);
}

function toolTimes(){
	var globalAverage,best,worst,bestao5,uwr,fake,p;
	globalAverage=format(Math.floor(average(timer.config.results))),
	best=format(minMaxTime(timer.config.results).min),
	worst=format(minMaxTime(timer.config.results).max),
	bestao5=format(bestaox(timer.config.results,5));
	
	(best<uwrs[timer.type])?uwr=true:uwr=false;
	(best<0.3)?fake=true:fake=false;
	p=language.globalAverage+": "+globalAverage +BR+language.best+": "+best;
	if(uwr&&!fake){
		p+=" <b>UWR!</b>";
	}else if(fake&&!uwr){
		p+=" <b>FAKE! :(</b>";
	}else if(fake&&uwr){
		p+=" <b>FAKED UWR! :(</b>";
	}
	p+=BR+language.worst+": "+worst+BR+language.best+" Ao5: "+bestao5+"";
	if(timer.config.results.length>11){
		p+=BR+language.best+" Ao12: "+format(bestaox(timer.config.results,12));
		if(timer.config.results.length>49){
			p+=BR+language.best+" Ao50: "+format(bestaox(timer.config.results,50));
		}
	}
	if(timer.config.results.length>timer.customAvg-1){
		p+=BR+language.best+" Ao"+timer.customAvg+": "+format(bestaox(timer.config.results,timer.customAvg));
	}
	return p+BR+"<button class='btn-lg' onclick='generateExport();'>Export</button>";
}

function toolTimeRatio(){
	var globalAverage,best,worst,bestao5,text;
	globalAverage=format(average(timer.config.results)),
	best=format(minMaxTime(timer.config.results).min),
	worst=format(minMaxTime(timer.config.results).max),
	bestao5=format(bestaox(timer.config.results,5)),
	
	text="<table>";
	text+="<tr><td><b>A</b></td><td><b>zu B</b></td><td><b>Verh&auml;ltnis</b></td></tr>";
	text+="<tr><td>Best</td><td>Worst</td><td>"+Math.floor(best/worst*100)/100+"</td></tr>";
	text+="<tr><td>Single</td><td>Ao5</td><td>"+Math.floor(best/bestao5*100)/100+"</td></tr>";
	if(timer.config.results.length>11){
		text+="<tr><td>Single</td><td>Ao12</td><td>"+Math.floor(best/format(bestaox(timer.config.results,12))*100)/100+"</td></tr>";
		text+="<tr><td>Ao5</td><td>Ao12</td><td>"+Math.floor(bestao5/format(bestaox(timer.config.results,12))*100)/100+"</td></tr>";
		if(timer.config.results.length>49){
			text+="<tr><td>Single</td><td>Ao50</td><td>"+Math.floor(best/format(bestaox(timer.config.results,50))*100)/100+"</td></tr>";
			text+="<tr><td>Ao5</td><td>Ao50</td><td>"+Math.floor(bestao5/format(bestaox(timer.config.results,50))*100)/100+"</td></tr>";
			text+="<tr><td>Single</td><td>Ao12</td><td>"+Math.floor(format(bestaox(timer.config.results,12))/format(bestaox(timer.config.results,50))*100)/100+"</td></tr>";
		}
	}
	if(timer.config.results.length>timer.customAvg-1){
		text+="<tr><td>Single</td><td>Ao"+timer.customAvg+"</td><td>"+Math.floor(best/format(bestaox(timer.config.results,timer.customAvg))*100)/100+"</td></tr>";
	}
	return text;
}

function toolTimeHistory(){
	var canvas,ctx,height,width,times,min,j,max,time;
	canvas = document.getElementById('pbcanvas'),
	ctx = canvas.getContext('2d'),
	height=150,
	width=200;
	times=JSON.parse(JSON.stringify(timer.config.results));
	min=0;
	max=minMaxTime(timer.config.results).max;
	
	ctx.moveTo(0,height-1);
	ctx.lineTo(width,height-1);
	ctx.stroke();
	ctx.font = "10px Arial";
	document.getElementById("summ").innerHTML="<canvas id='pbcanvas' width='200' height='150'></canvas>";
	for(j=0;j<times.length;++j){
		time=times[j].zeit;
		ctx.moveTo((j/times.length)*width,height+min-1);
		ctx.lineTo((j/times.length)*width,height-((time/max)*height)+1);
	}
	ctx.stroke();
}

function drawTool(){
	var globalAverage,best,worst,bestao5,uwr,fake,p,bestcurrent;
	globalAverage=format(Math.floor(average(timer.config.results))),
	best=format(minMaxTime(timer.config.results).min),
	worst=format(minMaxTime(timer.config.results).max),
	bestao5=format(bestaox(timer.config.results,5)),
	bestcurrent=timer.config.results.length>0?format(timer.config.results[timer.config.results.length-1].zeit||"DNF"):"DNF";
	
	(best<uwrs[timer.type])?uwr=true:uwr=false;
	(best<0.3)?fake=true:fake=false;
	p="<table class='table table-condensed table-hover'><tr><td>Type</td><td>Current</td><td>Best</td></tr><tr></tr><tr><td>Session Mo"+timer.config.results.length+"</td><td>--</td><td>"+ globalAverage+"</td></tr>";
	p+="<tr><td>Single</td><td>"+bestcurrent+"</td><td>"+best+"</td></tr>";
	p+="<tr><td>Ao5</td><td>"+format(currentaox(timer.config.results,5))+"</td><td>"+bestao5+"</td></tr>";
	if(timer.config.results.length>11){
		p+="<tr><td>Ao12</td><td>"+format(currentaox(timer.config.results,12))+"</td><td>"+format(bestaox(timer.config.results,12))+"</td></tr>";
		if(timer.config.results.length>49){
			p+="<tr><td>Ao50</td><td>"+format(currentaox(timer.config.results,50))+"</td><td>"+format(bestaox(timer.config.results,50))+"</td></tr>";
			if(timer.config.results.length>99){
				p+="<tr><td>Ao100</td><td>"+format(currentaox(timer.config.results,100))+"</td><td>"+format(bestaox(timer.config.results,100))+"</td></tr>";
				if(timer.config.results.length>999){
					p+="<tr><td>Ao1000</td><td>"+format(currentaox(timer.config.results,1000))+"</td><td>"+format(bestaox(timer.config.results,1000))+"</td></tr>";
				}
			}
		}
	}
	if(timer.config.results.length>timer.customAvg-1){
		p+="<tr><td>"+timer.customAvg+"</td><td>--</td><td>"+format(bestaox(timer.config.results,timer.customAvg))+"</td></tr>";
	}
	$(".sessionavg, .sessionavg-unstyled").html(p+"</table>");
}

function givePenalty(id,penalty){
	if(timer.config.results[id].penalty===""&&penalty==="+2"){
		timer.config.results[id].penalty="+2";
		timer.config.results[id].zeit+=2e3;
	}
	else if(timer.config.results[id].penalty===""&&penalty==="+4"){
		timer.config.results[id].penalty="+4";
		timer.config.results[id].zeit+=4e3;
	}
	else if(timer.config.results[id].penalty==="+2"&&penalty==="+2"){
		timer.config.results[id].penalty="+4";
		timer.config.results[id].zeit+=2e3;
	}
	else if(timer.config.results[id].penalty==="+2"&&penalty==="-2"){
		timer.config.results[id].penalty="";
		timer.config.results[id].zeit-=2e3;
	}
	else if(timer.config.results[id].penalty==="+4"&&penalty==="-2"){
		timer.config.results[id].penalty="+2";
		timer.config.results[id].zeit-=2e3;
	}
	else if(timer.config.results[id].penalty==="+4"&&penalty==="-4"){
		timer.config.results[id].penalty="";
		timer.config.results[id].zeit-=4e3;
	}
	else if(penalty==="DNF"){
		timer.config.results[id].penalty="DNF";
	}
	else if(timer.config.results[id].penalty==="DNF"&&penalty==="-DNF"){
		timer.config.results[id].penalty="";
	}
	else{
		timer.config.results[id].penalty="";
	}

	displayTimes();
	drawTool();
}

function setPenalty(id,penalty){
	if(timer.config.results[id].penalty===""&&penalty==="+2"){
		timer.config.results[id].penalty="+2";
		timer.config.results[id].zeit+=2e3;
	}
	else if(timer.config.results[id].penalty===""&&penalty==="+4"){
		timer.config.results[id].penalty="+4";
		timer.config.results[id].zeit+=4e3;
	}
	else if(timer.config.results[id].penalty==="+2"&&penalty==="+4"){
		timer.config.results[id].penalty="+4";
		timer.config.results[id].zeit+=2e3;
	}
	else if(penalty==="DNF"){
		setPenalty(id,"");
		timer.config.results[id].penalty="DNF";
	}
	else if(timer.config.results[id].penalty==="DNF"&&penalty===""){
		timer.config.results[id].penalty="";
	}
	if(timer.config.results[id].penalty==="+2"&&penalty===""){
		timer.config.results[id].penalty="";
		timer.config.results[id].zeit-=2e3;
	}
	else if(timer.config.results[id].penalty==="+4"&&penalty===""){
		timer.config.results[id].penalty="";
		timer.config.results[id].zeit-=4e3;
	}
	
	displayTimes();
	drawTool();
}

function switchSession(id){
	timer.sessions[timer.currentSession].results=JSON.parse(JSON.stringify(timer.config.results));
	timer.currentSession=id;
	timer.type=timer.sessions[timer.currentSession].scrambler;
	timer.config.results=JSON.parse(JSON.stringify(timer.sessions[timer.currentSession].results));
	displayTimes();
}

function deleteSession(id){
	if(confirm("Session wirklich resetten?")&&confirm("Alle Ihre Zeiten aus der Session werden gel�scht. Ganz sicher?")){
		timer.sessions[id].results=[];
	}
}

function createSession(){
	session={
		scrambler:timer.defaultScrambler,
		results:[],
	}
	timer.sessions.push(session);
	displaySessions();
}

function displaySessions(){
	var text,i;
	text="<select>";
	
	for(i=0;i<timer.sessions.length;++i){
		text+="<option onclick='javascript:switchSession("+i+")'>Session "+(i+1)+"</option>";
	}
	text+="<option onclick='javascript:createSession();'>Add Session</option>";
	text+="<option onclick='javascript:deleteSession(timer.currentSession);'>Reset Session</option>";
	$(".sessionlist").html(text+"</select>");
}

function switchScrambler(typ){
	timer.sessions[timer.currentSession].scrambler=timer.type=typ;
	displayScramble();
}

function addCustomScrambler(){
	var name,moves,anzahl;
	name=prompt("Scramblername");
	
	do{
		moves=prompt("Possible moves, commaseperated");
	}while(!confirm("Correct moves? "+moves)||moves.split(",").length<2);
	
	anzahl=prompt("Number of moves");
	customscrambler.push({anzahl:anzahl,name:name,moves:moves.split(",")});
	displayCustomScrambler();
}

function displayCustomScrambler(){
	var text,i
	text="";
	
	for(i=0;i<customscrambler.length;++i){
		text+="<div onclick='timer.type=\"cus"+i+"\"'>"+customscrambler[i].name+": "+customscrambler[i].anzahl+" moves of "+customscrambler[i].moves.join(", ")+"</div>";	
	}
	$("#customScrambler").html(text);
}

function generateExport(){
	var globalAverage,best,worst,bestao5,exportDesign,p,d,i;
	globalAverage=format(average(timer.config.results)),
	best=format(minMaxTime(timer.config.results).min),
	worst=format(minMaxTime(timer.config.results).max),
	bestao5=format(bestaox(timer.config.results,5)),
	exportDesign=timer.exportDesign||0,

	p="<h2>Export</h2>"+language.globalAverage+": "+globalAverage+BR+language.best+"e: "+best+BR+language.worst+": "+worst+BR+language.best+" Ao5: "+bestao5+BR;
	if(timer.config.results.length>11){
		p+=BR+language.best+" Ao12: "+format(bestaox(timer.config.results,12));
		if(timer.config.results.length>49){
			p+=BR+language.best+" Ao50: "+format(bestaox(timer.config.results,50));
		}
	}
	if(timer.config.results.length>timer.customAvg-1){
		p+=BR+language.best+" Ao"+timer.customAvg+": "+format(bestaox(timer.config.results,timer.customAvg));
	}

	p+=BR;
	
	for(var i=0;i<timer.config.results.length;++i){
		if(exportDesign==0){
			p+=BR+(i+1)+".: ";
			p+=format(timer.config.results[i].zeit)+" "+timer.config.results[i].scramble+BR;
		}else if(exportDesign==1){
			p+=format(timer.config.results[i].zeit)+",";
		}else if(exportDesign==2){
			p+=format(timer.config.results[i].zeit)+BR;
		}else if(exportDesign==3){
			p+=(i+1)+".: "+format(timer.config.results[i].zeit)+BR;
		}
	}
	d = new Date();
	d=d.toDateString();
	i=Math.round((i/256)+.5);
	p+=BR+"Export wurde am "+d+" in "+i+"ms generiert.";
	p+=BR+"<button onclick='hide(\"export\");'>"+language.back+"</button>";
	show('export');
	document.getElementById('export').innerHTML=p;

	displayTimes();
	drawTool();
}

function exportCode(){
	var code="timer="+JSON.stringify(timer,null,1)+";algsets.sets="+JSON.stringify(algsets.sets,null,1);
	localStorage.HTexport=code;
	alert ("Code wurde in localStorage verschoben und wird bei Neuladen automatisch geladen werden!");
	$(".scrambleImage").html(code+"<button onclick='hideExportCode()'>OK</button>");
	return code;
}

function hideExportCode(){
	$(".scrambleImage .scrambleImage-unstyled").html("");
}

function importCode(){
	var a,b;
	a=timer.version||false;
	
	eval(prompt(language.entercode));
	displayTimes();
	displaySessions();
	b=timer.version||false;
	if(b!=a){
		alert ("Der Export wurde mit Version "+a+" erstellt. Diese Version ist veraltet. Die fehlenden Variablen wurden ergänzt. Manche Scramblertypen k�nnen ver�ndert sein. Der n�chste Export wird Dateien der aktuellen Version generieren; diese sind meistens r�ckw�rtskompatibel.");
	}
}

ziel={
	ziele:[[0,0,0,0,0,0]],
	done:[],
	doneAvg:[],
	display:function(){
		var globalAverage,best,bestao5,besto12,bestao50,bestocustom,worst,text,i;
		
		while(ziel.ziele.length<timer.sessions.length){
			ziel.ziele.push([0,0,0,0,0,0]);
		}
		
		text="<h2>"+language.goals+"</h2>";
		globalAverage=format(average(timer.config.results)),
		best=format(minMaxTime(timer.config.results).min),
		worst=format(minMaxTime(timer.config.results).max),
		bestao5=format(bestaox(timer.config.results,5)),
		besto12=format(bestaox(timer.config.results,12)),
		bestao50=format(bestaox(timer.config.results,50)),
		bestocustom=format(bestaox(timer.config.results,timer.customAvg));
		if(typeof ziel.ziele[timer.currentSession]=="undefined")ziel.ziele[timer.currentSession]=[0,0,0,0,0,0];
		for(i=0;i<ziel.ziele[timer.currentSession].length;++i){
			if(ziel.ziele[timer.currentSession][i]<0)ziel.ziele[timer.currentSession][i]=0;
		}
		text+="<table style='color:black;'><tr><td>Type</td><td>Goal</td><td>Set</td></tr>"
		+"<tr><td>Single</td><td>"+ziel.format(ziel.ziele[timer.currentSession][0],best)+"</td><td><button onclick='ziel.ziele[timer.currentSession][0]=prompt(\"Type in new goal.\");ziel.display();'>Set</button></td></tr>"
		+"<tr><td>Ao5</td><td>"+ziel.format(ziel.ziele[timer.currentSession][1],bestao5)+"</td><td><button onclick='ziel.ziele[timer.currentSession][1]=prompt(\"Type in new goal.\");ziel.display();'>Set</button></td></tr>"
		+"<tr><td>Ao12</td><td>"+ziel.format(ziel.ziele[timer.currentSession][2],besto12)+"</td><td><button onclick='ziel.ziele[timer.currentSession][2]=prompt(\"Type in new goal.\");ziel.display();'>Set</button></td></tr>"
		+"<tr><td>Ao50</td><td>"+ziel.format(ziel.ziele[timer.currentSession][3],bestao50)+"</td><td><button onclick='ziel.ziele[timer.currentSession][3]=prompt(\"Type in new goal.\");ziel.display();'>Set</button></td></tr>"
		+"<tr><td>Custom Aox</td><td>"+ziel.format(ziel.ziele[timer.currentSession][4],bestocustom)+"</td><td><button onclick='ziel.ziele[timer.currentSession][4]=prompt(\"Type in new goal.\");ziel.display();'>Set</button></td></tr>";
		text+="</table>"+BR+"<div onclick='hide(\"ziele\")'>"+language.back+"</div>";
		document.getElementById("ziele").innerHTML=text;
		
		show('ziele');
	},
	format:function(ziel,current){
		var color,percentage;
		(ziel/current>1)?color="green":color="red";
		percentage=Math.round(ziel/current*100);
		return '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuenow="'+percentage+'" aria-valuemin="0" aria-valuemax="100" style="width:'+percentage+'%;">'+percentage+'% of '+ziel+' '+language.seconds+'</div></div>';
	},
	vergleich:function(){
		var globalAverage,best,bestao5,bestao12,bestao50,bestocustom,currentValues,text,maxtime,currentValues,startvalues,currentValue,i,j;
		globalAverage=format(average(timer.config.results)),
		best=minMaxTime(timer.config.results).min,
		bestao5=bestaox(timer.config.results,5),
		bestao12=bestaox(timer.config.results,12),
		bestao50=bestaox(timer.config.results,50),
		bestocustom=bestaox(timer.config.results,timer.customAvg),
		currentValues=[best,bestao5,bestao12,bestao50,bestocustom];
		text="Aktueller Single/Ao5/Ao12/Ao50/AoCustom Rankvergleich:<table>",
		maxtime=minMaxTime(timer.config.results).min*1.1;
		startvalues=[maxtime,maxtime*1.1,maxtime*1.2*1.1,maxtime*1.3*1.2*1.1,maxtime*1.4*1.3*1.2*1.1,maxtime*1.4*1.3*1.2*1.1*1.5],
		currentValue=0;
		
		for(j=0;j<5;++j){
			text+="<tr>";
			currentValue=startvalues[j];
			for(i=0;i<20;++i){
				text+="<td>";
				for(var k=0;k<i;k++)currentValue*=.97;
				if(currentValue>currentValues[j])text+="<span style='background-color:green'>"+Math.round(currentValue)/1e3+"</span></td>";
				if(currentValue<currentValues[j])text+="<span style='background-color:red'>"+Math.round(currentValue)/1e3+"</span></td>";
				if(currentValue==currentValues[j])text+="<span style='background-color:yellow'>"+Math.round(currentValue)/1e3+"</span></td>";
			}
			text+="</tr>";
		}
		return text+"</table>";
	}
}

algsets={
	sets:[],
	setnames:[],
	//registeredSets:{"PLL":["x (R' U R') D2 (R U' R') D2 R2","x' (R U' R) D2 (R' U R) D2 R2","R U' R U R U R U' R' U' R2","R2 U R U R' U' (R' U')(R' U R')","M2 U M2 U2 M2 U M2","R U R' U' R' F R2 U' R' U' R U R' F'","R U R' F' R U R' U' R' F R2 U' R' U'","F R U' R' U' R U R' F' R U R' U' R' F R F'","R' U2 R U2 R' F R U R' U' R' F' R2 U'","L U2' L' U2' L F' L' U' L U L F L2' U","R' U R' d' R' F' R2 U' R' U R' F R F","R' U2 R' d' R' F' R2 U' R' U R' F R U' F","R U R' y' R2 u' R U' R' U R' u R2","R' U' R y R2 u R' U R U' R u' R2","R2 u' R U' R U R' u R2 y R U' R'","R2 u R' U R' U' R u' R2 y' R' U R","M2 U M2 U M' U2 M2 U2 M' U2","R' U L' U2 R U' R' U2 R L U'","x' (R U' R') D (R U R') D' (R U R') D (R U' R') D'","(R' U L') U2 (R U' L)(R' U L') U2 (R U' L) U'","(L U' R) U2 (L' U R')(L U' R) U2 (L' U R') U"]},
	registeredSets:{},
	display:function(){
		var text,cstate,i,j;
		show('algSets');
		/*
		text="<h2>Algorithmen</h2>";
		text+="Es sind "+algsets.sets.length+" Sets eingetragen."+BR+"<button onclick='javascript:algsets.addSet()'>+</button>"+BR;
		for(var i=0;i<algsets.sets.length;++i){
			text+=algsets.setnames[i]+":<button onclick='javascript:algsets.addAlg("+i+")'>+</button>"+BR;
			for(var j=0;j<algsets.sets[i].length;++j){
				text+=(j+1)+".: "+algsets.formatAlg(algsets.sets[i][j])+"<button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.turnAlg(algsets.sets["+i+"]["+j+"]);algsets.display();'>Invert</button><button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.mirrorM(algsets.sets["+i+"]["+j+"]);algsets.display();'>Mirror M</button><button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.mirrorS(algsets.sets["+i+"]["+j+"]);algsets.display();'>Mirror S</button><button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.simplify(algsets.sets["+i+"]["+j+"]);algsets.display();'>Simplify</button><button onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.viewExecution(algsets.sets["+i+"]["+j+"]);'>View Execution</button><button onclick='javascript:algsets.edit("+i+","+j+");'>Edit</button>"+BR;
			}
		}*/
		text="<h2>Algorithms</h2>";
		text+="Number of Sets: "+algsets.sets.length+"."+BR+"<img onclick='javascript:algsets.addSet()' src='icon/icon_+.png' alt='+'/>"+BR;
		
		for(i=0;i<algsets.sets.length;++i){
			text+='<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">'+algsets.setnames[i]+":<img onclick='javascript:algsets.addAlg("+i+")' src='icon/icon_+.png' alt='+'/></h3></div><div class='panel-body'>";
			for(j=0;j<algsets.sets[i].length;++j){
				cstate=(function(alg,undefined){
					var cube,a,b;
					cube=new Cube();
					cube.move(alg);
					a=cube.asString();
					b=[];
					b.push(["X"  ,a[47],a[46],a[45],"X"  ]);
					b.push([a[36],a[0] ,a[1] ,a[2] ,a[11]]);
					b.push([a[37],a[3] ,a[4] ,a[5] ,a[10]]);
					b.push([a[38],a[6] ,a[7] ,a[8] , a[9]]);
					b.push(["X"  ,a[18],a[19],a[20],"X"  ]);
					return b;
				}(algsets.invert(algsets.sets[i][j])));
				text+="<div class='case'>"+algsets.sets[i][j]+algsets.cubeimage(cstate)
				+"<div class='btn-group' role='group'>"
				+"<button type='button' class='btn btn-default' onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.turnAlg(algsets.sets["+i+"]["+j+"]);algsets.display();'>Invert</button>"
				+"<button type='button' class='btn btn-default' onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.mirrorM(algsets.sets["+i+"]["+j+"]);algsets.display();'>Mirror M</button>"
				+"<button type='button' class='btn btn-default' onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.mirrorS(algsets.sets["+i+"]["+j+"]);algsets.display();'>Mirror S</button>"
				+"<button type='button' class='btn btn-default' onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.simplify(algsets.sets["+i+"]["+j+"]);algsets.display();'>Simplify</button>"
				+"<button type='button' class='btn btn-default' onclick='javascript:algsets.sets["+i+"]["+j+"]=algsets.viewExecution(algsets.sets["+i+"]["+j+"]);'>View Execution</button>"
				+"<button type='button' class='btn btn-default' onclick='javascript:algsets.edit("+i+","+j+");'>Edit</button></div></div><hr>";
			}
			text+="</div></div>";
		}
		text+=BR+"<div onclick='hide(\"algSets\")'>"+language.back+"</div>";
		document.getElementById("algSets").innerHTML=text;
	},
	invert:function(){
		var alg,out,i;
		alg=arguments[0].split(" ");
		out=[];
		
		for(i=0;i<alg.length;++i){
			if(alg[i].length===0)break;
			if(alg[i].length===1)out.push(alg[i]+"'");
			if(alg[i].length===2){
				if(alg[i][1]==="2")out.push(alg[i]);
				if(alg[i][1]==="'")out.push(alg[i][0]);
			}
			if(alg[i].length>2)break;
		}
		return out.reverse().join(" ");
	},
	cubeimage:function (state){
		var text,color,i,j;
		text="<div class='cube'>";
		for(i=0;i<state.length;++i){
			for(j=0;j<state[i].length;++j){
				color=algsets.stickerColors[state[i][j]]||"white";
				text+="<div class='sticker "+color+"'>&nbsp;</div>";
			}
		}
		return text+"</div>";
	},
	stickerColors:{
		"U":"black",
		"F":"green",
		"L":"orange",
		"R":"red",
		"B":"blue",
		"D":"yellow",
		"X":"white"
	},
	addSet:function(){
		if(a=prompt("Geben Sie Ihren AlgSetNamen hier ein.")){
			algsets.setnames.push(a);
			if(typeof algsets.registeredSets[a.toUpperCase()]!=="undefined"){
				if(confirm("This AlgSet is already defined. Do you want to overwrite the current definition (OK) or use it for your AlgSet (Cancel)?")){
					algsets.sets.push(algsets.registeredSets[a.toUpperCase()]);
				}else{
					algsets.sets.push([]);
				}
			}else{
				algsets.sets.push([]);
			}
			algsets.display();
		}
	},
	addAlg:function(setid){
		algsets.sets[setid].push(prompt("Enter your Algorithm hiere. Allowed moves: R,U,F,D,B,L,R',U',F',D',B',L',R2,U2,F2,D2,B2,L2"));
		algsets.display();
	},
	formatAlg:function(alg){
		return alg;
	},
	turnAlg:function(alg){
		return cube.cube.invert(alg);
	},
	mirrorS:function(alg){
		return cube.cube.mirrorAcrossS(alg);
	},
	mirrorM:function(alg){
		return cube.cube.mirrorAcrossM(alg);
	},
	simplify:function(alg){
		return cube.cube.simplify(alg);
	},
	viewExecution:function(alg){
		document.getElementById("algSets").innerHTML='<iframe src="https://alg.cubing.net/?alg='+cube.cube.simplify(alg)+'&setup='+cube.cube.invert(alg)+'&view=fullscreen" width="800" height="550"></iframe><div onclick="algsets.display()">'+language.back+'</div>';
		return alg;
	},
	edit:function(i,j){
		algsets.sets[i][j]=prompt("Put it your new Algorithm here. Allowed moves: R,U,F,D,B,L,R',U',F',D',B',L',R2,U2,F2,D2,B2,L2",algsets.sets[i][j]);
		algsets.display();
	}
}

var relayNumbers;
relayNumbers=[];

function displayRelayOption(){
	var text,i;
	text="<button onclick='relayNumbers[1]=relayNumbers[5]=relayNumbers[16]=1;displayRelayOption();'>2x2-4x4</button>"+BR+"<button onclick='relayNumbers[1]=relayNumbers[5]=relayNumbers[16]=relayNumbers[17]=1;displayRelayOption();'>2x2-5x5</button>"+BR+BR;
	
	for(i=0;i<timer.scrambleTypes.length;++i){
		if(typeof relayNumbers[i]==="undefined")relayNumbers[i]=0;
		text+=(i+1)+".: "+timer.scrambleNames[i]+"&nbsp;";
		if(relayNumbers[i]<1<<8){
			text+="<img onclick='relayNumbers["+i+"]++;displayRelayOption();' src='icon/icon_+.png' alt='+'/>"
		}else{
			if(timer.relayWarn)text+=language.relayWarnText;
		}
		text+="&nbsp;"+relayNumbers[i]+"&nbsp;";
		if(relayNumbers[i]>0){
			text+="<img onclick='relayNumbers["+i+"]--;displayRelayOption();' src='icon/icon_-.png' alt='-'/>";
		}
		text+=BR;
	}
	document.getElementById("relays").innerHTML=text+BR+"<button onclick='generateRelayCode();hide(\"relays\");'>Finish</button>";
}

function generateRelayCode(){
	var i,j;
	timer.relayCommand="";
	for(i=0;i<relayNumbers.length;++i){
		if(relayNumbers[i]>0){
			for(j=0;j<relayNumbers[i];++j){
				timer.relayCommand+=timer.scrambleTypes[i]+" ";
			}
		}
	}
}

/* importCstimer
 * function currently not working
 */
function importCstimer(code){
	timer={
		running:false,
		zeit:0,
		penalty:'',
		type:"",
		timingMode:1,
		blockTime:1e3,
		blockTimeReturn:3000,
		currentSession:0,
		relayCommand:'2x2 2x2bld',
		version:'2.1.7',
		customAvg:3,
		relayWarn:true,
		sessions:[],
		config:{
			aktualisierungsrate:17,
			results:[]
		}
	};
	eval("cstimer="+code);
	eval("csproperties="+cstimer.properties);
	timer.type=csproperties.scrType;
	for(var i=1;i<csproperties.sessionN;++i){
		timer.sessions[i]={"scrambler":csproperties.scrType,"results":[]};
		for(var j=0,obj;j<eval("cstimer.session"+i).length;++i){
			obj={"zeit":eval("cstimer.session"+i)[j][0][1],"scramble":eval("cstimer.session"+i)[j][1],"penalty":'',"datum":0}
			timer.sessions[i].results.push(obj);
		}
	}
}

musik={
	server:{
		load:function(){
			var src,type,src2,src3;
			src=prompt("Put in the URL here."),
			type=false;
			src3=src.split(".");
			src2=src3[src3.length-1];
			switch(src2){
				case "mp3":
				type="audio/mpeg";
				break;
				case "ogg":
				type="audio/ogg";
				break;
				case "wav":
				type="audio/wav";
				break;
			}
			if(type){
				document.getElementById("musik0").html+="<audio controls autoplay loop><source src='"+src+"' type='"+type+"'/></audio>";
			}else{
				document.getElementById("musik0").innerHTML+="Nicht unterst&uuml;tzter Dateityp!";
			}
		}
	},
	youtube:{
		idlist:[],
		load:function(){
			var id;
			id=prompt("Youtubevideoid hier eingeben:");
			musik.youtube.idlist.push(id);
			musik.youtube.display();	
		},
		loadlist:function(){
			var id,list;
			id=prompt("Youtubevideoid hier eingeben:");
			list=prompt("Youtubevideolistenid hier eingeben:");
			document.getElementById("musik2").innerHTML+='<iframe id="ytplayer" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/'+id+'?autoplay=1&fs=0&disablekb=1&loop=1&autohide=0&list='+list+'" frameborder="0"/>';
		},
		display:function(){
			var i;
			for(i=0;i<musik.youtube.idlist.length;++i){
				document.getElementById("youtubeonevideoload").innerHTML+='<iframe id="ytplayer" type="text/html" width="640" height="390" src="http://www.youtube.com/embed/'+musik.youtube.idlist[i]+'?autoplay=1&fs=0&disablekb=1&loop=1&autohide=0" frameborder="0"/>';
			}
		}
	}
}

function takeabreak(){
	var time;
	time=prompt("How long? (milliseconds)",60000);
	
	if(time>500){
		show('takeabreak');
		setTimeout("hide('takeabreak');",time);
		document.getElementById("takeabreak").innerHTML="<h1>Taking a break right now!</h1>"+BR+"For "+time+" seconds.";
	}
}

function codeeditor(){
	var code;
	code=$("#code-editor").val();
	code=code.replace(/SCRAMBLE/,"<span class='scramble-unstyled'>R U R' U'</span>");
	code=code.replace(/TIME/,"<span class='time-unstyled'>0.000</span>");
	code=code.replace(/TIMES/,"<span class='times-unstyled'></span>");
	code=code.replace(/SESSIONAVG/,"<span class='sessionavg-unstyled'></span>");
	code=code.replace(/NEXT/,"<span class='next-unstyled'>NEXT &gt;</span>");
	code=code.replace(/script/,"");
	$("#movable").html(code);
	resizeStart();
	init();
}

function loadCode(timer){
	var code;
	if(timer=="qqtimer"){//Needs cleanup
		code='<table border="1" cellpadding="5" cellspacing="0" width="100%"> <tbody><tr> <td colspan="3" id="menu" bgcolor="#00ff00"> <table cellpadding="2" cellspacing="0" width="100%"> <tbody><tr> <td> <font face="Arial" size="3">Scramble type:</font> <select id="optbox" size="1" onchange="rescramble(true);"><option onclick="show(\'scrambler\');">Select scrambler</option></select> </td><td> <font face="Arial" size="3">Scramble length:</font> <input value="25" id="leng" size="3" maxlength="3" onchange="rescramble3();"> </td><td><font face="Arial" size="3">Session:</font> <select id="sessbox" size="1" onchange="getSession(); loadList(); getStats(true);"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option></select> <td><a href="http://mzrg.com/qqtimer/megadoc.html" target="_blank" style="color: black;" class="a">Help!</a></td></tr></tbody></table> </td></tr><tr> <td colspan="3"> <span id="scramble" style="font-size: 16px;">SCRAMBLE</span><span id="getlast" onclick="getlastscramble()" class="a">NEXT</span> <span id="debug"></span> </td></tr><tr> <td align="center"> <span id="showOpt" onclick="toggleOptions()" class="a">show</span> timer options<br><span id="theTime" style="font-family: sans-serif; font-weight: bold; font-size: 2em; ">TIME</span><br>that time was: <span onclick="changeNotes(0);" class="a">no penalty</span> <span onclick="changeNotes(2);" class="a">+2</span> <span onclick="changeNotes(1);" class="a">DNF</span> | <span onclick="comment();" class="a">leave comment</span> </td><td style="width: 15em;"> <div id="theList" style="overflow-y: scroll; height: 16em;">TIMES</div></td><td style="width: 15em;"> <div id="stats" style="overflow-y: scroll; height: 16em;">SESSIONAVG</div></td></tr><tr id="options" style="display: none;"><td colspan="3"> <table width="100%"><tbody><tr><td align="left"> timer updating is <span id="toggler" onclick="toggleTimer()" class="a">on</span><br>timer precision is <span id="millisec" onclick="toggleMilli()" class="a">1/100 sec</span><br>bld mode is <span id="bldmode" onclick="toggleBld()" class="a">off</span><br>entering in times with <span id="inputTimes" onclick="toggleInput()" class="a">timer</span><br><span onclick="increaseSize()" class="a">increase</span>/<span onclick="decreaseSize()" class="a">decrease</span> timer size<br><span onclick="increaseScrambleSize()" class="a">increase</span>/<span onclick="decreaseScrambleSize()" class="a">decrease</span> scramble size<br>using <span id="inspec" onclick="toggleInspection()" class="a">no</span> inspection<br><span id="avgn" onclick="toggleAvgN()" class="a">not using</span> average of <input id="avglen" value="50" size="4" maxlength="4" onchange="changeAvgN()">&nbsp;<br><span id="mon" onclick="toggleMoN()" class="a">not using</span> mean of <input id="molen" value="3" size="4" maxlength="4" onchange="changeMoN()">&nbsp;<br>style: <span onclick="setCookie(&#39;style&#39;,0);window.location.reload();" class="a">Gottlieb</span> | <span onclick="setCookie(&#39;style&#39;,1);window.location.reload();" class="a">Tamanas</span> </td><td align="right"> > * monospace scrambles are <span id="monospace" onclick="toggleMono()" class="a">off</span><br>top bar color: #<input id="tcol" value="00ff00" size="6" maxlength="6" onchange="changeColor()"><br>background color: #<input id="bcol" value="white" size="6" maxlength="6" onchange="changeColor()"><br>text color: #<input id="fcol" value="black" size="6" maxlength="6" onchange="changeColor()"><br>link color: #<input id="lcol" value="blue" size="6" maxlength="6" onchange="changeColor()"><br>highlight color: #<input id="hcol" value="yellow" size="6" maxlength="6" onchange="changeColor()"><br>memorization colour: #<input id="memcol" value="green" size="6" maxlength="6" onchange="changeColor()"><br><span class="a" onclick="resetColors()">reset</span> colors to default<br><span class="a" onclick="toggleNightMode()">toggle</span> night mode<br></td></tr></tbody></table> </td></tr><tr id="avgdata" style="display: none; "> </tr><tr id="import" style="display: none;"> <td style="border: medium none ;"> <textarea cols="50" rows="10" id="importedTimes"></textarea> <div onclick="importCode();" class="a">import</div></td></tr></tbody></table> </div><div id="footer">&nbsp;</div><style>#movable{color:black !important;}';
		$("#code-editor").val(code);
	}else if(timer=="httimer"){
		code='<div class="scramble"></div><div class="next">Next &gt;</div><div class="times"><table class="table table-striped table-condensed table-hover"><tbody><tr><td colspan="3">Solve Times</td></tr><tr><td>1.:</td><td>Your first time</td><td><select><option>OK</option><option>+2</option><option>+4</option><option>DNF</option><option>Delete</option></select></td></tr></tbody></table></div><div class="sessions"><div class="sessionlist"></div><div class="sessionavg"></div></div><div class="time">0.000</div><div class="goal-time" style="visibility:hidden">Goal Time</div><div class="scrambleimg">Scramble image not available.</div>';
		$("#code-editor").val(code);
	}else if(timer=="ppt"){
		code='<style>.time-unstyled{position:absolute;left:0;right:0;text-align:center;top:40%;color:black;font-size:10em;}#times,#statistics,#scrambleI{width:33%;position:absolute;bottom:0;border-top:1px solid grey;border-left:1px solid grey;height:25%;}.scramble-unstyled{text-align:center;position:absolute;left:0;right:0;top:80px;font-size:18pt;}#times{left:0;}#statistics{left:33.3%;}#scrambleI{left:66.6%;}#hand-left{position:absolute;left:50px;top:35%;}#hand-right{position:absolute;top:35%;right:50px;}</style>TIMESCRAMBLE<div id="times">TIMES</div><div id="statistics">SESSIONAVG</div><div id="scrambleI">ScrambleImage goes here</div><img src="https://lh4.ggpht.com/WDeNuUqNfaI5w2GxL2JaMpVJcdZRLA2hPadVbP_d8p4Cwh8qXUveEvVQC9HAVq30zmvS=w300" width="255" id="hand-left"/><img src="https://lh4.ggpht.com/WDeNuUqNfaI5w2GxL2JaMpVJcdZRLA2hPadVbP_d8p4Cwh8qXUveEvVQC9HAVq30zmvS=w300" width="255" id="hand-right"/>';
		$("#code-editor").val(code);
	}
}

function show(id){
	document.getElementById(id).style.visibility="visible";
}

function hide(id){
	document.getElementById(id).style.visibility="hidden";
}