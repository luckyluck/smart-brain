import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import Home from './components/Home/Home';

const particlesOptions = {
    particles: {
        number: {
            value: 30,
            density: {
                enable: true,
                value_area: 800
            }
        }
    }
};

class App extends Component {

    // componentWillReceiveProps(newProps, oldProps) {
    //     console.log('newProps:', newProps);
    //     console.log('oldProps:', oldProps);
    //     if (newProps.isSignedIn && newProps.isSignedIn !== oldProps.isSignedIn) {
    //
    //     }
    // }

    render() {
        return (
            <div className="App">
                <Particles
                    className='particles'
                    params={particlesOptions}
                />
                <Navigation isSignedIn={this.props.isSignedIn}/>
                <Switch>
                    {!this.props.isSignedIn ? <Route path="/login" component={SignIn}/> : null}
                    {!this.props.isSignedIn ? <Route path="/register" component={Register}/> : null}
                    {!this.props.isSignedIn ? <Redirect to="/login"/> : null}
                    <Route path="/" component={Home} exact={true}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isSignedIn: state.auth.isSignedIn
});

export default connect(mapStateToProps, null)(App);
