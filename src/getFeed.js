"use strict";

var utils = require("../utils");
var request = require('request');
var log = require("npmlog");
var cheerio = require("cheerio");
//var master = require("../HEHg7hgYkh_")
//var external = require("../external.js");

module.exports = function (mergeWithDefaults, api, ctx) {
    return function getFeed(callback) {
        //return ctx.userId;
        console.log(ctx);

        //var jar = request.jar();
        //var cookie1 = request.cookie('')
        //var cookie2 = request.cookie('')
        //var cookie3 = request.cookie('')
        //var cookie4 = request.cookie('')
        //var cookie5 = request.cookie('')
        //var cookie6 = request.cookie('')
        //var cookie7 = request.cookie('')
        //var cookie8 = request.cookie('')
        //var cookie9 = request.cookie('')
        //var cookie10 = request.cookie('')

        var url = 'https://www.facebook.com';
        var html = "";
        request.get({url: url, jar: ctx.jar, headers: utils.getHeaders(url)}).on('data', function (data) {
            // decompressed data as it is received
            //console.log('decoded chunk: ' + data)
            html += data;
        }).on('end', function () {


            // store the cookie locally


            //var maybeCookie = ctx.jar.getCookies("https://www.facebook.com");
            //console.log(maybeCookie);

            html = html.split("<!--").join("").split("-->").join("");
            var fs = require('fs');
            fs.writeFile("/tmp/test", html, function(err) {
                if(err) {
                    return console.log(err);
                }

                console.log("The file was saved!");
            });

            //console.log(html);
            var ajaxToken = html.split("ajaxpipe_token\"")[1].split("\"", 2)[1];
            var ajaxPipe = 1; // why? ask Facebook
            console.log(ajaxToken);
            // such hack much wow
            var cursor = html.split("cursor=")[1].split("\"", 2)[1];
            console.log(cursor);
            var feed_stream_id = html.split("feed_stream_")[1].split("\"")[0];
            console.log(feed_stream_id);
            var pager_id = html.split("\"jsmods\":{\"elements\":[[", 2)[1].split("\"", 3)[1];
            console.log(pager_id);
            var section_id = html.split("topnews_main_stream_")[1].split("\"")[0];
            console.log(section_id);

            var sendObject = {
                ajaxpipe: ajaxPipe,
                ajaxpipe_token: ajaxToken,
                no_script_path: 1,
                data: {
                    cursor: cursor,
                    pager_config: {
                        edge: null,
                        source_id: null,
                        section_id: section_id,
                        pause_at: null,
                        stream_id: null,
                        section_type: 1,
                        sizes: null,
                        most_recent: false,
                        ranking_mode: null,
                        query_context: []
                    },
                    pager_id: pager_id,
                    scroll_count: 1,
                    //feed_stream_id: 60355072,
                    client_stories_count: 2
                },
                __user: ctx.userId,
                __a: 1
                //__dyn:
            };


            //var url = 'https://www.facebook.com';
            //var html = "";
            //request.get({url: url, jar: ctx.jar, headers: utils.getHeaders(url)}).on('data', function (data) {
            //    // decompressed data as it is received
            //    //console.log('decoded chunk: ' + data)
            //    html += data;
            //}).on('end', function () {
            //
            //
            //    // store the cookie locally
            //
            //
            //    //var maybeCookie = ctx.jar.getCookies("https://www.facebook.com");
            //    //console.log(maybeCookie);
            //
            //    html = html.split("<!--").join("").split("-->").join("");
            //    var ajaxToken = html.split("ajaxpipe_token\"")[1].split("\"", 2)[1];
            //    var ajaxPipe = 1; // why? ask Facebook
            //    console.log(ajaxToken);
            //    // such hack much wow
            //    var cursor = html.split("cursor=")[1].split("\"", 2)[1];
            //    console.log(cursor);
            //    var feed_stream_id = html.split("feed_stream_")[1].split("\"")[0];
            //    console.log(feed_stream_id);
            //    var pager_id = html.split("\"jsmods\":{\"elements\":[[", 2)[1].split("\"", 3)[1];
            //    console.log(pager_id);
            //    var section_id = html.split("topnews_main_stream_")[1].split("\"")[0];
            //    console.log(section_id);
            //})





            var answer = '';
            url = 'https://www.facebook.com/ajax/pagelet/generic.php/LitestandMoreStoriesPagelet'

            request.get({
                url: url,
                jar: ctx.jar,
                headers: utils.getHeaders(url),
                qs: sendObject
            }).on('data', function (data) {
                answer += data;
            }).on('end', function () {
                console.log("Ended")
                console.log(answer);
                var maybeCookie = ctx.jar.getCookies('https://www.facebook.com/ajax/pagelet/generic.php/LitestandMoreStoriesPagelet')
                console.log(maybeCookie);


                sendObject = mergeWithDefaults({
                    //ajaxpipe: ajaxPipe,
                    //ajaxpipe_token: ajaxToken,
                    no_script_path: 1,
                    data: {
                        cursor: cursor,
                        pager_config: {
                            edge: null,
                            source_id: null,
                            section_id: section_id,
                            pause_at: null,
                            stream_id: null,
                            section_type: 1,
                            sizes: null,
                            most_recent: false,
                            ranking_mode: null,
                            query_context: []
                        },
                        pager_id: 'u_ps_0_0_m',//pager_id,
                        scroll_count: 1,
                        //"__req": "jsonp_2",
                        //feed_stream_id: 60355072,
                        client_stories_count: 2
                    },
                    __user: ctx.userId,
                    __a: 1
                    //__dyn:
                });
                answer = '';
                request.get({
                    url: url,
                    jar: ctx.jar,
                    headers: utils.getHeaders(url),
                    timeout: 60000,
                    gzip: true,
                    qs: sendObject
                }).on('data', function (data) {
                    answer += data;
                }).on('end', function () {
                    console.log("Finally ended")
                    console.log(answer)
                }).on('error', function(){
                    console.log("Got an error :( ")
                })
            })


        });
        //})
        //
        //
        //utils.get("https://www.facebook.com/", ctx.jar)
        //    .then(function (res) {
        //        var html = res.body.split("<!--").join("").split("-->").join("");
        //        var ajaxToken = html.split("ajaxpipe_token\"")[1].split("\"", 2)[1];
        //        var ajaxPipe = 1; // why? ask Facebook
        //        console.log(ajaxToken);
        //        // such hack much wow
        //        var cursor = html.split("cursor=")[1].split("\"", 2)[1];
        //        console.log(cursor);
        //        var feed_stream_id = html.split("feed_stream_")[1].split("\"")[0];
        //        console.log(feed_stream_id);
        //        var pager_id = html.split("\"jsmods\":{\"elements\":[[", 2)[1].split("\"", 3)[1];
        //        console.log(pager_id);
        //        var section_id = html.split("topnews_main_stream_")[1].split("\"")[0];
        //        console.log(section_id);
        //
        //        var sendObject = {
        //            ajaxpipe: ajaxPipe,
        //            ajaxpipe_token: ajaxToken,
        //            no_script_path: 1,
        //            data: {
        //
        //                cursor: cursor,
        //                pager_config: {
        //                    edge: null,
        //                    source_id: null,
        //                    section_id: 408239535924329,//section_id,
        //                    pause_at: null,
        //                    stream_id: null,
        //                    section_type: 1,
        //                    sizes: null,
        //                    most_recent: false,
        //                    ranking_mode: null,
        //                    query_context: []
        //                },
        //                pager_id: pager_id,
        //                scroll_count: 1,
        //                client_stories_count: 2,
        //                feed_stream_id: 60355072
        //            },
        //            __user: ctx.userId,
        //            __a: 1
        //            //__dyn:
        //        };
        //
        //
        //
        //        utils.get("https://www.facebook.com/ajax/pagelet/generic.php/LitestandMoreStoriesPagelet", ctx.jar, sendObject)
        //            //.then(utils.parseResponse)
        //            .then(function(resData) {
        //                console.log(resData);
        //                sendObject = {
        //                    //ajaxpipe: ajaxPipe,
        //                    //ajaxpipe_token: ajaxToken,
        //                    no_script_path: 1,
        //                    data: {
        //
        //                        cursor: cursor,
        //                        pager_config: {
        //                            edge: null,
        //                            source_id: null,
        //                            section_id: 408239535924329,//section_id,
        //                            pause_at: null,
        //                            stream_id: null,
        //                            section_type: 1,
        //                            sizes: null,
        //                            most_recent: false,
        //                            ranking_mode: null,
        //                            query_context: [],
        //                        },
        //                        feed_stream_id: 85195776,
        //                        client_stories_count: 2,
        //                        pager_id: "u_ps_0_0_q",
        //                        scroll_count: 1
        //                    },
        //                    __user: ctx.userId,
        //                    __a: 1
        //                    //__dyn:
        //                };
        //                utils.get("https://www.facebook.com/ajax/pagelet/generic.php/LitestandMoreStoriesPagelet", ctx.jar, sendObject)
        //                    .then(function(final) {
        //                        console.log(final)
        //                    })

        //var nextBatch = resData.jsmods.require.filter(function(v) {
        //    return v[0] === "AddFriendButton";
        //}).map(function(v) {
        //    return v[3][1];
        //});
        //
        //if(nextBatch.length === 0) {
        //    return cb(null, []);
        //}
        //
        //setTimeout(function() {
        //    getFriendsFromId(parseInt(nextBatch[nextBatch.length - 1]), function(err, data) {
        //        cb(err, nextBatch.concat(data));
        //    });
        //}, 100);
        //});
        //})
    }
}
