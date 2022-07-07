import { ObjectId } from "bson"
import { Collection } from "mongodb"

import {
  ItemResolvers,
  MutationResolvers,
  QueryResolvers,
} from "src/generated/resolvers-types"

import { _id } from "src/utils/mongo"
import { ItemModel } from "./items.model"
import { itemsColl } from "./items.repo"
import { makeItem } from "./items.util"

export const Item: Partial<ItemResolvers> = {
  id: _id,
}

export const Query: Pick<QueryResolvers, "items"> = {
  items: () => {
    return itemsColl().find<ItemModel>({}).toArray()
  },
}

export const Mutation: Pick<MutationResolvers, "addItem" | "deleteItem"> = {
  addItem: async (_, { name }, { userId }) => {
    if (!userId) return null

    const doc = makeItem(userId, name)
    await itemsColl().insertOne(doc)
    return doc
  },

  deleteItem: async (_, { id }) => {
    await itemsColl().deleteOne({ _id: new ObjectId(id) })
    return true
  },
}

export default {
  Item,
  Query,
  Mutation,
}
