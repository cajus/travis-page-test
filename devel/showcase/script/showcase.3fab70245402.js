qx.$$packageData['33']={"locales":{},"resources":{},"translations":{"C":{},"cs":{"Last month":"Předchozí měsíc","Last year":"Předchozí rok","Next month":"Další měsíc","Next year":"Další rok"},"de":{"Last month":"Vorheriger Monat","Last year":"Vorheriges Jahr","Next month":"Nächster Monat","Next year":"Nächstes Jahr"},"en":{},"es":{"Last month":"Último mes","Last year":"Último año","Next month":"Mes siguiente","Next year":"Año siguiente"},"pt":{"Last month":"Mês anterior","Last year":"Ano anterior","Next month":"Próximo mês","Next year":"Próximo ano"},"ro":{"Last month":"Luna trecută","Last year":"Anul trecut","Next month":"Luna următoare","Next year":"Anul următor"},"sv":{"Last month":"Föregående månad","Last year":"Föregående år","Next month":"Nästa månad","Next year":"Nästa år"}}};
qx.Part.$$notifyLoad("33", function() {
(function(){var a="qx.ui.form.IDateForm",b="qx.event.type.Data";qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;},resetValue:function(){},getValue:function(){}}});})();(function(){var a="blur",b="Enter",c="changeValue",d="selected",f="key",g="button",h="Down",i="execute",j="qx.event.type.Data",k="inner",l="visible",m="quick",n="String",o="list",p="textfield",q="qx.ui.form.ComboBox",r="single",s="focusin",t="combobox",u="popup",v="focusout",w="_applyPlaceholder",x="tap";qx.Class.define(q,{extend:qx.ui.form.AbstractSelectBox,implement:[qx.ui.form.IStringForm],construct:function(){qx.ui.form.AbstractSelectBox.call(this);var y=this._createChildControl(p);this._createChildControl(g);this.addListener(x,this._onTap);this.addListener(s,function(e){y.fireNonBubblingEvent(s,qx.event.type.Focus);},this);this.addListener(v,function(e){y.fireNonBubblingEvent(v,qx.event.type.Focus);},this);},properties:{appearance:{refine:true,init:t},placeholder:{check:n,nullable:true,apply:w}},events:{"changeValue":j},members:{__Iw:null,__Ix:null,_applyPlaceholder:function(A,z){this.getChildControl(p).setPlaceholder(A);},_createChildControlImpl:function(D,C){var B;switch(D){case p:B=new qx.ui.form.TextField();B.setFocusable(false);B.addState(k);B.addListener(c,this._onTextFieldChangeValue,this);B.addListener(a,this.close,this);this._add(B,{flex:1});break;case g:B=new qx.ui.form.Button();B.setFocusable(false);B.setKeepActive(true);B.addState(k);B.addListener(i,this.toggle,this);this._add(B);break;case o:B=qx.ui.form.AbstractSelectBox.prototype._createChildControlImpl.call(this,D);B.setSelectionMode(r);break;};return B||qx.ui.form.AbstractSelectBox.prototype._createChildControlImpl.call(this,D);},_forwardStates:{focused:true,invalid:true},tabFocus:function(){var E=this.getChildControl(p);E.getFocusElement().focus();E.selectAllText();},focus:function(){qx.ui.form.AbstractSelectBox.prototype.focus.call(this);this.getChildControl(p).getFocusElement().focus();},setValue:function(G){var F=this.getChildControl(p);if(F.getValue()==G){return;};F.setValue(G);},getValue:function(){return this.getChildControl(p).getValue();},resetValue:function(){this.getChildControl(p).setValue(null);},_onKeyPress:function(e){var I=this.getChildControl(u);var H=e.getKeyIdentifier();if(H==h&&e.isAltPressed()){this.getChildControl(g).addState(d);this.toggle();e.stopPropagation();}else if(H==b){if(I.isVisible()){this._setPreselectedItem();this.resetAllTextSelection();this.close();e.stop();};}else if(I.isVisible()){qx.ui.form.AbstractSelectBox.prototype._onKeyPress.call(this,e);};},_onTap:function(e){this.close();},_onListPointerDown:function(e){this._setPreselectedItem();},_setPreselectedItem:function(){if(this.__Iw){var J=this.__Iw.getLabel();if(this.getFormat()!=null){J=this.getFormat().call(this,this.__Iw);};if(J&&J.translate){J=J.translate();};this.setValue(J);this.__Iw=null;};},_onListChangeSelection:function(e){var K=e.getData();if(K.length>0){var M=this.getChildControl(o);var L=M.getSelectionContext();if(L==m||L==f){this.__Iw=K[0];}else {var N=K[0].getLabel();if(this.getFormat()!=null){N=this.getFormat().call(this,K[0]);};if(N&&N.translate){N=N.translate();};this.setValue(N);this.__Iw=null;};};},_onPopupChangeVisibility:function(e){qx.ui.form.AbstractSelectBox.prototype._onPopupChangeVisibility.call(this,e);var P=this.getChildControl(u);if(P.isVisible()){var O=this.getChildControl(o);var Q=this.getValue();var R=null;if(Q){R=O.findItem(Q);};if(R){O.setSelection([R]);}else {O.resetSelection();};}else {if(e.getOldData()==l){this.tabFocus();};};this.getChildControl(g).removeState(d);},_onTextFieldChangeValue:function(e){var T=e.getData();var S=this.getChildControl(o);if(T!=null){var U=S.findItem(T,false);if(U){S.setSelection([U]);}else {S.resetSelection();};}else {S.resetSelection();};this.fireDataEvent(c,T,e.getOldData());},getTextSelection:function(){return this.getChildControl(p).getTextSelection();},getTextSelectionLength:function(){return this.getChildControl(p).getTextSelectionLength();},setTextSelection:function(V,W){this.getChildControl(p).setTextSelection(V,W);},clearTextSelection:function(){this.getChildControl(p).clearTextSelection();},selectAllText:function(){this.getChildControl(p).selectAllText();},resetAllTextSelection:function(){this.clearTextSelection();this.selectAllText();}}});})();(function(){var a="popupOpen",b="blur",c="qx.util.format.DateFormat",d="Escape",f="changeValue",g="Left",h="Down",i="button",j="Up",k="execute",l="qx.event.type.Data",m="inner",n="list",o="changeLocale",p="visible",q="middle",r="String",s="_applyDateFormat",t="pointerup",u="",v="changeVisibility",w="textfield",x="qx.dynlocale",y="medium",z="focusin",A="popup",B="qx.ui.form.DateField",C="focusout",D="datefield",E="_applyPlaceholder",F="hidden",G="tap",H="Right";qx.Class.define(B,{extend:qx.ui.core.Widget,include:[qx.ui.core.MRemoteChildrenHandling,qx.ui.form.MForm],implement:[qx.ui.form.IForm,qx.ui.form.IDateForm],construct:function(){qx.ui.core.Widget.call(this);var J=new qx.ui.layout.HBox();this._setLayout(J);J.setAlignY(q);var I=this._createChildControl(w);this._createChildControl(i);this.addListener(G,this._onTap,this);this.addListener(b,this._onBlur,this);this.addListener(z,function(e){I.fireNonBubblingEvent(z,qx.event.type.Focus);I.setTextSelection(0,0);},this);this.addListener(C,function(e){I.fireNonBubblingEvent(C,qx.event.type.Focus);},this);this._setDefaultDateFormat();this._addLocaleChangeListener();},events:{"changeValue":l},properties:{dateFormat:{check:c,apply:s},placeholder:{check:r,nullable:true,apply:E},appearance:{refine:true,init:D},focusable:{refine:true,init:true},width:{refine:true,init:120}},statics:{__Jn:null,__Jo:null,getDefaultDateFormatter:function(){var K=qx.locale.Date.getDateFormat(y).toString();if(K==this.__Jn){return this.__Jo;};if(this.__Jo){this.__Jo.dispose();};this.__Jo=new qx.util.format.DateFormat(K,qx.locale.Manager.getInstance().getLocale());this.__Jn=K;return this.__Jo;}},members:{__Jp:null,_forwardStates:{focused:true,invalid:true},_setDefaultDateFormat:function(){this.setDateFormat(qx.ui.form.DateField.getDefaultDateFormatter());},_addLocaleChangeListener:function(){if(qx.core.Environment.get(x)){this.__Jp=qx.locale.Manager.getInstance().addListener(o,function(){this._setDefaultDateFormat();},this);};},setValue:function(N){var L=this.getChildControl(w);L.setValue(this.getDateFormat().format(N));var M=this.getChildControl(n);M.setValue(N);},getValue:function(){var O=this.getChildControl(w).getValue();try{if(O==null||O.length==0){return null;};return this.getDateFormat().parse(O);}catch(P){return null;};},resetValue:function(){var Q=this.getChildControl(w);Q.setValue(u);var R=this.getChildControl(n);R.setValue(null);},open:function(){var S=this.getChildControl(A);S.placeToWidget(this,true);S.show();},close:function(){this.getChildControl(A).hide();},toggle:function(){var T=this.getChildControl(A).isVisible();if(T){this.close();}else {this.open();};},_applyDateFormat:function(Y,W){if(!W){return;};try{var V=this.getChildControl(w);var X=V.getValue();if(X!=null){var U=W.parse(X);V.setValue(Y.format(U));};}catch(ba){};},_applyPlaceholder:function(bc,bb){this.getChildControl(w).setPlaceholder(bc);},_createChildControlImpl:function(bf,be){var bd;switch(bf){case w:bd=new qx.ui.form.TextField();bd.setFocusable(false);bd.addState(m);bd.addListener(f,this._onTextFieldChangeValue,this);bd.addListener(b,this.close,this);this._add(bd,{flex:1});break;case i:bd=new qx.ui.form.Button();bd.setFocusable(false);bd.setKeepActive(true);bd.addState(m);bd.addListener(k,this.toggle,this);this._add(bd);break;case n:bd=new qx.ui.control.DateChooser();bd.setFocusable(false);bd.setKeepFocus(true);bd.addListener(k,this._onChangeDate,this);break;case A:bd=new qx.ui.popup.Popup(new qx.ui.layout.VBox);bd.setAutoHide(false);bd.add(this.getChildControl(n));bd.addListener(t,this._onChangeDate,this);bd.addListener(v,this._onPopupChangeVisibility,this);break;};return bd||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,bf);},_onChangeDate:function(e){var bg=this.getChildControl(w);var bh=this.getChildControl(n).getValue();bg.setValue(this.getDateFormat().format(bh));this.close();},_onTap:function(e){this.close();},_onBlur:function(e){this.close();},_onKeyPress:function(e){var bi=e.getKeyIdentifier();if(bi==h&&e.isAltPressed()){this.toggle();e.stopPropagation();return;};var bj=this.getChildControl(A);if(bj.getVisibility()==F){return;};if(bi==d){this.close();e.stopPropagation();return;};if(bi===g||bi===H||bi===h||bi===j){e.preventDefault();};this.getChildControl(n).handleKeyPress(e);},_onPopupChangeVisibility:function(e){e.getData()==p?this.addState(a):this.removeState(a);var bl=this.getChildControl(A);if(bl.isVisible()){var bm=this.getChildControl(n);var bk=this.getValue();bm.setValue(bk);};},_onTextFieldChangeValue:function(e){var bn=this.getValue();if(bn!=null){var bo=this.getChildControl(n);bo.setValue(bn);};this.fireDataEvent(f,this.getValue());},isEmpty:function(){var bp=this.getChildControl(w).getValue();return bp==null||bp==u;}},destruct:function(){if(qx.core.Environment.get(x)){if(this.__Jp){qx.locale.Manager.getInstance().removeListenerById(this.__Jp);};};}});})();(function(){var a="PageUp",b="day",c="lastMonth",d="yyyyMMMM",f="Next month",g="Escape",h="Left",j="last-month-button",k="default",l="today",m="weekday",n="changeValue",o="Space",p="selected",q="Down",r="Integer",s="qx.ui.control.DateChooser",t="Up",u="Enter",v="PageDown",w="day#",z="changeLocale",A="Next year",B="ww",C="_applyValue",D="next-month-button",E="next-month-button-tooltip",F="weekday#",G="last-month-button-tooltip",H="datechooser",I="header",J="week",K="lastYear",L="pointerup",M="otherMonth",N="month-year-label",O="nextYear",P="last-year-button",Q="changeShownYear",R="week#",S="qx.dynlocale",T="next-year-button",U="Last month",V="Right",W="Last year",X="MMMM yyyy",Y="EE",bs="week#0",bt="keypress",bu="",bo="navigation-bar",bp="nextMonth",bq="last-year-button-tooltip",br="next-year-button-tooltip",by="Date",bz="tap",bA="pointerdown",bB="date-pane",bv="dbltap",bw="weekend",bx="changeShownMonth";qx.Class.define(s,{extend:qx.ui.core.Widget,include:[qx.ui.core.MExecutable,qx.ui.form.MForm],implement:[qx.ui.form.IExecutable,qx.ui.form.IForm,qx.ui.form.IDateForm],construct:function(bC){qx.ui.core.Widget.call(this);var bF=new qx.ui.layout.VBox();this._setLayout(bF);this._createChildControl(bo);this._createChildControl(bB);this.addListener(bt,this._onKeyPress);var bD=qx.ui.control.DateChooser;if(!bD.MONTH_YEAR_FORMAT){bD.MONTH_YEAR_FORMAT=qx.locale.Date.getDateTimeFormat(d,X);};var bE=(bC!=null)?bC:new Date();this.showMonth(bE.getMonth(),bE.getFullYear());if(qx.core.Environment.get(S)){qx.locale.Manager.getInstance().addListener(z,this._updateDatePane,this);};this.addListener(bA,this._onPointerUpDown,this);this.addListener(L,this._onPointerUpDown,this);},statics:{MONTH_YEAR_FORMAT:null,WEEKDAY_FORMAT:Y,WEEK_FORMAT:B},properties:{appearance:{refine:true,init:H},width:{refine:true,init:200},height:{refine:true,init:150},shownMonth:{check:r,init:null,nullable:true,event:bx},shownYear:{check:r,init:null,nullable:true,event:Q},value:{check:by,init:null,nullable:true,event:n,apply:C}},members:{__Jq:null,__Jr:null,__Js:null,_forwardStates:{invalid:true},_createChildControlImpl:function(bK,bH){var bG;switch(bK){case bo:bG=new qx.ui.container.Composite(new qx.ui.layout.HBox());bG.add(this.getChildControl(P));bG.add(this.getChildControl(j));bG.add(this.getChildControl(N),{flex:1});bG.add(this.getChildControl(D));bG.add(this.getChildControl(T));this._add(bG);break;case bq:bG=new qx.ui.tooltip.ToolTip(this.tr(W));break;case P:bG=new qx.ui.toolbar.Button();bG.addState(K);bG.setFocusable(false);bG.setToolTip(this.getChildControl(bq));bG.addListener(bz,this._onNavButtonTap,this);break;case G:bG=new qx.ui.tooltip.ToolTip(this.tr(U));break;case j:bG=new qx.ui.toolbar.Button();bG.addState(c);bG.setFocusable(false);bG.setToolTip(this.getChildControl(G));bG.addListener(bz,this._onNavButtonTap,this);break;case E:bG=new qx.ui.tooltip.ToolTip(this.tr(f));break;case D:bG=new qx.ui.toolbar.Button();bG.addState(bp);bG.setFocusable(false);bG.setToolTip(this.getChildControl(E));bG.addListener(bz,this._onNavButtonTap,this);break;case br:bG=new qx.ui.tooltip.ToolTip(this.tr(A));break;case T:bG=new qx.ui.toolbar.Button();bG.addState(O);bG.setFocusable(false);bG.setToolTip(this.getChildControl(br));bG.addListener(bz,this._onNavButtonTap,this);break;case N:bG=new qx.ui.basic.Label();bG.setAllowGrowX(true);bG.setAnonymous(true);break;case J:bG=new qx.ui.basic.Label();bG.setAllowGrowX(true);bG.setAllowGrowY(true);bG.setSelectable(false);bG.setAnonymous(true);bG.setCursor(k);break;case m:bG=new qx.ui.basic.Label();bG.setAllowGrowX(true);bG.setAllowGrowY(true);bG.setSelectable(false);bG.setAnonymous(true);bG.setCursor(k);break;case b:bG=new qx.ui.basic.Label();bG.setAllowGrowX(true);bG.setAllowGrowY(true);bG.setCursor(k);bG.addListener(bA,this._onDayTap,this);bG.addListener(bv,this._onDayDblTap,this);break;case bB:var bJ=new qx.ui.layout.Grid();bG=new qx.ui.container.Composite(bJ);for(var i=0;i<8;i++ ){bJ.setColumnFlex(i,1);};for(var i=0;i<7;i++ ){bJ.setRowFlex(i,1);};var bI=this.getChildControl(bs);bI.addState(I);bG.add(bI,{column:0,row:0});this.__Jq=[];for(var i=0;i<7;i++ ){bI=this.getChildControl(F+i);bG.add(bI,{column:i+1,row:0});this.__Jq.push(bI);};this.__Jr=[];this.__Js=[];for(var y=0;y<6;y++ ){var bI=this.getChildControl(R+(y+1));bG.add(bI,{column:0,row:y+1});this.__Js.push(bI);for(var x=0;x<7;x++ ){var bI=this.getChildControl(w+((y*7)+x));bG.add(bI,{column:x+1,row:y+1});this.__Jr.push(bI);};};this._add(bG);break;};return bG||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,bK);},_applyValue:function(bN,bM){if((bN!=null)&&(this.getShownMonth()!=bN.getMonth()||this.getShownYear()!=bN.getFullYear())){this.showMonth(bN.getMonth(),bN.getFullYear());}else {var bL=(bN==null)?-1:bN.getDate();for(var i=0;i<6*7;i++ ){var bO=this.__Jr[i];if(bO.hasState(M)){if(bO.hasState(p)){bO.removeState(p);};}else {var bP=parseInt(bO.getValue(),10);if(bP==bL){bO.addState(p);}else if(bO.hasState(p)){bO.removeState(p);};};};};},_onPointerUpDown:function(e){var bQ=e.getTarget();if(bQ==this.getChildControl(bo)||bQ==this.getChildControl(bB)){e.stopPropagation();return;};},_onNavButtonTap:function(bS){var bR=this.getShownYear();var bT=this.getShownMonth();switch(bS.getCurrentTarget()){case this.getChildControl(P):bR-- ;break;case this.getChildControl(j):bT-- ;if(bT<0){bT=11;bR-- ;};break;case this.getChildControl(D):bT++ ;if(bT>=12){bT=0;bR++ ;};break;case this.getChildControl(T):bR++ ;break;};this.showMonth(bT,bR);},_onDayTap:function(bU){var bV=bU.getCurrentTarget().dateTime;this.setValue(new Date(bV));},_onDayDblTap:function(){this.execute();},_onKeyPress:function(bY){var ca=null;var cb=null;var bX=null;if(bY.getModifiers()==0){switch(bY.getKeyIdentifier()){case h:ca=-1;break;case V:ca=1;break;case t:ca=-7;break;case q:ca=7;break;case a:cb=-1;break;case v:cb=1;break;case g:if(this.getValue()!=null){this.setValue(null);return;};break;case u:case o:if(this.getValue()!=null){this.execute();};return;};}else if(bY.isShiftPressed()){switch(bY.getKeyIdentifier()){case a:bX=-1;break;case v:bX=1;break;};};if(ca!=null||cb!=null||bX!=null){var bW=this.getValue();if(bW!=null){bW=new Date(bW.getTime());};if(bW==null){bW=new Date();}else {if(ca!=null){bW.setDate(bW.getDate()+ca);};if(cb!=null){bW.setMonth(bW.getMonth()+cb);};if(bX!=null){bW.setFullYear(bW.getFullYear()+bX);};};this.setValue(bW);};},showMonth:function(cc,cd){if((cc!=null&&cc!=this.getShownMonth())||(cd!=null&&cd!=this.getShownYear())){if(cc!=null){this.setShownMonth(cc);};if(cd!=null){this.setShownYear(cd);};this._updateDatePane();};},handleKeyPress:function(e){this._onKeyPress(e);},_updateDatePane:function(){var ct=qx.ui.control.DateChooser;var cq=new Date();var ci=cq.getFullYear();var co=cq.getMonth();var cl=cq.getDate();var cu=this.getValue();var cx=(cu==null)?-1:cu.getFullYear();var cE=(cu==null)?-1:cu.getMonth();var cn=(cu==null)?-1:cu.getDate();var cm=this.getShownMonth();var cB=this.getShownYear();var cj=qx.locale.Date.getWeekStart();var cv=new Date(this.getShownYear(),this.getShownMonth(),1);var cs=new qx.util.format.DateFormat(ct.MONTH_YEAR_FORMAT);this.getChildControl(N).setValue(cs.format(cv));var cD=cv.getDay();var cp=1+((7-cD)%7);var cw=new qx.util.format.DateFormat(ct.WEEKDAY_FORMAT);for(var i=0;i<7;i++ ){var cy=(i+cj)%7;var cA=this.__Jq[i];cv.setDate(cp+cy);cA.setValue(cw.format(cv));if(qx.locale.Date.isWeekend(cy)){cA.addState(bw);}else {cA.removeState(bw);};};cv=new Date(cB,cm,1,12,0,0);var cf=(7+cD-cj)%7;cv.setDate(cv.getDate()-cf);var cz=new qx.util.format.DateFormat(ct.WEEK_FORMAT);for(var cr=0;cr<6;cr++ ){this.__Js[cr].setValue(cz.format(cv));for(var i=0;i<7;i++ ){var cA=this.__Jr[cr*7+i];var ch=cv.getFullYear();var cg=cv.getMonth();var ck=cv.getDate();var ce=(cx==ch&&cE==cg&&cn==ck);if(ce){cA.addState(p);}else {cA.removeState(p);};if(cg!=cm){cA.addState(M);}else {cA.removeState(M);};var cC=(ch==ci&&cg==co&&ck==cl);if(cC){cA.addState(l);}else {cA.removeState(l);};cA.setValue(bu+ck);cA.dateTime=cv.getTime();cv.setDate(cv.getDate()+1);};};cs.dispose();cw.dispose();cz.dispose();}},destruct:function(){if(qx.core.Environment.get(S)){qx.locale.Manager.getInstance().removeListener(z,this._updateDatePane,this);};this.__Jq=this.__Jr=this.__Js=null;}});})();(function(){var a="Boolean",b="_applyValid",c="",d="changeRequired",f="changeValid",g="__ov",h="changeInvalidMessage",j="changeSelection",k="_applyInvalidMessage",l="String",m="qx.ui.form.RadioButtonGroup",n="qx.event.type.Data";qx.Class.define(m,{extend:qx.ui.core.Widget,include:[qx.ui.core.MLayoutHandling,qx.ui.form.MModelSelection],implement:[qx.ui.form.IForm,qx.ui.core.ISingleSelection,qx.ui.form.IModelSelection],construct:function(o){qx.ui.core.Widget.call(this);if(o==null){this.setLayout(new qx.ui.layout.VBox(4));}else {this.setLayout(o);};this.__ov=new qx.ui.form.RadioGroup();this.__ov.addListener(j,function(e){this.fireDataEvent(j,e.getData(),e.getOldData());},this);},properties:{valid:{check:a,init:true,apply:b,event:f},required:{check:a,init:false,event:d},invalidMessage:{check:l,init:c,event:h,apply:k},requiredInvalidMessage:{check:l,nullable:true,event:h}},events:{"changeSelection":n},members:{__ov:null,_applyInvalidMessage:function(r,p){var q=this._getChildren();for(var i=0;i<q.length;i++ ){q[i].setInvalidMessage(r);};},_applyValid:function(u,s){var t=this._getChildren();for(var i=0;i<t.length;i++ ){t[i].setValid(u);};},getRadioGroup:function(){return this.__ov;},getChildren:function(){return this._getChildren();},add:function(w,v){this.__ov.add(w);this._add(w,v);},remove:function(x){this.__ov.remove(x);this._remove(x);},removeAll:function(){var y=this.__ov.getItems();for(var i=y.length-1;i>=0;i-- ){this.__ov.remove(y[i]);};return this._removeAll();},getSelection:function(){return this.__ov.getSelection();},setSelection:function(z){this.__ov.setSelection(z);},resetSelection:function(){this.__ov.resetSelection();},isSelected:function(A){return this.__ov.isSelected(A);},isSelectionEmpty:function(){return this.__ov.isSelectionEmpty();},getSelectables:function(B){return this.__ov.getSelectables(B);}},destruct:function(){this._disposeObjects(g);}});})();(function(){var a="__Dg",b="_applyAllowEmptySelection",c="_applyInvalidMessage",d="qx.ui.form.RadioGroup",f="Boolean",g="_applyValid",h="",j="changeRequired",k="changeValid",m="changeEnabled",n="changeInvalidMessage",o="changeSelection",p="changeValue",q="_applyEnabled",r="String";qx.Class.define(d,{extend:qx.core.Object,implement:[qx.ui.core.ISingleSelection,qx.ui.form.IForm,qx.ui.form.IModelSelection],include:[qx.ui.core.MSingleSelectionHandling,qx.ui.form.MModelSelection],construct:function(s){qx.core.Object.call(this);this.__Dg=[];this.addListener(o,this.__Dh,this);if(s!=null){this.add.apply(this,arguments);};},properties:{enabled:{check:f,apply:q,event:m,init:true},wrap:{check:f,init:true},allowEmptySelection:{check:f,init:false,apply:b},valid:{check:f,init:true,apply:g,event:k},required:{check:f,init:false,event:j},invalidMessage:{check:r,init:h,event:n,apply:c},requiredInvalidMessage:{check:r,nullable:true,event:n}},members:{__Dg:null,getItems:function(){return this.__Dg;},add:function(u){var v=this.__Dg;var t;for(var i=0,l=arguments.length;i<l;i++ ){t=arguments[i];if(qx.lang.Array.contains(v,t)){continue;};t.addListener(p,this._onItemChangeChecked,this);v.push(t);t.setGroup(this);if(t.getValue()){this.setSelection([t]);};};if(!this.isAllowEmptySelection()&&v.length>0&&!this.getSelection()[0]){this.setSelection([v[0]]);};},remove:function(w){var x=this.__Dg;if(qx.lang.Array.contains(x,w)){qx.lang.Array.remove(x,w);if(w.getGroup()===this){w.resetGroup();};w.removeListener(p,this._onItemChangeChecked,this);if(w.getValue()){this.resetSelection();};};},getChildren:function(){return this.__Dg;},_onItemChangeChecked:function(e){var y=e.getTarget();if(y.getValue()){this.setSelection([y]);}else if(this.getSelection()[0]==y){this.resetSelection();};},_applyInvalidMessage:function(A,z){for(var i=0;i<this.__Dg.length;i++ ){this.__Dg[i].setInvalidMessage(A);};},_applyValid:function(C,B){for(var i=0;i<this.__Dg.length;i++ ){this.__Dg[i].setValid(C);};},_applyEnabled:function(F,E){var D=this.__Dg;if(F==null){for(var i=0,l=D.length;i<l;i++ ){D[i].resetEnabled();};}else {for(var i=0,l=D.length;i<l;i++ ){D[i].setEnabled(F);};};},_applyAllowEmptySelection:function(H,G){if(!H&&this.isSelectionEmpty()){this.resetSelection();};},selectNext:function(){var J=this.getSelection()[0];var K=this.__Dg;var I=K.indexOf(J);if(I==-1){return;};var i=0;var length=K.length;if(this.getWrap()){I=(I+1)%length;}else {I=Math.min(I+1,length-1);};while(i<length&&!K[I].getEnabled()){I=(I+1)%length;i++ ;};this.setSelection([K[I]]);},selectPrevious:function(){var M=this.getSelection()[0];var N=this.__Dg;var L=N.indexOf(M);if(L==-1){return;};var i=0;var length=N.length;if(this.getWrap()){L=(L-1+length)%length;}else {L=Math.max(L-1,0);};while(i<length&&!N[L].getEnabled()){L=(L-1+length)%length;i++ ;};this.setSelection([N[L]]);},_getItems:function(){return this.getItems();},_isAllowEmptySelection:function(){return this.isAllowEmptySelection();},_isItemSelectable:function(O){return this.__Dg.indexOf(O)!=-1;},__Dh:function(e){var Q=e.getData()[0];var P=e.getOldData()[0];if(P){P.setValue(false);};if(Q){Q.setValue(true);};}},destruct:function(){this._disposeArray(a);}});})();(function(){var a="qx.ui.form.IRadioItem",b="qx.event.type.Data";qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){},getValue:function(){},setGroup:function(d){this.assertInstance(d,qx.ui.form.RadioGroup);},getGroup:function(){}}});})();(function(){var a="keypress",b="Boolean",c="Right",d="label",f="Left",g="_applyValue",h="changeValue",i="Up",j="value",k="qx.ui.form.RadioButton",l="radiobutton",m="toolTipText",n="enabled",o="qx.ui.form.RadioGroup",p="Down",q="_applyGroup",r="checked",s="menu",t="execute";qx.Class.define(k,{extend:qx.ui.form.Button,include:[qx.ui.form.MForm,qx.ui.form.MModelProperty],implement:[qx.ui.form.IRadioItem,qx.ui.form.IForm,qx.ui.form.IBooleanForm,qx.ui.form.IModel],construct:function(u){{};qx.ui.form.Button.call(this,u);this.addListener(t,this._onExecute);this.addListener(a,this._onKeyPress);},properties:{group:{check:o,nullable:true,apply:q},value:{check:b,nullable:true,event:h,apply:g,init:false},appearance:{refine:true,init:l},allowGrowX:{refine:true,init:false}},members:{_forwardStates:{checked:true,focused:true,invalid:true,hovered:true},_bindableProperties:[n,d,m,j,s],_applyValue:function(w,v){w?this.addState(r):this.removeState(r);},_applyGroup:function(y,x){if(x){x.remove(this);};if(y){y.add(this);};},_onExecute:function(e){var z=this.getGroup();if(z&&z.getAllowEmptySelection()){this.toggleValue();}else {this.setValue(true);};},_onKeyPress:function(e){var A=this.getGroup();if(!A){return;};switch(e.getKeyIdentifier()){case f:case i:A.selectPrevious();break;case c:case p:A.selectNext();break;};}}});})();
});