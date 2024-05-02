const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('User Managment contract tests', function () {
  let userManagmentContract, userManagmentDeployed;
  let owner, address1, address2;

  beforeEach(async function () {
    userManagmentContract = await ethers.getContractFactory('UserManagement');
    [owner, address1, address2] = await ethers.getSigners();
    userManagmentDeployed = await userManagmentContract.deploy();
  });

  describe('Testing deployment Stage', function () {
    it('Correct owner should be set', async function () {
      expect(await userManagmentDeployed.owner()).to.equal(owner.address);
    });
    it('The starting userID is 0', async function () {
      expect(await userManagmentDeployed.currentUserID()).to.equal(0);
    });
    it('The starting car ID should be 0', async function () {
      expect(await userManagmentDeployed.currentCarID()).to.equal(0);
    });
  });

  describe('Testing user managment functions', function () {
    it('should allow adding and retrieving a user', async function () {
      const userName = 'szymon';
      await userManagmentDeployed.registerUser(userName);

      const retrievedUser = await userManagmentDeployed.getUser(owner.address);

      expect(retrievedUser.username).to.equal(userName);
      expect(retrievedUser.userCreated).to.be.true;
    });
    it('it should emit an event once register function completes', async function () {
      const userName = 'szymon';
      await expect(userManagmentDeployed.registerUser(userName)).to.emit(
        userManagmentDeployed,
        'userCreated',
      );
    });
    it('this test will check if the require statment works and will not add the same user twice inside register function', async function () {
      await userManagmentDeployed.registerUser('Szymon');
      await expect(userManagmentDeployed.registerUser('Szymon')).to.be.reverted;
    });
    it('this test is checking the addCarToUser function', async function () {
      await userManagmentDeployed.registerUser('Szymon');
      await userManagmentDeployed.addCarToUser(
        'Poland',
        '23jhkhik',
        'Ford',
        'Focus',
        'Hatchback',
        'White',
        '1997',
      );

      const retrivedUserCar = await userManagmentDeployed.getCar(owner.address);
      const retrivedUser = await userManagmentDeployed.getUser(owner.address);

      expect(retrivedUserCar.registrationPlate).to.equal('23jhkhik');
      expect(retrivedUser.hasCar).to.be.true;
    });
    it('This test will check if the event emmits correctly', async function () {
      const newCar = [
        'Poland',
        '23jhkhik',
        'Ford',
        'Focus',
        'Hatchback',
        'White',
        '1997',
      ];
      await userManagmentDeployed.registerUser('Szymon');
      await expect(userManagmentDeployed.addCarToUser(...newCar)).to.emit(
        userManagmentDeployed,
        'carAdded',
      );
    });
    it('This test will check if the require statment inside addcar function works', async function () {
      const newCar = [
        'Poland',
        '23jhkhik',
        'Ford',
        'Focus',
        'Hatchback',
        'White',
        '1997',
      ];

      await expect(userManagmentDeployed.addCarToUser(...newCar)).to.be
        .reverted;
    });
  });
});
