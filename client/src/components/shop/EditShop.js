import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { updateShop } from '../../actions/shopActions';
import isEmpty from '../../validation/is-empty';
import classnames from 'classnames';
import {
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row
} from 'reactstrap';

class EditShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title: '',
        description: '',
        opening_Hours: '',
        address: '',
        phone: '',
        email: '',
        errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:3000/shop/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    opening_Hours: response.data.opening_Hours,
                    address: response.data.address,
                    phone: response.data.phone,
                    email: response.data.email,
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.shop.shop) {
      const shop = nextProps.shop.shop;

      // If shop field doesnt exist, make empty string
      shop.title = !isEmpty(shop.title) ? shop.title : '';
      shop.description = !isEmpty(shop.description) ? shop.description : '';
      shop.opening_Hours = !isEmpty(shop.opening_Hours) ? shop.opening_Hours : '';
      shop.address = !isEmpty(shop.address) ? shop.address : '';
      shop.phone = !isEmpty(shop.phone) ? shop.phone : '';
      shop.email = !isEmpty(shop.social.email) ? shop.social.email : '';

      // Set component fields state
      this.setState({
        title: shop.title,
        description: shop.description,
        opening_Hours: shop.opening_Hours,
        address: shop.address,
        phone: shop.phone,
        email: shop.email
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const shopData = {
      title: this.state.title,
      description: this.state.description,
      opening_Hours: this.state.opening_Hours,
      address: this.state.address,
      phone: this.state.phone,
      email: this.state.email,
    };

    this.props.updateShop(shopData);
    this.props.history.push('/view');    
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
        <div>
            <h4>Shop Details</h4>
            <Row>
                <Col lg='12' sm='11' md='10'>
                    <Form  className='form' onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for='title' sm={3}><b>Title</b></Label>
                            <Col lg='6' sm='4' md='5'>
                                <Input
                                    className={classnames( {
                                        'is-invalid': errors.title
                                    })}
                                    type= "text"
                                    name= "title"
                                    placeholder= "Title"
                                    value = {this.state.title}
                                    onChange= {this.onChange}
                                />
                                {errors.title && (
                                    <div className="invalid-feedback">{errors.title}</div>
                                )}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='description' sm={3}><b>Description</b></Label>
                            <Col lg='6' sm='4' md='5'>
                                <Input
                                    className={classnames( {
                                        'is-invalid': errors.description
                                    })}
                                    type= "textarea"
                                    name= "description"
                                    id= "description"
                                    placeholder= 'Description of the shop'
                                    value = {this.state.description}
                                    onChange= {this.onChange}
                                />
                                {errors.description && (
                                    <div className="invalid-feedback">{errors.description}</div>
                                )}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='opening_Hours' sm={3}><b>Opening Hours</b></Label>
                            <Col lg='6' sm='4' md='5'>
                                <Input 
                                    className={classnames( {
                                        'is-invalid': errors.opening_Hours
                                    })}
                                    type="text" 
                                    name="opening_Hours" 
                                    id="opening_Hours" 
                                    placeholder= 'Opening Hours'
                                    value = {this.state.opening_Hours} 
                                    onChange= {this.onChange}
                                >
                                </Input>
                                {errors.opening_Hours && (
                                    <div className="invalid-feedback">{errors.opening_Hours}</div>
                                )}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='address' sm={3}><b>Address</b></Label>
                            <Col lg='6' sm='4' md='5'>
                                <Input
                                    className={classnames( {
                                        'is-invalid': errors.address
                                    })}
                                    type= "text"
                                    name= "address"
                                    id= "address"
                                    placeholder= "Address"
                                    value = {this.state.address}
                                    onChange= {this.onChange}
                                />
                                {errors.address && (
                                    <div className="invalid-feedback">{errors.address}</div>
                                )}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='phone' sm={3}><b>Phone</b></Label>
                            <Col lg='6' sm='4' md='5'>
                                <Input
                                    className={classnames( {
                                        'is-invalid': errors.phone
                                    })}
                                    type= "text"
                                    name= "phone"
                                    id= "phone"
                                    placeholder= "Your Mobile number"
                                    value = {this.state.phone}
                                    onChange= {this.onChange}
                                />
                                {errors.phone && (
                                    <div className="invalid-feedback">{errors.phone}</div>
                                )}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='email' sm={3}><b>Email</b></Label>
                            <Col lg='6' sm='4' md='5'>
                                <Input className={classnames( {
                                        'is-invalid': errors.email
                                    })} 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    placeholder= "Shop Email Address"
                                    value = {this.state.email} 
                                    onChange= {this.onChange}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                            </Col>
                        </FormGroup>
                            <FormGroup row>
                                <Button className='postBtn'>Create</Button>
                            </FormGroup>
                        </Form>   
                    </Col>
                </Row>
            </div>
    );
  }
}

EditShop.propTypes = {
  updateShop: PropTypes.func.isRequired,
  shop: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  shop: state.shop,
  errors: state.errors
});

export default connect(mapStateToProps, { updateShop })(
  withRouter(EditShop)
);
