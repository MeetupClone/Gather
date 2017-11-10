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
        this.state.showCategories.map((x, i) => {
            if (val === x) {
                this.state.showCategories.splice(i, 1)
            }
        })
        let arr = this.state.categories
        arr.push(val)
        this.setState({
            categories: underscore.uniq(arr)
        })
        this.updateParent(this.state.categories)
    }

    removeCat = (cat) => {
        this.state.categories.map((x, i) => {
            if (cat.toLowerCase() === x.toLowerCase()) {
                this.state.categories.splice(i, 1)
                let pushedCats = this.state.showCategories
                pushedCats.push(x)
                this.setState({showCategories: pushedCats.sort()})
            }
        })
    }



    render() {
        let selectedCats = this.state.categories.map(x => {
            return (

                <button className="category-buttonss" key={x} value={x} onClick={(event) => {
                    event.preventDefault();
                    this.removeCat(x);
                }}> {x} </button>

            )
        })

        let showCats = this.state.showCategories.map(x => {

          return (<button className="category-buttons" key ={x} value={x} onClick={(event) => {

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