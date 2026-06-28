const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd&include_24hr_change=true&include_market_cap=true';

const coins = {
  bitcoin: { name: 'Bitcoin', symbol: 'BTC', icon: '<svg class="svg-crypto-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#F7931A"/><path d="M22.5 13.9c.2-1.3-.8-2-2.1-2.4l.4-1.7-1.3-.3-.4 1.7c-.3-.1-.7-.2-1-.2l.4-1.7-1.3-.3-.4 1.7c-.3-.1-.6-.1-1-.2l-2.2-.5-.4 1.7s1.2.3 1.2.3c.7.2.8.6.8 1l-.8 3.3c0 .1.1.2.2.2-.1-.1-.1-.1-.2-.2l-1.1 4.5c-.1.3-.3.4-.7.3 0 0-1.2-.3-1.2-.3l-.8 1.9 2.1.5c.3.1.7.2 1 .2l-.4 1.8 1.3.3.4-1.8c.4.1.7.2 1 .3l-.4 1.8 1.3.3.4-1.7c1.8.4 3.1.2 3.6-1.4.4-1.3-.1-2-1-2.4.7-.2 1.2-.6 1.4-1.5zM17.4 20c-.5 2-3.8 1-4.9.7l.9-3.5c1.1.3 4.5.7 4 2.8zm.4-5c-.4 1.8-3 .9-3.8.7l.8-3.2c.8.2 3.4.6 3 2.5z" fill="#FFF"/></svg>', color: '#f7931a' },
  ethereum: { name: 'Ethereum', symbol: 'ETH', icon: '<svg class="svg-crypto-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="16" fill="#627EEA"/><path d="M16 4L9 15.6L16 19.7L23 15.6L16 4Z" fill="#FFF" fill-opacity="0.8"/><path d="M16 19.7L9 15.6L16 27L23 15.6L16 19.7Z" fill="#FFF" fill-opacity="0.4"/></svg>', color: '#627eea' }
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

    grid.style.transition = 'opacity 0.4s ease';
    grid.style.opacity = 0;
    setTimeout(() => {
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
      grid.style.opacity = 1;
    }, 400);

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
