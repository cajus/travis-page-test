(function(){

if (!window.qx) window.qx = {};

qx.$$start = new Date();

if (!qx.$$environment) qx.$$environment = {};
var envinfo = {"locale":"en","locale.variant":"US","qx.allowUrlSettings":true,"qx.allowUrlVariants":true,"qx.application":"demobrowser.demo.layout.Dock","qx.optimization.basecalls":true,"qx.optimization.privates":true,"qx.optimization.strings":true,"qx.optimization.variables":true,"qx.optimization.whitespace":true,"qx.theme":"qx.theme.Indigo"};
for (var k in envinfo) qx.$$environment[k] = envinfo[k];

if (!qx.$$libraries) qx.$$libraries = {};
var libinfo = {"__out__":{"sourceUri":"../../script"},"demobrowser.demo":{"resourceUri":"../../resource","sourceUri":"../../script"},"qx":{"resourceUri":"../../resource","sourceUri":"../../script","sourceViewUri":"https://github.com/qooxdoo/qooxdoo/blob/%{qxGitBranch}/framework/source/class/%{classFilePath}#L%{lineNumber}"}};
for (var k in libinfo) qx.$$libraries[k] = libinfo[k];

qx.$$resources = {};
qx.$$translations = {"C":null,"de":null,"de_DE":null,"en":null,"en_US":null,"fr":null,"fr_FR":null};
qx.$$locales = {"C":null,"de":null,"de_DE":null,"en":null,"en_US":null,"fr":null,"fr_FR":null};
qx.$$packageData = {};
qx.$$g = {}

qx.$$loader = {
  parts : {"boot":[0]},
  packages : {"0":{"uris":["__out__:demobrowser.demo.layout.Dock.e03e9a703f70.js"]}},
  urisBefore : [],
  cssBefore : [],
  boot : "boot",
  closureParts : {},
  bootIsInline : true,
  addNoCacheParam : true,
  delayDefer: false,

  decodeUris : function(compressedUris)
  {
    var libs = qx.$$libraries;
    var uris = [];
    for (var i=0; i<compressedUris.length; i++)
    {
      var uri = compressedUris[i].split(":");
      var euri;
      if (uri.length==2 && uri[0] in libs) {
        var prefix = libs[uri[0]].sourceUri;
        euri = prefix + "/" + uri[1];
      } else {
        euri = compressedUris[i];
      }
      if (qx.$$loader.addNoCacheParam) {
        euri += "?nocache=" + Math.random();
      }
      
      uris.push(euri);
    }
    return uris;
  }
};

var readyStateValue = {"complete" : true};
if (document.documentMode && document.documentMode < 10 ||
    (typeof window.ActiveXObject !== "undefined" && !document.documentMode)) {
  readyStateValue["loaded"] = true;
}

function loadScript(uri, callback) {
  var elem = document.createElement("script");
  elem.charset = "utf-8";
  elem.src = uri;
  elem.onreadystatechange = elem.onload = function() {
    if (!this.readyState || readyStateValue[this.readyState]) {
      elem.onreadystatechange = elem.onload = null;
      if (typeof callback === "function") {
        callback();
      }
    }
  };

  if (isLoadParallel) {
    elem.async = null;
  }

  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

function loadCss(uri) {
  var elem = document.createElement("link");
  elem.rel = "stylesheet";
  elem.type= "text/css";
  elem.href= uri;
  var head = document.getElementsByTagName("head")[0];
  head.appendChild(elem);
}

var isWebkit = /AppleWebKit\/([^ ]+)/.test(navigator.userAgent);
var isLoadParallel = 'async' in document.createElement('script');

function loadScriptList(list, callback) {
  if (list.length == 0) {
    callback();
    return;
  }

  var item;

  if (isLoadParallel) {
    while (list.length) {
      item = list.shift();
      if (list.length) {
        loadScript(item);
      } else {
        loadScript(item, callback);
      }
    }
  } else {
    item = list.shift();
    loadScript(item,  function() {
      if (isWebkit) {
        // force async, else Safari fails with a "maximum recursion depth exceeded"
        window.setTimeout(function() {
          loadScriptList(list, callback);
        }, 0);
      } else {
        loadScriptList(list, callback);
      }
    });
  }
}

var fireContentLoadedEvent = function() {
  qx.$$domReady = true;
  document.removeEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
};
if (document.addEventListener) {
  document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);
}

qx.$$loader.importPackageData = function (dataMap, callback) {
  if (dataMap["resources"]){
    var resMap = dataMap["resources"];
    for (var k in resMap) qx.$$resources[k] = resMap[k];
  }
  if (dataMap["locales"]){
    var locMap = dataMap["locales"];
    var qxlocs = qx.$$locales;
    for (var lang in locMap){
      if (!qxlocs[lang]) qxlocs[lang] = locMap[lang];
      else
        for (var k in locMap[lang]) qxlocs[lang][k] = locMap[lang][k];
    }
  }
  if (dataMap["translations"]){
    var trMap   = dataMap["translations"];
    var qxtrans = qx.$$translations;
    for (var lang in trMap){
      if (!qxtrans[lang]) qxtrans[lang] = trMap[lang];
      else
        for (var k in trMap[lang]) qxtrans[lang][k] = trMap[lang][k];
    }
  }
  if (callback){
    callback(dataMap);
  }
}

qx.$$loader.signalStartup = function ()
{
  qx.Bootstrap.executePendingDefers();
  qx.$$loader.delayDefer = false;
  qx.$$loader.scriptLoaded = true;
  if (window.qx && qx.event && qx.event.handler && qx.event.handler.Application) {
    qx.event.handler.Application.onScriptLoaded();
    qx.$$loader.applicationHandlerReady = true;
  } else {
    qx.$$loader.applicationHandlerReady = false;
  }
}

// Load all stuff
qx.$$loader.init = function(){
  var l=qx.$$loader;
  if (l.cssBefore.length>0) {
    for (var i=0, m=l.cssBefore.length; i<m; i++) {
      loadCss(l.cssBefore[i]);
    }
  }
  if (l.urisBefore.length>0){
    loadScriptList(l.urisBefore, function(){
      l.initUris();
    });
  } else {
    l.initUris();
  }
}

// Load qooxdoo boot stuff
qx.$$loader.initUris = function(){
  var l=qx.$$loader;
  var bootPackageHash=l.parts[l.boot][0];
  if (l.bootIsInline){
    l.importPackageData(qx.$$packageData[bootPackageHash]);
    l.signalStartup();
  } else {
    loadScriptList(l.decodeUris(l.packages[l.parts[l.boot][0]].uris), function(){
      // Opera needs this extra time to parse the scripts
      window.setTimeout(function(){
        l.importPackageData(qx.$$packageData[bootPackageHash] || {});
        l.signalStartup();
      }, 0);
    });
  }
}
})();

qx.$$packageData['0']={"locales":{"C":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EHm":"E HH:mm","cldr_date_time_format_EHms":"E HH:mm:ss","cldr_date_time_format_Ed":"d E","cldr_date_time_format_Ehm":"E h:mm a","cldr_date_time_format_Ehms":"E h:mm:ss a","cldr_date_time_format_Gy":"y G","cldr_date_time_format_GyMMM":"MMM y G","cldr_date_time_format_GyMMMEd":"E, MMM d, y G","cldr_date_time_format_GyMMMd":"MMM d, y G","cldr_date_time_format_H":"HH","cldr_date_time_format_Hm":"HH:mm","cldr_date_time_format_Hms":"HH:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_h":"h a","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_hms":"h:mm:ss a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/y","cldr_date_time_format_yMEd":"E, M/d/y","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"E, MMM d, y","cldr_date_time_format_yMMMd":"MMM d, y","cldr_date_time_format_yMd":"M/d/y","cldr_date_time_format_yQQQ":"QQQ y","cldr_date_time_format_yQQQQ":"QQQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_short_fri":"Fr","cldr_day_format_short_mon":"Mo","cldr_day_format_short_sat":"Sa","cldr_day_format_short_sun":"Su","cldr_day_format_short_thu":"Th","cldr_day_format_short_tue":"Tu","cldr_day_format_short_wed":"We","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"},"de":{"alternateQuotationEnd":"‘","alternateQuotationStart":"‚","cldr_am":"vorm.","cldr_date_format_full":"EEEE, d. MMMM y","cldr_date_format_long":"d. MMMM y","cldr_date_format_medium":"dd.MM.y","cldr_date_format_short":"dd.MM.yy","cldr_date_time_format_EHm":"E, HH:mm","cldr_date_time_format_EHms":"E, HH:mm:ss","cldr_date_time_format_Ed":"E, d.","cldr_date_time_format_Ehm":"E h:mm a","cldr_date_time_format_Ehms":"E, h:mm:ss a","cldr_date_time_format_Gy":"y G","cldr_date_time_format_GyMMM":"MMM y G","cldr_date_time_format_GyMMMEd":"E, d. MMM y G","cldr_date_time_format_GyMMMd":"d. MMM y G","cldr_date_time_format_H":"HH 'Uhr'","cldr_date_time_format_Hm":"HH:mm","cldr_date_time_format_Hms":"HH:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, d.M.","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, d. MMM","cldr_date_time_format_MMMMEd":"E, d. MMMM","cldr_date_time_format_MMMd":"d. MMM","cldr_date_time_format_MMd":"d.MM.","cldr_date_time_format_MMdd":"dd.MM.","cldr_date_time_format_Md":"d.M.","cldr_date_time_format_d":"d","cldr_date_time_format_h":"h a","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_hms":"h:mm:ss a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M.y","cldr_date_time_format_yMEd":"E, d.M.y","cldr_date_time_format_yMM":"MM.y","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"E, d. MMM y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yMMMd":"d. MMM y","cldr_date_time_format_yMMdd":"dd.MM.y","cldr_date_time_format_yMd":"d.M.y","cldr_date_time_format_yQQQ":"QQQ y","cldr_date_time_format_yQQQQ":"QQQQ y","cldr_day_format_abbreviated_fri":"Fr.","cldr_day_format_abbreviated_mon":"Mo.","cldr_day_format_abbreviated_sat":"Sa.","cldr_day_format_abbreviated_sun":"So.","cldr_day_format_abbreviated_thu":"Do.","cldr_day_format_abbreviated_tue":"Di.","cldr_day_format_abbreviated_wed":"Mi.","cldr_day_format_narrow_fri":"F","cldr_day_format_narrow_mon":"M","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"S","cldr_day_format_narrow_thu":"D","cldr_day_format_narrow_tue":"D","cldr_day_format_narrow_wed":"M","cldr_day_format_short_fri":"Fr.","cldr_day_format_short_mon":"Mo.","cldr_day_format_short_sat":"Sa.","cldr_day_format_short_sun":"So.","cldr_day_format_short_thu":"Do.","cldr_day_format_short_tue":"Di.","cldr_day_format_short_wed":"Mi.","cldr_day_format_wide_fri":"Freitag","cldr_day_format_wide_mon":"Montag","cldr_day_format_wide_sat":"Samstag","cldr_day_format_wide_sun":"Sonntag","cldr_day_format_wide_thu":"Donnerstag","cldr_day_format_wide_tue":"Dienstag","cldr_day_format_wide_wed":"Mittwoch","cldr_day_stand-alone_abbreviated_fri":"Fr","cldr_day_stand-alone_abbreviated_mon":"Mo","cldr_day_stand-alone_abbreviated_sat":"Sa","cldr_day_stand-alone_abbreviated_sun":"So","cldr_day_stand-alone_abbreviated_thu":"Do","cldr_day_stand-alone_abbreviated_tue":"Di","cldr_day_stand-alone_abbreviated_wed":"Mi","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"D","cldr_day_stand-alone_narrow_tue":"D","cldr_day_stand-alone_narrow_wed":"M","cldr_day_stand-alone_short_fri":"Fr.","cldr_day_stand-alone_short_mon":"Mo.","cldr_day_stand-alone_short_sat":"Sa.","cldr_day_stand-alone_short_sun":"So.","cldr_day_stand-alone_short_thu":"Do.","cldr_day_stand-alone_short_tue":"Di.","cldr_day_stand-alone_short_wed":"Mi.","cldr_day_stand-alone_wide_fri":"Freitag","cldr_day_stand-alone_wide_mon":"Montag","cldr_day_stand-alone_wide_sat":"Samstag","cldr_day_stand-alone_wide_sun":"Sonntag","cldr_day_stand-alone_wide_thu":"Donnerstag","cldr_day_stand-alone_wide_tue":"Dienstag","cldr_day_stand-alone_wide_wed":"Mittwoch","cldr_month_format_abbreviated_1":"Jan.","cldr_month_format_abbreviated_10":"Okt.","cldr_month_format_abbreviated_11":"Nov.","cldr_month_format_abbreviated_12":"Dez.","cldr_month_format_abbreviated_2":"Feb.","cldr_month_format_abbreviated_3":"März","cldr_month_format_abbreviated_4":"Apr.","cldr_month_format_abbreviated_5":"Mai","cldr_month_format_abbreviated_6":"Juni","cldr_month_format_abbreviated_7":"Juli","cldr_month_format_abbreviated_8":"Aug.","cldr_month_format_abbreviated_9":"Sep.","cldr_month_format_narrow_1":"J","cldr_month_format_narrow_10":"O","cldr_month_format_narrow_11":"N","cldr_month_format_narrow_12":"D","cldr_month_format_narrow_2":"F","cldr_month_format_narrow_3":"M","cldr_month_format_narrow_4":"A","cldr_month_format_narrow_5":"M","cldr_month_format_narrow_6":"J","cldr_month_format_narrow_7":"J","cldr_month_format_narrow_8":"A","cldr_month_format_narrow_9":"S","cldr_month_format_wide_1":"Januar","cldr_month_format_wide_10":"Oktober","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"Dezember","cldr_month_format_wide_2":"Februar","cldr_month_format_wide_3":"März","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"Mai","cldr_month_format_wide_6":"Juni","cldr_month_format_wide_7":"Juli","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_abbreviated_1":"Jan","cldr_month_stand-alone_abbreviated_10":"Okt","cldr_month_stand-alone_abbreviated_11":"Nov","cldr_month_stand-alone_abbreviated_12":"Dez","cldr_month_stand-alone_abbreviated_2":"Feb","cldr_month_stand-alone_abbreviated_3":"Mär","cldr_month_stand-alone_abbreviated_4":"Apr","cldr_month_stand-alone_abbreviated_5":"Mai","cldr_month_stand-alone_abbreviated_6":"Jun","cldr_month_stand-alone_abbreviated_7":"Jul","cldr_month_stand-alone_abbreviated_8":"Aug","cldr_month_stand-alone_abbreviated_9":"Sep","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_month_stand-alone_wide_1":"Januar","cldr_month_stand-alone_wide_10":"Oktober","cldr_month_stand-alone_wide_11":"November","cldr_month_stand-alone_wide_12":"Dezember","cldr_month_stand-alone_wide_2":"Februar","cldr_month_stand-alone_wide_3":"März","cldr_month_stand-alone_wide_4":"April","cldr_month_stand-alone_wide_5":"Mai","cldr_month_stand-alone_wide_6":"Juni","cldr_month_stand-alone_wide_7":"Juli","cldr_month_stand-alone_wide_8":"August","cldr_month_stand-alone_wide_9":"September","cldr_number_decimal_separator":",","cldr_number_group_separator":".","cldr_number_percent_format":"#,##0 %","cldr_pm":"nachm.","cldr_time_format_full":"HH:mm:ss zzzz","cldr_time_format_long":"HH:mm:ss z","cldr_time_format_medium":"HH:mm:ss","cldr_time_format_short":"HH:mm","quotationEnd":"“","quotationStart":"„"},"de_DE":{},"en":{"alternateQuotationEnd":"’","alternateQuotationStart":"‘","cldr_am":"AM","cldr_date_format_full":"EEEE, MMMM d, y","cldr_date_format_long":"MMMM d, y","cldr_date_format_medium":"MMM d, y","cldr_date_format_short":"M/d/yy","cldr_date_time_format_EHm":"E HH:mm","cldr_date_time_format_EHms":"E HH:mm:ss","cldr_date_time_format_Ed":"d E","cldr_date_time_format_Ehm":"E h:mm a","cldr_date_time_format_Ehms":"E h:mm:ss a","cldr_date_time_format_Gy":"y G","cldr_date_time_format_GyMMM":"MMM y G","cldr_date_time_format_GyMMMEd":"E, MMM d, y G","cldr_date_time_format_GyMMMd":"MMM d, y G","cldr_date_time_format_H":"HH","cldr_date_time_format_Hm":"HH:mm","cldr_date_time_format_Hms":"HH:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E, M/d","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E, MMM d","cldr_date_time_format_MMMd":"MMM d","cldr_date_time_format_Md":"M/d","cldr_date_time_format_d":"d","cldr_date_time_format_h":"h a","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_hms":"h:mm:ss a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/y","cldr_date_time_format_yMEd":"E, M/d/y","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"E, MMM d, y","cldr_date_time_format_yMMMd":"MMM d, y","cldr_date_time_format_yMd":"M/d/y","cldr_date_time_format_yQQQ":"QQQ y","cldr_date_time_format_yQQQQ":"QQQQ y","cldr_day_format_abbreviated_fri":"Fri","cldr_day_format_abbreviated_mon":"Mon","cldr_day_format_abbreviated_sat":"Sat","cldr_day_format_abbreviated_sun":"Sun","cldr_day_format_abbreviated_thu":"Thu","cldr_day_format_abbreviated_tue":"Tue","cldr_day_format_abbreviated_wed":"Wed","cldr_day_format_short_fri":"Fr","cldr_day_format_short_mon":"Mo","cldr_day_format_short_sat":"Sa","cldr_day_format_short_sun":"Su","cldr_day_format_short_thu":"Th","cldr_day_format_short_tue":"Tu","cldr_day_format_short_wed":"We","cldr_day_format_wide_fri":"Friday","cldr_day_format_wide_mon":"Monday","cldr_day_format_wide_sat":"Saturday","cldr_day_format_wide_sun":"Sunday","cldr_day_format_wide_thu":"Thursday","cldr_day_format_wide_tue":"Tuesday","cldr_day_format_wide_wed":"Wednesday","cldr_day_stand-alone_narrow_fri":"F","cldr_day_stand-alone_narrow_mon":"M","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"S","cldr_day_stand-alone_narrow_thu":"T","cldr_day_stand-alone_narrow_tue":"T","cldr_day_stand-alone_narrow_wed":"W","cldr_month_format_abbreviated_1":"Jan","cldr_month_format_abbreviated_10":"Oct","cldr_month_format_abbreviated_11":"Nov","cldr_month_format_abbreviated_12":"Dec","cldr_month_format_abbreviated_2":"Feb","cldr_month_format_abbreviated_3":"Mar","cldr_month_format_abbreviated_4":"Apr","cldr_month_format_abbreviated_5":"May","cldr_month_format_abbreviated_6":"Jun","cldr_month_format_abbreviated_7":"Jul","cldr_month_format_abbreviated_8":"Aug","cldr_month_format_abbreviated_9":"Sep","cldr_month_format_wide_1":"January","cldr_month_format_wide_10":"October","cldr_month_format_wide_11":"November","cldr_month_format_wide_12":"December","cldr_month_format_wide_2":"February","cldr_month_format_wide_3":"March","cldr_month_format_wide_4":"April","cldr_month_format_wide_5":"May","cldr_month_format_wide_6":"June","cldr_month_format_wide_7":"July","cldr_month_format_wide_8":"August","cldr_month_format_wide_9":"September","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_number_decimal_separator":".","cldr_number_group_separator":",","cldr_number_percent_format":"#,##0%","cldr_pm":"PM","cldr_time_format_full":"h:mm:ss a zzzz","cldr_time_format_long":"h:mm:ss a z","cldr_time_format_medium":"h:mm:ss a","cldr_time_format_short":"h:mm a","quotationEnd":"”","quotationStart":"“"},"en_US":{},"fr":{"alternateQuotationEnd":"»","alternateQuotationStart":"«","cldr_am":"AM","cldr_date_format_full":"EEEE d MMMM y","cldr_date_format_long":"d MMMM y","cldr_date_format_medium":"d MMM y","cldr_date_format_short":"dd/MM/y","cldr_date_time_format_EHm":"E HH:mm","cldr_date_time_format_EHms":"E HH:mm:ss","cldr_date_time_format_Ed":"E d","cldr_date_time_format_Ehm":"E h:mm a","cldr_date_time_format_Ehms":"E h:mm:ss a","cldr_date_time_format_Gy":"y G","cldr_date_time_format_GyMMM":"MMM y G","cldr_date_time_format_GyMMMEd":"E d MMM y G","cldr_date_time_format_GyMMMd":"d MMM y G","cldr_date_time_format_H":"HH 'h'","cldr_date_time_format_Hm":"HH:mm","cldr_date_time_format_Hms":"HH:mm:ss","cldr_date_time_format_M":"L","cldr_date_time_format_MEd":"E d/M","cldr_date_time_format_MMM":"LLL","cldr_date_time_format_MMMEd":"E d MMM","cldr_date_time_format_MMMd":"d MMM","cldr_date_time_format_Md":"d/M","cldr_date_time_format_d":"d","cldr_date_time_format_h":"h a","cldr_date_time_format_hm":"h:mm a","cldr_date_time_format_hms":"h:mm:ss a","cldr_date_time_format_ms":"mm:ss","cldr_date_time_format_y":"y","cldr_date_time_format_yM":"M/y","cldr_date_time_format_yMEd":"E d/M/y","cldr_date_time_format_yMMM":"MMM y","cldr_date_time_format_yMMMEd":"E d MMM y","cldr_date_time_format_yMMMM":"MMMM y","cldr_date_time_format_yMMMd":"d MMM y","cldr_date_time_format_yMd":"d/M/y","cldr_date_time_format_yQQQ":"QQQ y","cldr_date_time_format_yQQQQ":"QQQQ y","cldr_day_format_abbreviated_fri":"ven.","cldr_day_format_abbreviated_mon":"lun.","cldr_day_format_abbreviated_sat":"sam.","cldr_day_format_abbreviated_sun":"dim.","cldr_day_format_abbreviated_thu":"jeu.","cldr_day_format_abbreviated_tue":"mar.","cldr_day_format_abbreviated_wed":"mer.","cldr_day_format_narrow_fri":"V","cldr_day_format_narrow_mon":"L","cldr_day_format_narrow_sat":"S","cldr_day_format_narrow_sun":"D","cldr_day_format_narrow_thu":"J","cldr_day_format_narrow_tue":"M","cldr_day_format_narrow_wed":"M","cldr_day_format_short_fri":"ve","cldr_day_format_short_mon":"lu","cldr_day_format_short_sat":"sa","cldr_day_format_short_sun":"di","cldr_day_format_short_thu":"je","cldr_day_format_short_tue":"ma","cldr_day_format_short_wed":"me","cldr_day_format_wide_fri":"vendredi","cldr_day_format_wide_mon":"lundi","cldr_day_format_wide_sat":"samedi","cldr_day_format_wide_sun":"dimanche","cldr_day_format_wide_thu":"jeudi","cldr_day_format_wide_tue":"mardi","cldr_day_format_wide_wed":"mercredi","cldr_day_stand-alone_abbreviated_fri":"ven.","cldr_day_stand-alone_abbreviated_mon":"lun.","cldr_day_stand-alone_abbreviated_sat":"sam.","cldr_day_stand-alone_abbreviated_sun":"dim.","cldr_day_stand-alone_abbreviated_thu":"jeu.","cldr_day_stand-alone_abbreviated_tue":"mar.","cldr_day_stand-alone_abbreviated_wed":"mer.","cldr_day_stand-alone_narrow_fri":"V","cldr_day_stand-alone_narrow_mon":"L","cldr_day_stand-alone_narrow_sat":"S","cldr_day_stand-alone_narrow_sun":"D","cldr_day_stand-alone_narrow_thu":"J","cldr_day_stand-alone_narrow_tue":"M","cldr_day_stand-alone_narrow_wed":"M","cldr_day_stand-alone_short_fri":"ven.","cldr_day_stand-alone_short_mon":"lun.","cldr_day_stand-alone_short_sat":"sam.","cldr_day_stand-alone_short_sun":"dim.","cldr_day_stand-alone_short_thu":"jeu.","cldr_day_stand-alone_short_tue":"mar.","cldr_day_stand-alone_short_wed":"mer.","cldr_day_stand-alone_wide_fri":"vendredi","cldr_day_stand-alone_wide_mon":"lundi","cldr_day_stand-alone_wide_sat":"samedi","cldr_day_stand-alone_wide_sun":"dimanche","cldr_day_stand-alone_wide_thu":"jeudi","cldr_day_stand-alone_wide_tue":"mardi","cldr_day_stand-alone_wide_wed":"mercredi","cldr_month_format_abbreviated_1":"janv.","cldr_month_format_abbreviated_10":"oct.","cldr_month_format_abbreviated_11":"nov.","cldr_month_format_abbreviated_12":"déc.","cldr_month_format_abbreviated_2":"févr.","cldr_month_format_abbreviated_3":"mars","cldr_month_format_abbreviated_4":"avr.","cldr_month_format_abbreviated_5":"mai","cldr_month_format_abbreviated_6":"juin","cldr_month_format_abbreviated_7":"juil.","cldr_month_format_abbreviated_8":"août","cldr_month_format_abbreviated_9":"sept.","cldr_month_format_narrow_1":"J","cldr_month_format_narrow_10":"O","cldr_month_format_narrow_11":"N","cldr_month_format_narrow_12":"D","cldr_month_format_narrow_2":"F","cldr_month_format_narrow_3":"M","cldr_month_format_narrow_4":"A","cldr_month_format_narrow_5":"M","cldr_month_format_narrow_6":"J","cldr_month_format_narrow_7":"J","cldr_month_format_narrow_8":"A","cldr_month_format_narrow_9":"S","cldr_month_format_wide_1":"janvier","cldr_month_format_wide_10":"octobre","cldr_month_format_wide_11":"novembre","cldr_month_format_wide_12":"décembre","cldr_month_format_wide_2":"février","cldr_month_format_wide_3":"mars","cldr_month_format_wide_4":"avril","cldr_month_format_wide_5":"mai","cldr_month_format_wide_6":"juin","cldr_month_format_wide_7":"juillet","cldr_month_format_wide_8":"août","cldr_month_format_wide_9":"septembre","cldr_month_stand-alone_abbreviated_1":"janv.","cldr_month_stand-alone_abbreviated_10":"oct.","cldr_month_stand-alone_abbreviated_11":"nov.","cldr_month_stand-alone_abbreviated_12":"déc.","cldr_month_stand-alone_abbreviated_2":"févr.","cldr_month_stand-alone_abbreviated_3":"mars","cldr_month_stand-alone_abbreviated_4":"avr.","cldr_month_stand-alone_abbreviated_5":"mai","cldr_month_stand-alone_abbreviated_6":"juin","cldr_month_stand-alone_abbreviated_7":"juil.","cldr_month_stand-alone_abbreviated_8":"août","cldr_month_stand-alone_abbreviated_9":"sept.","cldr_month_stand-alone_narrow_1":"J","cldr_month_stand-alone_narrow_10":"O","cldr_month_stand-alone_narrow_11":"N","cldr_month_stand-alone_narrow_12":"D","cldr_month_stand-alone_narrow_2":"F","cldr_month_stand-alone_narrow_3":"M","cldr_month_stand-alone_narrow_4":"A","cldr_month_stand-alone_narrow_5":"M","cldr_month_stand-alone_narrow_6":"J","cldr_month_stand-alone_narrow_7":"J","cldr_month_stand-alone_narrow_8":"A","cldr_month_stand-alone_narrow_9":"S","cldr_month_stand-alone_wide_1":"janvier","cldr_month_stand-alone_wide_10":"octobre","cldr_month_stand-alone_wide_11":"novembre","cldr_month_stand-alone_wide_12":"décembre","cldr_month_stand-alone_wide_2":"février","cldr_month_stand-alone_wide_3":"mars","cldr_month_stand-alone_wide_4":"avril","cldr_month_stand-alone_wide_5":"mai","cldr_month_stand-alone_wide_6":"juin","cldr_month_stand-alone_wide_7":"juillet","cldr_month_stand-alone_wide_8":"août","cldr_month_stand-alone_wide_9":"septembre","cldr_number_decimal_separator":",","cldr_number_group_separator":" ","cldr_number_percent_format":"#,##0 %","cldr_pm":"PM","cldr_time_format_full":"HH:mm:ss zzzz","cldr_time_format_long":"HH:mm:ss z","cldr_time_format_medium":"HH:mm:ss","cldr_time_format_short":"HH:mm","quotationEnd":"»","quotationStart":"«"},"fr_FR":{}},"resources":{"demobrowser/demo/test/combined/icons22.png":[22,176,"png","demobrowser.demo"],"qx/decoration/Classic/arrows-combined.gif":[124,7,"gif","qx"],"qx/decoration/Classic/arrows/down-invert.gif":[7,4,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-38,0],"qx/decoration/Classic/arrows/down-small-invert.gif":[5,3,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-87,0],"qx/decoration/Classic/arrows/down-small.gif":[5,3,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-53,0],"qx/decoration/Classic/arrows/down.gif":[7,4,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-113,0],"qx/decoration/Classic/arrows/forward-invert.gif":[8,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-30,0],"qx/decoration/Classic/arrows/forward.gif":[8,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-18,0],"qx/decoration/Classic/arrows/left-invert.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-92,0],"qx/decoration/Classic/arrows/left-small-invert.gif":[3,5,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-58,0],"qx/decoration/Classic/arrows/left-small.gif":[3,5,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-15,0],"qx/decoration/Classic/arrows/left.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-120,0],"qx/decoration/Classic/arrows/next-invert.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-80,0],"qx/decoration/Classic/arrows/next.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-109,0],"qx/decoration/Classic/arrows/previous-invert.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-69,0],"qx/decoration/Classic/arrows/previous.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-65,0],"qx/decoration/Classic/arrows/rewind-invert.gif":[8,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-45,0],"qx/decoration/Classic/arrows/rewind.gif":[8,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-101,0],"qx/decoration/Classic/arrows/right-invert.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-61,0],"qx/decoration/Classic/arrows/right-small-invert.gif":[3,5,"gif","qx","qx/decoration/Classic/arrows-combined.gif",0,0],"qx/decoration/Classic/arrows/right-small.gif":[3,5,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-84,0],"qx/decoration/Classic/arrows/right.gif":[4,7,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-26,0],"qx/decoration/Classic/arrows/up-invert.gif":[7,4,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-73,0],"qx/decoration/Classic/arrows/up-small-invert.gif":[5,3,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-96,0],"qx/decoration/Classic/arrows/up-small.gif":[5,3,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-3,0],"qx/decoration/Classic/arrows/up.gif":[7,4,"gif","qx","qx/decoration/Classic/arrows-combined.gif",-8,0],"qx/decoration/Classic/checkbox-radiobutton-combined.png":[504,14,"png","qx"],"qx/decoration/Classic/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Classic/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Classic/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Classic/colorselector-combined.gif",-11,0],"qx/decoration/Classic/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Classic/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Classic/colorselector-combined.gif",0,0],"qx/decoration/Classic/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Classic/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Classic/cursors-combined.gif",-52,0],"qx/decoration/Classic/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Classic/cursors-combined.gif",-20,0],"qx/decoration/Classic/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Classic/cursors-combined.gif",-39,0],"qx/decoration/Classic/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Classic/cursors-combined.gif",0,0],"qx/decoration/Classic/datechooser/last-month-invert.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/last-month.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/last-year-invert.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/last-year.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/next-month-invert.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/next-month.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/next-year-invert.png":[16,16,"png","qx"],"qx/decoration/Classic/datechooser/next-year.png":[16,16,"png","qx"],"qx/decoration/Classic/form/checkbox-checked-disabled.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-336,0],"qx/decoration/Classic/form/checkbox-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-28,0],"qx/decoration/Classic/form/checkbox-checked-focused.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-462,0],"qx/decoration/Classic/form/checkbox-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-112,0],"qx/decoration/Classic/form/checkbox-checked-hovered.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-140,0],"qx/decoration/Classic/form/checkbox-checked-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-98,0],"qx/decoration/Classic/form/checkbox-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-308,0],"qx/decoration/Classic/form/checkbox-checked-pressed.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",0,0],"qx/decoration/Classic/form/checkbox-checked.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-266,0],"qx/decoration/Classic/form/checkbox-disabled.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-84,0],"qx/decoration/Classic/form/checkbox-focused-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-476,0],"qx/decoration/Classic/form/checkbox-focused.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-392,0],"qx/decoration/Classic/form/checkbox-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-196,0],"qx/decoration/Classic/form/checkbox-hovered.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-154,0],"qx/decoration/Classic/form/checkbox-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-350,0],"qx/decoration/Classic/form/checkbox-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-448,0],"qx/decoration/Classic/form/checkbox-pressed.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-70,0],"qx/decoration/Classic/form/checkbox-undetermined-disabled.png":[14,14,"png","qx"],"qx/decoration/Classic/form/checkbox-undetermined-focused-invalid.png":[14,14,"png","qx"],"qx/decoration/Classic/form/checkbox-undetermined-focused.png":[14,14,"png","qx"],"qx/decoration/Classic/form/checkbox-undetermined-hovered-invalid.png":[14,14,"png","qx"],"qx/decoration/Classic/form/checkbox-undetermined-hovered.png":[14,14,"png","qx"],"qx/decoration/Classic/form/checkbox-undetermined-invalid.png":[14,14,"png","qx"],"qx/decoration/Classic/form/checkbox-undetermined.png":[14,14,"png","qx"],"qx/decoration/Classic/form/checkbox.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-490,0],"qx/decoration/Classic/form/radiobutton-checked-disabled.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-210,0],"qx/decoration/Classic/form/radiobutton-checked-focused-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-406,0],"qx/decoration/Classic/form/radiobutton-checked-focused.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-378,0],"qx/decoration/Classic/form/radiobutton-checked-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-252,0],"qx/decoration/Classic/form/radiobutton-checked-hovered.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-182,0],"qx/decoration/Classic/form/radiobutton-checked-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-294,0],"qx/decoration/Classic/form/radiobutton-checked-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-420,0],"qx/decoration/Classic/form/radiobutton-checked-pressed.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-56,0],"qx/decoration/Classic/form/radiobutton-checked.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-322,0],"qx/decoration/Classic/form/radiobutton-disabled.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-364,0],"qx/decoration/Classic/form/radiobutton-focused-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-434,0],"qx/decoration/Classic/form/radiobutton-focused.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-168,0],"qx/decoration/Classic/form/radiobutton-hovered-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-126,0],"qx/decoration/Classic/form/radiobutton-hovered.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-42,0],"qx/decoration/Classic/form/radiobutton-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-280,0],"qx/decoration/Classic/form/radiobutton-pressed-invalid.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-238,0],"qx/decoration/Classic/form/radiobutton-pressed.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-14,0],"qx/decoration/Classic/form/radiobutton.png":[14,14,"png","qx","qx/decoration/Classic/checkbox-radiobutton-combined.png",-224,0],"qx/decoration/Classic/menu-combined.gif":[64,7,"gif","qx"],"qx/decoration/Classic/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Classic/menu-combined.gif",-16,0],"qx/decoration/Classic/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Classic/menu-combined.gif",-32,0],"qx/decoration/Classic/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Classic/menu-combined.gif",0,0],"qx/decoration/Classic/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Classic/menu-combined.gif",-48,0],"qx/decoration/Classic/shadow-lr-combined.png":[30,382,"png","qx"],"qx/decoration/Classic/shadow-small-lr-combined.png":[10,136,"png","qx"],"qx/decoration/Classic/shadow-small-tb-combined.png":[5,30,"png","qx"],"qx/decoration/Classic/shadow-tb-combined.png":[15,90,"png","qx"],"qx/decoration/Classic/shadow/shadow-b.png":[15,15,"png","qx","qx/decoration/Classic/shadow-tb-combined.png",0,-30],"qx/decoration/Classic/shadow/shadow-bl.png":[15,15,"png","qx","qx/decoration/Classic/shadow-tb-combined.png",0,0],"qx/decoration/Classic/shadow/shadow-br.png":[15,15,"png","qx","qx/decoration/Classic/shadow-tb-combined.png",0,-60],"qx/decoration/Classic/shadow/shadow-c.png":[40,382,"png","qx"],"qx/decoration/Classic/shadow/shadow-l.png":[15,382,"png","qx","qx/decoration/Classic/shadow-lr-combined.png",-15,0],"qx/decoration/Classic/shadow/shadow-r.png":[15,382,"png","qx","qx/decoration/Classic/shadow-lr-combined.png",0,0],"qx/decoration/Classic/shadow/shadow-small-b.png":[5,5,"png","qx","qx/decoration/Classic/shadow-small-tb-combined.png",0,-25],"qx/decoration/Classic/shadow/shadow-small-bl.png":[5,5,"png","qx","qx/decoration/Classic/shadow-small-tb-combined.png",0,-20],"qx/decoration/Classic/shadow/shadow-small-br.png":[5,5,"png","qx","qx/decoration/Classic/shadow-small-tb-combined.png",0,0],"qx/decoration/Classic/shadow/shadow-small-c.png":[40,136,"png","qx"],"qx/decoration/Classic/shadow/shadow-small-l.png":[5,136,"png","qx","qx/decoration/Classic/shadow-small-lr-combined.png",0,0],"qx/decoration/Classic/shadow/shadow-small-r.png":[5,136,"png","qx","qx/decoration/Classic/shadow-small-lr-combined.png",-5,0],"qx/decoration/Classic/shadow/shadow-small-t.png":[5,5,"png","qx","qx/decoration/Classic/shadow-small-tb-combined.png",0,-5],"qx/decoration/Classic/shadow/shadow-small-tl.png":[5,5,"png","qx","qx/decoration/Classic/shadow-small-tb-combined.png",0,-15],"qx/decoration/Classic/shadow/shadow-small-tr.png":[5,5,"png","qx","qx/decoration/Classic/shadow-small-tb-combined.png",0,-10],"qx/decoration/Classic/shadow/shadow-small.png":[114,146,"png","qx"],"qx/decoration/Classic/shadow/shadow-t.png":[15,15,"png","qx","qx/decoration/Classic/shadow-tb-combined.png",0,-75],"qx/decoration/Classic/shadow/shadow-tl.png":[15,15,"png","qx","qx/decoration/Classic/shadow-tb-combined.png",0,-45],"qx/decoration/Classic/shadow/shadow-tr.png":[15,15,"png","qx","qx/decoration/Classic/shadow-tb-combined.png",0,-15],"qx/decoration/Classic/shadow/shadow.png":[381,412,"png","qx"],"qx/decoration/Classic/splitpane/knob-horizontal.png":[4,15,"png","qx"],"qx/decoration/Classic/splitpane/knob-vertical.png":[15,4,"png","qx"],"qx/decoration/Classic/table-combined.png":[72,11,"png","qx"],"qx/decoration/Classic/table/ascending-invert.png":[10,10,"png","qx","qx/decoration/Classic/table-combined.png",-62,0],"qx/decoration/Classic/table/ascending.png":[10,10,"png","qx","qx/decoration/Classic/table-combined.png",-52,0],"qx/decoration/Classic/table/boolean-false.png":[11,11,"png","qx","qx/decoration/Classic/table-combined.png",-31,0],"qx/decoration/Classic/table/boolean-true.png":[11,11,"png","qx","qx/decoration/Classic/table-combined.png",-10,0],"qx/decoration/Classic/table/descending-invert.png":[10,10,"png","qx","qx/decoration/Classic/table-combined.png",-42,0],"qx/decoration/Classic/table/descending.png":[10,10,"png","qx","qx/decoration/Classic/table-combined.png",0,0],"qx/decoration/Classic/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Classic/table-combined.png",-21,0],"qx/decoration/Classic/tree/minus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/tree/plus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/cross.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/cross_minus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/cross_plus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/end.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/end_minus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/end_plus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/line.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/only_minus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/only_plus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/start.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/start_minus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/treevirtual/start_plus.gif":[19,16,"gif","qx"],"qx/decoration/Classic/window-captionbar-buttons-combined.gif":[36,9,"gif","qx"],"qx/decoration/Classic/window/close.gif":[10,9,"gif","qx","qx/decoration/Classic/window-captionbar-buttons-combined.gif",0,0],"qx/decoration/Classic/window/maximize.gif":[9,9,"gif","qx","qx/decoration/Classic/window-captionbar-buttons-combined.gif",-10,0],"qx/decoration/Classic/window/minimize.gif":[9,9,"gif","qx","qx/decoration/Classic/window-captionbar-buttons-combined.gif",-19,0],"qx/decoration/Classic/window/restore.gif":[8,9,"gif","qx","qx/decoration/Classic/window-captionbar-buttons-combined.gif",-28,0],"qx/decoration/Indigo/font/JosefinSlab-SemiBold.ttf":"qx","qx/decoration/Indigo/font/JosefinSlab-SemiBold.woff":"qx","qx/decoration/Modern/arrows-combined.png":[87,8,"png","qx"],"qx/decoration/Modern/arrows/down-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-74,0],"qx/decoration/Modern/arrows/down-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-49,0],"qx/decoration/Modern/arrows/down.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-20,0],"qx/decoration/Modern/arrows/forward.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-59,0],"qx/decoration/Modern/arrows/left.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-44,0],"qx/decoration/Modern/arrows/rewind.png":[10,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-10,0],"qx/decoration/Modern/arrows/right-invert.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-5,0],"qx/decoration/Modern/arrows/right.png":[5,8,"png","qx","qx/decoration/Modern/arrows-combined.png",-54,0],"qx/decoration/Modern/arrows/up-invert.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-28,0],"qx/decoration/Modern/arrows/up-small.png":[5,3,"png","qx","qx/decoration/Modern/arrows-combined.png",-82,0],"qx/decoration/Modern/arrows/up.png":[8,5,"png","qx","qx/decoration/Modern/arrows-combined.png",-36,0],"qx/decoration/Modern/colorselector-combined.gif":[46,11,"gif","qx"],"qx/decoration/Modern/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Modern/colorselector/brightness-handle.gif":[35,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",0,0],"qx/decoration/Modern/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Modern/colorselector/huesaturation-handle.gif":[11,11,"gif","qx","qx/decoration/Modern/colorselector-combined.gif",-35,0],"qx/decoration/Modern/cursors-combined.gif":[71,20,"gif","qx"],"qx/decoration/Modern/cursors/alias.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-52,0],"qx/decoration/Modern/cursors/copy.gif":[19,15,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-33,0],"qx/decoration/Modern/cursors/move.gif":[13,9,"gif","qx","qx/decoration/Modern/cursors-combined.gif",-20,0],"qx/decoration/Modern/cursors/nodrop.gif":[20,20,"gif","qx","qx/decoration/Modern/cursors-combined.gif",0,0],"qx/decoration/Modern/form/checked.png":[6,6,"png","qx"],"qx/decoration/Modern/form/tooltip-error-arrow-right.png":[11,14,"png","qx"],"qx/decoration/Modern/form/tooltip-error-arrow.png":[11,14,"png","qx"],"qx/decoration/Modern/form/undetermined.png":[6,2,"png","qx"],"qx/decoration/Modern/menu-checkradio-combined.gif":[64,7,"gif","qx"],"qx/decoration/Modern/menu/checkbox-invert.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-16,0],"qx/decoration/Modern/menu/checkbox.gif":[16,7,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-48,0],"qx/decoration/Modern/menu/radiobutton-invert.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",-32,0],"qx/decoration/Modern/menu/radiobutton.gif":[16,5,"gif","qx","qx/decoration/Modern/menu-checkradio-combined.gif",0,0],"qx/decoration/Modern/scrollbar-combined.png":[54,12,"png","qx"],"qx/decoration/Modern/scrollbar/scrollbar-down.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-28,0],"qx/decoration/Modern/scrollbar/scrollbar-left.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-50,0],"qx/decoration/Modern/scrollbar/scrollbar-right.png":[4,6,"png","qx","qx/decoration/Modern/scrollbar-combined.png",-46,0],"qx/decoration/Modern/scrollbar/scrollbar-up.png":[6,4,"png","qx","qx/decoration/Modern/scrollbar-combined.png",0,0],"qx/decoration/Modern/splitpane-knobs-combined.png":[8,9,"png","qx"],"qx/decoration/Modern/splitpane/knob-horizontal.png":[1,8,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,-1],"qx/decoration/Modern/splitpane/knob-vertical.png":[8,1,"png","qx","qx/decoration/Modern/splitpane-knobs-combined.png",0,0],"qx/decoration/Modern/table-combined.png":[94,18,"png","qx"],"qx/decoration/Modern/table/ascending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",0,0],"qx/decoration/Modern/table/boolean-false.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-80,0],"qx/decoration/Modern/table/boolean-true.png":[14,14,"png","qx","qx/decoration/Modern/table-combined.png",-26,0],"qx/decoration/Modern/table/descending.png":[8,5,"png","qx","qx/decoration/Modern/table-combined.png",-18,0],"qx/decoration/Modern/table/select-column-order.png":[10,9,"png","qx","qx/decoration/Modern/table-combined.png",-8,0],"qx/decoration/Modern/toolbar/toolbar-handle-knob.gif":[1,8,"gif","qx"],"qx/decoration/Modern/toolbar/toolbar-part.gif":[7,1,"gif","qx"],"qx/decoration/Modern/tree-combined.png":[32,8,"png","qx"],"qx/decoration/Modern/tree/closed-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-24,0],"qx/decoration/Modern/tree/closed.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-16,0],"qx/decoration/Modern/tree/open-selected.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",-8,0],"qx/decoration/Modern/tree/open.png":[8,8,"png","qx","qx/decoration/Modern/tree-combined.png",0,0],"qx/decoration/Modern/window-captionbar-buttons-combined.png":[108,9,"png","qx"],"qx/decoration/Modern/window/close-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-27,0],"qx/decoration/Modern/window/close-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-9,0],"qx/decoration/Modern/window/close-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-90,0],"qx/decoration/Modern/window/maximize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-18,0],"qx/decoration/Modern/window/maximize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-81,0],"qx/decoration/Modern/window/maximize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-54,0],"qx/decoration/Modern/window/minimize-active-hovered.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-63,0],"qx/decoration/Modern/window/minimize-active.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-72,0],"qx/decoration/Modern/window/minimize-inactive.png":[9,9,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-36,0],"qx/decoration/Modern/window/restore-active-hovered.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",0,0],"qx/decoration/Modern/window/restore-active.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-99,0],"qx/decoration/Modern/window/restore-inactive.png":[9,8,"png","qx","qx/decoration/Modern/window-captionbar-buttons-combined.png",-45,0],"qx/decoration/Simple/arrows/down-invert.gif":[7,4,"gif","qx"],"qx/decoration/Simple/arrows/down-small.gif":[5,3,"gif","qx"],"qx/decoration/Simple/arrows/down.gif":[7,4,"gif","qx"],"qx/decoration/Simple/arrows/forward.gif":[8,7,"gif","qx"],"qx/decoration/Simple/arrows/left-invert.gif":[4,7,"gif","qx"],"qx/decoration/Simple/arrows/left.gif":[4,7,"gif","qx"],"qx/decoration/Simple/arrows/rewind.gif":[8,7,"gif","qx"],"qx/decoration/Simple/arrows/right-invert.gif":[4,7,"gif","qx"],"qx/decoration/Simple/arrows/right.gif":[4,7,"gif","qx"],"qx/decoration/Simple/arrows/up-invert.gif":[7,4,"gif","qx"],"qx/decoration/Simple/arrows/up-small.gif":[5,3,"gif","qx"],"qx/decoration/Simple/arrows/up.gif":[7,4,"gif","qx"],"qx/decoration/Simple/checkbox/checked-disabled.png":[6,6,"png","qx"],"qx/decoration/Simple/checkbox/checked.png":[6,6,"png","qx"],"qx/decoration/Simple/checkbox/undetermined-disabled.png":[6,2,"png","qx"],"qx/decoration/Simple/checkbox/undetermined.png":[6,2,"png","qx"],"qx/decoration/Simple/colorselector/brightness-field.png":[19,256,"png","qx"],"qx/decoration/Simple/colorselector/brightness-handle.gif":[35,11,"gif","qx"],"qx/decoration/Simple/colorselector/huesaturation-field.jpg":[256,256,"jpeg","qx"],"qx/decoration/Simple/colorselector/huesaturation-handle.gif":[11,11,"gif","qx"],"qx/decoration/Simple/cursors/alias.gif":[19,15,"gif","qx"],"qx/decoration/Simple/cursors/copy.gif":[19,15,"gif","qx"],"qx/decoration/Simple/cursors/move.gif":[13,9,"gif","qx"],"qx/decoration/Simple/cursors/nodrop.gif":[20,20,"gif","qx"],"qx/decoration/Simple/menu/checkbox-invert.gif":[16,7,"gif","qx"],"qx/decoration/Simple/menu/checkbox.gif":[16,7,"gif","qx"],"qx/decoration/Simple/menu/radiobutton-invert.gif":[16,5,"gif","qx"],"qx/decoration/Simple/menu/radiobutton.gif":[16,5,"gif","qx"],"qx/decoration/Simple/splitpane/knob-horizontal.png":[1,8,"png","qx"],"qx/decoration/Simple/splitpane/knob-vertical.png":[8,1,"png","qx"],"qx/decoration/Simple/table/ascending-invert.png":[10,10,"png","qx"],"qx/decoration/Simple/table/ascending.png":[10,10,"png","qx"],"qx/decoration/Simple/table/boolean-false.png":[11,11,"png","qx"],"qx/decoration/Simple/table/boolean-true.png":[11,11,"png","qx"],"qx/decoration/Simple/table/descending-invert.png":[10,10,"png","qx"],"qx/decoration/Simple/table/descending.png":[10,10,"png","qx"],"qx/decoration/Simple/table/select-column-order.png":[10,9,"png","qx"],"qx/decoration/Simple/tabview/close.gif":[10,9,"gif","qx"],"qx/decoration/Simple/tree/minus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/tree/plus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/cross.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/cross_minus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/cross_plus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/end.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/end_minus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/end_plus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/line.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/only_minus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/only_plus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/start.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/start_minus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/treevirtual/start_plus.gif":[19,16,"gif","qx"],"qx/decoration/Simple/window/close-white.gif":[10,9,"gif","qx"],"qx/decoration/Simple/window/close.gif":[10,9,"gif","qx"],"qx/decoration/Simple/window/maximize-white.gif":[9,9,"gif","qx"],"qx/decoration/Simple/window/maximize.gif":[9,9,"gif","qx"],"qx/decoration/Simple/window/minimize-white.gif":[9,9,"gif","qx"],"qx/decoration/Simple/window/minimize.gif":[9,9,"gif","qx"],"qx/decoration/Simple/window/restore-white.gif":[8,9,"gif","qx"],"qx/decoration/Simple/window/restore.gif":[8,9,"gif","qx"],"qx/icon/Oxygen/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/mimetypes/text-plain.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-cancel.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/dialog-ok.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/view-refresh.png":[16,16,"png","qx"],"qx/icon/Tango/16/actions/window-close.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/office-calendar.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-color-chooser.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/office-document.png":[16,16,"png","qx"],"qx/icon/Tango/16/mimetypes/text-plain.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder-open.png":[16,16,"png","qx"],"qx/icon/Tango/16/places/folder.png":[16,16,"png","qx"],"qx/icon/Tango/22/mimetypes/office-document.png":[22,22,"png","qx"],"qx/icon/Tango/22/places/folder-open.png":[22,22,"png","qx","demobrowser/demo/test/combined/icons22.png",0,-44],"qx/icon/Tango/22/places/folder.png":[22,22,"png","qx","demobrowser/demo/test/combined/icons22.png",0,-22],"qx/icon/Tango/32/mimetypes/office-document.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder-open.png":[32,32,"png","qx"],"qx/icon/Tango/32/places/folder.png":[32,32,"png","qx"],"qx/static/blank.gif":[1,1,"gif","qx"],"qx/static/blank.png":[1,1,"png","qx"]},"translations":{"C":{},"de":{},"de_DE":{},"en":{},"en_US":{},"fr":{},"fr_FR":{}}};
(function(){var b=".prototype",c="function",d="Boolean",e="Error",f="Object.keys requires an object as argument.",g="constructor",h="warn",j="default",k="Null",m="hasOwnProperty",n="Undefined",o="string",p='undefined',q="toLocaleString",r="error",s="toString",u="Blob",v="qx.debug",w="()",x="RegExp",y="dynamic",z="Object",A="String",B="info",C="BROKEN_IE",D="isPrototypeOf",E="Date",F="",G="qx.Bootstrap",H="Function",I="]",J="Cannot call super class. Method is not derived: ",K="Array",L="[Class ",M="valueOf",N="Number",O="FormData",P="Class",Q="debug",R="ES5",S=".",T="ArrayBuffer",U="propertyIsEnumerable",V="object";if(!window.qx){window.qx={};}
;qx.Bootstrap={genericToString:function(){return L+this.classname+I;}
,createNamespace:function(name,W){var ba=name.split(S);var Y=ba[0];var parent=qx.$$namespaceRoot&&qx.$$namespaceRoot[Y]?qx.$$namespaceRoot:window;for(var i=0,X=ba.length-1;i<X;i++ ,Y=ba[i]){if(!parent[Y]){parent=parent[Y]={};}
else {parent=parent[Y];}
;}
;parent[Y]=W;return Y;}
,setDisplayName:function(bc,bb,name){bc.displayName=bb+S+name+w;}
,setDisplayNames:function(be,bd){for(var name in be){var bf=be[name];if(bf instanceof Function){bf.displayName=bd+S+name+w;}
;}
;}
,base:function(bg,bh){if(qx.Bootstrap.DEBUG){if(!qx.Bootstrap.isFunction(bg.callee.base)){throw new Error(J+bg.callee.displayName);}
;}
;if(arguments.length===1){return bg.callee.base.call(this);}
else {return bg.callee.base.apply(this,Array.prototype.slice.call(arguments,1));}
;}
,define:function(name,bt){var bq=function(){return (typeof this==p);}
;if(!bt){bt={statics:{}};}
;var bo;var bk=null;qx.Bootstrap.setDisplayNames(bt.statics,name);if(bt.members||bt.extend){qx.Bootstrap.setDisplayNames(bt.members,name+b);bo=bt.construct||new Function;if(bt.extend){this.extendClass(bo,bo,bt.extend,name,bm);}
;var bj=bt.statics||{};for(var i=0,bl=qx.Bootstrap.keys(bj),l=bl.length;i<l;i++ ){var bi=bl[i];bo[bi]=bj[bi];}
;bk=bo.prototype;bk.base=qx.Bootstrap.base;bk.name=bk.classname=name;var br=bt.members||{};var bi,bp;for(var i=0,bl=qx.Bootstrap.keys(br),l=bl.length;i<l;i++ ){bi=bl[i];bp=br[bi];if(bp instanceof Function&&bk[bi]){bp.base=bk[bi];}
;bk[bi]=bp;}
;}
else {bo=bt.statics||{};if(qx.Bootstrap.$$registry&&qx.Bootstrap.$$registry[name]){var bs=qx.Bootstrap.$$registry[name];if(this.keys(bo).length!==0){if(bt.defer){bt.defer(bo,bk);}
;for(var bn in bo){bs[bn]=bo[bn];}
;return bs;}
;}
;}
;bo.$$type=P;if(!bo.hasOwnProperty(s)){bo.toString=this.genericToString;}
;var bm=name?this.createNamespace(name,bo):F;bo.classname=name;if(!bq()){try{bo.name=name;}
catch(bu){}
;}
;bo.basename=bm;bo.$$events=bt.events;if(bt.defer){this.addPendingDefer(bo,function(){bt.defer(bo,bk);}
);}
;if(name!=null){qx.Bootstrap.$$registry[name]=bo;}
;return bo;}
};qx.Bootstrap.define(G,{statics:{LOADSTART:qx.$$start||new Date(),DEBUG:(function(){var bv=true;if(qx.$$environment&&qx.$$environment[v]===false){bv=false;}
;return bv;}
)(),getEnvironmentSetting:function(bw){if(qx.$$environment){return qx.$$environment[bw];}
;}
,setEnvironmentSetting:function(bx,by){if(!qx.$$environment){qx.$$environment={};}
;if(qx.$$environment[bx]===undefined){qx.$$environment[bx]=by;}
;}
,createNamespace:qx.Bootstrap.createNamespace,setRoot:function(bz){qx.$$namespaceRoot=bz;}
,base:qx.Bootstrap.base,define:qx.Bootstrap.define,setDisplayName:qx.Bootstrap.setDisplayName,setDisplayNames:qx.Bootstrap.setDisplayNames,genericToString:qx.Bootstrap.genericToString,extendClass:function(clazz,construct,superClass,name,basename){var superproto=superClass.prototype;var helper=new Function();helper.prototype=superproto;var proto=new helper();clazz.prototype=proto;proto.name=proto.classname=name;proto.basename=basename;construct.base=superClass;clazz.superclass=superClass;construct.self=clazz.constructor=proto.constructor=clazz;}
,__hN:[],addPendingDefer:function(bB,bA){if(qx.$$loader.delayDefer){this.__hN.push(bB);bB.$$pendingDefer=bA;}
else {bA.call(bB);}
;}
,executePendingDefers:function(bH){var bF=function(bL){if(bL.environment){var bJ=bL.environment.required;if(bJ){for(var bM in bJ){var bI=bJ[bM];if(bI.load&&bI.className)bD(bI.className);}
;}
;}
;for(var bM in bL.dependsOn){var bK=bL.dependsOn[bM];if(bK.require||bK.load===y)bD(bM);}
;}
;var bD=function(bN){var bP=bE(bN);if(bP.$$deferComplete)return;var bO=bP.$$dbClassInfo;if(bO)bF(bO);bC(bP);}
;var bC=function(bR){var bQ=bR.$$pendingDefer;if(bQ){delete bR.$$pendingDefer;bR.$$deferComplete=true;bQ.call(bR);}
;}
;var bE=function(name){var bV=qx.Bootstrap.getByName(name);if(!bV){var bT=name.split(S);var bW=bT[0];var bX=qx.$$namespaceRoot&&qx.$$namespaceRoot[bW]?qx.$$namespaceRoot:window;var bS=bX;for(var i=0,bU=bT.length-1;bS&&i<bU;i++ ,bW=bT[i]){bS=bS[bW];}
;if(bS!=bX)bV=bS;}
;return bV;}
;var t=this;if(!bH){var bG=this.__hN;this.__hN=[];bG.forEach(bC);return;}
;bF(bH);}
,getByName:function(name){return qx.Bootstrap.$$registry[name];}
,$$registry:{},objectGetLength:function(bY){return qx.Bootstrap.keys(bY).length;}
,objectMergeWith:function(cc,ca,ce){if(ce===undefined){ce=true;}
;for(var cd in ca){if(ce||cc[cd]===undefined){cc[cd]=ca[cd];}
;}
;return cc;}
,__hO:[D,m,q,s,M,U,g],keys:({"ES5":Object.keys,"BROKEN_IE":function(cf){if(cf===null||(typeof cf!==V&&typeof cf!==c)){throw new TypeError(f);}
;var cg=[];var ci=Object.prototype.hasOwnProperty;for(var cj in cf){if(ci.call(cf,cj)){cg.push(cj);}
;}
;var ch=qx.Bootstrap.__hO;for(var i=0,a=ch,l=a.length;i<l;i++ ){if(ci.call(cf,a[i])){cg.push(a[i]);}
;}
;return cg;}
,"default":function(ck){if(ck===null||(typeof ck!==V&&typeof ck!==c)){throw new TypeError(f);}
;var cl=[];var cm=Object.prototype.hasOwnProperty;for(var cn in ck){if(cm.call(ck,cn)){cl.push(cn);}
;}
;return cl;}
})[typeof (Object.keys)===c?R:(function(){for(var co in {toString:1}){return co;}
;}
)()!==s?C:j],__hP:{"[object String]":A,"[object Array]":K,"[object Object]":z,"[object RegExp]":x,"[object Number]":N,"[object Boolean]":d,"[object Date]":E,"[object Function]":H,"[object Error]":e,"[object Blob]":u,"[object ArrayBuffer]":T,"[object FormData]":O},bind:function(cq,self,cr){var cp=Array.prototype.slice.call(arguments,2,arguments.length);return function(){var cs=Array.prototype.slice.call(arguments,0,arguments.length);return cq.apply(self,cp.concat(cs));}
;}
,firstUp:function(ct){return ct.charAt(0).toUpperCase()+ct.substr(1);}
,firstLow:function(cu){return cu.charAt(0).toLowerCase()+cu.substr(1);}
,getClass:function(cw){if(cw===undefined){return n;}
else if(cw===null){return k;}
;var cv=Object.prototype.toString.call(cw);return (qx.Bootstrap.__hP[cv]||cv.slice(8,-1));}
,isString:function(cx){return (cx!==null&&(typeof cx===o||qx.Bootstrap.getClass(cx)===A||cx instanceof String||(!!cx&&!!cx.$$isString)));}
,isArray:function(cy){return (cy!==null&&(cy instanceof Array||(cy&&qx.data&&qx.data.IListData&&qx.util.OOUtil.hasInterface(cy.constructor,qx.data.IListData))||qx.Bootstrap.getClass(cy)===K||(!!cy&&!!cy.$$isArray)));}
,isObject:function(cz){return (cz!==undefined&&cz!==null&&qx.Bootstrap.getClass(cz)===z);}
,isFunction:function(cA){return qx.Bootstrap.getClass(cA)===H;}
,$$logs:[],debug:function(cC,cB){qx.Bootstrap.$$logs.push([Q,arguments]);}
,info:function(cE,cD){qx.Bootstrap.$$logs.push([B,arguments]);}
,warn:function(cG,cF){qx.Bootstrap.$$logs.push([h,arguments]);}
,error:function(cI,cH){qx.Bootstrap.$$logs.push([r,arguments]);}
,trace:function(cJ){}
}});}
)();
(function(){var a="qx.util.OOUtil";qx.Bootstrap.define(a,{statics:{classIsDefined:function(name){return qx.Bootstrap.getByName(name)!==undefined;}
,getPropertyDefinition:function(b,name){while(b){if(b.$$properties&&b.$$properties[name]){return b.$$properties[name];}
;b=b.superclass;}
;return null;}
,hasProperty:function(c,name){return !!qx.util.OOUtil.getPropertyDefinition(c,name);}
,getEventType:function(d,name){var d=d.constructor;while(d.superclass){if(d.$$events&&d.$$events[name]!==undefined){return d.$$events[name];}
;d=d.superclass;}
;return null;}
,supportsEvent:function(e,name){return !!qx.util.OOUtil.getEventType(e,name);}
,getByInterface:function(h,f){var g,i,l;while(h){if(h.$$implements){g=h.$$flatImplements;for(i=0,l=g.length;i<l;i++ ){if(g[i]===f){return h;}
;}
;}
;h=h.superclass;}
;return null;}
,hasInterface:function(k,j){return !!qx.util.OOUtil.getByInterface(k,j);}
,getMixins:function(n){var m=[];while(n){if(n.$$includes){m.push.apply(m,n.$$flatIncludes);}
;n=n.superclass;}
;return m;}
}});}
)();
(function(){var a="qx.core.Environment",b="default",c=' type)',d="&",e="qx/static/blank.html",f="true",g="|",h="qx.core.Environment for a list of predefined keys.",j="false",k='] found, and no default ("default") given',l=":",m='" (',n=' in variants [',o=".",p="qx.allowUrlSettings",q='No match for variant "',r=" is not a valid key. Please see the API-doc of ",s="qxenv";qx.Bootstrap.define(a,{statics:{_checks:{},_asyncChecks:{},__ib:{},_checksMap:{},_defaults:{"true":true,"qx.allowUrlSettings":false,"qx.allowUrlVariants":false,"qx.debug.property.level":0,"qx.debug":true,"qx.debug.ui.queue":true,"qx.aspects":false,"qx.dynlocale":true,"qx.dyntheme":true,"qx.blankpage":e,"qx.debug.databinding":false,"qx.debug.dispose":false,"qx.optimization.basecalls":false,"qx.optimization.comments":false,"qx.optimization.privates":false,"qx.optimization.strings":false,"qx.optimization.variables":false,"qx.optimization.variants":false,"module.databinding":true,"module.logger":true,"module.property":true,"module.events":true,"qx.nativeScrollBars":false},get:function(w){if(this.__ib[w]!=undefined){return this.__ib[w];}
;var y=this._checks[w];if(y){var u=y();this.__ib[w]=u;return u;}
;var t=this._getClassNameFromEnvKey(w);if(t[0]!=undefined){var x=t[0];var v=t[1];var u=x[v]();this.__ib[w]=u;return u;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(w+r+h);qx.Bootstrap.trace(this);}
;}
,_getClassNameFromEnvKey:function(D){var F=this._checksMap;if(F[D]!=undefined){var A=F[D];var E=A.lastIndexOf(o);if(E>-1){var C=A.slice(0,E);var z=A.slice(E+1);var B=qx.Bootstrap.getByName(C);if(B!=undefined){return [B,z];}
;}
;}
;return [undefined,undefined];}
,getAsync:function(H,K,self){var L=this;if(this.__ib[H]!=undefined){window.setTimeout(function(){K.call(self,L.__ib[H]);}
,0);return;}
;var I=this._asyncChecks[H];if(I){I(function(N){L.__ib[H]=N;K.call(self,N);}
);return;}
;var G=this._getClassNameFromEnvKey(H);if(G[0]!=undefined){var J=G[0];var M=G[1];J[M](function(O){L.__ib[H]=O;K.call(self,O);}
);return;}
;if(qx.Bootstrap.DEBUG){qx.Bootstrap.warn(H+r+h);qx.Bootstrap.trace(this);}
;}
,select:function(Q,P){return this.__ic(this.get(Q),P);}
,selectAsync:function(S,R,self){this.getAsync(S,function(T){var U=this.__ic(S,R);U.call(self,T);}
,this);}
,__ic:function(Y,X){var W=X[Y];if(X.hasOwnProperty(Y)){return W;}
;for(var ba in X){if(ba.indexOf(g)!=-1){var V=ba.split(g);for(var i=0;i<V.length;i++ ){if(V[i]==Y){return X[ba];}
;}
;}
;}
;if(X[b]!==undefined){return X[b];}
;if(qx.Bootstrap.DEBUG){throw new Error(q+Y+m+(typeof Y)+c+n+qx.Bootstrap.keys(X)+k);}
;}
,filter:function(bb){var bd=[];for(var bc in bb){if(this.get(bc)){bd.push(bb[bc]);}
;}
;return bd;}
,invalidateCacheKey:function(be){delete this.__ib[be];}
,add:function(bg,bf){if(this._checks[bg]==undefined){if(bf instanceof Function){if(!this._checksMap[bg]&&bf.displayName){this._checksMap[bg]=bf.displayName.substr(0,bf.displayName.length-2);}
;this._checks[bg]=bf;}
else {this._checks[bg]=this.__if(bf);}
;}
;}
,addAsync:function(bi,bh){if(this._checks[bi]==undefined){this._asyncChecks[bi]=bh;}
;}
,getChecks:function(){return this._checks;}
,getAsyncChecks:function(){return this._asyncChecks;}
,_initDefaultQxValues:function(){var bj=function(bl){return function(){return bl;}
;}
;for(var bk in this._defaults){this.add(bk,bj(this._defaults[bk]));}
;}
,__id:function(){if(qx&&qx.$$environment){for(var bm in qx.$$environment){var bn=qx.$$environment[bm];this._checks[bm]=this.__if(bn);}
;}
;}
,__ie:function(){if(window.document&&window.document.location){var bo=window.document.location.search.slice(1).split(d);for(var i=0;i<bo.length;i++ ){var br=bo[i].split(l);if(br.length!=3||br[0]!=s){continue;}
;var bp=br[1];var bq=decodeURIComponent(br[2]);if(bq==f){bq=true;}
else if(bq==j){bq=false;}
else if(/^(\d|\.)+$/.test(bq)){bq=parseFloat(bq);}
;this._checks[bp]=this.__if(bq);}
;}
;}
,__if:function(bs){return qx.Bootstrap.bind(function(bt){return bt;}
,null,bs);}
},defer:function(bu){bu._initDefaultQxValues();bu.__id();if(bu.get(p)===true){bu.__ie();}
;}
});}
)();
(function(){var a="ecmascript.array.lastindexof",b="function",c="stack",d="ecmascript.array.map",f="ecmascript.date.now",g="ecmascript.array.reduce",h="e",i="qx.bom.client.EcmaScript",j="ecmascript.object.keys",k="ecmascript.error.stacktrace",l="ecmascript.string.trim",m="ecmascript.array.indexof",n="stacktrace",o="ecmascript.error.toString",p="[object Error]",q="ecmascript.array.foreach",r="ecmascript.function.bind",s="ecmascript.array.reduceright",t="ecmascript.array.some",u="ecmascript.array.filter",v="ecmascript.array.every";qx.Bootstrap.define(i,{statics:{getStackTrace:function(){var w;var e=new Error(h);w=e.stack?c:e.stacktrace?n:null;if(!w){try{throw e;}
catch(x){e=x;}
;}
;return e.stacktrace?n:e.stack?c:null;}
,getArrayIndexOf:function(){return !!Array.prototype.indexOf;}
,getArrayLastIndexOf:function(){return !!Array.prototype.lastIndexOf;}
,getArrayForEach:function(){return !!Array.prototype.forEach;}
,getArrayFilter:function(){return !!Array.prototype.filter;}
,getArrayMap:function(){return !!Array.prototype.map;}
,getArraySome:function(){return !!Array.prototype.some;}
,getArrayEvery:function(){return !!Array.prototype.every;}
,getArrayReduce:function(){return !!Array.prototype.reduce;}
,getArrayReduceRight:function(){return !!Array.prototype.reduceRight;}
,getErrorToString:function(){return typeof Error.prototype.toString==b&&Error.prototype.toString()!==p;}
,getFunctionBind:function(){return typeof Function.prototype.bind===b;}
,getObjectKeys:function(){return !!Object.keys;}
,getDateNow:function(){return !!Date.now;}
,getStringTrim:function(){return typeof String.prototype.trim===b;}
},defer:function(y){qx.core.Environment.add(m,y.getArrayIndexOf);qx.core.Environment.add(a,y.getArrayLastIndexOf);qx.core.Environment.add(q,y.getArrayForEach);qx.core.Environment.add(u,y.getArrayFilter);qx.core.Environment.add(d,y.getArrayMap);qx.core.Environment.add(t,y.getArraySome);qx.core.Environment.add(v,y.getArrayEvery);qx.core.Environment.add(g,y.getArrayReduce);qx.core.Environment.add(s,y.getArrayReduceRight);qx.core.Environment.add(f,y.getDateNow);qx.core.Environment.add(o,y.getErrorToString);qx.core.Environment.add(k,y.getStackTrace);qx.core.Environment.add(r,y.getFunctionBind);qx.core.Environment.add(j,y.getObjectKeys);qx.core.Environment.add(l,y.getStringTrim);}
});}
)();
(function(){var a="qx.lang.normalize.Function",b="ecmascript.function.bind",c="function",d="Function.prototype.bind called on incompatible ";qx.Bootstrap.define(a,{statics:{bind:function(i){var e=Array.prototype.slice;var h=this;if(typeof h!=c){throw new TypeError(d+h);}
;var f=e.call(arguments,1);var g=function(){if(this instanceof g){var F=function(){}
;F.prototype=h.prototype;var self=new F;var j=h.apply(self,f.concat(e.call(arguments)));if(Object(j)===j){return j;}
;return self;}
else {return h.apply(i,f.concat(e.call(arguments)));}
;}
;return g;}
},defer:function(k){if(!qx.core.Environment.get(b)){Function.prototype.bind=k.bind;}
;}
});}
)();
(function(){var a="function",b="ecmascript.array.lastindexof",c="ecmascript.array.map",d="ecmascript.array.filter",e="Length is 0 and no second argument given",f="qx.lang.normalize.Array",g="ecmascript.array.indexof",h="First argument is not callable",j="ecmascript.array.reduce",k="ecmascript.array.foreach",m="ecmascript.array.reduceright",n="ecmascript.array.some",o="ecmascript.array.every";qx.Bootstrap.define(f,{statics:{indexOf:function(p,q){if(q==null){q=0;}
else if(q<0){q=Math.max(0,this.length+q);}
;for(var i=q;i<this.length;i++ ){if(this[i]===p){return i;}
;}
;return -1;}
,lastIndexOf:function(r,s){if(s==null){s=this.length-1;}
else if(s<0){s=Math.max(0,this.length+s);}
;for(var i=s;i>=0;i-- ){if(this[i]===r){return i;}
;}
;return -1;}
,forEach:function(t,u){var l=this.length;for(var i=0;i<l;i++ ){var v=this[i];if(v!==undefined){t.call(u||window,v,i,this);}
;}
;}
,filter:function(z,w){var x=[];var l=this.length;for(var i=0;i<l;i++ ){var y=this[i];if(y!==undefined){if(z.call(w||window,y,i,this)){x.push(this[i]);}
;}
;}
;return x;}
,map:function(D,A){var B=[];var l=this.length;for(var i=0;i<l;i++ ){var C=this[i];if(C!==undefined){B[i]=D.call(A||window,C,i,this);}
;}
;return B;}
,some:function(E,F){var l=this.length;for(var i=0;i<l;i++ ){var G=this[i];if(G!==undefined){if(E.call(F||window,G,i,this)){return true;}
;}
;}
;return false;}
,every:function(H,I){var l=this.length;for(var i=0;i<l;i++ ){var J=this[i];if(J!==undefined){if(!H.call(I||window,J,i,this)){return false;}
;}
;}
;return true;}
,reduce:function(K,L){if(typeof K!==a){throw new TypeError(h);}
;if(L===undefined&&this.length===0){throw new TypeError(e);}
;var M=L===undefined?this[0]:L;for(var i=L===undefined?1:0;i<this.length;i++ ){if(i in this){M=K.call(undefined,M,this[i],i,this);}
;}
;return M;}
,reduceRight:function(N,O){if(typeof N!==a){throw new TypeError(h);}
;if(O===undefined&&this.length===0){throw new TypeError(e);}
;var P=O===undefined?this[this.length-1]:O;for(var i=O===undefined?this.length-2:this.length-1;i>=0;i-- ){if(i in this){P=N.call(undefined,P,this[i],i,this);}
;}
;return P;}
},defer:function(Q){if(!qx.core.Environment.get(g)){Array.prototype.indexOf=Q.indexOf;}
;if(!qx.core.Environment.get(b)){Array.prototype.lastIndexOf=Q.lastIndexOf;}
;if(!qx.core.Environment.get(k)){Array.prototype.forEach=Q.forEach;}
;if(!qx.core.Environment.get(d)){Array.prototype.filter=Q.filter;}
;if(!qx.core.Environment.get(c)){Array.prototype.map=Q.map;}
;if(!qx.core.Environment.get(n)){Array.prototype.some=Q.some;}
;if(!qx.core.Environment.get(o)){Array.prototype.every=Q.every;}
;if(!qx.core.Environment.get(j)){Array.prototype.reduce=Q.reduce;}
;if(!qx.core.Environment.get(m)){Array.prototype.reduceRight=Q.reduceRight;}
;}
});}
)();
(function(){var b=".prototype",c='Conflict between mixin "',d="function",e="'is undefined/null!",f="constructor",g="' in mixin '",h='The configuration key "',j='" and "',k='" is not allowed!',m='" in member "',n='"! The type of the key must be "',o="Array",p="RegExp",q="members",r='" in property "',s="properties",t="statics",u="qx.Mixin",v="events",w="'is not a mixin!",x='Invalid type of key "',y='"!',z="]",A='"! The value needs to be a map!',B="Mixin",C="[Mixin ",D='" in mixin "',E="Includes of mixins must be mixins. The include number '",F="destruct",G='Invalid key "',H="Date",I='"! The value is undefined/null!',J="qx.debug",K="object";qx.Bootstrap.define(u,{statics:{define:function(name,M){if(M){if(M.include&&!(qx.Bootstrap.getClass(M.include)===o)){M.include=[M.include];}
;if(qx.core.Environment.get(J)){this.__ik(name,M);}
;var L=M.statics?M.statics:{};qx.Bootstrap.setDisplayNames(L,name);for(var N in L){if(L[N] instanceof Function){L[N].$$mixin=L;}
;}
;if(M.construct){L.$$constructor=M.construct;qx.Bootstrap.setDisplayName(M.construct,name,f);}
;if(M.include){L.$$includes=M.include;}
;if(M.properties){L.$$properties=M.properties;}
;if(M.members){L.$$members=M.members;qx.Bootstrap.setDisplayNames(M.members,name+b);}
;for(var N in L.$$members){if(L.$$members[N] instanceof Function){L.$$members[N].$$mixin=L;}
;}
;if(M.events){L.$$events=M.events;}
;if(M.destruct){L.$$destructor=M.destruct;qx.Bootstrap.setDisplayName(M.destruct,name,F);}
;}
else {var L={};}
;L.$$type=B;L.name=name;L.toString=this.genericToString;L.basename=qx.Bootstrap.createNamespace(name,L);this.$$registry[name]=L;return L;}
,checkCompatibility:function(P){var Q=this.flatten(P);var R=Q.length;if(R<2){return true;}
;var S={};var T={};var V={};var U;for(var i=0;i<R;i++ ){U=Q[i];for(var O in U.events){if(V[O]){throw new Error(c+U.name+j+V[O]+m+O+y);}
;V[O]=U.name;}
;for(var O in U.properties){if(S[O]){throw new Error(c+U.name+j+S[O]+r+O+y);}
;S[O]=U.name;}
;for(var O in U.members){if(T[O]){throw new Error(c+U.name+j+T[O]+m+O+y);}
;T[O]=U.name;}
;}
;return true;}
,isCompatible:function(X,Y){var W=qx.util.OOUtil.getMixins(Y);W.push(X);return qx.Mixin.checkCompatibility(W);}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(ba){if(!ba){return [];}
;var bb=ba.concat();for(var i=0,l=ba.length;i<l;i++ ){if(ba[i].$$includes){bb.push.apply(bb,this.flatten(ba[i].$$includes));}
;}
;return bb;}
,genericToString:function(){return C+this.name+z;}
,$$registry:{},__ij:qx.core.Environment.select(J,{"true":{"include":K,"statics":K,"members":K,"properties":K,"events":K,"destruct":d,"construct":d},"default":null}),__ik:qx.core.Environment.select(J,{"true":function(name,bf){var be=this.__ij;for(var bd in bf){if(!be[bd]){throw new Error(h+bd+D+name+k);}
;if(bf[bd]==null){throw new Error(G+bd+D+name+I);}
;if(be[bd]!==null&&typeof bf[bd]!==be[bd]){throw new Error(x+bd+D+name+n+be[bd]+y);}
;}
;var bc=[t,q,s,v];for(var i=0,l=bc.length;i<l;i++ ){var bd=bc[i];if(bf[bd]!==undefined&&([o,p,H].indexOf(qx.Bootstrap.getClass(bf[bd]))!=-1||bf[bd].classname!==undefined)){throw new Error(G+bd+D+name+A);}
;}
;if(bf.include){for(var i=0,a=bf.include,l=a.length;i<l;i++ ){if(a[i]==null){throw new Error(E+(i+1)+g+name+e);}
;if(a[i].$$type!==B){throw new Error(E+(i+1)+g+name+w);}
;}
;this.checkCompatibility(bf.include);}
;}
,"default":function(name,bg){}
})}});}
)();
(function(){var a="qx.core.Aspect",b="before",c="*",d="static";qx.Bootstrap.define(a,{statics:{__il:[],wrap:function(h,l,j){var m=[];var e=[];var k=this.__il;var g;for(var i=0;i<k.length;i++ ){g=k[i];if((g.type==null||j==g.type||g.type==c)&&(g.name==null||h.match(g.name))){g.pos==-1?m.push(g.fcn):e.push(g.fcn);}
;}
;if(m.length===0&&e.length===0){return l;}
;var f=function(){for(var i=0;i<m.length;i++ ){m[i].call(this,h,l,j,arguments);}
;var n=l.apply(this,arguments);for(var i=0;i<e.length;i++ ){e[i].call(this,h,l,j,arguments,n);}
;return n;}
;if(j!==d){f.self=l.self;f.base=l.base;}
;l.wrapper=f;f.original=l;return f;}
,addAdvice:function(q,o,p,name){this.__il.push({fcn:q,pos:o===b?-1:1,type:p,name:name});}
}});}
)();
(function(){var a='',b="ecmascript.string.trim",c="qx.lang.normalize.String";qx.Bootstrap.define(c,{statics:{trim:function(){return this.replace(/^\s+|\s+$/g,a);}
},defer:function(d){if(!qx.core.Environment.get(b)){String.prototype.trim=d.trim;}
;}
});}
)();
(function(){var a="ecmascript.object.keys",b="qx.lang.normalize.Object";qx.Bootstrap.define(b,{statics:{keys:qx.Bootstrap.keys},defer:function(c){if(!qx.core.Environment.get(a)){Object.keys=c.keys;}
;}
});}
)();
(function(){var b="function",c="Boolean",d="'! The value is undefined/null!",e="RegExp",f='The configuration key "',g='The property "',h='" is not allowed!',j="string",k='Implementation of method "',m='"',n="Array",o='" is missing in class "',p="' in interface '",q="members",r="number",s="properties",t="statics",u="qx.debug",v="Invalid key '",w='The event "',x="events",y='Invalid type of key "',z='"!',A="]",B='" in class "',C="Interface",D='"! The value needs to be a map!',E='" in interface "',F="' is undefined/null!",G='"! The type of the key must be "',H='Implementation of member "',I="Extends of interfaces must be interfaces. The extend number '",J='" is not supported by Class "',K="' is not an interface!",L="qx.Interface",M='" required by interface "',N='Invalid key "',O="Date",P='"! Static constants must be all uppercase.',Q="toggle",R="boolean",S="is",T="[Interface ",U='"! Static constants must be all of a primitive type.',V="object";qx.Bootstrap.define(L,{statics:{define:function(name,X){if(X){if(X.extend&&!(qx.Bootstrap.getClass(X.extend)===n)){X.extend=[X.extend];}
;if(qx.core.Environment.get(u)){this.__ik(name,X);}
;var W=X.statics?X.statics:{};if(X.extend){W.$$extends=X.extend;}
;if(X.properties){W.$$properties=X.properties;}
;if(X.members){W.$$members=X.members;}
;if(X.events){W.$$events=X.events;}
;}
else {var W={};}
;W.$$type=C;W.name=name;W.toString=this.genericToString;W.basename=qx.Bootstrap.createNamespace(name,W);qx.Interface.$$registry[name]=W;return W;}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,flatten:function(ba){if(!ba){return [];}
;var Y=ba.concat();for(var i=0,l=ba.length;i<l;i++ ){if(ba[i].$$extends){Y.push.apply(Y,this.flatten(ba[i].$$extends));}
;}
;return Y;}
,__im:function(be,bf,bb,bi,bg){var bc=bb.$$members;if(bc){for(var bh in bc){if(qx.Bootstrap.isFunction(bc[bh])){var bk=this.__in(bf,bh);var bd=bk||qx.Bootstrap.isFunction(be[bh]);if(!bd){if(bg){throw new Error(k+bh+o+bf.classname+M+bb.name+m);}
else {return false;}
;}
;var bj=bi===true&&!bk&&!qx.util.OOUtil.hasInterface(bf,bb);if(bj){be[bh]=this.__iq(bb,be[bh],bh,bc[bh]);}
;}
else {if(typeof be[bh]===undefined){if(typeof be[bh]!==b){if(bg){throw new Error(H+bh+o+bf.classname+M+bb.name+m);}
else {return false;}
;}
;}
;}
;}
;}
;if(!bg){return true;}
;}
,__in:function(bo,bl){var bq=bl.match(/^(is|toggle|get|set|reset)(.*)$/);if(!bq){return false;}
;var bn=qx.Bootstrap.firstLow(bq[2]);var bp=qx.util.OOUtil.getPropertyDefinition(bo,bn);if(!bp){return false;}
;var bm=bq[0]===S||bq[0]===Q;if(bm){return qx.util.OOUtil.getPropertyDefinition(bo,bn).check===c;}
;return true;}
,__io:function(bu,br,bs){if(br.$$properties){for(var bt in br.$$properties){if(!qx.util.OOUtil.getPropertyDefinition(bu,bt)){if(bs){throw new Error(g+bt+J+bu.classname+z);}
else {return false;}
;}
;}
;}
;if(!bs){return true;}
;}
,__ip:function(by,bv,bw){if(bv.$$events){for(var bx in bv.$$events){if(!qx.util.OOUtil.supportsEvent(by,bx)){if(bw){throw new Error(w+bx+J+by.classname+z);}
else {return false;}
;}
;}
;}
;if(!bw){return true;}
;}
,assertObject:function(bB,bz){var bC=bB.constructor;this.__im(bB,bC,bz,false,true);this.__io(bC,bz,true);this.__ip(bC,bz,true);var bA=bz.$$extends;if(bA){for(var i=0,l=bA.length;i<l;i++ ){this.assertObject(bB,bA[i]);}
;}
;}
,assert:function(bF,bD,bG){this.__im(bF.prototype,bF,bD,bG,true);this.__io(bF,bD,true);this.__ip(bF,bD,true);var bE=bD.$$extends;if(bE){for(var i=0,l=bE.length;i<l;i++ ){this.assert(bF,bE[i],bG);}
;}
;}
,objectImplements:function(bJ,bH){var bK=bJ.constructor;if(!this.__im(bJ,bK,bH)||!this.__io(bK,bH)||!this.__ip(bK,bH)){return false;}
;var bI=bH.$$extends;if(bI){for(var i=0,l=bI.length;i<l;i++ ){if(!this.objectImplements(bJ,bI[i])){return false;}
;}
;}
;return true;}
,classImplements:function(bN,bL){if(!this.__im(bN.prototype,bN,bL)||!this.__io(bN,bL)||!this.__ip(bN,bL)){return false;}
;var bM=bL.$$extends;if(bM){for(var i=0,l=bM.length;i<l;i++ ){if(!this.has(bN,bM[i])){return false;}
;}
;}
;return true;}
,genericToString:function(){return T+this.name+A;}
,$$registry:{},__iq:qx.core.Environment.select(u,{"true":function(bR,bP,bS,bO){function bQ(){bO.apply(this,arguments);return bP.apply(this,arguments);}
;bP.wrapper=bQ;return bQ;}
,"default":function(bV,bU,bW,bT){}
}),__ij:qx.core.Environment.select(u,{"true":{"extend":V,"statics":V,"members":V,"properties":V,"events":V},"default":null}),__ik:qx.core.Environment.select(u,{"true":function(name,cb){if(qx.core.Environment.get(u)){var ca=this.__ij;for(var bY in cb){if(ca[bY]===undefined){throw new Error(f+bY+B+name+h);}
;if(cb[bY]==null){throw new Error(v+bY+p+name+d);}
;if(ca[bY]!==null&&typeof cb[bY]!==ca[bY]){throw new Error(y+bY+E+name+G+ca[bY]+z);}
;}
;var bX=[t,q,s,x];for(var i=0,l=bX.length;i<l;i++ ){var bY=bX[i];if(cb[bY]!==undefined&&([n,e,O].indexOf(qx.Bootstrap.getClass(cb[bY]))!=-1||cb[bY].classname!==undefined)){throw new Error(N+bY+E+name+D);}
;}
;if(cb.extend){for(var i=0,a=cb.extend,l=a.length;i<l;i++ ){if(a[i]==null){throw new Error(I+i+1+p+name+F);}
;if(a[i].$$type!==C){throw new Error(I+i+1+p+name+K);}
;}
;}
;if(cb.statics){for(var bY in cb.statics){if(bY.toUpperCase()!==bY){throw new Error(N+bY+E+name+P);}
;switch(typeof cb.statics[bY]){case R:case j:case r:break;default:throw new Error(N+bY+E+name+U);};}
;}
;}
;}
,"default":function(name,cc){}
})}});}
)();
(function(){var a="ecmascript.error.toString",b="qx.lang.normalize.Error",c=": ",d="Error",e="";qx.Bootstrap.define(b,{statics:{toString:function(){var name=this.name||d;var f=this.message||e;if(name===e&&f===e){return d;}
;if(name===e){return f;}
;if(f===e){return name;}
;return name+c+f;}
},defer:function(g){if(!qx.core.Environment.get(a)){Error.prototype.toString=g.toString;}
;}
});}
)();
(function(){var a="qx.lang.normalize.Date",b="ecmascript.date.now";qx.Bootstrap.define(a,{statics:{now:function(){return +new Date();}
},defer:function(c){if(!qx.core.Environment.get(b)){Date.now=c.now;}
;}
});}
)();
(function(){var b='!==inherit){',c='var msg = "Invalid incoming value for property \'',d='qx.lang.Type.isString(value) && qx.util.ColorUtil.isValidPropertyValue(value)',e='value !== null && qx.theme.manager.Font.getInstance().isDynamic(value)',f="set",g="function",h=';',j="resetThemed",k='value !== null && value.nodeType === 9 && value.documentElement',m='===value)return value;',n='value !== null && value.$$type === "Mixin"',o='return init;',p='var init=this.',q=')prop.error(this,5,"',r='value !== null && value.nodeType === 1 && value.attributes',s="var parent = this.getLayoutParent();",t="Error in property ",u='var a=this._getChildren();if(a)for(var i=0,l=a.length;i<l;i++){',v="property",w='.check.call(this, value)',x='if((computed===undefined||computed===inherit)&&',y="();",z='.validate.call(this, value);',A='qx.core.Assert.assertInstance(value, Date, msg) || true',B='else{',C="Cannot add the non themable property '",D="if (!parent) return;",E=" in method ",F='qx.core.Assert.assertInstance(value, Error, msg) || true',G='=computed;',H='Undefined value is not allowed!',I='(backup);',J='if(',K='else ',L='=true;',M="' to the themable property group '",N='if(old===undefined)old=this.',O='if(computed===inherit){',P='old=computed=this.',Q="]: ",R="inherit",S='if(this.',T='return this.',U='else if(this.',V='Is invalid!',W='if(value===undefined)prop.error(this,2,"',X='", "',Y='var computed, old=this.',ba='else if(computed===undefined)',bb="Malformed generated code to unwrap method: ",bc='delete this.',bd="resetRuntime",be="': ",bf=" of class ",bg='value !== null && value.nodeType !== undefined',bh='===undefined)return;',bi='value !== null && qx.theme.manager.Decoration.getInstance().isValidPropertyValue(value)',bj="Could not add check to property ",bk="reset",bl="string",bm="')){",bn="module.events",bo="return this.",bp='qx.core.Assert.assertPositiveInteger(value, msg) || true',bq="Code[",br='value=this.',bs="Cannot create property group '",bt='","',bu='if(init==qx.core.Property.$$inherit)init=null;',bv='qx.core.Assert.assertInArray(value, ',bw="get",bx='value !== null && value.$$type === "Interface"',by='var inherit=prop.$$inherit;',bz="', qx.event.type.Data, [computed, old]",bA="var value = parent.",bB="$$useinit_",bC='computed=undefined;delete this.',bD="(value);",bE='this.',bF='Requires exactly one argument!',bG='",value);',bH='computed=value;',bI='}else{',bJ="$$runtime_",bK="setThemed",bL='if(this.$$initialized)prop.error(this,0,"',bM='qx.core.Assert.assertInstance(value, qx.Class.getByName("',bN='(value);',bO="$$user_",bP='if(value===null)prop.error(this,4,"',bQ='!==undefined)',bR='){',bS='!',bT='qx.core.Assert.assertArray(value, msg) || true',bU='if(computed===undefined||computed===inherit){',bV=";",bW='qx.core.Assert.assertPositiveNumber(value, msg) || true',bX=".prototype",bY="' including non-existing property '",ca="Boolean",cb=")}",cc="(a[",cd='(computed, old, "',ce="setRuntime",cf='return value;',cg="this.",ch='.check, msg)',ci="if(reg.hasListener(this, '",cj='Does not allow any arguments!',ck='\'";',cl=')a[i].',cm="()",cn=';}',co="var a=arguments[0] instanceof Array?arguments[0]:arguments;",cp='.$$properties.',cq='value !== null && value.$$type === "Theme"',cr='if(value!==null)',cs="'!",ct="var reg=qx.event.Registration;",cu="())",cv='=value;',cw='return null;',cx='!==undefined){',cy='qx.core.Assert.assertObject(value, msg) || true',cz='");',cA='if(old===computed)return value;',cB='qx.core.Assert.assertString(value, msg) || true',cC='!==undefined&&',cD="\n",cE='var pa=this.getLayoutParent();if(pa)computed=pa.',cF="if (value===undefined) value = parent.",cG='value !== null && value.$$type === "Class"',cH='qx.core.Assert.assertFunction(value, msg) || true',cI='old=this.',cJ='var computed, old;',cK='var backup=computed;',cL=".",cM='}',cN='"), msg)',cO="object",cP="$$init_",cQ='qx.core.Assert.assertInterface(value, qx.Interface.getByName("',cR="$$theme_",cS="qx.debug.property.level",cT='if(computed===undefined)computed=null;',cU='\' of class \'',cV="Unknown reason: ",cW='if(arguments.length!==1)prop.error(this,1,"',cX="init",cY='qx.core.Assert.assertMap(value, msg) || true',da='!(',db="Generating property wrappers: ",dc="'",dd='qx.core.Assert.assertNumber(value, msg) || true',de="qx.debug",df="reg.fireEvent(this, '",dg='Null value is not allowed!',dh='if(value!==inherit)',di='qx.core.Assert.assertInteger(value, msg) || true',dj="value",dk="shorthand",dl='computed=this.',dm="Generating property group: ",dn='qx.core.Assert.assertInstance(value, RegExp, msg) || true',dp='value !== null && value.type !== undefined',dq='value !== null && value.document',dr="",ds='throw new Error("Property ',dt="(!this.",du='qx.core.Assert.assertBoolean(value, msg) || true',dv='if(a[i].',dw="qx.aspects",dx=' of an instance of ',dy="toggle",dz="refresh",dA="$$inherit_",dB='var prop=qx.core.Property;',dC='else this.',dD='if(old===undefined)old=null;',dE="boolean",dF=" with incoming value '",dG=')',dH='if(arguments.length!==0)prop.error(this,3,"',dI="a=qx.lang.Array.fromShortHand(qx.lang.Array.fromArguments(a));",dJ='if(computed===undefined||computed==inherit)computed=null;',dK="qx.core.Property",dL="is",dM=' is not (yet) ready!");',dN="]);",dO='Could not change or apply init value after constructing phase!';qx.Bootstrap.define(dK,{statics:{__ir:function(){if(qx.core.Environment.get(bn)){qx.event.type.Data;qx.event.dispatch.Direct;}
;}
,__is:{"Boolean":du,"String":cB,"Number":dd,"Integer":di,"PositiveNumber":bW,"PositiveInteger":bp,"Error":F,"RegExp":dn,"Object":cy,"Array":bT,"Map":cY,"Function":cH,"Date":A,"Node":bg,"Element":r,"Document":k,"Window":dq,"Event":dp,"Class":cG,"Mixin":n,"Interface":bx,"Theme":cq,"Color":d,"Decorator":bi,"Font":e},__it:{"Node":true,"Element":true,"Document":true,"Window":true,"Event":true},$$inherit:R,$$store:{runtime:{},user:{},theme:{},inherit:{},init:{},useinit:{}},$$method:{get:{},set:{},reset:{},init:{},refresh:{},setRuntime:{},resetRuntime:{},setThemed:{},resetThemed:{}},$$allowedKeys:{name:bl,dereference:dE,inheritable:dE,nullable:dE,themeable:dE,refine:dE,init:null,apply:bl,event:bl,check:null,transform:bl,deferredInit:dE,validate:null},$$allowedGroupKeys:{name:bl,group:cO,mode:bl,themeable:dE},$$inheritable:{},__iu:function(dR){var dP=this.__iv(dR);if(!dP.length){var dQ=function(){}
;}
else {dQ=this.__iw(dP);}
;dR.prototype.$$refreshInheritables=dQ;}
,__iv:function(dS){var dT=[];while(dS){var dU=dS.$$properties;if(dU){for(var name in this.$$inheritable){if(dU[name]&&dU[name].inheritable){dT.push(name);}
;}
;}
;dS=dS.superclass;}
;return dT;}
,__iw:function(inheritables){var inherit=this.$$store.inherit;var init=this.$$store.init;var refresh=this.$$method.refresh;var code=[s,D];for(var i=0,l=inheritables.length;i<l;i++ ){var name=inheritables[i];code.push(bA,inherit[name],bV,cF,init[name],bV,cg,refresh[name],bD);}
;return new Function(code.join(dr));}
,attachRefreshInheritables:function(dV){dV.prototype.$$refreshInheritables=function(){qx.core.Property.__iu(dV);return this.$$refreshInheritables();}
;}
,attachMethods:function(dX,name,dW){dW.group?this.__ix(dX,dW,name):this.__iy(dX,dW,name);}
,__ix:function(clazz,config,name){var upname=qx.Bootstrap.firstUp(name);var members=clazz.prototype;var themeable=config.themeable===true;if(qx.core.Environment.get(de)){if(qx.core.Environment.get(cS)>1){qx.Bootstrap.debug(dm+name);}
;}
;var setter=[];var resetter=[];if(themeable){var styler=[];var unstyler=[];}
;var argHandler=co;setter.push(argHandler);if(themeable){styler.push(argHandler);}
;if(config.mode==dk){var shorthand=dI;setter.push(shorthand);if(themeable){styler.push(shorthand);}
;}
;for(var i=0,a=config.group,l=a.length;i<l;i++ ){if(qx.core.Environment.get(de)){if(!this.$$method.set[a[i]]||!this.$$method.reset[a[i]]){throw new Error(bs+name+bY+a[i]+cs);}
;}
;setter.push(cg,this.$$method.set[a[i]],cc,i,dN);resetter.push(cg,this.$$method.reset[a[i]],y);if(themeable){if(qx.core.Environment.get(de)){if(!this.$$method.setThemed[a[i]]){throw new Error(C+a[i]+M+name+dc);}
;}
;styler.push(cg,this.$$method.setThemed[a[i]],cc,i,dN);unstyler.push(cg,this.$$method.resetThemed[a[i]],y);}
;}
;this.$$method.set[name]=f+upname;members[this.$$method.set[name]]=new Function(setter.join(dr));this.$$method.reset[name]=bk+upname;members[this.$$method.reset[name]]=new Function(resetter.join(dr));if(themeable){this.$$method.setThemed[name]=bK+upname;members[this.$$method.setThemed[name]]=new Function(styler.join(dr));this.$$method.resetThemed[name]=j+upname;members[this.$$method.resetThemed[name]]=new Function(unstyler.join(dr));}
;}
,__iy:function(clazz,config,name){var upname=qx.Bootstrap.firstUp(name);var members=clazz.prototype;if(qx.core.Environment.get(de)){if(qx.core.Environment.get(cS)>1){qx.Bootstrap.debug(db+name);}
;}
;if(config.dereference===undefined&&typeof config.check===bl){config.dereference=this.__iz(config.check);}
;var method=this.$$method;var store=this.$$store;store.runtime[name]=bJ+name;store.user[name]=bO+name;store.theme[name]=cR+name;store.init[name]=cP+name;store.inherit[name]=dA+name;store.useinit[name]=bB+name;method.get[name]=bw+upname;members[method.get[name]]=function(){return qx.core.Property.executeOptimizedGetter(this,clazz,name,bw);}
;method.set[name]=f+upname;members[method.set[name]]=function(dY){return qx.core.Property.executeOptimizedSetter(this,clazz,name,f,arguments);}
;method.reset[name]=bk+upname;members[method.reset[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,bk);}
;if(config.inheritable||config.apply||config.event||config.deferredInit){method.init[name]=cX+upname;members[method.init[name]]=function(ea){return qx.core.Property.executeOptimizedSetter(this,clazz,name,cX,arguments);}
;if(qx.core.Environment.get(de)){members[method.init[name]].$$propertyMethod=true;}
;}
;if(config.inheritable){method.refresh[name]=dz+upname;members[method.refresh[name]]=function(eb){return qx.core.Property.executeOptimizedSetter(this,clazz,name,dz,arguments);}
;if(qx.core.Environment.get(de)){members[method.refresh[name]].$$propertyMethod=true;}
;}
;method.setRuntime[name]=ce+upname;members[method.setRuntime[name]]=function(ec){return qx.core.Property.executeOptimizedSetter(this,clazz,name,ce,arguments);}
;method.resetRuntime[name]=bd+upname;members[method.resetRuntime[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,bd);}
;if(config.themeable){method.setThemed[name]=bK+upname;members[method.setThemed[name]]=function(ed){return qx.core.Property.executeOptimizedSetter(this,clazz,name,bK,arguments);}
;method.resetThemed[name]=j+upname;members[method.resetThemed[name]]=function(){return qx.core.Property.executeOptimizedSetter(this,clazz,name,j);}
;if(qx.core.Environment.get(de)){members[method.setThemed[name]].$$propertyMethod=true;members[method.resetThemed[name]].$$propertyMethod=true;}
;}
;if(config.check===ca){members[dy+upname]=new Function(bo+method.set[name]+dt+method.get[name]+cu);members[dL+upname]=new Function(bo+method.get[name]+cm);if(qx.core.Environment.get(de)){members[dy+upname].$$propertyMethod=true;members[dL+upname].$$propertyMethod=true;}
;}
;if(qx.core.Environment.get(de)){members[method.get[name]].$$propertyMethod=true;members[method.set[name]].$$propertyMethod=true;members[method.reset[name]].$$propertyMethod=true;members[method.setRuntime[name]].$$propertyMethod=true;members[method.resetRuntime[name]].$$propertyMethod=true;}
;}
,__iz:function(ee){return !!this.__it[ee];}
,__iA:{'0':dO,'1':bF,'2':H,'3':cj,'4':dg,'5':V},error:function(ef,el,ek,eg,eh){var ei=ef.constructor.classname;var ej=t+ek+bf+ei+E+this.$$method[eg][ek]+dF+eh+be;throw new Error(ej+(this.__iA[el]||cV+el));}
,__iB:function(instance,members,name,variant,code,args){var store=this.$$method[variant][name];if(qx.core.Environment.get(de)){if(qx.core.Environment.get(cS)>1){qx.Bootstrap.debug(bq+this.$$method[variant][name]+Q+code.join(dr));}
;try{members[store]=new Function(dj,code.join(dr));}
catch(em){throw new Error(bb+this.$$method[variant][name]+cD+code.join(dr));}
;}
else {members[store]=new Function(dj,code.join(dr));}
;if(qx.core.Environment.get(dw)){members[store]=qx.core.Aspect.wrap(instance.classname+cL+store,members[store],v);}
;qx.Bootstrap.setDisplayName(members[store],instance.classname+bX,store);if(args===undefined){return instance[store]();}
else if(qx.core.Environment.get(de)){return instance[store].apply(instance,args);}
else {return instance[store](args[0]);}
;}
,executeOptimizedGetter:function(eq,ep,name,eo){var es=ep.$$properties[name];var er=ep.prototype;var en=[];var et=this.$$store;en.push(S,et.runtime[name],bQ);en.push(T,et.runtime[name],h);if(es.inheritable){en.push(U,et.inherit[name],bQ);en.push(T,et.inherit[name],h);en.push(K);}
;en.push(S,et.user[name],bQ);en.push(T,et.user[name],h);if(es.themeable){en.push(U,et.theme[name],bQ);en.push(T,et.theme[name],h);}
;if(es.deferredInit&&es.init===undefined){en.push(U,et.init[name],bQ);en.push(T,et.init[name],h);}
;en.push(K);if(es.init!==undefined){if(es.inheritable){en.push(p,et.init[name],h);if(es.nullable){en.push(bu);}
;en.push(o);}
else {en.push(T,et.init[name],h);}
;}
else if(es.inheritable||es.nullable){en.push(cw);}
else {en.push(ds,name,dx,ep.classname,dM);}
;return this.__iB(eq,er,name,eo,en);}
,executeOptimizedSetter:function(eB,eA,name,ez,ey){var eD=eA.$$properties[name];var eC=eA.prototype;var ev=[];var eu=ez===f||ez===bK||ez===ce||(ez===cX&&eD.init===undefined);var ew=eD.apply||eD.event||eD.inheritable;var eE=this.__iC(ez,name);this.__iD(ev,eD,name,ez,eu);if(eu){this.__iE(ev,eA,eD,name);}
;if(ew){this.__iF(ev,eu,eE,ez);}
;if(eD.inheritable){ev.push(by);}
;if(qx.core.Environment.get(de)){if(eu){this.__iG(ev,eD,eA,name,ez);}
;}
;if(!ew){this.__iH(ev,name,ez,eu);}
else {this.__iI(ev,eD,name,ez,eu);}
;if(eD.inheritable){this.__iJ(ev,eD,name,ez);}
else if(ew){this.__iK(ev,eD,name,ez);}
;if(ew){this.__iL(ev,eD,name,ez);if(eD.inheritable&&eC._getChildren){this.__iM(ev,name);}
;}
;if(eu){ev.push(cf);}
;return this.__iB(eB,eC,name,ez,ev,ey);}
,__iC:function(eF,name){if(eF===ce||eF===bd){var eG=this.$$store.runtime[name];}
else if(eF===bK||eF===j){eG=this.$$store.theme[name];}
else if(eF===cX){eG=this.$$store.init[name];}
else {eG=this.$$store.user[name];}
;return eG;}
,__iD:function(eJ,eH,name,eK,eI){if(qx.core.Environment.get(de)){eJ.push(dB);if(eK===cX){eJ.push(bL,name,bt,eK,bG);}
;if(eK===dz){}
else if(eI){eJ.push(cW,name,bt,eK,bG);eJ.push(W,name,bt,eK,bG);}
else {eJ.push(dH,name,bt,eK,bG);}
;}
else {if(!eH.nullable||eH.check||eH.inheritable){eJ.push(dB);}
;if(eK===f){eJ.push(W,name,bt,eK,bG);}
;}
;}
,__iE:function(eL,eN,eM,name){if(eM.transform){eL.push(br,eM.transform,bN);}
;if(eM.validate){if(typeof eM.validate===bl){eL.push(bE,eM.validate,bN);}
else if(eM.validate instanceof Function){eL.push(eN.classname,cp,name);eL.push(z);}
;}
;}
,__iF:function(eP,eO,eR,eQ){var eS=(eQ===bk||eQ===j||eQ===bd);if(eO){eP.push(S,eR,m);}
else if(eS){eP.push(S,eR,bh);}
;}
,__iG:qx.core.Environment.select(de,{"true":function(eU,eT,eW,name,eV){if(!eT.nullable){eU.push(bP,name,bt,eV,bG);}
;if(eT.check!==undefined){eU.push(c+name+cU+eW.classname+ck);if(eT.nullable){eU.push(cr);}
;if(eT.inheritable){eU.push(dh);}
;eU.push(J);if(this.__is[eT.check]!==undefined){eU.push(da,this.__is[eT.check],dG);}
else if(qx.Class.isDefined(eT.check)){eU.push(bM,eT.check,cN);}
else if(qx.Interface&&qx.Interface.isDefined(eT.check)){eU.push(cQ,eT.check,cN);}
else if(typeof eT.check===g){eU.push(bS,eW.classname,cp,name);eU.push(w);}
else if(typeof eT.check===bl){eU.push(da,eT.check,dG);}
else if(eT.check instanceof Array){eU.push(bv,eW.classname,cp,name,ch);}
else {throw new Error(bj+name+bf+eW.classname);}
;eU.push(q,name,bt,eV,bG);}
;}
,"false":undefined}),__iH:function(eY,name,fa,eX){if(fa===ce){eY.push(bE,this.$$store.runtime[name],cv);}
else if(fa===bd){eY.push(S,this.$$store.runtime[name],bQ);eY.push(bc,this.$$store.runtime[name],h);}
else if(fa===f){eY.push(bE,this.$$store.user[name],cv);}
else if(fa===bk){eY.push(S,this.$$store.user[name],bQ);eY.push(bc,this.$$store.user[name],h);}
else if(fa===bK){eY.push(bE,this.$$store.theme[name],cv);}
else if(fa===j){eY.push(S,this.$$store.theme[name],bQ);eY.push(bc,this.$$store.theme[name],h);}
else if(fa===cX&&eX){eY.push(bE,this.$$store.init[name],cv);}
;}
,__iI:function(fd,fb,name,fe,fc){if(fb.inheritable){fd.push(Y,this.$$store.inherit[name],h);}
else {fd.push(cJ);}
;fd.push(S,this.$$store.runtime[name],cx);if(fe===ce){fd.push(dl,this.$$store.runtime[name],cv);}
else if(fe===bd){fd.push(bc,this.$$store.runtime[name],h);fd.push(S,this.$$store.user[name],bQ);fd.push(dl,this.$$store.user[name],h);fd.push(U,this.$$store.theme[name],bQ);fd.push(dl,this.$$store.theme[name],h);fd.push(U,this.$$store.init[name],cx);fd.push(dl,this.$$store.init[name],h);fd.push(bE,this.$$store.useinit[name],L);fd.push(cM);}
else {fd.push(P,this.$$store.runtime[name],h);if(fe===f){fd.push(bE,this.$$store.user[name],cv);}
else if(fe===bk){fd.push(bc,this.$$store.user[name],h);}
else if(fe===bK){fd.push(bE,this.$$store.theme[name],cv);}
else if(fe===j){fd.push(bc,this.$$store.theme[name],h);}
else if(fe===cX&&fc){fd.push(bE,this.$$store.init[name],cv);}
;}
;fd.push(cM);fd.push(U,this.$$store.user[name],cx);if(fe===f){if(!fb.inheritable){fd.push(cI,this.$$store.user[name],h);}
;fd.push(dl,this.$$store.user[name],cv);}
else if(fe===bk){if(!fb.inheritable){fd.push(cI,this.$$store.user[name],h);}
;fd.push(bc,this.$$store.user[name],h);fd.push(S,this.$$store.runtime[name],bQ);fd.push(dl,this.$$store.runtime[name],h);fd.push(S,this.$$store.theme[name],bQ);fd.push(dl,this.$$store.theme[name],h);fd.push(U,this.$$store.init[name],cx);fd.push(dl,this.$$store.init[name],h);fd.push(bE,this.$$store.useinit[name],L);fd.push(cM);}
else {if(fe===ce){fd.push(dl,this.$$store.runtime[name],cv);}
else if(fb.inheritable){fd.push(dl,this.$$store.user[name],h);}
else {fd.push(P,this.$$store.user[name],h);}
;if(fe===bK){fd.push(bE,this.$$store.theme[name],cv);}
else if(fe===j){fd.push(bc,this.$$store.theme[name],h);}
else if(fe===cX&&fc){fd.push(bE,this.$$store.init[name],cv);}
;}
;fd.push(cM);if(fb.themeable){fd.push(U,this.$$store.theme[name],cx);if(!fb.inheritable){fd.push(cI,this.$$store.theme[name],h);}
;if(fe===ce){fd.push(dl,this.$$store.runtime[name],cv);}
else if(fe===f){fd.push(dl,this.$$store.user[name],cv);}
else if(fe===bK){fd.push(dl,this.$$store.theme[name],cv);}
else if(fe===j){fd.push(bc,this.$$store.theme[name],h);fd.push(S,this.$$store.init[name],cx);fd.push(dl,this.$$store.init[name],h);fd.push(bE,this.$$store.useinit[name],L);fd.push(cM);}
else if(fe===cX){if(fc){fd.push(bE,this.$$store.init[name],cv);}
;fd.push(dl,this.$$store.theme[name],h);}
else if(fe===dz){fd.push(dl,this.$$store.theme[name],h);}
;fd.push(cM);}
;fd.push(U,this.$$store.useinit[name],bR);if(!fb.inheritable){fd.push(cI,this.$$store.init[name],h);}
;if(fe===cX){if(fc){fd.push(dl,this.$$store.init[name],cv);}
else {fd.push(dl,this.$$store.init[name],h);}
;}
else if(fe===f||fe===ce||fe===bK||fe===dz){fd.push(bc,this.$$store.useinit[name],h);if(fe===ce){fd.push(dl,this.$$store.runtime[name],cv);}
else if(fe===f){fd.push(dl,this.$$store.user[name],cv);}
else if(fe===bK){fd.push(dl,this.$$store.theme[name],cv);}
else if(fe===dz){fd.push(dl,this.$$store.init[name],h);}
;}
;fd.push(cM);if(fe===f||fe===ce||fe===bK||fe===cX){fd.push(B);if(fe===ce){fd.push(dl,this.$$store.runtime[name],cv);}
else if(fe===f){fd.push(dl,this.$$store.user[name],cv);}
else if(fe===bK){fd.push(dl,this.$$store.theme[name],cv);}
else if(fe===cX){if(fc){fd.push(dl,this.$$store.init[name],cv);}
else {fd.push(dl,this.$$store.init[name],h);}
;fd.push(bE,this.$$store.useinit[name],L);}
;fd.push(cM);}
;}
,__iJ:function(fg,ff,name,fh){fg.push(bU);if(fh===dz){fg.push(bH);}
else {fg.push(cE,this.$$store.inherit[name],h);}
;fg.push(x);fg.push(bE,this.$$store.init[name],cC);fg.push(bE,this.$$store.init[name],b);fg.push(dl,this.$$store.init[name],h);fg.push(bE,this.$$store.useinit[name],L);fg.push(bI);fg.push(bc,this.$$store.useinit[name],cn);fg.push(cM);fg.push(cA);fg.push(O);fg.push(bC,this.$$store.inherit[name],h);fg.push(cM);fg.push(ba);fg.push(bc,this.$$store.inherit[name],h);fg.push(dC,this.$$store.inherit[name],G);fg.push(cK);if(ff.init!==undefined&&fh!==cX){fg.push(N,this.$$store.init[name],bV);}
else {fg.push(dD);}
;fg.push(dJ);}
,__iK:function(fj,fi,name,fk){if(fk!==f&&fk!==ce&&fk!==bK){fj.push(cT);}
;fj.push(cA);if(fi.init!==undefined&&fk!==cX){fj.push(N,this.$$store.init[name],bV);}
else {fj.push(dD);}
;}
,__iL:function(fm,fl,name,fn){if(fl.apply){fm.push(bE,fl.apply,cd,name,X,fn,cz);}
;if(fl.event){fm.push(ct,ci,fl.event,bm,df,fl.event,bz,cb);}
;}
,__iM:function(fo,name){fo.push(u);fo.push(dv,this.$$method.refresh[name],cl,this.$$method.refresh[name],I);fo.push(cM);}
}});}
)();
(function(){var b=': ',c="The mixin to include into class '",d="constructor",e="' is abstract! It is not possible to instantiate it.",f="environment",g='"! The value is undefined: ',h="Property module disabled.",j='Invalid check definition of property "',k="singleton",m="qx.event.type.Data",n='Forbidden environment setting "',o='". It is forbidden to define a default setting for an external namespace!',p=": the event value needs to be a string with the class name of the event object which will be fired.",q='Invalid include definition in class "',r=" could not refine property: ",s='Invalid config in class "',t="toString",u="! Key: ",v="events",w='Invalid type of key "',x='Invalid transform definition of property "',y='" in class "',z="Interface",A="Please initialize '",B='Assumed static class because no "extend" key was found. ',C="'.",D="' objects using the new keyword!",E=": the event value/type cannot be changed from ",F="destructor",G="destruct",H='"! The value is undefined/null!',I='" of Class "',J='" contains an invalid mixin at position ',K="Could not refine an init value if there was previously no init value defined. Property '",L='" of property "',M='Interface "',N="extend",O="module.property",P='Error in include definition of class "',Q="string",R='Overwriting member "',S="module.events",T='" definition for class "',U="members",V='". It is forbidden to define a ',W="' is a singleton! It is not possible to instantiate it directly. Use the static getInstance() method instead.",X=" already has a property: ",Y="Events module not enabled.",cz="The mixin to patch class '",cA="' of class: '",cB='"!',cv='"extend" parameter is null or undefined',cw='.',cx="' is undefined/null!",cy=" could not be refined!",cG="Could not refine non-existent property: '",cH=".prototype",cN="function",cI='The configuration key "',cC='" is not allowed!',cD=": the events must be defined as map!",cE="static",cF='undefined',cM='"! The type of the key must be "',dq='extend',dQ="refine",cO="!",cJ="properties",cK="'!",dM='"! ',cL="_",cP="The class '",cQ="Class",cR='"! The value needs to be a map!',cW='Forbidden variant "',cX='"! Needs to be a String.',cY='"! Only interfaces and arrays of interfaces are allowed!',cS='The include definition in class "',cT='Overwriting generated property method "',cU='" found in "',cV=".",dd='". It is forbidden to define a variant for an external namespace!',de="object",df="$$init_",dg='"! Only mixins and arrays of mixins are allowed!',da='!',db='"! Needs to be a String, Array or Function.',dN='"! Every non-static class has to extend at least the "qx.core.Object" class.',dc="init",dk='" without a "refine" flag in the property definition! This class: ',dl="qx.aspects",dP="Incomplete parameters!",dm='" contains an invalid interface at position ',dh="Class ",di="Array",dO="variants",dj='The implement definition in class "',dn='" is already used by Class "',dp='Overwriting private member "',dB='Invalid type "',dA="/",dz="statics",dF='Invalid key "',dE=" to ",dD="' of class '",dC="",du="]",dt="member",ds=', original class: ',dr="qx.Class",dy='Could not refine property "',dx="Mixin",dw="settings",dv="[Class ",dJ="abstract",dI='environment setting for an external namespace!',dH="The class ',",dG='Invalid implement definition in class "',dL="qx.debug",dK='Forbidden setting "';qx.Bootstrap.define(dr,{statics:{__iT:qx.core.Environment.get(O)?qx.core.Property:null,define:function(name,dU){if(!dU){dU={};}
;if(dU.include&&!(qx.Bootstrap.getClass(dU.include)===di)){dU.include=[dU.include];}
;if(dU.implement&&!(qx.Bootstrap.getClass(dU.implement)===di)){dU.implement=[dU.implement];}
;var dR=false;if(!dU.hasOwnProperty(N)&&!dU.type){dU.type=cE;dR=true;}
;if(qx.core.Environment.get(dL)){try{this.__ik(name,dU);}
catch(dV){if(dR){dV.message=B+dV.message;}
;throw dV;}
;}
;var dS=this.__iW(name,dU.type,dU.extend,dU.statics,dU.construct,dU.destruct,dU.include);if(dU.extend){if(dU.properties){this.__iY(dS,dU.properties,true);}
;if(dU.members){this.__jb(dS,dU.members,true,true,false);}
;if(dU.events){this.__iX(dS,dU.events,true);}
;if(dU.include){for(var i=0,l=dU.include.length;i<l;i++ ){this.__jf(dS,dU.include[i],false);}
;}
;}
else if(dU.hasOwnProperty(dq)&&qx.core.Environment.get(dL)){throw new Error(cv);}
;if(dU.environment){for(var dT in dU.environment){qx.core.Environment.add(dT,dU.environment[dT]);}
;}
;if(dU.implement){for(var i=0,l=dU.implement.length;i<l;i++ ){this.__jd(dS,dU.implement[i]);}
;}
;if(qx.core.Environment.get(dL)){this.__iV(dS);}
;if(dU.defer){dU.defer.self=dS;qx.Bootstrap.addPendingDefer(dS,function(){dU.defer(dS,dS.prototype,{add:function(name,dW){var dX={};dX[name]=dW;qx.Class.__iY(dS,dX,true);}
});}
);}
;return dS;}
,undefine:function(name){delete this.$$registry[name];var eb=name.split(cV);var ea=[window];for(var i=0;i<eb.length;i++ ){ea.push(ea[i][eb[i]]);}
;for(var i=ea.length-1;i>=1;i-- ){var dY=ea[i];var parent=ea[i-1];if(qx.Bootstrap.isFunction(dY)||qx.Bootstrap.objectGetLength(dY)===0){delete parent[eb[i-1]];}
else {break;}
;}
;}
,isDefined:qx.util.OOUtil.classIsDefined,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,getByName:qx.Bootstrap.getByName,include:function(ed,ec){if(qx.core.Environment.get(dL)){if(!ec){throw new Error(c+ed.classname+cx);}
;qx.Mixin.isCompatible(ec,ed);}
;qx.Class.__jf(ed,ec,false);}
,patch:function(ef,ee){if(qx.core.Environment.get(dL)){if(!ee){throw new Error(cz+ef.classname+cx);}
;qx.Mixin.isCompatible(ee,ef);}
;qx.Class.__jf(ef,ee,true);}
,isSubClassOf:function(eh,eg){if(!eh){return false;}
;if(eh==eg){return true;}
;if(eh.prototype instanceof eg){return true;}
;return false;}
,getPropertyDefinition:qx.util.OOUtil.getPropertyDefinition,getProperties:function(ej){var ei=[];while(ej){if(ej.$$properties){ei.push.apply(ei,Object.keys(ej.$$properties));}
;ej=ej.superclass;}
;return ei;}
,getByProperty:function(ek,name){while(ek){if(ek.$$properties&&ek.$$properties[name]){return ek;}
;ek=ek.superclass;}
;return null;}
,hasProperty:qx.util.OOUtil.hasProperty,getEventType:qx.util.OOUtil.getEventType,supportsEvent:qx.util.OOUtil.supportsEvent,hasOwnMixin:function(em,el){return em.$$includes&&em.$$includes.indexOf(el)!==-1;}
,getByMixin:function(ep,eo){var en,i,l;while(ep){if(ep.$$includes){en=ep.$$flatIncludes;for(i=0,l=en.length;i<l;i++ ){if(en[i]===eo){return ep;}
;}
;}
;ep=ep.superclass;}
;return null;}
,getMixins:qx.util.OOUtil.getMixins,hasMixin:function(er,eq){return !!this.getByMixin(er,eq);}
,hasOwnInterface:function(et,es){return et.$$implements&&et.$$implements.indexOf(es)!==-1;}
,getByInterface:qx.util.OOUtil.getByInterface,getInterfaces:function(ev){var eu=[];while(ev){if(ev.$$implements){eu.push.apply(eu,ev.$$flatImplements);}
;ev=ev.superclass;}
;return eu;}
,hasInterface:qx.util.OOUtil.hasInterface,implementsInterface:function(ey,ew){var ez=ey.constructor;if(this.hasInterface(ez,ew)){return true;}
;if(qx.Interface.objectImplements(ey,ew)){return true;}
;if(qx.Interface.classImplements(ez,ew)){return true;}
;return false;}
,getInstance:function(){if(!this.$$instance){this.$$allowconstruct=true;this.$$instance=new this();delete this.$$allowconstruct;}
;return this.$$instance;}
,genericToString:function(){return dv+this.classname+du;}
,$$registry:qx.Bootstrap.$$registry,__ij:qx.core.Environment.select(dL,{"true":{"type":Q,"extend":cN,"implement":de,"include":de,"construct":cN,"statics":de,"properties":de,"members":de,"environment":de,"events":de,"defer":cN,"destruct":cN},"default":null}),__iU:qx.core.Environment.select(dL,{"true":{"type":Q,"statics":de,"environment":de,"defer":cN},"default":null}),__ik:qx.core.Environment.select(dL,{"true":function(name,eD){if(eD.type&&!(eD.type===cE||eD.type===dJ||eD.type===k)){throw new Error(dB+eD.type+T+name+cB);}
;if(eD.type&&eD.type!==cE&&!eD.extend){throw new Error(s+name+dN);}
;var eC=eD.type===cE?this.__iU:this.__ij;for(var eB in eD){if(!eC[eB]){throw new Error(cI+eB+y+name+cC);}
;if(eD[eB]==null){throw new Error(dF+eB+y+name+H);}
;if(typeof eD[eB]!==eC[eB]){throw new Error(w+eB+y+name+cM+eC[eB]+cB);}
;}
;var eA=[dz,cJ,U,f,dw,dO,v];for(var i=0,l=eA.length;i<l;i++ ){var eB=eA[i];if(eD[eB]!==undefined&&(eD[eB].$$hash!==undefined||!qx.Bootstrap.isObject(eD[eB]))){throw new Error(dF+eB+y+name+cR);}
;}
;if(eD.include){if(qx.Bootstrap.getClass(eD.include)===di){for(var i=0,a=eD.include,l=a.length;i<l;i++ ){if(a[i]==null||a[i].$$type!==dx){throw new Error(cS+name+J+i+b+a[i]);}
;}
;}
else {throw new Error(q+name+dg);}
;}
;if(eD.implement){if(qx.Bootstrap.getClass(eD.implement)===di){for(var i=0,a=eD.implement,l=a.length;i<l;i++ ){if(a[i]==null||a[i].$$type!==z){throw new Error(dj+name+dm+i+b+a[i]);}
;}
;}
else {throw new Error(dG+name+cY);}
;}
;if(eD.include){try{qx.Mixin.checkCompatibility(eD.include);}
catch(eE){throw new Error(P+name+dM+eE.message);}
;}
;if(eD.environment){for(var eB in eD.environment){if(eB.substr(0,eB.indexOf(cV))!=name.substr(0,name.indexOf(cV))){throw new Error(n+eB+cU+name+V+dI);}
;}
;}
;if(eD.settings){for(var eB in eD.settings){if(eB.substr(0,eB.indexOf(cV))!=name.substr(0,name.indexOf(cV))){throw new Error(dK+eB+cU+name+o);}
;}
;}
;if(eD.variants){for(var eB in eD.variants){if(eB.substr(0,eB.indexOf(cV))!=name.substr(0,name.indexOf(cV))){throw new Error(cW+eB+cU+name+dd);}
;}
;}
;}
,"default":function(name,eF){}
}),__iV:qx.core.Environment.select(dL,{"true":function(eI){var eH=eI.superclass;while(eH){if(eH.$$classtype!==dJ){break;}
;var eG=eH.$$implements;if(eG){for(var i=0;i<eG.length;i++ ){qx.Interface.assert(eI,eG[i],true);}
;}
;eH=eH.superclass;}
;}
,"default":function(eJ){}
}),__iW:function(name,eU,eT,eK,eR,eO,eN){var eQ=function(){return (typeof this==cF);}
;var eP;if(!eT&&qx.core.Environment.get(dl)==false){eP=eK||{};qx.Bootstrap.setDisplayNames(eP,name);}
else {eP={};if(eT){if(!eR){eR=this.__jg();}
;if(this.__jh(eT,eN)){eP=this.__ji(eR,name,eU);}
else {eP=eR;}
;if(eU===k){eP.getInstance=this.getInstance;}
;qx.Bootstrap.setDisplayName(eR,name,d);}
;if(eK){qx.Bootstrap.setDisplayNames(eK,name);var eS;for(var i=0,a=Object.keys(eK),l=a.length;i<l;i++ ){eS=a[i];var eL=eK[eS];if(qx.core.Environment.get(dl)){if(eL instanceof Function){eL=qx.core.Aspect.wrap(name+cV+eS,eL,cE);}
;eP[eS]=eL;}
else {eP[eS]=eL;}
;}
;}
;}
;var eM=name?qx.Bootstrap.createNamespace(name,eP):dC;eP.classname=name;if(!eQ()){try{eP.name=name;}
catch(eV){}
;}
;eP.basename=eM;eP.$$type=cQ;if(eU){eP.$$classtype=eU;}
;if(!eP.hasOwnProperty(t)){eP.toString=this.genericToString;}
;if(eT){qx.Bootstrap.extendClass(eP,eR,eT,name,eM);if(eO){if(qx.core.Environment.get(dl)){eO=qx.core.Aspect.wrap(name,eO,F);}
;eP.$$destructor=eO;qx.Bootstrap.setDisplayName(eO,name,G);}
;}
;this.$$registry[name]=eP;return eP;}
,__iX:function(eW,eX,fa){if(qx.core.Environment.get(dL)){if(typeof eX!==de||qx.Bootstrap.getClass(eX)===di){throw new Error(eW.classname+cD);}
;for(var eY in eX){if(typeof eX[eY]!==Q){throw new Error(eW.classname+dA+eY+p);}
;}
;if(eW.$$events&&fa!==true){for(var eY in eX){if(eW.$$events[eY]!==undefined&&eW.$$events[eY]!==eX[eY]){throw new Error(eW.classname+dA+eY+E+eW.$$events[eY]+dE+eX[eY]);}
;}
;}
;}
;if(eW.$$events){for(var eY in eX){eW.$$events[eY]=eX[eY];}
;}
else {eW.$$events=eX;}
;}
,__iY:function(fc,ff,fd){if(!qx.core.Environment.get(O)){throw new Error(h);}
;var fe;if(fd===undefined){fd=false;}
;var fb=fc.prototype;for(var name in ff){fe=ff[name];if(qx.core.Environment.get(dL)){this.__ja(fc,name,fe,fd);}
;fe.name=name;if(!fe.refine){if(fc.$$properties===undefined){fc.$$properties={};}
;fc.$$properties[name]=fe;}
;if(fe.init!==undefined){fc.prototype[df+name]=fe.init;}
;if(fe.event!==undefined){if(!qx.core.Environment.get(S)){throw new Error(Y);}
;var event={};event[fe.event]=m;this.__iX(fc,event,fd);}
;if(fe.inheritable){this.__iT.$$inheritable[name]=true;if(!fb.$$refreshInheritables){this.__iT.attachRefreshInheritables(fc);}
;}
;if(!fe.refine){this.__iT.attachMethods(fc,name,fe);}
;}
;}
,__ja:qx.core.Environment.select(dL,{"true":function(fg,name,fm,fi){if(!qx.core.Environment.get(O)){throw new Error(h);}
;var fl=this.hasProperty(fg,name);if(fl){var fh=this.getPropertyDefinition(fg,name);if(fm.refine&&fh.init===undefined){throw new Error(K+name+dD+fg.classname+C);}
;}
;if(!fl&&fm.refine){throw new Error(cG+name+cA+fg.classname+cK);}
;if(fl&&!fi){throw new Error(dh+fg.classname+X+name+cO);}
;if(fl&&fi){if(!fm.refine){throw new Error(dy+name+dk+fg.classname+ds+this.getByProperty(fg,name).classname+cw);}
;for(var fj in fm){if(fj!==dc&&fj!==dQ){throw new Error(dh+fg.classname+r+name+u+fj+cy);}
;}
;}
;var fk=fm.group?this.__iT.$$allowedGroupKeys:this.__iT.$$allowedKeys;for(var fj in fm){if(fk[fj]===undefined){throw new Error(cI+fj+L+name+y+fg.classname+cC);}
;if(fm[fj]===undefined){throw new Error(dF+fj+L+name+y+fg.classname+g+fm[fj]);}
;if(fk[fj]!==null&&typeof fm[fj]!==fk[fj]){throw new Error(w+fj+L+name+y+fg.classname+cM+fk[fj]+cB);}
;}
;if(fm.transform!=null){if(!(typeof fm.transform===Q)){throw new Error(x+name+y+fg.classname+cX);}
;}
;if(fm.check!=null){if(!qx.Bootstrap.isString(fm.check)&&!qx.Bootstrap.isArray(fm.check)&&!qx.Bootstrap.isFunction(fm.check)){throw new Error(j+name+y+fg.classname+db);}
;}
;}
,"default":null}),__jb:function(fu,fn,fp,fr,ft){var fo=fu.prototype;var fs,fq;qx.Bootstrap.setDisplayNames(fn,fu.classname+cH);for(var i=0,a=Object.keys(fn),l=a.length;i<l;i++ ){fs=a[i];fq=fn[fs];if(qx.core.Environment.get(dL)){if(fo[fs]!==undefined&&fs.charAt(0)===cL&&fs.charAt(1)===cL){throw new Error(dp+fs+I+fu.classname+cC);}
;if(fp!==true&&fo.hasOwnProperty(fs)){throw new Error(R+fs+I+fu.classname+cC);}
;if(fo[fs]!=undefined&&fo[fs].$$propertyMethod){throw new Error(cT+fs+I+fu.classname+cC);}
;}
;if(fr!==false&&fq instanceof Function&&fq.$$type==null){if(ft==true){fq=this.__jc(fq,fo[fs]);}
else {if(fo[fs]){fq.base=fo[fs];}
;fq.self=fu;}
;if(qx.core.Environment.get(dl)){fq=qx.core.Aspect.wrap(fu.classname+cV+fs,fq,dt);}
;}
;fo[fs]=fq;}
;}
,__jc:function(fv,fw){if(fw){return function(){var fy=fv.base;fv.base=fw;var fx=fv.apply(this,arguments);fv.base=fy;return fx;}
;}
else {return fv;}
;}
,__jd:function(fB,fz){if(qx.core.Environment.get(dL)){if(!fB||!fz){throw new Error(dP);}
;if(this.hasOwnInterface(fB,fz)){throw new Error(M+fz.name+dn+fB.classname+da);}
;if(fB.$$classtype!==dJ){qx.Interface.assert(fB,fz,true);}
;}
;var fA=qx.Interface.flatten([fz]);if(fB.$$implements){fB.$$implements.push(fz);fB.$$flatImplements.push.apply(fB.$$flatImplements,fA);}
else {fB.$$implements=[fz];fB.$$flatImplements=fA;}
;}
,__je:function(fD){var name=fD.classname;var fC=this.__ji(fD,name,fD.$$classtype);for(var i=0,a=Object.keys(fD),l=a.length;i<l;i++ ){fE=a[i];fC[fE]=fD[fE];}
;fC.prototype=fD.prototype;var fG=fD.prototype;for(var i=0,a=Object.keys(fG),l=a.length;i<l;i++ ){fE=a[i];var fH=fG[fE];if(fH&&fH.self==fD){fH.self=fC;}
;}
;for(var fE in this.$$registry){var fF=this.$$registry[fE];if(!fF){continue;}
;if(fF.base==fD){fF.base=fC;}
;if(fF.superclass==fD){fF.superclass=fC;}
;if(fF.$$original){if(fF.$$original.base==fD){fF.$$original.base=fC;}
;if(fF.$$original.superclass==fD){fF.$$original.superclass=fC;}
;}
;}
;qx.Bootstrap.createNamespace(name,fC);this.$$registry[name]=fC;return fC;}
,__jf:function(fN,fL,fK){if(qx.core.Environment.get(dL)){if(!fN||!fL){throw new Error(dP);}
;}
;if(this.hasMixin(fN,fL)){return;}
;var fI=fN.$$original;if(fL.$$constructor&&!fI){fN=this.__je(fN);}
;var fJ=qx.Mixin.flatten([fL]);var fM;for(var i=0,l=fJ.length;i<l;i++ ){fM=fJ[i];if(fM.$$events){this.__iX(fN,fM.$$events,fK);}
;if(fM.$$properties){this.__iY(fN,fM.$$properties,fK);}
;if(fM.$$members){this.__jb(fN,fM.$$members,fK,fK,fK);}
;}
;if(fN.$$includes){fN.$$includes.push(fL);fN.$$flatIncludes.push.apply(fN.$$flatIncludes,fJ);}
else {fN.$$includes=[fL];fN.$$flatIncludes=fJ;}
;}
,__jg:function(){function fO(){fO.base.apply(this,arguments);}
;return fO;}
,__jh:function(fQ,fP){if(qx.core.Environment.get(dL)){return true;}
;if(fQ&&fQ.$$includes){var fR=fQ.$$flatIncludes;for(var i=0,l=fR.length;i<l;i++ ){if(fR[i].$$constructor){return true;}
;}
;}
;if(fP){var fS=qx.Mixin.flatten(fP);for(var i=0,l=fS.length;i<l;i++ ){if(fS[i].$$constructor){return true;}
;}
;}
;return false;}
,__ji:function(fU,name,fT){var fW=function(){var ga=fW;if(qx.core.Environment.get(dL)){if(!(this instanceof ga)){throw new Error(A+name+D);}
;if(fT===dJ){if(this.classname===name){throw new Error(dH+name+e);}
;}
else if(fT===k){if(!ga.$$allowconstruct){throw new Error(cP+name+W);}
;}
;}
;var fX=ga.$$original.apply(this,arguments);if(ga.$$includes){var fY=ga.$$flatIncludes;for(var i=0,l=fY.length;i<l;i++ ){if(fY[i].$$constructor){fY[i].$$constructor.apply(this,arguments);}
;}
;}
;if(qx.core.Environment.get(dL)){if(this.classname===name){this.$$initialized=true;}
;}
;return fX;}
;if(qx.core.Environment.get(dl)){var fV=qx.core.Aspect.wrap(name,fW,d);fW.$$original=fU;fW.constructor=fV;fW=fV;}
;fW.$$original=fU;fU.wrapper=fW;return fW;}
},defer:function(){if(qx.core.Environment.get(dl)){for(var gb in qx.Bootstrap.$$registry){var gc=qx.Bootstrap.$$registry[gb];for(var gd in gc){if(gc[gd] instanceof Function){gc[gd]=qx.core.Aspect.wrap(gb+cV+gd,gc[gd],cE);}
;}
;}
;}
;}
});}
)();
(function(){var a="qx.data.MBinding";qx.Mixin.define(a,{construct:function(){this.__jj=this.toHashCode();}
,members:{__jj:null,bind:function(b,e,c,d){return qx.data.SingleValueBinding.bind(this,b,e,c,d);}
,removeBinding:function(f){qx.data.SingleValueBinding.removeBindingFromObject(this,f);}
,removeRelatedBindings:function(g){qx.data.SingleValueBinding.removeRelatedBindings(this,g);}
,removeAllBindings:function(){qx.data.SingleValueBinding.removeAllBindingsForObject(this);}
,getBindings:function(){return qx.data.SingleValueBinding.getAllBindingsForObject(this);}
},destruct:function(){this.$$hash=this.__jj;this.removeAllBindings();delete this.$$hash;}
});}
)();
(function(){var a="qx.debug.databinding",b=". Error message: ",c="Boolean",d="Data after conversion: ",f="set",g="deepBinding",h=")",k=") to the object '",l="item",m="Can not remove the bindings for null object!",n="Please use only one array at a time: ",p="Binding executed from ",q="Integer",r="reset",s=" of object ",t="qx.event.type.Data",u="qx.data.SingleValueBinding",v="No number or 'last' value hast been given",w="Binding property ",x="Failed so set value ",y=").",z="change",A="qx.debug",B="targetObject",C="targetPropertyChain",D="get",E="^",F="Binding could not be found!",G="sourceObject",H="String",I=" to ",J="Binding from '",K="",L="sourcePropertyChain",M="PositiveNumber",N="Data before conversion: ",O="]",P="[",Q=".",R="PositiveInteger",S="' (",T=" on ",U="Binding does not exist!",V=" does not work.",W=" in an array binding: ",X=" is not an data (qx.event.type.Data) event on ",Y=".[",bj=" (",bk=" by ",bl="Date",bg="Number",bh=" not possible: No event available. ",bi="last";qx.Class.define(u,{statics:{__jk:{},__jl:{},bind:function(by,bs,bD,bA,bG){if(qx.core.Environment.get(A)){qx.core.Assert.assertObject(by,G);qx.core.Assert.assertString(bs,L);qx.core.Assert.assertObject(bD,B);qx.core.Assert.assertString(bA,C);}
;var bC=this.__jn(by,bs,bD,bA,bG);var bo=bs.split(Q);var bn=this.__jv(bo);var bq=[];var bE=[];var bp=[];var br=[];var bw=by;try{for(var i=0;i<bo.length;i++ ){if(bn[i]!==K){br.push(z);}
else {var bv=this.__jo(bw,bo[i]);if(!bv){if(i==0){throw new qx.core.AssertionError(w+bo[i]+s+bw+bh);}
;this.__ju(undefined,bD,bA,bG,by);break;}
;br.push(bv);}
;bq[i]=bw;if(i==bo.length-1){if(bn[i]!==K){var bx=bn[i]===bi?bw.length-1:bn[i];var bm=bw.getItem(bx);this.__ju(bm,bD,bA,bG,by);bp[i]=this.__jw(bw,br[i],bD,bA,bG,bn[i]);}
else {if(bo[i]!=null&&bw[D+qx.lang.String.firstUp(bo[i])]!=null){var bm=bw[D+qx.lang.String.firstUp(bo[i])]();this.__ju(bm,bD,bA,bG,by);}
;bp[i]=this.__jw(bw,br[i],bD,bA,bG);}
;}
else {var bF={index:i,propertyNames:bo,sources:bq,listenerIds:bp,arrayIndexValues:bn,targetObject:bD,targetPropertyChain:bA,options:bG,listeners:bE};var bB=qx.lang.Function.bind(this.__jm,this,bF);bE.push(bB);bp[i]=bw.addListener(br[i],bB);}
;if(bw[D+qx.lang.String.firstUp(bo[i])]==null){bw=undefined;}
else if(bn[i]!==K){var bx=bn[i]===bi?bw.length-1:bn[i];bw=bw[D+qx.lang.String.firstUp(bo[i])](bx);}
else {bw=bw[D+qx.lang.String.firstUp(bo[i])]();if(bw===null&&(bo.length-1)!=i){bw=undefined;}
;}
;if(!bw){this.__ju(bw,bD,bA,bG,by);break;}
;}
;}
catch(bH){for(var i=0;i<bq.length;i++ ){if(bq[i]&&bp[i]){bq[i].removeListenerById(bp[i]);}
;}
;var bt=bC.targets;var bz=bC.listenerIds;for(var i=0;i<bt.length;i++ ){if(bt[i]&&bz[i]){bt[i].removeListenerById(bz[i]);}
;}
;throw bH;}
;var bu={type:g,listenerIds:bp,sources:bq,targetListenerIds:bC.listenerIds,targets:bC.targets};this.__jx(bu,by,bs,bD,bA);return bu;}
,__jm:function(bO){if(bO.options&&bO.options.onUpdate){bO.options.onUpdate(bO.sources[bO.index],bO.targetObject);}
;for(var j=bO.index+1;j<bO.propertyNames.length;j++ ){var bM=bO.sources[j];bO.sources[j]=null;if(!bM){continue;}
;bM.removeListenerById(bO.listenerIds[j]);}
;var bM=bO.sources[bO.index];for(var j=bO.index+1;j<bO.propertyNames.length;j++ ){if(bO.arrayIndexValues[j-1]!==K){bM=bM[D+qx.lang.String.firstUp(bO.propertyNames[j-1])](bO.arrayIndexValues[j-1]);}
else {bM=bM[D+qx.lang.String.firstUp(bO.propertyNames[j-1])]();}
;bO.sources[j]=bM;if(!bM){if(bO.options&&bO.options.converter){var bI=false;if(bO.options.ignoreConverter){var bP=bO.propertyNames.slice(0,j).join(Q);var bN=bP.match(new RegExp(E+bO.options.ignoreConverter));bI=bN?bN.length>0:false;}
;if(!bI){this.__jq(bO.targetObject,bO.targetPropertyChain,bO.options.converter());}
else {this.__jp(bO.targetObject,bO.targetPropertyChain);}
;}
else {this.__jp(bO.targetObject,bO.targetPropertyChain);}
;break;}
;if(j==bO.propertyNames.length-1){if(qx.Class.implementsInterface(bM,qx.data.IListData)){var bQ=bO.arrayIndexValues[j]===bi?bM.length-1:bO.arrayIndexValues[j];var bJ=bM.getItem(bQ);this.__ju(bJ,bO.targetObject,bO.targetPropertyChain,bO.options,bO.sources[bO.index]);bO.listenerIds[j]=this.__jw(bM,z,bO.targetObject,bO.targetPropertyChain,bO.options,bO.arrayIndexValues[j]);}
else {if(bO.propertyNames[j]!=null&&bM[D+qx.lang.String.firstUp(bO.propertyNames[j])]!=null){var bJ=bM[D+qx.lang.String.firstUp(bO.propertyNames[j])]();this.__ju(bJ,bO.targetObject,bO.targetPropertyChain,bO.options,bO.sources[bO.index]);}
;var bK=this.__jo(bM,bO.propertyNames[j]);if(!bK){this.__jp(bO.targetObject,bO.targetPropertyChain);break;}
;bO.listenerIds[j]=this.__jw(bM,bK,bO.targetObject,bO.targetPropertyChain,bO.options);}
;}
else {if(bO.listeners[j]==null){var bL=qx.lang.Function.bind(this.__jm,this,bO);bO.listeners.push(bL);}
;if(qx.Class.implementsInterface(bM,qx.data.IListData)){var bK=z;}
else {var bK=this.__jo(bM,bO.propertyNames[j]);}
;if(!bK){this.__jp(bO.targetObject,bO.targetPropertyChain);return;}
;bO.listenerIds[j]=bM.addListener(bK,bO.listeners[j]);}
;}
;}
,__jn:function(bT,cc,cg,bX,ca){var bW=bX.split(Q);var bU=this.__jv(bW);var cf=[];var ce=[];var bY=[];var cd=[];var bV=cg;for(var i=0;i<bW.length-1;i++ ){if(bU[i]!==K){cd.push(z);}
else {var bS=this.__jo(bV,bW[i]);if(!bS){break;}
;cd.push(bS);}
;cf[i]=bV;var cb=function(){for(var j=i+1;j<bW.length-1;j++ ){var cj=cf[j];cf[j]=null;if(!cj){continue;}
;cj.removeListenerById(bY[j]);}
;var cj=cf[i];for(var j=i+1;j<bW.length-1;j++ ){var ch=qx.lang.String.firstUp(bW[j-1]);if(bU[j-1]!==K){var ck=bU[j-1]===bi?cj.getLength()-1:bU[j-1];cj=cj[D+ch](ck);}
else {cj=cj[D+ch]();}
;cf[j]=cj;if(ce[j]==null){ce.push(cb);}
;if(qx.Class.implementsInterface(cj,qx.data.IListData)){var ci=z;}
else {var ci=qx.data.SingleValueBinding.__jo(cj,bW[j]);if(!ci){break;}
;}
;bY[j]=cj.addListener(ci,ce[j]);}
;qx.data.SingleValueBinding.updateTarget(bT,cc,cg,bX,ca);}
;ce.push(cb);bY[i]=bV.addListener(cd[i],cb);var bR=qx.lang.String.firstUp(bW[i]);if(bV[D+bR]==null){bV=null;}
else if(bU[i]!==K){bV=bV[D+bR](bU[i]);}
else {bV=bV[D+bR]();}
;if(!bV){break;}
;}
;return {listenerIds:bY,targets:cf};}
,updateTarget:function(cl,co,cq,cm,cp){var cn=this.resolvePropertyChain(cl,co);cn=qx.data.SingleValueBinding.__jy(cn,cq,cm,cp,cl);this.__jq(cq,cm,cn);}
,resolvePropertyChain:function(o,cr){var cs=this.__js(cr);return this.__jt(o,cs,cs.length);}
,__jo:function(cu,cv){var ct=this.__jz(cu,cv);if(ct==null){if(qx.Class.supportsEvent(cu.constructor,cv)){ct=cv;}
else if(qx.Class.supportsEvent(cu.constructor,z+qx.lang.String.firstUp(cv))){ct=z+qx.lang.String.firstUp(cv);}
else {return null;}
;}
;return ct;}
,__jp:function(cA,cy){var cz=this.__js(cy);var cx=this.__jt(cA,cz);if(cx!=null){var cB=cz[cz.length-1];var cw=this.__jr(cB);if(cw){this.__jq(cA,cy,null);return;}
;if(cx[r+qx.lang.String.firstUp(cB)]!=undefined){cx[r+qx.lang.String.firstUp(cB)]();}
else {cx[f+qx.lang.String.firstUp(cB)](null);}
;}
;}
,__jq:function(cH,cE,cF){var cG=this.__js(cE);var cD=this.__jt(cH,cG);if(cD){var cI=cG[cG.length-1];var cC=this.__jr(cI);if(cC){if(cC===bi){cC=cD.length-1;}
;cD.setItem(cC,cF);}
else {cD[f+qx.lang.String.firstUp(cI)](cF);}
;}
;}
,__jr:function(cL){var cJ=/^\[(\d+|last)\]$/;var cK=cL.match(cJ);if(cK){return cK[1];}
;return null;}
,__js:function(cM){return cM.replace(/\[/g,Y).split(Q).filter(function(cN){return cN!==K;}
);}
,__jt:function(cT,cO,cP){cP=cP||cO.length-1;var cR=cT;for(var i=0;cR!==null&&i<cP;i++ ){try{var cS=cO[i];var cQ=this.__jr(cS);if(cQ){if(cQ===bi){cQ=cR.length-1;}
;cR=cR.getItem(cQ);}
else {cR=cR[D+qx.lang.String.firstUp(cS)]();}
;}
catch(cU){return null;}
;}
;return cR;}
,__ju:function(da,cV,cX,cY,cW){da=this.__jy(da,cV,cX,cY,cW);if(da===undefined){this.__jp(cV,cX);}
;if(da!==undefined){try{this.__jq(cV,cX,da);if(cY&&cY.onUpdate){cY.onUpdate(cW,cV,da);}
;}
catch(e){if(!(e instanceof qx.core.ValidationError)){throw e;}
;if(cY&&cY.onSetFail){cY.onSetFail(e);}
else {qx.log.Logger.warn(x+da+T+cV+b+e);}
;}
;}
;}
,__jv:function(db){var dc=[];for(var i=0;i<db.length;i++ ){var name=db[i];if(qx.lang.String.endsWith(name,O)){var dd=name.substring(name.indexOf(P)+1,name.indexOf(O));if(name.indexOf(O)!=name.length-1){throw new Error(n+name+V);}
;if(dd!==bi){if(dd==K||isNaN(parseInt(dd,10))){throw new Error(v+W+name+V);}
;}
;if(name.indexOf(P)!=0){db[i]=name.substring(0,name.indexOf(P));dc[i]=K;dc[i+1]=dd;db.splice(i+1,0,l);i++ ;}
else {dc[i]=dd;db.splice(i,1,l);}
;}
else {dc[i]=K;}
;}
;return dc;}
,__jw:function(de,dh,dm,dk,di,dg){if(qx.core.Environment.get(A)){var df=qx.Class.getEventType(de.constructor,dh);qx.core.Assert.assertEquals(t,df,dh+X+de+Q);}
;var dj=function(dq,e){if(dq!==K){if(dq===bi){dq=de.length-1;}
;var dr=de.getItem(dq);if(dr===undefined){qx.data.SingleValueBinding.__jp(dm,dk);}
;var dp=e.getData().start;var dn=e.getData().end;if(dq<dp||dq>dn){return;}
;}
else {var dr=e.getData();}
;if(qx.core.Environment.get(a)){qx.log.Logger.debug(p+de+bk+dh+I+dm+bj+dk+h);qx.log.Logger.debug(N+dr);}
;dr=qx.data.SingleValueBinding.__jy(dr,dm,dk,di,de);if(qx.core.Environment.get(a)){qx.log.Logger.debug(d+dr);}
;try{if(dr!==undefined){qx.data.SingleValueBinding.__jq(dm,dk,dr);}
else {qx.data.SingleValueBinding.__jp(dm,dk);}
;if(di&&di.onUpdate){di.onUpdate(de,dm,dr);}
;}
catch(ds){if(!(ds instanceof qx.core.ValidationError)){throw ds;}
;if(di&&di.onSetFail){di.onSetFail(ds);}
else {qx.log.Logger.warn(x+dr+T+dm+b+ds);}
;}
;}
;if(!dg){dg=K;}
;dj=qx.lang.Function.bind(dj,de,dg);var dl=de.addListener(dh,dj);return dl;}
,__jx:function(dy,dt,dw,dz,dx){var du;du=dt.toHashCode();if(this.__jk[du]===undefined){this.__jk[du]=[];}
;var dv=[dy,dt,dw,dz,dx];this.__jk[du].push(dv);du=dz.toHashCode();if(this.__jl[du]===undefined){this.__jl[du]=[];}
;this.__jl[du].push(dv);}
,__jy:function(dD,dJ,dC,dF,dA){if(dF&&dF.converter){var dG;if(dJ.getModel){dG=dJ.getModel();}
;return dF.converter(dD,dG,dA,dJ);}
else {var dE=this.__js(dC);var dB=this.__jt(dJ,dE);var dK=dC.substring(dC.lastIndexOf(Q)+1,dC.length);if(dB==null){return dD;}
;var dH=qx.Class.getPropertyDefinition(dB.constructor,dK);var dI=dH==null?K:dH.check;return this.__jA(dD,dI);}
;}
,__jz:function(dL,dN){var dM=qx.Class.getPropertyDefinition(dL.constructor,dN);if(dM==null){return null;}
;return dM.event;}
,__jA:function(dQ,dP){var dO=qx.lang.Type.getClass(dQ);if((dO==bg||dO==H)&&(dP==q||dP==R)){dQ=parseInt(dQ,10);}
;if((dO==c||dO==bg||dO==bl)&&dP==H){dQ=dQ+K;}
;if((dO==bg||dO==H)&&(dP==bg||dP==M)){dQ=parseFloat(dQ);}
;return dQ;}
,removeBindingFromObject:function(dR,dV){if(dV.type==g){for(var i=0;i<dV.sources.length;i++ ){if(dV.sources[i]){dV.sources[i].removeListenerById(dV.listenerIds[i]);}
;}
;for(var i=0;i<dV.targets.length;i++ ){if(dV.targets[i]){dV.targets[i].removeListenerById(dV.targetListenerIds[i]);}
;}
;}
else {dR.removeListenerById(dV);}
;var dU=this.getAllBindingsForObject(dR);if(dU!=undefined){for(var i=0;i<dU.length;i++ ){if(dU[i][0]==dV){var dS=dU[i][3];if(this.__jl[dS.toHashCode()]){qx.lang.Array.remove(this.__jl[dS.toHashCode()],dU[i]);}
;var dT=dU[i][1];if(this.__jk[dT.toHashCode()]){qx.lang.Array.remove(this.__jk[dT.toHashCode()],dU[i]);}
;return;}
;}
;}
;throw new Error(F);}
,removeAllBindingsForObject:function(dX){if(qx.core.Environment.get(A)){qx.core.Assert.assertNotNull(dX,m);}
;var dW=this.getAllBindingsForObject(dX);if(dW!=undefined){for(var i=dW.length-1;i>=0;i-- ){this.removeBindingFromObject(dX,dW[i][0]);}
;}
;}
,removeRelatedBindings:function(ea,eb){if(qx.core.Environment.get(A)){qx.core.Assert.assertNotNull(ea,m);qx.core.Assert.assertNotNull(eb,m);}
;var ed=this.getAllBindingsForObject(ea);if(ed!=undefined){for(var i=ed.length-1;i>=0;i-- ){var ec=ed[i][1];var dY=ed[i][3];if(ec===eb||dY===eb){this.removeBindingFromObject(ea,ed[i][0]);}
;}
;}
;}
,getAllBindingsForObject:function(ef){var eg=ef.toHashCode();if(this.__jk[eg]===undefined){this.__jk[eg]=[];}
;var eh=this.__jk[eg];var ee=this.__jl[eg]?this.__jl[eg]:[];return qx.lang.Array.unique(eh.concat(ee));}
,removeAllBindings:function(){for(var ej in this.__jk){var ei=qx.core.ObjectRegistry.fromHashCode(ej);if(ei==null){delete this.__jk[ej];continue;}
;this.removeAllBindingsForObject(ei);}
;this.__jk={};}
,getAllBindings:function(){return this.__jk;}
,showBindingInLog:function(el,en){var em;for(var i=0;i<this.__jk[el.toHashCode()].length;i++ ){if(this.__jk[el.toHashCode()][i][0]==en){em=this.__jk[el.toHashCode()][i];break;}
;}
;if(em===undefined){var ek=U;}
else {var ek=J+em[1]+S+em[2]+k+em[3]+S+em[4]+y;}
;qx.log.Logger.debug(ek);}
,showAllBindingsInLog:function(){for(var ep in this.__jk){var eo=qx.core.ObjectRegistry.fromHashCode(ep);for(var i=0;i<this.__jk[ep].length;i++ ){this.showBindingInLog(eo,this.__jk[ep][i][0]);}
;}
;}
}});}
)();
(function(){var a="qx.lang.Type",b="Error",c="RegExp",d="Date",e="Number",f="Boolean";qx.Bootstrap.define(a,{statics:{getClass:qx.Bootstrap.getClass,isString:qx.Bootstrap.isString,isArray:qx.Bootstrap.isArray,isObject:qx.Bootstrap.isObject,isFunction:qx.Bootstrap.isFunction,isRegExp:function(g){return this.getClass(g)===c;}
,isNumber:function(h){return (h!==null&&(this.getClass(h)===e||h instanceof Number));}
,isBoolean:function(i){return (i!==null&&(this.getClass(i)===f||i instanceof Boolean));}
,isDate:function(j){return (j!==null&&(this.getClass(j)===d||j instanceof Date));}
,isError:function(k){return (k!==null&&(this.getClass(k)===b||k instanceof Error));}
}});}
)();
(function(){var a=" != ",b="qx.core.Object",c="Expected value to be an array but found ",d="' (rgb(",f=") was fired.",g="Expected value to be an integer >= 0 but found ",h="' to be not equal with '",j="' to '",k="Expected object '",m="Called assertTrue with '",n="Expected value to be a map but found ",o="The function did not raise an exception!",p="Expected value to be undefined but found ",q="Expected value to be a DOM element but found  '",r="Expected value to be a regular expression but found ",s="' to implement the interface '",t="Expected value to be null but found ",u="Invalid argument 'type'",v="Called assert with 'false'",w="Assertion error! ",x="'",y="null",z="' but found '",A="'undefined'",B=",",C="' must must be a key of the map '",D="Expected '",E="The String '",F="Expected value to be a string but found ",G="Event (",H="Expected value to be the CSS color '",I="!",J="Expected value not to be undefined but found undefined!",K="qx.util.ColorUtil",L=": ",M="The raised exception does not have the expected type! ",N=") not fired.",O="'!",P="qx.core.Assert",Q="",R="Expected value to be typeof object but found ",S="' but found ",T="' (identical) but found '",U="' must have any of the values defined in the array '",V="Expected value to be a number but found ",W="Called assertFalse with '",X="qx.ui.core.Widget",Y="]",bJ="Expected value to be a qooxdoo object but found ",bK="' arguments.",bL="Expected value '%1' to be in the range '%2'..'%3'!",bF="Array[",bG="' does not match the regular expression '",bH="' to be not identical with '",bI="Expected [",bP="' arguments but found '",bQ="', which cannot be converted to a CSS color!",bR=", ",cg="qx.core.AssertionError",bM="Expected value to be a boolean but found ",bN="Expected value not to be null but found null!",bO="))!",bD="Expected value to be a qooxdoo widget but found ",bU="The value '",bE="Expected value to be typeof '",bV="\n Stack trace: \n",bW="Expected value to be typeof function but found ",cb="Expected value to be an integer but found ",bS="Called fail().",cf="The parameter 're' must be a string or a regular expression.",bT=")), but found value '",bX="qx.util.ColorUtil not available! Your code must have a dependency on 'qx.util.ColorUtil'",bY="Expected value to be a number >= 0 but found ",ca="Expected value to be instanceof '",cc="], but found [",cd="Wrong number of arguments given. Expected '",ce="object";qx.Bootstrap.define(P,{statics:{__jB:true,__jC:function(ch,ci){var cm=Q;for(var i=1,l=arguments.length;i<l;i++ ){cm=cm+this.__jD(arguments[i]===undefined?A:arguments[i]);}
;var cl=Q;if(cm){cl=ch+L+cm;}
else {cl=ch;}
;var ck=w+cl;if(qx.Class&&qx.Class.isDefined(cg)){var cj=new qx.core.AssertionError(ch,cm);if(this.__jB){qx.Bootstrap.error(ck+bV+cj.getStackTrace());}
;throw cj;}
else {if(this.__jB){qx.Bootstrap.error(ck);}
;throw new Error(ck);}
;}
,__jD:function(co){var cn;if(co===null){cn=y;}
else if(qx.lang.Type.isArray(co)&&co.length>10){cn=bF+co.length+Y;}
else if((co instanceof Object)&&(co.toString==null)){cn=qx.lang.Json.stringify(co,null,2);}
else {try{cn=co.toString();}
catch(e){cn=Q;}
;}
;return cn;}
,assert:function(cq,cp){cq==true||this.__jC(cp||Q,v);}
,fail:function(cr,cs){var ct=cs?Q:bS;this.__jC(cr||Q,ct);}
,assertTrue:function(cv,cu){(cv===true)||this.__jC(cu||Q,m,cv,x);}
,assertFalse:function(cx,cw){(cx===false)||this.__jC(cw||Q,W,cx,x);}
,assertEquals:function(cy,cz,cA){cy==cz||this.__jC(cA||Q,D,cy,z,cz,O);}
,assertNotEquals:function(cB,cC,cD){cB!=cC||this.__jC(cD||Q,D,cB,h,cC,O);}
,assertIdentical:function(cE,cF,cG){cE===cF||this.__jC(cG||Q,D,cE,T,cF,O);}
,assertNotIdentical:function(cH,cI,cJ){cH!==cI||this.__jC(cJ||Q,D,cH,bH,cI,O);}
,assertNotUndefined:function(cL,cK){cL!==undefined||this.__jC(cK||Q,J);}
,assertUndefined:function(cN,cM){cN===undefined||this.__jC(cM||Q,p,cN,I);}
,assertNotNull:function(cP,cO){cP!==null||this.__jC(cO||Q,bN);}
,assertNull:function(cR,cQ){cR===null||this.__jC(cQ||Q,t,cR,I);}
,assertJsonEquals:function(cS,cT,cU){this.assertEquals(qx.lang.Json.stringify(cS),qx.lang.Json.stringify(cT),cU);}
,assertMatch:function(cX,cW,cV){this.assertString(cX);this.assert(qx.lang.Type.isRegExp(cW)||qx.lang.Type.isString(cW),cf);cX.search(cW)>=0||this.__jC(cV||Q,E,cX,bG,cW.toString(),O);}
,assertArgumentsCount:function(db,dc,dd,cY){var da=db.length;(da>=dc&&da<=dd)||this.__jC(cY||Q,cd,dc,j,dd,bP,da,bK);}
,assertEventFired:function(de,event,dh,di,dj){var df=false;var dg=function(e){if(di){di.call(de,e);}
;df=true;}
;var dk;try{dk=de.addListener(event,dg,de);dh.call(de);}
catch(dl){throw dl;}
finally{try{de.removeListenerById(dk);}
catch(dm){}
;}
;df===true||this.__jC(dj||Q,G,event,N);}
,assertEventNotFired:function(dn,event,dr,ds){var dp=false;var dq=function(e){dp=true;}
;var dt=dn.addListener(event,dq,dn);dr.call();dp===false||this.__jC(ds||Q,G,event,f);dn.removeListenerById(dt);}
,assertException:function(dx,dw,dv,du){var dw=dw||Error;var dy;try{this.__jB=false;dx();}
catch(dz){dy=dz;}
finally{this.__jB=true;}
;if(dy==null){this.__jC(du||Q,o);}
;dy instanceof dw||this.__jC(du||Q,M,dw,a,dy);if(dv){this.assertMatch(dy.toString(),dv,du);}
;}
,assertInArray:function(dC,dB,dA){dB.indexOf(dC)!==-1||this.__jC(dA||Q,bU,dC,U,dB,x);}
,assertArrayEquals:function(dD,dE,dF){this.assertArray(dD,dF);this.assertArray(dE,dF);dF=dF||bI+dD.join(bR)+cc+dE.join(bR)+Y;if(dD.length!==dE.length){this.fail(dF,true);}
;for(var i=0;i<dD.length;i++ ){if(dD[i]!==dE[i]){this.fail(dF,true);}
;}
;}
,assertKeyInMap:function(dI,dH,dG){dH[dI]!==undefined||this.__jC(dG||Q,bU,dI,C,dH,x);}
,assertFunction:function(dK,dJ){qx.lang.Type.isFunction(dK)||this.__jC(dJ||Q,bW,dK,I);}
,assertString:function(dM,dL){qx.lang.Type.isString(dM)||this.__jC(dL||Q,F,dM,I);}
,assertBoolean:function(dO,dN){qx.lang.Type.isBoolean(dO)||this.__jC(dN||Q,bM,dO,I);}
,assertNumber:function(dQ,dP){(qx.lang.Type.isNumber(dQ)&&isFinite(dQ))||this.__jC(dP||Q,V,dQ,I);}
,assertPositiveNumber:function(dS,dR){(qx.lang.Type.isNumber(dS)&&isFinite(dS)&&dS>=0)||this.__jC(dR||Q,bY,dS,I);}
,assertInteger:function(dU,dT){(qx.lang.Type.isNumber(dU)&&isFinite(dU)&&dU%1===0)||this.__jC(dT||Q,cb,dU,I);}
,assertPositiveInteger:function(dX,dV){var dW=(qx.lang.Type.isNumber(dX)&&isFinite(dX)&&dX%1===0&&dX>=0);dW||this.__jC(dV||Q,g,dX,I);}
,assertInRange:function(eb,ec,ea,dY){(eb>=ec&&eb<=ea)||this.__jC(dY||Q,qx.lang.String.format(bL,[eb,ec,ea]));}
,assertObject:function(ee,ed){var ef=ee!==null&&(qx.lang.Type.isObject(ee)||typeof ee===ce);ef||this.__jC(ed||Q,R,(ee),I);}
,assertArray:function(eh,eg){qx.lang.Type.isArray(eh)||this.__jC(eg||Q,c,eh,I);}
,assertMap:function(ej,ei){qx.lang.Type.isObject(ej)||this.__jC(ei||Q,n,ej,I);}
,assertRegExp:function(el,ek){qx.lang.Type.isRegExp(el)||this.__jC(ek||Q,r,el,I);}
,assertType:function(eo,en,em){this.assertString(en,u);typeof (eo)===en||this.__jC(em||Q,bE,en,S,eo,I);}
,assertInstance:function(er,es,ep){var eq=es.classname||es+Q;er instanceof es||this.__jC(ep||Q,ca,eq,S,er,I);}
,assertInterface:function(ev,eu,et){qx.Class&&qx.Class.implementsInterface(ev,eu)||this.__jC(et||Q,k,ev,s,eu,O);}
,assertCssColor:function(eC,ez,eB){var ew=qx.Class?qx.Class.getByName(K):null;if(!ew){throw new Error(bX);}
;var ey=ew.stringToRgb(eC);try{var eA=ew.stringToRgb(ez);}
catch(eE){this.__jC(eB||Q,H,eC,d,ey.join(B),bT,ez,bQ);}
;var eD=ey[0]==eA[0]&&ey[1]==eA[1]&&ey[2]==eA[2];eD||this.__jC(eB||Q,H,ey,d,ey.join(B),bT,ez,d,eA.join(B),bO);}
,assertElement:function(eG,eF){!!(eG&&eG.nodeType===1)||this.__jC(eF||Q,q,eG,O);}
,assertQxObject:function(eI,eH){this.__jE(eI,b)||this.__jC(eH||Q,bJ,eI,I);}
,assertQxWidget:function(eK,eJ){this.__jE(eK,X)||this.__jC(eJ||Q,bD,eK,I);}
,__jE:function(eM,eL){if(!eM){return false;}
;var eN=eM.constructor;while(eN){if(eN.classname===eL){return true;}
;eN=eN.superclass;}
;return false;}
}});}
)();
(function(){var a=": ",b="qx.type.BaseError",c="",d="error";qx.Bootstrap.define(b,{extend:Error,construct:function(e,f){var g=Error.call(this,f);if(g.stack){this.stack=g.stack;}
;if(g.stacktrace){this.stacktrace=g.stacktrace;}
;this.__jF=e||c;this.message=f||qx.type.BaseError.DEFAULTMESSAGE;}
,statics:{DEFAULTMESSAGE:d},members:{__jG:null,__jF:null,message:null,getComment:function(){return this.__jF;}
,toString:function(){return this.__jF+(this.message?a+this.message:c);}
}});}
)();
(function(){var a="qx.core.AssertionError";qx.Bootstrap.define(a,{extend:qx.type.BaseError,construct:function(b,c){qx.type.BaseError.call(this,b,c);this.__jH=qx.dev.StackTrace.getStackTrace();}
,members:{__jH:null,getStackTrace:function(){return this.__jH;}
}});}
)();
(function(){var a="?",b="anonymous",c="...",d="qx.dev.StackTrace",e="",f="\n",g="stacktrace",h="/source/class/",j="Error created at",k="FILENAME_TO_CLASSNAME must return a string!",l="qx.debug",m="ecmascript.error.stacktrace",n="Backtrace:",o="stack",p="FORMAT_STACKTRACE must return an array of strings!",q=":",r=".",s="function",t="prototype",u='undefined';qx.Bootstrap.define(d,{statics:{FILENAME_TO_CLASSNAME:null,FORMAT_STACKTRACE:null,getStackTrace:function(){var x=[];try{throw new Error();}
catch(K){if(qx.dev.StackTrace.hasEnvironmentCheck&&qx.core.Environment.get(m)){var C=qx.dev.StackTrace.getStackTraceFromError(K);var F=qx.dev.StackTrace.getStackTraceFromCaller(arguments);qx.lang.Array.removeAt(C,0);x=F.length>C.length?F:C;for(var i=0;i<Math.min(F.length,C.length);i++ ){var A=F[i];if(A.indexOf(b)>=0){continue;}
;var w=null;var G=A.split(r);var z=/(.*?)\(/.exec(G[G.length-1]);if(z&&z.length==2){w=z[1];G.pop();}
;if(G[G.length-1]==t){G.pop();}
;var I=G.join(r);var y=C[i];var J=y.split(q);var E=J[0];var D=J[1];var v;if(J[2]){v=J[2];}
;var B=null;if(qx.Class&&qx.Class.getByName(E)){B=E;}
else {B=I;}
;var H=B;if(w){H+=r+w;}
;H+=q+D;if(v){H+=q+v;}
;x[i]=H;}
;}
else {x=this.getStackTraceFromCaller(arguments);}
;}
;return x;}
,getStackTraceFromCaller:function(O){var P=function(){return (typeof this==u);}
;var N=[];var R=null;if(!P()){try{R=qx.lang.Function.getCaller(O);}
catch(S){}
;}
;var L={};while(R){var Q=qx.lang.Function.getName(R);N.push(Q);try{R=R.caller;}
catch(T){break;}
;if(!R){break;}
;var M=qx.core.ObjectRegistry.toHashCode(R);if(L[M]){N.push(c);break;}
;L[M]=R;}
;return N;}
,getStackTraceFromError:function(bj){var ba=[];var X,Y,bg,W,V,bl,bh;var bi=qx.dev.StackTrace.hasEnvironmentCheck?qx.core.Environment.get(m):null;if(bi===o){if(!bj.stack){return ba;}
;X=/@(.+):(\d+)$/gm;while((Y=X.exec(bj.stack))!=null){bh=Y[1];W=Y[2];bg=this.__jK(bh);ba.push(bg+q+W);}
;if(ba.length>0){return this.__jM(ba);}
;X=/at (.*)/gm;var bk=/\((.*?)(:[\d:]+)\)/;var bf=/(.*?)(:[\d:]+$)/;while((Y=X.exec(bj.stack))!=null){var be=bk.exec(Y[1]);if(!be){be=bf.exec(Y[1]);}
;if(be){bg=this.__jK(be[1]);ba.push(bg+be[2]);}
else {ba.push(Y[1]);}
;}
;}
else if(bi===g){var bb=bj.stacktrace;if(!bb){return ba;}
;if(bb.indexOf(j)>=0){bb=bb.split(j)[0];}
;X=/line\ (\d+?),\ column\ (\d+?)\ in\ (?:.*?)\ in\ (.*?):[^\/]/gm;while((Y=X.exec(bb))!=null){W=Y[1];V=Y[2];bh=Y[3];bg=this.__jK(bh);ba.push(bg+q+W+q+V);}
;if(ba.length>0){return this.__jM(ba);}
;X=/Line\ (\d+?)\ of\ linked\ script\ (.*?)$/gm;while((Y=X.exec(bb))!=null){W=Y[1];bh=Y[2];bg=this.__jK(bh);ba.push(bg+q+W);}
;}
else if(bj.message&&bj.message.indexOf(n)>=0){var bd=bj.message.split(n)[1].trim();var bc=bd.split(f);for(var i=0;i<bc.length;i++ ){var U=bc[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);if(U&&U.length>=2){W=U[1];bl=this.__jK(U[2]);ba.push(bl+q+W);}
;}
;}
else if(bj.sourceURL&&bj.line){ba.push(this.__jK(bj.sourceURL)+q+bj.line);}
;return this.__jM(ba);}
,__jK:function(bn){if(typeof qx.dev.StackTrace.FILENAME_TO_CLASSNAME==s){var bm=qx.dev.StackTrace.FILENAME_TO_CLASSNAME(bn);if(qx.core.Environment.get(l)&&!qx.lang.Type.isString(bm)){throw new Error(k);}
;return bm;}
;return qx.dev.StackTrace.__jL(bn);}
,__jL:function(bq){var br=h;var bo=bq.indexOf(br);var bs=bq.indexOf(a);if(bs>=0){bq=bq.substring(0,bs);}
;var bp=(bo==-1)?bq:bq.substring(bo+br.length).replace(/\//g,r).replace(/\.js$/,e);return bp;}
,__jM:function(bt){if(typeof qx.dev.StackTrace.FORMAT_STACKTRACE==s){bt=qx.dev.StackTrace.FORMAT_STACKTRACE(bt);if(qx.core.Environment.get(l)&&!qx.lang.Type.isArray(bt)){throw new Error(p);}
;}
;return bt;}
},defer:function(bu){bu.hasEnvironmentCheck=qx.bom&&qx.bom.client&&qx.bom.client.EcmaScript&&qx.bom.client.EcmaScript.getStackTrace;}
});}
)();
(function(){var a="The second parameter must be an array.",b="mshtml",c="engine.name",d="[object Array]",e="qx.lang.Array",f="qx.debug",g="The first parameter must be an array.",h="Parameter must be an array.",j="]",k="qx",m="number",n="][",o="string",p="Cannot clean-up map entry doneObjects[";qx.Bootstrap.define(e,{statics:{cast:function(q,s,t){if(q.constructor===s){return q;}
;if(qx.data&&qx.data.IListData){if(qx.Class&&qx.Class.hasInterface(q,qx.data.IListData)){var q=q.toArray();}
;}
;var r=new s;if((qx.core.Environment.get(c)==b)){if(q.item){for(var i=t||0,l=q.length;i<l;i++ ){r.push(q[i]);}
;return r;}
;}
;if(Object.prototype.toString.call(q)===d&&t==null){r.push.apply(r,q);}
else {r.push.apply(r,Array.prototype.slice.call(q,t||0));}
;return r;}
,fromArguments:function(u,v){return Array.prototype.slice.call(u,v||0);}
,fromCollection:function(x){if((qx.core.Environment.get(c)==b)){if(x.item){var w=[];for(var i=0,l=x.length;i<l;i++ ){w[i]=x[i];}
;return w;}
;}
;return Array.prototype.slice.call(x,0);}
,fromShortHand:function(y){var A=y.length;var z=qx.lang.Array.clone(y);switch(A){case 1:z[1]=z[2]=z[3]=z[0];break;case 2:z[2]=z[0];case 3:z[3]=z[1];};return z;}
,clone:function(B){return B.concat();}
,insertAt:function(C,D,i){C.splice(i,0,D);return C;}
,insertBefore:function(E,G,F){var i=E.indexOf(F);if(i==-1){E.push(G);}
else {E.splice(i,0,G);}
;return E;}
,insertAfter:function(H,J,I){var i=H.indexOf(I);if(i==-1||i==(H.length-1)){H.push(J);}
else {H.splice(i+1,0,J);}
;return H;}
,removeAt:function(K,i){return K.splice(i,1)[0];}
,removeAll:function(L){L.length=0;return this;}
,append:function(N,M){if(qx.core.Environment.get(f)){qx.core.Assert&&qx.core.Assert.assertArray(N,g);qx.core.Assert&&qx.core.Assert.assertArray(M,a);}
;Array.prototype.push.apply(N,M);return N;}
,exclude:function(Q,P){if(qx.core.Environment.get(f)){qx.core.Assert&&qx.core.Assert.assertArray(Q,g);qx.core.Assert&&qx.core.Assert.assertArray(P,a);}
;for(var i=0,R=P.length,O;i<R;i++ ){O=Q.indexOf(P[i]);if(O!=-1){Q.splice(O,1);}
;}
;return Q;}
,remove:function(S,T){var i=S.indexOf(T);if(i!=-1){S.splice(i,1);return T;}
;}
,contains:function(U,V){return U.indexOf(V)!==-1;}
,equals:function(X,W){var length=X.length;if(length!==W.length){return false;}
;for(var i=0;i<length;i++ ){if(X[i]!==W[i]){return false;}
;}
;return true;}
,sum:function(Y){var ba=0;for(var i=0,l=Y.length;i<l;i++ ){if(Y[i]!=undefined){ba+=Y[i];}
;}
;return ba;}
,max:function(bb){if(qx.core.Environment.get(f)){qx.core.Assert&&qx.core.Assert.assertArray(bb,h);}
;var i,bd=bb.length,bc=bb[0];for(i=1;i<bd;i++ ){if(bb[i]>bc){bc=bb[i];}
;}
;return bc===undefined?null:bc;}
,min:function(be){if(qx.core.Environment.get(f)){qx.core.Assert&&qx.core.Assert.assertArray(be,h);}
;var i,bg=be.length,bf=be[0];for(i=1;i<bg;i++ ){if(be[i]<bf){bf=be[i];}
;}
;return bf===undefined?null:bf;}
,unique:function(bj){var bt=[],bi={},bm={},bo={};var bn,bh=0;var br=k+Date.now();var bk=false,bp=false,bs=false;for(var i=0,bq=bj.length;i<bq;i++ ){bn=bj[i];if(bn===null){if(!bk){bk=true;bt.push(bn);}
;}
else if(bn===undefined){}
else if(bn===false){if(!bp){bp=true;bt.push(bn);}
;}
else if(bn===true){if(!bs){bs=true;bt.push(bn);}
;}
else if(typeof bn===o){if(!bi[bn]){bi[bn]=1;bt.push(bn);}
;}
else if(typeof bn===m){if(!bm[bn]){bm[bn]=1;bt.push(bn);}
;}
else {var bl=bn[br];if(bl==null){bl=bn[br]=bh++ ;}
;if(!bo[bl]){bo[bl]=bn;bt.push(bn);}
;}
;}
;for(var bl in bo){try{delete bo[bl][br];}
catch(bu){try{bo[bl][br]=null;}
catch(bv){throw new Error(p+bl+n+br+j);}
;}
;}
;return bt;}
,range:function(by,stop,bz){if(arguments.length<=1){stop=by||0;by=0;}
;bz=arguments[2]||1;var length=Math.max(Math.ceil((stop-by)/bz),0);var bw=0;var bx=Array(length);while(bw<length){bx[bw++ ]=by;by+=bz;}
;return bx;}
}});}
)();
(function(){var a="[object Opera]",b="function",c="[^\\.0-9]",d="4.0",e="gecko",f="1.9.0.0",g="Version/",h="9.0",i="8.0",j="engine.version",k="Gecko",l="AppleWebKit/",m="Trident",n="Unsupported client: ",o="",p="opera",q="Windows Phone",r="! Assumed gecko version 1.9.0.0 (Firefox 3.0).",s="mshtml",t="engine.name",u="webkit",v="5.0",w=".",x="qx.bom.client.Engine";qx.Bootstrap.define(x,{statics:{getVersion:function(){var A=window.navigator.userAgent;var B=o;if(qx.bom.client.Engine.__km()){var z=/Trident\/([^\);]+)(\)|;)/.test(A);if(/MSIE\s+([^\);]+)(\)|;)/.test(A)){B=RegExp.$1;if(B<8&&z){if(RegExp.$1==d){B=i;}
else if(RegExp.$1==v){B=h;}
;}
;}
else if(z){var D=/\brv\:(\d+?\.\d+?)\b/.exec(A);if(D){B=D[1];}
;}
;}
else if(qx.bom.client.Engine.__kj()){if(/Opera[\s\/]([0-9]+)\.([0-9])([0-9]*)/.test(A)){if(A.indexOf(g)!=-1){var D=A.match(/Version\/(\d+)\.(\d+)/);B=D[1]+w+D[2].charAt(0)+w+D[2].substring(1,D[2].length);}
else {B=RegExp.$1+w+RegExp.$2;if(RegExp.$3!=o){B+=w+RegExp.$3;}
;}
;}
;}
else if(qx.bom.client.Engine.__kk()){if(/AppleWebKit\/([^ ]+)/.test(A)){B=RegExp.$1;var C=RegExp(c).exec(B);if(C){B=B.slice(0,C.index);}
;}
;}
else if(qx.bom.client.Engine.__kl()){if(/rv\:([^\);]+)(\)|;)/.test(A)){B=RegExp.$1;}
;}
else {var y=window.qxFail;if(y&&typeof y===b){B=y().FULLVERSION;}
else {B=f;qx.Bootstrap.warn(n+A+r);}
;}
;return B;}
,getName:function(){var name;if(qx.bom.client.Engine.__km()){name=s;}
else if(qx.bom.client.Engine.__kj()){name=p;}
else if(qx.bom.client.Engine.__kk()){name=u;}
else if(qx.bom.client.Engine.__kl()){name=e;}
else {var E=window.qxFail;if(E&&typeof E===b){name=E().NAME;}
else {name=e;qx.Bootstrap.warn(n+window.navigator.userAgent+r);}
;}
;return name;}
,__kj:function(){return window.opera&&Object.prototype.toString.call(window.opera)==a;}
,__kk:function(){return window.navigator.userAgent.indexOf(l)!=-1;}
,__kl:function(){return (window.navigator.mozApps||window.navigator.buildID)&&window.navigator.product===k&&window.navigator.userAgent.indexOf(m)==-1;}
,__km:function(){if(window.navigator.cpuClass&&(/MSIE\s+([^\);]+)(\)|;)/.test(window.navigator.userAgent)||/Trident\/\d+?\.\d+?/.test(window.navigator.userAgent))){return true;}
;if(qx.bom.client.Engine.__kn()){return true;}
;return false;}
,__kn:function(){return window.navigator.userAgent.indexOf(q)>-1;}
},defer:function(F){qx.core.Environment.add(j,F.getVersion);qx.core.Environment.add(t,F.getName);}
});}
)();
(function(){var a="Invalid parameter 'func'.",b="qx.debug",c='anonymous()',d="Trying to call a bound function with a disposed object as context: ",e="()",f="qx.globalErrorHandling",g=" :: ",h="qx.lang.Function",i=".",j=".prototype.",k=".constructor()";qx.Bootstrap.define(h,{statics:{getCaller:function(l){return l.caller?l.caller.callee:l.callee.caller;}
,getName:function(m){if(m.displayName){return m.displayName;}
;if(m.$$original||m.wrapper||m.classname){return m.classname+k;}
;if(m.$$mixin){for(var n in m.$$mixin.$$members){if(m.$$mixin.$$members[n]==m){return m.$$mixin.name+j+n+e;}
;}
;for(var n in m.$$mixin){if(m.$$mixin[n]==m){return m.$$mixin.name+i+n+e;}
;}
;}
;if(m.self){var p=m.self.constructor;if(p){for(var n in p.prototype){if(p.prototype[n]==m){return p.classname+j+n+e;}
;}
;for(var n in p){if(p[n]==m){return p.classname+i+n+e;}
;}
;}
;}
;var o=m.toString().match(/function\s*(\w*)\s*\(.*/);if(o&&o.length>=1&&o[1]){return o[1]+e;}
;return c;}
,globalEval:function(data){if(window.execScript){return window.execScript(data);}
else {return eval.call(window,data);}
;}
,create:function(r,q){if(qx.core.Environment.get(b)){qx.core.Assert&&qx.core.Assert.assertFunction(r,a);}
;if(!q){return r;}
;if(!(q.self||q.args||q.delay!=null||q.periodical!=null||q.attempt)){return r;}
;return function(event){if(qx.core.Environment.get(b)){if(qx.core.Object&&q.self&&qx.Bootstrap.isObject(q.self)&&q.self.isDisposed&&qx.Bootstrap.isFunction(q.self.isDisposed)){qx.core.Assert&&qx.core.Assert.assertFalse(q.self.isDisposed(),d+q.self.toString()+g+qx.lang.Function.getName(r));}
;}
;var t=qx.lang.Array.fromArguments(arguments);if(q.args){t=q.args.concat(t);}
;if(q.delay||q.periodical){var s=function(){return r.apply(q.self||this,t);}
;if(qx.core.Environment.get(f)){s=qx.event.GlobalError.observeMethod(s);}
;if(q.delay){return window.setTimeout(s,q.delay);}
;if(q.periodical){return window.setInterval(s,q.periodical);}
;}
else if(q.attempt){var u=false;try{u=r.apply(q.self||this,t);}
catch(v){}
;return u;}
else {return r.apply(q.self||this,t);}
;}
;}
,bind:function(w,self,x){return this.create(w,{self:self,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null});}
,curry:function(y,z){return this.create(y,{args:arguments.length>1?qx.lang.Array.fromArguments(arguments,1):null});}
,listener:function(B,self,C){if(arguments.length<3){return function(event){return B.call(self||this,event||window.event);}
;}
else {var A=qx.lang.Array.fromArguments(arguments,2);return function(event){var D=[event||window.event];D.push.apply(D,A);B.apply(self||this,D);}
;}
;}
,attempt:function(E,self,F){return this.create(E,{self:self,attempt:true,args:arguments.length>2?qx.lang.Array.fromArguments(arguments,2):null})();}
,delay:function(H,G,self,I){return this.create(H,{delay:G,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();}
,periodical:function(K,J,self,L){return this.create(K,{periodical:J,self:self,args:arguments.length>3?qx.lang.Array.fromArguments(arguments,3):null})();}
}});}
)();
(function(){var a="qx.globalErrorHandling",b="qx.event.GlobalError";qx.Bootstrap.define(b,{statics:{__ko:null,__kp:null,__kq:null,__kr:function(){if(qx.core&&qx.core.Environment){return qx.core.Environment.get(a);}
else {return !!qx.Bootstrap.getEnvironmentSetting(a);}
;}
,setErrorHandler:function(c,d){this.__ko=c||null;this.__kq=d||window;if(this.__kr()){if(c&&window.onerror){var e=qx.Bootstrap.bind(this.__ks,this);if(this.__kp==null){this.__kp=window.onerror;}
;var self=this;window.onerror=function(f,g,h){self.__kp(f,g,h);e(f,g,h);}
;}
;if(c&&!window.onerror){window.onerror=qx.Bootstrap.bind(this.__ks,this);}
;if(this.__ko==null){if(this.__kp!=null){window.onerror=this.__kp;this.__kp=null;}
else {window.onerror=null;}
;}
;}
;}
,__ks:function(i,j,k){if(this.__ko){this.handleError(new qx.core.WindowError(i,j,k));}
;}
,observeMethod:function(l){if(this.__kr()){var self=this;return function(){if(!self.__ko){return l.apply(this,arguments);}
;try{return l.apply(this,arguments);}
catch(m){self.handleError(new qx.core.GlobalError(m,arguments));}
;}
;}
else {return l;}
;}
,handleError:function(n){if(this.__ko){this.__ko.call(this.__kq,n);}
;}
},defer:function(o){if(qx.core&&qx.core.Environment){qx.core.Environment.add(a,true);}
else {qx.Bootstrap.setEnvironmentSetting(a,true);}
;o.setErrorHandler(null,null);}
});}
)();
(function(){var a="",b="qx.core.WindowError";qx.Bootstrap.define(b,{extend:Error,construct:function(c,e,f){var d=Error.call(this,c);if(d.stack){this.stack=d.stack;}
;if(d.stacktrace){this.stacktrace=d.stacktrace;}
;this.__kt=c;this.__ku=e||a;this.__kv=f===undefined?-1:f;}
,members:{__kt:null,__ku:null,__kv:null,toString:function(){return this.__kt;}
,getUri:function(){return this.__ku;}
,getLineNumber:function(){return this.__kv;}
}});}
)();
(function(){var a="GlobalError: ",b="qx.core.GlobalError";qx.Bootstrap.define(b,{extend:Error,construct:function(e,c){if(qx.Bootstrap.DEBUG){qx.core.Assert.assertNotUndefined(e);}
;this.__kt=a+(e&&e.message?e.message:e);var d=Error.call(this,this.__kt);if(d.stack){this.stack=d.stack;}
;if(d.stacktrace){this.stacktrace=d.stacktrace;}
;this.__kw=c;this.__kx=e;}
,members:{__kx:null,__kw:null,__kt:null,toString:function(){return this.__kt;}
,getArguments:function(){return this.__kw;}
,getSourceException:function(){return this.__kx;}
},destruct:function(){this.__kx=null;this.__kw=null;this.__kt=null;}
});}
)();
(function(){var c="-",d="qx.debug.dispose",e="",f="qx.core.ObjectRegistry",g="qx.debug",h="$$hash",j="-0",k="Invalid object: ",m="Could not dispose object ",n=" objects",o=": ",p="Disposed ";qx.Bootstrap.define(f,{statics:{inShutDown:false,__il:{},__ky:0,__kz:[],__kA:e,__kB:{},register:function(q){var t=this.__il;if(!t){return;}
;var s=q.$$hash;if(s==null){var r=this.__kz;if(r.length>0&&!qx.core.Environment.get(d)){s=r.pop();}
else {s=(this.__ky++ )+this.__kA;}
;q.$$hash=s;if(qx.core.Environment.get(d)){if(qx.dev&&qx.dev.Debug&&qx.dev.Debug.disposeProfilingActive){this.__kB[s]=qx.dev.StackTrace.getStackTrace();}
;}
;}
;if(qx.core.Environment.get(g)){if(!q.dispose){throw new Error(k+q);}
;}
;t[s]=q;}
,unregister:function(u){var v=u.$$hash;if(v==null){return;}
;var w=this.__il;if(w&&w[v]){delete w[v];this.__kz.push(v);}
;try{delete u.$$hash;}
catch(x){if(u.removeAttribute){u.removeAttribute(h);}
;}
;}
,toHashCode:function(A){if(qx.core.Environment.get(g)){if(A==null){throw new Error(k+A);}
;}
;var y=A.$$hash;if(y!=null){return y;}
;var z=this.__kz;if(z.length>0){y=z.pop();}
else {y=(this.__ky++ )+this.__kA;}
;return A.$$hash=y;}
,clearHashCode:function(C){if(qx.core.Environment.get(g)){if(C==null){throw new Error(k+C);}
;}
;var B=C.$$hash;if(B!=null){this.__kz.push(B);try{delete C.$$hash;}
catch(D){if(C.removeAttribute){C.removeAttribute(h);}
;}
;}
;}
,fromHashCode:function(E){return this.__il[E]||null;}
,shutdown:function(){this.inShutDown=true;var G=this.__il;var I=[];for(var F in G){I.push(F);}
;I.sort(function(a,b){return parseInt(b,10)-parseInt(a,10);}
);var H,i=0,l=I.length;while(true){try{for(;i<l;i++ ){F=I[i];H=G[F];if(H&&H.dispose){H.dispose();}
;}
;}
catch(J){qx.Bootstrap.error(this,m+H.toString()+o+J,J);if(i!==l){i++ ;continue;}
;}
;break;}
;qx.Bootstrap.debug(this,p+l+n);delete this.__il;}
,getRegistry:function(){return this.__il;}
,getNextHash:function(){return this.__ky;}
,getPostId:function(){return this.__kA;}
,getStackTraces:function(){return this.__kB;}
},defer:function(K){if(window&&window.top){var frames=window.top.frames;for(var i=0;i<frames.length;i++ ){if(frames[i]===window){K.__kA=c+(i+1);return;}
;}
;}
;K.__kA=j;}
});}
)();
(function(){var a="",b="[object JavaPackage]",c="qx.bom.client.Runtime",d="runtime.name",e="node.js",f="rhino",g="undefined",h="titanium",i="object";qx.Bootstrap.define(c,{statics:{getName:function(){var name=a;if(typeof Packages===i&&Object.prototype.toString.call(Packages)===b){name=f;}
else if(typeof process!==g){name=e;}
else if(typeof Titanium!==g&&typeof Titanium.userAgent!==g){name=h;}
else {name=qx.bom.client.Browser.getName();}
;return name;}
},defer:function(j){qx.core.Environment.add(d,j.getName);}
});}
)();
(function(){var a="rim_tabletos",b="10.1",c="Darwin",d="10.3",e="Windows Phone",f="os.version",g="10.7",h="2003",i=")",j="iPhone",k="android",l="unix",m="ce",n="7",o="SymbianOS",p="10.5",q="os.name",r="10.9",s="|",t="MacPPC",u="95",v="iPod",w="10.8",x="\.",y="Win64",z="linux",A="me",B="10.2",C="Macintosh",D="Android",E="Windows",F="98",G="ios",H="10",I="vista",J="8",K="blackberry",L="2000",M="8.1",N="(",O="",P="win",Q="Linux",R="10.6",S="BSD",T="10.0",U="10.4",V="Mac OS X",W="iPad",X="X11",Y="xp",br="symbian",bs="qx.bom.client.OperatingSystem",bt="g",bn="Win32",bo="10.10",bp="osx",bq="webOS",bw="RIM Tablet OS",bx="BlackBerry",by="nt4",bz=".",bu="MacIntel",bv="webos";qx.Bootstrap.define(bs,{statics:{getName:function(){if(!navigator){return O;}
;var bA=navigator.platform||O;var bB=navigator.userAgent||O;if(bA.indexOf(E)!=-1||bA.indexOf(bn)!=-1||bA.indexOf(y)!=-1||bB.indexOf(e)!=-1){return P;}
else if(bA.indexOf(C)!=-1||bA.indexOf(t)!=-1||bA.indexOf(bu)!=-1||bA.indexOf(V)!=-1){return bp;}
else if(bB.indexOf(bw)!=-1){return a;}
else if(bB.indexOf(bq)!=-1){return bv;}
else if(bA.indexOf(v)!=-1||bA.indexOf(j)!=-1||bA.indexOf(W)!=-1){return G;}
else if(bB.indexOf(D)!=-1){return k;}
else if(bA.indexOf(Q)!=-1){return z;}
else if(bA.indexOf(X)!=-1||bA.indexOf(S)!=-1||bA.indexOf(c)!=-1){return l;}
else if(bA.indexOf(o)!=-1){return br;}
else if(bA.indexOf(bx)!=-1){return K;}
;return O;}
,__kC:{"Windows NT 10.0":H,"Windows NT 6.3":M,"Windows NT 6.2":J,"Windows NT 6.1":n,"Windows NT 6.0":I,"Windows NT 5.2":h,"Windows NT 5.1":Y,"Windows NT 5.0":L,"Windows 2000":L,"Windows NT 4.0":by,"Win 9x 4.90":A,"Windows CE":m,"Windows 98":F,"Win98":F,"Windows 95":u,"Win95":u,"Mac OS X 10_10":bo,"Mac OS X 10.10":bo,"Mac OS X 10_9":r,"Mac OS X 10.9":r,"Mac OS X 10_8":w,"Mac OS X 10.8":w,"Mac OS X 10_7":g,"Mac OS X 10.7":g,"Mac OS X 10_6":R,"Mac OS X 10.6":R,"Mac OS X 10_5":p,"Mac OS X 10.5":p,"Mac OS X 10_4":U,"Mac OS X 10.4":U,"Mac OS X 10_3":d,"Mac OS X 10.3":d,"Mac OS X 10_2":B,"Mac OS X 10.2":B,"Mac OS X 10_1":b,"Mac OS X 10.1":b,"Mac OS X 10_0":T,"Mac OS X 10.0":T},getVersion:function(){var bC=qx.bom.client.OperatingSystem.__kD(navigator.userAgent);if(bC==null){bC=qx.bom.client.OperatingSystem.__kE(navigator.userAgent);}
;if(bC!=null){return bC;}
else {return O;}
;}
,__kD:function(bD){var bG=[];for(var bF in qx.bom.client.OperatingSystem.__kC){bG.push(bF);}
;var bH=new RegExp(N+bG.join(s).replace(/\./g,x)+i,bt);var bE=bH.exec(bD);if(bE&&bE[1]){return qx.bom.client.OperatingSystem.__kC[bE[1]];}
;return null;}
,__kE:function(bN){var bI=bN.indexOf(e)!=-1;var bO=bN.indexOf(D)!=-1;var bJ=bN.match(/(iPad|iPhone|iPod)/i)?true:false;if(bI){var bQ=new RegExp(/Windows Phone (\d+(?:\.\d+)+)/i);var bL=bQ.exec(bN);if(bL&&bL[1]){return bL[1];}
;}
else if(bO){var bM=new RegExp(/ Android (\d+(?:\.\d+)+)/i);var bP=bM.exec(bN);if(bP&&bP[1]){return bP[1];}
;}
else if(bJ){var bR=new RegExp(/(CPU|iPhone|iPod) OS (\d+)_(\d+)(?:_(\d+))*\s+/);var bK=bR.exec(bN);if(bK&&bK[2]&&bK[3]){if(bK[4]){return bK[2]+bz+bK[3]+bz+bK[4];}
else {return bK[2]+bz+bK[3];}
;}
;}
;return null;}
},defer:function(bS){qx.core.Environment.add(q,bS.getName);qx.core.Environment.add(f,bS.getVersion);}
});}
)();
(function(){var a="CSS1Compat",b="IEMobile",c=" OPR/",d="msie",e="android",f="operamini",g="AdobeAIR|Titanium|Fluid|Chrome|Android|Epiphany|Konqueror|iCab|iPad|iPhone|OmniWeb|Maxthon|Pre|PhantomJS|Mobile Safari|Safari",h="browser.quirksmode",i="browser.name",j="trident",k="mobile chrome",l=")(/| )([0-9]+\.[0-9])",m="iemobile",n="prism|Fennec|Camino|Kmeleon|Galeon|Netscape|SeaMonkey|Namoroka|Firefox",o="IEMobile|Maxthon|MSIE|Trident",p="opera mobi",q="Mobile Safari",r="operamobile",s="ie",t="mobile safari",u="qx.bom.client.Browser",v="",w="opera mini",x="(",y="browser.version",z="opera",A="ce",B=")(/|)?([0-9]+\.[0-9])?",C="mshtml",D="Opera Mini|Opera Mobi|Opera",E="edge",F="webkit",G="browser.documentmode",H="5.0",I="Mobile/";qx.Bootstrap.define(u,{statics:{getName:function(){var L=navigator.userAgent;var M=new RegExp(x+qx.bom.client.Browser.__kF+B);var K=L.match(M);if(!K){return v;}
;var name=K[1].toLowerCase();var J=qx.bom.client.Engine.getName();if(J===F){if(L.match(/Edge\/\d+\.\d+/)){name=E;}
else if(name===e){name=k;}
else if(L.indexOf(q)!==-1||L.indexOf(I)!==-1){name=t;}
else if(L.indexOf(c)!=-1){name=z;}
;}
else if(J===C){if(name===d||name===j){name=s;if(qx.bom.client.OperatingSystem.getVersion()===A){name=m;}
;var M=new RegExp(b);if(L.match(M)){name=m;}
;}
;}
else if(J===z){if(name===p){name=r;}
else if(name===w){name=f;}
;}
;return name;}
,getVersion:function(){var P=navigator.userAgent;var Q=new RegExp(x+qx.bom.client.Browser.__kF+l);var N=P.match(Q);if(!N){return v;}
;var name=N[1].toLowerCase();var O=N[3];if(P.match(/Version(\/| )([0-9]+\.[0-9])/)){O=RegExp.$2;}
;if(qx.bom.client.Engine.getName()==C){O=qx.bom.client.Engine.getVersion();if(name===d&&qx.bom.client.OperatingSystem.getVersion()==A){O=H;}
;}
;if(qx.bom.client.Engine.getName()==F||qx.bom.client.Browser.getName()==z){if(P.match(/OPR(\/| )([0-9]+\.[0-9])/)){O=RegExp.$2;}
;if(P.match(/Edge\/([\d+\.*]+)/)){O=RegExp.$1;}
;}
;return O;}
,getDocumentMode:function(){if(document.documentMode){return document.documentMode;}
;return 0;}
,getQuirksMode:function(){if(qx.bom.client.Engine.getName()==C&&parseFloat(qx.bom.client.Engine.getVersion())>=8){return qx.bom.client.Engine.DOCUMENT_MODE===5;}
else {return document.compatMode!==a;}
;}
,__kF:{"webkit":g,"gecko":n,"mshtml":o,"opera":D}[qx.bom.client.Engine.getName()]},defer:function(R){qx.core.Environment.add(i,R.getName);qx.core.Environment.add(y,R.getVersion);qx.core.Environment.add(G,R.getDocumentMode);qx.core.Environment.add(h,R.getQuirksMode);}
});}
)();
(function(){var a="\x00\b\n\f\r\t",b="-",c="function",d="[null,null,null]",e="T",f="+",g=",\n",h="constructor",i="{\n",j='"+275760-09-13T00:00:00.000Z"',k="true",l="\\n",m="false",n='"-271821-04-20T00:00:00.000Z"',o="json",p='object',q='""',r="qx.lang.Json",s="{}",t="hasOwnProperty",u="[null]",v="prototype",w='hasOwnProperty',x='"',y="toLocaleString",z="0",A='function',B="",C='\\"',D="\t",E="string",F="}",G="\r",H="toJSON",I=":",J="[\n 1,\n 2\n]",K="\\f",L='"1969-12-31T23:59:59.999Z"',M="/",N="\\b",O="Z",P="\\t",Q="\b",R="[object Number]",S="isPrototypeOf",T="{",U="toString",V="0x",W="[1]",X="\\r",Y="]",bJ=",",bK="null",bQ="\\u00",bN="\n",bO="json-stringify",bI="[]",bP="1",bT="@",bV="000000",bU="[object Boolean]",cd="valueOf",bR="\\\\",bL="[object String]",bM="json-parse",bS="bug-string-char-index",bY="[object Array]",cq="$",ca="[\n",cb='"-000001-01-01T00:00:00.000Z"',bW="[",cm="runtime.name",cc="\\",bX="rhino",ce="[object Date]",cf='{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}',cg="a",ch=" ",cl=".",cn="[object Function]",cp="01",ci='"\t"',cj="propertyIsEnumerable",ck="\f",co="object";qx.Bootstrap.define(r,{statics:{stringify:null,parse:null}});(function(){var cs;var cr;var ct;(function(window){if(qx.core.Environment.get(cm)===bX||qx.core.Environment.get(cm)===undefined)return;var cv={}.toString,cK,cU,cG;var cC=typeof ct===c&&ct.amd,cB=typeof cr===co&&cr;if(cB||cC){if(typeof JSON===co&&JSON){if(cB){cB.stringify=JSON.stringify;cB.parse=JSON.parse;}
else {cB=JSON;}
;}
else if(cC){cB=window.JSON={};}
;}
else {cB=window.JSON||(window.JSON={});}
;var cY=new Date(-3509827334573292);try{cY=cY.getUTCFullYear()==-109252&&cY.getUTCMonth()===0&&cY.getUTCDate()===1&&cY.getUTCHours()==10&&cY.getUTCMinutes()==37&&cY.getUTCSeconds()==6&&cY.getUTCMilliseconds()==708;}
catch(de){}
;function cN(name){if(name===bS){return cg[0]!=cg;}
;var di,dh=cf,dl=name===o;if(dl||name===bO||name===bM){if(name==bO||dl){var df=cB.stringify,dk=typeof df===c&&cY;if(dk){(di=function(){return 1;}
).toJSON=di;try{dk=df(0)===z&&df(new Number())===z&&df(new String())===q&&df(cv)===cG&&df(cG)===cG&&df()===cG&&df(di)===bP&&df([di])===W&&df([cG])===u&&df(null)===bK&&df([cG,cv,null])===d&&df({"a":[di,true,false,null,a]})==dh&&df(null,di)===bP&&df([1,2],null,1)===J&&df(new Date(-8.64e15))===n&&df(new Date(8.64e15))===j&&df(new Date(-621987552e5))===cb&&df(new Date(-1))===L;}
catch(dm){dk=false;}
;}
;if(!dl){return dk;}
;}
;if(name===bM||dl){var dj=cB.parse;if(typeof dj===c){try{if(dj(z)===0&&!dj(false)){di=dj(dh);var dg=di[cg].length==5&&di[cg][0]===1;if(dg){try{dg=!dj(ci);}
catch(dn){}
;if(dg){try{dg=dj(cp)!==1;}
catch(dp){}
;}
;}
;}
;}
catch(dq){dg=false;}
;}
;if(!dl){return dg;}
;}
;return dk&&dg;}
;}
;if(!cN(o)){var da=cn;var cR=ce;var cz=R;var dd=bL;var cV=bY;var cJ=bU;var cI=cN(bS);if(!cY){var cH=Math.floor;var cQ=[0,31,59,90,120,151,181,212,243,273,304,334];var dc=function(dr,ds){return cQ[ds]+365*(dr-1970)+cH((dr-1969+(ds=+(ds>1)))/4)-cH((dr-1901+ds)/100)+cH((dr-1601+ds)/400);}
;}
;if(!(cK={}.hasOwnProperty)){cK=function(dt){var du={},dv;if((du.__kH=null,du.__kH={"toString":1},du).toString!=cv){cK=function(dw){var dx=this.__kH,dy=dw in (this.__kH=null,this);this.__kH=dx;return dy;}
;}
else {dv=du.constructor;cK=function(dz){var parent=(this.constructor||dv).prototype;return dz in this&&!(dz in parent&&this[dz]===parent[dz]);}
;}
;du=null;return cK.call(this,dt);}
;}
;var cL={'boolean':1,'number':1,'string':1,'undefined':1};var cT=function(dC,dA){var dB=typeof dC[dA];return dB==p?!!dC[dA]:!cL[dB];}
;cU=function(dD,dE){var dJ=0,dI,dG,dH,dF;(dI=function(){this.valueOf=0;}
).prototype.valueOf=0;dG=new dI();for(dH in dG){if(cK.call(dG,dH)){dJ++ ;}
;}
;dI=dG=null;if(!dJ){dG=[cd,U,y,cj,S,t,h];dF=function(dL,dM){var dN=cv.call(dL)==da,dO,length;var dK=!dN&&typeof dL.constructor!=A&&cT(dL,w)?dL.hasOwnProperty:cK;for(dO in dL){if(!(dN&&dO===v)&&dK.call(dL,dO)){dM(dO);}
;}
;for(length=dG.length;dO=dG[ --length];dK.call(dL,dO)&&dM(dO));}
;}
else if(dJ==2){dF=function(dT,dP){var dS={},dQ=cv.call(dT)==da,dR;for(dR in dT){if(!(dQ&&dR===v)&&!cK.call(dS,dR)&&(dS[dR]=1)&&cK.call(dT,dR)){dP(dR);}
;}
;}
;}
else {dF=function(dX,dU){var dV=cv.call(dX)==da,dW,dY;for(dW in dX){if(!(dV&&dW===v)&&cK.call(dX,dW)&&!(dY=dW===h)){dU(dW);}
;}
;if(dY||cK.call(dX,(dW=h))){dU(dW);}
;}
;}
;return dF(dD,dE);}
;if(!cN(bO)){var cX={'92':bR,'34':C,'8':N,'12':K,'10':l,'13':X,'9':P};var cM=bV;var db=function(ea,eb){return (cM+(eb||0)).slice(-ea);}
;var cF=bQ;var cP=function(ed){var ef=x,ec=0,length=ed.length,eg=length>10&&cI,ee;if(eg){ee=ed.split(B);}
;for(;ec<length;ec++ ){var eh=ed.charCodeAt(ec);switch(eh){case 8:case 9:case 10:case 12:case 13:case 34:case 92:ef+=cX[eh];break;default:if(eh<32){ef+=cF+db(2,eh.toString(16));break;}
;ef+=eg?ee[ec]:cI?ed.charAt(ec):ed[ec];};}
;return ef+x;}
;var cw=function(eD,es,eA,ep,eo,eB,ew){var ex=es[eD],ez,em,ej,ev,eC,et,eE,er,eq,ei,ey,en,length,ek,eu,el;try{ex=es[eD];}
catch(eF){}
;if(typeof ex===co&&ex){ez=cv.call(ex);if(ez==cR&&!cK.call(ex,H)){if(ex>-1/0&&ex<1/0){if(dc){ev=cH(ex/864e5);for(em=cH(ev/365.2425)+1970-1;dc(em+1,0)<=ev;em++ );for(ej=cH((ev-dc(em,0))/30.42);dc(em,ej+1)<=ev;ej++ );ev=1+ev-dc(em,ej);eC=(ex%864e5+864e5)%864e5;et=cH(eC/36e5)%24;eE=cH(eC/6e4)%60;er=cH(eC/1e3)%60;eq=eC%1e3;}
else {em=ex.getUTCFullYear();ej=ex.getUTCMonth();ev=ex.getUTCDate();et=ex.getUTCHours();eE=ex.getUTCMinutes();er=ex.getUTCSeconds();eq=ex.getUTCMilliseconds();}
;ex=(em<=0||em>=1e4?(em<0?b:f)+db(6,em<0?-em:em):db(4,em))+b+db(2,ej+1)+b+db(2,ev)+e+db(2,et)+I+db(2,eE)+I+db(2,er)+cl+db(3,eq)+O;}
else {ex=null;}
;}
else if(typeof ex.toJSON===c&&((ez!=cz&&ez!=dd&&ez!=cV)||cK.call(ex,H))){ex=ex.toJSON(eD);}
;}
;if(eA){ex=eA.call(es,eD,ex);}
;if(ex===null){return bK;}
;ez=cv.call(ex);if(ez==cJ){return B+ex;}
else if(ez==cz){return ex>-1/0&&ex<1/0?B+ex:bK;}
else if(ez==dd){return cP(B+ex);}
;if(typeof ex===co){for(length=ew.length;length-- ;){if(ew[length]===ex){throw TypeError();}
;}
;ew.push(ex);ei=[];ek=eB;eB+=eo;if(ez==cV){for(en=0,length=ex.length;en<length;eu||(eu=true),en++ ){ey=cw(en,ex,eA,ep,eo,eB,ew);ei.push(ey===cG?bK:ey);}
;el=eu?(eo?ca+eB+ei.join(g+eB)+bN+ek+Y:(bW+ei.join(bJ)+Y)):bI;}
else {cU(ep||ex,function(eG){var eH=cw(eG,ex,eA,ep,eo,eB,ew);if(eH!==cG){ei.push(cP(eG)+I+(eo?ch:B)+eH);}
;eu||(eu=true);}
);el=eu?(eo?i+eB+ei.join(g+eB)+bN+ek+F:(T+ei.join(bJ)+F)):s;}
;ew.pop();return el;}
;}
;cB.stringify=function(eO,eN,eP){var eJ,eK,eM;if(typeof eN===c||typeof eN===co&&eN){if(cv.call(eN)==da){eK=eN;}
else if(cv.call(eN)==cV){eM={};for(var eI=0,length=eN.length,eL;eI<length;eL=eN[eI++ ],((cv.call(eL)==dd||cv.call(eL)==cz)&&(eM[eL]=1)));}
;}
;if(eP){if(cv.call(eP)==cz){if((eP-=eP%1)>0){for(eJ=B,eP>10&&(eP=10);eJ.length<eP;eJ+=ch);}
;}
else if(cv.call(eP)==dd){eJ=eP.length<=10?eP:eP.slice(0,10);}
;}
;return cw(B,(eL={},eL[B]=eO,eL),eK,eM,eJ,B,[]);}
;}
;if(!cN(bM)){var cE=String.fromCharCode;var cD={'92':cc,'34':x,'47':M,'98':Q,'116':D,'110':bN,'102':ck,'114':G};var cu,cy;var cA=function(){cu=cy=null;throw SyntaxError();}
;var cW=function(){var eS=cy,length=eS.length,eR,eQ,eU,eT,eV;while(cu<length){eV=eS.charCodeAt(cu);switch(eV){case 9:case 10:case 13:case 32:cu++ ;break;case 123:case 125:case 91:case 93:case 58:case 44:eR=cI?eS.charAt(cu):eS[cu];cu++ ;return eR;case 34:for(eR=bT,cu++ ;cu<length;){eV=eS.charCodeAt(cu);if(eV<32){cA();}
else if(eV==92){eV=eS.charCodeAt( ++cu);switch(eV){case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:eR+=cD[eV];cu++ ;break;case 117:eQ= ++cu;for(eU=cu+4;cu<eU;cu++ ){eV=eS.charCodeAt(cu);if(!(eV>=48&&eV<=57||eV>=97&&eV<=102||eV>=65&&eV<=70)){cA();}
;}
;eR+=cE(V+eS.slice(eQ,cu));break;default:cA();};}
else {if(eV==34){break;}
;eV=eS.charCodeAt(cu);eQ=cu;while(eV>=32&&eV!=92&&eV!=34){eV=eS.charCodeAt( ++cu);}
;eR+=eS.slice(eQ,cu);}
;}
;if(eS.charCodeAt(cu)==34){cu++ ;return eR;}
;cA();default:eQ=cu;if(eV==45){eT=true;eV=eS.charCodeAt( ++cu);}
;if(eV>=48&&eV<=57){if(eV==48&&((eV=eS.charCodeAt(cu+1)),eV>=48&&eV<=57)){cA();}
;eT=false;for(;cu<length&&((eV=eS.charCodeAt(cu)),eV>=48&&eV<=57);cu++ );if(eS.charCodeAt(cu)==46){eU= ++cu;for(;eU<length&&((eV=eS.charCodeAt(eU)),eV>=48&&eV<=57);eU++ );if(eU==cu){cA();}
;cu=eU;}
;eV=eS.charCodeAt(cu);if(eV==101||eV==69){eV=eS.charCodeAt( ++cu);if(eV==43||eV==45){cu++ ;}
;for(eU=cu;eU<length&&((eV=eS.charCodeAt(eU)),eV>=48&&eV<=57);eU++ );if(eU==cu){cA();}
;cu=eU;}
;return +eS.slice(eQ,cu);}
;if(eT){cA();}
;if(eS.slice(cu,cu+4)===k){cu+=4;return true;}
else if(eS.slice(cu,cu+5)===m){cu+=5;return false;}
else if(eS.slice(cu,cu+4)===bK){cu+=4;return null;}
;cA();};}
;return cq;}
;var cO=function(eY){var eX,eW;if(eY===cq){cA();}
;if(typeof eY===E){if((cI?eY.charAt(0):eY[0])===bT){return eY.slice(1);}
;if(eY===bW){eX=[];for(;;eW||(eW=true)){eY=cW();if(eY===Y){break;}
;if(eW){if(eY===bJ){eY=cW();if(eY===Y){cA();}
;}
else {cA();}
;}
;if(eY===bJ){cA();}
;eX.push(cO(eY));}
;return eX;}
else if(eY===T){eX={};for(;;eW||(eW=true)){eY=cW();if(eY==F){break;}
;if(eW){if(eY===bJ){eY=cW();if(eY===F){cA();}
;}
else {cA();}
;}
;if(eY===bJ||typeof eY!==E||(cI?eY.charAt(0):eY[0])!==bT||cW()!==I){cA();}
;eX[eY.slice(1)]=cO(cW());}
;return eX;}
;cA();}
;return eY;}
;var cS=function(fa,fb,fc){var fd=cx(fa,fb,fc);if(fd===cG){delete fa[fb];}
else {fa[fb]=fd;}
;}
;var cx=function(fe,ff,fh){var fg=fe[ff],length;if(typeof fg===co&&fg){if(cv.call(fg)==cV){for(length=fg.length;length-- ;){cS(fg,length,fh);}
;}
else {cU(fg,function(fi){cS(fg,fi,fh);}
);}
;}
;return fh.call(fe,ff,fg);}
;cB.parse=function(fj,fm){var fk,fl;cu=0;cy=B+fj;fk=cO(cW());if(cW()!=cq){cA();}
;cu=cy=null;return fm&&cv.call(fm)==da?cx((fl={},fl[B]=fk,fl),B,fm):fk;}
;}
;}
;if(cC){ct(function(){return cB;}
);}
;}
(this||window));}
());qx.lang.Json.stringify=window.JSON.stringify;qx.lang.Json.parse=window.JSON.parse;}
)();
(function(){var a="-",b="]",c='\\u',d="undefined",e="",f='\\$1',g="0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",h="\\\\",j='-',k="g",l="\\\"",m="qx.lang.String",n="(^|[^",o="0",p="%",q='"',r=' ',s='\n',t="])[";qx.Bootstrap.define(m,{statics:{__kJ:g,__kK:null,__kL:{},camelCase:function(v){var u=this.__kL[v];if(!u){u=v.replace(/\-([a-z])/g,function(x,w){return w.toUpperCase();}
);if(v.indexOf(a)>=0){this.__kL[v]=u;}
;}
;return u;}
,hyphenate:function(z){var y=this.__kL[z];if(!y){y=z.replace(/[A-Z]/g,function(A){return (j+A.charAt(0).toLowerCase());}
);if(z.indexOf(a)==-1){this.__kL[z]=y;}
;}
;return y;}
,capitalize:function(C){if(this.__kK===null){var B=c;this.__kK=new RegExp(n+this.__kJ.replace(/[0-9A-F]{4}/g,function(D){return B+D;}
)+t+this.__kJ.replace(/[0-9A-F]{4}/g,function(E){return B+E;}
)+b,k);}
;return C.replace(this.__kK,function(F){return F.toUpperCase();}
);}
,clean:function(G){return G.replace(/\s+/g,r).trim();}
,trimLeft:function(H){return H.replace(/^\s+/,e);}
,trimRight:function(I){return I.replace(/\s+$/,e);}
,startsWith:function(K,J){return K.indexOf(J)===0;}
,endsWith:function(M,L){return M.substring(M.length-L.length,M.length)===L;}
,repeat:function(N,O){return N.length>0?new Array(O+1).join(N):e;}
,pad:function(Q,length,P){var R=length-Q.length;if(R>0){if(typeof P===d){P=o;}
;return this.repeat(P,R)+Q;}
else {return Q;}
;}
,firstUp:qx.Bootstrap.firstUp,firstLow:qx.Bootstrap.firstLow,contains:function(T,S){return T.indexOf(S)!=-1;}
,format:function(U,V){var W=U;var i=V.length;while(i-- ){W=W.replace(new RegExp(p+(i+1),k),function(){return V[i]+e;}
);}
;return W;}
,escapeRegexpChars:function(X){return X.replace(/([.*+?^${}()|[\]\/\\])/g,f);}
,toArray:function(Y){return Y.split(/\B|\b/g);}
,stripTags:function(ba){return ba.replace(/<\/?[^>]+>/gi,e);}
,stripScripts:function(bd,bc){var be=e;var bb=bd.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi,function(){be+=arguments[1]+s;return e;}
);if(bc===true){qx.lang.Function.globalEval(be);}
;return bb;}
,quote:function(bf){return q+bf.replace(/\\/g,h).replace(/\"/g,l)+q;}
}});}
)();
(function(){var a="qx.event.type.Data",b="qx.event.type.Event",c="qx.data.IListData";qx.Interface.define(c,{events:{"change":a,"changeLength":b},members:{getItem:function(d){}
,setItem:function(e,f){}
,splice:function(g,h,i){}
,contains:function(j){}
,getLength:function(){}
,toArray:function(){}
}});}
)();
(function(){var a="qx.core.ValidationError";qx.Class.define(a,{extend:qx.type.BaseError});}
)();
(function(){var a="qx.util.RingBuffer";qx.Bootstrap.define(a,{extend:Object,construct:function(b){this.setMaxEntries(b||50);}
,members:{__kO:0,__kP:0,__kQ:false,__kR:0,__kS:null,__kT:null,setMaxEntries:function(c){this.__kT=c;this.clear();}
,getMaxEntries:function(){return this.__kT;}
,addEntry:function(d){this.__kS[this.__kO]=d;this.__kO=this.__kU(this.__kO,1);var e=this.getMaxEntries();if(this.__kP<e){this.__kP++ ;}
;if(this.__kQ&&(this.__kR<e)){this.__kR++ ;}
;}
,getNumEntriesStored:function(){return this.__kP;}
,mark:function(){this.__kQ=true;this.__kR=0;}
,clearMark:function(){this.__kQ=false;}
,getAllEntries:function(){return this.getEntries(this.getMaxEntries(),false);}
,getEntries:function(f,j){if(f>this.__kP){f=this.__kP;}
;if(j&&this.__kQ&&(f>this.__kR)){f=this.__kR;}
;if(f>0){var h=this.__kU(this.__kO,-1);var g=this.__kU(h,-f+1);var i;if(g<=h){i=this.__kS.slice(g,h+1);}
else {i=this.__kS.slice(g,this.__kP).concat(this.__kS.slice(0,h+1));}
;}
else {i=[];}
;return i;}
,clear:function(){this.__kS=new Array(this.getMaxEntries());this.__kP=0;this.__kR=0;this.__kO=0;}
,__kU:function(n,l){var k=this.getMaxEntries();var m=(n+l)%k;if(m<0){m+=k;}
;return m;}
}});}
)();
(function(){var a="qx.log.appender.RingBuffer";qx.Bootstrap.define(a,{extend:qx.util.RingBuffer,construct:function(b){this.setMaxMessages(b||50);}
,members:{setMaxMessages:function(c){this.setMaxEntries(c);}
,getMaxMessages:function(){return this.getMaxEntries();}
,process:function(d){this.addEntry(d);}
,getAllLogEvents:function(){return this.getAllEntries();}
,retrieveLogEvents:function(e,f){return this.getEntries(e,f);}
,clearHistory:function(){this.clear();}
}});}
)();
(function(){var a="qx.log.Logger",b="[",c="The mixin '",d="...(+",e="array",f="The method '",g=")",h="warn",j="node",k="The event '",m="instance",n="info",o="string",p="Please consult the API documentation of this method for alternatives.",q="null",r="error",s="qx.debug",t="Please consult the API documentation of this class for alternatives.",u="#",v="class",w="' is deprecated: ",x=": ",y="Please consult the API documentation for alternatives.",z="document",A="{...(",B="",C="number",D="' from class '",E="The class '",F="stringify",G="' overrides a deprecated method: ",H="date",I="unknown",J="function",K="[default]",L="text[",M="]",N="[...(",O="boolean",P="\n",Q=")}",R="|",S="debug",T=")]",U="map",V="The constant '",W="undefined",X="trace",Y="object";qx.Bootstrap.define(a,{statics:{__kV:S,setLevel:function(ba){this.__kV=ba;}
,getLevel:function(){return this.__kV;}
,setTreshold:function(bb){this.__la.setMaxMessages(bb);}
,getTreshold:function(){return this.__la.getMaxMessages();}
,__kW:[],__kX:{},__kY:[],__gJ:0,register:function(bd){if(bd.$$id){return;}
;var bg=this.__gJ++ ;this.__kW[bg]=bd;this.__kX[bd.classname]=bd;bd.$$id=bg;var be=this.__la.getAllLogEvents();for(var i=0,l=be.length;i<l;i++ ){var bf=be[i];var bc=this.__le(bf.loggerName,bf.level);if(bc[bd.classname]){bd.process(bf);}
;}
;}
,unregister:function(bh){var bi=bh.$$id;if(bi==null){return;}
;delete this.__kX[bh.classname];delete this.__kW[bi];delete bh.$$id;}
,addFilter:function(bk,bj,bl){if(typeof bk==o){bk=new RegExp(bk);}
;this.__kY.push({loggerMatch:bk,level:bl||this.__kV,appenderName:bj});}
,resetFilters:function(){this.__kY=[];}
,debug:function(bn,bm){qx.log.Logger.__ep(S,arguments);}
,info:function(bp,bo){qx.log.Logger.__ep(n,arguments);}
,warn:function(br,bq){qx.log.Logger.__ep(h,arguments);}
,error:function(bt,bs){qx.log.Logger.__ep(r,arguments);}
,trace:function(bx,bu){if(qx.log.Logger.isLoggerEnabled(X,bx)){var bw=qx.dev.StackTrace.getStackTrace();var bv=qx.lang.Array.fromArguments(arguments);bv.push(bw.join(P));qx.log.Logger.__ep(X,bv);}
;}
,deprecatedMethodWarning:function(bA,by){if(qx.core.Environment.get(s)){var bz=qx.lang.Function.getName(bA);this.warn(f+bz+w+(by||p));this.trace();}
;}
,deprecatedClassWarning:function(bD,bB){if(qx.core.Environment.get(s)){var bC=bD.classname||I;this.warn(E+bC+w+(bB||t));this.trace();}
;}
,deprecatedEventWarning:function(bG,event,bF){if(qx.core.Environment.get(s)){var bE=bG.self?bG.self.classname:I;this.warn(k+(event||I)+D+bE+w+(bF||t));this.trace();}
;}
,deprecatedMixinWarning:function(bI,bH){if(qx.core.Environment.get(s)){var bJ=bI?bI.name:I;this.warn(c+bJ+w+(bH||t));this.trace();}
;}
,deprecatedConstantWarning:function(bN,bM,bK){if(qx.core.Environment.get(s)){if(bN.__defineGetter__){var self=this;var bL=bN[bM];bN.__defineGetter__(bM,function(){self.warn(V+bM+w+(bK||y));self.trace();return bL;}
);}
;}
;}
,deprecateMethodOverriding:function(bQ,bP,bR,bO){if(qx.core.Environment.get(s)){var bS=bQ.constructor;while(bS.classname!==bP.classname){if(bS.prototype.hasOwnProperty(bR)){this.warn(f+qx.lang.Function.getName(bQ[bR])+G+(bO||y));this.trace();break;}
;bS=bS.superclass;}
;}
;}
,clear:function(){this.__la.clearHistory();}
,__la:new qx.log.appender.RingBuffer(50),__lb:{trace:0,debug:1,info:2,warn:3,error:4},__lc:{},__ld:function(bT){if(bT){if(bT.classname){return bT.classname;}
;if(typeof bT==o){return bT;}
;}
;return K;}
,isLoggerEnabled:function(bX,bV){var bU=this.__ld(bV);var bW=this.__le(bU,bX);return !!Object.keys(bW).length;}
,__ep:function(cb,bY){var cd=bY.length<2?null:bY[0];var ce=this.__ld(cd);var ca=this.__le(ce,cb);if(!Object.keys(ca).length){return;}
;var cg=cd?1:0;var cc=[];for(var i=cg,l=bY.length;i<l;i++ ){cc.push(this.__lg(bY[i],true));}
;var ch=new Date;var ci={time:ch,offset:ch-qx.Bootstrap.LOADSTART,level:cb,loggerName:ce,items:cc,win:window};if(cd){if(cd.$$hash!==undefined){ci.object=cd.$$hash;}
else if(cd.$$type){ci.clazz=cd;}
else if(cd.constructor){ci.clazz=cd.constructor;}
;}
;this.__la.process(ci);for(var cf in ca){ca[cf].process(ci);}
;}
,__le:function(cj,cl){var co=this.__lb;if(!this.__kY.length){if(co[cl]<co[this.__kV]){return [];}
;return this.__kX;}
;var cm=cj+R+cl;var ck=this.__lc[cm];if(ck!==undefined){return ck;}
;var ck={};for(var i=0;i<this.__kY.length;i++ ){var cn=this.__kY[i];if(co[cl]<co[cn.level]){continue;}
;if(cn.appenderName&&ck[cn.appenderName]){continue;}
;if(!cn.loggerMatch||cn.loggerMatch.test(cj)){if(cn.appenderName){ck[cn.appenderName]=this.__kX[cn.appenderName];}
else {return this.__lc[cm]=this.__kX;}
;}
;}
;return this.__lc[cm]=ck;}
,__lf:function(cq){if(cq===undefined){return W;}
else if(cq===null){return q;}
;if(cq.$$type){return v;}
;var cp=typeof cq;if(cp===J||cp==o||cp===C||cp===O){return cp;}
else if(cp===Y){if(cq.nodeType){return j;}
else if(cq instanceof Error||(cq.name&&cq.message)){return r;}
else if(cq.classname){return m;}
else if(cq instanceof Array){return e;}
else if(cq instanceof Date){return H;}
else {return U;}
;}
;if(cq.toString){return F;}
;return I;}
,__lg:function(cw,cv){var cz=this.__lf(cw);var ct=I;var cs=[];switch(cz){case q:case W:ct=cz;break;case o:case C:case O:case H:ct=cw;break;case j:if(cw.nodeType===9){ct=z;}
else if(cw.nodeType===3){ct=L+cw.nodeValue+M;}
else if(cw.nodeType===1){ct=cw.nodeName.toLowerCase();if(cw.id){ct+=u+cw.id;}
;}
else {ct=j;}
;break;case J:ct=qx.lang.Function.getName(cw)||cz;break;case m:ct=cw.basename+b+cw.$$hash+M;break;case v:case F:ct=cw.toString();break;case r:cs=qx.dev.StackTrace.getStackTraceFromError(cw);ct=(cw.basename?cw.basename+x:B)+cw.toString();break;case e:if(cv){ct=[];for(var i=0,l=cw.length;i<l;i++ ){if(ct.length>20){ct.push(d+(l-i)+g);break;}
;ct.push(this.__lg(cw[i],false));}
;}
else {ct=N+cw.length+T;}
;break;case U:if(cv){var cr;var cy=[];for(var cx in cw){cy.push(cx);}
;cy.sort();ct=[];for(var i=0,l=cy.length;i<l;i++ ){if(ct.length>20){ct.push(d+(l-i)+g);break;}
;cx=cy[i];cr=this.__lg(cw[cx],false);cr.key=cx;ct.push(cr);}
;}
else {var cu=0;for(var cx in cw){cu++ ;}
;ct=A+cu+Q;}
;break;};return {type:cz,text:ct,trace:cs};}
},defer:function(cA){var cB=qx.Bootstrap.$$logs;for(var i=0;i<cB.length;i++ ){cA.__ep(cB[i][0],cB[i][1]);}
;qx.Bootstrap.debug=cA.debug;qx.Bootstrap.info=cA.info;qx.Bootstrap.warn=cA.warn;qx.Bootstrap.error=cA.error;qx.Bootstrap.trace=cA.trace;}
});}
)();
(function(){var a="info",b="error",c="warn",d="debug",e="qx.core.MLogging",f="trace";qx.Mixin.define(e,{members:{__lz:qx.log.Logger,debug:function(g){this.__lA(d,arguments);}
,info:function(h){this.__lA(a,arguments);}
,warn:function(i){this.__lA(c,arguments);}
,error:function(j){this.__lA(b,arguments);}
,trace:function(k){this.__lA(f,arguments);}
,__lA:function(l,n){var m=qx.lang.Array.fromArguments(n);m.unshift(this);this.__lz[l].apply(this.__lz,m);}
}});}
)();
(function(){var b="qx.dom.Node",c="";qx.Bootstrap.define(b,{statics:{ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12,getDocument:function(d){return d.nodeType===this.DOCUMENT?d:d.ownerDocument||d.document;}
,getWindow:function(e){if(e.nodeType==null){return e;}
;if(e.nodeType!==this.DOCUMENT){e=e.ownerDocument;}
;return e.defaultView||e.parentWindow;}
,getDocumentElement:function(f){return this.getDocument(f).documentElement;}
,getBodyElement:function(g){return this.getDocument(g).body;}
,isNode:function(h){return !!(h&&h.nodeType!=null);}
,isElement:function(j){return !!(j&&j.nodeType===this.ELEMENT);}
,isDocument:function(k){return !!(k&&k.nodeType===this.DOCUMENT);}
,isDocumentFragment:function(l){return !!(l&&l.nodeType===this.DOCUMENT_FRAGMENT);}
,isText:function(m){return !!(m&&m.nodeType===this.TEXT);}
,isWindow:function(n){return !!(n&&n.history&&n.location&&n.document);}
,isNodeName:function(o,p){if(!p||!o||!o.nodeName){return false;}
;return p.toLowerCase()==qx.dom.Node.getName(o);}
,getName:function(q){if(!q||!q.nodeName){return null;}
;return q.nodeName.toLowerCase();}
,getText:function(r){if(!r||!r.nodeType){return null;}
;switch(r.nodeType){case 1:var i,a=[],s=r.childNodes,length=s.length;for(i=0;i<length;i++ ){a[i]=this.getText(s[i]);}
;return a.join(c);case 2:case 3:case 4:return r.nodeValue;};return null;}
,isBlockNode:function(t){if(!qx.dom.Node.isElement(t)){return false;}
;t=qx.dom.Node.getName(t);return /^(body|form|textarea|fieldset|ul|ol|dl|dt|dd|li|div|hr|p|h[1-6]|quote|pre|table|thead|tbody|tfoot|tr|td|th|iframe|address|blockquote)$/.test(t);}
}});}
)();
(function(){var a="function",b='loadeddata',c="pointerover",d='pause',f="transitionend",g="gecko",h="browser.name",j='timeupdate',k="qx.debug",m='canplay',n="HTMLEvents",o='loadedmetadata',p="css.transition",q="mobile safari",r="return;",s="browser.documentmode",t="safari",u='play',v='ended',w="",x="qx.bom.Event",y='playing',z="mouseover",A="No method available to remove native listener from ",B="No method available to add native listener to ",C="end-event",D="mshtml",E="engine.name",F='progress',G="webkit",H='volumechange',I='seeked',J="on",K="undefined";qx.Bootstrap.define(x,{statics:{addNativeListener:function(O,N,L,M){if(O.addEventListener){O.addEventListener(N,L,!!M);}
else if(O.attachEvent){O.attachEvent(J+N,L);}
else if(typeof O[J+N]!=K){O[J+N]=L;}
else {if(qx.core.Environment.get(k)){qx.log.Logger.warn(B+O);}
;}
;}
,removeNativeListener:function(S,R,P,Q){if(S.removeEventListener){S.removeEventListener(R,P,!!Q);}
else if(S.detachEvent){try{S.detachEvent(J+R,P);}
catch(e){if(e.number!==-2146828218){throw e;}
;}
;}
else if(typeof S[J+R]!=K){S[J+R]=null;}
else {if(qx.core.Environment.get(k)){qx.log.Logger.warn(A+S);}
;}
;}
,getTarget:function(e){return e.target||e.srcElement;}
,getRelatedTarget:function(e){if(e.relatedTarget!==undefined){if((qx.core.Environment.get(E)==g)){try{e.relatedTarget&&e.relatedTarget.nodeType;}
catch(T){return null;}
;}
;return e.relatedTarget;}
else if(e.fromElement!==undefined&&(e.type===z||e.type===c)){return e.fromElement;}
else if(e.toElement!==undefined){return e.toElement;}
else {return null;}
;}
,preventDefault:function(e){if(e.preventDefault){e.preventDefault();}
else {try{e.keyCode=0;}
catch(U){}
;e.returnValue=false;}
;}
,stopPropagation:function(e){if(e.stopPropagation){e.stopPropagation();}
else {e.cancelBubble=true;}
;}
,fire:function(X,V){if(document.createEvent){var W=document.createEvent(n);W.initEvent(V,true,true);return !X.dispatchEvent(W);}
else {var W=document.createEventObject();return X.fireEvent(J+V,W);}
;}
,supportsEvent:function(Y,bh){var bd=qx.core.Environment.get(h);var be=qx.core.Environment.get(E);if(bh.toLowerCase().indexOf(f)!=-1&&be===D&&qx.core.Environment.get(s)>9){return true;}
;var bf=[q,t];if(be===G&&bf.indexOf(bd)>-1){var ba=[b,F,j,I,m,u,y,d,o,v,H];if(ba.indexOf(bh.toLowerCase())>-1){return true;}
;}
;if(Y!=window&&bh.toLowerCase().indexOf(f)!=-1){var bg=qx.core.Environment.get(p);return (bg&&bg[C]==bh);}
;var bb=J+bh.toLowerCase();var bc=(bb in Y);if(!bc){bc=typeof Y[bb]==a;if(!bc&&Y.setAttribute){Y.setAttribute(bb,r);bc=typeof Y[bb]==a;Y.removeAttribute(bb);}
;}
;return bc;}
,getEventName:function(bi,bl){var bj=[w].concat(qx.bom.Style.VENDOR_PREFIXES);for(var i=0,l=bj.length;i<l;i++ ){var bk=bj[i].toLowerCase();if(qx.bom.Event.supportsEvent(bi,bk+bl)){return bk?bk+qx.lang.String.firstUp(bl):bl;}
;}
;return null;}
}});}
)();
(function(){var a="-",b="qx.bom.Style",c="",d='-',e="Webkit",f="ms",g=":",h=";",j="Moz",k="O",m="string",n="Khtml";qx.Bootstrap.define(b,{statics:{VENDOR_PREFIXES:[e,j,k,f,n],__lE:{},__lF:null,getPropertyName:function(q){var o=document.documentElement.style;if(o[q]!==undefined){return q;}
;for(var i=0,l=this.VENDOR_PREFIXES.length;i<l;i++ ){var p=this.VENDOR_PREFIXES[i]+qx.lang.String.firstUp(q);if(o[p]!==undefined){return p;}
;}
;return null;}
,getCssName:function(r){var s=this.__lE[r];if(!s){s=r.replace(/[A-Z]/g,function(t){return (d+t.charAt(0).toLowerCase());}
);if((/^ms/.test(s))){s=a+s;}
;this.__lE[r]=s;}
;return s;}
,getAppliedStyle:function(A,x,z,v){var C=qx.bom.Style.getCssName(x);var w=qx.dom.Node.getWindow(A);var u=(v!==false)?[null].concat(this.VENDOR_PREFIXES):[null];for(var i=0,l=u.length;i<l;i++ ){var y=false;var B=u[i]?a+u[i].toLowerCase()+a+z:z;if(qx.bom.Style.__lF){y=qx.bom.Style.__lF.call(w,C,B);}
else {A.style.cssText+=C+g+B+h;y=(typeof A.style[x]==m&&A.style[x]!==c);}
;if(y){return B;}
;}
;return null;}
},defer:function(D){if(window.CSS&&window.CSS.supports){qx.bom.Style.__lF=window.CSS.supports.bind(window.CSS);}
else if(window.supportsCSS){qx.bom.Style.__lF=window.supportsCSS.bind(window);}
;}
});}
)();
(function(){var a="qx.bom.client.CssTransition",b="E",c="transitionEnd",d="e",e="nd",f="transition",g="css.transition",h="Trans";qx.Bootstrap.define(a,{statics:{getTransitionName:function(){return qx.bom.Style.getPropertyName(f);}
,getSupport:function(){var name=qx.bom.client.CssTransition.getTransitionName();if(!name){return null;}
;var i=qx.bom.Event.getEventName(window,c);i=i==c?i.toLowerCase():i;if(!i){i=name+(name.indexOf(h)>0?b:d)+e;}
;return {name:name,"end-event":i};}
},defer:function(j){qx.core.Environment.add(g,j.getSupport);}
});}
)();
(function(){var a="Failed to remove event listener for id '",b="': ",c="Invalid context for callback.",d="Invalid capture flag.",e="Failed to add event listener for type '",f="UNKNOWN_",g="'",h="|bubble",j="Invalid event type.",k="There is no event handler for the event '",m=" from the target '",n="qx.debug",o="capture",p="|capture",q="__lK",r="Invalid callback function",s="qx.event.Manager",t="' on target '",u="'!",v="Could not dispatch event '",w="",x="_",y="DOM_",z="Invalid event target.",A="No dispatcher can handle event of type ",B="QX_",C=" to the target '",D="Failed to remove event listener for type '",E=" on ",F="Invalid id type.",G="c",H="|",I="__lL",J="qx.globalErrorHandling",K="unload",L="DOCUMENT_",M="Invalid object: ",N="Invalid Target.",O="WIN_",P="Invalid event object.";qx.Class.define(s,{extend:Object,construct:function(Q,S){this.__lG=Q;this.__lH=qx.core.ObjectRegistry.toHashCode(Q);this.__lI=S;if(Q.qx!==qx){var self=this;var R=function(){qx.bom.Event.removeNativeListener(Q,K,arguments.callee);self.dispose();}
;if(qx.core.Environment.get(J)){qx.bom.Event.addNativeListener(Q,K,qx.event.GlobalError.observeMethod(R));}
else {qx.bom.Event.addNativeListener(Q,K,R);}
;}
;this.__lJ={};this.__lK={};this.__lL={};this.__lM={};this.__lN=new qx.util.DeferredCall(function(){this.__lO=null;}
,this);this.__lN.$$blackListCleaner=true;}
,statics:{__lP:0,getNextUniqueId:function(){return (this.__lP++ )+w;}
},members:{__lI:null,__lJ:null,__lL:null,__lQ:null,__lK:null,__lM:null,__lG:null,__lH:null,__lO:null,getWindow:function(){return this.__lG;}
,getWindowId:function(){return this.__lH;}
,getHandler:function(U){var T=this.__lK[U.classname];if(T){return T;}
;return this.__lK[U.classname]=new U(this);}
,getDispatcher:function(W){var V=this.__lL[W.classname];if(V){return V;}
;return this.__lL[W.classname]=new W(this,this.__lI);}
,getListeners:function(Y,bd,X){var bb=Y.$$hash||qx.core.ObjectRegistry.toHashCode(Y);var be=this.__lJ[bb];if(!be){return null;}
;var bc=bd+(X?p:h);var ba=be[bc];return ba?ba.concat():null;}
,getAllListeners:function(){return this.__lJ;}
,serializeListeners:function(bg){var bk=bg.$$hash||qx.core.ObjectRegistry.toHashCode(bg);var bo=this.__lJ[bk];var bj=[];if(bo){var bh,bn,bf,bi,bl;for(var bm in bo){bh=bm.indexOf(H);bn=bm.substring(0,bh);bf=bm.charAt(bh+1)==G;bi=bo[bm];for(var i=0,l=bi.length;i<l;i++ ){bl=bi[i];bj.push({self:bl.context,handler:bl.handler,type:bn,capture:bf});}
;}
;}
;return bj;}
,toggleAttachedEvents:function(br,bq){var bu=br.$$hash||qx.core.ObjectRegistry.toHashCode(br);var bx=this.__lJ[bu];if(bx){var bs,bw,bp,bt;for(var bv in bx){bs=bv.indexOf(H);bw=bv.substring(0,bs);bp=bv.charCodeAt(bs+1)===99;bt=bx[bv];if(bq){this.__lR(br,bw,bp);}
else {this.__lS(br,bw,bp);}
;}
;}
;}
,hasListener:function(bz,bD,by){if(qx.core.Environment.get(n)){if(bz==null){qx.log.Logger.trace(this);throw new Error(M+bz);}
;}
;var bB=bz.$$hash||qx.core.ObjectRegistry.toHashCode(bz);var bE=this.__lJ[bB];if(!bE){return false;}
;var bC=bD+(by?p:h);var bA=bE[bC];return !!(bA&&bA.length>0);}
,importListeners:function(bF,bH){if(qx.core.Environment.get(n)){if(bF==null){qx.log.Logger.trace(this);throw new Error(M+bF);}
;}
;var bM=bF.$$hash||qx.core.ObjectRegistry.toHashCode(bF);var bN=this.__lJ[bM]={};var bJ=qx.event.Manager;for(var bG in bH){var bK=bH[bG];var bL=bK.type+(bK.capture?p:h);var bI=bN[bL];if(!bI){bI=bN[bL]=[];this.__lR(bF,bK.type,bK.capture);}
;bI.push({handler:bK.listener,context:bK.self,unique:bK.unique||(bJ.__lP++ )+w});}
;}
,addListener:function(bQ,bX,bS,self,bO){if(qx.core.Environment.get(n)){var bU=e+bX+g+C+bQ.classname+b;qx.core.Assert.assertObject(bQ,bU+N);qx.core.Assert.assertString(bX,bU+j);qx.core.Assert.assertFunction(bS,bU+r);if(bO!==undefined){qx.core.Assert.assertBoolean(bO,d);}
;}
;var bP=bQ.$$hash||qx.core.ObjectRegistry.toHashCode(bQ);var bY=this.__lJ[bP];if(!bY){bY=this.__lJ[bP]={};}
;var bT=bX+(bO?p:h);var bR=bY[bT];if(!bR){bR=bY[bT]=[];}
;if(bR.length===0){this.__lR(bQ,bX,bO);}
;var bW=(qx.event.Manager.__lP++ )+w;var bV={handler:bS,context:self,unique:bW};bR.push(bV);return bT+H+bW;}
,findHandler:function(ce,cn){var cl=false,cd=false,co=false,ca=false;var ck;if(ce.nodeType===1){cl=true;ck=y+ce.tagName.toLowerCase()+x+cn;}
else if(ce.nodeType===9){ca=true;ck=L+cn;}
else if(ce==this.__lG){cd=true;ck=O+cn;}
else if(ce.classname){co=true;ck=B+ce.classname+x+cn;}
else {ck=f+ce+x+cn;}
;var cc=this.__lM;if(cc[ck]){return cc[ck];}
;var cj=this.__lI.getHandlers();var cf=qx.event.IEventHandler;var ch,ci,cg,cb;for(var i=0,l=cj.length;i<l;i++ ){ch=cj[i];cg=ch.SUPPORTED_TYPES;if(cg&&!cg[cn]){continue;}
;cb=ch.TARGET_CHECK;if(cb){var cm=false;if(cl&&((cb&cf.TARGET_DOMNODE)!=0)){cm=true;}
else if(cd&&((cb&cf.TARGET_WINDOW)!=0)){cm=true;}
else if(co&&((cb&cf.TARGET_OBJECT)!=0)){cm=true;}
else if(ca&&((cb&cf.TARGET_DOCUMENT)!=0)){cm=true;}
;if(!cm){continue;}
;}
;ci=this.getHandler(cj[i]);if(ch.IGNORE_CAN_HANDLE||ci.canHandleEvent(ce,cn)){cc[ck]=ci;return ci;}
;}
;return null;}
,__lR:function(cs,cr,cp){var cq=this.findHandler(cs,cr);if(cq){cq.registerEvent(cs,cr,cp);return;}
;if(qx.core.Environment.get(n)){qx.log.Logger.warn(this,k+cr+t+cs+u);}
;}
,removeListener:function(cv,cB,cx,self,ct){if(qx.core.Environment.get(n)){var cz=D+cB+g+m+cv.classname+b;qx.core.Assert.assertObject(cv,cz+N);qx.core.Assert.assertString(cB,cz+j);qx.core.Assert.assertFunction(cx,cz+r);if(self!==undefined){qx.core.Assert.assertObject(self,c);}
;if(ct!==undefined){qx.core.Assert.assertBoolean(ct,d);}
;}
;var cu=cv.$$hash||qx.core.ObjectRegistry.toHashCode(cv);var cC=this.__lJ[cu];if(!cC){return false;}
;var cy=cB+(ct?p:h);var cw=cC[cy];if(!cw){return false;}
;var cA;for(var i=0,l=cw.length;i<l;i++ ){cA=cw[i];if(cA.handler===cx&&cA.context===self){qx.lang.Array.removeAt(cw,i);this.__lT(cA.unique);if(cw.length==0){this.__lS(cv,cB,ct);}
;return true;}
;}
;return false;}
,removeListenerById:function(cF,cN){if(qx.core.Environment.get(n)){var cJ=a+cN+g+m+cF.classname+b;qx.core.Assert.assertObject(cF,cJ+N);qx.core.Assert.assertString(cN,cJ+F);}
;var cH=cN.split(H);var cM=cH[0];var cD=cH[1].charCodeAt(0)==99;var cL=cH[2];var cE=cF.$$hash||qx.core.ObjectRegistry.toHashCode(cF);var cO=this.__lJ[cE];if(!cO){return false;}
;var cI=cM+(cD?p:h);var cG=cO[cI];if(!cG){return false;}
;var cK;for(var i=0,l=cG.length;i<l;i++ ){cK=cG[i];if(cK.unique===cL){qx.lang.Array.removeAt(cG,i);this.__lT(cK.unique);if(cG.length==0){this.__lS(cF,cM,cD);}
;return true;}
;}
;return false;}
,removeAllListeners:function(cQ){var cS=cQ.$$hash||qx.core.ObjectRegistry.toHashCode(cQ);var cV=this.__lJ[cS];if(!cV){return false;}
;var cR,cU,cP;for(var cT in cV){if(cV[cT].length>0){cR=cT.split(H);cV[cT].forEach(function(cW){this.__lT(cW.unique);}
,this);cU=cR[0];cP=cR[1]===o;this.__lS(cQ,cU,cP);}
;}
;delete this.__lJ[cS];return true;}
,deleteAllListeners:function(cX){delete this.__lJ[cX];}
,__lS:function(dc,db,cY){var da=this.findHandler(dc,db);if(da){da.unregisterEvent(dc,db,cY);return;}
;if(qx.core.Environment.get(n)){qx.log.Logger.warn(this,k+db+t+dc+u);}
;}
,dispatchEvent:function(de,event){if(qx.core.Environment.get(n)){var di=v+event+t+de.classname+b;qx.core.Assert.assertNotUndefined(de,di+z);qx.core.Assert.assertNotNull(de,di+z);qx.core.Assert.assertInstance(event,qx.event.type.Event,di+P);}
;var dj=event.getType();if(!event.getBubbles()&&!this.hasListener(de,dj)){qx.event.Pool.getInstance().poolObject(event);return true;}
;if(!event.getTarget()){event.setTarget(de);}
;var dh=this.__lI.getDispatchers();var dg;var dd=false;for(var i=0,l=dh.length;i<l;i++ ){dg=this.getDispatcher(dh[i]);if(dg.canDispatchEvent(de,event,dj)){dg.dispatchEvent(de,event,dj);dd=true;break;}
;}
;if(!dd){if(qx.core.Environment.get(n)){qx.log.Logger.error(this,A+dj+E+de);}
;return true;}
;var df=event.getDefaultPrevented();qx.event.Pool.getInstance().poolObject(event);return !df;}
,dispose:function(){this.__lI.removeManager(this);qx.util.DisposeUtil.disposeMap(this,q);qx.util.DisposeUtil.disposeMap(this,I);this.__lJ=this.__lG=this.__lQ=null;this.__lI=this.__lM=null;}
,__lT:function(dk){if(this.__lO===null){this.__lO={};this.__lN.schedule();}
;this.__lO[dk]=true;}
,isBlacklisted:function(dl){return (this.__lO!==null&&this.__lO[dl]===true);}
}});}
)();
(function(){var c="Create event of type ",d="Invalid event dispatcher!",e="': ",f="Invalid event handler.",g="qx.debug",h=" with undefined class. Please use null to explicit fallback to default event type!",i="' on target '",j="Invalid event target.",k="Could not fire event '",l="qx.event.Registration.getManager(null) was called!",m="undefined",n="qx.event.Registration";qx.Class.define(n,{statics:{__lY:{},getManager:function(q){if(q==null){if(qx.core.Environment.get(g)){qx.log.Logger.error(l);qx.log.Logger.trace(this);}
;q=window;}
else if(q.nodeType){q=qx.dom.Node.getWindow(q);}
else if(!qx.dom.Node.isWindow(q)){q=window;}
;var p=q.$$hash||qx.core.ObjectRegistry.toHashCode(q);var o=this.__lY[p];if(!o){o=new qx.event.Manager(q,this);this.__lY[p]=o;}
;return o;}
,removeManager:function(r){var s=r.getWindowId();delete this.__lY[s];}
,addListener:function(w,v,t,self,u){return this.getManager(w).addListener(w,v,t,self,u);}
,removeListener:function(A,z,x,self,y){return this.getManager(A).removeListener(A,z,x,self,y);}
,removeListenerById:function(B,C){return this.getManager(B).removeListenerById(B,C);}
,removeAllListeners:function(D){return this.getManager(D).removeAllListeners(D);}
,deleteAllListeners:function(F){var E=F.$$hash;if(E){this.getManager(F).deleteAllListeners(E);}
;}
,hasListener:function(I,H,G){return this.getManager(I).hasListener(I,H,G);}
,serializeListeners:function(J){return this.getManager(J).serializeListeners(J);}
,createEvent:function(K,N,L){if(qx.core.Environment.get(g)){if(arguments.length>1&&N===undefined){throw new Error(c+K+h);}
;}
;if(N==null){N=qx.event.type.Event;}
;var M=qx.event.Pool.getInstance().getObject(N);L?M.init.apply(M,L):M.init();if(K){M.setType(K);}
;return M;}
,dispatchEvent:function(O,event){return this.getManager(O).dispatchEvent(O,event);}
,fireEvent:function(P,U,S,R){if(qx.core.Environment.get(g)){if(arguments.length>2&&S===undefined&&R!==undefined){throw new Error(c+U+h);}
;var T=k+U+i+(P?P.classname:m)+e;qx.core.Assert.assertNotUndefined(P,T+j);qx.core.Assert.assertNotNull(P,T+j);}
;var Q=this.createEvent(U,S||null,R);return this.getManager(P).dispatchEvent(P,Q);}
,fireNonBubblingEvent:function(V,bb,Y,X){if(qx.core.Environment.get(g)){if(arguments.length>2&&Y===undefined&&X!==undefined){throw new Error(c+bb+h);}
;}
;var ba=this.getManager(V);if(!ba.hasListener(V,bb,false)){return true;}
;var W=this.createEvent(bb,Y||null,X);return ba.dispatchEvent(V,W);}
,PRIORITY_FIRST:-32000,PRIORITY_NORMAL:0,PRIORITY_LAST:32000,__lK:[],addHandler:function(bc){if(qx.core.Environment.get(g)){qx.core.Assert.assertInterface(bc,qx.event.IEventHandler,f);}
;this.__lK.push(bc);this.__lK.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getHandlers:function(){return this.__lK;}
,__lL:[],addDispatcher:function(be,bd){if(qx.core.Environment.get(g)){qx.core.Assert.assertInterface(be,qx.event.IEventDispatcher,d);}
;this.__lL.push(be);this.__lL.sort(function(a,b){return a.PRIORITY-b.PRIORITY;}
);}
,getDispatchers:function(){return this.__lL;}
}});}
)();
(function(){var a="qx.core.MEvent";qx.Mixin.define(a,{members:{__ma:qx.event.Registration,addListener:function(d,b,self,c){if(!this.$$disposed){return this.__ma.addListener(this,d,b,self,c);}
;return null;}
,addListenerOnce:function(h,f,self,g){var i=function(e){this.removeListener(h,f,this,g);f.call(self||this,e);}
;if(!f.$$wrapped_callback){f.$$wrapped_callback={};}
;f.$$wrapped_callback[h+this.$$hash]=i;return this.addListener(h,i,this,g);}
,removeListener:function(l,j,self,k){if(!this.$$disposed){if(j.$$wrapped_callback&&j.$$wrapped_callback[l+this.$$hash]){var m=j.$$wrapped_callback[l+this.$$hash];delete j.$$wrapped_callback[l+this.$$hash];j=m;}
;return this.__ma.removeListener(this,l,j,self,k);}
;return false;}
,removeListenerById:function(n){if(!this.$$disposed){return this.__ma.removeListenerById(this,n);}
;return false;}
,hasListener:function(p,o){return this.__ma.hasListener(this,p,o);}
,dispatchEvent:function(q){if(!this.$$disposed){return this.__ma.dispatchEvent(this,q);}
;return true;}
,fireEvent:function(s,t,r){if(!this.$$disposed){return this.__ma.fireEvent(this,s,t,r);}
;return true;}
,fireNonBubblingEvent:function(v,w,u){if(!this.$$disposed){return this.__ma.fireNonBubblingEvent(this,v,w,u);}
;return true;}
,fireDataEvent:function(z,A,x,y){if(!this.$$disposed){if(x===undefined){x=null;}
;return this.__ma.fireNonBubblingEvent(this,z,qx.event.type.Data,[A,x,!!y]);}
;return true;}
}});}
)();
(function(){var a="qx.event.IEventDispatcher";qx.Interface.define(a,{members:{canDispatchEvent:function(c,event,b){this.assertInstance(event,qx.event.type.Event);this.assertString(b);}
,dispatchEvent:function(e,event,d){this.assertInstance(event,qx.event.type.Event);this.assertString(d);}
}});}
)();
(function(){var a="qx.core.MProperty",b="get",c="reset",d="No such property: ",e="set";qx.Mixin.define(a,{members:{set:function(g,h){var f=qx.core.Property.$$method.set;if(qx.Bootstrap.isString(g)){if(!this[f[g]]){if(this[e+qx.Bootstrap.firstUp(g)]!=undefined){this[e+qx.Bootstrap.firstUp(g)](h);return this;}
;throw new Error(d+g);}
;return this[f[g]](h);}
else {for(var i in g){if(!this[f[i]]){if(this[e+qx.Bootstrap.firstUp(i)]!=undefined){this[e+qx.Bootstrap.firstUp(i)](g[i]);continue;}
;throw new Error(d+i);}
;this[f[i]](g[i]);}
;return this;}
;}
,get:function(k){var j=qx.core.Property.$$method.get;if(!this[j[k]]){if(this[b+qx.Bootstrap.firstUp(k)]!=undefined){return this[b+qx.Bootstrap.firstUp(k)]();}
;throw new Error(d+k);}
;return this[j[k]]();}
,reset:function(m){var l=qx.core.Property.$$method.reset;if(!this[l[m]]){if(this[c+qx.Bootstrap.firstUp(m)]!=undefined){this[c+qx.Bootstrap.firstUp(m)]();return;}
;throw new Error(d+m);}
;this[l[m]]();}
}});}
)();
(function(){var a="qx.core.MAssert";qx.Mixin.define(a,{members:{assert:function(c,b){qx.core.Assert.assert(c,b);}
,fail:function(d,e){qx.core.Assert.fail(d,e);}
,assertTrue:function(g,f){qx.core.Assert.assertTrue(g,f);}
,assertFalse:function(i,h){qx.core.Assert.assertFalse(i,h);}
,assertEquals:function(j,k,l){qx.core.Assert.assertEquals(j,k,l);}
,assertNotEquals:function(m,n,o){qx.core.Assert.assertNotEquals(m,n,o);}
,assertIdentical:function(p,q,r){qx.core.Assert.assertIdentical(p,q,r);}
,assertNotIdentical:function(s,t,u){qx.core.Assert.assertNotIdentical(s,t,u);}
,assertNotUndefined:function(w,v){qx.core.Assert.assertNotUndefined(w,v);}
,assertUndefined:function(y,x){qx.core.Assert.assertUndefined(y,x);}
,assertNotNull:function(A,z){qx.core.Assert.assertNotNull(A,z);}
,assertNull:function(C,B){qx.core.Assert.assertNull(C,B);}
,assertJsonEquals:function(D,E,F){qx.core.Assert.assertJsonEquals(D,E,F);}
,assertMatch:function(I,H,G){qx.core.Assert.assertMatch(I,H,G);}
,assertArgumentsCount:function(L,K,M,J){qx.core.Assert.assertArgumentsCount(L,K,M,J);}
,assertEventFired:function(P,event,Q,N,O){qx.core.Assert.assertEventFired(P,event,Q,N,O);}
,assertEventNotFired:function(T,event,R,S){qx.core.Assert.assertEventNotFired(T,event,R,S);}
,assertException:function(V,W,X,U){qx.core.Assert.assertException(V,W,X,U);}
,assertInArray:function(bb,ba,Y){qx.core.Assert.assertInArray(bb,ba,Y);}
,assertArrayEquals:function(bc,bd,be){qx.core.Assert.assertArrayEquals(bc,bd,be);}
,assertKeyInMap:function(bh,bg,bf){qx.core.Assert.assertKeyInMap(bh,bg,bf);}
,assertFunction:function(bj,bi){qx.core.Assert.assertFunction(bj,bi);}
,assertString:function(bl,bk){qx.core.Assert.assertString(bl,bk);}
,assertBoolean:function(bn,bm){qx.core.Assert.assertBoolean(bn,bm);}
,assertNumber:function(bp,bo){qx.core.Assert.assertNumber(bp,bo);}
,assertPositiveNumber:function(br,bq){qx.core.Assert.assertPositiveNumber(br,bq);}
,assertInteger:function(bt,bs){qx.core.Assert.assertInteger(bt,bs);}
,assertPositiveInteger:function(bv,bu){qx.core.Assert.assertPositiveInteger(bv,bu);}
,assertInRange:function(by,bz,bx,bw){qx.core.Assert.assertInRange(by,bz,bx,bw);}
,assertObject:function(bB,bA){qx.core.Assert.assertObject(bB,bA);}
,assertArray:function(bD,bC){qx.core.Assert.assertArray(bD,bC);}
,assertMap:function(bF,bE){qx.core.Assert.assertMap(bF,bE);}
,assertRegExp:function(bH,bG){qx.core.Assert.assertRegExp(bH,bG);}
,assertType:function(bK,bJ,bI){qx.core.Assert.assertType(bK,bJ,bI);}
,assertInstance:function(bM,bN,bL){qx.core.Assert.assertInstance(bM,bN,bL);}
,assertInterface:function(bQ,bP,bO){qx.core.Assert.assertInterface(bQ,bP,bO);}
,assertCssColor:function(bR,bT,bS){qx.core.Assert.assertCssColor(bR,bT,bS);}
,assertElement:function(bV,bU){qx.core.Assert.assertElement(bV,bU);}
,assertQxObject:function(bX,bW){qx.core.Assert.assertQxObject(bX,bW);}
,assertQxWidget:function(ca,bY){qx.core.Assert.assertQxWidget(ca,bY);}
}});}
)();
(function(){var a="module.events",b="Cloning only possible with properties.",c="qx.core.Object",d="]: ",e="module.property",f="qx.debug",g="Disposing ",h="qx.debug.dispose.level",j="]",k="Cannot call super class. Method is not derived: ",m="' in ",n="[",o="Missing destruct definition for '",p="object",q="Object";qx.Class.define(c,{extend:Object,include:qx.core.Environment.filter({"module.databinding":qx.data.MBinding,"module.logger":qx.core.MLogging,"module.events":qx.core.MEvent,"module.property":qx.core.MProperty,"qx.debug":qx.core.MAssert}),construct:function(){qx.core.ObjectRegistry.register(this);}
,statics:{$$type:q},members:{__iT:qx.core.Environment.get(e)?qx.core.Property:null,toHashCode:function(){return this.$$hash;}
,toString:function(){return this.classname+n+this.$$hash+j;}
,base:function(r,s){if(qx.core.Environment.get(f)){if(!qx.Bootstrap.isFunction(r.callee.base)){throw new Error(k+r.callee.displayName);}
;}
;if(arguments.length===1){return r.callee.base.call(this);}
else {return r.callee.base.apply(this,Array.prototype.slice.call(arguments,1));}
;}
,self:function(t){return t.callee.self;}
,clone:function(){if(!qx.core.Environment.get(e)){throw new Error(b);}
;var v=this.constructor;var u=new v;var x=qx.Class.getProperties(v);var w=this.__iT.$$store.user;var y=this.__iT.$$method.set;var name;for(var i=0,l=x.length;i<l;i++ ){name=x[i];if(this.hasOwnProperty(w[name])){u[y[name]](this[w[name]]);}
;}
;return u;}
,__mM:null,setUserData:function(z,A){if(!this.__mM){this.__mM={};}
;this.__mM[z]=A;}
,getUserData:function(C){if(!this.__mM){return null;}
;var B=this.__mM[C];return B===undefined?null:B;}
,isDisposed:function(){return this.$$disposed||false;}
,isDisposing:function(){return this.$$disposing||false;}
,dispose:function(){if(this.$$disposed){return;}
;this.$$disposed=true;this.$$disposing=true;this.$$instance=null;this.$$allowconstruct=null;if(qx.core.Environment.get(f)){if(qx.core.Environment.get(h)>2){qx.Bootstrap.debug(this,g+this.classname+n+this.toHashCode()+j);}
;}
;var F=this.constructor;var D;while(F.superclass){if(F.$$destructor){F.$$destructor.call(this);}
;if(F.$$includes){D=F.$$flatIncludes;for(var i=0,l=D.length;i<l;i++ ){if(D[i].$$destructor){D[i].$$destructor.call(this);}
;}
;}
;F=F.superclass;}
;this.$$disposing=false;if(qx.core.Environment.get(f)){if(qx.core.Environment.get(h)>0){var G,E;for(G in this){E=this[G];if(E!==null&&typeof E===p&&!(qx.Bootstrap.isString(E))){if(this.constructor.prototype[G]!=null){continue;}
;if(qx.core.Environment.get(h)>1){qx.Bootstrap.warn(this,o+G+m+this.classname+n+this.toHashCode()+d+E);delete this[G];}
;}
;}
;}
;}
;}
,_disposeObjects:function(H){qx.util.DisposeUtil.disposeObjects(this,arguments);}
,_disposeSingletonObjects:function(I){qx.util.DisposeUtil.disposeObjects(this,arguments,true);}
,_disposeArray:function(J){qx.util.DisposeUtil.disposeArray(this,J);}
,_disposeMap:function(K){qx.util.DisposeUtil.disposeMap(this,K);}
},environment:{"qx.debug.dispose.level":0},destruct:function(){if(qx.core.Environment.get(a)){if(!qx.core.ObjectRegistry.inShutDown){qx.event.Registration.removeAllListeners(this);}
else {qx.event.Registration.deleteAllListeners(this);}
;}
;qx.core.ObjectRegistry.unregister(this);this.__mM=null;if(qx.core.Environment.get(e)){var N=this.constructor;var R;var S=this.__iT.$$store;var P=S.user;var Q=S.theme;var L=S.inherit;var O=S.useinit;var M=S.init;while(N){R=N.$$properties;if(R){for(var name in R){if(R[name].dereference){this[P[name]]=this[Q[name]]=this[L[name]]=this[O[name]]=this[M[name]]=undefined;}
;}
;}
;N=N.superclass;}
;}
;}
});}
)();
(function(){var a=" is a singleton! Please use disposeSingleton instead.",b="undefined",c="qx.debug",d="qx.ui.container.SlideBar or qx.ui.container.Stack!",e="qx.util.DisposeUtil",f=" of object: ",g="Container must be an instance of qx.ui.mobile.container.Composite.",h="!",j=" has non disposable entries: ",k="The map field: ",m="First argument must be a container widget!",n="qx.ui.container.Scroll or qx.ui.container.Resizer or ",o="The array field: ",p="Container must be an instance of qx.ui.container.Composite or ",q="The object stored in key ",r="Has no disposable object under key: ";qx.Class.define(e,{statics:{disposeObjects:function(t,s,u){var name;for(var i=0,l=s.length;i<l;i++ ){name=s[i];if(t[name]==null||!t.hasOwnProperty(name)){continue;}
;if(!qx.core.ObjectRegistry.inShutDown){if(t[name].dispose){if(!u&&t[name].constructor.$$instance){throw new Error(q+name+a);}
else {t[name].dispose();}
;}
else {throw new Error(r+name+h);}
;}
;t[name]=null;}
;}
,disposeArray:function(w,v){var x=w[v];if(!x){return;}
;if(qx.core.ObjectRegistry.inShutDown){w[v]=null;return;}
;try{var y;for(var i=x.length-1;i>=0;i-- ){y=x[i];if(y){y.dispose();}
;}
;}
catch(z){throw new Error(o+v+f+w+j+z);}
;x.length=0;w[v]=null;}
,disposeMap:function(B,A){var C=B[A];if(!C){return;}
;if(qx.core.ObjectRegistry.inShutDown){B[A]=null;return;}
;try{var E;for(var D in C){E=C[D];if(C.hasOwnProperty(D)&&E){E.dispose();}
;}
;}
catch(F){throw new Error(k+A+f+B+j+F);}
;B[A]=null;}
,disposeTriggeredBy:function(G,I){var H=I.dispose;I.dispose=function(){H.call(I);G.dispose();}
;}
,destroyContainer:function(K){if(qx.core.Environment.get(c)){if(qx.ui.mobile&&K instanceof qx.ui.mobile.core.Widget){qx.core.Assert.assertTrue(this.__mN(K),g);}
else {qx.core.Assert.assertQxWidget(K,m);qx.core.Assert.assertTrue(this.__mN(K),p+n+d);}
;}
;var J=[];this._collectContainerChildren(K,J);var L=J.length;for(var i=L-1;i>=0;i-- ){J[i].destroy();}
;K.destroy();}
,_collectContainerChildren:function(O,N){var P=O.getChildren();for(var i=0;i<P.length;i++ ){var M=P[i];N.push(M);if(this.__mN(M)){this._collectContainerChildren(M,N);}
;}
;}
,__mN:function(R){var Q=[];if(qx.ui.mobile&&R instanceof qx.ui.mobile.core.Widget){Q=[qx.ui.mobile.container.Composite];}
else {Q=[qx.ui.container.Composite,qx.ui.container.Scroll,qx.ui.container.SlideBar,qx.ui.container.Stack];}
;for(var i=0,l=Q.length;i<l;i++ ){if(typeof Q[i]!==b&&qx.Class.isSubClassOf(R.constructor,Q[i])){return true;}
;}
;return false;}
}});}
)();
(function(){var a="Cannot stop propagation on a non bubbling event: ",b="qx.debug",c="Invalid argument value 'cancelable'.",d="Cannot prevent default action on a non cancelable event: ",e="Invalid argument value 'canBubble'.",f="qx.event.type.Event";qx.Class.define(f,{extend:qx.core.Object,statics:{CAPTURING_PHASE:1,AT_TARGET:2,BUBBLING_PHASE:3},members:{init:function(h,g){if(qx.core.Environment.get(b)){if(h!==undefined){qx.core.Assert.assertBoolean(h,e);}
;if(g!==undefined){qx.core.Assert.assertBoolean(g,c);}
;}
;this._type=null;this._target=null;this._currentTarget=null;this._relatedTarget=null;this._originalTarget=null;this._stopPropagation=false;this._preventDefault=false;this._bubbles=!!h;this._cancelable=!!g;this._timeStamp=(new Date()).getTime();this._eventPhase=null;return this;}
,clone:function(i){if(i){var j=i;}
else {var j=qx.event.Pool.getInstance().getObject(this.constructor);}
;j._type=this._type;j._target=this._target;j._currentTarget=this._currentTarget;j._relatedTarget=this._relatedTarget;j._originalTarget=this._originalTarget;j._stopPropagation=this._stopPropagation;j._bubbles=this._bubbles;j._preventDefault=this._preventDefault;j._cancelable=this._cancelable;return j;}
,stop:function(){if(this._bubbles){this.stopPropagation();}
;if(this._cancelable){this.preventDefault();}
;}
,stopPropagation:function(){if(qx.core.Environment.get(b)){this.assertTrue(this._bubbles,a+this.getType());}
;this._stopPropagation=true;}
,getPropagationStopped:function(){return !!this._stopPropagation;}
,preventDefault:function(){if(qx.core.Environment.get(b)){this.assertTrue(this._cancelable,d+this.getType());}
;this._preventDefault=true;}
,getDefaultPrevented:function(){return !!this._preventDefault;}
,getType:function(){return this._type;}
,setType:function(k){this._type=k;}
,getEventPhase:function(){return this._eventPhase;}
,setEventPhase:function(l){this._eventPhase=l;}
,getTimeStamp:function(){return this._timeStamp;}
,getTarget:function(){return this._target;}
,setTarget:function(m){this._target=m;}
,getCurrentTarget:function(){return this._currentTarget||this._target;}
,setCurrentTarget:function(n){this._currentTarget=n;}
,getRelatedTarget:function(){return this._relatedTarget;}
,setRelatedTarget:function(o){this._relatedTarget=o;}
,getOriginalTarget:function(){return this._originalTarget;}
,setOriginalTarget:function(p){this._originalTarget=p;}
,getBubbles:function(){return this._bubbles;}
,setBubbles:function(q){this._bubbles=q;}
,isCancelable:function(){return this._cancelable;}
,setCancelable:function(r){this._cancelable=r;}
},destruct:function(){this._target=this._currentTarget=this._relatedTarget=this._originalTarget=null;}
});}
)();
(function(){var a="qx.util.ObjectPool",b="Class needs to be defined!",c="Object is already pooled: ",d="Integer";qx.Class.define(a,{extend:qx.core.Object,construct:function(e){qx.core.Object.call(this);this.__nk={};if(e!=null){this.setSize(e);}
;}
,properties:{size:{check:d,init:Infinity}},members:{__nk:null,getObject:function(h){if(this.$$disposed){return new h;}
;if(!h){throw new Error(b);}
;var f=null;var g=this.__nk[h.classname];if(g){f=g.pop();}
;if(f){f.$$pooled=false;}
else {f=new h;}
;return f;}
,poolObject:function(k){if(!this.__nk){return;}
;var j=k.classname;var m=this.__nk[j];if(k.$$pooled){throw new Error(c+k);}
;if(!m){this.__nk[j]=m=[];}
;if(m.length>this.getSize()){if(k.destroy){k.destroy();}
else {k.dispose();}
;return;}
;k.$$pooled=true;m.push(k);}
},destruct:function(){var p=this.__nk;var n,o,i,l;for(n in p){o=p[n];for(i=0,l=o.length;i<l;i++ ){o[i].dispose();}
;}
;delete this.__nk;}
});}
)();
(function(){var a="singleton",b="qx.event.Pool";qx.Class.define(b,{extend:qx.util.ObjectPool,type:a,construct:function(){qx.util.ObjectPool.call(this,30);}
});}
)();
(function(){var a="' declared in the class '",b="'",c="' but found '",d="The context object '",e=" is not an available class': ",f="qx.debug",g="Expected event type to be instanceof '",h="' for the event '",j="' of '",k="The event type '",m="'is already disposed.",n="qx.event.dispatch.Direct";qx.Class.define(n,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,construct:function(o){this._manager=o;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST},members:{canDispatchEvent:function(q,event,p){return !event.getBubbles();}
,dispatchEvent:function(r,event,w){if(qx.core.Environment.get(f)){if(r instanceof qx.core.Object){var v=qx.Class.getEventType(r.constructor,w);var s=qx.Class.getByName(v);if(!s){this.error(k+w+a+r.constructor+e+v);}
else if(!(event instanceof s)){this.error(g+v+c+event.classname+b);}
;}
;}
;event.setEventPhase(qx.event.type.Event.AT_TARGET);var t=this._manager.getListeners(r,w,false);if(t){for(var i=0,l=t.length;i<l;i++ ){var u=t[i].context||r;if(qx.core.Environment.get(f)){if(u&&u.isDisposed&&u.isDisposed()&&!u.isDisposing()){this.warn(d+u+h+w+j+r+m);}
;}
;if(!this._manager.isBlacklisted(t[i].unique)){t[i].handler.call(u,event);}
;}
;}
;}
},defer:function(x){qx.event.Registration.addDispatcher(x);}
});}
)();
(function(){var a="qx.event.IEventHandler";qx.Interface.define(a,{statics:{TARGET_DOMNODE:1,TARGET_WINDOW:2,TARGET_OBJECT:4,TARGET_DOCUMENT:8},members:{canHandleEvent:function(c,b){}
,registerEvent:function(f,e,d){}
,unregisterEvent:function(i,h,g){}
}});}
)();
(function(){var a="qx.event.handler.Object";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_LAST,SUPPORTED_TYPES:null,TARGET_CHECK:qx.event.IEventHandler.TARGET_OBJECT,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(c,b){return qx.Class.supportsEvent(c.constructor,b);}
,registerEvent:function(f,e,d){}
,unregisterEvent:function(i,h,g){}
},defer:function(j){qx.event.Registration.addHandler(j);}
});}
)();
(function(){var a="qx.event.type.Data";qx.Class.define(a,{extend:qx.event.type.Event,members:{__iR:null,__nl:null,init:function(c,d,b){qx.event.type.Event.prototype.init.call(this,false,b);this.__iR=c;this.__nl=d;return this;}
,clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);f.__iR=this.__iR;f.__nl=this.__nl;return f;}
,getData:function(){return this.__iR;}
,getOldData:function(){return this.__nl;}
},destruct:function(){this.__iR=this.__nl=null;}
});}
)();
(function(){var a="qx.util.DeferredCallManager",b="singleton";qx.Class.define(a,{extend:qx.core.Object,type:b,construct:function(){this.__nq={};this.__nr=qx.lang.Function.bind(this.__nv,this);this.__ns=false;}
,members:{__nt:null,__nu:null,__nq:null,__ns:null,__nr:null,schedule:function(d){if(this.__nt==null){this.__nt=window.setTimeout(this.__nr,0);}
;var c=d.toHashCode();if(this.__nu&&this.__nu[c]){return;}
;this.__nq[c]=d;this.__ns=true;}
,refreshTimeout:function(){if(this.__nt!==null){this.__nt=window.setTimeout(this.__nr,0);}
;}
,cancel:function(f){var e=f.toHashCode();if(this.__nu&&this.__nu[e]){this.__nu[e]=null;return;}
;delete this.__nq[e];if(qx.lang.Object.isEmpty(this.__nq)&&this.__nt!=null){window.clearTimeout(this.__nt);this.__nt=null;}
;}
,__nv:qx.event.GlobalError.observeMethod(function(){this.__nt=null;while(this.__ns){this.__nu=qx.lang.Object.clone(this.__nq);this.__nq={};this.__ns=false;for(var h in this.__nu){var g=this.__nu[h];if(g){this.__nu[h]=null;g.call();}
;}
;}
;this.__nu=null;}
)},destruct:function(){if(this.__nt!=null){window.clearTimeout(this.__nt);}
;this.__nr=this.__nq=null;}
});}
)();
(function(){var a='[object Boolean]',b="function",c='constructor',d='[object Date]',e="Invalid argument 'array'",f="qx.debug",g='[object Number]',h="Invalid argument 'map'",j='[object Array]',k=" at array index ",m="Could not convert complex objects like ",n='object',o="qx.lang.Object",p='[object String]',q='[object RegExp]',r="undefined",s=" to map syntax",t="object";qx.Bootstrap.define(o,{statics:{empty:function(u){if(qx.core.Environment.get(f)){qx.core.Assert&&qx.core.Assert.assertMap(u,h);}
;for(var v in u){if(u.hasOwnProperty(v)){delete u[v];}
;}
;}
,isEmpty:function(w){if(qx.core.Environment.get(f)){qx.core.Assert&&qx.core.Assert.assertMap(w,h);}
;for(var x in w){return false;}
;return true;}
,getLength:qx.Bootstrap.objectGetLength,getValues:function(z){if(qx.core.Environment.get(f)){qx.core.Assert&&qx.core.Assert.assertMap(z,h);}
;var A=[];var y=Object.keys(z);for(var i=0,l=y.length;i<l;i++ ){A.push(z[y[i]]);}
;return A;}
,mergeWith:qx.Bootstrap.objectMergeWith,clone:function(B,E){if(qx.lang.Type.isObject(B)){var C={};for(var D in B){if(E){C[D]=qx.lang.Object.clone(B[D],E);}
else {C[D]=B[D];}
;}
;return C;}
else if(qx.lang.Type.isArray(B)){var C=[];for(var i=0;i<B.length;i++ ){if(E){C[i]=qx.lang.Object.clone(B[i],E);}
else {C[i]=B[i];}
;}
;return C;}
;return B;}
,equals:function(F,G){return qx.lang.Object.__nx(F,G,[],[]);}
,__nx:function(N,J,H,I){if(N===J){return N!==0||1/N==1/J;}
;if(N==null||J==null){return N===J;}
;var M=Object.prototype.toString.call(N);if(M!=Object.prototype.toString.call(J)){return false;}
;switch(M){case p:return N==String(J);case g:return N!=+N?J!=+J:(N==0?1/N==1/J:N==+J);case d:case a:return +N==+J;case q:return N.source==J.source&&N.global==J.global&&N.multiline==J.multiline&&N.ignoreCase==J.ignoreCase;};if(typeof N!=n||typeof J!=n){return false;}
;var length=H.length;while(length-- ){if(H[length]==N){return I[length]==J;}
;}
;var L=N.constructor,K=J.constructor;if(L!==K&&!(qx.Bootstrap.isFunction(L)&&(L instanceof L)&&qx.Bootstrap.isFunction(K)&&(K instanceof K))&&(c in N&&c in J)){return false;}
;H.push(N);I.push(J);var Q=0,O=true;if(M==j){Q=N.length;O=Q==J.length;if(O){while(Q-- ){if(!(O=qx.lang.Object.__nx(N[Q],J[Q],H,I))){break;}
;}
;}
;}
else {for(var P in N){if(Object.prototype.hasOwnProperty.call(N,P)){Q++ ;if(!(O=Object.prototype.hasOwnProperty.call(J,P)&&qx.lang.Object.__nx(N[P],J[P],H,I))){break;}
;}
;}
;if(O){for(P in J){if(Object.prototype.hasOwnProperty.call(J,P)&&!(Q-- )){break;}
;}
;O=!Q;}
;}
;H.pop();I.pop();return O;}
,invert:function(R){if(qx.core.Environment.get(f)){qx.core.Assert&&qx.core.Assert.assertMap(R,h);}
;var S={};for(var T in R){S[R[T].toString()]=T;}
;return S;}
,getKeyFromValue:function(U,V){if(qx.core.Environment.get(f)){qx.core.Assert&&qx.core.Assert.assertMap(U,h);}
;for(var W in U){if(U.hasOwnProperty(W)&&U[W]===V){return W;}
;}
;return null;}
,contains:function(X,Y){if(qx.core.Environment.get(f)){qx.core.Assert&&qx.core.Assert.assertMap(X,h);}
;return this.getKeyFromValue(X,Y)!==null;}
,fromArray:function(ba){if(qx.core.Environment.get(f)){qx.core.Assert&&qx.core.Assert.assertArray(ba,e);}
;var bb={};for(var i=0,l=ba.length;i<l;i++ ){if(qx.core.Environment.get(f)){switch(typeof ba[i]){case t:case b:case r:throw new Error(m+ba[i]+k+i+s);};}
;bb[ba[i].toString()]=true;}
;return bb;}
}});}
)();
(function(){var a="qx.util.DeferredCall",b="The context object '",c="qx.debug",d="'is already disposed.",e="' of the defered call '";qx.Class.define(a,{extend:qx.core.Object,construct:function(f,g){qx.core.Object.call(this);this.__ko=f;this.__kq=g||null;this.__ff=qx.util.DeferredCallManager.getInstance();}
,members:{__ko:null,__kq:null,__ff:null,cancel:function(){this.__ff.cancel(this);}
,schedule:function(){this.__ff.schedule(this);}
,call:function(){if(qx.core.Environment.get(c)){var h=this.__kq;if(h&&h.isDisposed&&h.isDisposed()){this.warn(b+h+e+this+d);}
;}
;this.__kq?this.__ko.apply(this.__kq):this.__ko();}
},destruct:function(){this.cancel();this.__kq=this.__ko=this.__ff=null;}
});}
)();
(function(){var a="To enable localization please include qx.locale.Manager into your build!",b="qx.locale.MTranslation";qx.Mixin.define(b,{members:{tr:function(c,e){var d=qx.locale.Manager;if(d){return d.tr.apply(d,arguments);}
;throw new Error(a);}
,trn:function(g,j,f,h){var i=qx.locale.Manager;if(i){return i.trn.apply(i,arguments);}
;throw new Error(a);}
,trc:function(n,m,l){var k=qx.locale.Manager;if(k){return k.trc.apply(k,arguments);}
;throw new Error(a);}
,trnc:function(p,q,r,o,s){var t=qx.locale.Manager;if(t){return t.trnc.apply(t,arguments);}
;throw new Error(a);}
,marktr:function(v){var u=qx.locale.Manager;if(u){return u.marktr.apply(u,arguments);}
;throw new Error(a);}
}});}
)();
(function(){var a="qx.application.IApplication";qx.Interface.define(a,{members:{main:function(){}
,finalize:function(){}
,close:function(){}
,terminate:function(){}
}});}
)();
(function(){var a="qx.core.BaseInit",b="engine.name",c="Main runtime: ",d="",f="qx.application",g="os.name",h="engine.version",i="Missing application class: ",j="Load runtime: ",k="ms",l="Could not detect engine!",m="Finalize runtime: ",n="Could not detect operating system!",o="Could not detect the version of the engine!";qx.Class.define(a,{statics:{__oA:null,getApplication:function(){return this.__oA||null;}
,ready:function(){if(this.__oA){return;}
;if(qx.core.Environment.get(b)==d){qx.log.Logger.warn(l);}
;if(qx.core.Environment.get(h)==d){qx.log.Logger.warn(o);}
;if(qx.core.Environment.get(g)==d){qx.log.Logger.warn(n);}
;qx.log.Logger.debug(this,j+(new Date-qx.Bootstrap.LOADSTART)+k);var q=qx.core.Environment.get(f);var r=qx.Class.getByName(q);if(r){this.__oA=new r;var p=new Date;this.__oA.main();qx.log.Logger.debug(this,c+(new Date-p)+k);var p=new Date;this.__oA.finalize();qx.log.Logger.debug(this,m+(new Date-p)+k);}
else {qx.log.Logger.warn(i+q);}
;}
,__oB:function(e){var s=this.__oA;if(s){s.close();}
;}
,__oC:function(){var t=this.__oA;if(t){t.terminate();}
;qx.core.ObjectRegistry.shutdown();}
}});}
)();
(function(){var a="qx.event.type.Native";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(b,e,f,d,c){qx.event.type.Event.prototype.init.call(this,d,c);this._target=e||qx.bom.Event.getTarget(b);this._relatedTarget=f||qx.bom.Event.getRelatedTarget(b);if(b.timeStamp){this._timeStamp=b.timeStamp;}
;this._native=b;this._returnValue=null;return this;}
,clone:function(g){var h=qx.event.type.Event.prototype.clone.call(this,g);var i={};h._native=this._cloneNativeEvent(this._native,i);h._returnValue=this._returnValue;return h;}
,_cloneNativeEvent:function(j,k){k.preventDefault=(function(){}
);return k;}
,preventDefault:function(){qx.event.type.Event.prototype.preventDefault.call(this);qx.bom.Event.preventDefault(this._native);}
,getNativeEvent:function(){return this._native;}
,setReturnValue:function(l){this._returnValue=l;}
,getReturnValue:function(){return this._returnValue;}
},destruct:function(){this._native=this._returnValue=null;}
});}
)();
(function(){var a="qx.globalErrorHandling",b="qx.event.handler.Window";qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(c){qx.core.Object.call(this);this._manager=c;this._window=c.getWindow();this._initWindowObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{error:1,load:1,beforeunload:1,unload:1,resize:1,scroll:1,beforeshutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(f,d){}
,registerEvent:function(i,h,g){}
,unregisterEvent:function(l,k,j){}
,_initWindowObserver:function(){this._onNativeWrapper=qx.lang.Function.listener(this._onNative,this);var m=qx.event.handler.Window.SUPPORTED_TYPES;for(var n in m){qx.bom.Event.addNativeListener(this._window,n,this._onNativeWrapper);}
;}
,_stopWindowObserver:function(){var o=qx.event.handler.Window.SUPPORTED_TYPES;for(var p in o){qx.bom.Event.removeNativeListener(this._window,p,this._onNativeWrapper);}
;}
,_onNative:function(){var q=qx.core.Environment.select(a,{"true":qx.event.GlobalError.observeMethod(this.__oD),"false":this.__oD});q.apply(this,arguments);}
,__oD:function(e){if(this.isDisposed()){return;}
;var v=this._window;var s;try{s=v.document;}
catch(w){return;}
;var t=s.documentElement;var r=qx.bom.Event.getTarget(e);if(r==null||r===v||r===s||r===t){var event=qx.event.Registration.createEvent(e.type,qx.event.type.Native,[e,v]);qx.event.Registration.dispatchEvent(v,event);var u=event.getReturnValue();if(u!=null){e.returnValue=u;return u;}
;}
;}
},destruct:function(){this._stopWindowObserver();this._manager=this._window=null;}
,defer:function(x){qx.event.Registration.addHandler(x);}
});}
)();
(function(){var a="ready",b="mshtml",c="engine.name",d="qx.event.handler.Application",f="complete",g="webkit",h="gecko",i="qx.globalErrorHandling",j="load",k="unload",l="opera",m="left",n="DOMContentLoaded",o="shutdown",p="browser.documentmode";qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(q){qx.core.Object.call(this);this._window=q.getWindow();this.__oE=false;this.__oF=false;this.__nH=false;this.__oG=false;this._initObserver();qx.event.handler.Application.$$instance=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{ready:1,shutdown:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true,onScriptLoaded:function(){var r=qx.event.handler.Application.$$instance;if(r){r.__oH();}
;}
},members:{canHandleEvent:function(t,s){}
,registerEvent:function(w,v,u){}
,unregisterEvent:function(z,y,x){}
,__nH:null,__oE:null,__oF:null,__oG:null,__oH:function(){if(!this.__nH&&this.__oE&&qx.$$loader.scriptLoaded){if((qx.core.Environment.get(c)==b)){if(qx.event.Registration.hasListener(this._window,a)){this.__nH=true;qx.event.Registration.fireEvent(this._window,a);}
;}
else {this.__nH=true;qx.event.Registration.fireEvent(this._window,a);}
;}
;}
,isApplicationReady:function(){return this.__nH;}
,_initObserver:function(){if(qx.$$domReady||document.readyState==f||document.readyState==a){this.__oE=true;this.__oH();}
else {this._onNativeLoadWrapped=qx.lang.Function.bind(this._onNativeLoad,this);if(qx.core.Environment.get(c)==h||qx.core.Environment.get(c)==l||qx.core.Environment.get(c)==g||(qx.core.Environment.get(c)==b&&qx.core.Environment.get(p)>8)){qx.bom.Event.addNativeListener(this._window,n,this._onNativeLoadWrapped);}
else {var self=this;var A=function(){try{document.documentElement.doScroll(m);if(document.body){self._onNativeLoadWrapped();}
;}
catch(B){window.setTimeout(A,100);}
;}
;A();}
;qx.bom.Event.addNativeListener(this._window,j,this._onNativeLoadWrapped);}
;this._onNativeUnloadWrapped=qx.lang.Function.bind(this._onNativeUnload,this);qx.bom.Event.addNativeListener(this._window,k,this._onNativeUnloadWrapped);}
,_stopObserver:function(){if(this._onNativeLoadWrapped){qx.bom.Event.removeNativeListener(this._window,j,this._onNativeLoadWrapped);}
;qx.bom.Event.removeNativeListener(this._window,k,this._onNativeUnloadWrapped);this._onNativeLoadWrapped=null;this._onNativeUnloadWrapped=null;}
,_onNativeLoad:function(){var C=qx.core.Environment.select(i,{"true":qx.event.GlobalError.observeMethod(this.__oI),"false":this.__oI});C.apply(this,arguments);}
,__oI:function(){this.__oE=true;this.__oH();}
,_onNativeUnload:function(){var D=qx.core.Environment.select(i,{"true":qx.event.GlobalError.observeMethod(this.__oJ),"false":this.__oJ});D.apply(this,arguments);}
,__oJ:function(){if(!this.__oG){this.__oG=true;try{qx.event.Registration.fireEvent(this._window,o);}
catch(e){throw e;}
finally{qx.core.ObjectRegistry.shutdown();}
;}
;}
},destruct:function(){this._stopObserver();this._window=null;}
,defer:function(E){qx.event.Registration.addHandler(E);}
});}
)();
(function(){var a="ready",b="shutdown",c="beforeunload",d="qx.core.Init";qx.Class.define(d,{statics:{getApplication:qx.core.BaseInit.getApplication,ready:qx.core.BaseInit.ready,__oB:function(e){var f=this.getApplication();if(f){e.setReturnValue(f.close());}
;}
,__oC:function(){var g=this.getApplication();if(g){g.terminate();}
;}
},defer:function(h){qx.event.Registration.addListener(window,a,h.ready,h);qx.event.Registration.addListener(window,b,h.__oC,h);qx.event.Registration.addListener(window,c,h.__oB,h);}
});}
)();
(function(){var a="Abstract method call",b="abstract",c="*",d="",e="-webkit-tap-highlight-color: transparent;",f="-ms-touch-select: none;",g="qx.application.AbstractGui",h="-webkit-touch-callout: none;",i="-webkit-tap-highlight-color: rgba(0,0,0,0);";qx.Class.define(g,{type:b,extend:qx.core.Object,implement:[qx.application.IApplication],include:qx.locale.MTranslation,members:{__k:null,_createRootWidget:function(){throw new Error(a);}
,getRoot:function(){return this.__k;}
,main:function(){qx.theme.manager.Meta.getInstance().initialize();qx.ui.tooltip.Manager.getInstance();var j=[h,f,i,e].join(d);qx.ui.style.Stylesheet.getInstance().addRule(c,j);this.__k=this._createRootWidget();window.scrollTo(0,0);}
,finalize:function(){this.render();}
,render:function(){qx.ui.core.queue.Manager.flush();}
,close:function(k){}
,terminate:function(){}
},destruct:function(){this.__k=null;}
});}
)();
(function(){var a="The theme to use is not available: ",b="_applyTheme",c="qx.theme",d="qx.theme.manager.Meta",f="qx.theme.Modern",g="qx.event.type.Event",h="Theme",i="changeTheme",j="singleton";qx.Class.define(d,{type:j,extend:qx.core.Object,events:{"changeTheme":g},properties:{theme:{check:h,nullable:false,apply:b}},members:{_applyTheme:function(k,m){var u=true;var w=true;var o=true;var q=true;var l=true;if(m){u=k.meta.color!==m.meta.color;w=k.meta.decoration!==m.meta.decoration;o=k.meta.font!==m.meta.font;q=k.meta.icon!==m.meta.icon;l=k.meta.appearance!==m.meta.appearance;}
;var n=qx.theme.manager.Color.getInstance();var t=qx.theme.manager.Decoration.getInstance();var r=qx.theme.manager.Font.getInstance();var p=qx.theme.manager.Icon.getInstance();var s=qx.theme.manager.Appearance.getInstance();this._suspendEvents();if(u){if(!w){var v=t.getTheme();t._applyTheme(v);}
;n.setTheme(k.meta.color);}
;t.setTheme(k.meta.decoration);r.setTheme(k.meta.font);p.setTheme(k.meta.icon);s.setTheme(k.meta.appearance);if(u||w||o||q||l){this.fireEvent(i);}
;this._activateEvents();}
,__rq:null,_fireEvent:function(e){if(e.getTarget()===qx.theme.manager.Color.getInstance()){qx.theme.manager.Decoration.getInstance().refresh();}
;this.fireEvent(i);}
,_suspendEvents:function(){var B=qx.theme.manager.Color.getInstance();var A=qx.theme.manager.Decoration.getInstance();var x=qx.theme.manager.Font.getInstance();var z=qx.theme.manager.Icon.getInstance();var y=qx.theme.manager.Appearance.getInstance();if(B.hasListener(i)){B.removeListener(i,this._fireEvent,this);}
;if(A.hasListener(i)){A.removeListener(i,this._fireEvent,this);}
;if(x.hasListener(i)){x.removeListener(i,this._fireEvent,this);}
;if(z.hasListener(i)){z.removeListener(i,this._fireEvent,this);}
;if(y.hasListener(i)){y.removeListener(i,this._fireEvent,this);}
;}
,_activateEvents:function(){var G=qx.theme.manager.Color.getInstance();var F=qx.theme.manager.Decoration.getInstance();var C=qx.theme.manager.Font.getInstance();var E=qx.theme.manager.Icon.getInstance();var D=qx.theme.manager.Appearance.getInstance();if(!G.hasListener(i)){G.addListener(i,this._fireEvent,this);}
;if(!F.hasListener(i)){F.addListener(i,this._fireEvent,this);}
;if(!C.hasListener(i)){C.addListener(i,this._fireEvent,this);}
;if(!E.hasListener(i)){E.addListener(i,this._fireEvent,this);}
;if(!D.hasListener(i)){D.addListener(i,this._fireEvent,this);}
;}
,initialize:function(){var J=qx.core.Environment;var H,I;H=J.get(c);if(H){I=qx.Theme.getByName(H);if(!I){throw new Error(a+H);}
;this.setTheme(I);}
;}
},environment:{"qx.theme":f}});}
)();
(function(){var a="qx.util.ValueManager",b="abstract";qx.Class.define(a,{type:b,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this._dynamic={};}
,members:{_dynamic:null,resolveDynamic:function(c){return this._dynamic[c];}
,isDynamic:function(d){return !!this._dynamic[d];}
,resolve:function(e){if(e&&this._dynamic[e]){return this._dynamic[e];}
;return e;}
,_setDynamic:function(f){this._dynamic=f;}
,_getDynamic:function(){return this._dynamic;}
},destruct:function(){this._dynamic=null;}
});}
)();
(function(){var a="Could not parse color: ",b="_applyTheme",c="qx.theme.manager.Color",d="Theme",e="changeTheme",f="string",g="singleton";qx.Class.define(c,{type:g,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:b,event:e}},members:{_applyTheme:function(j){var h={};if(j){var i=j.colors;for(var name in i){h[name]=this.__wY(i,name);}
;}
;this._setDynamic(h);}
,__wY:function(l,name){var k=l[name];if(typeof k===f){if(!qx.util.ColorUtil.isCssString(k)){if(l[k]!=undefined){return this.__wY(l,k);}
;throw new Error(a+k);}
;return k;}
else if(k instanceof Array){return qx.util.ColorUtil.rgbToRgbString(k);}
;throw new Error(a+k);}
,resolve:function(p){var o=this._dynamic;var m=o[p];if(m){return m;}
;var n=this.getTheme();if(n!==null&&n.colors[p]){return o[p]=n.colors[p];}
;return p;}
,isDynamic:function(s){var r=this._dynamic;if(s&&(r[s]!==undefined)){return true;}
;var q=this.getTheme();if(q!==null&&s&&(q.colors[s]!==undefined)){r[s]=q.colors[s];return true;}
;return false;}
}});}
)();
(function(){var a="Could not parse color: ",c="",d="Invalid hex value: ",e="Could not convert system colors to RGB: ",h="(",j=")",k="#",l="a",m="Invalid hex3 value: ",n="qx.theme.manager.Color",o="qx.util.ColorUtil",q="Invalid hex6 value: ",s="rgb",u=",";qx.Bootstrap.define(o,{statics:{REGEXP:{hex3:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,hex6:/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,rgb:/^rgb\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/,rgba:/^rgba\(\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*,\s*([0-9]{1,3}\.{0,1}[0-9]*)\s*\)$/},SYSTEM:{activeborder:true,activecaption:true,appworkspace:true,background:true,buttonface:true,buttonhighlight:true,buttonshadow:true,buttontext:true,captiontext:true,graytext:true,highlight:true,highlighttext:true,inactiveborder:true,inactivecaption:true,inactivecaptiontext:true,infobackground:true,infotext:true,menu:true,menutext:true,scrollbar:true,threeddarkshadow:true,threedface:true,threedhighlight:true,threedlightshadow:true,threedshadow:true,window:true,windowframe:true,windowtext:true},NAMED:{black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255],transparent:[-1,-1,-1],magenta:[255,0,255],orange:[255,165,0],brown:[165,42,42]},isNamedColor:function(v){return this.NAMED[v]!==undefined;}
,isSystemColor:function(w){return this.SYSTEM[w]!==undefined;}
,supportsThemes:function(){if(qx.Class){return qx.Class.isDefined(n);}
;return false;}
,isThemedColor:function(x){if(!this.supportsThemes()){return false;}
;if(qx.theme&&qx.theme.manager&&qx.theme.manager.Color){return qx.theme.manager.Color.getInstance().isDynamic(x);}
;return false;}
,stringToRgb:function(y){if(this.supportsThemes()&&this.isThemedColor(y)){y=qx.theme.manager.Color.getInstance().resolveDynamic(y);}
;if(this.isNamedColor(y)){return this.NAMED[y].concat();}
else if(this.isSystemColor(y)){throw new Error(e+y);}
else if(this.isRgbaString(y)){return this.__qy(y);}
else if(this.isRgbString(y)){return this.__qx();}
else if(this.isHex3String(y)){return this.__qz();}
else if(this.isHex6String(y)){return this.__qA();}
;throw new Error(a+y);}
,cssStringToRgb:function(z){if(this.isNamedColor(z)){return this.NAMED[z];}
else if(this.isSystemColor(z)){throw new Error(e+z);}
else if(this.isRgbString(z)){return this.__qx();}
else if(this.isRgbaString(z)){return this.__qy();}
else if(this.isHex3String(z)){return this.__qz();}
else if(this.isHex6String(z)){return this.__qA();}
;throw new Error(a+z);}
,stringToRgbString:function(A){return this.rgbToRgbString(this.stringToRgb(A));}
,rgbToRgbString:function(B){return s+(B[3]!==undefined?l:c)+h+B.join(u)+j;}
,rgbToHexString:function(C){return (k+qx.lang.String.pad(C[0].toString(16).toUpperCase(),2)+qx.lang.String.pad(C[1].toString(16).toUpperCase(),2)+qx.lang.String.pad(C[2].toString(16).toUpperCase(),2));}
,isValidPropertyValue:function(D){return (this.isThemedColor(D)||this.isNamedColor(D)||this.isHex3String(D)||this.isHex6String(D)||this.isRgbString(D)||this.isRgbaString(D));}
,isCssString:function(E){return (this.isSystemColor(E)||this.isNamedColor(E)||this.isHex3String(E)||this.isHex6String(E)||this.isRgbString(E)||this.isRgbaString(E));}
,isHex3String:function(F){return this.REGEXP.hex3.test(F);}
,isHex6String:function(G){return this.REGEXP.hex6.test(G);}
,isRgbString:function(H){return this.REGEXP.rgb.test(H);}
,isRgbaString:function(I){return this.REGEXP.rgba.test(I);}
,__qx:function(){var L=parseInt(RegExp.$1,10);var K=parseInt(RegExp.$2,10);var J=parseInt(RegExp.$3,10);return [L,K,J];}
,__qy:function(){var P=parseInt(RegExp.$1,10);var O=parseInt(RegExp.$2,10);var M=parseInt(RegExp.$3,10);var N=parseFloat(RegExp.$4,10);if(P===0&&O===0&M===0&&N===0){return [-1,-1,-1];}
;return [P,O,M];}
,__qz:function(){var S=parseInt(RegExp.$1,16)*17;var R=parseInt(RegExp.$2,16)*17;var Q=parseInt(RegExp.$3,16)*17;return [S,R,Q];}
,__qA:function(){var V=(parseInt(RegExp.$1,16)*16)+parseInt(RegExp.$2,16);var U=(parseInt(RegExp.$3,16)*16)+parseInt(RegExp.$4,16);var T=(parseInt(RegExp.$5,16)*16)+parseInt(RegExp.$6,16);return [V,U,T];}
,hex3StringToRgb:function(W){if(this.isHex3String(W)){return this.__qz(W);}
;throw new Error(m+W);}
,hex3StringToHex6String:function(X){if(this.isHex3String(X)){return this.rgbToHexString(this.hex3StringToRgb(X));}
;return X;}
,hex6StringToRgb:function(Y){if(this.isHex6String(Y)){return this.__qA(Y);}
;throw new Error(q+Y);}
,hexStringToRgb:function(ba){if(this.isHex3String(ba)){return this.__qz(ba);}
;if(this.isHex6String(ba)){return this.__qA(ba);}
;throw new Error(d+ba);}
,rgbToHsb:function(bi){var bc,bd,bf;var bm=bi[0];var bj=bi[1];var bb=bi[2];var bl=(bm>bj)?bm:bj;if(bb>bl){bl=bb;}
;var be=(bm<bj)?bm:bj;if(bb<be){be=bb;}
;bf=bl/255.0;if(bl!=0){bd=(bl-be)/bl;}
else {bd=0;}
;if(bd==0){bc=0;}
else {var bh=(bl-bm)/(bl-be);var bk=(bl-bj)/(bl-be);var bg=(bl-bb)/(bl-be);if(bm==bl){bc=bg-bk;}
else if(bj==bl){bc=2.0+bh-bg;}
else {bc=4.0+bk-bh;}
;bc=bc/6.0;if(bc<0){bc=bc+1.0;}
;}
;return [Math.round(bc*360),Math.round(bd*100),Math.round(bf*100)];}
,hsbToRgb:function(bn){var i,f,p,r,t;var bo=bn[0]/360;var bp=bn[1]/100;var bq=bn[2]/100;if(bo>=1.0){bo%=1.0;}
;if(bp>1.0){bp=1.0;}
;if(bq>1.0){bq=1.0;}
;var br=Math.floor(255*bq);var bs={};if(bp==0.0){bs.red=bs.green=bs.blue=br;}
else {bo*=6.0;i=Math.floor(bo);f=bo-i;p=Math.floor(br*(1.0-bp));r=Math.floor(br*(1.0-(bp*f)));t=Math.floor(br*(1.0-(bp*(1.0-f))));switch(i){case 0:bs.red=br;bs.green=t;bs.blue=p;break;case 1:bs.red=r;bs.green=br;bs.blue=p;break;case 2:bs.red=p;bs.green=br;bs.blue=t;break;case 3:bs.red=p;bs.green=r;bs.blue=br;break;case 4:bs.red=t;bs.green=p;bs.blue=br;break;case 5:bs.red=br;bs.green=p;bs.blue=r;break;};}
;return [bs.red,bs.green,bs.blue];}
,randomColor:function(){var r=Math.round(Math.random()*255);var g=Math.round(Math.random()*255);var b=Math.round(Math.random()*255);return this.rgbToRgbString([r,g,b]);}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="_applyTheme",d="",e="'.",f="qx-",g="__xb",h="Unable to resolve decorator '",j="singleton",k=";",l="qx.theme.manager.Decoration",m=".",n="Theme",o="object",p="changeTheme",q="string",r="browser.documentmode",s=":";qx.Class.define(l,{type:j,extend:qx.core.Object,statics:{CSS_CLASSNAME_PREFIX:f},construct:function(){qx.core.Object.call(this);this.__pW=[];this.__xa=(qx.core.Environment.get(b)==a&&qx.core.Environment.get(r)<9);}
,properties:{theme:{check:n,nullable:true,apply:c,event:p}},members:{__xb:null,__pW:null,__xa:false,getCssClassName:function(u){var t=qx.theme.manager.Decoration.CSS_CLASSNAME_PREFIX;if(qx.lang.Type.isString(u)){return t+u;}
else {return t+u.toHashCode();}
;}
,addCssClass:function(z){var w=qx.ui.style.Stylesheet.getInstance();var B=z;z=this.getCssClassName(z);var A=m+z;if(w.hasRule(A)){return z;}
;if(qx.lang.Type.isString(B)){B=this.resolve(B);}
;if(!B){throw new Error(h+z+e);}
;var G=d;var v=B.getStyles(true);for(var D in v){if(qx.Bootstrap.isObject(v[D])){var x=d;var F=v[D];var C=false;for(var y in F){C=true;x+=y+s+F[y]+k;}
;var E=this.__xa?A:A+(C?s:d);this.__pW.push(E+D);w.addRule(E+D,x);continue;}
;G+=D+s+v[D]+k;}
;if(G){w.addRule(A,G);this.__pW.push(A);}
;return z;}
,removeAllCssClasses:function(){for(var i=0;i<this.__pW.length;i++ ){var H=this.__pW[i];qx.ui.style.Stylesheet.getInstance().removeRule(H);}
;this.__pW=[];}
,resolve:function(L){if(!L){return null;}
;if(typeof L===o){return L;}
;var M=this.getTheme();if(!M){return null;}
;var J=this.__xb;if(!J){J=this.__xb={};}
;var I=J[L];if(I){return I;}
;var O=qx.lang.Object.clone(M.decorations[L],true);if(!O){return null;}
;if(!O.style){O.style={};}
;var K=O;while(K.include){K=M.decorations[K.include];if(!O.decorator&&K.decorator){O.decorator=qx.lang.Object.clone(K.decorator);}
;if(K.style){for(var N in K.style){if(O.style[N]===undefined){O.style[N]=qx.lang.Object.clone(K.style[N],true);}
;}
;}
;}
;return J[L]=(new qx.ui.decoration.Decorator()).set(O.style);}
,isValidPropertyValue:function(P){if(typeof P===q){return this.isDynamic(P);}
else if(typeof P===o){var Q=P.constructor;return qx.Class.hasInterface(Q,qx.ui.decoration.IDecorator);}
;return false;}
,isDynamic:function(S){if(!S){return false;}
;var R=this.getTheme();if(!R){return false;}
;return !!R.decorations[S];}
,isCached:function(T){return !this.__xb?false:qx.lang.Object.contains(this.__xb,T);}
,_applyTheme:function(X,V){var W=qx.util.AliasManager.getInstance();this.removeAllCssClasses();if(V){for(var U in V.aliases){W.remove(U);}
;}
;if(X){for(var U in X.aliases){W.add(U,X.aliases[U]);}
;}
;this._disposeMap(g);this.__xb={};}
,clear:function(){var bb=qx.util.AliasManager.getInstance();var ba=this.getTheme();if(!bb.isDisposed()&&ba&&ba.alias){for(var Y in ba.aliases){bb.remove(Y,ba.aliases[Y]);}
;}
;this.removeAllCssClasses();this._disposeMap(g);this.__xb={};}
,refresh:function(){this.clear();var be=qx.util.AliasManager.getInstance();var bd=this.getTheme();if(bd&&bd.alias){for(var bc in bd.aliases){be.add(bc,bd.aliases[bc]);}
;}
;}
},destruct:function(){this.clear();}
});}
)();
(function(){var a="qx.ui.style.Stylesheet",b="singleton";qx.Class.define(a,{type:b,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__pU=qx.bom.Stylesheet.createElement();this.__pW=[];}
,members:{__pW:null,__pU:null,addRule:function(d,c){if(this.hasRule(d)){return;}
;qx.bom.Stylesheet.addRule(this.__pU,d,c);this.__pW.push(d);}
,hasRule:function(e){return this.__pW.indexOf(e)!=-1;}
,removeRule:function(f){delete this.__pW[this.__pW.indexOf(f)];qx.bom.Stylesheet.removeRule(this.__pU,f);}
}});}
)();
(function(){var a="qx.bom.client.Stylesheet",b="html.stylesheet.deleterule",c="html.stylesheet.insertrule",d="function",e="html.stylesheet.createstylesheet",f="html.stylesheet.addimport",g="html.stylesheet.removeimport",h="object";qx.Bootstrap.define(a,{statics:{__os:function(){if(!qx.bom.client.Stylesheet.__gR){qx.bom.client.Stylesheet.__gR=qx.bom.Stylesheet.createElement();}
;return qx.bom.client.Stylesheet.__gR;}
,getCreateStyleSheet:function(){return typeof document.createStyleSheet===h;}
,getInsertRule:function(){return typeof qx.bom.client.Stylesheet.__os().insertRule===d;}
,getDeleteRule:function(){return typeof qx.bom.client.Stylesheet.__os().deleteRule===d;}
,getAddImport:function(){return (typeof qx.bom.client.Stylesheet.__os().addImport===h);}
,getRemoveImport:function(){return (typeof qx.bom.client.Stylesheet.__os().removeImport===h);}
},defer:function(i){qx.core.Environment.add(e,i.getCreateStyleSheet);qx.core.Environment.add(c,i.getInsertRule);qx.core.Environment.add(b,i.getDeleteRule);qx.core.Environment.add(f,i.getAddImport);qx.core.Environment.add(g,i.getRemoveImport);}
});}
)();
(function(){var a="stylesheet",b="qx.bom.Stylesheet.addRule: The rule '",c="head",d="' must not be enclosed in braces",e="html.stylesheet.insertrule",f='qx.debug',g="' for the selector '",h="}",j="html.stylesheet.createstylesheet",k='@import "',l="text/css",m="{",n='";',o="html.stylesheet.removeimport",p="html.stylesheet.deleterule",q="qx.bom.Stylesheet",r="html.stylesheet.addimport",s="link",t="style";qx.Bootstrap.define(q,{statics:{includeFile:function(w,u){if(!u){u=document;}
;var x=u.createElement(s);x.type=l;x.rel=a;x.href=w;var v=u.getElementsByTagName(c)[0];v.appendChild(x);}
,createElement:function(y){if(qx.core.Environment.get(j)){var z=document.createStyleSheet();if(y){z.cssText=y;}
;return z;}
else {var A=document.createElement(t);A.type=l;if(y){A.appendChild(document.createTextNode(y));}
;document.getElementsByTagName(c)[0].appendChild(A);return A.sheet;}
;}
,addRule:function(D,E,C){if(qx.core.Environment.get(f)){var B=b+C+g+E+d;qx.core.Assert.assertFalse(/^\s*?\{.*?\}\s*?$/.test(C),B);}
;if(qx.core.Environment.get(e)){D.insertRule(E+m+C+h,D.cssRules.length);}
else {D.addRule(E,C);}
;}
,removeRule:function(G,I){if(qx.core.Environment.get(p)){var F=G.cssRules;var H=F.length;for(var i=H-1;i>=0; --i){if(F[i].selectorText==I){G.deleteRule(i);}
;}
;}
else {var F=G.rules;var H=F.length;for(var i=H-1;i>=0; --i){if(F[i].selectorText==I){G.removeRule(i);}
;}
;}
;}
,removeSheet:function(K){var J=K.ownerNode?K.ownerNode:K.owningElement;qx.dom.Element.removeChild(J,J.parentNode);}
,removeAllRules:function(M){if(qx.core.Environment.get(p)){var L=M.cssRules;var N=L.length;for(var i=N-1;i>=0;i-- ){M.deleteRule(i);}
;}
else {var L=M.rules;var N=L.length;for(var i=N-1;i>=0;i-- ){M.removeRule(i);}
;}
;}
,addImport:function(P,O){if(qx.core.Environment.get(r)){P.addImport(O);}
else {P.insertRule(k+O+n,P.cssRules.length);}
;}
,removeImport:function(Q,R){if(qx.core.Environment.get(o)){var S=Q.imports;var T=S.length;for(var i=T-1;i>=0;i-- ){if(S[i].href==R||S[i].href==qx.util.Uri.getAbsolute(R)){Q.removeImport(i);}
;}
;}
else {var U=Q.cssRules;var T=U.length;for(var i=T-1;i>=0;i-- ){if(U[i].href==R){Q.deleteRule(i);}
;}
;}
;}
,removeAllImports:function(W){if(qx.core.Environment.get(o)){var Y=W.imports;var X=Y.length;for(var i=X-1;i>=0;i-- ){W.removeImport(i);}
;}
else {var V=W.cssRules;var X=V.length;for(var i=X-1;i>=0;i-- ){if(V[i].type==V[i].IMPORT_RULE){W.deleteRule(i);}
;}
;}
;}
}});}
)();
(function(){var a="engine.name",b="",c="none",d="qx.dom.Element",e="webkit",f="The tag name is missing!",g="div";qx.Bootstrap.define(d,{statics:{hasChild:function(parent,h){return h.parentNode===parent;}
,hasChildren:function(j){return !!j.firstChild;}
,hasChildElements:function(k){k=k.firstChild;while(k){if(k.nodeType===1){return true;}
;k=k.nextSibling;}
;return false;}
,getParentElement:function(m){return m.parentNode;}
,isInDom:function(p,n){if(!n){n=window;}
;var o=n.document.getElementsByTagName(p.nodeName);for(var i=0,l=o.length;i<l;i++ ){if(o[i]===p){return true;}
;}
;return false;}
,insertAt:function(q,parent,r){var s=parent.childNodes[r];if(s){parent.insertBefore(q,s);}
else {parent.appendChild(q);}
;return true;}
,insertBegin:function(t,parent){if(parent.firstChild){this.insertBefore(t,parent.firstChild);}
else {parent.appendChild(t);}
;return true;}
,insertEnd:function(u,parent){parent.appendChild(u);return true;}
,insertBefore:function(v,w){w.parentNode.insertBefore(v,w);return true;}
,insertAfter:function(x,y){var parent=y.parentNode;if(y==parent.lastChild){parent.appendChild(x);}
else {return this.insertBefore(x,y.nextSibling);}
;return true;}
,remove:function(z){if(!z.parentNode){return false;}
;z.parentNode.removeChild(z);return true;}
,removeChild:function(A,parent){if(A.parentNode!==parent){return false;}
;parent.removeChild(A);return true;}
,removeChildAt:function(B,parent){var C=parent.childNodes[B];if(!C){return false;}
;parent.removeChild(C);return true;}
,replaceChild:function(E,D){if(!D.parentNode){return false;}
;D.parentNode.replaceChild(E,D);return true;}
,replaceAt:function(G,H,parent){var F=parent.childNodes[H];if(!F){return false;}
;parent.replaceChild(G,F);return true;}
,__ot:{},getHelperElement:function(I){if(!I){I=window;}
;var J=I.location.href;if(!qx.dom.Element.__ot[J]){var K=qx.dom.Element.__ot[J]=I.document.createElement(g);if(qx.core.Environment.get(a)==e){K.style.display=c;I.document.body.appendChild(K);}
;}
;return qx.dom.Element.__ot[J];}
,create:function(name,M,L){if(!L){L=window;}
;if(!name){throw new Error(f);}
;var O=L.document.createElement(name);for(var N in M){qx.bom.element.Attribute.set(O,N,M[N]);}
;return O;}
,empty:function(P){return P.innerHTML=b;}
}});}
)();
(function(){var b="function",c="html.video.h264",d="html.element.contains",f='video/ogg; codecs="theora, vorbis"',g="qxtest",h="html.console",i="html.xul",j="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",k="html.video.ogg",l="http://www.w3.org/TR/SVG11/feature#BasicStructure",m="html.storage.local",n="div",o="qx.bom.client.Html",p="getSelection",q='audio',r='video/mp4; codecs="avc1.42E01E, mp4a.40.2"',s="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",t="html.audio",u="video",w="url(#default#VML)",x="head",y="audio",z="audio/mpeg",A="org.w3c.dom.svg",B="html.classlist",C="html.svg",D="html.video",E="html.geolocation",F="DOMTokenList",G="html.storage.session",H="1.1",I="html.history.state",J="object",K="html.image.naturaldimensions",L="html.audio.aif",M="audio/x-wav",N='<v:shape id="vml_flag1" adj="1" />',O="html.node.isequalnode",P="html.canvas",Q="audio/ogg",R="",S="html.storage.userdata",T="html.fullscreen",U="number",V="html.element.compareDocumentPosition",W="audio/x-aiff",X="html.audio.au",Y="img",bF="html.selection",bG="selection",bH="html.xpath",bB="$qx_check",bC="test",bD='video',bE="span",bM="html.element.textcontent",bN="geolocation",bW="html.audio.mp3",bA="html.vml",bI="undefined",bJ="html.audio.ogg",bK="none",bL="label",bQ='video/webm; codecs="vp8, vorbis"',ca="html.dataurl",bR="html.webworker",bS="html.dataset",bX="1.0",bO="html.audio.wav",bY="html.filereader",bP="audio/basic",bT="display",bU="html.video.webm",bV="#default#userdata";qx.Bootstrap.define(o,{statics:{getWebWorker:function(){return window.Worker!=null;}
,getFileReader:function(){return window.FileReader!=null;}
,getGeoLocation:function(){return bN in navigator;}
,getAudio:function(){return !!document.createElement(q).canPlayType;}
,getAudioOgg:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(Q);}
,getAudioMp3:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(z);}
,getAudioWav:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(M);}
,getAudioAu:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(bP);}
,getAudioAif:function(){if(!qx.bom.client.Html.getAudio()){return R;}
;var a=document.createElement(y);return a.canPlayType(W);}
,getVideo:function(){return !!document.createElement(bD).canPlayType;}
,getVideoOgg:function(){if(!qx.bom.client.Html.getVideo()){return R;}
;var v=document.createElement(u);return v.canPlayType(f);}
,getVideoH264:function(){if(!qx.bom.client.Html.getVideo()){return R;}
;var v=document.createElement(u);return v.canPlayType(r);}
,getVideoWebm:function(){if(!qx.bom.client.Html.getVideo()){return R;}
;var v=document.createElement(u);return v.canPlayType(bQ);}
,getLocalStorage:function(){try{window.localStorage.setItem(bB,bC);window.localStorage.removeItem(bB);return true;}
catch(cb){return false;}
;}
,getSessionStorage:function(){try{window.sessionStorage.setItem(bB,bC);window.sessionStorage.removeItem(bB);return true;}
catch(cc){return false;}
;}
,getUserDataStorage:function(){var cd=document.createElement(n);cd.style[bT]=bK;document.getElementsByTagName(x)[0].appendChild(cd);var ce=false;try{cd.addBehavior(bV);cd.load(g);ce=true;}
catch(e){}
;document.getElementsByTagName(x)[0].removeChild(cd);return ce;}
,getClassList:function(){return !!(document.documentElement.classList&&qx.Bootstrap.getClass(document.documentElement.classList)===F);}
,getXPath:function(){return !!document.evaluate;}
,getXul:function(){try{document.createElementNS(j,bL);return true;}
catch(e){return false;}
;}
,getSvg:function(){return document.implementation&&document.implementation.hasFeature&&(document.implementation.hasFeature(A,bX)||document.implementation.hasFeature(l,H));}
,getVml:function(){var cf=document.createElement(n);document.body.appendChild(cf);cf.innerHTML=N;cf.firstChild.style.behavior=w;var cg=typeof cf.firstChild.adj==J;document.body.removeChild(cf);return cg;}
,getCanvas:function(){return !!window.CanvasRenderingContext2D;}
,getDataUrl:function(ch){var ci=new Image();ci.onload=ci.onerror=function(){window.setTimeout(function(){ch.call(null,(ci.width==1&&ci.height==1));}
,0);}
;ci.src=s;}
,getDataset:function(){return !!document.documentElement.dataset;}
,getContains:function(){return (typeof document.documentElement.contains!==bI);}
,getCompareDocumentPosition:function(){return (typeof document.documentElement.compareDocumentPosition===b);}
,getTextContent:function(){var cj=document.createElement(bE);return (typeof cj.textContent!==bI);}
,getFullScreen:function(){return document.fullscreenEnabled||document.webkitFullscreenEnabled||document.mozFullScreenEnabled||document.msFullscreenEnabled||false;}
,getConsole:function(){return typeof window.console!==bI;}
,getNaturalDimensions:function(){var ck=document.createElement(Y);return typeof ck.naturalHeight===U&&typeof ck.naturalWidth===U;}
,getHistoryState:function(){return (typeof window.onpopstate!==bI&&typeof window.history.replaceState!==bI&&typeof window.history.pushState!==bI);}
,getSelection:function(){if(typeof window.getSelection===b){return p;}
;if(typeof document.selection===J){return bG;}
;return null;}
,getIsEqualNode:function(){return typeof document.documentElement.isEqualNode===b;}
},defer:function(cl){qx.core.Environment.add(bR,cl.getWebWorker);qx.core.Environment.add(bY,cl.getFileReader);qx.core.Environment.add(E,cl.getGeoLocation);qx.core.Environment.add(t,cl.getAudio);qx.core.Environment.add(bJ,cl.getAudioOgg);qx.core.Environment.add(bW,cl.getAudioMp3);qx.core.Environment.add(bO,cl.getAudioWav);qx.core.Environment.add(X,cl.getAudioAu);qx.core.Environment.add(L,cl.getAudioAif);qx.core.Environment.add(D,cl.getVideo);qx.core.Environment.add(k,cl.getVideoOgg);qx.core.Environment.add(c,cl.getVideoH264);qx.core.Environment.add(bU,cl.getVideoWebm);qx.core.Environment.add(m,cl.getLocalStorage);qx.core.Environment.add(G,cl.getSessionStorage);qx.core.Environment.add(S,cl.getUserDataStorage);qx.core.Environment.add(B,cl.getClassList);qx.core.Environment.add(bH,cl.getXPath);qx.core.Environment.add(i,cl.getXul);qx.core.Environment.add(P,cl.getCanvas);qx.core.Environment.add(C,cl.getSvg);qx.core.Environment.add(bA,cl.getVml);qx.core.Environment.add(bS,cl.getDataset);qx.core.Environment.addAsync(ca,cl.getDataUrl);qx.core.Environment.add(d,cl.getContains);qx.core.Environment.add(V,cl.getCompareDocumentPosition);qx.core.Environment.add(bM,cl.getTextContent);qx.core.Environment.add(h,cl.getConsole);qx.core.Environment.add(K,cl.getNaturalDimensions);qx.core.Environment.add(I,cl.getHistoryState);qx.core.Environment.add(bF,cl.getSelection);qx.core.Environment.add(O,cl.getIsEqualNode);qx.core.Environment.add(T,cl.getFullScreen);}
});}
)();
(function(){var a="readOnly",b="data-",c="accessKey",d="qx.bom.element.Attribute",e="rowSpan",f="vAlign",g="className",h="textContent",i="'",j="htmlFor",k="longDesc",l="cellSpacing",m="frameBorder",n="='",o="",p="useMap",q="innerText",r="innerHTML",s="tabIndex",t="dateTime",u="maxLength",v="html.element.textcontent",w="mshtml",x="engine.name",y="cellPadding",z="browser.documentmode",A="colSpan",B="undefined";qx.Bootstrap.define(d,{statics:{__ow:{names:{"class":g,"for":j,html:r,text:qx.core.Environment.get(v)?h:q,colspan:A,rowspan:e,valign:f,datetime:t,accesskey:c,tabindex:s,maxlength:u,readonly:a,longdesc:k,cellpadding:y,cellspacing:l,frameborder:m,usemap:p},runtime:{"html":1,"text":1},bools:{compact:1,nowrap:1,ismap:1,declare:1,noshade:1,checked:1,disabled:1,readOnly:1,multiple:1,selected:1,noresize:1,defer:1,allowTransparency:1},property:{$$html:1,$$widget:1,checked:1,readOnly:1,multiple:1,selected:1,value:1,maxLength:1,className:1,innerHTML:1,innerText:1,textContent:1,htmlFor:1,tabIndex:1},qxProperties:{$$widget:1,$$html:1},propertyDefault:{disabled:false,checked:false,readOnly:false,multiple:false,selected:false,value:o,className:o,innerHTML:o,innerText:o,textContent:o,htmlFor:o,tabIndex:0,maxLength:qx.core.Environment.select(x,{"mshtml":2147483647,"webkit":524288,"default":-1})},removeableProperties:{disabled:1,multiple:1,maxLength:1}},compile:function(C){var D=[];var F=this.__ow.runtime;for(var E in C){if(!F[E]){D.push(E,n,C[E],i);}
;}
;return D.join(o);}
,get:function(I,name){var G=this.__ow;var H;name=G.names[name]||name;if(G.property[name]){H=I[name];if(typeof G.propertyDefault[name]!==B&&H==G.propertyDefault[name]){if(typeof G.bools[name]===B){return null;}
else {return H;}
;}
;}
else {H=I.getAttribute(name);if(G.bools[name]&&!(qx.core.Environment.get(x)==w&&parseInt(qx.core.Environment.get(z),10)<=8)){return qx.Bootstrap.isString(H);}
;}
;if(G.bools[name]){return !!H;}
;return H;}
,set:function(L,name,K){if(typeof K===B){return;}
;var J=this.__ow;name=J.names[name]||name;if(J.bools[name]&&!qx.lang.Type.isBoolean(K)){K=qx.lang.Type.isString(K);}
;if(J.property[name]&&(!(L[name]===undefined)||J.qxProperties[name])){if(K==null){if(J.removeableProperties[name]){L.removeAttribute(name);return;}
else if(typeof J.propertyDefault[name]!==B){K=J.propertyDefault[name];}
;}
;L[name]=K;}
else {if((J.bools[name]||K===null)&&name.indexOf(b)!==0){if(K===true){L.setAttribute(name,name);}
else if(K===false||K===null){L.removeAttribute(name);}
;}
else {L.setAttribute(name,K);}
;}
;}
,reset:function(M,name){if(name.indexOf(b)===0){M.removeAttribute(name);}
else {this.set(M,name,null);}
;}
}});}
)();
(function(){var a="file",b="+",c="strict",d="anchor",e="div",f="query",g="source",h="password",j="host",k="protocol",l="qx.debug",n="user",p="directory",q="loose",r="relative",s="queryKey",t="qx.util.Uri",u="",v="path",w="authority",x='">0</a>',y="&",z="port",A="params must be either string or object",B='<a href="',C="userInfo",D="?",E="=";qx.Bootstrap.define(t,{statics:{parseUri:function(H,G){var I={key:[g,k,w,C,n,h,j,z,r,v,p,a,f,d],q:{name:s,parser:/(?:^|&)([^&=]*)=?([^&]*)/g},parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:\[[0-9A-Fa-f:]+\])|(?:[^:\/?#\[\]]*))(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,loose:/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:\[[0-9A-Fa-f:]+\])|(?:[^:\/?#\[\]]*))(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/}};var o=I,m=I.parser[G?c:q].exec(H),F={},i=14;while(i-- ){F[o.key[i]]=m[i]||u;}
;F[o.q.name]={};F[o.key[12]].replace(o.q.parser,function(K,L,J){if(L){F[o.q.name][L]=J;}
;}
);return F;}
,appendParamsToUrl:function(M,N){if(N===undefined){return M;}
;if(qx.core.Environment.get(l)){if(!(qx.lang.Type.isString(N)||qx.lang.Type.isObject(N))){throw new Error(A);}
;}
;if(qx.lang.Type.isObject(N)){N=qx.util.Uri.toParameter(N);}
;if(!N){return M;}
;return M+=(/\?/).test(M)?y+N:D+N;}
,toParameter:function(O,S){var R,Q=[];for(R in O){if(O.hasOwnProperty(R)){var P=O[R];if(P instanceof Array){for(var i=0;i<P.length;i++ ){this.__ox(R,P[i],Q,S);}
;}
else {this.__ox(R,P,Q,S);}
;}
;}
;return Q.join(y);}
,__ox:function(W,X,V,U){var T=window.encodeURIComponent;if(U){V.push(T(W).replace(/%20/g,b)+E+T(X).replace(/%20/g,b));}
else {V.push(T(W)+E+T(X));}
;}
,getAbsolute:function(ba){var Y=document.createElement(e);Y.innerHTML=B+ba+x;return Y.firstChild.href;}
}});}
)();
(function(){var a="background-color",b="qx.debug",c="qx.theme",d="This decorator is already in-use. Modification is not possible anymore!",e="qx.ui.decoration.MBackgroundColor",f="Color",g="_applyBackgroundColor";qx.Mixin.define(e,{properties:{backgroundColor:{check:f,nullable:true,apply:g}},members:{_styleBackgroundColor:function(h){var i=this.getBackgroundColor();if(i&&qx.core.Environment.get(c)){i=qx.theme.manager.Color.getInstance().resolve(i);}
;if(i){h[a]=i;}
;}
,_applyBackgroundColor:function(){if(qx.core.Environment.get(b)){if(this._isInitialized()){throw new Error(d);}
;}
;}
}});}
)();
(function(){var a="qx.ui.decoration.IDecorator";qx.Interface.define(a,{members:{getStyles:function(){}
,getPadding:function(){}
,getInsets:function(){}
}});}
)();
(function(){var a="abstract",b="Abstract method called.",c="qx.ui.decoration.Abstract";qx.Class.define(c,{extend:qx.core.Object,implement:[qx.ui.decoration.IDecorator],type:a,members:{__xc:null,_getDefaultInsets:function(){throw new Error(b);}
,_isInitialized:function(){throw new Error(b);}
,_resetInsets:function(){this.__xc=null;}
,getInsets:function(){if(!this.__xc){this.__xc=this._getDefaultInsets();}
;return this.__xc;}
},destruct:function(){this.__xc=null;}
});}
)();
(function(){var a="repeat",b="backgroundPositionX",c="px",d=".png",e=" are not supported in this client! The image's resource id is '",f='',g='Boolean',h='background',j='backgroundRepeat',k='push',l="_applyBackgroundImage",m='backgroundOrigin',n="qx.debug",o='size',p='url(',q="Background PNGs with repeat == 'scale' or repeat == 'no-repeat'",r="qx.ui.decoration.MBackgroundImage",s="100% 100%",t='backgroundPositionX',u="browser.documentmode",v="backgroundPositionY",w="'",x=' / ',y='backgroundImage',z='repeat',A=' ',B='unshift',C="background",D="engine.name",E='backgroundPositionY',F="scale",G="This decorator is already in-use. Modification is not possible anymore!",H="no-repeat",I=')',J="_applyBackgroundPosition",K=" ",L="The backgroundPosition property is not supported by this client!",M="mshtml";qx.Mixin.define(r,{properties:{backgroundImage:{nullable:true,apply:l},backgroundRepeat:{init:a,apply:l},backgroundPositionX:{nullable:true,apply:J},backgroundPositionY:{nullable:true,apply:J},backgroundOrigin:{nullable:true,apply:l},backgroundPosition:{group:[v,b]},orderGradientsFront:{check:g,init:false}},members:{_styleBackgroundImage:function(N){if(!this.getBackgroundImage()){return;}
;if(C in N){if(!qx.lang.Type.isArray(N[h])){N[h]=[N[h]];}
;}
else {N[h]=[];}
;var O=[y,j,E,t,m];(function(Y,ba,T,S,R){for(var i=0;i<Y.length;i++ ){var U=Y[i];var Q=ba[i];var top=T[i]||0;var bc=S[i]||0;var P=R[i]||f;if(top==null){top=0;}
;if(bc==null){bc=0;}
;if(!isNaN(top)){top+=c;}
;if(!isNaN(bc)){bc+=c;}
;var bb=qx.util.AliasManager.getInstance().resolve(U);var W=qx.util.ResourceManager.getInstance().toUri(bb);var X={image:p+W+I,position:bc+K+top,repeat:z,origin:P};if(Q===F){X.size=s;}
else {X.repeat=Q;}
;var V=[X.image,X.position+(o in X?x+X.size:f),X.repeat,X.origin];N[C][this.getOrderGradientsFront()?k:B](V.join(A));if(qx.core.Environment.get(n)&&W&&qx.lang.String.endsWith(W,d)&&(Q==F||Q==H)&&qx.core.Environment.get(D)==M&&qx.core.Environment.get(u)<9){this.warn(q+e+bb+w);}
;}
;}
).apply(this,this._getExtendedPropertyValueArrays(O));}
,_applyBackgroundImage:function(){if(qx.core.Environment.get(n)){if(this._isInitialized()){throw new Error(G);}
;}
;}
,_applyBackgroundPosition:function(){if(qx.core.Environment.get(n)){if(this._isInitialized()){throw new Error(G);}
;if(qx.core.Environment.get(D)==M&&qx.core.Environment.get(u)<9){this.warn(L);}
;}
;}
}});}
)();
(function(){var a="0",b="qx/static",c="http://",d="https://",e="file://",f="qx.util.AliasManager",g="singleton",h=".",i="/",j="static";qx.Class.define(f,{type:g,extend:qx.util.ValueManager,construct:function(){qx.util.ValueManager.call(this);this.__xd={};this.add(j,b);}
,members:{__xd:null,_preprocess:function(n){var m=this._getDynamic();if(m[n]===false){return n;}
else if(m[n]===undefined){if(n.charAt(0)===i||n.charAt(0)===h||n.indexOf(c)===0||n.indexOf(d)===a||n.indexOf(e)===0){m[n]=false;return n;}
;if(this.__xd[n]){return this.__xd[n];}
;var l=n.substring(0,n.indexOf(i));var k=this.__xd[l];if(k!==undefined){m[n]=k+n.substring(l.length);}
;}
;return n;}
,add:function(o,q){this.__xd[o]=q;var p=this._getDynamic();for(var r in p){if(r.substring(0,r.indexOf(i))===o){p[r]=q+r.substring(o.length);}
;}
;}
,remove:function(s){delete this.__xd[s];}
,resolve:function(t){var u=this._getDynamic();if(t!=null){t=this._preprocess(t);}
;return u[t]||t;}
,getAliases:function(){var v={};for(var w in this.__xd){v[w]=this.__xd[w];}
;return v;}
},destruct:function(){this.__xd=null;}
});}
)();
(function(){var a="Microsoft.XMLHTTP",b="xhr",c="io.ssl",d="io.xhr",e="",f="file:",g="https:",h="webkit",i="gecko",j="activex",k="opera",l=".",m="io.maxrequests",n="qx.bom.client.Transport";qx.Bootstrap.define(n,{statics:{getMaxConcurrentRequestCount:function(){var p;var r=qx.bom.client.Engine.getVersion().split(l);var o=0;var s=0;var q=0;if(r[0]){o=r[0];}
;if(r[1]){s=r[1];}
;if(r[2]){q=r[2];}
;if(window.maxConnectionsPerServer){p=window.maxConnectionsPerServer;}
else if(qx.bom.client.Engine.getName()==k){p=8;}
else if(qx.bom.client.Engine.getName()==h){p=4;}
else if(qx.bom.client.Engine.getName()==i&&((o>1)||((o==1)&&(s>9))||((o==1)&&(s==9)&&(q>=1)))){p=6;}
else {p=2;}
;return p;}
,getSsl:function(){return window.location.protocol===g;}
,getXmlHttpRequest:function(){var t=window.ActiveXObject?(function(){if(window.location.protocol!==f){try{new window.XMLHttpRequest();return b;}
catch(u){}
;}
;try{new window.ActiveXObject(a);return j;}
catch(v){}
;}
)():(function(){try{new window.XMLHttpRequest();return b;}
catch(w){}
;}
)();return t||e;}
},defer:function(x){qx.core.Environment.add(m,x.getMaxConcurrentRequestCount);qx.core.Environment.add(c,x.getSsl);qx.core.Environment.add(d,x.getXmlHttpRequest);}
});}
)();
(function(){var a="singleton",b="qx.util.LibraryManager";qx.Class.define(b,{extend:qx.core.Object,type:a,statics:{__xe:qx.$$libraries||{}},members:{has:function(c){return !!this.self(arguments).__xe[c];}
,get:function(d,e){return this.self(arguments).__xe[d][e]?this.self(arguments).__xe[d][e]:null;}
,set:function(f,g,h){this.self(arguments).__xe[f][g]=h;}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="//",d="io.ssl",e="",f="encoding",g="?",h="data",i="string",j="type",k="data:image/",l=";",m="/",n="resourceUri",o="qx.util.ResourceManager",p="singleton",q=",";qx.Class.define(o,{extend:qx.core.Object,type:p,construct:function(){qx.core.Object.call(this);}
,statics:{__il:qx.$$resources||{},__xf:{}},members:{getIds:function(s){var u=this.self(arguments).__il;if(!u){return null;}
;var t=[];for(var r in u){if(u.hasOwnProperty(r)){if(s&&r.indexOf(s)==-1){continue;}
;t.push(r);}
;}
;return t;}
,has:function(v){return !!this.self(arguments).__il[v];}
,getData:function(w){return this.self(arguments).__il[w]||null;}
,getImageWidth:function(y){var x=this.self(arguments).__il[y];return x?x[0]:null;}
,getImageHeight:function(A){var z=this.self(arguments).__il[A];return z?z[1]:null;}
,getImageFormat:function(C){var B=this.self(arguments).__il[C];return B?B[2]:null;}
,getCombinedFormat:function(H){var E=e;var G=this.self(arguments).__il[H];var D=G&&G.length>4&&typeof (G[4])==i&&this.constructor.__il[G[4]];if(D){var I=G[4];var F=this.constructor.__il[I];E=F[2];}
;return E;}
,toUri:function(M){if(M==null){return M;}
;var J=this.self(arguments).__il[M];if(!J){return M;}
;if(typeof J===i){var L=J;}
else {var L=J[3];if(!L){return M;}
;}
;var K=e;if((qx.core.Environment.get(b)==a)&&qx.core.Environment.get(d)){K=this.self(arguments).__xf[L];}
;return K+qx.util.LibraryManager.getInstance().get(L,n)+m+M;}
,toDataUri:function(P){var O=this.constructor.__il[P];var R=this.constructor.__il[O[4]];var Q;if(R){var N=R[4][P];Q=k+N[j]+l+N[f]+q+N[h];}
else {Q=this.toUri(P);}
;return Q;}
},defer:function(T){if((qx.core.Environment.get(b)==a)){if(qx.core.Environment.get(d)){for(var U in qx.$$libraries){var S;if(qx.util.LibraryManager.getInstance().get(U,n)){S=qx.util.LibraryManager.getInstance().get(U,n);}
else {T.__xf[U]=e;continue;}
;if(S.match(/^\/\//)!=null){T.__xf[U]=window.location.protocol;}
else if(S.match(/^\//)!=null){T.__xf[U]=window.location.protocol+c+window.location.host;}
else if(S.match(/^\.\//)!=null){var W=document.URL;T.__xf[U]=W.substring(0,W.lastIndexOf(m)+1);}
else if(S.match(/^http/)!=null){T.__xf[U]=e;}
else {var V=window.location.href.indexOf(g);var X;if(V==-1){X=window.location.href;}
else {X=window.location.href.substring(0,V);}
;T.__xf[U]=X.substring(0,X.lastIndexOf(m)+1);}
;}
;}
;}
;}
});}
)();
(function(){var a="double",b="qx.theme",c="px ",d="widthTop",e="inset",f="solid",g="dotted",h="styleRight",i="styleBottom",j="_applyWidth",k="border-top",l="qx.debug",m="border-left",n="ridge",o="border-right",p="qx.ui.decoration.MSingleBorder",q="shorthand",r="Color",s="widthBottom",t="outset",u="widthLeft",v="",w="border-bottom",x="styleTop",y="colorBottom",z="groove",A="styleLeft",B="widthRight",C="dashed",D="Number",E="colorLeft",F="colorRight",G="colorTop",H="_applyStyle",I=" ",J="This decorator is already in-use. Modification is not possible anymore!",K="Invalid Single decorator (zero border width). Use qx.ui.decorator.Background instead!",L="absolute";qx.Mixin.define(p,{properties:{widthTop:{check:D,init:0,apply:j},widthRight:{check:D,init:0,apply:j},widthBottom:{check:D,init:0,apply:j},widthLeft:{check:D,init:0,apply:j},styleTop:{nullable:true,check:[f,g,C,a,e,t,n,z],init:f,apply:H},styleRight:{nullable:true,check:[f,g,C,a,e,t,n,z],init:f,apply:H},styleBottom:{nullable:true,check:[f,g,C,a,e,t,n,z],init:f,apply:H},styleLeft:{nullable:true,check:[f,g,C,a,e,t,n,z],init:f,apply:H},colorTop:{nullable:true,check:r,apply:H},colorRight:{nullable:true,check:r,apply:H},colorBottom:{nullable:true,check:r,apply:H},colorLeft:{nullable:true,check:r,apply:H},left:{group:[u,A,E]},right:{group:[B,h,F]},top:{group:[d,x,G]},bottom:{group:[s,i,y]},width:{group:[d,B,s,u],mode:q},style:{group:[x,h,i,A],mode:q},color:{group:[G,F,y,E],mode:q}},members:{_styleBorder:function(M){if(qx.core.Environment.get(b)){var O=qx.theme.manager.Color.getInstance();var S=O.resolve(this.getColorTop());var P=O.resolve(this.getColorRight());var N=O.resolve(this.getColorBottom());var R=O.resolve(this.getColorLeft());}
else {var S=this.getColorTop();var P=this.getColorRight();var N=this.getColorBottom();var R=this.getColorLeft();}
;var Q=this.getWidthTop();if(Q>0){M[k]=Q+c+this.getStyleTop()+I+(S||v);}
;var Q=this.getWidthRight();if(Q>0){M[o]=Q+c+this.getStyleRight()+I+(P||v);}
;var Q=this.getWidthBottom();if(Q>0){M[w]=Q+c+this.getStyleBottom()+I+(N||v);}
;var Q=this.getWidthLeft();if(Q>0){M[m]=Q+c+this.getStyleLeft()+I+(R||v);}
;if(qx.core.Environment.get(l)){if(M.length===0){throw new Error(K);}
;}
;M.position=L;}
,_getDefaultInsetsForBorder:function(){return {top:this.getWidthTop(),right:this.getWidthRight(),bottom:this.getWidthBottom(),left:this.getWidthLeft()};}
,_applyWidth:function(){this._applyStyle();this._resetInsets();}
,_applyStyle:function(){if(qx.core.Environment.get(l)){if(this._isInitialized()){throw new Error(J);}
;}
;}
}});}
)();
(function(){var a="innerWidthRight",b="innerColorBottom",c="css.borderradius",d="qx.theme",e="px ",f='""',g="_applyDoubleBorder",h="border-top",i="inset 0 -",j="css.boxsizing",k="innerWidthTop",l="100%",m="qx.debug",n="border-left",o="innerColorRight",p="css.boxshadow",q="innerColorTop",r="innerColorLeft",s="inset ",t="shorthand",u="inset -",v="Color",w="border-box",x="This decorator is already in-use. Modification is not possible anymore!",y="qx.ui.decoration.MDoubleBorder",z="border-bottom",A="innerOpacity is configured but the browser doesn't support RGBA colors.",B=":before",C="inset 0 ",D="px solid ",E="innerWidthBottom",F="css.rgba",G="inherit",H="Number",I="innerWidthLeft",J="px 0 ",K="inset 0 0 0 ",L="border-right",M=" ",N=",",O="absolute";qx.Mixin.define(y,{include:[qx.ui.decoration.MSingleBorder,qx.ui.decoration.MBackgroundImage],construct:function(){this._getDefaultInsetsForBorder=this.__xi;this._styleBorder=this.__xg;}
,properties:{innerWidthTop:{check:H,init:0,apply:g},innerWidthRight:{check:H,init:0,apply:g},innerWidthBottom:{check:H,init:0,apply:g},innerWidthLeft:{check:H,init:0,apply:g},innerWidth:{group:[k,a,E,I],mode:t},innerColorTop:{nullable:true,check:v,apply:g},innerColorRight:{nullable:true,check:v,apply:g},innerColorBottom:{nullable:true,check:v,apply:g},innerColorLeft:{nullable:true,check:v,apply:g},innerColor:{group:[q,o,b,r],mode:t},innerOpacity:{check:H,init:1,apply:g}},members:{__xg:function(P){var Y=qx.core.Environment.get(p);var S,bd,innerWidth;if(qx.core.Environment.get(d)){var X=qx.theme.manager.Color.getInstance();S={top:X.resolve(this.getColorTop()),right:X.resolve(this.getColorRight()),bottom:X.resolve(this.getColorBottom()),left:X.resolve(this.getColorLeft())};bd={top:X.resolve(this.getInnerColorTop()),right:X.resolve(this.getInnerColorRight()),bottom:X.resolve(this.getInnerColorBottom()),left:X.resolve(this.getInnerColorLeft())};}
else {S={top:this.getColorTop(),right:this.getColorRight(),bottom:this.getColorBottom(),left:this.getColorLeft()};bd={top:this.getInnerColorTop(),right:this.getInnerColorRight(),bottom:this.getInnerColorBottom(),left:this.getInnerColorLeft()};}
;innerWidth={top:this.getInnerWidthTop(),right:this.getInnerWidthRight(),bottom:this.getInnerWidthBottom(),left:this.getInnerWidthLeft()};var V=this.getWidthTop();if(V>0){P[h]=V+e+this.getStyleTop()+M+S.top;}
;V=this.getWidthRight();if(V>0){P[L]=V+e+this.getStyleRight()+M+S.right;}
;V=this.getWidthBottom();if(V>0){P[z]=V+e+this.getStyleBottom()+M+S.bottom;}
;V=this.getWidthLeft();if(V>0){P[n]=V+e+this.getStyleLeft()+M+S.left;}
;var bc=this.getInnerOpacity();if(bc<1){this.__xh(bd,bc);}
;if(innerWidth.top>0||innerWidth.right>0||innerWidth.bottom>0||innerWidth.left>0){var bb=(innerWidth.top||0)+D+bd.top;var ba=(innerWidth.right||0)+D+bd.right;var U=(innerWidth.bottom||0)+D+bd.bottom;var W=(innerWidth.left||0)+D+bd.left;P[B]={"width":l,"height":l,"position":O,"content":f,"border-top":bb,"border-right":ba,"border-bottom":U,"border-left":W,"left":0,"top":0};var Q=qx.bom.Style.getCssName(qx.core.Environment.get(j));P[B][Q]=w;var R=qx.core.Environment.get(c);if(R){R=qx.bom.Style.getCssName(R);P[B][R]=G;}
;var T=[];if(bd.top&&innerWidth.top&&bd.top==bd.bottom&&bd.top==bd.right&&bd.top==bd.left&&innerWidth.top==innerWidth.bottom&&innerWidth.top==innerWidth.right&&innerWidth.top==innerWidth.left){T.push(K+innerWidth.top+e+bd.top);}
else {if(bd.top){T.push(C+(innerWidth.top||0)+e+bd.top);}
;if(bd.right){T.push(u+(innerWidth.right||0)+J+bd.right);}
;if(bd.bottom){T.push(i+(innerWidth.bottom||0)+e+bd.bottom);}
;if(bd.left){T.push(s+(innerWidth.left||0)+J+bd.left);}
;}
;if(T.length>0&&Y){Y=qx.bom.Style.getCssName(Y);if(!P[Y]){P[Y]=T.join(N);}
else {P[Y]+=N+T.join(N);}
;}
;}
else {P[B]={border:0};}
;}
,__xh:function(bh,be){if(!qx.core.Environment.get(F)){if(qx.core.Environment.get(m)){qx.log.Logger.warn(A);}
;return;}
;for(var bi in bh){var bf=qx.util.ColorUtil.stringToRgb(bh[bi]);bf.push(be);var bg=qx.util.ColorUtil.rgbToRgbString(bf);bh[bi]=bg;}
;}
,_applyDoubleBorder:function(){if(qx.core.Environment.get(m)){if(this._isInitialized()){throw new Error(x);}
;}
;}
,__xi:function(){return {top:this.getWidthTop()+this.getInnerWidthTop(),right:this.getWidthRight()+this.getInnerWidthRight(),bottom:this.getWidthBottom()+this.getInnerWidthBottom(),left:this.getWidthLeft()+this.getInnerWidthLeft()};}
}});}
)();
(function(){var a="css.float",b="foo",c="css.borderimage.standardsyntax",d="detect",e="borderRadius",f="boxSizing",g="stretch",h="css.borderradius",j="content",k="css.inlineblock",l="css.gradient.filter",m="css.appearance",n="css.opacity",o="div",p="pointerEvents",q="css.gradient.radial",r="css.pointerevents",s="input",t="color",u="string",v="borderImage",w="userSelect",x="styleFloat",y="css.textShadow.filter",z="css.usermodify",A="flexbox",B='url("foo.png") 4 4 4 4 fill stretch',C="css.boxmodel",D="qx.bom.client.Css",E="css.boxshadow",F="appearance",G="-ms-flexbox",H="placeholder",I="-moz-none",J="backgroundImage",K="css.textShadow",L="DXImageTransform.Microsoft.Shadow",M="flex",N="css.alphaimageloaderneeded",O="css.gradient.legacywebkit",P="css.flexboxSyntax",Q="linear-gradient(0deg, #fff, #000)",R="textShadow",S="auto",T="css.borderimage",U="foo.png",V="rgba(1, 2, 3, 0.5)",W="color=#666666,direction=45",X="radial-gradient(0px 0px, cover, red 50%, blue 100%)",Y="rgba",bG="(",bH="-webkit-flex",bI='url("foo.png") 4 4 4 4 stretch',bC="css.gradient.linear",bD="DXImageTransform.Microsoft.Gradient",bE="css.userselect",bF="span",bM="css.boxsizing",bN="-webkit-gradient(linear,0% 0%,100% 100%,from(white), to(red))",bO="mshtml",ca="css.rgba",bJ=");",bK="4 fill",bL="none",bA="startColorStr=#550000FF, endColorStr=#55FFFF00",bR="progid:",bB="css.placeholder",bS="css.userselect.none",bT="css.textoverflow",bX="inline-block",bP="-moz-inline-box",bY="textOverflow",bQ="userModify",bU="boxShadow",bV="cssFloat",bW="border";qx.Bootstrap.define(D,{statics:{__oR:null,getBoxModel:function(){var content=qx.bom.client.Engine.getName()!==bO||!qx.bom.client.Browser.getQuirksMode();return content?j:bW;}
,getTextOverflow:function(){return qx.bom.Style.getPropertyName(bY);}
,getPlaceholder:function(){var i=document.createElement(s);return H in i;}
,getAppearance:function(){return qx.bom.Style.getPropertyName(F);}
,getBorderRadius:function(){return qx.bom.Style.getPropertyName(e);}
,getBoxShadow:function(){return qx.bom.Style.getPropertyName(bU);}
,getBorderImage:function(){return qx.bom.Style.getPropertyName(v);}
,getBorderImageSyntax:function(){var cc=qx.bom.client.Css.getBorderImage();if(!cc){return null;}
;var cb=document.createElement(o);if(cc===v){cb.style[cc]=B;if(cb.style.borderImageSource.indexOf(U)>=0&&cb.style.borderImageSlice.indexOf(bK)>=0&&cb.style.borderImageRepeat.indexOf(g)>=0){return true;}
;}
else {cb.style[cc]=bI;if(cb.style[cc].indexOf(U)>=0){return false;}
;}
;return null;}
,getUserSelect:function(){return qx.bom.Style.getPropertyName(w);}
,getUserSelectNone:function(){var ce=qx.bom.client.Css.getUserSelect();if(ce){var cd=document.createElement(bF);cd.style[ce]=I;return cd.style[ce]===I?I:bL;}
;return null;}
,getUserModify:function(){return qx.bom.Style.getPropertyName(bQ);}
,getFloat:function(){var cf=document.documentElement.style;return cf.cssFloat!==undefined?bV:cf.styleFloat!==undefined?x:null;}
,getLinearGradient:function(){qx.bom.client.Css.__oR=false;var cj=Q;var cg=document.createElement(o);var ch=qx.bom.Style.getAppliedStyle(cg,J,cj);if(!ch){cj=bN;var ch=qx.bom.Style.getAppliedStyle(cg,J,cj,false);if(ch){qx.bom.client.Css.__oR=true;}
;}
;if(!ch){return null;}
;var ci=/(.*?)\(/.exec(ch);return ci?ci[1]:null;}
,getFilterGradient:function(){return qx.bom.client.Css.__oS(bD,bA);}
,getRadialGradient:function(){var cn=X;var ck=document.createElement(o);var cl=qx.bom.Style.getAppliedStyle(ck,J,cn);if(!cl){return null;}
;var cm=/(.*?)\(/.exec(cl);return cm?cm[1]:null;}
,getLegacyWebkitGradient:function(){if(qx.bom.client.Css.__oR===null){qx.bom.client.Css.getLinearGradient();}
;return qx.bom.client.Css.__oR;}
,getRgba:function(){var co;try{co=document.createElement(o);}
catch(cp){co=document.createElement();}
;try{co.style[t]=V;if(co.style[t].indexOf(Y)!=-1){return true;}
;}
catch(cq){}
;return false;}
,getBoxSizing:function(){return qx.bom.Style.getPropertyName(f);}
,getInlineBlock:function(){var cr=document.createElement(bF);cr.style.display=bX;if(cr.style.display==bX){return bX;}
;cr.style.display=bP;if(cr.style.display!==bP){return bP;}
;return null;}
,getOpacity:function(){return (typeof document.documentElement.style.opacity==u);}
,getTextShadow:function(){return !!qx.bom.Style.getPropertyName(R);}
,getFilterTextShadow:function(){return qx.bom.client.Css.__oS(L,W);}
,__oS:function(cv,ct){var cu=false;var cw=bR+cv+bG+ct+bJ;var cs=document.createElement(o);document.body.appendChild(cs);cs.style.filter=cw;if(cs.filters&&cs.filters.length>0&&cs.filters.item(cv).enabled==true){cu=true;}
;document.body.removeChild(cs);return cu;}
,getAlphaImageLoaderNeeded:function(){return qx.bom.client.Engine.getName()==bO&&qx.bom.client.Browser.getDocumentMode()<9;}
,getPointerEvents:function(){var cx=document.documentElement;if(p in cx.style){var cz=cx.style.pointerEvents;cx.style.pointerEvents=S;cx.style.pointerEvents=b;var cy=cx.style.pointerEvents==S;cx.style.pointerEvents=cz;return cy;}
;return false;}
,getFlexboxSyntax:function(){var cB=null;var cA=document.createElement(d);var cC=[{value:M,syntax:M},{value:G,syntax:A},{value:bH,syntax:M}];for(var i=0;i<cC.length;i++ ){try{cA.style.display=cC[i].value;}
catch(cD){return null;}
;if(cA.style.display===cC[i].value){cB=cC[i].syntax;break;}
;}
;cA=null;return cB;}
},defer:function(cE){qx.core.Environment.add(bT,cE.getTextOverflow);qx.core.Environment.add(bB,cE.getPlaceholder);qx.core.Environment.add(h,cE.getBorderRadius);qx.core.Environment.add(E,cE.getBoxShadow);qx.core.Environment.add(bC,cE.getLinearGradient);qx.core.Environment.add(l,cE.getFilterGradient);qx.core.Environment.add(q,cE.getRadialGradient);qx.core.Environment.add(O,cE.getLegacyWebkitGradient);qx.core.Environment.add(C,cE.getBoxModel);qx.core.Environment.add(ca,cE.getRgba);qx.core.Environment.add(T,cE.getBorderImage);qx.core.Environment.add(c,cE.getBorderImageSyntax);qx.core.Environment.add(z,cE.getUserModify);qx.core.Environment.add(bE,cE.getUserSelect);qx.core.Environment.add(bS,cE.getUserSelectNone);qx.core.Environment.add(m,cE.getAppearance);qx.core.Environment.add(a,cE.getFloat);qx.core.Environment.add(bM,cE.getBoxSizing);qx.core.Environment.add(k,cE.getInlineBlock);qx.core.Environment.add(n,cE.getOpacity);qx.core.Environment.add(K,cE.getTextShadow);qx.core.Environment.add(y,cE.getFilterTextShadow);qx.core.Environment.add(N,cE.getAlphaImageLoaderNeeded);qx.core.Environment.add(r,cE.getPointerEvents);qx.core.Environment.add(P,cE.getFlexboxSyntax);}
});}
)();
(function(){var a="radiusTopRight",b="radiusTopLeft",c="px",d="-webkit-border-bottom-left-radius",e="-webkit-background-clip",f="radiusBottomRight",g="Integer",h="-webkit-border-bottom-right-radius",i="background-clip",j="border-top-left-radius",k="qx.debug",l="border-top-right-radius",m="border-bottom-left-radius",n="radiusBottomLeft",o="-webkit-border-top-left-radius",p="shorthand",q="-moz-border-radius-bottomright",r="padding-box",s="border-bottom-right-radius",t="qx.ui.decoration.MBorderRadius",u="-moz-border-radius-topright",v="engine.name",w="This decorator is already in-use. Modification is not possible anymore!",x="_applyBorderRadius",y="-webkit-border-top-right-radius",z="webkit",A="-moz-border-radius-topleft",B="-moz-border-radius-bottomleft";qx.Mixin.define(t,{properties:{radiusTopLeft:{nullable:true,check:g,apply:x},radiusTopRight:{nullable:true,check:g,apply:x},radiusBottomLeft:{nullable:true,check:g,apply:x},radiusBottomRight:{nullable:true,check:g,apply:x},radius:{group:[b,a,f,n],mode:p}},members:{_styleBorderRadius:function(C){C[e]=r;C[i]=r;var D=false;var E=this.getRadiusTopLeft();if(E>0){D=true;C[A]=E+c;C[o]=E+c;C[j]=E+c;}
;E=this.getRadiusTopRight();if(E>0){D=true;C[u]=E+c;C[y]=E+c;C[l]=E+c;}
;E=this.getRadiusBottomLeft();if(E>0){D=true;C[B]=E+c;C[d]=E+c;C[m]=E+c;}
;E=this.getRadiusBottomRight();if(E>0){D=true;C[q]=E+c;C[h]=E+c;C[s]=E+c;}
;if(D&&qx.core.Environment.get(v)==z){C[e]=r;}
else {C[i]=r;}
;}
,_applyBorderRadius:function(){if(qx.core.Environment.get(k)){if(this._isInitialized()){throw new Error(w);}
;}
;}
}});}
)();
(function(){var a="border-width",b="css.borderimage.standardsyntax",c="repeat",d="Boolean",e="-l",f="stretch",g="px ",h="sliceBottom",i="-t",j="Integer",k="solid",l="borderImage",m="-r",n="border-style",o="qx.debug",p="sliceLeft",q="-b",r="sliceRight",s="px",t="repeatX",u=" fill",v="String",w="vertical",x="",y="transparent",z="round",A='") ',B="shorthand",C="qx.ui.decoration.MBorderImage",D="sliceTop",E="horizontal",F="_applyBorderImage",G="border-color",H="This decorator is already in-use. Modification is not possible anymore!",I='url("',J=" ",K="grid",L="repeatY";qx.Mixin.define(C,{properties:{borderImage:{check:v,nullable:true,apply:F},sliceTop:{check:j,nullable:true,init:null,apply:F},sliceRight:{check:j,nullable:true,init:null,apply:F},sliceBottom:{check:j,nullable:true,init:null,apply:F},sliceLeft:{check:j,nullable:true,init:null,apply:F},slice:{group:[D,r,h,p],mode:B},repeatX:{check:[f,c,z],init:f,apply:F},repeatY:{check:[f,c,z],init:f,apply:F},repeat:{group:[t,L],mode:B},fill:{check:d,init:true,apply:F},borderImageMode:{check:[E,w,K],init:K}},members:{_styleBorderImage:function(M){if(!this.getBorderImage()){return;}
;var O=qx.util.AliasManager.getInstance().resolve(this.getBorderImage());var Q=qx.util.ResourceManager.getInstance().toUri(O);var T=this._getDefaultInsetsForBorderImage();var N=[T.top,T.right,T.bottom,T.left];var R=[this.getRepeatX(),this.getRepeatY()].join(J);var U=this.getFill()&&qx.core.Environment.get(b)?u:x;var P=qx.bom.Style.getPropertyName(l);if(P){var S=qx.bom.Style.getCssName(P);M[S]=I+Q+A+N.join(J)+U+J+R;}
;M[n]=k;M[G]=y;M[a]=N.join(g)+s;}
,_getDefaultInsetsForBorderImage:function(){if(!this.getBorderImage()){return {top:0,right:0,bottom:0,left:0};}
;var V=qx.util.AliasManager.getInstance().resolve(this.getBorderImage());var W=this.__xj(V);return {top:this.getSliceTop()||W[0],right:this.getSliceRight()||W[1],bottom:this.getSliceBottom()||W[2],left:this.getSliceLeft()||W[3]};}
,_applyBorderImage:function(){if(qx.core.Environment.get(o)){if(this._isInitialized()){throw new Error(H);}
;}
;}
,__xj:function(be){var bd=this.getBorderImageMode();var bf=0;var bb=0;var bc=0;var bg=0;var bh=/(.*)(\.[a-z]+)$/.exec(be);var X=bh[1];var ba=bh[2];var Y=qx.util.ResourceManager.getInstance();if(bd==K||bd==w){bf=Y.getImageHeight(X+i+ba);bc=Y.getImageHeight(X+q+ba);}
;if(bd==K||bd==E){bb=Y.getImageWidth(X+m+ba);bg=Y.getImageWidth(X+e+ba);}
;return [bf,bb,bc,bg];}
}});}
)();
(function(){var a=" 0",b="),to(",c="px",d="css.borderradius",e="from(",f=")",g="css.gradient.filter",h='background',j="orientation",k="filter",l="', ",m="0",n="_applyLinearBackgroundGradient",o="-webkit-gradient(linear,",p="%",q="qx.debug",r="background-color",s="deg, ",t="url(",u="css.gradient.legacywebkit",v="EndColorStr='#FF",w="startColor",x="shorthand",y="qx.theme",z="px 100%",A=") ",B="(GradientType=",C="vertical",D="",E="transparent",F="qx.ui.decoration.MLinearBackgroundGradient",G="% 100%",H="endColorPosition",I="canvas",J="(",K="css.gradient.linear",L="';)",M="endColor",N=", ",O="background",P="horizontal",Q="This decorator is already in-use. Modification is not possible anymore!",R="progid:DXImageTransform.Microsoft.Gradient",S="StartColorStr='#FF",T="100% ",U='2d',V="startColorPosition",W=" ",X="white",Y="colorPositionUnit",bd="linear-gradient",be='getOrderGradientsFront',bf=",";qx.Mixin.define(F,{properties:{startColor:{nullable:true,apply:n},endColor:{nullable:true,apply:n},orientation:{init:C,apply:n},startColorPosition:{init:0,apply:n},endColorPosition:{init:100,apply:n},colorPositionUnit:{init:p,apply:n},gradientStart:{group:[w,V],mode:x},gradientEnd:{group:[M,H],mode:x}},members:{_styleLinearBackgroundGradient:function(bg){var bi=[];if(!this.getStartColor()||!this.getEndColor()){return;}
;var bh=this.__xn;if(qx.core.Environment.get(u)){bh=this.__xk;}
else if(qx.core.Environment.get(g)&&!qx.core.Environment.get(K)&&qx.core.Environment.get(d)){bh=this.__xl;}
else if(qx.core.Environment.get(g)&&!qx.core.Environment.get(K)){bh=this.__xm;}
;var bj=[w,M,Y,j,V,H];(function(bo,bq,bt,br,bk,bn){for(var i=0;i<bo.length;i++ ){var bw=this.__xo(bo[i]);var bp=this.__xo(bq[i]);var bx=bt[i];var bm=br[i];var bl=bk[i];var bu=bn[i];if(!bh(bw,bp,bx,bm,bl,bu,bg,bi)){break;}
;}
;if(O in bg){if(!qx.lang.Type.isArray(bg[h])){bg[h]=[bg[h]];}
;}
else {bg[h]=[];}
;var bs=be in this?this.getOrderGradientsFront():false;var bv=bs?Array.prototype.unshift:Array.prototype.push;bv.apply(bg[h],bi);}
).apply(this,this._getExtendedPropertyValueArrays(bj));}
,__xk:function(bH,bE,bI,bA,bz,bC,by,bD){bI=bI===c?D:bI;if(bA==P){var bG=bz+bI+a+bI;var bF=bC+bI+a+bI;}
else {var bG=m+bI+W+bz+bI;var bF=m+bI+W+bC+bI;}
;var bB=e+bH+b+bE+f;bD.push(o+bG+bf+bF+bf+bB+f);return true;}
,__xl:function bJ(bW,bQ,bY,bM,bL,bN,bK,bO){if(!bJ.__mW){bJ.__mW=document.createElement(I);}
;var bX=bM==C;var bP=bX?200:1;var bR=bX?1:200;var bS=Math.max(100,bN-bL);if(bY===c){if(bX){bP=Math.max(bP,bN-bL);}
else {bR=Math.max(bR,bN-bL);}
;}
else {if(bX){bP=Math.max(bP,(bN-bL)*2);}
else {bR=Math.max(bR,(bN-bL)*2);}
;}
;bJ.__mW.width=bR;bJ.__mW.height=bP;var bT=bJ.__mW.getContext(U);if(bX){var bV=bT.createLinearGradient(0,0,0,bP);}
else {var bV=bT.createLinearGradient(0,0,bR,0);}
;if(bY===p){bV.addColorStop(Math.max(0,bL)/bS,bW);bV.addColorStop(bN/bS,bQ);}
else {var bU=bX?bP:bR;bV.addColorStop(Math.max(0,bL)/bU,bW);bV.addColorStop(bN/bU,bQ);}
;bT.clearRect(0,0,bR,bP);bT.fillStyle=bV;bT.fillRect(0,0,bR,bP);var ca;if(bY===p){ca=bX?T+bS+p:bS+G;}
else {ca=bX?bP+z:T+bR+c;}
;bO.push(t+bJ.__mW.toDataURL()+A+ca);return true;}
,__xm:function(ci,ch,ck,cd,cc,ce,cb,cf){var cj=cd==P?1:0;if(!qx.util.ColorUtil.isHex6String(ci)){ci=qx.util.ColorUtil.stringToRgb(ci);ci=qx.util.ColorUtil.rgbToHexString(ci);}
;if(!qx.util.ColorUtil.isHex6String(ch)){ch=qx.util.ColorUtil.stringToRgb(ch);ch=qx.util.ColorUtil.rgbToHexString(ch);}
;ci=ci.substring(1,ci.length);ch=ch.substring(1,ch.length);var cg=R+B+cj+N+S+ci+l+v+ch+L;if(cb[k]){cb[k]+=N+cg;}
else {cb[k]=cg;}
;if(!cb[r]||cb[r]==E){cb[r]=X;}
;return false;}
,__xn:function(cu,cr,cv,co,cm,cp,cl,cq){var cw=co==P?0:270;var cs=cu+W+cm+cv;var cn=cr+W+cp+cv;var ct=qx.core.Environment.get(K);if(ct===bd){cw=co==P?cw+90:cw-90;}
;cq.push(ct+J+cw+s+cs+bf+cn+f);return true;}
,__xo:function(cx){return qx.core.Environment.get(y)?qx.theme.manager.Color.getInstance().resolve(cx):cx;}
,_applyLinearBackgroundGradient:function(){if(qx.core.Environment.get(q)){if(this._isInitialized()){throw new Error(Q);}
;}
;}
}});}
)();
(function(){var a="_applyBoxShadow",b="shadowHorizontalLength",c="shadowBlurRadius",d="shadowColor",e="This decorator is already in-use. Modification is not possible anymore!",f="qx.debug",g="qx.theme",h="shadowSpreadRadius",j="px ",k='',l="css.boxshadow",m="shadowVerticalLength",n="shorthand",o="qx.ui.decoration.MBoxShadow",p="inset",q='inset ',r="black",s=",";qx.Mixin.define(o,{properties:{shadowHorizontalLength:{nullable:true,apply:a},shadowVerticalLength:{nullable:true,apply:a},shadowBlurRadius:{nullable:true,apply:a},shadowSpreadRadius:{nullable:true,apply:a},shadowColor:{nullable:true,apply:a},inset:{init:false,apply:a},shadowLength:{group:[b,m],mode:n}},members:{_styleBoxShadow:function(t){var v=qx.core.Environment.get(l);if(!v||this.getShadowVerticalLength()==null&&this.getShadowHorizontalLength()==null){return;}
;v=qx.bom.Style.getCssName(v);var u=null;if(qx.core.Environment.get(g)){u=qx.theme.manager.Color.getInstance();}
;var w=[m,b,c,h,d,p];(function(A,I,C,y,x,D){for(var i=0;i<A.length;i++ ){var H=A[i]||0;var z=I[i]||0;var blur=C[i]||0;var G=y[i]||0;var E=x[i]||r;var F=D[i];if(u){E=u.resolve(E);}
;if(E!=null){var B=(F?q:k)+z+j+H+j+blur+j+G+j+E;if(!t[v]){t[v]=B;}
else {t[v]+=s+B;}
;}
;}
;}
).apply(this,this._getExtendedPropertyValueArrays(w));}
,_applyBoxShadow:function(){if(qx.core.Environment.get(f)){if(this._isInitialized()){throw new Error(e);}
;}
;}
}});}
)();
(function(){var a=', ',b="qx.ui.decoration.Decorator",c="_style",d="_getDefaultInsetsFor",e="left",f="top",g="bottom",h="right";qx.Class.define(b,{extend:qx.ui.decoration.Abstract,implement:[qx.ui.decoration.IDecorator],include:[qx.ui.decoration.MBackgroundColor,qx.ui.decoration.MBorderRadius,qx.ui.decoration.MBoxShadow,qx.ui.decoration.MDoubleBorder,qx.ui.decoration.MLinearBackgroundGradient,qx.ui.decoration.MBorderImage],members:{__cv:false,getPadding:function(){var l=this.getInset();var j=this._getDefaultInsetsForBorderImage();var o=l.top-(j.top?j.top:this.getWidthTop());var n=l.right-(j.right?j.right:this.getWidthRight());var k=l.bottom-(j.bottom?j.bottom:this.getWidthBottom());var m=l.left-(j.left?j.left:this.getWidthLeft());return {top:l.top?o:this.getInnerWidthTop(),right:l.right?n:this.getInnerWidthRight(),bottom:l.bottom?k:this.getInnerWidthBottom(),left:l.left?m:this.getInnerWidthLeft()};}
,getStyles:function(s){if(s){return this._getStyles();}
;var r={};var q=this._getStyles();for(var p in q){r[qx.lang.String.camelCase(p)]=q[p];}
;return r;}
,_getStyles:function(){var t={};for(var name in this){if(name.indexOf(c)==0&&this[name] instanceof Function){this[name](t);}
;}
;for(var name in t){if(qx.lang.Type.isArray(t[name])){t[name]=t[name].join(a);}
;}
;this.__cv=true;return t;}
,_getDefaultInsets:function(){var x=[f,h,g,e];var v={};for(var name in this){if(name.indexOf(d)==0&&this[name] instanceof Function){var w=this[name]();for(var i=0;i<x.length;i++ ){var u=x[i];if(v[u]==undefined){v[u]=w[u];}
;if(w[u]>v[u]){v[u]=w[u];}
;}
;}
;}
;if(v[f]!=undefined){return v;}
;return {top:0,right:0,bottom:0,left:0};}
,_isInitialized:function(){return this.__cv;}
,_getExtendedPropertyValueArrays:function(A){var z=A.map(function(B){var C=this.get(B);if(!qx.lang.Type.isArray(C)){C=[C];}
;return C;}
,this);var y=Math.max.apply(Math,z.map(function(D){return D.length;}
));for(var i=0;i<z.length;i++ ){this.__xp(z[i],y);}
;return z;}
,__xp:function(F,E){var G=F.length;while(F.length<E){F.push(F[F.length%G]);}
;}
}});}
)();
(function(){var a="_applyTheme",b="qx.theme.manager.Font",c="_dynamic",d="Theme",e="changeTheme",f="singleton";qx.Class.define(b,{type:f,extend:qx.util.ValueManager,properties:{theme:{check:d,nullable:true,apply:a,event:e}},members:{resolveDynamic:function(h){var g=this._dynamic;return h instanceof qx.bom.Font?h:g[h];}
,resolve:function(l){var k=this._dynamic;var i=k[l];if(i){return i;}
;var j=this.getTheme();if(j!==null&&j.fonts[l]){var m=this.__xr(j.fonts[l]);return k[l]=(new m).set(j.fonts[l]);}
;return l;}
,isDynamic:function(q){var p=this._dynamic;if(q&&(q instanceof qx.bom.Font||p[q]!==undefined)){return true;}
;var o=this.getTheme();if(o!==null&&q&&o.fonts[q]){var n=this.__xr(o.fonts[q]);p[q]=(new n).set(o.fonts[q]);return true;}
;return false;}
,__xq:function(s,r){if(s[r].include){var t=s[s[r].include];s[r].include=null;delete s[r].include;s[r]=qx.lang.Object.mergeWith(s[r],t,false);this.__xq(s,r);}
;}
,_applyTheme:function(y){var u=this._dynamic;for(var x in u){if(u[x].themed){u[x].dispose();delete u[x];}
;}
;if(y){var v=y.fonts;for(var x in v){if(v[x].include&&v[v[x].include]){this.__xq(v,x);}
;var w=this.__xr(v[x]);u[x]=(new w).set(v[x]);u[x].themed=true;}
;}
;this._setDynamic(u);}
,__xr:function(z){if(z.sources){return qx.bom.webfonts.WebFont;}
;return qx.bom.Font;}
},destruct:function(){this._disposeMap(c);}
});}
)();
(function(){var a="Boolean",b="px",c="_applyItalic",d="_applyBold",e="underline",f="_applyTextShadow",g="Integer",h="_applyFamily",j="_applyLineHeight",k='"',m="Array",n="line-through",o="overline",p="Color",q="String",r="",s="italic",t="normal",u="qx.bom.Font",v="bold",w="Number",x="_applyDecoration",y=" ",z="_applySize",A=",",B="_applyColor";qx.Class.define(u,{extend:qx.core.Object,construct:function(D,C){qx.core.Object.call(this);this.__xs={fontFamily:r,fontSize:null,fontWeight:null,fontStyle:null,textDecoration:null,lineHeight:null,color:null,textShadow:null};if(D!==undefined){this.setSize(D);}
;if(C!==undefined){this.setFamily(C);}
;}
,statics:{fromString:function(H){var I=new qx.bom.Font();var F=H.split(/\s+/);var name=[];var G;for(var i=0;i<F.length;i++ ){switch(G=F[i]){case v:I.setBold(true);break;case s:I.setItalic(true);break;case e:I.setDecoration(e);break;default:var E=parseInt(G,10);if(E==G||qx.lang.String.contains(G,b)){I.setSize(E);}
else {name.push(G);}
;break;};}
;if(name.length>0){I.setFamily(name);}
;return I;}
,fromConfig:function(K){var J=new qx.bom.Font;J.set(K);return J;}
,__xt:{fontFamily:r,fontSize:r,fontWeight:r,fontStyle:r,textDecoration:r,lineHeight:1.2,color:r,textShadow:r},getDefaultStyles:function(){return this.__xt;}
},properties:{size:{check:g,nullable:true,apply:z},lineHeight:{check:w,nullable:true,apply:j},family:{check:m,nullable:true,apply:h},bold:{check:a,nullable:true,apply:d},italic:{check:a,nullable:true,apply:c},decoration:{check:[e,n,o],nullable:true,apply:x},color:{check:p,nullable:true,apply:B},textShadow:{nullable:true,check:q,apply:f}},members:{__xs:null,_applySize:function(M,L){this.__xs.fontSize=M===null?null:M+b;}
,_applyLineHeight:function(O,N){this.__xs.lineHeight=O===null?null:O;}
,_applyFamily:function(P,Q){var R=r;for(var i=0,l=P.length;i<l;i++ ){if(P[i].indexOf(y)>0){R+=k+P[i]+k;}
else {R+=P[i];}
;if(i!==l-1){R+=A;}
;}
;this.__xs.fontFamily=R;}
,_applyBold:function(T,S){this.__xs.fontWeight=T==null?null:T?v:t;}
,_applyItalic:function(V,U){this.__xs.fontStyle=V==null?null:V?s:t;}
,_applyDecoration:function(X,W){this.__xs.textDecoration=X==null?null:X;}
,_applyColor:function(ba,Y){this.__xs.color=null;if(ba){this.__xs.color=qx.theme.manager.Color.getInstance().resolve(ba);}
;}
,_applyTextShadow:function(bc,bb){this.__xs.textShadow=bc==null?null:bc;}
,getStyles:function(){return this.__xs;}
}});}
)();
(function(){var a="qx.bom.webfonts.WebFont",b="",c="qx.debug",d="changeStatus",e="_applySources",f="qx.event.type.Data",g=" was not applied, perhaps the source file could not be loaded.",h="WebFont ";qx.Class.define(a,{extend:qx.bom.Font,events:{"changeStatus":f},properties:{sources:{nullable:true,apply:e}},members:{__xu:null,_applySources:function(m,o){var j=[];for(var i=0,l=m.length;i<l;i++ ){var k=this._quoteFontFamily(m[i].family);j.push(k);var n=m[i];qx.bom.webfonts.Manager.getInstance().require(k,n,this._onWebFontChangeStatus,this);}
;this.setFamily(j.concat(this.getFamily()));}
,_onWebFontChangeStatus:function(p){var q=p.getData();this.fireDataEvent(d,q);if(qx.core.Environment.get(c)){if(q.valid===false){this.warn(h+q.family+g);}
;}
;}
,_quoteFontFamily:function(r){return r.replace(/["']/g,b);}
}});}
)();
(function(){var a="m",b="os.name",c=")",d="os.version",e="qx.bom.webfonts.Manager",f=".*font-style: *",g="svg",h="chrome",k="browser.name",n="singleton",o=",\n",p="src: ",q="mobileSafari",r="\nfont-style: ",s="');",t="qx.debug",u="interval",v="'eot)",w="#",y="firefox",z="!",A="eot",B="ios",C="changeStatus",D="Couldn't create @font-face rule for WebFont ",E="}\n",F="font-family: ",G="browser.documentmode",H="mobile safari",I="safari",J="@font-face.*?",K=";",L="",M="ttf",N="_",O="') format('svg')",P=";\n",Q="('embedded-opentype')",R="browser.version",S="opera",T="engine.version",U="') format('woff')",V="normal",W="mshtml",X="engine.name",Y="url('",bq="src: url('",br="('embedded-opentype)",bs="\nfont-weight: ",bm=".*font-weight: *",bn="?#iefix') format('embedded-opentype')",bo="woff",bp="ie",bu="\.(",bv="'eot')",bw="Error while adding @font-face rule:",bx="@font-face {",bt="') format('truetype')";qx.Class.define(e,{extend:qx.core.Object,type:n,construct:function(){qx.core.Object.call(this);this.__xv=[];this.__xw={};this.__rn=[];this.__xx=this.getPreferredFormats();}
,statics:{FONT_FORMATS:[A,bo,M,g],VALIDATION_TIMEOUT:5000},members:{__xv:null,__xy:null,__xw:null,__xx:null,__rn:null,__xz:null,require:function(bC,bA,bE,bH){var bB=bA.source;var bD=bA.fontWeight;var bz=bA.fontStyle;var bF=[];for(var i=0,l=bB.length;i<l;i++ ){var bG=bB[i].split(w);var by=qx.util.ResourceManager.getInstance().toUri(bG[0]);if(bG.length>1){by=by+w+bG[1];}
;bF.push(by);}
;if(qx.core.Environment.get(X)==W&&(parseInt(qx.core.Environment.get(T))<9||qx.core.Environment.get(G)<9)){if(!this.__xz){this.__xz=new qx.event.Timer(100);this.__xz.addListener(u,this.__xC,this);}
;if(!this.__xz.isEnabled()){this.__xz.start();}
;this.__rn.push([bC,bF,bD,bz,bE,bH]);}
else {this.__xB(bC,bF,bD,bz,bE,bH);}
;}
,remove:function(bK,bL,bM){var bJ=this.__xA(bK,bL,bM);var bI=null;for(var i=0,l=this.__xv.length;i<l;i++ ){if(this.__xv[i]==bJ){bI=i;this.__xI(bK,bL,bM);break;}
;}
;if(bI!==null){qx.lang.Array.removeAt(this.__xv,bI);}
;if(bK in this.__xw){this.__xw[bK].dispose();delete this.__xw[bK];}
;}
,getPreferredFormats:function(){var bN=[];var bR=qx.core.Environment.get(k);var bO=qx.core.Environment.get(R);var bQ=qx.core.Environment.get(b);var bP=qx.core.Environment.get(d);if((bR==bp&&qx.core.Environment.get(G)>=9)||(bR==y&&bO>=3.6)||(bR==h&&bO>=6)){bN.push(bo);}
;if((bR==S&&bO>=10)||(bR==I&&bO>=3.1)||(bR==y&&bO>=3.5)||(bR==h&&bO>=4)||(bR==H&&bQ==B&&bP>=4.2)){bN.push(M);}
;if(bR==bp&&bO>=4){bN.push(A);}
;if(bR==q&&bQ==B&&bP>=4.1){bN.push(g);}
;return bN;}
,removeStyleSheet:function(){this.__xv=[];if(this.__xy){qx.bom.Stylesheet.removeSheet(this.__xy);}
;this.__xy=null;}
,__xA:function(bT,bS,bV){var bU=bT+N+(bS?bS:V)+N+(bV?bV:V);return bU;}
,__xB:function(ca,ce,bY,bX,cc,cf){var cd=this.__xA(ca,bY,bX);if(!qx.lang.Array.contains(this.__xv,cd)){var cg=this.__xE(ce);var cb=this.__xF(ca,bY,bX,cg);if(!cb){throw new Error(D+ca+z);}
;if(!this.__xy){this.__xy=qx.bom.Stylesheet.createElement();}
;try{this.__xH(cb);}
catch(ch){if(qx.core.Environment.get(t)){this.warn(bw,ch.message);return;}
;}
;this.__xv.push(cd);}
;if(!this.__xw[ca]){this.__xw[ca]=new qx.bom.webfonts.Validator(ca);this.__xw[ca].setTimeout(qx.bom.webfonts.Manager.VALIDATION_TIMEOUT);this.__xw[ca].addListenerOnce(C,this.__xD,this);}
;if(cc){var bW=cf||window;this.__xw[ca].addListenerOnce(C,cc,bW);}
;this.__xw[ca].validate();}
,__xC:function(){if(this.__rn.length==0){this.__xz.stop();return;}
;var ci=this.__rn.shift();this.__xB.apply(this,ci);}
,__xD:function(cj){var ck=cj.getData();if(ck.valid===false){qx.event.Timer.once(function(){this.remove(ck.family);}
,this,250);}
;}
,__xE:function(cl){var cn=qx.bom.webfonts.Manager.FONT_FORMATS;var cm={};for(var i=0,l=cl.length;i<l;i++ ){var co=null;for(var x=0;x<cn.length;x++ ){var cp=new RegExp(bu+cn[x]+c);var cq=cp.exec(cl[i]);if(cq){co=cq[1];}
;}
;if(co){cm[co]=cl[i];}
;}
;return cm;}
,__xF:function(cu,cr,cx,cy){var cw=[];var cs=this.__xx.length>0?this.__xx:qx.bom.webfonts.Manager.FONT_FORMATS;for(var i=0,l=cs.length;i<l;i++ ){var ct=cs[i];if(cy[ct]){cw.push(this.__xG(ct,cy[ct]));}
;}
;var cv=p+cw.join(o)+K;cv=F+cu+P+cv;cv=cv+r+(cx?cx:V)+K;cv=cv+bs+(cr?cr:V)+K;return cv;}
,__xG:function(cA,cz){switch(cA){case A:return Y+cz+s+bq+cz+bn;case bo:return Y+cz+U;case M:return Y+cz+bt;case g:return Y+cz+O;default:return null;};}
,__xH:function(cC){var cB=bx+cC+E;if(qx.core.Environment.get(k)==bp&&qx.core.Environment.get(G)<9){var cD=this.__xJ(this.__xy.cssText);cD+=cB;this.__xy.cssText=cD;}
else {this.__xy.insertRule(cB,this.__xy.cssRules.length);}
;}
,__xI:function(cH,cI,cE){var cJ=new RegExp(J+cH+f+(cE?cE:V)+bm+(cI?cI:V),a);for(var i=0,l=document.styleSheets.length;i<l;i++ ){var cF=document.styleSheets[i];if(cF.cssText){var cG=cF.cssText.replace(/\n/g,L).replace(/\r/g,L);cG=this.__xJ(cG);if(cJ.exec(cG)){cG=cG.replace(cJ,L);}
;cF.cssText=cG;}
else if(cF.cssRules){for(var j=0,m=cF.cssRules.length;j<m;j++ ){var cG=cF.cssRules[j].cssText.replace(/\n/g,L).replace(/\r/g,L);if(cJ.exec(cG)){this.__xy.deleteRule(j);return;}
;}
;}
;}
;}
,__xJ:function(cK){return cK.replace(v,bv).replace(br,Q);}
},destruct:function(){if(this.__xz){this.__xz.stop();this.__xz.dispose();}
;delete this.__xv;this.removeStyleSheet();for(var cL in this.__xw){this.__xw[cL].dispose();}
;qx.bom.webfonts.Validator.removeDefaultHelperElements();}
});}
)();
(function(){var a="qx.event.Timer",b="_applyInterval",c="interval",d="func is not a function",f="Boolean",g="qx.debug",h="No timeout given",i="Integer",j="qx.event.type.Event",k="_applyEnabled";qx.Class.define(a,{extend:qx.core.Object,construct:function(l){qx.core.Object.call(this);this.setEnabled(false);if(l!=null){this.setInterval(l);}
;var self=this;this.__xK=function(){self._oninterval.call(self);}
;}
,events:{"interval":j},statics:{once:function(m,n,o){if(qx.core.Environment.get(g)){qx.core.Assert.assertFunction(m,d);qx.core.Assert.assertNotUndefined(o,h);}
;var p=new qx.event.Timer(o);p.__xL=m;p.addListener(c,function(e){p.stop();m.call(n,e);p.dispose();n=null;}
,n);p.start();return p;}
},properties:{enabled:{init:true,check:f,apply:k},interval:{check:i,init:1000,apply:b}},members:{__xM:null,__xK:null,_applyInterval:function(r,q){if(this.getEnabled()){this.restart();}
;}
,_applyEnabled:function(t,s){if(s){window.clearInterval(this.__xM);this.__xM=null;}
else if(t){this.__xM=window.setInterval(this.__xK,this.getInterval());}
;}
,start:function(){this.setEnabled(true);}
,startWith:function(u){this.setInterval(u);this.start();}
,stop:function(){this.setEnabled(false);}
,restart:function(){this.stop();this.start();}
,restartWith:function(v){this.stop();this.startWith(v);}
,_oninterval:qx.event.GlobalError.observeMethod(function(){if(this.$$disposed){return;}
;if(this.getEnabled()){this.fireEvent(c);}
;}
)},destruct:function(){if(this.__xM){window.clearInterval(this.__xM);}
;this.__xM=this.__xK=null;}
});}
)();
(function(){var a="sans-serif",b="changeStatus",c="__xQ",d="Integer",e="auto",f="qx.event.type.Data",g="0",h="qx.bom.webfonts.Validator",i="interval",j="Georgia",k="WEei",l="visible",m="Times New Roman",n="Arial",o="normal",p="Helvetica",q="350px",r="_applyFontFamily",s="-1000px",t="hidden",u="serif",v="span",w="absolute",x=",";qx.Class.define(h,{extend:qx.core.Object,construct:function(y){qx.core.Object.call(this);if(y){this.setFontFamily(y);this.__xN=this._getRequestedHelpers();}
;}
,statics:{COMPARISON_FONTS:{sans:[n,p,a],serif:[m,j,u]},HELPER_CSS:{position:w,margin:g,padding:g,top:s,left:s,fontSize:q,width:e,height:e,lineHeight:o,fontVariant:o,visibility:t},COMPARISON_STRING:k,__xO:null,__xP:null,removeDefaultHelperElements:function(){var z=qx.bom.webfonts.Validator.__xP;if(z){for(var A in z){document.body.removeChild(z[A]);}
;}
;delete qx.bom.webfonts.Validator.__xP;}
},properties:{fontFamily:{nullable:true,init:null,apply:r},timeout:{check:d,init:5000}},events:{"changeStatus":f},members:{__xN:null,__xQ:null,__xR:null,validate:function(){this.__xR=new Date().getTime();if(this.__xQ){this.__xQ.restart();}
else {this.__xQ=new qx.event.Timer(100);this.__xQ.addListener(i,this.__xS,this);qx.event.Timer.once(function(){this.__xQ.start();}
,this,0);}
;}
,_reset:function(){if(this.__xN){for(var C in this.__xN){var B=this.__xN[C];document.body.removeChild(B);}
;this.__xN=null;}
;}
,_isFontValid:function(){if(!qx.bom.webfonts.Validator.__xO){this.__nz();}
;if(!this.__xN){this.__xN=this._getRequestedHelpers();}
;this.__xN.sans.style.visibility=l;this.__xN.sans.style.visibility=t;this.__xN.serif.style.visibility=l;this.__xN.serif.style.visibility=t;var E=qx.bom.element.Dimension.getWidth(this.__xN.sans);var D=qx.bom.element.Dimension.getWidth(this.__xN.serif);var F=qx.bom.webfonts.Validator;if(E!==F.__xO.sans||D!==F.__xO.serif){return true;}
;return false;}
,_getRequestedHelpers:function(){var G=[this.getFontFamily()].concat(qx.bom.webfonts.Validator.COMPARISON_FONTS.sans);var H=[this.getFontFamily()].concat(qx.bom.webfonts.Validator.COMPARISON_FONTS.serif);return {sans:this._getHelperElement(G),serif:this._getHelperElement(H)};}
,_getHelperElement:function(I){var J=qx.lang.Object.clone(qx.bom.webfonts.Validator.HELPER_CSS);if(I){if(J.fontFamily){J.fontFamily+=x+I.join(x);}
else {J.fontFamily=I.join(x);}
;}
;var K=document.createElement(v);K.innerHTML=qx.bom.webfonts.Validator.COMPARISON_STRING;qx.bom.element.Style.setStyles(K,J);document.body.appendChild(K);return K;}
,_applyFontFamily:function(M,L){if(M!==L){this._reset();}
;}
,__nz:function(){var N=qx.bom.webfonts.Validator;if(!N.__xP){N.__xP={sans:this._getHelperElement(N.COMPARISON_FONTS.sans),serif:this._getHelperElement(N.COMPARISON_FONTS.serif)};}
;N.__xO={sans:qx.bom.element.Dimension.getWidth(N.__xP.sans),serif:qx.bom.element.Dimension.getWidth(N.__xP.serif)};}
,__xS:function(){if(this._isFontValid()){this.__xQ.stop();this._reset();this.fireDataEvent(b,{family:this.getFontFamily(),valid:true});}
else {var O=new Date().getTime();if(O-this.__xR>=this.getTimeout()){this.__xQ.stop();this._reset();this.fireDataEvent(b,{family:this.getFontFamily(),valid:false});}
;}
;}
},destruct:function(){this._reset();this.__xQ.stop();this.__xQ.removeListener(i,this.__xS,this);this._disposeObjects(c);}
});}
)();
(function(){var a="mshtml",b="engine.name",c="qx.bom.element.Dimension",d="0px",e="paddingRight",f="paddingLeft",g="opera",h="paddingBottom",i="paddingTop",j="overflowX",k="overflowY";qx.Bootstrap.define(c,{statics:{getWidth:function(m){var l=m.getBoundingClientRect();return Math.round(l.right-l.left);}
,getHeight:function(o){var n=o.getBoundingClientRect();return Math.round(n.bottom-n.top);}
,getSize:function(p){return {width:this.getWidth(p),height:this.getHeight(p)};}
,__oN:{visible:true,hidden:true},getContentWidth:function(t){var q=qx.bom.element.Style;var r=qx.bom.element.Style.get(t,j);var s=parseInt(q.get(t,f)||d,10);var w=parseInt(q.get(t,e)||d,10);if(this.__oN[r]){var v=t.clientWidth;if((qx.core.Environment.get(b)==g)||qx.dom.Node.isBlockNode(t)){v=v-s-w;}
;if(qx.core.Environment.get(b)==a){if(v===0&&t.offsetHeight===0){return t.offsetWidth;}
;}
;return v;}
else {if(t.clientWidth>=t.scrollWidth){return Math.max(t.clientWidth,t.scrollWidth)-s-w;}
else {var u=t.scrollWidth-s;if(qx.core.Environment.get(b)==a){u-=w;}
;return u;}
;}
;}
,getContentHeight:function(B){var x=qx.bom.element.Style;var A=qx.bom.element.Style.get(B,k);var z=parseInt(x.get(B,i)||d,10);var y=parseInt(x.get(B,h)||d,10);if(this.__oN[A]){return B.clientHeight-z-y;}
else {if(B.clientHeight>=B.scrollHeight){return Math.max(B.clientHeight,B.scrollHeight)-z-y;}
else {return B.scrollHeight-z;}
;}
;}
,getContentSize:function(C){return {width:this.getContentWidth(C),height:this.getContentHeight(C)};}
}});}
)();
(function(){var a="This client does not support the boxSizing value",b="border-box",c="qx.bom.element.BoxSizing",d="css.boxsizing",e="",f="This client does not support dynamic modification of the boxSizing property.",g="qx.debug",h="boxSizing",i="content-box",j=":",k=";";qx.Bootstrap.define(c,{statics:{__oP:{tags:{button:true,select:true},types:{search:true,button:true,submit:true,reset:true,checkbox:true,radio:true}},__oQ:function(m){var l=this.__oP;return l.tags[m.tagName.toLowerCase()]||l.types[m.type];}
,compile:function(n){if(qx.core.Environment.get(d)){var o=qx.bom.Style.getCssName(qx.core.Environment.get(d));return o+j+n+k;}
else {if(qx.core.Environment.get(g)){qx.log.Logger.warn(this,f);qx.log.Logger.trace();}
;}
;}
,get:function(p){if(qx.core.Environment.get(d)){return qx.bom.element.Style.get(p,h,null,false)||e;}
;if(qx.bom.Document.isStandardMode(qx.dom.Node.getWindow(p))){if(!this.__oQ(p)){return i;}
;}
;return b;}
,set:function(r,q){if(qx.core.Environment.get(d)){try{r.style[qx.core.Environment.get(d)]=q;}
catch(s){if(qx.core.Environment.get(g)){qx.log.Logger.warn(this,a,q);}
;}
;}
else {if(qx.core.Environment.get(g)){qx.log.Logger.warn(this,f);}
;}
;}
,reset:function(t){this.set(t,e);}
}});}
)();
(function(){var a="cursor:",b="engine.name",c="",d="mshtml",e="nw-resize",f="engine.version",g="nesw-resize",h="browser.documentmode",i=";",j="nwse-resize",k="qx.bom.element.Cursor",l="ne-resize",m="browser.quirksmode",n="cursor";qx.Bootstrap.define(k,{statics:{__oO:{},compile:function(o){return a+(this.__oO[o]||o)+i;}
,get:function(q,p){return qx.bom.element.Style.get(q,n,p,false);}
,set:function(s,r){s.style.cursor=this.__oO[r]||r;}
,reset:function(t){t.style.cursor=c;}
},defer:function(u){if(qx.core.Environment.get(b)==d&&((parseFloat(qx.core.Environment.get(f))<9||qx.core.Environment.get(h)<9)&&!qx.core.Environment.get(m))){u.__oO[g]=l;u.__oO[j]=e;}
;}
});}
)();
(function(){var a="engine.name",b=");",c="",d=")",e="zoom:1;filter:alpha(opacity=",f="qx.bom.element.Opacity",g="css.opacity",h=";",i="opacity:",j="alpha(opacity=",k="opacity",l="filter";qx.Bootstrap.define(f,{statics:{compile:qx.core.Environment.select(a,{"mshtml":function(m){if(m>=1){m=1;}
;if(m<0.00001){m=0;}
;if(qx.core.Environment.get(g)){return i+m+h;}
else {return e+(m*100)+b;}
;}
,"default":function(n){return i+n+h;}
}),set:qx.core.Environment.select(a,{"mshtml":function(q,o){if(qx.core.Environment.get(g)){q.style.opacity=o;}
else {var p=qx.bom.element.Style.get(q,l,qx.bom.element.Style.COMPUTED_MODE,false);if(o>=1){o=1;}
;if(o<0.00001){o=0;}
;if(!q.currentStyle||!q.currentStyle.hasLayout){q.style.zoom=1;}
;q.style.filter=p.replace(/alpha\([^\)]*\)/gi,c)+j+o*100+d;}
;}
,"default":function(s,r){s.style.opacity=r;}
}),reset:qx.core.Environment.select(a,{"mshtml":function(u){if(qx.core.Environment.get(g)){u.style.opacity=c;}
else {var t=qx.bom.element.Style.get(u,l,qx.bom.element.Style.COMPUTED_MODE,false);u.style.filter=t.replace(/alpha\([^\)]*\)/gi,c);}
;}
,"default":function(v){v.style.opacity=c;}
}),get:qx.core.Environment.select(a,{"mshtml":function(z,y){if(qx.core.Environment.get(g)){var w=qx.bom.element.Style.get(z,k,y,false);if(w!=null){return parseFloat(w);}
;return 1.0;}
else {var x=qx.bom.element.Style.get(z,l,y,false);if(x){var w=x.match(/alpha\(opacity=(.*)\)/);if(w&&w[1]){return parseFloat(w[1])/100;}
;}
;return 1.0;}
;}
,"default":function(C,B){var A=qx.bom.element.Style.get(C,k,B,false);if(A!=null){return parseFloat(A);}
;return 1.0;}
})}});}
)();
(function(){var a="clip:auto;",b="rect(",c=")",d=");",e="",f="px",g="Could not parse clip string: ",h="qx.bom.element.Clip",i="string",j="clip:rect(",k=" ",l="clip",m="rect(auto,auto,auto,auto)",n="rect(auto, auto, auto, auto)",o="auto",p=",";qx.Bootstrap.define(h,{statics:{compile:function(q){if(!q){return a;}
;var v=q.left;var top=q.top;var u=q.width;var t=q.height;var r,s;if(v==null){r=(u==null?o:u+f);v=o;}
else {r=(u==null?o:v+u+f);v=v+f;}
;if(top==null){s=(t==null?o:t+f);top=o;}
else {s=(t==null?o:top+t+f);top=top+f;}
;return j+top+p+r+p+s+p+v+d;}
,get:function(z,D){var x=qx.bom.element.Style.get(z,l,D,false);var C,top,A,E;var w,y;if(typeof x===i&&x!==o&&x!==e){x=x.trim();if(/\((.*)\)/.test(x)){var F=RegExp.$1;if(/,/.test(F)){var B=F.split(p);}
else {var B=F.split(k);}
;top=B[0].trim();w=B[1].trim();y=B[2].trim();C=B[3].trim();if(C===o){C=null;}
;if(top===o){top=null;}
;if(w===o){w=null;}
;if(y===o){y=null;}
;if(top!=null){top=parseInt(top,10);}
;if(w!=null){w=parseInt(w,10);}
;if(y!=null){y=parseInt(y,10);}
;if(C!=null){C=parseInt(C,10);}
;if(w!=null&&C!=null){A=w-C;}
else if(w!=null){A=w;}
;if(y!=null&&top!=null){E=y-top;}
else if(y!=null){E=y;}
;}
else {throw new Error(g+x);}
;}
;return {left:C||null,top:top||null,width:A||null,height:E||null};}
,set:function(L,G){if(!G){L.style.clip=m;return;}
;var M=G.left;var top=G.top;var K=G.width;var J=G.height;var H,I;if(M==null){H=(K==null?o:K+f);M=o;}
else {H=(K==null?o:M+K+f);M=M+f;}
;if(top==null){I=(J==null?o:J+f);top=o;}
else {I=(J==null?o:top+J+f);top=top+f;}
;L.style.clip=b+top+p+H+p+I+p+M+c;}
,reset:function(N){N.style.clip=n;}
}});}
)();
(function(){var a="css.float",b='cssFloat',c="px",d="Cascaded styles are not supported in this browser!",e="css.appearance",f="pixelRight",g="css.userselect",h="css.boxsizing",i="css.textoverflow",j="qx.debug",k="pixelHeight",l=":",m="pixelTop",n="css.borderimage",o="Invalid argument 'name'",p="pixelLeft",q="css.usermodify",r="qx.bom.element.Style",s="Invalid argument 'smart'",t="",u="pixelBottom",v="Invalid argument 'styles'",w="pixelWidth",x='float',y=";",z="\"\"",A="Invalid argument 'element'",B="style";qx.Bootstrap.define(r,{statics:{__oT:null,__oU:null,__oV:function(){var D={"appearance":qx.core.Environment.get(e),"userSelect":qx.core.Environment.get(g),"textOverflow":qx.core.Environment.get(i),"borderImage":qx.core.Environment.get(n),"float":qx.core.Environment.get(a),"userModify":qx.core.Environment.get(q),"boxSizing":qx.core.Environment.get(h)};this.__oU={};for(var C in qx.lang.Object.clone(D)){if(!D[C]){delete D[C];}
else {if(C===x){this.__oU[b]=C;}
else {this.__oU[C]=qx.bom.Style.getCssName(D[C]);}
;}
;}
;this.__oT=D;}
,__oW:function(name){var E=qx.bom.Style.getPropertyName(name);if(E){this.__oT[name]=E;}
;return E;}
,__oX:{width:w,height:k,left:p,right:f,top:m,bottom:u},__oY:{clip:qx.bom.element.Clip,cursor:qx.bom.element.Cursor,opacity:qx.bom.element.Opacity,boxSizing:qx.bom.element.BoxSizing},compile:function(F){var I=[];var J=this.__oY;var H=this.__oU;var name,G;for(name in F){G=F[name];if(G==null){continue;}
;name=this.__oU[name]||name;if(J[name]){I.push(J[name].compile(G));}
else {if(!H[name]){H[name]=qx.bom.Style.getCssName(name);}
;I.push(H[name],l,G===t?z:G,y);}
;}
;return I.join(t);}
,setCss:function(L,K){L.setAttribute(B,K);}
,getCss:function(M){return M.getAttribute(B);}
,isPropertySupported:function(N){return (this.__oY[N]||this.__oT[N]||N in document.documentElement.style);}
,COMPUTED_MODE:1,CASCADED_MODE:2,LOCAL_MODE:3,set:function(Q,name,P,O){if(qx.core.Environment.get(j)){qx.core.Assert.assertElement(Q,A);qx.core.Assert.assertString(name,o);if(O!==undefined){qx.core.Assert.assertBoolean(O,s);}
;}
;name=this.__oT[name]||this.__oW(name)||name;if(O!==false&&this.__oY[name]){this.__oY[name].set(Q,P);}
else {Q.style[name]=P!==null?P:t;}
;}
,setStyles:function(X,R,V){if(qx.core.Environment.get(j)){qx.core.Assert.assertElement(X,A);qx.core.Assert.assertMap(R,v);if(V!==undefined){qx.core.Assert.assertBoolean(V,s);}
;}
;var U=this.__oT;var Y=this.__oY;var S=X.style;for(var W in R){var T=R[W];var name=U[W]||this.__oW(W)||W;if(T===undefined){if(V!==false&&Y[name]){Y[name].reset(X);}
else {S[name]=t;}
;}
else {if(V!==false&&Y[name]){Y[name].set(X,T);}
else {S[name]=T!==null?T:t;}
;}
;}
;}
,reset:function(bb,name,ba){name=this.__oT[name]||this.__oW(name)||name;if(ba!==false&&this.__oY[name]){this.__oY[name].reset(bb);}
else {bb.style[name]=t;}
;}
,get:function(bf,name,bh,bj){name=this.__oT[name]||this.__oW(name)||name;if(bj!==false&&this.__oY[name]){return this.__oY[name].get(bf,bh);}
;switch(bh){case this.LOCAL_MODE:return bf.style[name]||t;case this.CASCADED_MODE:if(bf.currentStyle){return bf.currentStyle[name]||t;}
;throw new Error(d);default:var bd=qx.dom.Node.getDocument(bf);var bg=bd.defaultView?bd.defaultView.getComputedStyle:undefined;if(bg!==undefined){var bc=bg(bf,null);if(bc&&bc[name]){return bc[name];}
;}
else {if(!bf.currentStyle){return bf.style[name]||t;}
;var bl=bf.currentStyle[name]||bf.style[name]||t;if(/^-?[\.\d]+(px)?$/i.test(bl)){return bl;}
;var bk=this.__oX[name];if(bk&&(bk in bf.style)){var bi=bf.style[name];bf.style[name]=bl||0;var be=bf.style[bk]+c;bf.style[name]=bi;return be;}
;return bl;}
;return bf.style[name]||t;};}
},defer:function(bm){bm.__oV();}
});}
)();
(function(){var a="engine.name",b="CSS1Compat",c="position:absolute;width:0;height:0;width:1",d="engine.version",e="qx.bom.Document",f="1px",g="div";qx.Bootstrap.define(e,{statics:{isQuirksMode:qx.core.Environment.select(a,{"mshtml":function(h){if(qx.core.Environment.get(d)>=8){return (h||window).document.documentMode===5;}
else {return (h||window).document.compatMode!==b;}
;}
,"webkit":function(i){if(document.compatMode===undefined){var j=(i||window).document.createElement(g);j.style.cssText=c;return j.style.width===f?true:false;}
else {return (i||window).document.compatMode!==b;}
;}
,"default":function(k){return (k||window).document.compatMode!==b;}
}),isStandardMode:function(l){return !this.isQuirksMode(l);}
,getWidth:function(m){var o=(m||window).document;var n=qx.bom.Viewport.getWidth(m);var scroll=this.isStandardMode(m)?o.documentElement.scrollWidth:o.body.scrollWidth;return Math.max(scroll,n);}
,getHeight:function(p){var r=(p||window).document;var q=qx.bom.Viewport.getHeight(p);var scroll=this.isStandardMode(p)?r.documentElement.scrollHeight:r.body.scrollHeight;return Math.max(scroll,q);}
}});}
)();
(function(){var a="ios",b="os.name",c="undefined",d="qx.bom.Viewport";qx.Bootstrap.define(d,{statics:{getWidth:function(e){var e=e||window;var f=e.document;return qx.bom.Document.isStandardMode(e)?f.documentElement.clientWidth:f.body.clientWidth;}
,getHeight:function(g){var g=g||window;var h=g.document;if(qx.core.Environment.get(b)==a&&window.innerHeight!=h.documentElement.clientHeight){return window.innerHeight;}
;return qx.bom.Document.isStandardMode(g)?h.documentElement.clientHeight:h.body.clientHeight;}
,getScrollLeft:function(i){var i=i?i:window;if(typeof i.pageXOffset!==c){return i.pageXOffset;}
;var j=i.document;return j.documentElement.scrollLeft||j.body.scrollLeft;}
,getScrollTop:function(k){var k=k?k:window;if(typeof k.pageYOffset!==c){return k.pageYOffset;}
;var l=k.document;return l.documentElement.scrollTop||l.body.scrollTop;}
,__nV:function(m){var o=this.getWidth(m)>this.getHeight(m)?90:0;var n=m.orientation;if(n==null||Math.abs(n%180)==o){return {"-270":90,"-180":180,"-90":-90,"0":0,"90":90,"180":180,"270":-90};}
else {return {"-270":180,"-180":-90,"-90":0,"0":90,"90":180,"180":-90,"270":0};}
;}
,__nW:null,getOrientation:function(p){var p=p||window.top;var q=p.orientation;if(q==null){q=this.getWidth(p)>this.getHeight(p)?90:0;}
else {if(this.__nW==null){this.__nW=this.__nV(p);}
;q=this.__nW[q];}
;return q;}
,isLandscape:function(r){var s=this.getOrientation(r);return s===-90||s===90;}
,isPortrait:function(t){var u=this.getOrientation(t);return u===0||u===180;}
}});}
)();
(function(){var a="qx.theme.manager.Icon",b="Theme",c="changeTheme",d="_applyTheme",e="singleton";qx.Class.define(a,{type:e,extend:qx.core.Object,properties:{theme:{check:b,nullable:true,apply:d,event:c}},members:{_applyTheme:function(i,g){var h=qx.util.AliasManager.getInstance();if(g){for(var f in g.aliases){h.remove(f);}
;}
;if(i){for(var f in i.aliases){h.add(f,i.aliases[f]);}
;}
;}
}});}
)();
(function(){var a="'.",b="Missing appearance: ",c="_applyTheme",d="qx.debug",e="string",f="Cannot find a matching appearance for '",g="Hint: This may be an issue with nested child controls and a missing alias definition in the appearance theme.",h="qx.theme.manager.Appearance",j=":",k="Theme",l="undefined",m="changeTheme",n="/",o="singleton";qx.Class.define(h,{type:o,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__xT={};this.__xU={};}
,properties:{theme:{check:k,nullable:true,event:m,apply:c}},members:{__xV:{},__xT:null,__xU:null,_applyTheme:function(){this.__xU={};this.__xT={};}
,__xW:function(D,z,q,u){var w=z.appearances;var r=w[D];if(!r){var C=n;var s=[];var v=D.split(C);var B=qx.lang.Array.clone(v);var y;while(!r&&v.length>0){s.unshift(v.pop());var t=v.join(C);r=w[t];if(r){y=r.alias||r;if(typeof y===e){var A=y+C+s.join(C);return this.__xW(A,z,q,B);}
;}
;}
;for(var i=0;i<s.length-1;i++ ){s.shift();var x=s.join(C);var p=this.__xW(x,z,null,B);if(p){return p;}
;}
;if(q!=null){return this.__xW(q,z,null,B);}
;if(qx.core.Environment.get(d)){if(typeof u!==l){this.debug(f+u.join(n)+a);if(u.length>1){this.info(g);}
;}
;}
;return null;}
else if(typeof r===e){return this.__xW(r,z,q,B);}
else if(r.include&&!r.style){return this.__xW(r.include,z,q,B);}
;return D;}
,styleFrom:function(W,O,P,F){if(!P){P=this.getTheme();}
;var M=this.__xU;var E=M[W];if(!E){E=M[W]=this.__xW(W,P,F);}
;var T=P.appearances[E];if(!T){this.warn(b+W);return null;}
;if(!T.style){return null;}
;var U=E;if(O){var I=T.$$bits;if(!I){I=T.$$bits={};T.$$length=0;}
;var J=0;for(var L in O){if(!O[L]){continue;}
;if(I[L]==null){I[L]=1<<T.$$length++ ;}
;J+=I[L];}
;if(J>0){U+=j+J;}
;}
;var K=this.__xT;if(K[U]!==undefined){return K[U];}
;if(!O){O=this.__xV;}
;var R;if(T.include||T.base){var V;if(T.include){V=this.styleFrom(T.include,O,P,F);}
;var N=T.style(O,V);R={};if(T.base){var S=this.styleFrom(E,O,T.base,F);if(T.include){for(var H in S){if(!V.hasOwnProperty(H)&&!N.hasOwnProperty(H)){R[H]=S[H];}
;}
;}
else {for(var Q in S){if(!N.hasOwnProperty(Q)){R[Q]=S[Q];}
;}
;}
;}
;if(T.include){for(var G in V){if(!N.hasOwnProperty(G)){R[G]=V[G];}
;}
;}
;for(var X in N){R[X]=N[X];}
;}
else {R=T.style(O);}
;return K[U]=R||null;}
},destruct:function(){this.__xT=this.__xU=null;}
});}
)();
(function(){var b="'!",c='Invalid include in theme "',d="fonts",e="appearances",f='The configuration key "',g="Mixin theme is not a valid theme!",h='" is not allowed!',j="icons",k="You can only define one theme category per file! Invalid theme: ",m="string",n="decorations",o="other",p="Found base flag in entry '",q="qx.debug",r='Invalid patch in theme "',s="widgets",t="[Theme ",u="borders",v="' are not compatible '",w="The mixins '",x='": ',y="' of theme '",z='" is invalid: ',A='Invalid extend in theme "',B='Invalid type of key "',C='The key "',D='"!',E="]",F='"! The value needs to be a map!',G='"! The type of the key must be "',H="undefined",I='The type of the key "',J="qx.Theme",K='The content of a meta theme must reference to other themes. The value for "',L='" inside the meta block is wrong.',M='" in theme "',N="colors",O='Invalid key "',P='"! The value is undefined/null!',Q="Theme",R="meta",S='" is not allowed inside a meta theme block.',T="'. Base flags are not allowed for themes without a valid super theme!",U="object";qx.Bootstrap.define(J,{statics:{define:function(name,W){if(!W){var W={};}
;W.include=this.__qD(W.include);W.patch=this.__qD(W.patch);if(qx.core.Environment.get(q)){this.__ik(name,W);}
;var V={$$type:Q,name:name,title:W.title,toString:this.genericToString};if(W.extend){V.supertheme=W.extend;}
;V.basename=qx.Bootstrap.createNamespace(name,V);this.__qG(V,W);this.__qE(V,W);this.$$registry[name]=V;for(var i=0,a=W.include,l=a.length;i<l;i++ ){this.include(V,a[i]);}
;for(var i=0,a=W.patch,l=a.length;i<l;i++ ){this.patch(V,a[i]);}
;}
,__qD:function(X){if(!X){return [];}
;if(qx.Bootstrap.isArray(X)){return X;}
else {return [X];}
;}
,__qE:function(Y,ba){var bb=ba.aliases||{};if(ba.extend&&ba.extend.aliases){qx.Bootstrap.objectMergeWith(bb,ba.extend.aliases,false);}
;Y.aliases=bb;}
,getAll:function(){return this.$$registry;}
,getByName:function(name){return this.$$registry[name];}
,isDefined:function(name){return this.getByName(name)!==undefined;}
,getTotalNumber:function(){return qx.Bootstrap.objectGetLength(this.$$registry);}
,genericToString:function(){return t+this.name+E;}
,__qF:function(bd){for(var i=0,bc=this.__qH,l=bc.length;i<l;i++ ){if(bd[bc[i]]){return bc[i];}
;}
;}
,__qG:function(bi,bj){var bf=this.__qF(bj);if(bj.extend&&!bf){bf=bj.extend.type;}
;bi.type=bf||o;var bg=function(){}
;if(bj.extend){bg.prototype=new bj.extend.$$clazz;}
;var be=bg.prototype;var bh=bj[bf];for(var bk in bh){be[bk]=bh[bk];if(be[bk].base){if(qx.core.Environment.get(q)){if(!bj.extend){throw new Error(p+bk+y+bj.name+T);}
;}
;be[bk].base=bj.extend;}
;}
;bi.$$clazz=bg;bi[bf]=new bg;}
,$$registry:{},__qH:[N,u,n,d,j,s,e,R],__ij:qx.core.Environment.select(q,{"true":{"title":m,"aliases":U,"type":m,"extend":U,"colors":U,"borders":U,"decorations":U,"fonts":U,"icons":U,"widgets":U,"appearances":U,"meta":U,"include":U,"patch":U},"default":null}),__qI:qx.core.Environment.select(q,{"true":{"color":U,"border":U,"decoration":U,"font":U,"icon":U,"appearance":U,"widget":U},"default":null}),__ik:qx.core.Environment.select(q,{"true":function(name,bq){var bp=this.__ij;for(var bo in bq){if(bp[bo]===undefined){throw new Error(f+bo+M+name+h);}
;if(bq[bo]==null){throw new Error(O+bo+M+name+P);}
;if(bp[bo]!==null&&typeof bq[bo]!==bp[bo]){throw new Error(B+bo+M+name+G+bp[bo]+D);}
;}
;var bn=[N,u,n,d,j,s,e,R];for(var i=0,l=bn.length;i<l;i++ ){var bo=bn[i];if(bq[bo]!==undefined&&(bq[bo] instanceof Array||bq[bo] instanceof RegExp||bq[bo] instanceof Date||bq[bo].classname!==undefined)){throw new Error(O+bo+M+name+F);}
;}
;var bl=0;for(var i=0,l=bn.length;i<l;i++ ){var bo=bn[i];if(bq[bo]){bl++ ;}
;if(bl>1){throw new Error(k+name);}
;}
;if(bq.meta){var bm;for(var bo in bq.meta){bm=bq.meta[bo];if(this.__qI[bo]===undefined){throw new Error(C+bo+S);}
;if(typeof bm!==this.__qI[bo]){throw new Error(I+bo+L);}
;if(!(typeof bm===U&&bm!==null&&bm.$$type===Q)){throw new Error(K+bo+M+name+z+bm);}
;}
;}
;if(bq.extend&&bq.extend.$$type!==Q){throw new Error(A+name+x+bq.extend);}
;if(bq.include){for(var i=0,l=bq.include.length;i<l;i++ ){if(typeof (bq.include[i])==H||bq.include[i].$$type!==Q){throw new Error(c+name+x+bq.include[i]);}
;}
;}
;if(bq.patch){for(var i=0,l=bq.patch.length;i<l;i++ ){if(typeof (bq.patch[i])===H||bq.patch[i].$$type!==Q){throw new Error(r+name+x+bq.patch[i]);}
;}
;}
;}
,"default":function(){}
}),patch:function(bu,bs){this.__qJ(bs);var bw=this.__qF(bs);if(bw!==this.__qF(bu)){throw new Error(w+bu.name+v+bs.name+b);}
;var bt=bs[bw];var br=bu.$$clazz.prototype;for(var bv in bt){br[bv]=bt[bv];}
;}
,include:function(bA,by){this.__qJ(by);var bC=by.type;if(bC!==bA.type){throw new Error(w+bA.name+v+by.name+b);}
;var bz=by[bC];var bx=bA.$$clazz.prototype;for(var bB in bz){if(bx[bB]!==undefined){continue;}
;bx[bB]=bz[bB];}
;}
,__qJ:function(bD){if(typeof bD===H||bD==null){var bF=new Error(g);if(qx.core.Environment.get(q)){var bE=qx.dev.StackTrace.getStackTraceFromError(bF);qx.Bootstrap.error(this,bE);}
;throw bF;}
;}
}});}
)();
(function(){var a="__xY",b="qx.ui.tooltip.ToolTip",c="Boolean",d="",f="mouse",g="pointerover",h="interval",i="_applyCurrent",j="widget",k="__yb",l="qx.ui.tooltip.Manager",m="pointermove",n="__xX",o="focusout",p="tooltip-error",q="singleton",r="pointerout";qx.Class.define(l,{type:q,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);qx.event.Registration.addListener(document.body,g,this.__yg,this,true);this.__xX=new qx.event.Timer();this.__xX.addListener(h,this.__yd,this);this.__xY=new qx.event.Timer();this.__xY.addListener(h,this.__ye,this);this.__ya={left:0,top:0};}
,properties:{current:{check:b,nullable:true,apply:i},showInvalidToolTips:{check:c,init:true},showToolTips:{check:c,init:true}},members:{__ya:null,__xY:null,__xX:null,__yb:null,__yc:null,getSharedTooltip:function(){if(!this.__yb){this.__yb=new qx.ui.tooltip.ToolTip().set({rich:true});}
;return this.__yb;}
,getSharedErrorTooltip:function(){if(!this.__yc){this.__yc=new qx.ui.tooltip.ToolTip().set({appearance:p,rich:true});this.__yc.setLabel(d);this.__yc.syncAppearance();}
;return this.__yc;}
,_applyCurrent:function(u,t){if(t&&qx.ui.core.Widget.contains(t,u)){return;}
;if(t){if(!t.isDisposed()){t.exclude();}
;this.__xX.stop();this.__xY.stop();}
;var v=qx.event.Registration;var s=document.body;if(u){this.__xX.startWith(u.getShowTimeout());v.addListener(s,r,this.__yh,this,true);v.addListener(s,o,this.__yi,this,true);v.addListener(s,m,this.__yf,this,true);}
else {v.removeListener(s,r,this.__yh,this,true);v.removeListener(s,o,this.__yi,this,true);v.removeListener(s,m,this.__yf,this,true);}
;}
,__yd:function(e){var w=this.getCurrent();if(w&&!w.isDisposed()){this.__xY.startWith(w.getHideTimeout());if(w.getPlaceMethod()==j){w.placeToWidget(w.getOpener());}
else {w.placeToPoint(this.__ya);}
;w.show();}
;this.__xX.stop();}
,__ye:function(e){var x=this.getCurrent();if(x&&!x.isDisposed()){x.exclude();}
;this.__xY.stop();this.resetCurrent();}
,__yf:function(e){var y=this.__ya;y.left=Math.round(e.getDocumentLeft());y.top=Math.round(e.getDocumentTop());}
,__yg:function(e){var z=qx.ui.core.Widget.getWidgetByElement(e.getTarget());this.__yf(e);this.showToolTip(z);}
,showToolTip:function(C){if(!C){return;}
;var D,B,E,A;while(C!=null){D=C.getToolTip();B=C.getToolTipText()||null;E=C.getToolTipIcon()||null;if(qx.Class.hasInterface(C.constructor,qx.ui.form.IForm)&&!C.isValid()){A=C.getInvalidMessage();}
;if(D||B||E||A){break;}
;C=C.getLayoutParent();}
;if(!C||(!C.getEnabled()&&!C.isShowToolTipWhenDisabled())||C.isBlockToolTip()||(!A&&!this.getShowToolTips())||(A&&!this.getShowInvalidToolTips())){return;}
;if(A){D=this.getSharedErrorTooltip().set({label:A});}
;if(!D){D=this.getSharedTooltip().set({label:B,icon:E});}
;this.setCurrent(D);D.setOpener(C);}
,__yh:function(e){var F=qx.ui.core.Widget.getWidgetByElement(e.getTarget());if(!F){return;}
;var G=qx.ui.core.Widget.getWidgetByElement(e.getRelatedTarget());if(!G&&e.getPointerType()==f){return;}
;var H=this.getCurrent();if(H&&(G==H||qx.ui.core.Widget.contains(H,G))){return;}
;if(G&&F&&qx.ui.core.Widget.contains(F,G)){return;}
;if(H&&!G){this.setCurrent(null);}
else {this.resetCurrent();}
;}
,__yi:function(e){var I=qx.ui.core.Widget.getWidgetByElement(e.getTarget());if(!I){return;}
;var J=this.getCurrent();if(J&&J==I.getToolTip()){this.setCurrent(null);}
;}
},destruct:function(){qx.event.Registration.removeListener(document.body,g,this.__yg,this,true);this._disposeObjects(n,a,k);this.__ya=null;}
});}
)();
(function(){var a="qx.ui.core.MLayoutHandling";qx.Mixin.define(a,{members:{setLayout:function(b){this._setLayout(b);}
,getLayout:function(){return this._getLayout();}
},statics:{remap:function(c){c.getLayout=c._getLayout;c.setLayout=c._setLayout;}
}});}
)();
(function(){var a="changeWidth",b="Wrong 'width' argument. ",c="Boolean",d="allowShrinkY",e="_applyAlign",f="_applyStretching",g="Something went wrong with the layout of ",h="bottom",i="Wrong 'left' argument. ",j="Integer",k="changeTheme",l="_applyDimension",m="baseline",n="qx.debug",o="marginBottom",p="qx.ui.core.LayoutItem",q="center",r="marginTop",s="!",t="allowGrowX",u="shorthand",v="middle",w="marginLeft",x="qx.dyntheme",y="allowShrinkX",z="top",A="right",B="marginRight",C="abstract",D="Wrong 'top' argument. ",E="Wrong 'height' argument. ",F="_applyMargin",G="allowGrowY",H="left",I="changeHeight";qx.Class.define(p,{type:C,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);if(qx.core.Environment.get(x)){qx.theme.manager.Meta.getInstance().addListener(k,this._onChangeTheme,this);}
;}
,properties:{minWidth:{check:j,nullable:true,apply:l,init:null,themeable:true},width:{check:j,event:a,nullable:true,apply:l,init:null,themeable:true},maxWidth:{check:j,nullable:true,apply:l,init:null,themeable:true},minHeight:{check:j,nullable:true,apply:l,init:null,themeable:true},height:{check:j,event:I,nullable:true,apply:l,init:null,themeable:true},maxHeight:{check:j,nullable:true,apply:l,init:null,themeable:true},allowGrowX:{check:c,apply:f,init:true,themeable:true},allowShrinkX:{check:c,apply:f,init:true,themeable:true},allowGrowY:{check:c,apply:f,init:true,themeable:true},allowShrinkY:{check:c,apply:f,init:true,themeable:true},allowStretchX:{group:[t,y],mode:u,themeable:true},allowStretchY:{group:[G,d],mode:u,themeable:true},marginTop:{check:j,init:0,apply:F,themeable:true},marginRight:{check:j,init:0,apply:F,themeable:true},marginBottom:{check:j,init:0,apply:F,themeable:true},marginLeft:{check:j,init:0,apply:F,themeable:true},margin:{group:[r,B,o,w],mode:u,themeable:true},alignX:{check:[H,q,A],nullable:true,apply:e,themeable:true},alignY:{check:[z,v,h,m],nullable:true,apply:e,themeable:true}},members:{_onChangeTheme:qx.core.Environment.select(x,{"true":function(){var L=qx.util.PropertyUtil.getAllProperties(this.constructor);for(var name in L){var K=L[name];if(K.themeable){var J=qx.util.PropertyUtil.getUserValue(this,name);if(J==null){qx.util.PropertyUtil.resetThemed(this,name);}
;}
;}
;}
,"false":null}),__yj:null,__yk:null,__yl:null,__ym:null,__yn:null,__yo:null,__yp:null,getBounds:function(){return this.__yo||this.__yk||null;}
,clearSeparators:function(){}
,renderSeparator:function(M,N){}
,renderLayout:function(U,top,R,Q){if(this.isDisposed()){return null;}
;if(qx.core.Environment.get(n)){var S=g+this.toString()+s;this.assertInteger(U,i+S);this.assertInteger(top,D+S);this.assertInteger(R,b+S);this.assertInteger(Q,E+S);}
;var P=null;if(this.getHeight()==null&&this._hasHeightForWidth()){var P=this._getHeightForWidth(R);}
;if(P!=null&&P!==this.__yj){this.__yj=P;qx.ui.core.queue.Layout.add(this);return null;}
;var O=this.__yk;if(!O){O=this.__yk={};}
;var T={};if(U!==O.left||top!==O.top){T.position=true;O.left=U;O.top=top;}
;if(R!==O.width||Q!==O.height){T.size=true;O.width=R;O.height=Q;}
;if(this.__yl){T.local=true;delete this.__yl;}
;if(this.__yn){T.margin=true;delete this.__yn;}
;return T;}
,isExcluded:function(){return false;}
,hasValidLayout:function(){return !this.__yl;}
,scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);}
,invalidateLayoutCache:function(){this.__yl=true;this.__ym=null;}
,getSizeHint:function(V){var W=this.__ym;if(W){return W;}
;if(V===false){return null;}
;W=this.__ym=this._computeSizeHint();if(this._hasHeightForWidth()&&this.__yj&&this.getHeight()==null){W.height=this.__yj;}
;if(W.minWidth>W.width){W.width=W.minWidth;}
;if(W.maxWidth<W.width){W.width=W.maxWidth;}
;if(!this.getAllowGrowX()){W.maxWidth=W.width;}
;if(!this.getAllowShrinkX()){W.minWidth=W.width;}
;if(W.minHeight>W.height){W.height=W.minHeight;}
;if(W.maxHeight<W.height){W.height=W.maxHeight;}
;if(!this.getAllowGrowY()){W.maxHeight=W.height;}
;if(!this.getAllowShrinkY()){W.minHeight=W.height;}
;return W;}
,_computeSizeHint:function(){var bc=this.getMinWidth()||0;var Y=this.getMinHeight()||0;var bd=this.getWidth()||bc;var bb=this.getHeight()||Y;var X=this.getMaxWidth()||Infinity;var ba=this.getMaxHeight()||Infinity;return {minWidth:bc,width:bd,maxWidth:X,minHeight:Y,height:bb,maxHeight:ba};}
,_hasHeightForWidth:function(){var be=this._getLayout();if(be){return be.hasHeightForWidth();}
;return false;}
,_getHeightForWidth:function(bf){var bg=this._getLayout();if(bg&&bg.hasHeightForWidth()){return bg.getHeightForWidth(bf);}
;return null;}
,_getLayout:function(){return null;}
,_applyMargin:function(){this.__yn=true;var parent=this.$$parent;if(parent){parent.updateLayoutProperties();}
;}
,_applyAlign:function(){var parent=this.$$parent;if(parent){parent.updateLayoutProperties();}
;}
,_applyDimension:function(){qx.ui.core.queue.Layout.add(this);}
,_applyStretching:function(){qx.ui.core.queue.Layout.add(this);}
,hasUserBounds:function(){return !!this.__yo;}
,setUserBounds:function(bi,top,bh,bj){this.__yo={left:bi,top:top,width:bh,height:bj};qx.ui.core.queue.Layout.add(this);}
,resetUserBounds:function(){delete this.__yo;qx.ui.core.queue.Layout.add(this);}
,__yq:{},setLayoutProperties:function(bm){if(bm==null){return;}
;var bk=this.__yp;if(!bk){bk=this.__yp={};}
;var parent=this.getLayoutParent();if(parent){parent.updateLayoutProperties(bm);}
;for(var bl in bm){if(bm[bl]==null){delete bk[bl];}
else {bk[bl]=bm[bl];}
;}
;}
,getLayoutProperties:function(){return this.__yp||this.__yq;}
,clearLayoutProperties:function(){delete this.__yp;}
,updateLayoutProperties:function(bp){var bn=this._getLayout();if(bn){if(qx.core.Environment.get(n)){if(bp){for(var bo in bp){if(bp[bo]!==null){bn.verifyLayoutProperty(this,bo,bp[bo]);}
;}
;}
;}
;bn.invalidateChildrenCache();}
;qx.ui.core.queue.Layout.add(this);}
,getApplicationRoot:function(){return qx.core.Init.getApplication().getRoot();}
,getLayoutParent:function(){return this.$$parent||null;}
,setLayoutParent:function(parent){if(this.$$parent===parent){return;}
;this.$$parent=parent||null;qx.ui.core.queue.Visibility.add(this);}
,isRootWidget:function(){return false;}
,_getRoot:function(){var parent=this;while(parent){if(parent.isRootWidget()){return parent;}
;parent=parent.$$parent;}
;return null;}
,clone:function(){var bq=qx.core.Object.prototype.clone.call(this);var br=this.__yp;if(br){bq.__yp=qx.lang.Object.clone(br);}
;return bq;}
},destruct:function(){if(qx.core.Environment.get(x)){qx.theme.manager.Meta.getInstance().removeListener(k,this._onChangeTheme,this);}
;this.$$parent=this.$$subparent=this.__yp=this.__yk=this.__yo=this.__ym=null;}
});}
)();
(function(){var a="$$theme_",b="$$user_",c="qx.util.PropertyUtil",d="$$init_";qx.Class.define(c,{statics:{getProperties:function(e){return e.$$properties;}
,getAllProperties:function(j){var g={};var f=j;while(f!=qx.core.Object){var i=this.getProperties(f);for(var h in i){g[h]=i[h];}
;f=f.superclass;}
;return g;}
,getUserValue:function(l,k){return l[b+k];}
,setUserValue:function(n,m,o){n[b+m]=o;}
,deleteUserValue:function(q,p){delete (q[b+p]);}
,getInitValue:function(s,r){return s[d+r];}
,setInitValue:function(u,t,v){u[d+t]=v;}
,deleteInitValue:function(x,w){delete (x[d+w]);}
,getThemeValue:function(z,y){return z[a+y];}
,setThemeValue:function(B,A,C){B[a+A]=C;}
,deleteThemeValue:function(E,D){delete (E[a+D]);}
,setThemed:function(H,G,I){var F=qx.core.Property.$$method.setThemed;H[F[G]](I);}
,resetThemed:function(K,J){var L=qx.core.Property.$$method.resetThemed;K[L[J]]();}
}});}
)();
(function(){var a="qx.ui.core.queue.Layout",b="layout";qx.Class.define(a,{statics:{__rn:{},__yr:{},remove:function(c){delete this.__rn[c.$$hash];}
,add:function(d){this.__rn[d.$$hash]=d;qx.ui.core.queue.Manager.scheduleFlush(b);}
,isScheduled:function(e){return !!this.__rn[e.$$hash];}
,flush:function(){var f=this.__yt();for(var i=f.length-1;i>=0;i-- ){var g=f[i];if(g.hasValidLayout()){continue;}
;if(g.isRootWidget()&&!g.hasUserBounds()){var j=g.getSizeHint();g.renderLayout(0,0,j.width,j.height);}
else {var h=g.getBounds();g.renderLayout(h.left,h.top,h.width,h.height);}
;}
;}
,getNestingLevel:function(l){var k=this.__yr;var n=0;var parent=l;while(true){if(k[parent.$$hash]!=null){n+=k[parent.$$hash];break;}
;if(!parent.$$parent){break;}
;parent=parent.$$parent;n+=1;}
;var m=n;while(l&&l!==parent){k[l.$$hash]=m-- ;l=l.$$parent;}
;return n;}
,__ys:function(){var t=qx.ui.core.queue.Visibility;this.__yr={};var s=[];var r=this.__rn;var o,q;for(var p in r){o=r[p];if(t.isVisible(o)){q=this.getNestingLevel(o);if(!s[q]){s[q]={};}
;s[q][p]=o;delete r[p];}
;}
;return s;}
,__yt:function(){var x=[];var z=this.__ys();for(var w=z.length-1;w>=0;w-- ){if(!z[w]){continue;}
;for(var v in z[w]){var u=z[w][v];if(w==0||u.isRootWidget()||u.hasUserBounds()){x.push(u);u.invalidateLayoutCache();continue;}
;var B=u.getSizeHint(false);if(B){u.invalidateLayoutCache();var y=u.getSizeHint();var A=(!u.getBounds()||B.minWidth!==y.minWidth||B.width!==y.width||B.maxWidth!==y.maxWidth||B.minHeight!==y.minHeight||B.height!==y.height||B.maxHeight!==y.maxHeight);}
else {A=true;}
;if(A){var parent=u.getLayoutParent();if(!z[w-1]){z[w-1]={};}
;z[w-1][parent.$$hash]=parent;}
else {x.push(u);}
;}
;}
;return x;}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="pop.push.reverse.shift.sort.splice.unshift.join.slice",d="number",e="qx.type.BaseArray",f=".";qx.Bootstrap.define(e,{extend:Array,construct:function(g){}
,members:{toArray:null,valueOf:null,pop:null,push:null,reverse:null,shift:null,sort:null,splice:null,unshift:null,concat:null,join:null,slice:null,toString:null,indexOf:null,lastIndexOf:null,forEach:null,filter:null,map:null,some:null,every:null}});(function(){function h(p){if((qx.core.Environment.get(b)==a)){j.prototype={length:0,$$isArray:true};var n=c.split(f);for(var length=n.length;length;){j.prototype[n[ --length]]=Array.prototype[n[length]];}
;}
;var m=Array.prototype.slice;j.prototype.concat=function(){var r=this.slice(0);for(var i=0,length=arguments.length;i<length;i++ ){var q;if(arguments[i] instanceof j){q=m.call(arguments[i],0);}
else if(arguments[i] instanceof Array){q=arguments[i];}
else {q=[arguments[i]];}
;r.push.apply(r,q);}
;return r;}
;j.prototype.toString=function(){return m.call(this,0).toString();}
;j.prototype.toLocaleString=function(){return m.call(this,0).toLocaleString();}
;j.prototype.constructor=j;j.prototype.indexOf=Array.prototype.indexOf;j.prototype.lastIndexOf=Array.prototype.lastIndexOf;j.prototype.forEach=Array.prototype.forEach;j.prototype.some=Array.prototype.some;j.prototype.every=Array.prototype.every;var o=Array.prototype.filter;var l=Array.prototype.map;j.prototype.filter=function(){var s=new this.constructor;s.push.apply(s,o.apply(this,arguments));return s;}
;j.prototype.map=function(){var t=new this.constructor;t.push.apply(t,l.apply(this,arguments));return t;}
;j.prototype.slice=function(){var u=new this.constructor;u.push.apply(u,Array.prototype.slice.apply(this,arguments));return u;}
;j.prototype.splice=function(){var v=new this.constructor;v.push.apply(v,Array.prototype.splice.apply(this,arguments));return v;}
;j.prototype.toArray=function(){return Array.prototype.slice.call(this,0);}
;j.prototype.valueOf=function(){return this.length;}
;return j;}
;function j(length){if(arguments.length===1&&typeof length===d){this.length=-1<length&&length===length>>.5?length:this.push(length);}
else if(arguments.length){this.push.apply(this,arguments);}
;}
;function k(){}
;k.prototype=[];j.prototype=new k;j.prototype.length=0;qx.type.BaseArray=h(j);}
)();}
)();
(function(){var a="_",b="qxWeb",c="*** Collection infos ***",d="toString",e="$",f="Instance:",g="classname",h="Method '",j="data-qx-class",k="Elements:",m="' already available.",n="Length:",o="number",p="basename",q="' already available as static method.",r="qx.debug",s="name";qx.Bootstrap.define(b,{extend:qx.type.BaseArray,statics:{__nz:[],$$qx:qx,$init:function(x,v){if(x.length&&x.length==1&&x[0]&&x[0].$widget instanceof qxWeb){return x[0].$widget;}
;var w=[];for(var i=0;i<x.length;i++ ){var u=!!(x[i]&&(x[i].nodeType===1||x[i].nodeType===9||x[i].nodeType===11));if(u){w.push(x[i]);continue;}
;var t=!!(x[i]&&x[i].history&&x[i].location&&x[i].document);if(t){w.push(x[i]);}
;}
;if(x[0]&&x[0].getAttribute&&x[0].getAttribute(j)&&w.length<2){v=qx.Bootstrap.getByName(x[0].getAttribute(j))||v;}
;var y=qx.lang.Array.cast(w,v);for(var i=0;i<qxWeb.__nz.length;i++ ){qxWeb.__nz[i].call(y);}
;return y;}
,$attach:function(A,z){for(var name in A){if(qxWeb.prototype[name]!=undefined&&Array.prototype[name]==undefined&&z!==true){if(qx.core.Environment.get(r)){throw new Error(h+name+m);}
;}
else {qxWeb.prototype[name]=A[name];}
;}
;}
,$attachStatic:function(C,B){for(var name in C){if(qx.core.Environment.get(r)){if(qxWeb[name]!=undefined&&B!==true){throw new Error(h+name+q);}
;}
;qxWeb[name]=C[name];}
;}
,$attachAll:function(F,E){for(var name in F.members){if(name.indexOf(e)!==0&&name.indexOf(a)!==0)qxWeb.prototype[name]=F.members[name];}
;var D;if(E!=null){qxWeb[E]=qxWeb[E]||{};D=qxWeb[E];}
else {D=qxWeb;}
;for(var name in F.statics){if(name.indexOf(e)!==0&&name.indexOf(a)!==0&&name!==s&&name!==p&&name!==g&&name!==d&&name!==name.toUpperCase())D[name]=F.statics[name];}
;}
,$attachInit:function(G){this.__nz.push(G);}
,define:function(name,H){if(H==undefined){H=name;name=null;}
;return qx.Bootstrap.define.call(qx.Bootstrap,name,H);}
},construct:function(J,I){if(!J&&this instanceof qxWeb){return this;}
;if(!J){J=[];}
else if(qx.Bootstrap.isString(J)){if(I instanceof qxWeb&&I.length!=0){I=I[0];}
;if(I instanceof qxWeb){J=[];}
else {J=qx.bom.Selector.query(J,I);}
;}
else if((J.nodeType===1||J.nodeType===9||J.nodeType===11)||(J.history&&J.location&&J.document)){J=[J];}
;return qxWeb.$init(J,qxWeb);}
,members:{filter:function(K){if(qx.lang.Type.isFunction(K)){return qxWeb.$init(Array.prototype.filter.call(this,K),this.constructor);}
;return qxWeb.$init(qx.bom.Selector.matches(K,this),this.constructor);}
,unique:function(){var L=qx.lang.Array.unique(this);return qxWeb.$init(L,this.constructor);}
,slice:function(M,N){if(N!==undefined){return qxWeb.$init(Array.prototype.slice.call(this,M,N),this.constructor);}
;return qxWeb.$init(Array.prototype.slice.call(this,M),this.constructor);}
,splice:function(O,P,Q){return qxWeb.$init(Array.prototype.splice.apply(this,arguments),this.constructor);}
,map:function(R,S){return qxWeb.$init(Array.prototype.map.apply(this,arguments),qxWeb);}
,concat:function(U){var T=Array.prototype.slice.call(this,0);for(var i=0;i<arguments.length;i++ ){if(arguments[i] instanceof qxWeb){T=T.concat(Array.prototype.slice.call(arguments[i],0));}
else {T.push(arguments[i]);}
;}
;return qxWeb.$init(T,this.constructor);}
,indexOf:function(V,W){if(!V){return -1;}
;if(!W){W=0;}
;if(typeof W!==o){return -1;}
;if(W<0){W=this.length+W;if(W<0){W=0;}
;}
;if(qx.lang.Type.isArray(V)){V=V[0];}
;for(var i=W,l=this.length;i<l;i++ ){if(this[i]===V){return i;}
;}
;return -1;}
,debug:function(){if(qx.core.Environment.get(r)){debugger;}
;return this;}
,logThis:function(){if(qx.core.Environment.get(r)){var X=[];this.forEach(function(Y){X.push(Y);}
);var length=this.length;console.group(c);console.info(n,length);console.info(k,X);console.info(f,this);console.groupEnd();}
;return this;}
,_forEachElement:function(bb,ba){for(var i=0,l=this.length;i<l;i++ ){if(this[i]&&(this[i].nodeType===1||this[i].nodeType===11)){bb.apply(ba||this,[this[i],i,this]);}
;}
;return this;}
,_forEachElementWrapped:function(bd,bc){this._forEachElement(function(be,bg,bf){bd.apply(this,[qxWeb(be),bg,bf]);}
,bc);return this;}
},defer:function(bh){if(window.q==undefined){window.q=bh;}
;}
});}
)();
(function(){var c="-",d="(^|",f="'] ",g="CLASS",h=":disabled",k="div",l="input",n="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",o="nth",p="*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(",q="type|href|height|width",r=")*)|.*)\\)|)",s="disabled",t="*(?:value|",u="~=",v="previousSibling",w="*(even|odd|(([+-]|)(\\d*)n|)",x="xml:lang",y="only",z="*",A="unsupported lang: ",B="+|((?:^|[^\\\\])(?:\\\\.)*)",C="i",D="\\\\([\\da-f]{1,6}",E="='$1']",F="w#",G="^=",H="*([>+~]|",I="[t^='']",J="*\\)|)",K="+$",L="=",M="unload",N="id",O="text",P="needsContext",Q="nextSibling",R="$=",S="[s!='']:x",T="string",U=")|.)",V="[\\x20\\t\\r\\n\\f]",W="[name=d]",X="*(?:([+-]|)",Y="*((?:-\\d)?\\d*)",cL="#",cM="[selected]",cN="type",cH="ig",cI="parentNode",cJ="href",cK="0x",cS="(",cT="w",cY="even",cU="<div class='a'></div><div class='a i'></div>",cO="g",cP="*\\]",cQ="*\\)|)(?=[^-]|$)",cR="unsupported pseudo: ",dC="w*",eo="*[*^$|!~]?=",da="<select t=''><option selected=''></option></select>",cV=" ",cW="hidden",el="*(?:([*^$|!~]?=)",cX="*,",db="function",dc="^",dd=")",di=")|)|)",dj=":(",dk="onunload",de="button",df="0",dg="^(",dh="option",dq="odd",dr="class",ds="*(\\d+)|))",dt="lang",dl="|=",dm="\\[",dn="name",dp="D",dx="!=",dy="<input/>",en="*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(",dz="sizzle",du="*=",dv="|",em="Syntax error, unrecognized expression: ",dw=")$",dA="object",dB="?|(",dN="$1",dM=")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|",dL="*([^\\]'\"]*?)",dR="*(?:''|\"\")",dQ="eq",dP="className",dO=":enabled",dG="of-type",dF="TAG",dE="|$)",dD="<a href='#'></a>",dK="empty",dJ="qx.bom.Selector",dI="^(?:",dH="value",dY="[id='",dX="^#(",dW="[*^$]=",dV="*,:x",ed="*(",ec="^\\.(",eb="",ea="CHILD",dU=",.*:",dT="^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(",dS="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",eg="$",ef="\\$&",ee=":checked",ek=",",ej="ID",ei="last",eh="HTML";qx.Bootstrap.define(dJ,{statics:{query:null,matches:null}});(function(window){var i,eM,fM,ew,eB,fC,eG,ep,eE,eF,eD,document,fK,fq,fe,eq,ff,eN,fa=dz+-(new Date()),eH=window.document,eW=0,eA=0,es=ey(),fr=ey(),fI=ey(),eT=function(a,b){if(a===b){eF=true;}
;return 0;}
,eR=typeof undefined,ft=1<<31,fA=({}).hasOwnProperty,ev=[],ez=ev.pop,fD=ev.push,fG=ev.push,eI=ev.slice,eS=ev.indexOf||function(fN){var i=0,fO=this.length;for(;i<fO;i++ ){if(this[i]===fN){return i;}
;}
;return -1;}
,fd=n,eK=V,fh=dS,fv=fh.replace(cT,F),fH=dm+eK+ed+fh+dd+eK+el+eK+p+fv+di+eK+cP,fg=dj+fh+dM+fH.replace(3,8)+r,fp=new RegExp(dc+eK+B+eK+K,cO),fx=new RegExp(dc+eK+cX+eK+z),eL=new RegExp(dc+eK+H+eK+dd+eK+z),fj=new RegExp(L+eK+dL+eK+cP,cO),fu=new RegExp(fg),eX=new RegExp(dc+fv+eg),fB={"ID":new RegExp(dX+fh+dd),"CLASS":new RegExp(ec+fh+dd),"TAG":new RegExp(dg+fh.replace(cT,dC)+dd),"ATTR":new RegExp(dc+fH),"PSEUDO":new RegExp(dc+fg),"CHILD":new RegExp(dT+eK+w+eK+X+eK+ds+eK+J,C),"bool":new RegExp(dI+fd+dw,C),"needsContext":new RegExp(dc+eK+en+eK+Y+eK+cQ,C)},fl=/^(?:input|select|textarea|button)$/i,et=/^h\d$/i,fz=/^[^{]+\{\s*\[native \w/,fF=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,fc=/[+~]/,fm=/'|\\/g,eu=new RegExp(D+eK+dB+eK+U,cH),fs=function(_,fP,fQ){var fR=cK+fP-0x10000;return fR!==fR||fQ?fP:fR<0?String.fromCharCode(fR+0x10000):String.fromCharCode(fR>>10|0xD800,fR&0x3FF|0xDC00);}
;try{fG.apply((ev=eI.call(eH.childNodes)),eH.childNodes);ev[eH.childNodes.length].nodeType;}
catch(e){fG={apply:ev.length?function(fT,fS){fD.apply(fT,eI.call(fS));}
:function(fV,fU){var j=fV.length,i=0;while((fV[j++ ]=fU[i++ ])){}
;fV.length=j-1;}
};}
;function fL(gg,fX,gb,gd){var gi,fY,m,fW,i,ge,gh,ga,gf,gc;if((fX?fX.ownerDocument||fX:eH)!==document){eD(fX);}
;fX=fX||document;gb=gb||[];if(!gg||typeof gg!==T){return gb;}
;if((fW=fX.nodeType)!==1&&fW!==9){return [];}
;if(fq&&!gd){if((gi=fF.exec(gg))){if((m=gi[1])){if(fW===9){fY=fX.getElementById(m);if(fY&&fY.parentNode){if(fY.id===m){gb.push(fY);return gb;}
;}
else {return gb;}
;}
else {if(fX.ownerDocument&&(fY=fX.ownerDocument.getElementById(m))&&eN(fX,fY)&&fY.id===m){gb.push(fY);return gb;}
;}
;}
else if(gi[2]){fG.apply(gb,fX.getElementsByTagName(gg));return gb;}
else if((m=gi[3])&&eM.getElementsByClassName&&fX.getElementsByClassName){fG.apply(gb,fX.getElementsByClassName(m));return gb;}
;}
;if(eM.qsa&&(!fe||!fe.test(gg))){ga=gh=fa;gf=fX;gc=fW===9&&gg;if(fW===1&&fX.nodeName.toLowerCase()!==dA){ge=eV(gg);if((gh=fX.getAttribute(N))){ga=gh.replace(fm,ef);}
else {fX.setAttribute(N,ga);}
;ga=dY+ga+f;i=ge.length;while(i-- ){ge[i]=ga+eQ(ge[i]);}
;gf=fc.test(gg)&&eC(fX.parentNode)||fX;gc=ge.join(ek);}
;if(gc){try{fG.apply(gb,gf.querySelectorAll(gc));return gb;}
catch(gj){}
finally{if(!gh){fX.removeAttribute(N);}
;}
;}
;}
;}
;return eG(gg.replace(fp,dN),fX,gb,gd);}
;function ey(){var gk=[];function gl(gm,gn){if(gk.push(gm+cV)>fM.cacheLength){delete gl[gk.shift()];}
;return (gl[gm+cV]=gn);}
;return gl;}
;function fy(go){go[fa]=true;return go;}
;function fk(gq){var gp=document.createElement(k);try{return !!gq(gp);}
catch(e){return false;}
finally{if(gp.parentNode){gp.parentNode.removeChild(gp);}
;gp=null;}
;}
;function fo(gt,gs){var gr=gt.split(dv),i=gt.length;while(i-- ){fM.attrHandle[gr[i]]=gs;}
;}
;function eY(a,b){var gv=b&&a,gu=gv&&a.nodeType===1&&b.nodeType===1&&(~b.sourceIndex||ft)-(~a.sourceIndex||ft);if(gu){return gu;}
;if(gv){while((gv=gv.nextSibling)){if(gv===b){return -1;}
;}
;}
;return a?1:-1;}
;function fE(gw){return function(gx){var name=gx.nodeName.toLowerCase();return name===l&&gx.type===gw;}
;}
;function er(gy){return function(gz){var name=gz.nodeName.toLowerCase();return (name===l||name===de)&&gz.type===gy;}
;}
;function fi(gA){return fy(function(gB){gB=+gB;return fy(function(gE,gC){var j,gD=gA([],gE.length,gB),i=gD.length;while(i-- ){if(gE[(j=gD[i])]){gE[j]=!(gC[j]=gE[j]);}
;}
;}
);}
);}
;function eC(gF){return gF&&typeof gF.getElementsByTagName!==eR&&gF;}
;eM=fL.support={};eB=fL.isXML=function(gG){var gH=gG&&(gG.ownerDocument||gG).documentElement;return gH?gH.nodeName!==eh:false;}
;eD=fL.setDocument=function(gI){var gK,gJ=gI?gI.ownerDocument||gI:eH,parent=gJ.defaultView;if(gJ===document||gJ.nodeType!==9||!gJ.documentElement){return document;}
;document=gJ;fK=gJ.documentElement;fq=!eB(gJ);if(parent&&parent!==parent.top){if(parent.addEventListener){parent.addEventListener(M,function(){eD();}
,false);}
else if(parent.attachEvent){parent.attachEvent(dk,function(){eD();}
);}
;}
;eM.attributes=fk(function(gL){gL.className=C;return !gL.getAttribute(dP);}
);eM.getElementsByTagName=fk(function(gM){gM.appendChild(gJ.createComment(eb));return !gM.getElementsByTagName(z).length;}
);eM.getElementsByClassName=fz.test(gJ.getElementsByClassName)&&fk(function(gN){gN.innerHTML=cU;gN.firstChild.className=C;return gN.getElementsByClassName(C).length===2;}
);eM.getById=fk(function(gO){fK.appendChild(gO).id=fa;return !gJ.getElementsByName||!gJ.getElementsByName(fa).length;}
);if(eM.getById){fM.find[ej]=function(gP,gQ){if(typeof gQ.getElementById!==eR&&fq){var m=gQ.getElementById(gP);return m&&m.parentNode?[m]:[];}
;}
;fM.filter[ej]=function(gS){var gR=gS.replace(eu,fs);return function(gT){return gT.getAttribute(N)===gR;}
;}
;}
else {delete fM.find[ej];fM.filter[ej]=function(gV){var gU=gV.replace(eu,fs);return function(gX){var gW=typeof gX.getAttributeNode!==eR&&gX.getAttributeNode(N);return gW&&gW.value===gU;}
;}
;}
;fM.find[dF]=eM.getElementsByTagName?function(gY,ha){if(typeof ha.getElementsByTagName!==eR){return ha.getElementsByTagName(gY);}
;}
:function(he,hf){var hc,hb=[],i=0,hd=hf.getElementsByTagName(he);if(he===z){while((hc=hd[i++ ])){if(hc.nodeType===1){hb.push(hc);}
;}
;return hb;}
;return hd;}
;fM.find[g]=eM.getElementsByClassName&&function(hg,hh){if(typeof hh.getElementsByClassName!==eR&&fq){return hh.getElementsByClassName(hg);}
;}
;eq=[];fe=[];if((eM.qsa=fz.test(gJ.querySelectorAll))){fk(function(hi){hi.innerHTML=da;if(hi.querySelectorAll(I).length){fe.push(dW+eK+dR);}
;if(!hi.querySelectorAll(cM).length){fe.push(dm+eK+t+fd+dd);}
;if(!hi.querySelectorAll(ee).length){fe.push(ee);}
;}
);fk(function(hk){var hj=gJ.createElement(l);hj.setAttribute(cN,cW);hk.appendChild(hj).setAttribute(dn,dp);if(hk.querySelectorAll(W).length){fe.push(dn+eK+eo);}
;if(!hk.querySelectorAll(dO).length){fe.push(dO,h);}
;hk.querySelectorAll(dV);fe.push(dU);}
);}
;if((eM.matchesSelector=fz.test((ff=fK.webkitMatchesSelector||fK.mozMatchesSelector||fK.oMatchesSelector||fK.msMatchesSelector)))){fk(function(hl){eM.disconnectedMatch=ff.call(hl,k);ff.call(hl,S);eq.push(dx,fg);}
);}
;fe=fe.length&&new RegExp(fe.join(dv));eq=eq.length&&new RegExp(eq.join(dv));gK=fz.test(fK.compareDocumentPosition);eN=gK||fz.test(fK.contains)?function(a,b){var hm=a.nodeType===9?a.documentElement:a,hn=b&&b.parentNode;return a===hn||!!(hn&&hn.nodeType===1&&(hm.contains?hm.contains(hn):a.compareDocumentPosition&&a.compareDocumentPosition(hn)&16));}
:function(a,b){if(b){while((b=b.parentNode)){if(b===a){return true;}
;}
;}
;return false;}
;eT=gK?function(a,b){if(a===b){eF=true;return 0;}
;var ho=!a.compareDocumentPosition-!b.compareDocumentPosition;if(ho){return ho;}
;ho=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1;if(ho&1||(!eM.sortDetached&&b.compareDocumentPosition(a)===ho)){if(a===gJ||a.ownerDocument===eH&&eN(eH,a)){return -1;}
;if(b===gJ||b.ownerDocument===eH&&eN(eH,b)){return 1;}
;return eE?(eS.call(eE,a)-eS.call(eE,b)):0;}
;return ho&4?-1:1;}
:function(a,b){if(a===b){eF=true;return 0;}
;var hp,i=0,hq=a.parentNode,hr=b.parentNode,hs=[a],ht=[b];if(!hq||!hr){return a===gJ?-1:b===gJ?1:hq?-1:hr?1:eE?(eS.call(eE,a)-eS.call(eE,b)):0;}
else if(hq===hr){return eY(a,b);}
;hp=a;while((hp=hp.parentNode)){hs.unshift(hp);}
;hp=b;while((hp=hp.parentNode)){ht.unshift(hp);}
;while(hs[i]===ht[i]){i++ ;}
;return i?eY(hs[i],ht[i]):hs[i]===eH?-1:ht[i]===eH?1:0;}
;return gJ;}
;fL.matches=function(hu,hv){return fL(hu,null,null,hv);}
;fL.matchesSelector=function(hx,hw){if((hx.ownerDocument||hx)!==document){eD(hx);}
;hw=hw.replace(fj,E);if(eM.matchesSelector&&fq&&(!eq||!eq.test(hw))&&(!fe||!fe.test(hw))){try{var hy=ff.call(hx,hw);if(hy||eM.disconnectedMatch||hx.document&&hx.document.nodeType!==11){return hy;}
;}
catch(e){}
;}
;return fL(hw,document,null,[hx]).length>0;}
;fL.contains=function(hA,hz){if((hA.ownerDocument||hA)!==document){eD(hA);}
;return eN(hA,hz);}
;fL.attr=function(hC,name){if((hC.ownerDocument||hC)!==document){eD(hC);}
;var hB=fM.attrHandle[name.toLowerCase()],hD=hB&&fA.call(fM.attrHandle,name.toLowerCase())?hB(hC,name,!fq):undefined;return hD!==undefined?hD:eM.attributes||!fq?hC.getAttribute(name):(hD=hC.getAttributeNode(name))&&hD.specified?hD.value:null;}
;fL.error=function(hE){throw new Error(em+hE);}
;fL.uniqueSort=function(hG){var hH,hF=[],j=0,i=0;eF=!eM.detectDuplicates;eE=!eM.sortStable&&hG.slice(0);hG.sort(eT);if(eF){while((hH=hG[i++ ])){if(hH===hG[i]){j=hF.push(i);}
;}
;while(j-- ){hG.splice(hF[j],1);}
;}
;eE=null;return hG;}
;ew=fL.getText=function(hK){var hI,hL=eb,i=0,hJ=hK.nodeType;if(!hJ){while((hI=hK[i++ ])){hL+=ew(hI);}
;}
else if(hJ===1||hJ===9||hJ===11){if(typeof hK.textContent===T){return hK.textContent;}
else {for(hK=hK.firstChild;hK;hK=hK.nextSibling){hL+=ew(hK);}
;}
;}
else if(hJ===3||hJ===4){return hK.nodeValue;}
;return hL;}
;fM=fL.selectors={cacheLength:50,createPseudo:fy,match:fB,attrHandle:{},find:{},relative:{">":{dir:cI,first:true}," ":{dir:cI},"+":{dir:v,first:true},"~":{dir:v}},preFilter:{"ATTR":function(hM){hM[1]=hM[1].replace(eu,fs);hM[3]=(hM[4]||hM[5]||eb).replace(eu,fs);if(hM[2]===u){hM[3]=cV+hM[3]+cV;}
;return hM.slice(0,4);}
,"CHILD":function(hN){hN[1]=hN[1].toLowerCase();if(hN[1].slice(0,3)===o){if(!hN[3]){fL.error(hN[0]);}
;hN[4]=+(hN[4]?hN[5]+(hN[6]||1):2*(hN[3]===cY||hN[3]===dq));hN[5]=+((hN[7]+hN[8])||hN[3]===dq);}
else if(hN[3]){fL.error(hN[0]);}
;return hN;}
,"PSEUDO":function(hP){var hQ,hO=!hP[5]&&hP[2];if(fB[ea].test(hP[0])){return null;}
;if(hP[3]&&hP[4]!==undefined){hP[2]=hP[4];}
else if(hO&&fu.test(hO)&&(hQ=eV(hO,true))&&(hQ=hO.indexOf(dd,hO.length-hQ)-hO.length)){hP[0]=hP[0].slice(0,hQ);hP[2]=hO.slice(0,hQ);}
;return hP.slice(0,3);}
},filter:{"TAG":function(hR){var hS=hR.replace(eu,fs).toLowerCase();return hR===z?function(){return true;}
:function(hT){return hT.nodeName&&hT.nodeName.toLowerCase()===hS;}
;}
,"CLASS":function(hU){var hV=es[hU+cV];return hV||(hV=new RegExp(d+eK+dd+hU+cS+eK+dE))&&es(hU,function(hW){return hV.test(typeof hW.className===T&&hW.className||typeof hW.getAttribute!==eR&&hW.getAttribute(dr)||eb);}
);}
,"ATTR":function(name,hX,hY){return function(ia){var ib=fL.attr(ia,name);if(ib==null){return hX===dx;}
;if(!hX){return true;}
;ib+=eb;return hX===L?ib===hY:hX===dx?ib!==hY:hX===G?hY&&ib.indexOf(hY)===0:hX===du?hY&&ib.indexOf(hY)>-1:hX===R?hY&&ib.slice(-hY.length)===hY:hX===u?(cV+ib+cV).indexOf(hY)>-1:hX===dl?ib===hY||ib.slice(0,hY.length+1)===hY+c:false;}
;}
,"CHILD":function(ij,ic,ii,ik,ie){var ih=ij.slice(0,3)!==o,forward=ij.slice(-4)!==ei,ig=ic===dG;return ik===1&&ie===0?function(il){return !!il.parentNode;}
:function(ir,iu,im){var iq,iv,io,iw,ip,is,ix=ih!==forward?Q:v,parent=ir.parentNode,name=ig&&ir.nodeName.toLowerCase(),it=!im&&!ig;if(parent){if(ih){while(ix){io=ir;while((io=io[ix])){if(ig?io.nodeName.toLowerCase()===name:io.nodeType===1){return false;}
;}
;is=ix=ij===y&&!is&&Q;}
;return true;}
;is=[forward?parent.firstChild:parent.lastChild];if(forward&&it){iv=parent[fa]||(parent[fa]={});iq=iv[ij]||[];ip=iq[0]===eW&&iq[1];iw=iq[0]===eW&&iq[2];io=ip&&parent.childNodes[ip];while((io= ++ip&&io&&io[ix]||(iw=ip=0)||is.pop())){if(io.nodeType===1&& ++iw&&io===ir){iv[ij]=[eW,ip,iw];break;}
;}
;}
else if(it&&(iq=(ir[fa]||(ir[fa]={}))[ij])&&iq[0]===eW){iw=iq[1];}
else {while((io= ++ip&&io&&io[ix]||(iw=ip=0)||is.pop())){if((ig?io.nodeName.toLowerCase()===name:io.nodeType===1)&& ++iw){if(it){(io[fa]||(io[fa]={}))[ij]=[eW,iw];}
;if(io===ir){break;}
;}
;}
;}
;iw-=ie;return iw===ik||(iw%ik===0&&iw/ik>=0);}
;}
;}
,"PSEUDO":function(iz,iA){var iy,iB=fM.pseudos[iz]||fM.setFilters[iz.toLowerCase()]||fL.error(cR+iz);if(iB[fa]){return iB(iA);}
;if(iB.length>1){iy=[iz,iz,eb,iA];return fM.setFilters.hasOwnProperty(iz.toLowerCase())?fy(function(iD,iC){var iE,iF=iB(iD,iA),i=iF.length;while(i-- ){iE=eS.call(iD,iF[i]);iD[iE]=!(iC[iE]=iF[i]);}
;}
):function(iG){return iB(iG,0,iy);}
;}
;return iB;}
},pseudos:{"not":fy(function(iI){var iH=[],iJ=[],iK=fC(iI.replace(fp,dN));return iK[fa]?fy(function(iP,iM,iQ,iL){var iN,iO=iK(iP,null,iL,[]),i=iP.length;while(i-- ){if((iN=iO[i])){iP[i]=!(iM[i]=iN);}
;}
;}
):function(iS,iT,iR){iH[0]=iS;iK(iH,null,iR,iJ);return !iJ.pop();}
;}
),"has":fy(function(iU){return function(iV){return fL(iU,iV).length>0;}
;}
),"contains":fy(function(iW){return function(iX){return (iX.textContent||iX.innerText||ew(iX)).indexOf(iW)>-1;}
;}
),"lang":fy(function(iY){if(!eX.test(iY||eb)){fL.error(A+iY);}
;iY=iY.replace(eu,fs).toLowerCase();return function(jb){var ja;do {if((ja=fq?jb.lang:jb.getAttribute(x)||jb.getAttribute(dt))){ja=ja.toLowerCase();return ja===iY||ja.indexOf(iY+c)===0;}
;}
while((jb=jb.parentNode)&&jb.nodeType===1);return false;}
;}
),"target":function(jd){var jc=window.location&&window.location.hash;return jc&&jc.slice(1)===jd.id;}
,"root":function(je){return je===fK;}
,"focus":function(jf){return jf===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(jf.type||jf.href||~jf.tabIndex);}
,"enabled":function(jg){return jg.disabled===false;}
,"disabled":function(jh){return jh.disabled===true;}
,"checked":function(ji){var jj=ji.nodeName.toLowerCase();return (jj===l&&!!ji.checked)||(jj===dh&&!!ji.selected);}
,"selected":function(jk){if(jk.parentNode){jk.parentNode.selectedIndex;}
;return jk.selected===true;}
,"empty":function(jl){for(jl=jl.firstChild;jl;jl=jl.nextSibling){if(jl.nodeType<6){return false;}
;}
;return true;}
,"parent":function(jm){return !fM.pseudos[dK](jm);}
,"header":function(jn){return et.test(jn.nodeName);}
,"input":function(jo){return fl.test(jo.nodeName);}
,"button":function(jp){var name=jp.nodeName.toLowerCase();return name===l&&jp.type===de||name===de;}
,"text":function(jq){var jr;return jq.nodeName.toLowerCase()===l&&jq.type===O&&((jr=jq.getAttribute(cN))==null||jr.toLowerCase()===O);}
,"first":fi(function(){return [0];}
),"last":fi(function(js,length){return [length-1];}
),"eq":fi(function(jt,length,ju){return [ju<0?ju+length:ju];}
),"even":fi(function(jv,length){var i=0;for(;i<length;i+=2){jv.push(i);}
;return jv;}
),"odd":fi(function(jw,length){var i=1;for(;i<length;i+=2){jw.push(i);}
;return jw;}
),"lt":fi(function(jx,length,jy){var i=jy<0?jy+length:jy;for(; --i>=0;){jx.push(i);}
;return jx;}
),"gt":fi(function(jz,length,jA){var i=jA<0?jA+length:jA;for(; ++i<length;){jz.push(i);}
;return jz;}
)}};fM.pseudos[o]=fM.pseudos[dQ];for(i in {radio:true,checkbox:true,file:true,password:true,image:true}){fM.pseudos[i]=fE(i);}
;for(i in {submit:true,reset:true}){fM.pseudos[i]=er(i);}
;function fJ(){}
;fJ.prototype=fM.filters=fM.pseudos;fM.setFilters=new fJ();function eV(jE,jD){var jK,jJ,jB,jI,jF,jH,jG,jC=fr[jE+cV];if(jC){return jD?0:jC.slice(0);}
;jF=jE;jH=[];jG=fM.preFilter;while(jF){if(!jK||(jJ=fx.exec(jF))){if(jJ){jF=jF.slice(jJ[0].length)||jF;}
;jH.push((jB=[]));}
;jK=false;if((jJ=eL.exec(jF))){jK=jJ.shift();jB.push({value:jK,type:jJ[0].replace(fp,cV)});jF=jF.slice(jK.length);}
;for(jI in fM.filter){if((jJ=fB[jI].exec(jF))&&(!jG[jI]||(jJ=jG[jI](jJ)))){jK=jJ.shift();jB.push({value:jK,type:jI,matches:jJ});jF=jF.slice(jK.length);}
;}
;if(!jK){break;}
;}
;return jD?jF.length:jF?fL.error(jE):fr(jE,jH).slice(0);}
;function eQ(jL){var i=0,jM=jL.length,jN=eb;for(;i<jM;i++ ){jN+=jL[i].value;}
;return jN;}
;function eO(jO,jP,jQ){var jR=jP.dir,jT=jQ&&jR===cI,jS=eA++ ;return jP.first?function(jV,jW,jU){while((jV=jV[jR])){if(jV.nodeType===1||jT){return jO(jV,jW,jU);}
;}
;}
:function(jY,kb,jX){var ka,kc,kd=[eW,jS];if(jX){while((jY=jY[jR])){if(jY.nodeType===1||jT){if(jO(jY,kb,jX)){return true;}
;}
;}
;}
else {while((jY=jY[jR])){if(jY.nodeType===1||jT){kc=jY[fa]||(jY[fa]={});if((ka=kc[jR])&&ka[0]===eW&&ka[1]===jS){return (kd[2]=ka[2]);}
else {kc[jR]=kd;if((kd[2]=jO(jY,kb,jX))){return true;}
;}
;}
;}
;}
;}
;}
;function eP(ke){return ke.length>1?function(kg,kh,kf){var i=ke.length;while(i-- ){if(!ke[i](kg,kh,kf)){return false;}
;}
;return true;}
:ke[0];}
;function fw(kl,ki,kj){var i=0,kk=ki.length;for(;i<kk;i++ ){fL(kl,ki[i],kj);}
;return kj;}
;function ex(kp,kn,kq,ks,km){var ko,ku=[],i=0,kr=kp.length,kt=kn!=null;for(;i<kr;i++ ){if((ko=kp[i])){if(!kq||kq(ko,ks,km)){ku.push(ko);if(kt){kn.push(i);}
;}
;}
;}
;return ku;}
;function eJ(kz,ky,kx,kw,kv,kA){if(kw&&!kw[fa]){kw=eJ(kw);}
;if(kv&&!kv[fa]){kv=eJ(kv,kA);}
;return fy(function(kJ,kE,kK,kB){var kC,i,kG,kI=[],kM=[],kD=kE.length,kL=kJ||fw(ky||z,kK.nodeType?[kK]:kK,[]),kF=kz&&(kJ||!ky)?ex(kL,kI,kz,kK,kB):kL,kH=kx?kv||(kJ?kz:kD||kw)?[]:kE:kF;if(kx){kx(kF,kH,kK,kB);}
;if(kw){kC=ex(kH,kM);kw(kC,[],kK,kB);i=kC.length;while(i-- ){if((kG=kC[i])){kH[kM[i]]=!(kF[kM[i]]=kG);}
;}
;}
;if(kJ){if(kv||kz){if(kv){kC=[];i=kH.length;while(i-- ){if((kG=kH[i])){kC.push((kF[i]=kG));}
;}
;kv(null,(kH=[]),kC,kB);}
;i=kH.length;while(i-- ){if((kG=kH[i])&&(kC=kv?eS.call(kJ,kG):kI[i])>-1){kJ[kC]=!(kE[kC]=kG);}
;}
;}
;}
else {kH=ex(kH===kE?kH.splice(kD,kH.length):kH);if(kv){kv(null,kE,kH,kB);}
else {fG.apply(kE,kH);}
;}
;}
);}
;function fb(kS){var kN,kP,j,kQ=kS.length,kO=fM.relative[kS[0].type],kV=kO||fM.relative[cV],i=kO?1:0,kU=eO(function(kW){return kW===kN;}
,kV,true),kR=eO(function(kX){return eS.call(kN,kX)>-1;}
,kV,true),kT=[function(la,lb,kY){return (!kO&&(kY||lb!==ep))||((kN=lb).nodeType?kU(la,lb,kY):kR(la,lb,kY));}
];for(;i<kQ;i++ ){if((kP=fM.relative[kS[i].type])){kT=[eO(eP(kT),kP)];}
else {kP=fM.filter[kS[i].type].apply(null,kS[i].matches);if(kP[fa]){j= ++i;for(;j<kQ;j++ ){if(fM.relative[kS[j].type]){break;}
;}
;return eJ(i>1&&eP(kT),i>1&&eQ(kS.slice(0,i-1).concat({value:kS[i-2].type===cV?z:eb})).replace(fp,dN),kP,i<j&&fb(kS.slice(i,j)),j<kQ&&fb((kS=kS.slice(j))),j<kQ&&eQ(kS));}
;kT.push(kP);}
;}
;return eP(kT);}
;function eU(lg,ld){var lc=ld.length>0,le=lg.length>0,lf=function(lp,ls,lh,ll,lk){var ln,j,lt,li=0,i=df,lm=lp&&[],lo=[],lj=ep,lu=lp||le&&fM.find[dF](z,lk),lq=(eW+=lj==null?1:Math.random()||0.1),lr=lu.length;if(lk){ep=ls!==document&&ls;}
;for(;i!==lr&&(ln=lu[i])!=null;i++ ){if(le&&ln){j=0;while((lt=lg[j++ ])){if(lt(ln,ls,lh)){ll.push(ln);break;}
;}
;if(lk){eW=lq;}
;}
;if(lc){if((ln=!lt&&ln)){li-- ;}
;if(lp){lm.push(ln);}
;}
;}
;li+=i;if(lc&&i!==li){j=0;while((lt=ld[j++ ])){lt(lm,lo,ls,lh);}
;if(lp){if(li>0){while(i-- ){if(!(lm[i]||lo[i])){lo[i]=ez.call(ll);}
;}
;}
;lo=ex(lo);}
;fG.apply(ll,lo);if(lk&&!lp&&lo.length>0&&(li+ld.length)>1){fL.uniqueSort(ll);}
;}
;if(lk){eW=lq;ep=lj;}
;return lm;}
;return lc?fy(lf):lf;}
;fC=fL.compile=function(lw,lz){var i,ly=[],lv=[],lx=fI[lw+cV];if(!lx){if(!lz){lz=eV(lw);}
;i=lz.length;while(i-- ){lx=fb(lz[i]);if(lx[fa]){ly.push(lx);}
else {lv.push(lx);}
;}
;lx=fI(lw,eU(lv,ly));lx.selector=lw;}
;return lx;}
;eG=fL.select=function(lC,lG,lB,lF){var i,lD,lE,lH,find,lA=typeof lC===db&&lC,lI=!lF&&eV((lC=lA.selector||lC));lB=lB||[];if(lI.length===1){lD=lI[0]=lI[0].slice(0);if(lD.length>2&&(lE=lD[0]).type===ej&&eM.getById&&lG.nodeType===9&&fq&&fM.relative[lD[1].type]){lG=(fM.find[ej](lE.matches[0].replace(eu,fs),lG)||[])[0];if(!lG){return lB;}
else if(lA){lG=lG.parentNode;}
;lC=lC.slice(lD.shift().value.length);}
;i=fB[P].test(lC)?0:lD.length;while(i-- ){lE=lD[i];if(fM.relative[(lH=lE.type)]){break;}
;if((find=fM.find[lH])){if((lF=find(lE.matches[0].replace(eu,fs),fc.test(lD[0].type)&&eC(lG.parentNode)||lG))){lD.splice(i,1);lC=lF.length&&eQ(lD);if(!lC){fG.apply(lB,lF);return lB;}
;break;}
;}
;}
;}
;(lA||fC(lC,lI))(lF,lG,!fq,lB,fc.test(lC)&&eC(lG.parentNode)||lG);return lB;}
;eM.sortStable=fa.split(eb).sort(eT).join(eb)===fa;eM.detectDuplicates=!!eF;eD();eM.sortDetached=fk(function(lJ){return lJ.compareDocumentPosition(document.createElement(k))&1;}
);if(!fk(function(lK){lK.innerHTML=dD;return lK.firstChild.getAttribute(cJ)===cL;}
)){fo(q,function(lL,name,lM){if(!lM){return lL.getAttribute(name,name.toLowerCase()===cN?1:2);}
;}
);}
;if(!eM.attributes||!fk(function(lN){lN.innerHTML=dy;lN.firstChild.setAttribute(dH,eb);return lN.firstChild.getAttribute(dH)===eb;}
)){fo(dH,function(lO,name,lP){if(!lP&&lO.nodeName.toLowerCase()===l){return lO.defaultValue;}
;}
);}
;if(!fk(function(lQ){return lQ.getAttribute(s)==null;}
)){fo(fd,function(lS,name,lR){var lT;if(!lR){return lS[name]===true?name.toLowerCase():(lT=lS.getAttributeNode(name))&&lT.specified?lT.value:null;}
;}
);}
;qx.bom.Selector.query=function(lV,lU){return fL(lV,lU);}
;qx.bom.Selector.matches=function(lX,lW){return fL(lX,null,null,lW);}
;}
)(window);}
)();
(function(){var a="display",b="",c="block",d="none",e="_getHeight",f="_getContentWidth",g="_getContentHeight",h="hidden",j="_getWidth",k="qx.module.Css",m="absolute";qx.Bootstrap.define(k,{statics:{_getHeight:function(p){var q=this[0];if(q){if(qx.dom.Node.isElement(q)){var n;if(p){var o={display:c,position:m,visibility:h};n=qx.module.Css.__oM(q,o,e,this);}
else {n=qx.bom.element.Dimension.getHeight(q);}
;return n;}
else if(qx.dom.Node.isDocument(q)){return qx.bom.Document.getHeight(qx.dom.Node.getWindow(q));}
else if(qx.dom.Node.isWindow(q)){return qx.bom.Viewport.getHeight(q);}
;}
;return null;}
,_getWidth:function(t){var u=this[0];if(u){if(qx.dom.Node.isElement(u)){var r;if(t){var s={display:c,position:m,visibility:h};r=qx.module.Css.__oM(u,s,j,this);}
else {r=qx.bom.element.Dimension.getWidth(u);}
;return r;}
else if(qx.dom.Node.isDocument(u)){return qx.bom.Document.getWidth(qx.dom.Node.getWindow(u));}
else if(qx.dom.Node.isWindow(u)){return qx.bom.Viewport.getWidth(u);}
;}
;return null;}
,_getContentHeight:function(w){var y=this[0];if(qx.dom.Node.isElement(y)){var x;if(w){var v={position:m,visibility:h,display:c};x=qx.module.Css.__oM(y,v,g,this);}
else {x=qx.bom.element.Dimension.getContentHeight(y);}
;return x;}
;return null;}
,_getContentWidth:function(B){var z=this[0];if(qx.dom.Node.isElement(z)){var C;if(B){var A={position:m,visibility:h,display:c};C=qx.module.Css.__oM(z,A,f,this);}
else {C=qx.bom.element.Dimension.getContentWidth(z);}
;return C;}
;return null;}
,__oK:{},__oL:function(G,D){var F=qx.module.Css.__oK;if(!F[G]){var H=D||document;var E=qxWeb(H.createElement(G)).appendTo(D.body);F[G]=E.getStyle(a);E.remove();}
;return F[G]||b;}
,__oM:function(L,I,J,O){var M={};for(var N in I){M[N]=L.style[N];L.style[N]=I[N];}
;var K=O[J]();for(var N in M){L.style[N]=M[N];}
;return K;}
,includeStylesheet:function(Q,P){qx.bom.Stylesheet.includeFile(Q,P);}
},members:{getHeight:function(R){return this._getHeight(R);}
,getWidth:function(S){return this._getWidth(S);}
,getContentHeight:function(T){return this._getContentHeight(T);}
,getContentWidth:function(U){return this._getContentWidth(U);}
,show:function(){this._forEachElementWrapped(function(X){var Y=X.getStyle(a);var W=X[0].$$qPrevDisp;var V;if(Y==d){if(W&&W!=d){V=W;}
else {var ba=qxWeb.getDocument(X[0]);V=qx.module.Css.__oL(X[0].tagName,ba);}
;X.setStyle(a,V);X[0].$$qPrevDisp=d;}
;}
);return this;}
,hide:function(){this._forEachElementWrapped(function(bb){var bc=bb.getStyle(a);if(bc!==d){bb[0].$$qPrevDisp=bc;bb.setStyle(a,d);}
;}
);return this;}
,getPosition:function(){var bd=this[0];if(qx.dom.Node.isElement(bd)){return qx.bom.element.Location.getPosition(bd);}
;return null;}
,getOffset:function(be){var bf=this[0];if(bf&&qx.dom.Node.isElement(bf)){return qx.bom.element.Location.get(bf,be);}
;return null;}
,setStyle:function(name,bg){if(/\w-\w/.test(name)){name=qx.lang.String.camelCase(name);}
;this._forEachElement(function(bh){qx.bom.element.Style.set(bh,name,bg);}
);return this;}
,getStyle:function(name){if(this[0]&&qx.dom.Node.isElement(this[0])){if(/\w-\w/.test(name)){name=qx.lang.String.camelCase(name);}
;return qx.bom.element.Style.get(this[0],name);}
;return null;}
,setStyles:function(bi){for(var name in bi){this.setStyle(name,bi[name]);}
;return this;}
,getStyles:function(bk){var bj={};for(var i=0;i<bk.length;i++ ){bj[bk[i]]=this.getStyle(bk[i]);}
;return bj;}
,addClass:function(name){this._forEachElement(function(bl){qx.bom.element.Class.add(bl,name);}
);return this;}
,addClasses:function(bm){this._forEachElement(function(bn){qx.bom.element.Class.addClasses(bn,bm);}
);return this;}
,removeClass:function(name){this._forEachElement(function(bo){qx.bom.element.Class.remove(bo,name);}
);return this;}
,removeClasses:function(bp){this._forEachElement(function(bq){qx.bom.element.Class.removeClasses(bq,bp);}
);return this;}
,hasClass:function(name){if(!this[0]||!qx.dom.Node.isElement(this[0])){return false;}
;return qx.bom.element.Class.has(this[0],name);}
,getClass:function(){if(!this[0]||!qx.dom.Node.isElement(this[0])){return b;}
;return qx.bom.element.Class.get(this[0]);}
,toggleClass:function(name){var br=qx.bom.element.Class;this._forEachElement(function(bs){br.has(bs,name)?br.remove(bs,name):br.add(bs,name);}
);return this;}
,toggleClasses:function(bt){for(var i=0,l=bt.length;i<l;i++ ){this.toggleClass(bt[i]);}
;return this;}
,replaceClass:function(bv,bu){this._forEachElement(function(bw){qx.bom.element.Class.replace(bw,bv,bu);}
);return this;}
},defer:function(bx){qxWeb.$attachAll(this);qxWeb.$attach({"_getWidth":bx._getWidth,"_getHeight":bx._getHeight,"_getContentHeight":bx._getContentHeight,"_getContentWidth":bx._getContentWidth});}
});}
)();
(function(){var a="borderBottomWidth",b="scroll",c="qx.bom.element.Location",d="gecko",e="paddingLeft",f="borderRightWidth",g="auto",h="static",i="borderTopWidth",j="borderLeftWidth",k="marginBottom",l="marginTop",m="overflowY",n="marginLeft",o="border-box",p="padding",q="paddingBottom",r="paddingTop",s="marginRight",t="browser.quirksmode",u="engine.name",v="position",w="margin",x="paddingRight",y="BODY",z="overflowX",A="border";qx.Bootstrap.define(c,{statics:{__pa:function(C,B){return qx.bom.element.Style.get(C,B,qx.bom.element.Style.COMPUTED_MODE,false);}
,__pb:function(E,D){return parseInt(qx.bom.element.Style.get(E,D,qx.bom.element.Style.COMPUTED_MODE,false),10)||0;}
,__pc:function(G){var H=0,top=0;var F=qx.dom.Node.getWindow(G);H-=qx.bom.Viewport.getScrollLeft(F);top-=qx.bom.Viewport.getScrollTop(F);return {left:H,top:top};}
,__pd:qx.core.Environment.select(u,{"mshtml":function(K){var J=qx.dom.Node.getDocument(K);var I=J.body;var L=0;var top=0;L-=I.clientLeft+J.documentElement.clientLeft;top-=I.clientTop+J.documentElement.clientTop;if(!qx.core.Environment.get(t)){L+=this.__pb(I,j);top+=this.__pb(I,i);}
;return {left:L,top:top};}
,"webkit":function(O){var N=qx.dom.Node.getDocument(O);var M=N.body;var P=M.offsetLeft;var top=M.offsetTop;return {left:P,top:top};}
,"gecko":function(R){var Q=qx.dom.Node.getDocument(R).body;var S=Q.offsetLeft;var top=Q.offsetTop;if(qx.bom.element.BoxSizing.get(Q)!==o){S+=this.__pb(Q,j);top+=this.__pb(Q,i);}
;return {left:S,top:top};}
,"default":function(U){var T=qx.dom.Node.getDocument(U).body;var V=T.offsetLeft;var top=T.offsetTop;return {left:V,top:top};}
}),__pe:function(W){var X=W.getBoundingClientRect();return {left:Math.round(X.left),top:Math.round(X.top)};}
,get:function(bd,be){if(bd.tagName==y){var location=this.__pf(bd);var bh=location.left;var top=location.top;}
else {var Y=this.__pd(bd);var bc=this.__pe(bd);var scroll=this.__pc(bd);var bh=bc.left+Y.left-scroll.left;var top=bc.top+Y.top-scroll.top;}
;var ba=bh+bd.offsetWidth;var bb=top+bd.offsetHeight;if(be){if(be==p||be==b){var bg=qx.bom.element.Style.get(bd,z);if(bg==b||bg==g){ba+=bd.scrollWidth-bd.offsetWidth+this.__pb(bd,j)+this.__pb(bd,f);}
;var bf=qx.bom.element.Style.get(bd,m);if(bf==b||bf==g){bb+=bd.scrollHeight-bd.offsetHeight+this.__pb(bd,i)+this.__pb(bd,a);}
;}
;switch(be){case p:bh+=this.__pb(bd,e);top+=this.__pb(bd,r);ba-=this.__pb(bd,x);bb-=this.__pb(bd,q);case b:bh-=bd.scrollLeft;top-=bd.scrollTop;ba-=bd.scrollLeft;bb-=bd.scrollTop;case A:bh+=this.__pb(bd,j);top+=this.__pb(bd,i);ba-=this.__pb(bd,f);bb-=this.__pb(bd,a);break;case w:bh-=this.__pb(bd,n);top-=this.__pb(bd,l);ba+=this.__pb(bd,s);bb+=this.__pb(bd,k);break;};}
;return {left:bh,top:top,right:ba,bottom:bb};}
,__pf:function(bi){var top=bi.offsetTop;var bj=bi.offsetLeft;top+=this.__pb(bi,l);bj+=this.__pb(bi,n);if(qx.core.Environment.get(u)===d){top+=this.__pb(bi,j);bj+=this.__pb(bi,i);}
;return {left:bj,top:top};}
,getLeft:function(bk,bl){return this.get(bk,bl).left;}
,getTop:function(bm,bn){return this.get(bm,bn).top;}
,getRight:function(bo,bp){return this.get(bo,bp).right;}
,getBottom:function(bq,br){return this.get(bq,br).bottom;}
,getRelative:function(bv,bu,bt,bs){var bx=this.get(bv,bt);var bw=this.get(bu,bs);return {left:bx.left-bw.left,top:bx.top-bw.top,right:bx.right-bw.right,bottom:bx.bottom-bw.bottom};}
,getPosition:function(by){return this.getRelative(by,this.getOffsetParent(by));}
,getOffsetParent:function(bB){var bA=bB.offsetParent||document.body;var bz=qx.bom.element.Style;while(bA&&(!/^body|html$/i.test(bA.tagName)&&bz.get(bA,v)===h)){bA=bA.offsetParent;}
;return bA;}
}});}
)();
(function(){var a='',b="(^|\\s)",c=" is undefined",d='function',e="(\\s|$)",f="",g="\\b|\\b",h="qx.debug",j="qx.bom.element.Class",k=" cannot be determined",m='SVGAnimatedString',n="html.classlist",o="default",p=" ",q='object',r="className for element ",s="g",t="$2",u="native",v="\\b",w='undefined';qx.Bootstrap.define(j,{statics:{__pg:/\s+/g,__ph:/^\s+|\s+$/g,add:{"native":function(x,name){if(name.length>0){x.classList.add(name);}
;return name;}
,"default":function(y,name){if(!this.has(y,name)){y.className+=(y.className?p:f)+name;}
;return name;}
}[qx.core.Environment.get(n)?u:o],addClasses:{"native":function(A,z){for(var i=0;i<z.length;i++ ){if(z[i].length>0){A.classList.add(z[i]);}
;}
;return A.className;}
,"default":function(C,E){var D={};var F;var B=C.className;if(B){F=B.split(this.__pg);for(var i=0,l=F.length;i<l;i++ ){D[F[i]]=true;}
;for(var i=0,l=E.length;i<l;i++ ){if(!D[E[i]]){F.push(E[i]);}
;}
;}
else {F=E;}
;return C.className=F.join(p);}
}[qx.core.Environment.get(n)?u:o],get:function(H){var G=H.className;if(typeof G.split!==d){if(typeof G===q){if(qx.Bootstrap.getClass(G)==m){G=G.baseVal;}
else {if(qx.core.Environment.get(h)){qx.log.Logger.warn(this,r+H+k);}
;G=a;}
;}
;if(typeof G===w){if(qx.core.Environment.get(h)){qx.log.Logger.warn(this,r+H+c);}
;G=a;}
;}
;return G;}
,has:{"native":function(I,name){return I.classList.contains(name);}
,"default":function(K,name){var J=new RegExp(b+name+e);return J.test(K.className);}
}[qx.core.Environment.get(n)?u:o],remove:{"native":function(L,name){L.classList.remove(name);return name;}
,"default":function(N,name){var M=new RegExp(b+name+e);N.className=N.className.replace(M,t);return name;}
}[qx.core.Environment.get(n)?u:o],removeClasses:{"native":function(P,O){for(var i=0;i<O.length;i++ ){P.classList.remove(O[i]);}
;return P.className;}
,"default":function(S,Q){var R=new RegExp(v+Q.join(g)+v,s);return S.className=S.className.replace(R,f).replace(this.__ph,f).replace(this.__pg,p);}
}[qx.core.Environment.get(n)?u:o],replace:function(V,U,T){if(!this.has(V,U)){return f;}
;this.remove(V,U);return this.add(V,T);}
,toggle:{"native":function(X,name,W){if(W===undefined){X.classList.toggle(name);}
else {W?this.add(X,name):this.remove(X,name);}
;return name;}
,"default":function(ba,name,Y){if(Y==null){Y=!this.has(ba,name);}
;Y?this.add(ba,name):this.remove(ba,name);return name;}
}[qx.core.Environment.get(n)?u:o]}});}
)();
(function(){var a="ipod",b="pc",c="ps3",d=")",e="device.type",f="psp",g="wii",h="xbox",i="\.",j="iemobile",k="ipad",l="ds",m="(",n="mobile",o="tablet",p="ontouchstart",q="g",r="iphone",s="|",t="qx.bom.client.Device",u="desktop",v="device.name",w="device.touch",x="undefined",y="device.pixelRatio";qx.Bootstrap.define(t,{statics:{__kC:{"Windows Phone":j,"iPod":a,"iPad":k,"iPhone":r,"PSP":f,"PLAYSTATION 3":c,"Nintendo Wii":g,"Nintendo DS":l,"XBOX":h,"Xbox":h},getName:function(){var B=[];for(var A in qx.bom.client.Device.__kC){B.push(A);}
;var C=new RegExp(m+B.join(s).replace(/\./g,i)+d,q);var z=C.exec(navigator.userAgent);if(z&&z[1]){return qx.bom.client.Device.__kC[z[1]];}
;return b;}
,getType:function(){return qx.bom.client.Device.detectDeviceType(navigator.userAgent);}
,detectDeviceType:function(D){if(qx.bom.client.Device.detectTabletDevice(D)){return o;}
else if(qx.bom.client.Device.detectMobileDevice(D)){return n;}
;return u;}
,detectMobileDevice:function(E){return /android.+mobile|ip(hone|od)|bada\/|blackberry|BB10|maemo|opera m(ob|in)i|fennec|NetFront|phone|psp|symbian|IEMobile|windows (ce|phone)|xda/i.test(E);}
,detectTabletDevice:function(G){var H=(/MSIE 10/i.test(G))&&(/ARM/i.test(G))&&!(/windows phone/i.test(G));var F=(!(/android.+mobile|Tablet PC/i.test(G))&&(/Android|ipad|tablet|playbook|silk|kindle|psp/i.test(G)));return H||F;}
,getDevicePixelRatio:function(){if(typeof window.devicePixelRatio!==x){return window.devicePixelRatio;}
;return 1;}
,getTouch:function(){return ((p in window)||window.navigator.maxTouchPoints>0||window.navigator.msMaxTouchPoints>0);}
},defer:function(I){qx.core.Environment.add(v,I.getName);qx.core.Environment.add(w,I.getTouch);qx.core.Environment.add(e,I.getType);qx.core.Environment.add(y,I.getDevicePixelRatio);}
});}
)();
(function(){var a="foo",b="function",c="event.mouseevent",d="UIEvents",f="qx.bom.client.Event",g="event.dispatchevent",h="event.mousecreateevent",j="mousewheel",k="event.touch",l="onhelp",m="event.help",n="event.hashchange",o="pointerEnabled",p="event.customevent",q="click",r="documentMode",s="ontouchstart",t="mshtml",u="MouseEvents",v="onhashchange",w="event.mousewheel",x="wheel",y="DOMMouseScroll",z="msPointerEnabled",A="event.mspointer";qx.Bootstrap.define(f,{statics:{getTouch:function(){return (s in window);}
,getMsPointer:function(){if(o in window.navigator){return window.navigator.pointerEnabled;}
else if(z in window.navigator){return window.navigator.msPointerEnabled;}
;return false;}
,getHelp:function(){return (l in document);}
,getHashChange:function(){var B=qx.bom.client.Engine.getName();var C=v in window;return (B!==t&&C)||(B===t&&r in document&&document.documentMode>=8&&C);}
,getDispatchEvent:function(){return typeof document.dispatchEvent==b;}
,getCustomEvent:function(){if(!window.CustomEvent){return false;}
;try{new window.CustomEvent(a);return true;}
catch(D){return false;}
;}
,getMouseEvent:function(){if(!window.MouseEvent){return false;}
;try{new window.MouseEvent(a);return true;}
catch(E){return false;}
;}
,getMouseCreateEvent:function(){try{var e=document.createEvent(u);var F=e.pageX;e.initMouseEvent(q,false,false,window,0,0,0,F+1,0,false,false,false,false,0,null);if(e.pageX!==F){return u;}
;return d;}
catch(G){return d;}
;}
,getMouseWheel:function(H){if(!H){H=window;}
;var K=[H,H.document,H.document.body];var J=H;var I=y;for(var i=0;i<K.length;i++ ){if(qx.bom.Event.supportsEvent(K[i],x)){I=x;J=K[i];break;}
;if(qx.bom.Event.supportsEvent(K[i],j)){I=j;J=K[i];break;}
;}
;return {type:I,target:J};}
},defer:function(L){qx.core.Environment.add(k,L.getTouch);qx.core.Environment.add(c,L.getMouseEvent);qx.core.Environment.add(h,L.getMouseCreateEvent);qx.core.Environment.add(g,L.getDispatchEvent);qx.core.Environment.add(p,L.getCustomEvent);qx.core.Environment.add(A,L.getMsPointer);qx.core.Environment.add(m,L.getHelp);qx.core.Environment.add(n,L.getHashChange);qx.core.Environment.add(w,L.getMouseWheel);}
});}
)();
(function(){var a="engine.name",b="event.mspointer",c="device.type",d="env",e="engine.version",f="qx.module.Environment",g="browser.version",h="event.touch",i="device.name",j="browser.quirksmode",k="browser.name",l="browser.documentmode";qx.Bootstrap.define(f,{statics:{get:function(m){return qx.core.Environment.get(m);}
,add:function(n,o){qx.core.Environment.add(n,o);return this;}
},defer:function(p){qx.core.Environment.get(k);qx.core.Environment.get(g);qx.core.Environment.get(j);qx.core.Environment.get(l);qx.core.Environment.get(a);qx.core.Environment.get(e);qx.core.Environment.get(i);qx.core.Environment.get(c);qx.core.Environment.get(h);qx.core.Environment.get(b);qxWeb.$attachAll(this,d);}
});}
)();
(function(){var a="qx.module.Polyfill";qx.Bootstrap.define(a,{});}
)();
(function(){var a="mshtml",b="engine.name",c="complete",d="Array",f="pointerout",g="pointerover",h="string",n="load",o="left",p="qx.module.Event",q="undefined",r="DOMContentLoaded",s="browser.documentmode",t="*";qx.Bootstrap.define(p,{statics:{__nF:{},__nG:{on:{},off:{}},__nH:false,ready:function(u){if(document.readyState===c){window.setTimeout(u,1);return;}
;var v=function(){qx.module.Event.__nH=true;u();}
;qxWeb(window).on(n,v);var w=function(){qxWeb(window).off(n,v);u();}
;if(qxWeb.env.get(b)!==a||qxWeb.env.get(s)>8){qx.bom.Event.addNativeListener(document,r,w);}
else {var z=function(){if(qx.module.Event.__nH){return;}
;try{document.documentElement.doScroll(o);if(document.body){w();}
;}
catch(A){window.setTimeout(z,100);}
;}
;z();}
;}
,$registerEventNormalization:function(E,B){if(!qx.lang.Type.isArray(E)){E=[E];}
;var C=qx.module.Event.__nF;for(var i=0,l=E.length;i<l;i++ ){var D=E[i];if(qx.lang.Type.isFunction(B)){if(!C[D]){C[D]=[];}
;C[D].push(B);}
;}
;}
,$unregisterEventNormalization:function(I,F){if(!qx.lang.Type.isArray(I)){I=[I];}
;var G=qx.module.Event.__nF;for(var i=0,l=I.length;i<l;i++ ){var H=I[i];if(G[H]){qx.lang.Array.remove(G[H],F);}
;}
;}
,$getEventNormalizationRegistry:function(){return qx.module.Event.__nF;}
,$registerEventHook:function(O,L,K){if(!qx.lang.Type.isArray(O)){O=[O];}
;var M=qx.module.Event.__nG.on;for(var i=0,l=O.length;i<l;i++ ){var N=O[i];if(qx.lang.Type.isFunction(L)){if(!M[N]){M[N]=[];}
;M[N].push(L);}
;}
;if(!K){return;}
;var J=qx.module.Event.__nG.off;for(var i=0,l=O.length;i<l;i++ ){var N=O[i];if(qx.lang.Type.isFunction(K)){if(!J[N]){J[N]=[];}
;J[N].push(K);}
;}
;}
,$unregisterEventHook:function(U,R,Q){if(!qx.lang.Type.isArray(U)){U=[U];}
;var S=qx.module.Event.__nG.on;for(var i=0,l=U.length;i<l;i++ ){var T=U[i];if(S[T]){qx.lang.Array.remove(S[T],R);}
;}
;if(!Q){return;}
;var P=qx.module.Event.__nG.off;for(var i=0,l=U.length;i<l;i++ ){var T=U[i];if(P[T]){qx.lang.Array.remove(P[T],Q);}
;}
;}
,$getEventHookRegistry:function(){return qx.module.Event.__nG;}
},members:{on:function(bd,bb,bc,W){for(var i=0;i<this.length;i++ ){var V=this[i];var Y=bc||qxWeb(V);var X=qx.module.Event.__nG.on;var be=X[t]||[];if(X[bd]){be=be.concat(X[bd]);}
;for(var j=0,m=be.length;j<m;j++ ){be[j](V,bd,bb,bc);}
;var ba=function(bf,event){var bh=qx.module.Event.__nF;var bg=bh[t]||[];if(bh[bd]){bg=bg.concat(bh[bd]);}
;for(var x=0,y=bg.length;x<y;x++ ){event=bg[x](event,bf,bd);}
;bb.apply(this,[event]);}
.bind(Y,V);ba.original=bb;qx.bom.Event.addNativeListener(V,bd,ba,W);if(!V.$$emitter){V.$$emitter=new qx.event.Emitter();}
;V.$$lastlistenerId=V.$$emitter.on(bd,ba,Y);V.$$emitter.getEntryById(V.$$lastlistenerId).useCapture=!!W;if(!V.__nI){V.__nI={};}
;if(!V.__nI[bd]){V.__nI[bd]={};}
;V.__nI[bd][V.$$lastlistenerId]=ba;if(!bc){if(!V.__nJ){V.__nJ={};}
;V.__nJ[V.$$lastlistenerId]=Y;}
;}
;return this;}
,off:function(bt,bo,bq,bj){var br=(bo===null&&bq===null);for(var j=0;j<this.length;j++ ){var bi=this[j];if(!bi.__nI){continue;}
;var bv=[];if(bt!==null){bv.push(bt);}
else {for(var bm in bi.__nI){bv.push(bm);}
;}
;for(var i=0,l=bv.length;i<l;i++ ){for(var bu in bi.__nI[bv[i]]){var bs=bi.__nI[bv[i]][bu];if(br||bs==bo||bs.original==bo){var bl=typeof bi.__nJ!==q&&bi.__nJ[bu];var bw;if(!bq&&bl){bw=bi.__nJ[bu];}
;var bp=bi.$$emitter.off(bv[i],bs,bw||bq);if(br||bs.original==bo){qx.bom.Event.removeNativeListener(bi,bv[i],bs,bj);}
;if(bp!==null){delete bi.__nI[bv[i]][bu];}
;if(bl){delete bi.__nJ[bu];}
;}
;}
;var bk=qx.module.Event.__nG.off;var bn=bk[t]||[];if(bk[bt]){bn=bn.concat(bk[bt]);}
;for(var k=0,m=bn.length;k<m;k++ ){bn[k](bi,bt,bo,bq);}
;}
;}
;return this;}
,allOff:function(bx){return this.off(bx||null,null,null);}
,offById:function(bz){var by=this[0].$$emitter.getEntryById(bz);return this.off(by.name,by.listener.original,by.ctx,by.useCapture);}
,emit:function(bA,bB){for(var j=0;j<this.length;j++ ){var bC=this[j];if(bC.$$emitter){bC.$$emitter.emit(bA,bB);}
;}
;return this;}
,once:function(bE,bD,bG){var self=this;var bF=function(bH){self.off(bE,bF,bG);bD.call(this,bH);}
;this.on(bE,bF,bG);return this;}
,hasListener:function(bL,bJ,bK){if(!this[0]||!this[0].$$emitter||!this[0].$$emitter.getListeners()[bL]){return false;}
;if(bJ){var bM=this[0].$$emitter.getListeners()[bL];for(var i=0;i<bM.length;i++ ){var bI=false;if(bM[i].listener==bJ){bI=true;}
;if(bM[i].listener.original&&bM[i].listener.original==bJ){bI=true;}
;if(bI){if(bK!==undefined){if(bM[i].ctx===bK){return true;}
;}
else {return true;}
;}
;}
;return false;}
;return this[0].$$emitter.getListeners()[bL].length>0;}
,copyEventsTo:function(bT){var bR=this.concat();var bS=bT.concat();for(var i=bR.length-1;i>=0;i-- ){var bO=bR[i].getElementsByTagName(t);for(var j=0;j<bO.length;j++ ){bR.push(bO[j]);}
;}
;for(var i=bS.length-1;i>=0;i-- ){var bO=bS[i].getElementsByTagName(t);for(var j=0;j<bO.length;j++ ){bS.push(bO[j]);}
;}
;bS.forEach(function(bU){bU.$$emitter=null;}
);for(var i=0;i<bR.length;i++ ){var bN=bR[i];if(!bN.$$emitter){continue;}
;var bP=bN.$$emitter.getListeners();for(var name in bP){for(var j=bP[name].length-1;j>=0;j-- ){var bQ=bP[name][j].listener;if(bQ.original){bQ=bQ.original;}
;qxWeb(bS[i]).on(name,bQ,bP[name][j].ctx);}
;}
;}
;}
,hover:function(bV,bW){this.on(g,bV,this);if(qx.lang.Type.isFunction(bW)){this.on(f,bW,this);}
;return this;}
,onMatchTarget:function(bY,ca,cc,cb){cb=cb!==undefined?cb:this;var bX=function(e){var cd=qxWeb(e.getTarget());if(cd.is(ca)){cc.call(cb,cd,qxWeb.object.clone(e));}
else {var ce=typeof ca==h?this.find(ca):qxWeb(ca);for(var i=0,l=ce.length;i<l;i++ ){if(cd.isChildOf(qxWeb(ce[i]))){cc.call(cb,cd,qxWeb.object.clone(e));break;}
;}
;}
;}
;this.forEach(function(cf){var cg={type:bY,listener:bX,callback:cc,context:cb};if(!cf.$$matchTargetInfo){cf.$$matchTargetInfo=[];}
;cf.$$matchTargetInfo.push(cg);}
);this.on(bY,bX);return this;}
,offMatchTarget:function(ch,ci,ck,cj){cj=cj!==undefined?cj:this;this.forEach(function(cl){if(cl.$$matchTargetInfo&&qxWeb.type.get(cl.$$matchTargetInfo)==d){var cm=cl.$$matchTargetInfo;for(var i=cm.length-1;i>=0;i-- ){var cn=cm[i];if(cn.type==ch&&cn.callback==ck&&cn.context==cj){this.off(ch,cn.listener);cm.splice(i,1);}
;}
;if(cm.length===0){cl.$$matchTargetInfo=null;}
;}
;}
,this);return this;}
},defer:function(co){qxWeb.$attachAll(this);qxWeb.$attachStatic({"$registerEventNormalization":co.$registerEventNormalization,"$unregisterEventNormalization":co.$unregisterEventNormalization,"$getEventNormalizationRegistry":co.$getEventNormalizationRegistry,"$registerEventHook":co.$registerEventHook,"$unregisterEventHook":co.$unregisterEventHook,"$getEventHookRegistry":co.$getEventHookRegistry});}
});}
)();
(function(){var a="qx.module.event.PointerHandler",b="pointerup",c="event.dispatchevent",d="gesturemove",e="pointerover",f="gesturebegin",g="pointerdown",h="pointermove",i="gesturefinish",j="qx.event.handler.Pointer",k="gesturecancel",l="pointercancel",m="pointerout";qx.Bootstrap.define(a,{statics:{TYPES:[h,e,m,g,b,l,f,d,i,k],register:function(o,n){if(!o.$$pointerHandler){if(!qx.core.Environment.get(c)){if(!o.$$emitter){o.$$emitter=new qx.event.Emitter();}
;}
;o.$$pointerHandler=new qx.event.handler.PointerCore(o,o.$$emitter);}
;}
,unregister:function(r){if(r.$$pointerHandler){if(r.$$pointerHandler.classname===j){return;}
;var p=r.$$emitter.getListeners();for(var q in p){if(qx.module.event.PointerHandler.TYPES.indexOf(q)!==-1){if(p[q].length>0){return;}
;}
;}
;r.$$pointerHandler.dispose();r.$$pointerHandler=undefined;}
;}
},defer:function(s){qxWeb.$registerEventHook(s.TYPES,s.register,s.unregister);}
});}
)();
(function(){var a="qx.event.Emitter",b="*";qx.Bootstrap.define(a,{extend:Object,statics:{__gM:[]},members:{__nI:null,__nK:null,on:function(name,c,d){var e=qx.event.Emitter.__gM.length;this.__nL(name).push({listener:c,ctx:d,id:e,name:name});qx.event.Emitter.__gM.push({name:name,listener:c,ctx:d});return e;}
,once:function(name,f,g){var h=qx.event.Emitter.__gM.length;this.__nL(name).push({listener:f,ctx:g,once:true,id:h});qx.event.Emitter.__gM.push({name:name,listener:f,ctx:g});return h;}
,off:function(name,m,k){var l=this.__nL(name);for(var i=l.length-1;i>=0;i-- ){var n=l[i];if(n.listener==m&&n.ctx==k){l.splice(i,1);qx.event.Emitter.__gM[n.id]=null;return n.id;}
;}
;return null;}
,offById:function(p){var o=qx.event.Emitter.__gM[p];if(o){this.off(o.name,o.listener,o.ctx);}
;return null;}
,addListener:function(name,q,r){return this.on(name,q,r);}
,addListenerOnce:function(name,s,t){return this.once(name,s,t);}
,removeListener:function(name,u,v){this.off(name,u,v);}
,removeListenerById:function(w){this.offById(w);}
,emit:function(name,A){var x=this.__nL(name).concat();var y=[];for(var i=0;i<x.length;i++ ){var z=x[i];z.listener.call(z.ctx,A);if(z.once){y.push(z);}
;}
;y.forEach(function(B){var C=this.__nL(name);var D=C.indexOf(B);C.splice(D,1);}
.bind(this));x=this.__nL(b);for(var i=x.length-1;i>=0;i-- ){var z=x[i];z.listener.call(z.ctx,A);}
;}
,getListeners:function(){return this.__nI;}
,getEntryById:function(F){for(var name in this.__nI){var E=this.__nI[name];for(var i=0,j=E.length;i<j;i++ ){if(E[i].id===F){return E[i];}
;}
;}
;}
,__nL:function(name){if(this.__nI==null){this.__nI={};}
;if(this.__nI[name]==null){this.__nI[name]=[];}
;return this.__nI[name];}
}});}
)();
(function(){var a="touchmove",b="os.name",c="mousedown",d="event.dispatchevent",e="MSPointerDown",f="gesturemove",g="pointerover",h="touch",k="mouseout",m="ms",n="Processed",o="pointercancel",p="pointerleave",q="touchstart",r="pointerenter",s="mouse",t="event.mspointer",u="mousemove",v="MSPointerCancel",w="gesturefinish",z="browser.documentmode",A="pointerup",B="touchend",C="osx",D="mouseover",E="$$qx",F="pointerdown",G="MSPointerUp",H="pointermove",I="MSPointerOver",J="gecko",K="mshtml",L="engine.name",M="mouseup",N="touchcancel",O="contextmenu",P="gesturecancel",Q="MSPointerMove",R="MSPointerOut",S="gesturebegin",T="qx.event.handler.PointerCore",U=".",V="device.touch",W="pointerout";qx.Bootstrap.define(T,{extend:Object,statics:{MOUSE_TO_POINTER_MAPPING:{mousedown:F,mouseup:A,mousemove:H,mouseout:W,mouseover:g},TOUCH_TO_POINTER_MAPPING:{touchstart:F,touchend:A,touchmove:H,touchcancel:o},MSPOINTER_TO_POINTER_MAPPING:{MSPointerDown:F,MSPointerMove:H,MSPointerUp:A,MSPointerCancel:o,MSPointerLeave:p,MSPointerEnter:r,MSPointerOver:g,MSPointerOut:W},POINTER_TO_GESTURE_MAPPING:{pointerdown:S,pointerup:w,pointercancel:P,pointermove:f},LEFT_BUTTON:(qx.core.Environment.get(L)==K&&qx.core.Environment.get(z)<=8)?1:0,SIM_MOUSE_DISTANCE:25,SIM_MOUSE_DELAY:2500,__nM:null},construct:function(ba,bb){this.__nN=ba;this.__lw=bb;this.__nO=[];this.__nP=[];this.__nQ=[];this._processedFlag=E+this.classname.substr(this.classname.lastIndexOf(U)+1)+n;var Y=qx.core.Environment.get(L);var X=parseInt(qx.core.Environment.get(z),10);if(Y==K&&X==10){this.__nO=[e,Q,G,v,I,R,F,H,A,o,g,W];this._initPointerObserver();}
else {if(qx.core.Environment.get(t)){this.__nR=true;}
;this.__nO=[F,H,A,o,g,W];this._initPointerObserver();}
;if(!qx.core.Environment.get(t)){if(qx.core.Environment.get(V)){this.__nO=[q,B,a,N];this._initObserver(this._onTouchEvent);}
;this.__nO=[c,M,u,D,k,O];this._initObserver(this._onMouseEvent);}
;}
,members:{__nN:null,__lw:null,__nO:null,__nR:false,__nS:null,__nT:0,__nP:null,__nU:null,__nQ:null,_processedFlag:null,_initPointerObserver:function(){this._initObserver(this._onPointerEvent);}
,_initObserver:function(bc,bd){this.__nS=qx.lang.Function.listener(bc,this);this.__nO.forEach(function(be){if(bd&&qx.dom.Node.isDocument(this.__nN)){if(!this.__nN.$$emitter){this.__nN.$$emitter=new qx.event.Emitter();}
;this.__nN.$$emitter.on(be,this.__nS);}
else {qx.bom.Event.addNativeListener(this.__nN,be,this.__nS);}
;}
.bind(this));}
,_onPointerEvent:function(bh){if(!qx.core.Environment.get(t)||(qx.core.Environment.get(z)===10&&bh.type.toLowerCase().indexOf(m)==-1)){return;}
;if(!this.__nR){bh.stopPropagation();}
;var bf=qx.event.handler.PointerCore.MSPOINTER_TO_POINTER_MAPPING[bh.type]||bh.type;var bi=qx.bom.Event.getTarget(bh);var bg=new qx.event.type.dom.Pointer(bf,bh);this._fireEvent(bg,bf,bi);}
,_onTouchEvent:function(bl){if(bl[this._processedFlag]){return;}
;bl[this._processedFlag]=true;var bm=qx.event.handler.PointerCore.TOUCH_TO_POINTER_MAPPING[bl.type];var bo=bl.changedTouches;this._determineActiveTouches(bl.type,bo);if(bl.touches.length<this.__nQ.length){for(var i=this.__nQ.length-1;i>=0;i-- ){var bq=new qx.event.type.dom.Pointer(o,bl,{identifier:this.__nQ[i].identifier,target:bl.target,pointerType:h,pointerId:this.__nQ[i].identifier+2});this._fireEvent(bq,o,bl.target);}
;this.__nU=null;this.__nQ=[];return;}
;if(bl.type==q&&this.__nU===null){this.__nU=bo[0].identifier;}
;for(var i=0,l=bo.length;i<l;i++ ){var bp=bo[i];var bn=bl.view.document.elementFromPoint(bp.clientX,bp.clientY)||bl.target;var bk={clientX:bp.clientX,clientY:bp.clientY,pageX:bp.pageX,pageY:bp.pageY,identifier:bp.identifier,screenX:bp.screenX,screenY:bp.screenY,target:bn,pointerType:h,pointerId:bp.identifier+2};if(bl.type==q){var bj=new qx.event.type.dom.Pointer(g,bl,bk);this._fireEvent(bj,g,bk.target);}
;if(bp.identifier==this.__nU){bk.isPrimary=true;bk.button=0;bk.buttons=1;qx.event.handler.PointerCore.__nM={"x":bp.clientX,"y":bp.clientY,"time":new Date().getTime()};}
;var br=new qx.event.type.dom.Pointer(bm,bl,bk);this._fireEvent(br,bm,bk.target);if(bl.type==B||bl.type==N){var bs=new qx.event.type.dom.Pointer(W,bl,bk);this._fireEvent(bs,W,bl.target);if(this.__nU==bp.identifier){this.__nU=null;}
;}
;}
;}
,_onMouseEvent:function(bt){if(bt[this._processedFlag]){return;}
;bt[this._processedFlag]=true;if(this._isSimulatedMouseEvent(bt.clientX,bt.clientY)){return;}
;if(bt.type==c){this.__nP[bt.which]=1;}
else if(bt.type==M){if(qx.core.Environment.get(b)==C&&qx.core.Environment.get(L)==J){if(this.__nP[bt.which]!=1&&bt.ctrlKey){this.__nP[1]=0;}
;}
;this.__nP[bt.which]=0;}
;var bv=qx.event.handler.PointerCore.MOUSE_TO_POINTER_MAPPING[bt.type];var bu=qx.bom.Event.getTarget(bt);var bw=qx.lang.Array.sum(this.__nP);var bz={pointerType:s,pointerId:1};if(this.__nT!=bw&&bw!==0&&this.__nT!==0){var bx=new qx.event.type.dom.Pointer(H,bt,bz);this._fireEvent(bx,H,bu);}
;this.__nT=bw;if(bt.type==c&&bw>1){return;}
;if(bt.type==M&&bw>0){return;}
;if(bt.type==O){this.__nP[bt.which]=0;return;}
;var by=new qx.event.type.dom.Pointer(bv,bt,bz);this._fireEvent(by,bv,bu);}
,_determineActiveTouches:function(bD,bC){if(bD==q){for(var i=0;i<bC.length;i++ ){this.__nQ.push(bC[i]);}
;}
else if(bD==B||bD==N){var bA=[];for(var i=0;i<this.__nQ.length;i++ ){var bB=true;for(var j=0;j<bC.length;j++ ){if(this.__nQ[i].identifier==bC[j].identifier){bB=false;break;}
;}
;if(bB){bA.push(this.__nQ[i]);}
;}
;this.__nQ=bA;}
;}
,_isSimulatedMouseEvent:function(x,y){var bF=qx.event.handler.PointerCore.__nM;if(bF){var bG=new Date().getTime()-bF.time;var bE=qx.event.handler.PointerCore.SIM_MOUSE_DISTANCE;var bI=Math.abs(x-qx.event.handler.PointerCore.__nM.x);var bH=Math.abs(y-qx.event.handler.PointerCore.__nM.y);if(bG<qx.event.handler.PointerCore.SIM_MOUSE_DELAY){if(bI<bE||bH<bE){return true;}
;}
;}
;return false;}
,_stopObserver:function(){for(var i=0;i<this.__nO.length;i++ ){qx.bom.Event.removeNativeListener(this.__nN,this.__nO[i],this.__nS);}
;}
,_fireEvent:function(bK,bJ,bL){bL=bL||bK.target;bJ=bJ||bK.type;var bM;if((bK.pointerType!==s||bK.button<=qx.event.handler.PointerCore.LEFT_BUTTON)&&(bJ==F||bJ==A||bJ==H)){bM=new qx.event.type.dom.Pointer(qx.event.handler.PointerCore.POINTER_TO_GESTURE_MAPPING[bJ],bK);qx.event.type.dom.Pointer.normalize(bM);try{bM.srcElement=bL;}
catch(bN){}
;}
;if(qx.core.Environment.get(d)){if(!this.__nR){bL.dispatchEvent(bK);}
;if(bM){bL.dispatchEvent(bM);}
;}
else {try{bK.srcElement=bL;}
catch(bO){}
;while(bL){if(bL.$$emitter){bK.currentTarget=bL;if(!bK._stopped){bL.$$emitter.emit(bJ,bK);}
;if(bM&&!bM._stopped){bM.currentTarget=bL;bL.$$emitter.emit(bM.type,bM);}
;}
;bL=bL.parentNode;}
;}
;}
,dispose:function(){this._stopObserver();this.__nN=this.__lw=null;}
}});}
)();
(function(){var a="qx.event.type.dom.Custom",b="UIEvents",c="function",d="event.customevent",e="object";qx.Bootstrap.define(a,{extend:Object,statics:{PROPERTIES:{bubbles:false,cancelable:true}},construct:function(f,g,h){this._type=f;this._event=this._createEvent();this._initEvent(g,h);this._event._original=g;this._event.preventDefault=function(){if(this._original.preventDefault){this._original.preventDefault();}
else {try{this._original.returnValue=false;}
catch(i){}
;}
;}
;if(this._event.stopPropagation){this._event._nativeStopPropagation=this._event.stopPropagation;}
;this._event.stopPropagation=function(){this._stopped=true;if(this._nativeStopPropagation){this._original.stopPropagation();this._nativeStopPropagation();}
else {this._original.cancelBubble=true;}
;}
;return this._event;}
,members:{_type:null,_event:null,_createEvent:function(){var j;if(qx.core.Environment.get(d)){j=new window.CustomEvent(this._type);}
else if(typeof document.createEvent==c){j=document.createEvent(b);}
else if(typeof document.createEventObject==e){j={};j.type=this._type;}
;return j;}
,_initEvent:function(k,m){m=m||{};var l=qx.lang.Object.clone(qx.event.type.dom.Custom.PROPERTIES);for(var n in m){l[n]=m[n];}
;if(this._event.initEvent){this._event.initEvent(this._type,l.bubbles,l.cancelable);}
;for(var n in l){try{this._event[n]=l[n];}
catch(o){}
;}
;}
}});}
)();
(function(){var a="bubbles",b="event.mouseevent",c="getScreenLeft",d="getPointerType",e="touch",f="ctrlKey",g="altKey",h="gecko",j="view",k="os.name",m="button",n="string",o="relatedTarget",p="buttons",q="event.mousecreateevent",r="mouse",s="clientX",t="qx.event.type.dom.Pointer",u="ios",v="pageY",w="cancelable",x="screenX",y="shiftKey",z="",A="number",B="detail",C="toElement",D="fromElement",E="getViewportLeft",F="function",G="clientY",H="os.version",I="engine.name",J="undefined",K="getViewportTop",L="screenY",M="getScreenTop",N="pen",O="metaKey",P="pageX",Q="object",R="getDocumentTop",S="which",T="getDocumentLeft";qx.Bootstrap.define(t,{extend:qx.event.type.dom.Custom,statics:{MOUSE_PROPERTIES:[a,w,j,B,x,L,s,G,P,v,f,g,y,O,m,S,o,D,C],POINTER_PROPERTIES:{pointerId:1,width:0,height:0,pressure:0.5,tiltX:0,tiltY:0,pointerType:z,isPrimary:false},READONLY_PROPERTIES:[],BIND_METHODS:[d,E,K,T,R,c,M],getPointerType:function(){if(typeof this.pointerType==n){return this.pointerType;}
;if(typeof this.pointerType==A){if(this.pointerType==this.MSPOINTER_TYPE_MOUSE){return r;}
;if(this.pointerType==this.MSPOINTER_TYPE_PEN){return N;}
;if(this.pointerType==this.MSPOINTER_TYPE_TOUCH){return e;}
;}
;return z;}
,getViewportLeft:function(){return this.clientX;}
,getViewportTop:function(){return this.clientY;}
,getDocumentLeft:function(){if(this.pageX!==undefined){return this.pageX;}
else {var U=qx.dom.Node.getWindow(this.srcElement);return this.clientX+qx.bom.Viewport.getScrollLeft(U);}
;}
,getDocumentTop:function(){if(this.pageY!==undefined){return this.pageY;}
else {var V=qx.dom.Node.getWindow(this.srcElement);return this.clientY+qx.bom.Viewport.getScrollTop(V);}
;}
,getScreenLeft:function(){return this.screenX;}
,getScreenTop:function(){return this.screenY;}
,normalize:function(event){var W=qx.event.type.dom.Pointer.BIND_METHODS;for(var i=0,l=W.length;i<l;i++ ){if(typeof event[W[i]]!=F){event[W[i]]=qx.event.type.dom.Pointer[W[i]].bind(event);}
;}
;}
},construct:function(X,Y,ba){return qx.event.type.dom.Custom.call(this,X,Y,ba);}
,members:{_createEvent:function(){var bb;if(qx.core.Environment.get(b)){bb=new window.MouseEvent(this._type);}
else if(typeof document.createEvent==F){bb=document.createEvent(qx.core.Environment.get(q));}
else if(typeof document.createEventObject==Q){bb={};bb.type=this._type;}
;return bb;}
,_initEvent:function(bc,bd){bd=bd||{};var bg=this._event;var bh={};qx.event.type.dom.Pointer.normalize(bc);Object.keys(qx.event.type.dom.Pointer.POINTER_PROPERTIES).concat(qx.event.type.dom.Pointer.MOUSE_PROPERTIES).forEach(function(bi){if(typeof bd[bi]!==J){bh[bi]=bd[bi];}
else if(typeof bc[bi]!==J){bh[bi]=bc[bi];}
else if(typeof qx.event.type.dom.Pointer.POINTER_PROPERTIES[bi]!==J){bh[bi]=qx.event.type.dom.Pointer.POINTER_PROPERTIES[bi];}
;}
);var bf;switch(bc.which){case 1:bf=1;break;case 2:bf=4;break;case 3:bf=2;break;default:bf=0;};if(bf!==undefined){bh.buttons=bf;bh.pressure=bf?0.5:0;}
;if(bg.initMouseEvent){bg.initMouseEvent(this._type,bh.bubbles,bh.cancelable,bh.view,bh.detail,bh.screenX,bh.screenY,bh.clientX,bh.clientY,bh.ctrlKey,bh.altKey,bh.shiftKey,bh.metaKey,bh.button,bh.relatedTarget);}
else if(bg.initUIEvent){bg.initUIEvent(this._type,bh.bubbles,bh.cancelable,bh.view,bh.detail);}
;for(var be in bh){if(bg[be]!==bh[be]&&qx.event.type.dom.Pointer.READONLY_PROPERTIES.indexOf(be)===-1){try{bg[be]=bh[be];}
catch(bj){}
;}
;}
;switch(bg.pointerType){case bc.MSPOINTER_TYPE_MOUSE:bg.pointerType=r;break;case bc.MSPOINTER_TYPE_PEN:bg.pointerType=N;break;case bc.MSPOINTER_TYPE_TOUCH:bg.pointerType=e;break;};if(bg.pointerType==r){bg.isPrimary=true;}
;}
},defer:function(bk){if(qx.core.Environment.get(I)==h){bk.READONLY_PROPERTIES.push(p);}
else if(qx.core.Environment.get(k)==u&&parseFloat(qx.core.Environment.get(H))>=8){bk.READONLY_PROPERTIES=bk.READONLY_PROPERTIES.concat(bk.MOUSE_PROPERTIES);}
;}
});}
)();
(function(){var a="start",b="animationEnd",c="",d="none",e="browser.name",f="browser.version",g="qx.module.Animation",h="animationIteration",j="end",k="animationStart",l="ease-in",m="iteration",n="ease-out",o="ie",p="display";qx.Bootstrap.define(g,{events:{"animationStart":undefined,"animationIteration":undefined,"animationEnd":undefined},statics:{_fadeOut:{duration:700,timing:n,keep:100,keyFrames:{'0':{opacity:1},'100':{opacity:0,display:d}}},_fadeIn:{duration:700,timing:l,keep:100,keyFrames:{'0':{opacity:0},'100':{opacity:1}}},_animate:function(s,q,r){this._forEachElement(function(t,i){if(t.$$animation){t.$$animation.stop();}
;var u;if(r){u=qx.bom.element.Animation.animateReverse(t,s,q);}
else {u=qx.bom.element.Animation.animate(t,s,q);}
;var self=this;if(i==0){u.on(a,function(){self.emit(k);}
,u);u.on(m,function(){self.emit(h);}
,u);}
;u.on(j,function(){for(var i=0;i<self.length;i++ ){if(self[i].$$animation){return;}
;}
;self.emit(b);}
,t);}
);}
},members:{getAnimationHandles:function(){var v=[];for(var i=0;i<this.length;i++ ){v[i]=this[i].$$animation;}
;return v;}
,animate:function(x,w){qx.module.Animation._animate.bind(this)(x,w,false);return this;}
,animateReverse:function(z,y){qx.module.Animation._animate.bind(this)(z,y,true);return this;}
,play:function(){for(var i=0;i<this.length;i++ ){var A=this[i].$$animation;if(A){A.play();}
;}
;return this;}
,pause:function(){for(var i=0;i<this.length;i++ ){var B=this[i].$$animation;if(B){B.pause();}
;}
;return this;}
,stop:function(){for(var i=0;i<this.length;i++ ){var C=this[i].$$animation;if(C){C.stop();}
;}
;return this;}
,isPlaying:function(){for(var i=0;i<this.length;i++ ){var D=this[i].$$animation;if(D&&D.isPlaying()){return true;}
;}
;return false;}
,isEnded:function(){for(var i=0;i<this.length;i++ ){var E=this[i].$$animation;if(E&&!E.isEnded()){return false;}
;}
;return true;}
,fadeIn:function(F){this.setStyle(p,c);return this.animate(qx.module.Animation._fadeIn,F);}
,fadeOut:function(G){return this.animate(qx.module.Animation._fadeOut,G);}
},defer:function(H){qxWeb.$attachAll(this);if(qxWeb.env.get(e)===o&&qxWeb.env.get(f)<=9){H._fadeIn.keyFrames[100].opacity=0.99;}
;}
});}
)();
(function(){var a="css.animation",b="translate",c="rotate",d="skew",e="scale",f="qx.bom.element.Animation";qx.Bootstrap.define(f,{statics:{animate:function(h,k,g){var j=qx.bom.element.Animation.__pT(h,k.keyFrames);if(qx.core.Environment.get(a)&&j){return qx.bom.element.AnimationCss.animate(h,k,g);}
else {return qx.bom.element.AnimationJs.animate(h,k,g);}
;}
,animateReverse:function(m,o,l){var n=qx.bom.element.Animation.__pT(m,o.keyFrames);if(qx.core.Environment.get(a)&&n){return qx.bom.element.AnimationCss.animateReverse(m,o,l);}
else {return qx.bom.element.AnimationJs.animateReverse(m,o,l);}
;}
,__pT:function(p,t){var r=[];for(var v in t){var s=t[v];for(var u in s){if(r.indexOf(u)==-1){r.push(u);}
;}
;}
;var q=[e,c,d,b];for(var i=0;i<r.length;i++ ){var u=qx.lang.String.camelCase(r[i]);if(!(u in p.style)){if(q.indexOf(r[i])!=-1){continue;}
;if(qx.bom.Style.getPropertyName(u)){continue;}
;return false;}
;}
;return true;}
}});}
)();
(function(){var a="oAnimationStart",b="animationend",c="MSAnimationStart",d="oRequestAnimationFrame",f="AnimationFillMode",g="webkitAnimationStart",h="MSAnimationEnd",j="requestAnimationFrame",k="mozRequestAnimationFrame",l="webkitanimationend",m="css.animation.requestframe",n="AnimationPlayState",o="",p="MSAnimationIteration",q="animation",r="oAnimationEnd",s="@",t="animationiteration",u="webkitAnimationEnd",v="webkitRequestAnimationFrame",w=" name",x="qx.bom.client.CssAnimation",y="css.animation",z="oAnimationIteration",A="webkitanimationiteration",B="-keyframes",C="msRequestAnimationFrame",D="@keyframes",E="webkitAnimationIteration",F="animationstart",G="webkitanimationstart";qx.Bootstrap.define(x,{statics:{getSupport:function(){var name=qx.bom.client.CssAnimation.getName();if(name!=null){return {"name":name,"play-state":qx.bom.client.CssAnimation.getPlayState(),"start-event":qx.bom.client.CssAnimation.getAnimationStart(),"iteration-event":qx.bom.client.CssAnimation.getAnimationIteration(),"end-event":qx.bom.client.CssAnimation.getAnimationEnd(),"fill-mode":qx.bom.client.CssAnimation.getFillMode(),"keyframes":qx.bom.client.CssAnimation.getKeyFrames()};}
;return null;}
,getFillMode:function(){return qx.bom.Style.getPropertyName(f);}
,getPlayState:function(){return qx.bom.Style.getPropertyName(n);}
,getName:function(){return qx.bom.Style.getPropertyName(q);}
,getAnimationStart:function(){if(qx.bom.Event.supportsEvent(window,G)){return g;}
;var H={"msAnimation":c,"WebkitAnimation":g,"MozAnimation":F,"OAnimation":a,"animation":F};return H[this.getName()];}
,getAnimationIteration:function(){if(qx.bom.Event.supportsEvent(window,A)){return E;}
;var I={"msAnimation":p,"WebkitAnimation":E,"MozAnimation":t,"OAnimation":z,"animation":t};return I[this.getName()];}
,getAnimationEnd:function(){if(qx.bom.Event.supportsEvent(window,l)){return u;}
;var J={"msAnimation":h,"WebkitAnimation":u,"MozAnimation":b,"OAnimation":r,"animation":b};return J[this.getName()];}
,getKeyFrames:function(){var K=qx.bom.Style.VENDOR_PREFIXES;var N=[];for(var i=0;i<K.length;i++ ){var M=s+qx.bom.Style.getCssName(K[i])+B;N.push(M);}
;N.unshift(D);var L=qx.bom.Stylesheet.createElement();for(var i=0;i<N.length;i++ ){try{qx.bom.Stylesheet.addRule(L,N[i]+w,o);return N[i];}
catch(e){}
;}
;return null;}
,getRequestAnimationFrame:function(){var O=[j,C,v,k,d];for(var i=0;i<O.length;i++ ){if(window[O[i]]!=undefined){return O[i];}
;}
;return null;}
},defer:function(P){qx.core.Environment.add(y,P.getSupport);qx.core.Environment.add(m,P.getRequestAnimationFrame);}
});}
)();
(function(){var a="fill-mode",b="No 'keyFrames' given > 0",c="os.name",d="repeat",f="os.version",g="timing",h="start",i="end",j="Anni",k="start-event",l="keyFrames",m="Keyframe position needs to be between 0 and 100",n="alternate",o="qx.debug",p="visibilitychange",q="keep",r="duration",s=":",t="ios",u="delay",v="} ",w="name",x="iteration-event",y="",z="origin",A="Unknown key '",B="forwards",C="' in the animation description.",D="Some browsers will not animate elements with display==none",E="iteration",F="end-event",G="css.animation",H="ms ",I="% {",J="none",K=" ",L="linear",M=";",N="qx.bom.element.AnimationCss",O="keyframes",P="display";qx.Bootstrap.define(N,{statics:{__pU:null,__pV:j,__gJ:0,__pW:{},__pX:{"scale":true,"rotate":true,"skew":true,"translate":true},__pY:qx.core.Environment.get(G),animateReverse:function(R,S,Q){return this._animate(R,S,Q,true);}
,animate:function(U,V,T){return this._animate(U,V,T,false);}
,_animate:function(W,be,bd,Y){this.__qe(be);if(qx.core.Environment.get(o)){this.__qf(be);}
;var bb=be.keep;if(bb!=null&&(Y||(be.alternate&&be.repeat%2==0))){bb=100-bb;}
;if(!this.__pU){this.__pU=qx.bom.Stylesheet.createElement();}
;var ba=be.keyFrames;if(bd==undefined){bd=be.duration;}
;if(this.__pY!=null){var name=this.__qg(ba,Y);var X=name+K+bd+H+be.timing+K+(be.delay?be.delay+H:y)+be.repeat+K+(be.alternate?n:y);qx.bom.Event.addNativeListener(W,this.__pY[k],this.__qa);qx.bom.Event.addNativeListener(W,this.__pY[x],this.__qb);qx.bom.Event.addNativeListener(W,this.__pY[F],this.__qc);if(qx.core.Environment.get(o)){if(qx.bom.element.Style.get(W,P)==J){qx.log.Logger.warn(D,W);}
;}
;W.style[qx.lang.String.camelCase(this.__pY[w])]=X;if(bb&&bb==100&&this.__pY[a]){W.style[this.__pY[a]]=B;}
;}
;var bc=new qx.bom.element.AnimationHandle();bc.desc=be;bc.el=W;bc.keep=bb;W.$$animation=bc;if(be.origin!=null){qx.bom.element.Transform.setOrigin(W,be.origin);}
;if(this.__pY==null){window.setTimeout(function(){qx.bom.element.AnimationCss.__qc({target:W});}
,0);}
;return bc;}
,__qa:function(e){if(e.target.$$animation){e.target.$$animation.emit(h,e.target);}
;}
,__qb:function(e){if(e.target!=null&&e.target.$$animation!=null){e.target.$$animation.emit(E,e.target);}
;}
,__qc:function(e){var bf=e.target;var bg=bf.$$animation;if(!bg){return;}
;var bi=bg.desc;if(qx.bom.element.AnimationCss.__pY!=null){var bh=qx.lang.String.camelCase(qx.bom.element.AnimationCss.__pY[w]);bf.style[bh]=y;qx.bom.Event.removeNativeListener(bf,qx.bom.element.AnimationCss.__pY[w],qx.bom.element.AnimationCss.__qc);}
;if(bi.origin!=null){qx.bom.element.Transform.setOrigin(bf,y);}
;qx.bom.element.AnimationCss.__qd(bf,bi.keyFrames[bg.keep]);bf.$$animation=null;bg.el=null;bg.ended=true;bg.emit(i,bf);}
,__qd:function(bj,bk){var bm;for(var bl in bk){if(bl in qx.bom.element.AnimationCss.__pX){if(!bm){bm={};}
;bm[bl]=bk[bl];}
else {bj.style[qx.lang.String.camelCase(bl)]=bk[bl];}
;}
;if(bm){qx.bom.element.Transform.transform(bj,bm);}
;}
,__qe:function(bn){if(!bn.hasOwnProperty(n)){bn.alternate=false;}
;if(!bn.hasOwnProperty(q)){bn.keep=null;}
;if(!bn.hasOwnProperty(d)){bn.repeat=1;}
;if(!bn.hasOwnProperty(g)){bn.timing=L;}
;if(!bn.hasOwnProperty(z)){bn.origin=null;}
;}
,__qf:qx.core.Environment.select(o,{"true":function(bp){var bo=[z,r,q,l,u,d,g,n];for(var name in bp){if(!(bo.indexOf(name)!=-1)){qx.Bootstrap.warn(A+name+C);}
;}
;if(bp.keyFrames==null){qx.Bootstrap.warn(b);}
else {for(var bq in bp.keyFrames){if(bq<0||bq>100){qx.Bootstrap.warn(m);}
;}
;}
;}
,"default":null}),__qg:function(frames,bs){var bv=y;for(var bz in frames){bv+=(bs?-(bz-100):bz)+I;var bu=frames[bz];var bx;for(var br in bu){if(br in this.__pX){if(!bx){bx={};}
;bx[br]=bu[br];}
else {var by=qx.bom.Style.getPropertyName(br);var bt=(by!==null)?qx.bom.Style.getCssName(by):y;bv+=(bt||br)+s+bu[br]+M;}
;}
;if(bx){bv+=qx.bom.element.Transform.getCss(bx);}
;bv+=v;}
;if(this.__pW[bv]){return this.__pW[bv];}
;var name=this.__pV+this.__gJ++ ;var bw=this.__pY[O]+K+name;qx.bom.Stylesheet.addRule(this.__pU,bw,bv);this.__pW[bv]=name;return name;}
,__qh:function(){this.__gJ=0;if(this.__pU){this.__pU.ownerNode.remove();this.__pU=null;this.__pW={};}
;}
},defer:function(bA){if(qx.core.Environment.get(c)===t&&parseInt(qx.core.Environment.get(f))>=8){document.addEventListener(p,function(){if(!document.hidden){bA.__qh();}
;}
,false);}
;}
});}
)();
(function(){var a="css.animation",b="Element",c="",d="qx.bom.element.AnimationHandle",e="play-state",f="paused",g="running";qx.Bootstrap.define(d,{extend:qx.event.Emitter,construct:function(){var h=qx.core.Environment.get(a);this.__qi=h&&h[e];this.__qj=true;}
,events:{"start":b,"end":b,"iteration":b},members:{__qi:null,__qj:false,__qk:false,isPlaying:function(){return this.__qj;}
,isEnded:function(){return this.__qk;}
,isPaused:function(){return this.el.style[this.__qi]==f;}
,pause:function(){if(this.el){this.el.style[this.__qi]=f;this.el.$$animation.__qj=false;if(this.animationId&&qx.bom.element.AnimationJs){qx.bom.element.AnimationJs.pause(this);}
;}
;}
,play:function(){if(this.el){this.el.style[this.__qi]=g;this.el.$$animation.__qj=true;if(this.i!=undefined&&qx.bom.element.AnimationJs){qx.bom.element.AnimationJs.play(this);}
;}
;}
,stop:function(){if(this.el&&qx.core.Environment.get(a)&&!this.jsAnimation){this.el.style[this.__qi]=c;this.el.style[qx.core.Environment.get(a).name]=c;this.el.$$animation.__qj=false;this.el.$$animation.__qk=true;}
else if(this.jsAnimation){this.stopped=true;qx.bom.element.AnimationJs.stop(this);}
;}
}});}
)();
(function(){var c="cm",d="mm",e="0",f="pt",g="pc",h="",k="%",l="em",m="qx.bom.element.AnimationJs",n="infinite",o="#",p="in",q="px",r="start",s="end",t="ex",u=";",v="undefined",w="iteration",y="string",z=":";qx.Bootstrap.define(m,{statics:{__ql:30,__qm:[k,p,c,d,l,t,f,g,q],__pX:{"scale":true,"rotate":true,"skew":true,"translate":true},animate:function(B,C,A){return this._animate(B,C,A,false);}
,animateReverse:function(E,F,D){return this._animate(E,F,D,true);}
,_animate:function(G,Q,P,I){if(G.$$animation){return G.$$animation;}
;Q=qx.lang.Object.clone(Q,true);if(P==undefined){P=Q.duration;}
;var L=Q.keyFrames;var J=this.__qv(L);var K=this.__qu(P,J);var N=parseInt(P/K,10);this.__qn(L,G);var O=this.__qp(N,K,J,L,P,Q.timing);var H=new qx.bom.element.AnimationHandle();H.jsAnimation=true;if(I){O.reverse();H.reverse=true;}
;H.desc=Q;H.el=G;H.delta=O;H.stepTime=K;H.steps=N;G.$$animation=H;H.i=0;H.initValues={};H.repeatSteps=this.__qs(N,Q.repeat);var M=Q.delay||0;var self=this;H.delayId=window.setTimeout(function(){H.delayId=null;self.play(H);}
,M);return H;}
,__qn:function(V,R){var Y={};for(var U in V){for(var name in V[U]){var S=qx.bom.Style.getPropertyName(name);if(S&&S!=name){var X=qx.bom.Style.getCssName(S);V[U][X]=V[U][name];delete V[U][name];name=X;}
;if(Y[name]==undefined){var W=V[U][name];if(typeof W==y){Y[name]=this.__qq(W);}
else {Y[name]=h;}
;}
;}
;}
;for(var U in V){var T=V[U];for(var name in Y){if(T[name]==undefined){if(name in R.style){if(window.getComputedStyle){T[name]=getComputedStyle(R,null)[name];}
else {T[name]=R.style[name];}
;}
else {T[name]=R[name];}
;if(T[name]===h&&this.__qm.indexOf(Y[name])!=-1){T[name]=e+Y[name];}
;}
;}
;}
;}
,__qo:function(bb){bb=qx.lang.Object.clone(bb);var bc;for(var name in bb){if(name in this.__pX){if(!bc){bc={};}
;bc[name]=bb[name];delete bb[name];}
;}
;if(bc){var ba=qx.bom.element.Transform.getCss(bc).split(z);if(ba.length>1){bb[ba[0]]=ba[1].replace(u,h);}
;}
;return bb;}
,__qp:function(bw,bh,bo,bi,be,bq){var bp=new Array(bw);var bm=1;bp[0]=this.__qo(bi[0]);var bt=bi[0];var bj=bi[bo[bm]];var bf=Math.floor(bo[bm]/(bh/be*100));var bs=1;for(var i=1;i<bp.length;i++ ){if(i*bh/be*100>bo[bm]){bt=bj;bm++ ;bj=bi[bo[bm]];bf=Math.floor(bo[bm]/(bh/be*100))-bf;bs=1;}
;bp[i]={};var bd;for(var name in bj){var br=bj[name]+h;if(name in this.__pX){if(!bd){bd={};}
;if(qx.Bootstrap.isArray(bt[name])){if(!qx.Bootstrap.isArray(bj[name])){bj[name]=[bj[name]];}
;bd[name]=[];for(var j=0;j<bj[name].length;j++ ){var bu=bj[name][j]+h;var x=bs/bf;bd[name][j]=this.__qr(bu,bt[name],bq,x);}
;}
else {var x=bs/bf;bd[name]=this.__qr(br,bt[name],bq,x);}
;}
else if(br.charAt(0)==o){var bl=qx.util.ColorUtil.cssStringToRgb(bt[name]);var bk=qx.util.ColorUtil.cssStringToRgb(br);var bg=[];for(var j=0;j<bl.length;j++ ){var bv=bl[j]-bk[j];var x=bs/bf;var bn=qx.bom.AnimationFrame.calculateTiming(bq,x);bg[j]=parseInt(bl[j]-bv*bn,10);}
;bp[i][name]=qx.util.ColorUtil.rgbToHexString(bg);}
else if(!isNaN(parseFloat(br))){var x=bs/bf;bp[i][name]=this.__qr(br,bt[name],bq,x);}
else {bp[i][name]=bt[name]+h;}
;}
;if(bd){var bx=qx.bom.element.Transform.getCss(bd).split(z);if(bx.length>1){bp[i][bx[0]]=bx[1].replace(u,h);}
;}
;bs++ ;}
;bp[bp.length-1]=this.__qo(bi[100]);return bp;}
,__qq:function(by){return by.substring((parseFloat(by)+h).length,by.length);}
,__qr:function(bC,bB,bz,x){var bA=parseFloat(bC)-parseFloat(bB);return (parseFloat(bB)+bA*qx.bom.AnimationFrame.calculateTiming(bz,x))+this.__qq(bC);}
,play:function(bD){bD.emit(r,bD.el);var bE=window.setInterval(function(){bD.repeatSteps-- ;var bF=bD.delta[bD.i%bD.steps];if(bD.i===0){for(var name in bF){if(bD.initValues[name]===undefined){if(bD.el[name]!==undefined){bD.initValues[name]=bD.el[name];}
else if(qx.bom.element.Style){bD.initValues[name]=qx.bom.element.Style.get(bD.el,qx.lang.String.camelCase(name));}
else {bD.initValues[name]=bD.el.style[qx.lang.String.camelCase(name)];}
;}
;}
;}
;qx.bom.element.AnimationJs.__qt(bD.el,bF);bD.i++ ;if(bD.i%bD.steps==0){bD.emit(w,bD.el);if(bD.desc.alternate){bD.delta.reverse();}
;}
;if(bD.repeatSteps<0){qx.bom.element.AnimationJs.stop(bD);}
;}
,bD.stepTime);bD.animationId=bE;return bD;}
,pause:function(bG){window.clearInterval(bG.animationId);bG.animationId=null;return bG;}
,stop:function(bK){var bJ=bK.desc;var bH=bK.el;var bI=bK.initValues;if(bK.animationId){window.clearInterval(bK.animationId);}
;if(bK.delayId){window.clearTimeout(bK.delayId);}
;if(bH==undefined){return bK;}
;var bL=bJ.keep;if(bL!=undefined&&!bK.stopped){if(bK.reverse||(bJ.alternate&&bJ.repeat&&bJ.repeat%2==0)){bL=100-bL;}
;this.__qt(bH,bJ.keyFrames[bL]);}
else {this.__qt(bH,bI);}
;bH.$$animation=null;bK.el=null;bK.ended=true;bK.animationId=null;bK.emit(s,bH);return bK;}
,__qs:function(bN,bM){if(bM==undefined){return bN;}
;if(bM==n){return Number.MAX_VALUE;}
;return bN*bM;}
,__qt:function(bP,bO){for(var bQ in bO){if(bO[bQ]===undefined){continue;}
;if(typeof bP.style[bQ]===v&&bQ in bP){bP[bQ]=bO[bQ];continue;}
;var name=qx.bom.Style.getPropertyName(bQ)||bQ;if(qx.bom.element.Style){qx.bom.element.Style.set(bP,name,bO[bQ]);}
else {bP.style[name]=bO[bQ];}
;}
;}
,__qu:function(bT,bR){var bU=100;for(var i=0;i<bR.length-1;i++ ){bU=Math.min(bU,bR[i+1]-bR[i]);}
;var bS=bT*bU/100;while(bS>this.__ql){bS=bS/2;}
;return Math.round(bS);}
,__qv:function(bW){var bV=Object.keys(bW);for(var i=0;i<bV.length;i++ ){bV[i]=parseInt(bV[i],10);}
;bV.sort(function(a,b){return a-b;}
);return bV;}
}});}
)();
(function(){var a="css.transform.3d",b="backfaceVisibility",c="transformStyle",d="css.transform",e="transformOrigin",f="qx.bom.client.CssTransform",g="transform",h="perspective",i="perspectiveOrigin";qx.Bootstrap.define(f,{statics:{getSupport:function(){var name=qx.bom.client.CssTransform.getName();if(name!=null){return {"name":name,"style":qx.bom.client.CssTransform.getStyle(),"origin":qx.bom.client.CssTransform.getOrigin(),"3d":qx.bom.client.CssTransform.get3D(),"perspective":qx.bom.client.CssTransform.getPerspective(),"perspective-origin":qx.bom.client.CssTransform.getPerspectiveOrigin(),"backface-visibility":qx.bom.client.CssTransform.getBackFaceVisibility()};}
;return null;}
,getStyle:function(){return qx.bom.Style.getPropertyName(c);}
,getPerspective:function(){return qx.bom.Style.getPropertyName(h);}
,getPerspectiveOrigin:function(){return qx.bom.Style.getPropertyName(i);}
,getBackFaceVisibility:function(){return qx.bom.Style.getPropertyName(b);}
,getOrigin:function(){return qx.bom.Style.getPropertyName(e);}
,getName:function(){return qx.bom.Style.getPropertyName(g);}
,get3D:function(){return qx.bom.client.CssTransform.getPerspective()!=null;}
},defer:function(j){qx.core.Environment.add(d,j.getSupport);qx.core.Environment.add(a,j.get3D);}
});}
)();
(function(){var a="backface-visibility",b="css.transform.3d",c=") ",d="px",e="scale",f="Z",g="X",h=", ",j="visible",k=":",l="3d",m="name",n="",o="origin",p="(",q="qx.bom.element.Transform",r="perspective",s="Y",t="css.transform",u="translate",v="perspective-origin",w="hidden",x=";",y=" ",z="style";qx.Bootstrap.define(q,{statics:{__qw:qx.core.Environment.get(t),transform:function(A,C){var D=this.getTransformValue(C);if(this.__qw!=null){var B=this.__qw[m];A.style[B]=D;}
;}
,translate:function(E,F){this.transform(E,{translate:F});}
,scale:function(G,H){this.transform(G,{scale:H});}
,rotate:function(I,J){this.transform(I,{rotate:J});}
,skew:function(K,L){this.transform(K,{skew:L});}
,getCss:function(N){var O=this.getTransformValue(N);if(this.__qw!=null){var M=this.__qw[m];return qx.bom.Style.getCssName(M)+k+O+x;}
;return n;}
,setOrigin:function(P,Q){if(this.__qw!=null){P.style[this.__qw[o]]=Q;}
;}
,getOrigin:function(R){if(this.__qw!=null){return R.style[this.__qw[o]];}
;return n;}
,setStyle:function(S,T){if(this.__qw!=null){S.style[this.__qw[z]]=T;}
;}
,getStyle:function(U){if(this.__qw!=null){return U.style[this.__qw[z]];}
;return n;}
,setPerspective:function(V,W){if(this.__qw!=null){V.style[this.__qw[r]]=W+d;}
;}
,getPerspective:function(X){if(this.__qw!=null){return X.style[this.__qw[r]];}
;return n;}
,setPerspectiveOrigin:function(Y,ba){if(this.__qw!=null){Y.style[this.__qw[v]]=ba;}
;}
,getPerspectiveOrigin:function(bb){if(this.__qw!=null){var bc=bb.style[this.__qw[v]];if(bc!=n){return bc;}
else {var be=bb.style[this.__qw[v]+g];var bd=bb.style[this.__qw[v]+s];if(be!=n){return be+y+bd;}
;}
;}
;return n;}
,setBackfaceVisibility:function(bf,bg){if(this.__qw!=null){bf.style[this.__qw[a]]=bg?j:w;}
;}
,getBackfaceVisibility:function(bh){if(this.__qw!=null){return bh.style[this.__qw[a]]==j;}
;return true;}
,getTransformValue:function(bl){var bm=n;var bi=[u,e];for(var bj in bl){var bk=bl[bj];if(qx.Bootstrap.isArray(bk)){if(bk.length===3&&bi.indexOf(bj)>-1&&qx.core.Environment.get(b)){bm+=this._compute3dProperty(bj,bk);}
else {bm+=this._computeAxisProperties(bj,bk);}
;}
else {bm+=bj+p+bk+c;}
;}
;return bm.trim();}
,_compute3dProperty:function(bo,bn){var bp=n;bo+=l;for(var i=0;i<bn.length;i++ ){if(bn[i]==null){bn[i]=0;}
;}
;bp+=bo+p+bn.join(h)+c;return bp;}
,_computeAxisProperties:function(bq,br){var bt=n;var bs=[g,s,f];for(var i=0;i<br.length;i++ ){if(br[i]==null||(i==2&&!qx.core.Environment.get(b))){continue;}
;bt+=bq+bs[i]+p;bt+=br[i];bt+=c;}
;return bt;}
}});}
)();
(function(){var b="ease-in-out",c="Number",d="css.animation.requestframe",e="qx.bom.AnimationFrame",f="frame",g="end",h="linear",j="ease-in",k="ease-out";qx.Bootstrap.define(e,{extend:qx.event.Emitter,events:{"end":undefined,"frame":c},members:{__oq:false,startSequence:function(l){this.__oq=false;var m=+(new Date());var n=function(p){if(this.__oq){this.id=null;return;}
;if(p>=m+l){this.emit(g);this.id=null;}
else {var o=Math.max(p-m,0);this.emit(f,o);this.id=qx.bom.AnimationFrame.request(n,this);}
;}
;this.id=qx.bom.AnimationFrame.request(n,this);}
,cancelSequence:function(){this.__oq=true;}
},statics:{TIMEOUT:30,calculateTiming:function(q,x){if(q==j){var a=[3.1223e-7,0.0757,1.2646,-0.167,-0.4387,0.2654];}
else if(q==k){var a=[-7.0198e-8,1.652,-0.551,-0.0458,0.1255,-0.1807];}
else if(q==h){return x;}
else if(q==b){var a=[2.482e-7,-0.2289,3.3466,-1.0857,-1.7354,0.7034];}
else {var a=[-0.0021,0.2472,9.8054,-21.6869,17.7611,-5.1226];}
;var y=0;for(var i=0;i<a.length;i++ ){y+=a[i]*Math.pow(x,i);}
;return y;}
,request:function(r,t){var s=qx.core.Environment.get(d);var u=function(v){if(v<1e10){v=qx.bom.AnimationFrame.__or+v;}
;v=v||+(new Date());r.call(t,v);}
;if(s){return window[s](u);}
else {return window.setTimeout(function(){u();}
,qx.bom.AnimationFrame.TIMEOUT);}
;}
},defer:function(w){w.__or=window.performance&&performance.timing&&performance.timing.navigationStart;if(!w.__or){w.__or=Date.now();}
;}
});}
)();
(function(){var a="Child is already in: ",b="text",c="|bubble|",d="qx.html.Element",f="': ",g="|capture|",h="scroll",j="Invalid capture flag.",k="focus",m="Failed to add event listener for type '",n="Flushing elements...",o="class",p="blur",q="div",r="Flush: ",s="deactivate",t="'",u="css.userselect",v="animationEnd",w="Synced DOM with ",z=" from the target '",A="qx.debug",B="capture",C="visible",D="Root elements could not be inserted into other ones.",E="Has no children!",F="off",G="Invalid callback function",H="releaseCapture",I="Could not move to same index!",J="Invalid context for callback.",K="element",L="",M="Flush invisible element",N="Failed to remove event listener for type '",O="qxSelectable",P="tabIndex",Q="Has no child at this position!",R="Invalid event type.",S="qx.html.Iframe",T="activate",U="__fu",V="Has no parent to remove from.",W=" to the target '",X="mshtml",Y="engine.name",bp=" operations",bq="Flush rendered element",br="none",bl="Has no child: ",bm="css.userselect.none",bn=" ",bo="hidden",bs="on",bt="Switching visibility to: ",bu="id",bv="Could not overwrite existing element!";qx.Class.define(d,{extend:qx.core.Object,construct:function(by,bw,bx){qx.core.Object.call(this);this.__yu=by||q;this.__yv=bw||null;this.__yw=bx||null;}
,statics:{DEBUG:false,_modified:{},_visibility:{},_scroll:{},_actions:[],__yx:{},__yy:null,__yz:null,_scheduleFlush:function(bz){qx.html.Element.__dk.schedule();}
,flush:function(){var bL;if(qx.core.Environment.get(A)){if(this.DEBUG){qx.log.Logger.debug(this,n);}
;}
;var bD=this.__yA();var bB=bD.getFocus();if(bB&&this.__yC(bB)){bD.blur(bB);}
;var bS=bD.getActive();if(bS&&this.__yC(bS)){qx.bom.Element.deactivate(bS);}
;var bG=this.__yB();if(bG&&this.__yC(bG)){qx.bom.Element.releaseCapture(bG);}
;var bM=[];var bN=this._modified;for(var bK in bN){bL=bN[bK];if(bL.__yP()||bL.classname==S){if(bL.__fs&&qx.dom.Hierarchy.isRendered(bL.__fs)){bM.push(bL);}
else {if(qx.core.Environment.get(A)){if(this.DEBUG){bL.debug(M);}
;}
;bL.__yO();}
;delete bN[bK];}
;}
;for(var i=0,l=bM.length;i<l;i++ ){bL=bM[i];if(qx.core.Environment.get(A)){if(this.DEBUG){bL.debug(bq);}
;}
;bL.__yO();}
;var bI=this._visibility;for(var bK in bI){bL=bI[bK];var bO=bL.__fs;if(!bO){delete bI[bK];continue;}
;if(qx.core.Environment.get(A)){if(this.DEBUG){qx.log.Logger.debug(this,bt+bL.__nc);}
;}
;if(!bL.$$disposed){bO.style.display=bL.__nc?L:br;if((qx.core.Environment.get(Y)==X)){if(!(document.documentMode>=8)){bO.style.visibility=bL.__nc?C:bo;}
;}
;}
;delete bI[bK];}
;var scroll=this._scroll;for(var bK in scroll){bL=scroll[bK];var bC=bL.__fs;if(bC&&bC.offsetWidth){var bF=true;if(bL.__yG!=null){bL.__fs.scrollLeft=bL.__yG;delete bL.__yG;}
;if(bL.__yH!=null){bL.__fs.scrollTop=bL.__yH;delete bL.__yH;}
;var bP=bL.__yE;if(bP!=null){var bJ=bP.element.getDomElement();if(bJ&&bJ.offsetWidth){qx.bom.element.Scroll.intoViewX(bJ,bC,bP.align);delete bL.__yE;}
else {bF=false;}
;}
;var bQ=bL.__yF;if(bQ!=null){var bJ=bQ.element.getDomElement();if(bJ&&bJ.offsetWidth){qx.bom.element.Scroll.intoViewY(bJ,bC,bQ.align);delete bL.__yF;}
else {bF=false;}
;}
;if(bF){delete scroll[bK];}
;}
;}
;var bE={"releaseCapture":1,"blur":1,"deactivate":1};for(var i=0;i<this._actions.length;i++ ){var bR=this._actions[i];var bO=bR.element.__fs;if(!bO||!bE[bR.type]&&!bR.element.__yP()){continue;}
;var bH=bR.args;bH.unshift(bO);qx.bom.Element[bR.type].apply(qx.bom.Element,bH);}
;this._actions=[];for(var bK in this.__yx){var bA=this.__yx[bK];var bC=bA.element.__fs;if(bC){qx.bom.Selection.set(bC,bA.start,bA.end);delete this.__yx[bK];}
;}
;qx.event.handler.Appear.refresh();}
,__yA:function(){if(!this.__yy){var bT=qx.event.Registration.getManager(window);this.__yy=bT.getHandler(qx.event.handler.Focus);}
;return this.__yy;}
,__yB:function(){if(!this.__yz){var bU=qx.event.Registration.getManager(window);this.__yz=bU.getDispatcher(qx.event.dispatch.MouseCapture);}
;return this.__yz.getCaptureElement();}
,__yC:function(bV){var bW=qx.core.ObjectRegistry.fromHashCode(bV.$$element);return bW&&!bW.__yP();}
},members:{__yu:null,__fs:null,__k:false,__yD:true,__nc:true,__yE:null,__yF:null,__yG:null,__yH:null,__yI:null,__yJ:null,__yK:null,__yv:null,__yw:null,__yL:null,__yM:null,__fu:null,__yN:null,__cc:null,_scheduleChildrenUpdate:function(){if(this.__yN){return;}
;this.__yN=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(K);}
,_createDomElement:function(){return qx.dom.Element.create(this.__yu);}
,__yO:function(){if(qx.core.Environment.get(A)){if(this.DEBUG){this.debug(r+this.getAttribute(bu));}
;}
;var length;var bX=this.__fu;if(bX){length=bX.length;var bY;for(var i=0;i<length;i++ ){bY=bX[i];if(bY.__nc&&bY.__yD&&!bY.__fs){bY.__yO();}
;}
;}
;if(!this.__fs){this.__fs=this._createDomElement();this.__fs.$$element=this.$$hash;this._copyData(false);if(bX&&length>0){this._insertChildren();}
;}
else {this._syncData();if(this.__yN){this._syncChildren();}
;}
;delete this.__yN;}
,_insertChildren:function(){var ca=this.__fu;var length=ca.length;var cc;if(length>2){var cb=document.createDocumentFragment();for(var i=0;i<length;i++ ){cc=ca[i];if(cc.__fs&&cc.__yD){cb.appendChild(cc.__fs);}
;}
;this.__fs.appendChild(cb);}
else {var cb=this.__fs;for(var i=0;i<length;i++ ){cc=ca[i];if(cc.__fs&&cc.__yD){cb.appendChild(cc.__fs);}
;}
;}
;}
,_syncChildren:function(){var cm=qx.core.ObjectRegistry;var cd=this.__fu;var ck=cd.length;var ce;var ci;var cg=this.__fs;var cl=cg.childNodes;var cf=0;var cj;if(qx.core.Environment.get(A)){var ch=0;}
;for(var i=cl.length-1;i>=0;i-- ){cj=cl[i];ci=cm.fromHashCode(cj.$$element);if(!ci||!ci.__yD||ci.__cc!==this){cg.removeChild(cj);if(qx.core.Environment.get(A)){ch++ ;}
;}
;}
;for(var i=0;i<ck;i++ ){ce=cd[i];if(ce.__yD){ci=ce.__fs;cj=cl[cf];if(!ci){continue;}
;if(ci!=cj){if(cj){cg.insertBefore(ci,cj);}
else {cg.appendChild(ci);}
;if(qx.core.Environment.get(A)){ch++ ;}
;}
;cf++ ;}
;}
;if(qx.core.Environment.get(A)){if(qx.html.Element.DEBUG){this.debug(w+ch+bp);}
;}
;}
,_copyData:function(co){var cq=this.__fs;var cs=this.__yw;if(cs){var cp=qx.bom.element.Attribute;for(var cr in cs){cp.set(cq,cr,cs[cr]);}
;}
;var cs=this.__yv;if(cs){var cn=qx.bom.element.Style;if(co){cn.setStyles(cq,cs);}
else {cn.setCss(cq,cn.compile(cs));}
;}
;var cs=this.__yL;if(cs){for(var cr in cs){this._applyProperty(cr,cs[cr]);}
;}
;var cs=this.__yM;if(cs){qx.event.Registration.getManager(cq).importListeners(cq,cs);delete this.__yM;}
;}
,_syncData:function(){var cx=this.__fs;var cw=qx.bom.element.Attribute;var cu=qx.bom.element.Style;var cv=this.__yJ;if(cv){var cA=this.__yw;if(cA){var cy;for(var cz in cv){cy=cA[cz];if(cy!==undefined){cw.set(cx,cz,cy);}
else {cw.reset(cx,cz);}
;}
;}
;this.__yJ=null;}
;var cv=this.__yI;if(cv){var cA=this.__yv;if(cA){var ct={};for(var cz in cv){ct[cz]=cA[cz];}
;cu.setStyles(cx,ct);}
;this.__yI=null;}
;var cv=this.__yK;if(cv){var cA=this.__yL;if(cA){var cy;for(var cz in cv){this._applyProperty(cz,cA[cz]);}
;}
;this.__yK=null;}
;}
,__yP:function(){var cB=this;while(cB){if(cB.__k){return true;}
;if(!cB.__yD||!cB.__nc){return false;}
;cB=cB.__cc;}
;return false;}
,__yQ:function(cC){if(cC.__cc===this){throw new Error(a+cC);}
;if(cC.__k){throw new Error(D);}
;if(cC.__cc){cC.__cc.remove(cC);}
;cC.__cc=this;if(!this.__fu){this.__fu=[];}
;if(this.__fs){this._scheduleChildrenUpdate();}
;}
,__yR:function(cD){if(cD.__cc!==this){throw new Error(bl+cD);}
;if(this.__fs){this._scheduleChildrenUpdate();}
;delete cD.__cc;}
,__yS:function(cE){if(cE.__cc!==this){throw new Error(bl+cE);}
;if(this.__fs){this._scheduleChildrenUpdate();}
;}
,getChildren:function(){return this.__fu||null;}
,getChild:function(cF){var cG=this.__fu;return cG&&cG[cF]||null;}
,hasChildren:function(){var cH=this.__fu;return cH&&cH[0]!==undefined;}
,indexOf:function(cJ){var cI=this.__fu;return cI?cI.indexOf(cJ):-1;}
,hasChild:function(cL){var cK=this.__fu;return cK&&cK.indexOf(cL)!==-1;}
,add:function(cM){if(arguments[1]){for(var i=0,l=arguments.length;i<l;i++ ){this.__yQ(arguments[i]);}
;this.__fu.push.apply(this.__fu,arguments);}
else {this.__yQ(cM);this.__fu.push(cM);}
;return this;}
,addAt:function(cO,cN){this.__yQ(cO);qx.lang.Array.insertAt(this.__fu,cO,cN);return this;}
,remove:function(cP){var cQ=this.__fu;if(!cQ){return this;}
;if(arguments[1]){var cR;for(var i=0,l=arguments.length;i<l;i++ ){cR=arguments[i];this.__yR(cR);qx.lang.Array.remove(cQ,cR);}
;}
else {this.__yR(cP);qx.lang.Array.remove(cQ,cP);}
;return this;}
,removeAt:function(cS){var cT=this.__fu;if(!cT){throw new Error(E);}
;var cU=cT[cS];if(!cU){throw new Error(Q);}
;this.__yR(cU);qx.lang.Array.removeAt(this.__fu,cS);return this;}
,removeAll:function(){var cV=this.__fu;if(cV){for(var i=0,l=cV.length;i<l;i++ ){this.__yR(cV[i]);}
;cV.length=0;}
;return this;}
,getParent:function(){return this.__cc||null;}
,insertInto:function(parent,cW){parent.__yQ(this);if(cW==null){parent.__fu.push(this);}
else {qx.lang.Array.insertAt(this.__fu,this,cW);}
;return this;}
,insertBefore:function(cX){var parent=cX.__cc;parent.__yQ(this);qx.lang.Array.insertBefore(parent.__fu,this,cX);return this;}
,insertAfter:function(cY){var parent=cY.__cc;parent.__yQ(this);qx.lang.Array.insertAfter(parent.__fu,this,cY);return this;}
,moveTo:function(da){var parent=this.__cc;parent.__yS(this);var dc=parent.__fu.indexOf(this);if(dc===da){throw new Error(I);}
else if(dc<da){da-- ;}
;qx.lang.Array.removeAt(parent.__fu,dc);qx.lang.Array.insertAt(parent.__fu,this,da);return this;}
,moveBefore:function(dd){var parent=this.__cc;return this.moveTo(parent.__fu.indexOf(dd));}
,moveAfter:function(de){var parent=this.__cc;return this.moveTo(parent.__fu.indexOf(de)+1);}
,free:function(){var parent=this.__cc;if(!parent){throw new Error(V);}
;if(!parent.__fu){return this;}
;parent.__yR(this);qx.lang.Array.remove(parent.__fu,this);return this;}
,getDomElement:function(){return this.__fs||null;}
,getNodeName:function(){return this.__yu;}
,setNodeName:function(name){this.__yu=name;}
,setRoot:function(df){this.__k=df;}
,useMarkup:function(dg){if(this.__fs){throw new Error(bv);}
;if(qx.core.Environment.get(Y)==X){var dh=document.createElement(q);}
else {var dh=qx.dom.Element.getHelperElement();}
;dh.innerHTML=dg;this.useElement(dh.firstChild);return this.__fs;}
,useElement:function(di){if(this.__fs){throw new Error(bv);}
;this.__fs=di;this.__fs.$$element=this.$$hash;this._copyData(true);}
,isFocusable:function(){var dk=this.getAttribute(P);if(dk>=1){return true;}
;var dj=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;if(dk>=0&&dj[this.__yu]){return true;}
;return false;}
,setSelectable:function(dm){this.setAttribute(O,dm?bs:F);var dl=qx.core.Environment.get(u);if(dl){this.setStyle(dl,dm?b:qx.core.Environment.get(bm));}
;}
,isNativelyFocusable:function(){return !!qx.event.handler.Focus.FOCUSABLE_ELEMENTS[this.__yu];}
,include:function(){if(this.__yD){return this;}
;delete this.__yD;if(this.__cc){this.__cc._scheduleChildrenUpdate();}
;return this;}
,exclude:function(){if(!this.__yD){return this;}
;this.__yD=false;if(this.__cc){this.__cc._scheduleChildrenUpdate();}
;return this;}
,isIncluded:function(){return this.__yD===true;}
,fadeIn:function(dn){var dp=qxWeb(this.__fs);if(dp.isPlaying()){dp.stop();}
;if(!this.__fs){this.__yO();dp.push(this.__fs);}
;if(this.__fs){dp.fadeIn(dn).once(v,function(){this.show();qx.html.Element.flush();}
,this);return dp.getAnimationHandles()[0];}
;}
,fadeOut:function(dq){var dr=qxWeb(this.__fs);if(dr.isPlaying()){dr.stop();}
;if(this.__fs){dr.fadeOut(dq).once(v,function(){this.hide();qx.html.Element.flush();}
,this);return dr.getAnimationHandles()[0];}
;}
,show:function(){if(this.__nc){return this;}
;if(this.__fs){qx.html.Element._visibility[this.$$hash]=this;qx.html.Element._scheduleFlush(K);}
;if(this.__cc){this.__cc._scheduleChildrenUpdate();}
;delete this.__nc;return this;}
,hide:function(){if(!this.__nc){return this;}
;if(this.__fs){qx.html.Element._visibility[this.$$hash]=this;qx.html.Element._scheduleFlush(K);}
;this.__nc=false;return this;}
,isVisible:function(){return this.__nc===true;}
,scrollChildIntoViewX:function(dv,dt,dw){var ds=this.__fs;var du=dv.getDomElement();if(dw!==false&&ds&&ds.offsetWidth&&du&&du.offsetWidth){qx.bom.element.Scroll.intoViewX(du,ds,dt);}
else {this.__yE={element:dv,align:dt};qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(K);}
;delete this.__yG;}
,scrollChildIntoViewY:function(dA,dy,dB){var dx=this.__fs;var dz=dA.getDomElement();if(dB!==false&&dx&&dx.offsetWidth&&dz&&dz.offsetWidth){qx.bom.element.Scroll.intoViewY(dz,dx,dy);}
else {this.__yF={element:dA,align:dy};qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(K);}
;delete this.__yH;}
,scrollToX:function(x,dC){var dD=this.__fs;if(dC!==true&&dD&&dD.offsetWidth){dD.scrollLeft=x;delete this.__yG;}
else {this.__yG=x;qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(K);}
;delete this.__yE;}
,getScrollX:function(){var dE=this.__fs;if(dE){return dE.scrollLeft;}
;return this.__yG||0;}
,scrollToY:function(y,dG){var dF=this.__fs;if(dG!==true&&dF&&dF.offsetWidth){dF.scrollTop=y;delete this.__yH;}
else {this.__yH=y;qx.html.Element._scroll[this.$$hash]=this;qx.html.Element._scheduleFlush(K);}
;delete this.__yF;}
,getScrollY:function(){var dH=this.__fs;if(dH){return dH.scrollTop;}
;return this.__yH||0;}
,disableScrolling:function(){this.enableScrolling();this.scrollToX(0);this.scrollToY(0);this.addListener(h,this.__yU,this);}
,enableScrolling:function(){this.removeListener(h,this.__yU,this);}
,__yT:null,__yU:function(e){if(!this.__yT){this.__yT=true;this.__fs.scrollTop=0;this.__fs.scrollLeft=0;delete this.__yT;}
;}
,getTextSelection:function(){var dI=this.__fs;if(dI){return qx.bom.Selection.get(dI);}
;return null;}
,getTextSelectionLength:function(){var dJ=this.__fs;if(dJ){return qx.bom.Selection.getLength(dJ);}
;return null;}
,getTextSelectionStart:function(){var dK=this.__fs;if(dK){return qx.bom.Selection.getStart(dK);}
;return null;}
,getTextSelectionEnd:function(){var dL=this.__fs;if(dL){return qx.bom.Selection.getEnd(dL);}
;return null;}
,setTextSelection:function(dM,dN){var dO=this.__fs;if(dO){qx.bom.Selection.set(dO,dM,dN);return;}
;qx.html.Element.__yx[this.toHashCode()]={element:this,start:dM,end:dN};qx.html.Element._scheduleFlush(K);}
,clearTextSelection:function(){var dP=this.__fs;if(dP){qx.bom.Selection.clear(dP);}
;delete qx.html.Element.__yx[this.toHashCode()];}
,__yV:function(dQ,dR){var dS=qx.html.Element._actions;dS.push({type:dQ,element:this,args:dR||[]});qx.html.Element._scheduleFlush(K);}
,focus:function(){this.__yV(k);}
,blur:function(){this.__yV(p);}
,activate:function(){this.__yV(T);}
,deactivate:function(){this.__yV(s);}
,capture:function(dT){this.__yV(B,[dT!==false]);}
,releaseCapture:function(){this.__yV(H);}
,setStyle:function(dU,dV,dW){if(!this.__yv){this.__yv={};}
;if(this.__yv[dU]==dV){return this;}
;if(dV==null){delete this.__yv[dU];}
else {this.__yv[dU]=dV;}
;if(this.__fs){if(dW){qx.bom.element.Style.set(this.__fs,dU,dV);return this;}
;if(!this.__yI){this.__yI={};}
;this.__yI[dU]=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(K);}
;return this;}
,setStyles:function(dY,eb){var ea=qx.bom.element.Style;if(!this.__yv){this.__yv={};}
;if(this.__fs){if(!this.__yI){this.__yI={};}
;for(var dX in dY){var ec=dY[dX];if(this.__yv[dX]==ec){continue;}
;if(ec==null){delete this.__yv[dX];}
else {this.__yv[dX]=ec;}
;if(eb){ea.set(this.__fs,dX,ec);continue;}
;this.__yI[dX]=true;}
;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(K);}
else {for(var dX in dY){var ec=dY[dX];if(this.__yv[dX]==ec){continue;}
;if(ec==null){delete this.__yv[dX];}
else {this.__yv[dX]=ec;}
;}
;}
;return this;}
,removeStyle:function(ee,ed){this.setStyle(ee,null,ed);return this;}
,getStyle:function(ef){return this.__yv?this.__yv[ef]:null;}
,getAllStyles:function(){return this.__yv||null;}
,setAttribute:function(eg,eh,ei){if(!this.__yw){this.__yw={};}
;if(this.__yw[eg]==eh){return this;}
;if(eh==null){delete this.__yw[eg];}
else {this.__yw[eg]=eh;}
;if(this.__fs){if(ei){qx.bom.element.Attribute.set(this.__fs,eg,eh);return this;}
;if(!this.__yJ){this.__yJ={};}
;this.__yJ[eg]=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(K);}
;return this;}
,setAttributes:function(ej,ek){for(var em in ej){this.setAttribute(em,ej[em],ek);}
;return this;}
,removeAttribute:function(eo,en){return this.setAttribute(eo,null,en);}
,getAttribute:function(ep){return this.__yw?this.__yw[ep]:null;}
,addClass:function(name){var eq=((this.getAttribute(o)||L)+bn+name).trim();this.setAttribute(o,eq);}
,removeClass:function(name){var er=this.getAttribute(o);if(er){this.setAttribute(o,(er.replace(name,L)).trim());}
;}
,_applyProperty:function(name,es){}
,_setProperty:function(et,eu,ev){if(!this.__yL){this.__yL={};}
;if(this.__yL[et]==eu){return this;}
;if(eu==null){delete this.__yL[et];}
else {this.__yL[et]=eu;}
;if(this.__fs){if(ev){this._applyProperty(et,eu);return this;}
;if(!this.__yK){this.__yK={};}
;this.__yK[et]=true;qx.html.Element._modified[this.$$hash]=this;qx.html.Element._scheduleFlush(K);}
;return this;}
,_removeProperty:function(ex,ew){return this._setProperty(ex,null,ew);}
,_getProperty:function(ez){var ey=this.__yL;if(!ey){return null;}
;var eA=ey[ez];return eA==null?null:eA;}
,addListener:function(eF,eC,self,eB){if(this.$$disposed){return null;}
;if(qx.core.Environment.get(A)){var eD=m+eF+t+W+this+f;this.assertString(eF,eD+R);this.assertFunction(eC,eD+G);if(self!==undefined){this.assertObject(self,J);}
;if(eB!==undefined){this.assertBoolean(eB,j);}
;}
;if(this.__fs){return qx.event.Registration.addListener(this.__fs,eF,eC,self,eB);}
;if(!this.__yM){this.__yM={};}
;if(eB==null){eB=false;}
;var eE=qx.event.Manager.getNextUniqueId();var eG=eF+(eB?g:c)+eE;this.__yM[eG]={type:eF,listener:eC,self:self,capture:eB,unique:eE};return eG;}
,removeListener:function(eO,eI,self,eH){if(this.$$disposed){return null;}
;if(qx.core.Environment.get(A)){var eM=N+eO+t+z+this+f;this.assertString(eO,eM+R);this.assertFunction(eI,eM+G);if(self!==undefined){this.assertObject(self,J);}
;if(eH!==undefined){this.assertBoolean(eH,j);}
;}
;if(this.__fs){if(eI.$$wrapped_callback&&eI.$$wrapped_callback[eO+this.$$hash]){var eJ=eI.$$wrapped_callback[eO+this.$$hash];delete eI.$$wrapped_callback[eO+this.$$hash];eI=eJ;}
;qx.event.Registration.removeListener(this.__fs,eO,eI,self,eH);}
else {var eK=this.__yM;var eN;if(eH==null){eH=false;}
;for(var eL in eK){eN=eK[eL];if(eN.listener===eI&&eN.self===self&&eN.capture===eH&&eN.type===eO){delete eK[eL];break;}
;}
;}
;return this;}
,removeListenerById:function(eP){if(this.$$disposed){return null;}
;if(this.__fs){qx.event.Registration.removeListenerById(this.__fs,eP);}
else {delete this.__yM[eP];}
;return this;}
,hasListener:function(eR,eQ){if(this.$$disposed){return false;}
;if(this.__fs){return qx.event.Registration.hasListener(this.__fs,eR,eQ);}
;var eS=this.__yM;var eU;if(eQ==null){eQ=false;}
;for(var eT in eS){eU=eS[eT];if(eU.capture===eQ&&eU.type===eR){return true;}
;}
;return false;}
,getListeners:function(){if(this.$$disposed){return null;}
;if(this.__fs){return qx.event.Registration.getManager(this.__fs).serializeListeners(this.__fs);}
;var eV=[];for(var eX in this.__yM){var eW=this.__yM[eX];eV.push({type:eW.type,handler:eW.listener,self:eW.self,capture:eW.capture});}
;return eV;}
},defer:function(eY){eY.__dk=new qx.util.DeferredCall(eY.flush,eY);}
,destruct:function(){if(this.$$hash){delete qx.html.Element._modified[this.$$hash];delete qx.html.Element._scroll[this.$$hash];}
;var fa=this.__fs;if(fa){qx.event.Registration.getManager(fa).removeAllListeners(fa);fa.$$element=L;}
;if(!qx.core.ObjectRegistry.inShutDown){var parent=this.__cc;if(parent&&!parent.$$disposed){parent.remove(this);}
;}
;this._disposeArray(U);this.__yw=this.__yv=this.__yM=this.__yL=this.__yJ=this.__yI=this.__yK=this.__fs=this.__cc=this.__yE=this.__yF=null;}
});}
)();
(function(){var a="qx.event.handler.Appear",b="engine.name",c="mshtml",d="disappear",e="appear",f="browser.documentmode";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(g){qx.core.Object.call(this);this.__ff=g;this.__yW={};qx.event.handler.Appear.__yX[this.$$hash]=this;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{appear:true,disappear:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true,__yX:{},refresh:function(){var h=this.__yX;for(var i in h){h[i].refresh();}
;}
},members:{__ff:null,__yW:null,canHandleEvent:function(k,j){}
,registerEvent:function(o,p,m){var n=qx.core.ObjectRegistry.toHashCode(o)+p;var l=this.__yW;if(l&&!l[n]){l[n]=o;o.$$displayed=o.offsetWidth>0;}
;}
,unregisterEvent:function(t,u,r){var s=qx.core.ObjectRegistry.toHashCode(t)+u;var q=this.__yW;if(!q){return;}
;if(q[s]){delete q[s];}
;}
,refresh:function(){var A=this.__yW;var x;var y=qx.core.Environment.get(b)==c&&qx.core.Environment.get(f)<9;for(var v in A){x=A[v];var w=x.offsetWidth>0;if(!w&&y){w=x.offsetWidth>0;}
;if((!!x.$$displayed)!==w){x.$$displayed=w;var z=qx.event.Registration.createEvent(w?e:d);this.__ff.dispatchEvent(x,z);}
;}
;}
},destruct:function(){this.__ff=this.__yW=null;delete qx.event.handler.Appear.__yX[this.$$hash];}
,defer:function(B){qx.event.Registration.addHandler(B);}
});}
)();
(function(){var a="abstract",b="The context object '",c="qx.debug",d="' for the event '",e="' of '",f="qx.event.dispatch.AbstractBubbling",g="'is already disposed.",h="Missing implementation";qx.Class.define(f,{extend:qx.core.Object,implement:qx.event.IEventDispatcher,type:a,construct:function(k){this._manager=k;}
,members:{_getParent:function(l){throw new Error(h);}
,canDispatchEvent:function(n,event,m){return event.getBubbles();}
,dispatchEvent:function(q,event,B){var parent=q;var x=this._manager;var t,C;var s;var A,z;var D;var v=[];t=x.getListeners(q,B,true);C=x.getListeners(q,B,false);if(t){v.push(t);}
;if(C){v.push(C);}
;var parent=this._getParent(q);var p=[];var o=[];var r=[];var u=[];while(parent!=null){t=x.getListeners(parent,B,true);if(t){r.push(t);u.push(parent);}
;C=x.getListeners(parent,B,false);if(C){p.push(C);o.push(parent);}
;parent=this._getParent(parent);}
;event.setEventPhase(qx.event.type.Event.CAPTURING_PHASE);for(var i=r.length-1;i>=0;i-- ){D=u[i];event.setCurrentTarget(D);s=r[i];for(var j=0,w=s.length;j<w;j++ ){A=s[j];z=A.context||D;if(qx.core.Environment.get(c)){if(z&&z.isDisposed&&z.isDisposed()){this.warn(b+z+d+B+e+D+g);}
;}
;if(!this._manager.isBlacklisted(A.unique)){A.handler.call(z,event);}
;}
;if(event.getPropagationStopped()){return;}
;}
;event.setEventPhase(qx.event.type.Event.AT_TARGET);event.setCurrentTarget(q);for(var i=0,y=v.length;i<y;i++ ){s=v[i];for(var j=0,w=s.length;j<w;j++ ){A=s[j];z=A.context||q;if(qx.core.Environment.get(c)){if(z&&z.isDisposed&&z.isDisposed()){this.warn(b+z+d+B+e+q+g);}
;}
;A.handler.call(z,event);}
;if(event.getPropagationStopped()){return;}
;}
;event.setEventPhase(qx.event.type.Event.BUBBLING_PHASE);for(var i=0,y=p.length;i<y;i++ ){D=o[i];event.setCurrentTarget(D);s=p[i];for(var j=0,w=s.length;j<w;j++ ){A=s[j];z=A.context||D;if(qx.core.Environment.get(c)){if(z&&z.isDisposed&&z.isDisposed()){this.warn(b+z+d+B+e+D+g);}
;}
;A.handler.call(z,event);}
;if(event.getPropagationStopped()){return;}
;}
;}
}});}
)();
(function(){var a="qx.event.dispatch.DomBubbling";qx.Class.define(a,{extend:qx.event.dispatch.AbstractBubbling,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL},members:{_getParent:function(b){return b.parentNode;}
,canDispatchEvent:function(d,event,c){return d.nodeType!==undefined&&event.getBubbles();}
},defer:function(e){qx.event.Registration.addDispatcher(e);}
});}
)();
(function(){var a="os.name",b="opera",c="engine.name",d="qx.event.type.Dom",e="osx";qx.Class.define(d,{extend:qx.event.type.Native,statics:{SHIFT_MASK:1,CTRL_MASK:2,ALT_MASK:4,META_MASK:8},members:{_cloneNativeEvent:function(f,g){var g=qx.event.type.Native.prototype._cloneNativeEvent.call(this,f,g);g.shiftKey=f.shiftKey;g.ctrlKey=f.ctrlKey;g.altKey=f.altKey;g.metaKey=f.metaKey;return g;}
,getModifiers:function(){var h=0;var i=this._native;if(i.shiftKey){h|=qx.event.type.Dom.SHIFT_MASK;}
;if(i.ctrlKey){h|=qx.event.type.Dom.CTRL_MASK;}
;if(i.altKey){h|=qx.event.type.Dom.ALT_MASK;}
;if(i.metaKey){h|=qx.event.type.Dom.META_MASK;}
;return h;}
,isCtrlPressed:function(){return this._native.ctrlKey;}
,isShiftPressed:function(){return this._native.shiftKey;}
,isAltPressed:function(){return this._native.altKey;}
,isMetaPressed:function(){return this._native.metaKey;}
,isCtrlOrCommandPressed:function(){if(qx.core.Environment.get(a)==e&&qx.core.Environment.get(c)!=b){return this._native.metaKey;}
else {return this._native.ctrlKey;}
;}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="click",d="middle",e="none",f="contextmenu",g="qx.event.type.Mouse",h="browser.documentmode",i="left",j="right",k="browser.name",l="ie";qx.Class.define(g,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(m,n){var n=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,m,n);n.button=m.button;n.clientX=Math.round(m.clientX);n.clientY=Math.round(m.clientY);n.pageX=m.pageX?Math.round(m.pageX):undefined;n.pageY=m.pageY?Math.round(m.pageY):undefined;n.screenX=Math.round(m.screenX);n.screenY=Math.round(m.screenY);n.wheelDelta=m.wheelDelta;n.wheelDeltaX=m.wheelDeltaX;n.wheelDeltaY=m.wheelDeltaY;n.delta=m.delta;n.deltaX=m.deltaX;n.deltaY=m.deltaY;n.deltaZ=m.deltaZ;n.detail=m.detail;n.axis=m.axis;n.wheelX=m.wheelX;n.wheelY=m.wheelY;n.HORIZONTAL_AXIS=m.HORIZONTAL_AXIS;n.srcElement=m.srcElement;n.target=m.target;return n;}
,__ue:{'0':i,'2':j,'1':d},__uf:{'0':e,'1':i,'2':j,'4':d},__ug:{'1':i,'2':j,'4':d},stop:function(){this.stopPropagation();}
,getButton:function(){switch(this._type){case f:return j;case c:if(qx.core.Environment.get(k)===l&&qx.core.Environment.get(h)<9){return i;}
;default:if(!(qx.core.Environment.get(b)==a&&qx.core.Environment.get(h)<=8)){if(this._native.button===-1){return this.__uf[this._native.buttons]||e;}
;return this.__ue[this._native.button]||e;}
else {return this.__ug[this._native.button]||e;}
;};}
,isLeftPressed:function(){return this.getButton()===i;}
,isMiddlePressed:function(){return this.getButton()===d;}
,isRightPressed:function(){return this.getButton()===j;}
,getRelatedTarget:function(){return this._relatedTarget;}
,getViewportLeft:function(){return Math.round(this._native.clientX);}
,getViewportTop:function(){return Math.round(this._native.clientY);}
,getDocumentLeft:function(){if(this._native.pageX!==undefined){return Math.round(this._native.pageX);}
else if(this._native.srcElement){var o=qx.dom.Node.getWindow(this._native.srcElement);return Math.round(this._native.clientX)+qx.bom.Viewport.getScrollLeft(o);}
else {return Math.round(this._native.clientX)+qx.bom.Viewport.getScrollLeft(window);}
;}
,getDocumentTop:function(){if(this._native.pageY!==undefined){return Math.round(this._native.pageY);}
else if(this._native.srcElement){var p=qx.dom.Node.getWindow(this._native.srcElement);return Math.round(this._native.clientY)+qx.bom.Viewport.getScrollTop(p);}
else {return Math.round(this._native.clientY)+qx.bom.Viewport.getScrollTop(window);}
;}
,getScreenLeft:function(){return Math.round(this._native.screenX);}
,getScreenTop:function(){return Math.round(this._native.screenY);}
}});}
)();
(function(){var a="",b="mouse",c="number",d="touch",e="qx.event.type.Pointer",f="pen",g="string";qx.Class.define(e,{extend:qx.event.type.Mouse,members:{_cloneNativeEvent:function(h,i){i=qx.event.type.Mouse.prototype._cloneNativeEvent.call(this,h,i);i.pointerId=h.pointerId;i.width=h.width;i.height=h.height;i.pressure=h.pressure;i.tiltX=h.tiltX;i.tiltY=h.tiltY;i.pointerType=h.pointerType;i.isPrimary=h.isPrimary;i._original=h._original;i.MSPOINTER_TYPE_MOUSE=h.MSPOINTER_TYPE_MOUSE;i.MSPOINTER_TYPE_PEN=h.MSPOINTER_TYPE_PEN;i.MSPOINTER_TYPE_TOUCH=h.MSPOINTER_TYPE_TOUCH;return i;}
,getDocumentLeft:function(){var x=qx.event.type.Mouse.prototype.getDocumentLeft.call(this);if(x==0&&this.getPointerType()==d&&this._native._original!==undefined){x=Math.round(this._native._original.changedTouches[0].pageX)||0;}
;return x;}
,getDocumentTop:function(){var y=qx.event.type.Mouse.prototype.getDocumentTop.call(this);if(y==0&&this.getPointerType()==d&&this._native._original!==undefined){y=Math.round(this._native._original.changedTouches[0].pageY)||0;}
;return y;}
,getPointerId:function(){return this._native.pointerId||0;}
,getWidth:function(){return this._native.width||0;}
,getHeight:function(){return this._native.height||0;}
,getPressure:function(){return this._native.pressure||0;}
,getTiltX:function(){return this._native.tiltX||0;}
,getTiltY:function(){return this._native.tiltY||0;}
,getOriginalTarget:function(){if(this._native&&this._native._original){var j=this._native._original;try{if(j.type.indexOf(d)==0){if(j.changedTouches[0]){return document.elementFromPoint(j.changedTouches[0].clientX,j.changedTouches[0].clientY);}
;}
;}
catch(k){return qx.bom.Event.getTarget(this._native);}
;return qx.bom.Event.getTarget(j);}
else if(this._native){return qx.bom.Event.getTarget(this._native);}
;return qx.event.type.Mouse.prototype.getOriginalTarget.call(this);}
,getPointerType:function(){if(typeof this._native.pointerType==g){return this._native.pointerType;}
;if(typeof this._native.pointerType==c){if(this._native.pointerType==this._native.MSPOINTER_TYPE_MOUSE){return b;}
;if(this._native.pointerType==this._native.MSPOINTER_TYPE_PEN){return f;}
;if(this._native.pointerType==this._native.MSPOINTER_TYPE_TOUCH){return d;}
;}
;return a;}
,isPrimary:function(){return !!this._native.isPrimary;}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="pointerup",d="dispose",e="useraction",f="mouse",g="pointercancel",h="pointerdown",i="pointermove",j="qx.event.handler.Pointer",k="browser.documentmode",l="qxanonymous";qx.Class.define(j,{extend:qx.event.handler.PointerCore,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{pointermove:1,pointerover:1,pointerout:1,pointerdown:1,pointerup:1,pointercancel:1,gesturebegin:1,gesturemove:1,gesturefinish:1,gesturecancel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true},construct:function(m){this.__ff=m;this.__lG=m.getWindow();this.__k=this.__lG.document;qx.event.handler.PointerCore.apply(this,[this.__k]);}
,members:{__ff:null,__lG:null,__k:null,canHandleEvent:function(o,n){}
,registerEvent:function(r,q,p){}
,unregisterEvent:function(u,t,s){}
,_initPointerObserver:function(){var v=false;if(qx.core.Environment.get(b)==a&&qx.core.Environment.get(k)<9){v=true;}
;this._initObserver(this._onPointerEvent,v);}
,_fireEvent:function(w,x,y){if(!y){y=qx.bom.Event.getTarget(w);}
;while(y&&y.getAttribute&&y.getAttribute(l)){y=y.parentNode;}
;if(!x){x=w.type;}
;x=qx.event.handler.PointerCore.MSPOINTER_TO_POINTER_MAPPING[x]||x;if(y&&y.nodeType){qx.event.type.dom.Pointer.normalize(w);try{w.srcElement=y;}
catch(z){}
;qx.event.Registration.fireEvent(y,x,qx.event.type.Pointer,[w,y,null,true,true]);if((w.getPointerType()!==f||w.button<=qx.event.handler.PointerCore.LEFT_BUTTON)&&(x==h||x==c||x==i||x==g)){qx.event.Registration.fireEvent(this.__k,qx.event.handler.PointerCore.POINTER_TO_GESTURE_MAPPING[x],qx.event.type.Pointer,[w,y,null,false,false]);}
;qx.event.Registration.fireEvent(this.__lG,e,qx.event.type.Data,[x]);}
;}
,_onPointerEvent:function(A){if(A._original&&A._original[this._processedFlag]){return;}
;var B=qx.event.handler.PointerCore.MSPOINTER_TO_POINTER_MAPPING[A.type]||A.type;this._fireEvent(A,B,qx.bom.Event.getTarget(A));}
,dispose:function(){this.__mA(d);this.__ff=this.__lG=this.__k=null;}
,__mA:function(D,C){qx.event.handler.PointerCore.prototype[D].apply(this,C||[]);}
},defer:function(E){qx.event.Registration.addHandler(E);qx.event.Registration.getManager(document).getHandler(E);}
});}
)();
(function(){var a="qx.event.type.Tap";qx.Class.define(a,{extend:qx.event.type.Pointer});}
)();
(function(){var a="qx.event.type.Track";qx.Class.define(a,{extend:qx.event.type.Pointer,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Pointer.prototype._cloneNativeEvent.call(this,b,c);c.delta=b.delta;return c;}
,getDelta:function(){return this._native.delta;}
}});}
)();
(function(){var a="qx.event.type.Swipe";qx.Class.define(a,{extend:qx.event.type.Pointer,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Pointer.prototype._cloneNativeEvent.call(this,b,c);c.swipe=b.swipe;return c;}
,getStartTime:function(){return this._native.swipe.startTime;}
,getDuration:function(){return this._native.swipe.duration;}
,getAxis:function(){return this._native.swipe.axis;}
,getDirection:function(){return this._native.swipe.direction;}
,getVelocity:function(){return this._native.swipe.velocity;}
,getDistance:function(){return this._native.swipe.distance;}
}});}
)();
(function(){var a="qx.event.type.Rotate";qx.Class.define(a,{extend:qx.event.type.Pointer,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Pointer.prototype._cloneNativeEvent.call(this,b,c);c.angle=b.angle;return c;}
,getAngle:function(){return this._native.angle;}
}});}
)();
(function(){var a="qx.event.type.Roll";qx.Class.define(a,{extend:qx.event.type.Pointer,members:{stop:function(){this.stopPropagation();this.preventDefault();}
,_cloneNativeEvent:function(b,c){var c=qx.event.type.Pointer.prototype._cloneNativeEvent.call(this,b,c);c.delta=b.delta;c.momentum=b.momentum;c.timeoutId=b.timeoutId;return c;}
,getMomentum:function(){return this._native.momentum;}
,stopMomentum:function(){if(this._native.timeoutId){qx.event.Registration.getManager(this._originalTarget).getHandler(qx.event.handler.Gesture).stopMomentum(this._native.timeoutId);}
;}
,getDelta:function(){return this._native.delta;}
}});}
)();
(function(){var a="qx.event.type.Pinch";qx.Class.define(a,{extend:qx.event.type.Pointer,members:{_cloneNativeEvent:function(b,c){var c=qx.event.type.Pointer.prototype._cloneNativeEvent.call(this,b,c);c.scale=b.scale;return c;}
,getScale:function(){return this._native.scale;}
}});}
)();
(function(){var a="swipe",b="pinch",c="event.dispatchevent",d="gesturemove",e="touch",f="longtap",g="event.mousewheel",h="roll",i="dblclick",j="wheel",k="rotate",l="trackstart",m="gesturefinish",n="y",o="browser.documentmode",p="dbltap",q="qx.event.handler.GestureCore",r="right",s="mshtml",t="engine.name",u="gesturecancel",v="gesturebegin",w="track",z="trackend",A="left",B="tap",C="down",D="x",E="up";qx.Bootstrap.define(q,{extend:Object,statics:{TYPES:[B,a,f,p,w,l,z,k,b,h],GESTURE_EVENTS:[v,m,d,u],TAP_MAX_DISTANCE:{"touch":40,"mouse":5,"pen":20},DOUBLETAP_MAX_DISTANCE:{"touch":10,"mouse":4,"pen":10},SWIPE_DIRECTION:{x:[A,r],y:[E,C]},LONGTAP_TIME:500,DOUBLETAP_TIME:500,ROLL_FACTOR:18},construct:function(F,G){this.__nN=F;this.__lw=G;this.__nY={};this.__oa={};this.__ob={};this._initObserver();}
,members:{__nN:null,__lw:null,__nY:null,__oc:null,__od:null,__oe:null,__of:null,__oa:null,__og:null,__ob:null,__oh:null,_initObserver:function(){qx.event.handler.GestureCore.GESTURE_EVENTS.forEach(function(I){qxWeb(this.__nN).on(I,this.checkAndFireGesture,this);}
.bind(this));if(qx.core.Environment.get(t)==s&&qx.core.Environment.get(o)<9){qxWeb(this.__nN).on(i,this._onDblClick,this);}
;var H=qx.core.Environment.get(g);qxWeb(H.target).on(H.type,this._fireRoll,this);}
,_stopObserver:function(){qx.event.handler.GestureCore.GESTURE_EVENTS.forEach(function(K){qxWeb(this.__nN).off(K,this.checkAndFireGesture,this);}
.bind(this));if(qx.core.Environment.get(t)==s&&qx.core.Environment.get(o)<9){qxWeb(this.__nN).off(i,this._onDblClick,this);}
;var J=qx.core.Environment.get(g);qxWeb(J.target).off(J.type,this._fireRoll,this);}
,checkAndFireGesture:function(L,M,N){if(!M){M=L.type;}
;if(!N){N=qx.bom.Event.getTarget(L);}
;if(M==v){this.gestureBegin(L,N);}
else if(M==d){this.gestureMove(L,N);}
else if(M==m){this.gestureFinish(L,N);}
else if(M==u){this.gestureCancel(L.pointerId);}
;}
,gestureBegin:function(O,P){if(this.__nY[O.pointerId]){this.__op(this.__nY[O.pointerId]);delete this.__nY[O.pointerId];}
;if(this._hasIntermediaryHandler(P)){return;}
;this.__nY[O.pointerId]={"startTime":new Date().getTime(),"lastEventTime":new Date().getTime(),"startX":O.clientX,"startY":O.clientY,"clientX":O.clientX,"clientY":O.clientY,"velocityX":0,"velocityY":0,"target":P,"isTap":true,"isPrimary":O.isPrimary,"longTapTimer":window.setTimeout(this.__oo.bind(this,O,P),qx.event.handler.GestureCore.LONGTAP_TIME)};if(O.isPrimary){this.__oe=false;this.__od=P;this.__ol(l,O,P);}
else {this.__oe=true;if(Object.keys(this.__nY).length===2){this.__of=this._calcAngle();this.__oh=this._calcDistance();}
;}
;}
,gestureMove:function(R,S){var T=this.__nY[R.pointerId];if(T){var Q=T.clientX;var U=T.clientY;T.clientX=R.clientX;T.clientY=R.clientY;T.lastEventTime=new Date().getTime();if(Q){T.velocityX=T.clientX-Q;}
;if(U){T.velocityY=T.clientY-U;}
;if(Object.keys(this.__nY).length===2){this.__om(R,T.target);this.__on(R,T.target);}
;if(!this.__oe){this.__ol(w,R,T.target);this._fireRoll(R,e,T.target);}
;if(T.isTap){T.isTap=this._isBelowTapMaxDistance(R);if(!T.isTap){this.__op(T);}
;}
;}
;}
,_hasIntermediaryHandler:function(V){while(V&&V!==this.__nN){if(V.$$gestureHandler){return true;}
;V=V.parentNode;}
;return false;}
,gestureFinish:function(X,Y){if(!this.__nY[X.pointerId]){return;}
;var bf=this.__nY[X.pointerId];this.__op(bf);if(this._hasIntermediaryHandler(Y)){return;}
;this.__oi(bf.velocityX,bf.velocityY,X,bf.target);this.__ol(z,X,bf.target);if(bf.isTap){if(Y!==bf.target){delete this.__nY[X.pointerId];return;}
;this._fireEvent(X,B,X.target||Y);var ba=false;if(Object.keys(this.__oa).length>0){var be=Date.now()-qx.event.handler.GestureCore.DOUBLETAP_TIME;for(var bg in this.__oa){if(bg<be){delete this.__oa[bg];}
else {var W=this.__oa[bg];var bc=this.__oj(W.x,W.y,X.clientX,X.clientY,X.getPointerType());var bd=W.target===(X.target||Y);var bh=W.button===X.button;if(bc&&bh&&bd){ba=true;delete this.__oa[bg];this._fireEvent(X,p,X.target||Y);}
;}
;}
;}
;if(!ba){this.__oa[Date.now()]={x:X.clientX,y:X.clientY,target:X.target||Y,button:X.button};}
;}
else if(!this._isBelowTapMaxDistance(X)){var bb=this.__ok(X,Y);if(bb){X.swipe=bb;this._fireEvent(X,a,bf.target||Y);}
;}
;delete this.__nY[X.pointerId];}
,stopMomentum:function(bi){this.__ob[bi]=true;}
,gestureCancel:function(bj){if(this.__nY[bj]){this.__op(this.__nY[bj]);delete this.__nY[bj];}
;}
,updateGestureTarget:function(bk,bl){this.__nY[bk].target=bl;}
,__oi:function(bq,br,bn,bo,bt){var bs=bn.timeoutId;if((Math.abs(br)<1&&Math.abs(bq)<1)||this.__ob[bs]){delete this.__ob[bs];return;}
;if(!bt){bt=1;var bp=2.8;br=br/bp;bq=bq/bp;}
;bt+=0.0006;br=br/bt;bq=bq/bt;var bm=qx.bom.AnimationFrame.request(qx.lang.Function.bind(function(bu,bv,bw,bx,by){this.__oi(bu,bv,bw,bx,by);}
,this,bq,br,bn,bo,bt));bq=Math.round(bq*100)/100;br=Math.round(br*100)/100;bn.delta={x:-bq,y:-br};bn.momentum=true;bn.timeoutId=bm;this._fireEvent(bn,h,bn.target||bo);}
,_calcAngle:function(){var bA=null;var bB=null;for(var bz in this.__nY){var bC=this.__nY[bz];if(bA===null){bA=bC;}
else {bB=bC;}
;}
;var x=bA.clientX-bB.clientX;var y=bA.clientY-bB.clientY;return (360+Math.atan2(y,x)*(180/Math.PI))%360;}
,_calcDistance:function(){var bD=null;var bE=null;for(var bG in this.__nY){var bH=this.__nY[bG];if(bD===null){bD=bH;}
else {bE=bH;}
;}
;var bF=Math.sqrt(Math.pow(bD.clientX-bE.clientX,2)+Math.pow(bD.clientY-bE.clientY,2));return bF;}
,_isBelowTapMaxDistance:function(bJ){var bK=this._getDeltaCoordinates(bJ);var bI=qx.event.handler.GestureCore.TAP_MAX_DISTANCE[bJ.getPointerType()];if(!bK){return null;}
;return (Math.abs(bK.x)<=bI&&Math.abs(bK.y)<=bI);}
,__oj:function(bL,bP,bQ,bR,bS){var bO=qx.event.handler.GestureCore;var bM=Math.abs(bL-bQ)<bO.DOUBLETAP_MAX_DISTANCE[bS];var bN=Math.abs(bP-bR)<bO.DOUBLETAP_MAX_DISTANCE[bS];return bM&&bN;}
,_getDeltaCoordinates:function(bV){var bW=this.__nY[bV.pointerId];if(!bW){return null;}
;var bT=bV.clientX-bW.startX;var bU=bV.clientY-bW.startY;var bX=D;if(Math.abs(bT/bU)<1){bX=n;}
;return {"x":bT,"y":bU,"axis":bX};}
,_fireEvent:function(ca,cc,cb){if(!this.__nN){return;}
;var bY;if(qx.core.Environment.get(c)){bY=new qx.event.type.dom.Custom(cc,ca,{bubbles:true,swipe:ca.swipe,scale:ca.scale,angle:ca.angle,delta:ca.delta,pointerType:ca.pointerType,momentum:ca.momentum});cb.dispatchEvent(bY);}
else if(this.__lw){bY=new qx.event.type.dom.Custom(cc,ca,{target:this.__nN,currentTarget:this.__nN,srcElement:this.__nN,swipe:ca.swipe,scale:ca.scale,angle:ca.angle,delta:ca.delta,pointerType:ca.pointerType,momentum:ca.momentum});this.__lw.emit(cc,ca);}
;}
,_onDblClick:function(cd){var ce=qx.bom.Event.getTarget(cd);this._fireEvent(cd,B,ce);this._fireEvent(cd,p,ce);}
,__ok:function(ch,ci){var co=this.__nY[ch.pointerId];if(!co){return null;}
;var ck=qx.event.handler.GestureCore;var cn=this._getDeltaCoordinates(ch);var cl=new Date().getTime()-co.startTime;var cp=(Math.abs(cn.x)>=Math.abs(cn.y))?D:n;var cf=cn[cp];var cg=ck.SWIPE_DIRECTION[cp][cf<0?0:1];var cm=(cl!==0)?cf/cl:0;var cj={startTime:co.startTime,duration:cl,axis:cp,direction:cg,distance:cf,velocity:cm};return cj;}
,__ol:function(cq,cr,cs){cr.delta=this._getDeltaCoordinates(cr);this._fireEvent(cr,cq,cr.target||cs);}
,_fireRoll:function(cu,ct,cv){if(cu.type===qx.core.Environment.get(g).type){cu.delta={x:qx.util.Wheel.getDelta(cu,D)*qx.event.handler.GestureCore.ROLL_FACTOR,y:qx.util.Wheel.getDelta(cu,n)*qx.event.handler.GestureCore.ROLL_FACTOR};cu.delta.axis=Math.abs(cu.delta.x/cu.delta.y)<1?n:D;cu.pointerType=j;}
else {var cw=this.__nY[cu.pointerId];cu.delta={x:-cw.velocityX,y:-cw.velocityY,axis:Math.abs(cw.velocityX/cw.velocityY)<1?n:D};}
;this._fireEvent(cu,h,cu.target||cv);}
,__om:function(cx,cz){if(!cx.isPrimary){var cy=this._calcAngle();cx.angle=Math.round((cy-this.__of)%360);this._fireEvent(cx,k,this.__od);}
;}
,__on:function(cC,cD){if(!cC.isPrimary){var cA=this._calcDistance();var cB=cA/this.__oh;cC.scale=(Math.round(cB*100)/100);this._fireEvent(cC,b,this.__od);}
;}
,__oo:function(cE,cF){var cG=this.__nY[cE.pointerId];if(cG){this._fireEvent(cE,f,cE.target||cF);cG.longTapTimer=null;cG.isTap=false;}
;}
,__op:function(cH){if(cH.longTapTimer){window.clearTimeout(cH.longTapTimer);cH.longTapTimer=null;}
;}
,isBelowTapMaxDistance:function(event){var cI=this._calcDelta(event);var cJ=qx.event.handler.GestureCore;return (Math.abs(cI.x)<=cJ.TAP_MAX_DISTANCE&&Math.abs(cI.y)<=cJ.TAP_MAX_DISTANCE);}
,dispose:function(){for(var cK in this.__nY){this.__op(cK);}
;this._stopObserver();this.__nN=this.__lw=null;}
}});}
)();
(function(){var a="x",b="y",c="qx.util.Wheel";qx.Bootstrap.define(c,{statics:{MAXSCROLL:null,MINSCROLL:null,FACTOR:1,getDelta:function(e,d){if(d===undefined){var f=0;if(e.wheelDelta!==undefined){f=-e.wheelDelta;}
else if(e.detail!==0){f=e.detail;}
else if(e.deltaY!==undefined){f=e.deltaY;}
;return this.__oy(f);}
;if(d===a){var x=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaX!==undefined){x=e.wheelDeltaX?this.__oy(-e.wheelDeltaX):0;}
;}
else {if(e.axis&&e.axis==e.HORIZONTAL_AXIS&&(e.detail!==undefined)&&(e.detail>0)){x=this.__oy(e.detail);}
else if(e.deltaX!==undefined){x=this.__oy(e.deltaX);}
;}
;return x;}
;if(d===b){var y=0;if(e.wheelDelta!==undefined){if(e.wheelDeltaY!==undefined){y=e.wheelDeltaY?this.__oy(-e.wheelDeltaY):0;}
else {y=this.__oy(-e.wheelDelta);}
;}
else {if(!(e.axis&&e.axis==e.HORIZONTAL_AXIS)&&(e.detail!==undefined)&&(e.detail>0)){y=this.__oy(e.detail);}
else if(e.deltaY!==undefined){y=this.__oy(e.deltaY);}
;}
;return y;}
;return 0;}
,__oy:function(j){var g=Math.abs(j);if(g===0){return 0;}
;if(qx.util.Wheel.MINSCROLL==null||qx.util.Wheel.MINSCROLL>g){qx.util.Wheel.MINSCROLL=g;this.__oz();}
;if(qx.util.Wheel.MAXSCROLL==null||qx.util.Wheel.MAXSCROLL<g){qx.util.Wheel.MAXSCROLL=g;this.__oz();}
;if(qx.util.Wheel.MAXSCROLL===g&&qx.util.Wheel.MINSCROLL===g){return 2*(j/g);}
;var h=qx.util.Wheel.MAXSCROLL-qx.util.Wheel.MINSCROLL;var i=(j/h)*Math.log(h)*qx.util.Wheel.FACTOR;return i<0?Math.min(i,-1):Math.max(i,1);}
,__oz:function(){var k=qx.util.Wheel.MAXSCROLL||0;var n=qx.util.Wheel.MINSCROLL||k;if(k<=n){return;}
;var l=k-n;var m=(k/l)*Math.log(l);if(m==0){m=1;}
;qx.util.Wheel.FACTOR=6/m;}
}});}
)();
(function(){var a="dblclick",b="mshtml",c="engine.name",d="dispose",e="useraction",f="gesturemove",g="gesturecancel",h="checkAndFireGesture",i="gesturebegin",j="qx.event.handler.Gesture",k="gesturefinish",l="browser.documentmode";qx.Class.define(j,{extend:qx.event.handler.GestureCore,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{tap:1,swipe:1,longtap:1,dbltap:1,rotate:1,pinch:1,track:1,trackstart:1,trackend:1,roll:1},GESTURE_EVENTS:[i,k,f,g],TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true,EVENT_CLASSES:{"tap":qx.event.type.Tap,"longtap":qx.event.type.Tap,"dbltap":qx.event.type.Tap,"swipe":qx.event.type.Swipe,"rotate":qx.event.type.Rotate,"pinch":qx.event.type.Pinch,"track":qx.event.type.Track,"trackstart":qx.event.type.Track,"trackend":qx.event.type.Track,"roll":qx.event.type.Roll}},construct:function(m){this.__ff=m;this.__lG=m.getWindow();this.__k=this.__lG.document;qx.event.handler.GestureCore.apply(this,[this.__k]);}
,members:{__ff:null,__lG:null,__k:null,__nI:null,__uL:null,__uM:null,canHandleEvent:function(o,n){}
,registerEvent:function(r,q,p){}
,unregisterEvent:function(u,t,s){}
,_initObserver:function(){this.__nI=qx.lang.Function.listener(this.checkAndFireGesture,this);qx.event.handler.Gesture.GESTURE_EVENTS.forEach(function(w){qx.event.Registration.addListener(this.__k,w,this.__nI,this);}
.bind(this));if(qx.core.Environment.get(c)==b&&qx.core.Environment.get(l)<9){this.__uL=qx.lang.Function.listener(this._onDblClick,this);qx.bom.Event.addNativeListener(this.__k,a,this.__uL);}
;var v=qx.bom.client.Event.getMouseWheel(this.__lG);this.__uM=qx.lang.Function.listener(this._fireRoll,this);qx.bom.Event.addNativeListener(v.target,v.type,this.__uM,this);}
,checkAndFireGesture:function(y,x,z){this.__mA(h,[y.getNativeEvent(),y.getType(),y.getTarget()]);}
,_stopObserver:function(){qx.event.handler.Gesture.GESTURE_EVENTS.forEach(function(B){qx.event.Registration.removeListener(this.__k,B,this.__nI);}
.bind(this));if(qx.core.Environment.get(c)==b&&qx.core.Environment.get(l)<9){qx.bom.Event.removeNativeListener(this.__k,a,this.__uL);}
;var A=qx.bom.client.Event.getMouseWheel(this.__lG);qx.bom.Event.removeNativeListener(A.target,A.type,this.__uM);}
,_hasIntermediaryHandler:function(C){return false;}
,_fireEvent:function(E,D,F){if(!F){F=qx.bom.Event.getTarget(E);}
;if(!D){D=E.type;}
;var G=qx.event.handler.Gesture.EVENT_CLASSES[D]||qx.event.type.Pointer;if(F&&F.nodeType){qx.event.Registration.fireEvent(F,D,G,[E,F,null,true,true]);}
;qx.event.Registration.fireEvent(this.__lG,e,qx.event.type.Data,[D]);}
,dispose:function(){this._stopObserver();this.__mA(d);this.__ff=this.__lG=this.__k=this.__uL=null;}
,__mA:function(I,H){qx.event.handler.GestureCore.prototype[I].apply(this,H||[]);}
},defer:function(J){qx.event.Registration.addHandler(J);qx.event.Registration.getManager(document).getHandler(J);}
});}
)();
(function(){var a="-",b="qx.event.handler.Element",c="load",d="iframe";qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(e){qx.core.Object.call(this);this._manager=e;this._registeredEvents={};}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{abort:true,load:true,scroll:true,select:true,reset:true,submit:true},CANCELABLE:{selectstart:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{canHandleEvent:function(g,f){if(f===c){return g.tagName.toLowerCase()!==d;}
else {return true;}
;}
,registerEvent:function(j,l,i){var m=qx.core.ObjectRegistry.toHashCode(j);var h=m+a+l;var k=qx.lang.Function.listener(this._onNative,this,h);qx.bom.Event.addNativeListener(j,l,k);this._registeredEvents[h]={element:j,type:l,listener:k};}
,unregisterEvent:function(p,r,o){var s=this._registeredEvents;if(!s){return;}
;var t=qx.core.ObjectRegistry.toHashCode(p);var n=t+a+r;var q=this._registeredEvents[n];if(q){qx.bom.Event.removeNativeListener(p,r,q.listener);}
;delete this._registeredEvents[n];}
,_onNative:qx.event.GlobalError.observeMethod(function(v,u){var w=this._registeredEvents;if(!w){return;}
;var y=w[u];var x=this.constructor.CANCELABLE[y.type];qx.event.Registration.fireNonBubblingEvent(y.element,y.type,qx.event.type.Native,[v,undefined,undefined,undefined,x]);}
)},destruct:function(){var z;var A=this._registeredEvents;for(var B in A){z=A[B];qx.bom.Event.removeNativeListener(z.element,z.type,z.listener);}
;this._manager=this._registeredEvents=null;}
,defer:function(C){qx.event.Registration.addHandler(C);}
});}
)();
(function(){var a="qx.event.handler.UserAction";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(b){qx.core.Object.call(this);this.__ff=b;this.__lG=b.getWindow();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{useraction:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__ff:null,__lG:null,canHandleEvent:function(d,c){}
,registerEvent:function(g,f,e){}
,unregisterEvent:function(j,i,h){}
},destruct:function(){this.__ff=this.__lG=null;}
,defer:function(k){qx.event.Registration.addHandler(k);}
});}
)();
(function(){var a="dblclick",b="os.name",c="mouseup",d="mousedown",e="useraction",f="webkit",g="contextmenu",h="mousewheel",i="engine.name",j="mouseover",k="mouseout",l="gecko",m="ios",n="click",o="mousemove",p="qx.event.handler.Mouse",q="on";qx.Class.define(p,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(r){qx.core.Object.call(this);this.__ff=r;this.__lG=r.getWindow();this.__k=this.__lG.document;this._initButtonObserver();this._initMoveObserver();this._initWheelObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT+qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__yY:null,__za:null,__zb:null,__zc:null,__zd:null,__ff:null,__lG:null,__k:null,__ze:null,canHandleEvent:function(t,s){}
,registerEvent:qx.core.Environment.get(b)===m?function(w,v,u){w[q+v]=(function(){return null;}
);}
:(function(){return null;}
),unregisterEvent:qx.core.Environment.get(b)===m?function(z,y,x){z[q+y]=undefined;}
:(function(){return null;}
),__sl:function(A,B,C){if(!C){C=qx.bom.Event.getTarget(A);}
;if(C&&C.nodeType){qx.event.Registration.fireEvent(C,B||A.type,B==h?qx.event.type.MouseWheel:qx.event.type.Mouse,[A,C,null,true,true]);}
;qx.event.Registration.fireEvent(this.__lG,e,qx.event.type.Data,[B||A.type]);}
,preventNextClick:function(){this.__ze=true;}
,_initButtonObserver:function(){this.__yY=qx.lang.Function.listener(this._onButtonEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__k,d,this.__yY);Event.addNativeListener(this.__k,c,this.__yY);Event.addNativeListener(this.__k,n,this.__yY);Event.addNativeListener(this.__k,a,this.__yY);Event.addNativeListener(this.__k,g,this.__yY);}
,_initMoveObserver:function(){this.__za=qx.lang.Function.listener(this._onMoveEvent,this);var Event=qx.bom.Event;Event.addNativeListener(this.__k,o,this.__za);Event.addNativeListener(this.__k,j,this.__za);Event.addNativeListener(this.__k,k,this.__za);}
,_initWheelObserver:function(){this.__zb=qx.lang.Function.listener(this._onWheelEvent,this);var D=qx.bom.client.Event.getMouseWheel(this.__lG);qx.bom.Event.addNativeListener(D.target,D.type,this.__zb);}
,_stopButtonObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__k,d,this.__yY);Event.removeNativeListener(this.__k,c,this.__yY);Event.removeNativeListener(this.__k,n,this.__yY);Event.removeNativeListener(this.__k,a,this.__yY);Event.removeNativeListener(this.__k,g,this.__yY);}
,_stopMoveObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__k,o,this.__za);Event.removeNativeListener(this.__k,j,this.__za);Event.removeNativeListener(this.__k,k,this.__za);}
,_stopWheelObserver:function(){var E=qx.bom.client.Event.getMouseWheel(this.__lG);qx.bom.Event.removeNativeListener(E.target,E.type,this.__zb);}
,_onMoveEvent:qx.event.GlobalError.observeMethod(function(F){this.__sl(F);}
),_onButtonEvent:qx.event.GlobalError.observeMethod(function(I){var H=I.type;var J=qx.bom.Event.getTarget(I);if(H==n&&this.__ze){delete this.__ze;return;}
;if(qx.core.Environment.get(i)==l||qx.core.Environment.get(i)==f){if(J&&J.nodeType==3){J=J.parentNode;}
;}
;var G=qx.event.handler.DragDrop&&this.__ff.getHandler(qx.event.handler.DragDrop).isSessionActive();if(G&&H==n){return;}
;if(this.__zg){this.__zg(I,H,J);}
;this.__sl(I,H,J);if(this.__zf){this.__zf(I,H,J);}
;if(this.__zh&&!G){this.__zh(I,H,J);}
;this.__zc=H;}
),_onWheelEvent:qx.event.GlobalError.observeMethod(function(K){this.__sl(K,h);}
),__zf:qx.core.Environment.select(i,{"opera":function(L,M,N){if(M==c&&L.button==2){this.__sl(L,g,N);}
;}
,"default":null}),__zg:qx.core.Environment.select(i,{"mshtml":function(O,P,Q){if(O.target!==undefined){return;}
;if(P==c&&this.__zc==n){this.__sl(O,d,Q);}
else if(P==a){this.__sl(O,n,Q);}
;}
,"default":null}),__zh:qx.core.Environment.select(i,{"mshtml":null,"default":function(S,R,T){switch(R){case d:this.__zd=T;break;case c:if(T!==this.__zd){var U=qx.dom.Hierarchy.getCommonParent(T,this.__zd);if(U){this.__sl(S,n,U);}
;}
;};}
})},destruct:function(){this._stopButtonObserver();this._stopMoveObserver();this._stopWheelObserver();this.__ff=this.__lG=this.__k=this.__zd=null;}
,defer:function(V){qx.event.Registration.addHandler(V);}
});}
)();
(function(){var a="qx.event.type.MouseWheel";qx.Class.define(a,{extend:qx.event.type.Mouse,members:{stop:function(){this.stopPropagation();this.preventDefault();}
,getWheelDelta:function(b){return qx.util.Wheel.getDelta(this._native,b);}
}});}
)();
(function(){var a="qx.dom.Hierarchy",b="previousSibling",c="html.element.contains",d="html.element.compareDocumentPosition",e="nextSibling",f="parentNode",g="*";qx.Bootstrap.define(a,{statics:{getNodeIndex:function(h){var i=0;while(h&&(h=h.previousSibling)){i++ ;}
;return i;}
,getElementIndex:function(l){var j=0;var k=qx.dom.Node.ELEMENT;while(l&&(l=l.previousSibling)){if(l.nodeType==k){j++ ;}
;}
;return j;}
,getNextElementSibling:function(m){while(m&&(m=m.nextSibling)&&!qx.dom.Node.isElement(m)){continue;}
;return m||null;}
,getPreviousElementSibling:function(n){while(n&&(n=n.previousSibling)&&!qx.dom.Node.isElement(n)){continue;}
;return n||null;}
,contains:function(q,p){if(qx.core.Environment.get(c)){if(qx.dom.Node.isDocument(q)){var o=qx.dom.Node.getDocument(p);return q&&o==q;}
else if(qx.dom.Node.isDocument(p)){return false;}
else {return q.contains(p);}
;}
else if(qx.core.Environment.get(d)){return !!(q.compareDocumentPosition(p)&16);}
else {while(p){if(q==p){return true;}
;p=p.parentNode;}
;return false;}
;}
,isRendered:function(s){var r=s.ownerDocument||s.document;if(qx.core.Environment.get(c)){if(!s.parentNode){return false;}
;return r.body.contains(s);}
else if(qx.core.Environment.get(d)){return !!(r.compareDocumentPosition(s)&16);}
else {while(s){if(s==r.body){return true;}
;s=s.parentNode;}
;return false;}
;}
,isDescendantOf:function(u,t){return this.contains(t,u);}
,getCommonParent:function(w,x){if(w===x){return w;}
;if(qx.core.Environment.get(c)){while(w&&qx.dom.Node.isElement(w)){if(w.contains(x)){return w;}
;w=w.parentNode;}
;return null;}
else {var v=[];while(w||x){if(w){if(qx.lang.Array.contains(v,w)){return w;}
;v.push(w);w=w.parentNode;}
;if(x){if(qx.lang.Array.contains(v,x)){return x;}
;v.push(x);x=x.parentNode;}
;}
;return null;}
;}
,getAncestors:function(y){return this._recursivelyCollect(y,f);}
,getChildElements:function(A){A=A.firstChild;if(!A){return [];}
;var z=this.getNextSiblings(A);if(A.nodeType===1){z.unshift(A);}
;return z;}
,getDescendants:function(B){return qx.lang.Array.fromCollection(B.getElementsByTagName(g));}
,getFirstDescendant:function(C){C=C.firstChild;while(C&&C.nodeType!=1){C=C.nextSibling;}
;return C;}
,getLastDescendant:function(D){D=D.lastChild;while(D&&D.nodeType!=1){D=D.previousSibling;}
;return D;}
,getPreviousSiblings:function(E){return this._recursivelyCollect(E,b);}
,getNextSiblings:function(F){return this._recursivelyCollect(F,e);}
,_recursivelyCollect:function(I,G){var H=[];while(I=I[G]){if(I.nodeType==1){H.push(I);}
;}
;return H;}
,getSiblings:function(J){return this.getPreviousSiblings(J).reverse().concat(this.getNextSiblings(J));}
,isEmpty:function(K){K=K.firstChild;while(K){if(K.nodeType===qx.dom.Node.ELEMENT||K.nodeType===qx.dom.Node.TEXT){return false;}
;K=K.nextSibling;}
;return true;}
,cleanWhitespace:function(N){var L=N.firstChild;while(L){var M=L.nextSibling;if(L.nodeType==3&&!/\S/.test(L.nodeValue)){N.removeChild(L);}
;L=M;}
;}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="keypress",d="useraction",e="win",f="text",g="keyinput",h="os.name",i="webkit",j="input",k="gecko",l="off",m="keydown",n="autoComplete",o="keyup",p="qx.event.handler.Keyboard";qx.Class.define(p,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(q){qx.core.Object.call(this);this.__ff=q;this.__lG=q.getWindow();if((qx.core.Environment.get(b)==k)){this.__k=this.__lG;}
else {this.__k=this.__lG.document.documentElement;}
;this.__uN={};this._initKeyObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{keyup:1,keydown:1,keypress:1,keyinput:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{__uO:null,__ff:null,__lG:null,__k:null,__uN:null,__uP:null,__uQ:null,__uR:null,canHandleEvent:function(s,r){}
,registerEvent:function(v,u,t){}
,unregisterEvent:function(y,x,w){}
,_fireInputEvent:function(A,z){var B=this.__uS();if(B&&B.offsetWidth!=0){var event=qx.event.Registration.createEvent(g,qx.event.type.KeyInput,[A,B,z]);this.__ff.dispatchEvent(B,event);}
;if(this.__lG){qx.event.Registration.fireEvent(this.__lG,d,qx.event.type.Data,[g]);}
;}
,_fireSequenceEvent:function(D,F,C){var E=this.__uS();var G=D.keyCode;var event=qx.event.Registration.createEvent(F,qx.event.type.KeySequence,[D,E,C]);this.__ff.dispatchEvent(E,event);if(qx.core.Environment.get(b)==a||qx.core.Environment.get(b)==i){if(F==m&&event.getDefaultPrevented()){if(!qx.event.util.Keyboard.isNonPrintableKeyCode(G)&&!this._emulateKeyPress[G]){this._fireSequenceEvent(D,c,C);}
;}
;}
;if(this.__lG){qx.event.Registration.fireEvent(this.__lG,d,qx.event.type.Data,[F]);}
;}
,__uS:function(){var H=this.__ff.getHandler(qx.event.handler.Focus);var I=H.getActive();if(!I||I.offsetWidth==0){I=H.getFocus();}
;if(!I||I.offsetWidth==0){I=this.__ff.getWindow().document.body;}
;return I;}
,_initKeyObserver:function(){this.__uO=qx.lang.Function.listener(this.__uT,this);this.__uR=qx.lang.Function.listener(this.__ne,this);var Event=qx.bom.Event;Event.addNativeListener(this.__k,o,this.__uO);Event.addNativeListener(this.__k,m,this.__uO);Event.addNativeListener(this.__k,c,this.__uR);}
,_stopKeyObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__k,o,this.__uO);Event.removeNativeListener(this.__k,m,this.__uO);Event.removeNativeListener(this.__k,c,this.__uR);for(var K in (this.__uQ||{})){var J=this.__uQ[K];Event.removeNativeListener(J.target,c,J.callback);}
;delete (this.__uQ);}
,__uT:qx.event.GlobalError.observeMethod(qx.core.Environment.select(b,{"mshtml":function(N){N=window.event||N;var O=N.keyCode;var M=0;var L=N.type;if(!(this.__uN[O]==m&&L==m)){this._idealKeyHandler(O,M,L,N);}
;if(L==m){if(qx.event.util.Keyboard.isNonPrintableKeyCode(O)||this._emulateKeyPress[O]){this._idealKeyHandler(O,M,c,N);}
;}
;this.__uN[O]=L;}
,"gecko":function(Q){var S=0;var U=Q.keyCode;var T=Q.type;var R=qx.event.util.Keyboard;if(qx.core.Environment.get(h)==e){var P=U?R.keyCodeToIdentifier(U):R.charCodeToIdentifier(S);if(!(this.__uN[P]==m&&T==m)){this._idealKeyHandler(U,S,T,Q);}
;this.__uN[P]=T;}
else {this._idealKeyHandler(U,S,T,Q);}
;this.__uU(Q.target,T,U);}
,"webkit":function(X){var Y=0;var W=0;var V=X.type;Y=X.keyCode;this._idealKeyHandler(Y,W,V,X);if(V==m){if(qx.event.util.Keyboard.isNonPrintableKeyCode(Y)||this._emulateKeyPress[Y]){this._idealKeyHandler(Y,W,c,X);}
;}
;this.__uN[Y]=V;}
,"opera":function(ba){this.__uP=ba.keyCode;this._idealKeyHandler(ba.keyCode,0,ba.type,ba);}
})),__uU:qx.core.Environment.select(b,{"gecko":function(bc,be,bf){if(be===m&&(bf==33||bf==34||bf==38||bf==40)&&bc.type==f&&bc.tagName.toLowerCase()===j&&bc.getAttribute(n)!==l){if(!this.__uQ){this.__uQ={};}
;var bb=qx.core.ObjectRegistry.toHashCode(bc);if(this.__uQ[bb]){return;}
;var self=this;this.__uQ[bb]={target:bc,callback:function(bg){qx.bom.Event.stopPropagation(bg);self.__ne(bg);}
};var bd=qx.event.GlobalError.observeMethod(this.__uQ[bb].callback);qx.bom.Event.addNativeListener(bc,c,bd);}
;}
,"default":null}),__ne:qx.event.GlobalError.observeMethod(qx.core.Environment.select(b,{"mshtml":function(bh){bh=window.event||bh;if(this._charCode2KeyCode[bh.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bh.keyCode],0,bh.type,bh);}
else {this._idealKeyHandler(0,bh.keyCode,bh.type,bh);}
;}
,"gecko":function(bi){var bj=bi.charCode;var bk=bi.type;this._idealKeyHandler(bi.keyCode,bj,bk,bi);}
,"webkit":function(bl){if(this._charCode2KeyCode[bl.keyCode]){this._idealKeyHandler(this._charCode2KeyCode[bl.keyCode],0,bl.type,bl);}
else {this._idealKeyHandler(0,bl.keyCode,bl.type,bl);}
;}
,"opera":function(bm){var bo=bm.keyCode;var bn=bm.type;if(bo!=this.__uP){this._idealKeyHandler(0,this.__uP,bn,bm);}
else {if(qx.event.util.Keyboard.keyCodeToIdentifierMap[bm.keyCode]){this._idealKeyHandler(bm.keyCode,0,bm.type,bm);}
else {this._idealKeyHandler(0,bm.keyCode,bm.type,bm);}
;}
;}
})),_idealKeyHandler:function(bs,bq,bt,br){var bp;if(bs||(!bs&&!bq)){bp=qx.event.util.Keyboard.keyCodeToIdentifier(bs);this._fireSequenceEvent(br,bt,bp);}
else {bp=qx.event.util.Keyboard.charCodeToIdentifier(bq);this._fireSequenceEvent(br,c,bp);this._fireInputEvent(br,bq);}
;}
,_emulateKeyPress:qx.core.Environment.select(b,{"mshtml":{'8':true,'9':true},"webkit":{'8':true,'9':true,'27':true},"default":{}}),_identifierToKeyCode:function(bu){return qx.event.util.Keyboard.identifierToKeyCodeMap[bu]||bu.charCodeAt(0);}
},destruct:function(){this._stopKeyObserver();this.__uP=this.__ff=this.__lG=this.__k=this.__uN=null;}
,defer:function(bv,bw){qx.event.Registration.addHandler(bv);if((qx.core.Environment.get(b)==a)||qx.core.Environment.get(b)==i){bw._charCode2KeyCode={'13':13,'27':27};}
;}
});}
)();
(function(){var a="qx.event.type.KeyInput";qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(c,d,b){qx.event.type.Dom.prototype.init.call(this,c,d,null,true,true);this._charCode=b;return this;}
,clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);f._charCode=this._charCode;return f;}
,getCharCode:function(){return this._charCode;}
,getChar:function(){return String.fromCharCode(this._charCode);}
}});}
)();
(function(){var a="qx.event.type.KeySequence";qx.Class.define(a,{extend:qx.event.type.Dom,members:{init:function(c,d,b){qx.event.type.Dom.prototype.init.call(this,c,d,null,true,true);this._keyCode=c.keyCode;this._identifier=b;return this;}
,clone:function(e){var f=qx.event.type.Dom.prototype.clone.call(this,e);f._keyCode=this._keyCode;f._identifier=this._identifier;return f;}
,getKeyIdentifier:function(){return this._identifier;}
,getKeyCode:function(){return this._keyCode;}
,isPrintable:function(){return qx.event.util.Keyboard.isPrintableKeyIdentifier(this._identifier);}
}});}
)();
(function(){var a="-",b="PageUp",c="Escape",d="Enter",e="+",f="PrintScreen",g="os.name",h="7",i="A",j="Space",k="Left",l="5",m="F5",n="Down",o="Up",p="3",q="Meta",r="F11",s="0",t="F6",u="PageDown",v="osx",w="CapsLock",x="Insert",y="F8",z="Scroll",A="Control",B="Tab",C="Shift",D="End",E="Pause",F="Unidentified",G="/",H="8",I="Z",J="*",K="cmd",L="F1",M="F4",N="Home",O="qx.event.util.Keyboard",P="F2",Q="6",R="F7",S="Apps",T="4",U="F12",V="Alt",W="2",X="NumLock",Y="Delete",bn="1",bo="Win",bp="Backspace",bj="F9",bk="F10",bl="Right",bm="F3",bq="9",br=",";qx.Bootstrap.define(O,{statics:{specialCharCodeMap:{'8':bp,'9':B,'13':d,'27':c,'32':j},numpadToCharCode:{'96':s.charCodeAt(0),'97':bn.charCodeAt(0),'98':W.charCodeAt(0),'99':p.charCodeAt(0),'100':T.charCodeAt(0),'101':l.charCodeAt(0),'102':Q.charCodeAt(0),'103':h.charCodeAt(0),'104':H.charCodeAt(0),'105':bq.charCodeAt(0),'106':J.charCodeAt(0),'107':e.charCodeAt(0),'109':a.charCodeAt(0),'110':br.charCodeAt(0),'111':G.charCodeAt(0)},keyCodeToIdentifierMap:{'16':C,'17':A,'18':V,'20':w,'224':q,'37':k,'38':o,'39':bl,'40':n,'33':b,'34':u,'35':D,'36':N,'45':x,'46':Y,'112':L,'113':P,'114':bm,'115':M,'116':m,'117':t,'118':R,'119':y,'120':bj,'121':bk,'122':r,'123':U,'144':X,'44':f,'145':z,'19':E,'91':qx.core.Environment.get(g)==v?K:bo,'92':bo,'93':qx.core.Environment.get(g)==v?K:S},charCodeA:i.charCodeAt(0),charCodeZ:I.charCodeAt(0),charCode0:s.charCodeAt(0),charCode9:bq.charCodeAt(0),keyCodeToIdentifier:function(bs){if(this.isIdentifiableKeyCode(bs)){var bt=this.numpadToCharCode[bs];if(bt){return String.fromCharCode(bt);}
;return (this.keyCodeToIdentifierMap[bs]||this.specialCharCodeMap[bs]||String.fromCharCode(bs));}
else {return F;}
;}
,charCodeToIdentifier:function(bu){return this.specialCharCodeMap[bu]||String.fromCharCode(bu).toUpperCase();}
,isIdentifiableKeyCode:function(bv){if(bv>=this.charCodeA&&bv<=this.charCodeZ){return true;}
;if(bv>=this.charCode0&&bv<=this.charCode9){return true;}
;if(this.specialCharCodeMap[bv]){return true;}
;if(this.numpadToCharCode[bv]){return true;}
;if(this.isNonPrintableKeyCode(bv)){return true;}
;return false;}
,isNonPrintableKeyCode:function(bw){return this.keyCodeToIdentifierMap[bw]?true:false;}
,isValidKeyIdentifier:function(bx){if(this.identifierToKeyCodeMap[bx]){return true;}
;if(bx.length!=1){return false;}
;if(bx>=s&&bx<=bq){return true;}
;if(bx>=i&&bx<=I){return true;}
;switch(bx){case e:case a:case J:case G:case br:return true;default:return false;};}
,isPrintableKeyIdentifier:function(by){if(by===j){return true;}
else {return this.identifierToKeyCodeMap[by]?false:true;}
;}
},defer:function(bz){if(!bz.identifierToKeyCodeMap){bz.identifierToKeyCodeMap={};for(var bA in bz.keyCodeToIdentifierMap){bz.identifierToKeyCodeMap[bz.keyCodeToIdentifierMap[bA]]=parseInt(bA,10);}
;for(var bA in bz.specialCharCodeMap){bz.identifierToKeyCodeMap[bz.specialCharCodeMap[bA]]=parseInt(bA,10);}
;}
;}
});}
)();
(function(){var a="selectstart",b="os.name",c="blur",d="mousedown",e="function",f="focus",g="os.version",h="qx.event.handler.Focus",i="_applyFocus",j="DOMFocusIn",k="deactivate",l="textarea",m="_applyActive",n='character',o="input",p="ios",q="",r="qxSelectable",s="tabIndex",t="off",u="on",v="activate",w="focusin",x="mshtml",y="engine.name",z="mouseup",A="DOMFocusOut",B="focusout",C="qxKeepFocus",D="draggesture",E="qxKeepActive";qx.Class.define(h,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(F){qx.core.Object.call(this);this._manager=F;this._window=F.getWindow();this._document=this._window.document;this._root=this._document.documentElement;this._body=this._document.body;if((qx.core.Environment.get(b)==p&&parseFloat(qx.core.Environment.get(g))>6)&&(!qx.application.Inline||!qx.core.Init.getApplication() instanceof qx.application.Inline)){this.__uV=true;}
;this._initObserver();}
,properties:{active:{apply:m,nullable:true},focus:{apply:i,nullable:true}},statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{focus:1,blur:1,focusin:1,focusout:1,activate:1,deactivate:1},IGNORE_CAN_HANDLE:true,FOCUSABLE_ELEMENTS:qx.core.Environment.select(y,{"mshtml":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"gecko":{a:1,body:1,button:1,frame:1,iframe:1,img:1,input:1,object:1,select:1,textarea:1},"opera":{button:1,input:1,select:1,textarea:1},"webkit":{button:1,input:1,select:1,textarea:1}})},members:{__uW:null,__uX:null,__uY:null,__va:null,__vb:null,__vc:null,__vd:null,__ve:null,__vf:null,__vg:null,__vh:q,__vi:q,__uV:false,__vj:null,canHandleEvent:function(H,G){}
,registerEvent:function(K,J,I){}
,unregisterEvent:function(N,M,L){}
,focus:function(O){if((qx.core.Environment.get(y)==x)){window.setTimeout(function(){try{O.focus();var P=qx.bom.Selection.get(O);if(P.length==0&&typeof O.createTextRange==e){var Q=O.createTextRange();Q.moveStart(n,O.value.length);Q.collapse();Q.select();}
;}
catch(R){}
;}
,0);}
else {try{O.focus();}
catch(S){}
;}
;this.setFocus(O);this.setActive(O);}
,activate:function(T){this.setActive(T);}
,blur:function(U){try{U.blur();}
catch(V){}
;if(this.getActive()===U){this.resetActive();}
;if(this.getFocus()===U){this.resetFocus();}
;}
,deactivate:function(W){if(this.getActive()===W){this.resetActive();}
;}
,tryActivate:function(Y){var X=this.__vx(Y);if(X){this.setActive(X);}
;}
,__sl:function(ba,bc,bf,be){var bd=qx.event.Registration;var bb=bd.createEvent(bf,qx.event.type.Focus,[ba,bc,be]);bd.dispatchEvent(ba,bb);}
,_windowFocused:true,__vk:function(){if(this._windowFocused){this._windowFocused=false;this.__sl(this._window,null,c,false);}
;}
,__vl:function(){if(!this._windowFocused){this._windowFocused=true;this.__sl(this._window,null,f,false);}
;}
,_initObserver:qx.core.Environment.select(y,{"gecko":function(){this.__uW=qx.lang.Function.listener(this.__vr,this);this.__uX=qx.lang.Function.listener(this.__vs,this);this.__uY=qx.lang.Function.listener(this.__vq,this);this.__va=qx.lang.Function.listener(this.__vp,this);this.__vb=qx.lang.Function.listener(this.__vm,this);qx.bom.Event.addNativeListener(this._document,d,this.__uW,true);qx.bom.Event.addNativeListener(this._document,z,this.__uX,true);qx.bom.Event.addNativeListener(this._window,f,this.__uY,true);qx.bom.Event.addNativeListener(this._window,c,this.__va,true);qx.bom.Event.addNativeListener(this._window,D,this.__vb,true);}
,"mshtml":function(){this.__uW=qx.lang.Function.listener(this.__vr,this);this.__uX=qx.lang.Function.listener(this.__vs,this);this.__vd=qx.lang.Function.listener(this.__vn,this);this.__ve=qx.lang.Function.listener(this.__vo,this);this.__vc=qx.lang.Function.listener(this.__vu,this);qx.bom.Event.addNativeListener(this._document,d,this.__uW);qx.bom.Event.addNativeListener(this._document,z,this.__uX);qx.bom.Event.addNativeListener(this._document,w,this.__vd);qx.bom.Event.addNativeListener(this._document,B,this.__ve);qx.bom.Event.addNativeListener(this._document,a,this.__vc);}
,"webkit":function(){this.__uW=qx.lang.Function.listener(this.__vr,this);this.__uX=qx.lang.Function.listener(this.__vs,this);this.__ve=qx.lang.Function.listener(this.__vo,this);this.__uY=qx.lang.Function.listener(this.__vq,this);this.__va=qx.lang.Function.listener(this.__vp,this);this.__vc=qx.lang.Function.listener(this.__vu,this);qx.bom.Event.addNativeListener(this._document,d,this.__uW,true);qx.bom.Event.addNativeListener(this._document,z,this.__uX,true);qx.bom.Event.addNativeListener(this._document,a,this.__vc,false);qx.bom.Event.addNativeListener(this._window,A,this.__ve,true);qx.bom.Event.addNativeListener(this._window,f,this.__uY,true);qx.bom.Event.addNativeListener(this._window,c,this.__va,true);}
,"opera":function(){this.__uW=qx.lang.Function.listener(this.__vr,this);this.__uX=qx.lang.Function.listener(this.__vs,this);this.__vd=qx.lang.Function.listener(this.__vn,this);this.__ve=qx.lang.Function.listener(this.__vo,this);qx.bom.Event.addNativeListener(this._document,d,this.__uW,true);qx.bom.Event.addNativeListener(this._document,z,this.__uX,true);qx.bom.Event.addNativeListener(this._window,j,this.__vd,true);qx.bom.Event.addNativeListener(this._window,A,this.__ve,true);}
}),_stopObserver:qx.core.Environment.select(y,{"gecko":function(){qx.bom.Event.removeNativeListener(this._document,d,this.__uW,true);qx.bom.Event.removeNativeListener(this._document,z,this.__uX,true);qx.bom.Event.removeNativeListener(this._window,f,this.__uY,true);qx.bom.Event.removeNativeListener(this._window,c,this.__va,true);qx.bom.Event.removeNativeListener(this._window,D,this.__vb,true);}
,"mshtml":function(){qx.bom.Event.removeNativeListener(this._document,d,this.__uW);qx.bom.Event.removeNativeListener(this._document,z,this.__uX);qx.bom.Event.removeNativeListener(this._document,w,this.__vd);qx.bom.Event.removeNativeListener(this._document,B,this.__ve);qx.bom.Event.removeNativeListener(this._document,a,this.__vc);}
,"webkit":function(){qx.bom.Event.removeNativeListener(this._document,d,this.__uW,true);qx.bom.Event.removeNativeListener(this._document,z,this.__uX,true);qx.bom.Event.removeNativeListener(this._document,a,this.__vc,false);qx.bom.Event.removeNativeListener(this._window,A,this.__ve,true);qx.bom.Event.removeNativeListener(this._window,f,this.__uY,true);qx.bom.Event.removeNativeListener(this._window,c,this.__va,true);}
,"opera":function(){qx.bom.Event.removeNativeListener(this._document,d,this.__uW,true);qx.bom.Event.removeNativeListener(this._document,z,this.__uX,true);qx.bom.Event.removeNativeListener(this._window,j,this.__vd,true);qx.bom.Event.removeNativeListener(this._window,A,this.__ve,true);}
}),__vm:qx.event.GlobalError.observeMethod(qx.core.Environment.select(y,{"gecko":function(bg){var bh=qx.bom.Event.getTarget(bg);if(!this.__vy(bh)){qx.bom.Event.preventDefault(bg);}
;}
,"default":null})),__vn:qx.event.GlobalError.observeMethod(qx.core.Environment.select(y,{"mshtml":function(bj){this.__vl();var bk=qx.bom.Event.getTarget(bj);var bi=this.__vw(bk);if(bi){this.setFocus(bi);}
;this.tryActivate(bk);}
,"opera":function(bl){var bm=qx.bom.Event.getTarget(bl);if(bm==this._document||bm==this._window){this.__vl();if(this.__vf){this.setFocus(this.__vf);delete this.__vf;}
;if(this.__vg){this.setActive(this.__vg);delete this.__vg;}
;}
else {this.setFocus(bm);this.tryActivate(bm);if(!this.__vy(bm)){bm.selectionStart=0;bm.selectionEnd=0;}
;}
;}
,"default":null})),__vo:qx.event.GlobalError.observeMethod(qx.core.Environment.select(y,{"mshtml":function(bn){var bo=qx.bom.Event.getRelatedTarget(bn);if(bo==null){this.__vk();this.resetFocus();this.resetActive();}
;}
,"webkit":function(bp){var bq=qx.bom.Event.getTarget(bp);if(bq===this.getFocus()){this.resetFocus();}
;if(bq===this.getActive()){this.resetActive();}
;}
,"opera":function(br){var bs=qx.bom.Event.getTarget(br);if(bs==this._document){this.__vk();this.__vf=this.getFocus();this.__vg=this.getActive();this.resetFocus();this.resetActive();}
else {if(bs===this.getFocus()){this.resetFocus();}
;if(bs===this.getActive()){this.resetActive();}
;}
;}
,"default":null})),__vp:qx.event.GlobalError.observeMethod(qx.core.Environment.select(y,{"gecko":function(bt){var bu=qx.bom.Event.getTarget(bt);if(bu===this._window||bu===this._document){this.__vk();this.resetActive();this.resetFocus();}
;}
,"webkit":function(bv){var bw=qx.bom.Event.getTarget(bv);if(bw===this._window||bw===this._document){this.__vk();this.__vf=this.getFocus();this.__vg=this.getActive();this.resetActive();this.resetFocus();}
;}
,"default":null})),__vq:qx.event.GlobalError.observeMethod(qx.core.Environment.select(y,{"gecko":function(bx){var by=qx.bom.Event.getTarget(bx);if(by===this._window||by===this._document){this.__vl();by=this._body;}
;this.setFocus(by);this.tryActivate(by);}
,"webkit":function(bz){var bA=qx.bom.Event.getTarget(bz);if(bA===this._window||bA===this._document){this.__vl();if(this.__vf){this.setFocus(this.__vf);delete this.__vf;}
;if(this.__vg){this.setActive(this.__vg);delete this.__vg;}
;}
else {this.__vj=bz.relatedTarget;this.setFocus(bA);this.__vj=null;this.tryActivate(bA);}
;}
,"default":null})),__vr:qx.event.GlobalError.observeMethod(qx.core.Environment.select(y,{"mshtml":function(bC){var bD=qx.bom.Event.getTarget(bC);var bB=this.__vw(bD);if(bB){if(!this.__vy(bD)){bD.unselectable=u;try{if(document.selection){document.selection.empty();}
;}
catch(bE){}
;try{bB.focus();}
catch(bF){}
;}
;}
else {qx.bom.Event.preventDefault(bC);if(!this.__vy(bD)){bD.unselectable=u;}
;}
;}
,"webkit":function(bH){var bI=qx.bom.Event.getTarget(bH);var bG=this.__vw(bI);if(bG){this.setFocus(bG);}
else {qx.bom.Event.preventDefault(bH);}
;}
,"gecko":function(bK){var bL=qx.bom.Event.getTarget(bK);var bJ=this.__vw(bL);if(bJ){this.setFocus(bJ);}
else {qx.bom.Event.preventDefault(bK);}
;}
,"opera":function(bO){var bP=qx.bom.Event.getTarget(bO);var bM=this.__vw(bP);if(!this.__vy(bP)){qx.bom.Event.preventDefault(bO);if(bM){var bN=this.getFocus();if(bN&&bN.selectionEnd){bN.selectionStart=0;bN.selectionEnd=0;bN.blur();}
;if(bM){this.setFocus(bM);}
;}
;}
else if(bM){this.setFocus(bM);}
;}
,"default":null})),__vs:qx.event.GlobalError.observeMethod(qx.core.Environment.select(y,{"mshtml":function(bQ){var bR=qx.bom.Event.getTarget(bQ);if(bR.unselectable){bR.unselectable=t;}
;this.tryActivate(this.__vt(bR));}
,"gecko":function(bS){var bT=qx.bom.Event.getTarget(bS);while(bT&&bT.offsetWidth===undefined){bT=bT.parentNode;}
;if(bT){this.tryActivate(bT);}
;}
,"webkit":function(bU){var bV=qx.bom.Event.getTarget(bU);this.tryActivate(this.__vt(bV));}
,"opera":function(bW){var bX=qx.bom.Event.getTarget(bW);this.tryActivate(this.__vt(bX));}
,"default":null})),__vt:qx.event.GlobalError.observeMethod(qx.core.Environment.select(y,{"mshtml":function(bY){var ca=this.getFocus();if(ca&&bY!=ca&&(ca.nodeName.toLowerCase()===o||ca.nodeName.toLowerCase()===l)){bY=ca;}
;return bY;}
,"webkit":function(cb){var cc=this.getFocus();if(cc&&cb!=cc&&(cc.nodeName.toLowerCase()===o||cc.nodeName.toLowerCase()===l)){cb=cc;}
;return cb;}
,"default":function(cd){return cd;}
})),__vu:qx.event.GlobalError.observeMethod(qx.core.Environment.select(y,{"mshtml":function(ce){var cf=qx.bom.Event.getTarget(ce);if(!this.__vy(cf)){qx.bom.Event.preventDefault(ce);}
;}
,"webkit":function(cg){var ch=qx.bom.Event.getTarget(cg);if(!this.__vy(ch)){qx.bom.Event.preventDefault(cg);}
;}
,"default":null})),__vv:function(ci){var cj=qx.bom.element.Attribute.get(ci,s);if(cj>=1){return true;}
;var ck=qx.event.handler.Focus.FOCUSABLE_ELEMENTS;if(cj>=0&&ck[ci.tagName]){return true;}
;return false;}
,__vw:function(cl){while(cl&&cl.nodeType===1){if(cl.getAttribute(C)==u){return null;}
;if(this.__vv(cl)){return cl;}
;cl=cl.parentNode;}
;return this._body;}
,__vx:function(cm){var cn=cm;while(cm&&cm.nodeType===1){if(cm.getAttribute(E)==u){return null;}
;cm=cm.parentNode;}
;return cn;}
,__vy:function(co){while(co&&co.nodeType===1){var cp=co.getAttribute(r);if(cp!=null){return cp===u;}
;co=co.parentNode;}
;return true;}
,_applyActive:function(cr,cq){if(cq){this.__sl(cq,cr,k,true);}
;if(cr){this.__sl(cr,cq,v,true);}
;if(this.__uV){window.scrollTo(0,0);}
;}
,_applyFocus:function(ct,cs){if(cs){this.__sl(cs,ct,B,true);}
;if(ct){this.__sl(ct,cs,w,true);}
;if(cs){this.__sl(cs,ct,c,false);}
;if(ct){this.__sl(ct,cs||this.__vj,f,false);}
;}
},destruct:function(){this._stopObserver();this._manager=this._window=this._document=this._root=this._body=this.__vz=this.__vj=null;}
,defer:function(cv){qx.event.Registration.addHandler(cv);var cw=cv.FOCUSABLE_ELEMENTS;for(var cu in cw){cw[cu.toUpperCase()]=1;}
;}
});}
)();
(function(){var a="engine.name",b="qx.bom.Selection",c="character",d="button",e='character',f="#text",g="webkit",h="input",i="gecko",j="EndToEnd",k="opera",l="StartToStart",m="html.selection",n="textarea",o="body";qx.Bootstrap.define(b,{statics:{getSelectionObject:qx.core.Environment.select(m,{"selection":function(p){return p.selection;}
,"default":function(q){return qx.dom.Node.getWindow(q).getSelection();}
}),get:qx.core.Environment.select(m,{"selection":function(r){var s=qx.bom.Range.get(qx.dom.Node.getDocument(r));return s.text;}
,"default":function(t){if(this.__vY(t)){return t.value.substring(t.selectionStart,t.selectionEnd);}
else {return this.getSelectionObject(qx.dom.Node.getDocument(t)).toString();}
;}
}),getLength:qx.core.Environment.select(m,{"selection":function(u){var w=this.get(u);var v=qx.util.StringSplit.split(w,/\r\n/);return w.length-(v.length-1);}
,"default":function(x){if(qx.core.Environment.get(a)==k){var B,C,A;if(this.__vY(x)){var z=x.selectionStart;var y=x.selectionEnd;B=x.value.substring(z,y);C=y-z;}
else {B=qx.bom.Selection.get(x);C=B.length;}
;A=qx.util.StringSplit.split(B,/\r\n/);return C-(A.length-1);}
;if(this.__vY(x)){return x.selectionEnd-x.selectionStart;}
else {return this.get(x).length;}
;}
}),getStart:qx.core.Environment.select(m,{"selection":function(D){if(this.__vY(D)){var I=qx.bom.Range.get();if(!D.contains(I.parentElement())){return -1;}
;var J=qx.bom.Range.get(D);var H=D.value.length;J.moveToBookmark(I.getBookmark());J.moveEnd(e,H);return H-J.text.length;}
else {var J=qx.bom.Range.get(D);var F=J.parentElement();var K=qx.bom.Range.get();try{K.moveToElementText(F);}
catch(M){return 0;}
;var E=qx.bom.Range.get(qx.dom.Node.getBodyElement(D));E.setEndPoint(l,J);E.setEndPoint(j,K);if(K.compareEndPoints(l,E)==0){return 0;}
;var G;var L=0;while(true){G=E.moveStart(c,-1);if(K.compareEndPoints(l,E)==0){break;}
;if(G==0){break;}
else {L++ ;}
;}
;return  ++L;}
;}
,"default":function(N){if(qx.core.Environment.get(a)===i||qx.core.Environment.get(a)===g){if(this.__vY(N)){return N.selectionStart;}
else {var P=qx.dom.Node.getDocument(N);var O=this.getSelectionObject(P);if(O.anchorOffset<O.focusOffset){return O.anchorOffset;}
else {return O.focusOffset;}
;}
;}
;if(this.__vY(N)){return N.selectionStart;}
else {return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(N)).anchorOffset;}
;}
}),getEnd:qx.core.Environment.select(m,{"selection":function(Q){if(this.__vY(Q)){var V=qx.bom.Range.get();if(!Q.contains(V.parentElement())){return -1;}
;var W=qx.bom.Range.get(Q);var U=Q.value.length;W.moveToBookmark(V.getBookmark());W.moveStart(e,-U);return W.text.length;}
else {var W=qx.bom.Range.get(Q);var S=W.parentElement();var X=qx.bom.Range.get();try{X.moveToElementText(S);}
catch(ba){return 0;}
;var U=X.text.length;var R=qx.bom.Range.get(qx.dom.Node.getBodyElement(Q));R.setEndPoint(j,W);R.setEndPoint(l,X);if(X.compareEndPoints(j,R)==0){return U-1;}
;var T;var Y=0;while(true){T=R.moveEnd(c,1);if(X.compareEndPoints(j,R)==0){break;}
;if(T==0){break;}
else {Y++ ;}
;}
;return U-( ++Y);}
;}
,"default":function(bb){if(qx.core.Environment.get(a)===i||qx.core.Environment.get(a)===g){if(this.__vY(bb)){return bb.selectionEnd;}
else {var bd=qx.dom.Node.getDocument(bb);var bc=this.getSelectionObject(bd);if(bc.focusOffset>bc.anchorOffset){return bc.focusOffset;}
else {return bc.anchorOffset;}
;}
;}
;if(this.__vY(bb)){return bb.selectionEnd;}
else {return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bb)).focusOffset;}
;}
}),__vY:function(be){return qx.dom.Node.isElement(be)&&(be.nodeName.toLowerCase()==h||be.nodeName.toLowerCase()==n);}
,set:qx.core.Environment.select(m,{"selection":function(bf,bi,bh){var bg;if(qx.dom.Node.isDocument(bf)){bf=bf.body;}
;if(qx.dom.Node.isElement(bf)||qx.dom.Node.isText(bf)){switch(bf.nodeName.toLowerCase()){case h:case n:case d:if(bh===undefined){bh=bf.value.length;}
;if(bi>=0&&bi<=bf.value.length&&bh>=0&&bh<=bf.value.length){bg=qx.bom.Range.get(bf);bg.collapse(true);bg.moveStart(c,bi);bg.moveEnd(c,bh-bi);bg.select();return true;}
;break;case f:if(bh===undefined){bh=bf.nodeValue.length;}
;if(bi>=0&&bi<=bf.nodeValue.length&&bh>=0&&bh<=bf.nodeValue.length){bg=qx.bom.Range.get(qx.dom.Node.getBodyElement(bf));bg.moveToElementText(bf.parentNode);bg.collapse(true);bg.moveStart(c,bi);bg.moveEnd(c,bh-bi);bg.select();return true;}
;break;default:if(bh===undefined){bh=bf.childNodes.length-1;}
;if(bf.childNodes[bi]&&bf.childNodes[bh]){bg=qx.bom.Range.get(qx.dom.Node.getBodyElement(bf));bg.moveToElementText(bf.childNodes[bi]);bg.collapse(true);var bj=qx.bom.Range.get(qx.dom.Node.getBodyElement(bf));bj.moveToElementText(bf.childNodes[bh]);bg.setEndPoint(j,bj);bg.select();return true;}
;};}
;return false;}
,"default":function(bk,bp,bm){var bn=bk.nodeName.toLowerCase();if(qx.dom.Node.isElement(bk)&&(bn==h||bn==n)){if(bm===undefined){bm=bk.value.length;}
;if(bp>=0&&bp<=bk.value.length&&bm>=0&&bm<=bk.value.length){bk.focus();bk.select();bk.setSelectionRange(bp,bm);return true;}
;}
else {var bq=false;var bl=qx.dom.Node.getWindow(bk).getSelection();var bo=qx.bom.Range.get(bk);if(qx.dom.Node.isText(bk)){if(bm===undefined){bm=bk.length;}
;if(bp>=0&&bp<bk.length&&bm>=0&&bm<=bk.length){bq=true;}
;}
else if(qx.dom.Node.isElement(bk)){if(bm===undefined){bm=bk.childNodes.length-1;}
;if(bp>=0&&bk.childNodes[bp]&&bm>=0&&bk.childNodes[bm]){bq=true;}
;}
else if(qx.dom.Node.isDocument(bk)){bk=bk.body;if(bm===undefined){bm=bk.childNodes.length-1;}
;if(bp>=0&&bk.childNodes[bp]&&bm>=0&&bk.childNodes[bm]){bq=true;}
;}
;if(bq){if(!bl.isCollapsed){bl.collapseToStart();}
;bo.setStart(bk,bp);if(qx.dom.Node.isText(bk)){bo.setEnd(bk,bm);}
else {bo.setEndAfter(bk.childNodes[bm]);}
;if(bl.rangeCount>0){bl.removeAllRanges();}
;bl.addRange(bo);return true;}
;}
;return false;}
}),setAll:function(br){return qx.bom.Selection.set(br,0);}
,clear:qx.core.Environment.select(m,{"selection":function(bs){var bu=qx.bom.Range.get(bs);var parent=bu.parentElement();var bv=qx.bom.Range.get(qx.dom.Node.getDocument(bs));if(qx.dom.Node.isText(bs)){bs=bs.parentNode;}
;if(parent==bv.parentElement()&&parent==bs){var bt=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bs));bt.empty();}
;}
,"default":function(bw){var bB=qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(bw));var bx=bw.nodeName.toLowerCase();if(qx.dom.Node.isElement(bw)&&(bx==h||bx==n)){bw.setSelectionRange(0,0);if(qx.bom.Element&&qx.bom.Element.blur){qx.bom.Element.blur(bw);}
;}
else if(qx.dom.Node.isDocument(bw)||bx==o){bB.collapse(bw.body?bw.body:bw,0);}
else {var by=qx.bom.Range.get(bw);if(!by.collapsed){var bz;var bA=by.commonAncestorContainer;if(qx.dom.Node.isElement(bw)&&qx.dom.Node.isText(bA)){bz=bA.parentNode;}
else {bz=bA;}
;if(bz==bw){bB.collapse(bw,0);}
;}
;}
;}
})}});}
)();
(function(){var a="qx.bom.Range",b="text",c="password",d="file",e="submit",f="reset",g="textarea",h="input",i="hidden",j="html.selection",k="button",l="body";qx.Bootstrap.define(a,{statics:{get:qx.core.Environment.select(j,{"selection":function(m){if(qx.dom.Node.isElement(m)){switch(m.nodeName.toLowerCase()){case h:switch(m.type){case b:case c:case i:case k:case f:case d:case e:return m.createTextRange();default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();};break;case g:case l:case k:return m.createTextRange();default:return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();};}
else {if(m==null){m=window;}
;return qx.bom.Selection.getSelectionObject(qx.dom.Node.getDocument(m)).createRange();}
;}
,"default":function(n){var o=qx.dom.Node.getDocument(n);var p=qx.bom.Selection.getSelectionObject(o);if(p.rangeCount>0){return p.getRangeAt(0);}
else {return o.createRange();}
;}
})}});}
)();
(function(){var a="m",b="g",c="^",d="",e="qx.util.StringSplit",f="i",g="$(?!\\s)",h="[object RegExp]",j="y";qx.Bootstrap.define(e,{statics:{split:function(k,p,o){if(Object.prototype.toString.call(p)!==h){return String.prototype.split.call(k,p,o);}
;var r=[],l=0,m=(p.ignoreCase?f:d)+(p.multiline?a:d)+(p.sticky?j:d),p=RegExp(p.source,m+b),n,t,q,u,s=/()??/.exec(d)[1]===undefined;k=k+d;if(!s){n=RegExp(c+p.source+g,m);}
;if(o===undefined||+o<0){o=Infinity;}
else {o=Math.floor(+o);if(!o){return [];}
;}
;while(t=p.exec(k)){q=t.index+t[0].length;if(q>l){r.push(k.slice(l,t.index));if(!s&&t.length>1){t[0].replace(n,function(){for(var i=1;i<arguments.length-2;i++ ){if(arguments[i]===undefined){t[i]=undefined;}
;}
;}
);}
;if(t.length>1&&t.index<k.length){Array.prototype.push.apply(r,t.slice(1));}
;u=t[0].length;l=q;if(r.length>=o){break;}
;}
;if(p.lastIndex===t.index){p.lastIndex++ ;}
;}
;if(l===k.length){if(u||!p.test(d)){r.push(d);}
;}
else {r.push(k.slice(l));}
;return r.length>o?r.slice(0,o):r;}
}});}
)();
(function(){var a="qx.event.type.Focus";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(d,b,c){qx.event.type.Event.prototype.init.call(this,c,false);this._target=d;this._relatedTarget=b;return this;}
}});}
)();
(function(){var a="touchmove",b="os.name",c="MSPointerDown",d="android",e="engine.version",f="pointercancel",g="qx.event.handler.TouchCore",h="event.mspointer",j="MSPointerCancel",k="y",l="pointer-events",m="pointerup",n="touchend",o="pointerdown",p="MSPointerUp",q="right",r="engine.name",s="undefined",t="touchcancel",u="MSPointerMove",v="webkit",w="none",z="left",A="pointermove",B="down",C="x",D="up",E="touchstart";qx.Bootstrap.define(g,{extend:Object,statics:{TAP_MAX_DISTANCE:qx.core.Environment.get(b)!=d?10:40,SWIPE_DIRECTION:{x:[z,q],y:[D,B]},SWIPE_MIN_DISTANCE:qx.core.Environment.get(b)!=d?11:41,SWIPE_MIN_VELOCITY:0,LONGTAP_TIME:500},construct:function(F,G){this.__zi=F;this.__lw=G;this._initTouchObserver();this.__zj=[];this.__zk={};}
,members:{__zi:null,__lw:null,__zl:null,__zm:null,__zk:null,__zn:null,__zo:null,__zp:null,__zj:null,__zq:null,_initTouchObserver:function(){this.__zl=qx.lang.Function.listener(this._onTouchEvent,this);this.__zq=[E,a,n,t];if(qx.core.Environment.get(h)){var H=parseInt(qx.core.Environment.get(e),10);if(H==10){this.__zq=[c,u,p,j];}
else {this.__zq=[o,A,m,f];}
;}
;for(var i=0;i<this.__zq.length;i++ ){qx.bom.Event.addNativeListener(this.__zi,this.__zq[i],this.__zl);}
;}
,_stopTouchObserver:function(){for(var i=0;i<this.__zq.length;i++ ){qx.bom.Event.removeNativeListener(this.__zi,this.__zq[i],this.__zl);}
;}
,_onTouchEvent:function(I){this._commonTouchEventHandler(I);}
,_getScalingDistance:function(K,J){return (Math.sqrt(Math.pow(K.pageX-J.pageX,2)+Math.pow(K.pageY-J.pageY,2)));}
,_getRotationAngle:function(M,L){var x=M.pageX-L.pageX;var y=M.pageY-L.pageY;return (Math.atan2(y,x)*180/Math.PI);}
,_calcTouchesDelta:function(N){var O=[];for(var i=0;i<N.length;i++ ){O.push(this._calcSingleTouchDelta(N[i]));}
;return O;}
,_calcSingleTouchDelta:function(S){if(this.__zk.hasOwnProperty(S.identifier)){var R=this.__zk[S.identifier];var P=Math.floor(S.clientX-R[0]);var Q=Math.floor(S.clientY-R[1]);var T=C;if(Math.abs(P/Q)<1){T=k;}
;return {"x":P,"y":Q,"axis":T,"identifier":S.identifier};}
else {return {"x":0,"y":0,"axis":null,"identifier":S.identifier};}
;}
,_commonTouchEventHandler:function(V,ba){var ba=ba||V.type;if(qx.core.Environment.get(h)){ba=this._mapPointerEvent(ba);var U=this._detectTouchesByPointer(V,ba);V.changedTouches=U;V.targetTouches=U;V.touches=U;}
;V.delta=[];if(ba==E){this.__zm=this._getTarget(V);if(V.touches&&V.touches.length>1){this.__zo=this._getScalingDistance(V.touches[0],V.touches[1]);this.__zp=this._getRotationAngle(V.touches[0],V.touches[1]);}
;for(var i=0;i<V.changedTouches.length;i++ ){var Y=V.changedTouches[i];this.__zk[Y.identifier]=[Y.clientX,Y.clientY];}
;}
;if(ba==a){if(typeof V.scale==s&&V.targetTouches.length>1){var W=this._getScalingDistance(V.targetTouches[0],V.targetTouches[1]);V.scale=W/this.__zo;}
;if((typeof V.rotation==s||qx.core.Environment.get(h))&&V.targetTouches.length>1){var X=this._getRotationAngle(V.targetTouches[0],V.targetTouches[1]);V._rotation=X-this.__zp;}
;V.delta=this._calcTouchesDelta(V.targetTouches);}
;this._fireEvent(V,ba,this.__zm);if(qx.core.Environment.get(h)){if(ba==n||ba==t){delete this.__zj[V.pointerId];}
;}
;if((ba==n||ba==t)&&V.changedTouches[0]){delete this.__zk[V.changedTouches[0].identifier];}
;}
,_detectTouchesByPointer:function(bd,bf){var bc=[];if(bf==E){this.__zj[bd.pointerId]=bd;}
else if(bf==a){this.__zj[bd.pointerId]=bd;}
;for(var be in this.__zj){var bb=this.__zj[be];bc.push(bb);}
;return bc;}
,_mapPointerEvent:function(bg){bg=bg.toLowerCase();if(bg.indexOf(o)!==-1){return E;}
else if(bg.indexOf(m)!==-1){return n;}
else if(bg.indexOf(A)!==-1){return a;}
else if(bg.indexOf(f)!==-1){return t;}
;return bg;}
,_getTarget:function(bi){var bj=qx.bom.Event.getTarget(bi);if(qx.core.Environment.get(r)==v){if(bj&&bj.nodeType==3){bj=bj.parentNode;}
;}
else if(qx.core.Environment.get(h)){var bh=this.__zr(bi);if(bh){bj=bh;}
;}
;return bj;}
,__zr:function(bm){var bk=null;var bl=null;if(bm&&bm.touches&&bm.touches.length!==0){bk=bm.touches[0].clientX;bl=bm.touches[0].clientY;}
;var bo=document.msElementsFromPoint(bk,bl);if(bo){for(var i=0;i<bo.length;i++ ){var bp=bo[i];var bn=qx.bom.element.Style.get(bp,l,3);if(bn!=w){return bp;}
;}
;}
;return null;}
,_fireEvent:function(bq,br,bs){if(!bs){bs=this._getTarget(bq);}
;var br=br||bq.type;if(bs&&bs.nodeType&&this.__lw){this.__lw.emit(br,bq);}
;}
,dispose:function(){this._stopTouchObserver();this.__zm=this.__zi=this.__zq=this.__zj=this.__lw=this.__zo=this.__zp=null;}
}});}
)();
(function(){var a="resize",b="os.name",c="qx.event.handler.Orientation",d="landscape",e="android",f="portrait",g="orientationchange";qx.Class.define(c,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(h){qx.core.Object.call(this);this.__ff=h;this.__lG=h.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{orientationchange:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__ff:null,__lG:null,__ly:null,_currentOrientation:null,__lx:null,canHandleEvent:function(j,i){}
,registerEvent:function(m,l,k){}
,unregisterEvent:function(p,o,n){}
,_initObserver:function(){this.__lx=qx.lang.Function.listener(this._onNative,this);this.__ly=qx.bom.Event.supportsEvent(this.__lG,g)?g:a;var Event=qx.bom.Event;Event.addNativeListener(this.__lG,this.__ly,this.__lx);}
,_stopObserver:function(){var Event=qx.bom.Event;Event.removeNativeListener(this.__lG,this.__ly,this.__lx);}
,_onNative:qx.event.GlobalError.observeMethod(function(q){var r=0;if(qx.core.Environment.get(b)==e){r=300;}
;qx.lang.Function.delay(this._onOrientationChange,r,this,q);}
),_onOrientationChange:function(s){var u=qx.bom.Viewport;var t=u.getOrientation(s.target);if(this._currentOrientation!=t){this._currentOrientation=t;var v=u.isLandscape(s.target)?d:f;qx.event.Registration.fireEvent(this.__lG,g,qx.event.type.Orientation,[t,v]);}
;}
},destruct:function(){this._stopObserver();this.__ff=this.__lG=null;}
,defer:function(w){qx.event.Registration.addHandler(w);}
});}
)();
(function(){var a="landscape",b="qx.event.type.Orientation",c="portrait";qx.Class.define(b,{extend:qx.event.type.Event,members:{__zs:null,__eG:null,init:function(d,e){qx.event.type.Event.prototype.init.call(this,false,false);this.__zs=d;this.__eG=e;return this;}
,clone:function(f){var g=qx.event.type.Event.prototype.clone.call(this,f);g.__zs=this.__zs;g.__eG=this.__eG;return g;}
,getOrientation:function(){return this.__zs;}
,isLandscape:function(){return this.__eG==a;}
,isPortrait:function(){return this.__eG==c;}
}});}
)();
(function(){var a="touchmove",b="dispose",c="useraction",d="touchend",e="event.touch",f="touchstart",g="qx.event.handler.Touch";qx.Class.define(g,{extend:qx.event.handler.TouchCore,implement:qx.event.IEventHandler,construct:function(h){this.__ff=h;this.__lG=h.getWindow();this.__k=this.__lG.document;qx.event.handler.TouchCore.apply(this,[this.__k]);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{touchstart:1,touchmove:1,touchend:1,touchcancel:1,tap:1,longtap:1,swipe:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE+qx.event.IEventHandler.TARGET_DOCUMENT,IGNORE_CAN_HANDLE:true,MOUSE_TO_TOUCH_MAPPING:{"mousedown":f,"mousemove":a,"mouseup":d}},members:{__ff:null,__lG:null,__k:null,__zt:false,canHandleEvent:function(j,i){}
,registerEvent:function(m,l,k){}
,unregisterEvent:function(p,o,n){}
,_fireEvent:function(r,q,s,t){if(!s){s=this._getTarget(r);}
;var q=q||r.type;if(s&&s.nodeType){qx.event.Registration.fireEvent(s,q,t||qx.event.type.Touch,[r,s,null,true,true]);}
;qx.event.Registration.fireEvent(this.__lG,c,qx.event.type.Data,[q]);}
,_onTouchEvent:qx.event.GlobalError.observeMethod(function(u){this._commonTouchEventHandler(u);}
),dispose:function(){this.__mA(b);this.__ff=this.__lG=this.__k=null;}
,__mA:function(w,v){qx.event.handler.TouchCore.prototype[w].apply(this,v||[]);}
},defer:function(x){qx.event.Registration.addHandler(x);if(qx.core.Environment.get(e)){qx.event.Registration.getManager(document).getHandler(x);}
;}
});}
)();
(function(){var a="touchcancel",b="qx.event.type.Touch",c="touchend",d="undefined";qx.Class.define(b,{extend:qx.event.type.Dom,members:{_cloneNativeEvent:function(e,f){var f=qx.event.type.Dom.prototype._cloneNativeEvent.call(this,e,f);f.pageX=e.pageX;f.pageY=e.pageY;f.offsetX=e.offsetX;f.offsetY=e.offsetY;f.layerX=(e.offsetX||e.layerX);f.layerY=(e.offsetY||e.layerY);f.scale=e.scale;f.rotation=e.rotation;f._rotation=e._rotation;f.delta=e.delta;f.srcElement=e.srcElement;f.targetTouches=[];for(var i=0;i<e.targetTouches.length;i++ ){f.targetTouches[i]=e.targetTouches[i];}
;f.changedTouches=[];for(i=0;i<e.changedTouches.length;i++ ){f.changedTouches[i]=e.changedTouches[i];}
;f.touches=[];for(i=0;i<e.touches.length;i++ ){f.touches[i]=e.touches[i];}
;return f;}
,stop:function(){this.stopPropagation();}
,getAllTouches:function(){return this._native.touches;}
,getTargetTouches:function(){return this._native.targetTouches;}
,getChangedTargetTouches:function(){return this._native.changedTouches;}
,isMultiTouch:function(){return this.__zv().length>1;}
,getScale:function(){return this._native.scale;}
,getRotation:function(){if(typeof this._native._rotation===d){return this._native.rotation;}
else {return this._native._rotation;}
;}
,getDelta:function(){return this._native.delta;}
,getDocumentLeft:function(g){return this.__zu(g).pageX;}
,getDocumentTop:function(h){return this.__zu(h).pageY;}
,getScreenLeft:function(j){return this.__zu(j).screenX;}
,getScreenTop:function(k){return this.__zu(k).screenY;}
,getViewportLeft:function(l){return this.__zu(l).clientX;}
,getViewportTop:function(m){return this.__zu(m).clientY;}
,getIdentifier:function(n){return this.__zu(n).identifier;}
,__zu:function(o){o=o==null?0:o;return this.__zv()[o];}
,__zv:function(){var p=(this._isTouchEnd()?this.getChangedTargetTouches():this.getTargetTouches());return p;}
,_isTouchEnd:function(){return (this.getType()==c||this.getType()==a);}
}});}
)();
(function(){var a="text",b="engine.version",c="keydown",d="radio",f="textarea",g="password",h="propertychange",j="select-multiple",k="change",m="input",n="value",p="select",q="browser.documentmode",r="browser.version",s="opera",t="keyup",u="mshtml",v="engine.name",w="keypress",x="checkbox",y="qx.event.handler.Input",z="checked";qx.Class.define(y,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);this._onChangeCheckedWrapper=qx.lang.Function.listener(this._onChangeChecked,this);this._onChangeValueWrapper=qx.lang.Function.listener(this._onChangeValue,this);this._onInputWrapper=qx.lang.Function.listener(this._onInput,this);this._onPropertyWrapper=qx.lang.Function.listener(this._onProperty,this);if((qx.core.Environment.get(v)==s)){this._onKeyDownWrapper=qx.lang.Function.listener(this._onKeyDown,this);this._onKeyUpWrapper=qx.lang.Function.listener(this._onKeyUp,this);}
;}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{input:1,change:1},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:false},members:{__zw:false,__zx:null,__nA:null,__wD:null,canHandleEvent:function(C,B){var A=C.tagName.toLowerCase();if(B===m&&(A===m||A===f)){return true;}
;if(B===k&&(A===m||A===f||A===p)){return true;}
;return false;}
,registerEvent:function(H,G,E){if(qx.core.Environment.get(v)==u&&(qx.core.Environment.get(b)<9||(qx.core.Environment.get(b)>=9&&qx.core.Environment.get(q)<9))){if(!H.__zy){var F=H.tagName.toLowerCase();var D=H.type;if(D===a||D===g||F===f||D===x||D===d){qx.bom.Event.addNativeListener(H,h,this._onPropertyWrapper);}
;if(D!==x&&D!==d){qx.bom.Event.addNativeListener(H,k,this._onChangeValueWrapper);}
;if(D===a||D===g){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,H);qx.bom.Event.addNativeListener(H,w,this._onKeyPressWrapped);}
;H.__zy=true;}
;}
else {if(G===m){this.__zz(H);}
else if(G===k){if(H.type===d||H.type===x){qx.bom.Event.addNativeListener(H,k,this._onChangeCheckedWrapper);}
else {qx.bom.Event.addNativeListener(H,k,this._onChangeValueWrapper);}
;if((qx.core.Environment.get(v)==s)||(qx.core.Environment.get(v)==u)){if(H.type===a||H.type===g){this._onKeyPressWrapped=qx.lang.Function.listener(this._onKeyPress,this,H);qx.bom.Event.addNativeListener(H,w,this._onKeyPressWrapped);}
;}
;}
;}
;}
,__zz:qx.core.Environment.select(v,{"mshtml":function(I){if(qx.core.Environment.get(b)>=9&&qx.core.Environment.get(q)>=9){qx.bom.Event.addNativeListener(I,m,this._onInputWrapper);if(I.type===a||I.type===g||I.type===f){this._inputFixWrapper=qx.lang.Function.listener(this._inputFix,this,I);qx.bom.Event.addNativeListener(I,t,this._inputFixWrapper);}
;}
;}
,"webkit":function(K){var J=K.tagName.toLowerCase();if(parseFloat(qx.core.Environment.get(b))<532&&J==f){qx.bom.Event.addNativeListener(K,w,this._onInputWrapper);}
;qx.bom.Event.addNativeListener(K,m,this._onInputWrapper);}
,"opera":function(L){qx.bom.Event.addNativeListener(L,t,this._onKeyUpWrapper);qx.bom.Event.addNativeListener(L,c,this._onKeyDownWrapper);qx.bom.Event.addNativeListener(L,m,this._onInputWrapper);}
,"default":function(M){qx.bom.Event.addNativeListener(M,m,this._onInputWrapper);}
}),unregisterEvent:function(Q,P){if(qx.core.Environment.get(v)==u&&qx.core.Environment.get(b)<9&&qx.core.Environment.get(q)<9){if(Q.__zy){var O=Q.tagName.toLowerCase();var N=Q.type;if(N===a||N===g||O===f||N===x||N===d){qx.bom.Event.removeNativeListener(Q,h,this._onPropertyWrapper);}
;if(N!==x&&N!==d){qx.bom.Event.removeNativeListener(Q,k,this._onChangeValueWrapper);}
;if(N===a||N===g){qx.bom.Event.removeNativeListener(Q,w,this._onKeyPressWrapped);}
;try{delete Q.__zy;}
catch(R){Q.__zy=null;}
;}
;}
else {if(P===m){this.__zA(Q);}
else if(P===k){if(Q.type===d||Q.type===x){qx.bom.Event.removeNativeListener(Q,k,this._onChangeCheckedWrapper);}
else {qx.bom.Event.removeNativeListener(Q,k,this._onChangeValueWrapper);}
;}
;if((qx.core.Environment.get(v)==s)||(qx.core.Environment.get(v)==u)){if(Q.type===a||Q.type===g){qx.bom.Event.removeNativeListener(Q,w,this._onKeyPressWrapped);}
;}
;}
;}
,__zA:qx.core.Environment.select(v,{"mshtml":function(S){if(qx.core.Environment.get(b)>=9&&qx.core.Environment.get(q)>=9){qx.bom.Event.removeNativeListener(S,m,this._onInputWrapper);if(S.type===a||S.type===g||S.type===f){qx.bom.Event.removeNativeListener(S,t,this._inputFixWrapper);}
;}
;}
,"webkit":function(U){var T=U.tagName.toLowerCase();if(parseFloat(qx.core.Environment.get(b))<532&&T==f){qx.bom.Event.removeNativeListener(U,w,this._onInputWrapper);}
;qx.bom.Event.removeNativeListener(U,m,this._onInputWrapper);}
,"opera":function(V){qx.bom.Event.removeNativeListener(V,t,this._onKeyUpWrapper);qx.bom.Event.removeNativeListener(V,c,this._onKeyDownWrapper);qx.bom.Event.removeNativeListener(V,m,this._onInputWrapper);}
,"default":function(W){qx.bom.Event.removeNativeListener(W,m,this._onInputWrapper);}
}),_onKeyPress:qx.core.Environment.select(v,{"mshtml":function(e,X){if(e.keyCode===13){if(X.value!==this.__nA){this.__nA=X.value;qx.event.Registration.fireEvent(X,k,qx.event.type.Data,[X.value]);}
;}
;}
,"opera":function(e,Y){if(e.keyCode===13){if(Y.value!==this.__nA){this.__nA=Y.value;qx.event.Registration.fireEvent(Y,k,qx.event.type.Data,[Y.value]);}
;}
;}
,"default":null}),_inputFix:qx.core.Environment.select(v,{"mshtml":function(e,ba){if(e.keyCode===46||e.keyCode===8){if(ba.value!==this.__wD){this.__wD=ba.value;qx.event.Registration.fireEvent(ba,m,qx.event.type.Data,[ba.value]);}
;}
;}
,"default":null}),_onKeyDown:qx.core.Environment.select(v,{"opera":function(e){if(e.keyCode===13){this.__zw=true;}
;}
,"default":null}),_onKeyUp:qx.core.Environment.select(v,{"opera":function(e){if(e.keyCode===13){this.__zw=false;}
;}
,"default":null}),_onInput:qx.event.GlobalError.observeMethod(function(e){var bc=qx.bom.Event.getTarget(e);var bb=bc.tagName.toLowerCase();if(!this.__zw||bb!==m){if((qx.core.Environment.get(v)==s)&&qx.core.Environment.get(r)<10.6){this.__zx=window.setTimeout(function(){qx.event.Registration.fireEvent(bc,m,qx.event.type.Data,[bc.value]);}
,0);}
else {qx.event.Registration.fireEvent(bc,m,qx.event.type.Data,[bc.value]);}
;}
;}
),_onChangeValue:qx.event.GlobalError.observeMethod(function(e){var bd=qx.bom.Event.getTarget(e);var be=bd.value;if(bd.type===j){var be=[];for(var i=0,o=bd.options,l=o.length;i<l;i++ ){if(o[i].selected){be.push(o[i].value);}
;}
;}
;qx.event.Registration.fireEvent(bd,k,qx.event.type.Data,[be]);}
),_onChangeChecked:qx.event.GlobalError.observeMethod(function(e){var bf=qx.bom.Event.getTarget(e);if(bf.type===d){if(bf.checked){qx.event.Registration.fireEvent(bf,k,qx.event.type.Data,[bf.value]);}
;}
else {qx.event.Registration.fireEvent(bf,k,qx.event.type.Data,[bf.checked]);}
;}
),_onProperty:qx.core.Environment.select(v,{"mshtml":qx.event.GlobalError.observeMethod(function(e){var bg=qx.bom.Event.getTarget(e);var bh=e.propertyName;if(bh===n&&(bg.type===a||bg.type===g||bg.tagName.toLowerCase()===f)){if(!bg.$$inValueSet){qx.event.Registration.fireEvent(bg,m,qx.event.type.Data,[bg.value]);}
;}
else if(bh===z){if(bg.type===x){qx.event.Registration.fireEvent(bg,k,qx.event.type.Data,[bg.checked]);}
else if(bg.checked){qx.event.Registration.fireEvent(bg,k,qx.event.type.Data,[bg.value]);}
;}
;}
),"default":function(){}
})},defer:function(bi){qx.event.Registration.addHandler(bi);}
});}
)();
(function(){var a="offline",b="qx.event.handler.Offline",c="online";qx.Class.define(b,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(d){qx.core.Object.call(this);this.__ff=d;this.__lG=d.getWindow();this._initObserver();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{online:true,offline:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_WINDOW,IGNORE_CAN_HANDLE:true},members:{__ff:null,__lG:null,__lx:null,canHandleEvent:function(f,e){}
,registerEvent:function(i,h,g){}
,unregisterEvent:function(l,k,j){}
,_initObserver:function(){this.__lx=qx.lang.Function.listener(this._onNative,this);qx.bom.Event.addNativeListener(this.__lG,a,this.__lx);qx.bom.Event.addNativeListener(this.__lG,c,this.__lx);}
,_stopObserver:function(){qx.bom.Event.removeNativeListener(this.__lG,a,this.__lx);qx.bom.Event.removeNativeListener(this.__lG,c,this.__lx);}
,_onNative:qx.event.GlobalError.observeMethod(function(m){qx.event.Registration.fireEvent(this.__lG,m.type,qx.event.type.Event,[]);}
),isOnline:function(){return !!this.__lG.navigator.onLine;}
},destruct:function(){this.__ff=null;this._stopObserver();delete qx.event.handler.Appear.__instances[this.$$hash];}
,defer:function(n){qx.event.Registration.addHandler(n);}
});}
)();
(function(){var a="mshtml",b="engine.name",c="qx.bom.Element";qx.Class.define(c,{statics:{addListener:function(g,f,d,self,e){return qx.event.Registration.addListener(g,f,d,self,e);}
,removeListener:function(n,m,h,self,k){return qx.event.Registration.removeListener(n,m,h,self,k);}
,removeListenerById:function(o,p){return qx.event.Registration.removeListenerById(o,p);}
,hasListener:function(s,r,q){return qx.event.Registration.hasListener(s,r,q);}
,focus:function(t){qx.event.Registration.getManager(t).getHandler(qx.event.handler.Focus).focus(t);}
,blur:function(u){qx.event.Registration.getManager(u).getHandler(qx.event.handler.Focus).blur(u);}
,activate:function(v){qx.event.Registration.getManager(v).getHandler(qx.event.handler.Focus).activate(v);}
,deactivate:function(w){qx.event.Registration.getManager(w).getHandler(qx.event.handler.Focus).deactivate(w);}
,capture:function(y,x){qx.event.Registration.getManager(y).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(y,x);}
,releaseCapture:function(z){qx.event.Registration.getManager(z).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(z);}
,clone:function(E,L){var C;if(L||((qx.core.Environment.get(b)==a)&&!qx.xml.Document.isXmlDocument(E))){var G=qx.event.Registration.getManager(E);var A=qx.dom.Hierarchy.getDescendants(E);A.push(E);}
;if((qx.core.Environment.get(b)==a)){for(var i=0,l=A.length;i<l;i++ ){G.toggleAttachedEvents(A[i],false);}
;}
;var C=E.cloneNode(true);if((qx.core.Environment.get(b)==a)){for(var i=0,l=A.length;i<l;i++ ){G.toggleAttachedEvents(A[i],true);}
;}
;if(L===true){var K=qx.dom.Hierarchy.getDescendants(C);K.push(C);var B,J,I,D;for(var i=0,H=A.length;i<H;i++ ){I=A[i];B=G.serializeListeners(I);if(B.length>0){J=K[i];for(var j=0,F=B.length;j<F;j++ ){D=B[j];G.addListener(J,D.type,D.handler,D.self,D.capture);}
;}
;}
;}
;return C;}
}});}
)();
(function(){var a="mshtml",b="engine.name",c="blur",d="losecapture",e="focus",f="os.version",g="click",h="qx.event.dispatch.MouseCapture",i="capture",j="scroll",k="browser.documentmode";qx.Class.define(h,{extend:qx.event.dispatch.AbstractBubbling,construct:function(l,m){qx.event.dispatch.AbstractBubbling.call(this,l);this.__lG=l.getWindow();this.__lI=m;l.addListener(this.__lG,c,this.releaseCapture,this);l.addListener(this.__lG,e,this.releaseCapture,this);l.addListener(this.__lG,j,this.releaseCapture,this);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST},members:{__lI:null,__zB:null,__zC:true,__lG:null,_getParent:function(n){return n.parentNode;}
,canDispatchEvent:function(p,event,o){return !!(this.__zB&&this.__zD[o]);}
,dispatchEvent:function(r,event,q){if(q==g){event.stopPropagation();this.releaseCapture();return;}
;if(this.__zC||!qx.dom.Hierarchy.contains(this.__zB,r)){r=this.__zB;}
;qx.event.dispatch.AbstractBubbling.prototype.dispatchEvent.call(this,r,event,q);}
,__zD:{"mouseup":1,"mousedown":1,"click":1,"dblclick":1,"mousemove":1,"mouseout":1,"mouseover":1,"pointerdown":1,"pointerup":1,"pointermove":1,"pointerover":1,"pointerout":1,"tap":1,"dbltap":1},activateCapture:function(t,s){var s=s!==false;if(this.__zB===t&&this.__zC==s){return;}
;if(this.__zB){this.releaseCapture();}
;if(this.hasNativeCapture){this.nativeSetCapture(t,s);var self=this;qx.bom.Event.addNativeListener(t,d,function(){qx.bom.Event.removeNativeListener(t,d,arguments.callee);self.releaseCapture();}
);}
;this.__zC=s;this.__zB=t;this.__lI.fireEvent(t,i,qx.event.type.Event,[true,false]);}
,getCaptureElement:function(){return this.__zB;}
,releaseCapture:function(){var u=this.__zB;if(!u){return;}
;this.__zB=null;this.__lI.fireEvent(u,d,qx.event.type.Event,[true,false]);this.nativeReleaseCapture(u);}
,hasNativeCapture:(qx.core.Environment.get(b)==a&&qx.core.Environment.get(k)<9||(parseInt(qx.core.Environment.get(f),10)>7&&qx.core.Environment.get(k)>9)),nativeSetCapture:qx.core.Environment.select(b,{"mshtml":function(w,v){w.setCapture(v!==false);}
,"default":(function(){}
)}),nativeReleaseCapture:qx.core.Environment.select(b,{"mshtml":function(x){x.releaseCapture();}
,"default":(function(){}
)})},destruct:function(){this.__zB=this.__lG=this.__lI=null;}
,defer:function(y){qx.event.Registration.addDispatcher(y);}
});}
)();
(function(){var a="qx.event.handler.Capture";qx.Class.define(a,{extend:qx.core.Object,implement:qx.event.IEventHandler,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{capture:true,losecapture:true},TARGET_CHECK:qx.event.IEventHandler.TARGET_DOMNODE,IGNORE_CAN_HANDLE:true},members:{canHandleEvent:function(c,b){}
,registerEvent:function(f,e,d){}
,unregisterEvent:function(i,h,g){}
},defer:function(j){qx.event.Registration.addHandler(j);}
});}
)();
(function(){var a="function",b="plugin.silverlight.version",c="Silverlight",d="Skype.Detection",f="QuickTimeCheckObject.QuickTimeCheck.1",g="Adobe Acrobat",h="plugin.windowsmedia",k="QuickTime",l="plugin.silverlight",m="pdf",n="wmv",o="qx.bom.client.Plugin",p="application/x-skype",q=',',r="plugin.divx",s='=',t="Chrome PDF Viewer",u="divx",v="Windows Media",w="",x="mshtml",y="skype.click2call",z="plugin.skype",A="plugin.gears",B="plugin.quicktime",C="plugin.windowsmedia.version",D="quicktime",E="DivX Web Player",F="AgControl.AgControl",G="Microsoft.XMLHTTP",H="silverlight",I="plugin.pdf",J="plugin.pdf.version",K="MSXML2.DOMDocument.6.0",L="WMPlayer.OCX.7",M="AcroPDF.PDF",N="plugin.activex",O="plugin.quicktime.version",P="plugin.divx.version",Q="npdivx.DivXBrowserPlugin.1",R="object";qx.Bootstrap.define(o,{statics:{getGears:function(){return !!(window.google&&window.google.gears);}
,getActiveX:function(){if(typeof window.ActiveXObject===a){return true;}
;try{return window.ActiveXObject!==undefined&&(typeof (new window.ActiveXObject(G))===R||typeof (new window.ActiveXObject(K))===R);}
catch(S){return false;}
;}
,getSkype:function(){if(qx.bom.client.Plugin.getActiveX()){try{new ActiveXObject(d);return true;}
catch(e){}
;}
;var T=navigator.mimeTypes;if(T){if(p in T){return true;}
;for(var i=0;i<T.length;i++ ){var U=T[i];if(U.type.indexOf(y)!=-1){return true;}
;}
;}
;return false;}
,__zE:{quicktime:{plugin:[k],control:f},wmv:{plugin:[v],control:L},divx:{plugin:[E],control:Q},silverlight:{plugin:[c],control:F},pdf:{plugin:[t,g],control:M}},getQuicktimeVersion:function(){var V=qx.bom.client.Plugin.__zE[D];return qx.bom.client.Plugin.__zF(V.control,V.plugin);}
,getWindowsMediaVersion:function(){var W=qx.bom.client.Plugin.__zE[n];return qx.bom.client.Plugin.__zF(W.control,W.plugin,true);}
,getDivXVersion:function(){var X=qx.bom.client.Plugin.__zE[u];return qx.bom.client.Plugin.__zF(X.control,X.plugin);}
,getSilverlightVersion:function(){var Y=qx.bom.client.Plugin.__zE[H];return qx.bom.client.Plugin.__zF(Y.control,Y.plugin);}
,getPdfVersion:function(){var ba=qx.bom.client.Plugin.__zE[m];return qx.bom.client.Plugin.__zF(ba.control,ba.plugin);}
,getQuicktime:function(){var bb=qx.bom.client.Plugin.__zE[D];return qx.bom.client.Plugin.__vW(bb.control,bb.plugin);}
,getWindowsMedia:function(){var bc=qx.bom.client.Plugin.__zE[n];return qx.bom.client.Plugin.__vW(bc.control,bc.plugin,true);}
,getDivX:function(){var bd=qx.bom.client.Plugin.__zE[u];return qx.bom.client.Plugin.__vW(bd.control,bd.plugin);}
,getSilverlight:function(){var be=qx.bom.client.Plugin.__zE[H];return qx.bom.client.Plugin.__vW(be.control,be.plugin);}
,getPdf:function(){var bf=qx.bom.client.Plugin.__zE[m];return qx.bom.client.Plugin.__vW(bf.control,bf.plugin);}
,__zF:function(bo,bk,bj){var bg=qx.bom.client.Plugin.__vW(bo,bk,bj);if(!bg){return w;}
;if(qx.bom.client.Engine.getName()==x&&(qx.bom.client.Browser.getDocumentMode()<11||bj)){try{var bh=new ActiveXObject(bo);var bm;if(bh.GetVersions&&bh.GetVersions()){bm=bh.GetVersions().split(q);if(bm.length>1){bm=bm[0].split(s);if(bm.length===2){return bm[1];}
;}
;}
;bm=bh.versionInfo;if(bm!=undefined){return bm;}
;bm=bh.version;if(bm!=undefined){return bm;}
;bm=bh.settings.version;if(bm!=undefined){return bm;}
;}
catch(bp){return w;}
;return w;}
else {var bn=navigator.plugins;var bl=/([0-9]\.[0-9])/g;for(var i=0;i<bn.length;i++ ){var bi=bn[i];for(var j=0;j<bk.length;j++ ){if(bi.name.indexOf(bk[j])!==-1){if(bl.test(bi.name)||bl.test(bi.description)){return RegExp.$1;}
;}
;}
;}
;return w;}
;}
,__vW:function(bt,br,bq){if(qx.bom.client.Engine.getName()==x&&(qx.bom.client.Browser.getDocumentMode()<11||bq)){if(!this.getActiveX()){return false;}
;try{new ActiveXObject(bt);}
catch(bu){return false;}
;return true;}
else {var bs=navigator.plugins;if(!bs){return false;}
;var name;for(var i=0;i<bs.length;i++ ){name=bs[i].name;for(var j=0;j<br.length;j++ ){if(name.indexOf(br[j])!==-1){return true;}
;}
;}
;return false;}
;}
},defer:function(bv){qx.core.Environment.add(A,bv.getGears);qx.core.Environment.add(B,bv.getQuicktime);qx.core.Environment.add(O,bv.getQuicktimeVersion);qx.core.Environment.add(h,bv.getWindowsMedia);qx.core.Environment.add(C,bv.getWindowsMediaVersion);qx.core.Environment.add(r,bv.getDivX);qx.core.Environment.add(P,bv.getDivXVersion);qx.core.Environment.add(l,bv.getSilverlight);qx.core.Environment.add(b,bv.getSilverlightVersion);qx.core.Environment.add(I,bv.getPdf);qx.core.Environment.add(J,bv.getPdfVersion);qx.core.Environment.add(N,bv.getActiveX);qx.core.Environment.add(z,bv.getSkype);}
});}
)();
(function(){var a='<\?xml version="1.0" encoding="utf-8"?>\n<',b="MSXML2.DOMDocument.3.0",c="qx.xml.Document",d="",e=" />",f="xml.domparser",g="SelectionLanguage",h="'",j="MSXML2.XMLHTTP.3.0",k="plugin.activex",m="No XML implementation available!",n="MSXML2.XMLHTTP.6.0",o="xml.implementation",p=" xmlns='",q="text/xml",r="XPath",s="MSXML2.DOMDocument.6.0",t="HTML";qx.Bootstrap.define(c,{statics:{DOMDOC:null,XMLHTTP:null,isXmlDocument:function(u){if(u.nodeType===9){return u.documentElement.nodeName!==t;}
else if(u.ownerDocument){return this.isXmlDocument(u.ownerDocument);}
else {return false;}
;}
,create:function(v,w){if(qx.core.Environment.get(k)){var x=new ActiveXObject(this.DOMDOC);if(this.DOMDOC==b){x.setProperty(g,r);}
;if(w){var y=a;y+=w;if(v){y+=p+v+h;}
;y+=e;x.loadXML(y);}
;return x;}
;if(qx.core.Environment.get(o)){return document.implementation.createDocument(v||d,w||d,null);}
;throw new Error(m);}
,fromString:function(A){if(qx.core.Environment.get(k)){var B=qx.xml.Document.create();B.loadXML(A);return B;}
;if(qx.core.Environment.get(f)){var z=new DOMParser();return z.parseFromString(A,q);}
;throw new Error(m);}
},defer:function(D){if(qx.core.Environment.get(k)){var C=[s,b];var E=[n,j];for(var i=0,l=C.length;i<l;i++ ){try{new ActiveXObject(C[i]);new ActiveXObject(E[i]);}
catch(F){continue;}
;D.DOMDOC=C[i];D.XMLHTTP=E[i];break;}
;}
;}
});}
)();
(function(){var a="function",b="xml.implementation",c="xml.attributens",d="xml.selectnodes",e="<a></a>",f="xml.getqualifieditem",g="SelectionLanguage",h="xml.getelementsbytagnamens",i="qx.bom.client.Xml",j="xml.domproperties",k="xml.selectsinglenode",l="1.0",m="xml.createnode",n="xml.domparser",o="getProperty",p="undefined",q="XML",r="string",s="xml.createelementns";qx.Bootstrap.define(i,{statics:{getImplementation:function(){return document.implementation&&document.implementation.hasFeature&&document.implementation.hasFeature(q,l);}
,getDomParser:function(){return typeof window.DOMParser!==p;}
,getSelectSingleNode:function(){return typeof qx.xml.Document.create().selectSingleNode!==p;}
,getSelectNodes:function(){return typeof qx.xml.Document.create().selectNodes!==p;}
,getElementsByTagNameNS:function(){return typeof qx.xml.Document.create().getElementsByTagNameNS!==p;}
,getDomProperties:function(){var t=qx.xml.Document.create();return (o in t&&typeof t.getProperty(g)===r);}
,getAttributeNS:function(){var u=qx.xml.Document.fromString(e).documentElement;return typeof u.getAttributeNS===a&&typeof u.setAttributeNS===a;}
,getCreateElementNS:function(){return typeof qx.xml.Document.create().createElementNS===a;}
,getCreateNode:function(){return typeof qx.xml.Document.create().createNode!==p;}
,getQualifiedItem:function(){var v=qx.xml.Document.fromString(e).documentElement;return typeof v.attributes.getQualifiedItem!==p;}
},defer:function(w){qx.core.Environment.add(b,w.getImplementation);qx.core.Environment.add(n,w.getDomParser);qx.core.Environment.add(k,w.getSelectSingleNode);qx.core.Environment.add(d,w.getSelectNodes);qx.core.Environment.add(h,w.getElementsByTagNameNS);qx.core.Environment.add(j,w.getDomProperties);qx.core.Environment.add(c,w.getAttributeNS);qx.core.Environment.add(s,w.getCreateElementNS);qx.core.Environment.add(m,w.getCreateNode);qx.core.Environment.add(f,w.getQualifiedItem);}
});}
)();
(function(){var a="borderBottomWidth",b="visible",d="engine.name",e="borderTopWidth",f="top",g="borderLeftStyle",h="none",i="overflow",j="right",k="bottom",l="borderLeftWidth",m="100px",n="-moz-scrollbars-vertical",o="borderRightStyle",p="hidden",q="div",r="left",u="qx.bom.element.Scroll",v="borderRightWidth",w="scroll",x="overflowY";qx.Class.define(u,{statics:{__zG:null,getScrollbarWidth:function(){if(this.__zG!==null){return this.__zG;}
;var y=qx.bom.element.Style;var A=function(E,F){return parseInt(y.get(E,F),10)||0;}
;var B=function(G){return (y.get(G,o)==h?0:A(G,v));}
;var C=function(H){return (y.get(H,g)==h?0:A(H,l));}
;var D=qx.core.Environment.select(d,{"mshtml":function(I){if(y.get(I,x)==p||I.clientWidth==0){return B(I);}
;return Math.max(0,I.offsetWidth-I.clientLeft-I.clientWidth);}
,"default":function(J){if(J.clientWidth==0){var L=y.get(J,i);var K=(L==w||L==n?16:0);return Math.max(0,B(J)+K);}
;return Math.max(0,(J.offsetWidth-J.clientWidth-C(J)));}
});var z=function(M){return D(M)-B(M);}
;var t=document.createElement(q);var s=t.style;s.height=s.width=m;s.overflow=w;document.body.appendChild(t);var c=z(t);this.__zG=c;document.body.removeChild(t);return this.__zG;}
,intoViewX:function(bi,stop,bh){var parent=bi.parentNode;var bg=qx.dom.Node.getDocument(bi);var Y=bg.body;var be,Q,V;var R,P,S;var bb,T,O;var X,bc,bd,ba;var bf,U,bj;var N=bh===r;var W=bh===j;stop=stop?stop.parentNode:bg;while(parent&&parent!=stop){if(parent.scrollWidth>parent.clientWidth&&(parent===Y||qx.bom.element.Style.get(parent,x)!=b)){if(parent===Y){Q=parent.scrollLeft;V=Q+qx.bom.Viewport.getWidth();R=qx.bom.Viewport.getWidth();P=parent.clientWidth;S=parent.scrollWidth;bb=0;T=0;O=0;}
else {be=qx.bom.element.Location.get(parent);Q=be.left;V=be.right;R=parent.offsetWidth;P=parent.clientWidth;S=parent.scrollWidth;bb=parseInt(qx.bom.element.Style.get(parent,l),10)||0;T=parseInt(qx.bom.element.Style.get(parent,v),10)||0;O=R-P-bb-T;}
;X=qx.bom.element.Location.get(bi);bc=X.left;bd=X.right;ba=bi.offsetWidth;bf=bc-Q-bb;U=bd-V+T;bj=0;if(N){bj=bf;}
else if(W){bj=U+O;}
else if(bf<0||ba>P){bj=bf;}
else if(U>0){bj=U+O;}
;parent.scrollLeft+=bj;qx.event.Registration.fireNonBubblingEvent(parent,w);}
;if(parent===Y){break;}
;parent=parent.parentNode;}
;}
,intoViewY:function(bD,stop,bC){var parent=bD.parentNode;var bB=qx.dom.Node.getDocument(bD);var bk=bB.body;var by,bt,bw;var bE,bx,bu;var bp,bl,bA;var br,bs,bq,bm;var bn,bv,bz;var bo=bC===f;var bF=bC===k;stop=stop?stop.parentNode:bB;while(parent&&parent!=stop){if(parent.scrollHeight>parent.clientHeight&&(parent===bk||qx.bom.element.Style.get(parent,x)!=b)){if(parent===bk){bt=parent.scrollTop;bw=bt+qx.bom.Viewport.getHeight();bE=qx.bom.Viewport.getHeight();bx=parent.clientHeight;bu=parent.scrollHeight;bp=0;bl=0;bA=0;}
else {by=qx.bom.element.Location.get(parent);bt=by.top;bw=by.bottom;bE=parent.offsetHeight;bx=parent.clientHeight;bu=parent.scrollHeight;bp=parseInt(qx.bom.element.Style.get(parent,e),10)||0;bl=parseInt(qx.bom.element.Style.get(parent,a),10)||0;bA=bE-bx-bp-bl;}
;br=qx.bom.element.Location.get(bD);bs=br.top;bq=br.bottom;bm=bD.offsetHeight;bn=bs-bt-bp;bv=bq-bw+bl;bz=0;if(bo){bz=bn;}
else if(bF){bz=bv+bA;}
else if(bn<0||bm>bx){bz=bn;}
else if(bv>0){bz=bv+bA;}
;parent.scrollTop+=bz;qx.event.Registration.fireNonBubblingEvent(parent,w);}
;if(parent===bk){break;}
;parent=parent.parentNode;}
;}
,intoView:function(bI,stop,bH,bG){this.intoViewX(bI,stop,bH);this.intoViewY(bI,stop,bG);}
}});}
)();
(function(){var a=" due to exceptions in user code. The application has to be reloaded!",b="Error in the 'Appearance' queue:",c="Error in the 'Widget' queue:",d="\n",f="Error in the 'Layout' queue:",g="Error in the 'Visibility' queue:",h="qx.debug",i="useraction",j="qx.debug.ui.queue",k="Error while layout flush: ",l="Error in the 'Dispose' queue:",m="Stack trace: \n",n="event.touch",o="qx.ui.core.queue.Manager",p=" times in a row",q="Fatal Error: Flush terminated ";qx.Class.define(o,{statics:{__zH:false,__oq:false,__fU:{},__zI:0,MAX_RETRIES:10,scheduleFlush:function(r){var self=qx.ui.core.queue.Manager;self.__fU[r]=true;if(!self.__zH){self.__oq=false;qx.bom.AnimationFrame.request(function(){if(self.__oq){self.__oq=false;return;}
;self.flush();}
,self);self.__zH=true;}
;}
,flush:function(){var self=qx.ui.core.queue.Manager;if(self.__zJ){return;}
;self.__zJ=true;self.__oq=true;var s=self.__fU;self.__zK(function(){while(s.visibility||s.widget||s.appearance||s.layout||s.element){if(s.widget){delete s.widget;if(qx.core.Environment.get(j)){try{qx.ui.core.queue.Widget.flush();}
catch(e){qx.log.Logger.error(qx.ui.core.queue.Widget,c+e,e);}
;}
else {qx.ui.core.queue.Widget.flush();}
;}
;if(s.visibility){delete s.visibility;if(qx.core.Environment.get(j)){try{qx.ui.core.queue.Visibility.flush();}
catch(e){qx.log.Logger.error(qx.ui.core.queue.Visibility,g+e,e);}
;}
else {qx.ui.core.queue.Visibility.flush();}
;}
;if(s.appearance){delete s.appearance;if(qx.core.Environment.get(j)){try{qx.ui.core.queue.Appearance.flush();}
catch(e){qx.log.Logger.error(qx.ui.core.queue.Appearance,b+e,e);}
;}
else {qx.ui.core.queue.Appearance.flush();}
;}
;if(s.widget||s.visibility||s.appearance){continue;}
;if(s.layout){delete s.layout;if(qx.core.Environment.get(j)){try{qx.ui.core.queue.Layout.flush();}
catch(e){qx.log.Logger.error(qx.ui.core.queue.Layout,f+e,e);}
;}
else {qx.ui.core.queue.Layout.flush();}
;}
;if(s.widget||s.visibility||s.appearance||s.layout){continue;}
;if(s.element){delete s.element;qx.html.Element.flush();}
;}
;}
,function(){self.__zH=false;}
);self.__zK(function(){if(s.dispose){delete s.dispose;if(qx.core.Environment.get(j)){try{qx.ui.core.queue.Dispose.flush();}
catch(e){qx.log.Logger.error(l+e);}
;}
else {qx.ui.core.queue.Dispose.flush();}
;}
;}
,function(){self.__zJ=false;}
);self.__zI=0;}
,__zK:qx.core.Environment.select(h,{"true":function(t,u){t();u();}
,"false":function(v,w){var self=qx.ui.core.queue.Manager;try{v();}
catch(e){if(qx.core.Environment.get(h)){qx.log.Logger.error(k+e+d+m+qx.dev.StackTrace.getStackTraceFromError(e));}
;self.__zH=false;self.__zJ=false;self.__zI+=1;if(self.__zI<=self.MAX_RETRIES){self.scheduleFlush();}
else {throw new Error(q+(self.__zI-1)+p+a);}
;throw e;}
finally{w();}
;}
}),__zL:function(e){qx.ui.core.queue.Manager.flush();}
},defer:function(x){qx.html.Element._scheduleFlush=x.scheduleFlush;qx.event.Registration.addListener(window,i,qx.core.Environment.get(n)?x.__zL:x.flush);}
});}
)();
(function(){var a="qx.ui.core.queue.Widget",b="widget",c="$$default";qx.Class.define(a,{statics:{__rn:[],__fU:{},remove:function(e,g){var d=this.__rn;if(!qx.lang.Array.contains(d,e)){return;}
;var f=e.$$hash;if(g==null){qx.lang.Array.remove(d,e);delete this.__fU[f];return;}
;if(this.__fU[f]){delete this.__fU[f][g];if(qx.lang.Object.getLength(this.__fU[f])==0){qx.lang.Array.remove(d,e);}
;}
;}
,add:function(j,l){var h=this.__rn;if(!qx.lang.Array.contains(h,j)){h.unshift(j);}
;if(l==null){l=c;}
;var k=j.$$hash;if(!this.__fU[k]){this.__fU[k]={};}
;this.__fU[k][l]=true;qx.ui.core.queue.Manager.scheduleFlush(b);}
,flush:function(){var m=this.__rn;var n,o;for(var i=m.length-1;i>=0;i-- ){n=m[i];o=this.__fU[n.$$hash];m.splice(i,1);n.syncWidget(o);}
;if(m.length!=0){return;}
;this.__rn=[];this.__fU={};}
}});}
)();
(function(){var a="qx.ui.core.queue.Visibility",b="visibility";qx.Class.define(a,{statics:{__rn:[],__iR:{},remove:function(c){delete this.__iR[c.$$hash];qx.lang.Array.remove(this.__rn,c);}
,isVisible:function(d){return this.__iR[d.$$hash]||false;}
,__zM:function(f){var h=this.__iR;var g=f.$$hash;var e;if(f.isExcluded()){e=false;}
else {var parent=f.$$parent;if(parent){e=this.__zM(parent);}
else {e=f.isRootWidget();}
;}
;return h[g]=e;}
,add:function(k){var j=this.__rn;if(qx.lang.Array.contains(j,k)){return;}
;j.unshift(k);qx.ui.core.queue.Manager.scheduleFlush(b);}
,flush:function(){var o=this.__rn;var p=this.__iR;for(var i=o.length-1;i>=0;i-- ){var n=o[i].$$hash;if(p[n]!=null){o[i].addChildrenToQueue(o);}
;}
;var l={};for(var i=o.length-1;i>=0;i-- ){var n=o[i].$$hash;l[n]=p[n];p[n]=null;}
;for(var i=o.length-1;i>=0;i-- ){var m=o[i];var n=m.$$hash;o.splice(i,1);if(p[n]==null){this.__zM(m);}
;if(p[n]&&p[n]!=l[n]){m.checkAppearanceNeeds();}
;}
;this.__rn=[];}
}});}
)();
(function(){var a="appearance",b="qx.ui.core.queue.Appearance";qx.Class.define(b,{statics:{__rn:[],remove:function(c){qx.lang.Array.remove(this.__rn,c);}
,add:function(e){var d=this.__rn;if(qx.lang.Array.contains(d,e)){return;}
;d.unshift(e);qx.ui.core.queue.Manager.scheduleFlush(a);}
,has:function(f){return qx.lang.Array.contains(this.__rn,f);}
,flush:function(){var j=qx.ui.core.queue.Visibility;var g=this.__rn;var h;for(var i=g.length-1;i>=0;i-- ){h=g[i];g.splice(i,1);if(j.isVisible(h)){h.syncAppearance();}
else {h.$$stateChanges=true;}
;}
;}
}});}
)();
(function(){var a="dispose",b="qx.ui.core.queue.Dispose";qx.Class.define(b,{statics:{__rn:[],add:function(d){var c=this.__rn;if(qx.lang.Array.contains(c,d)){return;}
;c.unshift(d);qx.ui.core.queue.Manager.scheduleFlush(a);}
,isEmpty:function(){return this.__rn.length==0;}
,flush:function(){var e=this.__rn;for(var i=e.length-1;i>=0;i-- ){var f=e[i];e.splice(i,1);f.dispose();}
;if(e.length!=0){return;}
;this.__rn=[];}
}});}
)();
(function(){var a="backgroundColor",b="drag",c="_applyNativeContextMenu",d="touch",f="div",g="_applyBackgroundColor",h="qx.event.type.Data",j="object",k="_applyFocusable",m=" requires a layout, but no one was defined!",n="qx.event.type.KeyInput",o="focused",p="disabled",q="move",r="createChildControl",s="qxanonymous",t="Unsupported control: ",u="dragstart",v="Invalid left decorator inset detected: ",w="__zN",x="Font",y="qx.dynlocale",z="dragchange",A="Invalid layout data: ",B="Could not add widget to itself: ",C="_applyEnabled",D="_applySelectable",E="Number",F="_applyKeepActive",G="qx.event.type.Pinch",H="dragend",I="_applyVisibility",J="The 'before' widget is not a child of this widget!",K="Child control '",L="qxDraggable",M="qx.event.type.Roll",N="syncAppearance",O='" while styling ',P="paddingLeft",Q="' of widget ",R="qx.event.type.Mouse",S="Wrong 'left' argument. ",T="_applyPadding",U="#",V="'Child' must be an instance of qx.ui.core.LayoutItem!",W="Remove Error: ",X="visible",Y="qx.event.type.Event",di="qx.event.type.MouseWheel",dj="_applyCursor",dk="changeVisibility",de="_applyDraggable",df="resize",dg="Decorator",dh="At least one child in control ",dq="zIndex",dr="changeTextColor",ds="__zU",dt="$$widget",dl="changeContextMenu",dm="on",dn="paddingTop",dp="opacity",dx="This widget has no children!",dY="changeSelectable",ff="Invalid top decorator inset detected: ",dy="_applyAnonymous",du="none",dv="outline",fb="hidden",dw="The 'after' widget is not a child of this widget!",dz="_applyAppearance",dA=" returned an invalid size hint!",dB="hovered",dG="_applyOpacity",dH="__zR",dI="Boolean",dC="px",dD="qx.ui.core.Widget",dE="longtap",dF="default",dM="minHeight is larger than maxHeight!",dN="TabIndex property must be between 1 and 32000",dO="_applyFont",dP="cursor",dJ="qxDroppable",dK="' already created!",fc="changeZIndex",dL=": ",dT="Color",dU="changeEnabled",fe="__zS",dV="Abstract method call: _getContentHeightForWidth()!",dQ="changeFont",dR="qx.event.type.Focus",fd="_applyDecorator",dS="_applyZIndex",dW="_applyTextColor",dX=' has no themeable property "',ek="Widget is not focusable!",ej="qx.ui.menu.Menu",ei="engine.name",ep="qx.event.type.Drag",eo="Invalid right decorator inset detected: ",en="Invalid widget to add: ",em="qx.event.type.KeySequence",ed="excluded",ec="DOM element is not yet created!",eb="_applyToolTipText",ea="The layout of the widget",eh="Exception while creating child control '",eg="qx.event.type.Rotate",ef="_applyDroppable",ee=" is not a child of this widget!",ew="true",ev="widget",eu="Wrong 'top' argument. ",et="qxClass",eA="changeDecorator",ez="qx.event.type.Tap",ey="Integer",ex="changeBackgroundColor",es="_applyTabIndex",er="Invalid bottom decorator inset detected: ",eq="changeAppearance",eL="qx.debug",eK="qx.event.type.Track",eJ="shorthand",eP="/",eO="String",eN="border-box",eM="",eE="_applyContextMenu",eD="changeToolTipText",eC="padding",eB="tabIndex",eI="paddingBottom",eH="beforeContextmenuOpen",eG="changeNativeContextMenu",eF="undefined",eV="qx.ui.tooltip.ToolTip",eU="contextmenu",eT="_applyKeepFocus",eS="paddingRight",fa="minWidth is larger than maxWidth!",eY="changeLocale",eX="qx.event.type.Pointer",eW="qxKeepFocus",eR="opera",eQ="qx.event.type.Touch",dd="qxKeepActive",dc="absolute";qx.Class.define(dD,{extend:qx.ui.core.LayoutItem,include:[qx.locale.MTranslation],construct:function(){qx.ui.core.LayoutItem.call(this);this.__zN=this.__zT();this.initFocusable();this.initSelectable();this.initNativeContextMenu();}
,events:{appear:Y,disappear:Y,createChildControl:h,resize:h,move:h,syncAppearance:h,mousemove:R,mouseover:R,mouseout:R,mousedown:R,mouseup:R,click:R,dblclick:R,contextmenu:R,beforeContextmenuOpen:h,mousewheel:di,touchstart:eQ,touchend:eQ,touchmove:eQ,touchcancel:eQ,tap:ez,longtap:ez,dbltap:ez,swipe:eQ,rotate:eg,pinch:G,track:eK,roll:M,pointermove:eX,pointerover:eX,pointerout:eX,pointerdown:eX,pointerup:eX,pointercancel:eX,keyup:em,keydown:em,keypress:em,keyinput:n,focus:dR,blur:dR,focusin:dR,focusout:dR,activate:dR,deactivate:dR,capture:Y,losecapture:Y,drop:ep,dragleave:ep,dragover:ep,drag:ep,dragstart:ep,dragend:ep,dragchange:ep,droprequest:ep},properties:{paddingTop:{check:ey,init:0,apply:T,themeable:true},paddingRight:{check:ey,init:0,apply:T,themeable:true},paddingBottom:{check:ey,init:0,apply:T,themeable:true},paddingLeft:{check:ey,init:0,apply:T,themeable:true},padding:{group:[dn,eS,eI,P],mode:eJ,themeable:true},zIndex:{nullable:true,init:10,apply:dS,event:fc,check:ey,themeable:true},decorator:{nullable:true,init:null,apply:fd,event:eA,check:dg,themeable:true},backgroundColor:{nullable:true,check:dT,apply:g,event:ex,themeable:true},textColor:{nullable:true,check:dT,apply:dW,event:dr,themeable:true,inheritable:true},font:{nullable:true,apply:dO,check:x,event:dQ,themeable:true,inheritable:true,dereference:true},opacity:{check:E,apply:dG,themeable:true,nullable:true,init:null},cursor:{check:eO,apply:dj,themeable:true,inheritable:true,nullable:true,init:null},toolTip:{check:eV,nullable:true},toolTipText:{check:eO,nullable:true,event:eD,apply:eb},toolTipIcon:{check:eO,nullable:true,event:eD},blockToolTip:{check:dI,init:false},showToolTipWhenDisabled:{check:dI,init:false},visibility:{check:[X,fb,ed],init:X,apply:I,event:dk},enabled:{init:true,check:dI,inheritable:true,apply:C,event:dU},anonymous:{init:false,check:dI,apply:dy},tabIndex:{check:ey,nullable:true,apply:es},focusable:{check:dI,init:false,apply:k},keepFocus:{check:dI,init:false,apply:eT},keepActive:{check:dI,init:false,apply:F},draggable:{check:dI,init:false,apply:de},droppable:{check:dI,init:false,apply:ef},selectable:{check:dI,init:false,event:dY,apply:D},contextMenu:{check:ej,apply:eE,nullable:true,event:dl},nativeContextMenu:{check:dI,init:false,themeable:true,event:eG,apply:c},appearance:{check:eO,init:ev,apply:dz,event:eq}},statics:{DEBUG:false,getWidgetByElement:function(fj,fh){while(fj){var fg=fj.$$widget;if(fg!=null){var fi=qx.core.ObjectRegistry.fromHashCode(fg);if(!fh||!fi.getAnonymous()){return fi;}
;}
;try{fj=fj.parentNode;}
catch(e){return null;}
;}
;return null;}
,contains:function(parent,fk){while(fk){fk=fk.getLayoutParent();if(parent==fk){return true;}
;}
;return false;}
,__zO:new qx.util.ObjectPool()},members:{__zN:null,__zP:null,__zQ:null,__zR:null,_getLayout:function(){return this.__zR;}
,_setLayout:function(fl){if(qx.core.Environment.get(eL)){if(fl){this.assertInstance(fl,qx.ui.layout.Abstract);}
;}
;if(this.__zR){this.__zR.connectToWidget(null);}
;if(fl){fl.connectToWidget(this);}
;this.__zR=fl;qx.ui.core.queue.Layout.add(this);}
,setLayoutParent:function(parent){if(this.$$parent===parent){return;}
;var content=this.getContentElement();if(this.$$parent&&!this.$$parent.$$disposed){this.$$parent.getContentElement().remove(content);}
;this.$$parent=parent||null;if(parent&&!parent.$$disposed){this.$$parent.getContentElement().add(content);}
;this.$$refreshInheritables();qx.ui.core.queue.Visibility.add(this);}
,_updateInsets:null,renderLayout:function(fs,top,fp,fn){var ft=qx.ui.core.LayoutItem.prototype.renderLayout.call(this,fs,top,fp,fn);if(!ft){return null;}
;if(qx.lang.Object.isEmpty(ft)&&!this._updateInsets){return null;}
;var content=this.getContentElement();var fw=ft.size||this._updateInsets;var fu=dC;var fm={};if(ft.position){fm.left=fs+fu;fm.top=top+fu;}
;if(fw||ft.margin){fm.width=fp+fu;fm.height=fn+fu;}
;if(Object.keys(fm).length>0){content.setStyles(fm);}
;if(fw||ft.local||ft.margin){if(this.__zR&&this.hasLayoutChildren()){var fr=this.getInsets();var innerWidth=fp-fr.left-fr.right;var innerHeight=fn-fr.top-fr.bottom;var fv=this.getDecorator();var fq={left:0,right:0,top:0,bottom:0};if(fv){fv=qx.theme.manager.Decoration.getInstance().resolve(fv);fq=fv.getPadding();}
;var fo={top:this.getPaddingTop()+fq.top,right:this.getPaddingRight()+fq.right,bottom:this.getPaddingBottom()+fq.bottom,left:this.getPaddingLeft()+fq.left};this.__zR.renderLayout(innerWidth,innerHeight,fo);}
else if(this.hasLayoutChildren()){throw new Error(dh+this._findTopControl()+m);}
;}
;if(ft.position&&this.hasListener(q)){this.fireDataEvent(q,this.getBounds());}
;if(ft.size&&this.hasListener(df)){this.fireDataEvent(df,this.getBounds());}
;delete this._updateInsets;return ft;}
,__zS:null,clearSeparators:function(){var fy=this.__zS;if(!fy){return;}
;var fz=qx.ui.core.Widget.__zO;var content=this.getContentElement();var fx;for(var i=0,l=fy.length;i<l;i++ ){fx=fy[i];fz.poolObject(fx);content.remove(fx.getContentElement());}
;fy.length=0;}
,renderSeparator:function(fB,fC){var fA=qx.ui.core.Widget.__zO.getObject(qx.ui.core.Widget);fA.set({decorator:fB});var fE=fA.getContentElement();this.getContentElement().add(fE);var fD=fE.getDomElement();if(fD){fD.style.top=fC.top+dC;fD.style.left=fC.left+dC;fD.style.width=fC.width+dC;fD.style.height=fC.height+dC;}
else {fE.setStyles({left:fC.left+dC,top:fC.top+dC,width:fC.width+dC,height:fC.height+dC});}
;if(!this.__zS){this.__zS=[];}
;this.__zS.push(fA);}
,_computeSizeHint:function(){var fL=this.getWidth();var fF=this.getMinWidth();var fG=this.getMaxWidth();var fJ=this.getHeight();var fH=this.getMinHeight();var fI=this.getMaxHeight();if(qx.core.Environment.get(eL)){if(fF!==null&&fG!==null){this.assert(fF<=fG,fa);}
;if(fH!==null&&fI!==null){this.assert(fH<=fI,dM);}
;}
;var fM=this._getContentHint();var fK=this.getInsets();var fO=fK.left+fK.right;var fN=fK.top+fK.bottom;if(fL==null){fL=fM.width+fO;}
;if(fJ==null){fJ=fM.height+fN;}
;if(fF==null){fF=fO;if(fM.minWidth!=null){fF+=fM.minWidth;if(fF>fG&&fG!=null){fF=fG;}
;}
;}
;if(fH==null){fH=fN;if(fM.minHeight!=null){fH+=fM.minHeight;if(fH>fI&&fI!=null){fH=fI;}
;}
;}
;if(fG==null){if(fM.maxWidth==null){fG=Infinity;}
else {fG=fM.maxWidth+fO;if(fG<fF&&fF!=null){fG=fF;}
;}
;}
;if(fI==null){if(fM.maxHeight==null){fI=Infinity;}
else {fI=fM.maxHeight+fN;if(fI<fH&&fH!=null){fI=fH;}
;}
;}
;return {width:fL,minWidth:fF,maxWidth:fG,height:fJ,minHeight:fH,maxHeight:fI};}
,invalidateLayoutCache:function(){qx.ui.core.LayoutItem.prototype.invalidateLayoutCache.call(this);if(this.__zR){this.__zR.invalidateLayoutCache();}
;}
,_getContentHint:function(){var fQ=this.__zR;if(fQ){if(this.hasLayoutChildren()){var fR=fQ.getSizeHint();if(qx.core.Environment.get(eL)){var fP=ea+this.toString()+dA;this.assertInteger(fR.width,S+fP);this.assertInteger(fR.height,eu+fP);}
;return fR;}
else {return {width:0,height:0};}
;}
else {return {width:100,height:50};}
;}
,_getHeightForWidth:function(fW){var fV=this.getInsets();var fS=fV.left+fV.right;var fY=fV.top+fV.bottom;var fX=fW-fS;var fT=this._getLayout();if(fT&&fT.hasHeightForWidth()){var ga=fT.getHeightForWidth(fX);}
else {ga=this._getContentHeightForWidth(fX);}
;var fU=ga+fY;return fU;}
,_getContentHeightForWidth:function(gb){throw new Error(dV);}
,getInsets:function(){var top=this.getPaddingTop();var gc=this.getPaddingRight();var gd=this.getPaddingBottom();var gg=this.getPaddingLeft();if(this.getDecorator()){var gf=qx.theme.manager.Decoration.getInstance().resolve(this.getDecorator());var ge=gf.getInsets();if(qx.core.Environment.get(eL)){this.assertNumber(ge.top,ff+ge.top);this.assertNumber(ge.right,eo+ge.right);this.assertNumber(ge.bottom,er+ge.bottom);this.assertNumber(ge.left,v+ge.left);}
;top+=ge.top;gc+=ge.right;gd+=ge.bottom;gg+=ge.left;}
;return {"top":top,"right":gc,"bottom":gd,"left":gg};}
,getInnerSize:function(){var gi=this.getBounds();if(!gi){return null;}
;var gh=this.getInsets();return {width:gi.width-gh.left-gh.right,height:gi.height-gh.top-gh.bottom};}
,fadeOut:function(gj){return this.getContentElement().fadeOut(gj);}
,fadeIn:function(gk){return this.getContentElement().fadeIn(gk);}
,_applyAnonymous:function(gl){if(gl){this.getContentElement().setAttribute(s,ew);}
else {this.getContentElement().removeAttribute(s);}
;}
,show:function(){this.setVisibility(X);}
,hide:function(){this.setVisibility(fb);}
,exclude:function(){this.setVisibility(ed);}
,isVisible:function(){return this.getVisibility()===X;}
,isHidden:function(){return this.getVisibility()!==X;}
,isExcluded:function(){return this.getVisibility()===ed;}
,isSeeable:function(){qx.ui.core.queue.Manager.flush();var gm=this.getContentElement().getDomElement();if(gm){return gm.offsetWidth>0;}
;return false;}
,__zT:function(){var go=this._createContentElement();go.setAttribute(dt,this.toHashCode());go.setStyles({"touch-action":du,"-ms-touch-action":du});if(qx.core.Environment.get(eL)){go.setAttribute(et,this.classname);}
;var gn={"zIndex":10,"boxSizing":eN};if(!qx.ui.root.Inline||!(this instanceof qx.ui.root.Inline)){gn.position=dc;}
;go.setStyles(gn);return go;}
,_createContentElement:function(){return new qx.html.Element(f,{overflowX:fb,overflowY:fb});}
,getContentElement:function(){return this.__zN;}
,__zU:null,getLayoutChildren:function(){var gq=this.__zU;if(!gq){return this.__zV;}
;var gr;for(var i=0,l=gq.length;i<l;i++ ){var gp=gq[i];if(gp.hasUserBounds()||gp.isExcluded()){if(gr==null){gr=gq.concat();}
;qx.lang.Array.remove(gr,gp);}
;}
;return gr||gq;}
,scheduleLayoutUpdate:function(){qx.ui.core.queue.Layout.add(this);}
,invalidateLayoutChildren:function(){var gs=this.__zR;if(gs){gs.invalidateChildrenCache();}
;qx.ui.core.queue.Layout.add(this);}
,hasLayoutChildren:function(){var gu=this.__zU;if(!gu){return false;}
;var gt;for(var i=0,l=gu.length;i<l;i++ ){gt=gu[i];if(!gt.hasUserBounds()&&!gt.isExcluded()){return true;}
;}
;return false;}
,getChildrenContainer:function(){return this;}
,__zV:[],_getChildren:function(){return this.__zU||this.__zV;}
,_indexOf:function(gw){var gv=this.__zU;if(!gv){return -1;}
;return gv.indexOf(gw);}
,_hasChildren:function(){var gx=this.__zU;return gx!=null&&(!!gx[0]);}
,addChildrenToQueue:function(gy){var gz=this.__zU;if(!gz){return;}
;var gA;for(var i=0,l=gz.length;i<l;i++ ){gA=gz[i];gy.push(gA);gA.addChildrenToQueue(gy);}
;}
,_add:function(gC,gB){if(qx.core.Environment.get(eL)){this.assertInstance(gC,qx.ui.core.LayoutItem.constructor,V);}
;if(gC.getLayoutParent()==this){qx.lang.Array.remove(this.__zU,gC);}
;if(this.__zU){this.__zU.push(gC);}
else {this.__zU=[gC];}
;this.__zW(gC,gB);}
,_addAt:function(gG,gD,gF){if(!this.__zU){this.__zU=[];}
;if(gG.getLayoutParent()==this){qx.lang.Array.remove(this.__zU,gG);}
;var gE=this.__zU[gD];if(gE===gG){gG.setLayoutProperties(gF);}
;if(gE){qx.lang.Array.insertBefore(this.__zU,gG,gE);}
else {this.__zU.push(gG);}
;this.__zW(gG,gF);}
,_addBefore:function(gH,gJ,gI){if(qx.core.Environment.get(eL)){this.assertInArray(gJ,this._getChildren(),J);}
;if(gH==gJ){return;}
;if(!this.__zU){this.__zU=[];}
;if(gH.getLayoutParent()==this){qx.lang.Array.remove(this.__zU,gH);}
;qx.lang.Array.insertBefore(this.__zU,gH,gJ);this.__zW(gH,gI);}
,_addAfter:function(gM,gK,gL){if(qx.core.Environment.get(eL)){this.assertInArray(gK,this._getChildren(),dw);}
;if(gM==gK){return;}
;if(!this.__zU){this.__zU=[];}
;if(gM.getLayoutParent()==this){qx.lang.Array.remove(this.__zU,gM);}
;qx.lang.Array.insertAfter(this.__zU,gM,gK);this.__zW(gM,gL);}
,_remove:function(gN){if(!this.__zU){throw new Error(dx);}
;qx.lang.Array.remove(this.__zU,gN);this.__zX(gN);}
,_removeAt:function(gO){if(!this.__zU){throw new Error(dx);}
;var gP=this.__zU[gO];qx.lang.Array.removeAt(this.__zU,gO);this.__zX(gP);return gP;}
,_removeAll:function(){if(!this.__zU){return [];}
;var gQ=this.__zU.concat();this.__zU.length=0;for(var i=gQ.length-1;i>=0;i-- ){this.__zX(gQ[i]);}
;qx.ui.core.queue.Layout.add(this);return gQ;}
,_afterAddChild:null,_afterRemoveChild:null,__zW:function(gS,gR){if(qx.core.Environment.get(eL)){this.assertInstance(gS,qx.ui.core.LayoutItem,en+gS);this.assertNotIdentical(gS,this,B+gS);if(gR!=null){this.assertType(gR,j,A+gR);}
;}
;var parent=gS.getLayoutParent();if(parent&&parent!=this){parent._remove(gS);}
;gS.setLayoutParent(this);if(gR){gS.setLayoutProperties(gR);}
else {this.updateLayoutProperties();}
;if(this._afterAddChild){this._afterAddChild(gS);}
;}
,__zX:function(gT){if(qx.core.Environment.get(eL)){this.assertNotUndefined(gT);}
;if(gT.getLayoutParent()!==this){throw new Error(W+gT+ee);}
;gT.setLayoutParent(null);if(this.__zR){this.__zR.invalidateChildrenCache();}
;qx.ui.core.queue.Layout.add(this);if(this._afterRemoveChild){this._afterRemoveChild(gT);}
;}
,capture:function(gU){this.getContentElement().capture(gU);}
,releaseCapture:function(){this.getContentElement().releaseCapture();}
,isCapturing:function(){var gV=this.getContentElement().getDomElement();if(!gV){return false;}
;var gW=qx.event.Registration.getManager(gV);var gX=gW.getDispatcher(qx.event.dispatch.MouseCapture);return gV==gX.getCaptureElement();}
,_applyPadding:function(ha,gY,name){this._updateInsets=true;qx.ui.core.queue.Layout.add(this);this.__zY(name,ha);}
,__zY:function(hb,he){var content=this.getContentElement();var hc=this.getDecorator();hc=qx.theme.manager.Decoration.getInstance().resolve(hc);if(hc){var hd=qx.Bootstrap.firstLow(hb.replace(eC,eM));he+=hc.getPadding()[hd]||0;}
;content.setStyle(hb,he+dC);}
,_applyDecorator:function(hg,hf){var content=this.getContentElement();if(hf){hf=qx.theme.manager.Decoration.getInstance().getCssClassName(hf);content.removeClass(hf);}
;if(hg){hg=qx.theme.manager.Decoration.getInstance().addCssClass(hg);content.addClass(hg);}
;if(hg||hf){qx.ui.core.queue.Layout.add(this);}
;}
,_applyToolTipText:function(hj,hi){if(qx.core.Environment.get(y)){if(this.__zQ){return;}
;var hh=qx.locale.Manager.getInstance();this.__zQ=hh.addListener(eY,function(){var hk=this.getToolTipText();if(hk&&hk.translate){this.setToolTipText(hk.translate());}
;}
,this);}
;}
,_applyTextColor:function(hm,hl){}
,_applyZIndex:function(ho,hn){this.getContentElement().setStyle(dq,ho==null?0:ho);}
,_applyVisibility:function(hq,hp){var content=this.getContentElement();if(hq===X){content.show();}
else {content.hide();}
;var parent=this.$$parent;if(parent&&(hp==null||hq==null||hp===ed||hq===ed)){parent.invalidateLayoutChildren();}
;qx.ui.core.queue.Visibility.add(this);}
,_applyOpacity:function(hs,hr){this.getContentElement().setStyle(dp,hs==1?null:hs);}
,_applyCursor:function(hu,ht){if(hu==null&&!this.isSelectable()){hu=dF;}
;this.getContentElement().setStyle(dP,hu,qx.core.Environment.get(ei)==eR);}
,_applyBackgroundColor:function(hy,hx){var hw=this.getBackgroundColor();var content=this.getContentElement();var hv=qx.theme.manager.Color.getInstance().resolve(hw);content.setStyle(a,hv);}
,_applyFont:function(hA,hz){}
,_onChangeTheme:function(){if(this.isDisposed()){return;}
;qx.ui.core.LayoutItem.prototype._onChangeTheme.call(this);this.updateAppearance();var hB=this.getDecorator();this._applyDecorator(null,hB);this._applyDecorator(hB);hB=this.getFont();if(qx.lang.Type.isString(hB)){this._applyFont(hB,hB);}
;hB=this.getTextColor();if(qx.lang.Type.isString(hB)){this._applyTextColor(hB,hB);}
;hB=this.getBackgroundColor();if(qx.lang.Type.isString(hB)){this._applyBackgroundColor(hB,hB);}
;}
,__hc:null,$$stateChanges:null,_forwardStates:null,hasState:function(hD){var hC=this.__hc;return !!hC&&!!hC[hD];}
,addState:function(hH){var hG=this.__hc;if(!hG){hG=this.__hc={};}
;if(hG[hH]){return;}
;this.__hc[hH]=true;if(hH===dB){this.syncAppearance();}
else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;}
else {qx.ui.core.queue.Appearance.add(this);}
;var forward=this._forwardStates;var hF=this.__Ac;if(forward&&forward[hH]&&hF){var hE;for(var hI in hF){hE=hF[hI];if(hE instanceof qx.ui.core.Widget){hF[hI].addState(hH);}
;}
;}
;}
,removeState:function(hM){var hL=this.__hc;if(!hL||!hL[hM]){return;}
;delete this.__hc[hM];if(hM===dB){this.syncAppearance();}
else if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;}
else {qx.ui.core.queue.Appearance.add(this);}
;var forward=this._forwardStates;var hK=this.__Ac;if(forward&&forward[hM]&&hK){for(var hN in hK){var hJ=hK[hN];if(hJ instanceof qx.ui.core.Widget){hJ.removeState(hM);}
;}
;}
;}
,replaceState:function(hP,hS){var hR=this.__hc;if(!hR){hR=this.__hc={};}
;if(!hR[hS]){hR[hS]=true;}
;if(hR[hP]){delete hR[hP];}
;if(!qx.ui.core.queue.Visibility.isVisible(this)){this.$$stateChanges=true;}
else {qx.ui.core.queue.Appearance.add(this);}
;var forward=this._forwardStates;var hQ=this.__Ac;if(forward&&forward[hS]&&hQ){for(var hT in hQ){var hO=hQ[hT];if(hO instanceof qx.ui.core.Widget){hO.replaceState(hP,hS);}
;}
;}
;}
,__Aa:null,__Ab:null,syncAppearance:function(){var hY=this.__hc;var hX=this.__Aa;var ia=qx.theme.manager.Appearance.getInstance();var hV=qx.core.Property.$$method.setThemed;var ig=qx.core.Property.$$method.resetThemed;if(this.__Ab){delete this.__Ab;if(hX){var hU=ia.styleFrom(hX,hY,null,this.getAppearance());hX=null;}
;}
;if(!hX){var hW=this;var ib=[];do {ib.push(hW.$$subcontrol||hW.getAppearance());}
while(hW=hW.$$subparent);hX=ib.reverse().join(eP).replace(/#[0-9]+/g,eM);this.__Aa=hX;}
;var ie=ia.styleFrom(hX,hY,null,this.getAppearance());if(ie){if(hU){for(var ic in hU){if(ie[ic]===undefined){this[ig[ic]]();}
;}
;}
;if(qx.core.Environment.get(eL)){for(var ic in ie){if(!this[hV[ic]]){throw new Error(this.classname+dX+ic+O+hX);}
;}
;}
;for(var ic in ie){ie[ic]===undefined?this[ig[ic]]():this[hV[ic]](ie[ic]);}
;}
else if(hU){for(var ic in hU){this[ig[ic]]();}
;}
;this.fireDataEvent(N,this.__hc);}
,_applyAppearance:function(ii,ih){this.updateAppearance();}
,checkAppearanceNeeds:function(){if(!this.__zP){qx.ui.core.queue.Appearance.add(this);this.__zP=true;}
else if(this.$$stateChanges){qx.ui.core.queue.Appearance.add(this);delete this.$$stateChanges;}
;}
,updateAppearance:function(){this.__Ab=true;qx.ui.core.queue.Appearance.add(this);var il=this.__Ac;if(il){var ij;for(var ik in il){ij=il[ik];if(ij instanceof qx.ui.core.Widget){ij.updateAppearance();}
;}
;}
;}
,syncWidget:function(im){}
,getEventTarget:function(){var io=this;while(io.getAnonymous()){io=io.getLayoutParent();if(!io){return null;}
;}
;return io;}
,getFocusTarget:function(){var ip=this;if(!ip.getEnabled()){return null;}
;while(ip.getAnonymous()||!ip.getFocusable()){ip=ip.getLayoutParent();if(!ip||!ip.getEnabled()){return null;}
;}
;return ip;}
,getFocusElement:function(){return this.getContentElement();}
,isTabable:function(){return (!!this.getContentElement().getDomElement())&&this.isFocusable();}
,_applyFocusable:function(is,iq){var ir=this.getFocusElement();if(is){var it=this.getTabIndex();if(it==null){it=1;}
;ir.setAttribute(eB,it);ir.setStyle(dv,du);}
else {if(ir.isNativelyFocusable()){ir.setAttribute(eB,-1);}
else if(iq){ir.setAttribute(eB,null);}
;}
;}
,_applyKeepFocus:function(iv){var iu=this.getFocusElement();iu.setAttribute(eW,iv?dm:null);}
,_applyKeepActive:function(ix){var iw=this.getContentElement();iw.setAttribute(dd,ix?dm:null);}
,_applyTabIndex:function(iy){if(iy==null){iy=1;}
else if(iy<1||iy>32000){throw new Error(dN);}
;if(this.getFocusable()&&iy!=null){this.getFocusElement().setAttribute(eB,iy);}
;}
,_applySelectable:function(iA,iz){if(iz!==null){this._applyCursor(this.getCursor());}
;this.getContentElement().setSelectable(iA);}
,_applyEnabled:function(iC,iB){if(iC===false){this.addState(p);this.removeState(dB);if(this.isFocusable()){this.removeState(o);this._applyFocusable(false,true);}
;if(this.isDraggable()){this._applyDraggable(false,true);}
;if(this.isDroppable()){this._applyDroppable(false,true);}
;}
else {this.removeState(p);if(this.isFocusable()){this._applyFocusable(true,false);}
;if(this.isDraggable()){this._applyDraggable(true,false);}
;if(this.isDroppable()){this._applyDroppable(true,false);}
;}
;}
,_applyNativeContextMenu:function(iE,iD,name){}
,_applyContextMenu:function(iG,iF){if(iF){iF.removeState(eU);if(iF.getOpener()==this){iF.resetOpener();}
;if(!iG){this.removeListener(eU,this._onContextMenuOpen);this.removeListener(dE,this._onContextMenuOpen);iF.removeListener(dk,this._onBeforeContextMenuOpen,this);}
;}
;if(iG){iG.setOpener(this);iG.addState(eU);if(!iF){this.addListener(eU,this._onContextMenuOpen);this.addListener(dE,this._onContextMenuOpen);iG.addListener(dk,this._onBeforeContextMenuOpen,this);}
;}
;}
,_onContextMenuOpen:function(e){if(e.getType()==dE){if(e.getPointerType()!==d){return;}
;}
;this.getContextMenu().openAtPointer(e);e.stop();}
,_onBeforeContextMenuOpen:function(e){if(e.getData()==X&&this.hasListener(eH)){this.fireDataEvent(eH,e);}
;}
,_onStopEvent:function(e){e.stopPropagation();}
,_getDragDropCursor:function(){return qx.ui.core.DragDropCursor.getInstance();}
,_applyDraggable:function(iI,iH){if(!this.isEnabled()&&iI===true){iI=false;}
;this._getDragDropCursor();if(iI){this.addListener(u,this._onDragStart);this.addListener(b,this._onDrag);this.addListener(H,this._onDragEnd);this.addListener(z,this._onDragChange);}
else {this.removeListener(u,this._onDragStart);this.removeListener(b,this._onDrag);this.removeListener(H,this._onDragEnd);this.removeListener(z,this._onDragChange);}
;this.getContentElement().setAttribute(L,iI?dm:null);}
,_applyDroppable:function(iK,iJ){if(!this.isEnabled()&&iK===true){iK=false;}
;this.getContentElement().setAttribute(dJ,iK?dm:null);}
,_onDragStart:function(e){this._getDragDropCursor().placeToPointer(e);this.getApplicationRoot().setGlobalCursor(dF);}
,_onDrag:function(e){this._getDragDropCursor().placeToPointer(e);}
,_onDragEnd:function(e){this._getDragDropCursor().moveTo(-1000,-1000);this.getApplicationRoot().resetGlobalCursor();}
,_onDragChange:function(e){var iL=this._getDragDropCursor();var iM=e.getCurrentAction();iM?iL.setAction(iM):iL.resetAction();}
,visualizeFocus:function(){this.addState(o);}
,visualizeBlur:function(){this.removeState(o);}
,scrollChildIntoView:function(iR,iQ,iP,iO){iO=typeof iO==eF?true:iO;var iN=qx.ui.core.queue.Layout;var parent;if(iO){iO=!iN.isScheduled(iR);parent=iR.getLayoutParent();if(iO&&parent){iO=!iN.isScheduled(parent);if(iO){parent.getChildren().forEach(function(iS){iO=iO&&!iN.isScheduled(iS);}
);}
;}
;}
;this.scrollChildIntoViewX(iR,iQ,iO);this.scrollChildIntoViewY(iR,iP,iO);}
,scrollChildIntoViewX:function(iV,iT,iU){this.getContentElement().scrollChildIntoViewX(iV.getContentElement(),iT,iU);}
,scrollChildIntoViewY:function(iY,iW,iX){this.getContentElement().scrollChildIntoViewY(iY.getContentElement(),iW,iX);}
,focus:function(){if(this.isFocusable()){this.getFocusElement().focus();}
else {throw new Error(ek);}
;}
,blur:function(){if(this.isFocusable()){this.getFocusElement().blur();}
else {throw new Error(ek);}
;}
,activate:function(){this.getContentElement().activate();}
,deactivate:function(){this.getContentElement().deactivate();}
,tabFocus:function(){this.getFocusElement().focus();}
,hasChildControl:function(ja){if(!this.__Ac){return false;}
;return !!this.__Ac[ja];}
,__Ac:null,_getCreatedChildControls:function(){return this.__Ac;}
,getChildControl:function(jd,jc){if(!this.__Ac){if(jc){return null;}
;this.__Ac={};}
;var jb=this.__Ac[jd];if(jb){return jb;}
;if(jc===true){return null;}
;return this._createChildControl(jd);}
,_showChildControl:function(jf){var je=this.getChildControl(jf);je.show();return je;}
,_excludeChildControl:function(jh){var jg=this.getChildControl(jh,true);if(jg){jg.exclude();}
;}
,_isChildControlVisible:function(jj){var ji=this.getChildControl(jj,true);if(ji){return ji.isVisible();}
;return false;}
,_releaseChildControl:function(jn){var jk=this.getChildControl(jn,false);if(!jk){throw new Error(t+jn);}
;delete jk.$$subcontrol;delete jk.$$subparent;var jl=this.__hc;var forward=this._forwardStates;if(jl&&forward&&jk instanceof qx.ui.core.Widget){for(var jm in jl){if(forward[jm]){jk.removeState(jm);}
;}
;}
;delete this.__Ac[jn];return jk;}
,_createChildControl:function(js){if(!this.__Ac){this.__Ac={};}
else if(this.__Ac[js]){throw new Error(K+js+dK);}
;var jp=js.indexOf(U);try{if(jp==-1){var jo=this._createChildControlImpl(js);}
else {var jo=this._createChildControlImpl(js.substring(0,jp),js.substring(jp+1,js.length));}
;}
catch(jt){jt.message=eh+js+Q+this.toString()+dL+jt.message;throw jt;}
;if(!jo){throw new Error(t+js);}
;jo.$$subcontrol=js;jo.$$subparent=this;var jq=this.__hc;var forward=this._forwardStates;if(jq&&forward&&jo instanceof qx.ui.core.Widget){for(var jr in jq){if(forward[jr]){jo.addState(jr);}
;}
;}
;this.fireDataEvent(r,jo);return this.__Ac[js]=jo;}
,_createChildControlImpl:function(jv,ju){return null;}
,_disposeChildControls:function(){var jz=this.__Ac;if(!jz){return;}
;var jx=qx.ui.core.Widget;for(var jy in jz){var jw=jz[jy];if(!jx.contains(this,jw)){jw.destroy();}
else {jw.dispose();}
;}
;delete this.__Ac;}
,_findTopControl:function(){var jA=this;while(jA){if(!jA.$$subparent){return jA;}
;jA=jA.$$subparent;}
;return null;}
,getContentLocation:function(jC){var jB=this.getContentElement().getDomElement();return jB?qx.bom.element.Location.get(jB,jC):null;}
,setDomLeft:function(jE){var jD=this.getContentElement().getDomElement();if(jD){jD.style.left=jE+dC;}
else {throw new Error(ec);}
;}
,setDomTop:function(jG){var jF=this.getContentElement().getDomElement();if(jF){jF.style.top=jG+dC;}
else {throw new Error(ec);}
;}
,setDomPosition:function(jI,top){var jH=this.getContentElement().getDomElement();if(jH){jH.style.left=jI+dC;jH.style.top=top+dC;}
else {throw new Error(ec);}
;}
,destroy:function(){if(this.$$disposed){return;}
;var parent=this.$$parent;if(parent){parent._remove(this);}
;qx.ui.core.queue.Dispose.add(this);}
,clone:function(){var jJ=qx.ui.core.LayoutItem.prototype.clone.call(this);if(this.getChildren){var jK=this.getChildren();for(var i=0,l=jK.length;i<l;i++ ){jJ.add(jK[i].clone());}
;}
;return jJ;}
},destruct:function(){if(!qx.core.ObjectRegistry.inShutDown){if(qx.core.Environment.get(y)){if(this.__zQ){qx.locale.Manager.getInstance().removeListenerById(this.__zQ);}
;}
;var jL=this.getContentElement();if(jL){jL.setAttribute(dt,null,true);}
;this._disposeChildControls();qx.ui.core.queue.Appearance.remove(this);qx.ui.core.queue.Layout.remove(this);qx.ui.core.queue.Visibility.remove(this);qx.ui.core.queue.Widget.remove(this);}
;if(this.getContextMenu()){this.setContextMenu(null);}
;if(!qx.core.ObjectRegistry.inShutDown){this.clearSeparators();this.__zS=null;}
else {this._disposeArray(fe);}
;this._disposeArray(ds);this.__hc=this.__Ac=null;this._disposeObjects(dH,w);}
});}
)();
(function(){var a="blur",b="activate",c="focus",d="qx.ui.core.EventHandler";qx.Class.define(d,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(){qx.core.Object.call(this);this.__ff=qx.event.Registration.getManager(window);}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_FIRST,SUPPORTED_TYPES:{mousemove:1,mouseover:1,mouseout:1,mousedown:1,mouseup:1,click:1,dblclick:1,contextmenu:1,mousewheel:1,keyup:1,keydown:1,keypress:1,keyinput:1,capture:1,losecapture:1,focusin:1,focusout:1,focus:1,blur:1,activate:1,deactivate:1,appear:1,disappear:1,dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1,touchstart:1,touchend:1,touchmove:1,touchcancel:1,tap:1,longtap:1,swipe:1,dbltap:1,track:1,trackend:1,trackstart:1,pinch:1,rotate:1,roll:1,pointermove:1,pointerover:1,pointerout:1,pointerdown:1,pointerup:1,pointercancel:1},IGNORE_CAN_HANDLE:false},members:{__ff:null,__Ad:{focusin:1,focusout:1,focus:1,blur:1},__Ae:{mouseover:1,mouseout:1,appear:1,disappear:1},canHandleEvent:function(f,e){return f instanceof qx.ui.core.Widget;}
,_dispatchEvent:function(j){var o=j.getTarget();var n=qx.ui.core.Widget.getWidgetByElement(o);var p=false;while(n&&n.isAnonymous()){var p=true;n=n.getLayoutParent();}
;if(n&&p&&j.getType()==b){n.getContentElement().activate();}
;if(this.__Ad[j.getType()]){n=n&&n.getFocusTarget();if(!n){return;}
;}
;if(j.getRelatedTarget){var w=j.getRelatedTarget();var v=qx.ui.core.Widget.getWidgetByElement(w);while(v&&v.isAnonymous()){v=v.getLayoutParent();}
;if(v){if(this.__Ad[j.getType()]){v=v.getFocusTarget();}
;if(v===n){return;}
;}
;}
;var r=j.getCurrentTarget();var t=qx.ui.core.Widget.getWidgetByElement(r);if(!t||t.isAnonymous()){return;}
;if(this.__Ad[j.getType()]){t=t.getFocusTarget();}
;var u=j.getType();if(!t||!(t.isEnabled()||this.__Ae[u])){return;}
;var g=j.getEventPhase()==qx.event.type.Event.CAPTURING_PHASE;var q=this.__ff.getListeners(t,u,g);if(j.getEventPhase()==qx.event.type.Event.AT_TARGET){if(!q){q=[];}
;var h=this.__ff.getListeners(t,u,!g);if(h){q=q.concat(h);}
;}
;if(!q||q.length===0){return;}
;var k=qx.event.Pool.getInstance().getObject(j.constructor);j.clone(k);k.setTarget(n);k.setRelatedTarget(v||null);k.setCurrentTarget(t);var x=j.getOriginalTarget();if(x){var m=qx.ui.core.Widget.getWidgetByElement(x);while(m&&m.isAnonymous()){m=m.getLayoutParent();}
;k.setOriginalTarget(m);}
else {k.setOriginalTarget(o);}
;for(var i=0,l=q.length;i<l;i++ ){var s=q[i].context||t;q[i].handler.call(s,k);}
;if(k.getPropagationStopped()){j.stopPropagation();}
;if(k.getDefaultPrevented()){j.preventDefault();}
;qx.event.Pool.getInstance().poolObject(k);}
,registerEvent:function(A,z,y){var B;if(z===c||z===a){B=A.getFocusElement();}
else {B=A.getContentElement();}
;if(B){B.addListener(z,this._dispatchEvent,this,y);}
;}
,unregisterEvent:function(E,D,C){var F;if(D===c||D===a){F=E.getFocusElement();}
else {F=E.getContentElement();}
;if(F){F.removeListener(D,this._dispatchEvent,this,C);}
;}
},destruct:function(){this.__ff=null;}
,defer:function(G){qx.event.Registration.addHandler(G);}
});}
)();
(function(){var a="blur",b="qxDraggable",c="touch",d="qx.ui.core.Widget",f="longtap",g="Escape",h="drag",i="keydown",j="Unsupported data type: ",k="roll",l="drop",m="qxDroppable",n="qx.event.handler.DragDrop",o="mouse",p="This method must not be used outside the drop event listener!",q="Control",r="Shift",s="!",t="alias",u="droprequest",v="copy",w="pointerup",x="dragstart",y="move",z="pointerdown",A="dragchange",B="on",C="Alt",D="keyup",E="keypress",F="dragleave",G="dragend",H="dragover",I="left",J="Please use a droprequest listener to the drag source to fill the manager with data!",K="pointermove";qx.Class.define(n,{extend:qx.core.Object,implement:qx.event.IEventHandler,construct:function(L){qx.core.Object.call(this);this.__ff=L;this.__k=L.getWindow().document.documentElement;this.__ff.addListener(this.__k,f,this._onLongtap,this);this.__ff.addListener(this.__k,z,this._onPointerdown,this,true);qx.event.Registration.addListener(window,a,this._onWindowBlur,this);this.__Aq();}
,statics:{PRIORITY:qx.event.Registration.PRIORITY_NORMAL,SUPPORTED_TYPES:{dragstart:1,dragend:1,dragover:1,dragleave:1,drop:1,drag:1,dragchange:1,droprequest:1},IGNORE_CAN_HANDLE:true,ALLOWED_BUTTONS:[I],MIN_DRAG_DISTANCE:5},properties:{cursor:{check:d,nullable:true,init:null}},members:{__ff:null,__k:null,__Af:null,__Ag:null,__pw:null,__Ah:null,__Ai:null,__ib:null,__Aj:null,__Ak:null,__Al:false,__Am:false,__An:false,__Ao:null,__Ap:null,canHandleEvent:function(N,M){}
,registerEvent:function(Q,P,O){}
,unregisterEvent:function(T,S,R){}
,addType:function(U){this.__pw[U]=true;}
,addAction:function(V){this.__Ah[V]=true;}
,supportsType:function(W){return !!this.__pw[W];}
,supportsAction:function(X){return !!this.__Ah[X];}
,setDropAllowed:function(Y){this.__Am=Y;this.__Ar();}
,getData:function(ba){if(!this.__Am||!this.__Af){throw new Error(p);}
;if(!this.__pw[ba]){throw new Error(j+ba+s);}
;if(!this.__ib[ba]){this.__Aj=ba;this.__sl(u,this.__Ag,this.__Af,false);}
;if(!this.__ib[ba]){throw new Error(J);}
;return this.__ib[ba]||null;}
,getCurrentAction:function(){this.__Ar();return this.__Ak;}
,getDragTarget:function(){return this.__Ao;}
,addData:function(bb,bc){this.__ib[bb]=bc;}
,getCurrentType:function(){return this.__Aj;}
,isSessionActive:function(){return this.__Al;}
,__Aq:function(){this.__pw={};this.__Ah={};this.__Ai={};this.__ib={};}
,__Ar:function(){if(this.__Ag==null){return;}
;var bg=this.__Ah;var bd=this.__Ai;var be=null;if(this.__Am){if(bd.Shift&&bd.Control&&bg.alias){be=t;}
else if(bd.Shift&&bd.Alt&&bg.copy){be=v;}
else if(bd.Shift&&bg.move){be=y;}
else if(bd.Alt&&bg.alias){be=t;}
else if(bd.Control&&bg.copy){be=v;}
else if(bg.move){be=y;}
else if(bg.copy){be=v;}
else if(bg.alias){be=t;}
;}
;var bf=this.__Ak;if(be!=bf){if(this.__Af){this.__Ak=be;this.__An=this.__sl(A,this.__Af,this.__Ag,true);if(!this.__An){be=null;}
;}
;if(be!=bf){this.__Ak=be;this.__sl(A,this.__Ag,this.__Af,false);}
;}
;}
,__sl:function(bm,bi,bj,bk,bn){var bl=qx.event.Registration;var bh=bl.createEvent(bm,qx.event.type.Drag,[bk,bn]);if(bi!==bj){bh.setRelatedTarget(bj);}
;return bl.dispatchEvent(bi,bh);}
,__As:function(bo){while(bo&&bo.nodeType==1){if(bo.getAttribute(b)==B){return bo;}
;bo=bo.parentNode;}
;return null;}
,__At:function(bp){while(bp&&bp.nodeType==1){if(bp.getAttribute(m)==B){return bp;}
;bp=bp.parentNode;}
;return null;}
,clearSession:function(){this.__ff.removeListener(this.__k,K,this._onPointermove,this);this.__ff.removeListener(this.__k,w,this._onPointerup,this,true);this.__ff.removeListener(this.__k,i,this._onKeyDown,this,true);this.__ff.removeListener(this.__k,D,this._onKeyUp,this,true);this.__ff.removeListener(this.__k,E,this._onKeyPress,this,true);this.__ff.removeListener(this.__k,k,this._onRoll,this,true);if(this.__Ag){this.__sl(G,this.__Ag,this.__Af,false);}
;this.__Am=false;this.__Af=null;if(this.__Ao){this.__Ao.removeState(h);this.__Ao=null;}
;this.__Ag=null;this.__Al=false;this.__Ap=null;this.__Aq();}
,_onLongtap:function(e){if(e.getPointerType()!=c){return;}
;this.__ff.addListener(this.__k,k,this._onRoll,this,true);this._start(e);}
,_start:function(e){var br=qx.event.handler.DragDrop.ALLOWED_BUTTONS.indexOf(e.getButton())!==-1;if(!e.isPrimary()||!br){return false;}
;var bs=this.__Ap?this.__Ap.target:e.getTarget();var bq=this.__As(bs);if(bq){this.__Ag=bq;var bt=qx.ui.core.Widget.getWidgetByElement(this.__Ap.original);while(bt&&bt.isAnonymous()){bt=bt.getLayoutParent();}
;if(bt){this.__Ao=bt;bt.addState(h);}
;if(!this.__sl(x,this.__Ag,this.__Af,true,e)){return false;}
;this.__ff.addListener(this.__k,i,this._onKeyDown,this,true);this.__ff.addListener(this.__k,D,this._onKeyUp,this,true);this.__ff.addListener(this.__k,E,this._onKeyPress,this,true);this.__Al=true;return true;}
;}
,_onPointerdown:function(e){if(e.isPrimary()){this.__Ap={target:e.getTarget(),original:e.getOriginalTarget(),left:e.getDocumentLeft(),top:e.getDocumentTop()};this.__ff.addListener(this.__k,K,this._onPointermove,this);this.__ff.addListener(this.__k,w,this._onPointerup,this,true);}
;}
,_onPointermove:function(e){if(!e.isPrimary()){return;}
;if(!this.__Al&&e.getPointerType()==o){var bA=this._getDelta(e);var bu=qx.event.handler.DragDrop.MIN_DRAG_DISTANCE;if(bA&&(Math.abs(bA.x)>bu||Math.abs(bA.y)>bu)){if(!this._start(e)){this.clearSession();return;}
;}
;}
;if(!this.__Al){return;}
;if(!this.__sl(h,this.__Ag,this.__Af,true,e)){this.clearSession();}
;var bv=e.getTarget();var by=this.getCursor();if(!by){by=qx.ui.core.DragDropCursor.getInstance();}
;var bx=by.getContentElement().getDomElement();if(bv!==bx){var bw=this.__At(bv);if(bw&&bw!=this.__Af){if(this.__Af){this.__sl(F,this.__Af,this.__Ag,false,e);}
;this.__Am=true;this.__Af=bw;this.__Am=this.__sl(H,bw,this.__Ag,true,e);}
else if(!bw&&this.__Af){this.__sl(F,this.__Af,this.__Ag,false,e);this.__Af=null;this.__Am=false;qx.event.Timer.once(this.__Ar,this,0);}
;}
;var bz=this.__Ai;bz.Control=e.isCtrlPressed();bz.Shift=e.isShiftPressed();bz.Alt=e.isAltPressed();this.__Ar();}
,_getDelta:function(e){if(!this.__Ap){return null;}
;var bB=e.getDocumentLeft()-this.__Ap.left;var bC=e.getDocumentTop()-this.__Ap.top;return {"x":bB,"y":bC};}
,_onPointerup:function(e){if(!e.isPrimary()){return;}
;if(this.__Am&&this.__An){this.__sl(l,this.__Af,this.__Ag,false,e);}
;if(e.getTarget()==this.__Ag){e.stopPropagation();}
;this.clearSession();}
,_onRoll:function(e){e.stop();}
,_onWindowBlur:function(e){this.clearSession();}
,_onKeyDown:function(e){var bD=e.getKeyIdentifier();switch(bD){case C:case q:case r:if(!this.__Ai[bD]){this.__Ai[bD]=true;this.__Ar();}
;};}
,_onKeyUp:function(e){var bE=e.getKeyIdentifier();switch(bE){case C:case q:case r:if(this.__Ai[bE]){this.__Ai[bE]=false;this.__Ar();}
;};}
,_onKeyPress:function(e){var bF=e.getKeyIdentifier();switch(bF){case g:this.clearSession();};}
},destruct:function(){qx.event.Registration.removeListener(window,a,this._onWindowBlur,this);this.__Ag=this.__Af=this.__ff=this.__k=this.__pw=this.__Ah=this.__Ai=this.__ib=null;}
,defer:function(bG){qx.event.Registration.addHandler(bG);}
});}
)();
(function(){var a="qx.event.type.Drag",b="touch";qx.Class.define(a,{extend:qx.event.type.Event,members:{init:function(c,d){qx.event.type.Event.prototype.init.call(this,true,c);if(d){this._native=d.getNativeEvent()||null;this._originalTarget=d.getOriginalTarget()||null;}
else {this._native=null;this._originalTarget=null;}
;return this;}
,clone:function(e){var f=qx.event.type.Event.prototype.clone.call(this,e);f._native=this._native;return f;}
,getDocumentLeft:function(){if(this._native==null){return 0;}
;var x=this._native.pageX;if(x!==undefined){if(x==0&&this._native.pointerType==b){x=this._native._original.changedTouches[0].pageX||0;}
;return Math.round(x);}
else {var g=qx.dom.Node.getWindow(this._native.srcElement);return Math.round(this._native.clientX)+qx.bom.Viewport.getScrollLeft(g);}
;}
,getDocumentTop:function(){if(this._native==null){return 0;}
;var y=this._native.pageY;if(y!==undefined){if(y==0&&this._native.pointerType==b){y=this._native._original.changedTouches[0].pageY||0;}
;return Math.round(y);}
else {var h=qx.dom.Node.getWindow(this._native.srcElement);return Math.round(this._native.clientY)+qx.bom.Viewport.getScrollTop(h);}
;}
,getManager:function(){return qx.event.Registration.getManager(this.getTarget()).getHandler(qx.event.handler.DragDrop);}
,addType:function(i){this.getManager().addType(i);}
,addAction:function(j){this.getManager().addAction(j);}
,supportsType:function(k){return this.getManager().supportsType(k);}
,supportsAction:function(l){return this.getManager().supportsAction(l);}
,addData:function(m,n){this.getManager().addData(m,n);}
,getData:function(o){return this.getManager().getData(o);}
,getCurrentType:function(){return this.getManager().getCurrentType();}
,getCurrentAction:function(){if(this.getDefaultPrevented()){return null;}
;return this.getManager().getCurrentAction();}
,setDropAllowed:function(p){this.getManager().setDropAllowed(p);}
,getDragTarget:function(){return this.getManager().getDragTarget();}
,stopSession:function(){this.getManager().clearSession();}
}});}
)();
(function(){var a="best-fit",b="placementRight",c="Boolean",d="bottom-right",e="' ",f="widget",g="placementLeft",h="qx.ui.core.MPlacement",i="left-top",j="Integer",k="left-middle",l="right-middle",m="top-center",n="[qx.ui.core.MPlacement.setMoveDirection()], the value was '",o="offsetRight",p="interval",q="keep-align",r="bottom-left",s="pointer",t="direct",u="shorthand",v="Invalid value for the parameter 'direction' ",w="offsetLeft",x="top-left",y="appear",z="offsetBottom",A="top",B="top-right",C="offsetTop",D="but 'top' or 'left' are allowed.",E="right-bottom",F="disappear",G="right-top",H="bottom-center",I="left-bottom",J="left";qx.Mixin.define(h,{statics:{__nc:null,__Au:J,setVisibleElement:function(K){this.__nc=K;}
,getVisibleElement:function(){return this.__nc;}
,setMoveDirection:function(L){if(L===A||L===J){this.__Au=L;}
else {throw new Error(v+n+L+e+D);}
;}
,getMoveDirection:function(){return this.__Au;}
},properties:{position:{check:[x,m,B,r,H,d,i,k,I,G,l,E],init:r,themeable:true},placeMethod:{check:[f,s],init:s,themeable:true},domMove:{check:c,init:false},placementModeX:{check:[t,q,a],init:q,themeable:true},placementModeY:{check:[t,q,a],init:q,themeable:true},offsetLeft:{check:j,init:0,themeable:true},offsetTop:{check:j,init:0,themeable:true},offsetRight:{check:j,init:0,themeable:true},offsetBottom:{check:j,init:0,themeable:true},offset:{group:[C,o,z,w],mode:u,themeable:true}},members:{__Av:null,__Aw:null,__Ax:null,getLayoutLocation:function(N){var P,O,R,top;O=N.getBounds();if(!O){return null;}
;R=O.left;top=O.top;var Q=O;N=N.getLayoutParent();while(N&&!N.isRootWidget()){O=N.getBounds();R+=O.left;top+=O.top;P=N.getInsets();R+=P.left;top+=P.top;N=N.getLayoutParent();}
;if(N.isRootWidget()){var M=N.getContentLocation();if(M){R+=M.left;top+=M.top;}
;}
;return {left:R,top:top,right:R+Q.width,bottom:top+Q.height};}
,moveTo:function(Y,top){var X=qx.ui.core.MPlacement.getVisibleElement();if(X){var W=this.getBounds();var V=X.getContentLocation();if(W&&V){var U=top+W.height;var T=Y+W.width;if((T>V.left&&Y<V.right)&&(U>V.top&&top<V.bottom)){var S=qx.ui.core.MPlacement.getMoveDirection();if(S===J){Y=Math.max(V.left-W.width,0);}
else {top=Math.max(V.top-W.height,0);}
;}
;}
;}
;if(this.getDomMove()){this.setDomPosition(Y,top);}
else {this.setLayoutProperties({left:Y,top:top});}
;}
,placeToWidget:function(bc,ba){if(ba){this.__Ay();this.__Av=qx.lang.Function.bind(this.placeToWidget,this,bc,false);qx.event.Idle.getInstance().addListener(p,this.__Av);this.__Ax=function(){this.__Ay();}
;this.addListener(F,this.__Ax,this);}
;var bb=bc.getContentLocation()||this.getLayoutLocation(bc);if(bb!=null){this._place(bb);return true;}
else {return false;}
;}
,__Ay:function(){if(this.__Av){qx.event.Idle.getInstance().removeListener(p,this.__Av);this.__Av=null;}
;if(this.__Ax){this.removeListener(F,this.__Ax,this);this.__Ax=null;}
;}
,placeToPointer:function(event){var be=Math.round(event.getDocumentLeft());var top=Math.round(event.getDocumentTop());var bd={left:be,top:top,right:be,bottom:top};this._place(bd);}
,placeToElement:function(bh,bf){var location=qx.bom.element.Location.get(bh);var bg={left:location.left,top:location.top,right:location.left+bh.offsetWidth,bottom:location.top+bh.offsetHeight};if(bf){this.__Av=qx.lang.Function.bind(this.placeToElement,this,bh,false);qx.event.Idle.getInstance().addListener(p,this.__Av);this.addListener(F,function(){if(this.__Av){qx.event.Idle.getInstance().removeListener(p,this.__Av);this.__Av=null;}
;}
,this);}
;this._place(bg);}
,placeToPoint:function(bj){var bi={left:bj.left,top:bj.top,right:bj.left,bottom:bj.top};this._place(bi);}
,_getPlacementOffsets:function(){return {left:this.getOffsetLeft(),top:this.getOffsetTop(),right:this.getOffsetRight(),bottom:this.getOffsetBottom()};}
,__Az:function(bk){var bl=null;if(this._computePlacementSize){var bl=this._computePlacementSize();}
else if(this.isVisible()){var bl=this.getBounds();}
;if(bl==null){this.addListenerOnce(y,function(){this.__Az(bk);}
,this);}
else {bk.call(this,bl);}
;}
,_place:function(bm){this.__Az(function(bo){var bn=qx.util.placement.Placement.compute(bo,this.getLayoutParent().getBounds(),bm,this._getPlacementOffsets(),this.getPosition(),this.getPlacementModeX(),this.getPlacementModeY());this.removeState(g);this.removeState(b);this.addState(bm.left<bn.left?b:g);this.moveTo(bn.left,bn.top);}
);}
},destruct:function(){this.__Ay();}
});}
)();
(function(){var a="Number",b="interval",c="_applyTimeoutInterval",d="qx.event.type.Event",e="qx.event.Idle",f="singleton";qx.Class.define(e,{extend:qx.core.Object,type:f,construct:function(){qx.core.Object.call(this);}
,events:{"interval":d},properties:{timeoutInterval:{check:a,init:100,apply:c}},members:{__rq:null,_applyTimeoutInterval:function(g){if(this.__rq){this.__rq.setInterval(g);}
;}
,_onInterval:function(){this.fireEvent(b);}
,__AA:function(){if(!this.__rq&&this.hasListener(b)){var h=new qx.event.Timer(this.getTimeoutInterval());h.addListener(b,this._onInterval,this);h.start();this.__rq=h;}
;}
,__AB:function(){if(this.__rq&&!this.hasListener(b)){this.__rq.stop();this.__rq.dispose();this.__rq=null;}
;}
,addListener:function(k,i,self,j){var l=qx.core.Object.prototype.addListener.call(this,k,i,self,j);this.__AA();return l;}
,addListenerOnce:function(o,m,self,n){var p=qx.core.Object.prototype.addListenerOnce.call(this,o,m,self,n);this.__AA();return p;}
,removeListener:function(s,q,self,r){var t=qx.core.Object.prototype.removeListener.call(this,s,q,self,r);this.__AB();return t;}
,removeListenerById:function(u){var v=qx.core.Object.prototype.removeListenerById.call(this,u);this.__AB();return v;}
},destruct:function(){if(this.__rq){this.__rq.stop();}
;this.__rq=null;}
});}
)();
(function(){var a="-",b="best-fit",c="size",d="edge-start",e="target.bottom",f="offsets",g='__AC',h="size.width",i="bottom",j="offsets.bottom",k="qx.util.placement.Placement",l="Please use '",m="qx.debug",n="keep-align",o="center",p="target.right",q="direct",r="offsets.right",s="middle",t="target",u="align-start",v="Invalid 'mode' argument!'",w="left",x="align-end",y="Class",z="offsets.left",A="top",B="area",C="right",D="edge-end",E="target.top",F="area.height",G="target.left",H="align-center",I="area.width",J="' instead!",K="size.height",L="offsets.top";qx.Class.define(k,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__AC=qx.util.placement.DirectAxis;}
,properties:{axisX:{check:y},axisY:{check:y},edge:{check:[A,C,i,w],init:A},align:{check:[A,C,i,w,o,s],init:C}},statics:{__AD:null,compute:function(W,P,M,N,V,Q,R){this.__AD=this.__AD||new qx.util.placement.Placement();var T=V.split(a);var S=T[0];var O=T[1];if(qx.core.Environment.get(m)){if(O===o||O===s){var U=s;if(S===A||S===i){U=o;}
;qx.core.Assert.assertEquals(U,O,l+S+a+U+J);}
;}
;this.__AD.set({axisX:this.__AH(Q),axisY:this.__AH(R),edge:S,align:O});return this.__AD.compute(W,P,M,N);}
,__AE:null,__AF:null,__AG:null,__AH:function(X){switch(X){case q:this.__AE=this.__AE||qx.util.placement.DirectAxis;return this.__AE;case n:this.__AF=this.__AF||qx.util.placement.KeepAlignAxis;return this.__AF;case b:this.__AG=this.__AG||qx.util.placement.BestFitAxis;return this.__AG;default:throw new Error(v);};}
},members:{__AC:null,compute:function(be,bb,Y,ba){if(qx.core.Environment.get(m)){this.assertObject(be,c);this.assertNumber(be.width,h);this.assertNumber(be.height,K);this.assertObject(bb,B);this.assertNumber(bb.width,I);this.assertNumber(bb.height,F);this.assertObject(Y,t);this.assertNumber(Y.top,E);this.assertNumber(Y.right,p);this.assertNumber(Y.bottom,e);this.assertNumber(Y.left,G);this.assertObject(ba,f);this.assertNumber(ba.top,L);this.assertNumber(ba.right,r);this.assertNumber(ba.bottom,j);this.assertNumber(ba.left,z);}
;var bc=this.getAxisX()||this.__AC;var bf=bc.computeStart(be.width,{start:Y.left,end:Y.right},{start:ba.left,end:ba.right},bb.width,this.__AI());var bd=this.getAxisY()||this.__AC;var top=bd.computeStart(be.height,{start:Y.top,end:Y.bottom},{start:ba.top,end:ba.bottom},bb.height,this.__AJ());return {left:bf,top:top};}
,__AI:function(){var bh=this.getEdge();var bg=this.getAlign();if(bh==w){return d;}
else if(bh==C){return D;}
else if(bg==w){return u;}
else if(bg==o){return H;}
else if(bg==C){return x;}
;}
,__AJ:function(){var bj=this.getEdge();var bi=this.getAlign();if(bj==A){return d;}
else if(bj==i){return D;}
else if(bi==A){return u;}
else if(bi==s){return H;}
else if(bi==i){return x;}
;}
},destruct:function(){this._disposeObjects(g);}
});}
)();
(function(){var a="align-start",b="align-end",c="qx.util.placement.AbstractAxis",d="edge-start",e="align-center",f="abstract method call!",g="edge-end";qx.Bootstrap.define(c,{extend:Object,statics:{computeStart:function(j,k,l,h,i){throw new Error(f);}
,_moveToEdgeAndAlign:function(n,o,p,m){switch(m){case d:return o.start-p.end-n;case g:return o.end+p.start;case a:return o.start+p.start;case e:return o.start+parseInt((o.end-o.start-n)/2,10)+p.start;case b:return o.end-p.end-n;};}
,_isInRange:function(r,s,q){return r>=0&&r+s<=q;}
}});}
)();
(function(){var a="qx.util.placement.DirectAxis";qx.Bootstrap.define(a,{statics:{_moveToEdgeAndAlign:qx.util.placement.AbstractAxis._moveToEdgeAndAlign,computeStart:function(d,e,f,b,c){return this._moveToEdgeAndAlign(d,e,f,c);}
}});}
)();
(function(){var a="qx.util.placement.KeepAlignAxis",b="edge-start",c="edge-end";qx.Bootstrap.define(a,{statics:{_moveToEdgeAndAlign:qx.util.placement.AbstractAxis._moveToEdgeAndAlign,_isInRange:qx.util.placement.AbstractAxis._isInRange,computeStart:function(k,f,g,d,j){var i=this._moveToEdgeAndAlign(k,f,g,j);var e,h;if(this._isInRange(i,k,d)){return i;}
;if(j==b||j==c){e=f.start-g.end;h=f.end+g.start;}
else {e=f.end-g.end;h=f.start+g.start;}
;if(e>d-h){i=Math.max(0,e-k);}
else {i=h;}
;return i;}
}});}
)();
(function(){var a="qx.util.placement.BestFitAxis";qx.Bootstrap.define(a,{statics:{_isInRange:qx.util.placement.AbstractAxis._isInRange,_moveToEdgeAndAlign:qx.util.placement.AbstractAxis._moveToEdgeAndAlign,computeStart:function(g,c,d,b,f){var e=this._moveToEdgeAndAlign(g,c,d,f);if(this._isInRange(e,g,b)){return e;}
;if(e<0){e=Math.min(0,b-g);}
;if(e+g>b){e=Math.max(0,b-g);}
;return e;}
}});}
)();
(function(){var a="Image could not be loaded: ",b="Boolean",c="px",d="http",e=".png",f="background-image",g="engine.version",h="scale",j="changeSource",l="x",m="div",n="aborted",o="background-size",p="nonScaled",q="3",r="qx.ui.basic.Image",s="top",t="0 0",u="background",v=", no-repeat",w="qx.debug",x="loaded",y="backgroundImage",z="backgroundRepeat",A="-disabled.$1",B="class",C="qx.event.type.Event",D="image",E="loadingFailed",F="css.alphaimageloaderneeded",G="1.5",H="String",I="browser.documentmode",J="backgroundPosition",K="border-box",L="left",M="_applySource",N="$$widget",O="@",P="data:image/",Q="px, ",R='.',S="scaled",T=", ",U="2",V="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",W="mshtml",X="engine.name",Y=", 0 0",bq="_applyScale",br="try to load an unmanaged relative image: ",bs="position",bm="replacement",bn="img",bo="no-repeat",bp="background-position",bu="__AK",bv="hidden",bw="alphaScaled",bx=",",bt="absolute";qx.Class.define(r,{extend:qx.ui.core.Widget,construct:function(by){this.__AK={};qx.ui.core.Widget.call(this);if(by){this.setSource(by);}
;}
,properties:{source:{check:H,init:null,nullable:true,event:j,apply:M,themeable:true},scale:{check:b,init:false,themeable:true,apply:bq},appearance:{refine:true,init:D},allowShrinkX:{refine:true,init:false},allowShrinkY:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false}},events:{loadingFailed:C,loaded:C,aborted:C},statics:{PLACEHOLDER_IMAGE:V},members:{__AL:null,__AM:null,__eG:null,__AK:null,__AN:null,__AO:null,__AP:0,_onChangeTheme:function(){qx.ui.core.Widget.prototype._onChangeTheme.call(this);this._styleSource();}
,getContentElement:function(){return this.__AT();}
,_createContentElement:function(){return this.__AT();}
,_getContentHint:function(){return {width:this.__AL||0,height:this.__AM||0};}
,_applyDecorator:function(bB,bA){qx.ui.core.Widget.prototype._applyDecorator.call(this,bB,bA);var bC=this.getSource();bC=qx.util.AliasManager.getInstance().resolve(bC);var bz=this.getContentElement();if(this.__AO){bz=bz.getChild(0);}
;this.__Bd(bz,bC);}
,_applyPadding:function(bE,bD,name){qx.ui.core.Widget.prototype._applyPadding.call(this,bE,bD,name);var bF=this.getContentElement();if(this.__AO){bF.getChild(0).setStyles({top:this.getPaddingTop()||0,left:this.getPaddingLeft()||0});}
else {bF.setPadding(this.getPaddingLeft()||0,this.getPaddingTop()||0);}
;}
,renderLayout:function(bI,top,bG,bJ){qx.ui.core.Widget.prototype.renderLayout.call(this,bI,top,bG,bJ);var bH=this.getContentElement();if(this.__AO){bH.getChild(0).setStyles({width:bG-(this.getPaddingLeft()||0)-(this.getPaddingRight()||0),height:bJ-(this.getPaddingTop()||0)-(this.getPaddingBottom()||0),top:this.getPaddingTop()||0,left:this.getPaddingLeft()||0});}
;}
,_applyEnabled:function(bL,bK){qx.ui.core.Widget.prototype._applyEnabled.call(this,bL,bK);if(this.getSource()){this._styleSource();}
;}
,_applySource:function(bN,bM){if(bM){if(qx.io.ImageLoader.isLoading(bM)){qx.io.ImageLoader.abort(bM);}
;}
;this._styleSource();}
,_applyScale:function(bO){this._styleSource();}
,__AQ:function(bP){this.__eG=bP;}
,__AR:function(){if(this.__eG==null){var bR=this.getSource();var bQ=false;if(bR!=null){bQ=qx.lang.String.endsWith(bR,e);}
;if(this.getScale()&&bQ&&qx.core.Environment.get(F)){this.__eG=bw;}
else if(this.getScale()){this.__eG=S;}
else {this.__eG=p;}
;}
;return this.__eG;}
,__AS:function(bU){var bT;var bS;if(bU==bw){bT=true;bS=m;}
else if(bU==p){bT=false;bS=m;}
else {bT=true;bS=bn;}
;var bW=new qx.html.Image(bS);bW.setAttribute(N,this.toHashCode());bW.setScale(bT);bW.setStyles({"overflowX":bv,"overflowY":bv,"boxSizing":K});if(qx.core.Environment.get(F)){var bV=this.__AO=new qx.html.Element(m);bV.setAttribute(N,this.toHashCode());bV.setStyle(bs,bt);bV.add(bW);return bV;}
;return bW;}
,__AT:function(){if(this.$$disposed){return null;}
;var bX=this.__AR();if(this.__AK[bX]==null){this.__AK[bX]=this.__AS(bX);}
;var bY=this.__AK[bX];if(!this.__AN){this.__AN=bY;}
;return bY;}
,_styleSource:function(){var ce=qx.util.AliasManager.getInstance();var cd=qx.util.ResourceManager.getInstance();var cg=ce.resolve(this.getSource());var cf=this.getContentElement();if(this.__AO){cf=cf.getChild(0);}
;if(!cg){cf.resetSource();return;}
;this.__AW(cg);if((qx.core.Environment.get(X)==W)&&(parseInt(qx.core.Environment.get(g),10)<9||qx.core.Environment.get(I)<9)){var cb=this.getScale()?h:bo;cf.tagNameHint=qx.bom.element.Decoration.getTagName(cb,cg);}
;var cc=this.__AV();if(qx.util.ResourceManager.getInstance().has(cg)){var ch=this._findHighResolutionSource(cg);if(ch){var cj=cd.getImageHeight(cg);var ci=cd.getImageWidth(cg);this.setWidth(cj);this.setHeight(ci);var ca=cj+Q+ci+c;this.__AN.setStyle(o,ca);this.setSource(ch);cg=ch;}
;this.__AY(cc,cg);this.__AU();}
else if(qx.io.ImageLoader.isLoaded(cg)){this.__Ba(cc,cg);this.__AU();}
else {this.__Bb(cc,cg);}
;}
,__AU:function(){this.__AP++ ;qx.bom.AnimationFrame.request(function(ck){if(ck===this.__AP){this.fireEvent(x);}
else {this.fireEvent(n);}
;}
.bind(this,this.__AP));}
,__AV:function(){var cl=this.__AN;if(this.__AO){cl=cl.getChild(0);}
;return cl;}
,__AW:qx.core.Environment.select(X,{"mshtml":function(cn){var co=qx.core.Environment.get(F);var cm=qx.lang.String.endsWith(cn,e);if(co&&cm){if(this.getScale()&&this.__AR()!=bw){this.__AQ(bw);}
else if(!this.getScale()&&this.__AR()!=p){this.__AQ(p);}
;}
else {if(this.getScale()&&this.__AR()!=S){this.__AQ(S);}
else if(!this.getScale()&&this.__AR()!=p){this.__AQ(p);}
;}
;this.__AX(this.__AT());}
,"default":function(cp){if(this.getScale()&&this.__AR()!=S){this.__AQ(S);}
else if(!this.getScale()&&this.__AR()!=p){this.__AQ(p);}
;this.__AX(this.__AT());}
}),__AX:function(ct){var cs=this.__AN;if(cs!=ct){if(cs!=null){var cG=c;var cq={};var cw=cs.getAllStyles();if(cw){for(var cz in cw){cq[cz]=cw[cz];}
;}
;var cy=this.getBounds();if(cy!=null){cq.width=cy.width+cG;cq.height=cy.height+cG;}
;var cA=this.getInsets();cq.left=parseInt(cs.getStyle(L)||cA.left)+cG;cq.top=parseInt(cs.getStyle(s)||cA.top)+cG;cq.zIndex=10;var cB=this.__AO?ct.getChild(0):ct;cB.setStyles(cq,true);cB.setSelectable(this.getSelectable());if(!cs.isVisible()){ct.hide();}
else if(!ct.isVisible()){ct.show();}
;if(!cs.isIncluded()){ct.exclude();}
else if(!ct.isIncluded()){ct.include();}
;var cD=cs.getParent();if(cD){var cr=cD.getChildren().indexOf(cs);cD.removeAt(cr);cD.addAt(ct,cr);}
;var cv=cB.getNodeName();cB.setSource(null);var cu=this.__AV();cB.tagNameHint=cv;cB.setAttribute(B,cu.getAttribute(B));qx.html.Element.flush();var cF=cu.getDomElement();var cE=ct.getDomElement();var cC=cs.getListeners()||[];cC.forEach(function(cH){ct.addListener(cH.type,cH.handler,cH.self,cH.capture);}
);if(cF&&cE){var cx=cF.$$hash;cF.$$hash=cE.$$hash;cE.$$hash=cx;}
;this.__AN=ct;}
;}
;}
,__AY:function(cJ,cL){var cK=qx.util.ResourceManager.getInstance();if(!this.getEnabled()){var cI=cL.replace(/\.([a-z]+)$/,A);if(cK.has(cI)){cL=cI;this.addState(bm);}
else {this.removeState(bm);}
;}
;if(cJ.getSource()===cL){return;}
;this.__Bd(cJ,cL);this.__Be(cK.getImageWidth(cL),cK.getImageHeight(cL));}
,__Ba:function(cM,cQ){var cO=qx.io.ImageLoader;this.__Bd(cM,cQ);var cP=cO.getWidth(cQ);var cN=cO.getHeight(cQ);this.__Be(cP,cN);}
,__Bb:function(cR,cU){var cV=qx.io.ImageLoader;if(qx.core.Environment.get(w)){var cT=cU.toLowerCase();var cS=qx.lang.String.startsWith;if(!cS(cT,d)&&!cS(cT,P)){var self=this.self(arguments);if(!self.__Bc){self.__Bc={};}
;if(!self.__Bc[cU]){this.debug(br+cU);self.__Bc[cU]=true;}
;}
;}
;if(!cV.isFailed(cU)){cV.load(cU,this.__i,this);}
else {if(cR!=null){cR.resetSource();}
;}
;}
,__Bd:function(cW,db){if(cW.getNodeName()==m){var df=qx.theme.manager.Decoration.getInstance().resolve(this.getDecorator());if(df){var dc=(df.getStartColor()&&df.getEndColor());var da=df.getBackgroundImage();if(dc||da){var cX=this.getScale()?h:bo;var cY=qx.bom.element.Decoration.getAttributes(db,cX);var de=df.getStyles(true);var dd={"backgroundImage":cY.style.backgroundImage,"backgroundPosition":(cY.style.backgroundPosition||t),"backgroundRepeat":(cY.style.backgroundRepeat||bo)};if(da){dd[J]+=bx+de[bp]||t;dd[z]+=T+df.getBackgroundRepeat();}
;if(dc){dd[J]+=Y;dd[z]+=v;}
;dd[y]+=bx+(de[f]||de[u]);cW.setStyles(dd);return;}
;}
else {cW.setSource(null);}
;}
;cW.setSource(db);}
,_findHighResolutionSource:function(dg){var dj=[q,U,G];var di=parseFloat(qx.bom.client.Device.getDevicePixelRatio().toFixed(2));if(di<=1){return false;}
;var i=dj.length;while(i>0&&di>dj[ --i]){}
;var dh;var k;for(k=i;k>=0;k-- ){dh=this._getHighResolutionSource(dg,dj[k]);if(dh){return dh;}
;}
;for(k=i+1;k<dj.length;k++ ){dh=this._getHighResolutionSource(dg,dj[k]);if(dh){return dh;}
;}
;return null;}
,_getHighResolutionSource:function(dk,dl){var dn=dk.lastIndexOf(R);if(dn>-1){var dm=O+dl+l;var dp=dk.slice(0,dn)+dm+dk.slice(dn);if(qx.util.ResourceManager.getInstance().has(dp)){return dp;}
;}
;return null;}
,__i:function(dq,dr){if(this.$$disposed===true){return;}
;if(dq!==qx.util.AliasManager.getInstance().resolve(this.getSource())){this.fireEvent(n);return;}
;if(dr.failed){this.warn(a+dq);this.fireEvent(E);}
else if(dr.aborted){this.fireEvent(n);return;}
else {this.fireEvent(x);}
;this.__Ba(this.__AV(),dq);}
,__Be:function(ds,dt){if(ds!==this.__AL||dt!==this.__AM){this.__AL=ds;this.__AM=dt;qx.ui.core.queue.Layout.add(this);}
;}
},destruct:function(){for(var du in this.__AK){if(this.__AK.hasOwnProperty(du)){this.__AK[du].setAttribute(N,null,true);}
;}
;delete this.__AN;if(this.__AO){delete this.__AO;}
;this._disposeMap(bu);}
});}
)();
(function(){var a="mshtml",b='img',c="",d="qx.globalErrorHandling",e="load",f="qx.io.ImageLoader";qx.Bootstrap.define(f,{statics:{__iR:{},__Bf:{width:null,height:null},__Bg:/\.(png|gif|jpg|jpeg|bmp)\b/i,__Bh:/^data:image\/(png|gif|jpg|jpeg|bmp)\b/i,isLoaded:function(g){var h=this.__iR[g];return !!(h&&h.loaded);}
,isFailed:function(j){var k=this.__iR[j];return !!(k&&k.failed);}
,isLoading:function(m){var n=this.__iR[m];return !!(n&&n.loading);}
,getFormat:function(r){var q=this.__iR[r];if(!q||!q.format){var o=this.__Bh.exec(r);if(o!=null){var p=(q&&qx.lang.Type.isNumber(q.width)?q.width:this.__Bf.width);var s=(q&&qx.lang.Type.isNumber(q.height)?q.height:this.__Bf.height);q={loaded:true,format:o[1],width:p,height:s};}
;}
;return q?q.format:null;}
,getSize:function(t){var u=this.__iR[t];return u?{width:u.width,height:u.height}:this.__Bf;}
,getWidth:function(v){var w=this.__iR[v];return w?w.width:null;}
,getHeight:function(x){var y=this.__iR[x];return y?y.height:null;}
,load:function(B,A,C){var D=this.__iR[B];if(!D){D=this.__iR[B]={};}
;if(A&&!C){C=window;}
;if(D.loaded||D.loading||D.failed){if(A){if(D.loading){D.callbacks.push(A,C);}
else {A.call(C,B,D);}
;}
;}
else {D.loading=true;D.callbacks=[];if(A){D.callbacks.push(A,C);}
;var z=document.createElement(b);var E=qx.lang.Function.listener(this.__Bi,this,z,B);z.onload=E;z.onerror=E;z.src=B;D.element=z;}
;}
,abort:function(F){var I=this.__iR[F];if(I&&!I.loaded){I.aborted=true;var H=I.callbacks;var G=I.element;G.onload=G.onerror=null;G.src=c;delete I.callbacks;delete I.element;delete I.loading;for(var i=0,l=H.length;i<l;i+=2){H[i].call(H[i+1],F,I);}
;}
;this.__iR[F]=null;}
,__Bi:function(){var J=qx.core.Environment.select(d,{"true":qx.event.GlobalError.observeMethod(this.__Bj),"false":this.__Bj});J.apply(this,arguments);}
,__Bj:function(event,L,K){var P=this.__iR[K];if(qx.bom.client.Engine.getName()==a&&parseFloat(qx.bom.client.Engine.getVersion())===11){document.body.appendChild(L);}
;var M=function(Q){return (Q&&Q.height!==0);}
;if(event.type===e&&M(L)){P.loaded=true;P.width=L.width;P.height=L.height;var N=this.__Bg.exec(K);if(N!=null){P.format=N[1];}
;}
else {P.failed=true;}
;if(qx.bom.client.Engine.getName()==a&&parseFloat(qx.bom.client.Engine.getVersion())===11){document.body.removeChild(L);}
;L.onload=L.onerror=null;var O=P.callbacks;delete P.loading;delete P.callbacks;delete P.element;for(var i=0,l=O.length;i<l;i+=2){O[i].call(O[i+1],K,P);}
;}
,dispose:function(){this.__iR={};}
}});}
)();
(function(){var a="source",b="engine.name",c="",d="mshtml",e="px",f="px ",g="no-repeat",h="backgroundImage",i="scale",j="webkit",k="div",l="qx.html.Image",m="qx/static/blank.gif",n="backgroundPosition";qx.Class.define(l,{extend:qx.html.Element,members:{__Bk:null,__Bl:null,tagNameHint:null,setPadding:function(o,p){this.__Bl=o;this.__Bk=p;if(this.getNodeName()==k){this.setStyle(n,o+f+p+e);}
;}
,_applyProperty:function(name,t){qx.html.Element.prototype._applyProperty.call(this,name,t);if(name===a){var s=this.getDomElement();var q=this.getAllStyles();if(this.getNodeName()==k&&this.getStyle(h)){q.backgroundRepeat=null;}
;var u=this._getProperty(a);var r=this._getProperty(i);var v=r?i:g;if(u!=null){u=u||null;q.paddingTop=this.__Bk;q.paddingLeft=this.__Bl;qx.bom.element.Decoration.update(s,u,v,q);}
;}
;}
,_removeProperty:function(x,w){if(x==a){this._setProperty(x,c,w);}
else {this._setProperty(x,null,w);}
;}
,_createDomElement:function(){var z=this._getProperty(i);var A=z?i:g;if((qx.core.Environment.get(b)==d)){var y=this._getProperty(a);if(this.tagNameHint!=null){this.setNodeName(this.tagNameHint);}
else {this.setNodeName(qx.bom.element.Decoration.getTagName(A,y));}
;}
else {this.setNodeName(qx.bom.element.Decoration.getTagName(A));}
;return qx.html.Element.prototype._createDomElement.call(this);}
,_copyData:function(B){return qx.html.Element.prototype._copyData.call(this,true);}
,setSource:function(C){this._setProperty(a,C);return this;}
,getSource:function(){return this._getProperty(a);}
,resetSource:function(){if((qx.core.Environment.get(b)==j)){this._setProperty(a,m);}
else {this._removeProperty(a,true);}
;return this;}
,setScale:function(D){this._setProperty(i,D);return this;}
,getScale:function(){return this._getProperty(i);}
}});}
)();
(function(){var a="qx/icon",b="repeat",c="px",d=".png",f="crop",g="px ",h="background-image",i="scale",j="no-repeat",k="div",l="Potential clipped image candidate: ",m="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",n='<div style="',o="qx.debug",p="scale-x",q="css.alphaimageloaderneeded",r="repeat-y",s='<img src="',t="qx.bom.element.Decoration",u="Image modification not possible because elements could not be replaced at runtime anymore!",v="', sizingMethod='",w="'!",x="",y='"/>',z="png",A="ImageLoader: Not recognized format of external image '",B="')",C='"></div>',D="mshtml",E="engine.name",F='" style="',G="none",H="b64",I="img",J="webkit",K=" ",L="repeat-x",M="background-repeat",N="DXImageTransform.Microsoft.AlphaImageLoader",O="qx/static/blank.gif",P="scale-y",Q="absolute";qx.Class.define(t,{statics:{DEBUG:false,__Bm:{},__Bn:qx.core.Environment.select(E,{"mshtml":{"scale-x":true,"scale-y":true,"scale":true,"no-repeat":true},"default":null}),__Bo:{"scale-x":I,"scale-y":I,"scale":I,"repeat":k,"no-repeat":k,"repeat-x":k,"repeat-y":k},update:function(U,V,S,R){var W=this.getTagName(S,V);if(W!=U.tagName.toLowerCase()){throw new Error(u);}
;var T=this.getAttributes(V,S,R);if(W===I){U.src=T.src||qx.util.ResourceManager.getInstance().toUri(O);}
;if(U.style.backgroundPosition!=x&&T.style.backgroundPosition===undefined){T.style.backgroundPosition=null;}
;if(U.style.clip!=x&&T.style.clip===undefined){T.style.clip=null;}
;qx.bom.element.Style.setStyles(U,T.style);if(qx.core.Environment.get(q)){try{U.filters[N].apply();}
catch(e){}
;}
;}
,create:function(bb,Y,X){var bc=this.getTagName(Y,bb);var ba=this.getAttributes(bb,Y,X);var bd=qx.bom.element.Style.compile(ba.style);if(bc===I){return s+ba.src+F+bd+y;}
else {return n+bd+C;}
;}
,getTagName:function(bf,be){if(be&&qx.core.Environment.get(q)&&this.__Bn[bf]&&qx.lang.String.endsWith(be,d)){return k;}
;return this.__Bo[bf];}
,getAttributes:function(bk,bi,bh){if(!bh){bh={};}
;if(!bh.position){bh.position=Q;}
;if((qx.core.Environment.get(E)==D)){bh.fontSize=0;bh.lineHeight=0;}
else if((qx.core.Environment.get(E)==J)){bh.WebkitUserDrag=G;}
;var bj=qx.util.ResourceManager.getInstance().getImageFormat(bk)||qx.io.ImageLoader.getFormat(bk);if(qx.core.Environment.get(o)){if(bk!=null&&bj==null){qx.log.Logger.warn(A+bk+w);}
;}
;var bl;if(qx.core.Environment.get(q)&&this.__Bn[bi]&&bj===z){var bm=this.__Bq(bk);this.__Bp(bh,bm.width,bm.height);bl=this.processAlphaFix(bh,bi,bk);}
else {delete bh.clip;if(bi===i){bl=this.__Br(bh,bi,bk);}
else if(bi===p||bi===P){bl=this.__Bs(bh,bi,bk);}
else {bl=this.__Bv(bh,bi,bk);}
;}
;return bl;}
,__Bp:function(bo,bn,bp){if(bo.width==null&&bn!=null){bo.width=bn+c;}
;if(bo.height==null&&bp!=null){bo.height=bp+c;}
;}
,__Bq:function(bq){var br=qx.util.ResourceManager.getInstance().getImageWidth(bq)||qx.io.ImageLoader.getWidth(bq);var bs=qx.util.ResourceManager.getInstance().getImageHeight(bq)||qx.io.ImageLoader.getHeight(bq);return {width:br,height:bs};}
,processAlphaFix:function(bv,bw,bu){if(bw==b||bw==L||bw==r){return bv;}
;var bx=bw==j?f:i;var bt=m+qx.util.ResourceManager.getInstance().toUri(bu)+v+bx+B;bv.filter=bt;bv.backgroundImage=bv.backgroundRepeat=x;delete bv[h];delete bv[M];return {style:bv};}
,__Br:function(bz,bA,by){var bB=qx.util.ResourceManager.getInstance().toUri(by);var bC=this.__Bq(by);this.__Bp(bz,bC.width,bC.height);return {src:bB,style:bz};}
,__Bs:function(bD,bE,bG){var bF=qx.util.ResourceManager.getInstance();var bJ=bF.getCombinedFormat(bG);var bL=this.__Bq(bG);var bH;if(bJ){var bK=bF.getData(bG);var bI=bK[4];if(bJ==H){bH=bF.toDataUri(bG);}
else {bH=bF.toUri(bI);}
;if(bE===p){bD=this.__Bt(bD,bK,bL.height);}
else {bD=this.__Bu(bD,bK,bL.width);}
;return {src:bH,style:bD};}
else {if(qx.core.Environment.get(o)){this.__Bx(bG);}
;if(bE==p){bD.height=bL.height==null?null:bL.height+c;}
else if(bE==P){bD.width=bL.width==null?null:bL.width+c;}
;bH=bF.toUri(bG);return {src:bH,style:bD};}
;}
,__Bt:function(bM,bN,bP){var bO=qx.util.ResourceManager.getInstance().getImageHeight(bN[4]);bM.clip={top:-bN[6],height:bP};bM.height=bO+c;if(bM.top!=null){bM.top=(parseInt(bM.top,10)+bN[6])+c;}
else if(bM.bottom!=null){bM.bottom=(parseInt(bM.bottom,10)+bP-bO-bN[6])+c;}
;return bM;}
,__Bu:function(bR,bS,bQ){var bT=qx.util.ResourceManager.getInstance().getImageWidth(bS[4]);bR.clip={left:-bS[5],width:bQ};bR.width=bT+c;if(bR.left!=null){bR.left=(parseInt(bR.left,10)+bS[5])+c;}
else if(bR.right!=null){bR.right=(parseInt(bR.right,10)+bQ-bT-bS[5])+c;}
;return bR;}
,__Bv:function(bU,bV,bY){var bX=qx.util.ResourceManager.getInstance();var bW=bX.getCombinedFormat(bY);var ch=this.__Bq(bY);if(bW&&bV!==b){var cg=bX.getData(bY);var ce=cg[4];if(bW==H){var cb=bX.toDataUri(bY);var ca=0;var cc=0;}
else {var cb=bX.toUri(ce);var ca=cg[5];var cc=cg[6];if(bU.paddingTop||bU.paddingLeft||bU.paddingRight||bU.paddingBottom){var top=bU.paddingTop||0;var ci=bU.paddingLeft||0;ca+=bU.paddingLeft||0;cc+=bU.paddingTop||0;bU.clip={left:ci,top:top,width:ch.width,height:ch.height};}
;}
;var cd=qx.bom.element.Background.getStyles(cb,bV,ca,cc);for(var cf in cd){bU[cf]=cd[cf];}
;if(ch.width!=null&&bU.width==null&&(bV==r||bV===j)){bU.width=ch.width+c;}
;if(ch.height!=null&&bU.height==null&&(bV==L||bV===j)){bU.height=ch.height+c;}
;return {style:bU};}
else {var top=bU.paddingTop||0;var ci=bU.paddingLeft||0;bU.backgroundPosition=ci+g+top+c;if(qx.core.Environment.get(o)){if(bV!==b){this.__Bx(bY);}
;}
;this.__Bp(bU,ch.width,ch.height);this.__Bw(bU,bY,bV);return {style:bU};}
;}
,__Bw:function(cj,cm,ck){var top=null;var cp=null;if(cj.backgroundPosition){var cl=cj.backgroundPosition.split(K);cp=parseInt(cl[0],10);if(isNaN(cp)){cp=cl[0];}
;top=parseInt(cl[1],10);if(isNaN(top)){top=cl[1];}
;}
;var cn=qx.bom.element.Background.getStyles(cm,ck,cp,top);for(var co in cn){cj[co]=cn[co];}
;if(cj.filter){cj.filter=x;}
;}
,__Bx:function(cq){if(this.DEBUG&&qx.util.ResourceManager.getInstance().has(cq)&&cq.indexOf(a)==-1){if(!this.__Bm[cq]){qx.log.Logger.debug(l+cq);this.__Bm[cq]=true;}
;}
;}
}});}
)();
(function(){var a="')",b="gecko",c="background-image:url(",d="0",e=");",f="",g="px",h="number",i=")",j="background-repeat:",k="engine.version",l="data:",m=" ",n="qx.bom.element.Background",o=";",p="url(",q="background-position:",r="base64",s="url('",t="engine.name",u="'";qx.Class.define(n,{statics:{__By:[c,null,e,q,null,o,j,null,o],__Bz:{backgroundImage:null,backgroundPosition:null,backgroundRepeat:null},__BA:function(z,top){var v=qx.core.Environment.get(t);var x=qx.core.Environment.get(k);if(v==b&&x<1.9&&z==top&&typeof z==h){top+=0.01;}
;if(z){var y=(typeof z==h)?z+g:z;}
else {y=d;}
;if(top){var w=(typeof top==h)?top+g:top;}
else {w=d;}
;return y+m+w;}
,__BB:function(A){var String=qx.lang.String;var B=A.substr(0,50);return String.startsWith(B,l)&&String.contains(B,r);}
,compile:function(F,D,H,top){var G=this.__BA(H,top);var E=qx.util.ResourceManager.getInstance().toUri(F);if(this.__BB(E)){E=u+E+u;}
;var C=this.__By;C[1]=E;C[4]=G;C[7]=D;return C.join(f);}
,getStyles:function(L,J,N,top){if(!L){return this.__Bz;}
;var M=this.__BA(N,top);var K=qx.util.ResourceManager.getInstance().toUri(L);var O;if(this.__BB(K)){O=s+K+a;}
else {O=p+K+i;}
;var I={backgroundPosition:M,backgroundImage:O};if(J!=null){I.backgroundRepeat=J;}
;return I;}
,set:function(T,S,Q,U,top){var P=this.getStyles(S,Q,U,top);for(var R in P){T.style[R]=P[R];}
;}
}});}
)();
(function(){var a="dragdrop-cursor",b="_applyAction",c="alias",d="qx.ui.core.DragDropCursor",e="move",f="singleton",g="copy";qx.Class.define(d,{extend:qx.ui.basic.Image,include:qx.ui.core.MPlacement,type:f,construct:function(){qx.ui.basic.Image.call(this);this.setZIndex(1e8);this.setDomMove(true);var h=this.getApplicationRoot();h.add(this,{left:-1000,top:-1000});}
,properties:{appearance:{refine:true,init:a},action:{check:[c,g,e],apply:b,nullable:true}},members:{_applyAction:function(j,i){if(i){this.removeState(i);}
;if(j){this.addState(j);}
;}
}});}
)();
(function(){var a="Missing renderLayout() implementation!",b="abstract",c="Missing getHeightForWidth() implementation!",d="qx.debug",e="It is not possible to manually set the connected widget.",f="qx.ui.layout.Abstract";qx.Class.define(f,{type:b,extend:qx.core.Object,members:{__ym:null,_invalidChildrenCache:null,__fm:null,invalidateLayoutCache:function(){this.__ym=null;}
,renderLayout:function(h,i,g){this.warn(a);}
,getSizeHint:function(){if(this.__ym){return this.__ym;}
;return this.__ym=this._computeSizeHint();}
,hasHeightForWidth:function(){return false;}
,getHeightForWidth:function(j){this.warn(c);return null;}
,_computeSizeHint:function(){return null;}
,invalidateChildrenCache:function(){this._invalidChildrenCache=true;}
,verifyLayoutProperty:qx.core.Environment.select(d,{"true":function(k,name,l){}
,"false":null}),_clearSeparators:function(){var m=this.__fm;if(m instanceof qx.ui.core.LayoutItem){m.clearSeparators();}
;}
,_renderSeparator:function(n,o){this.__fm.renderSeparator(n,o);}
,connectToWidget:function(p){if(p&&this.__fm){throw new Error(e);}
;this.__fm=p;this.invalidateChildrenCache();}
,_getWidget:function(){return this.__fm;}
,_applyLayoutChange:function(){if(this.__fm){this.__fm.scheduleLayoutUpdate();}
;}
,_getLayoutChildren:function(){return this.__fm.getLayoutChildren();}
},destruct:function(){this.__fm=this.__ym=null;}
});}
)();
(function(){var a="qx.bom.client.Locale",b="-",c="locale",d="",e="android",f="locale.variant",g="C",h="locale.default";qx.Bootstrap.define(a,{statics:{getLocale:function(){var i=qx.bom.client.Locale.__BC();var j=i.indexOf(b);if(j!=-1){i=i.substr(0,j);}
;return i;}
,getVariant:function(){var k=qx.bom.client.Locale.__BC();var m=d;var l=k.indexOf(b);if(l!=-1){m=k.substr(l+1);}
;return m;}
,__BC:function(){var n=(navigator.userLanguage||navigator.language||d);if(qx.bom.client.OperatingSystem.getName()==e){var o=/(\w{2})-(\w{2})/i.exec(navigator.userAgent);if(o){n=o[0];}
;}
;return n.toLowerCase();}
},defer:function(p){qx.core.Environment.add(c,p.getLocale);qx.core.Environment.add(f,p.getVariant);qx.core.Environment.add(h,g);}
});}
)();
(function(){var a='indexOf',b='slice',c='concat',d='toLocaleLowerCase',e="qx.type.BaseString",f="",g='trim',h='match',j="qx.debug",k='search',m='replace',n='toLowerCase',o='charCodeAt',p='split',q='substring',r='lastIndexOf',s='substr',t='toLocaleUpperCase',u='toUpperCase',v='charAt';qx.Class.define(e,{extend:Object,construct:function(w){var w=w||f;this.__BD=w;this.length=w.length;}
,members:{$$isString:true,length:0,__BD:null,toString:function(){return this.__BD;}
,charAt:null,valueOf:null,charCodeAt:null,concat:null,indexOf:null,lastIndexOf:null,match:null,replace:null,search:null,slice:null,split:null,substr:null,substring:null,toLowerCase:null,toUpperCase:null,toHashCode:function(){return qx.core.ObjectRegistry.toHashCode(this);}
,toLocaleLowerCase:null,toLocaleUpperCase:null,base:function(y,x){return qx.core.Object.prototype.base.apply(this,arguments);}
},defer:function(z,A){if(qx.core.Environment.get(j)){qx.Class.include(z,qx.core.MAssert);}
;var B=[v,o,c,a,r,h,m,k,b,p,s,q,n,u,d,t,g];A.valueOf=A.toString;if(new z(f).valueOf()==null){delete A.valueOf;}
;for(var i=0,l=B.length;i<l;i++ ){A[B[i]]=String.prototype[B[i]];}
;}
});}
)();
(function(){var a="qx.locale.LocalizedString";qx.Class.define(a,{extend:qx.type.BaseString,construct:function(b,d,c){qx.type.BaseString.call(this,b);this.__BE=d;this.__BF=c;}
,members:{__BE:null,__BF:null,translate:function(){return qx.locale.Manager.getInstance().translate(this.__BE,this.__BF);}
,getMessageId:function(){return this.__BE;}
}});}
)();
(function(){var a="locale",b="_applyLocale",c="",d="changeLocale",e="_",f="Locale: ",g="locale.default",h="locale.variant",j="qx.dynlocale",k=" not available.",l="qx.locale.Manager",m="String",n="singleton",o="qx.debug";qx.Class.define(l,{type:n,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__BG=qx.$$translations||{};this.__BH=qx.$$locales||{};this.initLocale();this.__BI=this.getLocale();}
,statics:{tr:function(q,r){var p=qx.lang.Array.fromArguments(arguments);p.splice(0,1);return qx.locale.Manager.getInstance().translate(q,p);}
,trn:function(t,w,s,v){var u=qx.lang.Array.fromArguments(arguments);u.splice(0,3);if(s!=1){return qx.locale.Manager.getInstance().translate(w,u);}
else {return qx.locale.Manager.getInstance().translate(t,u);}
;}
,trc:function(A,y,z){var x=qx.lang.Array.fromArguments(arguments);x.splice(0,2);return qx.locale.Manager.getInstance().translate(y,x);}
,trnc:function(C,D,G,B,F){var E=qx.lang.Array.fromArguments(arguments);E.splice(0,4);if(B!=1){return qx.locale.Manager.getInstance().translate(G,E);}
else {return qx.locale.Manager.getInstance().translate(D,E);}
;}
,marktr:function(H){return H;}
},properties:{locale:{check:m,apply:b,event:d,init:(function(){var I=qx.core.Environment.get(a);if(!I||I===c){return qx.core.Environment.get(g);}
;var J=qx.core.Environment.get(h);if(J!==c){I+=e+J;}
;return I;}
)()}},members:{__BJ:qx.core.Environment.get(g),__hq:null,__BK:null,__BG:null,__BH:null,__BI:null,getLanguage:function(){return this.__BK;}
,getTerritory:function(){return this.getLocale().split(e)[1]||c;}
,getAvailableLocales:function(L){var M=[];for(var K in this.__BH){if(K!=this.__BJ){if(this.__BH[K]===null&&!L){continue;}
;M.push(K);}
;}
;return M;}
,__BL:function(N){var P;if(N==null){return null;}
;var O=N.indexOf(e);if(O==-1){P=N;}
else {P=N.substring(0,O);}
;return P;}
,_applyLocale:function(R,Q){if(qx.core.Environment.get(o)){if(!(R in this.__BH||R==this.__BI)){qx.log.Logger.warn(f+R+k);}
;}
;this.__hq=R;this.__BK=this.__BL(R);}
,addTranslation:function(S,V){var T=this.__BG;if(T[S]){for(var U in V){T[S][U]=V[U];}
;}
else {T[S]=V;}
;}
,addLocale:function(ba,X){var W=this.__BH;if(W[ba]){for(var Y in X){W[ba][Y]=X[Y];}
;}
else {W[ba]=X;}
;}
,translate:function(be,bd,bb){var bc=this.__BG;return this.__BM(bc,be,bd,bb);}
,localize:function(bi,bh,bf){var bg=this.__BH;return this.__BM(bg,bi,bh,bf);}
,__BM:function(bn,bo,bl,bm){if(qx.core.Environment.get(o)){this.assertObject(bn);this.assertString(bo);this.assertArray(bl);}
;var bj;if(!bn){return bo;}
;if(bm){var bk=this.__BL(bm);}
else {bm=this.__hq;bk=this.__BK;}
;if(!bj&&bn[bm]){bj=bn[bm][bo];}
;if(!bj&&bn[bk]){bj=bn[bk][bo];}
;if(!bj&&bn[this.__BJ]){bj=bn[this.__BJ][bo];}
;if(!bj){bj=bo;}
;if(bl.length>0){var bp=[];for(var i=0;i<bl.length;i++ ){var bq=bl[i];if(bq&&bq.translate){bp[i]=bq.translate();}
else {bp[i]=bq;}
;}
;bj=qx.lang.String.format(bj,bp);}
;if(qx.core.Environment.get(j)){bj=new qx.locale.LocalizedString(bj,bo,bl);}
;return bj;}
},destruct:function(){this.__BG=this.__BH=null;}
});}
)();
(function(){var a="qx.ui.core.MChildrenHandling";qx.Mixin.define(a,{members:{getChildren:function(){return this._getChildren();}
,hasChildren:function(){return this._hasChildren();}
,indexOf:function(b){return this._indexOf(b);}
,add:function(d,c){this._add(d,c);}
,addAt:function(g,e,f){this._addAt(g,e,f);}
,addBefore:function(h,j,i){this._addBefore(h,j,i);}
,addAfter:function(m,k,l){this._addAfter(m,k,l);}
,remove:function(n){this._remove(n);}
,removeAt:function(o){return this._removeAt(o);}
,removeAll:function(){return this._removeAll();}
},statics:{remap:function(p){p.getChildren=p._getChildren;p.hasChildren=p._hasChildren;p.indexOf=p._indexOf;p.add=p._add;p.addAt=p._addAt;p.addBefore=p._addBefore;p.addAfter=p._addAfter;p.remove=p._remove;p.removeAt=p._removeAt;p.removeAll=p._removeAll;}
}});}
)();
(function(){var a="qx.ui.container.Composite",b="addChildWidget",c="removeChildWidget",d="qx.event.type.Data";qx.Class.define(a,{extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MLayoutHandling],construct:function(e){qx.ui.core.Widget.call(this);if(e!=null){this._setLayout(e);}
;}
,events:{addChildWidget:d,removeChildWidget:d},members:{_afterAddChild:function(f){this.fireNonBubblingEvent(b,qx.event.type.Data,[f]);}
,_afterRemoveChild:function(g){this.fireNonBubblingEvent(c,qx.event.type.Data,[g]);}
},defer:function(h,i){qx.ui.core.MChildrenHandling.remap(i);qx.ui.core.MLayoutHandling.remap(i);}
});}
)();
(function(){var a="qx.ui.popup.Popup",b="visible",c="excluded",d="popup",e="Boolean";qx.Class.define(a,{extend:qx.ui.container.Composite,include:qx.ui.core.MPlacement,construct:function(f){qx.ui.container.Composite.call(this,f);this.initVisibility();}
,properties:{appearance:{refine:true,init:d},visibility:{refine:true,init:c},autoHide:{check:e,init:true}},members:{show:function(){if(this.getLayoutParent()==null){qx.core.Init.getApplication().getRoot().add(this);}
;qx.ui.container.Composite.prototype.show.call(this);}
,_applyVisibility:function(i,h){qx.ui.container.Composite.prototype._applyVisibility.call(this,i,h);var g=qx.ui.popup.Manager.getInstance();i===b?g.add(this):g.remove(this);}
},destruct:function(){if(!qx.ui.popup.Manager.getInstance().isDisposed()){qx.ui.popup.Manager.getInstance().remove(this);}
;}
});}
)();
(function(){var a="blur",b="qx.debug",c="qx.ui.popup.Manager",d="Object is no popup: ",f="pointerdown",g="__BN",h="singleton";qx.Class.define(c,{type:h,extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__BN=[];qx.event.Registration.addListener(document.documentElement,f,this.__BP,this,true);qx.bom.Element.addListener(window,a,this.hideAll,this);}
,members:{__BN:null,add:function(j){if(qx.core.Environment.get(b)){if(!(j instanceof qx.ui.popup.Popup)){throw new Error(d+j);}
;}
;this.__BN.push(j);this.__BO();}
,remove:function(k){if(qx.core.Environment.get(b)){if(!(k instanceof qx.ui.popup.Popup)){throw new Error(d+k);}
;}
;qx.lang.Array.remove(this.__BN,k);this.__BO();}
,hideAll:function(){var l=this.__BN.length,m={};while(l-- ){m=this.__BN[l];if(m.getAutoHide()){m.exclude();}
;}
;}
,__BO:function(){var n=1e7;for(var i=0;i<this.__BN.length;i++ ){this.__BN[i].setZIndex(n++ );}
;}
,__BP:function(e){var p=qx.ui.core.Widget.getWidgetByElement(e.getTarget());var q=this.__BN;for(var i=0;i<q.length;i++ ){var o=q[i];if(!o.getAutoHide()||p==o||qx.ui.core.Widget.contains(o,p)){continue;}
;o.exclude();}
;}
},destruct:function(){qx.event.Registration.removeListener(document.documentElement,f,this.__BP,this,true);this._disposeArray(g);}
});}
)();
(function(){var a="_applyRich",b="qx.ui.tooltip.ToolTip",c="_applyIcon",d="tooltip",f="pointerover",g="qx.ui.core.Widget",h="arrow",i="Boolean",j="_applyArrowPosition",k="left",l="right",m="_applyLabel",n="Integer",o="String",p="atom";qx.Class.define(b,{extend:qx.ui.popup.Popup,construct:function(q,r){qx.ui.popup.Popup.call(this);this.setLayout(new qx.ui.layout.HBox());this._createChildControl(h);this._createChildControl(p);if(q!=null){this.setLabel(q);}
;if(r!=null){this.setIcon(r);}
;this.addListener(f,this._onPointerOver,this);}
,properties:{appearance:{refine:true,init:d},showTimeout:{check:n,init:700,themeable:true},hideTimeout:{check:n,init:4000,themeable:true},label:{check:o,nullable:true,apply:m},icon:{check:o,nullable:true,apply:c,themeable:true},rich:{check:i,init:false,apply:a},opener:{check:g,nullable:true},arrowPosition:{check:[k,l],init:k,themeable:true,apply:j}},members:{_forwardStates:{placementLeft:true},_createChildControlImpl:function(u,t){var s;switch(u){case p:s=new qx.ui.basic.Atom();this._add(s,{flex:1});break;case h:s=new qx.ui.basic.Image();this._add(s);};return s||qx.ui.popup.Popup.prototype._createChildControlImpl.call(this,u);}
,_onPointerOver:function(e){}
,_applyIcon:function(w,v){var x=this.getChildControl(p);w==null?x.resetIcon():x.setIcon(w);}
,_applyLabel:function(z,y){var A=this.getChildControl(p);z==null?A.resetLabel():A.setLabel(z);}
,_applyRich:function(C,B){var D=this.getChildControl(p);D.setRich(C);}
,_applyArrowPosition:function(F,E){this._getLayout().setReversed(F==k);}
}});}
)();
(function(){var a="Decorator",b="middle",c="_applyLayoutChange",d="width",e="_applyReversed",f="qx.debug",g="bottom",h="' is not supported by the HBox layout!",j="center",k="Boolean",m="flex",n="top",o="left",p="right",q="Integer",r="The property '",s="qx.ui.layout.HBox";qx.Class.define(s,{extend:qx.ui.layout.Abstract,construct:function(t,u,v){qx.ui.layout.Abstract.call(this);if(t){this.setSpacing(t);}
;if(u){this.setAlignX(u);}
;if(v){this.setSeparator(v);}
;}
,properties:{alignX:{check:[o,j,p],init:o,apply:c},alignY:{check:[n,b,g],init:n,apply:c},spacing:{check:q,init:0,apply:c},separator:{check:a,nullable:true,apply:c},reversed:{check:k,init:false,apply:e}},members:{__BQ:null,__BR:null,__BS:null,__fu:null,_applyReversed:function(){this._invalidChildrenCache=true;this._applyLayoutChange();}
,__uv:function(){var B=this._getLayoutChildren();var length=B.length;var y=false;var w=this.__BQ&&this.__BQ.length!=length&&this.__BR&&this.__BQ;var z;var x=w?this.__BQ:new Array(length);var A=w?this.__BR:new Array(length);if(this.getReversed()){B=B.concat().reverse();}
;for(var i=0;i<length;i++ ){z=B[i].getLayoutProperties();if(z.width!=null){x[i]=parseFloat(z.width)/100;}
;if(z.flex!=null){A[i]=z.flex;y=true;}
else {A[i]=0;}
;}
;if(!w){this.__BQ=x;this.__BR=A;}
;this.__BS=y;this.__fu=B;delete this._invalidChildrenCache;}
,verifyLayoutProperty:qx.core.Environment.select(f,{"true":function(C,name,D){this.assert(name===m||name===d,r+name+h);if(name==d){this.assertMatch(D,qx.ui.layout.Util.PERCENT_VALUE);}
else {this.assertNumber(D);this.assert(D>=0);}
;}
,"false":null}),renderLayout:function(U,O,T){if(this._invalidChildrenCache){this.__uv();}
;var K=this.__fu;var length=K.length;var W=qx.ui.layout.Util;var S=this.getSpacing();var Y=this.getSeparator();if(Y){var H=W.computeHorizontalSeparatorGaps(K,S,Y);}
else {var H=W.computeHorizontalGaps(K,S,true);}
;var i,V,Q,P;var X=[];var L=H;for(i=0;i<length;i+=1){P=this.__BQ[i];Q=P!=null?Math.floor((U-H)*P):K[i].getSizeHint().width;X.push(Q);L+=Q;}
;if(this.__BS&&L!=U){var N={};var R,F;for(i=0;i<length;i+=1){R=this.__BR[i];if(R>0){M=K[i].getSizeHint();N[i]={min:M.minWidth,value:X[i],max:M.maxWidth,flex:R};}
;}
;var I=W.computeFlexOffsets(N,U,L);for(i in I){F=I[i].offset;X[i]+=F;L+=F;}
;}
;var bd=K[0].getMarginLeft();if(L<U&&this.getAlignX()!=o){bd=U-L;if(this.getAlignX()===j){bd=Math.round(bd/2);}
;}
;var M,top,G,Q,J,bb,E;var S=this.getSpacing();this._clearSeparators();if(Y){var ba=qx.theme.manager.Decoration.getInstance().resolve(Y).getInsets();var bc=ba.left+ba.right;}
;for(i=0;i<length;i+=1){V=K[i];Q=X[i];M=V.getSizeHint();bb=V.getMarginTop();E=V.getMarginBottom();G=Math.max(M.minHeight,Math.min(O-bb-E,M.maxHeight));top=W.computeVerticalAlignOffset(V.getAlignY()||this.getAlignY(),G,O,bb,E);if(i>0){if(Y){bd+=J+S;this._renderSeparator(Y,{left:bd+T.left,top:T.top,width:bc,height:O});bd+=bc+S+V.getMarginLeft();}
else {bd+=W.collapseMargins(S,J,V.getMarginLeft());}
;}
;V.renderLayout(bd+T.left,top+T.top,Q,G);bd+=Q;J=V.getMarginRight();}
;}
,_computeSizeHint:function(){if(this._invalidChildrenCache){this.__uv();}
;var bs=qx.ui.layout.Util;var bf=this.__fu;var bk=0,bl=0,be=0;var bi=0,bj=0;var bp,bg,br;for(var i=0,l=bf.length;i<l;i+=1){bp=bf[i];bg=bp.getSizeHint();bl+=bg.width;var bo=this.__BR[i];var bh=this.__BQ[i];if(bo){bk+=bg.minWidth;}
else if(bh){be=Math.max(be,Math.round(bg.minWidth/bh));}
else {bk+=bg.width;}
;br=bp.getMarginTop()+bp.getMarginBottom();if((bg.height+br)>bj){bj=bg.height+br;}
;if((bg.minHeight+br)>bi){bi=bg.minHeight+br;}
;}
;bk+=be;var bn=this.getSpacing();var bq=this.getSeparator();if(bq){var bm=bs.computeHorizontalSeparatorGaps(bf,bn,bq);}
else {var bm=bs.computeHorizontalGaps(bf,bn,true);}
;return {minWidth:bk+bm,width:bl+bm,minHeight:bi,height:bj};}
},destruct:function(){this.__BQ=this.__BR=this.__fu=null;}
});}
)();
(function(){var a="middle",b="qx.ui.layout.Util",c="left",d="center",e="top",f="bottom",g="right";qx.Class.define(b,{statics:{PERCENT_VALUE:/[0-9]+(?:\.[0-9]+)?%/,computeFlexOffsets:function(j,n,h){var r,q,s,k;var m=n>h;var t=Math.abs(n-h);var u,o;var p={};for(q in j){r=j[q];p[q]={potential:m?r.max-r.value:r.value-r.min,flex:m?r.flex:1/r.flex,offset:0};}
;while(t!=0){k=Infinity;s=0;for(q in p){r=p[q];if(r.potential>0){s+=r.flex;k=Math.min(k,r.potential/r.flex);}
;}
;if(s==0){break;}
;k=Math.min(t,k*s)/s;u=0;for(q in p){r=p[q];if(r.potential>0){o=Math.min(t,r.potential,Math.ceil(k*r.flex));u+=o-k*r.flex;if(u>=1){u-=1;o-=1;}
;r.potential-=o;if(m){r.offset+=o;}
else {r.offset-=o;}
;t-=o;}
;}
;}
;return p;}
,computeHorizontalAlignOffset:function(w,v,y,z,A){if(z==null){z=0;}
;if(A==null){A=0;}
;var x=0;switch(w){case c:x=z;break;case g:x=y-v-A;break;case d:x=Math.round((y-v)/2);if(x<z){x=z;}
else if(x<A){x=Math.max(z,y-v-A);}
;break;};return x;}
,computeVerticalAlignOffset:function(C,F,B,G,D){if(G==null){G=0;}
;if(D==null){D=0;}
;var E=0;switch(C){case e:E=G;break;case f:E=B-F-D;break;case a:E=Math.round((B-F)/2);if(E<G){E=G;}
else if(E<D){E=Math.max(G,B-F-D);}
;break;};return E;}
,collapseMargins:function(K){var I=0,H=0;for(var i=0,l=arguments.length;i<l;i++ ){var J=arguments[i];if(J<0){H=Math.min(H,J);}
else if(J>0){I=Math.max(I,J);}
;}
;return I+H;}
,computeHorizontalGaps:function(O,M,L){if(M==null){M=0;}
;var N=0;if(L){N+=O[0].getMarginLeft();for(var i=1,l=O.length;i<l;i+=1){N+=this.collapseMargins(M,O[i-1].getMarginRight(),O[i].getMarginLeft());}
;N+=O[l-1].getMarginRight();}
else {for(var i=1,l=O.length;i<l;i+=1){N+=O[i].getMarginLeft()+O[i].getMarginRight();}
;N+=(M*(l-1));}
;return N;}
,computeVerticalGaps:function(S,Q,P){if(Q==null){Q=0;}
;var R=0;if(P){R+=S[0].getMarginTop();for(var i=1,l=S.length;i<l;i+=1){R+=this.collapseMargins(Q,S[i-1].getMarginBottom(),S[i].getMarginTop());}
;R+=S[l-1].getMarginBottom();}
else {for(var i=1,l=S.length;i<l;i+=1){R+=S[i].getMarginTop()+S[i].getMarginBottom();}
;R+=(Q*(l-1));}
;return R;}
,computeHorizontalSeparatorGaps:function(bb,U,Y){var T=qx.theme.manager.Decoration.getInstance().resolve(Y);var V=T.getInsets();var W=V.left+V.right;var X=0;for(var i=0,l=bb.length;i<l;i++ ){var ba=bb[i];X+=ba.getMarginLeft()+ba.getMarginRight();}
;X+=(U+W+U)*(l-1);return X;}
,computeVerticalSeparatorGaps:function(bj,bc,bh){var bf=qx.theme.manager.Decoration.getInstance().resolve(bh);var be=bf.getInsets();var bd=be.top+be.bottom;var bg=0;for(var i=0,l=bj.length;i<l;i++ ){var bi=bj[i];bg+=bi.getMarginTop()+bi.getMarginBottom();}
;bg+=(bc+bd+bc)*(l-1);return bg;}
,arrangeIdeals:function(bl,bn,bk,bm,bo,bp){if(bn<bl||bo<bm){if(bn<bl&&bo<bm){bn=bl;bo=bm;}
else if(bn<bl){bo-=(bl-bn);bn=bl;if(bo<bm){bo=bm;}
;}
else if(bo<bm){bn-=(bm-bo);bo=bm;if(bn<bl){bn=bl;}
;}
;}
;if(bn>bk||bo>bp){if(bn>bk&&bo>bp){bn=bk;bo=bp;}
else if(bn>bk){bo+=(bn-bk);bn=bk;if(bo>bp){bo=bp;}
;}
else if(bo>bp){bn+=(bo-bp);bo=bp;if(bn>bk){bn=bk;}
;}
;}
;return {begin:bn,end:bo};}
}});}
)();
(function(){var a="Boolean",b="changeGap",c="changeShow",d="bottom",e="bottom-right",f="_applyCenter",g="changeIcon",h="qx.ui.basic.Atom",i="changeLabel",j="both",k="Integer",l="_applyIconPosition",m="qx.debug",n="bottom-left",o="String",p="icon",q="top-left",r="top",s="top-right",t="right",u="_applyRich",v="_applyIcon",w="label",x="_applyShow",y="left",z="_applyLabel",A="_applyGap",B="atom";qx.Class.define(h,{extend:qx.ui.core.Widget,construct:function(D,C){if(qx.core.Environment.get(m)){this.assertArgumentsCount(arguments,0,2);}
;qx.ui.core.Widget.call(this);this._setLayout(new qx.ui.layout.Atom());if(D!=null){this.setLabel(D);}
;if(C!==undefined){this.setIcon(C);}
;}
,properties:{appearance:{refine:true,init:B},label:{apply:z,nullable:true,check:o,event:i},rich:{check:a,init:false,apply:u},icon:{check:o,apply:v,nullable:true,themeable:true,event:g},gap:{check:k,nullable:false,event:b,apply:A,themeable:true,init:4},show:{init:j,check:[j,w,p],themeable:true,inheritable:true,apply:x,event:c},iconPosition:{init:y,check:[r,t,d,y,q,n,s,e],themeable:true,apply:l},center:{init:false,check:a,themeable:true,apply:f}},members:{_createChildControlImpl:function(G,F){var E;switch(G){case w:E=new qx.ui.basic.Label(this.getLabel());E.setAnonymous(true);E.setRich(this.getRich());this._add(E);if(this.getLabel()==null||this.getShow()===p){E.exclude();}
;break;case p:E=new qx.ui.basic.Image(this.getIcon());E.setAnonymous(true);this._addAt(E,0);if(this.getIcon()==null||this.getShow()===w){E.exclude();}
;break;};return E||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,G);}
,_forwardStates:{focused:true,hovered:true},_handleLabel:function(){if(this.getLabel()==null||this.getShow()===p){this._excludeChildControl(w);}
else {this._showChildControl(w);}
;}
,_handleIcon:function(){if(this.getIcon()==null||this.getShow()===w){this._excludeChildControl(p);}
else {this._showChildControl(p);}
;}
,_applyLabel:function(I,H){var J=this.getChildControl(w,true);if(J){J.setValue(I);}
;this._handleLabel();}
,_applyRich:function(L,K){var M=this.getChildControl(w,true);if(M){M.setRich(L);}
;}
,_applyIcon:function(O,N){var P=this.getChildControl(p,true);if(P){P.setSource(O);}
;this._handleIcon();}
,_applyGap:function(R,Q){this._getLayout().setGap(R);}
,_applyShow:function(T,S){this._handleLabel();this._handleIcon();}
,_applyIconPosition:function(V,U){this._getLayout().setIconPosition(V);}
,_applyCenter:function(X,W){this._getLayout().setCenter(X);}
,_applySelectable:function(ba,Y){qx.ui.core.Widget.prototype._applySelectable.call(this,ba,Y);var bb=this.getChildControl(w,true);if(bb){this.getChildControl(w).setSelectable(ba);}
;}
}});}
)();
(function(){var a="' is not supported by the Atom layout!",b="middle",c="_applyLayoutChange",d="top-right",e="qx.debug",f="bottom",g="top-left",h="bottom-left",j="center",k="qx.ui.layout.Atom",l="bottom-right",m="top",n="left",o="right",p="Integer",q="The property '",r="Boolean";qx.Class.define(k,{extend:qx.ui.layout.Abstract,properties:{gap:{check:p,init:4,apply:c},iconPosition:{check:[n,m,o,f,g,h,d,l],init:n,apply:c},center:{check:r,init:false,apply:c}},members:{verifyLayoutProperty:qx.core.Environment.select(e,{"true":function(s,name,t){this.assert(false,q+name+a);}
,"false":null}),renderLayout:function(J,D,I){var S=I.left;var top=I.top;var E=qx.ui.layout.Util;var v=this.getIconPosition();var y=this._getLayoutChildren();var length=y.length;var R,w;var L,C;var H=this.getGap();var O=this.getCenter();var Q=[f,o,d,l];if(Q.indexOf(v)!=-1){var F=length-1;var A=-1;var x=-1;}
else {var F=0;var A=length;var x=1;}
;if(v==m||v==f){if(O){var K=0;for(var i=F;i!=A;i+=x){w=y[i].getSizeHint().height;if(w>0){K+=w;if(i!=F){K+=H;}
;}
;}
;top+=Math.round((D-K)/2);}
;var z=top;for(var i=F;i!=A;i+=x){L=y[i];C=L.getSizeHint();R=Math.min(C.maxWidth,Math.max(J,C.minWidth));w=C.height;S=E.computeHorizontalAlignOffset(j,R,J)+I.left;L.renderLayout(S,z,R,w);if(w>0){z=top+w+H;}
;}
;}
else {var B=J;var u=null;var N=0;for(var i=F;i!=A;i+=x){L=y[i];R=L.getSizeHint().width;if(R>0){if(!u&&L instanceof qx.ui.basic.Label){u=L;}
else {B-=R;}
;N++ ;}
;}
;if(N>1){var M=(N-1)*H;B-=M;}
;if(u){var C=u.getSizeHint();var G=Math.max(C.minWidth,Math.min(B,C.maxWidth));B-=G;}
;if(O&&B>0){S+=Math.round(B/2);}
;for(var i=F;i!=A;i+=x){L=y[i];C=L.getSizeHint();w=Math.min(C.maxHeight,Math.max(D,C.minHeight));if(L===u){R=G;}
else {R=C.width;}
;var P=b;if(v==g||v==d){P=m;}
else if(v==h||v==l){P=f;}
;var z=top+E.computeVerticalAlignOffset(P,C.height,D);L.renderLayout(S,z,R,w);if(R>0){S+=R+H;}
;}
;}
;}
,_computeSizeHint:function(){var be=this._getLayoutChildren();var length=be.length;var U,bc;if(length===1){var U=be[0].getSizeHint();bc={width:U.width,height:U.height,minWidth:U.minWidth,minHeight:U.minHeight};}
else {var ba=0,bb=0;var W=0,Y=0;var X=this.getIconPosition();var V=this.getGap();if(X===m||X===f){var T=0;for(var i=0;i<length;i++ ){U=be[i].getSizeHint();bb=Math.max(bb,U.width);ba=Math.max(ba,U.minWidth);if(U.height>0){Y+=U.height;W+=U.minHeight;T++ ;}
;}
;if(T>1){var bd=(T-1)*V;Y+=bd;W+=bd;}
;}
else {var T=0;for(var i=0;i<length;i++ ){U=be[i].getSizeHint();Y=Math.max(Y,U.height);W=Math.max(W,U.minHeight);if(U.width>0){bb+=U.width;ba+=U.minWidth;T++ ;}
;}
;if(T>1){var bd=(T-1)*V;bb+=bd;ba+=bd;}
;}
;bc={minWidth:ba,width:bb,minHeight:W,height:Y};}
;return bc;}
}});}
)();
(function(){var a="qx.event.type.Data",b="qx.ui.form.IStringForm";qx.Interface.define(b,{events:{"changeValue":a},members:{setValue:function(c){return arguments.length==1;}
,resetValue:function(){}
,getValue:function(){}
}});}
)();
(function(){var a="safari",b="os.name",c="_applyTextAlign",d="Boolean",f="qx.ui.core.Widget",g="nowrap",h="changeStatus",i="changeTextAlign",j="_applyWrap",k="changeValue",l="browser.name",m="color",n="qx.ui.basic.Label",o="osx",p="css.textoverflow",q="qx.debug",r="textAlign",s="html.xul",t="_applyValue",u="center",v="Only rich labels support wrap.",w="_applyBuddy",x="enabled",y="String",z="toggleValue",A="whiteSpace",B="Only rich labels are selectable in browsers with Gecko engine!",C="function",D="browser.version",E="qx.dynlocale",F="engine.version",G="right",H="gecko",I="justify",J="changeRich",K="normal",L="_applyRich",M="engine.name",N="label",O="changeLocale",P="left",Q="tap",R="A";qx.Class.define(n,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm],construct:function(S){qx.ui.core.Widget.call(this);if(S!=null){this.setValue(S);}
;if(qx.core.Environment.get(E)){qx.locale.Manager.getInstance().addListener(O,this._onChangeLocale,this);}
;}
,properties:{rich:{check:d,init:false,event:J,apply:L},wrap:{check:d,init:true,apply:j},value:{check:y,apply:t,event:k,nullable:true},buddy:{check:f,apply:w,nullable:true,init:null,dereference:true},textAlign:{check:[P,u,G,I],nullable:true,themeable:true,apply:c,event:i},appearance:{refine:true,init:N},selectable:{refine:true,init:false},allowGrowX:{refine:true,init:false},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{__BT:null,__BU:null,__BV:null,__BW:null,_getContentHint:function(){if(this.__BU){this.__BX=this.__BY();delete this.__BU;}
;return {width:this.__BX.width,height:this.__BX.height};}
,_hasHeightForWidth:function(){return this.getRich()&&this.getWrap();}
,_applySelectable:function(T){if(!qx.core.Environment.get(p)&&qx.core.Environment.get(s)){if(T&&!this.isRich()){if(qx.core.Environment.get(q)){this.warn(B);}
;return;}
;}
;qx.ui.core.Widget.prototype._applySelectable.call(this,T);}
,_getContentHeightForWidth:function(U){if(!this.getRich()&&!this.getWrap()){return null;}
;return this.__BY(U).height;}
,_createContentElement:function(){return new qx.html.Label;}
,_applyTextAlign:function(W,V){this.getContentElement().setStyle(r,W);}
,_applyTextColor:function(Y,X){if(Y){this.getContentElement().setStyle(m,qx.theme.manager.Color.getInstance().resolve(Y));}
else {this.getContentElement().removeStyle(m);}
;}
,__BX:{width:0,height:0},_applyFont:function(bc,bb){if(bb&&this.__BT&&this.__BW){this.__BT.removeListenerById(this.__BW);this.__BW=null;}
;var ba;if(bc){this.__BT=qx.theme.manager.Font.getInstance().resolve(bc);if(this.__BT instanceof qx.bom.webfonts.WebFont){this.__BW=this.__BT.addListener(h,this._onWebFontStatusChange,this);}
;ba=this.__BT.getStyles();}
else {this.__BT=null;ba=qx.bom.Font.getDefaultStyles();}
;if(this.getTextColor()!=null){delete ba[m];}
;this.getContentElement().setStyles(ba);this.__BU=true;qx.ui.core.queue.Layout.add(this);}
,__BY:function(bf){var be=qx.bom.Label;var bh=this.getFont();var bd=bh?this.__BT.getStyles():qx.bom.Font.getDefaultStyles();var content=this.getValue()||R;var bg=this.getRich();if(this.__BW){this.__Ca();}
;return bg?be.getHtmlSize(content,bd,bf):be.getTextSize(content,bd);}
,__Ca:function(){if(!this.getContentElement()){return;}
;if(qx.core.Environment.get(b)==o&&qx.core.Environment.get(M)==H&&parseInt(qx.core.Environment.get(F),10)<16&&parseInt(qx.core.Environment.get(F),10)>9){var bi=this.getContentElement().getDomElement();if(bi){bi.innerHTML=bi.innerHTML;}
;}
;}
,_applyBuddy:function(bk,bj){if(bj!=null){this.removeRelatedBindings(bj);this.removeListenerById(this.__BV);this.__BV=null;}
;if(bk!=null){bk.bind(x,this,x);this.__BV=this.addListener(Q,function(){if(bk.isFocusable()){bk.focus.apply(bk);}
;if(z in bk&&typeof bk.toggleValue===C){bk.toggleValue();}
;}
,this);}
;}
,_applyRich:function(bl){this.getContentElement().setRich(bl);this.__BU=true;qx.ui.core.queue.Layout.add(this);}
,_applyWrap:function(bo,bm){if(bo&&!this.isRich()){if(qx.core.Environment.get(q)){this.warn(v);}
;}
;if(this.isRich()){var bn=bo?K:g;this.getContentElement().setStyle(A,bn);}
;}
,_onChangeLocale:qx.core.Environment.select(E,{"true":function(e){var content=this.getValue();if(content&&content.translate){this.setValue(content.translate());}
;}
,"false":null}),_onWebFontStatusChange:function(bp){if(bp.getData().valid===true){if(qx.core.Environment.get(l)==a&&parseFloat(qx.core.Environment.get(D))>=8){window.setTimeout(function(){this.__BU=true;qx.ui.core.queue.Layout.add(this);}
.bind(this),0);}
;this.__BU=true;qx.ui.core.queue.Layout.add(this);}
;}
,_applyValue:function(br,bq){this.getContentElement().setValue(br);this.__BU=true;qx.ui.core.queue.Layout.add(this);}
},destruct:function(){if(qx.core.Environment.get(E)){qx.locale.Manager.getInstance().removeListener(O,this._onChangeLocale,this);}
;if(this.__BT&&this.__BW){this.__BT.removeListenerById(this.__BW);}
;this.__BT=null;}
});}
)();
(function(){var a="value",b="qx.html.Label",c="The label mode cannot be modified after initial creation",d='hidden';qx.Class.define(b,{extend:qx.html.Element,members:{__Cb:null,_applyProperty:function(name,e){qx.html.Element.prototype._applyProperty.call(this,name,e);if(name==a){var f=this.getDomElement();qx.bom.Label.setValue(f,e);}
;}
,_createDomElement:function(){var h=this.__Cb;var g=qx.bom.Label.create(this._content,h);g.style.overflow=d;return g;}
,_copyData:function(i){return qx.html.Element.prototype._copyData.call(this,true);}
,setRich:function(j){var k=this.getDomElement();if(k){throw new Error(c);}
;j=!!j;if(this.__Cb==j){return this;}
;this.__Cb=j;return this;}
,setValue:function(l){this._setProperty(a,l);return this;}
,getValue:function(){return this._getProperty(a);}
}});}
)();
(function(){var a="text",b="function",c="px",d="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",e="crop",f="nowrap",g="end",h="div",i="100%",j="auto",k="0",l="css.textoverflow",m="qx.debug",n="html.xul",o="value",p="visible",q="qx.bom.Label",r="",s="ellipsis",t="normal",u="inherit",v="block",w="label",x="-1000px",y="hidden",z="absolute";qx.Bootstrap.define(q,{statics:{__gT:{fontFamily:1,fontSize:1,fontWeight:1,fontStyle:1,lineHeight:1},__Cc:function(){var A=this.__Ce(false);document.body.insertBefore(A,document.body.firstChild);return this._textElement=A;}
,__Cd:function(){var B=this.__Ce(true);document.body.insertBefore(B,document.body.firstChild);return this._htmlElement=B;}
,__Ce:function(E){var C=qx.dom.Element.create(h);var D=C.style;D.width=D.height=j;D.left=D.top=x;D.visibility=y;D.position=z;D.overflow=p;D.display=v;if(E){D.whiteSpace=t;}
else {D.whiteSpace=f;if(!qx.core.Environment.get(l)&&qx.core.Environment.get(n)){var F=document.createElementNS(d,w);var D=F.style;D.padding=k;D.margin=k;D.width=j;for(var G in this.__gT){D[G]=u;}
;C.appendChild(F);}
;}
;return C;}
,__Cf:function(I){var H={};H.overflow=y;if(I){H.whiteSpace=t;}
else if(!qx.core.Environment.get(l)&&qx.core.Environment.get(n)){H.display=v;}
else {H.whiteSpace=f;H[qx.core.Environment.get(l)]=s;}
;return H;}
,create:function(content,M,L){if(!L){L=window;}
;var J=L.document.createElement(h);if(M){J.useHtml=true;}
;if(!qx.core.Environment.get(l)&&qx.core.Environment.get(n)){var N=L.document.createElementNS(d,w);var K=N.style;K.cursor=u;K.color=u;K.overflow=y;K.maxWidth=i;K.padding=k;K.margin=k;K.width=j;for(var O in this.__gT){N.style[O]=u;}
;N.setAttribute(e,g);J.appendChild(N);}
else {qx.bom.element.Style.setStyles(J,this.__Cf(M));}
;if(content){this.setValue(J,content);}
;return J;}
,__Cg:null,setSanitizer:function(P){if(qx.core.Environment.get(m)){if(P){qx.core.Assert.assertFunction(P);}
;}
;qx.bom.Label.__Cg=P;}
,setValue:function(R,Q){Q=Q||r;if(R.useHtml){if(qx.bom.Label.__Cg&&typeof (qx.bom.Label.__Cg)===b){Q=qx.bom.Label.__Cg(Q);}
;R.innerHTML=Q;}
else if(!qx.core.Environment.get(l)&&qx.core.Environment.get(n)){R.firstChild.setAttribute(o,Q);}
else {qx.bom.element.Attribute.set(R,a,Q);}
;}
,getValue:function(S){if(S.useHtml){return S.innerHTML;}
else if(!qx.core.Environment.get(l)&&qx.core.Environment.get(n)){return S.firstChild.getAttribute(o)||r;}
else {return qx.bom.element.Attribute.get(S,a);}
;}
,getHtmlSize:function(content,T,U){var V=this._htmlElement||this.__Cd();V.style.width=U!=undefined?U+c:j;V.innerHTML=content;return this.__Ch(V,T);}
,getTextSize:function(X,W){var Y=this._textElement||this.__Cc();if(!qx.core.Environment.get(l)&&qx.core.Environment.get(n)){Y.firstChild.setAttribute(o,X);}
else {qx.bom.element.Attribute.set(Y,a,X);}
;return this.__Ch(Y,W);}
,__Ch:function(be,ba){var bb=this.__gT;if(!ba){ba={};}
;for(var bd in bb){be.style[bd]=ba[bd]||r;}
;var bc=qx.bom.element.Dimension.getSize(be);bc.width++ ;return bc;}
}});}
)();
(function(){var a="qx.ui.form.IForm",b="qx.event.type.Data";qx.Interface.define(a,{events:{"changeEnabled":b,"changeValid":b,"changeInvalidMessage":b,"changeRequired":b},members:{setEnabled:function(c){return arguments.length==1;}
,getEnabled:function(){}
,setRequired:function(d){return arguments.length==1;}
,getRequired:function(){}
,setValid:function(e){return arguments.length==1;}
,getValid:function(){}
,setInvalidMessage:function(f){return arguments.length==1;}
,getInvalidMessage:function(){}
,setRequiredInvalidMessage:function(g){return arguments.length==1;}
,getRequiredInvalidMessage:function(){}
}});}
)();
(function(){var a="qx.application.Standalone";qx.Class.define(a,{extend:qx.application.AbstractGui,members:{_createRootWidget:function(){return new qx.ui.root.Application(document);}
}});}
)();
(function(){var a="_applyActiveWindow",b="changeModal",c="windowAdded",d="changeVisibility",f="__Ci",g="windowRemoved",h="qx.ui.window.Window",i="changeActive",j="qx.ui.window.MDesktop",k="__ff",l="changeActiveWindow",m="qx.event.type.Data";qx.Mixin.define(j,{properties:{activeWindow:{check:h,apply:a,event:l,init:null,nullable:true}},events:{windowAdded:m,windowRemoved:m},members:{__Ci:null,__ff:null,getWindowManager:function(){if(!this.__ff){this.setWindowManager(new qx.ui.window.Window.DEFAULT_MANAGER_CLASS());}
;return this.__ff;}
,supportsMaximize:function(){return true;}
,setWindowManager:function(n){if(this.__ff){this.__ff.setDesktop(null);}
;n.setDesktop(this);this.__ff=n;}
,_onChangeActive:function(e){if(e.getData()){this.setActiveWindow(e.getTarget());}
else if(this.getActiveWindow()==e.getTarget()){this.setActiveWindow(null);}
;}
,_applyActiveWindow:function(p,o){this.getWindowManager().changeActiveWindow(p,o);this.getWindowManager().updateStack();}
,_onChangeModal:function(e){this.getWindowManager().updateStack();}
,_onChangeVisibility:function(){this.getWindowManager().updateStack();}
,_afterAddChild:function(q){if(qx.Class.isDefined(h)&&q instanceof qx.ui.window.Window){this._addWindow(q);}
;}
,_addWindow:function(r){if(!qx.lang.Array.contains(this.getWindows(),r)){this.getWindows().push(r);this.fireDataEvent(c,r);r.addListener(i,this._onChangeActive,this);r.addListener(b,this._onChangeModal,this);r.addListener(d,this._onChangeVisibility,this);}
;if(r.getActive()){this.setActiveWindow(r);}
;this.getWindowManager().updateStack();}
,_afterRemoveChild:function(s){if(qx.Class.isDefined(h)&&s instanceof qx.ui.window.Window){this._removeWindow(s);}
;}
,_removeWindow:function(t){if(qx.lang.Array.contains(this.getWindows(),t)){qx.lang.Array.remove(this.getWindows(),t);this.fireDataEvent(g,t);t.removeListener(i,this._onChangeActive,this);t.removeListener(b,this._onChangeModal,this);t.removeListener(d,this._onChangeVisibility,this);this.getWindowManager().updateStack();}
;}
,getWindows:function(){if(!this.__Ci){this.__Ci=[];}
;return this.__Ci;}
},destruct:function(){this._disposeArray(f);this._disposeObjects(k);}
});}
)();
(function(){var a="_applyBlockerColor",b="Number",c="qx.ui.core.MBlocker",d="__gy",e="_applyBlockerOpacity",f="Color";qx.Mixin.define(c,{properties:{blockerColor:{check:f,init:null,nullable:true,apply:a,themeable:true},blockerOpacity:{check:b,init:1,apply:e,themeable:true}},members:{__gy:null,_createBlocker:function(){return new qx.ui.core.Blocker(this);}
,_applyBlockerColor:function(h,g){this.getBlocker().setColor(h);}
,_applyBlockerOpacity:function(j,i){this.getBlocker().setOpacity(j);}
,block:function(){this.getBlocker().block();}
,isBlocked:function(){return this.__gy&&this.__gy.isBlocked();}
,unblock:function(){if(this.__gy){this.__gy.unblock();}
;}
,forceUnblock:function(){if(this.__gy){this.__gy.forceUnblock();}
;}
,blockContent:function(k){this.getBlocker().blockContent(k);}
,getBlocker:function(){if(!this.__gy){this.__gy=this._createBlocker();}
;return this.__gy;}
},destruct:function(){this._disposeObjects(d);}
});}
)();
(function(){var a="qx.dyntheme",b="backgroundColor",c="_applyOpacity",d="Boolean",f="px",g="keydown",h="deactivate",j="changeTheme",k="opacity",l="Tab",m="qx.event.type.Event",n="move",o="Color",p="resize",q="zIndex",r="appear",s="__rq",t="qx.ui.root.Abstract",u="keyup",v="keypress",w="Number",x="unblocked",y="qx.ui.core.Blocker",z="disappear",A="blocked",B="__gy",C="_applyColor";qx.Class.define(y,{extend:qx.core.Object,events:{blocked:m,unblocked:m},construct:function(D){qx.core.Object.call(this);this._widget=D;D.addListener(p,this.__Cn,this);D.addListener(n,this.__Cn,this);D.addListener(z,this.__Cp,this);if(qx.Class.isDefined(t)&&D instanceof qx.ui.root.Abstract){this._isRoot=true;this.setKeepBlockerActive(true);}
;if(qx.core.Environment.get(a)){qx.theme.manager.Meta.getInstance().addListener(j,this._onChangeTheme,this);}
;this.__Cj=[];this.__Ck=[];}
,properties:{color:{check:o,init:null,nullable:true,apply:C,themeable:true},opacity:{check:w,init:1,apply:c,themeable:true},keepBlockerActive:{check:d,init:false}},members:{__gy:null,__Cl:0,__Cj:null,__Ck:null,__rq:null,_widget:null,_isRoot:false,__Cm:null,__Cn:function(e){var E=e.getData();if(this.isBlocked()){this._updateBlockerBounds(E);}
;}
,__Co:function(){this._updateBlockerBounds(this._widget.getBounds());if(this._widget.isRootWidget()){this._widget.getContentElement().add(this.getBlockerElement());}
else {this._widget.getLayoutParent().getContentElement().add(this.getBlockerElement());}
;}
,__Cp:function(){if(this.isBlocked()){this.getBlockerElement().getParent().remove(this.getBlockerElement());this._widget.addListenerOnce(r,this.__Co,this);}
;}
,_updateBlockerBounds:function(F){this.getBlockerElement().setStyles({width:F.width+f,height:F.height+f,left:F.left+f,top:F.top+f});}
,_applyColor:function(I,H){var G=qx.theme.manager.Color.getInstance().resolve(I);this.__Cq(b,G);}
,_applyOpacity:function(K,J){this.__Cq(k,K);}
,_onChangeTheme:qx.core.Environment.select(a,{"true":function(){this._applyColor(this.getColor());}
,"false":null}),__Cq:function(M,N){var L=[];this.__gy&&L.push(this.__gy);for(var i=0;i<L.length;i++ ){L[i].setStyle(M,N);}
;}
,_backupActiveWidget:function(){var O=qx.event.Registration.getManager(window).getHandler(qx.event.handler.Focus);this.__Cj.push(qx.ui.core.Widget.getWidgetByElement(O.getActive()));this.__Ck.push(qx.ui.core.Widget.getWidgetByElement(O.getFocus()));if(this._widget.isFocusable()){this._widget.focus();}
;}
,_restoreActiveWidget:function(){var Q;var P=this.__Ck.length;if(P>0){Q=this.__Ck.pop();if(Q&&!Q.isDisposed()&&Q.isFocusable()){Q.focus();}
;}
;var R=this.__Cj.length;if(R>0){Q=this.__Cj.pop();if(Q&&!Q.isDisposed()){Q.activate();}
;}
;}
,__Cr:function(){return new qx.html.Blocker(this.getColor(),this.getOpacity());}
,getBlockerElement:function(S){if(!this.__gy){this.__gy=this.__Cr();this.__gy.setStyle(q,15);if(!S){if(this._isRoot){S=this._widget;}
else {S=this._widget.getLayoutParent();}
;}
;S.getContentElement().add(this.__gy);this.__gy.exclude();}
;return this.__gy;}
,block:function(){this._block();}
,_block:function(T,V){if(!this._isRoot&&!this._widget.getLayoutParent()){this.__Cm=this._widget.addListenerOnce(r,this._block.bind(this,T));return;}
;var parent;if(this._isRoot||V){parent=this._widget;}
else {parent=this._widget.getLayoutParent();}
;var U=this.getBlockerElement(parent);if(T!=null){U.setStyle(q,T);}
;this.__Cl++ ;if(this.__Cl<2){this._backupActiveWidget();var W=this._widget.getBounds();if(W){this._updateBlockerBounds(W);}
;U.include();if(!V){U.activate();}
;U.addListener(h,this.__Cu,this);U.addListener(v,this.__Ct,this);U.addListener(g,this.__Ct,this);U.addListener(u,this.__Ct,this);this.fireEvent(A,qx.event.type.Event);}
;}
,isBlocked:function(){return this.__Cl>0;}
,unblock:function(){if(this.__Cm){this._widget.removeListenerById(this.__Cm);}
;if(!this.isBlocked()){return;}
;this.__Cl-- ;if(this.__Cl<1){this.__Cs();this.__Cl=0;}
;}
,forceUnblock:function(){if(!this.isBlocked()){return;}
;this.__Cl=0;this.__Cs();}
,__Cs:function(){this._restoreActiveWidget();var X=this.getBlockerElement();X.removeListener(h,this.__Cu,this);X.removeListener(v,this.__Ct,this);X.removeListener(g,this.__Ct,this);X.removeListener(u,this.__Ct,this);X.exclude();this.fireEvent(x,qx.event.type.Event);}
,blockContent:function(Y){this._block(Y,true);}
,__Ct:function(e){if(e.getKeyIdentifier()==l){e.stop();}
;}
,__Cu:function(){if(this.getKeepBlockerActive()){this.getBlockerElement().activate();}
;}
},destruct:function(){if(qx.core.Environment.get(a)){qx.theme.manager.Meta.getInstance().removeListener(j,this._onChangeTheme,this);}
;this._widget.removeListener(p,this.__Cn,this);this._widget.removeListener(n,this.__Cn,this);this._widget.removeListener(r,this.__Co,this);this._widget.removeListener(z,this.__Cp,this);if(this.__Cm){this._widget.removeListenerById(this.__Cm);}
;this._disposeObjects(B,s);this.__Cj=this.__Ck=this._widget=null;}
});}
)();
(function(){var a="swipe",b="repeat",c="mousedown",d="url(",f="pointerover",g=")",h="longtap",i="mouseout",j="div",k="roll",l="cursor",m="dblclick",n="mousewheel",o="qx.html.Blocker",p="mousemove",q="dbltap",r="pointerup",s="mouseover",t="appear",u="click",v="pointerdown",w="mshtml",x="engine.name",y="mouseup",z="contextmenu",A="disappear",B="tap",C="pointermove",D="pointerout",E="qx/static/blank.gif",F="absolute";qx.Class.define(o,{extend:qx.html.Element,construct:function(I,G){var I=I?qx.theme.manager.Color.getInstance().resolve(I):null;var H={position:F,opacity:G||0,backgroundColor:I};if((qx.core.Environment.get(x)==w)){H.backgroundImage=d+qx.util.ResourceManager.getInstance().toUri(E)+g;H.backgroundRepeat=b;}
;qx.html.Element.call(this,j,H);this.addListener(c,this._stopPropagation,this);this.addListener(y,this._stopPropagation,this);this.addListener(u,this._stopPropagation,this);this.addListener(m,this._stopPropagation,this);this.addListener(p,this._stopPropagation,this);this.addListener(s,this._stopPropagation,this);this.addListener(i,this._stopPropagation,this);this.addListener(n,this._stopPropagation,this);this.addListener(k,this._stopPropagation,this);this.addListener(z,this._stopPropagation,this);this.addListener(v,this._stopPropagation,this);this.addListener(r,this._stopPropagation,this);this.addListener(C,this._stopPropagation,this);this.addListener(f,this._stopPropagation,this);this.addListener(D,this._stopPropagation,this);this.addListener(B,this._stopPropagation,this);this.addListener(q,this._stopPropagation,this);this.addListener(a,this._stopPropagation,this);this.addListener(h,this._stopPropagation,this);this.addListener(t,this.__Cv,this);this.addListener(A,this.__Cv,this);}
,members:{_stopPropagation:function(e){e.stopPropagation();}
,__Cv:function(){var J=this.getStyle(l);this.setStyle(l,null,true);this.setStyle(l,J,true);}
}});}
)();
(function(){var a="Boolean",b="event.help",c="true",d="Space",f="textarea",g="changeGlobalCursor",h="",i="input",j="select",k="_applyNativeHelp",l=" !important",m="String",n="*",o="root",p="_applyGlobalCursor",q="qx.ui.root.Abstract",r="abstract",s="engine.name",t="keypress",u="contextmenu",v="help",w="a",x=";";qx.Class.define(q,{type:r,extend:qx.ui.core.Widget,include:[qx.ui.core.MChildrenHandling,qx.ui.core.MBlocker,qx.ui.window.MDesktop],construct:function(){qx.ui.core.Widget.call(this);qx.ui.core.FocusHandler.getInstance().addRoot(this);qx.ui.core.queue.Visibility.add(this);this.initNativeHelp();this.addListener(t,this.__Cx,this);}
,properties:{appearance:{refine:true,init:o},enabled:{refine:true,init:true},focusable:{refine:true,init:true},globalCursor:{check:m,nullable:true,themeable:true,apply:p,event:g},nativeContextMenu:{refine:true,init:false},nativeHelp:{check:a,init:false,apply:k}},members:{__Cw:null,isRootWidget:function(){return true;}
,getLayout:function(){return this._getLayout();}
,_applyGlobalCursor:qx.core.Environment.select(s,{"mshtml":function(z,y){}
,"default":function(D,C){var B=qx.bom.Stylesheet;var A=this.__Cw;if(!A){this.__Cw=A=B.createElement();}
;B.removeAllRules(A);if(D){B.addRule(A,n,qx.bom.element.Cursor.compile(D).replace(x,h)+l);}
;}
}),_applyNativeContextMenu:function(F,E){if(F){this.removeListener(u,this._onNativeContextMenu,this,true);}
else {this.addListener(u,this._onNativeContextMenu,this,true);}
;}
,_onNativeContextMenu:function(e){if(e.getTarget().getNativeContextMenu()){return;}
;e.preventDefault();}
,__Cx:function(e){if(e.getKeyIdentifier()!==d){return;}
;var K=e.getTarget();var I=qx.ui.core.FocusHandler.getInstance();if(!I.isFocused(K)){return;}
;var G=K.getContentElement();var H=G.getNodeName();var J=G.getDomElement();if(H===i||H===f||(J&&J.contentEditable===c)){return;}
;H=qx.dom.Node.getName(e.getOriginalTarget());if(H&&[i,f,j,w].indexOf(H)>-1){return;}
;e.preventDefault();}
,_applyNativeHelp:function(M,L){if(qx.core.Environment.get(b)){if(L===false){qx.bom.Event.removeNativeListener(document,v,(function(){return false;}
));}
;if(M===false){qx.bom.Event.addNativeListener(document,v,(function(){return false;}
));}
;}
;}
},destruct:function(){this.__Cw=null;}
,defer:function(N,O){qx.ui.core.MChildrenHandling.remap(O);}
});}
)();
(function(){var a="keypress",b="focusout",c="__Cy",d="activate",f="Tab",g="singleton",h="deactivate",j="focusin",k="qx.ui.core.FocusHandler";qx.Class.define(k,{extend:qx.core.Object,type:g,construct:function(){qx.core.Object.call(this);this.__Cy={};}
,members:{__Cy:null,__Cz:null,__CA:null,__CB:null,connectTo:function(m){m.addListener(a,this.__ne,this);m.addListener(j,this._onFocusIn,this,true);m.addListener(b,this._onFocusOut,this,true);m.addListener(d,this._onActivate,this,true);m.addListener(h,this._onDeactivate,this,true);}
,addRoot:function(n){this.__Cy[n.$$hash]=n;}
,removeRoot:function(o){delete this.__Cy[o.$$hash];}
,getActiveWidget:function(){return this.__Cz;}
,isActive:function(p){return this.__Cz==p;}
,getFocusedWidget:function(){return this.__CA;}
,isFocused:function(q){return this.__CA==q;}
,isFocusRoot:function(r){return !!this.__Cy[r.$$hash];}
,_onActivate:function(e){var t=e.getTarget();this.__Cz=t;var s=this.__CC(t);if(s!=this.__CB){this.__CB=s;}
;}
,_onDeactivate:function(e){var u=e.getTarget();if(this.__Cz==u){this.__Cz=null;}
;}
,_onFocusIn:function(e){var v=e.getTarget();if(v!=this.__CA){this.__CA=v;v.visualizeFocus();}
;}
,_onFocusOut:function(e){var w=e.getTarget();if(w==this.__CA){this.__CA=null;w.visualizeBlur();}
;}
,__ne:function(e){if(e.getKeyIdentifier()!=f){return;}
;if(!this.__CB){return;}
;e.stopPropagation();e.preventDefault();var x=this.__CA;if(!e.isShiftPressed()){var y=x?this.__CG(x):this.__CE();}
else {var y=x?this.__CH(x):this.__CF();}
;if(y){y.tabFocus();}
;}
,__CC:function(z){var A=this.__Cy;while(z){if(A[z.$$hash]){return z;}
;z=z.getLayoutParent();}
;return null;}
,__CD:function(I,H){if(I===H){return 0;}
;var C=I.getTabIndex()||0;var B=H.getTabIndex()||0;if(C!=B){return C-B;}
;var J=I.getContentElement().getDomElement();var G=H.getContentElement().getDomElement();var F=qx.bom.element.Location;var E=F.get(J);var D=F.get(G);if(E.top!=D.top){return E.top-D.top;}
;if(E.left!=D.left){return E.left-D.left;}
;var K=I.getZIndex();var L=H.getZIndex();if(K!=L){return K-L;}
;return 0;}
,__CE:function(){return this.__CK(this.__CB,null);}
,__CF:function(){return this.__CL(this.__CB,null);}
,__CG:function(M){var N=this.__CB;if(N==M){return this.__CE();}
;while(M&&M.getAnonymous()){M=M.getLayoutParent();}
;if(M==null){return [];}
;var O=[];this.__CI(N,M,O);O.sort(this.__CD);var P=O.length;return P>0?O[0]:this.__CE();}
,__CH:function(Q){var R=this.__CB;if(R==Q){return this.__CF();}
;while(Q&&Q.getAnonymous()){Q=Q.getLayoutParent();}
;if(Q==null){return [];}
;var S=[];this.__CJ(R,Q,S);S.sort(this.__CD);var T=S.length;return T>0?S[T-1]:this.__CF();}
,__CI:function(parent,U,V){var X=parent.getLayoutChildren();var W;for(var i=0,l=X.length;i<l;i++ ){W=X[i];if(!(W instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(W)&&W.isEnabled()&&W.isVisible()){if(W.isTabable()&&this.__CD(U,W)<0){V.push(W);}
;this.__CI(W,U,V);}
;}
;}
,__CJ:function(parent,Y,ba){var bc=parent.getLayoutChildren();var bb;for(var i=0,l=bc.length;i<l;i++ ){bb=bc[i];if(!(bb instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(bb)&&bb.isEnabled()&&bb.isVisible()){if(bb.isTabable()&&this.__CD(Y,bb)>0){ba.push(bb);}
;this.__CJ(bb,Y,ba);}
;}
;}
,__CK:function(parent,bd){var bf=parent.getLayoutChildren();var be;for(var i=0,l=bf.length;i<l;i++ ){be=bf[i];if(!(be instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(be)&&be.isEnabled()&&be.isVisible()){if(be.isTabable()){if(bd==null||this.__CD(be,bd)<0){bd=be;}
;}
;bd=this.__CK(be,bd);}
;}
;return bd;}
,__CL:function(parent,bg){var bi=parent.getLayoutChildren();var bh;for(var i=0,l=bi.length;i<l;i++ ){bh=bi[i];if(!(bh instanceof qx.ui.core.Widget)){continue;}
;if(!this.isFocusRoot(bh)&&bh.isEnabled()&&bh.isVisible()){if(bh.isTabable()){if(bg==null||this.__CD(bh,bg)>0){bg=bh;}
;}
;bg=this.__CL(bh,bg);}
;}
;return bg;}
},destruct:function(){this._disposeMap(c);this.__CA=this.__Cz=this.__CB=null;}
});}
)();
(function(){var a="touchmove",b="os.name",c="-webkit-overflow-scrolling",d="touch",f="paddingLeft",g="div",h="100%",i="The root widget does not support 'left', or 'top' paddings!",j="0px",k="The application could not be started due to a missing body tag in the HTML file!",l="ios",m="overflowY",n="resize",o="",p="$$widget",q="paddingTop",r="engine.name",s="none",t="webkit",u="-webkit-backface-visibility",v="touch-action",w="qx.ui.root.Application",x="hidden",y="tap",z="overflowX",A="absolute";qx.Class.define(w,{extend:qx.ui.root.Abstract,construct:function(B){this.__lG=qx.dom.Node.getWindow(B);this.__qY=B;qx.ui.root.Abstract.call(this);qx.event.Registration.addListener(this.__lG,n,this._onResize,this);this._setLayout(new qx.ui.layout.Canvas());qx.ui.core.queue.Layout.add(this);qx.ui.core.FocusHandler.getInstance().connectTo(this);this.getContentElement().disableScrolling();this.getContentElement().setStyle(u,x);this.addListener(a,this.__CM,this);if(qx.core.Environment.get(b)==l){this.getContentElement().addListener(y,function(e){var C=qx.ui.core.Widget.getWidgetByElement(e.getTarget());while(C&&!C.isFocusable()){C=C.getLayoutParent();}
;if(C&&C.isFocusable()){C.getContentElement().focus();}
;}
,this,true);}
;}
,members:{__lG:null,__qY:null,_createContentElement:function(){var D=this.__qY;if((qx.core.Environment.get(r)==t)){if(!D.body){alert(k);}
;}
;var H=D.documentElement.style;var E=D.body.style;H.overflow=E.overflow=x;H.padding=H.margin=E.padding=E.margin=j;H.width=H.height=E.width=E.height=h;var G=D.createElement(g);D.body.appendChild(G);var F=new qx.html.Root(G);F.setStyles({"position":A,"overflowX":x,"overflowY":x});F.setAttribute(p,this.toHashCode());return F;}
,_onResize:function(e){qx.ui.core.queue.Layout.add(this);if(qx.ui.popup&&qx.ui.popup.Manager){qx.ui.popup.Manager.getInstance().hideAll();}
;if(qx.ui.menu&&qx.ui.menu.Manager){qx.ui.menu.Manager.getInstance().hideAll();}
;}
,_computeSizeHint:function(){var I=qx.bom.Viewport.getWidth(this.__lG);var J=qx.bom.Viewport.getHeight(this.__lG);return {minWidth:I,width:I,maxWidth:I,minHeight:J,height:J,maxHeight:J};}
,_applyPadding:function(L,K,name){if(L&&(name==q||name==f)){throw new Error(i);}
;qx.ui.root.Abstract.prototype._applyPadding.call(this,L,K,name);}
,__CM:function(e){var M=e.getOriginalTarget();while(M&&M.style){var Q=qx.bom.element.Style.get(M,v)!==s&&qx.bom.element.Style.get(M,v)!==o;var P=qx.bom.element.Style.get(M,c)===d;var O=qx.bom.element.Style.get(M,z)!=x;var N=qx.bom.element.Style.get(M,m)!=x;if(Q||P||N||O){return;}
;M=M.parentNode;}
;e.preventDefault();}
,destroy:function(){if(this.$$disposed){return;}
;qx.dom.Element.remove(this.getContentElement().getDomElement());qx.ui.root.Abstract.prototype.destroy.call(this);}
},destruct:function(){this.__lG=this.__qY=null;}
});}
)();
(function(){var a="Boolean",b="': ",c="width",d="qx.ui.layout.Canvas",e="number",f="qx.debug",g="height",h="Bad format of layout property '",j="The property '",k=". The value must be either an integer or an percent string.",m="' is not supported by the Canvas layout!";qx.Class.define(d,{extend:qx.ui.layout.Abstract,properties:{desktop:{check:a,init:false}},members:{verifyLayoutProperty:qx.core.Environment.select(f,{"true":function(p,name,o){var n={top:1,left:1,bottom:1,right:1,width:1,height:1,edge:1};this.assert(n[name]==1,j+name+m);if(name==c||name==g){this.assertMatch(o,qx.ui.layout.Util.PERCENT_VALUE);}
else {if(typeof o===e){this.assertInteger(o);}
else if(qx.lang.Type.isString(o)){this.assertMatch(o,qx.ui.layout.Util.PERCENT_VALUE);}
else {this.fail(h+name+b+o+k);}
;}
;}
,"false":null}),renderLayout:function(t,v,x){var D=this._getLayoutChildren();var q,F,C;var s,top,r,u,y,w;var B,A,E,z;for(var i=0,l=D.length;i<l;i++ ){q=D[i];F=q.getSizeHint();C=q.getLayoutProperties();B=q.getMarginTop();A=q.getMarginRight();E=q.getMarginBottom();z=q.getMarginLeft();s=C.left!=null?C.left:C.edge;if(qx.lang.Type.isString(s)){s=Math.round(parseFloat(s)*t/100);}
;r=C.right!=null?C.right:C.edge;if(qx.lang.Type.isString(r)){r=Math.round(parseFloat(r)*t/100);}
;top=C.top!=null?C.top:C.edge;if(qx.lang.Type.isString(top)){top=Math.round(parseFloat(top)*v/100);}
;u=C.bottom!=null?C.bottom:C.edge;if(qx.lang.Type.isString(u)){u=Math.round(parseFloat(u)*v/100);}
;if(s!=null&&r!=null){y=t-s-r-z-A;if(y<F.minWidth){y=F.minWidth;}
else if(y>F.maxWidth){y=F.maxWidth;}
;s+=z;}
else {y=C.width;if(y==null){y=F.width;}
else {y=Math.round(parseFloat(y)*t/100);if(y<F.minWidth){y=F.minWidth;}
else if(y>F.maxWidth){y=F.maxWidth;}
;}
;if(r!=null){s=t-y-r-A-z;}
else if(s==null){s=z;}
else {s+=z;}
;}
;if(top!=null&&u!=null){w=v-top-u-B-E;if(w<F.minHeight){w=F.minHeight;}
else if(w>F.maxHeight){w=F.maxHeight;}
;top+=B;}
else {w=C.height;if(w==null){w=F.height;}
else {w=Math.round(parseFloat(w)*v/100);if(w<F.minHeight){w=F.minHeight;}
else if(w>F.maxHeight){w=F.maxHeight;}
;}
;if(u!=null){top=v-w-u-E-B;}
else if(top==null){top=B;}
else {top+=B;}
;}
;s+=x.left;top+=x.top;q.renderLayout(s,top,y,w);}
;}
,_computeSizeHint:function(){var X=0,J=0;var U=0,T=0;var S,G;var P,N;var W=this._getLayoutChildren();var H,M,K;var V=this.isDesktop();var L,top,I,O;for(var i=0,l=W.length;i<l;i++ ){H=W[i];M=H.getLayoutProperties();K=H.getSizeHint();var R=H.getMarginLeft()+H.getMarginRight();var Q=H.getMarginTop()+H.getMarginBottom();S=K.width+R;G=K.minWidth+R;L=M.left!=null?M.left:M.edge;if(L&&typeof L===e){S+=L;G+=L;}
;I=M.right!=null?M.right:M.edge;if(I&&typeof I===e){S+=I;G+=I;}
;X=Math.max(X,S);J=V?0:Math.max(J,G);P=K.height+Q;N=K.minHeight+Q;top=M.top!=null?M.top:M.edge;if(top&&typeof top===e){P+=top;N+=top;}
;O=M.bottom!=null?M.bottom:M.edge;if(O&&typeof O===e){P+=O;N+=O;}
;U=Math.max(U,P);T=V?0:Math.max(T,N);}
;return {width:X,minWidth:J,height:U,minHeight:T};}
}});}
)();
(function(){var a="qx.html.Root";qx.Class.define(a,{extend:qx.html.Element,construct:function(b){qx.html.Element.call(this);if(b!=null){this.useElement(b);}
;}
,members:{useElement:function(c){qx.html.Element.prototype.useElement.call(this,c);this.setRoot(true);qx.html.Element._modified[this.$$hash]=this;}
}});}
)();
(function(){var a="tap",b="demobrowser.demo.util.LayoutApplication",c="east";qx.Class.define(b,{extend:qx.application.Standalone,members:{main:function(){qx.application.Standalone.prototype.main.call(this);var d=new qx.ui.container.Composite(new qx.ui.layout.Dock());var f=new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({minHeight:10,minWidth:10});var g=new demobrowser.demo.util.PropertyEditor(f);f.addListener(a,this._onTapRoot,this);d.add(g,{edge:c});d.add(f);this._root=f;this._editor=g;qx.application.Standalone.prototype.getRoot.call(this).add(d,{edge:0});}
,getRoot:function(){return this._root;}
,_onTapRoot:function(e){if(e.getTarget()!==this._root){this._editor.handleWidgetTap(e);}
;}
},destruct:function(){this._root=this._editor=null;}
});}
)();
(function(){var a="Boolean",b="It is not allowed to have more than one child aligned to 'center'!",c="height",d="west",e="bottom",f="Integer",g="The property '",h="_applyLayoutChange",j="qx.debug",k="width",l="' is not supported by the Dock layout!",m="auto",n="center",o="y",p="Decorator",q="qx.ui.layout.Dock",r="_applySort",s="north",t="top",u="right",v="east",w="edge",x="south",y="flex",z="left",A="x";qx.Class.define(q,{extend:qx.ui.layout.Abstract,construct:function(C,B,E,D){qx.ui.layout.Abstract.call(this);if(C){this.setSpacingX(C);}
;if(B){this.setSpacingY(B);}
;if(E){this.setSeparatorX(E);}
;if(D){this.setSeparatorY(D);}
;}
,properties:{sort:{check:[m,o,A],init:m,apply:r},separatorX:{check:p,nullable:true,apply:h},separatorY:{check:p,nullable:true,apply:h},connectSeparators:{check:a,init:false,apply:h},spacingX:{check:f,init:0,apply:h},spacingY:{check:f,init:0,apply:h}},members:{__fu:null,__us:null,verifyLayoutProperty:qx.core.Environment.select(j,{"true":function(F,name,G){this.assertInArray(name,[y,w,c,k],g+name+l);if(name===w){this.assertInArray(G,[s,x,d,v,n]);}
else if(name===y){this.assertNumber(G);this.assert(G>=0);}
else {this.assertMatch(G,qx.ui.layout.Util.PERCENT_VALUE);}
;}
,"false":null}),_applySort:function(){this._invalidChildrenCache=true;this._applyLayoutChange();}
,__ut:{north:1,south:2,west:3,east:4,center:5},__uu:{'1':t,'2':e,'3':z,'4':u},__uv:function(){var H=this._getLayoutChildren();var P,J;var length=H.length;var L=[];var O=[];var K=[];var I=this.getSort()===o;var N=this.getSort()===A;for(var i=0;i<length;i++ ){P=H[i];K=P.getLayoutProperties().edge;if(K===n){if(J){throw new Error(b);}
;J=P;}
else if(N||I){if(K===s||K===x){I?L.push(P):O.push(P);}
else if(K===d||K===v){I?O.push(P):L.push(P);}
;}
else {L.push(P);}
;}
;var Q=L.concat(O);if(J){Q.push(J);}
;this.__fu=Q;var M=[];for(var i=0;i<length;i++ ){K=Q[i].getLayoutProperties().edge;M[i]=this.__ut[K]||5;}
;this.__us=M;delete this._invalidChildrenCache;}
,renderLayout:function(bl,bb,bt){if(this._invalidChildrenCache){this.__uv();}
;var bk=qx.ui.layout.Util;var W=this.__fu;var bm=this.__us;var length=W.length;var ba,bu,Y,bf,bg,br,bd,T,S;var bx=[];var bc=[];var bs=this._getSeparatorWidths();var bB=this.getSpacingX();var bA=this.getSpacingY();var X=-bB;var bn=-bA;if(bs.x){X-=bs.x+bB;}
;if(bs.y){bn-=bs.y+bA;}
;for(var i=0;i<length;i++ ){bu=W[i];bf=bu.getLayoutProperties();Y=bu.getSizeHint();bd=Y.width;T=Y.height;if(bf.width!=null){bd=Math.floor(bl*parseFloat(bf.width)/100);if(bd<Y.minWidth){bd=Y.minWidth;}
else if(bd>Y.maxWidth){bd=Y.maxWidth;}
;}
;if(bf.height!=null){T=Math.floor(bb*parseFloat(bf.height)/100);if(T<Y.minHeight){T=Y.minHeight;}
else if(T>Y.maxHeight){T=Y.maxHeight;}
;}
;bx[i]=bd;bc[i]=T;switch(bm[i]){case 1:case 2:bn+=T+bu.getMarginTop()+bu.getMarginBottom()+bA;if(bs.y){bn+=bs.y+bA;}
;break;case 3:case 4:X+=bd+bu.getMarginLeft()+bu.getMarginRight()+bB;if(bs.x){X+=bs.x+bB;}
;break;default:X+=bd+bu.getMarginLeft()+bu.getMarginRight()+bB;bn+=T+bu.getMarginTop()+bu.getMarginBottom()+bA;if(bs.x){X+=bs.x+bB;}
;if(bs.y){bn+=bs.y+bA;}
;};}
;if(X!=bl){ba={};br=X<bl;for(var i=0;i<length;i++ ){bu=W[i];switch(bm[i]){case 3:case 4:case 5:bg=bu.getLayoutProperties().flex;if(bg==null&&bm[i]==5){bg=1;}
;if(bg>0){Y=bu.getSizeHint();ba[i]={min:Y.minWidth,value:bx[i],max:Y.maxWidth,flex:bg};}
;};}
;var U=bk.computeFlexOffsets(ba,bl,X);for(var i in U){S=U[i].offset;bx[i]+=S;X+=S;}
;}
;if(bn!=bb){ba={};br=bn<bb;for(var i=0;i<length;i++ ){bu=W[i];switch(bm[i]){case 1:case 2:case 5:bg=bu.getLayoutProperties().flex;if(bg==null&&bm[i]==5){bg=1;}
;if(bg>0){Y=bu.getSizeHint();ba[i]={min:Y.minHeight,value:bc[i],max:Y.maxHeight,flex:bg};}
;};}
;var U=bk.computeFlexOffsets(ba,bb,bn);for(var i in U){S=U[i].offset;bc[i]+=S;bn+=S;}
;}
;this._clearSeparators();var bw=this.getSeparatorX(),bv=this.getSeparatorY();var by=this.getConnectSeparators();var bi=0,bq=0;var bF,top,bd,T,bh,bC;var bj,bz,bE,bo;var bD,R,be,V;var bp=this.__uu;for(var i=0;i<length;i++ ){bu=W[i];bC=bm[i];Y=bu.getSizeHint();bD=bu.getMarginTop();R=bu.getMarginBottom();be=bu.getMarginLeft();V=bu.getMarginRight();switch(bC){case 1:case 2:bd=bl-be-V;if(bd<Y.minWidth){bd=Y.minWidth;}
else if(bd>Y.maxWidth){bd=Y.maxWidth;}
;T=bc[i];top=bi+bk.computeVerticalAlignOffset(bp[bC],T,bb,bD,R);bF=bq+bk.computeHorizontalAlignOffset(bu.getAlignX()||z,bd,bl,be,V);if(bs.y){if(bC==1){bz=bi+T+bD+bA+R;}
else {bz=bi+bb-T-bD-bA-R-bs.y;}
;bj=bF;bE=bl;if(by&&bj>0){bj-=bB+be;bE+=(bB)*2;}
else {bj-=be;}
;this._renderSeparator(bv,{left:bj+bt.left,top:bz+bt.top,width:bE,height:bs.y});}
;bh=T+bD+R+bA;if(bs.y){bh+=bs.y+bA;}
;bb-=bh;if(bC==1){bi+=bh;}
;break;case 3:case 4:T=bb-bD-R;if(T<Y.minHeight){T=Y.minHeight;}
else if(T>Y.maxHeight){T=Y.maxHeight;}
;bd=bx[i];bF=bq+bk.computeHorizontalAlignOffset(bp[bC],bd,bl,be,V);top=bi+bk.computeVerticalAlignOffset(bu.getAlignY()||t,T,bb,bD,R);if(bs.x){if(bC==3){bj=bq+bd+be+bB+V;}
else {bj=bq+bl-bd-be-bB-V-bs.x;}
;bz=top;bo=bb;if(by&&bz>0){bz-=bA+bD;bo+=(bA)*2;}
else {bz-=bD;}
;this._renderSeparator(bw,{left:bj+bt.left,top:bz+bt.top,width:bs.x,height:bo});}
;bh=bd+be+V+bB;if(bs.x){bh+=bs.x+bB;}
;bl-=bh;if(bC==3){bq+=bh;}
;break;default:bd=bl-be-V;T=bb-bD-R;if(bd<Y.minWidth){bd=Y.minWidth;}
else if(bd>Y.maxWidth){bd=Y.maxWidth;}
;if(T<Y.minHeight){T=Y.minHeight;}
else if(T>Y.maxHeight){T=Y.maxHeight;}
;bF=bq+bk.computeHorizontalAlignOffset(bu.getAlignX()||z,bd,bl,be,V);top=bi+bk.computeVerticalAlignOffset(bu.getAlignY()||t,T,bb,bD,R);};bu.renderLayout(bF+bt.left,top+bt.top,bd,T);}
;}
,_getSeparatorWidths:function(){var bH=this.getSeparatorX(),bG=this.getSeparatorY();if(bH||bG){var bK=qx.theme.manager.Decoration.getInstance();}
;if(bH){var bN=bK.resolve(bH);var bJ=bN.getInsets();var bM=bJ.left+bJ.right;}
;if(bG){var bO=bK.resolve(bG);var bI=bO.getInsets();var bL=bI.top+bI.bottom;}
;return {x:bM||0,y:bL||0};}
,_computeSizeHint:function(){if(this._invalidChildrenCache){this.__uv();}
;var bS=this.__fu;var cd=this.__us;var length=bS.length;var bW,ce;var bY,bX;var ca=0,cl=0;var bP=0,cg=0;var cb=0,ck=0;var bQ=0,cf=0;var ch=this._getSeparatorWidths();var cj=this.getSpacingX(),ci=this.getSpacingY();var bU=-cj,bT=-ci;if(ch.x){bU-=ch.x+cj;}
;if(ch.y){bT-=ch.y+ci;}
;for(var i=0;i<length;i++ ){ce=bS[i];bW=ce.getSizeHint();bY=ce.getMarginLeft()+ce.getMarginRight();bX=ce.getMarginTop()+ce.getMarginBottom();switch(cd[i]){case 1:case 2:cb=Math.max(cb,bW.width+ca+bY);ck=Math.max(ck,bW.minWidth+cl+bY);bQ+=bW.height+bX;cf+=bW.minHeight+bX;bT+=ci;if(ch.y){bT+=ch.y+ci;}
;break;case 3:case 4:bP=Math.max(bP,bW.height+bQ+bX);cg=Math.max(cg,bW.minHeight+cf+bX);ca+=bW.width+bY;cl+=bW.minWidth+bY;bU+=cj;if(ch.x){bU+=ch.x+cj;}
;break;default:ca+=bW.width+bY;cl+=bW.minWidth+bY;bQ+=bW.height+bX;cf+=bW.minHeight+bX;bU+=cj;if(ch.x){bU+=ch.x+cj;}
;bT+=ci;if(ch.y){bT+=ch.y+ci;}
;};}
;var bV=Math.max(cl,ck)+bU;var cm=Math.max(ca,cb)+bU;var cc=Math.max(cg,cf)+bT;var bR=Math.max(bP,bQ)+bT;return {minWidth:bV,width:cm,minHeight:cc,height:bR};}
},destruct:function(){this.__us=this.__fu=null;}
});}
)();
(function(){var a="mouse",b="scrollbar-y",c="qx.ui.core.scroll.MRoll",d="pointerdown",f="scrollbar-x",g="roll";qx.Mixin.define(c,{members:{__GS:null,_addRollHandling:function(){this.addListener(g,this._onRoll,this);this.addListener(d,this._onPointerDownForRoll,this);}
,_removeRollHandling:function(){this.removeListener(g,this._onRoll,this);this.removeListener(d,this._onPointerDownForRoll,this);}
,_onPointerDownForRoll:function(e){this.__GS=e.getPointerId();}
,_onRoll:function(e){if(e.getPointerType()==a){return;}
;if(this.__GS&&e.getMomentum()){qx.event.Registration.getManager(e.getOriginalTarget()).getHandler(qx.event.handler.Gesture).gestureCancel(this.__GS);e.stopMomentum();this.__GS=null;return;}
;this.__GS=null;var k=this._isChildControlVisible(f);var l=this._isChildControlVisible(b);var q=l?this.getChildControl(b,true):null;var p=k?this.getChildControl(f,true):null;var m=e.getDelta().y;var h=e.getDelta().x;var j=!l;var o=!k;if(q){if(m!==0){q.scrollBy(parseInt(m,10));}
;var n=q.getPosition();var i=q.getMaximum();if(m<0&&n<=0||m>0&&n>=i){j=true;}
;}
;if(p){if(h!==0){p.scrollBy(parseInt(h,10));}
;var n=p.getPosition();var i=p.getMaximum();if(h<0&&n<=0||h>0&&n>=i){o=true;}
;}
;if(o&&j){e.stopMomentum();}
;if((!j&&h===0)||(!o&&m===0)||((!o||!j)&&h!==0&&m!==0)){e.stop();}
;}
}});}
)();
(function(){var a="x",b="Float",c="qx.ui.core.MDragDropScrolling",d="",f="). Must be: 'left', 'right', 'top' or 'bottom'",g="bottom",h="interval",i="dragend",j="scrollbar-",k="drag",l="Invalid edge type given (",m="top",n="left",o="right",p="Integer",q="y";qx.Mixin.define(c,{construct:function(){var r=this;if(this instanceof qx.ui.core.DragDropScrolling){r=this._getWidget();}
;r.addListener(k,this.__GW,this);r.addListener(i,this.__GX,this);this.__GT=[n,o];this.__GU=[m,g];}
,properties:{dragScrollThresholdX:{check:p,init:30},dragScrollThresholdY:{check:p,init:30},dragScrollSlowDownFactor:{check:b,init:0.1}},members:{__GV:null,__GT:null,__GU:null,_findScrollableParent:function(s){var t=s;if(t===null){return null;}
;while(t.getLayoutParent()){t=t.getLayoutParent();if(this._isScrollable(t)){return t;}
;}
;return null;}
,_isScrollable:function(u){return qx.Class.hasMixin(u.constructor,qx.ui.core.scroll.MScrollBarFactory);}
,_getBounds:function(v){var w=v.getContentLocation();if(v.getScrollAreaContainer){w=v.getScrollAreaContainer().getContentLocation();}
;return w;}
,_getEdgeType:function(y,z,x){if((y.left*-1)<=z&&y.left<0){return n;}
else if((y.top*-1)<=x&&y.top<0){return m;}
else if(y.right<=z&&y.right>0){return o;}
else if(y.bottom<=x&&y.bottom>0){return g;}
else {return null;}
;}
,_getAxis:function(A){if(this.__GT.indexOf(A)!==-1){return a;}
else if(this.__GU.indexOf(A)!==-1){return q;}
else {throw new Error(l+A+f);}
;}
,_getThresholdByEdgeType:function(B){if(this.__GT.indexOf(B)!==-1){return this.getDragScrollThresholdX();}
else if(this.__GU.indexOf(B)!==-1){return this.getDragScrollThresholdY();}
;}
,_isScrollbarVisible:function(C,D){if(C&&C._isChildControlVisible){return C._isChildControlVisible(j+D);}
else {return false;}
;}
,_isScrollbarExceedingMaxPos:function(F,H,E){var G=0;if(!F){return true;}
;G=F.getPosition()+E;return (G>F.getMaximum()||G<0);}
,_calculateThresholdExceedance:function(J,I){var K=I-Math.abs(J);return J<0?(K*-1):K;}
,_calculateScrollAmount:function(L,M){return Math.floor(((L/100)*M)*this.getDragScrollSlowDownFactor());}
,_scrollBy:function(N,T,Q){var S=N.getChildControl(j+T,true);if(!S){return;}
;var P=S.getBounds(),O=T===a?P.width:P.height,R=this._calculateScrollAmount(O,Q);if(this._isScrollbarExceedingMaxPos(S,T,R)){this.__GV.stop();}
;S.scrollBy(R);}
,__GW:function(e){if(this.__GV){this.__GV.stop();}
;var W;if(e.getOriginalTarget() instanceof qx.ui.core.Widget){W=e.getOriginalTarget();}
else {W=qx.ui.core.Widget.getWidgetByElement(e.getOriginalTarget());}
;if(!W){return;}
;var U;if(this._isScrollable(W)){U=W;}
else {U=this._findScrollableParent(W);}
;while(U){var Y=this._getBounds(U),V=e.getDocumentLeft(),ba=e.getDocumentTop(),bc={"left":Y.left-V,"right":Y.right-V,"top":Y.top-ba,"bottom":Y.bottom-ba},X=null,bd=d,bb=0;X=this._getEdgeType(bc,this.getDragScrollThresholdX(),this.getDragScrollThresholdY());if(!X){U=this._findScrollableParent(U);continue;}
;bd=this._getAxis(X);if(this._isScrollbarVisible(U,bd)){bb=this._calculateThresholdExceedance(bc[X],this._getThresholdByEdgeType(X));if(this.__GV){this.__GV.dispose();}
;this.__GV=new qx.event.Timer(50);this.__GV.addListener(h,function(be,bg,bf){this._scrollBy(be,bg,bf);}
.bind(this,U,bd,bb));this.__GV.start();e.stopPropagation();return;}
else {U=this._findScrollableParent(U);}
;}
;}
,__GX:function(e){if(this.__GV){this.__GV.stop();}
;}
},destruct:function(){if(this.__GV){this.__GV.dispose();}
;}
});}
)();
(function(){var a="qx.ui.core.DragDropScrolling";qx.Class.define(a,{extend:qx.core.Object,include:[qx.ui.core.MDragDropScrolling],construct:function(b){qx.core.Object.call(this);this._widget=b;}
,members:{_widget:null,_getWidget:function(){return this._widget||qx.core.Init.getApplication().getRoot();}
}});}
)();
(function(){var a="qx.nativeScrollBars",b="qx.ui.core.scroll.MScrollBarFactory";qx.core.Environment.add(a,false);qx.Mixin.define(b,{members:{_createScrollBar:function(c){if(qx.core.Environment.get(a)){return new qx.ui.core.scroll.NativeScrollBar(c);}
else {return new qx.ui.core.scroll.ScrollBar(c);}
;}
}});}
)();
(function(){var a='qx.event.type.Event',b="qx.ui.core.scroll.IScrollBar",c="qx.event.type.Data";qx.Interface.define(b,{events:{"scroll":c,"scrollAnimationEnd":a},properties:{orientation:{},maximum:{},position:{},knobFactor:{}},members:{scrollTo:function(e,d){this.assertNumber(e);}
,scrollBy:function(g,f){this.assertNumber(g);}
,scrollBySteps:function(i,h){this.assertNumber(i);}
}});}
)();
(function(){var a="qx.ui.core.scroll.NativeScrollBar",b="px",c="PositiveNumber",d="frame",f="end",g="box-sizing",h="Integer",i="track",j="browser.name",k="hidden",l="content-box",m="pointerup",n="vertical",o="__GY",p="_applyOrientation",q="scrollAnimationEnd",r="appear",s="pointerdown",t="PositiveInteger",u='qx.event.type.Event',v="mshtml",w="engine.name",x="horizontal",y="Number",z="edge",A="_applyPosition",B="scrollbar",C="_applyMaximum",D="pointermove",E="native",F="scroll";qx.Class.define(a,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(G){qx.ui.core.Widget.call(this);this.addState(E);this.getContentElement().addListener(F,this._onScroll,this);this.addListener(s,this._stopPropagation,this);this.addListener(m,this._stopPropagation,this);this.addListener(D,this._stopPropagation,this);this.addListener(r,this._onAppear,this);this.getContentElement().add(this._getScrollPaneElement());this.getContentElement().setStyle(g,l);if(G!=null){this.setOrientation(G);}
else {this.initOrientation();}
;this.addListener(i,function(e){e.stopPropagation();}
,this);}
,events:{scrollAnimationEnd:u},properties:{appearance:{refine:true,init:B},orientation:{check:[x,n],init:x,apply:p},maximum:{check:t,apply:C,init:100},position:{check:y,init:0,apply:A,event:F},singleStep:{check:h,init:20},knobFactor:{check:c,nullable:true}},members:{__gv:null,__GY:null,__AP:null,__Ha:null,_getScrollPaneElement:function(){if(!this.__GY){this.__GY=new qx.html.Element();}
;return this.__GY;}
,renderLayout:function(I,top,H,K){var J=qx.ui.core.Widget.prototype.renderLayout.call(this,I,top,H,K);this._updateScrollBar();return J;}
,_getContentHint:function(){var L=qx.bom.element.Scroll.getScrollbarWidth();return {width:this.__gv?100:L,maxWidth:this.__gv?null:L,minWidth:this.__gv?null:L,height:this.__gv?L:100,maxHeight:this.__gv?L:null,minHeight:this.__gv?L:null};}
,_applyEnabled:function(N,M){qx.ui.core.Widget.prototype._applyEnabled.call(this,N,M);this._updateScrollBar();}
,_applyMaximum:function(O){this._updateScrollBar();}
,_applyPosition:function(P){var content=this.getContentElement();if(this.__gv){content.scrollToX(P);}
else {content.scrollToY(P);}
;}
,_applyOrientation:function(S,Q){var R=this.__gv=S===x;this.set({allowGrowX:R,allowShrinkX:R,allowGrowY:!R,allowShrinkY:!R});if(R){this.replaceState(n,x);}
else {this.replaceState(x,n);}
;this.getContentElement().setStyles({overflowX:R?F:k,overflowY:R?k:F});qx.ui.core.queue.Layout.add(this);}
,_updateScrollBar:function(){var U=this.__gv;var V=this.getBounds();if(!V){return;}
;if(this.isEnabled()){var W=U?V.width:V.height;var T=this.getMaximum()+W;}
else {T=0;}
;if(qx.core.Environment.get(w)==v||qx.core.Environment.get(j)==z){var V=this.getBounds();this.getContentElement().setStyles({left:(U?V.left:(V.left-1))+b,top:(U?(V.top-1):V.top)+b,width:(U?V.width:V.width+1)+b,height:(U?V.height+1:V.height)+b});}
;this._getScrollPaneElement().setStyles({left:0,top:0,width:(U?T:1)+b,height:(U?1:T)+b});this.updatePosition(this.getPosition());}
,scrollTo:function(Y,X){this.stopScrollAnimation();if(X){var ba=this.getPosition();this.__Ha=new qx.bom.AnimationFrame();this.__Ha.on(d,function(bc){var bb=parseInt(bc/X*(Y-ba)+ba);this.updatePosition(bb);}
,this);this.__Ha.on(f,function(){this.setPosition(Math.max(0,Math.min(this.getMaximum(),Y)));this.__Ha=null;this.fireEvent(q);}
,this);this.__Ha.startSequence(X);}
else {this.updatePosition(Y);}
;}
,updatePosition:function(bd){this.setPosition(Math.max(0,Math.min(this.getMaximum(),bd)));}
,scrollBy:function(bf,be){this.scrollTo(this.getPosition()+bf,be);}
,scrollBySteps:function(bh,bg){var bi=this.getSingleStep();this.scrollBy(bh*bi,bg);}
,stopScrollAnimation:function(){if(this.__Ha){this.__Ha.cancelSequence();this.__Ha=null;}
;}
,_onScroll:function(e){var bj=this.getContentElement();var bk=this.__gv?bj.getScrollX():bj.getScrollY();this.setPosition(bk);}
,_onAppear:function(e){this._applyPosition(this.getPosition());}
,_stopPropagation:function(e){e.stopPropagation();}
},destruct:function(){this._disposeObjects(o);}
});}
)();
(function(){var a="slider",b="slideAnimationEnd",c="PositiveNumber",d="changeValue",f="Integer",g="execute",h="track",i="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getMaximum()",j="_applyKnobFactor",k="visible",l="qx.event.type.Event",m="knob",n="button-begin",o="hidden",p="qx.ui.core.scroll.ScrollBar",q="resize",r="vertical",s="_applyOrientation",t="scrollAnimationEnd",u="_applyPageStep",v="right",w="PositiveInteger",x="horizontal",y="up",z="_applyPosition",A="scrollbar",B="_applyMaximum",C="left",D="button-end",E="down",F="scroll";qx.Class.define(p,{extend:qx.ui.core.Widget,implement:qx.ui.core.scroll.IScrollBar,construct:function(G){qx.ui.core.Widget.call(this);this._createChildControl(n);this._createChildControl(a).addListener(q,this._onResizeSlider,this);this._createChildControl(D);if(G!=null){this.setOrientation(G);}
else {this.initOrientation();}
;this.addListener(h,function(e){e.stopPropagation();}
,this);}
,events:{"scrollAnimationEnd":l},properties:{appearance:{refine:true,init:A},orientation:{check:[x,r],init:x,apply:s},maximum:{check:w,apply:B,init:100},position:{check:i,init:0,apply:z,event:F},singleStep:{check:f,init:20},pageStep:{check:f,init:10,apply:u},knobFactor:{check:c,apply:j,nullable:true}},members:{__Hb:2,__Hc:0,_computeSizeHint:function(){var H=qx.ui.core.Widget.prototype._computeSizeHint.call(this);if(this.getOrientation()===x){this.__Hc=H.minWidth;H.minWidth=0;}
else {this.__Hc=H.minHeight;H.minHeight=0;}
;return H;}
,renderLayout:function(M,top,J,I){var L=qx.ui.core.Widget.prototype.renderLayout.call(this,M,top,J,I);var K=this.getOrientation()===x;if(this.__Hc>=(K?J:I)){this.getChildControl(n).setVisibility(o);this.getChildControl(D).setVisibility(o);}
else {this.getChildControl(n).setVisibility(k);this.getChildControl(D).setVisibility(k);}
;return L;}
,_createChildControlImpl:function(P,O){var N;switch(P){case a:N=new qx.ui.core.scroll.ScrollSlider();N.setPageStep(100);N.setFocusable(false);N.addListener(d,this._onChangeSliderValue,this);N.addListener(b,this._onSlideAnimationEnd,this);this._add(N,{flex:1});break;case n:N=new qx.ui.form.RepeatButton();N.setFocusable(false);N.addListener(g,this._onExecuteBegin,this);this._add(N);break;case D:N=new qx.ui.form.RepeatButton();N.setFocusable(false);N.addListener(g,this._onExecuteEnd,this);this._add(N);break;};return N||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,P);}
,_applyMaximum:function(Q){this.getChildControl(a).setMaximum(Q);}
,_applyPosition:function(R){this.getChildControl(a).setValue(R);}
,_applyKnobFactor:function(S){this.getChildControl(a).setKnobFactor(S);}
,_applyPageStep:function(T){this.getChildControl(a).setPageStep(T);}
,_applyOrientation:function(W,U){var V=this._getLayout();if(V){V.dispose();}
;if(W===x){this._setLayout(new qx.ui.layout.HBox());this.setAllowStretchX(true);this.setAllowStretchY(false);this.replaceState(r,x);this.getChildControl(n).replaceState(y,C);this.getChildControl(D).replaceState(E,v);}
else {this._setLayout(new qx.ui.layout.VBox());this.setAllowStretchX(false);this.setAllowStretchY(true);this.replaceState(x,r);this.getChildControl(n).replaceState(C,y);this.getChildControl(D).replaceState(v,E);}
;this.getChildControl(a).setOrientation(W);}
,scrollTo:function(Y,X){this.getChildControl(a).slideTo(Y,X);}
,scrollBy:function(bb,ba){this.getChildControl(a).slideBy(bb,ba);}
,scrollBySteps:function(bd,bc){var be=this.getSingleStep();this.getChildControl(a).slideBy(bd*be,bc);}
,updatePosition:function(bf){this.getChildControl(a).updatePosition(bf);}
,stopScrollAnimation:function(){this.getChildControl(a).stopSlideAnimation();}
,_onExecuteBegin:function(e){this.scrollBy(-this.getSingleStep(),50);}
,_onExecuteEnd:function(e){this.scrollBy(this.getSingleStep(),50);}
,_onSlideAnimationEnd:function(){this.fireEvent(t);}
,_onChangeSliderValue:function(e){this.setPosition(e.getData());}
,_onResizeSlider:function(e){var bg=this.getChildControl(a).getChildControl(m);var bj=bg.getSizeHint();var bh=false;var bi=this.getChildControl(a).getInnerSize();if(this.getOrientation()==r){if(bi.height<bj.minHeight+this.__Hb){bh=true;}
;}
else {if(bi.width<bj.minWidth+this.__Hb){bh=true;}
;}
;if(bh){bg.exclude();}
else {bg.show();}
;}
}});}
)();
(function(){var a="",b="qx.ui.form.MForm",c="Boolean",d="_applyValid",f="changeLocale",g="changeRequired",h="changeValid",i="qx.dynlocale",j="changeInvalidMessage",k="String",l="invalid";qx.Mixin.define(b,{construct:function(){if(qx.core.Environment.get(i)){qx.locale.Manager.getInstance().addListener(f,this.__Dn,this);}
;}
,properties:{valid:{check:c,init:true,apply:d,event:h},required:{check:c,init:false,event:g},invalidMessage:{check:k,init:a,event:j},requiredInvalidMessage:{check:k,nullable:true,event:j}},members:{_applyValid:function(n,m){n?this.removeState(l):this.addState(l);}
,__Dn:qx.core.Environment.select(i,{"true":function(e){var o=this.getInvalidMessage();if(o&&o.translate){this.setInvalidMessage(o.translate());}
;var p=this.getRequiredInvalidMessage();if(p&&p.translate){this.setRequiredInvalidMessage(p.translate());}
;}
,"false":null})},destruct:function(){if(qx.core.Environment.get(i)){qx.locale.Manager.getInstance().removeListener(f,this.__Dn,this);}
;}
});}
)();
(function(){var a="qx.ui.form.IRange";qx.Interface.define(a,{members:{setMinimum:function(b){return arguments.length==1;}
,getMinimum:function(){}
,setMaximum:function(c){return arguments.length==1;}
,getMaximum:function(){}
,setSingleStep:function(d){return arguments.length==1;}
,getSingleStep:function(){}
,setPageStep:function(e){return arguments.length==1;}
,getPageStep:function(){}
}});}
)();
(function(){var a="qx.ui.form.INumberForm",b="qx.event.type.Data";qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;}
,resetValue:function(){}
,getValue:function(){}
}});}
)();
(function(){var a="slider",b="hovered",c="pressed",d="px",f="pointerover",g="PageUp",h="changeValue",i="frame",j="end",k='qx.event.type.Data',l="Left",m="Down",n="Integer",o="roll",p="qx.ui.form.Slider",q="PageDown",r="interval",s="_applyValue",t="Up",u="_applyKnobFactor",v="End",w="pointermove",x="height",y="y",z="dbltap",A="resize",B="pointerup",C="vertical",D="Right",E="width",F="_applyOrientation",G="left",H="Home",I="floor",J="_applyMinimum",K="pointerdown",L="top",M="changeMaximum",N="horizontal",O="slideAnimationEnd",P="knob",Q="ceil",R='qx.event.type.Event',S="x",T="keypress",U="losecapture",V="contextmenu",W="wheel",X="_applyMaximum",Y="Number",bf="tap",bg="typeof value==='number'&&value>=this.getMinimum()&&value<=this.getMaximum()",bh="changeMinimum",be="pointerout";qx.Class.define(p,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IForm,qx.ui.form.INumberForm,qx.ui.form.IRange],include:[qx.ui.form.MForm],construct:function(bi){qx.ui.core.Widget.call(this);this._setLayout(new qx.ui.layout.Canvas());this.addListener(T,this._onKeyPress);this.addListener(o,this._onRoll);this.addListener(K,this._onPointerDown);this.addListener(B,this._onPointerUp);this.addListener(U,this._onPointerUp);this.addListener(A,this._onUpdate);this.addListener(V,this._onStopEvent);this.addListener(bf,this._onStopEvent);this.addListener(z,this._onStopEvent);if(bi!=null){this.setOrientation(bi);}
else {this.initOrientation();}
;}
,events:{changeValue:k,slideAnimationEnd:R},properties:{appearance:{refine:true,init:a},focusable:{refine:true,init:true},orientation:{check:[N,C],init:N,apply:F},value:{check:bg,init:0,apply:s,nullable:true},minimum:{check:n,init:0,apply:J,event:bh},maximum:{check:n,init:100,apply:X,event:M},singleStep:{check:n,init:1},pageStep:{check:n,init:10},knobFactor:{check:Y,apply:u,nullable:true}},members:{__Hd:null,__He:null,__Hf:null,__re:null,__Hg:null,__Hh:null,__Hi:null,__Hj:null,__rq:null,__Hk:null,__Hl:null,__Hm:null,__Ha:null,_forwardStates:{invalid:true},renderLayout:function(bk,top,bj,bl){qx.ui.core.Widget.prototype.renderLayout.call(this,bk,top,bj,bl);this._updateKnobPosition();}
,_createChildControlImpl:function(bo,bn){var bm;switch(bo){case P:bm=new qx.ui.core.Widget();bm.addListener(A,this._onUpdate,this);bm.addListener(f,this._onPointerOver);bm.addListener(be,this._onPointerOut);this._add(bm);break;};return bm||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,bo);}
,_onPointerOver:function(e){this.addState(b);}
,_onPointerOut:function(e){this.removeState(b);}
,_onRoll:function(e){if(e.getPointerType()!=W){return;}
;var bq=this.getOrientation()===N?S:y;var br=e.getDelta()[bq];var bp=br>0?1:br<0?-1:0;this.slideBy(bp*this.getSingleStep());e.stop();}
,_onKeyPress:function(e){var bt=this.getOrientation()===N;var bs=bt?l:t;var forward=bt?D:m;switch(e.getKeyIdentifier()){case forward:this.slideForward();break;case bs:this.slideBack();break;case q:this.slidePageForward(100);break;case g:this.slidePageBack(100);break;case H:this.slideToBegin(200);break;case v:this.slideToEnd(200);break;default:return;};e.stop();}
,_onPointerDown:function(e){if(this.__re){return;}
;var bw=this.__gv;var bu=this.getChildControl(P);var bv=bw?G:L;var bA=bw?e.getDocumentLeft():e.getDocumentTop();var bC=this.getDecorator();bC=qx.theme.manager.Decoration.getInstance().resolve(bC);if(bw){var bz=bC?bC.getInsets().left:0;var by=(this.getPaddingLeft()||0)+bz;}
else {var bz=bC?bC.getInsets().top:0;var by=(this.getPaddingTop()||0)+bz;}
;var bB=this.__Hd=qx.bom.element.Location.get(this.getContentElement().getDomElement())[bv];bB+=by;var bx=this.__He=qx.bom.element.Location.get(bu.getContentElement().getDomElement())[bv];if(e.getTarget()===bu){this.__re=true;if(!this.__Hk){this.__Hk=new qx.event.Timer(100);this.__Hk.addListener(r,this._fireValue,this);}
;this.__Hk.start();this.__Hg=bA+bB-bx;bu.addState(c);}
else {this.__Hh=true;this.__Hi=bA<=bx?-1:1;this.__Ho(e);this._onInterval();if(!this.__rq){this.__rq=new qx.event.Timer(100);this.__rq.addListener(r,this._onInterval,this);}
;this.__rq.start();}
;this.addListener(w,this._onPointerMove);this.capture();e.stopPropagation();}
,_onPointerUp:function(e){if(this.__re){this.releaseCapture();delete this.__re;this.__Hk.stop();this._fireValue();delete this.__Hg;this.getChildControl(P).removeState(c);if(e.getType()===B){var bE;var bF;var bD;if(this.__gv){bE=e.getDocumentLeft()-(this._valueToPosition(this.getValue())+this.__Hd);bD=qx.bom.element.Location.get(this.getContentElement().getDomElement())[L];bF=e.getDocumentTop()-(bD+this.getChildControl(P).getBounds().top);}
else {bE=e.getDocumentTop()-(this._valueToPosition(this.getValue())+this.__Hd);bD=qx.bom.element.Location.get(this.getContentElement().getDomElement())[G];bF=e.getDocumentLeft()-(bD+this.getChildControl(P).getBounds().left);}
;if(bF<0||bF>this.__Hf||bE<0||bE>this.__Hf){this.getChildControl(P).removeState(b);}
;}
;}
else if(this.__Hh){this.__rq.stop();this.releaseCapture();delete this.__Hh;delete this.__Hi;delete this.__Hj;}
;this.removeListener(w,this._onPointerMove);if(e.getType()===B){e.stopPropagation();}
;}
,_onPointerMove:function(e){if(this.__re){var bH=this.__gv?e.getDocumentLeft():e.getDocumentTop();var bG=bH-this.__Hg;this.slideTo(this._positionToValue(bG));}
else if(this.__Hh){this.__Ho(e);}
;e.stopPropagation();}
,_onInterval:function(e){var bI=this.getValue()+(this.__Hi*this.getPageStep());if(bI<this.getMinimum()){bI=this.getMinimum();}
else if(bI>this.getMaximum()){bI=this.getMaximum();}
;var bJ=this.__Hi==-1;if((bJ&&bI<=this.__Hj)||(!bJ&&bI>=this.__Hj)){bI=this.__Hj;}
;this.slideTo(bI);}
,_onUpdate:function(e){var bL=this.getInnerSize();var bM=this.getChildControl(P).getBounds();var bK=this.__gv?E:x;this._updateKnobSize();this.__Hn=bL[bK]-bM[bK];this.__Hf=bM[bK];this._updateKnobPosition();}
,__gv:false,__Hn:0,__Ho:function(e){var bN=this.__gv;var bU=bN?e.getDocumentLeft():e.getDocumentTop();var bX=this.__Hd;var bO=this.__He;var bY=this.__Hf;var bV=bU-bX;if(bU>=bO){bV-=bY;}
;var bR=this._positionToValue(bV);var bP=this.getMinimum();var bQ=this.getMaximum();if(bR<bP){bR=bP;}
else if(bR>bQ){bR=bQ;}
else {var bW=this.getValue();var bT=this.getPageStep();var bS=this.__Hi<0?I:Q;bR=bW+(Math[bS]((bR-bW)/bT)*bT);}
;if(this.__Hj==null||(this.__Hi==-1&&bR<=this.__Hj)||(this.__Hi==1&&bR>=this.__Hj)){this.__Hj=bR;}
;}
,_positionToValue:function(cb){var ca=this.__Hn;if(ca==null||ca==0){return 0;}
;var cd=cb/ca;if(cd<0){cd=0;}
else if(cd>1){cd=1;}
;var cc=this.getMaximum()-this.getMinimum();return this.getMinimum()+Math.round(cc*cd);}
,_valueToPosition:function(ch){var ce=this.__Hn;if(ce==null){return 0;}
;var cf=this.getMaximum()-this.getMinimum();if(cf==0){return 0;}
;var ch=ch-this.getMinimum();var cg=ch/cf;if(cg<0){cg=0;}
else if(cg>1){cg=1;}
;return Math.round(ce*cg);}
,_updateKnobPosition:function(){this._setKnobPosition(this._valueToPosition(this.getValue()));}
,_setKnobPosition:function(ck){var ci=this.getChildControl(P);var cj=this.getDecorator();cj=qx.theme.manager.Decoration.getInstance().resolve(cj);var content=ci.getContentElement();if(this.__gv){if(cj&&cj.getPadding()){ck+=cj.getPadding().left;}
;ck+=this.getPaddingLeft()||0;content.setStyle(G,ck+d,true);}
else {if(cj&&cj.getPadding()){ck+=cj.getPadding().top;}
;ck+=this.getPaddingTop()||0;content.setStyle(L,ck+d,true);}
;}
,_updateKnobSize:function(){var cm=this.getKnobFactor();if(cm==null){return;}
;var cl=this.getInnerSize();if(cl==null){return;}
;if(this.__gv){this.getChildControl(P).setWidth(Math.round(cm*cl.width));}
else {this.getChildControl(P).setHeight(Math.round(cm*cl.height));}
;}
,slideToBegin:function(cn){this.slideTo(this.getMinimum(),cn);}
,slideToEnd:function(co){this.slideTo(this.getMaximum(),co);}
,slideForward:function(){this.slideBy(this.getSingleStep());}
,slideBack:function(){this.slideBy(-this.getSingleStep());}
,slidePageForward:function(cp){this.slideBy(this.getPageStep(),cp);}
,slidePageBack:function(cq){this.slideBy(-this.getPageStep(),cq);}
,slideBy:function(cs,cr){this.slideTo(this.getValue()+cs,cr);}
,slideTo:function(cu,ct){this.stopSlideAnimation();if(ct){this.__Hq(cu,ct);}
else {this.updatePosition(cu);}
;}
,updatePosition:function(cv){this.setValue(this.__Hp(cv));}
,stopSlideAnimation:function(){if(this.__Ha){this.__Ha.cancelSequence();this.__Ha=null;}
;}
,__Hp:function(cw){if(cw<this.getMinimum()){cw=this.getMinimum();}
else if(cw>this.getMaximum()){cw=this.getMaximum();}
else {cw=this.getMinimum()+Math.round((cw-this.getMinimum())/this.getSingleStep())*this.getSingleStep();}
;return cw;}
,__Hq:function(cy,cx){cy=this.__Hp(cy);var cz=this.getValue();this.__Ha=new qx.bom.AnimationFrame();this.__Ha.on(i,function(cA){this.setValue(parseInt(cA/cx*(cy-cz)+cz));}
,this);this.__Ha.on(j,function(){this.setValue(cy);this.__Ha=null;this.fireEvent(O);}
,this);this.__Ha.startSequence(cx);}
,_applyOrientation:function(cD,cC){var cB=this.getChildControl(P);this.__gv=cD===N;if(this.__gv){this.removeState(C);cB.removeState(C);this.addState(N);cB.addState(N);cB.setLayoutProperties({top:0,right:null,bottom:0});}
else {this.removeState(N);cB.removeState(N);this.addState(C);cB.addState(C);cB.setLayoutProperties({right:0,bottom:null,left:0});}
;this._updateKnobPosition();}
,_applyKnobFactor:function(cF,cE){if(cF!=null){this._updateKnobSize();}
else {if(this.__gv){this.getChildControl(P).resetWidth();}
else {this.getChildControl(P).resetHeight();}
;}
;}
,_applyValue:function(cH,cG){if(cH!=null){this._updateKnobPosition();if(this.__re){this.__Hm=[cH,cG];}
else {this.fireEvent(h,qx.event.type.Data,[cH,cG]);}
;}
else {this.resetValue();}
;}
,_fireValue:function(){if(!this.__Hm){return;}
;var cI=this.__Hm;this.__Hm=null;this.fireEvent(h,qx.event.type.Data,cI);}
,_applyMinimum:function(cK,cJ){if(this.getValue()<cK){this.setValue(cK);}
;this._updateKnobPosition();}
,_applyMaximum:function(cM,cL){if(this.getValue()>cM){this.setValue(cM);}
;this._updateKnobPosition();}
}});}
)();
(function(){var a="dblclick",b="qx.ui.core.scroll.ScrollSlider",c="horizontal",d="keypress",f="roll",g="knob";qx.Class.define(b,{extend:qx.ui.form.Slider,construct:function(h){qx.ui.form.Slider.call(this,h);this.removeListener(d,this._onKeyPress);this.removeListener(f,this._onRoll);}
,members:{_createChildControlImpl:function(k,j){var i;switch(k){case g:i=qx.ui.form.Slider.prototype._createChildControlImpl.call(this,k);i.addListener(a,function(e){e.stopPropagation();}
);};return i||qx.ui.form.Slider.prototype._createChildControlImpl.call(this,k);}
,getSizeHint:function(l){var m=qx.ui.form.Slider.prototype.getSizeHint.call(this);if(this.getOrientation()===c){m.width=0;}
else {m.height=0;}
;return m;}
}});}
)();
(function(){var a="toolTipText",b="icon",c="label",d="qx.ui.core.MExecutable",f="enabled",g="value",h="qx.event.type.Event",j="execute",k="_applyCommand",l="qx.ui.command.Command",m="menu",n="changeCommand";qx.Mixin.define(d,{events:{"execute":h},properties:{command:{check:l,apply:k,event:n,nullable:true}},members:{__CN:null,__CO:false,__CP:null,_bindableProperties:[f,c,b,a,g,m],execute:function(){var o=this.getCommand();if(o){if(this.__CO){this.__CO=false;}
else {this.__CO=true;o.execute(this);}
;}
;this.fireEvent(j);}
,__CQ:function(e){if(this.__CO){this.__CO=false;return;}
;if(this.isEnabled()){this.__CO=true;this.execute();}
;}
,_applyCommand:function(r,p){if(p!=null){p.removeListenerById(this.__CP);}
;if(r!=null){this.__CP=r.addListener(j,this.__CQ,this);}
;var q=this.__CN;if(q==null){this.__CN=q={};}
;var u;for(var i=0;i<this._bindableProperties.length;i++ ){var t=this._bindableProperties[i];if(p!=null&&!p.isDisposed()&&q[t]!=null){p.removeBinding(q[t]);q[t]=null;}
;if(r!=null&&qx.Class.hasProperty(this.constructor,t)){var s=r.get(t);if(s==null){u=this.get(t);if(u==null){this.syncAppearance();u=qx.util.PropertyUtil.getThemeValue(this,t);}
;}
else {u=null;}
;q[t]=r.bind(t,this,t);if(u){this.set(t,u);}
;}
;}
;}
},destruct:function(){this._applyCommand(null,this.getCommand());this.__CN=null;}
});}
)();
(function(){var a="qx.ui.form.IExecutable",b="qx.event.type.Data";qx.Interface.define(a,{events:{"execute":b},members:{setCommand:function(c){return arguments.length==1;}
,getCommand:function(){}
,execute:function(){}
}});}
)();
(function(){var a="dblclick",b="qx.ui.form.Button",c="pointerup",d="Enter",f="pressed",g="pointerover",h="hovered",i="pointerdown",j="Space",k="keydown",l="abandoned",m="tap",n="button",o="keyup",p="pointerout";qx.Class.define(b,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IExecutable],construct:function(q,s,r){qx.ui.basic.Atom.call(this,q,s);if(r!=null){this.setCommand(r);}
;this.addListener(g,this._onPointerOver);this.addListener(p,this._onPointerOut);this.addListener(i,this._onPointerDown);this.addListener(c,this._onPointerUp);this.addListener(m,this._onTap);this.addListener(k,this._onKeyDown);this.addListener(o,this._onKeyUp);this.addListener(a,function(e){e.stopPropagation();}
);}
,properties:{appearance:{refine:true,init:n},focusable:{refine:true,init:true}},members:{_forwardStates:{focused:true,hovered:true,pressed:true,disabled:true},press:function(){if(this.hasState(l)){return;}
;this.addState(f);}
,release:function(){if(this.hasState(f)){this.removeState(f);}
;}
,reset:function(){this.removeState(f);this.removeState(l);this.removeState(h);}
,_onPointerOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;}
;if(this.hasState(l)){this.removeState(l);this.addState(f);}
;this.addState(h);}
,_onPointerOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;}
;this.removeState(h);if(this.hasState(f)){this.removeState(f);this.addState(l);}
;}
,_onPointerDown:function(e){if(!e.isLeftPressed()){return;}
;e.stopPropagation();this.capture();this.removeState(l);this.addState(f);}
,_onPointerUp:function(e){this.releaseCapture();var t=this.hasState(f);var u=this.hasState(l);if(t){this.removeState(f);}
;if(u){this.removeState(l);}
;e.stopPropagation();}
,_onTap:function(e){this.execute();e.stopPropagation();}
,_onKeyDown:function(e){switch(e.getKeyIdentifier()){case d:case j:this.removeState(l);this.addState(f);e.stopPropagation();};}
,_onKeyUp:function(e){switch(e.getKeyIdentifier()){case d:case j:if(this.hasState(f)){this.removeState(l);this.removeState(f);this.execute();e.stopPropagation();}
;};}
}});}
)();
(function(){var a="press",b="hovered",c="qx.ui.form.RepeatButton",d="release",f="Enter",g="pressed",h="interval",i="qx.event.type.Event",j="Space",k="abandoned",l="Integer",m="execute",n="__rq";qx.Class.define(c,{extend:qx.ui.form.Button,construct:function(o,p){qx.ui.form.Button.call(this,o,p);this.__rq=new qx.event.AcceleratingTimer();this.__rq.addListener(h,this._onInterval,this);}
,events:{"execute":i,"press":i,"release":i},properties:{interval:{check:l,init:100},firstInterval:{check:l,init:500},minTimer:{check:l,init:20},timerDecrease:{check:l,init:2}},members:{__Hr:null,__rq:null,press:function(){if(this.isEnabled()){if(!this.hasState(g)){this.__Hs();}
;this.removeState(k);this.addState(g);}
;}
,release:function(q){if(!this.isEnabled()){return;}
;if(this.hasState(g)){if(!this.__Hr){this.execute();}
;}
;this.removeState(g);this.removeState(k);this.__Ht();}
,_applyEnabled:function(s,r){qx.ui.form.Button.prototype._applyEnabled.call(this,s,r);if(!s){if(this.isCapturing()){this.releaseCapture();}
;this.removeState(g);this.removeState(k);this.__Ht();}
;}
,_onPointerOver:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;}
;if(this.hasState(k)){this.removeState(k);this.addState(g);this.__rq.start();}
;this.addState(b);}
,_onPointerOut:function(e){if(!this.isEnabled()||e.getTarget()!==this){return;}
;this.removeState(b);if(this.hasState(g)){this.removeState(g);this.addState(k);this.__rq.stop();}
;}
,_onPointerDown:function(e){if(!e.isLeftPressed()){return;}
;this.capture();this.__Hs();e.stopPropagation();}
,_onPointerUp:function(e){this.releaseCapture();if(!this.hasState(k)){this.addState(b);if(this.hasState(g)&&!this.__Hr){this.execute();}
;}
;this.__Ht();e.stopPropagation();}
,_onTap:function(e){}
,_onKeyUp:function(e){switch(e.getKeyIdentifier()){case f:case j:if(this.hasState(g)){if(!this.__Hr){this.execute();}
;this.removeState(g);this.removeState(k);e.stopPropagation();this.__Ht();}
;};}
,_onKeyDown:function(e){switch(e.getKeyIdentifier()){case f:case j:this.removeState(k);this.addState(g);e.stopPropagation();this.__Hs();};}
,_onInterval:function(e){this.__Hr=true;this.fireEvent(m);}
,__Hs:function(){this.fireEvent(a);this.__Hr=false;this.__rq.set({interval:this.getInterval(),firstInterval:this.getFirstInterval(),minimum:this.getMinTimer(),decrease:this.getTimerDecrease()}).start();this.removeState(k);this.addState(g);}
,__Ht:function(){this.fireEvent(d);this.__rq.stop();this.removeState(k);this.removeState(g);}
},destruct:function(){this._disposeObjects(n);}
});}
)();
(function(){var a="Integer",b="interval",c="qx.event.type.Event",d="__rq",e="qx.event.AcceleratingTimer";qx.Class.define(e,{extend:qx.core.Object,construct:function(){qx.core.Object.call(this);this.__rq=new qx.event.Timer(this.getInterval());this.__rq.addListener(b,this._onInterval,this);}
,events:{"interval":c},properties:{interval:{check:a,init:100},firstInterval:{check:a,init:500},minimum:{check:a,init:20},decrease:{check:a,init:2}},members:{__rq:null,__Hu:null,start:function(){this.__rq.setInterval(this.getFirstInterval());this.__rq.start();}
,stop:function(){this.__rq.stop();this.__Hu=null;}
,_onInterval:function(){this.__rq.stop();if(this.__Hu==null){this.__Hu=this.getInterval();}
;this.__Hu=Math.max(this.getMinimum(),this.__Hu-this.getDecrease());this.__rq.setInterval(this.__Hu);this.__rq.start();this.fireEvent(b);}
},destruct:function(){this._disposeObjects(d);}
});}
)();
(function(){var a="Decorator",b="_applyLayoutChange",c="center",d="_applyReversed",e="qx.debug",f="bottom",g="' is not supported by the VBox layout!",h="qx.ui.layout.VBox",j="flex",k="top",m="left",n="height",o="middle",p="Integer",q="The property '",r="right",s="Boolean";qx.Class.define(h,{extend:qx.ui.layout.Abstract,construct:function(t,u,v){qx.ui.layout.Abstract.call(this);if(t){this.setSpacing(t);}
;if(u){this.setAlignY(u);}
;if(v){this.setSeparator(v);}
;}
,properties:{alignY:{check:[k,o,f],init:k,apply:b},alignX:{check:[m,c,r],init:m,apply:b},spacing:{check:p,init:0,apply:b},separator:{check:a,nullable:true,apply:b},reversed:{check:s,init:false,apply:d}},members:{__DM:null,__BR:null,__BS:null,__fu:null,_applyReversed:function(){this._invalidChildrenCache=true;this._applyLayoutChange();}
,__uv:function(){var B=this._getLayoutChildren();var length=B.length;var x=false;var w=this.__DM&&this.__DM.length!=length&&this.__BR&&this.__DM;var z;var y=w?this.__DM:new Array(length);var A=w?this.__BR:new Array(length);if(this.getReversed()){B=B.concat().reverse();}
;for(var i=0;i<length;i++ ){z=B[i].getLayoutProperties();if(z.height!=null){y[i]=parseFloat(z.height)/100;}
;if(z.flex!=null){A[i]=z.flex;x=true;}
else {A[i]=0;}
;}
;if(!w){this.__DM=y;this.__BR=A;}
;this.__BS=x;this.__fu=B;delete this._invalidChildrenCache;}
,verifyLayoutProperty:qx.core.Environment.select(e,{"true":function(C,name,D){this.assert(name===j||name===n,q+name+g);if(name==n){this.assertMatch(D,qx.ui.layout.Util.PERCENT_VALUE);}
else {this.assertNumber(D);this.assert(D>=0);}
;}
,"false":null}),renderLayout:function(V,N,Y){if(this._invalidChildrenCache){this.__uv();}
;var K=this.__fu;var length=K.length;var U=qx.ui.layout.Util;var T=this.getSpacing();var bb=this.getSeparator();if(bb){var H=U.computeVerticalSeparatorGaps(K,T,bb);}
else {var H=U.computeVerticalGaps(K,T,true);}
;var i,ba,G,O;var P=[];var W=H;for(i=0;i<length;i+=1){O=this.__DM[i];G=O!=null?Math.floor((N-H)*O):K[i].getSizeHint().height;P.push(G);W+=G;}
;if(this.__BS&&W!=N){var M={};var S,F;for(i=0;i<length;i+=1){S=this.__BR[i];if(S>0){L=K[i].getSizeHint();M[i]={min:L.minHeight,value:P[i],max:L.maxHeight,flex:S};}
;}
;var I=U.computeFlexOffsets(M,N,W);for(i in I){F=I[i].offset;P[i]+=F;W+=F;}
;}
;var top=K[0].getMarginTop();if(W<N&&this.getAlignY()!=k){top=N-W;if(this.getAlignY()===o){top=Math.round(top/2);}
;}
;var L,bd,Q,G,E,R,J;this._clearSeparators();if(bb){var bc=qx.theme.manager.Decoration.getInstance().resolve(bb).getInsets();var X=bc.top+bc.bottom;}
;for(i=0;i<length;i+=1){ba=K[i];G=P[i];L=ba.getSizeHint();R=ba.getMarginLeft();J=ba.getMarginRight();Q=Math.max(L.minWidth,Math.min(V-R-J,L.maxWidth));bd=U.computeHorizontalAlignOffset(ba.getAlignX()||this.getAlignX(),Q,V,R,J);if(i>0){if(bb){top+=E+T;this._renderSeparator(bb,{top:top+Y.top,left:Y.left,height:X,width:V});top+=X+T+ba.getMarginTop();}
else {top+=U.collapseMargins(T,E,ba.getMarginTop());}
;}
;ba.renderLayout(bd+Y.left,top+Y.top,Q,G);top+=G;E=ba.getMarginBottom();}
;}
,_computeSizeHint:function(){if(this._invalidChildrenCache){this.__uv();}
;var be=qx.ui.layout.Util;var bs=this.__fu;var bh=0,bi=0,bq=0;var bj=0,bk=0;var bo,bf,br;for(var i=0,l=bs.length;i<l;i+=1){bo=bs[i];bf=bo.getSizeHint();bi+=bf.height;var bn=this.__BR[i];var bg=this.__DM[i];if(bn){bh+=bf.minHeight;}
else if(bg){bq=Math.max(bq,Math.round(bf.minHeight/bg));}
else {bh+=bf.height;}
;br=bo.getMarginLeft()+bo.getMarginRight();if((bf.width+br)>bk){bk=bf.width+br;}
;if((bf.minWidth+br)>bj){bj=bf.minWidth+br;}
;}
;bh+=bq;var bm=this.getSpacing();var bp=this.getSeparator();if(bp){var bl=be.computeVerticalSeparatorGaps(bs,bm,bp);}
else {var bl=be.computeVerticalGaps(bs,bm,true);}
;return {minHeight:bh+bl,height:bi+bl,minWidth:bj,width:bk};}
},destruct:function(){this.__DM=this.__BR=this.__fu=null;}
});}
)();
(function(){var a="scrollY",b="_computeScrollbars",c="X",d="scrollbar-y",f="scrollAnimation",g="scrollbarX",h="auto",i="End",j="corner",k="os.scrollBarOverlayed",l="scrollarea",m="changeVisibility",n="vertical",o="scrollX",p="scrollAnimationEnd",q="off",r="horizontal",s="scrollbar-x",t="Y",u='qx.event.type.Event',v="qx.ui.core.scroll.AbstractScrollArea",w="abstract",x="update",y="scrollbarY",z="pane",A="on",B="scroll";qx.Class.define(v,{extend:qx.ui.core.Widget,include:[qx.ui.core.scroll.MScrollBarFactory,qx.ui.core.scroll.MRoll,qx.ui.core.MDragDropScrolling],type:w,statics:{DEFAULT_SCROLLBAR_WIDTH:14},construct:function(){qx.ui.core.Widget.call(this);if(qx.core.Environment.get(k)){this._setLayout(new qx.ui.layout.Canvas());}
else {var C=new qx.ui.layout.Grid();C.setColumnFlex(0,1);C.setRowFlex(0,1);this._setLayout(C);}
;this._addRollHandling();}
,events:{scrollAnimationXEnd:u,scrollAnimationYEnd:u},properties:{appearance:{refine:true,init:l},width:{refine:true,init:100},height:{refine:true,init:200},scrollbarX:{check:[h,A,q],init:h,themeable:true,apply:b},scrollbarY:{check:[h,A,q],init:h,themeable:true,apply:b},scrollbar:{group:[g,y]}},members:{_createChildControlImpl:function(F,E){var D;switch(F){case z:D=new qx.ui.core.scroll.ScrollPane();D.addListener(x,this._computeScrollbars,this);D.addListener(o,this._onScrollPaneX,this);D.addListener(a,this._onScrollPaneY,this);if(qx.core.Environment.get(k)){this._add(D,{edge:0});}
else {this._add(D,{row:0,column:0});}
;break;case s:D=this._createScrollBar(r);D.setMinWidth(0);D.exclude();D.addListener(B,this._onScrollBarX,this);D.addListener(m,this._onChangeScrollbarXVisibility,this);D.addListener(p,this._onScrollAnimationEnd.bind(this,c));if(qx.core.Environment.get(k)){D.setMinHeight(qx.ui.core.scroll.AbstractScrollArea.DEFAULT_SCROLLBAR_WIDTH);this._add(D,{bottom:0,right:0,left:0});}
else {this._add(D,{row:1,column:0});}
;break;case d:D=this._createScrollBar(n);D.setMinHeight(0);D.exclude();D.addListener(B,this._onScrollBarY,this);D.addListener(m,this._onChangeScrollbarYVisibility,this);D.addListener(p,this._onScrollAnimationEnd.bind(this,t));if(qx.core.Environment.get(k)){D.setMinWidth(qx.ui.core.scroll.AbstractScrollArea.DEFAULT_SCROLLBAR_WIDTH);this._add(D,{right:0,bottom:0,top:0});}
else {this._add(D,{row:0,column:1});}
;break;case j:D=new qx.ui.core.Widget();D.setWidth(0);D.setHeight(0);D.exclude();if(!qx.core.Environment.get(k)){this._add(D,{row:1,column:1});}
;break;};return D||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,F);}
,getPaneSize:function(){return this.getChildControl(z).getInnerSize();}
,getItemTop:function(G){return this.getChildControl(z).getItemTop(G);}
,getItemBottom:function(H){return this.getChildControl(z).getItemBottom(H);}
,getItemLeft:function(I){return this.getChildControl(z).getItemLeft(I);}
,getItemRight:function(J){return this.getChildControl(z).getItemRight(J);}
,scrollToX:function(L,K){qx.ui.core.queue.Manager.flush();this.getChildControl(s).scrollTo(L,K);}
,scrollByX:function(N,M){qx.ui.core.queue.Manager.flush();this.getChildControl(s).scrollBy(N,M);}
,getScrollX:function(){var O=this.getChildControl(s,true);return O?O.getPosition():0;}
,scrollToY:function(Q,P){qx.ui.core.queue.Manager.flush();this.getChildControl(d).scrollTo(Q,P);}
,scrollByY:function(S,R){qx.ui.core.queue.Manager.flush();this.getChildControl(d).scrollBy(S,R);}
,getScrollY:function(){var T=this.getChildControl(d,true);return T?T.getPosition():0;}
,stopScrollAnimationX:function(){var U=this.getChildControl(s,true);if(U){U.stopScrollAnimation();}
;}
,stopScrollAnimationY:function(){var V=this.getChildControl(d,true);if(V){V.stopScrollAnimation();}
;}
,_onScrollAnimationEnd:function(W){this.fireEvent(f+W+i);}
,_onScrollBarX:function(e){this.getChildControl(z).scrollToX(e.getData());}
,_onScrollBarY:function(e){this.getChildControl(z).scrollToY(e.getData());}
,_onScrollPaneX:function(e){var X=this.getChildControl(s);if(X){X.updatePosition(e.getData());}
;}
,_onScrollPaneY:function(e){var Y=this.getChildControl(d);if(Y){Y.updatePosition(e.getData());}
;}
,_onChangeScrollbarXVisibility:function(e){var ba=this._isChildControlVisible(s);var bb=this._isChildControlVisible(d);if(!ba){this.scrollToX(0);}
;ba&&bb?this._showChildControl(j):this._excludeChildControl(j);}
,_onChangeScrollbarYVisibility:function(e){var bc=this._isChildControlVisible(s);var bd=this._isChildControlVisible(d);if(!bd){this.scrollToY(0);}
;bc&&bd?this._showChildControl(j):this._excludeChildControl(j);}
,_computeScrollbars:function(){var bk=this.getChildControl(z);var content=bk.getChildren()[0];if(!content){this._excludeChildControl(s);this._excludeChildControl(d);return;}
;var be=this.getInnerSize();var bj=bk.getInnerSize();var bh=bk.getScrollSize();if(!bj||!bh){return;}
;var bl=this.getScrollbarX();var bm=this.getScrollbarY();if(bl===h&&bm===h){var bi=bh.width>be.width;var bn=bh.height>be.height;if((bi||bn)&&!(bi&&bn)){if(bi){bn=bh.height>bj.height;}
else if(bn){bi=bh.width>bj.width;}
;}
;}
else {var bi=bl===A;var bn=bm===A;if(bh.width>(bi?bj.width:be.width)&&bl===h){bi=true;}
;if(bh.height>(bi?bj.height:be.height)&&bm===h){bn=true;}
;}
;if(bi){var bg=this.getChildControl(s);bg.show();bg.setMaximum(Math.max(0,bh.width-bj.width));bg.setKnobFactor((bh.width===0)?0:bj.width/bh.width);}
else {this._excludeChildControl(s);}
;if(bn){var bf=this.getChildControl(d);bf.show();bf.setMaximum(Math.max(0,bh.height-bj.height));bf.setKnobFactor((bh.height===0)?0:bj.height/bh.height);}
else {this._excludeChildControl(d);}
;}
}});}
)();
(function(){var a="' must be defined!",b="height",c="vAlign",d="hAlign",e="' is not supported by the Grid layout!",f="bottom",g="Invalid parameter 'column'",h="Integer",m="The property '",n="'",o="_applyLayoutChange",p="qx.debug",q="Value must be positive",r="center",s="qx.ui.layout.Grid",t="middle",u="maxHeight",v="Cannot add widget '",w="width",z=") for '",A="'!. ",B="top",C="minHeight",D="right",E="' in this cell (",F=", ",G="The layout properties 'row' and 'column' of the child widget '",H="minWidth",I="flex",J="left",K="maxWidth",L="Invalid parameter 'row'",M="There is already a widget '";qx.Class.define(s,{extend:qx.ui.layout.Abstract,construct:function(O,N){qx.ui.layout.Abstract.call(this);this.__DN=[];this.__DO=[];if(O){this.setSpacingX(O);}
;if(N){this.setSpacingY(N);}
;}
,properties:{spacingX:{check:h,init:0,apply:o},spacingY:{check:h,init:0,apply:o}},members:{__cw:null,__DN:null,__DO:null,__DP:null,__DQ:null,__DR:null,__DS:null,__DT:null,__DU:null,verifyLayoutProperty:qx.core.Environment.select(p,{"true":function(P,name,Q){var R={"row":1,"column":1,"rowSpan":1,"colSpan":1};this.assert(R[name]==1,m+name+e);this.assertInteger(Q);this.assert(Q>=0,q);}
,"false":null}),__DV:function(){var Y=[];var T=[];var W=[];var V=-1;var S=-1;var X=this._getLayoutChildren();for(var i=0,l=X.length;i<l;i++ ){var ba=X[i];var bb=ba.getLayoutProperties();var bc=bb.row;var U=bb.column;bb.colSpan=bb.colSpan||1;bb.rowSpan=bb.rowSpan||1;if(bc==null||U==null){throw new Error(G+ba+a);}
;if(Y[bc]&&Y[bc][U]){throw new Error(v+ba+A+M+Y[bc][U]+E+bc+F+U+z+this+n);}
;for(var x=U;x<U+bb.colSpan;x++ ){for(var y=bc;y<bc+bb.rowSpan;y++ ){if(Y[y]==undefined){Y[y]=[];}
;Y[y][x]=ba;S=Math.max(S,x);V=Math.max(V,y);}
;}
;if(bb.rowSpan>1){W.push(ba);}
;if(bb.colSpan>1){T.push(ba);}
;}
;for(var y=0;y<=V;y++ ){if(Y[y]==undefined){Y[y]=[];}
;}
;this.__cw=Y;this.__DP=T;this.__DQ=W;this.__DR=V;this.__DS=S;this.__DT=null;this.__DU=null;delete this._invalidChildrenCache;}
,_setRowData:function(bg,be,bf){var bd=this.__DN[bg];if(!bd){this.__DN[bg]={};this.__DN[bg][be]=bf;}
else {bd[be]=bf;}
;}
,_setColumnData:function(bh,bj,bk){var bi=this.__DO[bh];if(!bi){this.__DO[bh]={};this.__DO[bh][bj]=bk;}
else {bi[bj]=bk;}
;}
,setSpacing:function(bl){this.setSpacingY(bl);this.setSpacingX(bl);return this;}
,setColumnAlign:function(bm,bn,bo){if(qx.core.Environment.get(p)){this.assertInteger(bm,g);this.assertInArray(bn,[J,r,D]);this.assertInArray(bo,[B,t,f]);}
;this._setColumnData(bm,d,bn);this._setColumnData(bm,c,bo);this._applyLayoutChange();return this;}
,getColumnAlign:function(bp){var bq=this.__DO[bp]||{};return {vAlign:bq.vAlign||B,hAlign:bq.hAlign||J};}
,setRowAlign:function(bs,br,bt){if(qx.core.Environment.get(p)){this.assertInteger(bs,L);this.assertInArray(br,[J,r,D]);this.assertInArray(bt,[B,t,f]);}
;this._setRowData(bs,d,br);this._setRowData(bs,c,bt);this._applyLayoutChange();return this;}
,getRowAlign:function(bv){var bu=this.__DN[bv]||{};return {vAlign:bu.vAlign||B,hAlign:bu.hAlign||J};}
,getCellWidget:function(bx,bw){if(this._invalidChildrenCache){this.__DV();}
;var bx=this.__cw[bx]||{};return bx[bw]||null;}
,getRowCount:function(){if(this._invalidChildrenCache){this.__DV();}
;return this.__DR+1;}
,getColumnCount:function(){if(this._invalidChildrenCache){this.__DV();}
;return this.__DS+1;}
,getCellAlign:function(bF,bz){var bE=B;var bC=J;var bD=this.__DN[bF];var bA=this.__DO[bz];var by=this.__cw[bF][bz];if(by){var bB={vAlign:by.getAlignY(),hAlign:by.getAlignX()};}
else {bB={};}
;if(bB.vAlign){bE=bB.vAlign;}
else if(bD&&bD.vAlign){bE=bD.vAlign;}
else if(bA&&bA.vAlign){bE=bA.vAlign;}
;if(bB.hAlign){bC=bB.hAlign;}
else if(bA&&bA.hAlign){bC=bA.hAlign;}
else if(bD&&bD.hAlign){bC=bD.hAlign;}
;return {vAlign:bE,hAlign:bC};}
,setColumnFlex:function(bG,bH){this._setColumnData(bG,I,bH);this._applyLayoutChange();return this;}
,getColumnFlex:function(bI){var bJ=this.__DO[bI]||{};return bJ.flex!==undefined?bJ.flex:0;}
,setRowFlex:function(bL,bK){this._setRowData(bL,I,bK);this._applyLayoutChange();return this;}
,getRowFlex:function(bO){var bM=this.__DN[bO]||{};var bN=bM.flex!==undefined?bM.flex:0;return bN;}
,setColumnMaxWidth:function(bP,bQ){this._setColumnData(bP,K,bQ);this._applyLayoutChange();return this;}
,getColumnMaxWidth:function(bR){var bS=this.__DO[bR]||{};return bS.maxWidth!==undefined?bS.maxWidth:Infinity;}
,setColumnWidth:function(bT,bU){this._setColumnData(bT,w,bU);this._applyLayoutChange();return this;}
,getColumnWidth:function(bV){var bW=this.__DO[bV]||{};return bW.width!==undefined?bW.width:null;}
,setColumnMinWidth:function(bX,bY){this._setColumnData(bX,H,bY);this._applyLayoutChange();return this;}
,getColumnMinWidth:function(ca){var cb=this.__DO[ca]||{};return cb.minWidth||0;}
,setRowMaxHeight:function(cd,cc){this._setRowData(cd,u,cc);this._applyLayoutChange();return this;}
,getRowMaxHeight:function(cf){var ce=this.__DN[cf]||{};return ce.maxHeight||Infinity;}
,setRowHeight:function(cg,ch){this._setRowData(cg,b,ch);this._applyLayoutChange();return this;}
,getRowHeight:function(cj){var ci=this.__DN[cj]||{};return ci.height!==undefined?ci.height:null;}
,setRowMinHeight:function(cl,ck){this._setRowData(cl,C,ck);this._applyLayoutChange();return this;}
,getRowMinHeight:function(cn){var cm=this.__DN[cn]||{};return cm.minHeight||0;}
,__DW:function(cp){var co=cp.getSizeHint();var cr=cp.getMarginLeft()+cp.getMarginRight();var cq=cp.getMarginTop()+cp.getMarginBottom();var cs={height:co.height+cq,width:co.width+cr,minHeight:co.minHeight+cq,minWidth:co.minWidth+cr,maxHeight:co.maxHeight+cq,maxWidth:co.maxWidth+cr};return cs;}
,_fixHeightsRowSpan:function(cN){var cz=this.getSpacingY();for(var i=0,l=this.__DQ.length;i<l;i++ ){var cF=this.__DQ[i];var cC=this.__DW(cF);var cv=cF.getLayoutProperties();var cB=cv.row;var cK=cz*(cv.rowSpan-1);var ct=cK;var cw={};for(var j=0;j<cv.rowSpan;j++ ){var cA=cv.row+j;var cJ=cN[cA];var cL=this.getRowFlex(cA);if(cL>0){cw[cA]={min:cJ.minHeight,value:cJ.height,max:cJ.maxHeight,flex:cL};}
;cK+=cJ.height;ct+=cJ.minHeight;}
;if(cK<cC.height){if(!qx.lang.Object.isEmpty(cw)){var cM=qx.ui.layout.Util.computeFlexOffsets(cw,cC.height,cK);for(var k=0;k<cv.rowSpan;k++ ){var cH=cM[cB+k]?cM[cB+k].offset:0;cN[cB+k].height+=cH;}
;}
else {var cE=cz*(cv.rowSpan-1);var cD=cC.height-cE;var cI=Math.floor(cD/cv.rowSpan);var cG=0;var cu=0;for(var k=0;k<cv.rowSpan;k++ ){var cy=cN[cB+k].height;cG+=cy;if(cy<cI){cu++ ;}
;}
;var cx=Math.floor((cD-cG)/cu);for(var k=0;k<cv.rowSpan;k++ ){if(cN[cB+k].height<cI){cN[cB+k].height+=cx;}
;}
;}
;}
;if(ct<cC.minHeight){var cM=qx.ui.layout.Util.computeFlexOffsets(cw,cC.minHeight,ct);for(var j=0;j<cv.rowSpan;j++ ){var cH=cM[cB+j]?cM[cB+j].offset:0;cN[cB+j].minHeight+=cH;}
;}
;}
;}
,_fixWidthsColSpan:function(cR){var cS=this.getSpacingX();for(var i=0,l=this.__DP.length;i<l;i++ ){var cO=this.__DP[i];var cQ=this.__DW(cO);var cU=cO.getLayoutProperties();var cP=cU.column;var db=cS*(cU.colSpan-1);var cT=db;var cV={};var cX;for(var j=0;j<cU.colSpan;j++ ){var cW=cU.column+j;var da=cR[cW];var cY=this.getColumnFlex(cW);if(cY>0){cV[cW]={min:da.minWidth,value:da.width,max:da.maxWidth,flex:cY};}
;db+=da.width;cT+=da.minWidth;}
;if(db<cQ.width){var dc=qx.ui.layout.Util.computeFlexOffsets(cV,cQ.width,db);for(var j=0;j<cU.colSpan;j++ ){cX=dc[cP+j]?dc[cP+j].offset:0;cR[cP+j].width+=cX;}
;}
;if(cT<cQ.minWidth){var dc=qx.ui.layout.Util.computeFlexOffsets(cV,cQ.minWidth,cT);for(var j=0;j<cU.colSpan;j++ ){cX=dc[cP+j]?dc[cP+j].offset:0;cR[cP+j].minWidth+=cX;}
;}
;}
;}
,_getRowHeights:function(){if(this.__DT!=null){return this.__DT;}
;var dm=[];var df=this.__DR;var de=this.__DS;for(var dn=0;dn<=df;dn++ ){var dg=0;var di=0;var dh=0;for(var dl=0;dl<=de;dl++ ){var dd=this.__cw[dn][dl];if(!dd){continue;}
;var dj=dd.getLayoutProperties().rowSpan||0;if(dj>1){continue;}
;var dk=this.__DW(dd);if(this.getRowFlex(dn)>0){dg=Math.max(dg,dk.minHeight);}
else {dg=Math.max(dg,dk.height);}
;di=Math.max(di,dk.height);}
;var dg=Math.max(dg,this.getRowMinHeight(dn));var dh=this.getRowMaxHeight(dn);if(this.getRowHeight(dn)!==null){var di=this.getRowHeight(dn);}
else {var di=Math.max(dg,Math.min(di,dh));}
;dm[dn]={minHeight:dg,height:di,maxHeight:dh};}
;if(this.__DQ.length>0){this._fixHeightsRowSpan(dm);}
;this.__DT=dm;return dm;}
,_getColWidths:function(){if(this.__DU!=null){return this.__DU;}
;var dt=[];var dq=this.__DS;var ds=this.__DR;for(var dy=0;dy<=dq;dy++ ){var dw=0;var dv=0;var dr=Infinity;for(var dz=0;dz<=ds;dz++ ){var dp=this.__cw[dz][dy];if(!dp){continue;}
;var du=dp.getLayoutProperties().colSpan||0;if(du>1){continue;}
;var dx=this.__DW(dp);dv=Math.max(dv,dx.minWidth);dw=Math.max(dw,dx.width);}
;dv=Math.max(dv,this.getColumnMinWidth(dy));dr=this.getColumnMaxWidth(dy);if(this.getColumnWidth(dy)!==null){var dw=this.getColumnWidth(dy);}
else {var dw=Math.max(dv,Math.min(dw,dr));}
;dt[dy]={minWidth:dv,width:dw,maxWidth:dr};}
;if(this.__DP.length>0){this._fixWidthsColSpan(dt);}
;this.__DU=dt;return dt;}
,_getColumnFlexOffsets:function(dD){var dA=this.getSizeHint();var dF=dD-dA.width;if(dF==0){return {};}
;var dC=this._getColWidths();var dB={};for(var i=0,l=dC.length;i<l;i++ ){var dG=dC[i];var dE=this.getColumnFlex(i);if((dE<=0)||(dG.width==dG.maxWidth&&dF>0)||(dG.width==dG.minWidth&&dF<0)){continue;}
;dB[i]={min:dG.minWidth,value:dG.width,max:dG.maxWidth,flex:dE};}
;return qx.ui.layout.Util.computeFlexOffsets(dB,dD,dA.width);}
,_getRowFlexOffsets:function(dJ){var dH=this.getSizeHint();var dL=dJ-dH.height;if(dL==0){return {};}
;var dK=this._getRowHeights();var dI={};for(var i=0,l=dK.length;i<l;i++ ){var dN=dK[i];var dM=this.getRowFlex(i);if((dM<=0)||(dN.height==dN.maxHeight&&dL>0)||(dN.height==dN.minHeight&&dL<0)){continue;}
;dI[i]={min:dN.minHeight,value:dN.height,max:dN.maxHeight,flex:dM};}
;return qx.ui.layout.Util.computeFlexOffsets(dI,dJ,dH.height);}
,renderLayout:function(ej,dO,ei){if(this._invalidChildrenCache){this.__DV();}
;var ed=qx.ui.layout.Util;var dQ=this.getSpacingX();var dW=this.getSpacingY();var eh=this._getColWidths();var ek=this._getColumnFlexOffsets(ej);var dR=[];var em=this.__DS;var dP=this.__DR;var el;for(var en=0;en<=em;en++ ){el=ek[en]?ek[en].offset:0;dR[en]=eh[en].width+el;}
;var ea=this._getRowHeights();var ec=this._getRowFlexOffsets(dO);var et=[];for(var dX=0;dX<=dP;dX++ ){el=ec[dX]?ec[dX].offset:0;et[dX]=ea[dX].height+el;}
;var er=0;for(var en=0;en<=em;en++ ){var top=0;for(var dX=0;dX<=dP;dX++ ){var ef=this.__cw[dX][en];if(!ef){top+=et[dX]+dW;continue;}
;var dS=ef.getLayoutProperties();if(dS.row!==dX||dS.column!==en){top+=et[dX]+dW;continue;}
;var es=dQ*(dS.colSpan-1);for(var i=0;i<dS.colSpan;i++ ){es+=dR[en+i];}
;var eg=dW*(dS.rowSpan-1);for(var i=0;i<dS.rowSpan;i++ ){eg+=et[dX+i];}
;var dT=ef.getSizeHint();var eq=ef.getMarginTop();var ee=ef.getMarginLeft();var eb=ef.getMarginBottom();var dV=ef.getMarginRight();var dY=Math.max(dT.minWidth,Math.min(es-ee-dV,dT.maxWidth));var eu=Math.max(dT.minHeight,Math.min(eg-eq-eb,dT.maxHeight));var eo=this.getCellAlign(dX,en);var ep=er+ed.computeHorizontalAlignOffset(eo.hAlign,dY,es,ee,dV);var dU=top+ed.computeVerticalAlignOffset(eo.vAlign,eu,eg,eq,eb);ef.renderLayout(ep+ei.left,dU+ei.top,dY,eu);top+=et[dX]+dW;}
;er+=dR[en]+dQ;}
;}
,invalidateLayoutCache:function(){qx.ui.layout.Abstract.prototype.invalidateLayoutCache.call(this);this.__DU=null;this.__DT=null;}
,_computeSizeHint:function(){if(this._invalidChildrenCache){this.__DV();}
;var ex=this._getColWidths();var ev=0,eD=0;for(var i=0,l=ex.length;i<l;i++ ){var eC=ex[i];if(this.getColumnFlex(i)>0){ev+=eC.minWidth;}
else {ev+=eC.width;}
;eD+=eC.width;}
;var eE=this._getRowHeights();var ey=0,ez=0;for(var i=0,l=eE.length;i<l;i++ ){var eF=eE[i];if(this.getRowFlex(i)>0){ey+=eF.minHeight;}
else {ey+=eF.height;}
;ez+=eF.height;}
;var eB=this.getSpacingX()*(ex.length-1);var eA=this.getSpacingY()*(eE.length-1);var ew={minWidth:ev+eB,width:eD+eB,minHeight:ey+eA,height:ez+eA};return ew;}
},destruct:function(){this.__cw=this.__DN=this.__DO=this.__DP=this.__DQ=this.__DU=this.__DT=null;}
});}
)();
(function(){var a="resize",b="scrollY",c="scrollAnimationEnd",d="_transformScrollX",f="scrollX",g="_applyScrollX",h="_applyScrollY",i="frame",j="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxX()",k="_transformScrollY",l="appear",m="qx.lang.Type.isNumber(value)&&value>=0&&value<=this.getScrollMaxY()",n="qx.event.type.Event",o="qx.ui.core.scroll.ScrollPane",p="end",q="scroll",r="update";qx.Class.define(o,{extend:qx.ui.core.Widget,construct:function(){qx.ui.core.Widget.call(this);this.set({minWidth:0,minHeight:0});this._setLayout(new qx.ui.layout.Grow());this.addListener(a,this._onUpdate);var s=this.getContentElement();s.addListener(q,this._onScroll,this);s.addListener(l,this._onAppear,this);}
,events:{update:n,scrollAnimationEnd:n},properties:{scrollX:{check:j,apply:g,transform:d,event:f,init:0},scrollY:{check:m,apply:h,transform:k,event:b,init:0}},members:{__iP:null,add:function(t){var u=this._getChildren()[0];if(u){this._remove(u);u.removeListener(a,this._onUpdate,this);}
;if(t){this._add(t);t.addListener(a,this._onUpdate,this);}
;}
,remove:function(v){if(v){this._remove(v);v.removeListener(a,this._onUpdate,this);}
;}
,getChildren:function(){return this._getChildren();}
,_onUpdate:function(e){this.fireEvent(r);}
,_onScroll:function(e){var w=this.getContentElement();this.setScrollX(w.getScrollX());this.setScrollY(w.getScrollY());}
,_onAppear:function(e){var B=this.getContentElement();var z=this.getScrollX();var C=B.getScrollX();if(z!=C){B.scrollToX(z);}
;var A=this.getScrollY();var D=B.getScrollY();if(A!=D){B.scrollToY(A);}
;}
,getItemTop:function(E){var top=0;do {top+=E.getBounds().top;E=E.getLayoutParent();}
while(E&&E!==this);return top;}
,getItemBottom:function(F){return this.getItemTop(F)+F.getBounds().height;}
,getItemLeft:function(G){var H=0;var parent;do {H+=G.getBounds().left;parent=G.getLayoutParent();if(parent){H+=parent.getInsets().left;}
;G=parent;}
while(G&&G!==this);return H;}
,getItemRight:function(I){return this.getItemLeft(I)+I.getBounds().width;}
,getScrollSize:function(){return this.getChildren()[0].getBounds();}
,getScrollMaxX:function(){var K=this.getInnerSize();var J=this.getScrollSize();if(K&&J){return Math.max(0,J.width-K.width);}
;return 0;}
,getScrollMaxY:function(){var M=this.getInnerSize();var L=this.getScrollSize();if(M&&L){return Math.max(0,L.height-M.height);}
;return 0;}
,scrollToX:function(Q,N){var O=this.getScrollMaxX();if(Q<0){Q=0;}
else if(Q>O){Q=O;}
;this.stopScrollAnimation();if(N){var P=this.getScrollX();this.__iP=new qx.bom.AnimationFrame();this.__iP.on(p,function(){this.setScrollX(Q);this.__iP=null;this.fireEvent(c);}
,this);this.__iP.on(i,function(S){var R=parseInt(S/N*(Q-P)+P);this.setScrollX(R);}
,this);this.__iP.startSequence(N);}
else {this.setScrollX(Q);}
;}
,scrollToY:function(W,T){var U=this.getScrollMaxY();if(W<0){W=0;}
else if(W>U){W=U;}
;this.stopScrollAnimation();if(T){var V=this.getScrollY();this.__iP=new qx.bom.AnimationFrame();this.__iP.on(p,function(){this.setScrollY(W);this.__iP=null;this.fireEvent(c);}
,this);this.__iP.on(i,function(Y){var X=parseInt(Y/T*(W-V)+V);this.setScrollY(X);}
,this);this.__iP.startSequence(T);}
else {this.setScrollY(W);}
;}
,scrollByX:function(x,ba){this.scrollToX(this.getScrollX()+x,ba);}
,scrollByY:function(y,bb){this.scrollToY(this.getScrollY()+y,bb);}
,stopScrollAnimation:function(){if(this.__iP){this.__iP.cancelSequence();this.__iP=null;}
;}
,_applyScrollX:function(bc){this.getContentElement().scrollToX(bc);}
,_transformScrollX:function(bd){return Math.round(bd);}
,_applyScrollY:function(be){this.getContentElement().scrollToY(be);}
,_transformScrollY:function(bf){return Math.round(bf);}
}});}
)();
(function(){var a="' is not supported by the Grow layout!",b="qx.ui.layout.Grow",c="qx.debug",d="The property '";qx.Class.define(b,{extend:qx.ui.layout.Abstract,members:{verifyLayoutProperty:qx.core.Environment.select(c,{"true":function(e,name,f){this.assert(false,d+name+a);}
,"false":null}),renderLayout:function(g,h,k){var o=this._getLayoutChildren();var n,p,m,j;for(var i=0,l=o.length;i<l;i++ ){n=o[i];p=n.getSizeHint();m=g;if(m<p.minWidth){m=p.minWidth;}
else if(m>p.maxWidth){m=p.maxWidth;}
;j=h;if(j<p.minHeight){j=p.minHeight;}
else if(j>p.maxHeight){j=p.maxHeight;}
;n.renderLayout(k.left,k.top,m,j);}
;}
,_computeSizeHint:function(){var w=this._getLayoutChildren();var u,y;var x=0,v=0;var t=0,r=0;var q=Infinity,s=Infinity;for(var i=0,l=w.length;i<l;i++ ){u=w[i];y=u.getSizeHint();x=Math.max(x,y.width);v=Math.max(v,y.height);t=Math.max(t,y.minWidth);r=Math.max(r,y.minHeight);q=Math.min(q,y.maxWidth);s=Math.min(s,y.maxHeight);}
;return {width:x,height:v,minWidth:t,minHeight:r,maxWidth:q,maxHeight:s};}
}});}
)();
(function(){var a="os.version",b="os.name",c="qx.mobile.nativescroll",d="osx",e="qx.nativeScrollBars",f="event.mspointer",g="android",h="firefox",i="os.scrollBarOverlayed",j="browser.version",k="ios",l=".",m="browser.name",n="qx.bom.client.Scroll";qx.Bootstrap.define(n,{statics:{scrollBarOverlayed:function(){var o=qx.bom.element.Scroll.getScrollbarWidth();var q=qx.bom.client.OperatingSystem.getName()===d;var p=qx.core.Environment.get(e);return o===0&&q&&p;}
,getNativeScroll:function(){if(qx.core.Environment.get(b)==k&&parseInt(qx.core.Environment.get(j),10)>7){return true;}
;if(qx.core.Environment.get(m)==h){return true;}
;if(qx.core.Environment.get(b)==g){var s=qx.core.Environment.get(a);var r=s.split(l);if(r[0]>4||(r.length>1&&r[0]>3&&r[1]>3)){return true;}
;}
;if(qx.core.Environment.get(f)){return true;}
;return false;}
},defer:function(t){qx.core.Environment.add(i,t.scrollBarOverlayed);qx.core.Environment.add(c,t.getNativeScroll);}
});}
)();
(function(){var a="wlpe_qx.ui.layout.Grid",b="black",c="demobrowser.demo.util.PropertyEditor",d="Widget Properties",f="lpe_qx.ui.layout.HBox",g="wlpe_qx.ui.layout.Dock",h="wlpe_",i="lpe_qx.ui.layout.Dock",j="lpe_",k="solid",l="string",m="wlpe_qx.ui.layout.HBox",n="wlpe_qx.ui.layout.Canvas",o="wlpe_qx.ui.layout.VBox",p=" layout properties",q="_applyWidget",r="qx.ui.core.Widget",s=" properties",t="wlpe_qx.ui.layout.Basic",u="Selected Widget",v="lpe_qx.ui.layout.Grid",w="bold",x="pane",y="white";qx.Class.define(c,{extend:qx.ui.core.scroll.AbstractScrollArea,construct:function(){qx.ui.core.scroll.AbstractScrollArea.call(this);this.setWidth(null);this._editorGroups={};var z=new qx.ui.decoration.Decorator().set({widthLeft:1,styleLeft:k,colorLeft:b});this.setDecorator(z);this.setBackgroundColor(y);var B=new qx.ui.container.Composite().set({padding:[20,14]});this.getChildControl(x).add(B);this._pane=B;var A=new qx.ui.layout.VBox().set({spacing:5});B.setLayout(A);B.add(this._createWidgetIndicator());B.add(new qx.ui.basic.Label(d).set({font:w,padding:[1,0,5,0]}));var C=qx.lang.Object.clone(demobrowser.demo.util.PropertyGroup.WIDGET_PROPERTIES);C.value={type:l,nullable:true};this._layoutControls=new demobrowser.demo.util.PropertyGroup(C);B.add(this._layoutControls);}
,properties:{widget:{check:r,apply:q}},members:{handleWidgetTap:function(e){var D=e.getTarget();this.setWidget(D);}
,_createWidgetIndicator:function(){var E=new qx.ui.container.Composite(new qx.ui.layout.VBox().set({spacing:5}));E.add(this._createLabel(u));this._widgetIndicator=new qx.ui.basic.Label().set({height:30,allowGrowX:true,allowGrowY:true,padding:5});E._add(this._widgetIndicator);return E;}
,_createLabel:function(F){return new qx.ui.basic.Label(F).set({font:w,allowGrowX:true,padding:[5,0,5,0]});}
,_createContainer:function(I,H){var G=new qx.ui.container.Composite(new qx.ui.layout.VBox().set({spacing:5}));G.add(this._createLabel(I));G.add(H);return G;}
,updateWidgetLayoutPropertyEditor:function(K){var L=K.getLayoutParent()?K.getLayoutParent()._getLayout():null;var J=this.getWidgetLayoutPropertyEditor(L);if(J){J.getChildren()[1].setSelected(K);}
;if(J===this._wlpe){return;}
;if(this._wlpe){this._pane.remove(this._wlpe);}
;if(!J){this._wlpe=J;return;}
;this._pane.addAfter(J,this._layoutControls);this._wlpe=J;}
,updateLayoutPropertyEditor:function(M){var N=M.getLayout?M.getLayout():null;var O=this.getLayoutPropertyEditor(N);if(O){O.getChildren()[1].setSelected(N);}
;if(O===this._lpe){return;}
;if(this._lpe){this._pane.remove(this._lpe);}
;if(!O){this._lpe=O;return;}
;this._pane.add(O);this._lpe=O;}
,getWidgetLayoutPropertyEditor:function(P){if(!P){return null;}
;var name=h+P.constructor.classname;var Q;if(this._editorGroups[name]){return this._editorGroups[name];}
;switch(name){case m:case o:Q=new demobrowser.demo.util.LayoutPropertyGroup(demobrowser.demo.util.LayoutPropertyGroup.BOX_PROPERTIES);break;case n:Q=new demobrowser.demo.util.LayoutPropertyGroup(demobrowser.demo.util.LayoutPropertyGroup.CANVAS_PROPERTIES);break;case t:Q=new demobrowser.demo.util.LayoutPropertyGroup(demobrowser.demo.util.LayoutPropertyGroup.BASIC_PROPERTIES);break;case g:Q=new demobrowser.demo.util.LayoutPropertyGroup(demobrowser.demo.util.LayoutPropertyGroup.DOCK_PROPERTIES);break;case a:Q=new demobrowser.demo.util.LayoutPropertyGroup(demobrowser.demo.util.LayoutPropertyGroup.GRID_PROPERTIES);break;};if(!Q){return null;}
;this._editorGroups[name]=this._createContainer(P.constructor.classname+p,Q);return this._editorGroups[name];}
,getLayoutPropertyEditor:function(R){if(!R){return null;}
;var name=j+R.constructor.classname;var S;if(this._editorGroups[name]){return this._editorGroups[name];}
;switch(name){case f:S=new demobrowser.demo.util.PropertyGroup(demobrowser.demo.util.PropertyGroup.HBOX_PROPERTIES);break;case i:S=new demobrowser.demo.util.PropertyGroup(demobrowser.demo.util.PropertyGroup.DOCK_PROPERTIES);break;case v:S=new demobrowser.demo.util.PropertyGroup(demobrowser.demo.util.PropertyGroup.GRID_PROPERTIES);break;};if(!S){return null;}
;this._editorGroups[name]=this._createContainer(R.constructor.classname+s,S);return this._editorGroups[name];}
,_applyWidget:function(U,T){this._layoutControls.setSelected(U);this._widgetIndicator.setBackgroundColor(U.getBackgroundColor());this._widgetIndicator.setDecorator(U.getDecorator());this._widgetIndicator.setValue(U.toString());this.updateLayoutPropertyEditor(U);this.updateWidgetLayoutPropertyEditor(U);}
},destruct:function(){this._pane=this._editorGroups=this._widgetIndicator=this._layoutControls=null;}
});}
)();
(function(){var a="function",b="set",c="changeValue",d="bottom",f="auto",g="null",h="baseline",j="string",k="center",m="value",n="get",o="changeSelection",p="middle",q="y",r="demobrowser.demo.util.PropertyGroup",s="_applySelected",t="int",u="top",v="right",w="bool",x="enum",y="left",z="x";qx.Class.define(r,{extend:qx.ui.core.Widget,construct:function(E){qx.ui.core.Widget.call(this);this._properties=E;var B=new qx.ui.layout.Grid(10,5);B.setColumnAlign(0,v,u);B.setColumnMinWidth(0,110);this._setLayout(B);this.set({allowShrinkX:false,allowShrinkY:false});var J=0;for(var F in this._properties){var I=this._properties[F].type;var D=this._properties[F].nullable;this._add(new qx.ui.basic.Label(F).set({paddingTop:4}),{row:J,column:0});if(D){var C=new qx.ui.form.CheckBox(g);C.addListener(c,this._createOnNullPropertyChange(F),this);this._add(C,{row:J,column:2});this._properties[F].nullWidget=C;}
;if(I==t){var H=new qx.ui.form.Spinner().set({minimum:this._properties[F].min||0,maximum:this._properties[F].max!==undefined?this._properties[F].max:1000});H.addListener(c,this._createOnIntPropertyChange(F),this);this._add(H,{row:J++ ,column:1});}
else if(I==w){var H=new qx.ui.form.CheckBox();H.addListener(c,this._createOnBoolPropertyChange(F),this);this._add(H,{row:J++ ,column:1});}
else if(I==x){var G=this._properties[F].values;var H=new qx.ui.form.RadioGroup();for(var i=0;i<G.length;i++ ){var A=new qx.ui.form.RadioButton(G[i]);A.setUserData(m,G[i]);H.add(A);this._add(A,{row:J++ ,column:1});}
;H.addListener(o,this._createOnEnumPropertyChange(F,H),this);}
else if(I==j){var H=new qx.ui.form.TextField();H.setLiveUpdate(true);H.addListener(c,this._createOnIntPropertyChange(F),this);this._add(H,{row:J++ ,column:1});}
;this._properties[F].formItem=H;}
;}
,statics:{WIDGET_PROPERTIES:{"width":{type:t,nullable:true},"height":{type:t,nullable:true},"minWidth":{type:t,nullable:true},"minHeight":{type:t,nullable:true},"maxWidth":{type:t,nullable:true},"maxHeight":{type:t,nullable:true},"allowGrowX":{type:w,nullable:false},"allowGrowY":{type:w,nullable:false},"allowShrinkX":{type:w,nullable:false},"allowShrinkY":{type:w,nullable:false},"marginTop":{type:t,min:-1000,nullable:false},"marginRight":{type:t,min:-1000,nullable:false},"marginBottom":{type:t,min:-1000,nullable:false},"marginLeft":{type:t,min:-1000,nullable:false},"paddingTop":{type:t,nullable:false},"paddingRight":{type:t,nullable:false},"paddingBottom":{type:t,nullable:false},"paddingLeft":{type:t,nullable:false},"alignX":{type:x,values:[y,k,v],nullable:true},"alignY":{type:x,values:[u,p,d,h],nullable:true}},HBOX_PROPERTIES:{"alignX":{type:x,values:[y,k,v],nullable:false},"alignY":{type:x,values:[u,p,d,h],nullable:false},"spacing":{type:t,nullable:false},"reversed":{type:w,nullable:false}},DOCK_PROPERTIES:{"sort":{type:x,values:[f,q,z],nullable:false},"spacingX":{type:t,nullable:false},"spacingY":{type:t,nullable:false}},GRID_PROPERTIES:{"horizontalSpacing":{type:t,nullable:false},"verticalSpacing":{type:t,nullable:false}}},properties:{selected:{apply:s,nullable:true}},members:{_applySelected:function(L,K){this._updateControls(L);}
,_setProperty:function(N,name,O){if(!N){return;}
;var P=b+qx.lang.String.firstUp(name);var M=this._properties[name].convert;if(M){O=M(O);}
;N[P](O);}
,_getProperty:function(Q,name){var R=n+qx.lang.String.firstUp(name);return Q[R]();}
,_hasProperty:function(S,name){var T=b+qx.lang.String.firstUp(name);return (typeof (S[T])==a);}
,_createOnIntPropertyChange:function(U){return function(e){var V=this.getSelected();this._setProperty(V,U,e.getTarget().getValue());}
;}
,_createOnBoolPropertyChange:function(W){return function(e){var X=this.getSelected();this._setProperty(X,W,e.getTarget().getValue());}
;}
,_createOnEnumPropertyChange:function(ba,Y){return function(e){var bb=this.getSelected();this._setProperty(bb,ba,Y.getSelection()[0].getUserData(m));}
;}
,_createOnNullPropertyChange:function(bc){return function(e){var be=this.getSelected();var bd=e.getTarget();if(bd.getValue()){this._setProperty(be,bc,null);this._properties[bc].formItem.setEnabled(false);}
else {var bf=null;if(this._properties[bc].type==x){bf=this._properties[bc].formItem.getSelection()[0].getUserData(m);}
else {bf=this._properties[bc].formItem.getValue();}
;this._setProperty(be,bc,bf);this._properties[bc].formItem.setEnabled(true);}
;}
;}
,_updateControls:function(bg){for(var bm in this._properties){var bn=this._properties[bm].type;var bj=this._properties[bm].formItem;var bh=this._properties[bm].nullable;if(!this._hasProperty(bg,bm)){bj.setEnabled(false);if(bh){this._properties[bm].nullWidget.setEnabled(false);}
;return;}
;bj.setEnabled(true);var bl=this._getProperty(bg,bm);if(bl!==null){if(bn==t){bj.setValue(parseInt(bl));}
else if(bn==j){bj.setValue(bl.toString());}
else if(bn==w){bj.setValue(!!bl);}
else if(bn==x){var bi=bj.getItems();for(var i=0,l=bi.length;i<l;i++ ){var bk=bi[i];if(bk.getUserData(m)==bl){bj.setSelection([bk]);break;}
;}
;}
;}
;if(bh){this._properties[bm].nullWidget.setValue(bl==null);this._properties[bm].nullWidget.setEnabled(true);bj.setEnabled(bl!==null);}
;}
;}
},destruct:function(){this._properties=null;}
});}
)();
(function(){var a="qx.ui.form.IRadioItem",b="qx.event.type.Data";qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){}
,getValue:function(){}
,setGroup:function(d){this.assertInstance(d,qx.ui.form.RadioGroup);}
,getGroup:function(){}
}});}
)();
(function(){var a=" array contains ",b="qx.ui.core.MSingleSelectionHandling",c=" items!",d="changeSelection",f="changeSelected",g="Could only select one item, but the selection",h="__ff",i="qx.event.type.Data";qx.Mixin.define(b,{events:{"changeSelection":i},members:{__ff:null,getSelection:function(){var j=this.__CR().getSelected();if(j){return [j];}
else {return [];}
;}
,setSelection:function(k){switch(k.length){case 0:this.resetSelection();break;case 1:this.__CR().setSelected(k[0]);break;default:throw new Error(g+a+k.length+c);};}
,resetSelection:function(){this.__CR().resetSelected();}
,isSelected:function(l){return this.__CR().isSelected(l);}
,isSelectionEmpty:function(){return this.__CR().isSelectionEmpty();}
,getSelectables:function(m){return this.__CR().getSelectables(m);}
,_onChangeSelected:function(e){var o=e.getData();var n=e.getOldData();o==null?o=[]:o=[o];n==null?n=[]:n=[n];this.fireDataEvent(d,o,n);}
,__CR:function(){if(this.__ff==null){var p=this;this.__ff=new qx.ui.core.SingleSelectionManager({getItems:function(){return p._getItems();}
,isItemSelectable:function(q){if(p._isItemSelectable){return p._isItemSelectable(q);}
else {return q.isVisible();}
;}
});this.__ff.addListener(f,this._onChangeSelected,this);}
;this.__ff.setAllowEmptySelection(this._isAllowEmptySelection());return this.__ff;}
},destruct:function(){this._disposeObjects(h);}
});}
)();
(function(){var a=", because it is not a child element!",b="Boolean",c="qx.ui.core.SingleSelectionManager",d="qx.debug",e="__CT",f="__CS",g="Invalid selectionProvider!",h="Could not check if ",j=" is selected,",k="Could not select ",l="changeSelected",m=" because it is not a child element!",n="__CU",o="qx.event.type.Data";qx.Class.define(c,{extend:qx.core.Object,construct:function(p){qx.core.Object.call(this);if(qx.core.Environment.get(d)){qx.core.Assert.assertInterface(p,qx.ui.core.ISingleSelectionProvider,g);}
;this.__CS=p;}
,events:{"changeSelected":o},properties:{allowEmptySelection:{check:b,init:true,apply:n}},members:{__CT:null,__CS:null,getSelected:function(){return this.__CT;}
,setSelected:function(q){if(!this.__CW(q)){throw new Error(k+q+a);}
;this.__CV(q);}
,resetSelected:function(){this.__CV(null);}
,isSelected:function(r){if(!this.__CW(r)){throw new Error(h+r+j+m);}
;return this.__CT===r;}
,isSelectionEmpty:function(){return this.__CT==null;}
,getSelectables:function(t){var s=this.__CS.getItems();var u=[];for(var i=0;i<s.length;i++ ){if(this.__CS.isItemSelectable(s[i])){u.push(s[i]);}
;}
;if(!t){for(var i=u.length-1;i>=0;i-- ){if(!u[i].getEnabled()){u.splice(i,1);}
;}
;}
;return u;}
,__CU:function(w,v){if(!w){this.__CV(this.__CT);}
;}
,__CV:function(x){var A=this.__CT;var y=x;if(y!=null&&A===y){return;}
;if(!this.isAllowEmptySelection()&&y==null){var z=this.getSelectables(true)[0];if(z){y=z;}
;}
;this.__CT=y;this.fireDataEvent(l,y,A);}
,__CW:function(B){var C=this.__CS.getItems();for(var i=0;i<C.length;i++ ){if(C[i]===B){return true;}
;}
;return false;}
},destruct:function(){if(this.__CS.toHashCode){this._disposeObjects(f);}
else {this.__CS=null;}
;this._disposeObjects(e);}
});}
)();
(function(){var a="qx.ui.core.ISingleSelectionProvider";qx.Interface.define(a,{members:{getItems:function(){}
,isItemSelectable:function(b){}
}});}
)();
(function(){var a="Could not set the model selection. Maybe your models are not unique? ",b="qx.ui.form.MModelSelection",c="Please use an array as parameter.",d="change",f="qx.debug",g="__CX",h="changeSelection",k="qx.event.type.Data";qx.Mixin.define(b,{construct:function(){this.__CX=new qx.data.Array();this.__CX.addListener(d,this.__Db,this);this.addListener(h,this.__Da,this);}
,events:{changeModelSelection:k},members:{__CX:null,__CY:false,__Da:function(){if(this.__CY){return;}
;var n=this.getSelection();var o=[];for(var i=0;i<n.length;i++ ){var l=n[i];var m=l.getModel?l.getModel():null;if(m!==null){o.push(m);}
;}
;if(o.length===n.length){try{this.setModelSelection(o);}
catch(e){throw new Error(a+e);}
;}
;}
,__Db:function(){this.__CY=true;var r=this.getSelectables(true);var s=[];var q=this.__CX.toArray();for(var i=0;i<q.length;i++ ){var u=q[i];for(var j=0;j<r.length;j++ ){var v=r[j];var p=v.getModel?v.getModel():null;if(u===p){s.push(v);break;}
;}
;}
;this.setSelection(s);this.__CY=false;var t=this.getSelection();if(!qx.lang.Array.equals(t,s)){this.__Da();}
;}
,getModelSelection:function(){return this.__CX;}
,setModelSelection:function(w){if(!w){this.__CX.removeAll();return;}
;if(qx.core.Environment.get(f)){this.assertArray(w,c);}
;w.unshift(this.__CX.getLength());w.unshift(0);var x=this.__CX.splice.apply(this.__CX,w);x.dispose();}
},destruct:function(){this._disposeObjects(g);}
});}
)();
(function(){var a="qx.data.marshal.MEventBubbling",b="",c="]",d="idBubble-",f="[",g="changeBubble",h=".",j="qx.event.type.Data";qx.Mixin.define(a,{events:{"changeBubble":j},members:{_applyEventPropagation:function(l,k,name){this.fireDataEvent(g,{value:l,name:name,old:k,item:this});this._registerEventChaining(l,k,name);}
,_registerEventChaining:function(n,m,name){if(m!=null&&m.getUserData&&m.getUserData(d+this.$$hash)!=null){var p=m.getUserData(d+this.$$hash);for(var i=0;i<p.length;i++ ){m.removeListenerById(p[i]);}
;m.setUserData(d+this.$$hash,null);}
;if((n instanceof qx.core.Object)&&qx.Class.hasMixin(n.constructor,qx.data.marshal.MEventBubbling)){var o=qx.lang.Function.bind(this.__Dc,this,name);var q=n.addListener(g,o,this);var p=n.getUserData(d+this.$$hash);if(p==null){p=[];n.setUserData(d+this.$$hash,p);}
;p.push(q);}
;}
,__Dc:function(name,e){var y=e.getData();var u=y.value;var s=y.old;if(qx.Class.hasInterface(e.getTarget().constructor,qx.data.IListData)){if(y.name.indexOf){var x=y.name.indexOf(h)!=-1?y.name.indexOf(h):y.name.length;var v=y.name.indexOf(f)!=-1?y.name.indexOf(f):y.name.length;if(v==0){var t=name+y.name;}
else if(x<v){var r=y.name.substring(0,x);var w=y.name.substring(x+1,y.name.length);if(w[0]!=f){w=h+w;}
;var t=name+f+r+c+w;}
else if(v<x){var r=y.name.substring(0,v);var w=y.name.substring(v,y.name.length);var t=name+f+r+c+w;}
else {var t=name+f+y.name+c;}
;}
else {var t=name+f+y.name+c;}
;}
else {if(parseInt(name)==name&&name!==b){name=f+name+c;}
;var t=name+h+y.name;}
;this.fireDataEvent(g,{value:u,name:t,old:s,item:y.item||e.getTarget()});}
}});}
)();
(function(){var a="-",b="add",c="order",d="add/remove",e="Boolean",f="",g="remove",h="Please use 'toArray()' to see the content.",j="qx.data.Array",k="qx.debug",l="Type of the parameter not supported!",m="The parameter must be an array.",n="0-",o="change",p="0",q="number",r="changeBubble",s="changeLength",t="qx.event.type.Data";qx.Class.define(j,{extend:qx.core.Object,include:qx.data.marshal.MEventBubbling,implement:[qx.data.IListData],construct:function(u){qx.core.Object.call(this);if(u==undefined){this.__Dd=[];}
else if(arguments.length>1){this.__Dd=[];for(var i=0;i<arguments.length;i++ ){this.__Dd.push(arguments[i]);}
;}
else if(typeof u==q){this.__Dd=new Array(u);}
else if(u instanceof Array){this.__Dd=qx.lang.Array.clone(u);}
else {this.__Dd=[];this.dispose();throw new Error(l);}
;for(var i=0;i<this.__Dd.length;i++ ){this._applyEventPropagation(this.__Dd[i],null,i);}
;this.__De();if(qx.core.Environment.get(k)){this[0]=h;}
;}
,properties:{autoDisposeItems:{check:e,init:false}},events:{"change":t,"changeLength":t},members:{__Dd:null,concat:function(v){if(v){var w=this.__Dd.concat(v);}
else {var w=this.__Dd.concat();}
;return new qx.data.Array(w);}
,join:function(x){return this.__Dd.join(x);}
,pop:function(){var y=this.__Dd.pop();this.__De();this._registerEventChaining(null,y,this.length-1);this.fireDataEvent(r,{value:[],name:this.length+f,old:[y],item:this});this.fireDataEvent(o,{start:this.length-1,end:this.length-1,type:g,removed:[y],added:[]},null);return y;}
,push:function(z){for(var i=0;i<arguments.length;i++ ){this.__Dd.push(arguments[i]);this.__De();this._registerEventChaining(arguments[i],null,this.length-1);this.fireDataEvent(r,{value:[arguments[i]],name:(this.length-1)+f,old:[],item:this});this.fireDataEvent(o,{start:this.length-1,end:this.length-1,type:b,added:[arguments[i]],removed:[]},null);}
;return this.length;}
,reverse:function(){if(this.length==0){return;}
;var A=this.__Dd.concat();this.__Dd.reverse();this.__Df(0,this.length);this.fireDataEvent(o,{start:0,end:this.length-1,type:c,added:[],removed:[]},null);this.fireDataEvent(r,{value:this.__Dd,name:n+(this.__Dd.length-1),old:A,item:this});}
,shift:function(){if(this.length==0){return;}
;var B=this.__Dd.shift();this.__De();this._registerEventChaining(null,B,this.length-1);this.__Df(0,this.length);this.fireDataEvent(r,{value:[],name:p,old:[B],item:this});this.fireDataEvent(o,{start:0,end:this.length-1,type:g,removed:[B],added:[]},null);return B;}
,slice:function(D,C){return new qx.data.Array(this.__Dd.slice(D,C));}
,splice:function(I,K,M){var Q=this.__Dd.length;var L=this.__Dd.splice.apply(this.__Dd,arguments);if(this.__Dd.length!=Q){this.__De();}
else if(K==arguments.length-2){var E=qx.lang.Array.fromArguments(arguments,2);for(var i=0;i<E.length;i++ ){if(E[i]!==L[i]){break;}
;if(i==E.length-1){return new qx.data.Array();}
;}
;}
;var O=K>0;var G=arguments.length>2;if(O||G){var E=qx.lang.Array.fromArguments(arguments,2);if(L.length==0){var P=b;var H=I+E.length;}
else if(E.length==0){var P=g;var H=this.length-1;}
else {var P=d;var H=I+Math.max(E.length,L.length)-1;}
;this.fireDataEvent(o,{start:I,end:H,type:P,added:E,removed:L},null);}
;for(var i=0;i<L.length;i++ ){this._registerEventChaining(null,L[i],i);}
;for(var i=2;i<arguments.length;i++ ){this._registerEventChaining(arguments[i],null,I+(i-2));}
;this.__Df(I+(arguments.length-2)-K,this.length);if(O||G){var J=[];for(var i=2;i<arguments.length;i++ ){J[i-2]=arguments[i];}
;var F=(I+Math.max(arguments.length-3,K-1));var name=I==F?F:I+a+F;var N={value:J,name:name+f,old:L,item:this};this.fireDataEvent(r,N);}
;return (new qx.data.Array(L));}
,sort:function(S){if(this.length==0){return;}
;var R=this.__Dd.concat();this.__Dd.sort.apply(this.__Dd,arguments);if(qx.lang.Array.equals(this.__Dd,R)===true){return;}
;this.__Df(0,this.length);this.fireDataEvent(o,{start:0,end:this.length-1,type:c,added:[],removed:[]},null);this.fireDataEvent(r,{value:this.__Dd,name:n+(this.length-1),old:R,item:this});}
,unshift:function(T){for(var i=arguments.length-1;i>=0;i-- ){this.__Dd.unshift(arguments[i]);this.__De();this.__Df(0,this.length);this.fireDataEvent(r,{value:[this.__Dd[0]],name:p,old:[this.__Dd[1]],item:this});this.fireDataEvent(o,{start:0,end:this.length-1,type:b,added:[arguments[i]],removed:[]},null);}
;return this.length;}
,toArray:function(){return this.__Dd;}
,getItem:function(U){return this.__Dd[U];}
,setItem:function(V,X){var W=this.__Dd[V];if(W===X){return;}
;this.__Dd[V]=X;this._registerEventChaining(X,W,V);if(this.length!=this.__Dd.length){this.__De();}
;this.fireDataEvent(r,{value:[X],name:V+f,old:[W],item:this});this.fireDataEvent(o,{start:V,end:V,type:d,added:[X],removed:[W]},null);}
,getLength:function(){return this.length;}
,indexOf:function(Y){return this.__Dd.indexOf(Y);}
,lastIndexOf:function(ba){return this.__Dd.lastIndexOf(ba);}
,toString:function(){if(this.__Dd!=null){return this.__Dd.toString();}
;return f;}
,contains:function(bb){return this.__Dd.indexOf(bb)!==-1;}
,copy:function(){return this.concat();}
,insertAt:function(bc,bd){this.splice(bc,0,bd).dispose();}
,insertBefore:function(bf,be){var bg=this.indexOf(bf);if(bg==-1){this.push(be);}
else {this.splice(bg,0,be).dispose();}
;}
,insertAfter:function(bi,bh){var bj=this.indexOf(bi);if(bj==-1||bj==(this.length-1)){this.push(bh);}
else {this.splice(bj+1,0,bh).dispose();}
;}
,removeAt:function(bk){var bl=this.splice(bk,1);var bm=bl.getItem(0);bl.dispose();return bm;}
,removeAll:function(){for(var i=0;i<this.__Dd.length;i++ ){this._registerEventChaining(null,this.__Dd[i],i);}
;if(this.getLength()==0){return [];}
;var bo=this.getLength();var bn=this.__Dd.concat();this.__Dd.length=0;this.__De();this.fireDataEvent(r,{value:[],name:n+(bo-1),old:bn,item:this});this.fireDataEvent(o,{start:0,end:bo-1,type:g,removed:bn,added:[]},null);return bn;}
,append:function(bp){if(bp instanceof qx.data.Array){bp=bp.toArray();}
;if(qx.core.Environment.get(k)){qx.core.Assert.assertArray(bp,m);}
;var bq=this.__Dd.length;Array.prototype.push.apply(this.__Dd,bp);for(var i=0;i<bp.length;i++ ){this._registerEventChaining(bp[i],null,bq+i);}
;var bq=this.length;this.__De();var name=bq==(this.length-1)?bq:bq+a+(this.length-1);this.fireDataEvent(r,{value:bp,name:name+f,old:[],item:this});this.fireDataEvent(o,{start:bq,end:this.length-1,type:b,added:bp,removed:[]},null);}
,remove:function(br){var bs=this.indexOf(br);if(bs!=-1){this.splice(bs,1).dispose();return br;}
;}
,equals:function(bt){if(this.length!==bt.length){return false;}
;for(var i=0;i<this.length;i++ ){if(this.getItem(i)!==bt.getItem(i)){return false;}
;}
;return true;}
,sum:function(){var bu=0;for(var i=0;i<this.length;i++ ){bu+=this.getItem(i);}
;return bu;}
,max:function(){var bv=this.getItem(0);for(var i=1;i<this.length;i++ ){if(this.getItem(i)>bv){bv=this.getItem(i);}
;}
;return bv===undefined?null:bv;}
,min:function(){var bw=this.getItem(0);for(var i=1;i<this.length;i++ ){if(this.getItem(i)<bw){bw=this.getItem(i);}
;}
;return bw===undefined?null:bw;}
,forEach:function(bx,by){for(var i=0;i<this.__Dd.length;i++ ){bx.call(by,this.__Dd[i],i,this);}
;}
,filter:function(bz,self){return new qx.data.Array(this.__Dd.filter(bz,self));}
,map:function(bA,self){return new qx.data.Array(this.__Dd.map(bA,self));}
,some:function(bB,self){return this.__Dd.some(bB,self);}
,every:function(bC,self){return this.__Dd.every(bC,self);}
,reduce:function(bE,bD){return this.__Dd.reduce(bE,bD);}
,reduceRight:function(bG,bF){return this.__Dd.reduceRight(bG,bF);}
,__De:function(){var bH=this.length;this.length=this.__Dd.length;this.fireDataEvent(s,this.length,bH);}
,__Df:function(bJ,bI){for(var i=bJ;i<bI;i++ ){this._registerEventChaining(this.__Dd[i],this.__Dd[i],i);}
;}
},destruct:function(){for(var i=0;i<this.__Dd.length;i++ ){var bK=this.__Dd[i];this._applyEventPropagation(null,bK,i);if(this.isAutoDisposeItems()&&bK&&bK instanceof qx.core.Object){bK.dispose();}
;}
;this.__Dd=null;}
});}
)();
(function(){var a="qx.ui.core.ISingleSelection",b="qx.event.type.Data";qx.Interface.define(a,{events:{"changeSelection":b},members:{getSelection:function(){return true;}
,setSelection:function(c){return arguments.length==1;}
,resetSelection:function(){return true;}
,isSelected:function(d){return arguments.length==1;}
,isSelectionEmpty:function(){return true;}
,getSelectables:function(e){return arguments.length==1;}
}});}
)();
(function(){var a="qx.ui.form.IModelSelection";qx.Interface.define(a,{members:{setModelSelection:function(b){}
,getModelSelection:function(){}
}});}
)();
(function(){var a="__Dg",b="_applyAllowEmptySelection",c="_applyInvalidMessage",d="qx.ui.form.RadioGroup",f="Boolean",g="_applyValid",h="",j="changeRequired",k="changeValid",m="changeEnabled",n="changeInvalidMessage",o="changeSelection",p="changeValue",q="_applyEnabled",r="String";qx.Class.define(d,{extend:qx.core.Object,implement:[qx.ui.core.ISingleSelection,qx.ui.form.IForm,qx.ui.form.IModelSelection],include:[qx.ui.core.MSingleSelectionHandling,qx.ui.form.MModelSelection],construct:function(s){qx.core.Object.call(this);this.__Dg=[];this.addListener(o,this.__Dh,this);if(s!=null){this.add.apply(this,arguments);}
;}
,properties:{enabled:{check:f,apply:q,event:m,init:true},wrap:{check:f,init:true},allowEmptySelection:{check:f,init:false,apply:b},valid:{check:f,init:true,apply:g,event:k},required:{check:f,init:false,event:j},invalidMessage:{check:r,init:h,event:n,apply:c},requiredInvalidMessage:{check:r,nullable:true,event:n}},members:{__Dg:null,getItems:function(){return this.__Dg;}
,add:function(u){var v=this.__Dg;var t;for(var i=0,l=arguments.length;i<l;i++ ){t=arguments[i];if(qx.lang.Array.contains(v,t)){continue;}
;t.addListener(p,this._onItemChangeChecked,this);v.push(t);t.setGroup(this);if(t.getValue()){this.setSelection([t]);}
;}
;if(!this.isAllowEmptySelection()&&v.length>0&&!this.getSelection()[0]){this.setSelection([v[0]]);}
;}
,remove:function(w){var x=this.__Dg;if(qx.lang.Array.contains(x,w)){qx.lang.Array.remove(x,w);if(w.getGroup()===this){w.resetGroup();}
;w.removeListener(p,this._onItemChangeChecked,this);if(w.getValue()){this.resetSelection();}
;}
;}
,getChildren:function(){return this.__Dg;}
,_onItemChangeChecked:function(e){var y=e.getTarget();if(y.getValue()){this.setSelection([y]);}
else if(this.getSelection()[0]==y){this.resetSelection();}
;}
,_applyInvalidMessage:function(A,z){for(var i=0;i<this.__Dg.length;i++ ){this.__Dg[i].setInvalidMessage(A);}
;}
,_applyValid:function(C,B){for(var i=0;i<this.__Dg.length;i++ ){this.__Dg[i].setValid(C);}
;}
,_applyEnabled:function(F,E){var D=this.__Dg;if(F==null){for(var i=0,l=D.length;i<l;i++ ){D[i].resetEnabled();}
;}
else {for(var i=0,l=D.length;i<l;i++ ){D[i].setEnabled(F);}
;}
;}
,_applyAllowEmptySelection:function(H,G){if(!H&&this.isSelectionEmpty()){this.resetSelection();}
;}
,selectNext:function(){var J=this.getSelection()[0];var K=this.__Dg;var I=K.indexOf(J);if(I==-1){return;}
;var i=0;var length=K.length;if(this.getWrap()){I=(I+1)%length;}
else {I=Math.min(I+1,length-1);}
;while(i<length&&!K[I].getEnabled()){I=(I+1)%length;i++ ;}
;this.setSelection([K[I]]);}
,selectPrevious:function(){var M=this.getSelection()[0];var N=this.__Dg;var L=N.indexOf(M);if(L==-1){return;}
;var i=0;var length=N.length;if(this.getWrap()){L=(L-1+length)%length;}
else {L=Math.max(L-1,0);}
;while(i<length&&!N[L].getEnabled()){L=(L-1+length)%length;i++ ;}
;this.setSelection([N[L]]);}
,_getItems:function(){return this.getItems();}
,_isAllowEmptySelection:function(){return this.isAllowEmptySelection();}
,_isItemSelectable:function(O){return this.__Dg.indexOf(O)!=-1;}
,__Dh:function(e){var Q=e.getData()[0];var P=e.getOldData()[0];if(P){P.setValue(false);}
;if(Q){Q.setValue(true);}
;}
},destruct:function(){this._disposeArray(a);}
});}
)();
(function(){var a="qx.ui.form.IBooleanForm",b="qx.event.type.Data";qx.Interface.define(a,{events:{"changeValue":b},members:{setValue:function(c){return arguments.length==1;}
,resetValue:function(){}
,getValue:function(){}
}});}
)();
(function(){var a="hovered",b="Boolean",c="pressed",d="_applyTriState",f="pointerover",g="changeValue",h="Space",i="keydown",j="abandoned",k="undetermined",l="_applyGroup",m="button",n="execute",o="Enter",p="qx.ui.form.RadioGroup",q="_applyValue",r="qx.ui.form.ToggleButton",s="pointerup",t="pointerdown",u="keyup",v="checked",w="pointerout";qx.Class.define(r,{extend:qx.ui.basic.Atom,include:[qx.ui.core.MExecutable],implement:[qx.ui.form.IBooleanForm,qx.ui.form.IExecutable,qx.ui.form.IRadioItem],construct:function(x,y){qx.ui.basic.Atom.call(this,x,y);this.addListener(f,this._onPointerOver);this.addListener(w,this._onPointerOut);this.addListener(t,this._onPointerDown);this.addListener(s,this._onPointerUp);this.addListener(i,this._onKeyDown);this.addListener(u,this._onKeyUp);this.addListener(n,this._onExecute,this);}
,properties:{appearance:{refine:true,init:m},focusable:{refine:true,init:true},value:{check:b,nullable:true,event:g,apply:q,init:false},group:{check:p,nullable:true,apply:l},triState:{check:b,apply:d,nullable:true,init:null}},members:{_applyGroup:function(A,z){if(z){z.remove(this);}
;if(A){A.add(this);}
;}
,_applyValue:function(C,B){C?this.addState(v):this.removeState(v);if(this.isTriState()){if(C===null){this.addState(k);}
else if(B===null){this.removeState(k);}
;}
;}
,_applyTriState:function(E,D){this._applyValue(this.getValue());}
,_onExecute:function(e){this.toggleValue();}
,_onPointerOver:function(e){if(e.getTarget()!==this){return;}
;this.addState(a);if(this.hasState(j)){this.removeState(j);this.addState(c);}
;}
,_onPointerOut:function(e){if(e.getTarget()!==this){return;}
;this.removeState(a);if(this.hasState(c)){if(!this.getValue()){this.removeState(c);}
;this.addState(j);}
;}
,_onPointerDown:function(e){if(!e.isLeftPressed()){return;}
;this.capture();this.removeState(j);this.addState(c);e.stopPropagation();}
,_onPointerUp:function(e){this.releaseCapture();if(this.hasState(j)){this.removeState(j);}
else if(this.hasState(c)){this.execute();}
;this.removeState(c);e.stopPropagation();}
,_onKeyDown:function(e){switch(e.getKeyIdentifier()){case o:case h:this.removeState(j);this.addState(c);e.stopPropagation();};}
,_onKeyUp:function(e){if(!this.hasState(c)){return;}
;switch(e.getKeyIdentifier()){case o:case h:this.removeState(j);this.execute();this.removeState(c);e.stopPropagation();};}
}});}
)();
(function(){var a="changeModel",b="_applyModel",c="qx.ui.form.MModelProperty";qx.Mixin.define(c,{properties:{model:{nullable:true,event:a,apply:b,dereference:true}},members:{_applyModel:function(e,d){}
}});}
)();
(function(){var a="qx.ui.form.IModel",b="qx.event.type.Data";qx.Interface.define(a,{events:{"changeModel":b},members:{setModel:function(c){}
,getModel:function(){}
,resetModel:function(){}
}});}
)();
(function(){var a="label",b="qx.debug",c="checkbox",d="qx.ui.form.CheckBox",e="value",f="toolTipText",g="enabled",h="menu";qx.Class.define(d,{extend:qx.ui.form.ToggleButton,include:[qx.ui.form.MForm,qx.ui.form.MModelProperty],implement:[qx.ui.form.IForm,qx.ui.form.IModel],construct:function(i){if(qx.core.Environment.get(b)){this.assertArgumentsCount(arguments,0,1);}
;qx.ui.form.ToggleButton.call(this,i);this.setValue(false);}
,properties:{appearance:{refine:true,init:c},allowGrowX:{refine:true,init:false}},members:{_forwardStates:{invalid:true,focused:true,undetermined:true,checked:true,hovered:true},_bindableProperties:[g,a,f,e,h]}});}
)();
(function(){var a="resetPaddingRight",b="setPaddingTop",c="_applyContentPadding",d="setPaddingBottom",e="resetThemed",f="contentPaddingRight",g="Integer",h="contentPaddingLeft",i="setThemedPaddingLeft",j="resetPaddingTop",k="shorthand",l="setThemedPaddingRight",m="setThemed",n="setPaddingRight",o="contentPaddingBottom",p="resetPaddingBottom",q="qx.ui.core.MContentPadding",r="resetPaddingLeft",s="setThemedPaddingTop",t="setPaddingLeft",u="setThemedPaddingBottom",v="contentPaddingTop";qx.Mixin.define(q,{properties:{contentPaddingTop:{check:g,init:0,apply:c,themeable:true},contentPaddingRight:{check:g,init:0,apply:c,themeable:true},contentPaddingBottom:{check:g,init:0,apply:c,themeable:true},contentPaddingLeft:{check:g,init:0,apply:c,themeable:true},contentPadding:{group:[v,f,o,h],mode:k,themeable:true}},members:{__HK:{contentPaddingTop:b,contentPaddingRight:n,contentPaddingBottom:d,contentPaddingLeft:t},__HL:{contentPaddingTop:s,contentPaddingRight:l,contentPaddingBottom:u,contentPaddingLeft:i},__HM:{contentPaddingTop:j,contentPaddingRight:a,contentPaddingBottom:p,contentPaddingLeft:r},_applyContentPadding:function(z,w,name,y){var A=this._getContentPaddingTarget();if(z==null){var x=this.__HM[name];A[x]();}
else {if(y==m||y==e){var B=this.__HL[name];A[B](z);}
else {var B=this.__HK[name];A[B](z);}
;}
;}
}});}
)();
(function(){var a="PageUp",b="Boolean",c="_applyEditable",d="_applyWrap",f="changeValue",g="keydown",h="Down",i="\-]",j="roll",k="execute",l="inner",m="PageDown",n="changeLocale",o="_applyValue",p="Up",q="downbutton",r="",s="number",t="textfield",u="_applyMinimum",v="qx.util.format.NumberFormat",w="qx.dynlocale",x="[0-9",y="upbutton",z="keyup",A="spinner",B="this._checkValue(value)",C="Number",D="wheel",E="_applyMaximum",F="changeNumberFormat",G="changeMaximum",H="changeMinimum",I="_applyNumberFormat",J="qx.ui.form.Spinner";qx.Class.define(J,{extend:qx.ui.core.Widget,implement:[qx.ui.form.INumberForm,qx.ui.form.IRange,qx.ui.form.IForm],include:[qx.ui.core.MContentPadding,qx.ui.form.MForm],construct:function(N,M,K){qx.ui.core.Widget.call(this);var L=new qx.ui.layout.Grid();L.setColumnFlex(0,1);L.setRowFlex(0,1);L.setRowFlex(1,1);this._setLayout(L);this.addListener(g,this._onKeyDown,this);this.addListener(z,this._onKeyUp,this);this.addListener(j,this._onRoll,this);if(qx.core.Environment.get(w)){qx.locale.Manager.getInstance().addListener(n,this._onChangeLocale,this);}
;this._createChildControl(t);this._createChildControl(y);this._createChildControl(q);if(N!=null){this.setMinimum(N);}
;if(K!=null){this.setMaximum(K);}
;if(M!==undefined){this.setValue(M);}
else {this.initValue();}
;}
,properties:{appearance:{refine:true,init:A},focusable:{refine:true,init:true},singleStep:{check:C,init:1},pageStep:{check:C,init:10},minimum:{check:C,apply:u,init:0,event:H},value:{check:B,nullable:true,apply:o,init:0,event:f},maximum:{check:C,apply:E,init:100,event:G},wrap:{check:b,init:false,apply:d},editable:{check:b,init:true,apply:c},numberFormat:{check:v,apply:I,nullable:true},allowShrinkY:{refine:true,init:false}},members:{__HN:null,__HO:false,__HP:false,_createChildControlImpl:function(Q,P){var O;switch(Q){case t:O=new qx.ui.form.TextField();O.setFilter(this._getFilterRegExp());O.addState(l);O.setWidth(40);O.setFocusable(false);O.addListener(f,this._onTextChange,this);this._add(O,{column:0,row:0,rowSpan:2});break;case y:O=new qx.ui.form.RepeatButton();O.addState(l);O.setFocusable(false);O.addListener(k,this._countUp,this);this._add(O,{column:1,row:0});break;case q:O=new qx.ui.form.RepeatButton();O.addState(l);O.setFocusable(false);O.addListener(k,this._countDown,this);this._add(O,{column:1,row:1});break;};return O||qx.ui.core.Widget.prototype._createChildControlImpl.call(this,Q);}
,_getFilterRegExp:function(){var S,W,U;if(this.getNumberFormat()!==null){U=this.getNumberFormat().getLocale();}
else {U=qx.locale.Manager.getInstance().getLocale();}
;S=qx.locale.Number.getDecimalSeparator(U);W=qx.locale.Number.getGroupSeparator(U);var V=r;var T=r;if(this.getNumberFormat()!==null){V=this.getNumberFormat().getPrefix()||r;T=this.getNumberFormat().getPostfix()||r;}
;var R=new RegExp(x+qx.lang.String.escapeRegexpChars(S)+qx.lang.String.escapeRegexpChars(W)+qx.lang.String.escapeRegexpChars(V)+qx.lang.String.escapeRegexpChars(T)+i);return R;}
,_forwardStates:{focused:true,invalid:true},tabFocus:function(){var X=this.getChildControl(t);X.getFocusElement().focus();X.selectAllText();}
,_applyMinimum:function(ba,Y){if(this.getMaximum()<ba){this.setMaximum(ba);}
;if(this.getValue()<ba){this.setValue(ba);}
else {this._updateButtons();}
;}
,_applyMaximum:function(bc,bb){if(this.getMinimum()>bc){this.setMinimum(bc);}
;if(this.getValue()>bc){this.setValue(bc);}
else {this._updateButtons();}
;}
,_applyEnabled:function(be,bd){qx.ui.core.Widget.prototype._applyEnabled.call(this,be,bd);this._updateButtons();}
,_checkValue:function(bf){return typeof bf===s&&bf>=this.getMinimum()&&bf<=this.getMaximum();}
,_applyValue:function(bi,bh){var bg=this.getChildControl(t);this._updateButtons();this.__HN=bi;if(bi!==null){if(this.getNumberFormat()){bg.setValue(this.getNumberFormat().format(bi));}
else {bg.setValue(bi+r);}
;}
else {bg.setValue(r);}
;}
,_applyEditable:function(bl,bk){var bj=this.getChildControl(t);if(bj){bj.setReadOnly(!bl);}
;}
,_applyWrap:function(bn,bm){this._updateButtons();}
,_applyNumberFormat:function(bq,bp){var bo=this.getChildControl(t);bo.setFilter(this._getFilterRegExp());if(bp){bp.removeListener(F,this._onChangeNumberFormat,this);}
;var br=this.getNumberFormat();if(br!==null){br.addListener(F,this._onChangeNumberFormat,this);}
;this._applyValue(this.__HN,undefined);}
,_getContentPaddingTarget:function(){return this.getChildControl(t);}
,_updateButtons:function(){var bt=this.getChildControl(y);var bs=this.getChildControl(q);var bu=this.getValue();if(!this.getEnabled()){bt.setEnabled(false);bs.setEnabled(false);}
else {if(this.getWrap()){bt.setEnabled(true);bs.setEnabled(true);}
else {if(bu!==null&&bu<this.getMaximum()){bt.setEnabled(true);}
else {bt.setEnabled(false);}
;if(bu!==null&&bu>this.getMinimum()){bs.setEnabled(true);}
else {bs.setEnabled(false);}
;}
;}
;}
,_onKeyDown:function(e){switch(e.getKeyIdentifier()){case a:this.__HO=true;case p:this.getChildControl(y).press();break;case m:this.__HP=true;case h:this.getChildControl(q).press();break;default:return;};e.stopPropagation();e.preventDefault();}
,_onKeyUp:function(e){switch(e.getKeyIdentifier()){case a:this.getChildControl(y).release();this.__HO=false;break;case p:this.getChildControl(y).release();break;case m:this.getChildControl(q).release();this.__HP=false;break;case h:this.getChildControl(q).release();break;};}
,_onRoll:function(e){if(e.getPointerType()!=D){return;}
;var bv=e.getDelta().y;if(bv<0){this._countUp();}
else if(bv>0){this._countDown();}
;e.stop();}
,_onTextChange:function(e){var bw=this.getChildControl(t);var bx;if(this.getNumberFormat()){try{bx=this.getNumberFormat().parse(bw.getValue());}
catch(by){}
;}
;if(bx===undefined){bx=parseFloat(bw.getValue());}
;if(!isNaN(bx)){if(bx>this.getMaximum()){bx=this.getMaximum();}
else if(bx<this.getMinimum()){bx=this.getMinimum();}
;if(bx===this.__HN){this._applyValue(this.__HN);}
else {this.setValue(bx);}
;}
else {this._applyValue(this.__HN,undefined);}
;}
,_onChangeLocale:function(bA){if(this.getNumberFormat()!==null){this.setNumberFormat(this.getNumberFormat());var bz=this.getChildControl(t);bz.setFilter(this._getFilterRegExp());bz.setValue(this.getNumberFormat().format(this.getValue()));}
;}
,_onChangeNumberFormat:function(bC){var bB=this.getChildControl(t);bB.setFilter(this._getFilterRegExp());bB.setValue(this.getNumberFormat().format(this.getValue()));}
,_countUp:function(){if(this.__HO){var bE=this.getValue()+this.getPageStep();}
else {var bE=this.getValue()+this.getSingleStep();}
;if(this.getWrap()){if(bE>this.getMaximum()){var bD=this.getMaximum()-bE;bE=this.getMinimum()-bD-1;}
;}
;this.gotoValue(bE);}
,_countDown:function(){if(this.__HP){var bG=this.getValue()-this.getPageStep();}
else {var bG=this.getValue()-this.getSingleStep();}
;if(this.getWrap()){if(bG<this.getMinimum()){var bF=this.getMinimum()+bG;bG=this.getMaximum()+bF+1;}
;}
;this.gotoValue(bG);}
,gotoValue:function(bH){return this.setValue(Math.min(this.getMaximum(),Math.max(this.getMinimum(),bH)));}
},destruct:function(){var bI=this.getNumberFormat();if(bI){bI.removeListener(F,this._onChangeNumberFormat,this);}
;if(qx.core.Environment.get(w)){qx.locale.Manager.getInstance().removeListener(n,this._onChangeLocale,this);}
;}
});}
)();
(function(){var a="-ms-input-placeholder",b="engine.version",c="changeValue",d="autoComplete: off;",f=".qx-abstract-field",g="browser.name",h="textarea",i="qx.event.type.Data",j="showingPlaceholder",k="focused",l="qx-placeholder-color",m=" !important",n="border-radius: 0;",o="browser.documentmode",p="qx.ui.form.AbstractField",q="-ms-input-placeholder, textarea.qx-placeholder-color",r="input",s="qx.dynlocale",t="maxLength",u="normal",v="qx-abstract-field",w="position: absolute;",x="String",y="margin: 0;",z="readOnly",A="text",B="syncAppearance",C="changeStatus",D="A",E="input::-moz-placeholder, textarea::-moz-placeholder",F="color",G="readonly",H="resize: none;",I="display : block;",J="Invalid value type: ",K="input.qx-placeholder-color::-webkit-input-placeholder, textarea.qx-placeholder-color::-webkit-input-placeholder",L="firefox",M="visible",N=":",O="input:-moz-placeholder, textarea:-moz-placeholder",P="_applyMaxLength",Q="outline: none;",R="background : transparent;",S="browser.version",T="pointerdown",U="spellcheck",V="focusin",W="mshtml",X="css.placeholder",Y="hidden",bP="border: none;",bQ="Boolean",bR="px",bL="url(",bM=")",bN="gecko",bO="change",bW="placeholder",bX="center",bY="input.qx-placeholder-color",ca="disabled",bS="textAlign",bT="appearance: none;",bU="color: ",bV="right",ce="PositiveInteger",cr="engine.name",cs="padding: 0;",cf="_applyPlaceholder",cb="left",cc="text-placeholder",cu="_applyTextAlign",cd="RegExp",cg="changeLocale",ch="::",ci="_applyReadOnly",cm="",cv="visibility",cn="appear",cj="false",ck="abstract",ct="focusout",cl="edge",co="webkit",cp="qx/static/blank.gif",cw="changeReadOnly",cq="absolute";qx.Class.define(p,{extend:qx.ui.core.Widget,implement:[qx.ui.form.IStringForm,qx.ui.form.IForm],include:[qx.ui.form.MForm],type:ck,statics:{__gR:null,__Do:function(){var cx=qx.core.Environment.get(cr);var cC=qx.core.Environment.get(g);var cy=qx.theme.manager.Color.getInstance();var cz=cy.resolve(cc);var cA;if(cx==bN){if(parseFloat(qx.core.Environment.get(b))>=19){cA=E;}
else {cA=O;}
;qx.ui.style.Stylesheet.getInstance().addRule(cA,bU+cz+m);}
else if(cx==co&&cC!=cl){cA=K;qx.ui.style.Stylesheet.getInstance().addRule(cA,bU+cz);}
else if(cx==W||cC==cl){var cB=cC==cl?ch:N;cA=[bY,q,a].join(cB);qx.ui.style.Stylesheet.getInstance().addRule(cA,bU+cz+m);}
;}
},construct:function(cD){qx.ui.core.Widget.call(this);this.__Dp=!qx.core.Environment.get(X);if(cD!=null){this.setValue(cD);}
;this.getContentElement().addListener(bO,this._onChangeContent,this);if(this.__Dp){this.addListener(B,this._syncPlaceholder,this);}
else {qx.ui.form.AbstractField.__Do();this.getContentElement().addClass(l);}
;if(qx.core.Environment.get(s)){qx.locale.Manager.getInstance().addListener(cg,this._onChangeLocale,this);}
;}
,events:{"input":i,"changeValue":i},properties:{textAlign:{check:[cb,bX,bV],nullable:true,themeable:true,apply:cu},readOnly:{check:bQ,apply:ci,event:cw,init:false},selectable:{refine:true,init:true},focusable:{refine:true,init:true},maxLength:{apply:P,check:ce,init:Infinity},liveUpdate:{check:bQ,init:false},placeholder:{check:x,nullable:true,apply:cf},filter:{check:cd,nullable:true,init:null}},members:{__fK:true,_placeholder:null,__nA:null,__wD:null,__Dp:true,__BT:null,__BW:null,getFocusElement:function(){var cE=this.getContentElement();if(cE){return cE;}
;}
,_createInputElement:function(){return new qx.html.Input(A);}
,renderLayout:function(cN,top,cI,cG){var cF=this._updateInsets;var cL=qx.ui.core.Widget.prototype.renderLayout.call(this,cN,top,cI,cG);if(!cL){return;}
;var cJ=cL.size||cF;var cM=bR;if(cJ||cL.local||cL.margin){var innerWidth=cI;var innerHeight=cG;}
;var cK=this.getContentElement();if(cF&&this.__Dp){if(this.__Dp){var cH=this.getInsets();this._getPlaceholderElement().setStyles({paddingTop:cH.top+cM,paddingRight:cH.right+cM,paddingBottom:cH.bottom+cM,paddingLeft:cH.left+cM});}
;}
;if(cJ||cL.margin){if(this.__Dp){var cH=this.getInsets();this._getPlaceholderElement().setStyles({"width":(innerWidth-cH.left-cH.right)+cM,"height":(innerHeight-cH.top-cH.bottom)+cM});}
;cK.setStyles({"width":innerWidth+cM,"height":innerHeight+cM});this._renderContentElement(innerHeight,cK);}
;if(cL.position){if(this.__Dp){this._getPlaceholderElement().setStyles({"left":cN+cM,"top":top+cM});}
;}
;}
,_renderContentElement:function(innerHeight,cO){}
,_createContentElement:function(){var cP=this._createInputElement();cP.setSelectable(this.getSelectable());cP.setEnabled(this.getEnabled());cP.addListener(r,this._onHtmlInput,this);cP.setAttribute(U,cj);cP.addClass(v);if((qx.core.Environment.get(cr)==W)&&(qx.core.Environment.get(o)==8)){cP.setStyles({backgroundImage:bL+qx.util.ResourceManager.getInstance().toUri(cp)+bM});}
;return cP;}
,_applyEnabled:function(cS,cR){qx.ui.core.Widget.prototype._applyEnabled.call(this,cS,cR);this.getContentElement().setEnabled(cS);if(this.__Dp){if(cS){this._showPlaceholder();}
else {this._removePlaceholder();}
;}
else {var cQ=this.getContentElement();cQ.setAttribute(bW,cS?this.getPlaceholder():cm);}
;}
,__Dq:{width:16,height:16},_getContentHint:function(){return {width:this.__Dq.width*10,height:this.__Dq.height||16};}
,_applyFont:function(cV,cU){if(cU&&this.__BT&&this.__BW){this.__BT.removeListenerById(this.__BW);this.__BW=null;}
;var cT;if(cV){this.__BT=qx.theme.manager.Font.getInstance().resolve(cV);if(this.__BT instanceof qx.bom.webfonts.WebFont){this.__BW=this.__BT.addListener(C,this._onWebFontStatusChange,this);}
;cT=this.__BT.getStyles();}
else {cT=qx.bom.Font.getDefaultStyles();}
;if(this.getTextColor()!=null){delete cT[F];}
;if(qx.core.Environment.get(cr)==W&&qx.core.Environment.get(o)<11){qx.html.Element.flush();this.getContentElement().setStyles(cT,true);}
else {this.getContentElement().setStyles(cT);}
;if(this.__Dp){delete cT[F];this._getPlaceholderElement().setStyles(cT);}
;if(cV){this.__Dq=qx.bom.Label.getTextSize(D,cT);}
else {delete this.__Dq;}
;qx.ui.core.queue.Layout.add(this);}
,_applyTextColor:function(cX,cW){if(cX){this.getContentElement().setStyle(F,qx.theme.manager.Color.getInstance().resolve(cX));}
else {this.getContentElement().removeStyle(F);}
;}
,_applyMaxLength:function(da,cY){if(da){this.getContentElement().setAttribute(t,da);}
else {this.getContentElement().removeAttribute(t);}
;}
,tabFocus:function(){qx.ui.core.Widget.prototype.tabFocus.call(this);this.selectAllText();}
,_getTextSize:function(){return this.__Dq;}
,_onHtmlInput:function(e){var dd=e.getData();var dc=true;this.__fK=false;if(this.__wD&&this.__wD===dd){dc=false;}
;if(this.getFilter()!=null){var df=cm;var db=dd.search(this.getFilter());var de=dd;while(db>=0){df=df+(de.charAt(db));de=de.substring(db+1,de.length);db=de.search(this.getFilter());}
;if(df!=dd){dc=false;dd=df;this.getContentElement().setValue(dd);}
;}
;if(dc){this.fireDataEvent(r,dd,this.__wD);this.__wD=dd;if(this.getLiveUpdate()){this.__fM(dd);}
;}
;}
,_onWebFontStatusChange:function(dh){if(dh.getData().valid===true){var dg=this.__BT.getStyles();this.__Dq=qx.bom.Label.getTextSize(D,dg);qx.ui.core.queue.Layout.add(this);}
;}
,__fM:function(dj){var di=this.__nA;this.__nA=dj;if(di!=dj){this.fireNonBubblingEvent(c,qx.event.type.Data,[dj,di]);}
;}
,setValue:function(dn){if(this.isDisposed()){return null;}
;if(dn===null){if(this.__fK){return dn;}
;dn=cm;this.__fK=true;}
else {this.__fK=false;if(this.__Dp){this._removePlaceholder();}
;}
;if(qx.lang.Type.isString(dn)){var dm=this.getContentElement();if(dm.getValue()!=dn){var dk=dm.getValue();dm.setValue(dn);var dl=this.__fK?null:dn;this.__nA=dk;this.__fM(dl);this.__wD=this.__nA;}
;if(this.__Dp){this._showPlaceholder();}
;return dn;}
;throw new Error(J+dn);}
,getValue:function(){return (this.isDisposed()||this.__fK)?null:this.getContentElement().getValue();}
,resetValue:function(){this.setValue(null);}
,_onChangeContent:function(e){this.__fK=e.getData()===null;this.__fM(e.getData());}
,getTextSelection:function(){return this.getContentElement().getTextSelection();}
,getTextSelectionLength:function(){return this.getContentElement().getTextSelectionLength();}
,getTextSelectionStart:function(){return this.getContentElement().getTextSelectionStart();}
,getTextSelectionEnd:function(){return this.getContentElement().getTextSelectionEnd();}
,setTextSelection:function(dp,dq){this.getContentElement().setTextSelection(dp,dq);}
,clearTextSelection:function(){this.getContentElement().clearTextSelection();}
,selectAllText:function(){this.setTextSelection(0);}
,setLayoutParent:function(parent){qx.ui.core.Widget.prototype.setLayoutParent.call(this,parent);if(this.__Dp){if(parent){this.getLayoutParent().getContentElement().add(this._getPlaceholderElement());}
else {var dr=this._getPlaceholderElement();dr.getParent().remove(dr);}
;}
;}
,_showPlaceholder:function(){var dt=this.getValue()||cm;var ds=this.getPlaceholder();if(ds!=null&&dt==cm&&!this.hasState(k)&&!this.hasState(ca)){if(this.hasState(j)){this._syncPlaceholder();}
else {this.addState(j);}
;}
;}
,_onPointerDownPlaceholder:function(){window.setTimeout(function(){this.focus();}
.bind(this),0);}
,_removePlaceholder:function(){if(this.hasState(j)){if(this.__Dp){this._getPlaceholderElement().setStyle(cv,Y);}
;this.removeState(j);}
;}
,_syncPlaceholder:function(){if(this.hasState(j)&&this.__Dp){this._getPlaceholderElement().setStyle(cv,M);}
;}
,_getPlaceholderElement:function(){if(this._placeholder==null){this._placeholder=new qx.html.Label();var du=qx.theme.manager.Color.getInstance();this._placeholder.setStyles({"zIndex":11,"position":cq,"color":du.resolve(cc),"whiteSpace":u,"cursor":A,"visibility":Y});this._placeholder.addListener(T,this._onPointerDownPlaceholder,this);}
;return this._placeholder;}
,_onChangeLocale:qx.core.Environment.select(s,{"true":function(e){var content=this.getPlaceholder();if(content&&content.translate){this.setPlaceholder(content.translate());}
;}
,"false":null}),_onChangeTheme:function(){qx.ui.core.Widget.prototype._onChangeTheme.call(this);if(this._placeholder){this._placeholder.dispose();this._placeholder=null;}
;if(!this.__Dp&&qx.ui.form.AbstractField.__gR){qx.bom.Stylesheet.removeSheet(qx.ui.form.AbstractField.__gR);qx.ui.form.AbstractField.__gR=null;qx.ui.form.AbstractField.__Do();}
;}
,_applyPlaceholder:function(dw,dv){if(this.__Dp){this._getPlaceholderElement().setValue(dw);if(dw!=null){this.addListener(V,this._removePlaceholder,this);this.addListener(ct,this._showPlaceholder,this);this._showPlaceholder();}
else {this.removeListener(V,this._removePlaceholder,this);this.removeListener(ct,this._showPlaceholder,this);this._removePlaceholder();}
;}
else {if(this.getEnabled()){this.getContentElement().setAttribute(bW,dw);if(qx.core.Environment.get(g)===L&&parseFloat(qx.core.Environment.get(S))<36&&this.getContentElement().getNodeName()===h&&!this.getContentElement().getDomElement()){this.addListenerOnce(cn,function(){this.getContentElement().getDomElement().removeAttribute(bW);this.getContentElement().getDomElement().setAttribute(bW,dw);}
,this);}
;}
;}
;}
,_applyTextAlign:function(dy,dx){this.getContentElement().setStyle(bS,dy);}
,_applyReadOnly:function(dA,dz){var dB=this.getContentElement();dB.setAttribute(z,dA);if(dA){this.addState(G);this.setFocusable(false);}
else {this.removeState(G);this.setFocusable(true);}
;}
},defer:function(dC){var dD=bP+cs+y+I+R+Q+bT+w+d+H+n;qx.ui.style.Stylesheet.getInstance().addRule(f,dD);}
,destruct:function(){if(this._placeholder){this._placeholder.removeListener(T,this._onPointerDownPlaceholder,this);var parent=this._placeholder.getParent();if(parent){parent.remove(this._placeholder);}
;this._placeholder.dispose();}
;this._placeholder=this.__BT=null;if(qx.core.Environment.get(s)){qx.locale.Manager.getInstance().removeListener(cg,this._onChangeLocale,this);}
;if(this.__BT&&this.__BW){this.__BT.removeListenerById(this.__BW);}
;this.getContentElement().removeListener(r,this._onHtmlInput,this);}
});}
)();
(function(){var a="engine.name",b="",c="wrap",d="none",e="Text wrapping is only support by textareas!",f="overflow",g="webkit",h="input",i="qx.html.Input",j="value",k="select",l="disabled",m="read-only",n="textarea",o="overflowX",p="overflowY";qx.Class.define(i,{extend:qx.html.Element,construct:function(s,q,r){if(s===k||s===n){var t=s;}
else {t=h;}
;qx.html.Element.call(this,t,q,r);this.__gI=s;}
,members:{__gI:null,__Dr:null,__Ds:null,_createDomElement:function(){return qx.bom.Input.create(this.__gI);}
,_applyProperty:function(name,u){qx.html.Element.prototype._applyProperty.call(this,name,u);var v=this.getDomElement();if(name===j){qx.bom.Input.setValue(v,u);}
else if(name===c){qx.bom.Input.setWrap(v,u);this.setStyle(f,v.style.overflow,true);this.setStyle(o,v.style.overflowX,true);this.setStyle(p,v.style.overflowY,true);}
;}
,setEnabled:function(w){this.__Ds=w;this.setAttribute(l,w===false);if(qx.core.Environment.get(a)==g){if(!w){this.setStyles({"userModify":m,"userSelect":d});}
else {this.setStyles({"userModify":null,"userSelect":this.__Dr?null:d});}
;}
;}
,setSelectable:qx.core.Environment.select(a,{"webkit":function(x){this.__Dr=x;qx.html.Element.prototype.setSelectable.call(this,this.__Ds&&x);}
,"default":function(y){qx.html.Element.prototype.setSelectable.call(this,y);}
}),setValue:function(z){var A=this.getDomElement();if(A){if(A.value!=z){qx.bom.Input.setValue(A,z);}
;}
else {this._setProperty(j,z);}
;return this;}
,getValue:function(){var B=this.getDomElement();if(B){return qx.bom.Input.getValue(B);}
;return this._getProperty(j)||b;}
,setWrap:function(C,D){if(this.__gI===n){this._setProperty(c,C,D);}
else {throw new Error(e);}
;return this;}
,getWrap:function(){if(this.__gI===n){return this._getProperty(c);}
else {throw new Error(e);}
;}
}});}
)();
(function(){var a="text",b="Unsupported input type.",c="nowrap",d="radio",e="textarea",f="auto",g="",h="qx.debug",j="input",k="option",m="value",n="select",o="soft",p="number",q="off",r="qx.bom.Input",s="normal",t="mshtml",u="engine.name",v="wrap",w="checkbox",x="select-one";qx.Bootstrap.define(r,{statics:{__pw:{text:1,textarea:1,select:1,checkbox:1,radio:1,password:1,hidden:1,submit:1,image:1,file:1,search:1,reset:1,button:1},create:function(A,B,y){if(qx.core.Environment.get(h)){qx.core.Assert.assertKeyInMap(A,this.__pw,b);}
;var B=B?qx.lang.Object.clone(B):{};var z;if(A===e||A===n){z=A;}
else {z=j;B.type=A;}
;return qx.dom.Element.create(z,B,y);}
,setValue:function(H,G){var I=H.nodeName.toLowerCase();var D=H.type;var Array=qx.lang.Array;var J=qx.lang.Type;if(typeof G===p){G+=g;}
;if((D===w||D===d)){if(J.isArray(G)){H.checked=Array.contains(G,H.value);}
else {H.checked=H.value==G;}
;}
else if(I===n){var C=J.isArray(G);var K=H.options;var E,F;for(var i=0,l=K.length;i<l;i++ ){E=K[i];F=E.getAttribute(m);if(F==null){F=E.text;}
;E.selected=C?Array.contains(G,F):G==F;}
;if(C&&G.length==0){H.selectedIndex=-1;}
;}
else if((D===a||D===e)&&(qx.core.Environment.get(u)==t)){H.$$inValueSet=true;H.value=G;H.$$inValueSet=null;}
else {H.value=G;}
;}
,getValue:function(S){var Q=S.nodeName.toLowerCase();if(Q===k){return (S.attributes.value||{}).specified?S.value:S.text;}
;if(Q===n){var L=S.selectedIndex;if(L<0){return null;}
;var R=[];var U=S.options;var P=S.type==x;var T=qx.bom.Input;var O;for(var i=P?L:0,N=P?L+1:U.length;i<N;i++ ){var M=U[i];if(M.selected){O=T.getValue(M);if(P){return O;}
;R.push(O);}
;}
;return R;}
else {return (S.value||g).replace(/\r/g,g);}
;}
,setWrap:qx.core.Environment.select(u,{"mshtml":function(Y,V){var X=V?o:q;var W=V?f:g;Y.wrap=X;Y.style.overflowY=W;}
,"gecko":function(bd,ba){var bc=ba?o:q;var bb=ba?g:f;bd.setAttribute(v,bc);bd.style.overflow=bb;}
,"webkit":function(bh,be){var bg=be?o:q;var bf=be?g:f;bh.setAttribute(v,bg);bh.style.overflow=bf;}
,"default":function(bj,bi){bj.style.whiteSpace=bi?s:c;}
})}});}
)();
(function(){var a="mshtml",b="engine.name",c="qx.ui.form.TextField",d="Enter",e='px',f="mobile",g="tablet",h="device.type",i="textfield",j="engine.version",k="keypress",l="browser.documentmode";qx.Class.define(c,{extend:qx.ui.form.AbstractField,properties:{appearance:{refine:true,init:i},allowGrowY:{refine:true,init:false},allowShrinkY:{refine:true,init:false}},members:{_renderContentElement:function(innerHeight,m){if((qx.core.Environment.get(b)==a)&&(parseInt(qx.core.Environment.get(j),10)<9||qx.core.Environment.get(l)<9)){m.setStyles({"line-height":innerHeight+e});}
;}
,_createContentElement:function(){var n=qx.ui.form.AbstractField.prototype._createContentElement.call(this);var o=qx.core.Environment.get(h);if(o==g||o==f){n.addListener(k,this._onKeyPress,this);}
;return n;}
,_onKeyPress:function(p){if(p.getKeyIdentifier()==d){if(this.isFocusable()){this.blur();}
else {this.setFocusable(true);this.blur();this.setFocusable(false);}
;}
;}
},destruct:function(){this.getContentElement().removeListener(k,this._onKeyPress,this);}
});}
)();
(function(){var a="cldr_number_decimal_separator",b="cldr_number_percent_format",c="qx.locale.Number",d="cldr_number_group_separator";qx.Class.define(c,{statics:{getDecimalSeparator:function(e){return qx.locale.Manager.getInstance().localize(a,[],e);}
,getGroupSeparator:function(f){return qx.locale.Manager.getInstance().localize(d,[],f);}
,getPercentFormat:function(g){return qx.locale.Manager.getInstance().localize(b,[],g);}
}});}
)();
(function(){var a="keypress",b="Boolean",c="Right",d="label",f="qx.debug",g="Left",h="_applyValue",i="changeValue",j="Up",k="value",l="qx.ui.form.RadioButton",m="radiobutton",n="toolTipText",o="enabled",p="qx.ui.form.RadioGroup",q="Down",r="_applyGroup",s="checked",t="menu",u="execute";qx.Class.define(l,{extend:qx.ui.form.Button,include:[qx.ui.form.MForm,qx.ui.form.MModelProperty],implement:[qx.ui.form.IRadioItem,qx.ui.form.IForm,qx.ui.form.IBooleanForm,qx.ui.form.IModel],construct:function(v){if(qx.core.Environment.get(f)){this.assertArgumentsCount(arguments,0,1);}
;qx.ui.form.Button.call(this,v);this.addListener(u,this._onExecute);this.addListener(a,this._onKeyPress);}
,properties:{group:{check:p,nullable:true,apply:r},value:{check:b,nullable:true,event:i,apply:h,init:false},appearance:{refine:true,init:m},allowGrowX:{refine:true,init:false}},members:{_forwardStates:{checked:true,focused:true,invalid:true,hovered:true},_bindableProperties:[o,d,n,k,t],_applyValue:function(x,w){x?this.addState(s):this.removeState(s);}
,_applyGroup:function(z,y){if(y){y.remove(this);}
;if(z){z.add(this);}
;}
,_onExecute:function(e){var A=this.getGroup();if(A&&A.getAllowEmptySelection()){this.toggleValue();}
else {this.setValue(true);}
;}
,_onKeyPress:function(e){var B=this.getGroup();if(!B){return;}
;switch(e.getKeyIdentifier()){case g:case j:B.selectPrevious();break;case c:case q:B.selectNext();break;};}
}});}
)();
(function(){var a="enum",b="center",c="%",d="south",e="int",f="west",g="north",h="east",i="string",j="demobrowser.demo.util.LayoutPropertyGroup";qx.Class.define(j,{extend:demobrowser.demo.util.PropertyGroup,statics:{BOX_PROPERTIES:{"flex":{type:e,min:-1000,nullable:true}},BASIC_PROPERTIES:{"top":{type:e,min:-1000,nullable:true},"left":{type:e,min:-1000,nullable:true}},CANVAS_PROPERTIES:{"top":{type:i,nullable:true,convert:function(k){if(parseInt(k).toString()==k){k=parseInt(k);}
;return k||null;}
},"right":{type:i,nullable:true,convert:function(l){if(parseInt(l).toString()==l){l=parseInt(l);}
;return l||null;}
},"bottom":{type:i,nullable:true,convert:function(m){if(parseInt(m).toString()==m){m=parseInt(m);}
;return m||null;}
},"left":{type:i,nullable:true,convert:function(n){if(parseInt(n).toString()==n){n=parseInt(n);}
;return n||null;}
},"width":{type:e,nullable:true,convert:function(o){return o==null?null:o+c;}
},"height":{type:e,nullable:true,convert:function(p){return p==null?null:p+c;}
}},DOCK_PROPERTIES:{"width":{type:e,nullable:true,convert:function(q){return q==null?null:q+c;}
},"height":{type:e,nullable:true,convert:function(r){return r==null?null:r+c;}
},"edge":{type:a,values:[g,h,d,f,b],nullable:false}},GRID_PROPERTIES:{"row":{type:e,nullable:false},"column":{type:e,nullable:false},"rowSpan":{type:e,nullable:true},"colSpan":{type:e,nullable:true}}},members:{_setProperty:function(s,name,u){var t=this._properties[name].convert;if(t){u=t(u);}
;var v={};v[name]=u;s.setLayoutProperties(v);}
,_getProperty:function(w,name){return w.getLayoutProperties()[name]||null;}
,_hasProperty:function(x,name){return true;}
}});}
)();
(function(){var a="east",b="yellow",c="west",d="red",e="center",f="north",g="south",h="demobrowser.demo.layout.Dock",i="x",j="green",k="fuchsia",l="orange",m="main",n="y",o="blue";qx.Class.define(h,{extend:demobrowser.demo.util.LayoutApplication,members:{main:function(){demobrowser.demo.util.LayoutApplication.prototype.main.call(this);var scroll=new qx.ui.container.Scroll();this.getRoot().add(scroll,{edge:0});var q=new qx.ui.container.Composite(new qx.ui.layout.VBox(20)).set({padding:20});scroll.add(q);var p=new qx.ui.container.Composite(new qx.ui.layout.Dock()).set({decorator:m,backgroundColor:b,allowGrowX:false});var w=new qx.ui.core.Widget().set({decorator:m,backgroundColor:d});var v=new qx.ui.core.Widget().set({decorator:m,backgroundColor:o});var u=new qx.ui.core.Widget().set({decorator:m,backgroundColor:l});var t=new qx.ui.core.Widget().set({decorator:m,backgroundColor:j});var s=new qx.ui.core.Widget().set({decorator:m,backgroundColor:k});p.add(w,{edge:f});p.add(v,{edge:c});p.add(u,{edge:g});p.add(t,{edge:a});p.add(s,{edge:e});q.add(p);var r=new qx.ui.layout.Dock();r.setSort(n);var p=(new qx.ui.container.Composite(r)).set({decorator:m,backgroundColor:b,allowGrowX:false});var w=new qx.ui.core.Widget().set({decorator:m,backgroundColor:d});var v=new qx.ui.core.Widget().set({decorator:m,backgroundColor:o});var u=new qx.ui.core.Widget().set({decorator:m,backgroundColor:l});var t=new qx.ui.core.Widget().set({decorator:m,backgroundColor:j});var s=new qx.ui.core.Widget().set({decorator:m,backgroundColor:k});p.add(w,{edge:f});p.add(v,{edge:c});p.add(u,{edge:g});p.add(t,{edge:a});p.add(s,{edge:e});q.add(p);var r=new qx.ui.layout.Dock();r.setSort(i);var p=(new qx.ui.container.Composite(r)).set({decorator:m,backgroundColor:b,allowGrowX:false});var w=new qx.ui.core.Widget().set({decorator:m,backgroundColor:d});var v=new qx.ui.core.Widget().set({decorator:m,backgroundColor:o});var u=new qx.ui.core.Widget().set({decorator:m,backgroundColor:l});var t=new qx.ui.core.Widget().set({decorator:m,backgroundColor:j});var s=new qx.ui.core.Widget().set({decorator:m,backgroundColor:k});p.add(w,{edge:f});p.add(v,{edge:c});p.add(u,{edge:g});p.add(t,{edge:a});p.add(s,{edge:e});q.add(p);}
}});}
)();
(function(){var a="qx.ui.container.Scroll",b="pane";qx.Class.define(a,{extend:qx.ui.core.scroll.AbstractScrollArea,include:[qx.ui.core.MContentPadding],construct:function(content){qx.ui.core.scroll.AbstractScrollArea.call(this);if(content){this.add(content);}
;}
,members:{add:function(c){this.getChildControl(b).add(c);}
,remove:function(d){this.getChildControl(b).remove(d);}
,getChildren:function(){return this.getChildControl(b).getChildren();}
,_getContentPaddingTarget:function(){return this.getChildControl(b);}
}});}
)();
(function(){var a="JosefinSlab",b="Verdana",c="qx/decoration/Indigo/font/JosefinSlab-SemiBold.ttf",d="qx/decoration/Indigo/font/JosefinSlab-SemiBold.woff",e="Lucida Grande",f="sans-serif",g="qx.theme.indigo.Font",h="monospace",i="font",j="serif",k="DejaVu Sans",l="Courier New",m="DejaVu Sans Mono";qx.Theme.define(g,{fonts:{"default":{size:12,family:[e,k,b,f],color:i,lineHeight:1.8},"bold":{size:12,family:[e,k,b,f],bold:true,color:i,lineHeight:1.8},"headline":{size:22,family:[j],sources:[{family:a,source:[d,c]}]},"small":{size:11,family:[e,k,b,f],color:i,lineHeight:1.8},"monospace":{size:11,family:[m,l,h],color:i,lineHeight:1.8}}});}
)();
(function(){var a="table-row-background-even",b="button-box-pressed-top-right",c="arrow-left",d="datechooser-weekday",e="arrow-up",f="menu-slidebar-button",g="background-disabled",h="background",j="scrollbar/button",k="icon/16/actions/dialog-ok.png",l="border-invalid",m="combobox/button",n="button-box-top-right",o="slidebar",p="#BABABA",q="button-box-hovered-bottom-right",r="move-frame",s="nodrop",t="window-caption",u="table-header-cell",v="button-box-hovered-top-right",w="row-layer",x="treevirtual-plus-only",y="-right",z="button-frame",A="radiobutton",B="move",C="treevirtual-plus-end",D="background-selected-dark",E="vertical",F="list",G="arrow-down-small",H="arrow-down",I="arrow-",J="-pressed",K="tooltip-error",L="button-box",M="window-restore",N="bold",O="resize-frame",P="text-disabled",Q="scroll-knob",R="tree-minus",S="statusbar",T="white",U="tabview-close",V="down",W="text",X="checkbox",Y="atom/label",eJ="button-box-pressed-bottom-right",eF="button-box-pressed-hovered-bottom-right",eK="background-disabled-checked",eG="groupbox",eH="icon/16/actions/dialog-cancel.png",eE="qx.theme.simple.Appearance",eI="menu-slidebar",eP="-left",eQ="treevirtual-minus-cross",eW="arrow-right",eR="background-pane",eL="table-",eM="scroll-knob-pressed",eN="icon",eO="arrow-rewind",eV="icon/16/apps/office-calendar.png",fz="headline",eX="treevirtual-plus-start",eY="treevirtual-minus-end",eS="middle",eT="-middle",gA="tree",eU="checkbox-undetermined",fa="button-box-bottom-right",fb="datechooser-week",fc="menu-button",fh="descending",fi="splitpane",fj="slidebar/button-forward",fd="toolbar-separator",fe="arrow-up-small",ff="progressive-table-header",fg="invalid",fn="icon/16/places/folder.png",fo="combobox",fp="tree-folder",fq="horizontal",fk="icon/16/mimetypes/text-plain.png",fl="border-light-shadow",gB="tree-plus",fm="text-placeholder",fu="scrollbar",fv="dragover",gG="treevirtual-plus-cross",fw="scrollarea",fr="treevirtual-line",fs="text-selected",gE="cell",ft="menu-checkbox",fx="best-fit",fy="button-border",fK="treevirtual-cross",fJ="default",fI="tabview-page-button-right",fO="button-hover",fN="tabview-page-button-top",fM="tabview-page-button-bottom",fL="inset",fD="tabview-page-button-left",fC="button",fB="menubar-button-pressed",fA="progressbar",fH="tree-file",fG="tooltip-text",fF="keep-align",fE="center",fV="datechooser/button",fU="alias",fT="datechooser",fS="toolbar-button",ga="ascending",fY="button-box-hovered-right-borderless",fX="button-box-right-borderless",fW="lead-item",fR="checkbox-focused",fQ="selectbox",fP="window-minimize",gl="right",gk="button-box-pressed-hovered-top-right",gj="main",gp="image",go="knob-",gn="blank",gm="popup",ge="treevirtual-folder",gd="treevirtual-minus-only",gc="treevirtual-minus-start",gb="checkbox-checked",gi="virtual-list",gh="background-selected",gg="window",gf="-hovered",gv="window-active",gu="table-header-cell-first",gt="left",gs="button-box-pressed-right-borderless",gz="scroll-knob-hovered",gy="up",gx="atom",gw="main-dark",gr="select-column-order",gq="button-box-pressed-hovered-right-borderless",ed="-invalid",ec="scroll-knob-pressed-hovered",gH="white-box",ea="datechooser-week-header",eb="widget",dY="menubar-button-hovered",gF="table-header-column-button",dW="window-close",dX="datechooser-date-pane",dV="cursor-",gC="-focused",dT="menu-radiobutton",dU="window-maximize",dS="treevirtual-end",em="button-box-hovered",en="table",ek="arrow-forward",el="right-top",ei="pointer",ej="focused-inset",eh="slidebar/button-backward",dR="light-background",ef="copy",eg="table-row-background-selected",ee="radiobutton-focused",eA="",ey="textfield",ez="scrollbar/slider/knob",ew="button-box-pressed-hovered",ex="atom/icon",ev="spinner",eB="tooltip",et="-disabled",eu="label",es="table-header",gD="progressive-table-header-cell",eq="menu-separator",er="-invert",eo="link",ep="icon/16/places/folder-open.png",eC="icon/16/actions/view-refresh.png",eD="button-box-pressed";qx.Theme.define(eE,{appearances:{"widget":{},"label":{style:function(gI){return {textColor:gI.disabled?P:undefined};}
},"image":{style:function(gJ){return {opacity:!gJ.replacement&&gJ.disabled?0.3:undefined};}
},"atom":{},"atom/label":eu,"atom/icon":gp,"root":{style:function(gK){return {backgroundColor:h,textColor:W,font:fJ};}
},"popup":{style:function(gL){return {decorator:gm,backgroundColor:eR};}
},"tooltip":{include:gm,style:function(gM){return {backgroundColor:eB,textColor:fG,decorator:eB,padding:[1,3,2,3],offset:[10,5,5,5]};}
},"tooltip/atom":gx,"tooltip-error":{include:eB,style:function(gN){return {textColor:fs,showTimeout:100,hideTimeout:10000,decorator:K,font:N,backgroundColor:undefined};}
},"tooltip-error/atom":gx,"iframe":{style:function(gO){return {backgroundColor:T,decorator:gw};}
},"move-frame":{style:function(gP){return {decorator:gw};}
},"resize-frame":r,"dragdrop-cursor":{style:function(gQ){var gR=s;if(gQ.copy){gR=ef;}
else if(gQ.move){gR=B;}
else if(gQ.alias){gR=fU;}
;return {source:qx.theme.simple.Image.URLS[dV+gR],position:el,offset:[2,16,2,6]};}
},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:fC,include:fC,style:function(gS){return {icon:qx.theme.simple.Image.URLS[I+(gS.vertical?V:gl)]};}
},"slidebar/button-backward":{alias:fC,include:fC,style:function(gT){return {icon:qx.theme.simple.Image.URLS[I+(gT.vertical?gy:gt)]};}
},"table":eb,"table/statusbar":{style:function(gU){return {decorator:S,padding:[2,5]};}
},"table/column-button":{alias:fC,style:function(gV){return {decorator:gF,padding:3,icon:qx.theme.simple.Image.URLS[gr]};}
},"table-column-reset-button":{include:fc,alias:fc,style:function(){return {icon:eC};}
},"table-scroller/scrollbar-x":fu,"table-scroller/scrollbar-y":fu,"table-scroller":eb,"table-scroller/header":{style:function(){return {decorator:es};}
},"table-scroller/pane":{},"table-scroller/focus-indicator":{style:function(gW){return {decorator:gj};}
},"table-scroller/resize-line":{style:function(gX){return {backgroundColor:fy,width:3};}
},"table-header-cell":{alias:gx,style:function(gY){return {decorator:gY.first?gu:u,minWidth:13,font:N,paddingTop:3,paddingLeft:5,cursor:gY.disabled?undefined:ei,sortIcon:gY.sorted?(qx.theme.simple.Image.URLS[eL+(gY.sortedAscending?ga:fh)]):undefined};}
},"table-header-cell/icon":{include:ex,style:function(ha){return {paddingRight:5};}
},"table-header-cell/sort-icon":{style:function(hb){return {alignY:eS,alignX:gl,paddingRight:5};}
},"table-editor-textfield":{include:ey,style:function(hc){return {decorator:undefined,padding:[2,2]};}
},"table-editor-selectbox":{include:fQ,alias:fQ,style:function(hd){return {padding:[0,2]};}
},"table-editor-combobox":{include:fo,alias:fo,style:function(he){return {decorator:undefined};}
},"progressive-table-header":{style:function(hf){return {decorator:ff};}
},"progressive-table-header-cell":{style:function(hg){return {decorator:gD,padding:[5,6,5,6]};}
},"treevirtual":{include:ey,alias:en,style:function(hh,hi){return {padding:[hi.padding[0]+2,hi.padding[1]+1]};}
},"treevirtual-folder":{style:function(hj){return {icon:(hj.opened?ep:fn),opacity:hj.drag?0.5:undefined};}
},"treevirtual-file":{include:ge,alias:ge,style:function(hk){return {icon:fk,opacity:hk.drag?0.5:undefined};}
},"treevirtual-line":{style:function(hl){return {icon:qx.theme.simple.Image.URLS[fr]};}
},"treevirtual-contract":{style:function(hm){return {icon:qx.theme.simple.Image.URLS[R]};}
},"treevirtual-expand":{style:function(hn){return {icon:qx.theme.simple.Image.URLS[gB]};}
},"treevirtual-only-contract":{style:function(ho){return {icon:qx.theme.simple.Image.URLS[gd]};}
},"treevirtual-only-expand":{style:function(hp){return {icon:qx.theme.simple.Image.URLS[x]};}
},"treevirtual-start-contract":{style:function(hq){return {icon:qx.theme.simple.Image.URLS[gc]};}
},"treevirtual-start-expand":{style:function(hr){return {icon:qx.theme.simple.Image.URLS[eX]};}
},"treevirtual-end-contract":{style:function(hs){return {icon:qx.theme.simple.Image.URLS[eY]};}
},"treevirtual-end-expand":{style:function(ht){return {icon:qx.theme.simple.Image.URLS[C]};}
},"treevirtual-cross-contract":{style:function(hu){return {icon:qx.theme.simple.Image.URLS[eQ]};}
},"treevirtual-cross-expand":{style:function(hv){return {icon:qx.theme.simple.Image.URLS[gG]};}
},"treevirtual-end":{style:function(hw){return {icon:qx.theme.simple.Image.URLS[dS]};}
},"treevirtual-cross":{style:function(hx){return {icon:qx.theme.simple.Image.URLS[fK]};}
},"resizer":{style:function(hy){return {decorator:gw};}
},"splitpane":{},"splitpane/splitter":{style:function(hz){return {backgroundColor:dR};}
},"splitpane/splitter/knob":{style:function(hA){return {source:qx.theme.simple.Image.URLS[go+(hA.horizontal?fq:E)],padding:2};}
},"splitpane/slider":{style:function(hB){return {backgroundColor:fl,opacity:0.3};}
},"menu":{style:function(hC){var hD={backgroundColor:h,decorator:gj,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,padding:1,placementModeY:hC.submenu||hC.contextmenu?fx:fF};if(hC.submenu){hD.position=el;hD.offset=[-2,-3];}
;if(hC.contextmenu){hD.offset=4;}
;return hD;}
},"menu/slidebar":eI,"menu-slidebar":eb,"menu-slidebar-button":{style:function(hE){return {backgroundColor:hE.hovered?gh:undefined,padding:6,center:true};}
},"menu-slidebar/button-backward":{include:f,style:function(hF){return {icon:qx.theme.simple.Image.URLS[e+(hF.hovered?er:eA)]};}
},"menu-slidebar/button-forward":{include:f,style:function(hG){return {icon:qx.theme.simple.Image.URLS[H+(hG.hovered?er:eA)]};}
},"menu-separator":{style:function(hH){return {height:0,decorator:eq,marginTop:4,marginBottom:4,marginLeft:2,marginRight:2};}
},"menu-button":{alias:gx,style:function(hI){return {backgroundColor:hI.selected?gh:undefined,textColor:hI.selected?fs:undefined,padding:[2,6]};}
},"menu-button/icon":{include:gp,style:function(hJ){return {alignY:eS};}
},"menu-button/label":{include:eu,style:function(hK){return {alignY:eS,padding:1};}
},"menu-button/shortcut":{include:eu,style:function(hL){return {alignY:eS,marginLeft:14,padding:1};}
},"menu-button/arrow":{include:gp,style:function(hM){return {source:qx.theme.simple.Image.URLS[eW+(hM.selected?er:eA)],alignY:eS};}
},"menu-checkbox":{alias:fc,include:fc,style:function(hN){return {icon:!hN.checked?undefined:qx.theme.simple.Image.URLS[ft+(hN.selected?er:eA)]};}
},"menu-radiobutton":{alias:fc,include:fc,style:function(hO){return {icon:!hO.checked?undefined:qx.theme.simple.Image.URLS[dT+(hO.selected?er:eA)]};}
},"menubar":{style:function(hP){return {backgroundColor:dR,padding:[4,2]};}
},"menubar-button":{style:function(hQ){var hS;var hR=[2,6];if(!hQ.disabled){if(hQ.pressed){hS=fB;hR=[1,5,2,5];}
else if(hQ.hovered){hS=dY;hR=[1,5];}
;}
;return {padding:hR,cursor:hQ.disabled?undefined:ei,textColor:eo,decorator:hS};}
},"virtual-list":F,"virtual-list/row-layer":w,"row-layer":eb,"column-layer":eb,"group-item":{include:eu,alias:eu,style:function(hT){return {padding:4,backgroundColor:p,textColor:T,font:N};}
},"virtual-selectbox":fQ,"virtual-selectbox/dropdown":gm,"virtual-selectbox/dropdown/list":{alias:gi},"virtual-combobox":fo,"virtual-combobox/dropdown":gm,"virtual-combobox/dropdown/list":{alias:gi},"virtual-tree":{include:gA,alias:gA,style:function(hU){return {itemHeight:21};}
},"virtual-tree-folder":fp,"virtual-tree-file":fH,"cell":{style:function(hV){return {backgroundColor:hV.selected?eg:a,textColor:hV.selected?fs:W,padding:[3,6]};}
},"cell-string":gE,"cell-number":{include:gE,style:function(hW){return {textAlign:gl};}
},"cell-image":gE,"cell-boolean":gE,"cell-atom":gE,"cell-date":gE,"cell-html":gE,"scrollbar":{},"scrollbar/slider":{},"scrollbar/slider/knob":{style:function(hX){var hY=Q;if(!hX.disabled){if(hX.hovered&&!hX.pressed&&!hX.checked){hY=gz;}
else if(hX.hovered&&(hX.pressed||hX.checked)){hY=ec;}
else if(hX.pressed||hX.checked){hY=eM;}
;}
;return {height:14,width:14,cursor:hX.disabled?undefined:ei,decorator:hY,minHeight:hX.horizontal?undefined:20,minWidth:hX.horizontal?20:undefined};}
},"scrollbar/button":{style:function(ia){var ib={};ib.padding=4;var ic=eA;if(ia.left){ic=gt;ib.marginRight=2;}
else if(ia.right){ic+=gl;ib.marginLeft=2;}
else if(ia.up){ic+=gy;ib.marginBottom=2;}
else {ic+=V;ib.marginTop=2;}
;ib.icon=qx.theme.simple.Image.URLS[I+ic];ib.cursor=ei;ib.decorator=L;return ib;}
},"scrollbar/button-begin":j,"scrollbar/button-end":j,"scrollarea/corner":{style:function(id){return {backgroundColor:h};}
},"scrollarea":eb,"scrollarea/pane":eb,"scrollarea/scrollbar-x":fu,"scrollarea/scrollbar-y":fu,"textfield":{style:function(ie){var ih;if(ie.disabled){ih=P;}
else if(ie.showingPlaceholder){ih=fm;}
else {ih=undefined;}
;var ii;var ig;if(ie.disabled){ii=fL;ig=[2,3];}
else if(ie.invalid){ii=l;ig=[1,2];}
else if(ie.focused){ii=ej;ig=[1,2];}
else {ig=[2,3];ii=fL;}
;return {decorator:ii,padding:ig,textColor:ih,backgroundColor:ie.disabled?g:T};}
},"textarea":ey,"radiobutton/icon":{style:function(ij){var ik=A;if(ij.focused&&!ij.invalid){ik=ee;}
;ik+=ij.invalid&&!ij.disabled?ed:eA;var il;if(ij.disabled&&ij.checked){il=eK;}
else if(ij.disabled){il=g;}
else if(ij.checked){il=gh;}
;return {decorator:ik,width:12,height:12,backgroundColor:il};}
},"radiobutton":{style:function(im){return {icon:qx.theme.simple.Image.URLS[gn]};}
},"form-renderer-label":{include:eu,style:function(){return {paddingTop:3};}
},"checkbox":{alias:gx,style:function(io){var ip;if(io.checked){ip=qx.theme.simple.Image.URLS[gb];}
else if(io.undetermined){ip=qx.theme.simple.Image.URLS[eU];}
else {ip=qx.theme.simple.Image.URLS[gn];}
;return {icon:ip,gap:6};}
},"checkbox/icon":{style:function(iq){var is=X;if(iq.focused&&!iq.invalid){is=fR;}
;is+=iq.invalid&&!iq.disabled?ed:eA;var ir;if(iq.checked){ir=2;}
else if(iq.undetermined){ir=[4,2];}
;return {decorator:is,width:12,height:12,padding:ir,backgroundColor:T};}
},"spinner":{style:function(it){return {textColor:it.disabled?P:undefined};}
},"spinner/textfield":ey,"spinner/upbutton":{alias:m,include:m,style:function(iu){var iv=n;if(iu.hovered&&!iu.pressed&&!iu.checked){iv=v;}
else if(iu.hovered&&(iu.pressed||iu.checked)){iv=gk;}
else if(iu.pressed||iu.checked){iv=b;}
;return {icon:qx.theme.simple.Image.URLS[fe],decorator:iv,width:17};}
},"spinner/downbutton":{alias:m,include:m,style:function(iw){var ix=fa;if(iw.hovered&&!iw.pressed&&!iw.checked){ix=q;}
else if(iw.hovered&&(iw.pressed||iw.checked)){ix=eF;}
else if(iw.pressed||iw.checked){ix=eJ;}
;return {icon:qx.theme.simple.Image.URLS[G],decorator:ix,width:17};}
},"selectbox":z,"selectbox/atom":gx,"selectbox/popup":gm,"selectbox/list":{alias:F,include:F,style:function(){return {decorator:undefined};}
},"selectbox/arrow":{include:gp,style:function(iy){return {source:qx.theme.simple.Image.URLS[H],paddingRight:4,paddingLeft:5};}
},"combobox":{},"combobox/button":{alias:z,include:z,style:function(iz){var iA=fX;if(iz.hovered&&!iz.pressed&&!iz.checked){iA=fY;}
else if(iz.hovered&&(iz.pressed||iz.checked)){iA=gq;}
else if(iz.pressed||iz.checked){iA=gs;}
;return {icon:qx.theme.simple.Image.URLS[H],decorator:iA,padding:[0,5],width:19};}
},"combobox/popup":gm,"combobox/list":{alias:F},"combobox/textfield":ey,"datefield":ey,"datefield/button":{alias:m,include:m,style:function(iB){return {icon:eV,padding:[0,0,0,3],backgroundColor:undefined,decorator:undefined,width:19};}
},"datefield/textfield":{alias:ey,include:ey,style:function(iC){return {decorator:undefined,padding:0};}
},"datefield/list":{alias:fT,include:fT,style:function(iD){return {decorator:undefined};}
},"list":{alias:fw,include:ey},"listitem":{alias:gx,style:function(iE){var iF=[3,5,3,5];if(iE.lead){iF=[2,4,2,4];}
;if(iE.dragover){iF[2]-=2;}
;var iG;if(iE.selected){iG=gh;if(iE.disabled){iG+=et;}
;}
;return {gap:4,padding:iF,backgroundColor:iG,textColor:iE.selected?fs:undefined,decorator:iE.lead?fW:iE.dragover?fv:undefined,opacity:iE.drag?0.5:undefined};}
},"slider":{style:function(iH){var iJ;var iI;if(iH.disabled){iJ=fL;iI=[2,3];}
else if(iH.invalid){iJ=l;iI=[1,2];}
else if(iH.focused){iJ=ej;iI=[1,2];}
else {iI=[2,3];iJ=fL;}
;return {decorator:iJ,padding:iI};}
},"slider/knob":ez,"button-frame":{alias:gx,style:function(iK){var iL=L;if(!iK.disabled){if(iK.hovered&&!iK.pressed&&!iK.checked){iL=em;}
else if(iK.hovered&&(iK.pressed||iK.checked)){iL=ew;}
else if(iK.pressed||iK.checked){iL=eD;}
;}
;if(iK.invalid&&!iK.disabled){iL+=ed;}
else if(iK.focused){iL+=gC;}
;return {decorator:iL,padding:[3,8],cursor:iK.disabled?undefined:ei,minWidth:5,minHeight:5};}
},"button-frame/label":{alias:Y,style:function(iM){return {textColor:iM.disabled?P:undefined};}
},"button":{alias:z,include:z,style:function(iN){return {center:true};}
},"hover-button":{alias:fC,include:fC,style:function(iO){return {decorator:iO.hovered?fO:undefined};}
},"menubutton":{include:fC,alias:fC,style:function(iP){return {icon:qx.theme.simple.Image.URLS[H],iconPosition:gl};}
},"splitbutton":{},"splitbutton/button":{alias:gx,style:function(iQ){var iR=L;if(!iQ.disabled){if(iQ.pressed||iQ.checked){iR+=J;}
;if(iQ.hovered){iR+=gf;}
;}
;if(iQ.focused){iR+=gC;}
;iR+=eP;return {decorator:iR,padding:[3,8],cursor:iQ.disabled?undefined:ei};}
},"splitbutton/arrow":{style:function(iS){var iT=L;if(!iS.disabled){if(iS.pressed||iS.checked){iT+=J;}
;if(iS.hovered){iT+=gf;}
;}
;if(iS.focused){iT+=gC;}
;iT+=y;return {icon:qx.theme.simple.Image.URLS[H],decorator:iT,cursor:iS.disabled?undefined:ei,padding:[3,4]};}
},"groupbox":{},"groupbox/legend":{alias:gx,style:function(iU){return {textColor:iU.invalid?fg:undefined,padding:5,margin:4,font:N};}
},"groupbox/frame":{style:function(iV){return {backgroundColor:h,padding:[6,9],margin:[18,2,2,2],decorator:gH};}
},"check-groupbox":eG,"check-groupbox/legend":{alias:X,include:X,style:function(iW){return {textColor:iW.invalid?fg:undefined,padding:5,margin:4,font:N};}
},"radio-groupbox":eG,"radio-groupbox/legend":{alias:A,include:A,style:function(iX){return {textColor:iX.invalid?fg:undefined,padding:5,margin:4,font:N};}
},"tree-folder/open":{include:gp,style:function(iY){return {source:iY.opened?qx.theme.simple.Image.URLS[R]:qx.theme.simple.Image.URLS[gB]};}
},"tree-folder":{style:function(ja){var jb;if(ja.selected){jb=gh;if(ja.disabled){jb+=et;}
;}
;return {padding:[2,8,2,5],icon:ja.opened?ep:fn,backgroundColor:jb,iconOpened:ep,opacity:ja.drag?0.5:undefined};}
},"tree-folder/icon":{include:gp,style:function(jc){return {padding:[0,4,0,0]};}
},"tree-folder/label":{style:function(jd){return {padding:[1,2],textColor:jd.selected&&!jd.disabled?fs:undefined};}
},"tree-file":{include:fp,alias:fp,style:function(je){return {icon:fk,opacity:je.drag?0.5:undefined};}
},"tree":{include:F,alias:F,style:function(jf){return {contentPadding:jf.invalid&&!jf.disabled?[3,0]:[4,1],padding:jf.focused?0:1};}
},"window":{style:function(jg){return {contentPadding:[10,10,10,10],backgroundColor:h,decorator:jg.maximized?undefined:jg.active?gv:gg};}
},"window-resize-frame":O,"window/pane":{},"window/captionbar":{style:function(jh){return {backgroundColor:jh.active?dR:g,padding:8,font:N,decorator:t};}
},"window/icon":{style:function(ji){return {marginRight:4};}
},"window/title":{style:function(jj){return {cursor:fJ,font:N,marginRight:20,alignY:eS};}
},"window/minimize-button":{alias:fC,style:function(jk){return {icon:qx.theme.simple.Image.URLS[fP],padding:[1,2],cursor:jk.disabled?undefined:ei};}
},"window/restore-button":{alias:fC,style:function(jl){return {icon:qx.theme.simple.Image.URLS[M],padding:[1,2],cursor:jl.disabled?undefined:ei};}
},"window/maximize-button":{alias:fC,style:function(jm){return {icon:qx.theme.simple.Image.URLS[dU],padding:[1,2],cursor:jm.disabled?undefined:ei};}
},"window/close-button":{alias:fC,style:function(jn){return {marginLeft:2,icon:qx.theme.simple.Image.URLS[dW],padding:[1,2],cursor:jn.disabled?undefined:ei};}
},"window/statusbar":{style:function(jo){return {decorator:S,padding:[2,6]};}
},"window/statusbar-text":eu,"datechooser":{style:function(jp){return {decorator:gj,minWidth:220};}
},"datechooser/navigation-bar":{style:function(jq){return {backgroundColor:h,textColor:jq.disabled?P:jq.invalid?fg:undefined,padding:[2,10]};}
},"datechooser/last-year-button-tooltip":eB,"datechooser/last-month-button-tooltip":eB,"datechooser/next-year-button-tooltip":eB,"datechooser/next-month-button-tooltip":eB,"datechooser/last-year-button":fV,"datechooser/last-month-button":fV,"datechooser/next-year-button":fV,"datechooser/next-month-button":fV,"datechooser/button/icon":{},"datechooser/button":{style:function(jr){var js={width:17,show:eN,cursor:jr.disabled?undefined:ei};if(jr.lastYear){js.icon=qx.theme.simple.Image.URLS[eO];}
else if(jr.lastMonth){js.icon=qx.theme.simple.Image.URLS[c];}
else if(jr.nextYear){js.icon=qx.theme.simple.Image.URLS[ek];}
else if(jr.nextMonth){js.icon=qx.theme.simple.Image.URLS[eW];}
;return js;}
},"datechooser/month-year-label":{style:function(jt){return {font:N,textAlign:fE};}
},"datechooser/date-pane":{style:function(ju){return {decorator:dX,backgroundColor:h};}
},"datechooser/weekday":{style:function(jv){return {decorator:d,font:N,textAlign:fE,textColor:jv.disabled?P:jv.weekend?D:h,backgroundColor:jv.weekend?h:D,paddingTop:2};}
},"datechooser/day":{style:function(jw){return {textAlign:fE,decorator:jw.today?gj:undefined,textColor:jw.disabled?P:jw.selected?fs:jw.otherMonth?P:undefined,backgroundColor:jw.disabled?undefined:jw.selected?gh:undefined,padding:jw.today?[1,3]:[2,4]};}
},"datechooser/week":{style:function(jx){return {textAlign:fE,textColor:D,padding:[2,4],decorator:jx.header?ea:fb};}
},"progressbar":{style:function(jy){return {decorator:fA,padding:1,backgroundColor:T,width:200,height:20};}
},"progressbar/progress":{style:function(jz){return {backgroundColor:jz.disabled?eK:gh};}
},"toolbar":{style:function(jA){return {backgroundColor:dR,padding:0};}
},"toolbar/part":{style:function(jB){return {margin:[0,15]};}
},"toolbar/part/container":{},"toolbar/part/handle":{},"toolbar-separator":{style:function(jC){return {decorator:fd,margin:[7,0],width:4};}
},"toolbar-button":{alias:gx,style:function(jD){var jF=L;if(jD.disabled){jF=L;}
else if(jD.hovered&&!jD.pressed&&!jD.checked){jF=em;}
else if(jD.hovered&&(jD.pressed||jD.checked)){jF=ew;}
else if(jD.pressed||jD.checked){jF=eD;}
;if(jD.left){jF+=eP;}
else if(jD.right){jF+=y;}
else if(jD.middle){jF+=eT;}
;var jE=[7,10];if(jD.left||jD.middle||jD.right){jE=[7,0];}
;return {cursor:jD.disabled?undefined:ei,decorator:jF,margin:jE,padding:[3,5]};}
},"toolbar-menubutton":{alias:fS,include:fS,style:function(jG){return {showArrow:true};}
},"toolbar-menubutton/arrow":{alias:gp,include:gp,style:function(jH){return {source:qx.theme.simple.Image.URLS[H],cursor:jH.disabled?undefined:ei,padding:[0,5],marginLeft:2};}
},"toolbar-splitbutton":{},"toolbar-splitbutton/button":{alias:fS,include:fS,style:function(jI){var jJ=L;if(jI.disabled){jJ=L;}
else if(jI.hovered&&!jI.pressed&&!jI.checked){jJ=em;}
else if(jI.hovered&&(jI.pressed||jI.checked)){jJ=ew;}
else if(jI.pressed||jI.checked){jJ=eD;}
;if(jI.left){jJ+=eP;}
else if(jI.right){jJ+=eT;}
else if(jI.middle){jJ+=eT;}
;return {icon:qx.theme.simple.Image.URLS[H],decorator:jJ};}
},"toolbar-splitbutton/arrow":{alias:fS,include:fS,style:function(jK){var jL=L;if(jK.disabled){jL=L;}
else if(jK.hovered&&!jK.pressed&&!jK.checked){jL=em;}
else if(jK.hovered&&(jK.pressed||jK.checked)){jL=ew;}
else if(jK.pressed||jK.checked){jL=eD;}
;if(jK.left){jL+=eT;}
else if(jK.right){jL+=y;}
else if(jK.middle){jL+=eT;}
;return {icon:qx.theme.simple.Image.URLS[H],decorator:jL};}
},"tabview":{},"tabview/bar":{alias:o,style:function(jM){var jN=0,jQ=0,jO=0,jP=0;if(jM.barTop){jO-=1;}
else if(jM.barBottom){jN-=1;}
else if(jM.barRight){jP-=1;}
else {jQ-=1;}
;return {marginBottom:jO,marginTop:jN,marginLeft:jP,marginRight:jQ};}
},"tabview/bar/button-forward":{include:fj,alias:fj,style:function(jR){if(jR.barTop){return {marginTop:4,marginBottom:2,decorator:null};}
else if(jR.barBottom){return {marginTop:2,marginBottom:4,decorator:null};}
else if(jR.barLeft){return {marginLeft:4,marginRight:2,decorator:null};}
else {return {marginLeft:2,marginRight:4,decorator:null};}
;}
},"tabview/bar/button-backward":{include:eh,alias:eh,style:function(jS){if(jS.barTop){return {marginTop:4,marginBottom:2,decorator:null};}
else if(jS.barBottom){return {marginTop:2,marginBottom:4,decorator:null};}
else if(jS.barLeft){return {marginLeft:4,marginRight:2,decorator:null};}
else {return {marginLeft:2,marginRight:4,decorator:null};}
;}
},"tabview/pane":{style:function(jT){return {backgroundColor:h,decorator:gj,padding:10};}
},"tabview-page":eb,"tabview-page/button":{style:function(jU){var jW;if(jU.barTop||jU.barBottom){var jV=[8,16,8,13];}
else {var jV=[8,4,8,4];}
;if(jU.checked){if(jU.barTop){jW=fN;}
else if(jU.barBottom){jW=fM;}
else if(jU.barRight){jW=fI;}
else if(jU.barLeft){jW=fD;}
;}
else {for(var i=0;i<jV.length;i++ ){jV[i]+=1;}
;if(jU.barTop){jV[2]-=1;}
else if(jU.barBottom){jV[0]-=1;}
else if(jU.barRight){jV[3]-=1;}
else if(jU.barLeft){jV[1]-=1;}
;}
;return {zIndex:jU.checked?10:5,decorator:jW,textColor:jU.disabled?P:jU.checked?null:eo,padding:jV,cursor:ei};}
},"tabview-page/button/label":{alias:eu,style:function(jX){return {padding:[0,1,0,1]};}
},"tabview-page/button/icon":gp,"tabview-page/button/close-button":{alias:gx,style:function(jY){return {cursor:jY.disabled?undefined:ei,icon:qx.theme.simple.Image.URLS[U]};}
},"colorpopup":{alias:gm,include:gm,style:function(ka){return {padding:5};}
},"colorpopup/field":{style:function(kb){return {margin:2,width:14,height:14,backgroundColor:h,decorator:gw};}
},"colorpopup/selector-button":fC,"colorpopup/auto-button":fC,"colorpopup/preview-pane":eG,"colorpopup/current-preview":{style:function(kc){return {height:20,padding:4,marginLeft:4,decorator:gw,allowGrowX:true};}
},"colorpopup/selected-preview":{style:function(kd){return {height:20,padding:4,marginRight:4,decorator:gw,allowGrowX:true};}
},"colorpopup/colorselector-okbutton":{alias:fC,include:fC,style:function(ke){return {icon:k};}
},"colorpopup/colorselector-cancelbutton":{alias:fC,include:fC,style:function(kf){return {icon:eH};}
},"colorselector":eb,"colorselector/control-bar":eb,"colorselector/visual-pane":eG,"colorselector/control-pane":eb,"colorselector/preset-grid":eb,"colorselector/colorbucket":{style:function(kg){return {decorator:gw,width:16,height:16};}
},"colorselector/preset-field-set":eG,"colorselector/input-field-set":{include:eG,alias:eG,style:function(){return {paddingTop:12};}
},"colorselector/preview-field-set":{include:eG,alias:eG,style:function(){return {paddingTop:12};}
},"colorselector/hex-field-composite":eb,"colorselector/hex-field":ey,"colorselector/rgb-spinner-composite":eb,"colorselector/rgb-spinner-red":ev,"colorselector/rgb-spinner-green":ev,"colorselector/rgb-spinner-blue":ev,"colorselector/hsb-spinner-composite":eb,"colorselector/hsb-spinner-hue":ev,"colorselector/hsb-spinner-saturation":ev,"colorselector/hsb-spinner-brightness":ev,"colorselector/preview-content-old":{style:function(kh){return {decorator:gw,width:50,height:25};}
},"colorselector/preview-content-new":{style:function(ki){return {decorator:gw,backgroundColor:T,width:50,height:25};}
},"colorselector/hue-saturation-field":{style:function(kj){return {decorator:gw,margin:5};}
},"colorselector/brightness-field":{style:function(kk){return {decorator:gw,margin:[5,7]};}
},"colorselector/hue-saturation-pane":eb,"colorselector/hue-saturation-handle":eb,"colorselector/brightness-pane":eb,"colorselector/brightness-handle":eb,"app-header":{style:function(kl){return {font:fz,textColor:fs,backgroundColor:D,padding:[8,12]};}
},"app-header-label":{style:function(km){return {paddingTop:5};}
},"app-splitpane":{alias:fi,style:function(kn){return {padding:[0,10,10,10],backgroundColor:dR};}
}}});}
)();
(function(){var a="decoration/table/select-column-order.png",b="decoration/treevirtual/end.gif",c="decoration/checkbox/checked.png",d="decoration/arrows/right.gif",e="decoration/window/maximize.gif",f="decoration/treevirtual/only_plus.gif",g="qx.theme.simple.Image",h="decoration/cursors/move.gif",i="decoration/menu/checkbox.gif",j="decoration/table/ascending.png",k="decoration/arrows/down-small.gif",l="decoration/checkbox/undetermined.png",m="decoration/splitpane/knob-vertical.png",n="decoration/arrows/forward.gif",o="decoration/arrows/up-small.gif",p="decoration/arrows/up-invert.gif",q="decoration/treevirtual/cross_plus.gif",r="decoration/window/minimize.gif",s="qx/static/blank.png",t="decoration/tree/minus.gif",u="decoration/arrows/down-invert.gif",v="decoration/arrows/right-invert.gif",w="decoration/cursors/alias.gif",x="decoration/splitpane/knob-horizontal.png",y="decoration/treevirtual/only_minus.gif",z="decoration/treevirtual/start_plus.gif",A="decoration/cursors/nodrop.gif",B="decoration/cursors/copy.gif",C="decoration/arrows/down.gif",D="decoration/treevirtual/end_plus.gif",E="decoration/treevirtual/start_minus.gif",F="decoration/treevirtual/cross.gif",G="decoration/menu/radiobutton.gif",H="decoration/treevirtual/line.gif",I="decoration/arrows/up.gif",J="decoration/tabview/close.gif",K="decoration/tree/plus.gif",L="decoration/arrows/rewind.gif",M="decoration/window/restore.gif",N="decoration/table/descending.png",O="decoration/menu/checkbox-invert.gif",P="decoration/treevirtual/cross_minus.gif",Q="decoration/treevirtual/end_minus.gif",R="decoration/arrows/left.gif",S="decoration/menu/radiobutton-invert.gif",T="decoration/window/close.gif";qx.Class.define(g,{extend:qx.core.Object,statics:{URLS:{"blank":s,"checkbox-checked":c,"checkbox-undetermined":l,"window-minimize":r,"window-maximize":e,"window-restore":M,"window-close":T,"cursor-copy":B,"cursor-move":h,"cursor-alias":w,"cursor-nodrop":A,"arrow-right":d,"arrow-left":R,"arrow-up":I,"arrow-down":C,"arrow-forward":n,"arrow-rewind":L,"arrow-down-small":k,"arrow-up-small":o,"arrow-up-invert":p,"arrow-down-invert":u,"arrow-right-invert":v,"knob-horizontal":x,"knob-vertical":m,"tree-minus":t,"tree-plus":K,"select-column-order":a,"table-ascending":j,"table-descending":N,"treevirtual-line":H,"treevirtual-minus-only":y,"treevirtual-plus-only":f,"treevirtual-minus-start":E,"treevirtual-plus-start":z,"treevirtual-minus-end":Q,"treevirtual-plus-end":D,"treevirtual-minus-cross":P,"treevirtual-plus-cross":q,"treevirtual-end":b,"treevirtual-cross":F,"menu-checkbox":i,"menu-checkbox-invert":O,"menu-radiobutton-invert":S,"menu-radiobutton":G,"tabview-close":J}}});}
)();
(function(){var a="knob-",b="window",c="vertical",d="font",e="window-caption-active",f="window-caption",g="headline",h="groupbox",i="background",j="splitpane",k="window-active",l="highlight",m="default",n="tree",o="middle",p="horizontal",q="app-header",r="text-selected",s="light-background",t="qx.theme.indigo.Appearance";qx.Theme.define(t,{extend:qx.theme.simple.Appearance,appearances:{"colorselector/input-field-set":{include:h,alias:h,style:function(){return {paddingTop:0};}
},"colorselector/preview-field-set":{include:h,alias:h,style:function(){return {paddingTop:0};}
},"toolbar":{style:function(u){return {backgroundColor:s,padding:[4,0]};}
},"splitpane/splitter/knob":{style:function(v){return {source:qx.theme.simple.Image.URLS[a+(v.horizontal?p:c)],padding:3};}
},"window":{style:function(w){return {contentPadding:[10,10,10,10],backgroundColor:w.maximized?i:undefined,decorator:w.maximized?undefined:w.active?k:b};}
},"window/captionbar":{style:function(x){var y=x.active&&!x.disabled;return {padding:[3,8,y?1:3,8],textColor:y?l:d,decorator:y?e:f};}
},"window/title":{style:function(z){return {cursor:m,font:m,marginRight:20,alignY:o};}
},"virtual-tree":{include:n,alias:n,style:function(A){return {itemHeight:27};}
},"app-header":{style:function(B){return {font:g,textColor:r,decorator:q,padding:10};}
},"app-header-label":{style:function(C){return {paddingTop:5};}
},"app-splitpane":{alias:j,style:function(D){return {padding:[0,10,10,10],backgroundColor:s};}
}}});}
)();
(function(){var a="Tango",b="qx/icon/Tango",c="qx.theme.icon.Tango";qx.Theme.define(c,{title:a,aliases:{"icon":b}});}
)();
(function(){var a="button-box-dark-pressed",b="checkbox",c="tabview-page-button-top",d="button-border",e="table-header",f="button-box-invalid",g="button-border-hovered",h="menubar-button-hovered",i="button-box-dark",j="#999999",k="button-box-hovered-focused",l="solid",m="qx/decoration/Simple",n="dotted",o="border-separator",p="shadow",q="window-border",r="tooltip-text",s="button-box-hovered",t="table-focus-indicator",u="button-box-pressed-invalid",v="dark-blue",w="scrollbar-dark",x="radiobutton",y="scroll-knob",z="qx.theme.simple.Decoration",A="button-box-focused",B="table-header-cell",C="button",D="scroll-knob-pressed",E="border-lead",F="button-box-pressed-hovered",G="border-main",H="#FFF",I="button-box-pressed-focused",J="invalid",K="button-box",L="background",M="scrollbar-bright",N="button-box-bright",O="window-border-inner",P="border-light-shadow",Q="white-box-border",R="background-selected",S="window",T="white",U="gray",V="border-light",W="button-box-bright-pressed",X="button-box-pressed-hovered-focused",Y="button-box-pressed";qx.Theme.define(z,{aliases:{decoration:m},decorations:{"border-blue":{style:{width:4,color:R}},"main":{style:{width:1,color:G}},"main-dark":{style:{width:1,color:d}},"popup":{style:{width:1,color:q,shadowLength:2,shadowBlurRadius:5,shadowColor:p}},"dragover":{style:{bottom:[2,l,v]}},"button-box":{style:{radius:3,width:1,color:d,gradientStart:[N,40],gradientEnd:[i,70],backgroundColor:N}},"button-box-pressed":{include:K,style:{gradientStart:[W,40],gradientEnd:[a,70],backgroundColor:W}},"button-box-pressed-hovered":{include:Y,style:{color:g}},"button-box-hovered":{include:K,style:{color:g}},"button-box-invalid":{include:K,style:{color:J}},"button-box-pressed-invalid":{include:Y,style:{color:J}},"button-box-hovered-invalid":{include:f},"button-box-pressed-hovered-invalid":{include:u},"button-box-focused":{include:K,style:{color:R}},"button-box-pressed-focused":{include:Y,style:{color:R}},"button-box-hovered-focused":{include:A},"button-box-pressed-hovered-focused":{include:I},"button-box-right":{include:K,style:{radius:[0,3,3,0]}},"button-box-pressed-right":{include:Y,style:{radius:[0,3,3,0]}},"button-box-pressed-hovered-right":{include:F,style:{radius:[0,3,3,0]}},"button-box-hovered-right":{include:s,style:{radius:[0,3,3,0]}},"button-box-focused-right":{include:A,style:{radius:[0,3,3,0]}},"button-box-hovered-focused-right":{include:k,style:{radius:[0,3,3,0]}},"button-box-pressed-focused-right":{include:I,style:{radius:[0,3,3,0]}},"button-box-pressed-hovered-focused-right":{include:X,style:{radius:[0,3,3,0]}},"button-box-right-borderless":{include:K,style:{radius:[0,3,3,0],width:[1,1,1,0]}},"button-box-pressed-right-borderless":{include:Y,style:{radius:[0,3,3,0],width:[1,1,1,0]}},"button-box-pressed-hovered-right-borderless":{include:F,style:{radius:[0,3,3,0],width:[1,1,1,0]}},"button-box-hovered-right-borderless":{include:s,style:{radius:[0,3,3,0],width:[1,1,1,0]}},"button-box-top-right":{include:K,style:{radius:[0,3,0,0],width:[1,1,1,0]}},"button-box-pressed-top-right":{include:Y,style:{radius:[0,3,0,0],width:[1,1,1,0]}},"button-box-pressed-hovered-top-right":{include:F,style:{radius:[0,3,0,0],width:[1,1,1,0]}},"button-box-hovered-top-right":{include:s,style:{radius:[0,3,0,0],width:[1,1,1,0]}},"button-box-bottom-right":{include:K,style:{radius:[0,0,3,0],width:[0,1,1,0]}},"button-box-pressed-bottom-right":{include:Y,style:{radius:[0,0,3,0],width:[0,1,1,0]}},"button-box-pressed-hovered-bottom-right":{include:F,style:{radius:[0,0,3,0],width:[0,1,1,0]}},"button-box-hovered-bottom-right":{include:s,style:{radius:[0,0,3,0],width:[0,1,1,0]}},"button-box-bottom-left":{include:K,style:{radius:[0,0,0,3],width:[0,0,1,1]}},"button-box-pressed-bottom-left":{include:Y,style:{radius:[0,0,0,3],width:[0,0,1,1]}},"button-box-pressed-hovered-bottom-left":{include:F,style:{radius:[0,0,0,3],width:[0,0,1,1]}},"button-box-hovered-bottom-left":{include:s,style:{radius:[0,0,0,3],width:[0,0,1,1]}},"button-box-top-left":{include:K,style:{radius:[3,0,0,0],width:[1,0,0,1]}},"button-box-pressed-top-left":{include:Y,style:{radius:[3,0,0,0],width:[1,0,0,1]}},"button-box-pressed-hovered-top-left":{include:F,style:{radius:[3,0,0,0],width:[1,0,0,1]}},"button-box-hovered-top-left":{include:s,style:{radius:[3,0,0,0],width:[1,0,0,1]}},"button-box-middle":{include:K,style:{radius:0,width:[1,0,1,1]}},"button-box-pressed-middle":{include:Y,style:{radius:0,width:[1,0,1,1]}},"button-box-pressed-hovered-middle":{include:F,style:{radius:0,width:[1,0,1,1]}},"button-box-hovered-middle":{include:s,style:{radius:0,width:[1,0,1,1]}},"button-box-left":{include:K,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"button-box-pressed-left":{include:Y,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"button-box-pressed-hovered-left":{include:F,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"button-box-hovered-left":{include:s,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"button-box-focused-left":{include:A,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"button-box-hovered-focused-left":{include:k,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"button-box-pressed-hovered-focused-left":{include:X,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"button-box-pressed-focused-left":{include:I,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"separator-horizontal":{style:{widthLeft:1,colorLeft:o}},"separator-vertical":{style:{widthTop:1,colorTop:o}},"scroll-knob":{style:{radius:3,width:1,color:d,backgroundColor:M}},"scroll-knob-pressed":{include:y,style:{backgroundColor:w}},"scroll-knob-hovered":{include:y,style:{color:g}},"scroll-knob-pressed-hovered":{include:D,style:{color:g}},"button-hover":{style:{backgroundColor:C,radius:3}},"window":{style:{width:1,color:q,innerWidth:4,innerColor:O,shadowLength:1,shadowBlurRadius:3,shadowColor:p,backgroundColor:L}},"window-active":{include:S,style:{shadowLength:2,shadowBlurRadius:5}},"window-caption":{style:{width:[0,0,2,0],color:O}},"white-box":{style:{width:1,color:Q,shadowBlurRadius:2,shadowColor:j,radius:7,backgroundColor:T,shadowLength:0}},"inset":{style:{width:1,color:[P,V,V,V]}},"focused-inset":{style:{width:2,color:R}},"border-invalid":{style:{width:2,color:J}},"lead-item":{style:{width:1,style:n,color:E}},"tooltip":{style:{width:1,color:r,shadowLength:1,shadowBlurRadius:2,shadowColor:p}},"tooltip-error":{style:{radius:5,backgroundColor:J}},"toolbar-separator":{style:{widthLeft:1,colorLeft:d}},"menu-separator":{style:{widthTop:1,colorTop:R}},"menubar-button-hovered":{style:{width:1,color:G,radius:3,backgroundColor:T}},"menubar-button-pressed":{include:h,style:{radius:[3,3,0,0],width:[1,1,0,1]}},"datechooser-date-pane":{style:{widthTop:1,colorTop:U,style:l}},"datechooser-weekday":{style:{widthBottom:1,colorBottom:U,style:l}},"datechooser-week":{style:{widthRight:1,colorRight:U,style:l}},"datechooser-week-header":{style:{widthBottom:1,colorBottom:U,widthRight:1,colorRight:U,style:l}},"tabview-page-button-top":{style:{width:[1,1,0,1],backgroundColor:L,color:G,radius:[3,3,0,0]}},"tabview-page-button-bottom":{include:c,style:{radius:[0,0,3,3],width:[0,1,1,1]}},"tabview-page-button-left":{include:c,style:{radius:[3,0,0,3],width:[1,0,1,1]}},"tabview-page-button-right":{include:c,style:{radius:[0,3,3,0],width:[1,1,1,0]}},"statusbar":{style:{widthTop:1,colorTop:R,styleTop:l}},"table-scroller-focus-indicator":{style:{width:2,color:t,style:l}},"table-header":{include:K,style:{radius:0,width:[1,0,1,0]}},"table-header-column-button":{include:e,style:{width:1,color:d}},"table-header-cell":{style:{widthRight:1,color:d}},"table-header-cell-first":{include:B,style:{widthLeft:1}},"progressive-table-header":{include:K,style:{radius:0,width:[1,0,1,1]}},"progressive-table-header-cell":{style:{widthRight:1,color:d}},"progressbar":{style:{backgroundColor:H,width:1,color:o}},"radiobutton":{style:{radius:10,width:1,color:d,innerColor:L,innerWidth:2}},"radiobutton-focused":{include:x,style:{color:R}},"radiobutton-invalid":{include:x,style:{color:J}},"checkbox":{style:{width:1,color:d}},"checkbox-focused":{include:b,style:{color:R}},"checkbox-invalid":{include:b,style:{color:J}}}});}
)();
(function(){var a="qx.theme.indigo.Decoration",b="solid",c="window-border",d="white-box-border",e="#505154",f="background",g="highlight",h="border-main",i="white",j="highlight-shade",k="shadow",l="qx/decoration/Simple",m="#323335";qx.Theme.define(a,{extend:qx.theme.simple.Decoration,aliases:{decoration:l},decorations:{"window":{style:{width:1,color:c,shadowLength:1,shadowBlurRadius:3,shadowColor:k,backgroundColor:f,radius:3}},"window-caption":{style:{radius:[3,3,0,0],color:c,widthBottom:1}},"window-caption-active":{style:{radius:[3,3,0,0],color:g,widthBottom:3}},"white-box":{style:{width:1,color:d,backgroundColor:i}},"statusbar":{style:{widthTop:1,colorTop:h,styleTop:b}},"app-header":{style:{innerWidthBottom:1,innerColorBottom:j,widthBottom:9,colorBottom:g,gradientStart:[e,0],gradientEnd:[m,100],backgroundColor:m}}}});}
)();
(function(){var a="#D9D9D9",b="#BBBBBB",c="#24B",d="qx.theme.indigo.Color",e="#dddddd",f="#888888",g="#CCCCCC",h="rgba(0, 0, 0, 0.4)",i="#B7B7B7",j="#1866B5",k="#BABABA",l="black",m="#F7F7F7",n="#A7A6AA",o="#EBEBEB",p="#666666",q="#CBC8CD",r="#F9F9F9",s="#CDCDCD",t="#808080",u="#F4F4F4",v="#C00F00",w="#686868",x="white",y="#5583D0",z="#262626",A="css.rgba",B="#EEE",C="#3D72C9",D="#E3E3E3",E="#323335",F="#BBB",G="#FE0",H="#F1F1F1",I="#939393",J="#134983",K="gray",L="#E8F0E3",M="#AAAAAA";qx.Theme.define(d,{colors:{"background":x,"dark-blue":E,"light-background":u,"font":z,"highlight":C,"highlight-shade":y,"background-selected":C,"background-selected-disabled":s,"background-selected-dark":E,"background-disabled":m,"background-disabled-checked":b,"background-pane":x,"tabview-unselected":j,"tabview-button-border":J,"tabview-label-active-disabled":a,"link":c,"scrollbar-bright":H,"scrollbar-dark":o,"button":L,"button-border":F,"button-border-hovered":I,"invalid":v,"button-box-bright":r,"button-box-dark":D,"button-box-bright-pressed":k,"button-box-dark-pressed":o,"border-lead":f,"window-border":e,"window-border-inner":u,"white-box-border":e,"shadow":qx.core.Environment.get(A)?h:p,"border-main":e,"border-light":i,"border-light-shadow":w,"border-separator":t,"text":z,"text-disabled":n,"text-selected":x,"text-placeholder":q,"tooltip":G,"tooltip-text":l,"table-header":[242,242,242],"table-focus-indicator":C,"table-header-cell":[235,234,219],"table-row-background-focused-selected":C,"table-row-background-focused":u,"table-row-background-selected":[51,94,168],"table-row-background-even":x,"table-row-background-odd":x,"table-row-selected":[255,255,255],"table-row":[0,0,0],"table-row-line":B,"table-column-line":B,"progressive-table-header":M,"progressive-table-row-background-even":[250,248,243],"progressive-table-row-background-odd":[255,255,255],"progressive-progressbar-background":K,"progressive-progressbar-indicator-done":g,"progressive-progressbar-indicator-undone":x,"progressive-progressbar-percent-background":K,"progressive-progressbar-percent-text":x}});}
)();
(function(){var a="Indigo",b="qx.theme.Indigo";qx.Theme.define(b,{title:a,meta:{color:qx.theme.indigo.Color,decoration:qx.theme.indigo.Decoration,font:qx.theme.indigo.Font,appearance:qx.theme.indigo.Appearance,icon:qx.theme.icon.Tango}});}
)();
(function(){var a="sans-serif",b="monospace",c="Courier New",d="qx.theme.simple.Font",e="arial",f="DejaVu Sans Mono";qx.Theme.define(d,{fonts:{"default":{size:13,family:[e,a]},"bold":{size:13,family:[e,a],bold:true},"headline":{size:24,family:[a,e]},"small":{size:11,family:[e,a]},"monospace":{size:11,family:[f,c,b]}}});}
)();
(function(){var a="#D9D9D9",b="#1866B5",c="#24B",d="#FF0000",e="#CCCCCC",f="#5685D6",g="rgba(0, 0, 0, 0.4)",h="#FFFFE1",i="#B7B7B7",j="#BBBBBB",k="black",l="#9DCBFE",m="#A7A6AA",n="#EBEBEB",o="#666666",p="#CBC8CD",q="#F9F9F9",r="#CDCDCD",s="#808080",t="#F7F7F7",u="#6694E3",v="#686868",w="white",x="#888888",y="#E0ECFF",z="#2E3A46",A="css.rgba",B="#F5F5F5",C="#EEE",D="#E3E3E3",E="#DDDDDD",F="#BBB",G="qx.theme.simple.Color",H="#F1F1F1",I="#939393",J="#BCBCBC",K="#134983",L="gray",M="#E8F0E3",N="#FAFBFE",O="#AAAAAA";qx.Theme.define(G,{colors:{"background":w,"dark-blue":f,"light-background":y,"background-selected":u,"background-selected-disabled":r,"background-selected-dark":f,"background-disabled":t,"background-disabled-checked":j,"background-pane":N,"tabview-unselected":b,"tabview-button-border":K,"tabview-label-active-disabled":a,"link":c,"scrollbar-bright":H,"scrollbar-dark":n,"button":M,"button-border":F,"button-border-hovered":I,"invalid":d,"button-box-bright":q,"button-box-dark":D,"button-box-bright-pressed":E,"button-box-dark-pressed":B,"border-lead":x,"window-border":z,"window-border-inner":l,"white-box-border":J,"shadow":qx.core.Environment.get(A)?g:o,"border-main":u,"border-light":i,"border-light-shadow":v,"border-separator":s,"text":k,"text-disabled":m,"text-selected":w,"text-placeholder":p,"tooltip":h,"tooltip-text":k,"table-header":[242,242,242],"table-focus-indicator":[179,217,255],"table-header-cell":[235,234,219],"table-row-background-focused-selected":[90,138,211],"table-row-background-focused":[221,238,255],"table-row-background-selected":[51,94,168],"table-row-background-even":w,"table-row-background-odd":w,"table-row-selected":[255,255,255],"table-row":[0,0,0],"table-row-line":C,"table-column-line":C,"progressive-table-header":O,"progressive-table-row-background-even":[250,248,243],"progressive-table-row-background-odd":[255,255,255],"progressive-progressbar-background":L,"progressive-progressbar-indicator-done":e,"progressive-progressbar-indicator-undone":w,"progressive-progressbar-percent-background":L,"progressive-progressbar-percent-text":w}});}
)();
(function(){var a="Simple",b="qx.theme.Simple";qx.Theme.define(b,{title:a,meta:{color:qx.theme.simple.Color,decoration:qx.theme.simple.Decoration,font:qx.theme.simple.Font,appearance:qx.theme.simple.Appearance,icon:qx.theme.icon.Tango}});}
)();
(function(){var a="button-checked",b="window-resize-frame",c="decoration/window/maximize-active-hovered.png",d="radiobutton-hovered",e="decoration/arrows/right.png",f="background-application",g="keyboard-focus",h="group-item",i="scrollbar/button",j="decoration/cursors/",k="icon/16/actions/dialog-ok.png",l="border-invalid",m="combobox/button",n="input",o="slidebar",p="menu",q="table-scroller-focus-indicator",r="move-frame",s="nodrop",t="decoration/table/boolean-true.png",u="table-header-cell",v="app-header",w="row-layer",x="icon/16/places/folder.png",y="text-inactive",z="image",A="radiobutton",B="move",C="window-resize-frame-incl-statusbar",D="radiobutton-checked-focused",E="decoration/window/restore-active-hovered.png",F="window-captionbar-inactive",G="list",H="text-label",I="tree-folder",J="right.png",K="tabview-page-button-bottom-inactive",L="tooltip-error",M="decoration/tree/closed.png",N="window-statusbar",O="button-hovered",P="bold",Q="decoration/scrollbar/scrollbar-",R="background-tip",S="scrollbar-slider-horizontal-disabled",T="text-disabled",U="table-scroller-header",V="radiobutton-disabled",W="scrollbar-slider-horizontal",X="button-pressed",Y="table-pane",fD="decoration/window/close-active.png",fz="native",fE="checkbox-hovered",fA="decoration/window/minimize-active-hovered.png",fB="input-disabled",fw="virtual-list",fC="menubar",fJ="groupbox",fK="icon/16/actions/dialog-cancel.png",fL="tabview-page-button-top-inactive",fM="tabview-page-button-left-inactive",fF="menu-slidebar",fG="toolbar-button-checked",fH="decoration/arrows/left.png",fI="decoration/tree/open-selected.png",fQ="tree-item",gs="radiobutton-checked",fR="decoration/window/minimize-inactive.png",fS="menu-button",fN="button-focused",fO="icon/16/apps/office-calendar.png",ht="text-light",fP="menu-slidebar-button",fT="decoration/arrows/down.png",fU="middle",fV="group",gb="tree",gc="tabview-page-button-right-inactive",gd="decoration/window/minimize-active.png",fW="decoration/window/restore-inactive.png",fX="input-focused-invalid",fY="text-active",ga="splitpane",gh="text-input",gi="combobox/textfield",hy="decoration/window/close-active-hovered.png",gj="invalid",ge="qx/icon/Tango/16/actions/window-close.png",gf="combobox",hx="button-disabled",gg="tabview-page-button-left-active",gn="slidebar/button-forward",go="border-separator",hD="treevirtual-contract",gp="decoration/window/maximize-inactive.png",gk="scrollbar",gl="icon/22/places/folder-open.png",hB="right-top",gm="scrollarea",gq="background-splitpane",gr="datechooser/nav-button",gD="scrollbar-vertical",gC="decoration/toolbar/toolbar-handle-knob.gif",gB="icon/22/mimetypes/office-document.png",gH="text-selected",gG="cell",gF="button-checked-focused",gE="up.png",gw="best-fit",gv="decoration/tree/closed-selected.png",gu="text-hovered",gt="qx.theme.modern.Appearance",gA="decoration/tree/open.png",gz="default",gy="decoration/arrows/up-invert.png",gx="checkbox-disabled",gO="selected",gN="toolbar-button-hovered",gM="decoration/form/checked.png",gL="button",gS="progressive-table-header",gR="decoration/menu/radiobutton.gif",gQ="window-incl-statusbar",gP="decoration/arrows/down-small.png",gK="decoration/arrows/forward.png",gJ="decoration/table/descending.png",gI="decoration/form/undetermined.png",he="tree-file",hd="decoration/form/tooltip-error-arrow-right.png",hc="keep-align",hi="scrollbar-slider-vertical",hh="center",hg="toolbar",hf="alias",gW="decoration/window/restore-active.png",gV="datechooser",gU="toolbar-button",gT="decoration/table/boolean-false.png",hb="qx/static/blank.png",ha="window-pane",gY="icon/32/mimetypes/office-document.png",gX="slidebar/button-backward",ho="radiobutton-checked-disabled",hn="tabview-pane",hm="decoration/arrows/rewind.png",hl="checkbox-focused",hs="selectbox",hr="background-light",hq="top",hp="right",hk="main",hj="button-frame",eB="progressbar-background",eA="radiobutton-checked-hovered",hE="popup",ey="treevirtual-folder",ez="checkbox",ex="table-header-cell-hovered",hC="window",ev="icon/16/mimetypes/office-document.png",ew="treevirtual-expand",eu="text-gray",hz="left",es="decoration/menu/radiobutton-invert.gif",et="text-placeholder",er="atom",eK="text-title",eL="slider",eI="background-medium",eJ="decoration/table/select-column-order.png",eG="down.png",eH="widget",eF="groupitem-text",eq="tabview-page-button-top-active",eD="icon/32/places/folder-open.png",eE="icon/22/places/folder.png",eC="decoration/window/maximize-active.png",eY="decoration/window/close-inactive.png",eW="toolbar-part",eX="decoration/splitpane/knob-vertical.png",eU="left.png",eV="decoration/menu/checkbox-invert.gif",eT="table",hw="decoration/arrows/up.png",eR="table-statusbar",eS="decoration/form/tooltip-error-arrow.png",eQ="window-captionbar-active",hA="copy",eO="radiobutton-focused",eP="decoration/arrows/down-invert.png",eM="decoration/menu/checkbox.gif",eN="",fh="window-caption-active-text",fi="decoration/splitpane/knob-horizontal.png",ff="textfield",fg="icon/32/places/folder.png",fd="toolbar-separator",fe="tabview-page-button-bottom-active",fc="decoration/arrows/up-small.png",hv="decoration/table/ascending.png",fa="small",fb="tabview-page-button-right-active",fv="spinner",hu="tooltip",fx="-disabled",fs="label",fr="scrollbar-horizontal",fu="-invalid",ft="progressbar",fo="progressive-table-header-cell",fn="menu-separator",fq="pane",fp="decoration/arrows/right-invert.png",fk="icon/16/places/folder-open.png",fj="qx/static/blank.gif",fm=".gif",fl="icon/16/actions/view-refresh.png",fy="input-focused";qx.Theme.define(gt,{appearances:{"widget":{},"root":{style:function(hF){return {backgroundColor:f,textColor:H,font:gz};}
},"label":{style:function(hG){return {textColor:hG.disabled?T:undefined};}
},"move-frame":{style:function(hH){return {decorator:hk};}
},"resize-frame":r,"dragdrop-cursor":{style:function(hI){var hJ=s;if(hI.copy){hJ=hA;}
else if(hI.move){hJ=B;}
else if(hI.alias){hJ=hf;}
;return {source:j+hJ+fm,position:hB,offset:[2,16,2,6]};}
},"image":{style:function(hK){return {opacity:!hK.replacement&&hK.disabled?0.3:1};}
},"atom":{},"atom/label":fs,"atom/icon":z,"popup":{style:function(hL){return {decorator:hE,backgroundColor:hr};}
},"button-frame":{alias:er,style:function(hM){var hP,hO;var hN=[3,9];if(hM.checked&&hM.focused&&!hM.inner){hP=gF;hO=undefined;hN=[1,7];}
else if(hM.disabled){hP=hx;hO=undefined;}
else if(hM.pressed){hP=X;hO=gu;}
else if(hM.checked){hP=a;hO=undefined;}
else if(hM.hovered){hP=O;hO=gu;}
else if(hM.focused&&!hM.inner){hP=fN;hO=undefined;hN=[1,7];}
else {hP=gL;hO=undefined;}
;if(hM.invalid&&!hM.disabled){hP+=fu;}
;return {decorator:hP,textColor:hO,padding:hN,margin:[1,0]};}
},"button-frame/image":{style:function(hQ){return {opacity:!hQ.replacement&&hQ.disabled?0.5:1};}
},"button":{alias:hj,include:hj,style:function(hR){return {center:true};}
},"hover-button":{alias:er,include:er,style:function(hS){var hT=hS.hovered?gO:undefined;return {decorator:hT,textColor:hS.hovered?gH:undefined};}
},"menubutton":{include:gL,alias:gL,style:function(hU){return {icon:fT,iconPosition:hp};}
},"splitbutton":{},"splitbutton/button":gL,"splitbutton/arrow":{alias:gL,include:gL,style:function(hV,hW){return {icon:fT,padding:[hW.padding[0],hW.padding[1]-6],marginLeft:1};}
},"form-renderer-label":{include:fs,style:function(){return {paddingTop:4};}
},"checkbox":{alias:er,style:function(hX){var hY;if(hX.checked){hY=gM;}
else if(hX.undetermined){hY=gI;}
else {hY=fj;}
;return {icon:hY,minWidth:14,gap:8,paddingLeft:2};}
},"checkbox/icon":{style:function(ia){var ic;if(ia.disabled){ic=gx;}
else if(ia.focused){ic=hl;}
else if(ia.hovered){ic=fE;}
else {ic=ez;}
;ic+=ia.invalid&&!ia.disabled?fu:eN;var ib=ia.undetermined?[3,1]:1;return {decorator:ic,padding:ib,width:10,height:10};}
},"radiobutton":{alias:er,style:function(id){return {icon:hb,gap:8,paddingLeft:2};}
},"radiobutton/icon":{style:function(ie){var ig;if(ie.disabled&&!ie.checked){ig=V;}
else if(ie.checked&&ie.focused){ig=D;}
else if(ie.checked&&ie.disabled){ig=ho;}
else if(ie.checked&&ie.hovered){ig=eA;}
else if(ie.checked){ig=gs;}
else if(ie.focused){ig=eO;}
else if(ie.hovered){ig=d;}
else {ig=A;}
;ig+=ie.invalid&&!ie.disabled?fu:eN;return {decorator:ig,width:10,height:10};}
},"textfield":{style:function(ih){var im;var ik=!!ih.focused;var ii=!!ih.invalid;var ij=!!ih.disabled;if(ik&&ii&&!ij){im=fX;}
else if(ik&&!ii&&!ij){im=fy;}
else if(ij){im=fB;}
else if(!ik&&ii&&!ij){im=l;}
else {im=n;}
;var il;if(ih.disabled){il=T;}
else if(ih.showingPlaceholder){il=et;}
else {il=gh;}
;return {decorator:im,padding:[2,4,1],textColor:il};}
},"textarea":{include:ff,style:function(io){return {padding:4};}
},"spinner":{style:function(ip){var is;var ir=!!ip.focused;var it=!!ip.invalid;var iq=!!ip.disabled;if(ir&&it&&!iq){is=fX;}
else if(ir&&!it&&!iq){is=fy;}
else if(iq){is=fB;}
else if(!ir&&it&&!iq){is=l;}
else {is=n;}
;return {decorator:is};}
},"spinner/textfield":{style:function(iu){return {marginRight:2,padding:[2,4,1],textColor:iu.disabled?T:gh};}
},"spinner/upbutton":{alias:hj,include:hj,style:function(iv,iw){return {icon:fc,padding:[iw.padding[0]-1,iw.padding[1]-5],margin:0};}
},"spinner/downbutton":{alias:hj,include:hj,style:function(ix,iy){return {icon:gP,padding:[iy.padding[0]-1,iy.padding[1]-5],margin:0};}
},"datefield":gf,"datefield/button":{alias:m,include:m,style:function(iz){return {icon:fO,padding:[0,3],decorator:undefined};}
},"datefield/textfield":gi,"datefield/list":{alias:gV,include:gV,style:function(iA){return {decorator:undefined};}
},"groupbox":{style:function(iB){return {legendPosition:hq};}
},"groupbox/legend":{alias:er,style:function(iC){return {padding:[1,0,1,4],textColor:iC.invalid?gj:eK,font:P};}
},"groupbox/frame":{style:function(iD){return {padding:10,margin:1,decorator:fV};}
},"check-groupbox":fJ,"check-groupbox/legend":{alias:ez,include:ez,style:function(iE){return {padding:[1,0,1,4],textColor:iE.invalid?gj:eK,font:P};}
},"radio-groupbox":fJ,"radio-groupbox/legend":{alias:A,include:A,style:function(iF){return {padding:[1,0,1,4],textColor:iF.invalid?gj:eK,font:P};}
},"scrollarea":{style:function(iG){return {minWidth:50,minHeight:50};}
},"scrollarea/corner":{style:function(iH){return {backgroundColor:f};}
},"scrollarea/pane":eH,"scrollarea/scrollbar-x":gk,"scrollarea/scrollbar-y":gk,"scrollbar":{style:function(iI){if(iI[fz]){return {};}
;return {width:iI.horizontal?undefined:16,height:iI.horizontal?16:undefined,decorator:(iI.horizontal?fr:gD),padding:1};}
},"scrollbar/slider":{alias:eL,style:function(iJ){return {padding:iJ.horizontal?[0,1,0,1]:[1,0,1,0]};}
},"scrollbar/slider/knob":{include:hj,style:function(iK){var iL=iK.horizontal?W:hi;if(iK.disabled){iL+=fx;}
;return {decorator:iL,minHeight:iK.horizontal?undefined:9,minWidth:iK.horizontal?9:undefined,padding:undefined,margin:0};}
},"scrollbar/button":{alias:hj,include:hj,style:function(iM){var iO=Q;if(iM.left){iO+=eU;}
else if(iM.right){iO+=J;}
else if(iM.up){iO+=gE;}
else {iO+=eG;}
;if(iM.left||iM.right){var iN=iM.left?3:4;return {padding:[3,0,3,iN],icon:iO,width:15,height:14,margin:0};}
else {return {padding:3,icon:iO,width:14,height:15,margin:0};}
;}
},"scrollbar/button-begin":i,"scrollbar/button-end":i,"slider":{style:function(iP){var iS;var iR=!!iP.focused;var iT=!!iP.invalid;var iQ=!!iP.disabled;if(iR&&iT&&!iQ){iS=fX;}
else if(iR&&!iT&&!iQ){iS=fy;}
else if(iQ){iS=fB;}
else if(!iR&&iT&&!iQ){iS=l;}
else {iS=n;}
;return {decorator:iS};}
},"slider/knob":{include:hj,style:function(iU){return {decorator:iU.disabled?S:W,height:14,width:14,padding:0,margin:0};}
},"list":{alias:gm,style:function(iV){var iY;var iX=!!iV.focused;var ja=!!iV.invalid;var iW=!!iV.disabled;if(iX&&ja&&!iW){iY=fX;}
else if(iX&&!ja&&!iW){iY=fy;}
else if(iW){iY=fB;}
else if(!iX&&ja&&!iW){iY=l;}
else {iY=n;}
;return {backgroundColor:hr,decorator:iY};}
},"list/pane":eH,"listitem":{alias:er,style:function(jb){return {padding:jb.dragover?[4,4,2,4]:4,textColor:jb.selected?gH:undefined,decorator:jb.selected?gO:undefined,opacity:jb.drag?0.5:undefined};}
},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:hj,include:hj,style:function(jc){return {padding:5,center:true,icon:jc.vertical?fT:e};}
},"slidebar/button-backward":{alias:hj,include:hj,style:function(jd){return {padding:5,center:true,icon:jd.vertical?hw:fH};}
},"tabview":{style:function(je){return {contentPadding:16};}
},"tabview/bar":{alias:o,style:function(jf){var jg={marginBottom:jf.barTop?-1:0,marginTop:jf.barBottom?-4:0,marginLeft:jf.barRight?-3:0,marginRight:jf.barLeft?-1:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0};if(jf.barTop||jf.barBottom){jg.paddingLeft=5;jg.paddingRight=7;}
else {jg.paddingTop=5;jg.paddingBottom=7;}
;return jg;}
},"tabview/bar/button-forward":{include:gn,alias:gn,style:function(jh){if(jh.barTop||jh.barBottom){return {marginTop:2,marginBottom:2};}
else {return {marginLeft:2,marginRight:2};}
;}
},"tabview/bar/button-backward":{include:gX,alias:gX,style:function(ji){if(ji.barTop||ji.barBottom){return {marginTop:2,marginBottom:2};}
else {return {marginLeft:2,marginRight:2};}
;}
},"tabview/bar/scrollpane":{},"tabview/pane":{style:function(jj){return {decorator:hn,marginBottom:jj.barBottom?-1:0,marginTop:jj.barTop?-1:0,marginLeft:jj.barLeft?-1:0,marginRight:jj.barRight?-1:0};}
},"tabview-page":{alias:eH,include:eH,style:function(jk){return {padding:[4,3]};}
},"tabview-page/button":{alias:er,style:function(jl){var jr,jn=0;var jq=0,jm=0,jo=0,jp=0;if(jl.checked){if(jl.barTop){jr=eq;jn=[5,11];jo=jl.firstTab?0:-5;jp=jl.lastTab?0:-5;}
else if(jl.barBottom){jr=fe;jn=[5,11];jo=jl.firstTab?0:-5;jp=jl.lastTab?0:-5;jq=3;}
else if(jl.barRight){jr=fb;jn=[5,10];jq=jl.firstTab?0:-5;jm=jl.lastTab?0:-5;jo=2;}
else {jr=gg;jn=[5,10];jq=jl.firstTab?0:-5;jm=jl.lastTab?0:-5;}
;}
else {if(jl.barTop){jr=fL;jn=[3,9];jq=4;jo=jl.firstTab?5:1;jp=1;}
else if(jl.barBottom){jr=K;jn=[3,9];jm=4;jo=jl.firstTab?5:1;jp=1;jq=3;}
else if(jl.barRight){jr=gc;jn=[3,9];jp=5;jq=jl.firstTab?5:1;jm=1;jo=3;}
else {jr=fM;jn=[3,9];jo=5;jq=jl.firstTab?5:1;jm=1;jp=1;}
;}
;return {zIndex:jl.checked?10:5,decorator:jr,padding:jn,marginTop:jq,marginBottom:jm,marginLeft:jo,marginRight:jp,textColor:jl.disabled?T:jl.checked?fY:y};}
},"tabview-page/button/label":{alias:fs,style:function(js){return {padding:js.focused?[0,1,0,1]:[1,2,1,2],decorator:js.focused?g:undefined};}
},"tabview-page/button/close-button":{alias:er,style:function(jt){return {icon:ge};}
},"toolbar":{style:function(ju){return {decorator:hg,spacing:2};}
},"toolbar/part":{style:function(jv){return {decorator:eW,spacing:2};}
},"toolbar/part/container":{style:function(jw){return {paddingLeft:2,paddingRight:2};}
},"toolbar/part/handle":{style:function(jx){return {source:gC,marginLeft:3,marginRight:3};}
},"toolbar-button":{alias:er,style:function(jy){var jz;if(jy.pressed||(jy.checked&&!jy.hovered)||(jy.checked&&jy.disabled)){jz=fG;}
else if(jy.hovered&&!jy.disabled){jz=gN;}
;return {marginTop:2,marginBottom:2,padding:(jy.pressed||jy.checked||jy.hovered)&&!jy.disabled||(jy.disabled&&jy.checked)?3:5,decorator:jz};}
},"toolbar-menubutton":{alias:gU,include:gU,style:function(jA){return {showArrow:true};}
},"toolbar-menubutton/arrow":{alias:z,include:z,style:function(jB){return {source:gP};}
},"toolbar-splitbutton":{style:function(jC){return {marginTop:2,marginBottom:2};}
},"toolbar-splitbutton/button":{alias:gU,include:gU,style:function(jD){return {icon:fT,marginTop:undefined,marginBottom:undefined};}
},"toolbar-splitbutton/arrow":{alias:gU,include:gU,style:function(jE){if(jE.pressed||jE.checked||(jE.hovered&&!jE.disabled)){var jF=1;}
else {var jF=3;}
;return {padding:jF,icon:fT,marginTop:undefined,marginBottom:undefined};}
},"toolbar-separator":{style:function(jG){return {decorator:fd,margin:7};}
},"tree":G,"tree-item":{style:function(jH){var jI=jH.selected?gO:undefined;return {padding:[2,6],textColor:jH.selected?gH:undefined,decorator:jI,opacity:jH.drag?0.5:undefined};}
},"tree-item/icon":{include:z,style:function(jJ){return {paddingRight:5};}
},"tree-item/label":fs,"tree-item/open":{include:z,style:function(jK){var jL;if(jK.selected&&jK.opened){jL=fI;}
else if(jK.selected&&!jK.opened){jL=gv;}
else if(jK.opened){jL=gA;}
else {jL=M;}
;return {padding:[0,5,0,2],source:jL};}
},"tree-folder":{include:fQ,alias:fQ,style:function(jM){var jO,jN;if(jM.small){jO=jM.opened?fk:x;jN=fk;}
else if(jM.large){jO=jM.opened?eD:fg;jN=eD;}
else {jO=jM.opened?gl:eE;jN=gl;}
;return {icon:jO,iconOpened:jN};}
},"tree-file":{include:fQ,alias:fQ,style:function(jP){return {icon:jP.small?ev:jP.large?gY:gB};}
},"treevirtual":eT,"treevirtual-folder":{style:function(jQ){return {icon:jQ.opened?fk:x};}
},"treevirtual-file":{include:ey,alias:ey,style:function(jR){return {icon:ev};}
},"treevirtual-line":{style:function(jS){return {icon:fj};}
},"treevirtual-contract":{style:function(jT){return {icon:gA,paddingLeft:5,paddingTop:2};}
},"treevirtual-expand":{style:function(jU){return {icon:M,paddingLeft:5,paddingTop:2};}
},"treevirtual-only-contract":hD,"treevirtual-only-expand":ew,"treevirtual-start-contract":hD,"treevirtual-start-expand":ew,"treevirtual-end-contract":hD,"treevirtual-end-expand":ew,"treevirtual-cross-contract":hD,"treevirtual-cross-expand":ew,"treevirtual-end":{style:function(jV){return {icon:fj};}
},"treevirtual-cross":{style:function(jW){return {icon:fj};}
},"tooltip":{include:hE,style:function(jX){return {backgroundColor:R,padding:[1,3,2,3],offset:[15,5,5,5]};}
},"tooltip/atom":er,"tooltip-error":{style:function(jY){return {placeMethod:eH,offset:[-3,1,0,0],arrowPosition:jY.placementLeft?hz:hp,position:hB,showTimeout:100,hideTimeout:10000,padding:[0,4,4,0]};}
},"tooltip-error/arrow":{include:z,style:function(ka){var kb=ka.placementLeft?hd:eS;return {source:kb,padding:[6,0,0,0],zIndex:10000001};}
},"tooltip-error/atom":{include:hE,style:function(kc){return {textColor:gH,backgroundColor:undefined,decorator:L,font:P,padding:[3,4,4,4],margin:[1,0,0,0],maxWidth:333};}
},"window":{style:function(kd){return {decorator:kd.showStatusbar?gQ:hC,contentPadding:[10,10,10,10],margin:kd.maximized?0:[0,5,5,0]};}
},"window-resize-frame":{style:function(ke){return {decorator:ke.showStatusbar?C:b};}
},"window/pane":{style:function(kf){return {decorator:ha};}
},"window/captionbar":{style:function(kg){return {decorator:(kg.active?eQ:F),textColor:kg.active?fh:eu,minHeight:26,paddingRight:2};}
},"window/icon":{style:function(kh){return {margin:[5,0,3,6]};}
},"window/title":{style:function(ki){return {alignY:fU,font:P,marginLeft:6,marginRight:12};}
},"window/minimize-button":{alias:er,style:function(kj){return {icon:kj.active?kj.hovered?fA:gd:fR,margin:[4,8,2,0]};}
},"window/restore-button":{alias:er,style:function(kk){return {icon:kk.active?kk.hovered?E:gW:fW,margin:[5,8,2,0]};}
},"window/maximize-button":{alias:er,style:function(kl){return {icon:kl.active?kl.hovered?c:eC:gp,margin:[4,8,2,0]};}
},"window/close-button":{alias:er,style:function(km){return {icon:km.active?km.hovered?hy:fD:eY,margin:[4,8,2,0]};}
},"window/statusbar":{style:function(kn){return {padding:[2,6],decorator:N,minHeight:18};}
},"window/statusbar-text":{style:function(ko){return {font:fa};}
},"iframe":{style:function(kp){return {decorator:hk};}
},"resizer":{style:function(kq){return {decorator:fq};}
},"splitpane":{style:function(kr){return {decorator:ga};}
},"splitpane/splitter":{style:function(ks){return {width:ks.horizontal?3:undefined,height:ks.vertical?3:undefined,backgroundColor:gq};}
},"splitpane/splitter/knob":{style:function(kt){return {source:kt.horizontal?fi:eX};}
},"splitpane/slider":{style:function(ku){return {width:ku.horizontal?3:undefined,height:ku.vertical?3:undefined,backgroundColor:gq};}
},"selectbox":hj,"selectbox/atom":er,"selectbox/popup":hE,"selectbox/list":{alias:G},"selectbox/arrow":{include:z,style:function(kv){return {source:fT,paddingLeft:5};}
},"datechooser":{style:function(kw){var kz;var ky=!!kw.focused;var kA=!!kw.invalid;var kx=!!kw.disabled;if(ky&&kA&&!kx){kz=fX;}
else if(ky&&!kA&&!kx){kz=fy;}
else if(kx){kz=fB;}
else if(!ky&&kA&&!kx){kz=l;}
else {kz=n;}
;return {padding:2,decorator:kz,backgroundColor:hr};}
},"datechooser/navigation-bar":{},"datechooser/nav-button":{include:hj,alias:hj,style:function(kB){var kC={padding:[2,4]};if(kB.lastYear){kC.icon=hm;kC.marginRight=1;}
else if(kB.lastMonth){kC.icon=fH;}
else if(kB.nextYear){kC.icon=gK;kC.marginLeft=1;}
else if(kB.nextMonth){kC.icon=e;}
;return kC;}
},"datechooser/last-year-button-tooltip":hu,"datechooser/last-month-button-tooltip":hu,"datechooser/next-year-button-tooltip":hu,"datechooser/next-month-button-tooltip":hu,"datechooser/last-year-button":gr,"datechooser/last-month-button":gr,"datechooser/next-month-button":gr,"datechooser/next-year-button":gr,"datechooser/month-year-label":{style:function(kD){return {font:P,textAlign:hh,textColor:kD.disabled?T:undefined};}
},"datechooser/date-pane":{style:function(kE){return {textColor:kE.disabled?T:undefined,marginTop:2};}
},"datechooser/weekday":{style:function(kF){return {textColor:kF.disabled?T:kF.weekend?ht:undefined,textAlign:hh,paddingTop:2,backgroundColor:eI};}
},"datechooser/week":{style:function(kG){return {textAlign:hh,padding:[2,4],backgroundColor:eI};}
},"datechooser/day":{style:function(kH){var kI=kH.disabled?undefined:kH.selected?gO:undefined;return {textAlign:hh,decorator:kI,textColor:kH.disabled?T:kH.selected?gH:kH.otherMonth?ht:undefined,font:kH.today?P:undefined,padding:[2,4]};}
},"combobox":{style:function(kJ){var kM;var kL=!!kJ.focused;var kN=!!kJ.invalid;var kK=!!kJ.disabled;if(kL&&kN&&!kK){kM=fX;}
else if(kL&&!kN&&!kK){kM=fy;}
else if(kK){kM=fB;}
else if(!kL&&kN&&!kK){kM=l;}
else {kM=n;}
;return {decorator:kM};}
},"combobox/popup":hE,"combobox/list":{alias:G},"combobox/button":{include:hj,alias:hj,style:function(kO,kP){var kQ={icon:fT,padding:[kP.padding[0],kP.padding[1]-6],margin:undefined};if(kO.selected){kQ.decorator=fN;}
;return kQ;}
},"combobox/textfield":{include:ff,style:function(kR){return {decorator:undefined};}
},"menu":{style:function(kS){var kT={decorator:p,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,placementModeY:kS.submenu||kS.contextmenu?gw:hc};if(kS.submenu){kT.position=hB;kT.offset=[-2,-3];}
;return kT;}
},"menu/slidebar":fF,"menu-slidebar":eH,"menu-slidebar-button":{style:function(kU){var kV=kU.hovered?gO:undefined;return {decorator:kV,padding:7,center:true};}
},"menu-slidebar/button-backward":{include:fP,style:function(kW){return {icon:kW.hovered?gy:hw};}
},"menu-slidebar/button-forward":{include:fP,style:function(kX){return {icon:kX.hovered?eP:fT};}
},"menu-separator":{style:function(kY){return {height:0,decorator:fn,margin:[4,2]};}
},"menu-button":{alias:er,style:function(la){var lb=la.selected?gO:undefined;return {decorator:lb,textColor:la.selected?gH:undefined,padding:[4,6]};}
},"menu-button/icon":{include:z,style:function(lc){return {alignY:fU};}
},"menu-button/label":{include:fs,style:function(ld){return {alignY:fU,padding:1};}
},"menu-button/shortcut":{include:fs,style:function(le){return {alignY:fU,marginLeft:14,padding:1};}
},"menu-button/arrow":{include:z,style:function(lf){return {source:lf.selected?fp:e,alignY:fU};}
},"menu-checkbox":{alias:fS,include:fS,style:function(lg){return {icon:!lg.checked?undefined:lg.selected?eV:eM};}
},"menu-radiobutton":{alias:fS,include:fS,style:function(lh){return {icon:!lh.checked?undefined:lh.selected?es:gR};}
},"menubar":{style:function(li){return {decorator:fC};}
},"menubar-button":{alias:er,style:function(lj){var lk=(lj.pressed||lj.hovered)&&!lj.disabled?gO:undefined;return {decorator:lk,textColor:lj.pressed||lj.hovered?gH:undefined,padding:[3,8]};}
},"colorselector":eH,"colorselector/control-bar":eH,"colorselector/control-pane":eH,"colorselector/visual-pane":fJ,"colorselector/preset-grid":eH,"colorselector/colorbucket":{style:function(ll){return {decorator:hk,width:16,height:16};}
},"colorselector/preset-field-set":fJ,"colorselector/input-field-set":{include:fJ,alias:fJ,style:function(){return {paddingTop:20};}
},"colorselector/preview-field-set":{include:fJ,alias:fJ,style:function(){return {paddingTop:20};}
},"colorselector/hex-field-composite":eH,"colorselector/hex-field":ff,"colorselector/rgb-spinner-composite":eH,"colorselector/rgb-spinner-red":fv,"colorselector/rgb-spinner-green":fv,"colorselector/rgb-spinner-blue":fv,"colorselector/hsb-spinner-composite":eH,"colorselector/hsb-spinner-hue":fv,"colorselector/hsb-spinner-saturation":fv,"colorselector/hsb-spinner-brightness":fv,"colorselector/preview-content-old":{style:function(lm){return {decorator:hk,width:50,height:10};}
},"colorselector/preview-content-new":{style:function(ln){return {decorator:hk,backgroundColor:hr,width:50,height:10};}
},"colorselector/hue-saturation-field":{style:function(lo){return {decorator:hk,margin:5};}
},"colorselector/brightness-field":{style:function(lp){return {decorator:hk,margin:[5,7]};}
},"colorselector/hue-saturation-pane":eH,"colorselector/hue-saturation-handle":eH,"colorselector/brightness-pane":eH,"colorselector/brightness-handle":eH,"colorpopup":{alias:hE,include:hE,style:function(lq){return {padding:5,backgroundColor:f};}
},"colorpopup/field":{style:function(lr){return {decorator:hk,margin:2,width:14,height:14,backgroundColor:hr};}
},"colorpopup/selector-button":gL,"colorpopup/auto-button":gL,"colorpopup/preview-pane":fJ,"colorpopup/current-preview":{style:function(ls){return {height:20,padding:4,marginLeft:4,decorator:hk,allowGrowX:true};}
},"colorpopup/selected-preview":{style:function(lt){return {height:20,padding:4,marginRight:4,decorator:hk,allowGrowX:true};}
},"colorpopup/colorselector-okbutton":{alias:gL,include:gL,style:function(lu){return {icon:k};}
},"colorpopup/colorselector-cancelbutton":{alias:gL,include:gL,style:function(lv){return {icon:fK};}
},"table":{alias:eH,style:function(lw){return {decorator:eT};}
},"table/statusbar":{style:function(lx){return {decorator:eR,padding:[0,2]};}
},"table/column-button":{alias:hj,style:function(ly){return {decorator:U,padding:3,icon:eJ};}
},"table-column-reset-button":{include:fS,alias:fS,style:function(){return {icon:fl};}
},"table-scroller":eH,"table-scroller/scrollbar-x":gk,"table-scroller/scrollbar-y":gk,"table-scroller/header":{style:function(lz){return {decorator:U,textColor:lz.disabled?T:undefined};}
},"table-scroller/pane":{style:function(lA){return {backgroundColor:Y};}
},"table-scroller/focus-indicator":{style:function(lB){return {decorator:q};}
},"table-scroller/resize-line":{style:function(lC){return {backgroundColor:go,width:2};}
},"table-header-cell":{alias:er,style:function(lD){return {minWidth:13,minHeight:20,padding:lD.hovered?[3,4,2,4]:[3,4],decorator:lD.hovered?ex:u,sortIcon:lD.sorted?(lD.sortedAscending?hv:gJ):undefined};}
},"table-header-cell/label":{style:function(lE){return {minWidth:0,alignY:fU,paddingRight:5};}
},"table-header-cell/sort-icon":{style:function(lF){return {alignY:fU,alignX:hp,opacity:lF.disabled?0.3:1};}
},"table-header-cell/icon":{style:function(lG){return {minWidth:0,alignY:fU,paddingRight:5,opacity:lG.disabled?0.3:1};}
},"table-editor-textfield":{include:ff,style:function(lH){return {decorator:undefined,padding:[2,2],backgroundColor:hr};}
},"table-editor-selectbox":{include:hs,alias:hs,style:function(lI){return {padding:[0,2],backgroundColor:hr};}
},"table-editor-combobox":{include:gf,alias:gf,style:function(lJ){return {decorator:undefined,backgroundColor:hr};}
},"progressive-table-header":{alias:eH,style:function(lK){return {decorator:gS};}
},"progressive-table-header-cell":{alias:er,style:function(lL){return {minWidth:40,minHeight:25,paddingLeft:6,decorator:fo};}
},"app-header":{style:function(lM){return {font:P,textColor:gH,padding:[8,12],decorator:v};}
},"app-header-label":fs,"app-splitpane":{alias:ga,style:function(lN){return {padding:0};}
},"virtual-list":G,"virtual-list/row-layer":w,"row-layer":eH,"group-item":{include:fs,alias:fs,style:function(lO){return {padding:4,decorator:h,textColor:eF,font:P};}
},"virtual-selectbox":hs,"virtual-selectbox/dropdown":hE,"virtual-selectbox/dropdown/list":{alias:fw},"virtual-combobox":gf,"virtual-combobox/dropdown":hE,"virtual-combobox/dropdown/list":{alias:fw},"virtual-tree":{include:gb,alias:gb,style:function(lP){return {itemHeight:26};}
},"virtual-tree-folder":I,"virtual-tree-file":he,"column-layer":eH,"cell":{style:function(lQ){return {textColor:lQ.selected?gH:H,padding:[3,6],font:gz};}
},"cell-string":gG,"cell-number":{include:gG,style:function(lR){return {textAlign:hp};}
},"cell-image":gG,"cell-boolean":{include:gG,style:function(lS){return {iconTrue:t,iconFalse:gT};}
},"cell-atom":gG,"cell-date":gG,"cell-html":gG,"progressbar":{style:function(lT){return {decorator:ft,padding:[1],backgroundColor:eB,width:200,height:20};}
},"progressbar/progress":{style:function(lU){return {decorator:(lU.disabled?h:gO)};}
}}});}
)();
(function(){var a="button-checked-focused",b="window-resize-frame",c="checkbox-disabled-border",d="group-background",e="menu-end",f="keyboard-focus",g="button-disabled-start",h="selected-end",i="table-header-hovered",j="border-invalid",k="decoration/toolbar/toolbar-part.gif",l="border-separator",m="window-border-caption",n="radiobutton-hovered",o="button-hovered-end",p="border-input",q="radiobutton",r="repeat-y",s="border-dragover",t="border-inner-input",u="radiobutton-checked-focused",v="groupitem-end",w="group-border",x="input-start",y="button-hovered-start",z="tooltip-error",A="button-hovered",B="selected-start",C="progressive-table-header-border-right",D="button-border-disabled",E="scrollbar-slider-horizontal",F="button-pressed",G="window-statusbar-background",H="tabview-end",I="radiobutton-hovered-invalid",J="checkbox-hovered",K="radiobutton-background",L="window-captionbar-active",M="checkbox-hovered-inner",N="toolbar-button-hovered",O="window-caption-active-end",P="solid",Q="button-start",R="dotted",S="radiobutton-disabled",T="radiobutton-checked",U="checkbox-disabled-end",V="window-caption-active-start",W="window-border",X="button-focused",Y="input",cv="tabview-inactive",cw="qx/decoration/Modern",cx="border-toolbar-separator-left",cr="invalid",cs="button-disabled",ct="horizontal",cu="table-header-start",cC="background-splitpane",cD="button-end",cE="button-checked",cF="border-toolbar-border-inner",cy="px",cz="input-border-disabled",cA="scrollbar-slider-vertical",cB="checkbox-inner",cJ="button",dk="button-disabled-end",dI="toolbar-end",cK="groupitem-start",cG="menu-start",cH="input-focused-start",dD="scrollbar-start",cI="scrollbar-slider-start",cL="radiobutton-checked-disabled",cM="checkbox-focused",cN="border-toolbar-button-outer",cS="background-light",cT="qx.theme.modern.Decoration",cU="checkbox-hovered-invalid",cO="radiobutton-checked-hovered",cP="tabview-page-button-top-inactive",cQ="#243B58",cR="checkbox",cY="checkbox-focus",da="window",dF="checkbox-disabled-inner",db="border-toolbar-separator-right",cV="tabview-inactive-start",cW="scrollbar-end",dE="table-header-end",cX="tabview-background",df="checkbox-end",dg="border-button",dH="tabview-inactive-end",dh="input-end",dc="tabview-page-button-top-active",dd="input-focused-inner-invalid",dG="menu-separator-top",de="shadow",di="window-caption-inactive-start",dj="scrollbar-slider-end",dw="background-pane",dv="pane-end",du="input-focused-end",dA="menubar-start",dz="toolbar-start",dy="radiobutton-focused",dx="pane-start",dp="table-focus-indicator",dn="menu-separator-bottom",dm="#1D2D45",dl="border-main",dt="scrollbar-horizontal",ds="window-caption-inactive-end",dr="checkbox-border",dq="tabview-start",dC="checkbox-hovered-inner-invalid",dB="input-focused";qx.Theme.define(cT,{aliases:{decoration:cw},decorations:{"main":{style:{width:1,color:dl}},"selected":{style:{startColorPosition:0,endColorPosition:100,startColor:B,endColor:h}},"dragover":{style:{bottom:[2,P,s]}},"pane":{style:{width:1,color:cX,radius:3,shadowColor:de,shadowBlurRadius:2,shadowLength:0,gradientStart:[dx,0],gradientEnd:[dv,100]}},"group":{style:{backgroundColor:d,radius:4,color:w,width:1}},"keyboard-focus":{style:{width:1,color:f,style:R}},"radiobutton":{style:{backgroundColor:K,radius:5,width:1,innerWidth:2,color:dr,innerColor:K,shadowLength:0,shadowBlurRadius:0,shadowColor:cY}},"radiobutton-checked":{include:q,style:{backgroundColor:T}},"radiobutton-checked-focused":{include:T,style:{shadowBlurRadius:4}},"radiobutton-checked-hovered":{include:T,style:{innerColor:J}},"radiobutton-focused":{include:q,style:{shadowBlurRadius:4}},"radiobutton-hovered":{include:q,style:{backgroundColor:J,innerColor:J}},"radiobutton-disabled":{include:q,style:{innerColor:S,backgroundColor:S,color:c}},"radiobutton-checked-disabled":{include:S,style:{backgroundColor:cL}},"radiobutton-invalid":{include:q,style:{color:cr}},"radiobutton-checked-invalid":{include:T,style:{color:cr}},"radiobutton-checked-focused-invalid":{include:u,style:{color:cr,shadowColor:cr}},"radiobutton-checked-hovered-invalid":{include:cO,style:{color:cr,innerColor:I}},"radiobutton-focused-invalid":{include:dy,style:{color:cr,shadowColor:cr}},"radiobutton-hovered-invalid":{include:n,style:{color:cr,innerColor:I,backgroundColor:I}},"separator-horizontal":{style:{widthLeft:1,colorLeft:l}},"separator-vertical":{style:{widthTop:1,colorTop:l}},"tooltip-error":{style:{backgroundColor:z,radius:4,shadowColor:de,shadowBlurRadius:2,shadowLength:1}},"popup":{style:{width:1,color:dl,shadowColor:de,shadowBlurRadius:3,shadowLength:1}},"scrollbar-horizontal":{style:{gradientStart:[dD,0],gradientEnd:[cW,100]}},"scrollbar-vertical":{include:dt,style:{orientation:ct}},"scrollbar-slider-horizontal":{style:{gradientStart:[cI,0],gradientEnd:[dj,100],color:dl,width:1,radius:3}},"scrollbar-slider-vertical":{include:E,style:{orientation:ct}},"scrollbar-slider-horizontal-disabled":{include:E,style:{color:D}},"scrollbar-slider-vertical-disabled":{include:cA,style:{color:D}},"button":{style:{radius:3,color:dg,width:1,startColor:Q,endColor:cD,startColorPosition:35,endColorPosition:100}},"button-disabled":{include:cJ,style:{color:D,startColor:g,endColor:dk}},"button-hovered":{include:cJ,style:{startColor:y,endColor:o}},"button-checked":{include:cJ,style:{endColor:Q,startColor:cD}},"button-pressed":{include:cJ,style:{endColor:y,startColor:o}},"button-focused":{style:{radius:3,color:dg,width:1,innerColor:X,innerWidth:2,startColor:Q,endColor:cD,startColorPosition:30,endColorPosition:100}},"button-checked-focused":{include:X,style:{endColor:Q,startColor:cD}},"button-invalid":{include:cJ,style:{color:j}},"button-disabled-invalid":{include:cs,style:{color:j}},"button-hovered-invalid":{include:A,style:{color:j}},"button-checked-invalid":{include:cE,style:{color:j}},"button-pressed-invalid":{include:F,style:{color:j}},"button-focused-invalid":{include:X,style:{color:j}},"button-checked-focused-invalid":{include:a,style:{color:j}},"checkbox":{style:{width:1,color:dr,innerWidth:1,innerColor:cB,backgroundColor:df,shadowLength:0,shadowBlurRadius:0,shadowColor:cY}},"checkbox-hovered":{include:cR,style:{innerColor:M,backgroundColor:J}},"checkbox-focused":{include:cR,style:{shadowBlurRadius:4}},"checkbox-disabled":{include:cR,style:{color:c,innerColor:dF,backgroundColor:U}},"checkbox-invalid":{include:cR,style:{color:cr}},"checkbox-hovered-invalid":{include:J,style:{color:cr,innerColor:dC,backgroundColor:cU}},"checkbox-focused-invalid":{include:cM,style:{color:cr,shadowColor:cr}},"input":{style:{color:p,innerColor:t,innerWidth:1,width:1,backgroundColor:cS,startColor:x,endColor:dh,startColorPosition:0,endColorPosition:12,colorPositionUnit:cy}},"border-invalid":{include:Y,style:{color:j}},"input-focused":{include:Y,style:{startColor:cH,innerColor:du,endColorPosition:4}},"input-focused-invalid":{include:dB,style:{innerColor:dd,color:j}},"input-disabled":{include:Y,style:{color:cz}},"toolbar":{style:{startColorPosition:40,endColorPosition:60,startColor:dz,endColor:dI}},"toolbar-button-hovered":{style:{color:cN,width:1,innerWidth:1,innerColor:cF,radius:2,gradientStart:[Q,30],gradientEnd:[cD,100]}},"toolbar-button-checked":{include:N,style:{gradientStart:[cD,30],gradientEnd:[Q,100]}},"toolbar-separator":{style:{widthLeft:1,widthRight:1,colorLeft:cx,colorRight:db,styleLeft:P,styleRight:P}},"toolbar-part":{style:{backgroundImage:k,backgroundRepeat:r}},"tabview-pane":{style:{width:1,color:W,radius:3,gradientStart:[dq,90],gradientEnd:[H,100]}},"tabview-page-button-top-active":{style:{radius:[3,3,0,0],width:[1,1,0,1],color:cX,backgroundColor:dq,shadowLength:1,shadowColor:de,shadowBlurRadius:2}},"tabview-page-button-top-inactive":{style:{radius:[3,3,0,0],color:cv,colorBottom:cX,width:1,gradientStart:[cV,0],gradientEnd:[dH,100]}},"tabview-page-button-bottom-active":{include:dc,style:{radius:[0,0,3,3],width:[0,1,1,1],backgroundColor:cV,shadowLength:0,shadowBlurRadius:0}},"tabview-page-button-bottom-inactive":{include:cP,style:{radius:[0,0,3,3],width:[0,1,1,1],colorBottom:cv,colorTop:cX}},"tabview-page-button-left-active":{include:dc,style:{radius:[3,0,0,3],width:[1,0,1,1],shadowLength:0,shadowBlurRadius:0}},"tabview-page-button-left-inactive":{include:cP,style:{radius:[3,0,0,3],width:[1,0,1,1],colorBottom:cv,colorRight:cX}},"tabview-page-button-right-active":{include:dc,style:{radius:[0,3,3,0],width:[1,1,1,0],shadowLength:0,shadowBlurRadius:0}},"tabview-page-button-right-inactive":{include:cP,style:{radius:[0,3,3,0],width:[1,1,1,0],colorBottom:cv,colorLeft:cX}},"splitpane":{style:{backgroundColor:dw,width:3,color:cC,style:P}},"window":{style:{radius:[5,5,0,0],shadowBlurRadius:4,shadowLength:2,shadowColor:de}},"window-incl-statusbar":{include:da,style:{radius:[5,5,5,5]}},"window-resize-frame":{style:{radius:[5,5,0,0],width:1,color:dl}},"window-resize-frame-incl-statusbar":{include:b,style:{radius:[5,5,5,5]}},"window-captionbar-active":{style:{width:1,color:W,colorBottom:m,radius:[5,5,0,0],gradientStart:[V,30],gradientEnd:[O,70]}},"window-captionbar-inactive":{include:L,style:{gradientStart:[di,30],gradientEnd:[ds,70]}},"window-statusbar":{style:{backgroundColor:G,width:[0,1,1,1],color:W,radius:[0,0,5,5]}},"window-pane":{style:{backgroundColor:dw,width:1,color:W,widthTop:0}},"table":{style:{width:1,color:dl,style:P}},"table-statusbar":{style:{widthTop:1,colorTop:dl,style:P}},"table-scroller-header":{style:{gradientStart:[cu,10],gradientEnd:[dE,90],widthBottom:1,colorBottom:dl}},"table-header-cell":{style:{widthRight:1,colorRight:l,styleRight:P}},"table-header-cell-hovered":{style:{widthRight:1,colorRight:l,styleRight:P,widthBottom:1,colorBottom:i,styleBottom:P}},"table-scroller-focus-indicator":{style:{width:2,color:dp,style:P}},"progressive-table-header":{style:{width:1,color:dl,style:P}},"progressive-table-header-cell":{style:{gradientStart:[cu,10],gradientEnd:[dE,90],widthRight:1,colorRight:C}},"menu":{style:{gradientStart:[cG,0],gradientEnd:[e,100],shadowColor:de,shadowBlurRadius:2,shadowLength:1,width:1,color:dl}},"menu-separator":{style:{widthTop:1,colorTop:dG,widthBottom:1,colorBottom:dn}},"menubar":{style:{gradientStart:[dA,0],gradientEnd:[e,100],width:1,color:l}},"app-header":{style:{gradientStart:[cQ,0],gradientEnd:[dm,100]}},"progressbar":{style:{width:1,color:p}},"group-item":{style:{startColorPosition:0,endColorPosition:100,startColor:cK,endColor:v}}}});}
)();
(function(){var a="black",b="#EEEEEE",c="#1a1a1a",d="#ffffdd",e="#b6b6b6",f="#004DAD",g="#BABABA",h="#005BC3",i="#334866",j="#00204D",k="#CECECE",l="gray",m="#D9D9D9",n="#D8D8D8",o="#99C3FE",p="#001533",q="#B3B3B3",r="#F4F4F4",s="#D5D5D5",t="#fffefe",u="#C3C3C3",v="#E4E4E4",w="#DDDDDD",x="#FF9999",y="css.rgba",z="#E8E8E9",A="#084FAA",B="#AFAFAF",C="white",D="#C5C5C5",E="rgba(0, 0, 0, 0.4)",F="#DBDBDB",G="#4a4a4a",H="#83BAEA",I="#D7E7F4",J="#07125A",K="#084FAB",L="#FAF2F2",M="#87AFE7",N="#F7EAEA",O="#777D8D",P="#FBFBFB",Q="#CACACA",R="#909090",S="#9B9B9B",T="#F0F9FE",U="#314a6e",V="#B4B4B4",W="#787878",X="qx.theme.modern.Color",Y="#000000",cb="#26364D",cc="#A7A7A7",cd="#D1E4FF",bW="#5CB0FD",bX="#FCFCFC",bY="#EAEAEA",ca="#003B91",ci="#80B4EF",cj="#FF6B78",ck="#949494",cl="#808080",ce="#F3F3F3",cf="#930000",cg="#7B7B7B",ch="#F0F0F0",cp="#C82C2C",cM="#DFDFDF",cN="#B6B6B6",cq="#0880EF",cm="#4d4d4d",cn="#f4f4f4",cP="#7B7A7E",co="#D0D0D0",cr="#f8f8f8",cs="#404955",ct="#959595",cx="#AAAAAA",cQ="#F7E9E9",cy="#314A6E",cu="#C72B2B",cv="#FAFAFA",cO="#FBFCFB",cw="#B2D2FF",cC="#666666",cD="#CBC8CD",cE="#999999",cF="#8EB8D6",cz="#b8b8b8",cA="#727272",cR="#33508D",cB="#E8E8E8",cJ="#CCCCCC",cK="#CCC",cS="#EFEFEF",cL="#F2F2F2",cG="#F1F1F1",cH="#990000",cI="#00368A";qx.Theme.define(X,{colors:{"background-application":cM,"background-pane":ce,"background-light":bX,"background-medium":b,"background-splitpane":B,"background-tip":d,"background-tip-error":cu,"background-odd":v,"progressbar-background":C,"text-light":R,"text-gray":G,"text-label":c,"text-title":U,"text-input":Y,"text-hovered":p,"text-disabled":cP,"text-selected":t,"text-active":cb,"text-inactive":cs,"text-placeholder":cD,"border-inner-scrollbar":C,"border-main":cm,"menu-separator-top":D,"menu-separator-bottom":cv,"border-separator":cl,"border-toolbar-button-outer":e,"border-toolbar-border-inner":cr,"border-toolbar-separator-right":cn,"border-toolbar-separator-left":cz,"border-input":i,"border-inner-input":C,"border-disabled":cN,"border-pane":j,"border-button":cC,"border-column":cJ,"border-focused":o,"invalid":cH,"border-focused-invalid":x,"border-dragover":cR,"keyboard-focus":a,"table-pane":ce,"table-focus-indicator":cq,"table-row-background-focused-selected":K,"table-row-background-focused":ci,"table-row-background-selected":K,"table-row-background-even":ce,"table-row-background-odd":v,"table-row-selected":t,"table-row":c,"table-row-line":cK,"table-column-line":cK,"table-header-hovered":C,"progressive-table-header":cx,"progressive-table-header-border-right":cL,"progressive-table-row-background-even":r,"progressive-table-row-background-odd":v,"progressive-progressbar-background":l,"progressive-progressbar-indicator-done":cJ,"progressive-progressbar-indicator-undone":C,"progressive-progressbar-percent-background":l,"progressive-progressbar-percent-text":C,"selected-start":f,"selected-end":cI,"background-selected":cI,"tabview-background":J,"shadow":qx.core.Environment.get(y)?E:cE,"pane-start":P,"pane-end":ch,"group-background":cB,"group-border":V,"radiobutton-background":cS,"checkbox-border":cy,"checkbox-focus":M,"checkbox-hovered":cw,"checkbox-hovered-inner":cd,"checkbox-inner":b,"checkbox-start":v,"checkbox-end":ce,"checkbox-disabled-border":W,"checkbox-disabled-inner":Q,"checkbox-disabled-start":co,"checkbox-disabled-end":n,"checkbox-hovered-inner-invalid":L,"checkbox-hovered-invalid":cQ,"radiobutton-checked":h,"radiobutton-disabled":s,"radiobutton-checked-disabled":cg,"radiobutton-hovered-invalid":N,"tooltip-error":cp,"scrollbar-start":cJ,"scrollbar-end":cG,"scrollbar-slider-start":b,"scrollbar-slider-end":u,"button-border-disabled":ct,"button-start":ch,"button-end":B,"button-disabled-start":r,"button-disabled-end":g,"button-hovered-start":T,"button-hovered-end":cF,"button-focused":H,"border-invalid":cf,"input-start":ch,"input-end":cO,"input-focused-start":I,"input-focused-end":bW,"input-focused-inner-invalid":cj,"input-border-disabled":S,"input-border-inner":C,"toolbar-start":cS,"toolbar-end":w,"window-border":j,"window-border-caption":cA,"window-caption-active-text":C,"window-caption-active-start":A,"window-caption-active-end":ca,"window-caption-inactive-start":cL,"window-caption-inactive-end":F,"window-statusbar-background":cS,"tabview-start":bX,"tabview-end":b,"tabview-inactive":O,"tabview-inactive-start":bY,"tabview-inactive-end":k,"table-header-start":cB,"table-header-end":q,"menu-start":z,"menu-end":m,"menubar-start":cB,"groupitem-start":cc,"groupitem-end":ck,"groupitem-text":C,"virtual-row-layer-background-even":C,"virtual-row-layer-background-odd":C}});}
)();
(function(){var a="Liberation Sans",b="Tahoma",c="os.name",d="sans-serif",e="monospace",f="win",g="Arial",h="Lucida Grande",i="osx",j="Courier New",k="os.version",l="Lucida Console",m="7",n="Monaco",o="Candara",p="Segoe UI",q="Consolas",r="vista",s="qx.theme.modern.Font",t="DejaVu Sans Mono";qx.Theme.define(s,{fonts:{"default":{size:(qx.core.Environment.get(c)==f&&(qx.core.Environment.get(k)==m||qx.core.Environment.get(k)==r))?12:11,lineHeight:1.4,family:qx.core.Environment.get(c)==i?[h]:((qx.core.Environment.get(c)==f&&(qx.core.Environment.get(k)==m||qx.core.Environment.get(k)==r)))?[p,o]:[b,a,g,d]},"bold":{size:(qx.core.Environment.get(c)==f&&(qx.core.Environment.get(k)==m||qx.core.Environment.get(k)==r))?12:11,lineHeight:1.4,family:qx.core.Environment.get(c)==i?[h]:((qx.core.Environment.get(c)==f&&(qx.core.Environment.get(k)==m||qx.core.Environment.get(k)==r)))?[p,o]:[b,a,g,d],bold:true},"small":{size:(qx.core.Environment.get(c)==f&&(qx.core.Environment.get(k)==m||qx.core.Environment.get(k)==r))?11:10,lineHeight:1.4,family:qx.core.Environment.get(c)==i?[h]:((qx.core.Environment.get(c)==f&&(qx.core.Environment.get(k)==m||qx.core.Environment.get(k)==r)))?[p,o]:[b,a,g,d]},"monospace":{size:11,lineHeight:1.4,family:qx.core.Environment.get(c)==i?[l,n]:((qx.core.Environment.get(c)==f&&(qx.core.Environment.get(k)==m||qx.core.Environment.get(k)==r)))?[q]:[q,t,j,e]}}});}
)();
(function(){var a="qx.theme.Modern",b="Modern";qx.Theme.define(a,{title:b,meta:{color:qx.theme.modern.Color,decoration:qx.theme.modern.Decoration,font:qx.theme.modern.Font,appearance:qx.theme.modern.Appearance,icon:qx.theme.icon.Tango}});}
)();
(function(){var a="black",b="border-focused-light",c="border-dark",d="solid",e="dotted",f="effect",g="border-separator",h="border-focused-dark",i="tooltip-text",j="border-focused-light-shadow",k="table-header-border",l="table-focus-indicator",m="outset",n="border-focused-dark-shadow",o="qx/decoration/Classic",p="border-lead",q="border-dark-shadow",r="#FFF",s="main",t="invalid",u="shadow",v="border-light-shadow",w="qx.theme.classic.Decoration",x="white",y="gray",z="border-light";qx.Theme.define(w,{aliases:{decoration:o},decorations:{"main":{style:{width:1,color:c}},"keyboard-focus":{style:{width:1,color:a,style:e}},"inset":{style:{width:1,innerWidth:1,color:[q,z,z,q],innerColor:[c,v,v,c]}},"outset":{style:{width:1,innerWidth:1,color:[v,c,c,v],innerColor:[z,q,q,z]}},"groove":{style:{width:1,innerWidth:1,color:[q,z,z,q],innerColor:[z,q,q,z]}},"ridge":{style:{width:1,innerWidth:1,color:[z,q,q,z],innerColor:[q,z,z,q]}},"inset-thin":{style:{width:1,color:[q,z,z,q]}},"outset-thin":{style:{width:1,color:[z,q,q,z]}},"focused-inset":{style:{width:1,innerWidth:1,color:[n,b,b,n],innerColor:[h,j,j,h]}},"focused-outset":{style:{width:1,innerWidth:1,color:[j,h,h,j],innerColor:[b,n,n,b]}},"border-invalid":{style:{width:1,innerWidth:1,color:[q,z,z,q],innerColor:t}},"separator-horizontal":{style:{widthLeft:1,colorLeft:g}},"separator-vertical":{style:{widthTop:1,colorTop:g}},"window":{include:m,style:{shadowLength:1,shadowBlurRadius:2,shadowColor:u}},"lead-item":{style:{width:1,style:e,color:p}},"tooltip":{style:{width:1,color:i,shadowLength:1,shadowBlurRadius:5,shadowColor:u}},"tooltip-error":{style:{width:1,color:i,shadowLength:1,shadowBlurRadius:5,shadowColor:u}},"popup":{include:s,style:{shadowLength:2,shadowBlurRadius:2,shadowColor:u}},"toolbar-separator":{style:{widthLeft:1,colorLeft:q}},"toolbar-part-handle":{style:{width:1,style:d,colorTop:x,colorLeft:x,colorRight:q,colorBottom:q}},"menu":{include:m,style:{shadowLength:1,shadowBlurRadius:3,shadowColor:u}},"menu-separator":{style:{widthTop:1,widthBottom:1,colorTop:c,colorBottom:z}},"datechooser-date-pane":{style:{widthTop:1,colorTop:y,style:d}},"datechooser-weekday":{style:{widthBottom:1,colorBottom:y,style:d}},"datechooser-week":{style:{widthRight:1,colorRight:y,style:d}},"datechooser-week-header":{style:{widthBottom:1,colorBottom:y,widthRight:1,colorRight:y,style:d}},"tabview-page-button-top":{style:{width:1,color:[v,c,c,v],innerWidth:1,innerColor:[z,q,q,z],widthBottom:0,innerWidthBottom:0}},"tabview-page-button-bottom":{style:{width:1,color:[v,c,c,v],innerWidth:1,innerColor:[z,q,q,z],widthTop:0,innerWidthTop:0}},"tabview-page-button-left":{style:{width:1,color:[v,c,c,v],innerWidth:1,innerColor:[z,q,q,z],widthRight:0,innerWidthRight:0}},"tabview-page-button-right":{style:{width:1,color:[v,c,c,v],innerWidth:1,innerColor:[z,q,q,z],widthLeft:0,innerWidthLeft:0}},"table-statusbar":{style:{widthTop:1,colorTop:q,styleTop:d}},"table-scroller-header":{style:{widthBottom:1,colorBottom:k,styleBottom:d}},"table-scroller-focus-indicator":{style:{width:2,color:l,style:d}},"table-header-cell":{style:{widthRight:1,colorRight:k,styleRight:d}},"table-header-cell-hovered":{style:{widthRight:1,colorRight:k,styleRight:d,widthBottom:2,colorBottom:f,styleBottom:d}},"progressbar":{style:{backgroundColor:r,width:1,color:g}}}});}
)();
(function(){var a="table-row-background-even",b="decoration/treevirtual/cross_minus.gif",c="radiobutton-hovered",d="menu-slidebar-button",e="keyboard-focus",f="decoration/treevirtual/start_plus.gif",g="background-disabled",h="background",i="scrollbar/button",j="date-chooser-title",k="decoration/cursors/",l="icon/16/actions/dialog-ok.png",m="combobox/button",n="slidebar",o="menu",p="table-scroller-focus-indicator",q="move-frame",r="nodrop",s="date-chooser-selected",t="tabview-page-button-left",u="decoration/arrows/up-small.gif",v="image",w="radiobutton",x="move",y="radiobutton-checked-focused",z="list",A="decoration/arrows/right.gif",B="qx.theme.classic.Appearance",C="decoration/menu/checkbox.gif",D="tooltip-error",E="decoration/arrows/up.gif",F="default",G="button-hovered",H="bold",I="resize-frame",J="decoration/arrows/rewind.gif",K="text-disabled",L="table-scroller-header",M="table-pane",N="white",O="table-header-cell-hover",P="focused-outset",Q="checkbox-hovered",R="text",S="checkbox",T="virtual-list",U="groupbox",V="icon/16/actions/dialog-cancel.png",W="menu-slidebar",X="border-dark",Y="datechooser-date-pane",eJ="background-pane",eF="decoration/treevirtual/cross_plus.gif",eK="decoration/arrows/down-small.gif",eG="qx/icon/Oxygen/16/actions/window-close.png",eH="menu-button",eE="datechooser-week",eI="icon/16/apps/office-calendar.png",eP="datechooser-weekday",eQ="table-header-border",eW="middle",eR="#BABABA",eL="tree",eM="checkbox-undetermined",eN="window-active-caption-text",eO="window-active-caption",eV="icon",fy="checkbox-checked-focused",eX="splitpane",eY="toolbar-separator",eS="groove",eT="invalid",gz="icon/16/places/folder.png",eU="checkbox-pressed",fa="combobox",fb="tree-folder",fc="cell",fh="slidebar/button-forward",fi="tooltip-invalid",fj="icon/16/mimetypes/text-plain.png",fd="decoration/window/restore.gif",fe="scrollbar",ff="decoration/menu/checkbox-invert.gif",fg="right-top",fn="scrollarea",fo="window-inactive-caption-text",gB="inset-thin",fp="text-selected",fk="table-header-cell",fl="button-checked",gA="best-fit",fm="up.gif",ft="checkbox-undetermined-hovered",fu=".png",gG="keep-align",fv="background-focused",fq="tabview-page-button-right",fr="tabview-page-button-top",gE="tabview-page-button-bottom",fs="inset",fw="row-layer",fx="button",fJ="decoration/menu/radiobutton.gif",fI="decoration/arrows/",fH="decoration/table/descending.png",fN="progressbar",fM="tree-file",fL="tooltip-text",fK="checkbox-checked-hovered",fC="left.gif",fB="center",fA="decoration/arrows/up-invert.gif",fz="datechooser/button",fG="alias",fF="datechooser",fE="toolbar-button",fD="outset",fU="decoration/arrows/right-invert.gif",fT="slidebar/button-backward",fS="button-abandoned",fR="radiobutton-checked-disabled",fY="lead-item",fX="checkbox-focused",fW="selectbox",fV="background-light",fQ="decoration/arrows/down.gif",fP="right",fO="decoration/treevirtual/start_minus.gif",gk="main",gj="spinner",gi="button-frame",go="background-field",gn="radiobutton-checked-hovered",gm="popup",gl="treevirtual-folder",gd="decoration/window/minimize.gif",gc="checkbox-checked",gb="table-header-cell-hovered",ga="down.gif",gh="background-selected",gg="window",gf="decoration/treevirtual/end.gif",ge="decoration/treevirtual/end_minus.gif",gu="window-inactive-caption",gt="decoration/menu/radiobutton-invert.gif",gs="text-placeholder",gr="atom",gy="slider",gx="decoration/table/select-column-order.png",gw="decoration/arrows/next.gif",gv="table-header",gq="decoration/treevirtual/only_minus.gif",gp="datechooser-week-header",ed="widget",ec="decoration/window/maximize.gif",gH="decoration/treevirtual/only_plus.gif",ea="checkbox-checked-pressed",eb="date-chooser",dY="decoration/arrows/down-invert.gif",gF="menu-separator",dW="decoration/splitpane/knob-vertical.png",dX=".gif",dV="decoration/arrows/forward.gif",gC="radiobutton-checked-pressed",dT="table-statusbar",dU="radiobutton-pressed",dS="focused-inset",em="decoration/form/",en="light-background",ek="copy",el="table-row-background-selected",ei="radiobutton-focused",ej="decoration/tree/minus.gif",eh="",dR="decoration/splitpane/knob-horizontal.png",ef="outset-thin",eg="textfield",ee="right.gif",eA="radiobutton-checked",ey="decoration/treevirtual/cross.gif",ez="table-scroller/header",ew="decoration/table/ascending.png",ex="decoration/treevirtual/line.gif",ev="tooltip",eB="label",et="decoration/tree/plus.gif",eu="-invalid",es="decoration/treevirtual/end_plus.gif",gD="checkbox-undetermined-focused",eq="toolbar-part-handle",er="decoration/arrows/left.gif",eo="background-invalid",ep="icon/16/places/folder-open.png",eC="decoration/window/close.gif",eD="icon/16/actions/view-refresh.png";qx.Theme.define(B,{appearances:{"widget":{},"label":{style:function(gI){return {textColor:gI.disabled?K:undefined};}
},"image":{style:function(gJ){return {opacity:!gJ.replacement&&gJ.disabled?0.3:undefined};}
},"atom":{},"atom/label":eB,"atom/icon":v,"root":{style:function(gK){return {backgroundColor:h,textColor:R,font:F};}
},"popup":{style:function(gL){return {decorator:gm,backgroundColor:eJ};}
},"tooltip":{include:gm,style:function(gM){return {backgroundColor:ev,textColor:fL,decorator:ev,padding:[1,3,2,3],offset:[15,5,5,5]};}
},"tooltip/atom":gr,"tooltip-error":{include:ev,style:function(gN){return {textColor:fp,showTimeout:100,hideTimeout:10000,decorator:D,font:H,backgroundColor:fi};}
},"tooltip-error/atom":gr,"iframe":{style:function(gO){return {backgroundColor:N,decorator:fs};}
},"move-frame":{style:function(gP){return {decorator:gk};}
},"resize-frame":q,"dragdrop-cursor":{style:function(gQ){var gR=r;if(gQ.copy){gR=ek;}
else if(gQ.move){gR=x;}
else if(gQ.alias){gR=fG;}
;return {source:k+gR+dX,position:fg,offset:[2,16,2,6]};}
},"button-frame":{alias:gr,style:function(gS){if(gS.pressed||gS.abandoned||gS.checked){var gU=!gS.inner&&gS.focused?dS:fs;var gT=[4,3,2,5];}
else {var gU=!gS.inner&&gS.focused?P:fD;var gT=[3,4];}
;return {backgroundColor:gS.abandoned?fS:gS.hovered?G:gS.checked?fl:fx,decorator:gU,padding:gT};}
},"button":{alias:gi,include:gi,style:function(gV){return {center:true};}
},"hover-button":{alias:gr,include:gr,style:function(gW){return {backgroundColor:gW.hovered?gh:undefined,textColor:gW.hovered?fp:undefined};}
},"menubutton":{include:fx,alias:fx,style:function(gX){return {icon:fQ,iconPosition:fP};}
},"splitbutton":{},"splitbutton/button":fx,"splitbutton/arrow":{alias:fx,include:fx,style:function(gY){return {icon:fQ};}
},"scrollarea/corner":{style:function(){return {backgroundColor:h};}
},"scrollarea":ed,"scrollarea/pane":ed,"scrollarea/scrollbar-x":fe,"scrollarea/scrollbar-y":fe,"list":{alias:fn,style:function(ha){var hd;var hc=!!ha.focused;var he=!!ha.invalid;var hb=!!ha.disabled;if(he&&!hb){hd=eo;}
else if(hc&&!he&&!hb){hd=fv;}
else if(hb){hd=g;}
else {hd=N;}
;return {decorator:ha.focused?dS:fs,backgroundColor:hd};}
},"listitem":{alias:gr,style:function(hf){return {gap:4,padding:hf.lead?[2,4]:[3,5],backgroundColor:hf.selected?gh:undefined,textColor:hf.selected?fp:undefined,decorator:hf.lead?fY:undefined,opacity:hf.drag?0.5:undefined};}
},"form-renderer-label":{include:eB,style:function(){return {paddingTop:4};}
},"textfield":{style:function(hg){var hk;var hj=!!hg.focused;var hh=!!hg.invalid;var hi=!!hg.disabled;if(hh&&!hi){hk=eo;}
else if(hj&&!hh&&!hi){hk=fv;}
else if(hi){hk=g;}
else {hk=go;}
;var hl;if(hg.disabled){hl=K;}
else if(hg.showingPlaceholder){hl=gs;}
else {hl=undefined;}
;return {decorator:hg.focused?dS:fs,padding:[2,3],textColor:hl,backgroundColor:hk};}
},"textarea":eg,"checkbox":{alias:gr,style:function(hm){var ho;if(hm.checked){if(hm.disabled){ho=gc;}
else if(hm.focused){ho=fy;}
else if(hm.pressed){ho=ea;}
else if(hm.hovered){ho=fK;}
else {ho=gc;}
;}
else if(hm.undetermined){if(hm.disabled){ho=eM;}
else if(hm.focused){ho=gD;}
else if(hm.hovered){ho=ft;}
else {ho=eM;}
;}
else if(!hm.disabled){if(hm.focused){ho=fX;}
else if(hm.pressed){ho=eU;}
else if(hm.hovered){ho=Q;}
;}
;ho=ho||S;var hn=hm.invalid&&!hm.disabled?eu:eh;return {icon:em+ho+hn+fu,gap:6};}
},"radiobutton":{alias:S,include:S,style:function(hp){var hr;if(hp.checked&&hp.focused){hr=y;}
else if(hp.checked&&hp.disabled){hr=fR;}
else if(hp.checked&&hp.pressed){hr=gC;}
else if(hp.checked&&hp.hovered){hr=gn;}
else if(hp.checked){hr=eA;}
else if(hp.focused){hr=ei;}
else if(hp.pressed){hr=dU;}
else if(hp.hovered){hr=c;}
else {hr=w;}
;var hq=hp.invalid&&!hp.disabled?eu:eh;return {icon:em+hr+hq+fu};}
},"spinner":{style:function(hs){return {decorator:hs.focused?dS:fs,textColor:hs.disabled?K:undefined};}
},"spinner/textfield":{include:eg,style:function(ht){return {decorator:undefined,padding:[2,3]};}
},"spinner/upbutton":{alias:fx,include:fx,style:function(hu){return {icon:u,padding:hu.pressed?[2,2,0,4]:[1,3,1,3],backgroundColor:hu.hovered?G:fx};}
},"spinner/downbutton":{alias:fx,include:fx,style:function(hv){return {icon:eK,padding:hv.pressed?[2,2,0,4]:[1,3,1,3],backgroundColor:hv.hovered?G:fx};}
},"datefield":fa,"datefield/button":{alias:m,include:m,style:function(hw){return {icon:eI,padding:[0,3],backgroundColor:undefined,decorator:undefined};}
},"datefield/list":{alias:fF,include:fF,style:function(hx){return {decorator:hx.focused?dS:fs};}
},"groupbox":{style:function(hy){return {backgroundColor:h};}
},"groupbox/legend":{alias:gr,style:function(hz){return {backgroundColor:h,textColor:hz.invalid?eT:undefined,padding:[1,0,1,4]};}
},"groupbox/frame":{style:function(hA){return {padding:[12,9],marginTop:10,decorator:eS};}
},"check-groupbox":U,"check-groupbox/legend":{alias:S,include:S,style:function(hB){return {backgroundColor:h,textColor:hB.invalid?eT:undefined,padding:[1,0,1,4]};}
},"radio-groupbox":U,"radio-groupbox/legend":{alias:w,include:w,style:function(hC){return {backgroundColor:h,textColor:hC.invalid?eT:undefined,padding:[1,0,1,4]};}
},"toolbar":{style:function(hD){return {backgroundColor:h};}
},"toolbar/part":{},"toolbar/part/container":{},"toolbar/part/handle":{style:function(hE){return {decorator:eq,backgroundColor:h,padding:[0,1],margin:[3,2],allowGrowY:true};}
},"toolbar-separator":{style:function(hF){return {margin:[3,2],decorator:eY};}
},"toolbar-button":{alias:gr,style:function(hG){if(hG.pressed||hG.checked||hG.abandoned){var hI=gB;var hH=[3,2,1,4];}
else if(hG.hovered&&!hG.disabled){var hI=ef;var hH=[2,3];}
else {var hI=undefined;var hH=[3,4];}
;return {cursor:F,decorator:hI,padding:hH,backgroundColor:hG.abandoned?fS:hG.checked?fV:fx};}
},"toolbar-menubutton":{alias:fE,include:fE,style:function(hJ){return {showArrow:true};}
},"toolbar-menubutton/arrow":{alias:v,include:v,style:function(hK){return {source:eK};}
},"toolbar-splitbutton":{},"toolbar-splitbutton/button":fE,"toolbar-splitbutton/arrow":{alias:fE,include:fE,style:function(hL){return {icon:fQ};}
},"slidebar":{},"slidebar/scrollpane":{},"slidebar/content":{},"slidebar/button-forward":{alias:fx,include:fx,style:function(hM){return {icon:hM.vertical?fQ:gw};}
},"slidebar/button-backward":{alias:fx,include:fx,style:function(hN){return {icon:hN.vertical?E:er};}
},"tabview":{},"tabview/bar":{alias:n,style:function(hO){var hP=0,hS=0,hQ=0,hR=0;if(hO.barTop){hQ=-2;}
else if(hO.barBottom){hP=-2;}
else if(hO.barRight){hR=-2;}
else {hS=-2;}
;return {marginBottom:hQ,marginTop:hP,marginLeft:hR,marginRight:hS};}
},"tabview/bar/button-forward":{include:fh,alias:fh,style:function(hT){if(hT.barTop||hT.barBottom){return {marginTop:2,marginBottom:2};}
else {return {marginLeft:2,marginRight:2};}
;}
},"tabview/bar/button-backward":{include:fT,alias:fT,style:function(hU){if(hU.barTop||hU.barBottom){return {marginTop:2,marginBottom:2};}
else {return {marginLeft:2,marginRight:2};}
;}
},"tabview/pane":{style:function(hV){return {backgroundColor:h,decorator:fD,padding:10};}
},"tabview-page":ed,"tabview-page/button":{style:function(ia){var ih;var ie=0,ic=0,hX=0,ib=0;if(ia.barTop||ia.barBottom){var hY=2,hW=2,id=6,ig=6;}
else {var hY=6,hW=6,id=6,ig=6;}
;if(ia.barTop){ih=fr;}
else if(ia.barRight){ih=fq;}
else if(ia.barBottom){ih=gE;}
else {ih=t;}
;if(ia.checked){if(ia.barTop||ia.barBottom){id+=2;ig+=2;}
else {hY+=2;hW+=2;}
;}
else {if(ia.barTop||ia.barBottom){hX+=2;ie+=2;}
else if(ia.barLeft||ia.barRight){ic+=2;ib+=2;}
;}
;if(ia.checked){if(!ia.firstTab){if(ia.barTop||ia.barBottom){ib=-4;}
else {ie=-4;}
;}
;if(!ia.lastTab){if(ia.barTop||ia.barBottom){ic=-4;}
else {hX=-4;}
;}
;}
;return {zIndex:ia.checked?10:5,decorator:ih,backgroundColor:h,padding:[hY,ig,hW,id],margin:[ie,ic,hX,ib],textColor:ia.disabled?K:undefined};}
},"tabview-page/button/label":{alias:eB,style:function(ii){return {padding:ii.focused?[0,1,0,1]:[1,2,1,2],decorator:ii.focused?e:undefined};}
},"tabview-page/button/icon":v,"tabview-page/button/close-button":{alias:gr,style:function(ij){return {icon:eG};}
},"scrollbar":{},"scrollbar/slider":{alias:gy,style:function(ik){return {backgroundColor:fV};}
},"scrollbar/slider/knob":{include:gi,style:function(il){return {height:14,width:14,minHeight:il.horizontal?undefined:9,minWidth:il.horizontal?9:undefined};}
},"scrollbar/button":{alias:fx,include:fx,style:function(im){var io;if(im.up||im.down){if(im.pressed||im.abandoned||im.checked){io=[5,2,3,4];}
else {io=[4,3];}
;}
else {if(im.pressed||im.abandoned||im.checked){io=[4,3,2,5];}
else {io=[3,4];}
;}
;var ip=fI;if(im.left){ip+=fC;}
else if(im.right){ip+=ee;}
else if(im.up){ip+=fm;}
else {ip+=ga;}
;return {padding:io,icon:ip};}
},"scrollbar/button-begin":i,"scrollbar/button-end":i,"slider":{style:function(iq){var ir;if(iq.disabled){ir=g;}
else if(iq.invalid){ir=eo;}
else if(iq.focused){ir=fV;}
else {ir=go;}
;return {backgroundColor:ir,decorator:iq.focused?dS:fs};}
},"slider/knob":{include:gi,style:function(is){return {width:14,height:14,decorator:fD};}
},"tree-folder/open":{style:function(it){return {source:it.opened?ej:et};}
},"tree-folder":{style:function(iu){return {padding:[2,3,2,0],icon:iu.opened?ep:gz,iconOpened:ep,opacity:iu.drag?0.5:undefined};}
},"tree-folder/icon":{style:function(iv){return {padding:[0,4,0,0]};}
},"tree-folder/label":{style:function(iw){return {padding:[1,2],backgroundColor:iw.selected?gh:undefined,textColor:iw.selected?fp:undefined};}
},"tree-file":{include:fb,alias:fb,style:function(ix){return {icon:fj,opacity:ix.drag?0.5:undefined};}
},"tree":{include:z,alias:z,style:function(iy){return {contentPadding:[4,4,4,4]};}
},"treevirtual":{style:function(iz){return {decorator:gk};}
},"treevirtual-folder":{style:function(iA){return {icon:(iA.opened?ep:gz),opacity:iA.drag?0.5:undefined};}
},"treevirtual-file":{include:gl,alias:gl,style:function(iB){return {icon:fj,opacity:iB.drag?0.5:undefined};}
},"treevirtual-line":{style:function(iC){return {icon:ex};}
},"treevirtual-contract":{style:function(iD){return {icon:ej};}
},"treevirtual-expand":{style:function(iE){return {icon:et};}
},"treevirtual-only-contract":{style:function(iF){return {icon:gq};}
},"treevirtual-only-expand":{style:function(iG){return {icon:gH};}
},"treevirtual-start-contract":{style:function(iH){return {icon:fO};}
},"treevirtual-start-expand":{style:function(iI){return {icon:f};}
},"treevirtual-end-contract":{style:function(iJ){return {icon:ge};}
},"treevirtual-end-expand":{style:function(iK){return {icon:es};}
},"treevirtual-cross-contract":{style:function(iL){return {icon:b};}
},"treevirtual-cross-expand":{style:function(iM){return {icon:eF};}
},"treevirtual-end":{style:function(iN){return {icon:gf};}
},"treevirtual-cross":{style:function(iO){return {icon:ey};}
},"window":{style:function(iP){return {contentPadding:[10,10,10,10],backgroundColor:h,decorator:iP.maximized?undefined:gg};}
},"window-resize-frame":I,"window/pane":{},"window/captionbar":{style:function(iQ){return {padding:1,backgroundColor:iQ.active?eO:gu,textColor:iQ.active?eN:fo};}
},"window/icon":{style:function(iR){return {marginRight:4};}
},"window/title":{style:function(iS){return {cursor:F,font:H,marginRight:20,alignY:eW};}
},"window/minimize-button":{include:fx,alias:fx,style:function(iT){return {icon:gd,padding:iT.pressed||iT.abandoned?[2,1,0,3]:[1,2]};}
},"window/restore-button":{include:fx,alias:fx,style:function(iU){return {icon:fd,padding:iU.pressed||iU.abandoned?[2,1,0,3]:[1,2]};}
},"window/maximize-button":{include:fx,alias:fx,style:function(iV){return {icon:ec,padding:iV.pressed||iV.abandoned?[2,1,0,3]:[1,2]};}
},"window/close-button":{include:fx,alias:fx,style:function(iW){return {marginLeft:2,icon:eC,padding:iW.pressed||iW.abandoned?[2,1,0,3]:[1,2]};}
},"window/statusbar":{style:function(iX){return {decorator:gB,padding:[2,6]};}
},"window/statusbar-text":eB,"resizer":{style:function(iY){return {decorator:fD};}
},"splitpane":{},"splitpane/splitter":{style:function(ja){return {backgroundColor:h};}
},"splitpane/splitter/knob":{style:function(jb){return {source:jb.horizontal?dR:dW,padding:2};}
},"splitpane/slider":{style:function(jc){return {backgroundColor:X,opacity:0.3};}
},"selectbox":{include:gi,style:function(jd){var je=fx;if(jd.invalid&&!jd.disabled){je=eo;}
else if(jd.abandoned){je=fS;}
else if(!jd.abandoned&&jd.hovered){je=G;}
else if(!jd.abandoned&&!jd.hovered&&jd.checked){je=fl;}
;return {backgroundColor:je};}
},"selectbox/atom":gr,"selectbox/popup":gm,"selectbox/list":z,"selectbox/arrow":{include:v,style:function(jf){return {source:fQ,paddingRight:4,paddingLeft:5};}
},"datechooser":{style:function(jg){return {decorator:fD};}
},"datechooser/navigation-bar":{style:function(jh){return {backgroundColor:eb,textColor:jh.disabled?K:jh.invalid?eT:undefined,padding:[2,10]};}
},"datechooser/last-year-button-tooltip":ev,"datechooser/last-month-button-tooltip":ev,"datechooser/next-year-button-tooltip":ev,"datechooser/next-month-button-tooltip":ev,"datechooser/last-year-button":fz,"datechooser/last-month-button":fz,"datechooser/next-year-button":fz,"datechooser/next-month-button":fz,"datechooser/button/icon":{},"datechooser/button":{style:function(ji){var jj={width:17,show:eV};if(ji.lastYear){jj.icon=J;}
else if(ji.lastMonth){jj.icon=er;}
else if(ji.nextYear){jj.icon=dV;}
else if(ji.nextMonth){jj.icon=A;}
;if(ji.pressed||ji.checked||ji.abandoned){jj.decorator=gB;}
else if(ji.hovered){jj.decorator=ef;}
else {jj.decorator=undefined;}
;if(ji.pressed||ji.checked||ji.abandoned){jj.padding=[2,0,0,2];}
else if(ji.hovered){jj.padding=1;}
else {jj.padding=2;}
;return jj;}
},"datechooser/month-year-label":{style:function(jk){return {font:H,textAlign:fB};}
},"datechooser/date-pane":{style:function(jl){return {decorator:Y,backgroundColor:eb};}
},"datechooser/weekday":{style:function(jm){return {decorator:eP,font:H,textAlign:fB,textColor:jm.disabled?K:jm.weekend?j:eb,backgroundColor:jm.weekend?eb:j};}
},"datechooser/day":{style:function(jn){return {textAlign:fB,decorator:jn.today?gk:undefined,textColor:jn.disabled?K:jn.selected?fp:jn.otherMonth?K:undefined,backgroundColor:jn.disabled?undefined:jn.selected?s:undefined,padding:[2,4]};}
},"datechooser/week":{style:function(jo){return {textAlign:fB,textColor:j,padding:[2,4],decorator:jo.header?gp:eE};}
},"combobox":{style:function(jp){var jq;if(jp.disabled){jq=g;}
else if(jp.invalid){jq=eo;}
else if(jp.focused){jq=fv;}
else {jq=go;}
;return {decorator:jp.focused?dS:fs,textColor:jp.disabled?K:undefined,backgroundColor:jq};}
},"combobox/button":{alias:fx,include:fx,style:function(jr){return {icon:fQ,backgroundColor:jr.hovered?G:fx};}
},"combobox/popup":gm,"combobox/list":z,"combobox/textfield":{include:eg,style:function(js){return {decorator:undefined,padding:[2,3],backgroundColor:undefined};}
},"menu":{style:function(jt){var ju={backgroundColor:h,decorator:o,spacingX:6,spacingY:1,iconColumnWidth:16,arrowColumnWidth:4,padding:1,placementModeY:jt.submenu||jt.contextmenu?gA:gG};if(jt.submenu){ju.position=fg;ju.offset=[-2,-3];}
;if(jt.contextmenu){ju.offset=4;}
;return ju;}
},"menu/slidebar":W,"menu-slidebar":ed,"menu-slidebar-button":{style:function(jv){return {backgroundColor:jv.hovered?gh:undefined,padding:6,center:true};}
},"menu-slidebar/button-backward":{include:d,style:function(jw){return {icon:jw.hovered?fA:E};}
},"menu-slidebar/button-forward":{include:d,style:function(jx){return {icon:jx.hovered?dY:fQ};}
},"menu-separator":{style:function(jy){return {height:0,decorator:gF,marginTop:4,marginBottom:4,marginLeft:2,marginRight:2};}
},"menu-button":{alias:gr,style:function(jz){return {backgroundColor:jz.selected?gh:undefined,textColor:jz.selected?fp:undefined,padding:[2,6]};}
},"menu-button/icon":{include:v,style:function(jA){return {alignY:eW};}
},"menu-button/label":{include:eB,style:function(jB){return {alignY:eW,padding:1};}
},"menu-button/shortcut":{include:eB,style:function(jC){return {alignY:eW,marginLeft:14,padding:1};}
},"menu-button/arrow":{include:v,style:function(jD){return {source:jD.selected?fU:A,alignY:eW};}
},"menu-checkbox":{alias:eH,include:eH,style:function(jE){return {icon:!jE.checked?undefined:jE.selected?ff:C};}
},"menu-radiobutton":{alias:eH,include:eH,style:function(jF){return {icon:!jF.checked?undefined:jF.selected?gt:fJ};}
},"menubar":{style:function(jG){return {backgroundColor:h,decorator:fD};}
},"menubar-button":{alias:gr,style:function(jH){return {padding:[2,6],backgroundColor:jH.pressed||jH.hovered&&!jH.disabled?gh:undefined,textColor:jH.pressed||jH.hovered?fp:undefined};}
},"colorselector":ed,"colorselector/control-bar":ed,"colorselector/visual-pane":U,"colorselector/control-pane":ed,"colorselector/preset-grid":ed,"colorselector/colorbucket":{style:function(jI){return {decorator:gB,width:16,height:16};}
},"colorselector/preset-field-set":U,"colorselector/input-field-set":{include:U,alias:U,style:function(){return {paddingTop:12};}
},"colorselector/preview-field-set":{include:U,alias:U,style:function(){return {paddingTop:12};}
},"colorselector/hex-field-composite":ed,"colorselector/hex-field":eg,"colorselector/rgb-spinner-composite":ed,"colorselector/rgb-spinner-red":gj,"colorselector/rgb-spinner-green":gj,"colorselector/rgb-spinner-blue":gj,"colorselector/hsb-spinner-composite":ed,"colorselector/hsb-spinner-hue":gj,"colorselector/hsb-spinner-saturation":gj,"colorselector/hsb-spinner-brightness":gj,"colorselector/preview-content-old":{style:function(jJ){return {decorator:gB,width:50,height:10};}
},"colorselector/preview-content-new":{style:function(jK){return {decorator:gB,backgroundColor:N,width:50,height:10};}
},"colorselector/hue-saturation-field":{style:function(jL){return {decorator:gB,margin:5};}
},"colorselector/brightness-field":{style:function(jM){return {decorator:gB,margin:[5,7]};}
},"colorselector/hue-saturation-pane":ed,"colorselector/hue-saturation-handle":ed,"colorselector/brightness-pane":ed,"colorselector/brightness-handle":ed,"table":ed,"table/statusbar":{style:function(jN){return {decorator:dT,paddingLeft:2,paddingRight:2};}
},"table/column-button":{alias:fx,style:function(jO){var jQ,jP;if(jO.pressed||jO.checked||jO.abandoned){jQ=gB;jP=[3,2,1,4];}
else if(jO.hovered){jQ=ef;jP=[2,3];}
else {jQ=undefined;jP=[3,4];}
;return {decorator:jQ,padding:jP,backgroundColor:jO.abandoned?fS:fx,icon:gx};}
},"table-column-reset-button":{extend:eH,alias:eH,style:function(){return {icon:eD};}
},"table-scroller/scrollbar-x":fe,"table-scroller/scrollbar-y":fe,"table-scroller":ed,"table-scroller/header":{style:function(jR){return {decorator:L,backgroundColor:gv};}
},"table-scroller/pane":{style:function(jS){return {backgroundColor:M};}
},"table-scroller/focus-indicator":{style:function(jT){return {decorator:p};}
},"table-scroller/resize-line":{style:function(jU){return {backgroundColor:eQ,width:3};}
},"table-header-cell":{alias:gr,style:function(jV){return {minWidth:13,paddingLeft:2,paddingRight:2,paddingBottom:jV.hovered?0:2,decorator:jV.hovered?gb:fk,backgroundColor:jV.hovered?O:fk,sortIcon:jV.sorted?(jV.sortedAscending?ew:fH):undefined};}
},"table-header-cell/icon":{style:function(jW){return {marginRight:4,opacity:jW.disabled?0.3:1};}
},"table-header-cell/sort-icon":{style:function(jX){return {alignY:eW,opacity:jX.disabled?0.3:1};}
},"table-editor-textfield":{include:eg,style:function(jY){return {decorator:undefined,padding:[2,2]};}
},"table-editor-selectbox":{include:fW,alias:fW,style:function(ka){return {padding:[0,2]};}
},"table-editor-combobox":{include:fa,alias:fa,style:function(kb){return {decorator:undefined};}
},"progressive-table-header":{alias:ez},"progressive-table-header-cell":{style:function(kc){return {decorator:fk,backgroundColor:fk,padding:[0,6,0,6]};}
},"colorpopup":{alias:gm,include:gm,style:function(kd){return {decorator:fD,padding:5,backgroundColor:h};}
},"colorpopup/field":{style:function(ke){return {decorator:gB,margin:2,width:14,height:14,backgroundColor:h};}
},"colorpopup/selector-button":fx,"colorpopup/auto-button":fx,"colorpopup/preview-pane":U,"colorpopup/current-preview":{style:function(kf){return {height:20,padding:4,marginLeft:4,decorator:gB,allowGrowX:true};}
},"colorpopup/selected-preview":{style:function(kg){return {height:20,padding:4,marginRight:4,decorator:gB,allowGrowX:true};}
},"colorpopup/colorselector-okbutton":{alias:fx,include:fx,style:function(kh){return {icon:l};}
},"colorpopup/colorselector-cancelbutton":{alias:fx,include:fx,style:function(ki){return {icon:V};}
},"virtual-list":z,"virtual-list/row-layer":fw,"row-layer":ed,"column-layer":ed,"group-item":{include:eB,alias:eB,style:function(kj){return {padding:4,backgroundColor:eR,textColor:N,font:H};}
},"virtual-selectbox":fW,"virtual-selectbox/dropdown":gm,"virtual-selectbox/dropdown/list":{alias:T},"virtual-combobox":fa,"virtual-combobox/dropdown":gm,"virtual-combobox/dropdown/list":{alias:T},"virtual-tree":{include:eL,alias:eL,style:function(kk){return {itemHeight:21};}
},"virtual-tree-folder":fb,"virtual-tree-file":fM,"cell":{style:function(kl){return {backgroundColor:kl.selected?el:a,textColor:kl.selected?fp:R,padding:[3,6]};}
},"cell-string":fc,"cell-number":{include:fc,style:function(km){return {textAlign:fP};}
},"cell-image":fc,"cell-boolean":fc,"cell-atom":fc,"cell-date":fc,"cell-html":fc,"progressbar":{style:function(kn){return {decorator:fN,padding:[1],backgroundColor:N,width:200,height:20};}
},"progressbar/progress":{style:function(ko){return {backgroundColor:ko.disabled?g:gh};}
},"app-header":{style:function(kp){return {textColor:fp,backgroundColor:gh,padding:[8,12]};}
},"app-header-label":eB,"app-splitpane":{alias:eX,style:function(kq){return {padding:[0,10,10,10],backgroundColor:en};}
}}});}
)();
(function(){var a="Liberation Sans",b="Verdana",c="Bitstream Vera Sans",d="Lucida Grande",e="Tahoma",f="monospace",g="qx.theme.classic.Font",h="Courier New",i="DejaVu Sans Mono";qx.Theme.define(g,{fonts:{"default":{size:11,lineHeight:1.4,family:[d,e,b,c,a]},"bold":{size:11,lineHeight:1.4,family:[d,e,b,c,a],bold:true},"small":{size:10,lineHeight:1.4,family:[d,e,b,c,a]},"monospace":{size:11,lineHeight:1.4,family:[i,h,f]}}});}
)();
(function(){var a="Oxygen",b="qx.theme.icon.Oxygen",c="qx/icon/Oxygen";qx.Theme.define(b,{title:a,aliases:{"icon":c}});}
)();
(function(){var a="black",b="#888888",c="#3E6CA8",d="#3E5B97",e="#EBE9ED",f="#FFFFE1",g="#F3F8FD",h="#A7A6AA",i="#666666",j="#CBC8CD",k="#FFE0E0",l="#F4F4F4",m="#808080",n="#CCCCCC",o="#C82C2C",p="#DBEAF9",q="#BCCEE5",r="#A5BDDE",s="#7CA0CF",t="#EEE",u="#F3F0F5",v="#F6F5F7",w="#FF9999",x="qx.theme.classic.Color",y="css.rgba",z="#990000",A="#F9F8E9",B="white",C="gray",D="#DCDFE4",E="rgba(0, 0, 0, 0.4)",F="#FAFBFE",G="#AAAAAA",H="#85878C";qx.Theme.define(x,{colors:{"background":e,"background-light":u,"light-background":e,"background-focused":g,"background-focused-inner":p,"background-disabled":l,"background-selected":c,"background-field":B,"background-pane":F,"background-invalid":k,"border-lead":b,"border-light":B,"border-light-shadow":D,"border-dark-shadow":h,"border-dark":H,"border-main":H,"border-focused-light":q,"border-focused-light-shadow":r,"border-focused-dark-shadow":s,"border-focused-dark":c,"border-separator":m,"shadow":qx.core.Environment.get(y)?E:i,"invalid":z,"border-focused-invalid":w,"text":a,"text-disabled":h,"text-selected":B,"text-focused":d,"text-placeholder":j,"tooltip":f,"tooltip-text":a,"tooltip-invalid":o,"button":e,"button-hovered":v,"button-abandoned":A,"button-checked":u,"window-active-caption-text":[255,255,255],"window-inactive-caption-text":[255,255,255],"window-active-caption":[51,94,168],"window-inactive-caption":[111,161,217],"date-chooser":B,"date-chooser-title":[116,116,116],"date-chooser-selected":[52,52,52],"effect":[254,200,60],"table-pane":B,"table-header":[242,242,242],"table-header-border":[214,213,217],"table-header-cell":[235,234,219],"table-header-cell-hover":[255,255,255],"table-focus-indicator":[179,217,255],"table-row-background-focused-selected":[90,138,211],"table-row-background-focused":[221,238,255],"table-row-background-selected":[51,94,168],"table-row-background-even":[250,248,243],"table-row-background-odd":[255,255,255],"table-row-selected":[255,255,255],"table-row":[0,0,0],"table-row-line":t,"table-column-line":t,"progressive-table-header":G,"progressive-table-row-background-even":[250,248,243],"progressive-table-row-background-odd":[255,255,255],"progressive-progressbar-background":C,"progressive-progressbar-indicator-done":n,"progressive-progressbar-indicator-undone":B,"progressive-progressbar-percent-background":C,"progressive-progressbar-percent-text":B}});}
)();
(function(){var a="Classic Windows",b="qx.theme.Classic";qx.Theme.define(b,{title:a,meta:{color:qx.theme.classic.Color,decoration:qx.theme.classic.Decoration,font:qx.theme.classic.Font,appearance:qx.theme.classic.Appearance,icon:qx.theme.icon.Oxygen}});}
)();
(function(){var a="Use qx.dev.StackTrace.FORMAT_STACKTRACE instead",b="function",c="<span class='object'>",d="]:",e="&gt;",f="<span class='object' title='Object instance with hash code: ",g="FORMAT_STACK",h="string",k="level-",l="0",m="&lt;",n="<span class='offset'>",o="</span> ",p="}",q=":",r="qx.log.appender.Util",s="&amp;",t="&#39;",u="DIV",v="",w="]",x="'>",y="<span>",z="[",A=", ",B="</span>",C="\n",D="&quot;",E="<span class='type-key'>",F="{",G="</span>:<span class='type-",H="</span>: ",I=" ",J="]</span>: ",K="map",L="?",M="<span class='type-";qx.Bootstrap.define(r,{statics:{toHtml:function(V){var X=[];var T,W,O,Q;X.push(n,this.formatOffset(V.offset,6),o);if(V.object){var N=V.win.qx.core.ObjectRegistry.fromHashCode(V.object);if(N){X.push(f+N.$$hash+x,N.classname,z,N.$$hash,J);}
;}
else if(V.clazz){X.push(c+V.clazz.classname,H);}
;var P=V.items;for(var i=0,U=P.length;i<U;i++ ){T=P[i];W=T.text;if(W instanceof Array){var Q=[];for(var j=0,S=W.length;j<S;j++ ){O=W[j];if(typeof O===h){Q.push(y+this.escapeHTML(O)+B);}
else if(O.key){Q.push(E+O.key+G+O.type+x+this.escapeHTML(O.text)+B);}
else {Q.push(M+O.type+x+this.escapeHTML(O.text)+B);}
;}
;X.push(M+T.type+x);if(T.type===K){X.push(F,Q.join(A),p);}
else {X.push(z,Q.join(A),w);}
;X.push(B);}
else {X.push(M+T.type+x+this.escapeHTML(W)+o);}
;}
;var R=document.createElement(u);R.innerHTML=X.join(v);R.className=k+V.level;return R;}
,formatOffset:function(bb,length){var ba=bb.toString();var bc=(length||6)-ba.length;var Y=v;for(var i=0;i<bc;i++ ){Y+=l;}
;return Y+ba;}
,escapeHTML:function(bd){return String(bd).replace(/[<>&"']/g,this.__ft);}
,__ft:function(bf){var be={"<":m,">":e,"&":s,"'":t,'"':D};return be[bf]||L;}
,toText:function(bg){return this.toTextArray(bg).join(I);}
,toTextArray:function(bn){var bp=[];bp.push(this.formatOffset(bn.offset,6));if(bn.object){var bh=bn.win.qx.core.ObjectRegistry.fromHashCode(bn.object);if(bh){bp.push(bh.classname+z+bh.$$hash+d);}
;}
else if(bn.clazz){bp.push(bn.clazz.classname+q);}
;var bi=bn.items;var bl,bo;for(var i=0,bm=bi.length;i<bm;i++ ){bl=bi[i];bo=bl.text;if(bl.trace&&bl.trace.length>0){if(typeof (this.FORMAT_STACK)==b){qx.log.Logger.deprecatedConstantWarning(qx.log.appender.Util,g,a);bo+=C+this.FORMAT_STACK(bl.trace);}
else {bo+=C+bl.trace;}
;}
;if(bo instanceof Array){var bj=[];for(var j=0,bk=bo.length;j<bk;j++ ){bj.push(bo[j].text);}
;if(bl.type===K){bp.push(F,bj.join(A),p);}
else {bp.push(z,bj.join(A),w);}
;}
else {bp.push(bo);}
;}
;return bp;}
}});}
)();
(function(){var a="html.console",b="qx.log.appender.Native",c="log";qx.Bootstrap.define(b,{statics:{process:function(d){if(qx.core.Environment.get(a)){var f=console[d.level]?d.level:c;if(console[f]){var e=qx.log.appender.Util.toText(d);console[f](e);}
;}
;}
},defer:function(g){qx.log.Logger.register(g);}
});}
)();
(function(){var a='.qxconsole .messages{background:white;height:100%;width:100%;overflow:auto;}',b="Enter",c="px",d='</div>',f="longtap",g='.qxconsole .messages .user-result{background:white}',h='.qxconsole .messages .level-error{background:#FFE2D5}',i="navigationbar",j="div",k="user-command",l='<div class="command">',m="Up",n='.qxconsole .command input:focus{outline:none;}',o='.qxconsole .messages .type-key{color:#565656;font-style:italic}',p="none",q='.qxconsole .messages .type-instance{color:#565656;font-weight:bold}',r='.qxconsole .messages div{padding:0px 4px;}',s='.qxconsole .messages .level-debug{background:white}',t='.qxconsole .messages .type-class{color:#5F3E8A;font-weight:bold}',u="DIV",v='.qxconsole .messages .level-user{background:#E3EFE9}',w='<div class="qxconsole">',x="",y="D",z='.qxconsole .messages .type-map{color:#CC3E8A;font-weight:bold;}',A='.qxconsole .messages .type-string{color:black;font-weight:normal;}',B='.qxconsole .control a{text-decoration:none;color:black;}',C='<div class="messages">',D='.qxconsole .messages .type-boolean{color:#15BC91;font-weight:normal;}',E='<input type="text"/>',F="clear",G='.qxconsole .command input{width:100%;border:0 none;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',H="keypress",I='.qxconsole .messages .type-array{color:#CC3E8A;font-weight:bold;}',J='.qxconsole{z-index:10000;width:600px;height:300px;top:0px;right:0px;position:absolute;border-left:1px solid black;color:black;border-bottom:1px solid black;color:black;font-family:Consolas,Monaco,monospace;font-size:11px;line-height:1.2;}',K='.qxconsole .command{background:white;padding:2px 4px;border-top:1px solid black;}',L='.qxconsole .messages .user-command{color:blue}',M="F7",N="qx.log.appender.Console",O='.qxconsole .messages .level-info{background:#DEEDFA}',P="block",Q='.qxconsole .messages .level-warn{background:#FFF7D5}',R='.qxconsole .messages .type-stringify{color:#565656;font-weight:bold}',S='.qxconsole .messages .user-error{background:#FFE2D5}',T='.qxconsole .control{background:#cdcdcd;border-bottom:1px solid black;padding:4px 8px;}',U='<div class="control"><a href="javascript:qx.log.appender.Console.clear()">Clear</a> | <a href="javascript:qx.log.appender.Console.toggle()">Hide</a></div>',V=">>> ",W="Down",X='.qxconsole .messages .type-number{color:#155791;font-weight:normal;}';qx.Class.define(N,{statics:{__mX:null,__ep:null,__mY:null,__na:null,init:function(){var Y=[J,T,B,a,r,L,g,S,s,O,Q,h,v,A,X,D,I,z,o,t,q,R,K,G,n];qx.bom.Stylesheet.createElement(Y.join(x));var bb=[w,U,C,d,l,E,d,d];var bc=document.createElement(u);bc.innerHTML=bb.join(x);var ba=bc.firstChild;document.body.appendChild(bc.firstChild);this.__mX=ba;this.__ep=ba.childNodes[1];this.__mY=ba.childNodes[2].firstChild;this.__nd();qx.log.Logger.register(this);qx.core.ObjectRegistry.register(this);}
,dispose:function(){qx.event.Registration.removeListener(document.documentElement,H,this.__ne,this);qx.log.Logger.unregister(this);}
,clear:function(){this.__ep.innerHTML=x;}
,process:function(bd){this.__ep.appendChild(qx.log.appender.Util.toHtml(bd));this.__nb();}
,__nb:function(){this.__ep.scrollTop=this.__ep.scrollHeight;}
,__nc:true,toggle:function(){if(!this.__mX){this.init();}
else if(this.__mX.style.display==p){this.show();}
else {this.__mX.style.display=p;}
;}
,show:function(){if(!this.__mX){this.init();}
else {this.__mX.style.display=P;this.__ep.scrollTop=this.__ep.scrollHeight;}
;}
,__ex:[],execute:function(){var bf=this.__mY.value;if(bf==x){return;}
;if(bf==F){this.clear();return;}
;var be=document.createElement(j);be.innerHTML=qx.log.appender.Util.escapeHTML(V+bf);be.className=k;this.__ex.push(bf);this.__na=this.__ex.length;this.__ep.appendChild(be);this.__nb();try{var bg=window.eval(bf);}
catch(bh){qx.log.Logger.error(bh);}
;if(bg!==undefined){qx.log.Logger.debug(bg);}
;}
,__nd:function(e){this.__ep.style.height=(this.__mX.clientHeight-this.__mX.firstChild.offsetHeight-this.__mX.lastChild.offsetHeight)+c;}
,__ne:function(e){if(e instanceof qx.event.type.Tap||e instanceof qx.event.type.Pointer){var bk=e.getTarget();if(bk&&bk.className&&bk.className.indexOf&&bk.className.indexOf(i)!=-1){this.toggle();}
;return;}
;var bj=e.getKeyIdentifier();if((bj==M)||(bj==y&&e.isCtrlPressed())){this.toggle();e.preventDefault();}
;if(!this.__mX){return;}
;if(!qx.dom.Hierarchy.contains(this.__mX,e.getTarget())){return;}
;if(bj==b&&this.__mY.value!=x){this.execute();this.__mY.value=x;}
;if(bj==m||bj==W){this.__na+=bj==m?-1:1;this.__na=Math.min(Math.max(0,this.__na),this.__ex.length);var bi=this.__ex[this.__na];this.__mY.value=bi||x;this.__mY.select();}
;}
},defer:function(bl){qx.event.Registration.addListener(document.documentElement,H,bl.__ne,bl);qx.event.Registration.addListener(document.documentElement,f,bl.__ne,bl);}
});}
)();
(function(){var c="qx.dev.ObjectSummary",d="\n",e=" Objects)\n\n",f=")\r\n",g=" (",h=" Objects)\r\n\r\n",j=": ",k=", ",l="Summary: (";qx.Class.define(c,{statics:{getInfo:function(){var m={};var t=0;var n;var p=qx.core.ObjectRegistry.getRegistry();for(var q in p){n=p[q];if(n&&n.isDisposed()===false){if(m[n.classname]==null){m[n.classname]=1;}
else {m[n.classname]++ ;}
;t++ ;}
;}
;var s=[];for(var o in m){s.push({classname:o,number:m[o]});}
;s.sort(function(a,b){return b.number-a.number;}
);var r=l+t+e;for(var i=0;i<s.length;i++ ){r+=s[i].number+j+s[i].classname+d;}
;return r;}
,getNewObjects:function(){var v={};var F=0;var w;var A=qx.core.ObjectRegistry.getRegistry();var y={};var E;for(var B in A){w=A[B];if(w&&w.isDisposed()===false){var z=w.classname;if(v[z]==null){v[z]=1;}
else {v[z]++ ;}
;E=y[z];if(E==null){E=y[z]=[];}
;E[E.length]=w.toHashCode();F++ ;}
;}
;if(!this._m_dObjectList){this._m_dObjectList={};}
;var u={};for(var z in v){if(!(z in this._m_dObjectList)){this._m_dObjectList[z]=0;}
;if(this._m_dObjectList[z]>=0&&this._m_dObjectList[z]<v[z]){u[z]=v[z]-this._m_dObjectList[z];}
;}
;this._m_dObjectList=v;var D=[];for(var x in u){D.push({classname:x,number:u[x],aHashCode:y[x]});}
;D.sort(function(a,b){return b.number-a.number;}
);var C=l+F+h;for(var i=0;i<D.length;i++ ){C+=D[i].number+j+D[i].classname+g+D[i].aHashCode.join(k)+f;}
;return C;}
}});}
)();


qx.$$loader.init();

