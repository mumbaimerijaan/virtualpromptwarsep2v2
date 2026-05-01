import React, { memo } from 'react';
import { Bot } from 'lucide-react';

export const FloatingAssistant = memo(({ onClick }) => (
  <div className="fixed bottom-6 left-0 right-0 mx-auto w-full md:w-[60%] pointer-events-none z-40">
    <div className="absolute right-6 bottom-0">
      <button 
        onClick={onClick}
        role="button"
        aria-label="Ask our AI assistant for help"
        className="pointer-events-auto bg-[#303F9F] hover:bg-[#283593] text-white rounded-[32px] shadow-[0_8px_20px_rgba(48,63,159,0.3)] p-2.5 pr-6 flex items-center gap-3 transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
      >
        <div className="bg-white text-[#303F9F] p-2 rounded-full shadow-sm" aria-hidden="true">
          <Bot size={22} />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-bold text-[13px] leading-none mb-1">Need help?</span>
          <span className="text-[11px] text-indigo-100 leading-none">Ask our assistant</span>
        </div>
      </button>
    </div>
  </div>
));
