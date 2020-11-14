import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import {
    Collapse,
    Label,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Input
} from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Register from '../auth/Register';
import Login from '../auth/Login';
import { logoutUser } from '../../actions/authActions';
import {searchByName} from '../../actions/itemActions'


class AppNavbar extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,
          value: '',
          errors: {}
        };
        this.onChange = this.onChange.bind(this);
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
      onChange(e) {
        this.setState({ value: e.target.value });
    }

      onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
      }

      render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
              <UncontrolledDropdown nav inNavbar style={{ margin: 'auto' }}>
                    <DropdownToggle nav caret>
                      <i className="fas fa-user-circle"></i>
                        <span className='navbar-text'>
                            <strong>&nbsp;{ user ? `${user.name}`: '' }</strong>
                        </span>
                    </DropdownToggle>
                    <DropdownMenu>
                        <Link style={{color: 'transparent'}} to = "/view"><DropdownItem >My Account</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/wishList"><DropdownItem >Wish List</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/settings"><DropdownItem >Settings</DropdownItem></Link>
                    </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem style={{ margin: 'auto' }}>
                  <Label className="nav-link" onClick={this.onLogoutClick.bind(this)} style={{ margin: 'auto' }}>Logout</Label>
                </NavItem>
                
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem style={{ margin: 'auto' }}>
                  <Register/>
                </NavItem>
                <NavItem style={{ margin: 'auto' }}>
                  <Login/>
                </NavItem>
            </Fragment>
        );
        return (
          <div>
            <Navbar className="navbar navbar-dark navbar-expand-lg bg-rgb(0, 26, 26)" expand="md" >
              <NavbarBrand className= "navbarBrand" style={{color: "white"}} href="/"><img src={require('../../img/logo.png')} alt=''/></NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="mr-auto" navbar>
                  <Fragment>
                  <NavItem style={{ margin: 'auto' }}>
                      <Link className="nav-link" to="/">Home</Link>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar style={{ margin: 'auto' }}>
                      <DropdownToggle nav caret>All Categories</DropdownToggle>
                      <DropdownMenu>
                        <Link style={{color: 'transparent'}} to = "/artMusic"><DropdownItem>Art & Music</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/"><DropdownItem>Biographies</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/"><DropdownItem>Business</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/childrens"><DropdownItem>Children's</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/"><DropdownItem>CookBooks</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/"><DropdownItem>Comics</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/computer"><DropdownItem>ComputerScience</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/"><DropdownItem>Education</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/"><DropdownItem>Environment</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/"><DropdownItem>Entertainment</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/fiction"><DropdownItem>Fiction</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/"><DropdownItem>Health</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/"><DropdownItem>History</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/"><DropdownItem>Literature</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/Mystery"><DropdownItem>Mystery</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/"><DropdownItem>Medical</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/"><DropdownItem>Religion</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/romance"><DropdownItem>Romance</DropdownItem></Link>
                        <Link style={{color: 'transparent'}} to = "/other"><DropdownItem>Other</DropdownItem></Link>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                    <NavItem style={{ margin: 'auto' }}>
                      <Link className="nav-link" to="/about">About</Link>
                    </NavItem>
                    <NavItem style={{ margin: 'auto' }}>
                      <Link className="nav-link" to="/contact">Contact</Link>
                    </NavItem>
                  </Fragment> 
                </Nav>
                <Nav className='ml-auto' navbar>
                    <NavItem style={{ margin: 'auto' }}>
                    
                      <Input 
                      className='search' 
                      type='text' 
                      name='searchany' 
                      id='searchany' 
                      placeholder='Search...'
                      value = {this.state.value} 
                      onChange= {this.onChange}
                      />
                      </NavItem>
                      <NavItem style={{ margin: 'auto' }}>
                      <Link className="nav-link"  to={`/searchByName/${this.state.value}`}>
                        <i className="fa fa-fw fa-search fa-iconColor"></i>
                      </Link>
                    </NavItem>
                    <NavItem style={{ margin: 'auto' }}>
                      <Link className="nav-link" to="/feed">Post Feed</Link>
                    </NavItem>
                    { isAuthenticated ? authLinks : guestLinks }
                    <NavItem  style={{ margin: 'auto' }}>
                      <Link className="nav-link" to="/item">PostBookAd</Link>
                    </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
      }
}
AppNavbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, searchByName })(AppNavbar);