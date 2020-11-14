import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardDeck,  Col, Label 
} from 'reactstrap';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class PostPreview extends Component {
    render() {
        const {item} = this.props;
        return (
            <div>
                <Col lg='6' sm='4' md='5' style={{marginLeft:'20px'}}>                       
                    <CardDeck style={{width:"275px", margin:'10px', height: "400px"}}>
                        <Card className="cardD">
                            <Link to={`/items/${item._id}`}>
                                <CardImg top className="cardI" src={`http://localhost:3000/${item.image}`}/>
                            </Link>
                            <CardText style={{fontFamily:"book antiqua"}}>
                                <Label style={{fontSize:"18px"}}><b>{item ? `${item.bookName}` : ' '}</b></Label><br/>
                                {item ? `${item.author}` : ' '}<br/>
                                <Label style={{color:'red'}}>Rs.{item ? `${item.price}` : ' '}</Label>
                            </CardText>
                        </Card>
                    </CardDeck>                        
                </Col>
            </div>
        )
    }
}

PostPreview.propTypes ={
    item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, {  })(
    PostPreview
  );