import React, { Component } from 'react';
import '../../helpers.css';
import './category.css';
export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            showCategories: [
                'Arts',
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
                'Sci-Fi',
                'Social',
                'Sports',
                'Tech',
                'Writing',
            ],
        };
        this.updateParent = state => this.props.updateParent(state);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeCat = this.removeCat.bind(this);
    }

    handleChange(val) {
        this.state.showCategories.forEach((x, i) => {
            if (val === x) {
                this.state.showCategories.splice(i, 1);
            }
        });
        this.setState(
            {
                categories: [...new Set(this.state.categories.concat(val))],
            },
            () => {
                this.updateParent(this.state.categories);
            }
        );
    }

    removeCat(cat) {
        this.state.categories.forEach((x, i) => {
            if (cat.toLowerCase() === x.toLowerCase()) {
                this.state.categories.splice(i, 1);
                let pushedCats = this.state.showCategories;
                pushedCats.push(x);
                this.setState(
                    { showCategories: pushedCats.concat(x).sort() },
                    () => {
                        this.updateParent(this.state.showCategories);
                    }
                );
            }
        });
    }

    render() {
        return (
            <div>
                <div className="category-buttons-container">
                    {this.state.categories.map(x => {
                        return (
                            <button
                                className="category-chosen-buttons"
                                key={x}
                                value={x}
                                onClick={event => {
                                    event.preventDefault();
                                    this.removeCat(x);
                                }}>
                                {x}
                            </button>
                        );
                    })}
                </div>
                <div className="category-buttons-container">
                    {this.state.showCategories.map(x => {
                        return (
                            <button
                                className="category-buttons random-color"
                                key={x}
                                value={x}
                                onClick={event => {
                                    event.preventDefault();
                                    this.handleChange(event.target.value);
                                }}>
                                {x}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }
}
