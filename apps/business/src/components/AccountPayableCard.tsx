import Card from '@nofrixion/components/src/components/ui/atoms/Card/Card'

import WavesGraphic from '../assets/graphics/waves.desktop.svg'
import WavesGraphicMobile from '../assets/graphics/waves.mobile.svg'

interface AccountPayableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  onShowViewAll?: () => void
}

const AccountPayableCard: React.FC<AccountPayableCardProps> = ({ onShowViewAll, ...props }) => (
  <Card
    title="Accounts payable"
    subtext="Coming soon"
    onClick={onShowViewAll}
    onShowViewAll={onShowViewAll}
    {...props}
  >
    <img
      src={WavesGraphic}
      alt="MoneyMoov for Business Graphic"
      style={{ width: '100%' }}
      srcSet={`${WavesGraphicMobile} 1800w, ${WavesGraphic} 4092w`}
      sizes="(max-width: 1800px) 1800px, 4092px"
      className="h-full my-12 lg:my-auto"
    />
  </Card>
)

export default AccountPayableCard
