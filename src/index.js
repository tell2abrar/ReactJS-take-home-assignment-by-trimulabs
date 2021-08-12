import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';


/*                              NOTE!
--------------------------------------------------------------------------
1. I'm following appolo-client official documentation to setup appolo-client
   in my react project.

2. You will find mutation string in separate folder i.e graphql/mutations.
   I use this approach to keep the code clean.
---------------------------------------------------------------------------
*/


//Importing symbols from appolo client that we need
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
} from "@apollo/client";
 


//Initializing the appolo client instance
const client = new ApolloClient({
  uri: 'https://api.graphql.jobs/',
  cache: new InMemoryCache()
});

/*
  Wrapping up our app with appolo client provider so that we can perform
  query/mutation anywhere in our app easily and we can get notified as status of query/mutation
  changes and can updata UI accordingly
*/

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

