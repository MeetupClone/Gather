import React, { Component } from "react";



export default class EditEvent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            eventName: "",
            eventDate: "",
            eventLocation: "",
            eventDescription: "",
            eventPic: "",
            organizerUid: '',
            currentUserUid: ''
        }


    }

    render() {
    	console.log("hello?")
        return (
            <div>
    		edit event
    		</div>
        )

    }

}