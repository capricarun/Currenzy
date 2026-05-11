import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "../../context/AppContext";

export const AddPairScreen = () => {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, favorites, currencies } =
    useApp();
  const [fromCurrency, setFromCurrency] = useState("AUD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [sheetFor, setSheetFor] = useState<
    "from" | "to" | null
  >(null);
  const [sheetSearch, setSheetSearch] = useState("");
  const sheetSearchRef = useRef<HTMLInputElement>(null);

  const [exchangeRate, setExchangeRate] = useState<
    number | null
  >(null);
  const [rateLoading, setRateLoading] = useState(false);
  const [pairRates, setPairRates] = useState<
    Record<string, number>
  >({});
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string;
    from: string;
    to: string;
    rate: number;
  } | null>(null);
  const [undoPair, setUndoPair] = useState<{
    id: string;
    from: string;
    to: string;
    rate: number;
  } | null>(null);
  const [showToast, setShowToast] = useState(false);
  const toastTimerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

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

  const currencyName = (code: string) =>
    currencies.find((c) => c.code === code)?.name || code;

  // Fetch live rate for the selected pair
  useEffect(() => {
    setRateLoading(true);
    setExchangeRate(null);
    fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then((r) => r.json())
      .then((data) => {
        const rate = data?.rates?.[toCurrency];
        if (rate) setExchangeRate(rate);
      })
      .catch(() => {})
      .finally(() => setRateLoading(false));
  }, [fromCurrency, toCurrency]);

  // Fetch live rates for all saved pairs
  useEffect(() => {
    if (favorites.length === 0) return;
    const bases = [...new Set(favorites.map((f) => f.from))];
    bases.forEach((base) => {
      fetch(`https://open.er-api.com/v6/latest/${base}`)
        .then((r) => r.json())
        .then((data) => {
          if (data?.rates) {
            const updates: Record<string, number> = {};
            favorites
              .filter((f) => f.from === base)
              .forEach((f) => {
                if (data.rates[f.to]) {
                  updates[`${f.from}-${f.to}`] =
                    data.rates[f.to];
                }
              });
            setPairRates((prev) => ({ ...prev, ...updates }));
          }
        })
        .catch(() => {});
    });
  }, [favorites]);

  // Auto-focus search when sheet opens; clear search on close
  useEffect(() => {
    if (sheetFor) {
      setTimeout(() => sheetSearchRef.current?.focus(), 300);
    } else {
      setSheetSearch("");
    }
  }, [sheetFor]);

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

  const handleAdd = () => {
    addFavorite({
      id: "",
      from: fromCurrency,
      to: toCurrency,
      rate: exchangeRate ?? 0,
    });
    navigate("/favorites");
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const formatRate = (rate: number) => {
    if (rate >= 100) return rate.toFixed(2);
    if (rate >= 1) return rate.toFixed(4);
    return rate.toFixed(6);
  };

  const handleDeleteConfirm = () => {
    if (!deleteTarget) return;
    const removed = deleteTarget;
    setUndoPair(removed);
    removeFavorite(removed.id);
    setDeleteTarget(null);
    setShowToast(true);
    if (toastTimerRef.current)
      clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(
      () => setShowToast(false),
      4000,
    );
  };

  const handleUndo = () => {
    if (!undoPair) return;
    addFavorite(undoPair);
    setShowToast(false);
    setUndoPair(null);
    if (toastTimerRef.current)
      clearTimeout(toastTimerRef.current);
  };

  return (
    <div className="bg-[#fafafa] flex flex-col h-full overflow-y-auto relative">
      {/* Header */}
      <div className="bg-white flex h-[68px] items-center px-[16px] py-[8px] shrink-0 border-b border-[#e4e4e7]">
        <button
          onClick={() => navigate("/favorites")}
          className="flex gap-[8px] items-center shrink-0 hover:opacity-70 transition-opacity"
        >
          <span className="font-['Material_Icons:Regular',sans-serif] text-[24px] text-black">
            arrow_back
          </span>
        </button>
        <div className="flex-1 min-w-px flex justify-center pr-[32px]">
          <p className="font-['Avenir_Next:Demi_Bold',sans-serif] leading-[32px] text-[#18181b] text-[24px] tracking-[-0.24px] whitespace-nowrap">
            Add Pair
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-[24px] p-[16px]">
        {/* Currency Pair Selection */}
        <div className="flex flex-col gap-[4px] items-center w-full">
          <p className="font-['Avenir_Next:Bold',sans-serif] leading-[18px] text-[#18181b] text-[12px]">
            CURRENCY PAIR
          </p>
          <div className="flex gap-[8px] items-center w-full relative">
            {/* From Currency */}
            <button
              onClick={() => setSheetFor("from")}
              className="bg-[#0077e9] flex-1 h-[78px] rounded-[8px] flex items-center justify-center px-[24px] py-[16px]"
            >
              <div className="flex flex-col items-start">
                <p className="font-['Avenir_Next:Bold',sans-serif] text-[#fafafa] text-[24px]">
                  {fromCurrency}
                </p>
                <div className="flex gap-[4px] items-center">
                  <p className="font-['Avenir_Next:Regular',sans-serif] text-[#fafafa] text-[12px]">
                    {currencyName(fromCurrency)}
                  </p>
                  <span className="font-['Material_Icons_Outlined:Regular',sans-serif] text-[#fafafa] text-[16px]">
                    keyboard_arrow_down
                  </span>
                </div>
              </div>
            </button>

            {/* To Currency */}
            <button
              onClick={() => setSheetFor("to")}
              className="bg-[#0077e9] flex-1 h-[78px] rounded-[8px] flex items-center justify-end px-[24px] py-[16px]"
            >
              <div className="flex flex-col items-end">
                <p className="font-['Avenir_Next:Bold',sans-serif] text-[#fafafa] text-[24px] text-right">
                  {toCurrency}
                </p>
                <div className="flex gap-[4px] items-center">
                  <p className="font-['Avenir_Next:Regular',sans-serif] text-[#fafafa] text-[12px]">
                    {currencyName(toCurrency)}
                  </p>
                  <span className="font-['Material_Icons_Outlined:Regular',sans-serif] text-[#fafafa] text-[16px]">
                    keyboard_arrow_down
                  </span>
                </div>
              </div>
            </button>

            {/* Swap Button */}
            <button
              onClick={handleSwap}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-[40px] h-[40px] flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
            >
              <span className="font-['Material_Icons:Regular',sans-serif] text-[#18181b] text-[24px]">
                swap_horiz
              </span>
            </button>
          </div>
        </div>

        {/* Live Rate Preview Card */}
        <div className="bg-white border border-[#e4e4e7] rounded-[8px] p-[24px] flex items-center justify-center">
          <div className="flex flex-col gap-[3px] items-center">
            <div className="flex gap-[4px] items-center">
              <img
                src={flagSrc(fromCurrency)}
                alt={fromCurrency}
                className="h-[18px] w-auto rounded-[2px]"
              />
              <p className="font-['Avenir_Next:Demi_Bold',sans-serif] leading-[26px] text-[#18181b] text-[18px] tracking-[-0.18px]">
                {fromCurrency}
              </p>
              <span className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[22px] text-[#71717a] text-[16px]">
                arrow_forward
              </span>
              <p className="font-['Avenir_Next:Demi_Bold',sans-serif] leading-[26px] text-[#18181b] text-[18px] tracking-[-0.18px]">
                {toCurrency}
              </p>
              <img
                src={flagSrc(toCurrency)}
                alt={toCurrency}
                className="h-[18px] w-auto rounded-[2px]"
              />
            </div>
            {rateLoading ? (
              <p className="font-['Avenir_Next:Regular',sans-serif] leading-[20px] text-[#71717a] text-[14px]">
                Fetching rate...
              </p>
            ) : exchangeRate !== null ? (
              <p className="font-['Avenir_Next:Regular',sans-serif] leading-[20px] text-[#18181b] text-[14px]">
                1 {fromCurrency} ={" "}
                <span className="font-['Avenir_Next:Demi_Bold',sans-serif] text-[#0077e9]">
                  {formatRate(exchangeRate)}
                </span>{" "}
                {toCurrency}
              </p>
            ) : (
              <p className="font-['Avenir_Next:Regular',sans-serif] leading-[20px] text-[#71717a] text-[14px]">
                Rate unavailable
              </p>
            )}
          </div>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          disabled={rateLoading || exchangeRate === null}
          className="bg-gradient-to-r from-[#9b60e1] to-[#0074e8] h-[56px] rounded-[8px] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex items-center justify-center gap-[8px] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <span className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] text-[#fafafa] text-[16px]">
            Add Pair
          </span>
        </button>

        {/* Saved Currency Pairs */}
        {favorites.length > 0 && (
          <div className="flex flex-col gap-[8px]">
            <p className="font-['Avenir_Next:Bold',sans-serif] leading-[18px] text-[#71717a] text-[11px] uppercase tracking-wider">
              SAVED PAIRS ({favorites.length})
            </p>
            <div className="bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] rounded-[16px] overflow-hidden">
              {favorites.map((pair, index) => {
                const liveRate =
                  pairRates[`${pair.from}-${pair.to}`];
                return (
                  <div
                    key={pair.id || index}
                    className={`bg-white px-[8px] ${index < favorites.length - 1 ? "border-b border-[#e4e4e7]" : ""}`}
                  >
                    <div
                      className="flex items-center justify-between p-[16px] cursor-pointer"
                      onClick={() =>
                        navigate("/convert", {
                          state: {
                            from: pair.from,
                            to: pair.to,
                          },
                        })
                      }
                    >
                      <div className="flex-1 flex flex-col gap-[3px]">
                        <div className="flex gap-[4px] items-start">
                          <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] text-[#18181b] text-[16px]">
                            {pair.from}
                          </p>
                          <span className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[22px] text-[#18181b] text-[16px]">
                            arrow_forward
                          </span>
                          <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] text-[#18181b] text-[16px]">
                            {pair.to}
                          </p>
                        </div>
                        <p className="font-['Avenir_Next:Regular',sans-serif] leading-[20px] text-[#71717a] text-[14px]">
                          {liveRate !== undefined
                            ? `1 ${pair.from} = ${liveRate.toFixed(4)} ${pair.to}`
                            : "Loading rate..."}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/rates/${pair.from}/${pair.to}`,
                          );
                        }}
                        className="flex items-center justify-center w-[34px] h-[34px] rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-['Material_Icons:Regular',sans-serif] text-[#71717a] text-[18px]">
                          ssid_chart
                        </span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget(pair);
                        }}
                        className="flex items-center justify-center w-[34px] h-[34px] rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-['Material_Icons_Outlined:Regular',sans-serif] text-[#71717a] text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      <AnimatePresence>
        {deleteTarget && (
          <>
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 z-50 bg-black/50"
              onClick={() => setDeleteTarget(null)}
            />
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
              }}
              className="absolute inset-0 z-[60] flex items-center justify-center px-[24px]"
              style={{ pointerEvents: "none" }}
            >
              <div
                className="bg-white rounded-[16px] p-[24px] w-full shadow-[0px_8px_32px_rgba(0,0,0,0.18)]"
                style={{ pointerEvents: "auto" }}
              >
                <p className="font-['Avenir_Next:Demi_Bold',sans-serif] text-[#18181b] text-[18px] leading-[26px] mb-[8px]">
                  Remove pair?
                </p>
                <p className="font-['Avenir_Next:Regular',sans-serif] text-[#71717a] text-[14px] leading-[20px] mb-[24px]">
                  Remove {deleteTarget.from} → {deleteTarget.to}{" "}
                  from your saved pairs?
                </p>
                <div className="flex gap-[12px]">
                  <button
                    onClick={() => setDeleteTarget(null)}
                    className="flex-1 h-[44px] rounded-[8px] border border-[#e4e4e7] flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-['Avenir_Next:Demi_Bold',sans-serif] text-[#18181b] text-[15px]">
                      Cancel
                    </span>
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    className="flex-1 h-[44px] rounded-[8px] bg-[#ef4444] flex items-center justify-center hover:bg-[#dc2626] transition-colors"
                  >
                    <span className="font-['Avenir_Next:Demi_Bold',sans-serif] text-white text-[15px]">
                      Remove
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
            className="absolute bottom-[24px] left-[16px] right-[16px] z-[60] flex items-center justify-between bg-[#18181b] rounded-[12px] px-[16px] py-[14px] shadow-[0px_4px_20px_rgba(0,0,0,0.25)]"
          >
            <span className="font-['Avenir_Next:Regular',sans-serif] text-white text-[14px]">
              Pair removed
            </span>
            <button
              onClick={handleUndo}
              className="font-['Avenir_Next:Demi_Bold',sans-serif] text-[#60a5fa] text-[14px] ml-[16px] hover:opacity-80 transition-opacity"
            >
              Undo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom-sheet overlay (shared for From & To) */}
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