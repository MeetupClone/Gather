const functions = require('firebase-functions');
const moment = require('moment');
const axios = require('axios');
const fs = require("fs");



exports.imageTowebp = functions.storage.object().onChange(event => {
    let picUrl = "https://firebasestorage.googleapis.com/v0/b/gatherv0-b3651.appspot.com/o/" + event.data.name + "?alt=media&token=" + event.data.metadata.firebaseStorageDownloadTokens
    var paramOperation1 = "square";
    var paramValue1 = 100;

    var paramOperation2 = "format";
    var paramValue2 = "webp"; // Other formats available: jpg, gif, tiff and webp.
    var imageFilename = "event.data.name" + ".webp";

    axios.get("http://api.rethumb.com/v1/" + paramOperation1 + "/" + paramValue1 + "/" + paramOperation2 + "/" + paramValue2 + "/" + imageURL,
        function(response) {
        	console.log(response)
            response.pipe(fs.createWriteStream(imageFilename));
        }
    );
});

exports.send_push_notification =
    functions.pubsub.topic('event-push-messages').onPublish((event) => {
        const rounded = Math.round(moment().minute() / 15) * 15;
        let time = moment().minute(rounded).second(0).format()

        console.log(time)

    });