import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import LogoNofrixion from '../assets/graphics/nofrixion-logo.svg'
import NotFoundIcon from '../assets/icons/not-found.svg'
import { getRoute } from '../lib/utils/utils'

const NotFound = () => {
  const location = useLocation()
  const navigate = useNavigate()

  if (location.pathname.startsWith(getRoute('/home'))) {
    // No route exists
    return (
      <>
        <main className="flex flex-col items-center min-h-full">
          <img src={LogoNofrixion} alt="Nofrixion" className="mt-10 mx-auto" />
          <div className="flex justify-center items-center pt-64 text-gray-text mb-8">
            <img src={NotFoundIcon} alt="Not found" />
          </div>
          <span className="text-4xl font-extrabold">Page not found</span>
          <button
            className="flex mt-8 text-sm underline hover:no-underline"
            onClick={() => navigate(getRoute('/home'))}
          >
            {'Back to homepage'}
          </button>
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

export default NotFound
