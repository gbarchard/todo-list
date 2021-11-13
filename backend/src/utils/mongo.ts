import { Db, MongoClient } from "mongodb"

const DEFAULT_DB = "default"
const client = new MongoClient(process.env["MONGO_CONNECTION"] || "mongodb://mongo:27017")

export class Mongo {
  static db: Db = null as unknown as Db

  static async connect() {
    await client.connect()
    Mongo.db = client.db(DEFAULT_DB)
    return Mongo.db
  }

  static async close() {
    return client.close()
  }
}

export function _id(doc: any) {
  if (typeof doc == 'object' && doc['_id']) return doc['_id']
  else return null
}