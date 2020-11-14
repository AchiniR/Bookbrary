import React, { Component } from 'react';
import {Col, Row, Label, Button, Input} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {getItem} from '../../actions/itemActions';
import classnames from 'classnames';
import {addAuction} from '../../actions/auctionActions'
import ViewAuction from './ViewAuction';

class Auction extends Component {
    constructor() {
        super();
        this.state = {
          value: '',
          status: 'Bidding',
          errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
      }

    componentDidMount() {
        this.props.getItem(this.props.match.params.id);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClick=(e)=>{

        const { items } = this.props.item;
        //create item object
        const newChat = {
            value : "0",
            item: items._id,
            status: "Fold"
        };

        this.props.addAuction(newChat,this.props.history, items._id);
    }

    onSubmit = (e) =>{
        e.preventDefault();

        const { items } = this.props.item;
        //create item object
        const newChat = {
            value : this.state.value,
            item: items._id,
            status: this.state.status
        };

        this.props.addAuction(newChat,this.props.history, items._id);

    }

    render() {
        const {items} = this.props.item;
        const {user} = this.props.auth;
        const { errors } = this.state;
        return (
            <div className='post'>
                <Row>
                    <Col lg='20' className='ad' >
                        <img src={`http://localhost:3000/${items.image}`} alt='book'  className="postImage"/><br/>
                    </Col>
                    <Col lg='20' className='ad' >
                        <Label>Starting bid: LKR 200.00</Label>
                        <Input
                            className={classnames('mb-3', {
                            'is-invalid': errors.value
                            })}
                            type= "text"
                            name= "value"
                            id= "value"
                            placeholder= "Enter your value"
                            value = {this.state.value}
                            onChange= {this.onChange}
                        />
                        {errors.value && (
                            <div className="invalid-feedback">{errors.value}</div>
                        )}
                        <br/>
                        { user.id === items.user ? ' ': 
                            <Button
                                color= "dark"
                                onClick={this.onSubmit}
                            >Bid</Button>
                        }&nbsp;&nbsp;
                        { user.id === items.user ? ' ': 
                            <Button
                                color= "dark"
                                onClick={this.onClick}
                            >Fold</Button>
                        }
                        <br/>
                    </Col>
                    <Col>
                        <ViewAuction key={items._id} item={items}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

Auction.propTypes ={
    getItem: PropTypes.func.isRequired,
    addAuction: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    item: state.item,
    errors: state.errors
});

export default connect(mapStateToProps, { getItem, addAuction })(Auction);