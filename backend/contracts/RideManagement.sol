pragma solidity 0.8.24;

import "contracts/UserManagement.sol";

contract RideManagement {
UserManagement public userContract;

struct Ride {
    uint id;
    string pickup;
    string destination;
    string date;
    uint pickupTime;
    uint numOfSeatsAvaiable;
    uint price;
    address[] passengers;
}

event ridePosted(address driver, string pickup, string destination, uint time);
event seatBought(uint rideid, address buyer, string pickup, string destination, uint time);

mapping(address => Ride) usersRides;
mapping(uint => Ride) rides;
uint256 currentrideID = 0;

function createRide(string memory _pickup, string memory _destination, string memory _date, 
                    uint _time, uint _seats, uint _price) external 
    {
        require(userContract.getUser(address(msg.sender)).hasCar, "user needs car to post ride");
        currentrideID++;

        Ride storage  newRide = rides[currentrideID](
            currentrideID, 
            _pickup,
            _destination,
            _date,
            _time,
            _seats,
            _price,
            _time,
            _seats,
            _price
        );



    }


}