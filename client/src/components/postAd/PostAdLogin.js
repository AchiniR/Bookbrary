import React, { Component } from 'react';
import {  Form, Label } from 'reactstrap';
import Register from '../auth/Login';
import Login from '../auth/Register';

export default class PostAdLogin extends Component {
    render() {
        return (
            <div>
               
                <Form className="back">
                    <Label style={{color:'yellow', fontSize:'25px'}}>Please log in to the system </Label>
                    <Register/>
                    <Label>or</Label>
                    <Login/>
                    <hr style={{ backgroundColor: 'dimgray' }}/>
                    <div style={{ textAlign: 'justify', marginLeft: '90px'}}>
                        <img src={require('../../img/post.png')} alt='postImage' style={{ width: '65px', height: '65px' }}/>
                        <Label style={{ marginLeft: '15px' }}>Start posting your own ads</Label><br />
                        <img src={require('../../img/fav.png')} alt='favImage' style={{ width: '65px', height: '65px' }}/>
                        <Label  style={{ marginLeft: '15px' }}>Mark ads as favorite and view them later</Label><br />
                        <img src={require('../../img/manage.png')} alt='' style={{ width: '65px', height: '65px' }}/>
                        <Label style={{ marginLeft: '15px' }}>View and manage your ads at your convenience</Label>
                    </div>
                </Form>
            </div>
        )
    }
}
