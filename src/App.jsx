import React, { useState, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Header, Hero, ActionCardList, TrustBadge, UpdatesCard, EvaluationCard, FloatingAssistant, Footer, BottomNav } from './components';
import ScrollToTop from './components/ScrollToTop';
import { ChatModal } from './components/ChatModal';
import { RouteAnnouncer } from './components/RouteAnnouncer';
import { ROUTES } from './lib/routes';
import { initFirebase } from './lib/firebase';
import { initGA, trackPageView } from './lib/AnalyticsService';

// Lazy loading all 14 pages for optimal code splitting
const RegisterVoterPage = React.lazy(() => import('./pages').then(m => ({ default: m.RegisterVoterPage })));
const CheckVoterListPage = React.lazy(() => import('./pages').then(m => ({ default: m.CheckVoterListPage })));
const UpdateDetailsPage = React.lazy(() => import('./pages').then(m => ({ default: m.UpdateDetailsPage })));
const VotingProcessPage = React.lazy(() => import('./pages').then(m => ({ default: m.VotingProcessPage })));
const HowElectionsWorkPage = React.lazy(() => import('./pages').then(m => ({ default: m.HowElectionsWorkPage })));
const KeyTermsPage = React.lazy(() => import('./pages').then(m => ({ default: m.KeyTermsPage })));
const UpdatesPage = React.lazy(() => import('./pages').then(m => ({ default: m.UpdatesPage })));
const ElectionParticipantsPage = React.lazy(() => import('./pages').then(m => ({ default: m.ElectionParticipantsPage })));
const StatusPage = React.lazy(() => import('./pages').then(m => ({ default: m.StatusPage })));
const FAQPage = React.lazy(() => import('./pages').then(m => ({ default: m.FAQPage })));
const IssueResolutionPage = React.lazy(() => import('./pages').then(m => ({ default: m.IssueResolutionPage })));
const LostVoterIdPage = React.lazy(() => import('./pages').then(m => ({ default: m.LostVoterIdPage })));
const EmergencyPage = React.lazy(() => import('./pages').then(m => ({ default: m.EmergencyPage })));
const SpecialSupportPage = React.lazy(() => import('./pages').then(m => ({ default: m.SpecialSupportPage })));
const FallbackHelpPage = React.lazy(() => import('./pages').then(m => ({ default: m.FallbackHelpPage })));

import LoadingSkeleton from './components/Skeleton/LoadingSkeleton';

function HomePage() {
  const navigate = useNavigate();

  const handleAction = (actionName) => {
    switch(actionName) {
      case 'register': navigate(ROUTES.REGISTER); break;
      case 'check_name': navigate(ROUTES.CHECK_VOTER_LIST); break;
      case 'update_details': navigate(ROUTES.UPDATE_DETAILS); break;
      case 'voting_process': navigate(ROUTES.VOTING_PROCESS); break;
      case 'understand_elections': navigate(ROUTES.HOW_ELECTIONS_WORK); break;
      case 'updates': navigate(ROUTES.UPDATES); break;
      case 'intent_input': 
        window.dispatchEvent(new CustomEvent('open-chat'));
        break;
      case 'faq': navigate(ROUTES.FAQ); break;
      case 'track_status': navigate(ROUTES.STATUS); break;
      case 'report_issue': navigate(ROUTES.ISSUE_RESOLUTION); break;
      default: console.log(`Action triggered: ${actionName}`);
    }
  };

  return (
    <main className="flex-1 flex flex-col" id="main-content">
      <Hero />
      <ActionCardList onAction={handleAction} />
      <UpdatesCard onClick={() => handleAction('updates')} />
      <EvaluationCard onClick={() => handleAction('report_issue')} />
      <FloatingAssistant onClick={() => handleAction('intent_input')} />
      <TrustBadge />
    </main>
  );
}

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    initGA();
  }, []);

  React.useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  // Initialize Firebase AppCheck and Chat Event Listener
  React.useEffect(() => {
    initFirebase();
    const handleOpenChat = () => setIsChatOpen(true);
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  return (
    <div className="min-h-screen relative w-full bg-white flex justify-center">
      <RouteAnnouncer />
      <div className="w-full md:w-[60%] bg-[#F9FAFB] min-h-screen flex flex-col">
        <ScrollToTop />
        <div className="flex-1 overflow-y-auto px-5 scroll-smooth">
          <Header />
          
          <div className="flex-1 flex flex-col">
            <Suspense fallback={<LoadingSkeleton />}>
              <Routes>
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterVoterPage />} />
                <Route path={ROUTES.CHECK_VOTER_LIST} element={<CheckVoterListPage />} />
                <Route path={ROUTES.UPDATE_DETAILS} element={<UpdateDetailsPage />} />
                <Route path={ROUTES.VOTING_PROCESS} element={<VotingProcessPage />} />
                <Route path={ROUTES.HOW_ELECTIONS_WORK} element={<HowElectionsWorkPage />} />
                <Route path={ROUTES.KEY_TERMS} element={<KeyTermsPage />} />
                <Route path={ROUTES.UPDATES} element={<UpdatesPage />} />
                <Route path={ROUTES.PARTICIPANTS} element={<ElectionParticipantsPage />} />
                <Route path={ROUTES.STATUS} element={<StatusPage />} />
                <Route path={ROUTES.FAQ} element={<FAQPage />} />
                <Route path={ROUTES.ISSUE_RESOLUTION} element={<IssueResolutionPage />} />
                <Route path={ROUTES.LOST_VOTER_ID} element={<LostVoterIdPage />} />
                <Route path={ROUTES.EMERGENCY} element={<EmergencyPage />} />
                <Route path={ROUTES.SPECIAL_SUPPORT} element={<SpecialSupportPage />} />
                <Route path={ROUTES.HELP} element={<FallbackHelpPage />} />
                <Route path={ROUTES.FALLBACK} element={<Navigate to={ROUTES.HOME} />} />
              </Routes>
            </Suspense>
          </div>
        </div>
        
        {location.pathname === ROUTES.HOME && <Footer />}
        <BottomNav onOpenChat={() => setIsChatOpen(true)} />
        <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </div>
  );
}

export default App;
