import svgPaths from "./svg-916bbl4ilz";

function Group() {
  return (
    <div className="absolute inset-[5.59%_26.68%_36.27%_26.55%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 97.58 97.58">
        <g id="Group">
          <path d={svgPaths.p1ab68980} fill="var(--fill-0, white)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p2205500} fill="var(--fill-0, #0077E9)" id="Vector_2" />
            <path d={svgPaths.p27fc0180} fill="var(--fill-0, #0077E9)" id="Vector_3" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="-translate-y-1/2 absolute h-[167.84px] left-[97px] top-[calc(50%-0.08px)] w-[208.66px]" data-name="Logo 1">
      <div className="absolute inset-[5.71%_668.35%_-48.45%_-659.56%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 190.32 239.58">
          <path d={svgPaths.p3718ca00} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[-9.25%_684.86%_78.46%_-652.09%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 140.29 51.67">
          <path d={svgPaths.p383f7200} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[132.3%_675.46%_-63.08%_-642.7%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 140.29 51.67">
          <path d={svgPaths.p1fd65600} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[-1.57%_664.7%_-8.82%_-615.54%]" data-name="Vector">
        <div className="absolute inset-[-0.13%_-0.41%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 106.948 185.777">
            <path d={svgPaths.p22653d00} id="Vector" stroke="var(--stroke-0, black)" strokeMiterlimit="10" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[19.07%_346.62%_17.05%_-343.25%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 201.64 107.21">
          <path d={svgPaths.p4eab00} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[98.79%_335.91%_-62.67%_-332.55%]" data-name="Vector">
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 201.64 107.21">
          <path d={svgPaths.p220a7880} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
      <p className="absolute font-['Krungthep:Regular',sans-serif] inset-[65.54%_2.13%_4.07%_2.02%] leading-[normal] not-italic text-[40px] text-white whitespace-nowrap">Currenzy</p>
      <Group />
    </div>
  );
}

export default function Component01Splash() {
  return (
    <div className="bg-[#0077e9] overflow-clip relative rounded-[16px] size-full" data-name="01 Splash">
      <Logo />
    </div>
  );
}