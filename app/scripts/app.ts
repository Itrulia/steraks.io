// import $ from "jquery";

import "../../typings/main.d";
import "./app/app";
import {notify} from "./libs/notification";

jQuery(document).ready(function ($:any) {
    notify({
        message: "This website is under construction and thus slow and has not a productive api key yet.",
        type: "info"
    });
});