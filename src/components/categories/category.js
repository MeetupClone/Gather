import React, {Component} from 'react';
import '../../helpers.css'
import './category.css'
export default class Category extends Component {
  constructor(props){
  super(props)
  this.state={
    categories: []
  }

this.handleChange = this.handleChange.bind(this)

    }

    handleChange = (event) => {
      console.log(event)
      let currentState = this.state.categories

      let newState = currentState.push(event.target.value)

      console.log(newState)

      this.setState({categories: newState})

    }


  render(){
    return(



        <div>

          <div className="radio">
            <label>
              <input type="radio" value="arts" onChange={(event) => this.handleChange(event)} checked={true}/>
              Arts
            </label>
          </div>
          

          <div className="radio">
            <label>
              <input type="radio" value="beliefs" onChange={(event) => this.handleChange(event)} checked={true}/>
              Beliefs
            </label>
          </div>


          <div className="radio">
            <label>
              <input type="radio" value="books" onChange={(event) => this.handleChange(event)} checked={true}/>
              Book Clubs
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="career" onChange={(event) => this.handleChange(event)} checked={true}/>
              Career
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="dance" onChange={(event) => this.handleChange(event)} checked={true}/>
              Dance
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="family" onChange={(event) => this.handleChange(event)} checked={true}/>
              Family
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="fashion" onChange={(event) => this.handleChange(event)} checked={true}/>
              Fashion
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="film" onChange={(event) => this.handleChange(event)} checked={true}/>
              Film
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="food" onChange={(event) => this.handleChange(event)} checked={true}/>
              Food
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="health" onChange={(event) => this.handleChange(event)} checked={true}/>
              Health
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="hobbies" onChange={(event) => this.handleChange(event)} checked={true}/>
              Hobbies
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="language" onChange={(event) => this.handleChange(event)} checked={true}/>
              Language
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="learning" onChange={(event) => this.handleChange(event)} checked={true}/>
              Learning
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="lgbtq" onChange={(event) => this.handleChange(event)} checked={true}/>
              LGBTQ
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="movements" onChange={(event) => this.handleChange(event)} checked={true}/>
              Movements
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="music" onChange={(event) => this.handleChange(event)} checked={true}/>
              Music
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="other" onChange={(event) => this.handleChange(event)} checked={true}/>
              Other
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="outdoors" onChange={(event) => this.handleChange(event)} checked={true}/>
              Outdoors
            </label>
          </div>

          <div className="radio">
            <label>
              <input type="radio" value="pets" onChange={(event) => this.handleChange(event)} checked={true}/>
              Pets
            </label>
          </div>

          <div className="radio">
            <label>
              <input type="radio" value="photography" onChange={(event) => this.handleChange(event)} checked={true}/>
              Photography
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="sci-fi" onChange={(event) => this.handleChange(event)} checked={true}/>
              Sci-Fi
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="social" onChange={(event) => this.handleChange(event)} checked={true}/>
              Social
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="sports" onChange={(event) => this.handleChange(event)} checked={true}/>
              Sports
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="tech" onChange={(event) => this.handleChange(event)} checked={true}/>
              Tech
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" value="writing" onChange={(event) => this.handleChange(event)} checked={true}/>
              Writing
            </label>
          </div>
        </div>



    )
  }
}
