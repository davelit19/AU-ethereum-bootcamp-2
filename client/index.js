const axios = require('axios');
const niceList = require('../utils/niceList');
const MerkleTree = require('../utils/MerkleTree');
const prompt = require('prompt-sync')();

const serverUrl = 'http://localhost:1225';

const merkleTree = new MerkleTree(niceList);

let inputName  = prompt("Enter your name: ");
const inputIndex = niceList.indexOf(inputName)
   
 async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const proof = merkleTree.getProof(inputIndex)

  if(!proof[0]) {
    console.log(`Sorry, your name is not in the gift list`)
  }
    
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    proof: proof,
    inputName: inputName
  }); 

  console.log({ gift });
 
}

main();   