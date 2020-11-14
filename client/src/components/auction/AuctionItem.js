import React, { Component } from 'react';
import {Col, Row, Label} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AuctionItem extends Component {

    render() {
        const {auction} = this.props;
        return (
            <div >
                <Col lg='20'>
                    <div>
                        <Row>
                            <Col>
                            {auction.status === "Bidding"?
                                <Label>{auction.user}</Label>:
                                <Label  style={{color:"grey"}}>{auction.user}</Label>
                            }
                            </Col>
                            <Col>
                            {auction.status === "Bidding"?
                                <Label>{auction.value}</Label>:
                                <Label  style={{color:"grey"}}>{auction.value}</Label>
                            }
                            </Col>
                            <Col>
                                {auction.status === "Bidding"?
                                    <Label style={{color:"#25df1e"}}>{auction.status}</Label>:
                                    <Label style={{color:"red"}}>{auction.status}</Label>
                                }
                            </Col>
                        </Row>
                        <hr></hr>
                    </div>
                
                </Col>
                
            </div>
        )
    }
}

AuctionItem.propTypes ={
    auction: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(mapStateToProps, {  })(
    AuctionItem
  );
