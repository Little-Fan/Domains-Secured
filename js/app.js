/*global define */define([    'marionette',    'views/system/HeaderView',    'views/system/LayoutView',    'views/system/ContentLeftView',    'models/MenusModel'], function (Marionette, HeaderView, LayoutView, ContentLeftView, MenusModel) {    'use strict';    var app = new Marionette.Application();    // 公共通用部分申明    var commonHeaderView,        commonLayoutView,        commonContentLeft,        commonMenus;    // 增加三个区域    app.addRegions({        headerRegion: '#header',        mainRegion: '#main',        footerRegion: '#footer'    });    // 是否已经渲染出公共部分    var isHasCommonView = function(){        return commonHeaderView && commonLayoutView && commonContentLeft && commonMenus;    };    // 首页渲染    app.vent.on('index:initialization', function () {        require([            'views/index/HeaderView',            'views/index/LoginItemView',            'views/index/FooterView',            'models/LoginModel'        ], function (HeaderView, LoginItemView, FooterView, LoginModel) {            var loginModel = new LoginModel();            var headerView = new HeaderView();            var loginItemView = new LoginItemView({                model : loginModel            });            var footerView = new FooterView();            app.headerRegion.show(headerView);            app.mainRegion.show(loginItemView);            app.footerRegion.show(footerView);        })    });    // 后台管理页面公共左菜单栏    app.vent.on('contentLeft:list', function () {        commonMenus = new MenusModel();        commonMenus.fetch();        commonHeaderView = new HeaderView();        commonLayoutView = new LayoutView();        commonContentLeft = new ContentLeftView({            model: commonMenus        });        app.headerRegion.show(commonHeaderView);        app.mainRegion.show(commonLayoutView);        app.footerRegion.reset();        commonLayoutView.leftRegion.show(commonContentLeft);    });    // 域名查询    app.vent.on('domain:query', function () {        // 如果还没有公共菜单视图        if (!isHasCommonView()) {            app.vent.trigger('contentLeft:list');        }        require([            'views/domain-query/DomainQueryView',            'collections/DomainQueryCollection'        ], function (View, DomainQueryCollection) {            var domainQueryCollection  = new DomainQueryCollection();            domainQueryCollection.fetch();            console.log(domainQueryCollection);            // 初始化时,绑定Collection数据            var domainQueryCompositeView  = new View.CompositeView({                collection: domainQueryCollection            });            commonLayoutView.rightRegion.show(domainQueryCompositeView);        })    });    return window.app = app;});