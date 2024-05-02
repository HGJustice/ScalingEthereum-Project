pragma solidity 0.8.20;

contract UserManagement {
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

  address public owner;
  mapping(address => User) users;
  mapping(address => Car) usersCar;
  uint256 public currentUserID = 0;
  uint256 public currentCarID = 0;

  constructor() {
    owner = msg.sender;
  }

  function registerUser(string calldata userName) external {
    require(!users[msg.sender].userCreated, 'user already created');
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

  function addCarToUser(
    string memory _countryOrigin,
    string memory _regPlate,
    string memory _carMake,
    string memory _model,
    string memory _typeOfCar,
    string memory _color,
    uint _year
  ) external {
    require(users[msg.sender].userCreated, 'must create user first');
    currentCarID++;

    User storage currentUser = users[msg.sender];
    currentUser.hasCar = true;

    Car memory newCar = Car(
      currentCarID,
      _countryOrigin,
      _regPlate,
      _carMake,
      _model,
      _typeOfCar,
      _color,
      _year,
      0
    );

    usersCar[msg.sender] = newCar;
    emit carAdded(currentUser, _carMake, _model);
  }

  function getUser(address useraddy) external view returns (User memory) {
    return users[useraddy];
  }

  function getCar(address useraddy) external view returns (Car memory) {
    return usersCar[useraddy];
  }
}
