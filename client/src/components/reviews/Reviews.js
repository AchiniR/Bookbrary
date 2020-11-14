import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { getReviews } from '../../actions/reviewActions';
import ViewReview from './ViewReview';

class Reviews extends Component {
    componentDidMount() {
        this.props.getReviews();
    }

    render() {
        const {review, loading} = this.props.review;
        const {item} = this.props;
        let content;
        if(review== null || loading){
            content = <h6>Null</h6>
        }
        else{
            if(review.length > 0 ){
                content = review.map(review=> (
                    (review.item === item._id) ? 
                    <ViewReview key={review._id} review={review} />: ''
                )); 
            }else{
                content = <h6>No reviews yet</h6>
            }
        }

        return (
            <div>
                <Row>
                    <Col lg='20' sm='18' md='19'>
                        {content}
                    </Col>
                </Row><br/>
            </div>
        )
    }
}

Reviews.propTypes = {
    getReviews: PropTypes.func.isRequired,
    review: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    review: state.review
});
  
export default connect(mapStateToProps, { getReviews })(Reviews);
