import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import PropTypes from 'prop-types';
import {getcheapItems} from '../../actions/itemActions';
import PostPreview from '../posts/PostPreview'

class CheapItems extends Component {
    componentDidMount() { 
        this.props.getcheapItems();
    }

    render() {
        const {items, loading} = this.props.item;
        let cheap;
        if(items== null || loading){
            cheap =  <h4>null</h4>
        }
        else{
            if(items.length > 0 ){
                cheap = items.map(item=> (
                    <PostPreview key={item._id} item={item} />
                ));
            }else{
                cheap = <h4>No Item Found...</h4>
            }
        }
        return (
            <div>
                <Row>{cheap}</Row>
            </div>
        )
    }
}

CheapItems.propTypes = {
    getcheapItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    item: state.item
});
  
export default connect(mapStateToProps, { getcheapItems })(CheapItems);
