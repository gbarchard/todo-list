import { ObjectId } from 'bson'
import { Slug, UserId } from 'src/general.types'

export interface ItemModel {
  _id: ObjectId
  slug: Slug
  name: string
  ownerId: UserId
  createdDate: Date
}
