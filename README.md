
# How to run
 Just npm install to install the dependencies from package.json and follow the instruction on TheGraph docs to create a subgraph and deploy

# Disclaimer 
 This repo is not a complete work, if you ever use this fetcher you will need like 10 years to sync on polygon network. You can use that code to assemble a wider api tho.


# How it works

This Subgraph works by fetching transactions by GENESIS address 0x0000000000000000000000000000000000001010 
This address is involved by default in any deployment and emits a log upon construction via LogTransfer(indexed address,indexed address,indexed address,uint256,uint256,uint256,uint256,uint256);

Given these info the subgraph will just check if contract is IERC721 compatible and will create an entity to store the informations.

# Intrinsic problems using subgraph on hosted service or studio:

Even tho this method will work like a charm, the iussue arises with high frequency chains, as the syncing progress will just be outrunned by the amount of LogTransfers occurring in a single block and block frequency.

