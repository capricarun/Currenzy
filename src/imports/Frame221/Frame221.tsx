import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imgFlag from "./49b947c030710fdd9da00fcc79f8dea6e08cc077.png";
import imgFlag1 from "./e33ad9327b1a28551fc58bf83a737ab7bf723bd7.png";
import imgFlag2 from "./552348ddd9d0ee89c7b47e6fcea98b766a77d4e9.png";
import imgFlag3 from "./8001dba46bdd30dce7d97fae99e4a75d8ac6c980.png";
import imgFlag4 from "./94baf2f4d8cbd744abb57aef4fab87fe9667417b.png";
import imgFlag5 from "./535d3b436952d8bc3587797000658762e9944800.png";
import imgFlag6 from "./04007e8742c1866be02e9604cf4637bbc5970468.png";
import imgFlag7 from "./f8e4a2ae9458752ac5003d6fa460493ecc4fe141.png";

interface Props {
  onSelect?: (from: string, to: string) => void;
}

const CONVERSIONS = [
  { id: 1, from: 'USD', to: 'INR', fromAmt: '200',     toAmt: '19,052.05', fromFlag: imgFlag,  toFlag: imgFlag1 },
  { id: 2, from: 'USD', to: 'INR', fromAmt: '400',     toAmt: '37,998.40', fromFlag: imgFlag,  toFlag: imgFlag1 },
  { id: 3, from: 'USD', to: 'GBP', fromAmt: '400',     toAmt: '1,489.47',  fromFlag: imgFlag,  toFlag: imgFlag2 },
  { id: 4, from: 'INR', to: 'EUR', fromAmt: '200,000', toAmt: '1,799.84',  fromFlag: imgFlag1, toFlag: imgFlag3 },
  { id: 5, from: 'CNY', to: 'INR', fromAmt: '200,000', toAmt: '13,965.96', fromFlag: imgFlag4, toFlag: imgFlag1 },
  { id: 6, from: 'AED', to: 'INR', fromAmt: '1,000',   toAmt: '25,831.32', fromFlag: imgFlag5, toFlag: imgFlag1 },
  { id: 7, from: 'INR', to: 'AUD', fromAmt: '200,000', toAmt: '2,930.23',  fromFlag: imgFlag1, toFlag: imgFlag6 },
  { id: 8, from: 'INR', to: 'JPY', fromAmt: '600',     toAmt: '2,930.23',  fromFlag: imgFlag1, toFlag: imgFlag7 },
];

export default function Frame36({ onSelect }: Props) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="h-[20px] relative shrink-0 w-full mb-[4px]">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between px-[8px] py-[4px] relative size-full">
            <p className="font-['Avenir_Next',sans-serif] font-bold leading-[18px] text-[#18181b] text-[12px] whitespace-nowrap tracking-[0.4px]">
              RECENT CONVERSIONS
            </p>
            <p
              className="font-['Inter',sans-serif] leading-[normal] text-[#0077e9] text-[14px] text-center underline decoration-solid whitespace-nowrap cursor-pointer hover:text-[#005bb5] transition-colors"
              onClick={() => navigate('/multi-currency')}
            >
              Multi Currency
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col items-start overflow-x-clip overflow-y-auto w-full max-h-[272px] rounded-[8px] border border-[#e4e4e7]">
        {CONVERSIONS.map((item) => {
          const isHovered = hoveredId === item.id;
          const isActive = activeId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => {
                setActiveId(item.id);
                onSelect?.(item.from, item.to);
              }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative shrink-0 w-full cursor-pointer transition-colors duration-150"
              style={{
                backgroundColor: isActive
                  ? '#eff6ff'
                  : isHovered
                  ? '#f4f4f5'
                  : '#ffffff',
              }}
            >
              {/* Bottom border */}
              <div aria-hidden="true" className="absolute border-[#e4e4e7] border-b border-solid inset-0 pointer-events-none" />

              <div className="flex flex-row items-center size-full">
                <div className="flex gap-[16px] items-center p-[8px] relative size-full">

                  {/* From + swap icon + To */}
                  <div className="flex flex-1 items-start justify-between min-w-px relative">

                    {/* From side */}
                    <div className="flex gap-[8px] items-center shrink-0 w-[130px]">
                      <div className="relative shrink-0 size-[38px] overflow-hidden rounded-[2px]">
                        <img
                          alt={item.from}
                          className="absolute h-[100.11%] left-[-12.42%] max-w-none top-[-0.06%] w-[124.83%] object-cover"
                          src={item.fromFlag}
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-[2px] items-start min-w-px whitespace-nowrap">
                        <p className="font-['Avenir_Next',sans-serif] font-bold leading-[22px] text-[#09090b] text-[16px]">
                          {item.from}
                        </p>
                        <p className="font-['Avenir_Next',sans-serif] leading-[18px] text-[#71717a] text-[12px]">
                          {item.fromAmt}
                        </p>
                      </div>
                    </div>

                    {/* Swap icon */}
                    <div className="flex flex-col h-[42px] items-center justify-center px-[8px] shrink-0 w-[34px]">
                      <p
                        className="font-['Material_Icons',sans-serif] leading-none text-[#09090b] text-[18px] transition-colors duration-150"
                        style={{ color: isHovered || isActive ? '#0077e9' : '#09090b' }}
                      >
                        swap_horiz
                      </p>
                    </div>

                    {/* To side */}
                    <div className="flex gap-[8px] items-center shrink-0 w-[130px]">
                      <div className="flex flex-1 flex-col gap-[2px] items-end min-w-px whitespace-nowrap">
                        <p className="font-['Avenir_Next',sans-serif] font-bold leading-[22px] text-[#09090b] text-[16px]">
                          {item.to}
                        </p>
                        <p className="font-['Avenir_Next',sans-serif] leading-[18px] text-[#71717a] text-[12px]">
                          {item.toAmt}
                        </p>
                      </div>
                      <div className="relative shrink-0 size-[38px] overflow-hidden rounded-[2px]">
                        <img
                          alt={item.to}
                          className="absolute h-[178.09%] left-[-39.75%] max-w-none top-[-38.78%] w-[180.92%] object-cover"
                          src={item.toFlag}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Chart icon */}
                  <div
                    className="group/icon flex flex-col items-center justify-center size-[34px] rounded-[40px] shrink-0 transition-colors duration-150 hover:bg-[#e0edff]"
                    onClick={(e) => { e.stopPropagation(); navigate(`/rates/${item.from}/${item.to}`); }}
                  >
                    <p className="font-['Material_Icons',sans-serif] leading-normal text-[18px] w-[18px] transition-colors duration-150 text-[#71717a] group-hover/icon:text-[#0077e9]">
                      ssid_chart
                    </p>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}