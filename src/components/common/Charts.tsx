import React, { useState } from 'react';

// Common bar chart data point
export interface BarDatum {
  label: string;
  value: number;
  secondaryValue?: number;
  color?: string;
  secondaryColor?: string;
}

interface BarChartProps {
  data: BarDatum[];
  title?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  height?: number;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  valuePrefix = '',
  valueSuffix = '',
  primaryLabel = 'Primary',
  secondaryLabel,
  height = 200
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxValue = Math.max(
    ...data.map(d => Math.max(d.value, d.secondaryValue || 0)),
    1
  );

  return (
    <div className="w-full">
      {/* Header & Legend */}
      <div className="flex items-center justify-between mb-3">
        {title && <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{title}</h4>}
        <div className="flex items-center space-x-3 text-[11px] text-slate-500">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-teal-500 inline-block" />
            <span>{primaryLabel}</span>
          </div>
          {secondaryLabel && (
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" />
              <span>{secondaryLabel}</span>
            </div>
          )}
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden" style={{ height: `${height}px` }}>
        <svg
          className="w-full h-full overflow-visible"
          viewBox={`0 0 ${data.length * 60 + 20} ${height}`}
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = height - pct * (height - 30) - 20;
            return (
              <line
                key={i}
                x1="0"
                y1={y}
                x2="100%"
                y2={y}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Bars */}
          {data.map((d, i) => {
            const slotWidth = 60;
            const x = i * slotWidth + 25;
            const barWidth = d.secondaryValue !== undefined ? 14 : 24;
            const primaryH = (d.value / maxValue) * (height - 40);
            const primaryY = height - primaryH - 22;

            const secH = d.secondaryValue !== undefined ? (d.secondaryValue / maxValue) * (height - 40) : 0;
            const secY = height - secH - 22;

            const isHovered = hoveredIdx === i;

            return (
              <g
                key={i}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer group"
              >
                {/* Primary Bar */}
                <rect
                  x={d.secondaryValue !== undefined ? x - 8 : x - 12}
                  y={primaryY}
                  width={barWidth}
                  height={Math.max(primaryH, 2)}
                  rx="4"
                  className={`transition-all duration-200 ${
                    d.color || (isHovered ? 'fill-teal-400' : 'fill-teal-600 dark:fill-teal-500')
                  }`}
                />

                {/* Secondary Bar if exists */}
                {d.secondaryValue !== undefined && (
                  <rect
                    x={x + 8}
                    y={secY}
                    width={barWidth}
                    height={Math.max(secH, 2)}
                    rx="4"
                    className={`transition-all duration-200 ${
                      d.secondaryColor || (isHovered ? 'fill-amber-400' : 'fill-amber-500 dark:fill-amber-400')
                    }`}
                  />
                )}

                {/* X Axis Label */}
                <text
                  x={x}
                  y={height - 5}
                  textAnchor="middle"
                  className="text-[10px] fill-slate-500 dark:fill-slate-400 font-sans"
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredIdx !== null && data[hoveredIdx] && (
          <div
            className="absolute -top-1 pointer-events-none transform -translate-x-1/2 bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded-md shadow-xl border border-slate-700 z-10 transition-all font-mono"
            style={{
              left: `${((hoveredIdx + 0.5) / data.length) * 100}%`
            }}
          >
            <div className="font-sans font-semibold text-teal-300">{data[hoveredIdx].label}</div>
            <div>
              {primaryLabel}: {valuePrefix}{data[hoveredIdx].value.toLocaleString()}{valueSuffix}
            </div>
            {data[hoveredIdx].secondaryValue !== undefined && (
              <div className="text-amber-300">
                {secondaryLabel}: {valuePrefix}{data[hoveredIdx].secondaryValue?.toLocaleString()}{valueSuffix}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export interface LinePoint {
  label: string;
  value: number;
  secondaryValue?: number;
}

interface LineAreaChartProps {
  data: LinePoint[];
  title?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  height?: number;
}

export const LineAreaChart: React.FC<LineAreaChartProps> = ({
  data,
  title,
  valuePrefix = '',
  valueSuffix = '',
  primaryLabel = 'Primary',
  secondaryLabel,
  height = 200
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const maxValue = Math.max(
    ...data.map(d => Math.max(d.value, d.secondaryValue || 0)),
    1
  );
  const minValue = 0;

  const w = 500;
  const paddingX = 30;
  const paddingY = 25;
  const chartW = w - paddingX * 2;
  const chartH = height - paddingY * 2;

  const getPoints = (isSecondary = false) => {
    return data.map((d, i) => {
      const x = paddingX + (i / Math.max(data.length - 1, 1)) * chartW;
      const val = isSecondary ? (d.secondaryValue ?? 0) : d.value;
      const y = paddingY + chartH - ((val - minValue) / (maxValue - minValue)) * chartH;
      return { x, y, val, label: d.label };
    });
  };

  const primaryPoints = getPoints(false);
  const secondaryPoints = secondaryLabel ? getPoints(true) : [];

  const linePath = primaryPoints.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');
  const areaPath = `${linePath} L ${primaryPoints[primaryPoints.length - 1].x} ${height - paddingY} L ${primaryPoints[0].x} ${height - paddingY} Z`;

  const secLinePath = secondaryPoints.reduce((acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`, '');

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        {title && <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{title}</h4>}
        <div className="flex items-center space-x-3 text-[11px] text-slate-500">
          <div className="flex items-center space-x-1.5">
            <span className="w-2.5 h-1 rounded-sm bg-teal-500 inline-block" />
            <span>{primaryLabel}</span>
          </div>
          {secondaryLabel && (
            <div className="flex items-center space-x-1.5">
              <span className="w-2.5 h-1 rounded-sm bg-indigo-500 inline-block" />
              <span>{secondaryLabel}</span>
            </div>
          )}
        </div>
      </div>

      <div className="relative w-full" style={{ height: `${height}px` }}>
        <svg
          className="w-full h-full overflow-visible"
          viewBox={`0 0 ${w} ${height}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.33, 0.66, 1].map((pct, i) => {
            const y = paddingY + chartH * (1 - pct);
            return (
              <line
                key={i}
                x1={paddingX}
                y1={y}
                x2={w - paddingX}
                y2={y}
                stroke="currentColor"
                className="text-slate-200 dark:text-slate-800"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Shaded Area */}
          <path d={areaPath} fill="url(#areaGradient)" />

          {/* Primary Trend Line */}
          <path d={linePath} fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />

          {/* Secondary Trend Line if present */}
          {secondaryLabel && (
            <path d={secLinePath} fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
          )}

          {/* Data Points */}
          {primaryPoints.map((pt, i) => (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={hoveredIdx === i ? 6 : 4}
              className={`transition-all ${hoveredIdx === i ? 'fill-teal-300 stroke-teal-700 stroke-2' : 'fill-teal-500'}`}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            />
          ))}

          {/* X Labels */}
          {primaryPoints.map((pt, i) => (
            <text
              key={i}
              x={pt.x}
              y={height - 5}
              textAnchor="middle"
              className="text-[10px] fill-slate-500 dark:fill-slate-400 font-sans"
            >
              {pt.label}
            </text>
          ))}
        </svg>

        {hoveredIdx !== null && data[hoveredIdx] && (
          <div
            className="absolute -top-1 pointer-events-none transform -translate-x-1/2 bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded-md shadow-xl border border-slate-700 z-10 transition-all font-mono"
            style={{
              left: `${(hoveredIdx / (data.length - 1)) * 80 + 10}%`
            }}
          >
            <div className="font-sans font-semibold text-teal-300">{data[hoveredIdx].label}</div>
            <div>
              {primaryLabel}: {valuePrefix}{data[hoveredIdx].value.toLocaleString()}{valueSuffix}
            </div>
            {data[hoveredIdx].secondaryValue !== undefined && (
              <div className="text-indigo-300">
                {secondaryLabel}: {valuePrefix}{data[hoveredIdx].secondaryValue?.toLocaleString()}{valueSuffix}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
