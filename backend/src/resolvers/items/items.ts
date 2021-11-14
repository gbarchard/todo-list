import { ObjectId } from "bson"
import { Collection } from "mongodb"

import {
  ItemResolvers,
  MutationResolvers,
  QueryResolvers,
} from "src/generated/resolvers-types"

import { _id, Mongo, idLoader } from "src/utils/mongo"
import { ItemModel } from "./itemModels"

const ITEMS_COLLECTION = "items"

export const ItemsLoader = () => idLoader<ItemModel>(ITEMS_COLLECTION)

let itemsColl: Collection | null = null
function coll() {
  itemsColl = itemsColl ?? Mongo.db.collection(ITEMS_COLLECTION)
  return itemsColl
}

export const Item: Partial<ItemResolvers> = {
  id: _id,
}

export const Query: Pick<QueryResolvers, "items"> = {
  items: () => {
    return coll().find<ItemModel>({}).toArray()
  },
}

export const Mutation: Pick<MutationResolvers, "addItem" | "deleteItem"> = {
  addItem: async (_, { name }, context) => {
    const doc: ItemModel = {
      _id: new ObjectId(),
      name,
      createdDate: context.date,
    }
    await coll().insertOne(doc)
    return doc
  },

  deleteItem: async (_, { id }) => {
    await coll().deleteOne({ _id: new ObjectId(id) })
    return true
  },
}

export default {
  Item,
  Query,
  Mutation,
}
