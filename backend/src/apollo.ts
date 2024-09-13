import { ExpressContext, ApolloServer, gql } from 'apollo-server-express'
import fs from 'fs'
import path from 'path'

import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
} from 'src/generated/resolvers-types'
import { dateScalar } from 'src/resolvers/scalars.resolve'
import Items, { Item } from 'src/resolvers/items/items.resolve'
import Version from 'src/resolvers/version/version.resolve'
import { ItemsLoader } from 'src/resolvers/items/items.repo'
import { getContext } from 'src/utils/context'

function loadGQL(filename: string) {
  const filePath = path.join(__dirname, filename)
  const schemaString = fs.readFileSync(filePath).toString()
  return gql(schemaString)
}

const typeDefs = loadGQL('./schema.gql')

const Query: QueryResolvers = {
  ...Version.Query,
  ...Items.Query,
}

const Mutation: MutationResolvers = {
  ...Items.Mutation,
}

const typeResolvers: RecursivePartial<Resolvers> = {
  Item,
}

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
  resolvers: {
    Query,
    Mutation,
    ...typeResolvers,
    Date: dateScalar,
  },
  context,
})
