qx.$$packageData['144']={"locales":{},"resources":{},"translations":{"C":{},"en":{}}};
qx.Part.$$notifyLoad("144", function() {
(function(){var a="loadEnd",b="qx.io.request.AbstractRequest",c="changePhase",d="GET",f="sent",g="qx.event.type.Data",h="qx.io.request.authentication.IAuthentication",i="error",j="Blob",k="fail",l="loading",m="load",n="qx.event.type.Event",o="abort",p="success",q="String",r="",s="opened",t="POST",u="timeout",v="statusError",w="readyStateChange",x="Abstract method call",y="abstract",z="unsent",A="changeResponse",B="Number",C="FormData",D="Content-Type",E="ArrayBuffer",F="undefined";qx.Class.define(b,{type:y,extend:qx.core.Object,construct:function(G){qx.core.Object.call(this);if(G!==undefined){this.setUrl(G);};this.__oy={};var H=this._transport=this._createTransport();this._setPhase(z);this.__oz=qx.lang.Function.bind(this._onReadyStateChange,this);this.__oA=qx.lang.Function.bind(this._onLoad,this);this.__oB=qx.lang.Function.bind(this._onLoadEnd,this);this.__oC=qx.lang.Function.bind(this._onAbort,this);this.__nw=qx.lang.Function.bind(this._onTimeout,this);this.__oD=qx.lang.Function.bind(this._onError,this);H.onreadystatechange=this.__oz;H.onload=this.__oA;H.onloadend=this.__oB;H.onabort=this.__oC;H.ontimeout=this.__nw;H.onerror=this.__oD;},events:{"readyStateChange":n,"success":n,"load":n,"loadEnd":n,"abort":n,"timeout":n,"error":n,"statusError":n,"fail":n,"changeResponse":g,"changePhase":g},properties:{url:{check:q},timeout:{check:B,nullable:true,init:0},requestData:{check:function(I){return qx.lang.Type.isString(I)||qx.Class.isSubClassOf(I.constructor,qx.core.Object)||qx.lang.Type.isObject(I)||qx.lang.Type.isArray(I)||qx.Bootstrap.getClass(I)==j||qx.Bootstrap.getClass(I)==E||qx.Bootstrap.getClass(I)==C;},nullable:true},authentication:{check:h,nullable:true}},members:{__oz:null,__oA:null,__oB:null,__oC:null,__nw:null,__oD:null,__oE:null,__nz:null,__oF:null,__oy:null,__oG:null,_transport:null,_createTransport:function(){throw new Error(x);},_getConfiguredUrl:function(){},_getConfiguredRequestHeaders:function(){},_getParsedResponse:function(){throw new Error(x);},_getMethod:function(){return d;},_isAsync:function(){return true;},send:function(){var M=this._transport,K,L,N,J;K=this._getConfiguredUrl();if(/\#/.test(K)){K=K.replace(/\#.*/,r);};M.timeout=this.getTimeout();L=this._getMethod();N=this._isAsync();{};M.open(L,K,N);this._setPhase(s);J=this.getRequestData();if([E,j,C].indexOf(qx.Bootstrap.getClass(J))==-1){J=this._serializeData(J);};this._setRequestHeaders();{};L==d?M.send():M.send(J);this._setPhase(f);},abort:function(){{};this.__nz=true;this.__oF=o;this._transport.abort();},_setRequestHeaders:function(){var P=this._transport,O=this._getAllRequestHeaders();for(var Q in O){P.setRequestHeader(Q,O[Q]);};},_getAllRequestHeaders:function(){var R={};qx.lang.Object.mergeWith(R,this._getConfiguredRequestHeaders());qx.lang.Object.mergeWith(R,this.__oH());qx.lang.Object.mergeWith(R,this.__oG);qx.lang.Object.mergeWith(R,this.__oy);return R;},__oH:function(){var T=this.getAuthentication(),S={};if(T){T.getAuthHeaders().forEach(function(U){S[U.key]=U.value;});return S;};},setRequestHeader:function(V,W){this.__oy[V]=W;},getRequestHeader:function(X){return this.__oy[X];},removeRequestHeader:function(Y){if(this.__oy[Y]){delete this.__oy[Y];};},getTransport:function(){return this._transport;},getReadyState:function(){return this._transport.readyState;},getPhase:function(){return this.__oF;},getStatus:function(){return this._transport.status;},getStatusText:function(){return this._transport.statusText;},getResponseText:function(){return this._transport.responseText;},getAllResponseHeaders:function(){return this._transport.getAllResponseHeaders();},getResponseHeader:function(ba){return this._transport.getResponseHeader(ba);},overrideResponseContentType:function(bb){return this._transport.overrideMimeType(bb);},getResponseContentType:function(){return this.getResponseHeader(D);},isDone:function(){return this.getReadyState()===4;},getResponse:function(){return this.__oE;},_setResponse:function(bd){var bc=bd;if(this.__oE!==bd){this.__oE=bd;this.fireEvent(A,qx.event.type.Data,[this.__oE,bc]);};},_onReadyStateChange:function(){var be=this.getReadyState();{};this.fireEvent(w);if(this.__nz){return;};if(be===3){this._setPhase(l);};if(this.isDone()){this.__oI();};},__oI:function(){{};this._setPhase(m);if(qx.util.Request.isSuccessful(this.getStatus())){{};this._setResponse(this._getParsedResponse());this._fireStatefulEvent(p);}else {try{this._setResponse(this._getParsedResponse());}catch(e){};if(this.getStatus()!==0){this._fireStatefulEvent(v);this.fireEvent(k);};};},_onLoad:function(){this.fireEvent(m);},_onLoadEnd:function(){this.fireEvent(a);},_onAbort:function(){this._fireStatefulEvent(o);},_onTimeout:function(){this._fireStatefulEvent(u);this.fireEvent(k);},_onError:function(){this.fireEvent(i);this.fireEvent(k);},_fireStatefulEvent:function(bf){{};this._setPhase(bf);this.fireEvent(bf);},_setPhase:function(bg){var bh=this.__oF;{};this.__oF=bg;this.fireDataEvent(c,bg,bh);},_serializeData:function(bk){var bi=typeof this.getMethod!==F&&this.getMethod()==t,bj=/application\/.*\+?json/.test(this.getRequestHeader(D));if(!bk){return null;};if(qx.lang.Type.isString(bk)){return bk;};if(qx.Class.isSubClassOf(bk.constructor,qx.core.Object)){return qx.util.Serializer.toUriParameter(bk);};if(bj&&(qx.lang.Type.isObject(bk)||qx.lang.Type.isArray(bk))){return qx.lang.Json.stringify(bk);};if(qx.lang.Type.isObject(bk)){return qx.util.Uri.toParameter(bk,bi);};return null;}},environment:{"qx.debug.io":false},destruct:function(){var bm=this._transport,bl=function(){};if(this._transport){bm.onreadystatechange=bm.onload=bm.onloadend=bm.onabort=bm.ontimeout=bm.onerror=bl;window.setTimeout(function(){bm.dispose();},0);};}});})();(function(){var a="HEAD",b="CONNECT",c="OPTIONS",d="PUT",e="GET",f="PATCH",g="//",h="DELETE",i="POST",j="TRACE",k="qx.util.Request";qx.Bootstrap.define(k,{statics:{isCrossDomain:function(l){var n=qx.util.Uri.parseUri(l),location=window.location;if(!location){return false;};var m=location.protocol;if(!(l.indexOf(g)!==-1)){return false;};if(m.substr(0,m.length-1)==n.protocol&&location.host===n.authority&&location.port===n.port){return false;};return true;},isSuccessful:function(status){return (status>=200&&status<300||status===304);},isMethod:function(p){var o=[e,i,d,h,a,c,j,b,f];return (o.indexOf(p)!==-1)?true:false;},methodAllowsRequestBody:function(q){return !((/^(GET|HEAD)$/).test(q));}}});})();(function(){var a="qx.util.Serializer",b='\\\\',c='\\f',d='"',e="null",f='\\"',g="}",h="get",j="{",k='\\r',l="",m='\\t',n="]",o="Class",p="Interface",q="[",r="Mixin",s='":',t="&",u='\\b',v="=",w='\\n',x=",";qx.Class.define(a,{statics:{toUriParameter:function(z,C,y){var E=l;var B=qx.util.PropertyUtil.getAllProperties(z.constructor);for(var name in B){if(B[name].group!=undefined){continue;};var A=z[h+qx.lang.String.firstUp(name)]();if(qx.lang.Type.isArray(A)){var D=qx.data&&qx.data.IListData&&qx.Class.hasInterface(A&&A.constructor,qx.data.IListData);for(var i=0;i<A.length;i++ ){var F=D?A.getItem(i):A[i];E+=this.__oJ(name,F,C);};}else if(qx.lang.Type.isDate(A)&&y!=null){E+=this.__oJ(name,y.format(A),C);}else {E+=this.__oJ(name,A,C);};};return E.substring(0,E.length-1);},__oJ:function(name,I,G){if(I&&I.$$type==o){I=I.classname;};if(I&&(I.$$type==p||I.$$type==r)){I=I.name;};if(I instanceof qx.core.Object&&G!=null){var H=encodeURIComponent(G(I));if(H===undefined){var H=encodeURIComponent(I);};}else {var H=encodeURIComponent(I);};return encodeURIComponent(name)+v+H+t;},toNativeObject:function(L,N,K){var O;if(L==null){return null;};if(qx.data&&qx.data.IListData&&qx.Class.hasInterface(L.constructor,qx.data.IListData)){O=[];for(var i=0;i<L.getLength();i++ ){O.push(qx.util.Serializer.toNativeObject(L.getItem(i),N,K));};return O;};if(qx.lang.Type.isArray(L)){O=[];for(var i=0;i<L.length;i++ ){O.push(qx.util.Serializer.toNativeObject(L[i],N,K));};return O;};if(L.$$type==o){return L.classname;};if(L.$$type==p||L.$$type==r){return L.name;};if(L instanceof qx.core.Object){if(N!=null){var J=N(L);if(J!=undefined){return J;};};O={};var Q=qx.util.PropertyUtil.getAllProperties(L.constructor);for(var name in Q){if(Q[name].group!=undefined){continue;};var M=L[h+qx.lang.String.firstUp(name)]();O[name]=qx.util.Serializer.toNativeObject(M,N,K);};return O;};if(qx.lang.Type.isDate(L)&&K!=null){return K.format(L);};if(qx.locale&&qx.locale.LocalizedString&&L instanceof qx.locale.LocalizedString){return L.toString();};if(qx.lang.Type.isObject(L)){O={};for(var P in L){O[P]=qx.util.Serializer.toNativeObject(L[P],N,K);};return O;};return L;},toJson:function(T,V,S){var W=l;if(T==null){return e;};if(qx.data&&qx.data.IListData&&qx.Class.hasInterface(T.constructor,qx.data.IListData)){W+=q;for(var i=0;i<T.getLength();i++ ){W+=qx.util.Serializer.toJson(T.getItem(i),V,S)+x;};if(W!=q){W=W.substring(0,W.length-1);};return W+n;};if(qx.lang.Type.isArray(T)){W+=q;for(var i=0;i<T.length;i++ ){W+=qx.util.Serializer.toJson(T[i],V,S)+x;};if(W!=q){W=W.substring(0,W.length-1);};return W+n;};if(T.$$type==o){return d+T.classname+d;};if(T.$$type==p||T.$$type==r){return d+T.name+d;};if(T instanceof qx.core.Object){if(V!=null){var R=V(T);if(R!=undefined){return d+R+d;};};W+=j;var Y=qx.util.PropertyUtil.getAllProperties(T.constructor);for(var name in Y){if(Y[name].group!=undefined){continue;};var U=T[h+qx.lang.String.firstUp(name)]();W+=d+name+s+qx.util.Serializer.toJson(U,V,S)+x;};if(W!=j){W=W.substring(0,W.length-1);};return W+g;};if(qx.locale&&qx.locale.LocalizedString&&T instanceof qx.locale.LocalizedString){T=T.toString();};if(qx.lang.Type.isDate(T)&&S!=null){return d+S.format(T)+d;};if(qx.lang.Type.isObject(T)){W+=j;for(var X in T){W+=d+X+s+qx.util.Serializer.toJson(T[X],V,S)+x;};if(W!=j){W=W.substring(0,W.length-1);};return W+g;};if(qx.lang.Type.isString(T)){T=T.replace(/([\\])/g,b);T=T.replace(/(["])/g,f);T=T.replace(/([\r])/g,k);T=T.replace(/([\f])/g,c);T=T.replace(/([\n])/g,w);T=T.replace(/([\t])/g,m);T=T.replace(/([\b])/g,u);return d+T+d;};if(qx.lang.Type.isDate(T)||qx.lang.Type.isRegExp(T)){return d+T+d;};return T+l;}}});})();(function(){var a="null",b="XMLHttpRequest",c="Boolean",d="X-Requested-With",e="",f="application/x-www-form-urlencoded",g="Cache-Control",h="Content-Type",i="qx.event.type.Event",j="GET",k="qx.io.request.Xhr",l="Accept",m="String";qx.Class.define(k,{extend:qx.io.request.AbstractRequest,construct:function(n,o){if(o!==undefined){this.setMethod(o);};qx.io.request.AbstractRequest.call(this,n);this._parser=this._createResponseParser();},events:{"readyStateChange":i,"success":i,"load":i,"statusError":i},properties:{method:{init:j},async:{check:c,init:true},accept:{check:m,nullable:true},cache:{check:function(p){return qx.lang.Type.isBoolean(p)||qx.lang.Type.isString(p);},init:true}},members:{_parser:null,_createTransport:function(){return new qx.bom.request.Xhr();},_getConfiguredUrl:function(){var q=this.getUrl(),r;if(this.getMethod()===j&&this.getRequestData()){r=this._serializeData(this.getRequestData());q=qx.util.Uri.appendParamsToUrl(q,r);};if(this.getCache()===false){q=qx.util.Uri.appendParamsToUrl(q,{nocache:new Date().valueOf()});};return q;},_getConfiguredRequestHeaders:function(){var s={},t=qx.util.Request.methodAllowsRequestBody(this.getMethod());if(!qx.util.Request.isCrossDomain(this.getUrl())){s[d]=b;};if(qx.lang.Type.isString(this.getCache())){s[g]=this.getCache();};if(this.getRequestData()!==a&&t){s[h]=f;};if(this.getAccept()){{};s[l]=this.getAccept();};return s;},_getMethod:function(){return this.getMethod();},_isAsync:function(){return this.isAsync();},_createResponseParser:function(){return new qx.util.ResponseParser();},_getParsedResponse:function(){var v=this._transport.responseText,u=this.getResponseContentType()||e;return this._parser.parse(v,u);},setParser:function(w){return this._parser.setParser(w);}}});})();(function(){var a="activex",b="No XHR support available.",c="If-None-Match",d="xhr",f="If-Modified-Since",g="engine.version",h="onunload",i="GET",j="-1",k="qx.debug.io",l="Undefined",m="HTMLDocument",n="error",o="loadend",p="Blob",q="progress",r="load",s="abort",t="String",u="browser.documentmode",v="",w="engine.name",x="Microsoft.XMLHTTP",y="Already disposed",z="browser.version",A="opera",B="qx.bom.request.Xhr",C="Not enough arguments",D="timeout",E="gecko",F="If-Match",G="mshtml",H="readystatechange",I="Microsoft.XMLDOM",J="file:",K="FormData",L="If-Range",M="Content-Type",N="io.xhr",O="on",P="ArrayBuffer",Q="undefined",R="Native XHR object doesn't support overrideMimeType.";qx.Bootstrap.define(B,{extend:Object,construct:function(){var S=qx.Bootstrap.bind(this.__on,this);if(qx.event&&qx.event.GlobalError&&qx.event.GlobalError.observeMethod){this.__nY=qx.event.GlobalError.observeMethod(S);}else {this.__nY=S;};this.__oa=qx.Bootstrap.bind(this.__ol,this);this.__ob=qx.Bootstrap.bind(this.__om,this);this.__nw=qx.Bootstrap.bind(this.__or,this);this.__ok();this._emitter=new qx.event.Emitter();if(window.attachEvent){this.__oc=qx.Bootstrap.bind(this.__ou,this);window.attachEvent(h,this.__oc);};},statics:{UNSENT:0,OPENED:1,HEADERS_RECEIVED:2,LOADING:3,DONE:4},events:{"readystatechange":B,"error":B,"loadend":B,"timeout":B,"abort":B,"load":B,"progress":B},members:{readyState:0,responseText:v,responseXML:null,status:0,statusText:v,timeout:0,progress:null,open:function(X,T,U,W,V){this.__ow();if(typeof T===Q){throw new Error(C);}else if(typeof X===Q){X=i;};this.__nz=false;this.__od=false;this.__oe=false;this.__nA=T;if(typeof U==Q){U=true;};this.__of=U;if(!this.__ov()&&this.readyState>qx.bom.request.Xhr.UNSENT){this.dispose();this.__ok();};this.__oh.onreadystatechange=this.__nY;try{{};this.__oh.open(X,T,U,W,V);}catch(Y){if(!qx.util.Request.isCrossDomain(T)){throw Y;};if(!this.__of){this.__og=Y;};if(this.__of){if(window.XDomainRequest){this.readyState=4;this.__oh=new XDomainRequest();this.__oh.onerror=qx.Bootstrap.bind(function(){this._emit(H);this._emit(n);this._emit(o);},this);{};this.__oh.open(X,T,U,W,V);return;};window.setTimeout(qx.Bootstrap.bind(function(){if(this.__nB){return;};this.readyState=4;this._emit(H);this._emit(n);this._emit(o);},this));};};if(qx.core.Environment.get(w)===G&&qx.core.Environment.get(u)<9&&this.__oh.readyState>0){this.__oh.setRequestHeader(f,j);};if(qx.core.Environment.get(w)===E&&parseInt(qx.core.Environment.get(g),10)<2&&!this.__of){this.readyState=qx.bom.request.Xhr.OPENED;this._emit(H);};},setRequestHeader:function(ba,bb){this.__ow();if(ba==F||ba==f||ba==c||ba==L){this.__oe=true;};this.__oh.setRequestHeader(ba,bb);return this;},send:function(bd){this.__ow();if(!this.__of&&this.__og){throw this.__og;};if(qx.core.Environment.get(w)===A&&this.timeout===0){this.timeout=10000;};if(this.timeout>0){this.__oi=window.setTimeout(this.__nw,this.timeout);};bd=typeof bd==Q?null:bd;var bc=qx.Bootstrap.getClass(bd);bd=(bd!==null&&this.__oj.indexOf(bc)===-1)?bd.toString():bd;try{{};this.__oh.send(bd);}catch(bf){if(!this.__of){throw bf;};if(this._getProtocol()===J){this.readyState=2;this.__oo();var be=this;window.setTimeout(function(){if(be.__nB){return;};be.readyState=3;be.__oo();be.readyState=4;be.__oo();});};};if(qx.core.Environment.get(w)===E&&!this.__of){this.__on();};this.__od=true;return this;},abort:function(){this.__ow();this.__nz=true;this.__oh.abort();if(this.__oh&&this.readyState!==qx.bom.request.Xhr.DONE){this.readyState=this.__oh.readyState;};return this;},_emit:function(event){if(this[O+event]){this[O+event]();};this._emitter.emit(event,this);},onreadystatechange:function(){},onload:function(){},onloadend:function(){},onerror:function(){},onabort:function(){},ontimeout:function(){},onprogress:function(){},on:function(name,bg,bh){this._emitter.on(name,bg,bh);return this;},getResponseHeader:function(bi){this.__ow();if(qx.core.Environment.get(u)===9&&this.__oh.aborted){return v;};return this.__oh.getResponseHeader(bi);},getAllResponseHeaders:function(){this.__ow();if(qx.core.Environment.get(u)===9&&this.__oh.aborted){return v;};return this.__oh.getAllResponseHeaders();},overrideMimeType:function(bj){this.__ow();if(this.__oh.overrideMimeType){this.__oh.overrideMimeType(bj);}else {throw new Error(R);};return this;},getRequest:function(){return this.__oh;},dispose:function(){if(this.__nB){return false;};window.clearTimeout(this.__oi);if(window.detachEvent){window.detachEvent(h,this.__oc);};try{this.__oh.onreadystatechange;}catch(bl){return false;};var bk=function(){};this.__oh.onreadystatechange=bk;this.__oh.onload=bk;this.__oh.onerror=bk;this.__oh.onprogress=bk;this.abort();this.__oh=null;this.__nB=true;return true;},isDisposed:function(){return !!this.__nB;},_createNativeXhr:function(){var bm=qx.core.Environment.get(N);if(bm===d){return new XMLHttpRequest();};if(bm==a){return new window.ActiveXObject(x);};qx.Bootstrap.error(this,b);},_getProtocol:function(){var bn=this.__nA;var bo=/^(\w+:)\/\//;if(bn!==null&&bn.match){var bp=bn.match(bo);if(bp&&bp[1]){return bp[1];};};return window.location.protocol;},__oh:null,__of:null,__nY:null,__oa:null,__ob:null,__oc:null,__nw:null,__od:null,__nA:null,__nz:null,__df:null,__nB:null,__oi:null,__og:null,__oe:null,__oj:null,__ok:function(){this.__oh=this._createNativeXhr();this.__oh.onreadystatechange=this.__nY;if(qx.Bootstrap.getClass(this.__oh.onabort)!==l){this.__oh.onabort=this.__oa;};if(qx.Bootstrap.getClass(this.__oh.onprogress)!==l){this.__oh.onprogress=this.__ob;this.progress={lengthComputable:false,loaded:0,total:0};};this.__nB=this.__od=this.__nz=false;this.__oj=[P,p,m,t,K];},__ol:function(){if(!this.__nz){this.abort();};},__om:function(e){this.progress.lengthComputable=e.lengthComputable;this.progress.loaded=e.loaded;this.progress.total=e.total;this._emit(q);},__on:function(){var bq=this.__oh,br=true;{};if(this.readyState==bq.readyState){return;};this.readyState=bq.readyState;if(this.readyState===qx.bom.request.Xhr.DONE&&this.__nz&&!this.__od){return;};if(!this.__of&&(bq.readyState==2||bq.readyState==3)){return;};this.status=0;this.statusText=this.responseText=v;this.responseXML=null;if(this.readyState>=qx.bom.request.Xhr.HEADERS_RECEIVED){try{this.status=bq.status;this.statusText=bq.statusText;this.responseText=bq.responseText;this.responseXML=bq.responseXML;}catch(bs){br=false;};if(br){this.__os();this.__ot();};};this.__oo();if(this.readyState==qx.bom.request.Xhr.DONE){if(bq){bq.onreadystatechange=function(){};};};},__oo:function(){if(this.readyState===qx.bom.request.Xhr.DONE){window.clearTimeout(this.__oi);};this._emit(H);if(this.readyState===qx.bom.request.Xhr.DONE){this.__op();};},__op:function(){if(this.__df){this._emit(D);if(qx.core.Environment.get(w)===A){this._emit(n);};this.__df=false;}else {if(this.__nz){this._emit(s);}else {if(this.__oq()){this._emit(n);}else {this._emit(r);};};};this._emit(o);},__oq:function(){var bt;if(this._getProtocol()===J){bt=!this.responseText;}else {bt=!this.statusText&&this.status!==204;};return bt;},__or:function(){var bu=this.__oh;this.readyState=qx.bom.request.Xhr.DONE;this.__df=true;bu.aborted=true;bu.abort();this.responseText=v;this.responseXML=null;this.__oo();},__os:function(){var bv=this.readyState===qx.bom.request.Xhr.DONE;if(this._getProtocol()===J&&this.status===0&&bv){if(!this.__oq()){this.status=200;};};if(this.status===1223){this.status=204;};if(qx.core.Environment.get(w)===A){if(bv&&this.__oe&&!this.__nz&&this.status===0){this.status=304;};};},__ot:function(){if(qx.core.Environment.get(w)==G&&(this.getResponseHeader(M)||v).match(/[^\/]+\/[^\+]+\+xml/)&&this.responseXML&&!this.responseXML.documentElement){var bw=new window.ActiveXObject(I);bw.async=false;bw.validateOnParse=false;bw.loadXML(this.responseText);this.responseXML=bw;};},__ou:function(){try{if(this){this.dispose();};}catch(e){};},__ov:function(){var name=qx.core.Environment.get(w);var bx=qx.core.Environment.get(z);return !(name==G&&bx<9||name==E&&bx<3.5);},__ow:function(){if(this.__nB){throw new Error(y);};}},defer:function(){qx.core.Environment.add(k,false);}});})();(function(){var a="function",b="qx.util.ResponseParser",c="";qx.Bootstrap.define(b,{construct:function(d){if(d!==undefined){this.setParser(d);};},statics:{PARSER:{json:qx.lang.Json.parse,xml:qx.xml.Document.fromString}},members:{__oK:null,parse:function(g,f){var e=this._getParser(f);if(typeof e===a){if(g!==c){return e.call(this,g);};};return g;},setParser:function(h){if(typeof qx.util.ResponseParser.PARSER[h]===a){return this.__oK=qx.util.ResponseParser.PARSER[h];};{};return this.__oK=h;},_getParser:function(j){var i=this.__oK,l=c,k=c;if(i){return i;};l=j||c;k=l.replace(/;.*$/,c);if(/^application\/(\w|\.)*\+?json$/.test(k)){i=qx.util.ResponseParser.PARSER.json;};if(/^application\/xml$/.test(k)){i=qx.util.ResponseParser.PARSER.xml;};if(/[^\/]+\/[^\+]+\+xml$/.test(l)){i=qx.util.ResponseParser.PARSER.xml;};return i;}}});})();(function(){var a="changeModel",b="application/json",c="json",d="aborted",e="loaded",f="qx.event.type.Data",g="error",h="__xi",i="fail",j="receiving",k="queued",l="changeState",m="success",n="String",o="changePhase",p="sending",q="_marshaler",r="completed",s="failed",t="qx.data.store.Json",u="configured",v="changeUrl",w="timeout",x="_applyUrl";qx.Class.define(t,{extend:qx.core.Object,construct:function(y,z){qx.core.Object.call(this);this._marshaler=new qx.data.marshal.Json(z);this._delegate=z;if(y!=null){this.setUrl(y);};},events:{"loaded":f,"error":f},properties:{model:{nullable:true,event:a},state:{check:[u,k,p,j,r,d,w,s],init:u,event:l},url:{check:n,apply:x,event:v,nullable:true}},members:{_marshaler:null,_delegate:null,__xi:null,_applyUrl:function(B,A){if(B!=null){B=qx.util.AliasManager.getInstance().resolve(B);B=qx.util.ResourceManager.getInstance().toUri(B);this._createRequest(B);};},_getRequest:function(){return this.__xi;},_setRequest:function(C){this.__xi=C;},_createRequest:function(D){if(this.__xi){this.__xi.dispose();this.__xi=null;};var E=new qx.io.request.Xhr(D);this._setRequest(E);E.setAccept(b);E.setParser(c);E.addListener(m,this._onSuccess,this);var F=this._delegate;if(F&&qx.lang.Type.isFunction(F.configureRequest)){this._delegate.configureRequest(E);};E.addListener(o,this._onChangePhase,this);E.addListener(i,this._onFail,this);E.send();},_onChangePhase:function(I){var G=I.getData(),J={},H;J={"opened":u,"sent":p,"loading":j,"success":r,"abort":d,"timeout":w,"statusError":s};H=J[G];if(H){this.setState(H);};},_onFail:function(K){var L=K.getTarget();this.fireDataEvent(g,L);},_onSuccess:function(Q){if(this.isDisposed()){return;};var N=Q.getTarget(),M=N.getResponse();var O=this._delegate;if(O&&qx.lang.Type.isFunction(O.manipulateData)){M=this._delegate.manipulateData(M);};this._marshaler.toClass(M,true);var P=this.getModel();this.setModel(this._marshaler.toModel(M));if(P&&P.dispose){P.dispose();};this.fireDataEvent(e,this.getModel());if(this.__xi){this.__xi.dispose();this.__xi=null;};},reload:function(){var R=this.getUrl();if(R!=null){this._createRequest(R);};}},destruct:function(){if(this.__xi!=null){this._disposeObjects(h);};this._disposeSingletonObjects(q);this._delegate=null;}});})();(function(){var a="qx.data.marshal.IMarshaler";qx.Interface.define(a,{members:{toClass:function(b,c){},toModel:function(d){}}});})();(function(){var a='"',b="Class '",c="",d="Unsupported type!",e="change",f="qx.data.marshal.Json",g="Array",h="_validate",j="' could not be found.",k="]",l="[",m="set",n="_applyEventPropagation",o="qx.data.model.";qx.Class.define(f,{extend:qx.core.Object,implement:[qx.data.marshal.IMarshaler],construct:function(p){qx.core.Object.call(this);this.__d=p;},statics:{$$instance:null,createModel:function(q,r){if(this.$$instance===null){this.$$instance=new qx.data.marshal.Json();};this.$$instance.toClass(q,r);return this.$$instance.toModel(q);}},members:{__d:null,__e:function(s){return Object.keys(s).sort().join(a);},toClass:function(t,u){this.__f(t,u,null,0);},__f:function(G,B,v,D){if(!qx.lang.Type.isObject(G)||!!G.$$isString||G instanceof qx.core.Object){if(G instanceof Array||qx.Bootstrap.getClass(G)==g){for(var i=0;i<G.length;i++ ){this.__f(G[i],B,v+l+i+k,D+1);};};return;};var x=this.__e(G);if(this.__j(x,v,D)){return;};for(var F in G){this.__f(G[F],B,F,D+1);};if(qx.Class.isDefined(o+x)){return;};if(this.__d&&this.__d.getModelClass&&this.__d.getModelClass(x,G,v,D)!=null){return;};var H={};var y={__g:this.__g};for(var F in G){if(this.__d&&this.__d.getPropertyMapping){F=this.__d.getPropertyMapping(F,x);};F=F.replace(/-|\.|\s+/g,c);{};H[F]={};H[F].nullable=true;H[F].event=e+qx.lang.String.firstUp(F);if(B){H[F].apply=n;};if(this.__d&&this.__d.getValidationRule){var A=this.__d.getValidationRule(x,F);if(A){H[F].validate=h+F;y[h+F]=A;};};};if(this.__d&&this.__d.getModelSuperClass){var E=this.__d.getModelSuperClass(x,v,D)||qx.core.Object;}else {var E=qx.core.Object;};var z=[];if(this.__d&&this.__d.getModelMixins){var C=this.__d.getModelMixins(x,v,D);if(!qx.lang.Type.isArray(C)){if(C!=null){z=[C];};}else {z=C;};};if(B){z.push(qx.data.marshal.MEventBubbling);};var w={extend:E,include:z,properties:H,members:y,destruct:this.__h};qx.Class.define(o+x,w);},__h:function(){var I=qx.util.PropertyUtil.getAllProperties(this.constructor);for(var J in I){this.__g(this.get(I[J].name));};},__g:function(K){if(!(K instanceof qx.core.Object)){return;};if(K.isDisposed()){return;};K.dispose();},__i:function(L,P,Q,O){var R;if(this.__d&&this.__d.getModelClass){R=this.__d.getModelClass(L,P,Q,O);};if(R!=null){return (new R());}else {var N=o+L;var M=qx.Class.getByName(N);if(!M){throw new Error(b+N+j);};return (new M());};},__j:function(S,V,T){var U=this.__d;return U&&U.ignore&&U.ignore(S,V,T);},toModel:function(W){return this.__k(W,null,0);},__k:function(bj,Y,bf){var bd=qx.lang.Type.isObject(bj);var X=bj instanceof Array||qx.Bootstrap.getClass(bj)==g;if((!bd&&!X)||!!bj.$$isString||bj instanceof qx.core.Object){return bj;}else if(this.__j(this.__e(bj),Y,bf)){return bj;}else if(X){var bh=qx.data.Array;if(this.__d&&this.__d.getArrayClass){var be=this.__d.getArrayClass(Y,bf);bh=be||bh;};var bk=new bh();bk.setAutoDisposeItems(true);for(var i=0;i<bj.length;i++ ){bk.push(this.__k(bj[i],Y+l+i+k,bf+1));};return bk;}else if(bd){var ba=this.__e(bj);var bi=this.__i(ba,bj,Y,bf);for(var bg in bj){var bb=bg;if(this.__d&&this.__d.getPropertyMapping){bb=this.__d.getPropertyMapping(bg,ba);};var bl=bb.replace(/-|\.|\s+/g,c);{};bb=bl;var bc=m+qx.lang.String.firstUp(bb);if(bi[bc]){bi[bc](this.__k(bj[bg],bg,bf+1));};};return bi;};throw new Error(d);}},destruct:function(){this.__d=null;}});})();
});