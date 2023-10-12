const { expect } = require('chai');
const { ethers } = require('hardhat');
// d/w ->lp token -> withdraw lp token ->     
describe('PanCakeSwap Contract', async () => {
  let masterChef;
  let cakeToken;
  let syrupBar;
  let LPToken1;
  let LPToken2;
  let factory;
  
async function _deposit(){
  await masterChef.add(100,LPToken1.target,true);
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
  const SyrupBar = await ethers.getContractFactory('SyrupBar');
  syrupBar = await SyrupBar.connect(signer[0]).deploy(cakeToken.target);

  const MasterChef = await ethers.getContractFactory('MasterChef');
  masterChef = await MasterChef.connect(signer[0]).deploy(cakeToken.target,syrupBar.target,signer[0].address,10000,1);

  const Factory = await ethers.getContractFactory('Factory');
  factory = await Factory.connect(signer[0]).deploy(masterChef.target);

  const MockBEP20 = await ethers.getContractFactory('MockBEP20');
  LPToken1 = await MockBEP20.connect(signer[0]).deploy("LP Token 1","LP1",1000);

  LPToken2 = await MockBEP20.connect(signer[0]).deploy("LP Token 2","LP2",1000);
   
  await cakeToken.transferOwnership(masterChef.target);
  await syrupBar.transferOwnership(masterChef.target);
})
describe(' Starting Function', async () => {
it('  *** Print Contract Address of MasterChef ***  ', async () => {
  console.log(`Contract Address of MasterChef : ${masterChef.target}`);
  console.log(`Contract Address of CakeToken : ${cakeToken.target}`)
  console.log(`Contract Address of SyrupBar : ${syrupBar.target}`)
  console.log(`Contract Address of LPToken1 : ${LPToken1.target}`)
  console.log(`Contract Address of LPToken2 : ${LPToken2.target}`)
  console.log(`Contract Address of factory : ${factory.target}`)
  
  await factory.createChild();
  console.log(await factory.getData())
});
});
describe(' Factory Function', async () => {
  it('  *** createChild function Test ***  ', async () => {
    await factory.createChild();
    await factory.createChild();
    await factory.createChild();
    console.log("New MasterChef Address : ",await factory.getData())
    });
    it("add function : ",async()=>{
      console.log("inside add function")
      await factory.createChild();
      let temp = await factory.getData()
      console.log("MasterChef Address 1 ",temp[0])
  
      let temp1 = await masterChef.attach(temp[0])
      console.log("MasterChef Address 1 ",temp1.target)
  
      await temp1.add(100,LPToken1.target,true);
      console.log("Pool length ", await temp1.poolLength())
  
      await temp1.add(200,LPToken2.target,true);
      console.log("Pool length ", await temp1.poolLength())
  
      expect(await temp1.poolLength()).to.be.equal(2n)       
  })
  });
});