import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Auth from './utils/auth';

// import providers for global state (if nessessary)

// import components
import Header from './components/Header';
import InitializeParent from './components/InitializeParent';
import InitializeChild from './components/InitializeChild';

// import pages
import LoginParent from './pages/loginParent';
import LoginChild from './pages/loginChild';
import Dashboard from './pages/dashboard';
import ParentHome from './pages/ParentHome';
import ParentView from './pages/ParentView';
import CreateChild from './pages/createChild';
import AddChore from './pages/addChore';
import ChildHome from './pages/ChildHome';
import SignUp from './pages/SignUp';
import ParentProfile from './pages/ParentProfile';
import ParentPassword from './pages/ParentPassword';
import ChildProfile from './pages/ChildProfile';
import ChildPassword from './pages/ChildPassword';

import { AppProvider } from './utils/GlobalState';

const httpLink = createHttpLink({
  uri: '/graphql'
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
  const [loggedIn, setLoggedIn] = useState(Auth.loggedIn());

  let profile;

  if (loggedIn) {
    profile = Auth.getProfile();
  } 

  return (
    <ApolloProvider client={client}>
    <Router>
      <AppProvider>    
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        {/* Set initial parent state */}
        {loggedIn && profile.data.userType === 'parent' && <InitializeParent />}
        {/* Set initial chile state */}
        {loggedIn && profile.data.userType === 'child' && <InitializeChild />}
        
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login-parent" element={<LoginParent setLoggedIn={setLoggedIn}/>} />
          <Route path="/login-child" element={<LoginChild setLoggedIn={setLoggedIn}/>} />
          <Route path="/sign-up" element={<SignUp setLoggedIn={setLoggedIn}/>} />

          <Route path="/parent-home" element={<ParentHome />} />
          <Route path="/create-child" element={<CreateChild />} />
          <Route path="/add-chore" element={<AddChore />} />
          <Route path="/children/:childId" element={<ParentView />} />
          <Route path="/parent-profile" element={<ParentProfile />} />
          <Route path="/parent-password" element={<ParentPassword /> } />
          <Route path="/child-profile/:childId" element={<ChildProfile />} />
          <Route path="/child-password/:childId" element={<ChildPassword />} />

          <Route path="/child-home" element={<ChildHome />} />
        </Routes>
      </AppProvider>      
    </Router>
  </ApolloProvider>
  );
}

export default App;
