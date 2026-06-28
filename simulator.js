// SHA-256 using Web Crypto API
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Mine a block: increment nonce until hash starts with "00"
async function mineBlock(blockNum) {
  const dataInput = document.getElementById(`data${blockNum}`);
  const prevHashInput = document.getElementById(`prevHash${blockNum}`);
  const nonceInput = document.getElementById(`nonce${blockNum}`);
  const hashDisplay = document.getElementById(`hash${blockNum}`);
  const statusEl = document.getElementById(`status${blockNum}`);
  const mineBtn = document.getElementById(`mineBtn${blockNum}`);

  mineBtn.disabled = true;
  mineBtn.textContent = '⛏ Mining...';
  statusEl.textContent = '⬤ Mining...';
  statusEl.className = 'block-status mining';

  let nonce = 0;
  let hash = '';
  const data = dataInput.value;
  const prevHash = prevHashInput.value;

  // Limit iterations to prevent UI freeze (max 1,000,000)
  while (nonce < 1000000) {
    hash = await sha256(`${data}${prevHash}${nonce}`);
    nonceInput.value = nonce;
    hashDisplay.value = hash;
    
    if (hash.startsWith('00')) {
      break;
    }
    nonce++;
    // Small delay every 500 iterations to keep UI responsive
    if (nonce % 500 === 0) await new Promise(r => setTimeout(r, 0));
  }

  const isValid = hash.startsWith('00');
  statusEl.textContent = isValid ? '✅ Valid' : '❌ Max attempts reached';
  statusEl.className = `block-status ${isValid ? 'valid' : 'invalid'}`;
  mineBtn.disabled = false;
  mineBtn.textContent = `⛏ Mine Block ${blockNum}`;

  // If Block 1 mined, update Block 2's prevHash and invalidate it
  if (blockNum === 1 && isValid) {
    document.getElementById('prevHash2').value = hash;
    document.getElementById('hash2').value = '';
    document.getElementById('nonce2').value = '0';
    document.getElementById('status2').textContent = '⚠️ Needs Re-mining';
    document.getElementById('status2').className = 'block-status invalid';
    document.getElementById('block1').classList.add('valid-block');
    document.getElementById('block2').classList.remove('valid-block');
    document.getElementById('mineBtn2').disabled = false;
  }

  if (blockNum === 2 && isValid) {
    document.getElementById('block2').classList.add('valid-block');
  }

  return hash;
}

document.addEventListener('DOMContentLoaded', () => {
  // When Block 1's data changes, invalidate Block 2
  document.getElementById('data1').addEventListener('input', () => {
    document.getElementById('hash2').value = '';
    document.getElementById('nonce2').value = '0';
    document.getElementById('status2').textContent = '⚠️ Block 1 changed — Invalid';
    document.getElementById('status2').className = 'block-status invalid';
    document.getElementById('block2').classList.remove('valid-block');
    // Also reset block 1 status
    document.getElementById('status1').textContent = '⬤ Unmined';
    document.getElementById('status1').className = 'block-status';
    document.getElementById('hash1').value = '';
    document.getElementById('nonce1').value = '0';
    document.getElementById('block1').classList.remove('valid-block');
  });

  document.getElementById('data2').addEventListener('input', () => {
    document.getElementById('status2').textContent = '⬤ Unmined';
    document.getElementById('status2').className = 'block-status';
    document.getElementById('hash2').value = '';
    document.getElementById('nonce2').value = '0';
    document.getElementById('block2').classList.remove('valid-block');
  });

  document.getElementById('mineBtn1').addEventListener('click', () => mineBlock(1));
  document.getElementById('mineBtn2').addEventListener('click', () => mineBlock(2));
});
