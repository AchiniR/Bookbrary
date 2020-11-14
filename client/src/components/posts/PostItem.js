import React, { Component } from 'react';   
import {Col, Row, Label, Button} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getItem, addToFav} from '../../actions/itemActions';
import Reviews from '../reviews/Reviews';

class PostItem extends Component {
    componentDidMount() {
        this.props.getItem(this.props.match.params.id);
    }

    onFavClick(id) {
        this.props.addToFav(id);
        this.props.history.push('/wishlist');
    }

    render() {
        const {items} = this.props.item;
        const {user} = this.props.auth;
        let date = new Date(items.date);
        return (
            <div className='post'>
               <Row>
                   <Col lg='20' className='ad' >
                        <img src={`http://localhost:3000/${items.image}`} alt='book'  className="postImage"/><br/>
                   </Col>
                   <Col  lg='20'className='ad'>
                        <Label className='name'>{items ? `${items.bookName}` : ' '}</Label><br />
                        <Label className='author'>by {items ? `${items.author}` : ' '}</Label><br /><br />
                        <Label >For sale by {items ? `${items.sellerName}` : ' '}</Label>
                        <Label >&nbsp;{date.toLocaleString()}</Label><br />
                        <Label >{items ? `${items.district}` : ' '}</Label><br /><br />
                        <Link style={{color: "white"}} to = {`/auction/${items._id}`}><Button color= "dark">Auction</Button></Link>
                        
                   </Col>
                   <div className='vl2'></div>
                   <Col  lg='20'className='ad'>
                        <Label>ISBN&nbsp;<b>{items ? `${items.ISBN}` : ' '}</b></Label><br />
                        <Label><b>Condition: </b></Label>
                    	<Label className='condition'>&nbsp;<b>{items ? `${items.condition}` : ' '}</b></Label><br />
                        <Label style={{ fontSize: '25px' }}><sup><b>LKR </b></sup></Label>
                        <Label className='price'>{items ? `${items.price}` : ' Negotiable '}</Label><br />
                        <Label>Share the ad</Label><br />&nbsp;
                        <i style={{fontSize: '25px'}} className="fab fa-twitter-square">&nbsp;</i>
                        <i style={{fontSize: '25px'}} className="fab fa-facebook-square"></i><br /><br/>
                        { user.id === items.user ? ' ':
                            <button
                                onClick={this.onFavClick.bind(this, items._id)}
                                type="button"
                                className="btn btn-light mr-1"
                            > 
                            <b>Add To WishList</b></button>
                            
                            // <Link style={{color: 'gray'}} to= {`/wishlist/${items._id}`}>Add to WishList</Link>
                        }
                   </Col>
               </Row>
               <Row>
                <Col  lg='20'className='ad'>
                   <Label style={{ fontSize: '20px' }}><b>Description</b></Label><br/>
                   <Label>
                        {items ? `${items.description}` : 
                        ' '
                        }
                   </Label><br /><br/>
                   <Label style={{ fontSize: '20px' }}><b>Contact</b></Label><br />
                   <Label><i className="fas fa-phone-alt"></i>&nbsp;{items ? `${items.phoneNumber}` : ' '}</Label><br/><br/>
                   { user.id != null ? 
                        
                        <Link style={{color: 'gray'}} to = {`/chat/${items._id}`}>
                            <Label >
                                <i className="fas fa-comments"></i>&nbsp;Chat
                            </Label>
                        </Link>
                    : <div style={{color: "red" }}><b>To chat with the seller please logged into your account/Create an account</b></div> }
                   
                </Col>
               </Row>
                <Row>
                    <Col  lg='20'className='ad'>
                        <Label style={{ fontSize: '20px', marginRight: "40px" }}><b>Reviews</b></Label>
                        { user.id === items.user ? ' ':
                            <Link to={`/write-review/${items._id}`}><Button>Write a Review</Button></Link>
                        }
                        <Reviews key={items._id} item={items}/>
                    </Col>
                </Row>
            </div>
        )
    }
}


PostItem.propTypes ={
    getItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    addToFav: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    item: state.item,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { getItem, addToFav })(PostItem);