import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  Users, 
  Printer, 
  ShieldCheck, 
  Settings, 
  Landmark, 
  Building2, 
  ChevronLeft, 
  ChevronRight,
  HelpCircle
} from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';
import { memo } from 'react';
import faqData from '../assets/faqs_full.json';
import faqHeroImg from '../assets/faq-hero.png';

const FAQItem = memo(({ faq, index, isOpen, onToggle }) => {
  return (
    <div className={`border-b border-slate-100 last:border-0 overflow-hidden transition-all duration-300 ${isOpen ? 'bg-indigo-50/30' : ''}`}>
      <button 
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${faq.id}`}
        className="w-full py-5 px-4 flex items-start gap-4 text-left group"
      >
        <span className="text-[14px] font-bold text-indigo-400 mt-1" aria-hidden="true">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        <span className="flex-1 text-[15px] font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
          {faq.question}
        </span>
        <div className={`mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true">
          <ChevronDown size={18} className="text-slate-400" />
        </div>
      </button>
      
      <div 
        id={`faq-content-${faq.id}`}
        role="region"
        aria-labelledby={`faq-button-${faq.id}`}
        className={`px-4 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[800px] pb-6' : 'max-h-0'
        }`}
      >
        <div className="pl-9 flex flex-col gap-4">
          <p className="text-[14px] text-slate-600 leading-relaxed font-medium whitespace-pre-line">
            {faq.answer}
          </p>
          
          {faq.keywords && faq.keywords.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider w-full mb-1">Related Topics</span>
              {faq.keywords.slice(0, 5).map((keyword, i) => (
                <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-500 shadow-sm">
                  {keyword}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [activeTab, setActiveTab] = useState(faqData.tabs[0].title);
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Icons mapping
  const tabIcons = {
    'Resident Electors': Users,
    'Electronic Voting Machine': Printer,
    'Model Code of Conduct (MCC)': ShieldCheck,
    'Election Machinery': Settings,
    'Presidential Election': Landmark,
    'Parliament': Building2
  };

  const filteredFaqs = useMemo(() => {
    if (!debouncedSearch.trim()) {
      const currentTab = faqData.tabs.find(t => t.title === activeTab);
      return currentTab ? currentTab.faqs : [];
    }

    const query = debouncedSearch.toLowerCase();
    let allFaqs = [];
    faqData.tabs.forEach(tab => {
      allFaqs = [...allFaqs, ...tab.faqs];
    });

    return allFaqs.filter(faq => 
      faq.question.toLowerCase().includes(query) || 
      faq.search_text?.toLowerCase().includes(query) ||
      faq.keywords?.some(k => k.toLowerCase().includes(query))
    );
  }, [debouncedSearch, activeTab]);

  const totalPages = Math.ceil(filteredFaqs.length / itemsPerPage);
  const paginatedFaqs = filteredFaqs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
    setExpandedId(null);
  }, [searchQuery, activeTab]);

  return (
    <main id="main-content" className="flex-1 flex flex-col bg-[#F9FAFB] pb-32 relative overflow-x-hidden">
      
      {/* Header Section */}
      <div className="px-5 pt-8 pb-12 relative overflow-hidden bg-white">
        <div className="w-[60%] relative z-10 min-h-[140px] flex flex-col justify-center">
          <h1 className="text-[32px] font-extrabold text-[#1A237E] leading-[1.1] tracking-tight">
            FAQ
          </h1>
          <p className="text-[14px] text-slate-500 mt-3 max-w-[220px] leading-relaxed font-medium">
            Find answers to your election questions
          </p>
        </div>
        
        {/* Right Illustration */}
        <div className="absolute top-[-10px] right-[-20px] w-[55%] h-[100%] pointer-events-none z-0">
          <img 
            src={faqHeroImg} 
            alt="FAQ Illustration" 
            className="w-full h-full object-contain object-right-top" 
          />
        </div>

        {/* Search Bar */}
        <div className="mt-10 relative z-10 w-[70%]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search questions, topics or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-4 bg-white border border-slate-200 rounded-[20px] text-[15px] font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 flex flex-col gap-6">
        
        {/* Tabs - Only show if not searching */}
        {!searchQuery && (
          <div className="flex overflow-x-auto gap-4 pb-2 -mx-5 px-5 scrollbar-hide no-scrollbar">
            {faqData.tabs.map((tab) => {
              const Icon = tabIcons[tab.title] || HelpCircle;
              const isActive = activeTab === tab.title;
              return (
                <button
                  key={tab.title}
                  onClick={() => setActiveTab(tab.title)}
                  className="flex flex-col items-center gap-3 min-w-[100px] transition-all"
                >
                  <div className={`w-14 h-14 rounded-[18px] flex items-center justify-center transition-all ${
                    isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-110' : 'bg-white text-slate-400 border border-slate-100'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className={`text-[11px] font-bold text-center leading-tight whitespace-nowrap ${isActive ? 'text-indigo-600' : 'text-slate-500'}`}>
                      {tab.title.length > 15 ? tab.title.split(' ')[0] + '...' : tab.title}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                      {tab.faqs.length}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-[17px] text-slate-800 tracking-tight">
            {searchQuery ? `Search Results (${filteredFaqs.length})` : `${activeTab} (${filteredFaqs.length})`}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-slate-400">Sort by:</span>
            <select className="bg-transparent text-[12px] font-bold text-slate-800 outline-none">
              <option>Most Relevant</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-[24px] border border-slate-100 shadow-sm overflow-hidden">
          {paginatedFaqs.length > 0 ? (
            paginatedFaqs.map((faq, index) => (
              <FAQItem 
                key={faq.id} 
                faq={faq} 
                index={(currentPage - 1) * itemsPerPage + index}
                isOpen={expandedId === faq.id}
                onToggle={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
              />
            ))
          ) : (
            <div className="py-12 px-6 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                <Search size={32} />
              </div>
              <h3 className="font-bold text-slate-800 text-[16px]">No FAQs found</h3>
              <p className="text-[14px] text-slate-500 mt-2">Try adjusting your search terms or browse categories.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-2">
            <p className="text-[12px] font-medium text-slate-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredFaqs.length)} of {filteredFaqs.length} questions
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 disabled:opacity-50 transition-all hover:border-indigo-100 hover:text-indigo-600"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center gap-1.5">
                {[...Array(totalPages)].map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-xl text-[14px] font-bold transition-all ${
                      currentPage === i + 1 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                      : 'bg-white border border-slate-100 text-slate-600 hover:border-indigo-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 disabled:opacity-50 transition-all hover:border-indigo-100 hover:text-indigo-600"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Footer Info Card */}
        <div className="mt-4 p-5 bg-[#F5F3FF] border border-indigo-100 rounded-[24px] flex items-center gap-5 shadow-sm relative overflow-hidden">
          <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm relative z-10 flex-shrink-0">
            <ShieldCheck size={28} />
          </div>
          <div className="relative z-10">
            <p className="text-[13px] font-medium text-indigo-900 leading-relaxed">
              Information provided as per the Representation of People Act, 1950 & 1951 and guidelines issued by the Election Commission of India.
            </p>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10 pointer-events-none">
            <Building2 size={100} className="text-indigo-900" />
          </div>
        </div>

      </div>

    </main>
  );
};
