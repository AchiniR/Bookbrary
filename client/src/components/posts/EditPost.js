import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addItem, getItem } from '../../actions/itemActions';
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

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
        bookName: '',
        price: '',
        ISBN: '',
        author: '',
        condition: '',
        description: '',
        category: '',
        // image: '',
        sellerName: '',
        phoneNumber: '',
        district: '',
        item_id: '',
        categoryName: '',
        errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getItem(this.props.match.params.id);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.item.items) {
      const items = nextProps.item.items;

      items.bookName = !isEmpty(items.bookName) ? items.bookName : '';
      items.price = !isEmpty(items.price) ? items.price : '';
      items.ISBN = !isEmpty(items.ISBN) ? items.ISBN : '';
      items.condition = !isEmpty(items.condition) ? items.condition : '';
      items.description = !isEmpty(items.description) ? items.description : '';
      items.category = !isEmpty(items.category) ? items.category : '';
      items.author = !isEmpty(items.author) ? items.author : '';
    //   items.image = !isEmpty(items.image) ? items.image : '';
      items.sellerName = !isEmpty(items.sellerName) ? items.sellerName : '';
      items.phoneNumber = !isEmpty(items.phoneNumber) ? items.phoneNumber : '';
      items.district = !isEmpty(items.district) ? items.district : '';
      

      // Set component fields state
      this.setState({
        bookName : items.bookName,
        price : items.price,
        ISBN : items.ISBN,
        author : items.author,
        condition : items.condition,
        description : items.description,
        category: items.category,
        // image: items.image,
        sellerName: items.sellerName,
        phoneNumber: items.phoneNumber,
        district: items.district,
      });
    }
  }

  onSubmit(e) {
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
        // image: this.state.image,
        sellerName: this.state.sellerName,
        phoneNumber: this.state.phoneNumber,
        district: this.state.district,
    };

    this.props.addItem(newItem, this.props.history);  
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
        <div>
            <h4>Book Details</h4>
            <Row>
                        <Col sm="12">
                            <Form  className='form' onSubmit={this.onSubmit}>
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
                                            onChange= {this.onChange}/>
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
                                                    value = {this.state.condition} 
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
                                                value = {this.state.condition}  
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
                                                value = {this.state.condition} 
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
                                {/* <FormGroup row>
                                    <Label for="uploadImg" sm={3}><b>image</b></Label>
                                    <Col sm={9}>
                                        <Input 
                                            className={classnames( {
                                                'is-invalid': errors.image
                                            })}
                                            type="file" 
                                            name="image"
                                            id="uploadImg"  
                                            value = {this.state.image} 
                                            onChange= {this.onChange}
                                        />
                                        {errors.image && (
                                            <div className="invalid-feedback">{errors.image}</div>
                                        )}
                                        <FormText color="muted">
                                            Upload an image of the book
                                        </FormText>
                                    </Col>
                                </FormGroup> */}
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
    );
  }
}

EditPost.propTypes = {
  addItem: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
  item: state.item,
  errors: state.errors
});

export default connect(mapStateToProps, { addItem, getItem })(
  withRouter(EditPost)
);
