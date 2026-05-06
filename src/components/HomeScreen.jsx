import React, { useState, useEffect } from 'react'
import './HomeScreen.css'

const CURRENCIES = {
  USD: { name: 'US Dollar', flag: '🇺🇸', country: 'United States' },
  EUR: { name: 'Euro', flag: '🇪🇺', country: 'Europe' },
  GBP: { name: 'British Pound', flag: '🇬🇧', country: 'United Kingdom' },
  INR: { name: 'Indian Rupee', flag: '🇮🇳', country: 'India' },
  JPY: { name: 'Japanese Yen', flag: '🇯🇵', country: 'Japan' },
  AUD: { name: 'Australian Dollar', flag: '🇦🇺', country: 'Australia' },
  CAD: { name: 'Canadian Dollar', flag: '🇨🇦', country: 'Canada' },
  CHF: { name: 'Swiss Franc', flag: '🇨🇭', country: 'Switzerland' },
  CNY: { name: 'Chinese Yuan', flag: '🇨🇳', country: 'China' },
  MXN: { name: 'Mexican Peso', flag: '🇲🇽', country: 'Mexico' },
  SGD: { name: 'Singapore Dollar', flag: '🇸🇬', country: 'Singapore' },
  HKD: { name: 'Hong Kong Dollar', flag: '🇭🇰', country: 'Hong Kong' },
}

// Mock exchange rates (in production, fetch from API)
const EXCHANGE_RATES = {
  USD: {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83.12,
    JPY: 149.5,
    AUD: 1.53,
    CAD: 1.36,
    CHF: 0.88,
    CNY: 7.24,
    MXN: 17.05,
    SGD: 1.34,
    HKD: 7.81,
  },
}

// Fill in other rates by calculating from USD
for (let from of Object.keys(CURRENCIES)) {
  if (!EXCHANGE_RATES[from]) {
    EXCHANGE_RATES[from] = {}
    for (let to of Object.keys(CURRENCIES)) {
      EXCHANGE_RATES[from][to] = EXCHANGE_RATES.USD[to] / EXCHANGE_RATES.USD[from]
    }
  }
}

export default function HomeScreen() {
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('INR')
  const [fromAmount, setFromAmount] = useState('1000')
  const [toAmount, setToAmount] = useState('')
  const [recentConversions, setRecentConversions] = useState([
    { from: 'USD', to: 'INR', amount: '1000', result: '83120' },
    { from: 'USD', to: 'INR', amount: '400', result: '33248' },
    { from: 'USD', to: 'GBP', amount: '400', result: '316' },
    { from: 'INR', to: 'EUR', amount: '200000', result: '2399' },
    { from: 'CNY', to: 'INR', amount: '500', result: '5753' },
  ])
  const [showFavourite, setShowFavourite] = useState(false)

  // Perform conversion
  useEffect(() => {
    if (fromAmount && !isNaN(fromAmount)) {
      const rate = EXCHANGE_RATES[fromCurrency][toCurrency]
      const result = (parseFloat(fromAmount) * rate).toFixed(2)
      setToAmount(result)
    } else {
      setToAmount('')
    }
  }, [fromAmount, fromCurrency, toCurrency])

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  const handleAddToRecent = () => {
    if (fromAmount && toAmount) {
      const newConversion = {
        from: fromCurrency,
        to: toCurrency,
        amount: fromAmount,
        result: toAmount,
      }
      setRecentConversions([newConversion, ...recentConversions.slice(0, 4)])
    }
  }

  const handleFavouriteClick = () => {
    setShowFavourite(!showFavourite)
  }

  const rate = EXCHANGE_RATES[fromCurrency][toCurrency]
  const rateDisplay = (1 * rate).toFixed(2)

  return (
    <div className="home-container">
      {/* Header */}
      <div className="header">
        <div className="header-logo">
          <svg
            className="header-logo-svg"
            viewBox="0 0 40 40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="18" fill="none" stroke="#0066ff" strokeWidth="1.5" />
            <path
              d="M13 16L17 20L13 24M23 16L27 20L23 24"
              stroke="#0066ff"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="header-title">Convert</h1>
      </div>

      {/* Main Content */}
      <div className="converter-card">
        {/* From Currency */}
        <div className="currency-section">
          <select
            className="currency-select"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            {Object.entries(CURRENCIES).map(([code, data]) => (
              <option key={code} value={code}>
                {code} - {data.name}
              </option>
            ))}
          </select>
          <p className="currency-label">{CURRENCIES[fromCurrency].country}</p>
        </div>

        {/* Amount Input */}
        <div className="amount-section">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            className="amount-input"
          />
          <div className="currency-flag">
            <img
              src={`https://flagcdn.com/w40/${getCountryCode(fromCurrency)}.png`}
              alt={fromCurrency}
              className="flag-image"
              onError={(e) => (e.target.style.display = 'none')}
            />
            <button className="amount-adjust">
              <span>±</span>
            </button>
          </div>
        </div>

        {/* Swap Button */}
        <button className="swap-button" onClick={handleSwap}>
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 16V4m0 0L3 8m0 0l4 4m10-12v12m0 0l4-4m0 0l-4-4" />
          </svg>
        </button>

        {/* To Currency */}
        <div className="currency-section">
          <select
            className="currency-select"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            {Object.entries(CURRENCIES).map(([code, data]) => (
              <option key={code} value={code}>
                {code} - {data.name}
              </option>
            ))}
          </select>
          <p className="currency-label">{CURRENCIES[toCurrency].country}</p>
        </div>

        {/* Result Box */}
        <div className="result-box">
          <div className="result-content">
            <p className="result-label">
              {fromAmount || '0'} {fromCurrency} =
            </p>
            <p className="result-amount">{toAmount || '0.00'} {toCurrency}</p>
            <p className="result-rate">1 {fromCurrency} = {rateDisplay} {toCurrency} | Live</p>
          </div>
          <img
            src={`https://flagcdn.com/w40/${getCountryCode(toCurrency)}.png`}
            alt={toCurrency}
            className="result-flag"
            onError={(e) => (e.target.style.display = 'none')}
          />
        </div>
      </div>

      {/* Recent Conversions */}
      <div className="recent-section">
        <div className="recent-header">
          <h2 className="recent-title">RECENT CONVERSIONS</h2>
          <a href="#" className="multi-currency-link">
            Multi Currency
          </a>
        </div>

        <div className="conversions-list">
          {recentConversions.map((conv, idx) => (
            <div key={idx} className="conversion-item">
              <div className="conversion-left">
                <div className="currency-pair">
                  <span className="currency-code-left">{conv.from}</span>
                  <span className="currency-icon-left">
                    {CURRENCIES[conv.from].flag}
                  </span>
                </div>
                <span className="conversion-amount">{conv.amount}</span>
              </div>

              <div className="conversion-middle">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="arrow-icon"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              <div className="conversion-right">
                <div className="currency-pair">
                  <span className="currency-code-right">{conv.to}</span>
                  <span className="currency-icon-right">
                    {CURRENCIES[conv.to].flag}
                  </span>
                </div>
                <span className="conversion-result">{conv.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <button className="nav-button active">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M3 9.5L11 2l8 7.5V22H3V9.5z" />
          </svg>
          <span>Convert</span>
        </button>
        <button
          className="nav-button"
          onClick={handleFavouriteClick}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <span>Favourite</span>
        </button>
        <button className="nav-button">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5s-5 2.24-5 5v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6-2c1.66 0 3 1.34 3 3v2h-6V6c0-1.66 1.34-3 3-3zm0 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
          </svg>
          <span>Alerts</span>
        </button>
        <button className="nav-button">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <span>Profile</span>
        </button>
      </div>
    </div>
  )
}

function getCountryCode(currencyCode) {
  const map = {
    USD: 'us',
    EUR: 'eu',
    GBP: 'gb',
    INR: 'in',
    JPY: 'jp',
    AUD: 'au',
    CAD: 'ca',
    CHF: 'ch',
    CNY: 'cn',
    MXN: 'mx',
    SGD: 'sg',
    HKD: 'hk',
  }
  return map[currencyCode] || 'us'
}
