import React, { useState, useCallback } from 'react';
import { ArrowRightLeft, Loader2, Search } from 'lucide-react';
import { POPULAR_CURRENCIES } from '../constants';
import { convertCurrency } from '../services/geminiService';
import { ConversionState } from '../types';
import ResultDisplay from './ResultDisplay';

const Converter: React.FC = () => {
  const [amount, setAmount] = useState<string>('1');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  
  const [state, setState] = useState<ConversionState>({
    loading: false,
    data: null,
    error: null,
    sources: []
  });

  const handleSwap = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    // Optional: Auto-refresh on swap if data exists
    // But better to let user click convert to avoid API spam
    setState(prev => ({ ...prev, data: null, error: null, sources: [] }));
  }, [fromCurrency, toCurrency]);

  const handleConvert = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const { data, sources } = await convertCurrency(
        Number(amount),
        fromCurrency,
        toCurrency
      );
      setState({
        loading: false,
        data,
        error: null,
        sources
      });
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: "Failed to fetch exchange rate. Please try again."
      }));
    }
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleConvert} className="glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Background Accent Blur */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-6 relative z-10">
          
          {/* Amount Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
              Amount
            </label>
            <div className="relative group">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                step="any"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-4 text-2xl font-bold text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-transparent transition-all"
                placeholder="0.00"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium pointer-events-none">
                {fromCurrency}
              </span>
            </div>
          </div>

          {/* Currency Selection Grid */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
            {/* From */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                From
              </label>
              <div className="relative">
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-8 text-white font-medium focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer hover:bg-slate-750 transition-colors"
                >
                  {POPULAR_CURRENCIES.map((c) => (
                    <option key={`from-${c.code}`} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <button
              type="button"
              onClick={handleSwap}
              className="mb-[2px] p-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 hover:border-slate-600 transition-all hover:scale-105 active:scale-95 group"
              aria-label="Swap currencies"
            >
              <ArrowRightLeft className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
            </button>

            {/* To */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">
                To
              </label>
              <div className="relative">
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-8 text-white font-medium focus:outline-none focus:ring-2 focus:ring-accent/50 cursor-pointer hover:bg-slate-750 transition-colors"
                >
                  {POPULAR_CURRENCIES.map((c) => (
                    <option key={`to-${c.code}`} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            disabled={state.loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {state.loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Converting...</span>
              </>
            ) : (
              <>
                <span>Convert Now</span>
                <ArrowRightLeft className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {state.error && (
        <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 text-sm flex items-center gap-2 animate-in fade-in">
           <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
           {state.error}
        </div>
      )}

      {/* Results */}
      {state.data && (
        <ResultDisplay 
          data={state.data} 
          sources={state.sources}
          from={fromCurrency}
          to={toCurrency}
          amount={Number(amount)}
        />
      )}
    </div>
  );
};

export default Converter;
