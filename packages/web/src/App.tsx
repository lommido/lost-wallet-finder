import React, { useState } from 'react';
import { generateMnemonic, deriveAddresses, encryptKeystore } from 'core';
import { ethers } from 'ethers';

export default function App() {
  const [mnemonic, setMnemonic] = useState('');
  const [derived, setDerived] = useState<any[]>([]);

  async function onGenerate() {
    const m = await generateMnemonic();
    setMnemonic(m);
  }

  async function onDerive() {
    if (!mnemonic) return;
    const list = deriveAddresses(mnemonic, "m/44'/60'/0'/0", 0, 10);
    setDerived(list);
  }

  async function onEncrypt() {
    if (!derived.length) return;
    const pk = derived[0].privateKey;
    const json = await encryptKeystore(pk, 'password');
    alert('Keystore JSON length: ' + json.length);
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Lost Wallet Finder - Demo</h1>
      <button onClick={onGenerate}>Generate Mnemonic</button>
      <div>
        <textarea value={mnemonic} onChange={(e) => setMnemonic(e.target.value)} rows={3} cols={60} />
      </div>
      <button onClick={onDerive}>Derive 10 addresses</button>
      <ul>
        {derived.map(d => (
          <li key={d.index}>{d.index}: {d.address}</li>
        ))}
      </ul>
      <button onClick={onEncrypt}>Encrypt first derived key with password 'password'</button>
    </div>
  )
}
