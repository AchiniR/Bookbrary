import React, { Component } from 'react';
import {
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    NavLink
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';
import Login from './Login';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

class Register extends Component {
    constructor() {
        super();
        this.state = {
          name: '',
          email: '',
          password: '',
          password2: '',
          errors: {}
        };
    
        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
      
      toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentDidMount() {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/');
      }
    }

      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }
    
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2
        };
    
        this.props.registerUser(newUser, this.props.history);
      }
    render() {
      const { errors } = this.state;
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Join Now
                </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle= {this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
                        <Form onSubmit={this.onSubmit.bind(this)}>
                            <FormGroup>
                                <Label for='name'>Name</Label>
                                <Input
                                    className={classnames('mb-3', {
                                      'is-invalid': errors.name
                                    })}
                                    type= "text"
                                    name= "name"
                                    id= "name"
                                    placeholder= "Enter your Name"
                                    value = {this.state.name}
                                    onChange= {this.onChange.bind(this)}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name}</div>
                                )}
                                <Label for='email'>Email</Label>
                                <Input
                                    className={classnames('mb-3', {
                                      'is-invalid': errors.email
                                    })}
                                    type= "email"
                                    name= "email"
                                    id= "email"
                                    placeholder= "Enter your Email"
                                    value = {this.state.email}
                                    onChange= {this.onChange.bind(this)}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                                <Label for='password'>Password</Label> 
                                <Input
                                    className={classnames('mb-3', {
                                      'is-invalid': errors.password
                                    })}
                                    type= "password"
                                    name= "password"
                                    id= "password"
                                    placeholder= "Enter the Password"
                                    value = {this.state.password}
                                    onChange= {this.onChange.bind(this)}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}
                                <Label for='password2'>Confirm Password</Label>
                                <Input
                                    className={classnames('mb-3', {
                                      'is-invalid': errors.password2
                                    })}
                                    type= "password"
                                    name= "password2"
                                    id= "password2"
                                    placeholder= "Re-Enter the Password"
                                    value= {this.state.password2}
                                    onChange= {this.onChange.bind(this)}
                                />
                                {errors.password2 && (
                                    <div className="invalid-feedback">{errors.password2}</div>
                                )}
                                <Button
                                    color= "dark"
                                    style= {{ marginTop: '2rem' }}
                                    block
                                >Register</Button>
                                <br/>
                                <Col sm={{ size: 10, offset: 3 }}>
                                        <Label style={{ fontSize: '13px' }}>Already Registered?</Label>
                                        <Label style={{ fontSize: '13px' }} ><Login/></Label>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { registerUser })(withRouter(Register));