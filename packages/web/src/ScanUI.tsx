import React, { useState } from 'react';
import { scanMnemonic } from 'core';
import { ethers } from 'ethers';

export default function ScanUI() {
  const [mnemonic, setMnemonic] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(100);
  const [concurrency, setConcurrency] = useState(20);
  const [results, setResults] = useState<any[]>([]);
  const [running, setRunning] = useState(false);

  async function onScan() {
    setRunning(true);
    const provider = ethers.getDefaultProvider('mainnet');
    const res = await scanMnemonic(mnemonic, provider, { paths: ["m/44'/60'/0'/0", "m/44'/60'/0'"], startIndex: start, endIndex: end, concurrency });
    setResults(res);
    setRunning(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Scan</h2>
      <div>
        <label>Mnemonic</label>
        <textarea value={mnemonic} onChange={e => setMnemonic(e.target.value)} rows={3} cols={80} />
      </div>
      <div>
        <label>Start</label>
        <input type="number" value={start} onChange={e => setStart(Number(e.target.value))} />
        <label>End</label>
        <input type="number" value={end} onChange={e => setEnd(Number(e.target.value))} />
        <label>Concurrency</label>
        <input type="number" value={concurrency} onChange={e => setConcurrency(Number(e.target.value))} />
      </div>
      <div>
        <button onClick={onScan} disabled={running}>Start Scan</button>
      </div>
      <div>
        <h3>Results ({results.length})</h3>
        <ul>
          {results.map(r => <li key={`${r.path}-${r.index}`}>{r.path}/{r.index} — {r.address} — {r.balance}</li>)}
        </ul>
      </div>
    </div>
  );
}
