import React, { Component } from 'react';
import {Col, Row, Label, Button} from 'reactstrap';
import { Tab,Tabs } from 'react-bootstrap'
import { getCurrentProfile } from '../../actions/profileActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Posts from './Posts';
import {deleteAccount} from '../../actions/profileActions'
import Shop from '../shop/Shop';

class ViewProfile extends Component {
    state = {
        modal: false,
        activeTab: '1'
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal,
        });
    
    };
    componentDidMount() {
        this.props.getCurrentProfile();
      }
      onDeleteClick(e) {
        this.props.deleteAccount();
      }
    render() {
        const {user} = this.props.auth;
        const {profile} = this.props.profile;
        return (
            <div>
                <Row>
                    <Col lg='6' sm='4' md='5'>
                        {/* <img src={`http://localhost:3000/${profiles.profilePic}`} className="profilePic" alt="profile pic"/> */}
                       {/* {profile.gender} */}
                       <img
                            className="profilePic"
                            src={require('../../img/profile.png')}
                            alt=""
                        />
                        <Label className='userName'>{user ? `${user.name}`: ' '}</Label>
                        <Link to='/profile' style={{color: 'black' }}>
                            <Button className="edit">Edit Profile</Button>
                        </Link><br/>
                        <Button onClick={this.onDeleteClick.bind(this)}>Delete Account</Button>
                    </Col>
                    <Col lg='4' sm='4' md='5'>
                        <Shop/>
                    </Col>
                </Row>
                <Tabs defaultActiveKey="myads" id="profile" className="tab">
                    <Tab eventKey="favorites" title="Favorites">
                        No favorites
                    </Tab>
                    <Tab eventKey="myads" title="My Ads">
                        <Posts/>
                    </Tab>
                    
                </Tabs>

            </div>
        )
    }
}

ViewProfile.propTypes ={
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});
  
export default connect(mapStateToProps, { deleteAccount, getCurrentProfile })(ViewProfile);