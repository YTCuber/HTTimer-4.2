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
		<script src="js/mathlib.js"></script>
		<script src="js/jquery.min.js"></script>
		<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
		<script src="js/metronome.js"></script>
		<script src="js/interact.js"></script>
		<script src="js/mousetrap.js"></script>
		<script src="js/bootstrap.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.3.0/Chart.min.js"></script>
		<script>window.modules={};window.TNOODLE_ENV={"TNOODLE_333_MIN_DISTANCE":"4"};</script>
		<script src="js/tnoodle.js"></script>
		<script>function puzzlesLoaded(puzzles){window.puzzles=puzzles;window.addEventListener("load",function(){/*tnoodlejs.getVersion()*/tnoodlejs.setLogLevel("FINEST");init()})}function newScramble(puzzle){var scram=puzzle.generateScramble();var maxWidth=0,maxHeight=0,svgText=tnoodlejs.scrambleToSvg(scram,puzzle,maxWidth,maxHeight);return scram}//newScramble(puzzles["222"]);</script>
		<script src="js/cube.js"></script>
		<script type="text/javascript" src="http://www.qqtimer.net/scramble_333_edit.js"></script>
		<script src="js/hutiscrambler.js"></script>
		<script src="js/squanPyraScrambler.js"></script>
		<script src="js/language.js"></script>
		<script src="js/alg.js"></script>
		<script src="js/alg_jison.js"></script>
		<script src="js/hutitimer.js"></script>
		<meta name="viewport"           content="width=device-width,initial-scale=1.0"/>
		<meta name="description"        content="HTTimer:the best cubing timer!"      />
		<meta name="keywords"           content="httimer,timer,cube timer,rubiks timer,multi stage timer,multistage timer,rubik's timer,rubik's cube timer,rubiks cube timer,rubix cube timer,javascript timer,rubiks,rubix,multi-stage,multistage, multi-step,multistep,breakdown, breakdowns"/>
		<meta name="resource-type"      content="document"                            />
		<meta name="language"           content="English"                             />
		<meta name="rating"             content="general"                             />
		<meta name="robots"             content="all"                                 />
		<meta name="expires"            content="never"                               />
		<meta name="revisit-after"      content="14 days"                             />
		<meta name="distribution"       content="global"                              />
		<meta http-equiv="Content-Type" content="text/html; iso-8859-1"               />
		<script type="text/javascript">
		$(function(){
			$("#movable > div").draggable({handle:"div"});
		});
		</script>
	</head>
	<body>
		<div class="options" style="visibility:hidden;" id="optionen">
			<div class="navbar-header">
				<a class="navbar-brand" nohref="nohref">HT 4.2.0.259 Alpha</a>
			</div>
			<?php
			$login=isset($_COOKIE['HTTimer-login']);
			if($login){
				echo "<li><a nohref='nohref'>Logged in as <b>".$_COOKIE['HTTimer-login']."</b></a></li>";
			}else{
			?>
			<li><a href="../login.php" target="_blank">Login</a></li>
			<?php } ?>
			<li><a nohref="nohref" class="scrambleop" onclick="show('scrambler')">Switch scrambler</a></li>
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
			<li role="separator" class="divider"></li>
			<li><a nohref="nohref" onclick="javascript:algsets.display();">AlgSets</a></li>
			<li><a nohref="nohref" class="edit">Edit</a></li>
			<li><a nohref="nohref" onclick="javascript:show('codeeditor');">Edit Code <span class="badge">ADVANCED</span></a></li>
			<li><a nohref="nohref" onclick="javascript:show('hilfe');">Open Help</a></li>
			<li role="separator" class="divider"></li>
			<li><a href="http://htsoftware.boards.net" target="_blank">Submit bug</a></li>
			<div onclick="hide('optionen');">close Options</div>
		</div>

		<div id="remove"></div>
		<div id="add">
			<div class="times"></div>
			<div class="scramble"></div>
			<div class="next">Next &gt;</div>
			<div class="time">0.000</div>
			<div class="scrambleimg" id="scrambleImage">Scramble image not available.</div>
			<div class="sessions"><div class="sessionlist"></div><div class="sessionavg"></div></div>
			<div class="graph-progressio"><canvas class="graph-progression" width="300" height="200"></canvas></div>
			<div class="metronome">
				<br />
				<div class="beatIndicatorContainer">
					<div class="beatIndicator" class="beep">1</div>
				</div>

				<div class="settingsContainer">
					<div class="settings">
						<div>
							<label>Beats Per Minute:</label>
							<input type="text" name="bpm" class="bpm" value="100"/>
							<input type="button" name="bpmPlus" class="bpmPlus" class="plusMinus" value="+"/>
							<input type="button" name="bpmMinus" class="bpmMinus" class="plusMinus" value="-"/>
							<input type="button" name="start" class="start" value="start"/>
						</div>
						<div>
							<label>Beats Per Bar:</label>
							<input type="text" name="bpb" class="bpb" value="4"/>
							<input type="button" name="bpbPlus" class="bpbPlus" class="plusMinus" value="+"/>
							<input type="button" name="bpbMinus" class="bpbMinus" class="plusMinus" value="-"/>
							<input type="button" name="stop" class="stop" value="stop"/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="vertical-line">&nbsp;</div>
		<div class="horizontal-line">&nbsp;</div>
		<div id="movable">
			<div class="menulogo" onclick="show('optionen');">&#9776;</div>
			<div class="scramble"></div>
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

			<div class="time" onclick="var a=prompt('Set time');if(a){timer.zeit=Math.floor(+new Date()-a-80);stop();}">
				0.000
			</div>
			<div class="goal-time" style="visibility:hidden">
				Goal Time
			</div>
			<div class="scrambleimg">
				Scramble image not available.
			</div>
		</div>
		<div id="footer">Made by YTCuber.</div>
		
		<div class="audioHide">
        	<audio id="beepOne" src="http://deejdesigns.com/experiment/metronome/sound/beep-7.wav" preload="auto" controls="controls">Get a better standards compliant browser!</audio>
        	<audio id="beepTwo" src="http://deejdesigns.com/experiment/metronome/sound/beep-8.wav" preload="auto" controls="controls"><!--display the warning once is enough--></audio>
    	</div>
		
		<?php
		include("options_en.html");
		?>
		<noscript>Enable JavaScript to use this timer!</noscript>
		<script src="js/bottom.js"></script>
		<script>
		$('#movable > div').each(function(){
			$(this).prepend("<div class='handle'>Handle</div>");
		});
		$('.handle').toggle();
			
		$('.edit').on('click', function(){
			$("#movable").toggleClass("editActive");
			$('#movable > div').each(function(){
				$(this).toggleClass("resize");
				if($(this).find('.handle').length==0){
					$(this).prepend("<div class='handle' style='display:none'>Handle</div>");
				}
			});
			$('.handle').toggle();
			$("#add").toggle();//forget about remove here
		});
		
		$("#movable > div").on("dblclick",function(){
			if($("#movable").hasClass("editActive")){
				$(this).remove();
			}
		});
		$('#add>div').on('click',function(){
			var newElement = $(this).clone(true);
			newElement.unbind('click');
			$(newElement).addClass('resize');
			$(newElement).prepend("<div class='handle'>Handle</div>");
			$('div#movable').append(newElement);
			resizeStart();
		});
		
		function resizeStart(){
			interact('.resize')
			  .resizable({
				preserveAspectRatio: false,
				edges: { left: true, right: true, bottom: true, top: true }
			  })
			  .on('resizemove', function (event) {
				var target = event.target,
					x = (parseFloat(target.getAttribute('data-x')) || 0),
					y = (parseFloat(target.getAttribute('data-y')) || 0);
				target.style.width  = event.rect.width + 'px';
				target.style.height = event.rect.height + 'px';
				x += event.deltaRect.left;
				y += event.deltaRect.top;
				target.style.webkitTransform = target.style.transform =
					'translate(' + x + 'px,' + y + 'px)';

				target.setAttribute('data-x', x);
				target.setAttribute('data-y', y);
			  });
			$("#movable > div").draggable({ handle: "div" });
			$("#movable > div").on("dblclick",function(){
				if($("#movable").hasClass("editActive")){
					$(this).remove();
				}
			});
		}
		resizeStart();
		</script>
	</body>
</html>