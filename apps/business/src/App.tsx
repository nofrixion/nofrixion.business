import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import LogoNofrixion from './assets/graphics/nofrixion-logo.svg'
import HomeUI from './components/HomeUI'
import Button from './components/ui/Button'
import AppLogout from './lib/auth/AppLogout'
import { AuthProvider } from './lib/auth/AuthProvider'
import { ProtectedRoutes } from './lib/auth/ProtectedRoutes'
import { getRoute } from './lib/utils/utils'
import AccountPayablePage from './pages/accounts-payable/page'
import AccountReceivablePage from './pages/accounts-receivable/page'
import AccountDashboardPage from './pages/current-accounts/account-dashboard'
import CurrentAccountsPage from './pages/current-accounts/page'
import DashboardPage from './pages/dashboard/page'
import Layout from './pages/layout'
import PayoutsPage from './pages/payouts/page'
import PayoutPage from './pages/payouts/payout'
import PricingPage from './pages/pricing/page'
import UsersPage from './pages/users/page'
import Root from './root'

export const App = () => {
  return (
    <AuthProvider>
      <AppLogout>
        <Routes>
          <Route element={<Root />}>
            <Route path="*" element={<NotFound />} />
            <Route path={getRoute('/')} element={<HomeUI />} />
            <Route element={<ProtectedRoutes />}>
              <Route path={getRoute('/home')} element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path="accounts-payable" element={<AccountPayablePage />} />
                <Route path="accounts-receivable" element={<AccountReceivablePage />} />
                <Route path="current-accounts" element={<CurrentAccountsPage />} />
                <Route path="current-accounts/:accountId" element={<AccountDashboardPage />} />
                <Route path="payouts" element={<PayoutsPage />} />
                <Route path="payouts/:payoutId" element={<PayoutPage />} />
                <Route path="payouts/:payoutId/:result" element={<PayoutPage />} />
                <Route path="users" element={<UsersPage />} />
                <Route path="pricing" element={<PricingPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </AppLogout>
    </AuthProvider>
  )
}

function NotFound() {
  const location = useLocation()
  const navigate = useNavigate()

  if (location.pathname.startsWith(getRoute('/home'))) {
    // No route exists
    return (
      <>
        <main className="flex flex-col items-center justify-center p-24 min-h-full">
          <div className="flex justify-center items-center text-gray-text mb-8">
            <img src={LogoNofrixion} alt="Nofrixion Logo" width={200} height={200} />
          </div>
          <h3>
            No route exists for <code>{location.pathname}</code>
          </h3>
          <Button
            className="flex mx-auto py-3 px-[24px] mt-8"
            onClick={() => navigate(getRoute('/home'))}
          >
            {'Return to home page'}
          </Button>
        </main>
      </>
    )
  } else {
    // Try to redirect to the new location
    return (
      <Navigate
        to={`${getRoute('/home')}${location.pathname}`}
        replace
        state={{ from: location }}
      />
    )
  }
}
