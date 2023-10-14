const { expect } = require('chai');
const { ethers } = require('hardhat');
// d/w ->lp token -> withdraw lp token ->     
describe('PanCakeSwap Contract', async () => {
  let masterChef;
  let cakeToken;
  let syrupBar;
  let lpToken1;
  let lpToken2;
  let factory;
  let masterColab;
  
beforeEach(async () => {
  signer = await ethers.getSigners();

  const CakeToken = await ethers.getContractFactory('CakeToken');
  cakeToken = await CakeToken.connect(signer[0]).deploy();
  // console.log("check")
  const SyrupBar = await ethers.getContractFactory('SyrupBar');
  syrupBar = await SyrupBar.connect(signer[0]).deploy(cakeToken.target);
  // console.log("check")
  const MasterChef = await ethers.getContractFactory('MasterChef');
  masterChef = await MasterChef.connect(signer[0]).deploy(cakeToken.target,syrupBar.target,signer[0].address,10000,1);
  // console.log("check")
  const Factory = await ethers.getContractFactory('Factory');
  factory = await Factory.connect(signer[0]).deploy(masterChef.target);
  // console.log("check")
  const MasterColab = await ethers.getContractFactory('masterColab');
  masterColab = await MasterColab.connect(signer[0]).deploy(factory.target);
  // console.log("check")
  const MockBEP20 = await ethers.getContractFactory('MockBEP20');
  lpToken1 = await MockBEP20.connect(signer[0]).deploy("LP Token 1","LP1",10000);
  // console.log("check")
  lpToken2 = await MockBEP20.connect(signer[0]).deploy("LP Token 2","LP2",10000);
  // console.log("check")
  await cakeToken.transferOwnership(masterChef.target);
  await syrupBar.transferOwnership(masterChef.target);
})
it('  ** Print Contract Address of MasterChef **  ', async () => {
  console.log(`Contract Address of MasterChef : ${masterChef.target}`);
  console.log(`Contract Address of CakeToken : ${cakeToken.target}`)
  console.log(`Contract Address of SyrupBar : ${syrupBar.target}`)
  console.log(`Contract Address of LPToken1 : ${lpToken1.target}`)
  console.log(`Contract Address of LPToken2 : ${lpToken2.target}`)
  console.log(`Contract Address of factory : ${factory.target}`)
  
  await factory.createChild();
  console.log(await factory.getData())
  await factory.createChild();
  await factory.createChild();
  await factory.createChild();
  await factory.createChild();
  await factory.createChild();
  console.log(await factory.getData())
  console.log( masterChef.target)
});

  it("add function : ",async()=>{
    console.log("inside add function \n")
    await masterColab.newFarm(10,lpToken1.target,true)
   
    await masterColab.newFarm(10,lpToken1.target,true)
    await factory.getData()
    console.log(await factory.getData())

 })
  it('should deposit LP tokens', async () => {
    // Deposit LP tokens
    await lpToken1.connect(signer[0]).approve(masterColab.target, 1000);
    await masterColab.newFarm(10, lpToken1.target, true);
    console.log("Master New",await factory.getData())
    // Check the deposit
    await masterColab.deposit(1, 500);
    const lpBalance = await lpToken1.balanceOf(masterColab.target);
    expect(lpBalance).to.equal(500);
  });

  // it('should withdraw LP tokens', async () => {
  //   // Deposit LP tokens
  //   await lpToken1.connect(signer[0]).approve(masterColab.target, 1000);
  //   await masterColab.newFarm(10, lpToken1.target, true);

  //   await masterColab.deposit(1, 500);

  //   // Withdraw LP tokens
  //   await masterColab.withdraw(1, 300);
  //   const lpBalance = await lpToken1.balanceOf(masterColab.target);
  //   expect(lpBalance).to.equal(200);
  // });

});