import { loadTypedefsSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { DocumentNode } from 'graphql'

const typeDefs = loadTypedefsSync('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
})

export default typeDefs
  .map((t) => t.document)
  .filter((t) => !!t) as DocumentNode[]
