import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { searchByName } from '../../actions/itemActions';
import PostItem from '../posts/PostPreview';

class SearchByName extends Component {
    componentDidMount() {
        this.props.searchByName(this.props.match.params.value);
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
                    <PostItem key={item._id} item={item} /> 
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

SearchByName.propTypes = {
    searchByName: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};
  
const mapStateToProps = state => ({
    item: state.item
});
  
export default connect(mapStateToProps, { searchByName })(SearchByName);