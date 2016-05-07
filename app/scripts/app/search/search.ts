'use strict';

//import * as uiRouter from 'angular-ui-router';
import {SearchController} from "./SearchController";

export let Search:angular.IModule = angular.module('search', ['ui.router']);
Search.controller('SearchController', SearchController);