import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {Button, Label} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentShop } from '../../actions/shopActions';
import Spinner from '../common/Spinner';
class Shop extends Component {
  componentDidMount() {
    this.props.getCurrentShop();
  }

  render() {
    const { shop, loading } = this.props.shop;
    const {user} = this.props.auth;

    let content;

    if (shop === null || loading) {
      content = <Spinner />;
    } else {
      // Check if logged in user has shop data
      if (Object.keys(shop).length > 0) {
        content= (
            <div>
              <img src={require('../../img/shop.png')} className="shopImg" alt="shopImage"/><br />
              <Link to='/edit-shop' style={{color: 'black' }} >
                    <Button className="shpbtn">Edit {shop.title}</Button>
              </Link>
            </div>
          );

      } else {
        // User is logged in but has no shop
        content = (
          <div>
            <img src={require('../../img/shop.png')} className="shopImg" alt="shopImage"/><br />
            <Link to='/create-shop' style={{color: 'black' }} >
                <Button className="shpbtn">Create Shop</Button>
            </Link>
          </div>
        );
      }
    }

    return (
        <div>
          {content}
        </div>
    );
  }
}

Shop.propTypes = {
  getCurrentShop: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  shop: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  shop: state.shop,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentShop })(withRouter(Shop));
