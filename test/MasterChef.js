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
  await masterChef.connect(signer[0]).add(100,lpToken1.target,true);
  await lpToken1.connect(signer[0]).approve(masterChef.target,1000);
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

  const MockBEP20 = await ethers.getContractFactory('MockBEP20');
  lpToken1 = await MockBEP20.connect(signer[0]).deploy("LP Token 1","LP1",1000);

  const MasterColab = await ethers.getContractFactory('masterColab');
  masterColab = await MasterColab.connect(signer[0]).deploy();

  const Factory = await ethers.getContractFactory('Factory');
  factory = await Factory.connect(signer[0]).deploy(masterColab.target,masterChef.target);


  lpToken2 = await MockBEP20.connect(signer[0]).deploy("LP Token 2","LP2",1000);

  await cakeToken.transferOwnership(masterChef.target);
  await syrupBar.transferOwnership(masterChef.target);
})
it('   Print Contract Address of MasterChef   ', async () => {
  console.log(`Contract Address of MasterChef : ${masterChef.target}`);
  console.log(`Contract Address of MasterChef : ${masterColab.target}`);
  console.log(`Contract Address of CakeToken : ${cakeToken.target}`)
  console.log(`Contract Address of SyrupBar : ${syrupBar.target}`)
  console.log(`Contract Address of LPToken1 : ${lpToken1.target}`)
  console.log(`Contract Address of LPToken2 : ${lpToken2.target}`)
  console.log(`Contract Address of factory : ${factory.target}`)
  
  await factory.createChild();
  console.log(await factory.getData())

  await factory.createChild();
  console.log(await factory.getData())
  console.log( masterChef.target)
});
it.only("test",async()=>{
  await factory.createChild();
  let master = await masterColab.attach(await factory.getData());

  await master.get();
  await master.newFarm(100,lpToken1.target,true);
  console.log(await masterChef.poolLength())

  console.log(await masterChef.target)
  console.log(await master.master())

  console.log("master",await master.target)


  await lpToken1.connect(signer[0]).approve(master.target,300);
  console.log(await cakeToken.balanceOf(master.target));
  console.log(await lpToken1.connect(signer[0]).balanceOf(master.target));
  console.log(await lpToken1.connect(signer[0]).balanceOf(signer[0].address));
 await master.depositit(1,10,lpToken1.target);
 console.log("Cake Master ",await cakeToken.balanceOf(master.target));
 await master.withdraw(1,10,lpToken1.target);
 console.log("cakeToken.balanceOf ",await cakeToken.balanceOf(master.target));

})

});