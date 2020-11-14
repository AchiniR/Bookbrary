import React, { Component } from 'react';
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
import { connect } from 'react-redux';
import { addSeller } from '../../actions/sellerActions';
import { addPostSellerDetails } from '../../actions/postAction';

class Seller extends Component {
    constructor() {
        super();
        this.state = {
            sellerName: '',
            phoneNumber: '',
            district: '',
            location: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmitSeller = this.onSubmitSeller.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitSeller = (e) =>{
        e.preventDefault();

        const { sellerName, phoneNumber, district, location } = this.state;

         //create item object
        const newSeller = {
            sellerName,
            phoneNumber,
            district,
            location
        };

        this.props.addSeller(newSeller);
        this.props.addPostSellerDetails(newSeller);

        this.props.history.push('/');

    }

    render() {
        const { errors } = this.state;
        return (
            <Row>
                <Col sm="12">
                    <Form className='form' onSubmit={this.onSubmitSeller}>
                        <FormGroup row>
                            <Label for='name' sm={3}><b>Name</b></Label>
                            <Col sm={9}>
                                <Input
                                    className={classnames( {
                                        'is-invalid': errors.sellerName
                                    })}
                                    type= "text"
                                    name= "sellerName"
                                    id= "name"
                                    placeholder= "Name"
                                    value = {this.state.sellerName}
                                    onChange= {this.onChange}
                                />
                                {errors.sellerName && (
                                    <div className="invalid-feedback">{errors.sellerName}</div>
                                )}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='phone' sm={3}><b>Phone</b></Label>
                            <Col sm={9}>
                                <Input
                                    className={classnames( {
                                        'is-invalid': errors.phoneNumber
                                    })}
                                    type= "text"
                                    name= "phoneNumber"
                                    id= "phoneNumber"
                                    placeholder= "Your Mobile number"
                                    value = {this.state.phoneNumber}
                                    onChange= {this.onChange}
                                />
                                {errors.phoneNumber && (
                                    <div className="invalid-feedback">{errors.phoneNumber}</div>
                                )}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='district' sm={3}><b>District</b></Label>
                            <Col sm={9}>
                                <Input className={classnames( {
                                        'is-invalid': errors.district
                                    })} type="select" name="district" id="district" value = {this.state.district} onChange= {this.onChange}>
                                    <option selected>Select District</option>
                                    <option>Any</option>
                                    <option>Ampara</option>
                                    <option>Anuradhapura</option>
                                    <option>Badulla</option>
                                    <option>Batticallo</option>
                                    <option>Colombo</option>
                                    <option>Galle</option>
                                    <option>Gampaha</option>
                                    <option>Hambantota</option>
                                    <option>Jaffna</option>
                                    <option>Kalutara</option>
                                    <option>Kandy</option>
                                    <option>Kegalle</option>
                                    <option>Kilinochchi</option>
                                    <option>Kurunegala</option>
                                    <option>Mannar</option>
                                    <option>Matale</option>
                                    <option>Matara</option>
                                    <option>Monaragala</option>
                                    <option>Mulativu</option>
                                    <option>NuwaraEliya</option>
                                    <option>Polonnaruwa</option>
                                    <option>Puttalam</option>
                                    <option>Rathnapura</option>
                                    <option>Trincomalee</option>
                                    <option>Vavuniya</option>
                                </Input>
                                {errors.district && (
                                    <div className="invalid-feedback">{errors.district}</div>
                                )}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for='location' sm={3}><b>Meetup Location</b></Label>
                            <Col sm={9}>
                                <Input
                                    className={classnames( {
                                        'is-invalid': errors.location
                                    })}
                                    type= "text"
                                    name= "location"
                                    id= "location"
                                    placeholder= "Meetup Location"
                                    value = {this.state.location}
                                    onChange= {this.onChange}
                                />
                                {errors.location && (
                                    <div className="invalid-feedback">{errors.location}</div>
                                )}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Button className='postBtn'>Post</Button>
                        </FormGroup>
                    </Form>
                </Col>
            </Row>
        )}

}

Seller.propTypes = {
    auth: PropTypes.object.isRequired,
    addSeller: PropTypes.func.isRequired,
    addPostSellerDetails: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addSeller, addPostSellerDetails })(Seller);