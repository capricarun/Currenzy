import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../../context/AppContext";
import Frame36 from "../../../imports/Frame221/Frame221";

export const ConvertScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currencies, recentConversions, addRecentConversion } =
    useApp();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState("1,000.00");
  const [convertedAmount, setConvertedAmount] =
    useState("95,306.00");
  // 'from' | 'to' | null — which sheet is open
  const [sheetFor, setSheetFor] = useState<
    "from" | "to" | null
  >(null);
  const [sheetSearch, setSheetSearch] = useState("");
  const [exchangeRate, setExchangeRate] = useState(95.306);
  const [rateLoading, setRateLoading] = useState(false);
  const sheetSearchRef = useRef<HTMLInputElement>(null);
  // Apply pre-selected currencies from navigation state (e.g. from AddPairScreen)
  useEffect(() => {
    const state = location.state as {
      from?: string;
      to?: string;
    } | null;
    if (state?.from) setFromCurrency(state.from);
    if (state?.to) setToCurrency(state.to);
  }, []);

  const FLAG_MAP: Record<string, string> = {
    AED: "ae",
    AFN: "af",
    ALL: "al",
    AMD: "am",
    ANG: "cw",
    AOA: "ao",
    ARS: "ar",
    AUD: "au",
    AWG: "aw",
    AZN: "az",
    BAM: "ba",
    BBD: "bb",
    BDT: "bd",
    BGN: "bg",
    BHD: "bh",
    BIF: "bi",
    BMD: "bm",
    BND: "bn",
    BOB: "bo",
    BRL: "br",
    BSD: "bs",
    BTN: "bt",
    BWP: "bw",
    BYN: "by",
    BZD: "bz",
    CAD: "ca",
    CDF: "cd",
    CHF: "ch",
    CLP: "cl",
    CNY: "cn",
    COP: "co",
    CRC: "cr",
    CUP: "cu",
    CVE: "cv",
    CZK: "cz",
    DJF: "dj",
    DKK: "dk",
    DOP: "do",
    DZD: "dz",
    EGP: "eg",
    ERN: "er",
    ETB: "et",
    EUR: "eu",
    FJD: "fj",
    FKP: "fk",
    GBP: "gb",
    GEL: "ge",
    GHS: "gh",
    GIP: "gi",
    GMD: "gm",
    GNF: "gn",
    GTQ: "gt",
    GYD: "gy",
    HKD: "hk",
    HNL: "hn",
    HRK: "hr",
    HTG: "ht",
    HUF: "hu",
    IDR: "id",
    ILS: "il",
    INR: "in",
    IQD: "iq",
    IRR: "ir",
    ISK: "is",
    JMD: "jm",
    JOD: "jo",
    JPY: "jp",
    KES: "ke",
    KGS: "kg",
    KHR: "kh",
    KMF: "km",
    KPW: "kp",
    KRW: "kr",
    KWD: "kw",
    KYD: "ky",
    KZT: "kz",
    LAK: "la",
    LBP: "lb",
    LKR: "lk",
    LRD: "lr",
    LSL: "ls",
    LYD: "ly",
    MAD: "ma",
    MDL: "md",
    MGA: "mg",
    MKD: "mk",
    MMK: "mm",
    MNT: "mn",
    MOP: "mo",
    MRU: "mr",
    MUR: "mu",
    MVR: "mv",
    MWK: "mw",
    MXN: "mx",
    MYR: "my",
    MZN: "mz",
    NAD: "na",
    NGN: "ng",
    NIO: "ni",
    NOK: "no",
    NPR: "np",
    NZD: "nz",
    OMR: "om",
    PAB: "pa",
    PEN: "pe",
    PGK: "pg",
    PHP: "ph",
    PKR: "pk",
    PLN: "pl",
    PYG: "py",
    QAR: "qa",
    RON: "ro",
    RSD: "rs",
    RUB: "ru",
    RWF: "rw",
    SAR: "sa",
    SBD: "sb",
    SCR: "sc",
    SDG: "sd",
    SEK: "se",
    SGD: "sg",
    SHP: "sh",
    SLL: "sl",
    SOS: "so",
    SRD: "sr",
    SSP: "ss",
    STN: "st",
    SYP: "sy",
    SZL: "sz",
    THB: "th",
    TJS: "tj",
    TMT: "tm",
    TND: "tn",
    TOP: "to",
    TRY: "tr",
    TTD: "tt",
    TWD: "tw",
    TZS: "tz",
    UAH: "ua",
    UGX: "ug",
    USD: "us",
    UYU: "uy",
    UZS: "uz",
    VES: "ve",
    VND: "vn",
    VUV: "vu",
    WST: "ws",
    XAF: "cm",
    XCD: "ag",
    XOF: "sn",
    XPF: "pf",
    YER: "ye",
    ZAR: "za",
    ZMW: "zm",
    ZWL: "zw",
  };

  const flagSrc = (code: string) =>
    `https://flagcdn.com/h20/${FLAG_MAP[code] || "us"}.png`;

  const recalculate = useCallback(
    (rate: number, rawAmount: string) => {
      const num = parseFloat(rawAmount.replace(/,/g, "")) || 0;
      const result = num * rate;
      setConvertedAmount(
        result.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }),
      );
    },
    [],
  );

  useEffect(() => {
    setRateLoading(true);
    fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then((r) => r.json())
      .then((data) => {
        const rate = data?.rates?.[toCurrency] ?? exchangeRate;
        setExchangeRate(rate);
        recalculate(rate, amount);
        const _rawNum =
          parseFloat(amount.replace(/,/g, "")) || 0;
        const _convResult = (_rawNum * rate).toLocaleString(
          "en-US",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        );
        addRecentConversion({
          from: fromCurrency,
          to: toCurrency,
          amount,
          result: _convResult,
          rate,
        });
      })
      .catch(() => recalculate(exchangeRate, amount))
      .finally(() => setRateLoading(false));
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    recalculate(exchangeRate, amount);
  }, [amount]);

  // Auto-focus search when sheet opens; clear search on close
  useEffect(() => {
    if (sheetFor) {
      setTimeout(() => sheetSearchRef.current?.focus(), 300);
    } else {
      setSheetSearch("");
    }
  }, [sheetFor]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleViewRates = () => {
    navigate(`/rates/${fromCurrency}/${toCurrency}`);
  };

  const closeSheet = () => setSheetFor(null);

  const activeCurrency =
    sheetFor === "from" ? fromCurrency : toCurrency;

  const sheetCurrencies = currencies.filter(
    (c) =>
      sheetSearch === "" ||
      c.code
        .toLowerCase()
        .includes(sheetSearch.toLowerCase()) ||
      c.name
        .toLowerCase()
        .includes(sheetSearch.toLowerCase()) ||
      c.country
        .toLowerCase()
        .includes(sheetSearch.toLowerCase()),
  );

  const handleSelect = (code: string) => {
    if (sheetFor === "from") setFromCurrency(code);
    else setToCurrency(code);
    closeSheet();
  };

  return (
    <div className="bg-[#fafafa] flex flex-col h-full overflow-y-auto">
      {/* Header */}
      <div className="bg-white flex h-[68px] items-center px-[16px] py-[8px] shrink-0 border-b border-[#e4e4e7]">
        <div className="flex gap-[8px] items-center shrink-0">
          <div className="relative shrink-0 size-[35px]">
            <svg
              className="absolute block inset-0 size-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35 35"
              fill="none"
            >
              <path
                d="M17.5 0.5C26.8888 0.5 34.5 8.11116 34.5 17.5C34.5 26.8888 26.8888 34.5 17.5 34.5C8.11116 34.5 0.5 26.8888 0.5 17.5C0.500001 8.11116 8.11116 0.5 17.5 0.5Z"
                fill="#FAFAFA"
                stroke="#09090B"
              />
              <path
                d="M8.57959 16.4419H19.7561L19.7991 16.3773L23.4361 10.0251L24.6449 7.90172L11.1657 7.9089L8.62622 10.0251H8.63339H19.1929L16.7324 14.3257H13.5186V12.3242L8.57959 16.4419Z"
                fill="#18181B"
              />
              <path
                d="M15.807 24.9785L18.2711 20.6743H21.4813V22.6758L26.4239 18.5617H15.2439L15.2008 18.6263L11.5674 24.9785L10.3586 27.1019L23.7553 27.0947L26.2948 24.9785H26.2876H15.807Z"
                fill="#18181B"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-px flex justify-center pr-[32px]">
          <p className="font-['Avenir_Next',sans-serif] leading-[32px] text-[#18181b] text-[24px] tracking-[-0.24px] whitespace-nowrap">
            Convert
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-[24px] p-[16px]">
        {/* From group */}
        <div className="flex flex-col gap-[8px]">
          {/* From Currency trigger */}
          <div
            onClick={() => setSheetFor("from")}
            className="bg-white border border-[#e4e4e7] rounded-[8px] px-[16px] py-[8px] flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1 flex flex-col gap-[2px]">
              <p className="font-['Avenir_Next',sans-serif] leading-[22px] text-[#09090b] text-[16px]">
                {fromCurrency} -{" "}
                {
                  currencies.find(
                    (c) => c.code === fromCurrency,
                  )?.name
                }
              </p>
              <p className="font-['Avenir_Next',sans-serif] leading-[18px] text-[#71717a] text-[12px]">
                {
                  currencies.find(
                    (c) => c.code === fromCurrency,
                  )?.country
                }
              </p>
            </div>
            <span className="font-['Material_Icons_Outlined',sans-serif] text-[24px] text-[#09090b]">
              keyboard_arrow_down
            </span>
          </div>

          {/* Amount input */}
          <div className="bg-white border border-[#e4e4e7] rounded-[8px] px-[16px] py-[8px]">
            <div className="flex items-center gap-[8px]">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 min-w-0 font-['Avenir_Next',sans-serif] leading-[30px] text-[#09090b] text-[20px] outline-none bg-transparent"
              />
              <img
                src={flagSrc(fromCurrency)}
                alt={fromCurrency}
                className="h-[20px] w-auto rounded-[2px] shrink-0"
              />
              <div className="flex flex-col shrink-0">
                <button
                  onClick={() => {
                    const num =
                      parseFloat(amount.replace(/,/g, "")) || 0;
                    setAmount(
                      (num + 1).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }),
                    );
                  }}
                  className="flex items-center justify-center w-[22px] h-[15px] hover:bg-gray-100 rounded text-[#09090b]"
                >
                  <span className="font-['Material_Icons_Outlined',sans-serif] text-[16px] leading-none">
                    keyboard_arrow_up
                  </span>
                </button>
                <button
                  onClick={() => {
                    const num =
                      parseFloat(amount.replace(/,/g, "")) || 0;
                    const next = Math.max(0, num - 1);
                    setAmount(
                      next.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }),
                    );
                  }}
                  className="flex items-center justify-center w-[22px] h-[15px] hover:bg-gray-100 rounded text-[#09090b]"
                >
                  <span className="font-['Material_Icons_Outlined',sans-serif] text-[16px] leading-none">
                    keyboard_arrow_down
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center -my-[8px]">
          <button
            onClick={handleSwap}
            style={{
              background:
                "linear-gradient(-42deg, #9B60E1, #0075E7)",
            }}
            className="w-[48px] h-[48px] flex items-center justify-center transition-opacity hover:opacity-90 shadow-sm rounded-full"
          >
            <span className="font-['Material_Icons',sans-serif] text-[24px] text-white">
              swap_vert
            </span>
          </button>
        </div>

        {/* To group */}
        <div className="flex flex-col gap-[8px]">
          {/* To Currency trigger */}
          <div
            onClick={() => setSheetFor("to")}
            className="bg-white border border-[#e4e4e7] rounded-[8px] px-[16px] py-[8px] flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex-1 flex flex-col gap-[2px]">
              <p className="font-['Avenir_Next',sans-serif] leading-[22px] text-[#09090b] text-[16px]">
                {toCurrency} -{" "}
                {
                  currencies.find((c) => c.code === toCurrency)
                    ?.name
                }
              </p>
              <p className="font-['Avenir_Next',sans-serif] leading-[18px] text-[#71717a] text-[12px]">
                {
                  currencies.find((c) => c.code === toCurrency)
                    ?.country
                }
              </p>
            </div>
            <span className="font-['Material_Icons_Outlined',sans-serif] text-[24px] text-[#09090b]">
              keyboard_arrow_down
            </span>
          </div>

          {/* Result card */}
          <div className="bg-[#0077e9] border border-[#0077e9] rounded-[8px] overflow-hidden px-[16px] py-[12px] flex flex-col gap-[6px]">
            <p className="font-['Avenir_Next',sans-serif] leading-[20px] text-white select-none text-[12px]">
              {amount} {fromCurrency} =
            </p>
            <div className="flex items-center justify-between">
              <p className="font-['Avenir_Next',sans-serif] leading-[30px] text-white select-none text-[24px]">
                {rateLoading ? "..." : convertedAmount}
              </p>
              <img
                src={flagSrc(toCurrency)}
                alt={toCurrency}
                height={20}
                className="h-[20px] w-auto rounded-[2px]"
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="font-['Avenir_Next',sans-serif] leading-[20px] text-white text-[14px] select-none">
                1 {fromCurrency} ={" "}
                {rateLoading ? "..." : exchangeRate.toFixed(4)}{" "}
                {toCurrency}
              </p>
              <button
                onClick={handleViewRates}
                className="flex items-center gap-[4px] text-white hover:underline"
              >
                <span className="font-['Avenir_Next',sans-serif] leading-[20px] text-[14px]">
                  View Rates
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Conversions */}
        {recentConversions.length > 0 && (
          <div className="shrink-0 pb-[16px]">
            <div className="flex items-center justify-between mb-[10px]">
              <p className="font-['Avenir_Next',sans-serif] text-[11px] font-semibold text-[#71717a] uppercase tracking-wider">
                RECENT CONVERSIONS
              </p>
              <button
                onClick={() => navigate("/multi-currency")}
                className="flex items-center gap-[4px] text-[#6366f1]"
              >
                <span className="font-['Material_Icons_Outlined',sans-serif] text-[14px] leading-none">
                  grid_view
                </span>
                <span className="font-['Avenir_Next',sans-serif] text-[11px] font-semibold">
                  Multi Currency
                </span>
              </button>
            </div>
            <div className="flex flex-col gap-[8px]">
              {recentConversions.map((conv, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-white rounded-[12px] px-[12px] py-[10px]"
                >
                  {/* From flag */}
                  <img
                    src={flagSrc(conv.from)}
                    alt={conv.from}
                    className="h-[26px] w-auto rounded-[3px] shrink-0"
                  />
                  {/* From: currency code + amount */}
                  <div
                    className="flex flex-col ml-[6px] cursor-pointer"
                    onClick={() => {
                      setFromCurrency(conv.from);
                      setToCurrency(conv.to);
                    }}
                  >
                    <span className="font-['Avenir_Next',sans-serif] text-[13px] font-bold text-[#090909] leading-[17px]">
                      {conv.from}
                    </span>
                    <span className="font-['Avenir_Next',sans-serif] text-[11px] text-[#71717a] leading-[15px]">
                      {conv.amount}
                    </span>
                  </div>
                  {/* Swap icon — pushes both sides apart */}
                  <span className="font-['Material_Icons',sans-serif] text-[18px] text-[#a1a1aa] mx-auto shrink-0 px-[6px]">
                    swap_horiz
                  </span>
                  {/* To: currency code + result */}
                  <div
                    className="flex flex-col items-end mr-[6px] cursor-pointer"
                    onClick={() => {
                      setFromCurrency(conv.from);
                      setToCurrency(conv.to);
                    }}
                  >
                    <span className="font-['Avenir_Next',sans-serif] text-[13px] font-bold text-[#090909] leading-[17px]">
                      {conv.to}
                    </span>
                    <span className="font-['Avenir_Next',sans-serif] text-[11px] text-[#71717a] leading-[15px]">
                      {conv.result}
                    </span>
                  </div>
                  {/* To flag */}
                  <img
                    src={flagSrc(conv.to)}
                    alt={conv.to}
                    className="h-[26px] w-auto rounded-[3px] shrink-0"
                  />
                  {/* Chart icon → rates page */}
                  <button
                    onClick={() =>
                      navigate(`/rates/${conv.from}/${conv.to}`)
                    }
                    className="flex items-center justify-center w-[34px] h-[34px] rounded-full hover:bg-gray-100 shrink-0 ml-2"
                  >
                    <span className="font-['Material_Icons',sans-serif] text-[#71717a] text-[18px]">
                      ssid_chart
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom-sheet overlay (shared for From & To) ── */}
      <AnimatePresence>
        {sheetFor && (
          <>
            {/* Dim backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute inset-0 z-40 bg-black/50"
              onClick={closeSheet}
            />

            {/* Sheet panel */}
            <motion.div
              key="sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 320,
              }}
              className="absolute bottom-0 left-0 right-0 z-50 flex flex-col bg-white rounded-t-[20px] shadow-[0px_-4px_24px_rgba(0,0,0,0.12)]"
              style={{ maxHeight: "72%" }}
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-[12px] pb-[4px] shrink-0">
                <div className="w-[36px] h-[4px] rounded-full bg-[#d4d4d8]" />
              </div>

              {/* Sheet header */}
              <div className="flex items-center justify-between px-[16px] py-[12px] shrink-0 border-b border-[#e4e4e7]">
                <p className="font-['Avenir_Next',sans-serif] text-[18px] text-[#09090b]">
                  {sheetFor === "from"
                    ? "From Currency"
                    : "To Currency"}
                </p>
                <button
                  onClick={closeSheet}
                  className="flex items-center justify-center size-[32px] rounded-full hover:bg-[#f4f4f5] transition-colors"
                >
                  <span className="font-['Material_Icons',sans-serif] text-[22px] text-[#71717a]">
                    close
                  </span>
                </button>
              </div>

              {/* Sheet search */}
              <div className="shrink-0 px-[12px] py-[10px] border-b border-[#e4e4e7]">
                <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-[8px] flex items-center gap-[6px] px-[10px] py-[10px]">
                  <span className="font-['Material_Icons',sans-serif] text-[18px] text-[#71717a]">
                    search
                  </span>
                  <input
                    ref={sheetSearchRef}
                    type="text"
                    value={sheetSearch}
                    onChange={(e) =>
                      setSheetSearch(e.target.value)
                    }
                    placeholder="Search currency"
                    className="flex-1 min-w-0 font-['Avenir_Next',sans-serif] text-[14px] text-[#09090b] placeholder-[#71717a] outline-none bg-transparent"
                  />
                  {sheetSearch !== "" && (
                    <button
                      onClick={() => setSheetSearch("")}
                      className="text-[#71717a]"
                    >
                      <span className="font-['Material_Icons',sans-serif] text-[18px]">
                        close
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Sheet currency list */}
              <div className="flex-1 overflow-y-auto">
                {sheetCurrencies.length === 0 ? (
                  <div className="flex items-center justify-center py-[32px]">
                    <span className="font-['Avenir_Next',sans-serif] text-[14px] text-[#71717a]">
                      No currencies found
                    </span>
                  </div>
                ) : (
                  sheetCurrencies.map((c) => (
                    <div
                      key={c.code}
                      onClick={() => handleSelect(c.code)}
                      className={`flex items-center gap-[12px] px-[16px] py-[13px] cursor-pointer border-b border-[#f4f4f5] last:border-b-0 transition-colors ${
                        c.code === activeCurrency
                          ? "bg-[#eff6ff]"
                          : "hover:bg-[#f4f4f5]"
                      }`}
                    >
                      <img
                        src={flagSrc(c.code)}
                        alt={c.code}
                        className="h-[20px] w-auto rounded-[2px] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-['Avenir_Next',sans-serif] text-[15px] text-[#09090b] leading-[20px]">
                          {c.country}
                        </p>
                        <p className="font-['Avenir_Next',sans-serif] text-[12px] text-[#71717a] leading-[16px]">
                          {c.name}
                        </p>
                      </div>
                      <span className="font-['Avenir_Next',sans-serif] text-[13px] text-[#71717a] shrink-0">
                        {c.code}
                      </span>
                      {c.code === activeCurrency && (
                        <span className="font-['Material_Icons',sans-serif] text-[20px] text-[#0077e9]">
                          check
                        </span>
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