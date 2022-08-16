import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Context from './Context'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
  //uri: 'https://petgram-cv2-9tezk4558-japai-vnzl.vercel.app/graphql'

uri: 'https://api-nine-gamma.vercel.app/graphql'
})

const authLink = setContext((_, { headers }) => { // get the authentication token from local storage if it exists
  const token = window.sessionStorage.getItem('token') // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({

  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),

  onError: onError(
    ({ networkError }) => {
      if (networkError && networkError.result.code === 'invalid_token') {
        window.sessionStorage.removeItem('token')
        window.location.href = '/'
      }
    }
  )

})

ReactDOM.render(
  <Context.Provider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Context.Provider>,
  document.getElementById('app')
)
