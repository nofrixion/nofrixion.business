import WavesGraphic from '../assets/graphics/waves.desktop.svg'
import WavesGraphicMobile from '../assets/graphics/waves.mobile.svg'
import Card from '../components/ui/atoms/Card/Card'

interface AccountPayableCardProps extends React.HTMLAttributes<HTMLDivElement> {
  onShowViewAll?: () => void
}

const AccountPayableCard: React.FC<AccountPayableCardProps> = ({ onShowViewAll, ...props }) => (
  <Card title="Accounts payable" subtext="Coming soon" onShowViewAll={onShowViewAll} {...props}>
    <img
      src={WavesGraphic}
      alt="MoneyMoov for Business Graphic"
      style={{ width: '100%' }}
      srcSet={`${WavesGraphicMobile} 1800w, ${WavesGraphic} 4092w`}
      sizes="(max-width: 1800px) 1800px, 4092px"
      className="biz-h-full biz-my-12 lg:biz-my-auto"
    />
  </Card>
)

export default AccountPayableCard
