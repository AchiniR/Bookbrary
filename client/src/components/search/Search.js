import React, { Component } from 'react';
import {
    Col,
    Button,
    Label,
    Input,
} from 'reactstrap';
import {Link} from 'react-router-dom';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            value: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        return (
            <div className='catagory'>
                <Col style={{ marginLeft: '22px' }}>
                    <Label>What are you looking for?</Label>
                    <br/>
                </Col>
                <Col>
                    <Input 
                    className='selectCategory' 
                    type="select" 
                    name="select" 
                    id="district" 
                    value = {this.state.value} 
                    onChange= {this.onChange}
                    >
                        <option>Select District</option>
                        <option>Any</option>
                        <option>Ampara</option>
                        <option>Anuradhapura</option>
                        <option>Badulla</option>
                        <option>Batticallo</option>
                        <option>Colombo</option>
                        <option>Galle</option>
                        <option>Gampaha</option>
                        <option>Hambantota</option>
                        <option>Jaffna</option>
                        <option>Kalutara</option>
                        <option>Kandy</option>
                        <option>Kegalle</option>
                        <option>Kilinochchi</option>
                        <option>Kurunegala</option>
                        <option>Mannar</option>
                        <option>Matale</option>
                        <option>Matara</option>
                        <option>Monaragala</option>
                        <option>Mulativu</option>
                        <option>NuwaraEliya</option>
                        <option>Polonnaruwa</option>
                        <option>Puttalam</option>
                        <option>Rathnapura</option>
                        <option>Trincomalee</option>
                        <option>Vavuniya</option>
                    </Input>
                   
                    <Input 
                    className='selectCategory' 
                    type='text' 
                    name='search' 
                    id='search' 
                    placeholder='Search By Name, Author, ISBN'
                    value = {this.state.value} 
                    onChange= {this.onChange}
                    />
                    <Link to={`/searchByName/${this.state.value}`}><Button className='searchBtn'>Search</Button></Link>
                </Col>
            </div> 

        )
    }
}

export default  Search;