import React from 'react';
import { ConversionData, GroundingSource } from '../types';
import { ArrowRight, ExternalLink, Info } from 'lucide-react';
import TrendChart from './TrendChart';

interface ResultDisplayProps {
  data: ConversionData;
  sources: GroundingSource[];
  from: string;
  to: string;
  amount: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  data,
  sources,
  from,
  to,
  amount,
}) => {
  return (
    <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Main Conversion Result */}
      <div className="bg-slate-700/30 rounded-2xl p-6 border border-slate-600/50">
        <div className="flex flex-col gap-1">
          <span className="text-slate-400 text-sm font-medium">
            {amount} {from} =
          </span>
          <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight flex flex-wrap items-baseline gap-2">
            {data.convertedAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            <span className="text-2xl sm:text-3xl text-emerald-400">
              {to}
            </span>
          </div>
          <div className="text-sm text-slate-400 mt-2 flex items-center gap-2">
            <span className="bg-slate-700/50 px-2 py-1 rounded text-xs">
              1 {from} = {data.rate} {to}
            </span>
            <span className="text-xs opacity-60">
              Updated: {new Date(data.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>

        {/* AI Explanation */}
        <div className="mt-4 pt-4 border-t border-slate-600/30 flex gap-3">
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-slate-300 leading-relaxed">
            {data.explanation}
          </p>
        </div>
      </div>

      {/* Trend Chart */}
      {data.trend && data.trend.length > 0 && (
        <TrendChart data={data.trend} />
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Verified Sources
          </p>
          <div className="flex flex-wrap gap-2">
            {sources.map((source, index) => (
              source.web && (
                <a
                  key={index}
                  href={source.web.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition-colors text-xs text-slate-400 hover:text-blue-300 truncate max-w-[200px]"
                >
                  <span className="truncate">{source.web.title}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;
