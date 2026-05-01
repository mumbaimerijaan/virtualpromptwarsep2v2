import React, { memo } from 'react';
import { Menu, Globe, ChevronRight, UserPlus, Search, Edit3, CheckSquare, BookOpen, MessageSquare, ShieldCheck, Megaphone, Bot, Clock, ShieldAlert, Fingerprint, Home as HomeIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../lib/routes';
import logoImg from '../assets/logo.png';
import heroImg from '../assets/hero.png';

export const ActionItem = memo(({ icon: Icon, title, iconColorClass, iconBgClass, hasBorder = true, onClick }) => {
  return (
    <button 
      onClick={onClick}
      role="link"
      aria-label={`Navigate to ${title}`}
      className={`w-full flex items-center justify-between py-4 px-5 bg-white transition-all duration-200 hover:bg-slate-50 focus:outline-none focus:bg-slate-50 ${hasBorder ? 'border-b border-slate-100' : ''}`}
    >
      <div className="flex items-center gap-4">
        <div className={`p-2 rounded-full ${iconBgClass} ${iconColorClass}`} aria-hidden="true">
          <Icon size={20} strokeWidth={2.5} />
        </div>
        <span className="font-semibold text-slate-800 text-[15px]">
          {title}
        </span>
      </div>
      <ChevronRight size={18} className="text-slate-400" aria-hidden="true" />
    </button>
  );
});

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === ROUTES.HOME;

  return (
    <header className="w-full flex justify-between items-center py-5">
      <div className="w-10"> {/* Placeholder to keep language button on right if home is hidden */}
        {!isHomePage && (
          <button 
            aria-label="Go to Home" 
            onClick={() => navigate(ROUTES.HOME)}
            className="p-1 -ml-1 text-slate-800 focus:outline-none hover:text-indigo-600 transition-colors"
          >
            <HomeIcon size={26} strokeWidth={2} />
          </button>
        )}
      </div>
      
      <button aria-label="Select language. Currently English" className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-full hover:bg-slate-50 focus:outline-none">
        <Globe size={16} className="text-slate-600" />
        <span className="font-medium text-[13px] text-slate-700">English</span>
        <ChevronRight size={14} className="text-slate-400" />
      </button>
    </header>
  );
};

import sparkImg from '../assets/spark.png';

export const Hero = () => {
  return (
    <div className="relative pt-2 pb-6">
      {/* Brand & Illustration area */}
      <div className="flex justify-between items-start mb-10">
        <div className="flex gap-3 items-center z-10">
          <div className="w-14 h-14 overflow-hidden flex items-center justify-center flex-shrink-0">
            <img src={logoImg} alt="Matdaan Saathi Logo" className="w-[100%] h-[100%] object-contain" onError={(e) => e.target.style.display='none'} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1A237E] leading-tight">Matdaan</h1>
            <h1 className="text-xl font-bold text-emerald-500 leading-tight">Saathi</h1>
            <p className="text-[10px] text-slate-400 mt-0.5 font-medium tracking-wide">Har mat. Desh ke saath.</p>
          </div>
        </div>
        <div className="absolute right-[-20px] top-[10px] w-[50%] h-32 pointer-events-none z-0">
          <img src={heroImg} alt="" className="w-full h-full object-contain object-right" aria-hidden="true" onError={(e) => e.target.style.display='none'} />
        </div>
      </div>

      {/* Main Intent text */}
      <div className="text-center relative mt-4">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-[32px] font-bold text-[#1A237E] tracking-tight">
            I want to<span className="text-emerald-500 tracking-normal">...</span>
          </h2>
          <img src={sparkImg} alt="" className="w-5 h-5 -mt-6" aria-hidden="true" />
        </div>
        <p className="text-slate-500 max-w-[240px] mx-auto text-[14px] leading-snug mt-2">
          Tell us what you need and we'll guide you step by step.
        </p>
      </div>
    </div>
  );
};

export const ActionCardList = ({ onAction }) => {
  return (
    <div className="bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden mt-6 mb-4">
      <ActionItem 
        icon={UserPlus} 
        title="Register as a voter" 
        iconColorClass="text-emerald-600"
        iconBgClass="bg-emerald-50"
        onClick={() => onAction('register')}
      />
      <ActionItem 
        icon={Search} 
        title="Check my name in voter list" 
        iconColorClass="text-blue-500"
        iconBgClass="bg-blue-50"
        onClick={() => onAction('check_name')}
      />
      <ActionItem 
        icon={Edit3} 
        title="Update / correct my details" 
        iconColorClass="text-orange-500"
        iconBgClass="bg-orange-50"
        onClick={() => onAction('update_details')}
      />
      <ActionItem 
        icon={CheckSquare} 
        title="I want to vote (voting process)" 
        iconColorClass="text-indigo-600"
        iconBgClass="bg-indigo-50"
        onClick={() => onAction('voting_process')}
      />
      <ActionItem 
        icon={Clock} 
        title="Track my application status" 
        iconColorClass="text-amber-500"
        iconBgClass="bg-amber-50"
        hasBorder={false}
        onClick={() => onAction('track_status')}
      />
      <ActionItem 
        icon={BookOpen} 
        title="Understand elections" 
        iconColorClass="text-red-500"
        iconBgClass="bg-red-50"
        onClick={() => onAction('understand_elections')}
      />
      
      <div className="p-3 bg-white">
        <button 
          onClick={() => onAction('intent_input')}
          className="w-full flex items-center justify-between p-4 bg-[#F4F6FF] rounded-2xl border border-indigo-100 hover:bg-[#EEF2FF] transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-full text-indigo-600 shadow-sm">
              <MessageSquare size={20} strokeWidth={2.5} aria-hidden="true" />
            </div>
            <div className="flex flex-col items-start text-left">
              <span className="font-bold text-indigo-900 text-[15px]">
                Type what you need
              </span>
              <span className="text-[12px] text-slate-500 mt-0.5">Describe your question or requirement</span>
            </div>
          </div>
          <ChevronRight size={18} className="text-indigo-400" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export const TrustBadge = () => (
  <div className="flex items-center justify-center gap-2 py-4">
    <ShieldCheck size={16} className="text-emerald-500" aria-hidden="true" />
    <span className="text-[13px] font-medium text-slate-600">Your data is private and secure with us.</span>
  </div>
);

export const UpdatesCard = ({ onClick }) => (
  <div className="bg-[#F0FDF4] rounded-2xl p-4 mb-24">
    <div className="flex gap-4 items-start">
      <div className="p-2.5 bg-white rounded-full text-emerald-500 shadow-sm flex-shrink-0">
        <Megaphone size={20} aria-hidden="true" />
      </div>
      <div className="flex-1 pt-1">
        <h3 className="text-[12px] font-bold text-emerald-600 uppercase tracking-wide mb-1">Latest Updates</h3>
        <p className="text-slate-800 font-bold text-[14px]">General Elections 2024 – Phase 3</p>
        <p className="text-slate-500 text-[13px] mt-0.5">Voting on 07 May 2024</p>
        
        <div className="mt-4 flex justify-end">
          <button 
            onClick={onClick}
            className="flex items-center gap-1 text-[13px] font-bold text-emerald-600 border border-emerald-200 bg-white rounded-full px-4 py-1.5 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            View all updates <ChevronRight size={14} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const EvaluationCard = ({ onClick }) => (
  <div className="bg-indigo-50 border border-indigo-100 rounded-[32px] p-6 mb-10 relative overflow-hidden group transition-all hover:shadow-lg hover:shadow-indigo-500/5">
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm">
          <ShieldAlert size={20} />
        </div>
        <h3 className="font-bold text-indigo-900 text-[16px]">Election Process Evaluation</h3>
      </div>
      <p className="text-[13px] text-indigo-900/60 font-medium leading-relaxed mb-6 max-w-[240px]">
        Help us improve the democratic experience by sharing feedback on your voting journey.
      </p>
      <button 
        onClick={onClick}
        className="w-full bg-white text-indigo-600 py-3.5 rounded-2xl font-bold text-[14px] shadow-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 border border-indigo-100/50"
      >
        Report Friction / Give Feedback <ChevronRight size={16} />
      </button>
    </div>
    {/* Abstract background deco */}
    <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
      <Fingerprint size={120} className="text-indigo-900" />
    </div>
  </div>
);

export const Footer = () => (
  <footer className="py-6 flex items-center justify-center gap-3 border-t border-slate-100 mt-auto bg-[#F8FAFC]">
    <div className="w-8 h-10 flex items-center justify-center opacity-80 mix-blend-multiply">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="Emblem of India" className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'} />
    </div>
    <div className="h-6 w-px bg-slate-300"></div>
    <p className="text-[11px] font-medium text-slate-500">
      An initiative of Election Commission of India
    </p>
  </footer>
);

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
export { BottomNav } from './BottomNav'; 
