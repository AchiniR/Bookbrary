import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Label } from 'reactstrap';
import PropTypes from 'prop-types';
import { getAuction } from '../../actions/auctionActions';
import AuctionItem from './AuctionItem';
import HighestBidder from './HighestBidder';

class ViewAuction extends Component {
    componentDidMount() {
        const {item} = this.props;
        this.props.getAuction(item._id);
    }
    render() {
        const {auctions, loading} = this.props.auction;
        let bidValues = [0];
        let bidValue;
        let highestBidder;
        let maxValue;
        if(auctions == null || loading){
            bidValue = <h4> </h4>
        }
        else{
            if(auctions.length > 0 ){
                bidValue = auctions.map(auction=> (
                    <AuctionItem key={auction._id} auction={auction} /> 
                ));
                
            }else{
                bidValue = <h4> </h4>
            }
        }

        if(auctions == null || loading){
            bidValues.push(30);
        }
        else{
            if(auctions.length > 0 ){
                auctions.map(auction=> (
                    bidValues.push(auction.value)
                ));
                
            }
        }

        maxValue = Math.max(...bidValues);

        if(auctions == null || loading){
            highestBidder = <h4> </h4>
        }
        else{
            if(auctions.length > 0 ){
                highestBidder = auctions.map(auction=> (
                    (auction.value === maxValue) ? 
                        <HighestBidder key={auction._id} auction={auction}/> 
                        : ''
                ));
                
            }else{
                highestBidder = <h4> </h4>
            }
            
        }

        return (
            <div>
                <Row>
                    <Col lg='20' sm='18' md='19'>
                        <div  className="auction">
                            <Row>
                                <Col>
                                    <Label><b>Name</b></Label><br/>
                                </Col>
                                <Col>
                                    <Label><b>Value</b></Label><br/>
                                </Col>
                                <Col>
                                    <Label><b>Status</b></Label><br/>
                                </Col>
                                
                            </Row><br/>
                            {bidValue}
                            
                        </div><br/>
                        <Label className="alert alert-danger" style={{float: 'left'}}>Current highest Bid {maxValue}</Label>
                        {highestBidder}
                    </Col>
                </Row>
            </div>
        )
    }
}

ViewAuction.propTypes = {
    getAuction: PropTypes.func.isRequired,
    auction: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    auction: state.auction,
    auth: state.auth
});
  
export default connect(mapStateToProps, { getAuction })(ViewAuction);
