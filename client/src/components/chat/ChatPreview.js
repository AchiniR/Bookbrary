import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {deleteMsg} from '../../actions/chatActions'

class ChatPreview extends Component {
    onDeleteClick(id) {
        this.props.deleteMsg(id);
      }
    render() {
        const {chat} = this.props;
        const {user} = this.props.auth;
        let date = new Date(chat.date);

        return (
            <div>
                { user.id === chat.user ?
                    <div>
                        <div className="chatContainerDarker">
                            <Label style={{textAlign: "right"}}>
                                {chat.message}
                            </Label><br/>
                            
                            <span className="time-right">{date.toLocaleTimeString()} {date.toLocaleDateString()}</span>
                        </div>
                        <button
                                onClick={this.onDeleteClick.bind(this, chat._id)}
                                type="button"
                                className="btn btn-danger mr-1"
                                style={{float: "right",marginRight: "2px"}}
                            >
                                {/* <i className="fas fa-times" /> */}
                                Delete
                            </button><br/>

                    </div>
                    :
                    <div>
                        <div className="chatContainer">
                            <Label style={{textAlign: "left"}}>
                                {chat.message}
                            </Label><br/>
                            <span className="time-left">{date.toLocaleTimeString()} {date.toLocaleDateString()}</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

ChatPreview.propTypes = {
    deleteMsg: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
  

export default connect(mapStateToProps, {deleteMsg})(withRouter(ChatPreview));
