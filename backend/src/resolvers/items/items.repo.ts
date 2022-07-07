import { ObjectId } from "bson"
import { Collection } from "mongodb"
import { ObjectIdLike, Slug, UserId } from "src/general.types"

import { _id, Mongo, fnLoader } from "src/utils/mongo"
import { ItemModel } from "./items.model"

const ITEMS_COLLECTION = "items"

export let coll: Collection<ItemModel> | null = null
export function itemsColl() {
  coll = coll ?? Mongo.db.collection<ItemModel>(ITEMS_COLLECTION)
  return coll
}

// Helper fns for interacting with Items mongo

export const getItemBy = {
  id: async (id: ObjectIdLike, userId: UserId) => {
    const deckId = typeof id == "string" ? new ObjectId(id) : id
    return itemsColl().findOne<ItemModel>({ _id: deckId, ownerId: userId })
  },
  slug: async (slug: Slug, userId: UserId) => {
    return itemsColl().findOne<ItemModel>({ slug, ownerId: userId })
  },
}

export class ItemsLoader {
  id = fnLoader(getItemBy.id)
  slug = fnLoader(getItemBy.slug)
}
