import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { addReview } from '../../actions/reviewActions'


class AddReview extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            text: '',
            ratings: '',
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


    onSubmit = (e) =>{
        e.preventDefault();

        //create review object
        const newReview = {
            text : this.state.text,
            name : this.state.name,
            ratings: this.state.ratings
        };

        this.props.addReview(newReview, this.props.match.params.id);
        this.props.history.push(`/items/${this.props.match.params.id}`)

    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <h4>Write a Review</h4>
                <Row>
                    <Col lg='12' sm='11' md='10'>
                        <Form  className='form' onSubmit={this.onSubmit}>
                            <FormGroup row>
                                <Label for='name' sm={3}><b>Name</b></Label>
                                <Col lg='6' sm='4' md='5'>
                                    <Input
                                        className={classnames( {
                                            'is-invalid': errors.name
                                        })}
                                        type= "text"
                                        name= "name"
                                        placeholder= "Your Name"
                                        value = {this.state.name}
                                        onChange= {this.onChange}
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='text' sm={3}><b>Write Your Review</b></Label>
                                <Col lg='6' sm='4' md='5'>
                                    <Input
                                        className={classnames( {
                                            'is-invalid': errors.text
                                        })}
                                        type= "textarea"
                                        name= "text"
                                        id= "text"
                                        placeholder= 'Review'
                                        value = {this.state.text}
                                        onChange= {this.onChange}
                                    />
                                    {errors.text && (
                                        <div className="invalid-feedback">{errors.text}</div>
                                    )}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for='ratings' sm={3}><b>Add Rating value</b></Label>
                                <Col lg='6' sm='4' md='5'>
                                    <Input 
                                        className={classnames( {
                                            'is-invalid': errors.ratings
                                        })}
                                        type="number" 
                                        name="ratings" 
                                        id="ratings" 
                                        placeholder= 'number'
                                        value = {this.state.ratings} 
                                        onChange= {this.onChange}
                                    >
                                    </Input>
                                    {errors.ratings && (
                                        <div className="invalid-feedback">{errors.ratings}</div>
                                    )}
                                    <FormText color="muted">
                                    Value should be between 0 and 5
                                    </FormText>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Button className='postBtn'>Submit</Button>
                            </FormGroup>
                        </Form>   
                    </Col>
                </Row>
            </div>
        )
    }
}

AddReview.propTypes = {
    addReview: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { addReview })(withRouter(AddReview));
