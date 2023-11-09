import { useNavigate } from 'react-router-dom'

import LogoNofrixion from '../assets/graphics/nofrixion-logo.svg'
import NotAuthorisedIcon from '../assets/icons/not-authorised.svg'
import { getRoute } from '../lib/utils/utils'

const NotAuthorised = () => {
  const navigate = useNavigate()

  return (
    <>
      <main className="flex flex-col items-center min-h-full">
        <img src={LogoNofrixion} alt="Nofrixion" className="mt-10 mx-auto" />
        <div className="flex justify-center items-center pt-64 text-gray-text mb-8">
          <img src={NotAuthorisedIcon} alt="Not authorised" />
        </div>
        <span className="text-4xl text-center font-extrabold max-w-[390px]">
          You don’t have access to this section
        </span>
        <span className="pt-8 text-sm font-normal">
          If you think this is an error please contact your system administrator.
        </span>
        <button
          className="flex mt-8 text-sm underline hover:no-underline"
          onClick={() => navigate(getRoute('/home'))}
        >
          {'Back to homepage'}
        </button>
      </main>
    </>
  )
}

export default NotAuthorised
