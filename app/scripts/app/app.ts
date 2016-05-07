"use strict";

import * as angular from "angular";
import * as localforage from "localforage";
import {CacheService} from "./service/CacheService";
import {Application} from "./Application";

Application.config(["$locationProvider", "$httpProvider", "$compileProvider", (
    $locationProvider:angular.ILocationProvider,
    $httpProvider:angular.IHttpProvider,
    $compileProvider:angular.ICompileProvider
) => {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

	$httpProvider.useApplyAsync(true);
	$compileProvider.debugInfoEnabled(false);
}]);

Application.config(["ChartJsProvider", (ChartJsProvider) => {
    ChartJsProvider.setOptions({
        colours: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
        ],
        responsive: true
    });
}]);

Application.config(["$httpProvider", ($httpProvider:angular.IHttpProvider) => {
    $httpProvider.interceptors.push("ServerErrorInterceptor");
}]);

Application.config(["$urlRouterProvider", "$stateProvider", (
    $urlRouterProvider:angular.ui.IUrlRouterProvider,
    $stateProvider:any
) => {
    // remove trailing slash
    $urlRouterProvider.rule(function ($injector, $location) {
        let path = $location.path();
        if (path != "/" && path.slice(-1) === "/") {
            $location.replace().path(path.slice(0, -1));
        }
    });

    $stateProvider.state("index", {
        url: "/",
        templateUrl: "index.html",
        data: {
            toolbar: false,
            search: false,
            footer: true,
            title: "Steraks"
        }
    }).state("about", {
        url: "/about",
        templateUrl: "about.html",
        data: {
            toolbar: true,
            search: true,
            footer: true,
            title: "About Steraks"
        }
    }).state("contact", {
        url: "/contact",
        templateUrl: "contact.html",
        data: {
            toolbar: true,
            search: true,
            footer: true,
            title: "Contact Steraks"
        }
    });
}]);

Application.config(["$localForageProvider", ($localForageProvider:any) => {
    let localForage:LocalForage = localforage as any;

    $localForageProvider.config({
        driver: [localForage.INDEXEDDB, localForage.LOCALSTORAGE],
        name: "steraks.io",
        version: 1.0,
        storeName: "static",
        description: "Steraks.io static data storage"
    });
}]);

// Cache Cleanup
Application.run(["$interval", "CacheService", (
    $interval:angular.IIntervalService,
    CacheService: CacheService
) => {
    CacheService.cleanUp();

    let interval = 1000 * 60 * 10; // 10min
    $interval(() => {
        CacheService.cleanUp();
    }, interval, 0, false);
}]);

// Analytics
Application.config(["AnalyticsProvider", (AnalyticsProvider:any) => {
    AnalyticsProvider
        .useAnalytics(true)
        .logAllCalls(true)
        .trackPages(false)
        .setDomainName("steraks.io")
        .setAccount("UA-76478578-1");
}]);

Application.run(["$location", "$transitions", "Analytics", (
    $location:any,
    $transitions:any,
    Analytics:any
) => {
    $transitions.onSuccess({}, () => {
        Analytics.trackPage($location.path());
    });
}]);

// Service Worker
Application.run([() => {
    if("serviceWorker" in navigator) {
        navigator.serviceWorker.register("/scripts/workers/service-worker.js");
    }
}]);

Application.run(["$rootScope", "$state", "$window", "$transitions", (
    $rootScope:any,
    $state:angular.ui.IStateService,
    $window:angular.IWindowService,
    $transitions:any
) => {
    $rootScope.$state = $state;

    // scroll to top..
    $transitions.onSuccess({}, ["$transition$", ($transition$:any) => {
        let fromState = $transition$.from();
        let toState = $transition$.to();

        if (fromState.name !== "") {
            let fromParent = fromState.name.split(".");
            let fromLength = fromParent.length;

            let toParent = toState.name.split(".");
            let toLength = toParent.length;

            if (fromLength === 1 ||
                toLength === 1 ||
                fromLength !== toLength ||
                fromParent[fromLength - 2] !== toParent[toLength - 2]
            ) {
                $window.scrollTo(0, 0);
            }
        }
    }]);

    // I am too lazy to refactor
    $rootScope.KDA = (stats:any) => {

        if (stats.hasOwnProperty("kills")) {
            return (stats.kills + stats.assists) / Math.max(1, stats.deaths);
        }

        if (stats.hasOwnProperty("totalChampionKills")) {
            return (stats.totalChampionKills + stats.totalAssists) / Math.max(1, stats.totalDeathsPerSession);
        }

        return 0;
    };

    $rootScope.getPosition = (player:any) => {
        let lane = player.timeline.lane.toLowerCase();
        let role = player.timeline.role.toLowerCase();

        if (role === "duo_carry") {
            return "adc"
        } else if (role === "duo_support") {
            return "support";
        }

        if (lane === "top") {
            return "top";
        } else if (lane === "middle") {
            return "mid";
        } else if (lane === "jungle") {
            return "jungle";
        } else if (lane === "bottom") {
            return "bot";
        }

        return "unknown";
    }
}]);