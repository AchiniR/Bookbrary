import React, { Component } from 'react';
import { Row} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getItems} from '../../actions/itemActions';
import PostPreview from '../posts/PostPreview';

class WishListItems extends Component {
    componentDidMount() {
        this.props.getItems();
    }
    render() {
        const {items, loading} = this.props.item;
        const {user} = this.props.auth;
        let postItem;

        if(items== null || loading){
            postItem = <h4>No Items Yet</h4>
        }
        else{
            if(items.length > 0 ){
                postItem = items.map(item=> (
                    // 
                    //  : ''
                    (item.favs.length > 0) ?
                    item.favs.map(fav=> ( (fav.user === user.id) ? <PostPreview key={item._id} item={item} /> : '')): ''
                ));
            }else{
                postItem = <h4>No Item Found...</h4>
            }
        }
        return (
            <div>
                <Row style={{fontSize: "30px", margin: "15px 20px", fontFamily: "candara"}}><b>Wish List</b></Row>
                <Row>{postItem}</Row>
            </div>
        )
    }
}

WishListItems.propTypes ={
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    item: state.item,
    auth: state.auth
  });
  
  export default connect(mapStateToProps, { getItems })(WishListItems);