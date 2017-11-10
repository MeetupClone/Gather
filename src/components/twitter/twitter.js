import React,{Component} from 'react';

import './twitter.css'
export default class Twitter extends Component{
    constructor(props){
        super(props);

        this.state={

        }
    }
// https%3A%2F%2Fexample.com%2F <-- adding url as query to href
    render(){
        return(
            <div>
            <a href="https://twitter.com/intent/tweet?text=Check%20out%20toGather"
            className="twitter-follow-button"
            data-show-count="false"
            data-show-screen-name="false"
            data-size="large"
          ><img src="http://stockchartguru.com/assets/img/tweet_this.jpg" className="tweet-img" alt="twitter"/>
          </a>
          </div>
        )
    }

}




