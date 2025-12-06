import React from 'react';
import Header from './components/Header';
import Converter from './components/Converter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 selection:bg-blue-500/30">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[128px]" />
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 px-4 py-12 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center">
        <Header />
        
        <main className="w-full">
          <Converter />
        </main>

        <footer className="mt-16 text-center text-slate-500 text-sm">
          <p>
            Rates are provided for informational purposes only. <br className="hidden sm:inline" /> 
            Always verify with your financial institution before transacting.
          </p>
          <div className="mt-4 flex justify-center gap-4 opacity-50">
             <span>•</span> <span>Powered by Google Gemini</span> <span>•</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
