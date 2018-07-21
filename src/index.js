import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'tachyons';
import authReducer from './store/reducers/auth';
import homeReducer from './store/reducers/home';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);
/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV === 'development' ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;
/* eslint-enable */
const rootReducer = combineReducers({
    auth: authReducer,
    home: homeReducer,
    router: routerReducer
});
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, middleware))
);
const app = (
    <Provider store={store}>
        <BrowserRouter>
            {/* ConnectedRouter will use the store from Provider automatically */}
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
