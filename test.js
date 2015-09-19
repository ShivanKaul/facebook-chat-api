var login = require("./index");

login({email: process.env.FACEBOOK_USERNAME, password: process.env.FACEBOOK_PWD}, function callback (err, api) {
    if(err) return console.error(err);

    console.log(api.getFeed());


});