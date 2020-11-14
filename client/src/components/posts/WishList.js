import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getItem, addToFav} from '../../actions/itemActions';
import classnames from 'classnames';

class WishList extends Component {
    componentDidMount() {
        this.props.getItem(this.props.match.params.id);
    }

    onFavClick(id) {
        this.props.addToFav(id);
        this.props.history.push('/wishlist');
    }

    findUserFav(favs) {
        const { user } = this.props.auth;
        if (favs.filter(fav => fav.user === user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }
    render() {
        const {items} = this.props.item;
        return (
            <div>
                <span>
                    <button
                        onClick={this.onFavClick.bind(this, items._id)}
                        type="button"
                        className="btn btn-light mr-1"
                    >
                        <i
                        className={classnames('"fas fa-heart"', {
                            'text-info': this.findUserFav(items.favs)
                        })}
                        />
                    </button>
                    <b>Add To WishList</b>
                </span>
            </div>
        )
    }
}

WishList.propTypes ={
    getItem: PropTypes.func.isRequired,
    addToFav: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    auth: state.auth,
    item: state.item
  });
  
  export default connect(mapStateToProps, { getItem, addToFav })(WishList);