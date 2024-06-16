import faker from '@faker-js/faker'
import { ObjectId } from 'mongodb'
import { UserId } from 'src/general.types'

export function makeFakeUserId(): UserId {
  return faker.datatype.string(28)
}

export function makeFakeObjectId(): ObjectId {
  return new ObjectId(faker.datatype.number())
}
