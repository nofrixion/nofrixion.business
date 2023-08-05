import { sendSlackMessage } from '@/lib/utils/utils'
import Button from './ui/Button'
import useUserStore from '@/lib/stores/useUserStore'
import { useState } from 'react'
import InfoBox from '@/components/ui/InfoBox'

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
      <h1 className="biz-text-[1.75rem]/8 biz-font-medium">{title}</h1>

      <div className="biz-mt-14 biz-leading-8 biz-flex biz-flex-col lg:biz-flex-row">
        <div className="biz-mb-8 lg:biz-mr-20 xl:biz-mr-80 md:biz-w-96">
          <h6 className="biz-font-semibold biz-mb-[10px]">Coming soon</h6>

          <ul className="biz-list-disc biz-pl-5 biz-mb-16">
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

        <div className="biz-pr-4 biz-pt-2">
          <div className="biz-max-w-md biz-overflow-hidden biz-rounded-2xl lg:biz-mr-auto lg:biz-max-w-lg">
            <video className="biz-w-full" controls poster={video.coverUrl}>
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
