import React, { Component } from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  FormText
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { createProfile } from '../../actions/profileActions';
import classnames from 'classnames';
class CreateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
          gender: '',
          profilePic: '',
          location: '',
          phoneNumber: '',
          district: '',
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

      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
    
      onSubmit(e) {
        e.preventDefault();
    
        const profileData = {
          profilePic: this.state.profilePic,
          gender: this.state.gender,
          phoneNumber: this.state.phoneNumber,
          district: this.state.district
        };
    
        this.props.createProfile(profileData);
        this.props.history.push('/');
      }
    
     
    
      

      render() {
        const { errors } = this.state;
    
        return (
            <div>
                <Row>
                    <Col sm="12">
                        <Form  className='form' onSubmit={this.onSubmit} encType='multipart/form-data'>
                            <FormGroup row>
                              <Label for='gender' sm={3}><b>Gender</b></Label>
                              <Col>
                                  <FormGroup check>
                                      <Label check>
                                          <Input 
                                              className={classnames( {
                                                  'is-invalid': errors.gender
                                              })}
                                              type="radio" 
                                              name="gender" 
                                              value = "Male" 
                                              onChange= {this.onChange} 
                                          />{' '}Male
                                          {errors.gender && (
                                              <div className="invalid-feedback">{errors.gender}</div>
                                          )}
                                      </Label>
                                  </FormGroup>
                              </Col>
                              <Col>
                                <FormGroup check>
                                  <Label check>
                                      <Input 
                                          className={classnames( {
                                              'is-invalid': errors.gender
                                          })}
                                          type="radio" 
                                          name="gender" 
                                          value = "Female" 
                                          onChange= {this.onChange} 
                                      />{' '}Female   
                                      {errors.gender && (
                                          <div className="invalid-feedback">{errors.gender}</div>
                                      )}
                                  </Label>
                                </FormGroup>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='district' sm={3}><b>District</b></Label>
                                <Col sm={9}>
                                    <Input
                                        className={classnames( {
                                            'is-invalid': errors.district
                                        })}
                                        type= "text"
                                        name= "district"
                                        placeholder= "District"
                                        value = {this.state.district}
                                        onChange= {this.onChange}
                                    />
                                    {errors.district && (
                                        <div className="invalid-feedback">{errors.district}</div>
                                    )}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='phoneNumber' sm={3}><b>Phone Number</b></Label>
                                <Col sm={9}>
                                    <Input
                                        className={classnames( {
                                            'is-invalid': errors.phoneNumber
                                        })}
                                        type= "text"
                                        name= "phoneNumber"
                                        placeholder= "Phone Number"
                                        value = {this.state.phoneNumber}
                                        onChange= {this.onChange}
                                    />
                                    {errors.phoneNumber && (
                                        <div className="invalid-feedback">{errors.phoneNumber}</div>
                                    )}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="uploadImg" sm={3}><b>Profile Pic</b></Label>
                              <Col sm={9}>
                             
                                <Input 
                                    className={classnames( {
                                        'is-invalid': errors.profilePic
                                    })}
                                    type="file" 
                                    name="profilePic"
                                    id="profilePic"  
                                    accept='image/*'
                                    value = {this.state.profilePic} 
                                    onChange= {this.onChange}
                                />
                                {errors.profilePic && (
                                    <div className="invalid-feedback">{errors.profilePic}</div>
                                )}
                                <FormText color="muted">
                                    Upload a profile picture
                                </FormText>
                                
                                
                              </Col>
                            </FormGroup>
                            {/* <FormGroup row>
                                <ReactDropzone
                                    getUploadParams={getUploadParams}
                                    onChangeStatus={handleChangeStatus}
                                    accept='image/*'
                                    onSubmit={handleSubmit}
                                />
                            </FormGroup> */}
                            <FormGroup row>
                                <Button className='postBtn'>OK</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
      }
    }
    
    CreateProfile.propTypes = {
      profile: PropTypes.object.isRequired,
      auth: PropTypes.object.isRequired,
      errors: PropTypes.object.isRequired
    };
    
    const mapStateToProps = state => ({
      profile: state.profile,
      auth: state.auth,
      errors: state.errors
    });
    
    export default connect(mapStateToProps, { createProfile })(
      withRouter(CreateProfile)
    );
