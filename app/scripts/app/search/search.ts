import {SearchController} from "./SearchController";

'use strict';

export let Search:angular.IModule = angular.module('search', ['ui.router']);
Search.controller('SearchController', SearchController);