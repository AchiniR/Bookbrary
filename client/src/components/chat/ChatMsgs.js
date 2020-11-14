import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getChat} from '../../actions/chatActions';
import ChatPreview from './ChatPreview';
import { withRouter } from 'react-router-dom';

class ChatMsgs extends Component {
    componentDidMount() {
        this.props.getChat(this.props.id);
    }
     
    render() {
        const {chats, loading} = this.props.chat;
        let message;
        if(chats== null || loading){
            message = <h4> </h4>
        }
        else{
            if(chats.length > 0 ){
                message = chats.map(chat=> (
                     <ChatPreview key={chat._id} chat={chat}/>
                ));
            }else{
                message = <h4> </h4>
            }
        }

        return (
            <div>
                {message}
            </div>
        )
    }
}

ChatMsgs.propTypes = {
    getChat: PropTypes.func.isRequired,
    chat: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    chat: state.chat,
    auth: state.auth
});
  
export default connect(mapStateToProps, { getChat })(withRouter(ChatMsgs));