const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd&include_24hr_change=true&include_market_cap=true';

const coins = {
  bitcoin: { name: 'Bitcoin', symbol: 'BTC', icon: '₿', color: '#f7931a' },
  ethereum: { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', color: '#627eea' }
};

async function fetchPrices() {
  const grid = document.getElementById('priceGrid');
  const lastUpdated = document.getElementById('lastUpdated');
  const refreshBtn = document.getElementById('refreshBtn');
  
  // Show loading state
  grid.innerHTML = `
    <div class="card price-card skeleton"></div>
    <div class="card price-card skeleton"></div>
  `;
  refreshBtn.disabled = true;
  refreshBtn.textContent = '↻ Fetching...';

  try {
    const res = await fetch(COINGECKO_URL);
    if (!res.ok) throw new Error('API error');
    const data = await res.json();

    grid.innerHTML = Object.entries(coins).map(([id, coin]) => {
      const info = data[id];
      const price = info.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
      const rawChange = info.usd_24h_change ?? 0;
      const change = rawChange.toFixed(2);
      const isPositive = rawChange >= 0;
      const marketCap = (info.usd_market_cap / 1e9).toFixed(2);
      const changeClass = isPositive ? 'positive' : 'negative';
      const arrow = isPositive ? '▲' : '▼';

      return `
        <div class="card price-card">
          <div class="coin-header">
            <div class="coin-icon" style="color: ${coin.color}">
              ${coin.icon}
            </div>
            <div>
              <div class="coin-name">${coin.name}</div>
              <div class="coin-symbol">${coin.symbol}</div>
            </div>
          </div>
          <div class="coin-price">${price}</div>
          <div class="coin-change ${changeClass}">
            ${arrow} ${Math.abs(change)}% (24h)
          </div>
          <div class="coin-meta">
            Market Cap: $${marketCap}B
          </div>
        </div>
      `;
    }).join('');

    lastUpdated.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
  } catch (err) {
    grid.innerHTML = `
      <div class="error-box">
        ⚠️ Unable to fetch prices. CoinGecko API may be rate-limited.
        Try refreshing in 60 seconds.
      </div>
    `;
  } finally {
    refreshBtn.disabled = false;
    refreshBtn.textContent = '↻ Refresh';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('refreshBtn').addEventListener('click', fetchPrices);
  fetchPrices(); // initial load
});
