import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardDeck,  Col, Label, Button 
} from 'reactstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {deleteItem} from '../../actions/itemActions'

class PostPreview extends Component {
    onDeleteClick(id) {
        this.props.deleteItem(id);
    }
    render() {
        const {item} = this.props;
        return (
            <div>
                <Col lg='6' sm='4' md='5' style={{marginLeft:'20px'}}>                       
                    <CardDeck style={{width:"275px", margin:'10px'}}>
                        <Card className="cardD">
                            <Link to={`/items/${item._id}`}>
                                <CardImg top className="cardI" src={`http://localhost:3000/${item.image}`}/>
                            </Link>
                            <CardText style={{fontFamily:"book antiqua"}}>
                                <Label style={{fontSize:"18px"}}><b>{item ? `${item.bookName}` : ' '}</b></Label><br/>
                                {item ? `${item.author}` : ' '}<br/>
                                <Label style={{color:'red'}}>Rs.{item ? `${item.price}` : ' '}</Label><br/>
                                <Link  style={{color: 'black' }} to={`/edit-post/${item._id}`}><Button className="postedit bg-info text-white" >Edit</Button></Link>&emsp;&emsp;
                                <Button className="postedit bg-danger text-white" onClick={this.onDeleteClick.bind(this,item._id)}>Delete</Button>
                            </CardText>
                        </Card>
                    </CardDeck>                        
                </Col>
            </div>
        )
    }
}

PostPreview.propTypes ={
    item: PropTypes.object.isRequired,
    deleteItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { deleteItem })(
    PostPreview
  );