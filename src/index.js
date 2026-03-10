import './polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import SignUp from './Screens/SignUp'
import Login from './Screens/Login';
import Activate from './Screens/Activate'
import Dashboard from './Screens/Dashboard';
import BookingForm from './Screens/BookingForm';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';


import Profile from './Screens/Profile';
import RoomDetails from './Screens/RoomDetails';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact render={props => <App {...props} />} />
      <Route path='/signup' exact render={props => <SignUp {...props} />} />
      <Route path='/login' exact render={props => <Login {...props} />} />
      <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
      <Route path='/dashboard' exact render={props => <Dashboard {...props} />} />
      <Route path='/room/:roomId' exact render={props => <RoomDetails {...props} />} />
      <Route path='/book/:roomId' exact render={props => <BookingForm {...props} />} />
      <Route path='/profile' exact render={props => <Profile {...props} />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
)

