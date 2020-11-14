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
    Container,
    NavLink
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import Register from './Register';
import classnames from 'classnames';

class Login extends Component {
    constructor() {
        super();
        this.state = {
          email: '',
          password: '',
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
      
      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

      onSubmit(e) {
        e.preventDefault();
    
        const userData = {
          email: this.state.email,
          password: this.state.password
        };
    
        this.props.loginUser(userData);
      }
    
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Login
                </NavLink>
                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle= {this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{ this.state.msg }</Alert> : null }
                        <Form onSubmit={this.onSubmit.bind(this)}>
                            <FormGroup>
                                <Label for='email'><b>Email</b></Label>
                                <Input
                                    className={classnames('mb-3', {
                                        'is-invalid': errors.name
                                    })}
                                    type= "email"
                                    name= "email"
                                    id= "email"
                                    placeholder= "Enter your Email"
                                    value={this.state.email}
                                    onChange= {this.onChange.bind(this)}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name}</div>
                                )}
                                <Label for='password'><b>Password</b></Label>
                                <Input
                                    className={classnames('mb-3', {
                                        'is-invalid': errors.password
                                    })}
                                    type= "password"
                                    name= "password"
                                    id= "password"
                                    placeholder= "Enter the Password"
                                    value= {this.state.password}
                                    onChange= {this.onChange.bind(this)}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}
                                <Button
                                    color= "dark"
                                    style= {{ marginTop: '2rem' }}
                                    block
                                >Login</Button>
                                <Container>
                                    <br/>
                                    <Label style={{ fontSize: '13px' }} for="rememberme"><Input type="checkbox" name="check" /> Remember me</Label>
                                    <span style={{ fontSize: '13px' , float: 'right' }}>Forgot <a href=" ">password?</a></span> <br/>
                                    <Col sm={{ size: 10, offset: 3 }}>
                                        <Label style={{ fontSize: '13px' }}>New to Bookbrary?</Label>
                                        <Label style={{ fontSize: '13px' }} ><Register/></Label>
                                    </Col>
                                </Container>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(mapStateToProps, { loginUser })(Login);