import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { carAdded, userCreated } from "../generated/UserManagment/UserManagment"

export function createcarAddedEvent(
  owner: Address,
  carMake: string,
  model: string
): carAdded {
  let carAddedEvent = changetype<carAdded>(newMockEvent())

  carAddedEvent.parameters = new Array()

  carAddedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  carAddedEvent.parameters.push(
    new ethereum.EventParam("carMake", ethereum.Value.fromString(carMake))
  )
  carAddedEvent.parameters.push(
    new ethereum.EventParam("model", ethereum.Value.fromString(model))
  )

  return carAddedEvent
}

export function createuserCreatedEvent(
  userAddy: Address,
  username: string
): userCreated {
  let userCreatedEvent = changetype<userCreated>(newMockEvent())

  userCreatedEvent.parameters = new Array()

  userCreatedEvent.parameters.push(
    new ethereum.EventParam("userAddy", ethereum.Value.fromAddress(userAddy))
  )
  userCreatedEvent.parameters.push(
    new ethereum.EventParam("username", ethereum.Value.fromString(username))
  )

  return userCreatedEvent
}
