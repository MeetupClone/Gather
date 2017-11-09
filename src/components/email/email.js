import React,{Component} from 'react'

import './email.css'

export default class Email extends Component{
    constructor(props){
        super(props)

        this.state = {}
    }

    
    render(){
        return(
            <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site http://www.website.com."
            title="Share by Email">
           <img src="https://www.genbook.com/blog/wp-content/uploads/2014/09/email.png" className="email-pic"/>
         </a>
        )
    }
}