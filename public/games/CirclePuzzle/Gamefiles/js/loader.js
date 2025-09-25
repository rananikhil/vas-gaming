////////////////////////////////////////////////////////////
// CANVAS LOADER
////////////////////////////////////////////////////////////

 /*!
 * 
 * START CANVAS PRELOADER - This is the function that runs to preload canvas asserts
 * 
 */
function initPreload(){
	toggleLoader(true);
	
	checkMobileEvent();
	
	$(window).resize(function(){
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(checkMobileOrientation, 1000);
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[
			{src:'assets/background.png', id:'background'},
			{src:'assets/background_p.png', id:'backgroundP'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/button_start.png', id:'buttonStart'},
			{src:'assets/button_challenge.png', id:'buttonChallenge'},
		
			{src:'assets/button_select.png', id:'buttonSelect'},
			{src:'assets/button_left.png', id:'buttonLeft'},
			{src:'assets/button_right.png', id:'buttonRight'},
		
			{src:'assets/item_display.png', id:'itemDisplay'},
			{src:'assets/item_status_complete.png', id:'itemStatusComplete'},
			{src:'assets/item_status_over.png', id:'itemStatusOver'},
		
			{src:'assets/button_facebook.png', id:'buttonFacebook'},
			{src:'assets/button_twitter.png', id:'buttonTwitter'},
			{src:'assets/button_whatsapp.png', id:'buttonWhatsapp'},
			{src:'assets/button_continue.png', id:'buttonContinue'},
			{src:'assets/item_result.png', id:'itemResult'},
			{src:'assets/item_result_p.png', id:'itemResultP'},
			{src:'assets/item_exit.png', id:'itemExit'},
			{src:'assets/item_exit_p.png', id:'itemExitP'},
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'}
	];
	
	for(var n=0; n<cateogyr_arr.length;n++){
		manifest.push({src:cateogyr_arr[n].src, id:'category'+n});
	}
	
	for(var n=0; n<puzzles_arr.length;n++){
		manifest.push({src:puzzles_arr[n].src, id:'puzzle'+n});
	}
	
	soundOn = true;
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/sound_click.ogg', id:'soundButton'});
		manifest.push({src:'assets/sounds/sound_play.ogg', id:'soundPlay'});
		manifest.push({src:'assets/sounds/sound_over.ogg', id:'soundOver'});
		manifest.push({src:'assets/sounds/sound_complete.ogg', id:'soundComplete'});
		manifest.push({src:'assets/sounds/sound_result.ogg', id:'soundResult'});
		manifest.push({src:'assets/sounds/sound_press.ogg', id:'soundPress'});
		manifest.push({src:'assets/sounds/sound_release.ogg', id:'soundRelease'});
		manifest.push({src:'assets/sounds/sound_rotating.ogg', id:'soundRotating'});
		manifest.push({src:'assets/sounds/sound_place.ogg', id:'soundPlace'});
		manifest.push({src:'assets/sounds/sound_countdown.ogg', id:'soundCountdown'});
		manifest.push({src:'assets/sounds/sound_countdown_end.ogg', id:'soundCountdownEnd'});
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.addEventListener("fileload", fileComplete);
	loader.addEventListener("error",handleFileError);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS FILE COMPLETE EVENT - This is the function that runs to update when file loaded complete
 * 
 */
function fileComplete(evt) {
	var item = evt.item;
	//console.log("Event Callback file loaded ", evt.item.id);
}

/*!
 * 
 * CANVAS FILE HANDLE EVENT - This is the function that runs to handle file error
 * 
 */
function handleFileError(evt) {
	console.log("error ", evt);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader span').html(Math.round(loader.progress/1*100)+'%');
}

/*!
 * 
 * CANVAS PRELOADER COMPLETE - This is the function that runs when preloader is complete
 * 
 */
function handleComplete() {
	toggleLoader(false);
	initMain();
};

/*!
 * 
 * TOGGLE LOADER - This is the function that runs to display/hide loader
 * 
 */
function toggleLoader(con){
	if(con){
		$('#mainLoader').show();
	}else{
		$('#mainLoader').hide();
	}
}