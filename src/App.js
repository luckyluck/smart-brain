import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/Signin/Signin';
import Register from './components/Register/Register';
import './App.css';
import Home from './components/Home/Home';
import RequireAuth from './hoc/RequireAuth/RequireAuth';
import * as actions from './store/actions';

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
    logout = () => {
        this.props.logout();
    };

    render() {
        return (
            <div className="App">
                <Particles
                    className='particles'
                    params={particlesOptions}
                />
                <Navigation isSignedIn={this.props.isSignedIn} logout={this.logout}/>
                <Switch>
                    <Route path="/login" component={RequireAuth(SignIn)}/>
                    <Route path="/register" component={RequireAuth(Register)}/>
                    {/*<Redirect to="/login"/>*/}
                    <Route exact path="/" component={RequireAuth(Home)}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isSignedIn: state.auth.isSignedIn
});
const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(actions.logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
