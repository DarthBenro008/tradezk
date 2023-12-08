const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Tradezk", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function accounts() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Lock = await ethers.getContractFactory("Tradezk");
    const lock = await Lock.deploy();

    return { lock, owner, otherAccount };
  }

  describe("Orders", function () {
    it("Should be able to create order", async function () {
      const { lock, owner, otherAccount } = await loadFixture(accounts);

      await expect(await lock.createOrder(1, "lol@paytm", 87)).to.emit(
        lock,
        "OrderCreated"
      );
    });

    it("Should be able to edit order", async function () {
      const { lock, owner, otherAccount } = await loadFixture(accounts);
      await expect(await lock.createOrder(100, "lol@paytm", 87)).to.emit(
        lock,
        "OrderCreated"
      );
      await expect(await lock.updateOrderRate(1, 85))
        .to.emit(lock, "OrderUpdated")
        .withArgs(1, 85);
    });


  });
});
