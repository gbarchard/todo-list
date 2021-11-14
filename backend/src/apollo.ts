import { ExpressContext, ApolloServer, gql } from "apollo-server-express"

import fs from "fs"
import path from "path"
import {
  MutationResolvers,
  QueryResolvers,
} from "src/generated/resolvers-types"
import Items, { Item, ItemsLoader } from "src/resolvers/items/items"

const packageJson = require("../package.json")

function loadGQL(filename: string) {
  const filePath = path.join(__dirname, filename)
  const schemaString = fs.readFileSync(filePath).toString()
  return gql(schemaString)
}

const typeDefs = loadGQL("./schema.gql")

const Query: QueryResolvers = {
  version: () => packageJson["version"],
  ...Items.Query,
}

const Mutation: MutationResolvers = {
  ...Items.Mutation,
}

const resolvers = {
  Query,
  Mutation,

  Item,
}

const context = (ctx: ExpressContext) => ({
  date: new Date(),
  loaders: {
    items: ItemsLoader(),
  },
})

export type RequestContext = ReturnType<typeof context>

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
})
