import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import PropTypes from 'prop-types';
import {getnewArrivals} from '../../actions/itemActions';
import PostPreview from '../posts/PostPreview'

class NewArrivals extends Component {
    componentDidMount() {
        this.props.getnewArrivals();
    }

    render() {
        const {items, loading} = this.props.item;
        let postItem;
        if(items== null || loading){
            postItem =  <h4>null</h4>
        }
        else{
            if(items.length > 0 ){
                postItem = items.map(item=> (
                    <PostPreview key={item._id} item={item} />
                ));
            }else{
                postItem = <h4>No Item Found...</h4>
            }
        }
        return (
            <div>
                <Fragment>
                 <Row>{postItem}</Row>
                 </Fragment>
            </div>
        )
    }
}

NewArrivals.propTypes = {
    getnewArrivals: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    item: state.item
});
  
export default connect(mapStateToProps, { getnewArrivals })(NewArrivals);
