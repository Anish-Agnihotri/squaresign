<center><img src="https://i.imgur.com/FPloLit.png" width="250"/>

| Hosted Demo | Milestone Description |
|-------------|-----------------------|
| <p align="center">[Press Me](https://squaresign.anishagnihotri.now.sh/)</p> | <p align="center">[Devpost](https://devpost.com/software/squaresign)</p>| 
</center>

SquareSign was a project built at [ETHBoston @Harvard University](https://devpost.com/software/squaresign) solo, in 36-hours. In general, it's a rough waiver-signing/notarization platform that builds upon my past experiences (working with the OpenSign Ethereum smart contract libraries).

SquareSign is written completely in React, with no back-end services, or even, state management. Choosing to have some fun—not using Redux—the project uses a header master-component hiearchy.

Squarelink was used for web3 support + connecting to the Ethereum blockchain because: (1) they were the awesome sponsors, and (2) I wanted the application to be as simple as possible to use for non-blockchain-folk. Thus, you can just pop in and email/password and let SquareSign handle the rest.

<p align="center">
<img src="https://i.imgur.com/iZu3Glo.png" />
<p align="center" style="font-size: 12px">Landing page</p>

<img src="https://i.imgur.com/RODAq6g.png" />
<p align="center" style="font-size: 12px">Document upload flow</p>
</p>

## Running SquareSign
If you want to spin up SquareSign, it's as simple as can be.

1. Run `git clone https://github.com/anish-agnihotri/squaresign.git`
2. Change directory via `cd squaresign/`
3. Run `yarn`
4. Run `yarn build`
5. Run `yarn start`

## Architecture
Squaresign relies heavily on [React](https://github.com/facebook/react), [IPFS](https://github.com/ipfs/js-ipfs-http-client), and my favourite modal plugin [React-Responsive-Modal](https://www.npmjs.com/package/react-responsive-modal). Once documents are uploaded, they are hashed and stored directly upon IPFS (and hashed via the smart contract so that signatories can be tracked).

### Contract architecture:
```solidity
pragma solidity ^0.4.17;

contract Squaresign{
    struct Document {
        uint timestamp;
        bytes ipfs_hash;
        address[] signatures;
    }
    mapping(address => bytes[]) public users; //maps addresses to agreement id
    mapping(bytes32 => Document) public documents; //maps keccak256(agreement_id) hashes to documents

    function addDocument(bytes id, bytes ipfs) public {
        users[msg.sender].push(ipfs); //Add document to users's "signed" list
        address[] memory sender = new address[](1);
        sender[0] = msg.sender;
        documents[keccak256(id)] = Document(block.timestamp, ipfs, sender);
    }

    function signDocument(bytes id) public {
        users[msg.sender].push(id);
        documents[keccak256(id)].signatures.push(msg.sender);
    }
    
    function getSignatures(bytes id) public view returns (address[]) {
        return documents[keccak256(id)].signatures;
    }
}
```

## License
Squaresign is licensed under [the MIT license](https://github.com/anish-agnihotri/squaresign/blob/master/LICENSE.md).
