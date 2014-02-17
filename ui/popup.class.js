function popup(){
    this.stack = new Object();
    this.canvas = document.getElementById('canvas');
    this.body = document.getElementsByTagName('body')[0];
}
popup.prototype.setPosition = function(obj,height,width){
    var canvas = this.canvas;
    var canvasStyle = canvas.style;
    var objStyle = obj.style;
    var canvasWidth = parseInt(canvasStyle.width);
    var canvasHeight = parseInt(canvasStyle.height);
    objStyle.position = 'absolute';
    objStyle.width = width+'px';
    objStyle.height = height+'px';
    objStyle.top = ((canvasHeight/2)-(height/2))+'px';
    objStyle.left = ((canvasWidth/2)-(width/2))+'px';
}
popup.prototype.create = function( type, width, height, id, title ){
    var canvas = this.canvas;
    var body = this.body;
    var disable = managedObject.create('DIV',{'id':'disable'},'position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:9000;');
    body.insertBefore(disable,body.firstChild);
    var container = managedObject.create('DIV',{'id':id,'class':'popup'},'',disable);
    this.setPosition( container, height, width );
    var popheader = managedObject.create('DIV',{'class':'header'},'',container);
    var popclose = managedObject.create('SPAN',{},'',popheader);
    managedObject.appendText('X',popclose);
    var objref = this;
    popclose.addEventListener('click',function(){ objref.close(id); } );
    var poptitle = managedObject.create('H3',{},'',popheader);
    managedObject.appendText(title,poptitle);
    var popcontent = managedObject.create('DIV',{'class':'content'},'',container);
    return popcontent;
}
popup.prototype.close = function( id ){
    console.log('popclsoe');
    var disable = document.getElementById('disable');
    managedObject.remove( disable );
}
