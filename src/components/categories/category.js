import React, { Component } from 'react';
import '../../helpers.css'
import './category.css'
import underscore from 'underscore';
export default class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            showCategories: ['Arts',
                'Beliefs',
                'Books',
                'Career',
                'Dance',
                'Family',
                'Fashion',
                'Film',
                'Food',
                'Health',
                'Hobbies',
                'Language', 
                'Learning',
                'LGTBQ',
                'Movements',
                'Music',
                'Other',
                'Outdoors',
                'Pets',
                'Photography',
                'Sci-Fi',
                'Social',
                'Sports',
                'Tech',
                'Writing'
            ]
        }
        this.updateParent = (state) => this.props.updateParent(state)
        this.handleChange = this.handleChange.bind(this)
        this.removeCat = this.removeCat.bind(this)

    }

    handleChange = (val) => {
        let arr = this.state.categories
        arr.push(val)
        this.setState({
            categories: underscore.uniq(arr)
        })
        this.updateParent(this.state.categories)
    }

    removeCat = (cat) => {
        let arr = this.state.categories;
        arr.splice(arr.indexOf(cat), 1)
        this.setState({ categories: arr})
        this.updateParent(this.state.categories)
    }



    render() {
        let selectedCats = this.state.categories.map(x => {
            return (
                <button key={x} value={x} onClick={(event) => {
                    // event.preventDefault();
                    this.removeCat(x);
                }}> {x} </button>
            )
        })

        let showCats = this.state.showCategories.map(x => {
          return (<button key ={x} value={x} onClick={(event) => {
                event.preventDefault();
                this.handleChange(event.target.value)}}> {x}
              </button>)
        })

        return (

        


            <div>
            {selectedCats}
            <br/>
            <br/>
            <br/>
            {showCats}
         
        </div>



        )
    }
}