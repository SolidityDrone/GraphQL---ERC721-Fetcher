import { BigInt, log, Bytes } from "@graphprotocol/graph-ts";
import { LogTransfer} from "../generated/Contract/Address1010";
import { ERC721 } from "../generated/Contract/ERC721";
import { Collection, Address } from "../generated/schema";



export function handleLogTransfer(event: LogTransfer): void {
  // Get the collection that emitted the event
  let collection = new Collection(event.transaction.hash.toHexString());
  
  if (event.transaction.to){
    let addressId = event.transaction.to!.toHexString();
    var address = Address.load(addressId);
    if (address){
      return;
    }
    let erc721 = ERC721.bind(event.transaction.to!);
    if (!erc721.try_supportsInterface(Bytes.fromHexString("0x80ac58cd")).reverted ){
      collection.address = event.transaction.to!.toHexString();
      address = new Address(addressId);
      if (!erc721.try_name().reverted){
        collection.name = erc721.try_name().value;
        collection.save();
        address.save();
      }
      if (!erc721.try_symbol().reverted){
        collection.symbol = erc721.try_symbol().value;
        collection.save();
        address.save();
      }
      
      
    } 
    
  }
}

/*V1
import { BigInt, log, Bytes } from "@graphprotocol/graph-ts";
import { LogTransfer} from "../generated/Contract/Address1010";
import { ERC721 } from "../generated/Contract/ERC721";
import { Collection, Address } from "../generated/schema";



export function handleLogTransfer(event: LogTransfer): void {
  // Get the collection that emitted the event
  let collection = new Collection(event.transaction.hash.toHexString());
  
  if (event.transaction.to){
    let addressId = event.transaction.to!.toHexString();
    let address = Address.load(addressId);
    if (address){
      return;
    }
    let erc721 = ERC721.bind(event.transaction.to!);
    if (!erc721.try_supportsInterface(Bytes.fromHexString("0x80ac58cd")).reverted){
      collection.address = event.transaction.to!.toHexString();
      if (!erc721.try_name().reverted){
        collection.name = erc721.try_name().value;
        collection.symbol = erc721.try_symbol().value;
        collection.save();
        address = new Address(addressId);
        address.save();
      }
    } 
  }
}
*/