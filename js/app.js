/** * Created by fanxiaolong on 2015/8/25. */requirejs.config({    baseUrl: 'js/lib',    paths: {        app: '../app',        jquery: '../../bower_components/jquery/jquery',        underscore: '../../bower_components/underscore/underscore',        backbone: '../../bower_components/backbone/backbone'    }});require(['app/my'], function (my) {});