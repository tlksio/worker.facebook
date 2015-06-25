var request = require('request');

var config = require('./config.json');
var talks = require('libtlks').talk;


function getUrl(talk) {
    return "http://tlks.io/talk/" + talk.slug;
};

talks.getRandom(config.mongodb, function(err, docs) {
    if (err) {
        throw new Error(err);
    }

    var talk = docs[0];

    console.log(talk);
    var message = talk.title;
        message += "\n\n" + talk.description,
        message += "\n\n" + getUrl(talk);

    var data = {
        message: message,
        link: getUrl(talk),
        access_token: 'CAAFZCzimZAdPsBABll2D9nwWSRy3JGZBXYVowpJLHRNbTgwnpuPEZCFScZCwKP4L2r2HkvCW6u7I8ZBsyVRRGJWhJUAeOuiZBOYzCEiqZBS3D2AtLiprAhZBoHv3ZBTZCllFeZAG4M37TettFJBsLarsYErAUjuttsTid2r4rUviKu0orVcC1hx47tzL'
    };
    request.post({
        url: 'https://graph.facebook.com/v2.3/me/feed',
        form: data
    }, function(err, resp, body) {
        console.log(err);
        console.log(body);
    });
});
