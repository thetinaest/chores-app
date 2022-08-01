import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import providers for global state (if nessessary)

// import components

// import pages
import LoginParent from './pages/loginParent';
import LoginChild from './pages/loginChild';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div>
        
          <Nav />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login-parent" component={LoginParent} />
            <Route exact path="/login-child" component={LoginChild} />
          </Switch>
        
      </div>
    </Router>
  </ApolloProvider>
  );
}

export default App;
