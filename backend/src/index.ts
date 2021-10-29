import { ApolloServer, gql } from 'apollo-server'
import fs from 'fs'
import path from 'path'

const packageJson = require('../package.json')

function loadGQL(filename: string) {
  const filePath = path.join(__dirname, filename)
  const schemaString = fs.readFileSync(filePath).toString()
  return gql(schemaString)
}

const typeDefs = loadGQL('./schema.gql')

const resolvers = {
  Query: {
    version: () => packageJson["version"],
  },
}

const server = new ApolloServer({ typeDefs, resolvers })
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
})