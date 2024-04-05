pragma solidity 0.8.24;

contract UserManagement{
    struct User {
        uint id; 
        string username;
        address userAddress;
        uint rating;
        uint numRides;
        bool userCreated;
        bool hasCar;
    }

    struct Car {
        uint id;
        User owner;
        string countryOrigin;
        string registrationPlate;
        string carMake;
        string model;
        string typeOfCar;
        string color;
        uint year;
        uint numLifts;
    }

    event userCreated(address userAddy, string username);
    event carAdded(User owner, string carMake, string model);

    mapping(address => User) users;
    mapping(address => Car) usersCar;
    uint256 currentUserID = 0;
    uint256 currentCarID = 0;

    function registerUser(string calldata userName) external {
        require(!users[msg.sender].userCreated, "user already created");
        currentUserID++;

        User memory newUser = User(
            currentUserID,
            userName,
            address(msg.sender),
            0,
            0,
            true,
            false
        );

        users[msg.sender] = newUser;
        emit userCreated(msg.sender, userName);
    }

    function addCarToUser(string memory countryOrigin, string memory regPlate, string memory carMake, 
         string memory model, string memory typeOfCar, string memory color, uint year) external 
    {
        require(users[msg.sender].userCreated, "must create user first");
        currentCarID++;

        User memory currentUser = users[msg.sender];
        Car memory newCar = Car (
            currentCarID,
            currentUser,
            countryOrigin,
            regPlate,
            carMake,
            model,
            typeOfCar,
            color,
            year,
            0
        );

        usersCar[msg.sender] = newCar;
        emit carAdded(currentUser, carMake, model);


    }
}