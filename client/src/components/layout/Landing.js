import React, { Component } from 'react';
import {
    Label
} from 'reactstrap';
import Search from '../search/Search';
import NewArrivals from '../landingPages/NewArrivals';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
            <div>
                <div className='landing'>
                    <div className="dark-overlay landing-inner text-light">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 text-justify">
                                    <p className="lead">
                                    WELCOME TO BOOKBRARY
                                    </p>
                                    <h1 style= {{ fontSize: '65px' }}>ONLINE MARKETPLACE<br />
                                    FOR USED BOOKS</h1>
                                    <br /><br/>
                                    <h2 style={{ fontFamily: 'forte', color: '#EDDA9B', fontStyle: 'italic', wordSpacing: '8px', letterSpacing: '5px'}}>BUY OR SELL YOUR USED BOOKS IN HERE</h2>
                                </div>  
                            </div>
                            <Search/>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='labels'>
                        <b><Label>NEW ARRIVALS</Label></b>
                        <hr style={{ marginLeft: '45%', marginRight: '45%', marginTop: '0px', backgroundColor: 'rgb(0, 51,51)' }}/>
                    </div>
                    <NewArrivals/>
                </div>
                <hr></hr>
                
                <div>
                    <div className='labels'>
                        <b><Label>UNDER 500 <Link style={{color: "grey"}} to='/cheap'><i className="fas fa-chevron-right"></i></Link></Label></b>
                        <hr style={{ marginLeft: '45%', marginRight: '45%', marginTop: '0px', backgroundColor: 'rgb(0, 51,51)' }}/>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default  Landing;