import {
  carAdded as carAddedEvent,
  userCreated as userCreatedEvent
} from "../generated/UserManagement/UserManagement"
import { carAdded, userCreated } from "../generated/schema"

export function handlecarAdded(event: carAddedEvent): void {
  let entity = new carAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.carMake = event.params.carMake
  entity.model = event.params.model

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleuserCreated(event: userCreatedEvent): void {
  let entity = new userCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.userAddy = event.params.userAddy
  entity.username = event.params.username

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
