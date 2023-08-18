import { NOFRIXION_BUSINESS_GITHUB_URL } from '../../lib/constants'

export const PRReview = () => {
  return (
    <span className="flex m-auto bg-white text-negative-red py-1 px-2 rounded-md font-semibold">
      <a
        href={`${NOFRIXION_BUSINESS_GITHUB_URL}${import.meta.env.VITE_NOFRIXION_PULL_REQUEST_ID}`}
        target="_blank"
        rel="noreferrer"
      >
        You are currently reviewing PR #{import.meta.env.VITE_NOFRIXION_PULL_REQUEST_ID}
      </a>
    </span>
  )
}
