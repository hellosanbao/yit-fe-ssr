import React from 'react'
import { Route } from 'react-router-dom'
import Home from '../views/home'
import ProductDetail from '../views/productDetail'

export default () => (
  <div>
    <Route path="/" exact component={Home} />
    <Route path="/ProductDetail" exact component={ProductDetail} />
  </div>
)
