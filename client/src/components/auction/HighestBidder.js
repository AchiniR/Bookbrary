import React, { Component } from 'react';
import { Label} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class HighestBidder extends Component {
    render() {
        const {auction} = this.props;
        return (
            <div>
                <Label className="alert alert-success" style={{float: 'left'}}>Highest bidder {auction.user}</Label>
            </div>
        )
    }
}

HighestBidder.propTypes = {
    auction: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};
  
const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(mapStateToProps, {  })(HighestBidder);
