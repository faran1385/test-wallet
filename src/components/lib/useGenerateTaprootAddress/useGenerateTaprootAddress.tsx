// import * as ecc from 'tiny-secp256k1';
// import { BIP32Factory } from 'bip32';
// import * as bip39 from 'bip39';
// import * as bitcoin from 'bitcoinjs-lib';

// const bip32 = BIP32Factory(ecc);

// export const useGenerateTaprootAddress = () => {
//   const path = "m/86'/0'/0'/0/0"; // Path to first child of receiving wallet on first account

//   const mnemonic = `glide refuse program laugh snack angle ready swear foot script fitness praise`;
//   const seed = bip39.mnemonicToSeedSync(mnemonic);
//   const rootKey = bip32.fromSeed(seed);

//   const childNode = rootKey.derivePath(path);
//   const node = childNode.derive(0).derive(0);

//   const toXOnly = (pubKey: any) =>
//     pubKey.length === 32 ? pubKey : pubKey.slice(1, 33);

//   const childNodeXOnlyPubkey = toXOnly(childNode.publicKey);

//   const internalPubkey = childNodeXOnlyPubkey;

//   const { address } = bitcoin.payments.p2tr({
//     internalPubkey,
//   });

//   console.log(`
// Wallet generated:
// - Taproot Address: ${address},
// - Key: ${node.toWIF()}, 
// - Mnemonic: ${mnemonic}    
// `);
// };
import{ useState } from "react"; 
import * as bitcoin from "bitcoinjs-lib"; 
import * as bip39 from "bip39"; 
import { BIP32Factory } from "bip32"; 
import * as ecc from 'tiny-secp256k1';
 
const bip32 = BIP32Factory(ecc); 
bitcoin.initEccLib(ecc);

const BitcoinAddressGenerator = () => { 
  const [mnemonic, setMnemonic] = useState("glide refuse program laugh snack angle ready swear foot script fitness praise"); 
  const [legacyAddress, setLegacyAddress] = useState(""); 
  const [segwitAddress, setSegwitAddress] = useState(""); 
  const [taprootAddress, setTaprootAddress] = useState(""); 
 
  const generateAddresses = async () => { 
    try { 
      const seed = await bip39.mnemonicToSeed(mnemonic); 
      const root = bip32.fromSeed(seed); 
 
      // Legacy (BIP44) - m/44'/0'/0'/0/0 
      const legacyPath = "m/44'/0'/0'/0/0"; 
      const legacyChild = root.derivePath(legacyPath); 
      const legacy :any= bitcoin.payments.p2pkh({ 
        pubkey: legacyChild.publicKey, 
        network: bitcoin.networks.bitcoin, 
      }); 
      setLegacyAddress(legacy.address); 
 
      // SegWit (BIP84) - m/84'/0'/0'/0/0 
      const segwitPath = "m/84'/0'/0'/0/0"; 
      const segwitChild = root.derivePath(segwitPath); 
      const segwit:any = bitcoin.payments.p2wpkh({ 
        pubkey: segwitChild.publicKey, 
        network: bitcoin.networks.bitcoin, 
      }); 
      setSegwitAddress(segwit.address); 
 
      // Taproot (BIP86) - m/86'/0'/0'/0/0 
      const taprootPath = "m/86'/0'/0'/0/0"; 
      const taprootChild = root.derivePath(taprootPath); 
      const taproot:any = bitcoin.payments.p2tr({ 
        internalPubkey: taprootChild.publicKey.slice(1, 33), 
        network: bitcoin.networks.bitcoin, 
      }); 
      setTaprootAddress(taproot.address); 
    } catch (error) { 
      console.error("Error generating addresses:", error); 
    } 
  }; 
 
  return ( 
    <div> 
      <h2>Bitcoin Address Generator</h2> 
      <div> 
        <label>Mnemonic Phrase:</label> 
        <input 
          type="text" 
          value={mnemonic} 
          onChange={(e) => setMnemonic(e.target.value)} 
          placeholder="Enter 12 or 24 word mnemonic" 
        /> 
      </div> 
      <button onClick={generateAddresses}>Generate Addresses</button> 
      <div> 
        <p>Legacy Address: {legacyAddress}</p> 
        <p>SegWit Address: {segwitAddress}</p> 
        <p>Taproot Address: {taprootAddress}</p> 
      </div> 
    </div> 
  ); 
}; 
 
export default BitcoinAddressGenerator;