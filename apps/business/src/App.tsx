import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import LogoNofrixion from './assets/graphics/nofrixion-logo.svg'
import HomeUI from './components/HomeUI'
import Button from './components/ui/Button'
import AppLogout from './lib/auth/AppLogout'
import { AuthProvider } from './lib/auth/AuthProvider'
import { ProtectedRoutes } from './lib/auth/ProtectedRoutes'
import AccountPayablePage from './pages/accounts-payable/page'
import AccountReceivablePage from './pages/accounts-receivable/page'
import CurrentAccountsPage from './pages/current-accounts/page'
import DashboardPage from './pages/dashboard/page'
import Layout from './pages/layout'
import PayoutsPage from './pages/payouts/page'
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
            <Route path="/" element={<HomeUI />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Layout />}>
                <Route index element={<DashboardPage />} />
                <Route path="accounts-payable" element={<AccountPayablePage />} />
                <Route path="accounts-receivable" element={<AccountReceivablePage />} />
                <Route path="current-accounts" element={<CurrentAccountsPage />} />
                <Route path="payouts" element={<PayoutsPage />} />
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

  return (
    <>
      <main className="biz-flex biz-flex-col biz-items-center biz-justify-center biz-p-24 biz-min-h-screen">
        <div className="biz-flex biz-justify-center biz-items-center biz-text-gray-text biz-mb-8">
          <img src={LogoNofrixion} alt="Nofrixion Logo" width={200} height={200} />
        </div>
        <h3>
          No route exists for <code>{location.pathname}</code>
        </h3>
        <Button
          className="biz-flex biz-mx-auto biz-py-3 biz-px-[24px] biz-mt-8"
          onClick={() => navigate('/home')}
        >
          {'Return to home page'}
        </Button>
      </main>
    </>
  )
}
