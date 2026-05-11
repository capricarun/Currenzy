import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

export const CreateAlertScreen = () => {
  const navigate = useNavigate();
  const { addAlert, currencies } = useApp();

  const [fromCurrency, setFromCurrency] = useState("AUD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [alertType, setAlertType] = useState<
    "rises_above" | "falls_below" | "percent_change"
  >("rises_above");
  const [targetRate, setTargetRate] = useState("68.32");
  const [notifyVia, setNotifyVia] = useState<
    "push" | "email" | "both"
  >("both");
  const [repeat, setRepeat] = useState<
    "once" | "everyday" | "custom"
  >("once");
  const [showRepeatDropdown, setShowRepeatDropdown] =
    useState(false);
  const [notes, setNotes] = useState("");
  const [sheetFor, setSheetFor] = useState<"from" | "to" | null>(null);
  const [sheetSearch, setSheetSearch] = useState("");
  const sheetSearchRef = useRef<HTMLInputElement>(null);
  const FLAG_MAP: Record<string, string> = { ANG: "cw", XAF: "cm", XCD: "ag", XOF: "sn", XPF: "pf" };
  const flagSrc = (code: string) => `https://flagcdn.com/h20/${FLAG_MAP[code] ?? code.slice(0, 2).toLowerCase()}.png`;
  const currentRate = 67.23;
  const percentageAway = (
    ((parseFloat(targetRate) - currentRate) / currentRate) *
    100
  ).toFixed(2);

const closeSheet = () => { setSheetFor(null); setSheetSearch(""); };
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleCreate = () => {
    addAlert({
      pair: `${fromCurrency}/${toCurrency}`,
      type: alertType,
      targetRate: parseFloat(targetRate),
      notifyVia,
      repeat,
      notes,
      status: "active",
      monitoring: true,
    });
    navigate("/alerts");
  };

  return (
    <div className="bg-[#fafafa] flex flex-col h-full overflow-y-auto relative">
      {/* Header */}
      <div className="bg-white flex h-[68px] items-center px-[16px] py-[8px] shrink-0 border-b border-[#e4e4e7]">
        <button
          onClick={() => navigate("/alerts")}
          className="flex gap-[8px] items-center shrink-0 hover:opacity-70 transition-opacity"
        >
          <span className="font-['Material_Icons:Regular',sans-serif] text-[24px] text-black">
            arrow_back
          </span>
        </button>
        <div className="flex-1 min-w-px flex justify-center pr-[32px]">
          <p className="font-['Avenir_Next:Demi_Bold',sans-serif] leading-[32px] text-[#18181b] text-[24px] tracking-[-0.24px] whitespace-nowrap">
            Create Alerts
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-between p-[16px] gap-[24px]">
        <div className="flex flex-col gap-[24px]">
          {/* Currency Pair */}
          <div className="flex flex-col gap-[4px] items-center">
            <p className="font-['Avenir_Next:Bold',sans-serif] leading-[20px] text-[#18181b] text-[14px]">
              CURRENCY PAIR
            </p>
            <div className="flex gap-[8px] items-center w-full relative">
              <button onClick={() => setSheetFor("from")} className="bg-[#0077e9] flex-1 h-[78px] rounded-[8px] flex items-center justify-center px-[24px] py-[16px]">
                <div className="flex flex-col items-start">
                  <p className="font-['Avenir_Next:Bold',sans-serif] text-[#fafafa] text-[24px]">
                    {fromCurrency}
                  </p>
                  <div className="flex gap-[4px] items-center">
                    <p className="font-['Avenir_Next:Regular',sans-serif] text-[#fafafa] text-[12px]">
                      Australian Dollar
                    </p>
                    <span className="font-['Material_Icons_Outlined:Regular',sans-serif] text-[#fafafa] text-[16px]">
                      keyboard_arrow_down
                    </span>
                  </div>
                </div>
              </button>

              <button onClick={() => setSheetFor("to")} className="bg-[#0077e9] flex-1 h-[78px] rounded-[8px] flex items-center justify-end px-[24px] py-[16px]">
                <div className="flex flex-col items-end">
                  <p className="font-['Avenir_Next:Bold',sans-serif] text-[#fafafa] text-[24px] text-right">
                    {toCurrency}
                  </p>
                  <div className="flex gap-[4px] items-center">
                    <p className="font-['Avenir_Next:Regular',sans-serif] text-[#fafafa] text-[12px]">
                      Indian Rupee
                    </p>
                    <span className="font-['Material_Icons_Outlined:Regular',sans-serif] text-[#fafafa] text-[16px]">
                      keyboard_arrow_down
                    </span>
                  </div>
                </div>
              </button>

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

          {/* Alert Type */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Avenir_Next:Bold',sans-serif] leading-[20px] text-[#18181b] text-[14px]">
              ALERT TYPE
            </p>
            <div className="bg-[#f4f4f5] rounded-[8px] p-[4px] flex items-center justify-between">
              {[
                { value: "rises_above", label: "Rises above" },
                { value: "falls_below", label: "Falls below" },
                { value: "percent_change", label: "% Change" },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() =>
                    setAlertType(type.value as any)
                  }
                  className={`flex-1 px-[12px] py-[6px] rounded-[8px] transition-all ${
                    alertType === type.value
                      ? 'bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)] font-["Avenir_Next:Bold",sans-serif] text-[#18181b]'
                      : 'bg-[#f4f4f5] font-["Avenir_Next:Medium",sans-serif] text-[#71717a]'
                  } text-[14px] leading-[20px]`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Target Rate */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Avenir_Next:Bold',sans-serif] leading-[20px] text-[#18181b] text-[14px]">
              TARGET RATE
            </p>
            <div className="bg-white border border-[#e4e4e7] rounded-[8px] px-[16px] py-[16px] flex items-center justify-between">
              <input
                type="text"
                value={targetRate}
                onChange={(e) => setTargetRate(e.target.value)}
                className="flex-1 font-['Avenir_Next:Medium',sans-serif] leading-[30px] text-[#09090b] text-[20px] outline-none"
              />
              <span className="font-['Avenir_Next:Medium',sans-serif] leading-[24px] text-[#18181b] text-[16px]">
                {toCurrency}
              </span>
            </div>
            <p className="font-['Avenir_Next:Regular',sans-serif] text-[#71717a] text-[11px]">
              Current: {currentRate} | {percentageAway}% away
              from target
            </p>
          </div>

          {/* Notify Via */}
          <div className="flex flex-col gap-[4px]">
            <p className="font-['Avenir_Next:Bold',sans-serif] leading-[18px] text-[#18181b] text-[12px]">
              NOTIFY VIA
            </p>
            <div className="bg-[#f4f4f5] rounded-[8px] p-[4px] flex items-center justify-between">
              {["push", "email", "both"].map((type) => (
                <button
                  key={type}
                  onClick={() => setNotifyVia(type as any)}
                  className={`flex-1 px-[12px] py-[6px] rounded-[8px] transition-all ${
                    notifyVia === type
                      ? 'bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)] font-["Avenir_Next:Bold",sans-serif] text-[#18181b]'
                      : 'bg-[#f4f4f5] font-["Avenir_Next:Medium",sans-serif] text-[#71717a]'
                  } text-[14px] leading-[20px] capitalize`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-col gap-[4px]">
              <p className="font-['Avenir_Next:Medium',sans-serif] leading-[20px] text-[#18181b] text-[14px]">
                Repeat
              </p>
              <div className="relative">
                <div
                  className="bg-white border border-[#18181b] rounded-[6px] px-[12px] py-[8px] flex items-center cursor-pointer"
                  onClick={() =>
                    setShowRepeatDropdown(!showRepeatDropdown)
                  }
                >
                  <p className="flex-1 font-['Avenir_Next:Regular',sans-serif] text-[#14141a] text-[14px]">
                    {repeat === "once"
                      ? "Once (disable after triggered)"
                      : repeat === "everyday"
                        ? "Everyday"
                        : "Custom"}
                  </p>
                  <span className="font-['Material_Icons_Outlined',sans-serif] text-[#18181b] text-[20px]">
                    arrow_drop_down
                  </span>
                </div>
                {showRepeatDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-[#e4e4e7] rounded-[6px] shadow-lg z-50 mt-[2px] overflow-hidden">
                    {[
                      {
                        value: "once",
                        label: "Once (disable after triggered)",
                      },
                      { value: "everyday", label: "Everyday" },
                      { value: "custom", label: "Custom" },
                    ].map((option) => (
                      <div
                        key={option.value}
                        className="flex items-center px-[12px] py-[10px] cursor-pointer hover:bg-[#f4f4f5]"
                        onClick={() => {
                          setRepeat(
                            option.value as
                              | "once"
                              | "everyday"
                              | "custom",
                          );
                          setShowRepeatDropdown(false);
                        }}
                      >
                        <span className="w-[20px] mr-[8px] font-['Material_Icons',sans-serif] text-[16px] text-[#0077e9]">
                          {repeat === option.value
                            ? "check"
                            : ""}
                        </span>
                        <p className="font-['Avenir_Next:Regular',sans-serif] text-[#14141a] text-[14px]">
                          {option.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-[4px]">
              <p className="font-['Avenir_Next:Medium',sans-serif] leading-[20px] text-[#18181b] text-[14px] whitespace-pre">
                Notes (optional)
              </p>
              <div className="bg-white border border-[#18181b] rounded-[6px] px-[12px] py-[8px]">
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. transfer money…"
                  className="w-full font-['Avenir_Next:Regular',sans-serif] text-[#b8b8bd] text-[14px] outline-none placeholder:text-[#b8b8bd]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-[8px]">
          <button
            onClick={handleCreate}
            className="bg-gradient-to-r from-[#9b60e1] to-[#0074e8] h-[56px] rounded-[8px] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex items-center justify-center gap-[8px] hover:opacity-90 transition-opacity"
          >
            <span className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] text-[#fafafa] text-[16px]">
              Create Alert
            </span>
          </button>
          <button
            onClick={() => navigate("/alerts")}
            className="bg-white border border-[#9b60e1] h-[56px] rounded-[8px] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex items-center justify-center gap-[8px] hover:bg-gray-50 transition-colors"
          >
            <span className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] text-[#18181b] text-[16px]">
              Cancel
            </span>
          </button>
        </div>
      </div>
      <AnimatePresence>
      {sheetFor && (
        <>
          <motion.div
            key="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-50 bg-black/50"
            onClick={closeSheet}
          />
          <motion.div
            key="currency-sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 320 }}
            className="absolute bottom-0 left-0 right-0 z-50 flex flex-col bg-white rounded-t-[20px] shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
            style={{ maxHeight: "72%" }}
          >
            <div className="flex justify-center pt-[12px] pb-[4px] shrink-0">
              <div className="w-[36px] h-[4px] rounded-full bg-[#d4d4d8]" />
            </div>
            <div className="flex items-center justify-between px-[16px] py-[12px] shrink-0 border-b border-[#e4e4e7]">
              <p className="font-['Avenir_Next',sans-serif] text-[18px] text-[#09090b]">
                {sheetFor === "from" ? "From Currency" : "To Currency"}
              </p>
              <button onClick={closeSheet} className="flex items-center justify-center size-[32px] rounded-full hover:bg-[#f4f4f5] transition-colors">
                <span className="font-['Material_Icons',sans-serif] text-[22px] text-[#71717a]">close</span>
              </button>
            </div>
            <div className="shrink-0 px-[12px] py-[10px] border-b border-[#e4e4e7]">
              <div className="bg-[#fafafa] border border-[#e4e4e7] rounded-[8px] flex items-center gap-[6px] px-[10px] py-[8px]">
                <span className="font-['Material_Icons',sans-serif] text-[18px] text-[#71717a]">search</span>
                <input
                  ref={sheetSearchRef}
                  type="text"
                  placeholder="Search currency"
                  value={sheetSearch}
                  onChange={(e) => setSheetSearch(e.target.value)}
                  className="flex-1 bg-transparent outline-none font-['Avenir_Next',sans-serif] text-[14px] text-[#18181b]"
                />
              </div>
            </div>
            <div className="overflow-y-auto flex-1">
              {currencies
                .filter((c) => {
                  const q = sheetSearch.toLowerCase();
                  return !q || c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
                })
                .map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      if (sheetFor === "from") setFromCurrency(c.code);
                      else setToCurrency(c.code);
                      closeSheet();
                    }}
                    className="w-full flex items-center gap-[12px] px-[16px] py-[14px] hover:bg-[#f4f4f5] transition-colors border-b border-[#f4f4f5]"
                  >
                    <img src={flagSrc(c.code)} alt={c.code} className="h-[20px] w-auto rounded-[2px] shrink-0" />
                    <div className="flex-1 text-left">
                      <p className="font-['Avenir_Next',sans-serif] text-[14px] font-semibold text-[#18181b] leading-[20px]">{c.name}</p>
                    </div>
                    <span className="font-['Avenir_Next',sans-serif] text-[14px] font-semibold text-[#18181b]">{c.code}</span>
                  </button>
                ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </div>
  );
};