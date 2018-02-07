import React, { Component } from 'react';

import { connect } from 'react-redux';

import { editGroup, deleteGroup } from 'ducks/group-redux';

export class GroupDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = props.props;

        this.handleChange = this.handleChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ groupDesc: event.target.value });
    }

    submitImageUpload(event) {
        event.preventDefault();

        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
            });
        };
        reader.readAsDataURL(file);
    }

    render() {
        const { deleteGroup } = this.props;
        let notAuthenticated = null;
        let deleteConfirmPopup = null;
        let deleteConfirm = null;
        let finalDeleteButton = null;

        if (this.state.groupOrganizerUid !== this.state.currentUserUid) {
            notAuthenticated = (
                <h1>
                    {' '}
                    You can't edit this group, you aren't the group owner.{' '}
                </h1>
            );
        } else {
            deleteConfirm = (
                <button onClick={() => this.setState({ deleteConfirm: true })}>
                    Delete group
                </button>
            );
        }

        if (this.state.groupName === this.state.confirmDeleteInput) {
            finalDeleteButton = (
                <div>
                    <br />
                    <button onClick={() => deleteGroup(this.state)}>
                        {' '}
                        Delete group{' '}
                    </button>
                </div>
            );
        }

        if (this.state.deleteConfirm) {
            deleteConfirm = (
                <div>
                    <h1> Are you sure you want to delete this group? </h1>
                    <h3> Type the name of your group to delete the group. </h3>
                    <input
                        onChange={event => {
                            this.setState({
                                confirmDeleteInput: event.target.value,
                            });
                        }}
                    />
                    {finalDeleteButton}
                </div>
            );
        }

        return (
            <div>
                {notAuthenticated}
                {deleteConfirm}
                {deleteConfirmPopup}
                <br />
                Change Your Group Name
                <input
                    placeholder={this.state.groupName}
                    onChange={event => {
                        this.setState({ groupName: event.target.data });
                    }}
                />
                <br />
                <img
                    src={this.state.imagePreviewUrl || this.state.groupPic}
                    alt={this.state.groupName}
                />
                <input
                    className="fileInput"
                    type="file"
                    onChange={event => this.submitImageUpload(event)}
                />
                <br />
                Change Your Group Description
                <textarea
                    type="text"
                    id="noter-text-area"
                    name="editableDescription"
                    value={this.state.groupDesc}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

const actions = {
    editGroup,
    deleteGroup,
};

export default connect(mapStateToProps, actions)(GroupDashboard);
