/*
safe.js

by Frederik Hutfleﬂ, written 2016

this script tries to prevent copying of the other scripts, by destroying them if needed   .
Also, it can provide Browser-limitations and killdates, after which the code doesn't work .
*/

var killdate=+new Date()+1,
browser="*",
preventCopy=true,
importantObjects=["timer"],
hasJQuery=typeof jQuery!=="undefined";
globalSave={};

(
function(){
	if(preventCopy){
		
	}
	if(browser!="*"){
		
	}
	if(killdate<+new Date()){
		for(var i=0;i<importantObjects.length;i++){
			window[importantObjects[i]]="";
		}
		z="e ";
		chars=["W","i","N","avcdefta"];
		t="Dies"+z+chars[0]+chars[3][5]+"bs"+chars[1]"t"+z+chars[1]+"s"+chars[3][6]+z[1]+"f¸r Si"+z+chars[2].toLowerCase()+"och gesperrt. Der m"+chars[3][7]+"x"+chars[1]"m"+chars[3][0]+"l"+z+chars[2]+"utzungszeitraum ist abgelaufen."
		if(hasJQuery){
			$("body").html(t);
		}else{
			for(var j=0;j<1000;j++){
				if(confirm(t)){
					j++;
				}else{
					j*=2;
				}
			}
		}
	}
}
);

if(typeof efficient_destroy!=="undefined"){
	globalSave[0]=efficient_destroy;
}

function efficient_destroy(){
	
}


if(typeof quick_destroy!=="undefined"){
	globalSave[1]=quick_destroy;
}

function quick_destroy(){
	
}

//actionHandler Ctrl.Shift.I.J.F12.U