import React from 'react';
import { 
  FileText, 
  Phone, 
  ChevronRight, 
  ShieldCheck, 
  MessageCircle, 
  Clock, 
  AlertCircle, 
  ExternalLink,
  CheckCircle2,
  XCircle,
  Calendar,
  HelpCircle
} from 'lucide-react';
import statusHeroImg from '../assets/status-hero.png';

export const StatusPage = () => {
  return (
    <main id="main-content" className="flex-1 flex flex-col bg-[#F9FAFB] pb-32 relative overflow-x-hidden">
      
      {/* Header section with Hero */}
      <div className="px-5 pt-8 pb-6 relative overflow-hidden">
        <div className="w-[60%] relative z-10">
          <h1 className="text-[32px] font-extrabold text-[#1A237E] leading-[1.1] tracking-tight">
            Track Your<br/>
            Application Status
          </h1>
          <p className="text-[14px] text-slate-500 mt-3 max-w-[220px] leading-relaxed font-medium">
            Check the progress of your voter application easily.
          </p>
        </div>
        
        {/* Right Illustration */}
        <div className="absolute top-0 right-[-20px] w-[50%] h-[120%] pointer-events-none z-0">
          <img 
            src={statusHeroImg} 
            alt="Status Illustration" 
            className="w-full h-full object-contain object-right-top" 
          />
        </div>
      </div>

      <div className="px-5 flex flex-col gap-6 relative z-10">
        
        {/* Tracking Options */}
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-[17px] text-slate-800 tracking-tight">How do you want to track?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Reference Number Card */}
            <div className="bg-[#F0FDF4] border border-emerald-100 p-5 rounded-[24px] flex flex-col shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-emerald-900 text-[15px]">By Reference Number</h3>
                  <p className="text-[12px] text-emerald-700/70 font-medium">Enter your application / reference ID</p>
                </div>
              </div>
              
              <a 
                href="https://voters.eci.gov.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#146A4A] text-white font-bold text-[15px] rounded-2xl flex items-center justify-center gap-2 hover:bg-[#0f543a] transition-all active:scale-[0.98] shadow-lg shadow-emerald-900/10"
              >
                Track Status <ChevronRight size={18} />
              </a>
              
              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] font-bold text-emerald-700/60 uppercase tracking-wider">
                <span className="flex items-center gap-1"><ShieldCheck size={12} /> Secure</span>
                <span>•</span>
                <span>Official</span>
                <span>•</span>
                <span>Easy</span>
              </div>
            </div>

            {/* Mobile Number Card */}
            <div className="bg-[#F5F3FF] border border-purple-100 p-5 rounded-[24px] flex flex-col shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-purple-900 text-[15px]">By Mobile Number</h3>
                  <p className="text-[12px] text-purple-700/70 font-medium">Use your registered mobile number</p>
                </div>
              </div>
              
              <a 
                href="https://voters.eci.gov.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 bg-[#6366F1] text-white font-bold text-[15px] rounded-2xl flex items-center justify-center gap-2 hover:bg-[#4f46e5] transition-all active:scale-[0.98] shadow-lg shadow-indigo-900/10"
              >
                Track via Mobile <ChevronRight size={18} />
              </a>
              
              <div className="mt-4 flex items-center justify-center gap-4 text-[11px] font-bold text-purple-700/60 uppercase tracking-wider">
                <span className="flex items-center gap-1"><ShieldCheck size={12} /> Secure</span>
                <span>•</span>
                <span>Official</span>
                <span>•</span>
                <span>Easy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Status Tracker Box */}
        <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm">
          <h3 className="font-bold text-[16px] text-slate-800 mb-8">Application Status Tracker</h3>
          
          <div className="relative px-2">
            {/* Dashed background line */}
            <div className="absolute top-6 left-8 right-8 h-0 border-t-2 border-dashed border-slate-200 z-0"></div>
            
            <div className="relative z-10 flex justify-between items-start">
              {[
                { label: 'Submitted', desc: 'Application received', color: 'bg-amber-400', icon: FileText },
                { label: 'Under Verification', desc: 'BLO is verifying your details', color: 'bg-blue-500', icon: ShieldCheck },
                { label: 'Approved', desc: 'Name added to voter list', color: 'bg-emerald-500', icon: CheckCircle2 },
                { label: 'Rejected', desc: 'Issue found (check reason)', color: 'bg-red-500', icon: XCircle },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center w-1/4">
                  <div className={`w-12 h-12 rounded-full ${step.color} text-white flex items-center justify-center mb-3 shadow-md border-4 border-white`}>
                    <step.icon size={20} />
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-800 leading-tight mb-1">{step.label}</h4>
                  <p className="text-[9px] text-slate-400 font-medium leading-tight max-w-[70px]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two Column Layout for Help and Meaning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Help */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[17px] text-slate-800 tracking-tight">Quick Help (Common Issues)</h3>
            
            <div className="flex flex-col gap-3">
              {[
                { title: "I don't have my reference number", subtitle: "Check SMS / email confirmation", icon: MessageCircle, color: "text-amber-500", bg: "bg-amber-50" },
                { title: "Status shows \"Pending\"", subtitle: "Verification by BLO may be in progress", icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
                { title: "Application rejected", subtitle: "You can reapply or correct details", icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
              ].map((item, i) => (
                <button key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full ${item.bg} ${item.color} flex items-center justify-center`}>
                      <item.icon size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-[13px] font-bold text-slate-800 leading-tight">{item.title}</p>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
            </div>

            <a 
              href="https://voters.eci.gov.in/form8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-white border-2 border-indigo-100 text-indigo-600 font-bold text-[14px] rounded-2xl flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all"
            >
              <ExternalLink size={18} /> Update Details (Form 8)
            </a>

            <button className="w-full py-2 text-[13px] font-bold text-indigo-600 hover:underline flex items-center justify-center gap-1">
              View All Status Issues <ChevronRight size={14} />
            </button>
          </div>

          {/* What Status Means */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-[17px] text-slate-800 tracking-tight">What Status Means</h3>
            
            <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm flex flex-col gap-5">
              {[
                { label: 'Submitted', desc: 'Application received', color: 'text-amber-500' },
                { label: 'Under Verification', desc: 'BLO is verifying your details', color: 'text-blue-500' },
                { label: 'Approved', desc: 'Name added to voter list', color: 'text-emerald-500' },
                { label: 'Rejected', desc: 'Issue found (check reason & reapply)', color: 'text-red-500' },
              ].map((status, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`mt-1 w-2.5 h-2.5 rounded-full ${status.color} bg-current`}></div>
                  <div>
                    <h4 className="text-[14px] font-bold text-slate-800 leading-tight">{status.label}</h4>
                    <p className="text-[12px] text-slate-500 font-medium mt-0.5">{status.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* What to do next? - Enhanced Guidance */}
            <div className="bg-[#FFFBEB] border border-amber-100 p-5 rounded-[24px] flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                  <HelpCircle size={20} />
                </div>
                <h3 className="font-bold text-amber-900 text-[15px]">What to do next?</h3>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="p-3 bg-white/60 rounded-xl">
                  <p className="text-[12px] font-bold text-slate-800">Scenario: Name not found</p>
                  <p className="text-[11px] text-slate-600 mt-1">If your application was approved but name is not showing, wait for 48 hours for the electoral roll to update.</p>
                </div>
                <div className="p-3 bg-white/60 rounded-xl">
                  <p className="text-[12px] font-bold text-slate-800">Scenario: Application Rejected</p>
                  <p className="text-[11px] text-slate-600 mt-1">Check the rejection reason on the portal. You can file a new Form 6 with corrected documents immediately.</p>
                </div>
                <div className="p-3 bg-white/60 rounded-xl">
                  <p className="text-[12px] font-bold text-slate-800">Scenario: Long Delay</p>
                  <p className="text-[11px] text-slate-600 mt-1">If pending for &gt;30 days, contact your ERO (Electoral Registration Officer) or call 1950.</p>
                </div>
              </div>
            </div>

            {/* Time Taken Box */}
            <div className="bg-white p-4 rounded-[20px] border border-slate-100 shadow-sm flex items-center gap-4 relative overflow-hidden">
               <div className="p-2.5 rounded-full bg-slate-50 text-slate-400">
                  <Clock size={24} />
               </div>
               <div>
                  <h4 className="text-[13px] font-bold text-slate-800">Time Taken</h4>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-snug">
                    Usually takes a few weeks<br/>
                    (depending on verification)
                  </p>
               </div>
               <div className="ml-auto w-12 opacity-80">
                  <Calendar size={40} className="text-slate-100" />
               </div>
            </div>
          </div>
        </div>

      </div>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent pointer-events-none z-40 flex justify-center">
        <div className="w-full md:w-[60%] pointer-events-auto">
          <a 
            href="https://voters.eci.gov.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full bg-[#1A237E] text-white py-4 px-6 rounded-2xl font-bold flex items-center justify-between shadow-[0_8px_30px_rgb(26,35,126,0.2)] hover:bg-[#151b60] transition-all"
          >
            <div className="flex flex-col items-start">
              <span className="text-[15px] flex items-center gap-1.5 leading-tight">
                <ExternalLink size={16} /> Track on Official ECI Portal
              </span>
              <span className="text-[10px] text-indigo-200 font-medium mt-0.5">You will be redirected to voters.eci.gov.in</span>
            </div>
            <ChevronRight size={20} />
          </a>
        </div>
      </div>

    </main>
  );
};
