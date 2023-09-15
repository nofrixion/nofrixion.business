/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import bankLogos from '../../../../assets/images/bank_logos.svg'
import { Button } from '../../atoms'

export interface ExternalAccountCardProps {
  onConnectClicked: () => void
  onMaybeLater: () => void
}

const ExternalAccountCard = ({ onConnectClicked, onMaybeLater }: ExternalAccountCardProps) => {
  return (
    <div
      className="flex flex-col p-10 bg-white justify-between rounded-lg w-full bg-no-repeat bg-right bg-gradient-to-r from-transparent to-main-grey"
      style={{
        backgroundImage: `url(${bankLogos})`,
      }}
    >
      <div className="flex text-2xl font-semibold text-default-text">
        All your accounts in one single place
      </div>
      <div className="flex w-1/3 pt-8 pb-4 text-sm font-normal text-default-text">
        Connect your external business accounts to MoneyMoov for Business and gain clarity and
        control over your finances.
      </div>
      <div className="flex flex-row mt-7">
        <Button variant="primary" size="big" className="w-fit" onClick={onConnectClicked}>
          Connect account
        </Button>
        <div
          className="underline hover:no-underline ml-8 my-auto cursor-pointer"
          onClick={onMaybeLater}
        >
          Maybe later
        </div>
      </div>
    </div>
  )
}

export default ExternalAccountCard
