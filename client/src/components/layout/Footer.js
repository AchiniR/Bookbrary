import React from "react";
import { Row, Col, Label } from 'reactstrap';
import {Link} from 'react-router-dom';


const Footer = () => {
    return (
        <div className="footer" style={{ textAlign: 'center' }}>
            <Row>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <Label className="label">My Account</Label>
                    <hr style={{ backgroundColor: '#4d2600', padding: '0.7px', marginTop: '0px' }}/>
                    <div style={{ textAlign: 'left' }}>
                        <Label tag="a" className='anchor' href="#">Account</Label><br />
                        <Label>Wish List</Label><br />
                        <Label>Settings</Label>
                    </div>
                </Col>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <Label className="label">More about Bookbrary</Label>
                    <hr style={{ backgroundColor: '#4d2600', padding: '0.7px', marginTop: '0px' }}/>
                    <div  style={{ textAlign: 'left' }}>
                        <Label tag="a" className='anchor' href="#">About Us</Label><br />
                        <Label tag="a" className='anchor' href="#">Contact</Label><br />
                        <Label>Help & Support</Label><br />
                        <Label>How Bookbrary works</Label>
                    </div>
                </Col>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <Label className="label">Donate</Label>
                    <hr style={{ backgroundColor: '#4d2600', padding: '0.7px', marginTop: '0px' }}/>
                    <div  style={{ textAlign: 'left' }}>
                        <Link style={{color: 'white'}} to='/donate'><Label>Donate your Old Books</Label></Link>
                    </div>
                </Col>
                <div className='vl'></div>
                <Col sm={{ size: 'auto', offset: 1 }}>
                    <Label className="label">Follow Us</Label>
                    <hr style={{ backgroundColor: '#4d2600', padding: '0.7px', marginTop: '0px' }}/>
                    <div  style={{ textAlign: 'left' }}>
                        <img src={require("../../img/fb.png")} alt=" " style={{ marginLeft: '8px' }}/>
                        <img src={require("../../img/twitter.png")} alt=" " style={{ marginLeft: '8px' }}/>
                        <img src={require("../../img/printest.png")} alt=" " style={{ marginLeft: '8px' }}/>
                        <img src={require("../../img/insta.png")} alt=" " style={{ marginLeft: '8px' }}/>
                    </div>
                </Col>
            </Row>
            <hr style={{ backgroundColor: 'rgb(0, 17, 17)', padding: '0.7px' }}/>
            <div style={{ textAlign: 'center' }}>
                <Label>
                    Copyright &copy;  

                    <span>
                        {new Date().getFullYear()} Bookbrary.com All right reserved 
                        <a className='anchor' href="/" style={{ marginLeft: '95px' , marginRight: '8px'}}>Terms of Use </a><Label>| </Label>
                        <a className='anchor' href="/" style={{ marginLeft: '8px' }}>Privacy policy</a>
                    </span>
                </Label>
            </div>
        </div>
    );
}

export default Footer;
