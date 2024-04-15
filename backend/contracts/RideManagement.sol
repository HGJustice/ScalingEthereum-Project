// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import "contracts/UserManagement.sol";
import "contracts/PriceFeed.sol";

contract RideManagement {
    UserManagement public userContract;
    AggregatorV3Interface private priceFeed;
    using PriceConverter for uint256;

    struct Ride {
        uint id;
        string pickup;
        string destination;
        string date;
        string pickupTime;
        uint numOfSeatsAvaiable;
        uint price;
        address[] passengers; // I was thinking of having a mapping here instead
    }

    event ridePosted(
        uint rideid,
        string pickup,
        string destination,
        string date,
        string time,
        uint passengers,
        uint price,
        address driver
    );
    event seatBought(
        uint rideid,
        address buyer,
        string pickup,
        string destination,
        string time,
        uint seatsAvaiable,
        address[] currentPassengers
    );

    mapping(address => Ride) public usersRides;
    mapping(uint => Ride) public rides;
    uint256 public currentrideID = 0;

    constructor(address userManagementAddy) {
        userContract = UserManagement(userManagementAddy);
        priceFeed = AggregatorV3Interface(
            0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165
        );
    }

    function createRide(
        string memory _pickup,
        string memory _destination,
        string memory _date,
        string memory _time,
        uint _seats,
        uint _price
    ) external {
        require(
            userContract.getUser(address(msg.sender)).hasCar,
            "user needs car to post ride"
        );
        currentrideID++;

        Ride memory newRide = Ride(
            currentrideID,
            _pickup,
            _destination,
            _date,
            _time,
            _seats,
            _price,
            new address[](_seats)
        );

        usersRides[msg.sender] = newRide;
        rides[currentrideID] = newRide;
        emit ridePosted(
            currentrideID,
            _pickup,
            _destination,
            _date,
            _time,
            _seats,
            _price,
            msg.sender
        );
    }

    function BuyRide(uint chosenRide) external payable {
        require(chosenRide <= currentrideID, "chosen invalid ride");

        Ride storage currentRide = rides[chosenRide];
        require(currentRide.numOfSeatsAvaiable > 0, "ride sold out");
        require(
            msg.value >= currentRide.price.getConversionRate(priceFeed),
            "pls send enough eth to cover ride"
        );

        for (uint index = 0; index < currentRide.passengers.length; index++) {
            if (currentRide.passengers[index] == address(0)) {
                currentRide.passengers[index] = address(msg.sender);
                break;
            }
        }

        currentRide.numOfSeatsAvaiable -= 1;
        emit seatBought(
            chosenRide,
            msg.sender,
            currentRide.pickup,
            currentRide.destination,
            currentRide.pickupTime,
            currentRide.numOfSeatsAvaiable,
            currentRide.passengers
        );
    }

    function convertTest(uint amount) public view returns (uint256) {
        uint256 converted = amount.getConversionRate(priceFeed);
        return converted;
    }
}
