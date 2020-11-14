import React, { Component } from 'react';
import {Col, Row, Label} from 'reactstrap';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';

class ViewReview extends Component {
    render() {
        const {review} = this.props;
        let date = new Date(review.date);
        return (
            <div>
                <Row>
                <Col lg='12' sm='11' md='10'>
                        <hr style={{ width: "900px"}}/>
                        <Label><b>{review.name}&nbsp;</b></Label>
                        <Label>{date.toLocaleDateString()}</Label><br/>
                        <StarRatings
                            rating={review.ratings}
                            starDimension="22px"
                            starSpacing="5px"
                            starRatedColor = "#f0ec12"
                        /><br /><br />
                        <Label>{review.text}</Label><br/>
                    </Col>
                </Row>
            </div>
        )
    }
}

ViewReview.propTypes ={
    review: PropTypes.object.isRequired
};

export default ViewReview;