import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import {EventLookUp} from "./components/EventLookUp";
import { FetchData } from './components/FetchData';
import { FetchEvent } from './components/FetchEvent';
import { FetchListings } from './components/FetchListings';
import { Counter } from './components/Counter';
import { Switch} from "react-router-dom";

import './custom.css'
import {FetchCategory} from "./components/FetchCategory";
import {FetchTransaction} from "./components/FetchTransaction";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/counter' component={Counter} />
          <Route path='/fetch-data' component={FetchData} />
          <Route exact path='/eventlookup' component={EventLookUp} />
          <Route exact path='/category' component={FetchCategory} />
          <Route exact path='/event' component={FetchEvent} />
          <Route exact path='/listing' component={FetchListings} />
          <Route exact path='/transaction' component={FetchTransaction} />
        </Switch>
      </Layout>
    );
  }
}
