import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import CareerPath from './components/career/CareerPath';
import Header from './components/shared/Header';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/career-path" component={CareerPath} />
        {/* Add more routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;