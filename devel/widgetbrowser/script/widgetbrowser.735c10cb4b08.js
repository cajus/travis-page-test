qx.$$packageData['8833']={"locales":{},"resources":{},"translations":{"C":{},"en":{}}};
qx.Part.$$notifyLoad("8833", function() {
(function(){var a="qx.ui.window.IWindowManager";qx.Interface.define(a,{members:{setDesktop:function(b){this.assertInterface(b,qx.ui.window.IDesktop);},changeActiveWindow:function(c,d){},updateStack:function(){},bringToFront:function(e){this.assertInstance(e,qx.ui.window.Window);},sendToBack:function(f){this.assertInstance(f,qx.ui.window.Window);}}});})();(function(){var a="qx.ui.window.IDesktop";qx.Interface.define(a,{members:{setWindowManager:function(b){this.assertInterface(b,qx.ui.window.IWindowManager);},getWindows:function(){},supportsMaximize:function(){},blockContent:function(c){this.assertInteger(c);},unblock:function(){},isBlocked:function(){}}});})();(function(){var a="__cA",b="qx.ui.window.Manager";qx.Class.define(b,{extend:qx.core.Object,implement:qx.ui.window.IWindowManager,members:{__cA:null,setDesktop:function(c){this.__cA=c;this.updateStack();},getDesktop:function(){return this.__cA;},changeActiveWindow:function(d,e){if(d){this.bringToFront(d);d.setActive(true);};if(e){e.resetActive();};},_minZIndex:1e5,updateStack:function(){qx.ui.core.queue.Widget.add(this);},syncWidget:function(){this.__cA.forceUnblock();var h=this.__cA.getWindows();var g=this._minZIndex;var m=g+h.length*2;var j=g+h.length*4;var k=null;for(var i=0,l=h.length;i<l;i++ ){var f=h[i];if(!f.isVisible()){continue;};k=k||f;if(f.isModal()){f.setZIndex(j);this.__cA.blockContent(j-1);j+=2;k=f;}else if(f.isAlwaysOnTop()){f.setZIndex(m);m+=2;}else {f.setZIndex(g);g+=2;};if(!k.isModal()&&f.isActive()||f.getZIndex()>k.getZIndex()){k=f;};};this.__cA.setActiveWindow(k);},bringToFront:function(o){var n=this.__cA.getWindows();var p=qx.lang.Array.remove(n,o);if(p){n.push(o);this.updateStack();};},sendToBack:function(r){var q=this.__cA.getWindows();var s=qx.lang.Array.remove(q,r);if(s){q.unshift(r);this.updateStack();};}},destruct:function(){this._disposeObjects(a);}});})();(function(){var a="pointerup",b="Boolean",c="losecapture",d="move",f="qx.ui.core.MMovable",g="The move handle could not be redefined!",h="pointerdown",i="maximized",j="__cB",k="pointermove",l="roll",m="__cC",n="move-frame";qx.Mixin.define(f,{properties:{movable:{check:b,init:true},useMoveFrame:{check:b,init:false}},members:{__cB:null,__cC:null,__cD:null,__cE:null,__cF:null,__cG:null,__cH:null,__cI:false,__cJ:null,__cK:0,_activateMoveHandle:function(o){if(this.__cB){throw new Error(g);};this.__cB=o;o.addListener(h,this._onMovePointerDown,this);o.addListener(a,this._onMovePointerUp,this);o.addListener(k,this._onMovePointerMove,this);o.addListener(c,this.__cO,this);},__cL:function(){var p=this.__cC;if(!p){p=this.__cC=new qx.ui.core.Widget();p.setAppearance(n);p.exclude();qx.core.Init.getApplication().getRoot().add(p);};return p;},__cM:function(){var location=this.getContentLocation();var r=this.getBounds();var q=this.__cL();q.setUserBounds(location.left,location.top,r.width,r.height);q.show();q.setZIndex(this.getZIndex()+1);},__cN:function(e){var t=this.__cD;var s=Math.max(t.left,Math.min(t.right,e.getDocumentLeft()));var v=Math.max(t.top,Math.min(t.bottom,e.getDocumentTop()));var u=this.__cE+s;var w=this.__cF+v;return {viewportLeft:parseInt(u,10),viewportTop:parseInt(w,10),parentLeft:parseInt(u-this.__cG,10),parentTop:parseInt(w-this.__cH,10)};},_onMoveRoll:function(e){e.stop();},_onMovePointerDown:function(e){if(!this.getMovable()||this.hasState(i)){return;};this.addListener(l,this._onMoveRoll,this);var parent=this.getLayoutParent();var x=parent.getContentLocation();var z=parent.getBounds();if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(!parent.isBlocked()){this.__cJ=parent.getBlockerColor();this.__cK=parent.getBlockerOpacity();parent.setBlockerColor(null);parent.setBlockerOpacity(1);parent.blockContent(this.getZIndex()-1);this.__cI=true;};};this.__cD={left:x.left,top:x.top,right:x.left+z.width,bottom:x.top+z.height};var y=this.getContentLocation();this.__cG=x.left;this.__cH=x.top;this.__cE=y.left-e.getDocumentLeft();this.__cF=y.top-e.getDocumentTop();this.addState(d);this.__cB.capture();if(this.getUseMoveFrame()){this.__cM();};e.stop();},_onMovePointerMove:function(e){if(!this.hasState(d)){return;};var B=this.__cN(e);if(this.getUseMoveFrame()){this.__cL().setDomPosition(B.viewportLeft,B.viewportTop);}else {var A=this.getLayoutParent().getInsets();this.setDomPosition(B.parentLeft-(A.left||0),B.parentTop-(A.top||0));};e.stopPropagation();},_onMovePointerUp:function(e){if(this.hasListener(l)){this.removeListener(l,this._onMoveRoll,this);};if(!this.hasState(d)){return;};this.removeState(d);var parent=this.getLayoutParent();if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(this.__cI){parent.unblock();parent.setBlockerColor(this.__cJ);parent.setBlockerOpacity(this.__cK);this.__cJ=null;this.__cK=0;this.__cI=false;};};this.__cB.releaseCapture();var D=this.__cN(e);var C=this.getLayoutParent().getInsets();this.setLayoutProperties({left:D.parentLeft-(C.left||0),top:D.parentTop-(C.top||0)});if(this.getUseMoveFrame()){this.__cL().exclude();};e.stopPropagation();},__cO:function(e){if(!this.hasState(d)){return;};this.removeState(d);if(this.getUseMoveFrame()){this.__cL().exclude();};}},destruct:function(){this._disposeObjects(m,j);this.__cD=null;}});})();(function(){var a="beforeClose",b="beforeMinimize",c="Boolean",d="window-resize-frame",f="changeStatus",g="changeIcon",h="excluded",i="_applyModal",j="execute",k="restore-button",l="_applyActive",m="minimize-button",n="qx.event.type.Event",o="close-button",p="beforeRestore",q="statusbar",r="captionbar",s="String",t="minimize",u="dbltap",v="modal",w="changeModal",x="title",y="icon",z="showStatusbar",A="changeAlwaysOnTop",B="_applyShowStatusbar",C="pointerdown",D="maximized",E="_applyStatus",F="qx.ui.window.Window",G="normal",H="changeCaption",I="engine.name",J="statusbar-text",K="focusout",L="beforeMaximize",M="maximize",N="maximize-button",O="restore",P="window",Q="pane",R="close",S="changeActive",T="mshtml",U="_applyCaptionBarChange",V="active",W="minimized";qx.Class.define(F,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MResizable,qx.ui.core.MMovable,qx.ui.core.MContentPadding],construct:function(X,Y){qx.ui.core.Widget.call(this);this._setLayout(new qx.ui.layout.VBox());this._createChildControl(r);this._createChildControl(Q);if(Y!=null){this.setIcon(Y);};if(X!=null){this.setCaption(X);};this._updateCaptionBar();this.addListener(C,this._onWindowPointerDown,this,true);this.addListener(K,this._onWindowFocusOut,this);qx.core.Init.getApplication().getRoot().add(this);this.initVisibility();qx.ui.core.FocusHandler.getInstance().addRoot(this);this._getResizeFrame().setAppearance(d);},statics:{DEFAULT_MANAGER_CLASS:qx.ui.window.Manager},events:{"beforeClose":n,"close":n,"beforeMinimize":n,"minimize":n,"beforeMaximize":n,"maximize":n,"beforeRestore":n,"restore":n},properties:{appearance:{refine:true,init:P},visibility:{refine:true,init:h},focusable:{refine:true,init:true},active:{check:c,init:false,apply:l,event:S},alwaysOnTop:{check:c,init:false,event:A},modal:{check:c,init:false,event:w,apply:i},caption:{apply:U,event:H,nullable:true},icon:{check:s,nullable:true,apply:U,event:g,themeable:true},status:{check:s,nullable:true,apply:E,event:f},showClose:{check:c,init:true,apply:U,themeable:true},showMaximize:{check:c,init:true,apply:U,themeable:true},showMinimize:{check:c,init:true,apply:U,themeable:true},allowClose:{check:c,init:true,apply:U},allowMaximize:{check:c,init:true,apply:U},allowMinimize:{check:c,init:true,apply:U},showStatusbar:{check:c,init:false,apply:B}},members:{__dz:null,__dA:null,getChildrenContainer:function(){return this.getChildControl(Q);},_forwardStates:{active:true,maximized:true,showStatusbar:true,modal:true},setLayoutParent:function(parent){{};qx.ui.core.Widget.prototype.setLayoutParent.call(this,parent);},_createChildControlImpl:function(be,bd){var ba;switch(be){case q:ba=new qx.ui.container.Composite(new qx.ui.layout.HBox());this._add(ba);ba.add(this.getChildControl(J));break;case J:ba=new qx.ui.basic.Label();ba.setValue(this.getStatus());break;case Q:ba=new qx.ui.container.Composite();this._add(ba,{flex:1});break;case r:var bb=new qx.ui.layout.Grid();bb.setRowFlex(0,1);bb.setColumnFlex(1,1);ba=new qx.ui.container.Composite(bb);this._add(ba);ba.addListener(u,this._onCaptionPointerDblTap,this);this._activateMoveHandle(ba);break;case y:ba=new qx.ui.basic.Image(this.getIcon());this.getChildControl(r).add(ba,{row:0,column:0});break;case x:ba=new qx.ui.basic.Label(this.getCaption());ba.setWidth(0);ba.setAllowGrowX(true);var bc=this.getChildControl(r);bc.add(ba,{row:0,column:1});break;case m:ba=new qx.ui.form.Button();ba.setFocusable(false);ba.addListener(j,this._onMinimizeButtonTap,this);this.getChildControl(r).add(ba,{row:0,column:2});break;case k:ba=new qx.ui.form.Button();ba.setFocusable(false);ba.addListener(j,this._onRestoreButtonTap,this);this.getChildControl(r).add(ba,{row:0,column:3});break;case N:ba=new qx.ui.form.Button();ba.setFocusable(false);ba.addListener(j,this._onMaximizeButtonTap,this);this.getChildControl(r).add(ba,{row:0,column:4});break;case o:ba=new qx.ui.form.Button();ba.setFocusable(false);ba.addListener(j,this._onCloseButtonTap,this);this.getChildControl(r).add(ba,{row:0,column:6});break;};return ba||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,be);},_updateCaptionBar:function(){var bg;var bh=this.getIcon();if(bh){this.getChildControl(y).setSource(bh);this._showChildControl(y);}else {this._excludeChildControl(y);};var bf=this.getCaption();if(bf){this.getChildControl(x).setValue(bf);this._showChildControl(x);}else {this._excludeChildControl(x);};if(this.getShowMinimize()){this._showChildControl(m);bg=this.getChildControl(m);this.getAllowMinimize()?bg.resetEnabled():bg.setEnabled(false);}else {this._excludeChildControl(m);};if(this.getShowMaximize()){if(this.isMaximized()){this._showChildControl(k);this._excludeChildControl(N);}else {this._showChildControl(N);this._excludeChildControl(k);};bg=this.getChildControl(N);this.getAllowMaximize()?bg.resetEnabled():bg.setEnabled(false);}else {this._excludeChildControl(N);this._excludeChildControl(k);};if(this.getShowClose()){this._showChildControl(o);bg=this.getChildControl(o);this.getAllowClose()?bg.resetEnabled():bg.setEnabled(false);}else {this._excludeChildControl(o);};},close:function(){if(!this.isVisible()){return;};if(this.fireNonBubblingEvent(a,qx.event.type.Event,[false,true])){this.hide();this.fireEvent(R);};},open:function(){this.show();this.setActive(true);this.focus();},center:function(){var parent=this.getLayoutParent();if(parent){var bj=parent.getBounds();if(bj){var bk=this.getSizeHint();var bi=Math.round((bj.width-bk.width)/2);var top=Math.round((bj.height-bk.height)/2);if(top<0){top=0;};this.moveTo(bi,top);return;};};{};},maximize:function(){if(this.isMaximized()){return;};var parent=this.getLayoutParent();if(parent!=null&&parent.supportsMaximize()){if(this.fireNonBubblingEvent(L,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();};var bl=this.getLayoutProperties();this.__dA=bl.left===undefined?0:bl.left;this.__dz=bl.top===undefined?0:bl.top;this.setLayoutProperties({left:null,top:null,edge:0});this.addState(D);this._updateCaptionBar();this.fireEvent(M);};};},minimize:function(){if(!this.isVisible()){return;};if(this.fireNonBubblingEvent(b,qx.event.type.Event,[false,true])){var bm=this.getLayoutProperties();this.__dA=bm.left===undefined?0:bm.left;this.__dz=bm.top===undefined?0:bm.top;this.removeState(D);this.hide();this.fireEvent(t);};},restore:function(){if(this.getMode()===G){return;};if(this.fireNonBubblingEvent(p,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();};var bn=this.__dA;var top=this.__dz;this.setLayoutProperties({edge:null,left:bn,top:top});this.removeState(D);this._updateCaptionBar();this.fireEvent(O);};},moveTo:function(bo,top){if(this.isMaximized()){return;};this.setLayoutProperties({left:bo,top:top});},isMaximized:function(){return this.hasState(D);},getMode:function(){if(!this.isVisible()){return W;}else {if(this.isMaximized()){return D;}else {return G;};};},_applyActive:function(bq,bp){if(bp){this.removeState(V);}else {this.addState(V);};},_applyModal:function(bs,br){if(br){this.removeState(v);}else {this.addState(v);};},_getContentPaddingTarget:function(){return this.getChildControl(Q);},_applyShowStatusbar:function(bv,bt){var bu=this._getResizeFrame();if(bv){this.addState(z);bu.addState(z);}else {this.removeState(z);bu.removeState(z);};if(bv){this._showChildControl(q);}else {this._excludeChildControl(q);};},_applyCaptionBarChange:function(bx,bw){this._updateCaptionBar();},_applyStatus:function(bz,by){var bA=this.getChildControl(J,true);if(bA){bA.setValue(bz);};},_applyFocusable:function(bC,bB){if(qx.core.Environment.get(I)!==T){qx.ui.core.Widget.prototype._applyFocusable.call(this,bC,bB);};},_onWindowEventStop:function(e){e.stopPropagation();},_onWindowPointerDown:function(e){this.setActive(true);},_onWindowFocusOut:function(e){if(this.getModal()){return;};var bD=e.getRelatedTarget();if(bD!=null&&!qx.ui.core.Widget.contains(this,bD)){this.setActive(false);};},_onCaptionPointerDblTap:function(e){if(this.getAllowMaximize()){this.isMaximized()?this.restore():this.maximize();};},_onMinimizeButtonTap:function(e){this.minimize();this.getChildControl(m).reset();},_onRestoreButtonTap:function(e){this.restore();this.getChildControl(k).reset();},_onMaximizeButtonTap:function(e){this.maximize();this.getChildControl(N).reset();},_onCloseButtonTap:function(e){this.close();this.getChildControl(o).reset();}}});})();
});