import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getItems } from '../../actions/itemActions';
import PostItem from '../posts/PostPreview';

class Childrens extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    render() {
        const {items, loading} = this.props.item;
        let postItem;
        if(items== null || loading){
            postItem = <Spinner/>
        }
        else{
            if(items.length > 0 ){
                postItem = items.map(item=> (
                    (item.category==="Children's") ? 
                    <PostItem key={item._id} item={item} /> : ''
                ));
            }else{
                postItem = <h4>No Item Found...</h4>
            }
        }

        return (
            <div>
                <Row>
                    {/* <Col lg='20' sm='18' md='19'> */}
                        {postItem}
                    {/* </Col> */}
                </Row>
            </div>
        )
    }
}

Childrens.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};
  
const mapStateToProps = state => ({
    item: state.item
});
  
export default connect(mapStateToProps, { getItems })(Childrens);