import { ObjectId } from 'bson'
import { Slug, UserId } from 'src/general.types'

export interface ItemModel {
  _id: ObjectId
  slug: Slug
  name: String
  ownerId: UserId
  createdDate: Date
}
