import { ObjectId } from "bson"

export interface ItemModel {
  _id: ObjectId
  name: String
  createdDate: Date
}