/*global define */define(['marionette'], function (Marionette) {	'use strict';	app.addRegions({		headerRegion: '#header',		mainRegion: '#main',		footerRegion: '#footer'	});    //首页渲染    app.vent.on('index:initialization', function () {        require([            'views/index/HeaderView',            'views/index/LoginItemView',            'views/index/FooterView',            'models/LoginModel'        ], function (Header, Footer, LayoutView, ContentLeft, MenusModel) {            var app = new Marionette.Application();            var loginModel = new LoginModel();            var header = new Header();            var main = new LoginItemView({                model : loginModel            });            var footer = new Footer();            app.header.show(header);            app.main.show(main);            app.footer.show(footer);        })    });    //后台管理页面    app.vent.on('contentLeft:list', function () {        require([            'views/index/HeaderView',            'views/index/FooterView',            'views/system/LayoutView',            'views/system/ContentLeftView',            'models/MenusModel'        ], function (Header, LoginItemView, Footer, LoginModell) {            var menus = new MenusModel();            menus.fetch();            var header = new Header();            var layoutView = new LayoutView();            var footer = new Footer();            var contentLeft = new ContentLeft({                model: menus            });            app.header.show(header);            app.main.show(layoutView);            app.footer.reset();            layoutView.leftRegion.show(contentLeft);        })    });	return window.app = app;});