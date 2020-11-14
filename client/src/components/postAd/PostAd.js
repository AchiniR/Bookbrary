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
import PostAdLogin from './PostAdLogin';
import { addItem } from '../../actions/itemActions';

class PostAd extends Component {
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
            image: null,
            sellerName: '',
            phoneNumber: '',
            district: '',
            item_id: '',
            categoryName: '',
            errors: {}
        };

        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
        this.onSubmitItem = this.onSubmitItem.bind(this);
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

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeFile(e) {
        this.setState({ [e.target.name]: e.target.files[0] });
    }

    onSubmitItem = (e) =>{
        e.preventDefault();
        const data = new FormData() 

        //create item object
        const newItem = {
            bookName : this.state.bookName,
            price : this.state.price,
            ISBN : this.state.ISBN,
            author : this.state.author,
            condition : this.state.condition,
            description : this.state.description,
            category: this.state.category,
            image: this.state.image,
            sellerName: this.state.sellerName,
            phoneNumber: this.state.phoneNumber,
            district: this.state.district,
        };

        data.append('image', newItem.image)
        data.append('bookName', newItem.bookName)
        data.append('price', newItem.price)
        data.append('ISBN', newItem.ISBN)
        data.append('author', newItem.author)
        data.append('condition', newItem.condition)
        data.append('description', newItem.description)
        data.append('category', newItem.category)
        data.append('sellerName', newItem.sellerName)
        data.append('phoneNumber', newItem.phoneNumber)
        data.append('district', newItem.district)

        this.props.addItem(data,this.props.history);

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
                            <Form  className='form' onSubmit={this.onSubmitItem} encType="multipart/form-data">
                                <FormGroup row>
                                    <Label for='name' sm={2}><b>Book Name</b></Label>
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
                                    <Label for='price' sm={2}><b>Price</b></Label>
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
                                    <Label for='isbn' sm={2}><b>ISBN</b></Label>
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
                                            onChange= {this.onChange}/>
                                        {errors.ISBN && (
                                            <div className="invalid-feedback">{errors.ISBN}</div>
                                        )}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for='author' sm={2}><b>Author</b></Label>
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
                                    <Label for='Condition' sm={2}><b>Condition</b></Label>
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
                                    <Label for='description' sm={2}><b>Description</b></Label>
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
                                    <Label for='category' sm={2}><b>Category</b></Label>
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
                                            <option defaultValue>Select Category</option>
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
                                    <Label for="uploadImg" sm={2}><b>Image</b></Label>
                                    <Col sm={9}>
                                        <Input 
                                            className={classnames( {
                                                'is-invalid': errors.image
                                            })}
                                            type="file" 
                                            name="image"
                                            id="image"  
                                            onChange= {this.onChangeFile}
                                        />
                                        {errors.images && (
                                            <div className="invalid-feedback">{errors.image}</div>
                                        )}
                                        <FormText color="muted">
                                            Upload an image of the book
                                        </FormText>
                                        
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                            <Label for='name' sm={2}><b>Name</b></Label>
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
                            <Label for='phone' sm={2}><b>Phone</b></Label>
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
                            <Label for='district' sm={2}><b>District</b></Label>
                            <Col sm={9}>
                                <Input className={classnames( {
                                        'is-invalid': errors.district
                                    })} type="select" name="district" id="district" value = {this.state.district} onChange= {this.onChange}>
                                    <option defaultValue>Select District</option>
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
                                    <Button className='postBtn'>Post</Button>
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

PostAd.propTypes = {
    auth: PropTypes.object.isRequired,
    addItem: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { addItem })(withRouter(PostAd));
