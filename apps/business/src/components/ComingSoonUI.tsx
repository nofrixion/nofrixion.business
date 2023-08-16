/* eslint-disable jsx-a11y/media-has-caption */
import { useState } from 'react'

import InfoBox from '../components/ui/InfoBox'
import useUserStore from '../lib/stores/useUserStore'
import { sendSlackMessage } from '../lib/utils/utils'
import Button from './ui/Button'

interface ComingSoonUIProps {
  title: string
  comingSoonItems: string[]
  video: {
    coverUrl?: string
    url: string
  }
}

const ComingSoonUI: React.FC<ComingSoonUIProps> = ({ title, comingSoonItems, video }) => {
  const { user } = useUserStore()
  const [didShowInterest, setDidShowInterest] = useState(false)

  const onShowInterestButtonClick = () => {
    setDidShowInterest(true)
    sendSlackMessage(
      `🔜 ${user?.emailAddress ?? 'Someone'} is interested to know when *${title}* is ready`,
    )
  }

  return (
    <>
      <h1 className="text-[1.75rem]/8 font-medium">{title}</h1>

      <div className="mt-14 leading-8 flex flex-col lg:flex-row">
        <div className="mb-8 lg:mr-20 xl:mr-80 md:w-96">
          <h6 className="font-semibold mb-[10px]">Coming soon</h6>

          <ul className="list-disc pl-5 mb-16">
            {comingSoonItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {!didShowInterest ? (
            <Button onClick={onShowInterestButtonClick}>Let me know when this is ready</Button>
          ) : (
            <InfoBox
              title="Thanks for your interest"
              message={`We will send you a message to ${
                user?.emailAddress ?? 'your email'
              } when this feature is ready to test.`}
            />
          )}
        </div>

        <div className="pr-4 pt-2">
          <div className="max-w-md overflow-hidden rounded-2xl lg:mr-auto lg:max-w-lg">
            <video className="w-full" controls poster={video.coverUrl}>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </>
  )
}

export default ComingSoonUI
