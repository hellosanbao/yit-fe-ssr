import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from '../views/home'
import ProductDetail from '../views/productDetail'

export default () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/ProductDetail" exact component={ProductDetail} />
    <Redirect to="/ProductDetail" />
  </Switch>
)
