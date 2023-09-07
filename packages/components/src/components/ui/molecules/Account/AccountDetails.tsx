export interface AccountDetailsProps {
  accountName?: string
  accountNumber: string
}
const AccountDetails = ({ accountName, accountNumber }: AccountDetailsProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-[#00264D] text-base font-semibold mb-2 leading-5">{accountName}</span>
      <span className="text-[#73808C] text-xs leading-4">{accountNumber}</span>
    </div>
  )
}

export default AccountDetails
