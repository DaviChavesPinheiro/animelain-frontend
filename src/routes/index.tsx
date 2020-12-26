import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import AnimeProfile from '../pages/AnimeProfile';
import CharacterProfile from '../pages/CharacterProfile';
import CategoryProfile from '../pages/CategoryProfile';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/animes/:id" component={AnimeProfile} isPrivate />
    <Route path="/animes" component={Dashboard} isPrivate />

    <Route path="/characters/:id" component={CharacterProfile} isPrivate />
    {/* <Route path="/characters" component={Dashboard} isPrivate /> */}

    <Route path="/categories/:id" component={CategoryProfile} isPrivate />
    {/* <Route path="/categories" component={Dashboard} isPrivate /> */}

    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;
