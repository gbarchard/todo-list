import express from "express"

import { server } from "src/apollo"
import { expressErrorLogger, expressLogger } from "./utils/logger"

const PORT = process.env.SERVER_PORT || 4001

export async function startServer() {
  const app = express()
  await server.start()

  app.use(expressLogger)

  server.applyMiddleware({ app })

  // TODO: Re-implement this when it is more flushed out
  //app.use(expressErrorLogger)

  return app.listen(PORT, () => {
    console.log(
      `🚀  Server ready at http://localhost:${PORT} (GQL: ${server.graphqlPath})`
    )
  })
}
