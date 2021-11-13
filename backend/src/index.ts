import { server } from './utils/apollo'
import { Mongo } from './utils/mongo'


// HANDLE EXITS
process.stdin.resume()

interface ExitOptions {
  exit?: boolean
  cleanup?: boolean
}

async function exitHandler(options: ExitOptions, exitCode?: number) {
  if (options.cleanup) {
    console.log("Cleaning up...")
    await stop()
  }

  if (exitCode || exitCode === 0) console.log("Exit with code: ", exitCode)
  if (options.exit) process.exit()
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }))

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }))

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }))
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }))

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit:true }))


// SERVE
async function start() {
  console.log("Init db...")
  await Mongo.connect()

  console.log("Starting server...")
  return server.listen({ port: process.env.SERVER_PORT || 4001 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

async function stop() {
  console.log("Close db...")
  await Mongo.close()

  console.log("Stop server...")
  await server.stop()
}

start()
  .catch(async (e) => {
    console.error("Error during start: ", e)
    await stop()
  })