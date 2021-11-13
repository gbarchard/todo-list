import { ObjectId } from "bson"
import { Collection } from "mongodb"
import {
  ItemResolvers,
  MutationResolvers,
  QueryResolvers,
} from "src/generated/resolvers-types"
import { _id, Mongo } from "src/utils/mongo"
import { ItemModel } from "./itemModels"

let itemsColl: Collection | null = null
function coll() {
  itemsColl = itemsColl ?? Mongo.db.collection("items")
  return itemsColl
}

export const Item: Partial<ItemResolvers> = {
  id: _id,
}

export const ItemsQuery: Pick<QueryResolvers, "items"> = {
  items: () => {
    return coll().find<ItemModel>({}).toArray()
  },
}

export const ItemsMutation: Pick<MutationResolvers, "addItem" | "deleteItem"> =
  {
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
