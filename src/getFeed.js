/*jslint node: true */
"use strict";

var utils = require("../utils");
var log = require("npmlog");


module.exports = function (mergeWithDefaults, api, ctx) {
    return function getFeed(callback) {
        //return ctx.userId;
        console.log(ctx)

        utils.get("https://www.facebook.com/", ctx.jar)
            .then(function (res) {
                var html = res.body.split("<!--").join("").split("-->").join("");
                // such hack much wow
                var ajaxToken = html.split("ajaxpipe_token\"")[1].split("\"", 2)[1];


                //};
                })
    }
}
