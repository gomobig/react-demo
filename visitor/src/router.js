import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './pages/Welcome/Welcome';
import Form from './pages/Form/Form';
import Result from './pages/Result/Result';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" exact component={App} />
        <Route path="/form" component={Form} />
        <Route path="/result" component={Result} />
      </div>
    </Router>
  </Provider>
);

export default Root;