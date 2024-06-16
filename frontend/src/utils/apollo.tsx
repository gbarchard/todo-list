import React from 'react'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  concat,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { logout, useAuthContext } from './auth'

export function Apollo(props: React.PropsWithChildren<{}>) {
  const auth = useAuthContext()

  const client = React.useMemo(() => {
    const httpLink = new HttpLink({
      uri: ({ operationName }) => `/n/api/graphql/${operationName}`,
    })

    const logoutLink = onError(({ networkError }) => {
      if (
        networkError &&
        'statusCode' in networkError &&
        networkError.statusCode === 401
      ) {
        logout()
      }
    })

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          authorization: auth?.token,
        },
      }))

      return forward(operation)
    })

    return new ApolloClient({
      link: concat(authMiddleware, concat(logoutLink, httpLink)),
      cache: new InMemoryCache(),
    })
  }, [auth])

  return <ApolloProvider client={client}>{props.children}</ApolloProvider>
}
