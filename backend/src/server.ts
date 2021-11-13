import express from "express"
import { server } from "src/apollo"

const PORT = process.env.SERVER_PORT || 4001

export async function startServer() {
  const app = express()
  await server.start()

  server.applyMiddleware({ app })

  return app.listen(PORT, () => {
    console.log(
      `🚀  Server ready at http://localhost:${PORT} (GQL: ${server.graphqlPath})`
    )
  })
}
