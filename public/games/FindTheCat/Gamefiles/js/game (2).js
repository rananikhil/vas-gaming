////////////////////////////////////////////////////////////
// GAME
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */
var textStartButton = 'TAP TO BEGIN'; //text for start button
var textGuide1 = 'Turn on speaker to play this game,\nuse earphone for better experience.'; //text for landing instruction
var textGuide2 = 'Listen to left and right speaker to find the invisible cat,\nthe closer you are to the cat the louder the sound is.'; //text for game instruction
var showInstructionOnce = true; //show game instruction once

var gameTimer = 91000; //game countdown timer
var spotTargetRange = 80; //range to spot the cat
var spottedTimer = 1500; //timer to spotted cat when in range

var kittySoundPlayTImer = 1500; //timer to play kitty sound
var volumeRangeMaster = 1.5; //master volume in percent
var volumeRangeSecond = 3; //second volume in percent

var maxEyes = 20; //total eyes to randomize

var indicatorFoundColour = '#FF7F00'; //cursor spotted colour
var indicatorFoundStroke = 4; //cursor spotted stroke number
var indicatorColour = '#ffffff'; //cursor colour
var indicatorStroke = 2; //cursor stroke number
var indicatorWidth = 30; //cursor circle width
var indicatorWidthMin = 10; //cursor circle minimum width
var indicatorWidthFound = 20; //cursor circle spotted width
var indicatorPercent = 1.5; //circle percent change in distance

var background_arr = ['assets/background1.png','assets/background2.png']; //background image
var cat_arr = ['assets/kitty_01.png','assets/kitty_02.png','assets/kitty_03.png']; //kitty image

var textResultGood = 'Congratulation, you found [NUMBER] cats!'; //text result for score more than 1
var textResultBad = 'Oh no, you didn\'t find any cat!'; //text result for 0 score
var textReplayButton = 'TAP TO REPLAY'; //text for replay button

var exitMessage = 'Are you sure you want\nto quit the game?'; //quit game message

//Social share, [SCORE] will replace with game time
var shareEnable = true; //toggle share
var shareText ='Share your score'; //text for share instruction
var shareTitle = 'I found [SCORE] cats!';//social share score title
var shareMessage = 'Hey I found [SCORE] cats on Find the Cat game! Challenge me now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
 
var playerData = {timer:0, score:0};
var gameData = {bgNum:0, kittyNum:0, kittySoundNum:1, instructionCon:false, findX:0, findY:0, kittySoundStart:0, kittySoundEnd:0, spotTargetStart:0, spotTargetEnd:spottedTimer, spotTargetCon:false, reveal:false}
var indicatorData = {width:0, drawW:0, drawWEase:0};
var indicatorMeterData = {width:0, drawW:0, drawWEase:0};

var eyeInterval_arr = [];
var dogs_arr = [];

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	buttonStart.cursor = "pointer";
	buttonStart.addEventListener("click", function(evt) {
		playSound('soundGrass');
		goPage('game');
	});
	
	buttonReplay.cursor = "pointer";
	buttonReplay.addEventListener("click", function(evt) {
		playSound('soundGrass');
		goPage('game');
	});
	
	iconFacebook.cursor = "pointer";
	iconFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	iconTwitter.cursor = "pointer";
	iconTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	iconWhatsapp.cursor = "pointer";
	iconWhatsapp.addEventListener("click", function(evt) {
		share('whatsapp');
	});
	
	//confirm
	buttonConfirm.cursor = "pointer";
	buttonConfirm.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleConfirm(false);
		stopGame(true);
		goPage('main');
	});
	
	buttonCancel.cursor = "pointer";
	buttonCancel.addEventListener("click", function(evt) {
		playSound('soundClick');
		toggleConfirm(false);
	});
	
	itemExit.addEventListener("click", function(evt) {
	});
	
	//options
	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleGameMute(true);
	});
	
	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleGameMute(false);
	});
	
	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
	});
	
	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		toggleOption();
	});
	
	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(evt) {
		toggleConfirm(true);
		toggleOption();
	});
}

function buildInGameButton(){
	if($.browser.mobile || isTablet){
		gameData.findX = (canvasW/2);
		gameData.findY = (canvasH/2);
	}
	
	stage.on("stagemousemove", function(evt) {
		gameData.findX = (evt.stageX)-(canvasContainer.x);
		gameData.findY = (evt.stageY)-(canvasContainer.y);
	});
 }


/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	mainContainer.visible=false;
	gameContainer.visible=false;
	resultContainer.visible=false;
	
	stopAnimateButton(buttonStart);
	stopAnimateButton(buttonReplay);
	
	var targetContainer = ''
	switch(page){
		case 'main':
			targetContainer = mainContainer;
			startAnimateButton(buttonStart);
		break;
		
		case 'game':
			targetContainer = gameContainer;
			startGame();
		break;
		
		case 'result':
			targetContainer = resultContainer;
			startAnimateButton(buttonReplay);
			
			var resultText = playerData.score <= 0 ? textResultBad : textResultGood;
			resultText = resultText.replace('[NUMBER]', playerData.score);
			txtScore.text = resultText;
			
			saveGame(playerData.score);
			playSound('soundGameover');
		break;
	}
	
	targetContainer.alpha=0;
	targetContainer.visible=true;
	$(targetContainer)
	.clearQueue()
	.stop(true,true)
	.animate({ alpha:1 }, 500);
	
	resizeCanvas();
}

/*!
 * 
 * START GAME - This is the function that runs to start play game
 * 
 */
function startGame(){
	playerData.score = 0;
	$('#canvasHolder').addClass('hideCursor');
	
	TweenMax.killTweensOf(txtGuide2);
	
	var showInstruction = true;
	if(showInstructionOnce && gameData.instructionCon){
		showInstruction = false;
	}
	
	if(showInstruction){
		txtGuide2.alpha = 1;
	}
	gameData.instructionCon = true;
	
	toggleGameTimer(true);
	createKitty();
}

 /*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	$('#canvasHolder').removeClass('hideCursor');
	
	toggleGameTimer(false);
}

/*!
 *
 * SAVE GAME - This is the function that runs to save game
 *
 */
function saveGame(score){
    /*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 * 
 * START ANIMATE BUTTON - This is the function that runs to play blinking animation
 * 
 */
function startAnimateButton(obj){
	obj.alpha=.3;
	$(obj)
	.animate({ alpha:1}, 500)
	.animate({ alpha:.3}, 500, function(){
		startAnimateButton(obj);	
	});
}

/*!
 * 
 * STOP ANIMATE BUTTON - This is the function that runs to stop blinking animation
 * 
 */
function stopAnimateButton(obj){
	obj.alpha=.3;
	$(obj)
	.clearQueue()
	.stop(true,true);
}


/*!
 * 
 * BACKGROUND LOAD - This is the function that runs to randomize background
 * 
 */
function loadBackground(){
	for(n=0;n<background_arr.length;n++){
		$.background[n].visible = false;
	}
	gameData.bgNum = Math.floor(Math.random()*background_arr.length);
	$.background[gameData.bgNum].visible = true;	
	
	createEyes();
}

/*!
 * 
 * CREATE EYES - This is the function that runs to create randomize eyes
 * 
 */
function createEyes(){
	removeEyes();
	for(n=0; n<maxEyes; n++){
		$.eye[n] = eye.clone();	
		$.eye[n].x = Math.floor(Math.random()*(canvasW/100 * 80)) + (canvasW/100 * 10);
		$.eye[n].y = Math.floor(Math.random()*(canvasH/100 * 80)) + (canvasH/100 * 10);
		$.eye[n].rotation = (Math.random()*60) - (30)
		
		eyeContainer.addChild($.eye[n]);
		eyeInterval_arr.push(n);
		setEyeInterval(n);
	}
}

function removeEyes(){
	for(n=0; n<eyeInterval_arr.length; n++){
		clearInterval(eyeInterval_arr[n]);
		eyeInterval_arr[n] = null;
		TweenMax.killTweensOf($.eye[n]);
	}
	eyeContainer.removeAllChildren();
}

/*!
 * 
 * EYES BLINKING ANIMATION - This is the function that runs to animate eye blink
 * 
 */
function setEyeInterval(num){
	var randomTime = (Math.random()*10)*500;
	eyeInterval_arr[num] = setInterval(function(){
		clearInterval(eyeInterval_arr[num]);
		eyeInterval_arr[num] = null;
		blidEye(num);	
	}, randomTime);
}

function blidEye(num){
	TweenMax.killTweensOf($.eye[num]);
	
	$.eye[num].alpha = 1;
	TweenMax.to($.eye[num], .3, {alpha:0, overwrite:true, onComplete:function(){
		TweenMax.to($.eye[num], .1, {alpha:1, overwrite:true, onComplete:function(){
			setEyeInterval(num);	
		}});
	}});
}

/*!
 * 
 * CREATE KITTY - This is the function that runs to create kitty
 * 
 */
function createKitty(){
	toggleIndicator(true);
	gameData.spotTargetCon = false;
	gameData.reveal = false;
	
	for(n=0;n<cat_arr.length;n++){
		$.kitty[n].visible = false;
	}
	gameData.kittyNum = Math.floor(Math.random()*cat_arr.length);
	$.kitty[gameData.kittyNum].visible = true;
	$.kitty[gameData.kittyNum].rotation = (Math.random()*60) - (30)
	if(randomBoolean()){
		$.kitty[gameData.kittyNum].scaleX = -1;	
	}
	
	var newX = Math.floor(Math.random()*(canvasW/100 * 80)) + (canvasW/100 * 10);
	var newY = Math.floor(Math.random()*(canvasH/100 * 80)) + (canvasH/100 * 10);
	
	$.kitty[gameData.kittyNum].x = newX;
	$.kitty[gameData.kittyNum].y = newY;
	$.kitty[gameData.kittyNum].alpha = 0;
	roundFound.alpha = 0;
	
	loadBackground();
	initDrawIndicator();
}

/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
var gameTimerInterval = null;
var gameTimerUpdate = false;
var nowDate;
var beforeDate;

function toggleGameTimer(con){
	if(con){
		beforeDate = new Date();
		playerData.timer = 0;
		playerData.score = 0;
		
		resetKittySound();
		updateGameTimer();
	}
	gameTimerUpdate = con;
}

/*!
 * 
 * GAME LOOP - This is the function that runs for game loop
 * 
 */
function updateGame(){
	if(gameTimerUpdate){
		nowDate = new Date();
		playerData.timer = (nowDate.getTime() - beforeDate.getTime());
		
		var checkKittyTime = (nowDate.getTime() - gameData.kittySoundStart.getTime());
		if(checkKittyTime > gameData.kittySoundEnd){
			loopKittySound();
		}
		
		if(gameData.spotTargetCon && !gameData.reveal){
			var checkKittyOver = (nowDate.getTime() - gameData.spotTargetStart.getTime());
			var kittyAlpha = (checkKittyOver/gameData.spotTargetEnd * 1);
			$.kitty[gameData.kittyNum].alpha = roundFound.alpha = kittyAlpha;
			
			if(checkKittyOver >= gameData.spotTargetEnd){
				revealKitty();
			}
		}
		
		if(playerData.timer > gameTimer){
			stopGame();	
			goPage('result');
		}
		
		updateGameTimer();
		getKittyDistance();
	}
	
	roundFound.x = roundCircle.x = roundFade.x = gameData.findX;
	roundFound.y = roundCircle.y = roundFade.y = gameData.findY;
}

/*!
 * 
 * UPDATE TIMER - This is the function that runs to update game timer
 * 
 */
function updateGameTimer(){
	txtTime.text = millisecondsToTime(gameTimer - playerData.timer);
}

/*!
 * 
 * PLAY KITTY SOUND - This is the function that runs to play kitty sound
 * 
 */
function resetKittySound(){
	gameData.kittySoundStart = new Date();
	gameData.kittySoundEnd = Math.floor(Math.random()*kittySoundPlayTImer)+500;	
}

function loopKittySound(){
	initDrawIndicator();
	
	if(!gameData.reveal){
		gameData.kittySoundNum = Math.floor(Math.random()*4)+1;
		playKittySound('soundMeow'+gameData.kittySoundNum+'Left');
		playKittySound('soundMeow'+gameData.kittySoundNum+'Right');
		resetKittySound();
	}
}

/*!
 * 
 * CURSOR - This is the function that runs to animate cursor
 * 
 */
function toggleIndicator(con){
	roundCircle.visible = roundFade.visible = roundFound.visible = con;
}

function initDrawIndicator(){
	indicatorData.drawW = indicatorData.width * indicatorWidth;
	indicatorData.drawW = indicatorData.drawW < indicatorWidthMin ? indicatorWidthMin : indicatorData.drawW;
	
	if(gameData.spotTargetCon){
		indicatorData.drawW += indicatorWidthFound;
	}
	
	indicatorMeterData.drawW = indicatorData.drawW * 2;
	
	indicatorData.drawWEase = 0;
	TweenMax.killTweensOf(indicatorData);
	TweenMax.to(indicatorData, 1, {drawWEase:indicatorData.drawW, overwrite:true, onUpdate:drawIndicator});
	
	indicatorMeterData.drawWEase = 0;
	TweenMax.killTweensOf(indicatorMeterData);
	TweenMax.to(indicatorMeterData, 1, {drawWEase:indicatorMeterData.drawW, overwrite:true, onUpdate:drawIndicatorMeter});
	
	drawIndicatorMeter();
	roundFade.alpha = 1;
	TweenMax.killTweensOf(roundFade);
	TweenMax.to(roundFade, 1, {alpha:0, overwrite:true});
}

function drawIndicator(){
	roundCircle.graphics.clear();
	roundCircle.graphics.beginStroke(indicatorColour);
	roundCircle.graphics.setStrokeStyle(indicatorStroke);
	roundCircle.graphics.drawCircle(0,0,indicatorData.drawWEase);
	
	roundFound.graphics.clear();
	roundFound.graphics.beginStroke(indicatorFoundColour);
	roundFound.graphics.setStrokeStyle(indicatorFoundStroke);
	roundFound.graphics.drawCircle(0,0,indicatorData.drawWEase);
}

function drawIndicatorMeter(){
	roundFade.graphics.clear();
	roundFade.graphics.beginStroke(indicatorColour);
	roundFade.graphics.setStrokeStyle(indicatorStroke);
	roundFade.graphics.drawCircle(0,0,indicatorMeterData.drawWEase);
}

/*!
 * 
 * GET DISTANCE - This is the function that runs to get kitty distance
 * 
 */
function getKittyDistance(){
	var allDistance = getDistance($.kitty[gameData.kittyNum].x, $.kitty[gameData.kittyNum].y, gameData.findX, gameData.findY);
	var distanceX = gameData.findX - $.kitty[gameData.kittyNum].x;
	var distanceY = gameData.findY - $.kitty[gameData.kittyNum].y;
	
	var leftVolume, rightVolume = 0;
	if(distanceX > 0){
		leftVolume = (10 - (allDistance/100 * volumeRangeMaster))*.1;
		rightVolume = (10 - (allDistance/100 * volumeRangeSecond))*.1;
	}else{
		leftVolume = (10 - (allDistance/100 * volumeRangeSecond))*.1;
		rightVolume = (10 - (allDistance/100 * volumeRangeMaster))*.1;
	}
	
	indicatorData.width = (10 - (allDistance/100 * indicatorPercent))*.1;
	updateKittySound('soundMeow'+gameData.kittySoundNum+'Left', leftVolume);
	updateKittySound('soundMeow'+gameData.kittySoundNum+'Right', rightVolume);
	
	if(allDistance <= spotTargetRange){
		if(gameData.spotTargetStart == 0){
			gameData.spotTargetStart = new Date();
			gameData.spotTargetCon = true;
		}
	}else{
		$.kitty[gameData.kittyNum].alpha = 0;
		roundFound.alpha = 0;
		gameData.spotTargetStart = 0;
		gameData.spotTargetCon = false;	
	}
}

/*!
 * 
 * REVEAL KITTY - This is the function that runs to reveal kitty
 * 
 */
function revealKitty(){
	if(!gameData.reveal){
		playSound('soundHappy');
		gameData.reveal = true;
		$.kitty[gameData.kittyNum].alpha = 1;
		toggleIndicator(false);
		
		playerData.score++;
		setTimeout(function(){
			if(curPage == 'game'){
				playSound('soundScore');
				createKitty();
			}
		}, 1500);
		
		hideGameInstruction();
	}
}

function hideGameInstruction(){
	TweenMax.to(txtGuide2, 1, {alpha:0, overwrite:true});	
}

/*!
 * 
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 * 
 */
function millisecondsToTime(milli) {
      var milliseconds = milli % 1000;
      var seconds = Math.floor((milli / 1000) % 60);
      var minutes = Math.floor((milli / (60 * 1000)) % 60);
	  
	  if(seconds<10){
		seconds = '0'+seconds;  
	  }
	  
	  if(minutes<10){
		minutes = '0'+minutes;  
	  }
	  //return minutes +':'+ seconds + ':' + formatDigit(milliseconds, 2);
	  return minutes +':'+ seconds;
}

/*!
 * 
 * CONFIRM - This is the function that runs to toggle confirm
 * 
 */
function toggleConfirm(con){
	confirmContainer.visible = con;
}

/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */

function toggleOption(){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
	}else{
		optionsContainer.visible = true;
	}
}

/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleGameMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	toggleMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;	
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	gtag('event','click',{'event_category':'share','event_label':action});
	
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	var title = '';
	var text = '';
	title = shareTitle.replace("[SCORE]", playerData.score);
	text = shareMessage.replace("[SCORE]", playerData.score);
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}else if( action == 'whatsapp' ){
		shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
	}
	
	window.open(shareurl);
}