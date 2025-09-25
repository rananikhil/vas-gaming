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
		resizeGameFunc();
	});
	resizeGameFunc();
	
	loader = new createjs.LoadQueue(false);
	manifest=[{src:'assets/background.jpg', id:'background'},
			{src:'assets/logo.png', id:'logo'},
			{src:'assets/eye.png', id:'eye'},
			{src:'assets/result.png', id:'result'},
			{src:'assets/iconFacebook.png', id:'iconFacebook'},
			{src:'assets/iconTwitter.png', id:'iconTwitter'},
			{src:'assets/iconWhatsapp.png', id:'iconWhatsapp'},
			
			{src:'assets/button_confirm.png', id:'buttonConfirm'},
			{src:'assets/button_cancel.png', id:'buttonCancel'},
			{src:'assets/item_exit.png', id:'itemExit'},
			{src:'assets/button_fullscreen.png', id:'buttonFullscreen'},
			{src:'assets/button_sound_on.png', id:'buttonSoundOn'},
			{src:'assets/button_sound_off.png', id:'buttonSoundOff'},
			{src:'assets/button_exit.png', id:'buttonExit'},
			{src:'assets/button_settings.png', id:'buttonSettings'}];
			
	for(n=0;n<background_arr.length;n++){
		manifest.push({src:background_arr[n], id:'background'+n});	
	}
	
	for(n=0;n<cat_arr.length;n++){
		manifest.push({src:cat_arr[n], id:'kitty'+n});	
	}
	
	soundOn = true;		
	if($.browser.mobile || isTablet){
		if(!enableMobileSound){
			soundOn=false;
		}
	}
	
	if(soundOn){
		manifest.push({src:'assets/sounds/ambient.ogg', id:'musicAmbient'})
		manifest.push({src:'assets/sounds/score.ogg', id:'soundScore'})
		manifest.push({src:'assets/sounds/gameover.ogg', id:'soundGameover'})
		manifest.push({src:'assets/sounds/grass.ogg', id:'soundGrass'})
		manifest.push({src:'assets/sounds/happy.ogg', id:'soundHappy'})
		manifest.push({src:'assets/sounds/meow1_left.ogg', id:'soundMeow1Left'})
		manifest.push({src:'assets/sounds/meow1_right.ogg', id:'soundMeow1Right'})
		manifest.push({src:'assets/sounds/meow2_left.ogg', id:'soundMeow2Left'})
		manifest.push({src:'assets/sounds/meow2_right.ogg', id:'soundMeow2Right'})
		manifest.push({src:'assets/sounds/meow3_left.ogg', id:'soundMeow3Left'})
		manifest.push({src:'assets/sounds/meow3_right.ogg', id:'soundMeow3Right'})
		manifest.push({src:'assets/sounds/meow4_left.ogg', id:'soundMeow4Left'})
		manifest.push({src:'assets/sounds/meow4_right.ogg', id:'soundMeow4Right'})
		
		createjs.Sound.alternateExtensions = ["mp3"];
		loader.installPlugin(createjs.Sound);
	}
	
	loader.addEventListener("complete", handleComplete);
	loader.on("progress", handleProgress, this);
	loader.loadManifest(manifest);
}

/*!
 * 
 * CANVAS PRELOADER UPDATE - This is the function that runs to update preloder progress
 * 
 */
function handleProgress() {
	$('#mainLoader').html(Math.round(loader.progress/1*100)+'%');
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