import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { ridePosted } from "../generated/schema"
import { ridePosted as ridePostedEvent } from "../generated/RideManegement/RideManegement"
import { handleridePosted } from "../src/ride-manegement"
import { createridePostedEvent } from "./ride-manegement-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let rideid = BigInt.fromI32(234)
    let pickup = "Example string value"
    let destination = "Example string value"
    let date = "Example string value"
    let time = "Example string value"
    let passengers = BigInt.fromI32(234)
    let price = BigInt.fromI32(234)
    let driver = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newridePostedEvent = createridePostedEvent(
      rideid,
      pickup,
      destination,
      date,
      time,
      passengers,
      price,
      driver
    )
    handleridePosted(newridePostedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ridePosted created and stored", () => {
    assert.entityCount("ridePosted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ridePosted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "rideid",
      "234"
    )
    assert.fieldEquals(
      "ridePosted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "pickup",
      "Example string value"
    )
    assert.fieldEquals(
      "ridePosted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "destination",
      "Example string value"
    )
    assert.fieldEquals(
      "ridePosted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "date",
      "Example string value"
    )
    assert.fieldEquals(
      "ridePosted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "time",
      "Example string value"
    )
    assert.fieldEquals(
      "ridePosted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "passengers",
      "234"
    )
    assert.fieldEquals(
      "ridePosted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )
    assert.fieldEquals(
      "ridePosted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "driver",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
