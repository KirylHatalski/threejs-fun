require('./styles')

import React from 'react'
// import Routes from './routes';
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import rootReducer from './reducers'
import configureStore from './store/configureStore'
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import App from './components/App'

const store = configureStore({})
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
        </Route>
      </Router>
    </Provider>, document.getElementById('root')
)
// <IndexRoute component={ConverterData}/>
