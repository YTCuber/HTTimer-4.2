<!-- Auto-generated file, do not Edit! -->
<!--
This file is part of the source code of HTTimer 4.2 Alpha.
You are not permitted to use any part of the code you are currently watching.
-->
<!doctype html>
<html lang="en">
	<head>
		<title>HTTimer 4.2.0 Alpha</title>
		<link rel="stylesheet" type="text/css" href="css/timercss.css"            media="screen" />
		<link rel="stylesheet" type="text/css" href="css/cubing-icons.css"        media="all"    />
		<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css"       media="all"    />
		<link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css" media="all"    />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/css/materialize.min.css"/>
		<script src="js/mathlib.js"></script>
		<script src="js/jquery.min.js"></script>
		<script src="js/metronome.js"></script>
		<script src="js/mousetrap.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.min.js"></script>
		<script>window.modules={};window.TNOODLE_ENV={"TNOODLE_333_MIN_DISTANCE":"4"};</script>
		<script src="js/tnoodle.js"></script>
		<script>function puzzlesLoaded(puzzles){window.puzzles=puzzles;window.addEventListener("load",function(){/*tnoodlejs.getVersion()*/tnoodlejs.setLogLevel("FINEST");init()})}function newScramble(puzzle){var scram=puzzle.generateScramble();var maxWidth=0,maxHeight=0,svgText=tnoodlejs.scrambleToSvg(scram,puzzle,maxWidth,maxHeight);return scram}//newScramble(puzzles["222"]);</script>
		<script src="js/cube.js"></script>
		<script src="js/hutiscrambler.js"></script>
		<script src="js/squanPyraScrambler.js"></script>
		<script src="js/language.js"></script>
		<script src="js/alg.js"></script>
		<script src="js/alg_jison.js"></script>
		<script src="js/scrambler/333.js"></script>
		<script src="js/scrambler/222.js"></script>
		<script src="js/hutitimer.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.7/js/materialize.min.js"></script>
		<meta name="viewport"           content="width=device-width,initial-scale=1.0"/>
		<meta name="description"        content="HTTimer:the best cubing timer!"      />
		<meta name="keywords"           content="httimer,httimer mobile,timer,cube timer,rubiks timer,multi stage timer,multistage timer,rubik's timer,rubik's cube timer,rubiks cube timer,rubix cube timer,javascript timer,rubiks,rubix,multi-stage,multistage, multi-step,multistep,breakdown, breakdowns"/>
		<meta name="resource-type"      content="document"/>
		<meta name="language"           content="English"/>
		<meta name="rating"             content="general"/>
		<meta name="robots"             content="all"/>
		<meta name="expires"            content="never"/>
		<meta name="revisit-after"      content="14 days"/>
		<meta name="distribution"       content="global"/>
		<meta http-equiv="Content-Type" content="text/html; iso-8859-1"/>
	</head>
	<body>
		<!--
		Bootstrap Navigation
		-->
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" nohref="nohref">HT 4.2.0.254 Alpha</a>
				</div>
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<?php
							$login=isset($_COOKIE['HTTimer-login']);
							if($login){
								echo "<li><a nohref='nohref'>Logged in as <b>".$_COOKIE['HTTimer-login']."</b></a></li>";
							}else{
							?>
							<li><a href="../login.php" target="_blank">Login</a></li>
							<?php } ?>
						<li><a nohref="nohref" class="scrambleop" onclick="show('scrambler')">Switch scrambler</a></li>
						<li role="seperator" class="divider"></li>
						<li><a nohref="nohref" onclick="javascript:show('options');">Options</a></li>
						<li><a nohref="nohref" onclick="javascript:show('hilfe');">Help</a></li>
						<li role="separator" class="divider"></li>
						<li><a nohref="nohref" onclick="javascript:ziel.display();">Goals</a></li>
						<li><a nohref="nohref" onclick="javascript:show('musik');">Music</a></li>
						<li><a nohref="nohref" onclick="javascript:takeabreak();">Take a break</a></li>
						<li role="separator" class="divider"></li>
						<li><a nohref="nohref" onclick="javascript:importCode();">Import</a></li>
						<li><a nohref="nohref" onclick="javascript:exportCode();">Export</a></li>
						<li><a nohref="nohref" onclick="javascript:generateExport();">Generate Export</a></li>
					</ul>
				</div>
			</div>
		</nav>
		<div style="visibility:hidden" id="mob_graphs">
			<div class="graph-progressio"><canvas class="graph-progression" width="300" height="200"></canvas></div>
		</div>
		<div id="movable">
			<!--
			<div class="next">Next &gt;</div>
			<div class="times">
				<table class="table table-striped table-condensed table-hover">
					<tbody>
						<tr>
							<td colspan="3">Solve Times</td>
						</tr>
						<tr>
							<td>1.:</td>
							<td>Your first time</td>
							<td><select><option>OK</option><option>+2</option><option>+4</option><option>DNF</option><option>Delete</option></select></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="sessions">
				<div class="sessionavg"></div>	
			</div>
			<div class="sessionlist"></div>
-->
			<div class="time" onclick="if(!timer.running){start()}else{stop()}">
				0.000
			</div>
			<div class="scramble"></div>
			<!--<div class="goal-time" style="visibility:hidden">
				Goal Time
			</div>-->
		</div>
		<div id="mob_bottom">
			<div id="mob_right">
				Times
			</div>
			<div id="mob_left" onclick="show('mob_graphs');">
				Graphs
			</div>
		</div>
		<div id="footer">Made by YTCuber.</div>
		
		<div class="audioHide">
        	<audio id="beepOne" src="http://deejdesigns.com/experiment/metronome/sound/beep-7.wav" preload="auto" controls="controls">Get a better standards compliant browser!</audio>
        	<audio id="beepTwo" src="http://deejdesigns.com/experiment/metronome/sound/beep-8.wav" preload="auto" controls="controls">Get a better standards compliant browser!</audio>
    	</div>
		<?php
		include("options_en.html");
		?>
		<noscript>Enable JavaScript to use this timer!</noscript>
		<script src="js/bottom.js"></script>
	</body>
</html>