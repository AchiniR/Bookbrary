import React, { Component } from 'react';
import {
    Col,
    Button,
    Label,
    Row
} from 'reactstrap';
import { Link } from 'react-router-dom';

export default class Donate extends Component {
    render() {
        return (
            <div  className="donateBack">
            <div className="donate">
                <Row>
                    <Col lg='25' sm='24' md='23'>
                        <Label style={{ fontSize: '27px' }}>Donate old used books online on growing network of books</Label><br/>
                    </Col>
                    
                </Row>
                <div style= {{  textAlign: 'justify' }}>
                <ul className="li">
                    <li>Help someone to read</li>
                    <li>Donate your books</li>
                    <li>Donate your books for people who need them most</li>
                    <li>Set price to 0</li>
                </ul>
                
                <Link style={{color: "white"}} to = '/item'><Button style={{backgroundColor: 'rgb(160, 11, 80)'}}>Post Ad to donate</Button></Link>
                </div>
                
            </div>
            </div>
        )
    }
}
