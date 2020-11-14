import React, { Component } from 'react';
import {
    Col,
    Button,
    Form,
    FormGroup,
    Input,
    Row
} from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { addChat } from '../../actions/chatActions';
import {getItem} from '../../actions/itemActions';
import ChatMsgs from './ChatMsgs';
import { withRouter } from 'react-router-dom';

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

      componentDidMount() {
        this.props.getItem(this.props.match.params.id);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) =>{
        e.preventDefault();

        const { items } = this.props.item;
        //create item object
        const newChat = {
            message : this.state.message,
            item: items._id
        };

        this.props.addChat(newChat,this.props.history, items._id);
        // this.props.history.push(`/chat/${items._id}`);

    }

    render() {
        const { errors } = this.state;
        const { items } = this.props.item;
        return (
            <div>
                <Row>
                    <div className="chat">
                        <ChatMsgs id={items._id}/><br/>
                    </div>
                    {/* <Col lg='8' sm='6' md='7'> */}
                        <Form  className='msgForm' onSubmit={this.onSubmit}>
                            <FormGroup row>
                                <Col lg='10' sm='8' md='9' >
                                    <Input
                                        style={{ borderColor: "green", borderWidth: '1.5px', fontSize: "20px", padding: "0px 50px"}}
                                        className={classnames( {
                                            'is-invalid': errors.message
                                        })}
                                        type= "textarea"
                                        name= "message"
                                        placeholder= "Type a message..."
                                        value = {this.state.message}
                                        onChange= {this.onChange}
                                    />
                                    {errors.message && (
                                        <div className="invalid-feedback">{errors.message}</div>
                                    )}
                                </Col> 
                                <Col lg='2' sm='1' md='1'><Button style={{ 
                                   marginTop: "15px",
                                   backgroundColor: "green"
                                }} >Send</Button></Col>
                            </FormGroup>
                        </Form>
                    {/* </Col> */}
                </Row>
            </div>
        )
    }
}

Chat.propTypes = {
    addChat: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    getItem: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    errors: state.errors,
    item: state.item
  });
  
  export default connect(mapStateToProps, { addChat, getItem })(withRouter(Chat));