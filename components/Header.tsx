import React from 'react';
import { RefreshCcw, Coins } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <div className="flex justify-center items-center gap-3 mb-2">
        <div className="bg-accent/20 p-3 rounded-full">
          <Coins className="w-8 h-8 text-accent" />
        </div>
      </div>
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
        CurrencyAI
      </h1>
      <p className="text-slate-400 mt-2 text-sm">
        Real-time rates & trends powered by Gemini
      </p>
    </header>
  );
};

export default Header;
