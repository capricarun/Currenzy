function Frame29() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[32px]">
      <p className="font-['Material_Icons:Regular',sans-serif] leading-[36px] not-italic relative shrink-0 text-[24px] text-black text-center w-full">arrow_back</p>
    </div>
  );
}

function Frame30() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
      <Frame29 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="flex-[1_0_0] min-w-px relative">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center pr-[32px] relative size-full">
          <p className="font-['Avenir_Next:Demi_Bold',sans-serif] leading-[32px] not-italic relative shrink-0 text-[#18181b] text-[24px] tracking-[-0.24px] whitespace-nowrap">Add Pair</p>
        </div>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="bg-white content-stretch flex h-[68px] items-center px-[16px] py-[8px] relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[393px]" data-name="Header">
        <div aria-hidden="true" className="absolute border-[#e4e4e7] border-b border-solid inset-0 pointer-events-none rounded-tl-[16px] rounded-tr-[16px]" />
        <Frame30 />
        <Frame27 />
      </div>
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full">
      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[18px] not-italic relative shrink-0 text-[#18181b] text-[12px] text-center whitespace-nowrap">CURRENCY PAIR</p>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#fafafa] text-[16px] whitespace-nowrap">keyboard_arrow_down</p>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#fafafa] text-[12px] text-center whitespace-nowrap">Australian Dollar</p>
      <Frame18 />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#fafafa] text-[24px] w-[126px]">AUD</p>
      <Frame24 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#fafafa] text-[16px] whitespace-nowrap">keyboard_arrow_down</p>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#fafafa] text-[12px] text-center whitespace-nowrap">Indian Rupee</p>
      <Frame19 />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-col items-end relative shrink-0">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[normal] not-italic relative shrink-0 text-[#fafafa] text-[24px] text-right w-[126px]">INR</p>
      <Frame25 />
    </div>
  );
}

function Frame22() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-center justify-center left-[162px] pl-[9px] pr-[8px] py-[8px] rounded-[70px] size-[38px] top-[20px]">
      <p className="font-['Material_Icons:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#18181b] text-[24px] whitespace-nowrap">swap_horiz</p>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full">
      <div className="bg-[#0077e9] flex-[1_0_0] h-[78px] min-w-px relative rounded-[8px]" data-name="Currency Tag">
        <div className="flex flex-col items-center justify-center size-full">
          <div className="content-stretch flex flex-col items-center justify-center px-[24px] py-[16px] relative size-full">
            <Frame20 />
          </div>
        </div>
      </div>
      <div className="bg-[#0077e9] flex-[1_0_0] h-[78px] min-w-px relative rounded-[8px]" data-name="Currency Tag">
        <div className="flex flex-col items-end justify-center size-full">
          <div className="content-stretch flex flex-col items-end justify-center px-[24px] py-[16px] relative size-full">
            <Frame21 />
          </div>
        </div>
      </div>
      <Frame22 />
    </div>
  );
}

function CurrencyPair() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0 w-full" data-name="Currency Pair">
      <Frame26 />
      <Frame23 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Avenir_Next:Demi_Bold',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#18181b] text-[18px] tracking-[-0.18px] whitespace-nowrap">AUD</p>
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons_Outlined:Regular','Noto_Sans:Regular',sans-serif] leading-[22px] relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        arrow_forward
      </p>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Avenir_Next:Demi_Bold',sans-serif] leading-[26px] not-italic relative shrink-0 text-[#18181b] text-[18px] tracking-[-0.18px] whitespace-nowrap">INR</p>
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <Frame32 />
      <Frame37 />
      <Frame34 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Avenir_Next:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#71717a] text-[14px] text-center">1 AUD = 68.32 INR</p>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-center justify-center min-w-px relative">
      <Frame35 />
      <Frame33 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame8 />
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[199px] items-start relative shrink-0 w-full">
      <CurrencyPair />
      <div className="bg-white h-[88px] relative rounded-[8px] shrink-0 w-full" data-name="Saved Pair">
        <div aria-hidden="true" className="absolute border border-[#e4e4e7] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-col justify-center size-full">
          <div className="content-stretch flex flex-col items-start justify-center px-[24px] py-[16px] relative size-full">
            <Frame10 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Frame39 />
      <div className="bg-gradient-to-r drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] from-[#9b60e1] h-[56px] relative rounded-[8px] shrink-0 to-[#0074e8] w-full" data-name="Button/Big">
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex gap-[8px] items-center justify-center p-[16px] relative size-full">
            <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#fafafa] text-[16px] whitespace-nowrap">Add</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame62() {
  return (
    <div className="content-stretch flex flex-col items-start relative rounded-[16px] shrink-0 w-full">
      <Frame41 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Avenir_Next:Medium',sans-serif] leading-[20px] min-w-px not-italic relative text-[#18181b] text-[14px]">You have 4 saved currency pairs</p>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap">{`USD `}</p>
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons_Outlined:Regular','Noto_Sans:Regular',sans-serif] leading-[22px] relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        arrow_forward
      </p>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap">EUR</p>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <Frame43 />
      <Frame44 />
      <Frame45 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Avenir_Next:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#71717a] text-[14px]">1 USD = 0.9230 EUR</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px relative">
      <Frame42 />
      <Frame46 />
    </div>
  );
}

function Frame64() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[18px]">
      <p className="font-['Material_Icons:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[18px] w-full">ssid_chart</p>
    </div>
  );
}

function Frame65() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[18px]">
      <p className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[18px] w-full">delete</p>
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame9 />
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[40px] shrink-0" data-name="Icon">
        <Frame64 />
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[40px] shrink-0" data-name="Icon">
        <Frame65 />
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap">{`USD `}</p>
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons_Outlined:Regular','Noto_Sans:Regular',sans-serif] leading-[22px] relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        arrow_forward
      </p>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap">INR</p>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <Frame48 />
      <Frame49 />
      <Frame50 />
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Avenir_Next:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#71717a] text-[14px]">1 USD = 95.306 INR</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px relative">
      <Frame47 />
      <Frame51 />
    </div>
  );
}

function Frame66() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[18px]">
      <p className="font-['Material_Icons:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[18px] w-full">ssid_chart</p>
    </div>
  );
}

function Frame67() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[18px]">
      <p className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[18px] w-full">delete</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame13 />
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[40px] shrink-0" data-name="Icon">
        <Frame66 />
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[40px] shrink-0" data-name="Icon">
        <Frame67 />
      </div>
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap">{`USD `}</p>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons_Outlined:Regular','Noto_Sans:Regular',sans-serif] leading-[22px] relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        arrow_forward
      </p>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap">GBP</p>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <Frame53 />
      <Frame54 />
      <Frame55 />
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Avenir_Next:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#71717a] text-[14px]">1 USD = 0.74 GBP</p>
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px relative">
      <Frame52 />
      <Frame56 />
    </div>
  );
}

function Frame68() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[18px]">
      <p className="font-['Material_Icons:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[18px] w-full">ssid_chart</p>
    </div>
  );
}

function Frame69() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[18px]">
      <p className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[18px] w-full">delete</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame15 />
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[40px] shrink-0" data-name="Icon">
        <Frame68 />
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[40px] shrink-0" data-name="Icon">
        <Frame69 />
      </div>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap">{`USD `}</p>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons_Outlined:Regular','Noto_Sans:Regular',sans-serif] leading-[22px] relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap" style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100, 'wght' 400" }}>
        arrow_forward
      </p>
    </div>
  );
}

function Frame60() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <p className="font-['Avenir_Next:Bold',sans-serif] leading-[22px] not-italic relative shrink-0 text-[#18181b] text-[16px] whitespace-nowrap">JPY</p>
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0">
      <Frame58 />
      <Frame59 />
      <Frame60 />
    </div>
  );
}

function Frame61() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <p className="flex-[1_0_0] font-['Avenir_Next:Regular',sans-serif] leading-[20px] min-w-px not-italic relative text-[#71717a] text-[14px]">1 USD = 156.57 JPY</p>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[3px] items-start min-w-px relative">
      <Frame57 />
      <Frame61 />
    </div>
  );
}

function Frame70() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[18px]">
      <p className="font-['Material_Icons:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[18px] w-full">ssid_chart</p>
    </div>
  );
}

function Frame71() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-[18px]">
      <p className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[18px] w-full">delete</p>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <Frame17 />
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[40px] shrink-0" data-name="Icon">
        <Frame70 />
      </div>
      <div className="content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[40px] shrink-0" data-name="Icon">
        <Frame71 />
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] relative rounded-[16px] shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[4px] items-start px-[16px] relative size-full">
        <div className="bg-white h-[73px] relative shrink-0 w-full" data-name="Saved Pair">
          <div aria-hidden="true" className="absolute border-[#e4e4e7] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
              <Frame11 />
            </div>
          </div>
        </div>
        <div className="bg-white h-[73px] relative shrink-0 w-full" data-name="Saved Pair">
          <div aria-hidden="true" className="absolute border-[#e4e4e7] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
              <Frame12 />
            </div>
          </div>
        </div>
        <div className="bg-white h-[73px] relative shrink-0 w-full" data-name="Saved Pair">
          <div aria-hidden="true" className="absolute border-[#e4e4e7] border-b border-solid inset-0 pointer-events-none" />
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
              <Frame14 />
            </div>
          </div>
        </div>
        <div className="bg-white h-[73px] relative shrink-0 w-full" data-name="Saved Pair">
          <div className="flex flex-col justify-center size-full">
            <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
              <Frame16 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame63() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <Frame31 />
      <Frame38 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px relative w-full">
      <Frame62 />
      <Frame63 />
    </div>
  );
}

function Frame36() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full">
      <div className="flex flex-col justify-center size-full">
        <div className="content-stretch flex flex-col items-start justify-center p-[16px] relative size-full">
          <Frame40 />
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
      <p className="font-['Material_Icons:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0077e9] text-[24px] whitespace-nowrap">favorite</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Avenir_Next:Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#0077e9] text-[16px] whitespace-nowrap">
        <p className="leading-[22px]">Favourite</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0">
      <p className="font-['Material_Icons_Outlined:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#71717a] text-[24px] whitespace-nowrap">notifications</p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
      <div className="flex flex-col font-['Avenir_Next:Medium',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#71717a] text-[16px] whitespace-nowrap">
        <p className="leading-[24px]">Alerts</p>
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

export default function Component06AddPair() {
  return (
    <div className="bg-[#fafafa] content-stretch flex flex-col items-start justify-between overflow-clip relative rounded-[16px] size-full" data-name="06 Add Pair">
      <Frame28 />
      <Frame36 />
      <div className="bg-white content-stretch flex gap-[19px] h-[80px] items-center p-[8px] relative rounded-bl-[16px] rounded-br-[16px] shrink-0 w-[393px]" data-name="Footer Nav">
        <div aria-hidden="true" className="absolute border-[#e4e4e7] border-solid border-t inset-0 pointer-events-none rounded-bl-[16px] rounded-br-[16px]" />
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] h-[64px] items-center min-w-px py-[8px] relative rounded-[8px]" data-name="Nav">
          <Frame />
          <Frame1 />
        </div>
        <div className="flex-[1_0_0] h-[64px] min-w-px relative rounded-[8px]" data-name="Nav">
          <div className="flex flex-col items-center size-full">
            <div className="content-stretch flex flex-col gap-[8px] items-center p-[8px] relative size-full">
              <Frame2 />
              <Frame3 />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] h-[64px] items-center min-w-px py-[8px] relative rounded-[8px]" data-name="Nav">
          <Frame4 />
          <Frame5 />
        </div>
        <div className="content-stretch flex flex-[1_0_0] flex-col gap-[8px] h-[64px] items-center min-w-px py-[8px] relative rounded-[8px]" data-name="Nav">
          <Frame6 />
          <Frame7 />
        </div>
      </div>
    </div>
  );
}