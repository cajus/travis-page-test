qx.$$packageData['202']={"locales":{},"resources":{},"translations":{"C":{},"cs":{},"de":{},"de_AT":{},"de_DE":{},"en":{},"en_GB":{},"en_US":{},"es":{},"es_ES":{},"es_MX":{},"pt":{},"ro":{},"ro_RO":{},"sv":{},"sv_SE":{}}};
qx.Part.$$notifyLoad("202", function() {
(function(){var a="qx.ui.window.IDesktop";qx.Interface.define(a,{members:{setWindowManager:function(b){this.assertInterface(b,qx.ui.window.IWindowManager);},getWindows:function(){},supportsMaximize:function(){},blockContent:function(c){this.assertInteger(c);},unblock:function(){},isBlocked:function(){}}});})();(function(){var a="qx.ui.window.IWindowManager";qx.Interface.define(a,{members:{setDesktop:function(b){this.assertInterface(b,qx.ui.window.IDesktop);},changeActiveWindow:function(c,d){},updateStack:function(){},bringToFront:function(e){this.assertInstance(e,qx.ui.window.Window);},sendToBack:function(f){this.assertInstance(f,qx.ui.window.Window);}}});})();(function(){var a="__cA",b="qx.ui.window.Manager";qx.Class.define(b,{extend:qx.core.Object,implement:qx.ui.window.IWindowManager,members:{__cA:null,setDesktop:function(c){this.__cA=c;this.updateStack();},getDesktop:function(){return this.__cA;},changeActiveWindow:function(d,e){if(d){this.bringToFront(d);d.setActive(true);};if(e){e.resetActive();};},_minZIndex:1e5,updateStack:function(){qx.ui.core.queue.Widget.add(this);},syncWidget:function(){this.__cA.forceUnblock();var h=this.__cA.getWindows();var g=this._minZIndex;var m=g+h.length*2;var j=g+h.length*4;var k=null;for(var i=0,l=h.length;i<l;i++ ){var f=h[i];if(!f.isVisible()){continue;};k=k||f;if(f.isModal()){f.setZIndex(j);this.__cA.blockContent(j-1);j+=2;k=f;}else if(f.isAlwaysOnTop()){f.setZIndex(m);m+=2;}else {f.setZIndex(g);g+=2;};if(!k.isModal()&&f.isActive()||f.getZIndex()>k.getZIndex()){k=f;};};this.__cA.setActiveWindow(k);},bringToFront:function(o){var n=this.__cA.getWindows();var p=qx.lang.Array.remove(n,o);if(p){n.push(o);this.updateStack();};},sendToBack:function(r){var q=this.__cA.getWindows();var s=qx.lang.Array.remove(q,r);if(s){q.unshift(r);this.updateStack();};}},destruct:function(){this._disposeObjects(a);}});})();(function(){var a="pointerup",b="Boolean",c="losecapture",d="move",f="qx.ui.core.MMovable",g="The move handle could not be redefined!",h="pointerdown",i="maximized",j="__cB",k="pointermove",l="roll",m="__cC",n="move-frame";qx.Mixin.define(f,{properties:{movable:{check:b,init:true},useMoveFrame:{check:b,init:false}},members:{__cB:null,__cC:null,__cD:null,__cE:null,__cF:null,__cG:null,__cH:null,__cI:false,__cJ:null,__cK:0,_activateMoveHandle:function(o){if(this.__cB){throw new Error(g);};this.__cB=o;o.addListener(h,this._onMovePointerDown,this);o.addListener(a,this._onMovePointerUp,this);o.addListener(k,this._onMovePointerMove,this);o.addListener(c,this.__cO,this);},__cL:function(){var p=this.__cC;if(!p){p=this.__cC=new qx.ui.core.Widget();p.setAppearance(n);p.exclude();qx.core.Init.getApplication().getRoot().add(p);};return p;},__cM:function(){var location=this.getContentLocation();var r=this.getBounds();var q=this.__cL();q.setUserBounds(location.left,location.top,r.width,r.height);q.show();q.setZIndex(this.getZIndex()+1);},__cN:function(e){var t=this.__cD;var s=Math.max(t.left,Math.min(t.right,e.getDocumentLeft()));var v=Math.max(t.top,Math.min(t.bottom,e.getDocumentTop()));var u=this.__cE+s;var w=this.__cF+v;return {viewportLeft:parseInt(u,10),viewportTop:parseInt(w,10),parentLeft:parseInt(u-this.__cG,10),parentTop:parseInt(w-this.__cH,10)};},_onMoveRoll:function(e){e.stop();},_onMovePointerDown:function(e){if(!this.getMovable()||this.hasState(i)){return;};this.addListener(l,this._onMoveRoll,this);var parent=this.getLayoutParent();var x=parent.getContentLocation();var z=parent.getBounds();if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(!parent.isBlocked()){this.__cJ=parent.getBlockerColor();this.__cK=parent.getBlockerOpacity();parent.setBlockerColor(null);parent.setBlockerOpacity(1);parent.blockContent(this.getZIndex()-1);this.__cI=true;};};this.__cD={left:x.left,top:x.top,right:x.left+z.width,bottom:x.top+z.height};var y=this.getContentLocation();this.__cG=x.left;this.__cH=x.top;this.__cE=y.left-e.getDocumentLeft();this.__cF=y.top-e.getDocumentTop();this.addState(d);this.__cB.capture();if(this.getUseMoveFrame()){this.__cM();};e.stop();},_onMovePointerMove:function(e){if(!this.hasState(d)){return;};var B=this.__cN(e);if(this.getUseMoveFrame()){this.__cL().setDomPosition(B.viewportLeft,B.viewportTop);}else {var A=this.getLayoutParent().getInsets();this.setDomPosition(B.parentLeft-(A.left||0),B.parentTop-(A.top||0));};e.stopPropagation();},_onMovePointerUp:function(e){if(this.hasListener(l)){this.removeListener(l,this._onMoveRoll,this);};if(!this.hasState(d)){return;};this.removeState(d);var parent=this.getLayoutParent();if(qx.Class.implementsInterface(parent,qx.ui.window.IDesktop)){if(this.__cI){parent.unblock();parent.setBlockerColor(this.__cJ);parent.setBlockerOpacity(this.__cK);this.__cJ=null;this.__cK=0;this.__cI=false;};};this.__cB.releaseCapture();var D=this.__cN(e);var C=this.getLayoutParent().getInsets();this.setLayoutProperties({left:D.parentLeft-(C.left||0),top:D.parentTop-(C.top||0)});if(this.getUseMoveFrame()){this.__cL().exclude();};e.stopPropagation();},__cO:function(e){if(!this.hasState(d)){return;};this.removeState(d);if(this.getUseMoveFrame()){this.__cL().exclude();};}},destruct:function(){this._disposeObjects(m,j);this.__cD=null;}});})();(function(){var a="Boolean",b="w-resize",c="touch",d="sw-resize",f="n-resize",g="resizableRight",h="ne-resize",i="se-resize",j="Integer",k="e-resize",l="resizableLeft",m="move",n="shorthand",o="maximized",p="resize",q="nw-resize",r="pointerup",s="pointerdown",t="qx.ui.core.MResizable",u="losecapture",v="resize-frame",w="resizableBottom",x="s-resize",y="pointermove",z="resizableTop",A="pointerout";qx.Mixin.define(t,{construct:function(){var content=this.getContentElement();content.addListener(s,this.__dc,this,true);content.addListener(r,this.__dd,this);content.addListener(y,this.__df,this);content.addListener(A,this.__dg,this);content.addListener(u,this.__de,this);var B=content.getDomElement();if(B==null){B=window;};this.__cP=qx.event.Registration.getManager(B).getHandler(qx.event.handler.DragDrop);},properties:{resizableTop:{check:a,init:true},resizableRight:{check:a,init:true},resizableBottom:{check:a,init:true},resizableLeft:{check:a,init:true},resizable:{group:[z,g,w,l],mode:n},resizeSensitivity:{check:j,init:5},useResizeFrame:{check:a,init:true}},members:{__cP:null,__cQ:null,__cR:null,__cS:null,__cT:null,__cU:null,__cV:null,RESIZE_TOP:1,RESIZE_BOTTOM:2,RESIZE_LEFT:4,RESIZE_RIGHT:8,_getResizeFrame:function(){var C=this.__cQ;if(!C){C=this.__cQ=new qx.ui.core.Widget();C.setAppearance(v);C.exclude();qx.core.Init.getApplication().getRoot().add(C);};return C;},__cW:function(){var location=this.getContentLocation();var D=this._getResizeFrame();D.setUserBounds(location.left,location.top,location.right-location.left,location.bottom-location.top);D.show();D.setZIndex(this.getZIndex()+1);},__cX:function(e){var F=this.__cR;var E=this.getSizeHint();var I=this.__cV;var H=this.__cU;var J=H.width;var G=H.height;var L=H.left;var top=H.top;var K;if((F&this.RESIZE_TOP)||(F&this.RESIZE_BOTTOM)){K=Math.max(I.top,Math.min(I.bottom,e.getDocumentTop()))-this.__cT;if(F&this.RESIZE_TOP){G-=K;}else {G+=K;};if(G<E.minHeight){G=E.minHeight;}else if(G>E.maxHeight){G=E.maxHeight;};if(F&this.RESIZE_TOP){top+=H.height-G;};};if((F&this.RESIZE_LEFT)||(F&this.RESIZE_RIGHT)){K=Math.max(I.left,Math.min(I.right,e.getDocumentLeft()))-this.__cS;if(F&this.RESIZE_LEFT){J-=K;}else {J+=K;};if(J<E.minWidth){J=E.minWidth;}else if(J>E.maxWidth){J=E.maxWidth;};if(F&this.RESIZE_LEFT){L+=H.width-J;};};return {viewportLeft:L,viewportTop:top,parentLeft:H.bounds.left+L-H.left,parentTop:H.bounds.top+top-H.top,width:J,height:G};},__cY:{'1':f,'2':x,'4':b,'8':k,'5':q,'6':d,'9':h,'10':i},__da:function(e){var location=this.getContentLocation();var O=this.getResizeSensitivity();var N=e.getDocumentLeft();var P=e.getDocumentTop();var M=this.__db(location,N,P,O);if(M>0){M=M|this.__db(location,N,P,O*2);};this.__cR=M;},__db:function(location,T,R,S){var Q=0;if(this.getResizableTop()&&Math.abs(location.top-R)<S&&T>location.left-S&&T<location.right+S){Q+=this.RESIZE_TOP;}else if(this.getResizableBottom()&&Math.abs(location.bottom-R)<S&&T>location.left-S&&T<location.right+S){Q+=this.RESIZE_BOTTOM;};if(this.getResizableLeft()&&Math.abs(location.left-T)<S&&R>location.top-S&&R<location.bottom+S){Q+=this.RESIZE_LEFT;}else if(this.getResizableRight()&&Math.abs(location.right-T)<S&&R>location.top-S&&R<location.bottom+S){Q+=this.RESIZE_RIGHT;};return Q;},__dc:function(e){if(!this.__cR||!this.getEnabled()||e.getPointerType()==c){return;};this.addState(p);this.__cS=e.getDocumentLeft();this.__cT=e.getDocumentTop();var location=this.getContentLocation();var V=this.getBounds();this.__cU={top:location.top,left:location.left,width:location.right-location.left,height:location.bottom-location.top,bounds:qx.lang.Object.clone(V)};var parent=this.getLayoutParent();var W=parent.getContentLocation();var U=parent.getBounds();this.__cV={left:W.left,top:W.top,right:W.left+U.width,bottom:W.top+U.height};if(this.getUseResizeFrame()){this.__cW();};this.capture();e.stop();},__dd:function(e){if(!this.hasState(p)||!this.getEnabled()||e.getPointerType()==c){return;};if(this.getUseResizeFrame()){this._getResizeFrame().exclude();};var X=this.__cX(e);this.setWidth(X.width);this.setHeight(X.height);if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:X.parentLeft,top:X.parentTop});};this.__cR=0;this.removeState(p);this.resetCursor();this.getApplicationRoot().resetGlobalCursor();this.releaseCapture();e.stopPropagation();},__de:function(e){if(!this.__cR){return;};this.resetCursor();this.getApplicationRoot().resetGlobalCursor();this.removeState(m);if(this.getUseResizeFrame()){this._getResizeFrame().exclude();};},__df:function(e){if(!this.getEnabled()||e.getPointerType()==c){return;};if(this.hasState(p)){var ba=this.__cX(e);if(this.getUseResizeFrame()){var Y=this._getResizeFrame();Y.setUserBounds(ba.viewportLeft,ba.viewportTop,ba.width,ba.height);}else {this.setWidth(ba.width);this.setHeight(ba.height);if(this.getResizableLeft()||this.getResizableTop()){this.setLayoutProperties({left:ba.parentLeft,top:ba.parentTop});};};e.stopPropagation();}else if(!this.hasState(o)&&!this.__cP.isSessionActive()){this.__da(e);var bd=this.__cR;var bc=this.getApplicationRoot();if(bd){var bb=this.__cY[bd];this.setCursor(bb);bc.setGlobalCursor(bb);}else if(this.getCursor()){this.resetCursor();bc.resetGlobalCursor();};};},__dg:function(e){if(e.getPointerType()==c){return;};if(this.getCursor()&&!this.hasState(p)){this.resetCursor();this.getApplicationRoot().resetGlobalCursor();};}},destruct:function(){if(this.__cQ!=null&&!qx.core.ObjectRegistry.inShutDown){this.__cQ.destroy();this.__cQ=null;};this.__cP=null;}});})();(function(){var a="beforeClose",b="beforeMinimize",c="Boolean",d="window-resize-frame",f="changeStatus",g="changeIcon",h="excluded",i="_applyModal",j="execute",k="restore-button",l="_applyActive",m="minimize-button",n="qx.event.type.Event",o="close-button",p="beforeRestore",q="statusbar",r="captionbar",s="String",t="minimize",u="dbltap",v="modal",w="changeModal",x="title",y="icon",z="showStatusbar",A="changeAlwaysOnTop",B="_applyShowStatusbar",C="pointerdown",D="maximized",E="_applyStatus",F="qx.ui.window.Window",G="normal",H="changeCaption",I="engine.name",J="statusbar-text",K="focusout",L="beforeMaximize",M="maximize",N="maximize-button",O="restore",P="window",Q="pane",R="close",S="changeActive",T="mshtml",U="_applyCaptionBarChange",V="active",W="minimized";qx.Class.define(F,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.core.MRemoteLayoutHandling,qx.ui.core.MResizable,qx.ui.core.MMovable,qx.ui.core.MContentPadding],construct:function(X,Y){qx.ui.core.Widget.call(this);this._setLayout(new qx.ui.layout.VBox());this._createChildControl(r);this._createChildControl(Q);if(Y!=null){this.setIcon(Y);};if(X!=null){this.setCaption(X);};this._updateCaptionBar();this.addListener(C,this._onWindowPointerDown,this,true);this.addListener(K,this._onWindowFocusOut,this);qx.core.Init.getApplication().getRoot().add(this);this.initVisibility();qx.ui.core.FocusHandler.getInstance().addRoot(this);this._getResizeFrame().setAppearance(d);},statics:{DEFAULT_MANAGER_CLASS:qx.ui.window.Manager},events:{"beforeClose":n,"close":n,"beforeMinimize":n,"minimize":n,"beforeMaximize":n,"maximize":n,"beforeRestore":n,"restore":n},properties:{appearance:{refine:true,init:P},visibility:{refine:true,init:h},focusable:{refine:true,init:true},active:{check:c,init:false,apply:l,event:S},alwaysOnTop:{check:c,init:false,event:A},modal:{check:c,init:false,event:w,apply:i},caption:{apply:U,event:H,nullable:true},icon:{check:s,nullable:true,apply:U,event:g,themeable:true},status:{check:s,nullable:true,apply:E,event:f},showClose:{check:c,init:true,apply:U,themeable:true},showMaximize:{check:c,init:true,apply:U,themeable:true},showMinimize:{check:c,init:true,apply:U,themeable:true},allowClose:{check:c,init:true,apply:U},allowMaximize:{check:c,init:true,apply:U},allowMinimize:{check:c,init:true,apply:U},showStatusbar:{check:c,init:false,apply:B}},members:{__dz:null,__dA:null,getChildrenContainer:function(){return this.getChildControl(Q);},_forwardStates:{active:true,maximized:true,showStatusbar:true,modal:true},setLayoutParent:function(parent){{};qx.ui.core.Widget.prototype.setLayoutParent.call(this,parent);},_createChildControlImpl:function(be,bd){var ba;switch(be){case q:ba=new qx.ui.container.Composite(new qx.ui.layout.HBox());this._add(ba);ba.add(this.getChildControl(J));break;case J:ba=new qx.ui.basic.Label();ba.setValue(this.getStatus());break;case Q:ba=new qx.ui.container.Composite();this._add(ba,{flex:1});break;case r:var bb=new qx.ui.layout.Grid();bb.setRowFlex(0,1);bb.setColumnFlex(1,1);ba=new qx.ui.container.Composite(bb);this._add(ba);ba.addListener(u,this._onCaptionPointerDblTap,this);this._activateMoveHandle(ba);break;case y:ba=new qx.ui.basic.Image(this.getIcon());this.getChildControl(r).add(ba,{row:0,column:0});break;case x:ba=new qx.ui.basic.Label(this.getCaption());ba.setWidth(0);ba.setAllowGrowX(true);var bc=this.getChildControl(r);bc.add(ba,{row:0,column:1});break;case m:ba=new qx.ui.form.Button();ba.setFocusable(false);ba.addListener(j,this._onMinimizeButtonTap,this);this.getChildControl(r).add(ba,{row:0,column:2});break;case k:ba=new qx.ui.form.Button();ba.setFocusable(false);ba.addListener(j,this._onRestoreButtonTap,this);this.getChildControl(r).add(ba,{row:0,column:3});break;case N:ba=new qx.ui.form.Button();ba.setFocusable(false);ba.addListener(j,this._onMaximizeButtonTap,this);this.getChildControl(r).add(ba,{row:0,column:4});break;case o:ba=new qx.ui.form.Button();ba.setFocusable(false);ba.addListener(j,this._onCloseButtonTap,this);this.getChildControl(r).add(ba,{row:0,column:6});break;};return ba||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,be);},_updateCaptionBar:function(){var bg;var bh=this.getIcon();if(bh){this.getChildControl(y).setSource(bh);this._showChildControl(y);}else {this._excludeChildControl(y);};var bf=this.getCaption();if(bf){this.getChildControl(x).setValue(bf);this._showChildControl(x);}else {this._excludeChildControl(x);};if(this.getShowMinimize()){this._showChildControl(m);bg=this.getChildControl(m);this.getAllowMinimize()?bg.resetEnabled():bg.setEnabled(false);}else {this._excludeChildControl(m);};if(this.getShowMaximize()){if(this.isMaximized()){this._showChildControl(k);this._excludeChildControl(N);}else {this._showChildControl(N);this._excludeChildControl(k);};bg=this.getChildControl(N);this.getAllowMaximize()?bg.resetEnabled():bg.setEnabled(false);}else {this._excludeChildControl(N);this._excludeChildControl(k);};if(this.getShowClose()){this._showChildControl(o);bg=this.getChildControl(o);this.getAllowClose()?bg.resetEnabled():bg.setEnabled(false);}else {this._excludeChildControl(o);};},close:function(){if(!this.isVisible()){return;};if(this.fireNonBubblingEvent(a,qx.event.type.Event,[false,true])){this.hide();this.fireEvent(R);};},open:function(){this.show();this.setActive(true);this.focus();},center:function(){var parent=this.getLayoutParent();if(parent){var bj=parent.getBounds();if(bj){var bk=this.getSizeHint();var bi=Math.round((bj.width-bk.width)/2);var top=Math.round((bj.height-bk.height)/2);if(top<0){top=0;};this.moveTo(bi,top);return;};};{};},maximize:function(){if(this.isMaximized()){return;};var parent=this.getLayoutParent();if(parent!=null&&parent.supportsMaximize()){if(this.fireNonBubblingEvent(L,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();};var bl=this.getLayoutProperties();this.__dA=bl.left===undefined?0:bl.left;this.__dz=bl.top===undefined?0:bl.top;this.setLayoutProperties({left:null,top:null,edge:0});this.addState(D);this._updateCaptionBar();this.fireEvent(M);};};},minimize:function(){if(!this.isVisible()){return;};if(this.fireNonBubblingEvent(b,qx.event.type.Event,[false,true])){var bm=this.getLayoutProperties();this.__dA=bm.left===undefined?0:bm.left;this.__dz=bm.top===undefined?0:bm.top;this.removeState(D);this.hide();this.fireEvent(t);};},restore:function(){if(this.getMode()===G){return;};if(this.fireNonBubblingEvent(p,qx.event.type.Event,[false,true])){if(!this.isVisible()){this.open();};var bn=this.__dA;var top=this.__dz;this.setLayoutProperties({edge:null,left:bn,top:top});this.removeState(D);this._updateCaptionBar();this.fireEvent(O);};},moveTo:function(bo,top){if(this.isMaximized()){return;};this.setLayoutProperties({left:bo,top:top});},isMaximized:function(){return this.hasState(D);},getMode:function(){if(!this.isVisible()){return W;}else {if(this.isMaximized()){return D;}else {return G;};};},_applyActive:function(bq,bp){if(bp){this.removeState(V);}else {this.addState(V);};},_applyModal:function(bs,br){if(br){this.removeState(v);}else {this.addState(v);};},_getContentPaddingTarget:function(){return this.getChildControl(Q);},_applyShowStatusbar:function(bv,bt){var bu=this._getResizeFrame();if(bv){this.addState(z);bu.addState(z);}else {this.removeState(z);bu.removeState(z);};if(bv){this._showChildControl(q);}else {this._excludeChildControl(q);};},_applyCaptionBarChange:function(bx,bw){this._updateCaptionBar();},_applyStatus:function(bz,by){var bA=this.getChildControl(J,true);if(bA){bA.setValue(bz);};},_applyFocusable:function(bC,bB){if(qx.core.Environment.get(I)!==T){qx.ui.core.Widget.prototype._applyFocusable.call(this,bC,bB);};},_onWindowEventStop:function(e){e.stopPropagation();},_onWindowPointerDown:function(e){this.setActive(true);},_onWindowFocusOut:function(e){if(this.getModal()){return;};var bD=e.getRelatedTarget();if(bD!=null&&!qx.ui.core.Widget.contains(this,bD)){this.setActive(false);};},_onCaptionPointerDblTap:function(e){if(this.getAllowMaximize()){this.isMaximized()?this.restore():this.maximize();};},_onMinimizeButtonTap:function(e){this.minimize();this.getChildControl(m).reset();},_onRestoreButtonTap:function(e){this.restore();this.getChildControl(k).reset();},_onMaximizeButtonTap:function(e){this.maximize();this.getChildControl(N).reset();},_onCloseButtonTap:function(e){this.close();this.getChildControl(o).reset();}}});})();(function(){var a="qx.ui.window.Desktop";qx.Class.define(a,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.window.MDesktop,qx.ui.core.MBlocker],implement:qx.ui.window.IDesktop,construct:function(b){qx.ui.core.Widget.call(this);b=b||new qx.ui.window.Window.DEFAULT_MANAGER_CLASS();this.getContentElement().disableScrolling();this._setLayout(new qx.ui.layout.Canvas().set({desktop:true}));this.setWindowManager(b);}});})();(function(){var a="showcase.page.AbstractDesktopContent",b="Abstract method call!";qx.Class.define(a,{extend:showcase.AbstractContent,construct:function(c){showcase.AbstractContent.call(this,c);this.setView(this._createView());},members:{_createView:function(){var e=new qx.ui.window.Desktop(new qx.ui.window.Manager());var d=new qx.ui.window.Window();d.set({showClose:false,showMinimize:false,contentPadding:0});this._addWindowContent(d);e.add(d);d.moveTo(30,20);d.open();return e;},_addWindowContent:function(f){throw new Error(b);}}});})();
});