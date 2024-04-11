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
        uint pickupTime;
        uint numOfSeatsAvaiable;
        uint price;
        address[] passengers; // I was thinking of having a mapping here instead
    }

    event ridePosted(
        address driver,
        string pickup,
        string destination,
        uint time
    );
    event seatBought(
        uint rideid,
        address buyer,
        string pickup,
        string destination,
        uint time
    );

    mapping(address => Ride) usersRides;
    mapping(uint => Ride) rides;
    uint256 currentrideID = 0;

    constructor(address userManagementAddy, address pricefeedAddy) {
        userContract = UserManagement(userManagementAddy);
        priceFeed = AggregatorV3Interface(pricefeedAddy);
    }

    function createRide(
        string memory _pickup,
        string memory _destination,
        string memory _date,
        uint _time,
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
        emit ridePosted(msg.sender, _pickup, _destination, _time);
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
            currentRide.pickupTime
        );
    }

    function convertTest(uint amount) public view returns (uint256) {
        uint256 converted = amount.getConversionRate(priceFeed);
        return converted;
    }
}
