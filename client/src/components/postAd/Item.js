import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    FormText,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Row
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addItem } from '../../actions/itemActions';
import { addPostItemDetails } from '../../actions/postAction';
import PostAdLogin from './PostAdLogin';
import classnames from 'classnames';


class Item extends Component {
    constructor() {
        super();
        this.state = {
            bookName: '',
            price: '',
            ISBN: '',
            author: '',
            condition: '',
            description: '',
            category: '',
            images: '',
            categoryName: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmitItem = this.onSubmitItem.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitItem = (e) =>{
        e.preventDefault();


        //create item object
        const newItem = {
            bookName : this.state.bookName,
            price : this.state.price,
            ISBN : this.state.ISBN,
            author : this.state.author,
            condition : this.state.condition,
            description : this.state.description,
            category: this.state.category,
            images: this.state.images
        };

        const newCategory = {
            categoryName: this.state.category,

        }

        this.props.addItem(newItem);
        this.props.addPostItemDetails(newItem);

        this.props.history.push('/seller');
        
    }


    render() {
        const { errors } = this.state;
        return (
            <div>
                { this.props.isAuthenticated ?
                <div>
                    <h4>Book Details</h4>
                    <Row>
                        <Col sm="12">
                            <Form  className='form' onSubmit={this.onSubmitItem}>
                                <FormGroup row>
                                    <Label for='name' sm={3}><b>Book Name</b></Label>
                                    <Col sm={9}>
                                        <Input
                                            className={classnames( {
                                                'is-invalid': errors.bookName
                                            })}
                                            type= "text"
                                            name= "bookName"
                                            placeholder= "Book name"
                                            value = {this.state.bookName}
                                            onChange= {this.onChange}
                                        />
                                        {errors.bookName && (
                                            <div className="invalid-feedback">{errors.bookName}</div>
                                        )}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='price' sm={3}><b>Price</b></Label>
                                    <Col sm={9}>
                                        <Input
                                            className={classnames( {
                                                'is-invalid': errors.price
                                            })}
                                            type= "text"
                                            name= "price"
                                            placeholder= "Price"
                                            value = {this.state.price}
                                            onChange= {this.onChange}
                                        />
                                        {errors.price && (
                                            <div className="invalid-feedback">{errors.price}</div>
                                        )}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='isbn' sm={3}><b>ISBN</b></Label>
                                    <Col sm={9}>
                                        <Input
                                            className={classnames( {
                                                'is-invalid': errors.ISBN
                                            })}
                                            type= "text"
                                            name= "ISBN"
                                            id= "ISBN"
                                            placeholder= "ISBN"
                                            value = {this.state.ISBN}
                                            onChange= {this.onChange}                                        />
                                        {errors.ISBN && (
                                            <div className="invalid-feedback">{errors.ISBN}</div>
                                        )}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='author' sm={3}><b>Author</b></Label>
                                    <Col sm={9}>
                                        <Input
                                            className={classnames( {
                                                'is-invalid': errors.author
                                            })}
                                            type= "text"
                                            name= "author"
                                            id= "author"
                                            placeholder= "Author"
                                            value = {this.state.author}
                                            onChange= {this.onChange}
                                        />
                                        {errors.author && (
                                            <div className="invalid-feedback">{errors.author}</div>
                                        )}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='Condition' sm={3}><b>Condition</b></Label>
                                    <Col>
                                        <FormGroup check>
                                            <Label check>
                                                <Input 
                                                    className={classnames( {
                                                        'is-invalid': errors.condition
                                                    })}
                                                    type="radio" 
                                                    name="condition" 
                                                    value = "New" 
                                                    onChange= {this.onChange} 
                                                />{' '}New
                                                {errors.condition && (
                                                    <div className="invalid-feedback">{errors.condition}</div>
                                                )}
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col><FormGroup check>
                                        <Label check>
                                            <Input 
                                                className={classnames( {
                                                    'is-invalid': errors.condition
                                                })}
                                                type="radio" 
                                                name="condition" 
                                                value = "Good" 
                                                onChange= {this.onChange}  
                                            />{' '}Good
                                            {errors.condition && (
                                                <div className="invalid-feedback">{errors.condition}</div>
                                            )}
                                        </Label>
                                    </FormGroup></Col>
                                    <Col><FormGroup check>
                                        <Label check>
                                            <Input 
                                                className={classnames( {
                                                    'is-invalid': errors.condition
                                                })}
                                                type="radio" 
                                                name="condition" 
                                                value = "Acceptable" 
                                                onChange= {this.onChange} 
                                            />{' '}Acceptable
                                            {errors.condition && (
                                                <div className="invalid-feedback">{errors.condition}</div>
                                            )}
                                        </Label>
                                    </FormGroup></Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='description' sm={3}><b>Description</b></Label>
                                    <Col sm={9}>
                                        <Input
                                            className={classnames( {
                                                'is-invalid': errors.description
                                            })}
                                            type= "textarea"
                                            name= "description"
                                            id= "description"
                                            placeholder= 'condition of the used book, edition and other details'
                                            value = {this.state.description}
                                            onChange= {this.onChange}
                                        />
                                        {errors.description && (
                                            <div className="invalid-feedback">{errors.description}</div>
                                        )}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='category' sm={3}><b>Category</b></Label>
                                    <Col sm={9}>
                                        <Input 
                                            className={classnames( {
                                                'is-invalid': errors.category
                                            })}
                                            type="select" 
                                            name="category" 
                                            id="category" 
                                            value = {this.state.category} 
                                            onChange= {this.onChange}
                                        >
                                            <option selected>Select Category</option>
                                            <option>Fiction</option>
                                            <option>Art</option>
                                            <option>Architecture</option>
                                            <option>Drama</option>
                                            <option>Music</option>
                                            <option>Action</option>
                                            <option>Adventure</option>
                                            <option>Romance</option>
                                            <option>Mystery</option>
                                            <option>Horror</option>
                                            <option>Children's</option>
                                            <option>Travel</option>
                                            <option>Religious</option>
                                            <option>Politics</option>
                                            <option>Science</option>
                                            <option>History</option>
                                            <option>Mathematics</option>
                                            <option>Poetry</option>
                                            <option>Commerce</option>
                                            <option>Comics</option>
                                            <option>CookBooks</option>
                                            <option>Biography</option>
                                            <option>Autobiography</option>
                                            <option>Fantacy</option>
                                            <option>Medical</option>
                                            <option>Engineering</option>
                                            <option>Geography</option>
                                            <option>Physics</option>
                                            <option>Computer Science</option>
                                            <option>Statistics</option>
                                            <option>Sports</option>
                                        </Input>
                                        {errors.category && (
                                            <div className="invalid-feedback">{errors.category}</div>
                                        )}
                                    </Col>
                                </FormGroup>
                                <br />
                                <FormGroup row>
                                    <Label for="uploadImg" sm={3}><b>Images</b></Label>
                                    <Col sm={9}>
                                        <Input 
                                            className={classnames( {
                                                'is-invalid': errors.images
                                            })}
                                            type="file" 
                                            name="images"
                                            id="uploadImg"  
                                            value = {this.state.images} 
                                            onChange= {this.onChange}
                                        />
                                        {errors.images && (
                                            <div className="invalid-feedback">{errors.images}</div>
                                        )}
                                        <FormText color="muted">
                                            Upload an image of the book
                                        </FormText>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Button className='nextBtn'>Save & Continue</Button>
                                </FormGroup>
                            </Form>
                            
                        </Col>
                    </Row>
                    </div>
                : <PostAdLogin/>}
            </div>
        )
    }
}

Item.propTypes = {
    auth: PropTypes.object.isRequired,
    addItem: PropTypes.func.isRequired,
    addPostItemDetails: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addItem, addPostItemDetails })(withRouter(Item));