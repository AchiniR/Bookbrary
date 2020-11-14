import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row
} from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {changePwd} from '../../actions/authActions';
import isEmpty from '../../validation/is-empty'


class Settings extends Component {
    constructor() {
        super();
        this.state = {
          email:'',
          name: '',
          oldpwd: '',
          password: '',
          password2: '',
          errors: {}
        };
    
      
        this.onSubmit = this.onSubmit.bind(this);
    }
        
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.user.user) {
        const user = nextProps.user.user;
  
        // If user field doesnt exist, make empty string
        user.name = !isEmpty(user.name) ? user.name : '';
        user.email = !isEmpty(user.email) ? user.email : '';

        this.setState({
            email: user.email,
            name: user.name
        });
    }
  }
    
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      onSubmit(e) {
        e.preventDefault();
      
        const newPwd = {
          oldPwd: this.state.oldpwd,
          password: this.state.password,
          password2: this.state.password2
        };
    
        this.props.changePwd(newPwd, this.props.history);
      }
    render() {
      const { errors } = this.state;
        return (
            <div >
                <Row>
                    <Col sm="8">
                        <h3>Change Password</h3>
                        <Form onSubmit={this.onSubmit}  style={{margin: '25px 0px 25px 350px' }}>
                            <FormGroup>
                                <Label for='old'>Old Password</Label>
                                <Input
                                    className={classnames('mb-3', {
                                      'is-invalid': errors.name
                                    })}
                                    type= "password"
                                    name= "oldpwd"
                                    id= "oldpwd"
                                    placeholder= "Enter your Old Password"
                                    value = {this.state.oldpwd}
                                    onChange= {this.onChange.bind(this)}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name}</div>
                                )}
                                
                                <Label for='password'>New Password</Label> 
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
                                >Change Password</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

Settings.propTypes = {
  changePwd: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { changePwd })(
  withRouter(Settings)
);