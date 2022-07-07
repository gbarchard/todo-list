import chai from "chai"
import faker from "@faker-js/faker"
import { ObjectId } from "mongodb"
import sinon from "sinon"
import "sinon-mongo"

import * as itemsRepo from "src/resolvers/items/items.repo"
import { makeFakeUserId } from "src/utils/testing"

const { expect } = chai

describe("items.repo", async function () {
  let mockCollection: { findOne: sinon.SinonSpy<any, any> }
  this.beforeEach(async function () {
    const sandbox = sinon.createSandbox()

    // @ts-ignore
    mockCollection = sinon.mongo.collection()

    sandbox.stub(itemsRepo, "coll").value(mockCollection)
  })

  const objectIdStr = new ObjectId(faker.datatype.number()).toHexString()
  const userIdStr = makeFakeUserId()

  describe("getItemBy can find by:", async function () {
    it("id", async function () {
      await itemsRepo.getItemBy.id(objectIdStr, userIdStr)

      sinon.assert.calledOnce(mockCollection.findOne)

      const [{ _id }] = mockCollection.findOne.getCall(0).args
      expect(_id).instanceOf(ObjectId)
    })

    it("slug", async function () {
      const slug = faker.datatype.string(6)
      await itemsRepo.getItemBy.slug(slug, userIdStr)

      sinon.assert.calledOnce(mockCollection.findOne)

      const [{ slug: slugArg }] = mockCollection.findOne.getCall(0).args
      expect(slugArg).eq(slug)
    })
  })

  describe("getItemBy.id()", function () {
    it("coerces a string-valued _id to an ObjectId", async function () {
      await itemsRepo.getItemBy.id(objectIdStr, userIdStr)

      sinon.assert.calledOnce(mockCollection.findOne)

      const [{ _id }] = mockCollection.findOne.getCall(0).args
      expect(_id).instanceOf(ObjectId)
    })
  })

  describe("itemsLoader", function () {
    it("only calls repo once", async function () {
      const loader = new itemsRepo.ItemsLoader()

      await loader.id(objectIdStr, userIdStr)
      await loader.id(objectIdStr, userIdStr)

      sinon.assert.calledOnce(mockCollection.findOne)
    })
  })
})
