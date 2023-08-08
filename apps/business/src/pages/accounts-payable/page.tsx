import ComingSoonUI from '../../components/ComingSoonUI'

const comingSoonItems = [
  'Connect with Xero',
  'Import approved invoices',
  'Automatically create Payruns',
  'Create, edit, approve Payruns',
  'Remittance notes',
  'Automatic invoice reconciliation with XERO',
]

const AccountPayablePage = () => {
  return (
    <ComingSoonUI
      title="Accounts Payable"
      comingSoonItems={comingSoonItems}
      video={{
        url: 'https://cdn.nofrixion.com/videos/accounts-payable.mp4',
      }}
    />
  )
}

export default AccountPayablePage
