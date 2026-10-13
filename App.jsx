import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';

// Auth pages (boilerplate)
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';

// App pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Zakat from '@/pages/Zakat';
import Sadaqah from '@/pages/Sadaqah';
import SadaqahJariyah from '@/pages/SadaqahJariyah';
import Waqf from '@/pages/Waqf';
import Projects from '@/pages/Projects';
import Impact from '@/pages/Impact';
import Transparency from '@/pages/Transparency';
import Partnership from '@/pages/Partnership';
import MajorGiving from '@/pages/MajorGiving';
import Contact from '@/pages/Contact';
import MyGiving from '@/pages/MyGiving';
import Donate from '@/pages/Donate';
import Admin from "@/pages/Admin";
import PartnerApplication from "@/pages/PartnerApplication";
import News from "@/pages/News";

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/zakat" element={<Zakat />} />
        <Route path="/sadaqah" element={<Sadaqah />} />
        <Route path="/sadaqah-jariyah" element={<SadaqahJariyah />} />
        <Route path="/waqf" element={<Waqf />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/transparency" element={<Transparency />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/major-giving" element={<MajorGiving />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />

        {/* Authenticated pages */}
        <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
          <Route path="/donate" element={<Donate />} />
          <Route path="/my-giving" element={<MyGiving />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/partner-application" element={<PartnerApplication />} />
        </Route>
      </Route>

      {/* Standalone auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <ScrollToTop />
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App