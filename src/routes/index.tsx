import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/Signin';
import Home from '../pages/Home';
import ListMessages from '../pages/List/Messages';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/home" component={Home} isPrivate />
    <Route path="/messages" component={ListMessages} isPrivate />
  </Switch>
);

export default Routes;
