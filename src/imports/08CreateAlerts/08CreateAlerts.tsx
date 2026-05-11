function Frame22() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[32px]">
      <p className="font-['Material_Icons:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[24px] text-black text-center w-full">arrow_back</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame22 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[32px] relative size-full">
          <p className="font-['Avenir_Next:Demi_Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#18181b] text-[24px] tracking-[-0.24px] whitespace-nowrap">Create Alerts</p>
        </div>
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="bg-white content-stretch flex h-[68px] items-center px-[16px] py-[8px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[393px]" data-name="Header">
        <div aria-hidden="true" className="absolute border-[#e4e4e7] border-b border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
        <Frame23 />
        <Frame20 />
      </div>
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#18181b] text-[14px] text-center whitespace-nowrap">CURRENCY PAIR</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#fafafa] text-[16px] whitespace-nowrap">keyboard_arrow_down</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#fafafa] text-[12px] text-center whitespace-nowrap">Australian Dollar</p>
      <Frame9 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#fafafa] text-[24px] w-[126px]">AUD</p>
      <Frame17 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#fafafa] text-[16px] whitespace-nowrap">keyboard_arrow_down</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#fafafa] text-[12px] text-center whitespace-nowrap">Indian Rupee</p>
      <Frame10 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#fafafa] text-[24px] text-right w-[126px]">INR</p>
      <Frame18 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-[162px] pl-[9px] pr-[8px] py-[8px] rounded-[70px] size-[38px] top-[20px]">
      <p className="font-['Material_Icons:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#18181b] text-[24px] whitespace-nowrap">swap_horiz</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <div className="bg-[#0077e9] flex-[1_0_0] h-[78px] min-w-px relative rounded-[8px]" data-name="Currency Tag">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[16px] relative size-full">
            <Frame13 />
          </div>
        </div>
      </div>
      <div className="bg-[#0077e9] flex-[1_0_0] h-[78px] min-w-px relative rounded-[8px]" data-name="Currency Tag">
        <div className="flex flex-col items-end justify-center size-full">
          <div className="content-stretch flex flex-col items-end justify-center px-[24px] py-[16px] relative size-full">
            <Frame14 />
          </div>
        </div>
      </div>
      <Frame15 />
    </div>
  );
}

function CurrencyPair() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-full" data-name="Currency Pair">
      <Frame19 />
      <Frame16 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#18181b] text-[14px] text-center whitespace-nowrap">ALERT TYPE</p>
      <div className="bg-[#f4f4f5] relative rounded-[8px] shrink-0 w-full" data-name="Tab">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
            <div className="bg-white flex-[1_0_0] min-w-px relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]" data-name="Tab/element">
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative size-full">
                  <p className="font-['Avenir_Next:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#18181b] text-[14px] whitespace-nowrap">Rises above</p>
                </div>
              </div>
            </div>
            <button className="bg-[#f4f4f5] cursor-pointer flex-[1_0_0] min-w-px relative" data-name="Tab/element">
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative size-full">
                  <p className="font-['Avenir_Next:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[14px] text-left whitespace-nowrap">Falls below</p>
                </div>
              </div>
            </button>
            <button className="bg-[#f4f4f5] cursor-pointer flex-[1_0_0] min-w-px relative" data-name="Tab/element">
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative size-full">
                  <p className="font-['Avenir_Next:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[14px] text-left whitespace-nowrap">% Change</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-w-px relative">
      <p className="font-['Avenir_Next:Medium',sans-serif] leading-[30px] not-italic relative shrink-0 text-[#09090b] text-[20px] w-full">68.32</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Avenir_Next:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap">INR</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Frame12 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#e4e4e7] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Frame8 />
          <Frame24 />
        </div>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#18181b] text-[14px] text-center whitespace-nowrap">TARGET RATE</p>
      <div className="content-stretch flex flex-col items-start relative rounded-[8px] shrink-0 w-[361px]" data-name="Input Textfield">
        <Frame11 />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[11px] w-[232px] whitespace-pre-wrap">{`Current: 67.23  |  1.35% away from target`}</p>
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#18181b] text-[12px] text-center whitespace-nowrap">NOTIFY VIA</p>
      <div className="bg-[#f4f4f5] relative rounded-[8px] shrink-0 w-full" data-name="Tab">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between p-[4px] relative size-full">
            <button className="bg-[#f4f4f5] cursor-pointer flex-[1_0_0] min-w-px relative" data-name="Tab/element">
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative size-full">
                  <p className="font-['Avenir_Next:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[14px] text-left whitespace-nowrap">Push</p>
                </div>
              </div>
            </button>
            <button className="bg-[#f4f4f5] cursor-pointer flex-[1_0_0] min-w-px relative" data-name="Tab/element">
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative size-full">
                  <p className="font-['Avenir_Next:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#71717a] text-[14px] text-left whitespace-nowrap">Email</p>
                </div>
              </div>
            </button>
            <div className="bg-white flex-[1_0_0] min-w-px relative rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.06)]" data-name="Tab/element">
              <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-center justify-center px-[12px] py-[6px] relative size-full">
                  <p className="font-['Avenir_Next:Bold',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#18181b] text-[14px] whitespace-nowrap">Both</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Avenir_Next:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#18181b] text-[14px] text-center whitespace-nowrap">Repeat</p>
      <div className="bg-white h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="Select">
        <div aria-hidden="true" className="absolute border border-[#18181b] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-between px-[12px] py-[8px] relative size-full">
            <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-px not-italic relative text-[#14141a] text-[14px]">Once (disable after triggered)</p>
            <p className="font-['Material_Icons_Outlined:Regular','Noto_Sans:Regular',sans-serif] leading-[22px] relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
              arrow_drop_down
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <p className="font-['Avenir_Next:Medium',sans-serif] leading-[20px] not-italic relative shrink-0 text-[#18181b] text-[14px] text-center whitespace-pre">{`Notes  (optional)`}</p>
      <div className="bg-white h-[40px] relative rounded-[6px] shrink-0 w-full" data-name="Input">
        <div aria-hidden="true" className="absolute border border-[#18181b] border-solid inset-0 pointer-events-none rounded-[6px]" />
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center px-[12px] py-[8px] relative size-full">
            <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#b8b8bd] text-[14px] whitespace-nowrap">e.g. transfer money…</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <Frame31 />
      <Frame32 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame27 />
      <Frame28 />
      <Frame29 />
      <Frame34 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full">
      <CurrencyPair />
      <Frame33 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="bg-gradient-to-r drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] from-[#9b60e1] h-[56px] relative rounded-[8px] shrink-0 to-[#0074e8] w-full" data-name="Button/Big">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative size-full">
            <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#fafafa] text-[16px] whitespace-nowrap">Create Alert</p>
          </div>
        </div>
      </div>
      <div className="bg-white drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] h-[56px] relative rounded-[8px] shrink-0 w-full" data-name="Button/Big">
        <div aria-hidden="true" className="absolute border border-[#9b60e1] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative size-full">
            <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap">Cancel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-between p-[16px] relative size-full">
          <Frame26 />
          <Frame30 />
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[24px] whitespace-nowrap">swap_horiz</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Avenir_Next:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Convert</p>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap">favorite</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Avenir_Next:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Favourite</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0077e9] text-[24px] whitespace-nowrap">notifications</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Avenir_Next:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0077e9] text-[16px] whitespace-nowrap">
        <p className="leading-[22px]">Alerts</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[24px] whitespace-nowrap">account_circle</p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Avenir_Next:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Profile</p>
      </div>
    </div>
  );
}

export default function Component08CreateAlerts() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col items-start justify-between overflow-clip relative rounded-[16px] size-full" data-name="08 Create Alerts">
      <Frame21 />
      <Frame25 />
      <div className="bg-white content-stretch flex gap-[19px] h-[80px] items-center p-[8px] relative rounded-bl-[16px] rounded-br-[16px] shrink-0 w-[393px]" data-name="Footer Nav">
        <div aria-hidden="true" className="absolute border-[#e4e4e7] border-solid border-t inset-0 pointer-events-none rounded-bl-[16px] rounded-br-[16px]" />
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] h-[64px] items-center min-w-px py-[8px] relative rounded-[8px]" data-name="Nav">
          <Frame />
          <Frame1 />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] h-[64px] items-center min-w-px py-[8px] relative rounded-[8px]" data-name="Nav">
          <Frame2 />
          <Frame3 />
        </div>
        <div className="flex-[1_0_0] h-[64px] min-w-px relative rounded-[8px]" data-name="Nav">
          <div className="flex flex-col items-center size-full">
            <div className="content-stretch flex flex-col gap-[8px] items-center p-[8px] relative size-full">
              <Frame4 />
              <Frame5 />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] h-[64px] items-center min-w-px py-[8px] relative rounded-[8px]" data-name="Nav">
          <Frame6 />
          <Frame7 />
        </div>
      </div>
    </div>
  );
}