import { ObjectId } from 'mongodb'
import { UserId } from 'src/general.types'
import { makeSlug } from 'src/utils/string'
import { ItemModel } from './items.model'

/**
 * Create an item object
 * @param ownerId user ID for the person creating this item
 * @param name name of the item
 * @returns item
 */
export function makeItem(ownerId: UserId, name: string): ItemModel {
  const _id = new ObjectId()

  return {
    _id,
    name,
    slug: makeSlug(_id, name),
    ownerId,
    createdDate: new Date(),
  }
}
