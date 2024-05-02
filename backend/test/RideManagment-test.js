const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('User Managment Tests', function () {
  let userManagmentDeployed, rideManagmentDeployed, mockPriceFeed;
  let owner, address1, address2;

  beforeEach(async function () {
    [owner, address1, address2] = await ethers.getSigner();

    const MockV3Aggregator = await ethers.getContractFactory('PriceFeedLib');
    const mockPriceFeed = await MockV3Aggregator.deploy(200000000000);
    await mockPriceFeed.deployed();

    const userContract = await ethers.getContractFactory('UserManagment');
    userManagmentDeployed = await userContract.deploy();
    await userManagmentDeployed.deployed();

    const rideContract = await ethers.getContractFactory('Ride Managment');
    rideManagmentDeployed = await rideContract.deploy(
      userManagmentDeployed.address,
      mockPriceFeed.address,
    );
    await rideManagmentDeployed.deployed();
  });

  it('should convert amounts correctly using the price feed', async function () {
    const amount = ethers.utils.parseEther('1');
    const expectedConversion = amount
      .mul(200000000000)
      .div(ethers.utils.parseEther('1'));

    const convertedAmount = await rideManagment.convert(amount);
    expect(convertedAmount).to.equal(expectedConversion);
  });
});
