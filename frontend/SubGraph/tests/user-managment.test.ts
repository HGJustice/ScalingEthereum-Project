import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { carAdded } from "../generated/schema"
import { carAdded as carAddedEvent } from "../generated/UserManagment/UserManagment"
import { handlecarAdded } from "../src/user-managment"
import { createcarAddedEvent } from "./user-managment-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let carMake = "Example string value"
    let model = "Example string value"
    let newcarAddedEvent = createcarAddedEvent(owner, carMake, model)
    handlecarAdded(newcarAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("carAdded created and stored", () => {
    assert.entityCount("carAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "carAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "carAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "carMake",
      "Example string value"
    )
    assert.fieldEquals(
      "carAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "model",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
