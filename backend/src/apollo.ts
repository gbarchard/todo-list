import { ExpressContext, ApolloServer } from 'apollo-server-express'
import { ItemsLoader } from 'src/resolvers/items/items.repo'
import { getContext } from 'src/utils/context'
import typeDefs from './resolvers/typeDefs'
import resolvers from './resolvers/resolvers'

const context = (ctx: ExpressContext) => ({
  loaders: {
    items: new ItemsLoader(),
  },
  ...(getContext(ctx.req) || {}),
  ...ctx,
})

export type RequestContext = ReturnType<typeof context>

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})
