////////////////////////////////////////////////////////////
// CANVAS
////////////////////////////////////////////////////////////
var stage
var canvasW=0;
var canvasH=0;

/*!
 * 
 * START GAME CANVAS - This is the function that runs to setup game canvas
 * 
 */
function initGameCanvas(w,h){
	canvasW=w;
	canvasH=h;
	stage = new createjs.Stage("gameCanvas");
	
	createjs.Touch.enable(stage);
	stage.enableMouseOver(20);
	stage.mouseMoveOutside = true;
	
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick", tick);	
}

var canvasContainer, mainContainer, gameContainer, eyeContainer, bgContainer, kittyContainer, resultContainer;
var bg, logo, buttonStart, txtGuide1, roundCircle, roundFade, roundFound, eye, txtGuide2, gameHitArea, txtTime, result, iconWhatsapp, iconTwitter, iconFacebook, txtShare, txtScore, buttonReplay, bgResize;

$.background={};
$.kitty={};
$.eye={};

/*!
 * 
 * BUILD GAME CANVAS ASSERTS - This is the function that runs to build game canvas asserts
 * 
 */
function buildGameCanvas(){
	canvasContainer = new createjs.Container();
	mainContainer = new createjs.Container();
	bgContainer = new createjs.Container();
	kittyContainer = new createjs.Container();
	eyeContainer = new createjs.Container();
	gameContainer = new createjs.Container();
	resultContainer = new createjs.Container();
	
	bg = new createjs.Bitmap(loader.getResult('background'));
	bg.x = -171;
	logo = new createjs.Bitmap(loader.getResult('logo'));
	
	buttonStart = new createjs.Text();
	buttonStart.font = "40px lane_-_narrowregular";
	buttonStart.color = "#ffffff";
	buttonStart.text = textStartButton;
	buttonStart.textAlign = "center";
	buttonStart.textBaseline='alphabetic';
	buttonStart.x = canvasW/2;
	buttonStart.y = canvasH/100 * 75;
	buttonStart.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-200, -30, 400, 40));
	
	txtGuide1 = new createjs.Text();
	txtGuide1.font = "30px lane_-_narrowregular";
	txtGuide1.color = "#ffffff";
	txtGuide1.text = textGuide1;
	txtGuide1.textAlign = "center";
	txtGuide1.textBaseline='alphabetic';
	txtGuide1.x = canvasW/2;
	txtGuide1.y = canvasH/100 * 64;
	
	for(n=0;n<background_arr.length;n++){
		$.background[n] = new createjs.Bitmap(loader.getResult('background'+n));
		bgContainer.addChild($.background[n]);
	}
	bgContainer.x = bg.x;
	
	for(n=0;n<cat_arr.length;n++){
		$.kitty[n] = new createjs.Bitmap(loader.getResult('kitty'+n));
		centerReg($.kitty[n]);
		kittyContainer.addChild($.kitty[n]);
	}
	
	roundFound = new createjs.Shape();
	roundCircle = new createjs.Shape();
	roundFade = new createjs.Shape();
	
	eye = new createjs.Bitmap(loader.getResult('eye'));
	centerReg(eye);
	
	txtGuide2 = new createjs.Text();
	txtGuide2.font = "30px lane_-_narrowregular";
	txtGuide2.color = "#ffffff";
	txtGuide2.text = textGuide2;
	txtGuide2.textAlign = "center";
	txtGuide2.textBaseline='alphabetic';
	txtGuide2.x = canvasW/2;
	txtGuide2.y = canvasH/100 * 85;
	
	txtTime = new createjs.Text();
	txtTime.font = "40px lane_-_narrowregular";
	txtTime.color = "#ffffff";
	txtTime.text = '00:00';
	txtTime.textAlign = "center";
	txtTime.textBaseline='alphabetic';
	txtTime.x = canvasW/100 * 8;
	txtTime.y = canvasH/100 * 8;
	
	gameHitArea = new createjs.Shape();
	gameHitArea.graphics.beginFill("#000").drawRect(0, 0, canvasW, canvasH);
	gameHitArea.alpha = .1;
	
	result = new createjs.Bitmap(loader.getResult('result'));
	iconWhatsapp = new createjs.Bitmap(loader.getResult('iconWhatsapp'));
	iconTwitter = new createjs.Bitmap(loader.getResult('iconTwitter'));
	iconFacebook = new createjs.Bitmap(loader.getResult('iconFacebook'));
	centerReg(iconWhatsapp);
	centerReg(iconTwitter);
	centerReg(iconFacebook);
	iconFacebook.x = canvasW/100 * 35;
	iconTwitter.x = canvasW/2;
	iconWhatsapp.x = canvasW/100 * 65;
	iconFacebook.y = iconTwitter.y = iconWhatsapp.y = canvasH/100*75;
	
	buttonReplay = new createjs.Text();
	buttonReplay.font = "40px lane_-_narrowregular";
	buttonReplay.color = "#ffffff";
	buttonReplay.text = textReplayButton;
	buttonReplay.textAlign = "center";
	buttonReplay.textBaseline='alphabetic';
	buttonReplay.x = canvasW/2;
	buttonReplay.y = canvasH/100 * 49;
	buttonReplay.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(-200, -30, 400, 40));
	
	txtScore = new createjs.Text();
	txtScore.font = "30px lane_-_narrowregular";
	txtScore.color = "#ffffff";
	txtScore.text = '';
	txtScore.textAlign = "center";
	txtScore.textBaseline='alphabetic';
	txtScore.x = canvasW/2;
	txtScore.y = canvasH/100 * 42;
	
	txtShare = new createjs.Text();
	txtShare.font = "30px lane_-_narrowregular";
	txtShare.color = "#ffffff";
	txtShare.text = shareText;
	txtShare.textAlign = "center";
	txtShare.textBaseline='alphabetic';
	txtShare.x = canvasW/2;
	txtShare.y = canvasH/100 * 65;
	
	bgResize = new createjs.Shape();
	
	confirmContainer = new createjs.Container();
	optionsContainer = new createjs.Container();
	
	//option
	buttonFullscreen = new createjs.Bitmap(loader.getResult('buttonFullscreen'));
	centerReg(buttonFullscreen);
	buttonSoundOn = new createjs.Bitmap(loader.getResult('buttonSoundOn'));
	centerReg(buttonSoundOn);
	buttonSoundOff = new createjs.Bitmap(loader.getResult('buttonSoundOff'));
	centerReg(buttonSoundOff);
	buttonSoundOn.visible = false;
	buttonExit = new createjs.Bitmap(loader.getResult('buttonExit'));
	centerReg(buttonExit);
	buttonSettings = new createjs.Bitmap(loader.getResult('buttonSettings'));
	centerReg(buttonSettings);
	
	createHitarea(buttonFullscreen);
	createHitarea(buttonSoundOn);
	createHitarea(buttonSoundOff);
	createHitarea(buttonExit);
	createHitarea(buttonSettings);
	optionsContainer.addChild(buttonFullscreen, buttonSoundOn, buttonSoundOff, buttonExit);
	optionsContainer.visible = false;
	
	//exit
	itemExit = new createjs.Bitmap(loader.getResult('itemExit'));
	centerReg(itemExit);
	itemExit.x = canvasW/2;
	itemExit.y = canvasH/2;
	
	buttonConfirm = new createjs.Bitmap(loader.getResult('buttonConfirm'));
	centerReg(buttonConfirm);
	createHitarea(buttonConfirm)
	buttonConfirm.x = canvasW/100* 35;
	buttonConfirm.y = canvasH/100 * 63;
	
	buttonCancel = new createjs.Bitmap(loader.getResult('buttonCancel'));
	centerReg(buttonCancel);
	createHitarea(buttonCancel)
	buttonCancel.x = canvasW/100 * 65;
	buttonCancel.y = canvasH/100 * 63;
	
	confirmMessageTxt = new createjs.Text();
	confirmMessageTxt.font = "50px lane_-_narrowregular";
	confirmMessageTxt.lineHeight = 65;
	confirmMessageTxt.color = "#fff";
	confirmMessageTxt.textAlign = "center";
	confirmMessageTxt.textBaseline='alphabetic';
	confirmMessageTxt.text = exitMessage;
	confirmMessageTxt.x = canvasW/2;
	confirmMessageTxt.y = canvasH/100 *44;
	
	confirmContainer.addChild(itemExit, buttonConfirm, buttonCancel, confirmMessageTxt);
	confirmContainer.visible = false;
	
	mainContainer.addChild(logo, buttonStart, txtGuide1);
	gameContainer.addChild(gameHitArea, eye, txtGuide2, kittyContainer, roundCircle, roundFade, roundFound, txtTime)
	resultContainer.addChild(result, txtScore, buttonReplay);
	if(shareEnable){
		resultContainer.addChild(iconWhatsapp, iconTwitter, iconFacebook, txtShare);
	}
	canvasContainer.addChild(bg, bgContainer, eyeContainer, mainContainer, gameContainer, resultContainer, confirmContainer, optionsContainer, buttonSettings);
	stage.addChild(bgResize, canvasContainer);
	
	resizeCanvas();
}


/*!
 * 
 * RESIZE GAME CANVAS - This is the function that runs to resize game canvas
 * 
 */
function resizeCanvas(){
 	if(canvasContainer!=undefined){
		buttonSettings.x = (canvasW - offset.x) - 60;
		buttonSettings.y = offset.y + 45;
		
		var distanceNum = 75;
		if(curPage != 'game'){
			buttonExit.visible = false;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
		}else{
			buttonExit.visible = true;
			buttonSoundOn.x = buttonSoundOff.x = buttonSettings.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+distanceNum;
			buttonSoundOn.x = buttonSoundOff.x;
			buttonSoundOn.y = buttonSoundOff.y = buttonSettings.y+(distanceNum);
			
			buttonFullscreen.x = buttonSettings.x;
			buttonFullscreen.y = buttonSettings.y+(distanceNum*2);
			
			buttonExit.x = buttonSettings.x;
			buttonExit.y = buttonSettings.y+(distanceNum*3);
		}
	}
}

function centerContainer(obj){
	obj.x = (windowW/2) - ((canvasW * scalePercent)/2);
	obj.y = (windowH/2) - ((canvasH * scalePercent)/2);
}

function resizeCanvasItem(){
	//bgResize.graphics.clear();
	//bgResize.graphics.beginFill('#ff0000').drawRect(0,0,windowW,windowH);
	centerContainer(canvasContainer);
}

/*!
 * 
 * REMOVE GAME CANVAS - This is the function that runs to remove game canvas
 * 
 */
 function removeGameCanvas(){
	 stage.autoClear = true;
	 stage.removeAllChildren();
	 stage.update();
	 createjs.Ticker.removeEventListener("tick", tick);
	 createjs.Ticker.removeEventListener("tick", stage);
 }

/*!
 * 
 * CANVAS LOOP - This is the function that runs for canvas loop
 * 
 */ 
function tick(event) {
	updateGame();
	stage.update(event);
}

/*!
 * 
 * CANVAS MISC FUNCTIONS
 * 
 */
function centerReg(obj){
	obj.regX=obj.image.naturalWidth/2;
	obj.regY=obj.image.naturalHeight/2;
}

function createHitarea(obj){
	obj.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").drawRect(0, 0, obj.image.naturalWidth, obj.image.naturalHeight));	
}