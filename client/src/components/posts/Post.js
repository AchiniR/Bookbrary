import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';
import PropTypes from 'prop-types';
import PostItem from '../posts/PostItem';
import Spinner from '../common/Spinner';
import {getItem} from '../../actions/itemActions';

class Post extends Component {
    componentDidMount() {
        this.props.getItem(this.props.match.params.id);
      }

  render() {
    const {item,loading} = this.props.item;
    let postContent;

    if(item== null || loading){
        postContent = <Spinner/>
    }
    else{
        if(item.length > 0 ){
            postContent = (
                <PostItem key={item._id} item={item}/>
            );
        }else{
            postContent = <h4>No Item Found...</h4>
        }
    }

    return (
      <div>
            <Row>{postContent}</Row>
      </div>
    );
  }
}

Post.propTypes = {
  getItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  item: state.item
});

export default connect(mapStateToProps, { getItem })(Post);
