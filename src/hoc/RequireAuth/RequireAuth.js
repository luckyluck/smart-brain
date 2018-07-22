import React from 'react';
import { withRouter } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

const requireAuth = Component => {

    class AuthenticatedComponent extends React.Component {
        constructor(props) {
            super(props);

            // TODO think how to use it
            this.state = {
                isLoggedIn: true
            };

            this.exceptionPages = ['/login', '/register'];
        }

        componentWillMount() {
            this.checkAuth();
        }

        checkAuth() {
            const sessionId = localStorage.getItem('sessionId');

            if (!sessionId) {
                if (!this.exceptionPages.includes(this.props.history.location.pathname)) {
                    this.props.history.push('/login');
                }

                return;
            }

            // FIXME probably, there is a proper way to update header's token after user's authorization
            axiosInstance.defaults.headers.common['sessionId'] = sessionId;
            axiosInstance.get('is-authorized').then(response => {
                this.props.loginUser(response.data.user);

                if (this.exceptionPages.includes(this.props.history.location.pathname)) {
                    this.props.history.push('/');
                }
            }).catch(() => {
                localStorage.removeItem('sessionId');
                if (!this.exceptionPages.includes(this.props.history.location.pathname)) {
                    this.props.history.push('/login');
                }
            });
        }

        render() {
            return this.state.isLoggedIn
                ? <Component {...this.props} />
                : null;
        }

    }

    const mapDispatchToProps = dispatch =>({
        loginUser: user => dispatch(actions.loginUser(user))
    });

    return connect(null, mapDispatchToProps)(withRouter(AuthenticatedComponent));
};

export default requireAuth;
