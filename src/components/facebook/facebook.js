import React,{Component} from 'react';

import './facebook.css'


export default class Facebook extends Component{
    constructor(props){
        super(props);

        this.state ={

        }
    }
// change href w site/event url 
    render(){
        return(
            <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="large" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Share</a></div>
        )
    }
}