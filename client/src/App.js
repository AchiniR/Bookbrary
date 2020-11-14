import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import AppNavbar from './components/layout/AppNavbar';

import PrivateRoute from './components/common/PrivateRoute'

import './App.css';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Item from './components/postAd/PostAd';
import Posts from './components/posts/Posts';
import Profile from './components/profile/Profile';
import CreateProfile from './components/profile/CreateProfile';
import ViewProfile from './components/profile/ViewProfile';
import Romance from './components/categories/Romance';
import Mystery from './components/categories/Mystery';
import Childrens from './components/categories/Childrens';
import Computer from './components/categories/Computer';
import Post from './components/posts/PostItem';
// import Settings from './components/auth/Settings';
import CreateShop from './components/shop/CreateShop';
import EditShop from './components/shop/EditShop';
import EditPost from './components/posts/EditPost';
import SearchByName from './components/search/SearchByName';
import Chat from './components/chat/Chat';
import CheapItems from './components/landingPages/CheapItems';
import About from './components/layout/About';
import WishList from './components/posts/WishList';
import WishListItems from './components/wishlist/WishListItems';
import AddReview from './components/reviews/AddReview';
import Donate from './components/donate/Donate';
import Auction from './components/auction/Auction';
import PostsFeed from './components/postsFeed/Posts';
import PostFeed from './components/postFeed/Post'
import Fiction from './components/categories/Fiction';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
            <div className="App">
              <AppNavbar/>
              <Route exact path="/" component={Landing} />
              <Route exact path="/about" component={About} />
              <Route exact path="/cheap" component={CheapItems} />
              <Switch>
                <PrivateRoute exact path= "/item" component={Item} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/view"
                  component={ViewProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/profile"
                  component={Profile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/items"
                  component={Posts}
                />
              </Switch>
              {/* <Switch>
                <PrivateRoute
                  exact
                  path="/settings"
                  component={Settings}
                />
              </Switch> */}
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-shop"
                  component={CreateShop}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-shop"
                  component={EditShop}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-post/:id"
                  component={EditPost}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/wishlist/:id"
                  component={WishList}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/wishList"
                  component={WishListItems}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={PostsFeed} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={PostFeed} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/auction/:id"
                  component={Auction}
                />
              </Switch>
              <Route exact path="/romance" component={Romance} />
              <Route exact path="/fiction" component={Fiction} />
              <Route exact path="/Mystery" component={Mystery} />
              <Route exact path="/childrens" component={Childrens} />
              <Route exact path="/computer" component={Computer} />
              <Route exact path="/searchByName/:value" component={SearchByName} />
              <Route exact path="/items/:id" component={Post} />
              <Route exact path="/chat/:id" component={Chat} />
              <Route exact path="/write-review/:id" component={AddReview} />
              <Route exact path="/donate" component={Donate} />
              <Footer/>
            </div>
        </Router>
      </Provider>
    )
  }
}


export default App;
