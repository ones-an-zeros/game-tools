function windowManager( body ){
    this.body = document.getElementsByTagName('body')[0];
    this.height = 0;
    this.width = 0;
    this.windowSizes = new Array();
    this.getUserAgent();
    this.getSize();
    this.init();
    this.makeCanvas();
}
windowManager.prototype.init = function(){
    this.windowSizes[1] = new Object();
    this.windowSizes[1].width = 1024;
    this.windowSizes[1].height = 768;
    this.windowSizes[0] = new Object();
    this.windowSizes[0].width = 800;
    this.windowSizes[0].height = 600;
}
windowManager.prototype.makeCanvas = function(){
    var windowSizeArray = this.windowSizes;
    var width = this.width;
    var height = this.height;
    var i = windowSizeArray.length;
    var sizeIndex = 0;
    while(i--){
        var windowSize = windowSizeArray[i];
        if( windowSize.width < width ){
            if( windowSize.height < height ){
		sizeIndex = i;
		break;
            }
        }
    }
    var windowSize = windowSizeArray[sizeIndex];
    var canvas = managedObject.create('DIV',{'id':'stage'},'width:'+windowSize.width+'px;height:'+windowSize.height+'px;',this.body);
}
windowManager.prototype.getUserAgent = function(){
    //alert(navigator.userAgent);
}
windowManager.prototype.getSize = function(){
    var winW = 630, winH = 460;
    if (document.body && document.body.offsetWidth) {
	winW= document.body.offsetWidth;
	winH = document.body.offsetHeight;
    }
    if (document.compatMode=='CSS1Compat' &&
	document.documentElement &&
	document.documentElement.offsetWidth ) {
	winW = document.documentElement.offsetWidth;
	winH = document.documentElement.offsetHeight;
    }
    if (window.innerWidth && window.innerHeight) {
	winW = window.innerWidth;
	winH = window.innerHeight;
    }
    this.height = winH;
    this.width = winW;
}
