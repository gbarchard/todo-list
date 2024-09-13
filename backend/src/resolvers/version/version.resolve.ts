import { QueryResolvers } from 'src/generated/resolvers-types'

import packageJson from '../../../package.json'

export const Query: Pick<QueryResolvers, 'version'> = {
  version: (_, __, ctx) => {
    return packageJson['version'] + '-' + ctx.decodedToken?.uid
  },
}

export default {
  Query,
}
