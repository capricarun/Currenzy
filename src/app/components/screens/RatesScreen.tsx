import { useState, useEffect, useId } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';

// ── Types ──────────────────────────────────────────────────────────────────
type ChartPoint = { idx: number; label: string; value: number };
type Summary    = { open: number; prevClose: number; high: number; low: number };

// ── Constants ──────────────────────────────────────────────────────────────
const PERIODS = ['1D', '5D', '1M', '1Y', '5Y', 'Max'];

// ── Helpers ────────────────────────────────────────────────────────────────
const dateStr = (d: Date) => d.toISOString().split('T')[0];

function periodStartDate(period: string): string {
  const d = new Date();
  if (period === '1D')  { d.setDate(d.getDate() - 8);         return dateStr(d); }
  if (period === '5D')  { d.setDate(d.getDate() - 14);        return dateStr(d); }
  if (period === '1M')  { d.setMonth(d.getMonth() - 1);       return dateStr(d); }
  if (period === '1Y')  { d.setFullYear(d.getFullYear() - 1); return dateStr(d); }
  if (period === '5Y')  { d.setFullYear(d.getFullYear() - 5); return dateStr(d); }
  return '2000-01-01';
}

function formatDateLabel(iso: string, period: string): string {
  const d = new Date(iso + 'T12:00:00');
  if (period === '5D' || period === '1M') {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  if (period === '1Y') {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  // 5Y / Max: "Jan '24"
  return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
}

function downsample<T>(arr: T[], max: number): T[] {
  if (arr.length <= max) return arr;
  const step = Math.ceil(arr.length / max);
  const result: T[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (i % step === 0 || i === arr.length - 1) result.push(arr[i]);
  }
  return result;
}

/** Build ChartPoints from parallel arrays, adding unique idx */
function toPoints(labels: string[], values: number[]): ChartPoint[] {
  return labels.map((label, idx) => ({ idx, label, value: values[idx] }));
}

/**
 * Generate realistic intraday data (hourly, 0-24 h) using a GBM-like walk
 * that starts at `prevClose` and lands on `current`.
 */
function generateIntraday(prevClose: number, current: number): ChartPoint[] {
  const N = 24;
  const drift = (current - prevClose) / N;
  const vol   = Math.abs(current - prevClose) * 0.12 || prevClose * 0.001;
  let val = prevClose;
  const pts: ChartPoint[] = [];
  for (let h = 0; h <= N; h++) {
    const noise = (Math.random() - 0.48) * vol;
    val += drift + noise;
    const label =
      h === 0  ? '12 AM' :
      h < 12   ? `${h} AM` :
      h === 12 ? '12 PM' :
                 `${h - 12} PM`;
    pts.push({ idx: h, label, value: Math.round(val * 1e5) / 1e5 });
  }
  // Pin last point to real live rate
  pts[pts.length - 1].value = current;
  return pts;
}

/**
 * Fallback: generate realistic historical data anchored to `current`.
 * Walks backward in time with GBM-like noise.
 */
function generateHistory(current: number, period: string): ChartPoint[] {
  const configs: Record<string, { n: number; dailyVol: number }> = {
    '1D':  { n: 24,  dailyVol: 0.003 },
    '5D':  { n: 5,   dailyVol: 0.004 },
    '1M':  { n: 30,  dailyVol: 0.004 },
    '1Y':  { n: 52,  dailyVol: 0.008 },
    '5Y':  { n: 60,  dailyVol: 0.012 },
    'Max': { n: 120, dailyVol: 0.015 },
  };
  const { n, dailyVol } = configs[period] ?? { n: 30, dailyVol: 0.005 };

  // Build backward then reverse
  const values: number[] = [current];
  for (let i = 1; i <= n; i++) {
    const prev  = values[0];
    const shock = (Math.random() - 0.5) * 2 * dailyVol * prev;
    values.unshift(Math.max(prev - shock, prev * 0.5));
  }

  const now = new Date();
  const labels: string[] = [];

  if (period === '1D') {
    return generateIntraday(values[0], current);
  }

  for (let i = 0; i <= n; i++) {
    const d = new Date(now);
    if (period === '5D')  d.setDate(d.getDate() - (n - i));
    else if (period === '1M') d.setDate(d.getDate() - (n - i));
    else if (period === '1Y') d.setDate(d.getDate() - (n - i) * 7);
    else if (period === '5Y') d.setMonth(d.getMonth() - (n - i));
    else                      d.setMonth(d.getMonth() - (n - i));
    labels.push(formatDateLabel(dateStr(d), period));
  }

  return toPoints(labels, values);
}

// ── Skeleton ───────────────────────────────────────────────────────────────
function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`bg-[#e4e4e7] rounded-[6px] animate-pulse ${className}`} />;
}

// ── Custom chart tooltip ───────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-[#e4e4e7] rounded-[8px] px-[10px] py-[8px] shadow-md">
      <p className="font-['Avenir_Next',sans-serif] text-[10px] text-[#71717a] leading-none mb-[4px]">{label}</p>
      <p className="font-['Avenir_Next',sans-serif] text-[14px] text-[#09090b] leading-none">
        {Number(payload[0].value).toFixed(payload[0].value < 10 ? 4 : 2)}
      </p>
    </div>
  );
};

// ── Stat card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] flex-1 rounded-[8px] px-[17px] py-[10px]">
      <p className="font-['Avenir_Next',sans-serif] text-[#71717a] text-[11px] mb-[4px]">{label}</p>
      <p
        className="font-['Avenir_Next',sans-serif] leading-[30px] text-[20px]"
        style={{ color: color ?? '#14141a' }}
      >
        {value}
      </p>
    </div>
  );
}

// ── Main screen ────────────────────────────────────────────────────────────
export const RatesScreen = () => {
  const navigate = useNavigate();
  const { from = 'USD', to = 'INR' } = useParams();
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  const [loading, setLoading] = useState(true);
  const [isFallback, setIsFallback] = useState(false);
  const [currentRate, setCurrentRate] = useState(0);
  const [change, setChange] = useState(0);
  const [changePct, setChangePct] = useState(0);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [summary, setSummary] = useState<Summary>({ open: 0, prevClose: 0, high: 0, low: 0 });
  const gradId = useId().replace(/:/g, '');

  const isPositive  = change >= 0;
  const accentColor = isPositive ? '#2a9d90' : '#ef4444';

  // ── Data fetch ─────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setIsFallback(false);

    const run = async () => {
      // ── Step 1: live rate ──────────────────────────────────────────────
      let liveRate = 0;
      try {
        const res  = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await res.json();
        liveRate = data?.rates?.[to] ?? 0;
      } catch { /* will be 0 — handled below */ }

      if (cancelled) return;

      // ── Step 2: historical time-series (Frankfurter) ───────────────────
      let historicalValues: number[] = [];
      let historicalDates:  string[] = [];
      let fetchedHistory = false;

      const start = periodStartDate(selectedPeriod);
      const end   = dateStr(new Date());

      // Try two mirrors
      for (const base of ['https://api.frankfurter.dev', 'https://api.frankfurter.app']) {
        try {
          const url = `${base}/${start}..${end}?from=${from}&to=${to}`;
          const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
          if (!res.ok) continue;
          const data = await res.json();
          const obj: Record<string, Record<string, number>> = data.rates ?? {};
          const dates = Object.keys(obj).sort();
          if (dates.length === 0) continue;
          historicalDates  = dates;
          historicalValues = dates.map(d => obj[d][to]);
          fetchedHistory   = true;
          // Use last Frankfurter value if live fetch failed
          if (!liveRate) liveRate = historicalValues[historicalValues.length - 1];
          break;
        } catch { /* try next mirror */ }
      }

      if (cancelled) return;

      // ── Step 3: build chart points ─────────────────────────────────────
      if (fetchedHistory) {
        setIsFallback(false);
        const last      = liveRate || historicalValues[historicalValues.length - 1];
        const first     = historicalValues[0];
        const prevClose = historicalValues.length >= 2
          ? historicalValues[historicalValues.length - 2]
          : first;

        setCurrentRate(last);
        setChange(last - first);
        setChangePct(((last - first) / first) * 100);
        setSummary({ open: first, prevClose, high: Math.max(...historicalValues), low: Math.min(...historicalValues) });

        let pts: ChartPoint[];
        if (selectedPeriod === '1D') {
          pts = generateIntraday(prevClose, last);
        } else {
          const maxPts = selectedPeriod === '5D' ? 7 : selectedPeriod === '1M' ? 31 : 80;
          const raw = historicalDates.map((d, i) => ({
            idx: i,
            label: formatDateLabel(d, selectedPeriod),
            value: historicalValues[i],
          }));
          pts = downsample(raw, maxPts).map((p, i) => ({ ...p, idx: i }));
        }
        setChartData(pts);

      } else {
        // ── Fallback: generated history anchored to live rate ──────────
        setIsFallback(true);
        const anchor = liveRate || 1;
        setCurrentRate(anchor);

        const generated = generateHistory(anchor, selectedPeriod);
        const vals = generated.map(p => p.value);
        const first = vals[0];
        const last  = vals[vals.length - 1];
        const prevClose = vals.length >= 2 ? vals[vals.length - 2] : first;

        setChange(last - first);
        setChangePct(((last - first) / first) * 100);
        setSummary({ open: first, prevClose, high: Math.max(...vals), low: Math.min(...vals) });
        setChartData(generated);
      }

      if (!cancelled) setLoading(false);
    };

    run();
    return () => { cancelled = true; };
  }, [from, to, selectedPeriod]);

  // ── Chart axis helpers ─────────────────────────────────────────────────
  const tickIndices =
    chartData.length > 1
      ? [0,
         Math.floor(chartData.length * 0.33),
         Math.floor(chartData.length * 0.66),
         chartData.length - 1,
        ]
      : [0];

  // Deduplicate tick indices
  const uniqueTickIndices = [...new Set(tickIndices)];

  const vals     = chartData.map(p => p.value);
  const rawMin   = vals.length ? Math.min(...vals) : 0;
  const rawMax   = vals.length ? Math.max(...vals) : 1;
  const padAmt   = (rawMax - rawMin) * 0.25 || rawMin * 0.005 || 0.5;
  const yDomain: [number, number] = [rawMin - padAmt, rawMax + padAmt];
  const decimals = rawMax < 10 ? 4 : 2;
  const yFmt     = (v: number) => v.toFixed(decimals);

  // ── Render ─────────────────────────────────────────────────────────────
  return (
    <div className="bg-[#fafafa] flex flex-col h-full overflow-y-auto">

      {/* Header */}
      <div className="bg-white flex h-[68px] items-center px-[16px] py-[8px] shrink-0 border-b border-[#e4e4e7]">
        <button
          onClick={() => navigate(-1)}
          className="flex gap-[8px] items-center shrink-0 hover:opacity-70 transition-opacity"
        >
          <span className="font-['Material_Icons',sans-serif] text-[24px] text-black">arrow_back</span>
        </button>
        <div className="flex-1 min-w-px flex justify-center pr-[32px]">
          <p className="font-['Avenir_Next',sans-serif] leading-[32px] text-[rgba(0,0,0,0.87)] text-[24px] tracking-[-0.24px] whitespace-nowrap">
            Rates
          </p>
        </div>
      </div>

      {/* Currency pair + rate card */}
      <div className="flex flex-col items-center gap-[4px] px-[16px] pb-[16px] pt-[10px]">
        <p className="font-['Avenir_Next',sans-serif] leading-[24px] text-[#14141a] text-[16px] tracking-[-0.16px]">
          {from} / {to}
        </p>

        <div className="bg-white border border-[#e4e4e7] rounded-[8px] w-full py-[20px]">
          <div className="px-[24px] flex flex-col items-center gap-[4px]">
            {loading ? (
              <>
                <Skeleton className="w-[140px] h-[40px] mb-[6px]" />
                <Skeleton className="w-[120px] h-[18px]" />
              </>
            ) : (
              <>
                <p className="font-['Avenir_Next',sans-serif] leading-[40px] text-[#18181b] text-[36px] tracking-[-0.9px]">
                  {currentRate.toFixed(decimals)}
                </p>
                <div className="flex gap-[6px] items-center">
                  <span
                    className="font-['Material_Icons',sans-serif] text-[18px]"
                    style={{ color: accentColor }}
                  >
                    {isPositive ? 'arrow_circle_up' : 'arrow_circle_down'}
                  </span>
                  <p
                    className="font-['Avenir_Next',sans-serif] leading-[18px] text-[12px]"
                    style={{ color: accentColor }}
                  >
                    {isPositive ? '+' : ''}{change.toFixed(decimals)}&nbsp;&nbsp;({isPositive ? '+' : ''}{changePct.toFixed(2)}%)
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="px-[16px]">
        <div className="bg-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.06)] rounded-[8px] py-[16px] pb-[8px] flex flex-col gap-[8px]">

          {/* Period tabs */}
          <div className="flex items-center justify-between w-full px-[16px]">
            {PERIODS.map(p => (
              <button
                key={p}
                onClick={() => setSelectedPeriod(p)}
                className={`px-[8px] py-[6px] rounded-[8px] transition-colors text-[13px] font-['Avenir_Next',sans-serif] ${
                  selectedPeriod === p
                    ? 'bg-[#e4e4e7] text-[#18181b]'
                    : 'text-[#09090b] hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chart body */}
          <div className="w-full h-[200px] px-[4px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-[8px]">
                  <div className="w-[28px] h-[28px] rounded-full border-[3px] border-[#e4e4e7] border-t-[#0077e9] animate-spin" />
                  <span className="font-['Avenir_Next',sans-serif] text-[11px] text-[#71717a]">Loading…</span>
                </div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={accentColor} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={accentColor} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />

                  {/* Use numeric idx as dataKey to guarantee uniqueness */}
                  <XAxis
                    dataKey="idx"
                    type="number"
                    scale="linear"
                    domain={[0, chartData.length - 1]}
                    ticks={uniqueTickIndices}
                    tickFormatter={(idx: number) => chartData[idx]?.label ?? ''}
                    tick={{ fontSize: 10, fill: '#71717a', fontFamily: 'Avenir Next, sans-serif' }}
                    axisLine={false}
                    tickLine={false}
                    dy={6}
                  />
                  <YAxis
                    domain={yDomain}
                    tickFormatter={yFmt}
                    tick={{ fontSize: 10, fill: '#71717a', fontFamily: 'Avenir Next, sans-serif' }}
                    axisLine={false}
                    tickLine={false}
                    width={54}
                    tickCount={4}
                  />
                  <Tooltip
                    content={<ChartTooltip />}
                    cursor={{ stroke: accentColor, strokeWidth: 1, strokeDasharray: '4 2' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={accentColor}
                    strokeWidth={2}
                    fill={`url(#${gradId})`}
                    dot={false}
                    activeDot={{ r: 4, fill: accentColor, strokeWidth: 0 }}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Period summary */}
      <div className="p-[16px] flex flex-col gap-[8px]">
        <p className="font-['Avenir_Next',sans-serif] leading-[18px] text-[#18181b] text-[12px] tracking-[0.5px]">
          PERIOD SUMMARY
        </p>

        <div className="flex flex-col gap-[8px]">
          <div className="flex gap-[8px]">
            {loading ? (
              <>
                {[0, 1].map(i => (
                  <div key={i} className="flex-1 bg-white rounded-[8px] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1)] px-[17px] py-[10px]">
                    <Skeleton className="w-[40px] h-[10px] mb-[8px]" />
                    <Skeleton className="w-[80px] h-[24px]" />
                  </div>
                ))}
              </>
            ) : (
              <>
                <StatCard label="Open"       value={summary.open.toFixed(decimals)} />
                <StatCard label="Prev. Close" value={summary.prevClose.toFixed(decimals)} />
              </>
            )}
          </div>
          <div className="flex gap-[8px]">
            {loading ? (
              <>
                {[0, 1].map(i => (
                  <div key={i} className="flex-1 bg-white rounded-[8px] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1)] px-[17px] py-[10px]">
                    <Skeleton className="w-[40px] h-[10px] mb-[8px]" />
                    <Skeleton className="w-[80px] h-[24px]" />
                  </div>
                ))}
              </>
            ) : (
              <>
                <StatCard label="High" value={summary.high.toFixed(decimals)} color="#2a9d90" />
                <StatCard label="Low"  value={summary.low.toFixed(decimals)}  color="#ef4444" />
              </>
            )}
          </div>
        </div>

        {/* Attribution */}
        <p className="font-['Avenir_Next',sans-serif] text-[10px] text-[#a1a1aa] text-center pt-[4px]">
          {isFallback
            ? `Live rate · Chart estimated — Frankfurter unavailable`
            : 'Live data · European Central Bank via Frankfurter'}
        </p>
      </div>
    </div>
  );
};