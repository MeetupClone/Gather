import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { fire as firebase } from '../../../fire';
import axios from 'axios';

import { postComment } from '../../../ducks/comment-redux';

export class EventComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentValue: '',
            commentUid: '',
            commentDate: moment().format('MM-DD-YY hh:mm a'),
            userName: '',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(val, prop) {
        this.setState({
            [prop]: val,
        });
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                axios.get(`/api/user/getUserInfo/${user.uid}`).then(result => {
                    this.setState({
                        userName: result.data[0].name,
                    });
                });
            }
        });
    }

    render() {
        const { postComment } = this.props;
        if (this.state.userName) {
            return (
                <div>
                    <textarea
                        type="text"
                        placeholder="Comment"
                        value={this.state.comment}
                        onChange={e =>
                            this.handleChange(e.target.value, 'comment')
                        }
                    />
                    <h4>{this.state.username}</h4>
                    <h4>{this.state.date}</h4>
                    <button
                        onClick={event => {
                            postComment(this.state);
                        }}>
                        Post Comment
                    </button>
                </div>
            );
        } else {
            return <div> </div>;
        }
    }
}

const mapStateToProps = state => {
    return state;
};

const actions = {
    postComment,
};

export default connect(mapStateToProps, actions)(EventComment);
