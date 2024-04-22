import React, { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { PartiallyProtectedRoutes, ProtectedRoutes } from './ProtectedRoutes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignUpFormExperience from './Components/SignUp/SignUpForm/SignUpFormExperience';



const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'));
const SignUp = lazy(() => import('./Pages/SignUp/SignUp'));
const SignIn = lazy(() => import('./Pages/SignIn/SignIn'));
const Notification = lazy(() => import('./Pages/Notification/Notification'));
const ViewAll = lazy(() => import('./Pages/ViewAll/ViewAll'));
const Strategies = lazy(() => import('./Pages/Strategies/Strategies'));
const Billing = lazy(() => import('./Pages/Billing/Billing'));
const Support = lazy(() => import('./Pages/Support/Support'));
const Settings = lazy(() => import('./Pages/Settings/Settings'));
const Profile = lazy(() => import('./Pages/Profile/Profile'));
const TradeHistory = lazy(() => import('./Pages/TradeHistory/TradeHistory'));
const ForgetPassword = lazy(() => import('./Pages/ForgetPassword/ForgetPassword'));
const ResetPassword = lazy(() => import('./Pages/ResetPassword/ResetPassword'));

const AppContent = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Routes>
        <Route exact path="/sign-up" element={<SignUp />} />
        <Route exact path="/sign-in" element={<SignIn />} />
        <Route exact path="/forget-password" element={<ForgetPassword />} />
        <Route exact path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="*" element={<h1>404 NOT FOUND</h1>} />
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/notification"
          element={
            <ProtectedRoutes>
              <Notification />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/view-all/:marketId"
          element={
            <ProtectedRoutes>
              <ViewAll />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/strategies/:stockId"
          element={
            <ProtectedRoutes>
              <Strategies />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/billing"
          element={
            <ProtectedRoutes>
              <Billing />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoutes>
              <Support />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoutes>
              <Settings />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/user-experience"
          element={
            <PartiallyProtectedRoutes>
              <SignUpFormExperience />
            </PartiallyProtectedRoutes>
          }
        />
        <Route
          path="/strategy-detail/:stockDetailId"
          element={
            <ProtectedRoutes>
              <TradeHistory />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </GoogleOAuthProvider>
  );
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="profile-main-loader">
            <div className="loader">
              <svg className="circular-loader" viewBox="25 25 50 50">
                <circle
                  className="loader-path"
                  cx="50"
                  cy="50"
                  r="20"
                  fill="none"
                  stroke="#202124"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </div>
        }>
        <Routes>
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;
