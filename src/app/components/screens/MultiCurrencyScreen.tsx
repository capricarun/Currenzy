import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';

const FLAG_MAP: Record<string, string> = {
  AED:'ae', AFN:'af', ALL:'al', AMD:'am', ANG:'cw', AOA:'ao', ARS:'ar', AUD:'au',
  AWG:'aw', AZN:'az', BAM:'ba', BBD:'bb', BDT:'bd', BGN:'bg', BHD:'bh', BIF:'bi',
  BMD:'bm', BND:'bn', BOB:'bo', BRL:'br', BSD:'bs', BTN:'bt', BWP:'bw', BYN:'by',
  BZD:'bz', CAD:'ca', CDF:'cd', CHF:'ch', CLP:'cl', CNY:'cn', COP:'co', CRC:'cr',
  CUP:'cu', CVE:'cv', CZK:'cz', DJF:'dj', DKK:'dk', DOP:'do', DZD:'dz', EGP:'eg',
  ERN:'er', ETB:'et', EUR:'eu', FJD:'fj', FKP:'fk', GBP:'gb', GEL:'ge', GHS:'gh',
  GIP:'gi', GMD:'gm', GNF:'gn', GTQ:'gt', GYD:'gy', HKD:'hk', HNL:'hn', HRK:'hr',
  HTG:'ht', HUF:'hu', IDR:'id', ILS:'il', INR:'in', IQD:'iq', IRR:'ir', ISK:'is',
  JMD:'jm', JOD:'jo', JPY:'jp', KES:'ke', KGS:'kg', KHR:'kh', KMF:'km', KPW:'kp',
  KRW:'kr', KWD:'kw', KYD:'ky', KZT:'kz', LAK:'la', LBP:'lb', LKR:'lk', LRD:'lr',
  LSL:'ls', LYD:'ly', MAD:'ma', MDL:'md', MGA:'mg', MKD:'mk', MMK:'mm', MNT:'mn',
  MOP:'mo', MRU:'mr', MUR:'mu', MVR:'mv', MWK:'mw', MXN:'mx', MYR:'my', MZN:'mz',
  NAD:'na', NGN:'ng', NIO:'ni', NOK:'no', NPR:'np', NZD:'nz', OMR:'om', PAB:'pa',
  PEN:'pe', PGK:'pg', PHP:'ph', PKR:'pk', PLN:'pl', PYG:'py', QAR:'qa', RON:'ro',
  RSD:'rs', RUB:'ru', RWF:'rw', SAR:'sa', SBD:'sb', SCR:'sc', SDG:'sd', SEK:'se',
  SGD:'sg', SHP:'sh', SLL:'sl', SOS:'so', SRD:'sr', SSP:'ss', STN:'st', SYP:'sy',
  SZL:'sz', THB:'th', TJS:'tj', TMT:'tm', TND:'tn', TOP:'to', TRY:'tr', TTD:'tt',
  TWD:'tw', TZS:'tz', UAH:'ua', UGX:'ug', USD:'us', UYU:'uy', UZS:'uz', VES:'ve',
  VND:'vn', VUV:'vu', WST:'ws', XAF:'cm', XCD:'ag', XOF:'sn', XPF:'pf', YER:'ye',
  ZAR:'za', ZMW:'zm', ZWL:'zw',
};

const flagSrc = (code: string) =>
  `https://flagcdn.com/h20/${FLAG_MAP[code] || 'us'}.png`;

const mockChange = (code: string): string => {
  const seed = code.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const magnitude = ((seed % 200) / 100).toFixed(2);
  const sign = seed % 3 === 0 ? '-' : '+';
  return `${sign}${magnitude}%`;
};

export const MultiCurrencyScreen = () => {
  const navigate = useNavigate();
  const { currencies } = useApp();

  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [amount, setAmount] = useState('1,000.00');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sheetSearch, setSheetSearch] = useState('');
  const [listSearch, setListSearch] = useState('');
  const [rates, setRates] = useState<Record<string, number>>({});
  const [rateLoading, setRateLoading] = useState(false);
  const sheetSearchRef = useRef<HTMLInputElement>(null);

  const fetchRates = useCallback((base: string) => {
    setRateLoading(true);
    fetch(`https://open.er-api.com/v6/latest/${base}`)
      .then(r => r.json())
      .then(data => { if (data?.rates) setRates(data.rates); })
      .catch(() => {})
      .finally(() => setRateLoading(false));
  }, []);

  useEffect(() => { fetchRates(baseCurrency); }, [baseCurrency]);

  // Auto-focus sheet search when it opens
  useEffect(() => {
    if (dropdownOpen) {
      setTimeout(() => sheetSearchRef.current?.focus(), 300);
    } else {
      setSheetSearch('');
    }
  }, [dropdownOpen]);

  const numericAmount = parseFloat(amount.replace(/,/g, '')) || 0;

  const convertedValue = (code: string) => {
    const rate = rates[code];
    if (!rate) return '—';
    return (numericAmount * rate).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const isPositive = (change: string) => change.startsWith('+');

  const sheetCurrencies = currencies.filter(
    c => sheetSearch === '' ||
      c.code.toLowerCase().includes(sheetSearch.toLowerCase()) ||
      c.name.toLowerCase().includes(sheetSearch.toLowerCase()) ||
      c.country.toLowerCase().includes(sheetSearch.toLowerCase())
  );

  const targetList = currencies.filter(
    c => c.code !== baseCurrency &&
      (listSearch === '' ||
        c.code.toLowerCase().includes(listSearch.toLowerCase()) ||
        c.name.toLowerCase().includes(listSearch.toLowerCase()) ||
        c.country.toLowerCase().includes(listSearch.toLowerCase()))
  );

  return (
    <div className="bg-[#fafafa] flex flex-col h-full overflow-hidden">

      {/* ── Header ── */}
      <div className="bg-white flex h-[68px] items-center px-[16px] py-[8px] shrink-0 border-b border-[#e4e4e7] gap-[8px]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center size-[32px] rounded-full hover:bg-[#f4f4f5] transition-colors shrink-0"
        >
          <span className="font-['Material_Icons',sans-serif] text-[24px] text-[#09090b]">
            arrow_back
          </span>
        </button>
        <div className="flex-1 flex justify-center pr-[32px]">
          <p className="font-['Avenir_Next',sans-serif] leading-[32px] text-[#18181b] text-[24px] tracking-[-0.24px] whitespace-nowrap">
            Multi Currency
          </p>
        </div>
      </div>

      {/* ── Controls ── */}
      <div className="shrink-0 flex flex-col gap-[8px] p-[16px] pb-0">

        {/* Base currency selector — tapping opens bottom sheet */}
        <div
          onClick={() => setDropdownOpen(true)}
          className="bg-white border border-[#e4e4e7] rounded-[8px] px-[16px] py-[8px] flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.06)]"
        >
          <div className="flex items-center gap-[10px] flex-1">
            <div className="flex flex-col gap-[2px]">
              <p className="font-['Avenir_Next',sans-serif] leading-[22px] text-[#09090b] text-[16px]">
                {baseCurrency} - {currencies.find(c => c.code === baseCurrency)?.name}
              </p>
              <p className="font-['Avenir_Next',sans-serif] leading-[18px] text-[#71717a] text-[12px]">
                {currencies.find(c => c.code === baseCurrency)?.country}
              </p>
            </div>
          </div>
          <span className="font-['Material_Icons_Outlined',sans-serif] text-[24px] text-[#09090b]">
            keyboard_arrow_down
          </span>
        </div>

        {/* Amount input */}
        <div className="bg-white border border-[#e4e4e7] rounded-[8px] px-[16px] py-[8px] shadow-[0px_1px_2px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-[8px]">
            <input
              type="text"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="flex-1 min-w-0 font-['Avenir_Next',sans-serif] leading-[30px] text-[#09090b] text-[20px] outline-none bg-transparent"
            />
            <img src={flagSrc(baseCurrency)} alt={baseCurrency} className="h-[20px] w-auto rounded-[2px] shrink-0" />
            <div className="flex flex-col shrink-0">
              <button
                onClick={() => {
                  const num = parseFloat(amount.replace(/,/g, '')) || 0;
                  setAmount((num + 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                }}
                className="flex items-center justify-center w-[22px] h-[15px] hover:bg-gray-100 rounded text-[#09090b]"
              >
                <span className="font-['Material_Icons_Outlined',sans-serif] text-[16px] leading-none">keyboard_arrow_up</span>
              </button>
              <button
                onClick={() => {
                  const num = parseFloat(amount.replace(/,/g, '')) || 0;
                  setAmount(Math.max(0, num - 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
                }}
                className="flex items-center justify-center w-[22px] h-[15px] hover:bg-gray-100 rounded text-[#09090b]"
              >
                <span className="font-['Material_Icons_Outlined',sans-serif] text-[16px] leading-none">keyboard_arrow_down</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Currency list ── */}
      <div className="flex-1 flex flex-col overflow-hidden p-[16px] pt-[12px]">
        <div className="flex-1 flex flex-col overflow-hidden bg-white rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]">

          {/* Search bar */}
          <div className="shrink-0 p-[8px] border-b border-[#e4e4e7]">
            <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-[6px] flex items-center gap-[4px] px-[8px] py-[4px]">
              <span className="font-['Material_Icons',sans-serif] text-[18px] text-[#71717a]">search</span>
              <input
                type="text"
                value={listSearch}
                onChange={e => setListSearch(e.target.value)}
                placeholder="Search currency"
                className="flex-1 min-w-0 font-['Avenir_Next',sans-serif] text-[14px] text-[#09090b] placeholder-[#71717a] outline-none bg-transparent"
              />
              {listSearch !== '' && (
                <button onClick={() => setListSearch('')} className="text-[#71717a] hover:text-[#09090b]">
                  <span className="font-['Material_Icons',sans-serif] text-[18px]">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Rows */}
          <div className="flex-1 overflow-y-auto">
            {rateLoading ? (
              <div className="flex items-center justify-center h-full">
                <span className="font-['Avenir_Next',sans-serif] text-[14px] text-[#71717a]">Loading rates…</span>
              </div>
            ) : targetList.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <span className="font-['Avenir_Next',sans-serif] text-[14px] text-[#71717a]">No currencies found</span>
              </div>
            ) : (
              targetList.map(c => {
                const change = mockChange(c.code);
                const positive = isPositive(change);
                return (
                  <div
                    key={c.code}
                    className="flex items-center justify-between px-[12px] py-[12px] border-b border-[#e4e4e7] last:border-b-0 hover:bg-[#f4f4f5] transition-colors cursor-pointer"
                    onClick={() => navigate(`/rates/${baseCurrency}/${c.code}`)}
                  >
                    <div className="flex items-center gap-[10px] min-w-0 flex-1">
                      <div className="shrink-0 size-[36px] overflow-hidden rounded-[3px] bg-[#f4f4f5] flex items-center justify-center">
                        <img src={flagSrc(c.code)} alt={c.code} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-[1px] min-w-0">
                        <p className="font-['Avenir_Next',sans-serif] leading-[20px] text-[#09090b] text-[15px] whitespace-nowrap">
                          {c.code}
                        </p>
                        <p className="font-['Avenir_Next',sans-serif] leading-[16px] text-[#71717a] text-[11px] truncate">
                          {c.name} · {c.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-[1px] shrink-0 ml-[8px]">
                      <p className="font-['Avenir_Next',sans-serif] leading-[24px] text-[#09090b] text-[17px] text-right tabular-nums">
                        {convertedValue(c.code)}
                      </p>
                      <p
                        className="font-['Avenir_Next',sans-serif] leading-[16px] text-[11px] text-right"
                        style={{ color: positive ? '#14804d' : '#a61f1f' }}
                      >
                        {change}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom-sheet overlay ── */}
      <AnimatePresence>
        {dropdownOpen && (
          <>
            {/* Dim backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 z-40 bg-black/50"
              onClick={() => setDropdownOpen(false)}
            />

            {/* Sheet panel */}
            <motion.div
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 320 }}
              className="absolute bottom-0 left-0 right-0 z-50 flex flex-col bg-white rounded-t-[20px] shadow-[0px_-4px_24px_rgba(0,0,0,0.12)]"
              style={{ maxHeight: '72%' }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-[12px] pb-[4px] shrink-0">
                <div className="w-[36px] h-[4px] rounded-full bg-[#d4d4d8]" />
              </div>

              {/* Sheet header */}
              <div className="flex items-center justify-between px-[16px] py-[12px] shrink-0 border-b border-[#e4e4e7]">
                <p className="font-['Avenir_Next',sans-serif] text-[18px] text-[#09090b]">
                  Select Currency
                </p>
                <button
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center justify-center size-[32px] rounded-full hover:bg-[#f4f4f5] transition-colors"
                >
                  <span className="font-['Material_Icons',sans-serif] text-[22px] text-[#71717a]">close</span>
                </button>
              </div>

              {/* Sheet search */}
              <div className="shrink-0 px-[12px] py-[10px] border-b border-[#e4e4e7]">
                <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-[8px] flex items-center gap-[6px] px-[10px] py-[10px]">
                  <span className="font-['Material_Icons',sans-serif] text-[18px] text-[#71717a]">search</span>
                  <input
                    ref={sheetSearchRef}
                    type="text"
                    value={sheetSearch}
                    onChange={e => setSheetSearch(e.target.value)}
                    placeholder="Search currency"
                    className="flex-1 min-w-0 font-['Avenir_Next',sans-serif] text-[14px] text-[#09090b] placeholder-[#71717a] outline-none bg-transparent"
                  />
                  {sheetSearch !== '' && (
                    <button onClick={() => setSheetSearch('')} className="text-[#71717a]">
                      <span className="font-['Material_Icons',sans-serif] text-[18px]">close</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Sheet currency list */}
              <div className="flex-1 overflow-y-auto">
                {sheetCurrencies.length === 0 ? (
                  <div className="flex items-center justify-center py-[32px]">
                    <span className="font-['Avenir_Next',sans-serif] text-[14px] text-[#71717a]">No currencies found</span>
                  </div>
                ) : (
                  sheetCurrencies.map(c => (
                    <div
                      key={c.code}
                      onClick={() => { setBaseCurrency(c.code); setDropdownOpen(false); }}
                      className={`flex items-center gap-[12px] px-[16px] py-[13px] cursor-pointer border-b border-[#f4f4f5] last:border-b-0 transition-colors ${
                        c.code === baseCurrency ? 'bg-[#eff6ff]' : 'hover:bg-[#f4f4f5]'
                      }`}
                    >
                      <img src={flagSrc(c.code)} alt={c.code} className="h-[20px] w-auto rounded-[2px] shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-['Avenir_Next',sans-serif] text-[15px] text-[#09090b] leading-[20px]">
                          {c.country}
                        </p>
                        <p className="font-['Avenir_Next',sans-serif] text-[12px] text-[#71717a] leading-[16px]">
                          {c.name}
                        </p>
                      </div>
                      <span className="font-['Avenir_Next',sans-serif] text-[13px] text-[#71717a] shrink-0">{c.code}</span>
                      {c.code === baseCurrency && (
                        <span className="font-['Material_Icons',sans-serif] text-[20px] text-[#0077e9]">check</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};