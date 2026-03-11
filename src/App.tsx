import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/lib/i18n';
import { AppShell } from '@/components/layout/AppShell';
import HomePage from '@/pages/HomePage';
import ExplorePage from '@/pages/ExplorePage';
import ExperiencesPage from '@/pages/ExperiencesPage';
import CalendarPage from '@/pages/CalendarPage';
import FundingPage from '@/pages/FundingPage';
import ProfilePage from '@/pages/ProfilePage';
import CheckInPage from '@/pages/CheckInPage';
import LocationCheckInPage from '@/pages/LocationCheckInPage';
import ProgramDetailPage from '@/pages/ProgramDetailPage';
import RegisterPage from '@/pages/RegisterPage';
import InsightsPage from '@/pages/InsightsPage';
import PassportPage from '@/pages/PassportPage';
import OpportunitiesPage from '@/pages/OpportunitiesPage';
import VoiceLoopPage from '@/pages/VoiceLoopPage';
import CapacityPage from '@/pages/CapacityPage';

export default function App() {
  return (
    <BrowserRouter basename="/my-denver-youth">
      <LanguageProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/experiences" element={<ExperiencesPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/funding" element={<FundingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkin" element={<CheckInPage />} />
            <Route path="/checkin/:locationId" element={<LocationCheckInPage />} />
            <Route path="/program/:id" element={<ProgramDetailPage />} />
            <Route path="/register/:id" element={<RegisterPage />} />
            <Route path="/opportunities" element={<OpportunitiesPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/passport" element={<PassportPage />} />
            <Route path="/voice" element={<VoiceLoopPage />} />
            <Route path="/capacity" element={<CapacityPage />} />
          </Routes>
        </AppShell>
      </LanguageProvider>
    </BrowserRouter>
  );
}
