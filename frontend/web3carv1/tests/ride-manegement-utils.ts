import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ridePosted,
  seatBought
} from "../generated/RideManegement/RideManegement"

export function createridePostedEvent(
  rideid: BigInt,
  pickup: string,
  destination: string,
  date: string,
  time: string,
  passengers: BigInt,
  price: BigInt,
  driver: Address
): ridePosted {
  let ridePostedEvent = changetype<ridePosted>(newMockEvent())

  ridePostedEvent.parameters = new Array()

  ridePostedEvent.parameters.push(
    new ethereum.EventParam("rideid", ethereum.Value.fromUnsignedBigInt(rideid))
  )
  ridePostedEvent.parameters.push(
    new ethereum.EventParam("pickup", ethereum.Value.fromString(pickup))
  )
  ridePostedEvent.parameters.push(
    new ethereum.EventParam(
      "destination",
      ethereum.Value.fromString(destination)
    )
  )
  ridePostedEvent.parameters.push(
    new ethereum.EventParam("date", ethereum.Value.fromString(date))
  )
  ridePostedEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromString(time))
  )
  ridePostedEvent.parameters.push(
    new ethereum.EventParam(
      "passengers",
      ethereum.Value.fromUnsignedBigInt(passengers)
    )
  )
  ridePostedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  ridePostedEvent.parameters.push(
    new ethereum.EventParam("driver", ethereum.Value.fromAddress(driver))
  )

  return ridePostedEvent
}

export function createseatBoughtEvent(
  rideid: BigInt,
  buyer: Address,
  pickup: string,
  destination: string,
  time: string,
  seatsAvaiable: BigInt,
  currentPassengers: Array<Address>
): seatBought {
  let seatBoughtEvent = changetype<seatBought>(newMockEvent())

  seatBoughtEvent.parameters = new Array()

  seatBoughtEvent.parameters.push(
    new ethereum.EventParam("rideid", ethereum.Value.fromUnsignedBigInt(rideid))
  )
  seatBoughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  seatBoughtEvent.parameters.push(
    new ethereum.EventParam("pickup", ethereum.Value.fromString(pickup))
  )
  seatBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "destination",
      ethereum.Value.fromString(destination)
    )
  )
  seatBoughtEvent.parameters.push(
    new ethereum.EventParam("time", ethereum.Value.fromString(time))
  )
  seatBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "seatsAvaiable",
      ethereum.Value.fromUnsignedBigInt(seatsAvaiable)
    )
  )
  seatBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "currentPassengers",
      ethereum.Value.fromAddressArray(currentPassengers)
    )
  )

  return seatBoughtEvent
}
