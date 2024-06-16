import express from 'express'
import { Server } from 'http'

import { server } from 'src/apollo'
import { setContext } from './utils/context'
import { auth } from './utils/firebase'
import { expressLogger } from './utils/logger'

const PORT = process.env.SERVER_PORT || 4001

let expressServer: Server | null = null

export async function startServer() {
  const app = express()
  await server.start()

  app.use(expressLogger)

  app.use(async function (req, res, next) {
    const token = req.headers['authorization']
    if (!token) return res.status(401).send()

    try {
      const decodedToken = await auth.verifyIdToken(token)
      setContext(req, { decodedToken, userId: decodedToken?.uid })
    } catch (e) {
      return res.status(401).send()
    }

    next()
  })

  server.applyMiddleware({ app })

  // TODO: Re-implement this when it is more flushed out
  //app.use(expressErrorLogger)

  expressServer = app.listen(PORT, () => {
    console.log(
      `🚀  Server ready at http://localhost:${PORT} (GQL: ${server.graphqlPath})`
    )
  })

  return expressServer
}

export async function stopServer() {
  await server.stop()
  await expressServer?.close()
}
