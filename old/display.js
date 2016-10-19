colorClassMapping={"G":"green","B":"blue","U":"green","G":"yellow","S":"black","Y":"grey","R":"red","O":"orange"}
function generateSide(side,sidename){
	var i,j,text="",$sticker,
	$side=$("<div class='side "+sidename+"'></div>");
	for(i=0;i<side.length;i++){
		for(j=0;j<side[i].length;j++){
			$sticker=$("<div class='sticker'></div>");
			$sticker.addClass(colorClassMapping[side[i][j]]);
			$side.append($sticker);
		}
	}
	return $side;
}
function generateCube(cubeData){
	var i,sides=["UP","LEFT","FRONT","RIGHT","BACK","DOWN"],
	$cube=$("<div class='cube'></div>");
	for(i=0;i<sides.length;i++){
		$cube.append(generateSide(cubeData[sides[i]],sides[i].toLowerCase()));
	}
	return $cube;
}