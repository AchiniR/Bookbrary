import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getItems } from '../../actions/itemActions';
import PostPreview from './PostPreview';

class Posts extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    render() {
        const {items, loading} = this.props.item;
        const {user} = this.props.auth;
        let postItem;
        if(items== null || loading){
            postItem = <Spinner/>
        }
        else{
            if(items.length > 0 ){
                postItem = items.map(item=> (
                    (item.user === user.id) ? 
                    <PostPreview key={item._id} item={item} /> : ''
                ));
            }else{
                postItem = <h4>No Item Found...</h4>
            }
        }

        return (
            <div>
                <Row>{postItem}</Row>
            </div>
        )
    }
}

Posts.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    item: state.item,
    auth: state.auth
});
  
export default connect(mapStateToProps, { getItems })(Posts);