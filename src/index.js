import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {
	Router,
	Route,
	hashHistory
} from 'react-router';
import HomeLayout from './layouts/home-layout';
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import Account from './pages/Account'
import AddCarousel from './pages/AddCarousel'
import AddProduction from './pages/AddProduction'
import ModifyProduction from './pages/ModifyProduction'
import AddFooterLink from './pages/AddFooterLink'
import AddGallery from './pages/addGallery'

// Render the main component into the dom
ReactDOM.render((
	<Router history={hashHistory}>
		<Route component={HomeLayout}>
			<Route path='/' component={Home}/>
			<Route path='/account' component={Account}/>
			<Route path='/addCarousel' component={AddCarousel}/>
			<Route path='/addProduction' component={AddProduction}/>
			<Route path='/addProduction/:productionId' component={ModifyProduction}/>
			<Route path='/addFooterLink' component={AddFooterLink}/>
			<Route path='/addGallery/:type' component={AddGallery}/>
		</Route>
		<Route path='/login' component={Login}/>
		<Route path='/signup' component={Signup}/>
	</Router>
), document.getElementById('app'));