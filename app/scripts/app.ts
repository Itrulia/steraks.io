/// <reference path='../../typings/browser.d.ts' />
/// <reference path='decorators/AngularComponent.ts' />

import './app/app';

jQuery(document).ready(function ($:any) {
    $.notification({
        message: 'This website is under construction and thus slow and has not a productive api key yet.',
        type: 'info'
    });
});