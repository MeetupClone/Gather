import React, {Component} from 'react';

import './notAuthHome.css';
import {Footer} from '../../events/footer/footer'
export default class NotAuthHome extends Component{
    constructor(props){
        super(props)

        this.state = {
            exhausted: true,
        }
    }
    render(){
        return(
            <div>
              <div>
                <img className="gather-logo-home" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIeLhOTEqGQr6dhj8-s3MumDuNon40G0srsYOGaPgH1glxDFuLaA" alt="gather logo"/>
                <h3>gath·er <br/> ˈɡaT͟Hər <br/> verb <br/> 1. <br/> come together; assemble or accumulate.</h3>
              </div>
              <div className="home-event-card">
                <img className="home-event-card-pic" src="https://petapixel.com/assets/uploads/2015/03/iStock-Unfinished-Business-5.jpg" alt="event pic"/>
                <div >
                  <h2>Explore</h2>
                  <p> Blah Blah Blah</p>
                  <button> Someone Link Me to the events page</button>
                </div>
              </div>
              <div className="home-create-card">
                <div>
                  <h2>Create</h2>
                  <p> Blah Blah Blah</p>
                  <button> Someone Link Me to the login/register page</button>
                </div>
                <img className="home-create-card-pic" src="https://petapixel.com/assets/uploads/2015/03/iStock-Unfinished-Business-5.jpg" alt="create pic"/>

              </div>
              <Footer/>
            </div>
        )
    }
}
