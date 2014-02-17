// Add Performance to window for easy access
window.performance = window.performance || {};
performance.now = (function() {
    // Find the fastest way to find now and return it
    return performance.now    ||
        performance.mozNow    ||
        performance.msNow     ||
        performance.oNow      ||
        performance.webkitNow ||            
        Date.now  /*none found - fallback to browser default */
})();
// Engine is the driving force behind all animations
function engine(){
    this.goalLPS = (1000/24); // Our goal is 24 loops per second
    this.medianLPS = (1000/12); // If the machine cant handle the goal we drop back to the median
    this.currentLPS = this.goalLPS; // What are we currently running at
    this.fallback = true; // Are we checking for a fallback
    this.currentTimeOut = null; // this is normal an object containing a timeout for the next cycle
    this.run = false;
    this.running = false;
    this.failCounter = 0;
    this.init();
}
engine.prototype.init = function(){

    this.start();
}
engine.prototype.stop = function(){
    this.run = false;
    this.running = false;
}
engine.prototype.start = function(){
    this.run = true;
    this.running = true;
    this.process();
}
engine.prototype.process = function(){
    var engine = this;
    var currentLPS = engine.currentLPS;
    var start = performance.now();
    engine.processInterval();
    var processTime = ( performance.now() - start );
    var timeout = ( currentLPS - processTime );
    var timeout = timeout < 0 ? 0 : timeout;
    // if we are running at goal check if we need to fall back
    if( this.fallback ){
	// Check if the process time took longer than the alocated amount of loop time
	if(!timeout){
	    this.failCounter++;
	    if( this.failCounter > 239 ){
		this.currentLPS = this.medianLPS;
		this.fallback = false;
	    }
	}
    }
    if( this.run ){ this.currentTimeOut = setTimeout( function(){ engine.process(); }, timeout ); }
}
engine.prototype.processInterval = function(){
    console.log('do stuff');

}
