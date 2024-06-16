import DataLoader from 'dataloader'
import { Db, Document, MongoClient } from 'mongodb'
import hash from 'object-hash'

const DEFAULT_DB = 'default'
const client = new MongoClient(
  process.env['MONGO_CONNECTION'] || 'mongodb://mongo:27017'
)

export class Mongo {
  static db: Db = null as unknown as Db

  private static onConnectHooks: (() => void)[] = []

  static onConnect(fn: () => void) {
    Mongo.onConnectHooks.push(fn)
  }

  static async connect() {
    await client.connect()
    Mongo.db = client.db(DEFAULT_DB)

    Mongo.onConnectHooks.forEach((fn) => fn())

    return Mongo.db
  }

  static async close() {
    return client.close()
  }
}

export function _id(doc: Document) {
  if (typeof doc === 'object' && doc?._id) return doc['_id']
  else return null
}

export function slug(doc?: Document) {
  return Array.isArray(doc?.slug) ? doc?.slug?.[0] : doc?.slug
}

export function fnLoader<A extends unknown[], R>(fn: (...args: A) => R) {
  const loader = new DataLoader<A, R, string>(
    (argsList) => {
      return Promise.all(
        argsList.map((args) => {
          return fn(...args)
        })
      )
    },
    { cacheKeyFn: hash, batch: false }
  )

  const loadedFn: (...args: A) => Promise<R> = (...args) => loader.load(args)
  return Object.assign(loadedFn, loader)
}
