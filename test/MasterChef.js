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
  
async function _deposit(){
  await masterChef.connect(signer[0]).add(100,LPToken1.target,true);
  await LPToken1.connect(signer[0]).approve(masterChef.target,1000);
  await masterChef.connect(signer[0]).deposit(1,500);
}
async function _beforeStaking(){
  await _deposit();
  await masterChef.connect(signer[0]).withdraw(1,500);
}
beforeEach(async () => {
  signer = await ethers.getSigners();

  const CakeToken = await ethers.getContractFactory('CakeToken');
  cakeToken = await CakeToken.connect(signer[0]).deploy();
  console.log("check")
  const SyrupBar = await ethers.getContractFactory('SyrupBar');
  syrupBar = await SyrupBar.connect(signer[0]).deploy(cakeToken.target);
  console.log("check")
  const MasterChef = await ethers.getContractFactory('MasterChef');
  masterChef = await MasterChef.connect(signer[0]).deploy(cakeToken.target,syrupBar.target,signer[0].address,10000,1);
  console.log("check")
  const Factory = await ethers.getContractFactory('Factory');
  factory = await Factory.connect(signer[0]).deploy(masterChef.target);
  console.log("check")
  const MasterColab = await ethers.getContractFactory('masterColab');
  masterColab = await MasterColab.connect(signer[0]).deploy();
  console.log("check")
  const MockBEP20 = await ethers.getContractFactory('MockBEP20');
  lpToken1 = await MockBEP20.connect(signer[0]).deploy("LP Token 1","LP1",1000);
  console.log("check")
  lpToken2 = await MockBEP20.connect(signer[0]).deploy("LP Token 2","LP2",1000);
  console.log("check")
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
    console.log("inside add function")
    await factory.createChild();
    console.log(await factory.getData())
  //   await factory.connect(signer[0]).createChild();
  //  let temp = await factory.connect(signer[0]).getData()
  //   console.log(temp[0])

  //   let temp1 = await masterChef.connect(signer[0]).attach(temp[0])
  //   console.log(temp1.target)
    // await masterChef.connect(signer[0]).add(100,lpToken1.target,true);
    // console.log("pool length ", await temp1.poolLength())

    // await temp1.connect(signer[0]).add(100,lpToken1.target,true);
    // console.log("pool length ", await temp1.poolLength())

    // await temp1.connect(signer[0]).add(200,lpToken2.target,true);
    // console.log("pool length ", await temp1.poolLength())

    // expect(await temp1.poolLength()).to.be.equal(2n) 

    await masterColab.newFarm(10,lpToken1.target,true)
})

});