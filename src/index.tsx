import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignUp from './Screens/SignUp'
import Login from './Screens/Login';
import Activate from './Screens/Activate'
import Dashboard from './Screens/Dashboard';
import BookingForm from './Screens/BookingForm';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

import Profile from './Screens/Profile';
import RoomDetails from './Screens/RoomDetails';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={App} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/login' exact component={Login} />
        <Route path='/users/activate/:token' exact component={Activate} />
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/room/:roomId' exact component={RoomDetails} />
        <Route path='/book/:roomId' exact component={BookingForm} />
        <Route path='/profile' exact component={Profile} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
