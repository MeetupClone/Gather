import React, {Component} from "react";
var RegistrationDetails = require('./RegistrationDetails');


export default class ImageEngine extends Component {
    render() {
        let options = "";
        let prop = "";
        let ImgSrc = this.props.ImgSrc;
        let urlToBeRendered = "";
        let imgEngUrl = 'imgeng.in/';
        let protocol = [],
            imageProtocol = '',
            renderUrl = '';
        let token = "",
            isLite = false;
        let configObject = {};
        if (!ImgSrc) {
            return "";
        }
        // checking if token is registered
        try {
            configObject = RegistrationDetails;
            token = configObject.token;
            isLite = configObject.is_lite ? true : false;
        } catch (e) {
            //ignore
        }
        // matching images protocol
        try {
            protocol = ImgSrc.split("//");
            if (protocol[0].indexOf('http') === -1) {
                imageProtocol = 'http:';
                ImgSrc = (ImgSrc.indexOf('//') === -1) ? ('http://' + ImgSrc) : (imageProtocol + ImgSrc);
            } else {
                imageProtocol = protocol[0] ? (protocol[0]) : 'http:';
            }


        } catch (e) {
            imageProtocol = 'http:';
            console.log(e);
        }

        // adding token to the URL
        if (token) {
            imgEngUrl = "//" + token + (isLite ? '.lite.imgeng.in/' : '.imgeng.in/');
            imgEngUrl = imageProtocol + imgEngUrl;


        } else {
            imgEngUrl = imageProtocol ? (imageProtocol + "//try." + imgEngUrl) : ("http://try." + imgEngUrl);
        }

        //Applying ImageEngine options
        for (prop in this.props) {
            if (!(prop === 'ImgSrc')) { options = options + (prop + "_" + this.props[prop] + "/"); }
        }
        renderUrl = imgEngUrl + options + ImgSrc;




        return ( <img src = { renderUrl }
            />  )
        }
}
