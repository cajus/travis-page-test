qx.$$packageData['1024']={"locales":{},"resources":{"qx/icon/Oxygen/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Oxygen/32/apps/media-photo-album.png":[32,32,"png","qx"],"qx/icon/Oxygen/48/devices/audio-card.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/audio-input-microphone.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/battery.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/camera-photo.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/camera-web.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/computer.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/display.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/drive-harddisk.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/drive-optical.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/input-keyboard.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/input-mouse.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/media-flash.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/media-optical.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/multimedia-player.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/network-wired.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/network-wireless.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/pda.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/phone.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/printer.png":[48,48,"png","qx"],"qx/icon/Oxygen/48/devices/scanner.png":[48,48,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/32/apps/media-photo-album.png":[32,32,"png","qx"],"qx/icon/Tango/48/devices/audio-card.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/audio-input-microphone.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/battery.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/camera-photo.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/camera-web.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/computer.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/display.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/drive-harddisk.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/drive-optical.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/input-keyboard.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/input-mouse.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/media-flash.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/media-optical.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/multimedia-player.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/network-wired.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/network-wireless.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/pda.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/phone.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/printer.png":[48,48,"png","qx"],"qx/icon/Tango/48/devices/scanner.png":[48,48,"png","qx"]},"translations":{"C":{},"en":{}}};
qx.Part.$$notifyLoad("1024", function() {
(function(){var a="Resizer",b="audio-card.png",c="battery.png",d="Pop-Up",f="DragDrop",g="display.png",h="drop",j="main",k="Tooltip",m="computer.png",n="input-keyboard.png",o="droprequest",p="copy",q="drive-optical.png",r="dragstart",s="multi",t="move",u="icon/48/devices/",v="network-wired.png",w="camera-photo.png",x="network-wireless.png",y="audio-input-microphone.png",z="SlideBar",A="icon/16/places/folder.png",B="widgetbrowser.pages.Misc",C="tooltip",D="ProgressBar",E="icon/32/apps/media-photo-album.png",F="drive-harddisk.png",G="camera-web.png",H="items",I="Item ";qx.Class.define(B,{extend:widgetbrowser.pages.AbstractPage,construct:function(){widgetbrowser.pages.AbstractPage.call(this);this.__jX=new qx.ui.container.Composite(new qx.ui.layout.VBox(10));this.add(this.__jX);this.initWidgets();},members:{__jX:null,initWidgets:function(){var R=this._widgets;var Q;var N=new qx.ui.basic.Label(D);var O=new qx.ui.indicator.ProgressBar(0,100).set({value:50});R.push(O);this.__jX.add(N);this.__jX.add(O);N=new qx.ui.basic.Label(z);var L=new qx.ui.container.SlideBar();L.setWidth(300);L.setLayout(new qx.ui.layout.HBox(3));var M=[b,y,c,w,G,m,g,F,q,n,v,x];M.forEach(function(T){L.add((new qx.ui.basic.Image(u+T)).set({decorator:j,padding:4}));});R.push(L);this.__jX.add(N);this.__jX.add(L);N=new qx.ui.basic.Label(k);var J=new qx.ui.popup.Popup(new qx.ui.layout.Canvas()).set({offset:3,offsetBottom:20,appearance:C});J.set({allowStretchX:false,autoHide:false});J.add(new qx.ui.basic.Atom(d,E));R.push(J);this.__jX.add(N);this.__jX.add(J);J.show();N=new qx.ui.basic.Label(a);Q=new qx.ui.container.Composite(new qx.ui.layout.Canvas());var S=new qx.ui.container.Resizer().set({resizable:false,resizableRight:true});S.setLayout(new qx.ui.layout.Grow());S.add(new qx.ui.core.Widget().set({width:50,maxWidth:200,height:50,maxHeight:200}));Q.add(S);R.push(S);this.__jX.add(N);this.__jX.add(Q);N=new qx.ui.basic.Label(f);Q=new qx.ui.container.Composite(new qx.ui.layout.HBox(10));Q.set({allowStretchY:false,allowStretchX:false});this.__jX.add(N);this.__jX.add(Q);var P=new qx.ui.form.List;P.setDraggable(true);P.setSelectionMode(s);for(var i=0;i<10;i++ ){P.add(new qx.ui.form.ListItem(I+i,A));};P.addListener(r,function(e){e.addType(H);e.addAction(p);e.addAction(t);});P.addListener(o,function(e){var X=e.getCurrentAction();var ba=e.getCurrentType();var W;var U=this.getSelection();var V=e.getDragTarget();if(U.length===0){U.push(V);}else if(U.indexOf(V)==-1){U=[V];};switch(ba){case H:W=U;if(X==p){var Y=[];for(var i=0,l=W.length;i<l;i++ ){Y[i]=W[i].clone();};W=Y;};break;};if(X==t){for(var i=0,l=U.length;i<l;i++ ){this.remove(U[i]);};};e.addData(ba,W);});Q.add(P);R.push(P);var K=new qx.ui.form.List;K.setDroppable(true);K.setSelectionMode(s);K.addListener(h,function(e){var bb=e.getData(H);for(var i=0,l=bb.length;i<l;i++ ){this.add(bb[i]);};});Q.add(K);R.push(K);}}});})();(function(){var a="complete",b="0%",c="progressbar",d="_applyValue",e="changeValue",f="change",g="progress",h="qx.ui.indicator.ProgressBar",i="_applyMaximum",j="%",k="changeMaximum",l="qx.event.type.Event",m="qx.event.type.Data";qx.Class.define(h,{extend:qx.ui.container.Composite,construct:function(o,n){qx.ui.container.Composite.call(this);this._createChildControl(g);this.setLayout(new qx.ui.layout.HBox());if(n!=null){this.setMaximum(n);};if(o!=null){this.setValue(o);};},properties:{appearance:{refine:true,init:c},maximum:{init:100,event:k,apply:i},value:{init:0,event:e,apply:d}},events:{complete:l,change:m},members:{_applyValue:function(r,q){var p=this.getMaximum();if(!qx.lang.Type.isNumber(r)||!isFinite(r)){r=q;};if(r<0){r=0;}else if(r>p){r=p;};this.setValue(r);this._changeProgress(r/p);},_applyMaximum:function(u,t){var s=u;var v=this.getValue();if(!qx.lang.Type.isNumber(s)||!isFinite(s)||s<=0){s=t;};if(s<v){s=v;};this.setMaximum(s);this._changeProgress(v/s);},_createChildControlImpl:function(y,x){var w;switch(y){case g:w=new qx.ui.container.Composite(new qx.ui.layout.Canvas());this._add(w,{width:b});break;};return w||qx.ui.container.Composite.prototype._createChildControlImpl.call(this,y);},_changeProgress:function(B){var A=this.getChildControl(g);var z=Math.floor(B*100);var C=parseInt(A.getLayoutProperties().width,10);A.setLayoutProperties({width:z+j});if(z!=C){this.fireDataEvent(f,z,C);};if(z===100){this.fireEvent(a);};}}});})();(function(){var a="resizer",b="qx.ui.container.Resizer";qx.Class.define(b,{extend:qx.ui.container.Composite,include:qx.ui.core.MResizable,properties:{appearance:{refine:true,init:a}}});})();
});