sideMapping={"R":"RIGHT","L":"LEFT","B":"BACK","U":"UP","D":"DOWN","F":"FRONT"};
sideRotationMapping={"RIGHT":["UP","BACK","DOWN","FRONT"],"UP":["FRONT","LEFT","BACK","RIGHT"],"FRONT":["UP","RIGHT","DOWN","LEFT"],"DOWN":["FRONT","RIGHT","BACK","LEFT"],"BACK":["DOWN","RIGHT","UP","LEFT"],"LEFT":["FRONT","DOWN","BACK","UP"]};
function applyMove(move,position,size){
	var movelength=move.length,direction,layers,face;
	if(move.length==1){
		face=move;
	}else if(move.length==2){
		if(move[1]=="'"||move[1]=="2"){
			direction=move[1];
			face=move[0];
		}else{
			face=move[1];
			layers=move[0];
		}
	}else if(move.length==3){
		direction=move[2];
		layers=move[0];
		face=move[1];
	}
	if(typeof direction=="undefined"){
		direction=1;
	}else if(direction=="2"){
		direction=2;
	}else if(direction=="'"){
		direction=3;
	}
	face=sideMapping[face];
	
	var newPosition=JSON.parse(JSON.stringify(position));
	
	for(var i=0;i<direction;i++){
		//for(var j=0;j<Math.floor(size/2);j++){
			for(var l=0;l<size-1;l++){
				newPosition[face][l][size-1]=position[face][0][l];
				newPosition[face][0][l]=position[face][size-1-l][0];
				newPosition[face][size-1-l][0]=position[face][size-1][size-1-l];
				newPosition[face][size-1][size-1-l]=position[face][l][size-1];
			}
		//}
		for(var m=0;m<sideRotationMapping[face].length;m++){
			switch(face){
				case "FRONT":
					var source=size-1,target=size-1;
					if(m==1||m==2)source=0;
					if(m<2)target=0;
					for(var o=0;o<size;o++){
						if(m%2==0){
							newPosition[sideRotationMapping[face][(m+1)%4]][o][target]=position[sideRotationMapping[face][m]][source][o];
						}else{
							newPosition[sideRotationMapping[face][(m+1)%4]][target][o]=position[sideRotationMapping[face][m]][o][source];
						}
					}
				break;
				case "BACK":
					var source=0,target=0;
					if(m==1||m==2)source=size-1;
					if(m<2)target=size-1;
					for(var o=0;o<size;o++){
						if(m%2==0){
							newPosition[sideRotationMapping[face][(m+1)%4]][size-1-o][target]=position[sideRotationMapping[face][m]][source][o];
						}else{
							newPosition[sideRotationMapping[face][(m+1)%4]][target][size-1-o]=position[sideRotationMapping[face][m]][o][source];
						}
					}			
				break;
				case "LEFT":case "RIGHT":
					var column;
					if(face=="LEFT"){
						column=0;
					}else{
						column=size-1;
					}
					//sideRotationMapping[face][m]
					for(var n=0;n<size;n++){
						newPosition[sideRotationMapping[face][(m+1)%4]][n][column]=position[sideRotationMapping[face][m]][n][column];	
					}
				break;
				case "UP":case "DOWN":
				var row;
					if(face=="DOWN"){
						row=size-1;
					}else{
						row=0;
					}
					//sideRotationMapping[face][m]
					for(var n=0;n<size;n++){
						newPosition[sideRotationMapping[face][(m+1)%4]][row][n]=position[sideRotationMapping[face][m]][row][n];	
					}
				break;
			}
		}
	}
	return newPosition;
}

function SOLVED_POCKET_CUBE(){return {"RIGHT":[["R","R"],["R","R"]],"UP":[["S","S"],["S","S"]],"FRONT":[["U","U"],["U","U"]],"DOWN":[["G","G"],["G","G"]],"LEFT":[["O","O"],["O","O"]],"BACK":[["B","B"],["B","B"]]};
}

function executeAlg(alg,position,size){
	alg=alg.split(" ");
	for(var i=0;i<alg.length;i++){
		if(position[i]!=""&&position[i]!=" "){
			//position=applyMove(alg[i],position,size);
			console.log(alg[i]+position+size);
		}
	}
	return position;
}