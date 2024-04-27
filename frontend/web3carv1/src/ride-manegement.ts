import {
  ridePosted as ridePostedEvent,
  seatBought as seatBoughtEvent,
} from "../generated/RideManegement/RideManegement";
import { ridePosted, seatBought } from "../generated/schema";
import { Bytes, Address } from "@graphprotocol/graph-ts";

export function handleridePosted(event: ridePostedEvent): void {
  let entity = new ridePosted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.rideid = event.params.rideid;
  entity.pickup = event.params.pickup;
  entity.destination = event.params.destination;
  entity.date = event.params.date;
  entity.time = event.params.time;
  entity.passengers = event.params.passengers;
  entity.price = event.params.price;
  entity.driver = event.params.driver;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleseatBought(event: seatBoughtEvent): void {
  let entity = new seatBought(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.rideid = event.params.rideid;
  entity.buyer = event.params.buyer;
  entity.pickup = event.params.pickup;
  entity.destination = event.params.destination;
  entity.time = event.params.time;
  entity.seatsAvaiable = event.params.seatsAvaiable;
  entity.currentPassengers = event.params.currentPassengers.map<Bytes>(
    (address: Address): Bytes => Bytes.fromByteArray(address as Bytes)
  );

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
