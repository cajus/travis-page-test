qx.$$packageData['2048']={"locales":{},"resources":{"qx/icon/Oxygen/16/apps/utilities-calculator.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/apps/utilities-notes.png":[16,16,"png","qx"],"qx/icon/Oxygen/16/apps/utilities-terminal.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-calculator.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-notes.png":[16,16,"png","qx"],"qx/icon/Tango/16/apps/utilities-terminal.png":[16,16,"png","qx"]},"translations":{"en":{}}};
qx.Part.$$notifyLoad("2048", function() {
(function(){var a="icon/16/apps/utilities-calculator.png",b="Layout-Settings…",c="Notes",d="icon/16/apps/utilities-notes.png",e="Layout",f="bottom",g="icon/16/apps/utilities-terminal.png",h="Notes…",j="top",k="left",l="Calculator",m="right",n="widgetbrowser.pages.Tab",o="Calculator…";qx.Class.define(n,{extend:widgetbrowser.pages.AbstractPage,construct:function(){widgetbrowser.pages.AbstractPage.call(this);this.__jb=new qx.ui.container.Composite(new qx.ui.layout.Grid(10,20));this.add(this.__jb);this.initWidgets();},members:{__jb:null,initWidgets:function(){var p=this._widgets;var r=this.__nd();r.setBarPosition(j);this.__jb.add(r,{row:0,column:0});p.push(r);var q=this.__nd();q.setBarPosition(f);this.__jb.add(q,{row:0,column:1});p.push(q);var s=this.__nd();s.setBarPosition(k);this.__jb.add(s,{row:1,column:0});p.push(s);var t=this.__nd();t.setBarPosition(m);this.__jb.add(t,{row:1,column:1});p.push(t);},toggleOverflow:function(u,v){if(!v){var w=u.getChildren();for(var i=w.length-1;i>=0;i-- ){u.remove(w[i]);};}else {this.addTabPages(u);};this.addTabPages(u);},__nd:function(){var x=new qx.ui.tabview.TabView();x.toggleOverflow=qx.lang.Function.bind(this.toggleOverflow,this);x.setWidth(400);x.setHeight(200);this.addTabPages(x);return x;},addTabPages:function(y){var B=new qx.ui.tabview.Page(e,g);B.setLayout(new qx.ui.layout.VBox());B.add(new qx.ui.basic.Label(b));y.add(B);var z=new qx.ui.tabview.Page(c,d);z.setLayout(new qx.ui.layout.VBox());z.add(new qx.ui.basic.Label(h));y.add(z);var A=new qx.ui.tabview.Page(l,a);A.setLayout(new qx.ui.layout.VBox());A.add(new qx.ui.basic.Label(o));y.add(A);}}});})();
});